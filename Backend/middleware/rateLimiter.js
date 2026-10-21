import rateLimit from 'express-rate-limit';
import config from '../config/env.js';

/**
 * Express Rate Limiters
 * Fulfills:
 * - Security #11: Add rate limiting
 * - Security #12: Set spend cap / resource protection
 */

// Global Rate Limiter: Protects all API endpoints from abusive scrapers and DDoS
export const globalLimiter = rateLimit({
  windowMs: config.limits.rateLimitWindowMs,
  max: config.limits.rateLimitMaxPublic,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    error: 'Too Many Requests',
    message: 'Too many requests from this IP address. Please try again after 15 minutes.'
  }
});

// Strict Contact Form Rate Limiter: Blocks spambots & email quota exhaustion
export const contactFormLimiter = rateLimit({
  windowMs: config.limits.rateLimitWindowMs,
  max: config.limits.rateLimitMaxContact, // 5 requests per 15 minutes per IP
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    error: 'Rate Limit Exceeded',
    message: 'You have submitted several inquiries recently. Please wait a few minutes before sending another message.'
  }
});
