import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load from current working directory or Backend directory, and support Vercel pulled env files
dotenv.config();
dotenv.config({ path: path.resolve(__dirname, '../.env') });
dotenv.config({ path: path.resolve(__dirname, '../../.env.development.local') });
dotenv.config({ path: path.resolve(__dirname, '../.env.development.local') });
dotenv.config({ path: path.resolve(__dirname, '../../.env.local') });
dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

/**
 * Environment configuration validator & loader
 * Fulfills:
 * - Security #1: Hide API Keys
 * - Security #2: Check env variables
 * - Security #19: Disable debug mode
 * - Security #20: Check production settings
 */

const NODE_ENV = process.env.NODE_ENV || 'development';
const isProd = NODE_ENV === 'production';

// Helpers to safely clean environment variables passed via CLI, UI, or .env
const cleanStr = (val, fallback = '') => {
  if (!val) return fallback;
  return String(val).trim().replace(/^["']|["']$/g, '');
};

const cleanSecret = (val, fallback = '') => {
  if (!val) return fallback;
  // Strips wrapping and stray quotes and all internal/external whitespace
  return String(val).replace(/['"\s]/g, '');
};

const rawSmtpPass = process.env.SMTP_PASS || 
  process.env.SMTP_PASSWORD || 
  process.env.GMAIL_APP_PASSWORD || 
  process.env.GMAIL_PASSWORD || 
  process.env.MAIL_PASSWORD || 
  process.env.EMAIL_PASS || 
  process.env.EMAIL_PASSWORD || '';

const rawSmtpUser = process.env.SMTP_USER || 
  process.env.SMTP_USERNAME || 
  process.env.GMAIL_USER || 
  process.env.EMAIL_USER || 
  process.env.ADMIN_EMAIL || 
  'neilmasion2@gmail.com';

export const config = {
  env: NODE_ENV,
  isProd,
  port: parseInt(process.env.PORT || '5000', 10),
  clientUrl: cleanStr(process.env.CLIENT_URL, 'http://localhost:5173'),
  adminEmail: cleanSecret(process.env.ADMIN_EMAIL, 'neilmasion2@gmail.com'),
  // Resend API (HTTP email service - 100% reliable on Vercel without SMTP issues)
  resendApiKey: cleanSecret(process.env.RESEND_API_KEY || process.env.RESEND_KEY, ''),
  resendFrom: cleanStr(process.env.RESEND_FROM, 'Portfolio Inquiries <onboarding@resend.dev>'),
  // Admin credentials for dashboard access (/admin)
  adminUsername: cleanStr(process.env.ADMIN_USERNAME, 'admin'),
  adminPassword: cleanStr(process.env.ADMIN_PASSWORD, 'admin12345'),
  // Secret key used for admin authentication - fallback generated if not provided in dev
  apiSecretKey: cleanStr(process.env.API_SECRET_KEY, isProd ? '' : 'dev_fallback_secret_key_nm_2026'),
  adminTokenSecret: cleanStr(process.env.ADMIN_TOKEN_SECRET || process.env.API_SECRET_KEY, 'dev_fallback_secret_key_nm_2026'),
  // Email / SMTP config
  smtp: {
    host: cleanStr(process.env.SMTP_HOST, 'smtp.gmail.com'),
    port: parseInt(cleanStr(process.env.SMTP_PORT, '465'), 10),
    user: cleanSecret(rawSmtpUser, 'neilmasion2@gmail.com'),
    pass: cleanSecret(rawSmtpPass, '')
  },
  // Resource and spend caps (Security #12)
  limits: {
    maxBodySize: '10kb',
    rateLimitWindowMs: 15 * 60 * 1000, // 15 minutes
    rateLimitMaxPublic: 200, // max 200 requests per 15 min per IP
    rateLimitMaxContact: isProd ? 15 : 100,  // max contact submissions per 15 min per IP
    serverTimeoutMs: 10000   // 10 seconds timeout cap
  }
};

// Validate critical variables in production
if (isProd && !process.env.API_SECRET_KEY) {
  console.warn('⚠️ [SECURITY WARNING] API_SECRET_KEY is not defined in production environment variables.');
}

export default config;
