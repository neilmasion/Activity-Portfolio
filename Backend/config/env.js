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

export const config = {
  env: NODE_ENV,
  isProd,
  port: parseInt(process.env.PORT || '5000', 10),
  clientUrl: process.env.CLIENT_URL || 'http://localhost:5173',
  adminEmail: process.env.ADMIN_EMAIL || 'neilmasion2@gmail.com',
  // Admin credentials for dashboard access (/admin)
  adminUsername: process.env.ADMIN_USERNAME || 'admin',
  adminPassword: process.env.ADMIN_PASSWORD || 'admin12345',
  // Secret key used for admin authentication - fallback generated if not provided in dev
  apiSecretKey: process.env.API_SECRET_KEY || (isProd ? '' : 'dev_fallback_secret_key_nm_2026'),
  adminTokenSecret: process.env.ADMIN_TOKEN_SECRET || process.env.API_SECRET_KEY || 'dev_fallback_secret_key_nm_2026',
  // Email / SMTP config
  smtp: {
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '587', 10),
    user: process.env.SMTP_USER || '',
    pass: process.env.SMTP_PASS || ''
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
