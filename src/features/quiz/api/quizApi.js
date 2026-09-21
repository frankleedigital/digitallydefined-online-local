// src/features/quiz/api/quizApi.js — quiz delivery (email + storage) only.
//
// Personalization is local and deterministic (see ../lib/quizLogic.js).
// The previous AI personalization call ("intelligence" edge action) has been
// removed: the result must render whether or not an AI provider is reachable.
//
// What is left here is optional delivery: record the lead, store the result and
// send the roadmap email. Every call is best-effort and never blocks the UI.

import { callSupabaseEdge } from '../../../api/supabase.js';
import { getRoadmap } from '../lib/roadmapData.js';

/**
 * Deliver the completed quiz: store the lead + roadmap, send the email.
 * Non-fatal by design — the on-screen result is already complete.
 */
export async function submitQuiz({ name, email, superpower, answers, roadmap, devMode, brevoTest, testEmail }) {
  const data = await callSupabaseEdge('quiz.complete', {
    name,
    email,
    superpower,
    answers,
    roadmap,
    source: 'digital-superpower-quiz',
    devMode,
    brevoTest,
    testEmail,
  });
  if (!data) throw new Error('Unable to save quiz result');
  return data;
}

/** Fetch a previously stored roadmap for an email (Supabase quiz_roadmaps). */
export async function fetchRoadmap(email) {
  return callSupabaseEdge('quiz.roadmap', { email });
}

/** Kept so older imports of QUIZ_SCHEMA resolve to the persona key list. */
export const QUIZ_SCHEMA = {
  superpowerType: 'builder|creator|educator|strategist|connector',
  confidenceScore: 'number',
  strengths: ['string'],
  blindSpots: ['string'],
  niches: ['string'],
  buildSequence: ['string'],
  nextAction: 'string',
};

export default { submitQuiz, fetchRoadmap, QUIZ_SCHEMA, getRoadmap };
