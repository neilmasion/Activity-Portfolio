import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { fileURLToPath } from 'url';
import { Redis } from '@upstash/redis';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize Redis via Redis.fromEnv() or explicit URL/token
const hasRedisEnv = Boolean(
  process.env.UPSTASH_REDIS_REST_URL ||
  process.env.KV_REST_API_URL
);

let redis = null;

if (hasRedisEnv) {
  try {
    // Standard Upstash / Vercel KV SDK initialization
    redis = Redis.fromEnv();
    console.log('⚡ [STORAGE] Connected to Upstash Redis / Vercel KV via Redis.fromEnv()');
  } catch {
    // Fallback to explicit environment variable names if fromEnv didn't match
    const kvUrl = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
    const kvToken = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;

    if (kvUrl && kvToken) {
      try {
        redis = new Redis({
          url: kvUrl,
          token: kvToken
        });
        console.log('⚡ [STORAGE] Connected to Vercel KV via explicit credentials');
      } catch (err) {
        console.warn('⚠️ [STORAGE WARNING] Failed to initialize Redis:', err.message);
      }
    }
  }
}

if (!redis) {
  console.log('⚡ [STORAGE] Running on local JSON file storage (Backend/data)');
}

const isVercel = Boolean(process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME);
const dataDir = isVercel ? '/tmp/data' : path.resolve(__dirname, '../data');
const messagesFile = path.resolve(dataDir, 'messages.json');
const visitsFile = path.resolve(dataDir, 'visits.json');

function assertSafePath(targetPath) {
  const resolved = path.resolve(targetPath);
  if (!resolved.startsWith(dataDir)) {
    throw new Error('Directory traversal attempt detected in database file path.');
  }
}

