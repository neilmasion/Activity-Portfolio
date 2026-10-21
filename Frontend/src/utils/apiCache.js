/**
 * In-memory client-side API response cache with TTL and stale-while-revalidate capability
 */
class ApiCache {
  constructor(defaultTtlMs = 60000) {
    this.cache = new Map();
    this.defaultTtlMs = defaultTtlMs;
  }

  get(key) {
    const entry = this.cache.get(key);
    if (!entry) return null;

    const isExpired = Date.now() > entry.expiry;
    return {
      data: entry.data,
      isStale: isExpired
    };
  }

  set(key, data, ttlMs = this.defaultTtlMs) {
    this.cache.set(key, {
      data,
      expiry: Date.now() + ttlMs
    });
  }

  delete(key) {
    this.cache.delete(key);
  }

  clear() {
    this.cache.clear();
  }

  /**
   * Cached fetch with automatic caching and Stale-While-Revalidate
   */
  async fetchWithCache(url, options = {}, ttlMs = this.defaultTtlMs) {
    // Only cache GET requests
    const method = options.method ? options.method.toUpperCase() : 'GET';
    if (method !== 'GET') {
      return fetch(url, options);
    }

    const cached = this.get(url);
    if (cached && !cached.isStale) {
      return cached.data;
    }

    try {
      const response = await fetch(url, options);
      if (response.ok) {
        const json = await response.json();
        this.set(url, json, ttlMs);
        return json;
      }
      return cached ? cached.data : await response.json();
    } catch (err) {
      if (cached) {
        console.warn(`Serving stale cached data for ${url} due to network error:`, err);
        return cached.data;
      }
      throw err;
    }
  }
}

export const apiCache = new ApiCache();
export default apiCache;
