/**
 * Anonymous Visitor Tracking Utility for Neil Masion Portfolio Analytics
 * Privacy-friendly: Does not track personal data, cookies, or exact coordinates.
 */

const VISITOR_ID_KEY = 'nm_analytics_vid';
const SESSION_PINGED_KEY = 'nm_analytics_session_pinged';

export function getAnonymousVisitorId() {
  try {
    let vid = localStorage.getItem(VISITOR_ID_KEY);
    if (!vid) {
      vid = `v_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 9)}`;
      localStorage.setItem(VISITOR_ID_KEY, vid);
    }
    return vid;
  } catch {
    return `v_anon_${Math.random().toString(36).slice(2, 8)}`;
  }
}

export async function trackVisit(path = window.location.pathname) {
  // Prevent duplicate pings within the same tab reload if recently sent within 30 seconds
  try {
    const lastPing = sessionStorage.getItem(SESSION_PINGED_KEY);
    const now = Date.now();
    if (lastPing && now - parseInt(lastPing, 10) < 30000) {
      return;
    }
    sessionStorage.setItem(SESSION_PINGED_KEY, String(now));
  } catch {
    // Continue even if storage is restricted
  }

  try {
    const visitorId = getAnonymousVisitorId();
    const apiUrl = import.meta.env.VITE_API_URL || '/api';
    
    // Use sendBeacon if available, otherwise fetch
    const payload = JSON.stringify({
      path: path || '/',
      referrer: document.referrer || '',
      visitorId
    });

    if (navigator.sendBeacon) {
      const blob = new Blob([payload], { type: 'application/json' });
      navigator.sendBeacon(`${apiUrl}/analytics/visit`, blob);
    } else {
      fetch(`${apiUrl}/analytics/visit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest'
        },
        body: payload,
        keepalive: true
      }).catch(() => {});
    }
  } catch {
    // Fail silently
  }
}
