// src/api/backend.js — calls to the DigitallyDefined backend gateway
// https://digitallydefined-backend-clean.vercel.app/api/<endpoint>

import { config } from '../config/appConfig.js';

export const BACKEND_BASE_URL = config.backendUrl;

/**
 * Maps each agent/tool to its real backend endpoint.
 * The backend exposes named routes (POST /api/niche, /api/roadmap, ...),
 * so payloads are built per endpoint and responses normalized for the UI.
 */
export const ENDPOINTS = {
  niche: {
    path: '/niche',
    build: (i = {}) => ({
      topic: i.niche || i.topic || i.nicheName || i.query || '',
      context: i.context || undefined,
      mode: i.mode || undefined,
    }),
    normalize: (d) => ({
      ...d,
      summary: d.summary || d.overview || '',
      nextAction: (d.recommendations && d.recommendations[0]) || d.nextAction || '',
    }),
  },
  roadmap: {
    path: '/roadmap',
    build: (i = {}) => ({
      niche: i.niche || i.nicheName || '',
      targetAudience: i.targetAudience || i.audience || undefined,
      goals: i.goals || undefined,
      timelineWeeks: i.timelineWeeks || undefined,
      budget: i.budget || undefined,
      priority: i.priority || undefined,
      mode: i.mode || undefined,
    }),
    normalize: (d) => ({
      ...d,
      summary: d.summary || d.timeline || '',
      nextAction: (d.nextSteps && d.nextSteps[0]) || d.nextAction || '',
    }),
  },
  scorecard: {
    path: '/scorecard',
    build: (i = {}) => ({
      niche: i.niche || i.nicheName || '',
      businessName: i.businessName || undefined,
      metrics: i.scores || i.metrics || undefined,
      dimensions: i.dimensions || undefined,
      mode: i.mode || undefined,
    }),
    normalize: (d) => ({
      ...d,
      summary: d.summary || (d.strengths && d.strengths.join(' ')) || `Overall score ${d.overallScore ?? 'n/a'} (${d.grade || 'n/a'}).`,
      nextAction: (d.recommendations && d.recommendations[0]) || d.nextAction || '',
    }),
  },
  product: {
    path: '/product',
    build: (i = {}) => ({
      niche: i.niche || i.nicheName || '',
      productType: i.productType || undefined,
      format: i.format || undefined,
      priceRange: i.priceRange || undefined,
      mode: i.mode || undefined,
    }),
    normalize: (d) => ({
      ...d,
      summary: d.summary || d.pitch || '',
      nextAction: (d.launchPlan && d.launchPlan[0]) || d.nextAction || '',
    }),
  },
  social: {
    path: '/social',
    build: (i = {}) => ({
      niche: i.niche || i.nicheName || '',
      platform: i.platform || undefined,
      tone: i.tone || undefined,
      count: i.count || undefined,
      mode: i.mode || undefined,
    }),
    normalize: (d) => ({
      ...d,
      summary: d.summary || `Generated ${(d.posts && d.posts.length) || 0} posts for ${d.platform || 'your platform'}.`,
      nextAction: (d.recommendations && d.recommendations[0]) || d.nextAction || '',
    }),
  },
  trends: {
    path: '/trends',
    build: (i = {}) => ({
      niche: i.niche || i.nicheName || '',
      timeframe: i.timeframe || undefined,
      platforms: i.platforms || undefined,
      mode: i.mode || undefined,
    }),
    normalize: (d) => ({
      ...d,
      summary: d.summary || `Rising topics: ${((d.risingTopics || []).slice(0, 3).join(', ')) || 'none found'}.`,
      nextAction: (d.recommendedActions && d.recommendedActions[0]) || d.nextAction || '',
    }),
  },
  chat: {
    path: '/chat',
    build: (i = {}) => ({
      message: i.message || '',
      history: i.history || undefined,
      systemPrompt: i.systemPrompt || undefined,
      mode: i.mode || undefined,
    }),
    normalize: (d) => ({ ...d, summary: d.summary || d.reply || '' }),
  },
  dashboard: {
    path: '/dashboard',
    build: (i = {}) => ({ context: i.context || undefined }),
    normalize: (d) => d,
  },
};

/** Low-level POST to a backend endpoint with the shared API key. */
export async function postBackend(endpoint, body = {}) {
  const url = `${BACKEND_BASE_URL}${endpoint}`;
  const apiKey = config.dashboardApiKey;

  if (!apiKey && import.meta.env.DEV) {
    console.warn('[backend] VITE_DASHBOARD_API_KEY is not set. Backend calls will return 401.');
  }

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(apiKey ? { 'x-api-key': apiKey } : {}),
    },
    body: JSON.stringify(body),
  });

  const raw = await res.text();
  let json = {};
  try { json = raw ? JSON.parse(raw) : {}; } catch { json = {}; }

  if (!res.ok) {
    const message = (json && (json.error || json.details)) || `Backend request failed: ${res.status}`;
    throw new Error(typeof message === 'string' ? message : JSON.stringify(message));
  }
  if (json && json.ok === false) {
    throw new Error(json.error || 'Backend request failed');
  }
  return json;
}

/**
 * Call a backend agent/tool by name.
 * Returns the frontend contract shape: { success: true, data }.
 */
export async function callAgentEndpoint(agentName, inputData = {}) {
  const key = String(agentName).replace(/^agent\./, '').replace(/^fastapi\./, '');
  const spec = ENDPOINTS[key];
  if (!spec) throw new Error(`Unknown backend endpoint: ${agentName}`);

  const body = spec.build(inputData);
  const json = await postBackend(spec.path, body);
  return { success: true, data: spec.normalize(json), provider: json.provider, model: json.model };
}

/** Backwards-compatible alias used by older feature code. */
export const callFastAPI = callAgentEndpoint;

/** Action-name map kept for compatibility with legacy call sites. */
export const FASTAPI_ACTIONS = Object.keys(ENDPOINTS).reduce((acc, key) => {
  acc[key] = `agent.${key}`;
  return acc;
}, {});

export default { callFastAPI, callAgentEndpoint, postBackend, ENDPOINTS, FASTAPI_ACTIONS, BACKEND_BASE_URL };
