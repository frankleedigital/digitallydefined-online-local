// src/features/quiz/api/quizApi.js — quiz delivery via backend-clean dispatch.
//
// Personalization is local and deterministic (see ../lib/quizLogic.js).
// Delivery (persist + email) is routed through the DigitallyDefined backend
// dispatcher so quiz data lands in Supabase and Brevo from one place.

import { postBackend } from '../../../api/backend.js';
import { getRoadmap } from '../lib/roadmapData.js';

/**
 * Deliver the completed quiz: store the lead + roadmap, send the email.
 * Non-fatal by design — the on-screen result is already complete.
 */
export async function submitQuiz({ name, email, superpower, answers, roadmap, devMode, brevoTest, testEmail }) {
  const data = await postBackend('/dispatch', {
    action: 'quiz.complete',
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

/** Fetch a previously stored roadmap for an email (backend quiz_roadmaps). */
export async function fetchRoadmap(email) {
  const data = await postBackend('/dispatch', {
    action: 'quiz.roadmap',
    email,
  });
  return data;
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
