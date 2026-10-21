/**
 * In-Memory LRU/TTL Query Cache for Expensive Database Queries
 * Fulfills Performance #17: Cache expensive queries
 */

export class QueryCache {
  constructor(defaultTtlSeconds = 60, maxSize = 200) {
    this.cache = new Map();
    this.defaultTtl = defaultTtlSeconds * 1000;
    this.maxSize = maxSize;
  }

  generateKey(query, params = []) {
    return `${query}:${JSON.stringify(params)}`;
  }

  get(key) {
    const item = this.cache.get(key);
    if (!item) return null;

    if (Date.now() > item.expiry) {
      this.cache.delete(key);
      return null;
    }

    // Refresh position for LRU
    this.cache.delete(key);
    this.cache.set(key, item);
    return item.value;
  }

  set(key, value, ttlSeconds = null) {
    if (this.cache.size >= this.maxSize) {
      // Evict oldest entry
      const firstKey = this.cache.keys().next().value;
      this.cache.delete(firstKey);
    }

    const ttl = ttlSeconds ? ttlSeconds * 1000 : this.defaultTtl;
    this.cache.set(key, {
      value,
      expiry: Date.now() + ttl
    });
  }

  invalidate(prefix = '') {
    if (!prefix) {
      this.cache.clear();
      return;
    }
    for (const key of this.cache.keys()) {
      if (key.startsWith(prefix)) {
        this.cache.delete(key);
      }
    }
  }

  /**
   * Helper that checks cache or runs the expensive query callback
   */
  async cachedExecute(query, params, fn, ttlSeconds = null) {
    const key = this.generateKey(query, params);
    const cached = this.get(key);
    if (cached !== null) {
      return { data: cached, fromCache: true };
    }

    const result = await fn();
    this.set(key, result, ttlSeconds);
    return { data: result, fromCache: false };
  }
}

export const queryCache = new QueryCache();
export default queryCache;
