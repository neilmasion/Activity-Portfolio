import crypto from 'crypto';
import config from '../config/env.js';

/**
 * Timing-safe string comparison to protect against side-channel timing attacks
 */
export function timingSafeCompare(a, b) {
  if (typeof a !== 'string' || typeof b !== 'string') return false;
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  if (bufA.length !== bufB.length) return false;
  return crypto.timingSafeEqual(bufA, bufB);
}

/**
 * Generates an HMAC-SHA256 signed session token for admin login
 */
export function generateAdminToken(payload = {}) {
  const secret = config.adminTokenSecret || config.apiSecretKey || 'secret_fallback_nm_key';
  const tokenData = {
    ...payload,
    role: 'admin',
    iat: Date.now(),
    exp: Date.now() + 7 * 24 * 60 * 60 * 1000 // 7 days expiration
  };

  const encodedPayload = Buffer.from(JSON.stringify(tokenData)).toString('base64url');
  const signature = crypto
    .createHmac('sha256', secret)
    .update(encodedPayload)
    .digest('base64url');

  return `nm_adm.${encodedPayload}.${signature}`;
}

/**
 * Verifies and decodes an HMAC-SHA256 signed admin token
 */
export function verifyAdminToken(token) {
  if (!token || typeof token !== 'string') return null;

  try {
    const parts = token.split('.');
    if (parts.length !== 3 || parts[0] !== 'nm_adm') return null;

    const [, encodedPayload, signature] = parts;
    const secret = config.adminTokenSecret || config.apiSecretKey || 'secret_fallback_nm_key';

    const expectedSignature = crypto
      .createHmac('sha256', secret)
      .update(encodedPayload)
      .digest('base64url');

    const sigBuf = Buffer.from(signature);
    const expSigBuf = Buffer.from(expectedSignature);

    if (sigBuf.length !== expSigBuf.length || !crypto.timingSafeEqual(sigBuf, expSigBuf)) {
      return null;
    }

    const payload = JSON.parse(Buffer.from(encodedPayload, 'base64url').toString('utf-8'));
    if (payload.exp && Date.now() > payload.exp) {
      return null; // Expired token
    }

    return payload;
  } catch {
    return null;
  }
}

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

  // 1. Direct API Secret Key comparison (Timing-safe)
  if (secretKey && token.length === secretKey.length && timingSafeCompare(token, secretKey)) {
    req.user = {
      username: 'master_admin',
      role: 'admin',
      authenticatedAt: new Date().toISOString()
    };
    return next();
  }

  // 2. Signed session token verification
  const decodedToken = verifyAdminToken(token);
  if (decodedToken && decodedToken.role === 'admin') {
    req.user = {
      username: decodedToken.username || config.adminUsername,
      role: decodedToken.role,
      authenticatedAt: new Date(decodedToken.iat || Date.now()).toISOString()
    };
    return next();
  }

  return res.status(403).json({
    success: false,
    error: 'Forbidden',
    message: 'Invalid, malformed, or expired admin credentials.'
  });
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
