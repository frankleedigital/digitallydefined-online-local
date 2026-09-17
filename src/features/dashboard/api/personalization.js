// lib/personalization.js — Hermes Optimization Loop frontend helpers
// Calls the Node backend routes added in Phase 2:
//   /api/personalize   — personalization data
//   /api/events        — behavioral event beacon
//   /api/optimization  — high-demand patterns + clustering
//   /api/report        — weekly "Build Next" report
// Graceful fallback: returns null/empty when no profile exists.

import { callSupabaseEdge } from './supabase-edge';

/** Fetch personalization for a given resultKey (quiz/scorecard ID) */
export async function fetchPersonalization(resultKey) {
  try {
    const res = await callSupabaseEdge('personalize', { resultKey });
    return res?.data?.personalization || null;
  } catch {
    return null; // silent fallback — never breaks the UI
  }
}

/** Track a behavioral event (page view, drop-off, conversion) */
export async function trackEvent(event, page, extra = {}) {
  try {
    await callSupabaseEdge('events', { event, page, ...extra });
  } catch {
    /* noop — event loss is not fatal */
  }
}

/** Fetch high-demand patterns (trending niches, favorite tools, etc.) */
export async function fetchHighDemand(resultKey) {
  try {
    const res = await callSupabaseEdge('optimization', { resultKey });
    return res?.data || null;
  } catch {
    return null;
  }
}

/** Fetch the weekly "Build Next" report */
export async function fetchWeeklyReport(resultKey) {
  try {
    const res = await callSupabaseEdge('report', { resultKey });
    return res?.data?.report || null;
  } catch {
    return null;
  }
}

export default { fetchPersonalization, trackEvent, fetchHighDemand, fetchWeeklyReport };
