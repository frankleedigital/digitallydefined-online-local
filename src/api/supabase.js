const REQUEST_CACHE = new Map();
const REQUEST_TIMEOUT_MS = 15000;

export const getSupabaseEdgeUrl = () => {
  const baseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://dijjlppdljpcgyoakdnq.supabase.co';
  return `${baseUrl}/functions/v1/hermes`;
};

export const getSupabaseEdgeHeaders = (extra = {}) => {
  const apiKey = import.meta.env.VITE_DASHBOARD_API_KEY;
  if (!apiKey && import.meta.env.DEV) {
    console.warn('[supabase-edge] VITE_DASHBOARD_API_KEY is not set.');
  }
  return {
    'Content-Type': 'application/json',
    ...(apiKey ? { 'x-api-key': apiKey } : {}),
    ...extra,
  };
};

/** Call the Hermes edge function with an action and payload. */
export async function callSupabaseEdge(action, payload = {}, extraHeaders = {}, signal) {
  const requestKey = JSON.stringify({
    action,
    payload,
    extraHeaders: Object.keys(extraHeaders).sort().reduce((acc, key) => {
      acc[key] = extraHeaders[key];
      return acc;
    }, {}),
  });

  if (REQUEST_CACHE.has(requestKey)) {
    return REQUEST_CACHE.get(requestKey);
  }

  const request = (async () => {
    const controller = signal ? null : new AbortController();
    const timeoutId = controller ? setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS) : undefined;

    try {
      const res = await fetch(getSupabaseEdgeUrl(), {
        method: 'POST',
        headers: getSupabaseEdgeHeaders(extraHeaders),
        body: JSON.stringify({ action, ...payload }),
        signal: signal ?? controller?.signal,
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || `Request failed: ${res.status}`);
      }

      return res.json();
    } finally {
      if (timeoutId) clearTimeout(timeoutId);
      REQUEST_CACHE.delete(requestKey);
    }
  })();

  REQUEST_CACHE.set(requestKey, request);
  return request;
}

export default { getSupabaseEdgeUrl, getSupabaseEdgeHeaders, callSupabaseEdge };
