import helmet from 'helmet';
import config from '../config/env.js';

/**
 * Comprehensive Security Middleware Suite
 * Fulfills:
 * - Security #8: Protect against XSS
 * - Security #14: CSRF protection
 * - Security #16: Enable HTTPS
 * - Security #17: Add security headers
 * - Security #18: Secure cookies
 * - Security #19: Disable debug mode
 * - Security #20: Check production settings
 */

/**
 * Configures Helmet security headers
 */
export const helmetMiddleware = helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'", "https://va.vercel-scripts.com"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      imgSrc: ["'self'", "data:", "https:"],
      connectSrc: ["'self'", config.clientUrl, "https://*.vercel.app", "https://va.vercel-scripts.com", "https://vitals.vercel-insights.com"],
      frameAncestors: ["'none'"],
      objectSrc: ["'none'"],
      upgradeInsecureRequests: config.isProd ? [] : null
    }
  },
  crossOriginEmbedderPolicy: false,
  crossOriginResourcePolicy: { policy: "cross-origin" },
  hsts: {
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true
  },
  frameguard: { action: 'deny' },
  noSniff: true,
  referrerPolicy: { policy: 'strict-origin-when-cross-origin' }
});

/**
 * HTTPS Redirection Middleware for Production
 * Fulfills Security #16: Enable HTTPS
 */
export function enforceHttps(req, res, next) {
  if (config.isProd && req.headers['x-forwarded-proto'] && req.headers['x-forwarded-proto'] !== 'https') {
    return res.redirect(301, `https://${req.headers.host}${req.url}`);
  }
  next();
}

/**
 * CSRF Protection Middleware for State-Changing Requests (POST, PUT, DELETE)
 * Fulfills Security #14: CSRF protection
 */
export function csrfProtection(req, res, next) {
  // Safe methods do not require CSRF token/origin checks
  if (['GET', 'HEAD', 'OPTIONS'].includes(req.method)) {
    return next();
  }

  const origin = req.headers.origin || req.headers.referer;
  const requestedWith = req.headers['x-requested-with'];

  // In production, verify Origin against allowed origins
  if (config.isProd && origin) {
    try {
      const originHost = new URL(origin).origin;
      const isAllowedOrigin = 
        originHost === config.clientUrl ||
        originHost.endsWith('.vercel.app');

      const hasBearerAuth = req.headers.authorization && req.headers.authorization.startsWith('Bearer ');

      if (!isAllowedOrigin && !requestedWith && !hasBearerAuth) {
        return res.status(403).json({
          success: false,
          error: 'CSRF Forbidden',
          message: 'Cross-origin request failed security validation.'
        });
      }
    } catch {
      return res.status(400).json({
        success: false,
        error: 'Invalid Origin Header'
      });
    }
  }

  next();
}

/**
 * Production-Safe Error Handler
 * Fulfills Security #19: Disable debug mode & prevent stack trace leakage
 */
export function errorHandler(err, req, res, next) {
  // Always log error details internally on the server
  console.error('[SERVER ERROR]', err);

  const statusCode = err.status || err.statusCode || 500;
  
  // In production, never expose internal error messages or stack traces to the client
  const response = {
    success: false,
    error: statusCode === 500 ? 'Internal Server Error' : (err.name || 'Error'),
    message: config.isProd 
      ? 'An error occurred while processing your request. Please try again later.'
      : err.message
  };

  res.status(statusCode).json(response);
}

/**
 * Secure Cookie Options Helper
 * Fulfills Security #18: Secure cookies
 */
export const secureCookieOptions = {
  httpOnly: true,
  secure: config.isProd,
  sameSite: 'strict',
  path: '/',
  maxAge: 24 * 60 * 60 * 1000 // 1 day
};
