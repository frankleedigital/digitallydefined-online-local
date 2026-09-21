/**
 * Logic check for the Digital Superpower Quiz.
 *
 * Proves the two reported failures cannot come back:
 *   1. the same answers always produce the same superpower (no stuck persona)
 *   2. personalization is produced locally, with no network/AI call
 *
 * Run: node scripts/quiz-logic-check.mjs
 */

// Minimal localStorage shim — the browser-only storage layer must be testable.
const store = new Map();
globalThis.window = {
  localStorage: {
    getItem: (key) => (store.has(key) ? store.get(key) : null),
    setItem: (key, value) => store.set(key, String(value)),
    removeItem: (key) => store.delete(key),
  },
};

const {
  scoreQuiz,
  scoreQuizDetailed,
  toPersonaKey,
  PERSONA_KEYS,
} = await import('../src/features/quiz/lib/scoring.js');
const { personalizeQuiz } = await import('../src/features/quiz/lib/personalize.js');
const {
  buildQuizResult,
  saveQuizResult,
  loadQuizResult,
  clearQuizResult,
  buildPersonaPreview,
  resolvePersonaParam,
  QUIZ_STORAGE_KEY,
} = await import('../src/features/quiz/lib/quizLogic.js');

let failures = 0;
const check = (label, condition, detail = '') => {
  if (condition) {
    console.log(`PASS ${label}`);
  } else {
    failures += 1;
    console.log(`FAIL ${label}${detail ? ` — ${detail}` : ''}`);
  }
};

const uniform = (persona) => ({
  q1: persona, q2: persona, q3: persona, q4: persona, q5: persona, q6: persona, q7: persona,
});

// 1. Every persona can win — the old "always Strategist" default is gone.
for (const persona of PERSONA_KEYS) {
  const result = buildQuizResult({ name: 'Michelle', answers: uniform(persona) });
  check(`uniform ${persona} answers resolve to ${persona}`, result.superpower === persona, `got ${result.superpower}`);
}

// 2. Determinism: identical answers, identical result, every time.
const mixed = { q1: 'creator', q2: 'builder', q3: 'strategist', q4: 'connector', q5: 'educator', q6: 'builder', q7: 'strategist' };
const first = scoreQuizDetailed(mixed);
let stable = true;
for (let i = 0; i < 50; i += 1) {
  if (scoreQuiz(mixed) !== first.topResult) stable = false;
}
check('scoring is deterministic across repeated runs', stable, `${first.topResult} drifted`);

// 3. Tie-breaks do not depend on the order the answers were stored in.
const tieA = { q1: 'builder', q2: 'creator', q3: 'educator', q4: 'strategist', q5: 'connector', q6: 'builder', q7: 'creator' };
const tieB = { q7: 'creator', q6: 'builder', q5: 'connector', q4: 'strategist', q3: 'educator', q2: 'creator', q1: 'builder' };
check('tie-break ignores answer insertion order', scoreQuiz(tieA) === scoreQuiz(tieB), `${scoreQuiz(tieA)} vs ${scoreQuiz(tieB)}`);

// 4. Persona aliases (legacy stored values, AI-shaped values) normalize.
check('legacy "The Strategist" normalizes', toPersonaKey('The Strategist') === 'strategist');
check('AI-shaped "Opportunity Scout" normalizes', toPersonaKey('Opportunity Scout') === 'strategist');
check('unknown persona value is rejected', toPersonaKey('astronaut') === null);

// 5. Personalization is complete and local.
const personalized = personalizeQuiz({ name: 'Dana Whitfield', email: 'dana@example.com', answers: uniform('creator') });
check('no AI/network source is claimed', personalized.source === 'local-deterministic');
check('superpower name present', !!personalized.superpowerName, String(personalized.superpowerName));
check('strengths personalized (>= 4)', personalized.strengths.length >= 4, `${personalized.strengths.length}`);
check('blind spots personalized (>= 4)', personalized.blindSpots.length >= 4, `${personalized.blindSpots.length}`);
check('niches personalized (>= 4)', personalized.niches.length >= 4, `${personalized.niches.length}`);
check('build sequence is a real sequence (>= 5 steps)', personalized.buildSequence.length >= 5, `${personalized.buildSequence.length}`);
check('every step has a timeframe', personalized.buildSequence.every((step) => !!step.timeframe));
check('next action present', !!personalized.nextAction);
check('tools present', personalized.tools.length >= 3, `${personalized.tools.length}`);
check('first name flows into the summary', personalized.summary.startsWith('Dana'));
check('q1 answer drives a strength line', personalized.strengths.some((line) => line.includes('people you write for')));
check('q2 answer drives the working rhythm', personalized.nextActionReason.includes('private making time'));
check('q4 answer drives a niche', personalized.niches.some((line) => line.includes('quiet hobby niche')));
check('q5 answer drives a blind spot', personalized.blindSpots.some((line) => line.includes('Autonomy matters to you')));
check('q7 answer drives the success metric', personalized.successMetric.includes('feels like yours'));

// 6. Storage round trip: finishing the quiz always overwrites a stale result.
saveQuizResult(buildQuizResult({ name: 'Dana', email: 'dana@example.com', answers: uniform('builder') }));
check('stored result is readable', loadQuizResult()?.superpower === 'builder', String(loadQuizResult()?.superpower));
saveQuizResult(buildQuizResult({ name: 'Dana', email: 'dana@example.com', answers: uniform('connector') }));
check('a new completion replaces the old persona', loadQuizResult()?.superpower === 'connector', String(loadQuizResult()?.superpower));

// 7. Legacy stored entries are healed instead of rendering half-empty pages.
clearQuizResult();
store.set(QUIZ_STORAGE_KEY, JSON.stringify({ userId: 'legacy@example.com', superpower: 'strategist', answers: uniform('strategist') }));
const healed = loadQuizResult();
check('legacy entry with answers rebuilds locally', healed?.superpower === 'strategist' && healed.buildSequence.length >= 5);

store.set(QUIZ_STORAGE_KEY, JSON.stringify({ userId: 'legacy2@example.com', superpower: 'The Strategist' }));
const healedPersonaOnly = loadQuizResult();
check('legacy persona-only entry still renders a roadmap', healedPersonaOnly?.superpower === 'strategist' && healedPersonaOnly.blindSpots.length > 0);

// 8. Persona routes.
check('resolvePersonaParam accepts a valid segment', resolvePersonaParam('builder') === 'builder');
check('resolvePersonaParam rejects an invalid segment', resolvePersonaParam('not-a-superpower') === null);
check('persona preview renders without quiz data', buildPersonaPreview('educator')?.superpowerName === 'Clarity Catalyst');

clearQuizResult();
console.log(failures === 0 ? '\nALL QUIZ LOGIC CHECKS PASSED' : `\n${failures} FAILURE(S)`);
process.exitCode = failures === 0 ? 0 : 1;
