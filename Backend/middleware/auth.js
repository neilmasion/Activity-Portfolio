import crypto from 'crypto';
import config from '../config/env.js';

/**
 * Timing-safe Authentication Middleware for Protected Routes
 * Fulfills:
 * - Security #4: Protect admin routes
 * - Security #5: Add auth
 * - Security #6: Check user perms
 */

export function requireAdminAuth(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      success: false,
      error: 'Unauthorized',
      message: 'Missing or malformed Authorization header. Bearer token required.'
    });
  }

  const token = authHeader.slice(7).trim();
  const secretKey = config.apiSecretKey;

  if (!secretKey) {
    return res.status(500).json({
      success: false,
      error: 'Server Misconfiguration',
      message: 'Admin authorization key not configured.'
    });
  }

  // Use crypto.timingSafeEqual to prevent side-channel timing attacks
  const tokenBuffer = Buffer.from(token);
  const secretBuffer = Buffer.from(secretKey);

  if (
    tokenBuffer.length !== secretBuffer.length ||
    !crypto.timingSafeEqual(tokenBuffer, secretBuffer)
  ) {
    return res.status(403).json({
      success: false,
      error: 'Forbidden',
      message: 'Invalid credentials or insufficient permissions.'
    });
  }

  // Set user role context
  req.user = {
    role: 'admin',
    authenticatedAt: new Date().toISOString()
  };

  next();
}

/**
 * Role checking middleware generator
 */
export function requireRole(role) {
  return (req, res, next) => {
    if (!req.user || req.user.role !== role) {
      return res.status(403).json({
        success: false,
        error: 'Forbidden',
        message: `Requires ${role} permissions.`
      });
    }
    next();
  };
}
