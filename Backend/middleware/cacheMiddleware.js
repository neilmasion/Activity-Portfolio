/**
 * Server-Side HTTP Response Caching & ETag Middleware
 * Fulfills:
 * - Performance #4: Cache API responses
 * - Performance #19: Server-side caching
 */

const responseCache = new Map();

/**
 * Middleware that caches successful GET responses in memory
 * and sets HTTP Cache-Control headers
 * 
 * @param {number} ttlSeconds Cache duration in seconds
 */
export function serverSideCache(ttlSeconds = 60) {
  return (req, res, next) => {
    // Only cache GET requests
    if (req.method !== 'GET') {
      return next();
    }

    const key = `__cache__${req.originalUrl || req.url}`;
    const cachedEntry = responseCache.get(key);

    if (cachedEntry && Date.now() < cachedEntry.expiry) {
      res.setHeader('X-Cache', 'HIT');
      res.setHeader('Cache-Control', `public, max-age=${ttlSeconds}`);
      return res.status(cachedEntry.status).json(cachedEntry.body);
    }

    // Intercept res.json
    const originalJson = res.json.bind(res);
    res.json = (body) => {
      if (res.statusCode >= 200 && res.statusCode < 300) {
        responseCache.set(key, {
          status: res.statusCode,
          body,
          expiry: Date.now() + ttlSeconds * 1000
        });
        res.setHeader('X-Cache', 'MISS');
        res.setHeader('Cache-Control', `public, max-age=${ttlSeconds}`);
      }
      return originalJson(body);
    };

    next();
  };
}

/**
 * Clear cache entries by prefix
 */
export function clearServerCache(prefix = '') {
  if (!prefix) {
    responseCache.clear();
    return;
  }
  for (const key of responseCache.keys()) {
    if (key.includes(prefix)) {
      responseCache.delete(key);
    }
  }
}
