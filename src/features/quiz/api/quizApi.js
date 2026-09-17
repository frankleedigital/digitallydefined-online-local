// src/features/quiz/api/quizApi.js — quiz submission and roadmap fetching

import { callSupabaseEdge } from '../../../api/supabase.js';
import { callAgent } from '../../../api/client.js';
import { getRoadmap } from '../lib/roadmapData.js';

export const QUIZ_SCHEMA = {
  superpower_summary: 'string',
  strengths: ['string'],
  weaknesses: ['string'],
  preferred_content_style: 'string',
  preferred_business_model: 'string',
  confidence_level: 'number',
  experience_level: 'string',
  interests: ['string'],
  goals: ['string'],
  time_available: 'string',
  risk_tolerance: 'Low|Medium|High',
  working_style: 'Solo|Collaborative|Hybrid',
  persona_blockers: ['string'],
  persona_accelerators: ['string'],
  superpower_expression_modes: ['string'],
  competition_level: 'Low|Medium|High',
  trend_alignment: 'Low|Medium|High',
};

export const QUIZ_SYSTEM_PROMPT = `
You are Hermes, the Digital Superpower Interpreter for DigitallyDefined.

Your job:
- Read the user's quiz answers.
- Identify their digital superpower and persona.
- Summarize their strengths, weaknesses, style, and psychological drivers.
- Identify preferred content formats, business models, and working style.
- Identify blockers, accelerators, and risk tolerance.
- Output structured JSON only.
- Do NOT generate a roadmap yet.
- Tone: direct, practical, faceless, no hype.

Rules:
- Never say the user is "definitely" anything.
- Use "signals," "patterns," "indicators," "tendencies."
- Be specific, strategic, and practical.
- Return JSON only.
`;

/** Submit the quiz: scores, stores, generates roadmap, sends email. */
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

/** Fetch AI-powered personalization for quiz results. */
export async function fetchIntelligence({ userId, answers }) {
  return callSupabaseEdge('intelligence', { userId, answers });
}

/** Fetch stored roadmap for an email (from Supabase quiz_roadmaps table). */
export async function fetchRoadmap(email) {
  return callSupabaseEdge('quiz.roadmap', { email });
}

export default { submitQuiz, fetchIntelligence, fetchRoadmap, getRoadmap };
