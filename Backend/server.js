import express from 'express';
import cors from 'cors';
import compression from 'compression';
import config from './config/env.js';
import db from './db/database.js';
import { dbPool } from './db/pool.js';
import { helmetMiddleware, enforceHttps, csrfProtection, errorHandler } from './middleware/security.js';
import { globalLimiter, contactFormLimiter, adminLoginLimiter } from './middleware/rateLimiter.js';
import { requireAdminAuth, timingSafeCompare, generateAdminToken } from './middleware/auth.js';
import { serverSideCache } from './middleware/cacheMiddleware.js';
import { sanitizeString, isValidEmail, maskEmail } from './utils/sanitize.js';
import { sendInquiryNotification } from './utils/mailer.js';

const app = express();

// Performance #14: Trust reverse proxy (AWS ALB, Cloudflare, Vercel load balancer)
app.set('trust proxy', 1);

// Security #20: Disable x-powered-by header
app.disable('x-powered-by');

// Performance #15: Compress API payloads (gzip & brotli)
app.use(compression({
  threshold: 1024, // only compress payloads larger than 1KB
  level: 6
}));

// Security #17 & #8: Helmet Security Headers & Content-Security-Policy
app.use(helmetMiddleware);

// Security #16: Enforce HTTPS in production
app.use(enforceHttps);

// Security #11 & #12: Global rate limiting
app.use('/api', globalLimiter);

// Security #15: Strict CORS configuration
const allowedOrigins = [
  config.clientUrl,
  'http://localhost:5173',
  'http://127.0.0.1:5173'
];

app.use(cors({
  origin: (origin, callback) => {
    // Allow non-browser requests (e.g. mobile, curl, server-to-server)
    if (!origin) return callback(null, true);

    const isExplicitAllowed = allowedOrigins.includes(origin);
    const isVercelPreview = origin.endsWith('.vercel.app');
    const isLocal = origin.startsWith('http://localhost:') || origin.startsWith('http://127.0.0.1:');

    if (isExplicitAllowed || isVercelPreview || (!config.isProd && isLocal)) {
      return callback(null, true);
    }

    return callback(new Error('CORS access denied by security policy.'), false);
  },
  methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  credentials: true,
  maxAge: 86400 // 24 hours preflight cache
}));

// Security #12: Set spend cap / payload size limit to 10kb
app.use(express.json({ limit: config.limits.maxBodySize }));

// Security #14: CSRF protection on state-changing requests
app.use('/api', csrfProtection);

// ==========================================
// PUBLIC ROUTES
// ==========================================

/**
 * Health check endpoint
 * Performance #4 & #19: Cached for 30s
 * Performance #14: Health probe for load balancers
 */
app.get('/api/health', serverSideCache(30), async (req, res) => {
  const poolHealth = await dbPool.healthCheck();

  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    app: 'Neil Masion Portfolio API',
    environment: config.env,
    poolStatus: poolHealth.status
  });
});

/**
 * Public Analytics Ping Endpoint
 * Records anonymous pageview and visitor metadata
 */
app.post('/api/analytics/visit', async (req, res) => {
  try {
    const { path: visitPath = '/', referrer = '', visitorId = '' } = req.body || {};
    const ip = req.ip || req.headers['x-forwarded-for'] || req.socket.remoteAddress || '';
    const userAgent = req.headers['user-agent'] || '';

    const visit = await db.recordVisit({
      ip: String(ip),
      userAgent: String(userAgent),
      path: String(visitPath),
      referrer: String(referrer),
      visitorId: String(visitorId)
    });

    return res.status(200).json({
      success: true,
      visitId: visit?.id
    });
  } catch (error) {
    // Analytics pings must never crash or throw error to the caller
    return res.status(200).json({ success: true, note: 'recorded' });
  }
});

/**
 * Public Contact Form Submission
 * Security #7: Input sanitization
 * Security #8: XSS neutralization
 * Security #11: Contact form rate limiting (5 req / 15 min)
 * Security #24: Safe logging (masked email)
 */
