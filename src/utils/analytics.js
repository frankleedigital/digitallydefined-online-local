const BACKEND_URL = (typeof import.meta !== 'undefined' && import.meta.env?.VITE_BACKEND_URL) || 'https://digitallydefined-backend-clean.vercel.app';
const ENDPOINT = `${BACKEND_URL.replace(/\/+$/, '')}/api/analytics`;
const SESSION_KEY = 'dd_session_id';
const SESSION_START_KEY = 'dd_session_start';

let queue = [];
let initialized = false;
let maxScrollDepth = 0;
let flushLock = false;
let flushPromise = null;
let refreshHandle = null;
let cachedSessionId = null;
let cachedSessionStart = 0;
let lastPageViewKey = null;

const getSessionId = () => {
  if (cachedSessionId) return cachedSessionId;

  try {
    const stored = window.localStorage.getItem(SESSION_KEY);
    if (stored) {
      cachedSessionId = stored;
      cachedSessionStart = Number(window.localStorage.getItem(SESSION_START_KEY) || Date.now());
      return cachedSessionId;
    }

    cachedSessionId = `s_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
    cachedSessionStart = Date.now();
    window.localStorage.setItem(SESSION_KEY, cachedSessionId);
    window.localStorage.setItem(SESSION_START_KEY, String(cachedSessionStart));
    return cachedSessionId;
  } catch {
    cachedSessionId = `s_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
    cachedSessionStart = Date.now();
    return cachedSessionId;
  }
};

export function trackEvent(eventType, metadata = {}) {
  const page = metadata.page || (typeof window !== 'undefined' ? window.location.pathname : '/');
  const event = {
    event_type: eventType,
    page,
    session_id: getSessionId(),
    url: typeof window !== 'undefined' ? window.location.href : undefined,
    referrer: typeof document !== 'undefined' ? document.referrer || null : null,
    metadata,
    ...(metadata.email ? { email: metadata.email } : {}),
  };

  if (eventType === 'page_view') {
    const nextKey = `${page}:${window.location.href}`;
    if (lastPageViewKey === nextKey) return;
    lastPageViewKey = nextKey;
  }

  queue.push(event);
  if (queue.length >= 8) flush();
}

export function flush(useBeacon = false) {
  if (!queue.length || flushLock) return;

  flushLock = true;
  const events = queue.splice(0, queue.length);
  const body = JSON.stringify({ action: 'track', events });

  flushPromise = Promise.resolve()
    .then(() => {
      try {
        const apiKey = import.meta.env.VITE_DASHBOARD_API_KEY;
        const headers = {
          'Content-Type': 'application/json',
          ...(apiKey ? { 'x-api-key': apiKey } : {}),
        };

        if (useBeacon && typeof navigator.sendBeacon === 'function') {
          const sent = navigator.sendBeacon(ENDPOINT, new Blob([body], { type: 'application/json' }));
          if (!sent) {
            queue.unshift(...events);
          }
          return;
        }

        const requestSignal = typeof AbortSignal !== 'undefined' && AbortSignal.timeout ? AbortSignal.timeout(12000) : undefined;
        return fetch(ENDPOINT, {
          method: 'POST',
          headers,
          body,
          keepalive: true,
          ...(requestSignal ? { signal: requestSignal } : {}),
        }).catch(() => {
          queue.unshift(...events);
        });
      } catch {
        queue.unshift(...events);
        return null;
      }
    })
    .finally(() => {
      flushLock = false;
      flushPromise = null;
      if (queue.length >= 8) flush(useBeacon);
    });
}

export function trackPageView(page) {
  maxScrollDepth = 0;
  trackEvent('page_view', { page: page || (typeof window !== 'undefined' ? window.location.pathname : '/') });
}

export const trackQuizStart = (source) => trackEvent('quiz_start', { source });
export const trackQuizComplete = ({ email, superpower } = {}) => trackEvent('quiz_complete', { email, superpower });
export const trackProductInterest = (productName, extra = {}) => trackEvent('product_interest', { product_name: productName, ...extra });
export const trackFormSubmit = ({ formName, email, funnel_step } = {}) => trackEvent('form_submit', { form_name: formName, ...(email ? { email, funnel_step } : {}) });

export function initTracking() {
  if (initialized || typeof window === 'undefined') return;
  initialized = true;
  getSessionId();
  trackEvent('session_start', { referrer: document.referrer || null });
  trackPageView();

  if (refreshHandle) window.clearInterval(refreshHandle);
  refreshHandle = window.setInterval(() => flush(), 30000);
  window.addEventListener('pagehide', () => flush(true));
  window.addEventListener('beforeunload', () => flush(true));
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') flush(true);
  });
}

export default { initTracking, trackEvent, trackPageView, trackQuizStart, trackQuizComplete, flush };
