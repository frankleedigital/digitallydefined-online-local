/**
 * lib/fastapi.js
 * Online-local → backend `/api` → FastAPI microservice layer.
 *
 * FastAPI owns the microservice tools (niche, roadmap, asset-plan, offer-architect,
 * wealth, product, domain, affiliate, rankrent, blueprint, trends). It is reached
 * through the backend proxy (action: fastapi.X) — NOT through Supabase, because
 * Supabase edge functions cannot reach the Python FastAPI server.
 */
import { getSupabaseEdgeHeaders } from './supabase-edge';

const DEFAULT_BACKEND = 'https://digitallydefined-os-backend.vercel.app/api';

export const FASTAPI_ACTIONS = {
  niche: 'fastapi.niche',
  roadmap: 'fastapi.roadmap',
  'asset-plan': 'fastapi.asset-plan',
  'offer-architect': 'fastapi.offer-architect',
  wealth: 'fastapi.wealth',
  product: 'fastapi.product',
  domain: 'fastapi.domain',
  affiliate: 'fastapi.affiliate',
  rankrent: 'fastapi.rankrent',
  blueprint: 'fastapi.blueprint',
  trends: 'fastapi.trends',
};

// Translate UI-field payloads into the FastAPI request shape for known tools.
// Unknown tools pass through unchanged (no mapping needed).
function normalizeRequest(agentName, input) {
  const source = input || {};
  switch (agentName) {
    case 'niche': {
      const topic = source.niche || source.query || source.topic || '';
      return {
        niche: topic,
        keywords: source.keywords && source.keywords.length ? source.keywords : (topic ? [topic] : []),
        evidence: source.evidence || '',
      };
    }
    case 'roadmap':
    case 'asset-plan':
    case 'offer-architect':
    case 'wealth':
    case 'product':
    case 'domain':
    case 'affiliate':
    case 'rankrent':
    case 'blueprint':
    case 'trends':
    default:
      return source;
  }
}

// Translate FastAPI response fields into the UI's expected shape.
function normalizeResponse(agentName, data) {
  const d = (data && typeof data === 'object') ? data : {};
  switch (agentName) {
    case 'roadmap':
    case 'asset-plan':
    case 'offer-architect':
      return {
        ...d,
        estimatedTime: d.estimatedTime ?? d.estimated_time,
        nextAction: d.nextAction ?? d.next_action,
      };
    default:
      return d;
  }
}

/**
 * Call a FastAPI microservice through the backend proxy.
 * Returns the frontend agent contract shape: { success: true, data }.
 */
export async function callFastAPI(agentName, inputData = {}) {
  const action = FASTAPI_ACTIONS[agentName] || (agentName.startsWith('fastapi.') ? agentName : `fastapi.${agentName}`);
  const base = (import.meta.env.VITE_DASHBOARD_API_URL || DEFAULT_BACKEND).replace(/\/+$/, '');

  const res = await fetch(`${base}/`, {
    method: 'POST',
    headers: getSupabaseEdgeHeaders(),
    body: JSON.stringify({ action, inputData: normalizeRequest(agentName, inputData) }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error((err && err.error) || (err && err.detail) || `FastAPI request failed: ${res.status}`);
  }

  const json = await res.json();
  if (json && json.ok === false) {
    throw new Error(json.error || 'FastAPI request failed');
  }
  return { success: true, data: normalizeResponse(agentName, json) };
}

export default { callFastAPI, FASTAPI_ACTIONS };