app.post('/api/contact', contactFormLimiter, async (req, res) => {
  try {
    const { name, email, projectType, budget, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        error: 'Validation Error',
        message: 'Name, email, and message are required fields.'
      });
    }

    // Security #7 & #8: Sanitize and enforce maximum lengths
    const cleanName = sanitizeString(name, 100);
    const cleanEmail = sanitizeString(email, 120);
    const cleanProjectType = sanitizeString(projectType || 'General Inquiry', 100);
    const cleanBudget = sanitizeString(budget || 'Undisclosed', 100);
    const cleanMessage = sanitizeString(message, 3000);

    // Email format validation
    if (!isValidEmail(cleanEmail)) {
      return res.status(400).json({
        success: false,
        error: 'Validation Error',
        message: 'Please provide a valid email address.'
      });
    }

    if (cleanName.length < 2) {
      return res.status(400).json({
        success: false,
        error: 'Validation Error',
        message: 'Name must be at least 2 characters long.'
      });
    }

    if (cleanMessage.length < 10) {
      return res.status(400).json({
        success: false,
        error: 'Validation Error',
        message: 'Message must be at least 10 characters long.'
      });
    }

    const newMessage = {
      id: `msg_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
      name: cleanName,
      email: cleanEmail,
      projectType: cleanProjectType,
      budget: cleanBudget,
      message: cleanMessage,
      receivedAt: new Date().toISOString(),
      status: 'unread'
    };

    // Performance #7 & Security #10: Insert with indexed lookup and atomic persist (Vercel KV or local)
    await db.insertMessage(newMessage);

    // Security #24: Safe logging (masked email)
    console.log(`[CONTACT RECEIVED] From: ${cleanName} <${maskEmail(cleanEmail)}> | Type: ${cleanProjectType}`);

    // Send real-time email notification to Neil's Gmail (neilmasion2@gmail.com)
    sendInquiryNotification(newMessage).catch((err) => {
      console.error('[MAIL DISPATCH ERROR]', err);
    });

    return res.status(200).json({
      success: true,
      message: 'Thank you! Your message has been received securely. Neil will get back to you shortly.',
      inquiryId: newMessage.id
    });
  } catch (error) {
    console.error('Error handling contact message:', error);
    return res.status(500).json({
      success: false,
      error: 'Internal Error',
      message: 'Internal server error while processing your message.'
    });
  }
});

// ==========================================
// ADMIN AUTHENTICATION
// ==========================================

/**
 * Admin Login Endpoint
 * Verifies username and password using timing-safe comparison
 * Generates an HMAC-SHA256 signed session token
 */
app.post('/api/admin/login', adminLoginLimiter, (req, res) => {
  try {
    const { username, password } = req.body || {};

    if (!username || !password) {
      return res.status(400).json({
        success: false,
        error: 'Bad Request',
        message: 'Username and password are required.'
      });
    }

    const expectedUser = config.adminUsername;
    const expectedPass = config.adminPassword;

    // Security: Timing-safe equality checks
    const isUserValid = timingSafeCompare(String(username).trim(), expectedUser);
    const isPassValid = timingSafeCompare(String(password), expectedPass);

    if (!isUserValid || !isPassValid) {
      return res.status(401).json({
        success: false,
        error: 'Authentication Failed',
        message: 'Invalid username or password.'
      });
    }

    // Generate secure session token
    const token = generateAdminToken({ username: expectedUser });

    return res.status(200).json({
      success: true,
      message: 'Admin authentication successful.',
      token,
      user: {
        username: expectedUser,
        role: 'admin',
        loginTime: new Date().toISOString()
      }
    });
  } catch (error) {
    console.error('Error during admin login:', error);
    return res.status(500).json({
      success: false,
      error: 'Internal Error',
      message: 'Failed to process admin authentication.'
    });
  }
});

/**
 * Admin Session Verification Endpoint
 */
app.get('/api/admin/verify', requireAdminAuth, (req, res) => {
  return res.status(200).json({
    success: true,
    user: req.user
  });
});

// ==========================================
// PROTECTED ADMIN ROUTES (Security #4, #5, #6)
// ==========================================

/**
 * Protected Admin Analytics Dashboard Overview
 * Returns total visits, unique visitors, daily trend chart, devices, and messages count
 */
app.get('/api/admin/analytics', requireAdminAuth, async (req, res) => {
  try {
    const analytics = await db.getAnalyticsSummary();
    return res.json({
      success: true,
      data: analytics
    });
  } catch (error) {
    console.error('Error generating analytics summary:', error);
    return res.status(500).json({
      success: false,
      error: 'Internal Error',
      message: 'Failed to compute analytics summary.'
    });
  }
});

/**
 * Protected Admin Inquiry List with Search, Filter & Pagination
 */
app.get('/api/admin/messages', requireAdminAuth, async (req, res) => {
  const { page = 1, limit = 20, email = null, search = '', status = 'all' } = req.query;

  const result = await db.getMessages({
    page: parseInt(page, 10),
    limit: parseInt(limit, 10),
    email,
    search: String(search || ''),
    status: String(status || 'all')
  });

  return res.json({
    success: true,
    data: result.items,
    pagination: result.pagination
  });
});

/**
 * Protected Admin Message Status Update (Mark read/unread)
 */
app.patch('/api/admin/messages/:id/read', requireAdminAuth, async (req, res) => {
  const { id } = req.params;
  const { status = 'read' } = req.body || {};

  const updated = await db.updateMessageStatus(id, status);

  if (!updated) {
    return res.status(404).json({
      success: false,
      error: 'Not Found',
      message: 'Inquiry not found.'
    });
  }

  return res.json({
    success: true,
    data: updated
  });
});

/**
 * Protected Admin Delete Inquiry Message
 */
app.delete('/api/admin/messages/:id', requireAdminAuth, async (req, res) => {
  const { id } = req.params;
  const deleted = await db.deleteMessage(id);

  if (!deleted) {
    return res.status(404).json({
      success: false,
      error: 'Not Found',
      message: 'Inquiry not found or already deleted.'
    });
  }

  return res.json({
    success: true,
    message: 'Inquiry successfully deleted.'
  });
});

/**
 * Protected Admin Test Email Dispatch
 */
app.post('/api/admin/test-email', requireAdminAuth, async (req, res) => {
  const result = await sendInquiryNotification({
    id: `test_${Date.now()}`,
    name: 'Gmail Test Probe',
    email: 'probe@neilmasion.dev',
    projectType: 'Test Diagnostic',
    budget: 'N/A',
    message: 'This is a test notification to verify that Gmail delivery to neilmasion2@gmail.com is working properly.',
    receivedAt: new Date().toISOString()
  });

  return res.json({
    success: result.sent,
    details: result
  });
});

/**
 * Protected Admin System & Cache Metrics
 */
app.get('/api/admin/stats', requireAdminAuth, async (req, res) => {
  const poolStats = await dbPool.healthCheck();

  return res.json({
    success: true,
    totalMessages: db.messages.length,
    poolStats,
    memoryUsage: process.memoryUsage(),
    uptime: process.uptime()
  });
});

// ==========================================
// ERROR HANDLING (Security #19 & #20)
// ==========================================
app.use(errorHandler);

// Start server when run directly (local development)
if (!process.env.VERCEL) {
  const server = app.listen(config.port, () => {
    console.log(`⚡ Neil Masion Portfolio API running on http://localhost:${config.port}`);
    console.log(`⚡ Environment: ${config.env}`);
    console.log(`⚡ Client origin allowed: ${config.clientUrl}`);
  });

  // Security #12: Server-level timeout cap (10 seconds)
  server.setTimeout(config.limits.serverTimeoutMs);
}

export default app;
