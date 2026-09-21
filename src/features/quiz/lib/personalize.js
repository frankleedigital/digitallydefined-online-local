// src/features/quiz/lib/personalize.js
// Local personalization engine for the Digital Superpower Quiz.
//
// Every field below is derived from the seven answers with plain lookups.
// No AI, no network, no randomness: the same answers always produce the same
// result, and the result renders even when every backend is offline.
//
// Structure:
//   1. Persona base copy comes from roadmapData.js + personas.js
//   2. Answer modifiers (q1..q7) add the personal layer
//   3. Everything is composed into one result object the pages can render

import { QUESTIONS } from './questions.js';
import { scoreQuizDetailed, toPersonaKey } from './scoring.js';
import { getRoadmap } from './roadmapData.js';
import { getPersona } from './personas.js';

/** Realistic build windows per persona. Frames, not promises. */
const TIMEFRAMES = {
  builder: '6-8 weeks to a first qualified lead',
  creator: '4-6 weeks to a first published asset',
  educator: '3-5 weeks to a first workbook or email course',
  strategist: '8-10 weeks to a tested funnel',
  connector: '5-7 weeks to a first partner introduction',
};

/** Step cadence for the personalized build sequence. */
const STEP_TIMEFRAMES = ['Week 1', 'Week 1-2', 'Week 2-3', 'Week 3-4', 'Week 4-6', 'Ongoing'];

/**
 * q1 — how the person picks up a new tool.
 * Adds a working-strength line that is specific to their learning style.
 */
const LEARNING_STRENGTHS = {
  builder: 'You learn a tool by building with it, so nothing you learn stays theoretical.',
  creator: 'You learn a tool by asking what it changes for the people you write for.',
  educator: 'You learn a tool by finding the guide that explains it, then testing the steps.',
  strategist: 'You learn a tool by checking whether it fits the workflow you already trust.',
  connector: 'You learn a tool by noticing who else it could help.',
};

/**
 * q2 — the kind of working day that suits them.
 * Used to describe how the build sequence should be scheduled.
 */
const WORKING_RHYTHM = {
  builder: 'Long, uninterrupted build blocks are where you do your best work.',
  educator: 'You do your best thinking in deep-dive sessions with time to organize what you found.',
  strategist: 'You like planning time that ends with a written decision, not a longer list.',
  creator: 'You need private making time before anything becomes public.',
  connector: 'You keep momentum by staying in contact with people you trust.',
};

/** q3 — the first question asked when a project appears. Adds a validation step. */
const VALIDATION_STEPS = {
  strategist: 'Write the outcome and the timeline first, then work backwards to one asset.',
  builder: 'Take inventory of the tools and assets you already own before buying anything new.',
  educator: 'Find who has done this already and copy the structure, not the personality.',
  creator: 'Name the audience and the result they want before you write a single word.',
  connector: 'List who needs to be involved, then decide what you can complete on your own.',
};

/** q4 — the income model they want. Drives the asset, the niche and the tool. */
const INCOME_MODELS = {
  builder: {
    asset: 'an owned lead-generation asset you control',
    niche: 'rank-and-rent in one local home-service niche',
    tool: 'Niche Profitability Scorecard',
  },
  creator: {
    asset: 'a content library with automated delivery',
    niche: 'a quiet hobby niche with an underserved audience',
    tool: 'AI writing assistant',
  },
  educator: {
    asset: 'a workbook or short email course that teaches one process',
    niche: 'workflow templates for organized professionals',
    tool: 'Workbook and email-course builder',
  },
  strategist: {
    asset: 'a small portfolio of two or three tested assets',
    niche: 'high-margin local services where positioning decides the winner',
    tool: '10x ROI Calculator',
  },
  connector: {
    asset: 'a referral offer that pays you for introductions',
    niche: 'local referral networks in professional services',
    tool: 'Partnership tracker',
  },
};

