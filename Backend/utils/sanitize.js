/**
 * Server-side Input Sanitization, XSS Neutralization, and Data Masking Utilities
 * Fulfills:
 * - Security #7: Sanitize user inputs
 * - Security #8: Protect against XSS
 * - Security #24: No expose of user data in logs
 */

/**
 * Escapes HTML characters to prevent XSS injection
 */
export function escapeHtml(str) {
  if (typeof str !== 'string') return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
}

/**
 * Strips script tags, iframes, and dangerous executable script schemes
 */
export function sanitizeString(input, maxLength = 1000) {
  if (typeof input !== 'string') return '';
  const cleaned = input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
    .replace(/javascript:/gi, '')
    .replace(/on\w+="[^"]*"/gi, '')
    .replace(/on\w+='[^']*'/gi, '')
    .trim();
  
  return cleaned.slice(0, maxLength);
}

/**
 * Validates email strictly
 */
export function isValidEmail(email) {
  if (!email || typeof email !== 'string') return false;
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
  return emailRegex.test(email.trim()) && email.length <= 120;
}

/**
 * Masks email address for safe audit logging (e.g. n***n@gmail.com)
 * Fulfills Security #24: No expose of user data in server logs
 */
export function maskEmail(email) {
  if (!email || typeof email !== 'string') return '***@***.com';
  const parts = email.split('@');
  if (parts.length !== 2) return '***@***.com';
  const [name, domain] = parts;
  const maskedName = name.length > 2 
    ? `${name[0]}***${name[name.length - 1]}`
    : `${name[0]}*`;
  return `${maskedName}@${domain}`;
}
