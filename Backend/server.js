import express from 'express';
import cors from 'cors';
import compression from 'compression';
import config from './config/env.js';
import db from './db/database.js';
import { dbPool } from './db/pool.js';
import { helmetMiddleware, enforceHttps, csrfProtection, errorHandler } from './middleware/security.js';
import { globalLimiter, contactFormLimiter } from './middleware/rateLimiter.js';
import { requireAdminAuth } from './middleware/auth.js';
import { serverSideCache } from './middleware/cacheMiddleware.js';
import { sanitizeString, isValidEmail, maskEmail } from './utils/sanitize.js';

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
  methods: ['GET', 'POST', 'OPTIONS'],
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
 * Public Contact Form Submission
 * Security #7: Input sanitization
 * Security #8: XSS neutralization
 * Security #11: Contact form rate limiting (5 req / 15 min)
 * Security #24: Safe logging (masked email)
 */
app.post('/api/contact', contactFormLimiter, (req, res) => {
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
      receivedAt: new Date().toISOString()
    };

    // Performance #7 & Security #10: Insert with indexed lookup and atomic disk persist
    db.insertMessage(newMessage);

    // Security #24: No expose of user data in server logs (masked email)
    console.log(`[CONTACT RECEIVED] From: ${cleanName} <${maskEmail(cleanEmail)}> | Type: ${cleanProjectType}`);

    // Respond with minimal safe acknowledgment — never expose other users' data
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
// PROTECTED ADMIN ROUTES (Security #4, #5, #6)
// ==========================================

/**
 * Protected Admin Inquiry List with Pagination & Query Indexing
 * Security #4: Protected admin route
 * Security #5: Bearer token authentication
 * Security #6: Admin permission check
 * Performance #10: Paginate large lists
 * Performance #7: Fast indexed query
 */
app.get('/api/admin/messages', requireAdminAuth, (req, res) => {
  const { page = 1, limit = 10, email = null } = req.query;

  const result = db.getMessages({
    page: parseInt(page, 10),
    limit: parseInt(limit, 10),
    email
  });

  return res.json({
    success: true,
    data: result.items,
    pagination: result.pagination
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