/** q5 — risk posture. Turns into the honest blind spot and one guardrail step. */
const RISK_GUARDRAILS = {
  strategist: {
    blindSpot: 'Planning is comfortable for you, and it can quietly replace launching.',
    step: 'Set a 30-day build limit and put it in the calendar as a hard deadline.',
  },
  builder: {
    blindSpot: 'You may keep building past the point where the market could have answered you.',
    step: 'Ship the smallest usable version and let one real prospect test it.',
  },
  educator: {
    blindSpot: 'You may wait for proof that only the market can give you.',
    step: 'Publish one small asset, then improve it from actual responses.',
  },
  creator: {
    blindSpot: 'Autonomy matters to you, so the routine distribution work can slide.',
    step: 'Automate distribution first, then create in private as long as you like.',
  },
  connector: {
    blindSpot: 'Your momentum can depend on other people showing up on schedule.',
    step: 'Decide now which asset you will own even if no one joins at first.',
  },
};

/** q6 — the workflow that feels natural. Adds a strength and a keep-moving step. */
const WORKFLOW_STRENGTHS = {
  builder: {
    strength: 'Build, measure, improve is already how you operate.',
    step: 'Log one measurement each week so progress is visible, not remembered.',
  },
  educator: {
    strength: 'Research, document, share turns your notes into an asset.',
    step: 'Turn your most recent piece of research into a one-page checklist.',
  },
  strategist: {
    strength: 'Clarify, prioritize, delegate keeps your time pointed at the right work.',
    step: 'Automate or hand off the one task you repeat every week.',
  },
  creator: {
    strength: 'Ideate, draft, refine in private protects your best thinking.',
    step: 'Choose a publishing rhythm that never requires your face or your name.',
  },
  connector: {
    strength: 'Listen, match needs, connect people builds trust quickly.',
    step: 'Write the one-paragraph offer you can send to a partner.',
  },
};

/** q7 — what success means. Becomes the success metric and the last step. */
const SUCCESS_METRICS = {
  builder: {
    metric: 'an asset that captures leads or earns rent while you are offline',
    step: 'Write the numbers that define done before the build starts.',
  },
  creator: {
    metric: 'work that still feels like yours after it is published',
    step: 'Protect one private build block every week and keep it.',
  },
  educator: {
    metric: 'clarity other people can reuse without asking you',
    step: 'Pick one process you can explain in five steps, and write those five steps.',
  },
  strategist: {
    metric: 'fewer decisions, made faster, with less wasted effort',
    step: 'Cut your list to one asset and one deadline.',
  },
  connector: {
    metric: 'a network where everyone involved gains something',
    step: 'Decide what you will offer before you ask anyone for anything.',
  },
};

const CONFIDENCE_LABELS = {
  strong: 'Clear signal',
  moderate: 'Mostly clear signal',
  mixed: 'Mixed signal',
};

function confidenceLabel(score, isTie) {
  if (isTie || score < 0.34) return CONFIDENCE_LABELS.mixed;
  if (score < 0.5) return CONFIDENCE_LABELS.moderate;
  return CONFIDENCE_LABELS.strong;
}

/** Build the per-answer evidence trail so the result can explain itself. */
function buildEvidence(answers) {
  return QUESTIONS.map((question) => {
    const value = toPersonaKey(answers[question.key]);
    if (!value) return null;
    const option = question.options.find((opt) => opt.value === value);
    return {
      questionKey: question.key,
      question: question.label,
      persona: value,
      personaTitle: getPersona(value).title,
      answer: option ? option.label : value,
    };
  }).filter(Boolean);
}

/** Unique-push helper so personalized lines never repeat the persona copy. */
function pushUnique(list, item) {
  if (item && !list.includes(item)) list.push(item);
}

/**
 * Build a fully personalized result from quiz answers.
 * Pure function: no network, no storage, no randomness.
 *
 * @param {{ answers?: Record<string,string>, name?: string, email?: string }} input
 * @returns {object} result — safe to render, save, or email
 */
