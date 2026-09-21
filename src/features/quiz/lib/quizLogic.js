// src/features/quiz/lib/quizLogic.js
// Single entry point for the Digital Superpower Quiz result.
//
// Responsibilities:
//   1. build  — deterministic score + local personalization (no AI, no network)
//   2. store  — persist the fresh result so /results, /roadmap, /dashboard agree
//   3. heal   — upgrade older stored results that predate local personalization
//
// Why storage matters: the previous flow only saved a result when an AI call
// succeeded, so an old persona could stay on screen for every later visit.
// The result is now saved on every completion, and every page reads the same key.

import { personalizeQuiz } from './personalize.js';
import { getRoadmap } from './roadmapData.js';
import { getPersona } from './personas.js';
import { PERSONA_KEYS, isPersonaKey, toPersonaKey } from './scoring.js';

export const QUIZ_STORAGE_KEY = 'dd-quiz-results';

const STORAGE_VERSION = 2;

/** localStorage is unavailable during SSR and in strict privacy modes. */
function getStorage() {
  try {
    if (typeof window === 'undefined' || !window.localStorage) return null;
    return window.localStorage;
  } catch {
    return null;
  }
}

/**
 * Build a complete, personalized quiz result from answers.
 * @param {{ name?: string, email?: string, answers?: Record<string,string> }} input
 */
export function buildQuizResult({ name = '', email = '', answers = {} } = {}) {
  return personalizeQuiz({ name, email, answers });
}

/** Save the latest result. Returns the saved object (or the input if unsaved). */
export function saveQuizResult(result) {
  const storage = getStorage();
  if (!storage || !result) return result;
  try {
    storage.setItem(QUIZ_STORAGE_KEY, JSON.stringify({ ...result, storageVersion: STORAGE_VERSION }));
  } catch {
    /* quota or private mode — the result still renders from memory */
  }
  return result;
}

/** Read the stored result as-is (no healing). */
export function readQuizResult() {
  const storage = getStorage();
  if (!storage) return null;
  try {
    const raw = storage.getItem(QUIZ_STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

/** Remove the stored result (sign out / start over). */
export function clearQuizResult() {
  const storage = getStorage();
  if (!storage) return;
  try {
    storage.removeItem(QUIZ_STORAGE_KEY);
  } catch {
    /* nothing to clear */
  }
}

/**
 * Read the stored result and guarantee it has every personalized field the
 * pages render. Legacy entries (superpower only) are rebuilt from their own
 * answers, or from the persona template when no answers were stored.
 */
export function loadQuizResult() {
  const stored = readQuizResult();
  if (!stored) return null;
  return normalizeStoredResult(stored);
}

/** True when a quiz result exists in this browser. */
export function hasQuizResult() {
  return !!readQuizResult();
}

/** Build a persona-only result (used for public /roadmap/:type previews). */
export function buildPersonaPreview(personaKey) {
  const key = toPersonaKey(personaKey);
  if (!key) return null;
  const roadmap = getRoadmap(key);
  const persona = getPersona(key);
  if (!roadmap || !persona) return null;
  return {
    version: STORAGE_VERSION,
    source: 'persona-template',
    generatedAt: new Date().toISOString(),
    superpower: key,
    superpowerType: key,
    personaTitle: persona.title,
    superpowerName: persona.superpowerName || persona.title,
    tagline: persona.tagline,
    description: persona.description,
    overview: roadmap.overview,
    recommendedFirstStep: persona.recommendedFirstStep,
    toolPreference: persona.toolPreference,
    strengths: roadmap.strengths,
    blindSpots: roadmap.challenges,
    niches: roadmap.recommendedNiches,
    buildSequence: roadmap.firstSteps.map((title, index) => ({
      step: index + 1,
      title,
      timeframe: '',
      metric: '',
    })),
    tools: roadmap.toolsToUse,
    nextAction: roadmap.firstSteps[0] || '',
    nextActionReason: '',
    confidence: 0,
    confidenceScore: 0,
    confidenceLabel: 'Persona preview',
    personalized: false,
  };
}

/**
 * Normalize any stored result into the current render contract.
 * @param {object} stored
 */
export function normalizeStoredResult(stored) {
  if (!stored || typeof stored !== 'object') return null;

  const personaKey = toPersonaKey(stored.superpower || stored.superpowerType || stored.personaKey);

  // Fully personalized, current-shape result: return as-is.
  if (Array.isArray(stored.buildSequence) && stored.buildSequence.length > 0 && personaKey) {
    return { ...stored, superpower: personaKey, superpowerType: personaKey, personalized: true };
  }

  // Legacy entry with answers: recompute locally (this is the "stuck result" fix).
  if (stored.answers && Object.keys(stored.answers).length > 0) {
    return buildQuizResult({
      name: stored.name || '',
      email: stored.email || stored.userId || '',
      answers: stored.answers,
    });
  }

  // Legacy entry with only a persona: keep their saved persona, fill the copy.
  if (personaKey) {
    const preview = buildPersonaPreview(personaKey);
    return {
      ...preview,
      userId: stored.userId || '',
      name: stored.name || '',
      email: stored.email || stored.userId || '',
      answers: stored.answers || {},
      generatedAt: stored.generatedAt || preview.generatedAt,
    };
  }

  return null;
}

/** Validate a persona key coming from a URL segment. */
export function resolvePersonaParam(value) {
  const key = toPersonaKey(value);
  return isPersonaKey(key) ? key : null;
}

export { PERSONA_KEYS };

export default {
  QUIZ_STORAGE_KEY,
  buildQuizResult,
  saveQuizResult,
  readQuizResult,
  loadQuizResult,
  clearQuizResult,
  hasQuizResult,
  buildPersonaPreview,
  normalizeStoredResult,
  resolvePersonaParam,
};
