// src/features/quiz/lib/scoring.js
// Deterministic quiz scoring. No AI, no network, no randomness.
//
// Every answer maps to one of five persona keys. Scoring is a weighted tally:
// answers about the money model (q4) and the definition of success (q7) carry
// more weight than "what sounds like a good Saturday" (q2), because they
// describe the asset the person is actually willing to build.
//
// Tie-breaks are explicit so the same answers always produce the same result:
//   1. higher weighted total
//   2. higher raw count
//   3. canonical persona order (PERSONA_KEYS)

export const PERSONA_KEYS = ['builder', 'creator', 'educator', 'strategist', 'connector'];

/** Per-question weight. Questions 4 and 7 describe the business model. */
export const QUESTION_WEIGHTS = {
  q1: 1,
  q2: 1,
  q3: 1,
  q4: 2,
  q5: 1,
  q6: 1,
  q7: 2,
};

/**
 * Accepts stored or AI-shaped persona values ("The Strategist",
 * "Opportunity Scout", "STRATEGIST") and returns the canonical key.
 */
const PERSONA_ALIASES = {
  builder: 'builder',
  'the builder': 'builder',
  'digital architect': 'builder',
  creator: 'creator',
  'the creator': 'creator',
  'content alchemist': 'creator',
  educator: 'educator',
  'the educator': 'educator',
  'clarity catalyst': 'educator',
  strategist: 'strategist',
  'the strategist': 'strategist',
  'opportunity scout': 'strategist',
  connector: 'connector',
  'the connector': 'connector',
  'network weaver': 'connector',
};

/** Normalize any persona-shaped value to a canonical persona key (or null). */
export function toPersonaKey(value) {
  if (!value) return null;
  const normalized = String(value).trim().toLowerCase().replace(/[_-]+/g, ' ');
  return PERSONA_ALIASES[normalized] || null;
}

export function isPersonaKey(value) {
  return PERSONA_KEYS.includes(value);
}

function emptyTally() {
  return PERSONA_KEYS.reduce((acc, key) => {
    acc[key] = 0;
    return acc;
  }, {});
}

/**
 * Score the seven answers.
 * @param {Record<string,string>} answers
 * @returns {{
 *   topResult: string,
 *   runnerUp: string|null,
 *   confidenceScore: number,
 *   margin: number,
 *   isTie: boolean,
 *   counts: Record<string,number>,
 *   weighted: Record<string,number>,
 *   ranked: string[],
 *   answered: number,
 *   total: number
 * }}
 */
export function scoreQuizDetailed(answers = {}) {
  const counts = emptyTally();
  const weighted = emptyTally();
  let answered = 0;
  let totalWeight = 0;

  for (const [questionKey, rawValue] of Object.entries(answers)) {
    const persona = toPersonaKey(rawValue);
    if (!persona) continue;
    const weight = QUESTION_WEIGHTS[questionKey] || 1;
    counts[persona] += 1;
    weighted[persona] += weight;
    answered += 1;
    totalWeight += weight;
  }

  const ranked = [...PERSONA_KEYS].sort((a, b) => {
    if (weighted[b] !== weighted[a]) return weighted[b] - weighted[a];
    if (counts[b] !== counts[a]) return counts[b] - counts[a];
    return PERSONA_KEYS.indexOf(a) - PERSONA_KEYS.indexOf(b);
  });

  const topResult = answered > 0 ? ranked[0] : 'builder';
  const runnerUp = answered > 0 && weighted[ranked[1]] > 0 ? ranked[1] : null;
  const margin = answered > 0 ? weighted[topResult] - weighted[ranked[1]] : 0;
  const confidenceScore = totalWeight > 0 ? Math.round((weighted[topResult] / totalWeight) * 100) / 100 : 0;

  return {
    topResult,
    runnerUp,
    confidenceScore,
    margin,
    isTie: margin === 0,
    counts,
    weighted,
    ranked,
    answered,
    total: Object.keys(answers).length,
  };
}

/**
 * Backwards-compatible helper (older call sites used a plain key).
 * @returns {string} canonical persona key
 */
export function scoreQuiz(answers = {}) {
  return scoreQuizDetailed(answers).topResult;
}

export default { PERSONA_KEYS, QUESTION_WEIGHTS, scoreQuiz, scoreQuizDetailed, toPersonaKey, isPersonaKey };