export function personalizeQuiz({ answers = {}, name = '', email = '' } = {}) {
  const score = scoreQuizDetailed(answers);
  const personaKey = score.topResult;
  const persona = getPersona(personaKey);
  const roadmap = getRoadmap(personaKey);
  const secondaryKey = score.runnerUp && score.runnerUp !== personaKey ? score.runnerUp : null;
  const secondary = secondaryKey ? getPersona(secondaryKey) : null;

  // The answer given for each question drives the matching personal line.
  const signal = (questionKey) => toPersonaKey(answers[questionKey]);

  const learning = LEARNING_STRENGTHS[signal('q1')] || LEARNING_STRENGTHS[personaKey];
  const rhythm = WORKING_RHYTHM[signal('q2')] || WORKING_RHYTHM[personaKey];
  const validationStep = VALIDATION_STEPS[signal('q3')] || VALIDATION_STEPS[personaKey];
  const income = INCOME_MODELS[signal('q4')] || INCOME_MODELS[personaKey];
  const guardrail = RISK_GUARDRAILS[signal('q5')] || RISK_GUARDRAILS[personaKey];
  const workflow = WORKFLOW_STRENGTHS[signal('q6')] || WORKFLOW_STRENGTHS[personaKey];
  const success = SUCCESS_METRICS[signal('q7')] || SUCCESS_METRICS[personaKey];

  const strengths = [];
  (roadmap?.strengths || []).forEach((item) => pushUnique(strengths, item));
  pushUnique(strengths, learning);
  pushUnique(strengths, workflow.strength);

  const blindSpots = [];
  (roadmap?.challenges || []).forEach((item) => pushUnique(blindSpots, item));
  pushUnique(blindSpots, guardrail.blindSpot);

  const niches = [];
  (roadmap?.recommendedNiches || []).forEach((item) => pushUnique(niches, item));
  pushUnique(niches, income.niche);

  const baseSteps = roadmap?.firstSteps || [];
  const stepTitles = [
    baseSteps[0],
    baseSteps[1],
    baseSteps[2],
    `Build ${income.asset} for ${income.niche}`,
    workflow.step,
    success.step,
  ].filter(Boolean);

  const buildSequence = stepTitles.map((title, index) => ({
    step: index + 1,
    title,
    timeframe: STEP_TIMEFRAMES[index] || 'Ongoing',
    metric: index === stepTitles.length - 1 ? success.metric : '',
  }));

  const tools = [];
  (roadmap?.toolsToUse || []).forEach((item) => pushUnique(tools, item));
  pushUnique(tools, income.tool);

  const nextAction = buildSequence.length > 0
    ? buildSequence[0].title
    : 'Open the Niche Profitability Scorecard and pick one niche to test.';

  const firstName = String(name || '').trim().split(' ')[0];
  const summary = [
    firstName
      ? `${firstName}, your answers point most often at ${persona.title}.`
      : `Your answers point most often at ${persona.title}.`,
    secondary
      ? `Your closest second signal is ${secondary.title}, so keep that as a backup angle.`
      : '',
  ].filter(Boolean).join(' ');

  return {
    version: 2,
    source: 'local-deterministic',
    generatedAt: new Date().toISOString(),

    // identity (userId keeps backwards compatibility with the dashboard gate)
    userId: email || '',
    name: String(name || '').trim(),
    firstName: firstName || '',
    email: email || '',

    // superpower
    superpower: personaKey,
    superpowerType: personaKey,
    personaTitle: persona.title,
    superpowerName: persona.superpowerName || persona.title,
    tagline: persona.tagline,
    description: persona.description,
    overview: roadmap?.overview || persona.description,
    recommendedFirstStep: persona.recommendedFirstStep,
    toolPreference: persona.toolPreference,

    // scoring
    confidence: score.confidenceScore,
    confidenceScore: score.confidenceScore,
    confidenceLabel: confidenceLabel(score.confidenceScore, score.isTie),
    isTie: score.isTie,
    margin: score.margin,
    secondarySuperpower: secondaryKey,
    secondaryTitle: secondary ? secondary.title : null,
    counts: score.counts,
    weighted: score.weighted,
    ranked: score.ranked,
    answered: score.answered,
    total: score.total,
    answers,
    evidence: buildEvidence(answers),
    summary,

    // personalized content
    strengths,
    blindSpots,
    niches,
    buildSequence,
    nextAction,
    nextActionReason: rhythm,
    validationStep,
    successMetric: success.metric,
    timeframe: TIMEFRAMES[personaKey] || '',
    tools,

    // delivery flag, set by the page after the email attempt
    emailSent: false,
  };
}

export default { personalizeQuiz, TIMEFRAMES };

