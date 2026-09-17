// src/features/roadmap/api/roadmapApi.js
// Fetches a stored roadmap by email from the Supabase edge function.

import { callSupabaseEdge } from '../../../api/supabase.js';

export async function fetchRoadmapByEmail(email) {
  if (!email) return null;
  try {
    return await callSupabaseEdge('quiz.roadmap', { email });
  } catch {
    return null;
  }
}

export default { fetchRoadmapByEmail };