function parseUserAgent(ua = '') {
  const u = (ua || '').toLowerCase();
  let device = 'Desktop';
  if (/ipad|tablet|(android(?!.*mobile))/i.test(u)) device = 'Tablet';
  else if (/mobile|iphone|ipod|blackberry|opera mini|iemobile/i.test(u)) device = 'Mobile';

  let browser = 'Other';
  if (/edg\//i.test(u)) browser = 'Edge';
  else if (/opr\/|opera/i.test(u)) browser = 'Opera';
  else if (/chrome|crios/i.test(u)) browser = 'Chrome';
  else if (/firefox|fxios/i.test(u)) browser = 'Firefox';
  else if (/safari/i.test(u)) browser = 'Safari';

  let os = 'Other';
  if (/windows/i.test(u)) os = 'Windows';
  else if (/macintosh|mac os x/i.test(u)) os = 'macOS';
  else if (/android/i.test(u)) os = 'Android';
  else if (/iphone|ipad|ipod/i.test(u)) os = 'iOS';
  else if (/linux/i.test(u)) os = 'Linux';

  return { device, browser, os };
}

function parseReferrer(ref = '') {
  if (!ref || ref === 'null' || ref === 'undefined') return 'Direct';
  try {
    const host = new URL(ref).hostname.replace(/^www\./, '');
    if (host.includes('localhost') || host.includes('127.0.0.1')) return 'Direct';
    if (host.includes('google')) return 'Google';
    if (host.includes('github')) return 'GitHub';
    if (host.includes('linkedin')) return 'LinkedIn';
    if (host.includes('t.co') || host.includes('twitter') || host.includes('x.com')) return 'X / Twitter';
    if (host.includes('facebook') || host.includes('fb.me')) return 'Facebook';
    return host;
  } catch {
    return 'Direct';
  }
}

const KV_KEYS = {
  MESSAGES: 'portfolio:messages',
  ANALYTICS: 'portfolio:analytics'
};

class HybridDatabase {
  constructor() {
    this.messages = [];
    this.visits = [];
    this.dailyCounts = {};
    this.uniqueVisitorsSet = new Set();
    this.idIndex = new Map();
    this.emailIndex = new Map();
    this.initLocal();
  }

  initLocal() {
    try {
      if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });

      assertSafePath(messagesFile);
      if (!fs.existsSync(messagesFile)) {
        fs.writeFileSync(messagesFile, JSON.stringify([], null, 2), 'utf-8');
      }

      assertSafePath(visitsFile);
      if (!fs.existsSync(visitsFile)) {
        fs.writeFileSync(visitsFile, JSON.stringify({ visits: [], dailyCounts: {} }, null, 2), 'utf-8');
      }

      this.loadLocal();
    } catch (err) {
      console.warn('Database initialization warning:', err.message);
    }
  }

  loadLocal() {
    this.loadLocalMessages();
    this.loadLocalVisits();
  }

  loadLocalMessages() {
    try {
      assertSafePath(messagesFile);
      if (fs.existsSync(messagesFile)) {
        const raw = fs.readFileSync(messagesFile, 'utf-8');
        this.messages = JSON.parse(raw || '[]');
        this.messages.forEach(msg => { if (!msg.status) msg.status = 'unread'; });
        this.rebuildIndices();
      }
    } catch {
      // Keep existing memory
    }
  }

  loadLocalVisits() {
    try {
      assertSafePath(visitsFile);
      if (fs.existsSync(visitsFile)) {
        const raw = fs.readFileSync(visitsFile, 'utf-8');
        const data = JSON.parse(raw || '{}');
        this.visits = Array.isArray(data.visits) ? data.visits : [];
        this.dailyCounts = data.dailyCounts || {};
        this.uniqueVisitorsSet = new Set(this.visits.map(v => v.visitorId).filter(Boolean));
      }
    } catch {
      this.visits = [];
      this.dailyCounts = {};
    }
  }

  rebuildIndices() {
    this.idIndex.clear();
    this.emailIndex.clear();
    for (const msg of this.messages) {
      this.idIndex.set(msg.id, msg);
      const ek = msg.email ? msg.email.toLowerCase() : '';
      if (ek) {
        if (!this.emailIndex.has(ek)) this.emailIndex.set(ek, []);
        this.emailIndex.get(ek).push(msg);
      }
    }
  }

  persistLocalMessages() {
    try {
      assertSafePath(messagesFile);
      const tmp = `${messagesFile}.tmp.${Date.now()}`;
      fs.writeFileSync(tmp, JSON.stringify(this.messages, null, 2), 'utf-8');
      fs.renameSync(tmp, messagesFile);
    } catch (err) {
      console.warn('Persist messages failed:', err.message);
    }
  }

  persistLocalVisits() {
    try {
      assertSafePath(visitsFile);
      const tmp = `${visitsFile}.tmp.${Date.now()}`;
      fs.writeFileSync(tmp, JSON.stringify({
        visits: this.visits.slice(0, 500),
        dailyCounts: this.dailyCounts
      }, null, 2), 'utf-8');
      fs.renameSync(tmp, visitsFile);
    } catch (err) {
      console.warn('Persist visits failed:', err.message);
    }
  }

  // ==========================================
  // MESSAGES OPERATIONS (Vercel KV + Local)
  // ==========================================

  async insertMessage(msg) {
    const normalized = { ...msg, status: msg.status || 'unread' };

    if (redis) {
      try {
        const currentList = (await redis.get(KV_KEYS.MESSAGES)) || [];
        currentList.unshift(normalized);
        await redis.set(KV_KEYS.MESSAGES, currentList);
        return normalized;
      } catch (err) {
        console.error('Vercel KV insertMessage error, falling back to local file:', err.message);
      }
    }

    // Local file fallback
    this.messages.unshift(normalized);
    this.rebuildIndices();
    this.persistLocalMessages();
    return normalized;
  }

  async updateMessageStatus(id, status = 'read') {
    if (redis) {
      try {
        const currentList = (await redis.get(KV_KEYS.MESSAGES)) || [];
        const target = currentList.find(m => m.id === id);
        if (target) {
          target.status = status;
          await redis.set(KV_KEYS.MESSAGES, currentList);
          return target;
        }
        return null;
      } catch (err) {
        console.error('Vercel KV updateMessageStatus error, falling back to local:', err.message);
      }
    }

    // Local fallback
    this.loadLocalMessages();
    const target = this.idIndex.get(id);
    if (!target) return null;
    target.status = status;
    this.persistLocalMessages();
    return target;
  }

  async deleteMessage(id) {
    if (redis) {
      try {
        const currentList = (await redis.get(KV_KEYS.MESSAGES)) || [];
        const filtered = currentList.filter(m => m.id !== id);
        if (filtered.length !== currentList.length) {
          await redis.set(KV_KEYS.MESSAGES, filtered);
          return true;
        }
        return false;
      } catch (err) {
        console.error('Vercel KV deleteMessage error, falling back to local:', err.message);
      }
    }

    // Local fallback
    this.loadLocalMessages();
    const idx = this.messages.findIndex(m => m.id === id);
    if (idx === -1) return false;
    this.messages.splice(idx, 1);
    this.rebuildIndices();
    this.persistLocalMessages();
    return true;
  }

  async getMessages({ page = 1, limit = 20, email = null, search = '', status = null } = {}) {
    let source = [];

    if (redis) {
      try {
        source = (await redis.get(KV_KEYS.MESSAGES)) || [];
      } catch (err) {
        console.error('Vercel KV getMessages error, falling back to local:', err.message);
        this.loadLocalMessages();
        source = this.messages;
      }
    } else {
      this.loadLocalMessages();
      source = this.messages;
    }

    if (email) {
      source = source.filter(m => m.email && m.email.toLowerCase() === email.toLowerCase());
    }

    if (status && status !== 'all') {
      source = source.filter(m => m.status === status);
    }

    if (search && search.trim()) {
      const q = search.trim().toLowerCase();
      source = source.filter(m =>
        (m.name && m.name.toLowerCase().includes(q)) ||
        (m.email && m.email.toLowerCase().includes(q)) ||
        (m.projectType && m.projectType.toLowerCase().includes(q)) ||
        (m.message && m.message.toLowerCase().includes(q))
      );
    }

    const p = Math.max(1, parseInt(page, 10));
    const l = Math.min(100, Math.max(1, parseInt(limit, 10)));
    const total = source.length;
    const totalPages = Math.ceil(total / l) || 1;
    const offset = (p - 1) * l;

    return {
      items: source.slice(offset, offset + l),
      pagination: {
        page: p,
        limit: l,
        total,
        totalPages,
        hasNext: p < totalPages,
        hasPrev: p > 1
      }
    };
  }

  // ==========================================
  // VISITS & ANALYTICS (Vercel KV + Local)
  // ==========================================

  async recordVisit({ ip = '', userAgent = '', path = '/', referrer = '', visitorId = '' }) {
    const now = new Date();
    const dateKey = now.toISOString().split('T')[0];
    const rawId = visitorId || ip || 'unknown';
    const anonId = crypto.createHash('sha256').update(rawId + '_nm_salt').digest('hex').slice(0, 16);
    const { device, browser, os } = parseUserAgent(userAgent);

    const record = {
      id: `v_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
      timestamp: now.toISOString(),
      path: path.slice(0, 100),
      device,
      browser,
      os,
      referrer: parseReferrer(referrer),
      visitorId: anonId
    };

    if (redis) {
      try {
        const analyticsData = (await redis.get(KV_KEYS.ANALYTICS)) || {
          visits: [],
          dailyCounts: {},
          uniqueVisitors: []
        };

        if (!Array.isArray(analyticsData.visits)) analyticsData.visits = [];
        if (!analyticsData.dailyCounts) analyticsData.dailyCounts = {};
        if (!Array.isArray(analyticsData.uniqueVisitors)) analyticsData.uniqueVisitors = [];

        // Prepend visit record (keep recent 500)
        analyticsData.visits.unshift(record);
        if (analyticsData.visits.length > 500) analyticsData.visits.pop();

        // Daily counts
        if (!analyticsData.dailyCounts[dateKey]) {
          analyticsData.dailyCounts[dateKey] = { date: dateKey, visits: 0, unique: 0, uniqueSet: [] };
        }
        const day = analyticsData.dailyCounts[dateKey];
        day.visits = (day.visits || 0) + 1;
        if (!Array.isArray(day.uniqueSet)) day.uniqueSet = [];
        if (!day.uniqueSet.includes(anonId)) {
          day.uniqueSet.push(anonId);
          day.unique = day.uniqueSet.length;
        }

        // Global unique
        if (!analyticsData.uniqueVisitors.includes(anonId)) {
          analyticsData.uniqueVisitors.push(anonId);
        }

        await redis.set(KV_KEYS.ANALYTICS, analyticsData);
        return record;
      } catch (err) {
        console.error('Vercel KV recordVisit error, falling back to local:', err.message);
      }
    }

    // Local file fallback
    this.visits.unshift(record);
    if (this.visits.length > 500) this.visits.pop();

    if (!this.dailyCounts[dateKey]) {
      this.dailyCounts[dateKey] = { date: dateKey, visits: 0, unique: 0, uniqueSet: [] };
    }
    const day = this.dailyCounts[dateKey];
    day.visits++;
    if (!Array.isArray(day.uniqueSet)) day.uniqueSet = [];
    if (!day.uniqueSet.includes(anonId)) {
      day.uniqueSet.push(anonId);
      day.unique = day.uniqueSet.length;
    }
    this.uniqueVisitorsSet.add(anonId);
    this.persistLocalVisits();
    return record;
  }

  async getAnalyticsSummary() {
    const today = new Date().toISOString().split('T')[0];
    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];

    let dailyCounts = {};
    let visits = [];
    let uniqueVisitorsCount = 0;
    let messagesList = [];

    if (redis) {
      try {
        const [kvAnalytics, kvMessages] = await Promise.all([
          redis.get(KV_KEYS.ANALYTICS),
          redis.get(KV_KEYS.MESSAGES)
        ]);

        if (kvAnalytics) {
          dailyCounts = kvAnalytics.dailyCounts || {};
          visits = kvAnalytics.visits || [];
          uniqueVisitorsCount = Array.isArray(kvAnalytics.uniqueVisitors)
            ? kvAnalytics.uniqueVisitors.length
            : 0;
        }

        messagesList = kvMessages || [];
      } catch (err) {
        console.error('Vercel KV getAnalyticsSummary error, falling back to local:', err.message);
        this.loadLocal();
        dailyCounts = this.dailyCounts;
        visits = this.visits;
        uniqueVisitorsCount = this.uniqueVisitorsSet.size;
        messagesList = this.messages;
      }
    } else {
      this.loadLocal();
      dailyCounts = this.dailyCounts;
      visits = this.visits;
      uniqueVisitorsCount = this.uniqueVisitorsSet.size;
      messagesList = this.messages;
    }

    const todayData = dailyCounts[today] || { visits: 0, unique: 0 };
    const yesterdayData = dailyCounts[yesterday] || { visits: 0, unique: 0 };

    const totalVisits = Object.values(dailyCounts).reduce((a, c) => a + (c.visits || 0), 0);
    const totalEmails = messagesList.length;
    const unreadEmails = messagesList.filter(m => m.status === 'unread').length;

    // Last 7 days chart
    const dailyChart = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date(Date.now() - i * 86400000);
      const key = d.toISOString().split('T')[0];
      const label = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      const rec = dailyCounts[key];
      dailyChart.push({ date: key, label, visits: rec?.visits || 0, unique: rec?.unique || 0 });
    }

    // Devices, Browsers, Referrers breakdown
    const devices = {};
    const browsers = {};
    const referrers = {};
    for (const v of visits) {
      devices[v.device] = (devices[v.device] || 0) + 1;
      browsers[v.browser] = (browsers[v.browser] || 0) + 1;
      referrers[v.referrer] = (referrers[v.referrer] || 0) + 1;
    }

    return {
      storageMode: redis ? 'Vercel KV (Cloud Redis)' : 'Local File Storage',
      overview: {
        totalVisits,
        uniqueVisitors: uniqueVisitorsCount,
        todayVisits: todayData.visits,
        yesterdayVisits: yesterdayData.visits,
        totalEmails,
        unreadEmails
      },
      dailyChart,
      devices,
      browsers,
      referrers,
      recentVisits: visits.slice(0, 10)
    };
  }

  query(sqlText, params = []) {
    return { rows: this.messages, rowCount: this.messages.length };
  }
}

export const db = new HybridDatabase();
export default db;
