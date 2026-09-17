// src/utils/analytics.js — event tracking (migrated from lib/tracking.js)

const BACKEND_URL = (typeof import.meta !== 'undefined' && import.meta.env?.VITE_BACKEND_URL) || 'https://digitallydefined-backend-clean.vercel.app';
const ENDPOINT = `${BACKEND_URL.replace(/\/+$/, '')}/api/analytics`;
const SESSION_KEY = 'dd_session_id';
const SESSION_START_KEY = 'dd_session_start';

let queue = [];
let initialized = false;
let maxScrollDepth = 0;

const getSessionId = () => {
  let id = null;
  try {
    id = window.localStorage.getItem(SESSION_KEY);
    if (!id) {
      id = `s_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
      window.localStorage.setItem(SESSION_KEY, id);
      window.localStorage.setItem(SESSION_START_KEY, String(Date.now()));
    }
  } catch { id = `s_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`; }
  return id;
};

export function trackEvent(eventType, metadata = {}) {
  const event = {
    event_type: eventType,
    page: metadata.page || (typeof window !== 'undefined' ? window.location.pathname : '/'),
    session_id: getSessionId(),
    url: typeof window !== 'undefined' ? window.location.href : undefined,
    referrer: typeof document !== 'undefined' ? document.referrer || null : null,
    metadata,
    ...(metadata.email ? { email: metadata.email } : {}),
  };
  queue.push(event);
  if (queue.length >= 8) flush();
}

export function flush(useBeacon = false) {
  if (!queue.length) return;
  const events = queue.splice(0, queue.length);
  const body = JSON.stringify({ action: 'track', events });
  try {
    const apiKey = import.meta.env.VITE_DASHBOARD_API_KEY;
    if (useBeacon && typeof navigator.sendBeacon === 'function') {
      navigator.sendBeacon(ENDPOINT, new Blob([body], { type: 'application/json' }));
      return;
    }
    fetch(ENDPOINT, { method: 'POST', headers: { 'Content-Type': 'application/json', ...(apiKey ? { 'x-api-key': apiKey } : {}) }, body, keepalive: true }).catch(() => {});
  } catch {}
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
  setInterval(() => flush(), 8000);
}

export default { initTracking, trackEvent, trackPageView, trackQuizStart, trackQuizComplete, flush };
