// src/lib/userState.js — Centralized User Personalization & Progress State
// Manages local state across Quiz, Calculators, Roadmap, and Navigation.

const STORAGE_KEYS = {
  QUIZ: 'dd_quiz_result',
  GAP: 'dd_gap_result',
  FREEDOM: 'dd_freedom_result',
  ROI: 'dd_roi_result',
  SCORECARD: 'dd_scorecard_result',
  ROADMAP_STEP: 'dd_active_roadmap_step',
  COMPLETED_STEPS: 'dd_completed_steps',
  USER_NAME: 'dd_user_name',
  PLAN: 'dd_selected_plan',
};

export const SUPERPOWER_PROFILES = {
  creator: {
    id: 'creator',
    title: 'The Content Creator',
    tagline: 'Your creativity IS your digital real estate.',
    color: '#F18B25',
    accentColor: '#F18B25',
    iconName: 'Sparkles',
    badge: 'Creator Profile',
    strengths: [
      'Visual storytelling and narrative structure',
      'High engagement and scroll-stopping hooks',
      'Natural aesthetic sense for digital products',
    ],
    blindSpots: [
      'Over-focusing on content creation vs automated systems',
      'Reluctance to charge premium prices',
    ],
    recommendedNiches: [
      'Faceless aesthetic micro-guides',
      'Pinterest SEO evergreen affiliate boards',
      'Curated lifestyle and productivity playbooks',
    ],
    starterAsset: '30-Day Faceless Content & Affiliate System',
    nextPath: '/tools',
  },
  builder: {
    id: 'builder',
    title: 'The Systems Builder',
    tagline: 'You turn complexity into automated cash flow.',
    color: '#47B7D4',
    accentColor: '#47B7D4',
    iconName: 'Zap',
    badge: 'Builder Profile',
    strengths: [
      'Logical workflow design and process mapping',
      'Rapid template construction and Notion system design',
      'Data-driven optimization and funnel structure',
    ],
    blindSpots: [
      'Over-engineering before validating customer demand',
      'Spending too much time tweaking workflows vs selling',
    ],
    recommendedNiches: [
      'Notion operations dashboards for solo consultants',
      'Automated email lead nurturing pipelines',
      'Interactive ROI and business calculators',
    ],
    starterAsset: 'Turnkey Notion Business Dashboard & Funnel',
    nextPath: '/tools',
  },
  educator: {
    id: 'educator',
    title: 'The Knowledge Educator',
    tagline: 'Your decades of experience packaged into digital assets.',
    color: '#F18B25',
    accentColor: '#F18B25',
    iconName: 'BookOpen',
    badge: 'Educator Profile',
    strengths: [
      'Breaking down difficult concepts into simple frameworks',
      'High-authority domain expertise and credibility',
      'Curriculum structuring and step-by-step guidance',
    ],
    blindSpots: [
      'Trying to teach everything in one giant course',
      'Underpricing high-value industry frameworks',
    ],
    recommendedNiches: [
      'Bite-sized PDF playbooks ($27-$97)',
      'Asynchronous video/audio workshops',
      'Standard Operating Procedure (SOP) toolkits',
    ],
    starterAsset: 'Signature 5-Step Digital Playbook',
    nextPath: '/tools',
  },
  connector: {
    id: 'connector',
    title: 'The Community Connector',
    tagline: 'You build digital spaces people never want to leave.',
    color: '#47B7D4',
    accentColor: '#47B7D4',
    iconName: 'Users',
    badge: 'Connector Profile',
    strengths: [
      'Facilitating high-value discussions and peer networks',
      'Community retention and organic word-of-mouth',
      'Curating expert roundups and collaborative assets',
    ],
    blindSpots: [
      'Burnout from unmanaged manual moderation',
      'Not establishing recurring membership tiers early',
    ],
    recommendedNiches: [
      'Private paid micro-community ($19-$49/mo)',
      'Curated industry mastermind directories',
      'Accountability co-working cohorts',
    ],
    starterAsset: 'Micro-Membership Community Hub',
    nextPath: '/tools',
  },
  strategist: {
    id: 'strategist',
    title: 'The Digital Strategist',
    tagline: 'You see the big picture and command high-ticket value.',
    color: '#1F2937',
    accentColor: '#1F2937',
    iconName: 'TrendingUp',
    badge: 'Strategist Profile',
    strengths: [
      'Market positioning and competitive advantage discovery',
      'Premium offer packaging and value-stacking',
      'Holistic ecosystem monetization planning',
    ],
    blindSpots: [
      'Analysis paralysis on market size',
      'Hesitation to launch minimum viable digital assets',
    ],
    recommendedNiches: [
      'High-tier digital advisory frameworks ($297-$997)',
      'Turnkey niche market intelligence reports',
      'M&A and asset valuation audits',
    ],
    starterAsset: 'Executive Digital Strategy Toolkit',
    nextPath: '/tools',
  },
};

export function getUserState() {
  if (typeof window === 'undefined') {
    return {
      hasQuiz: false,
      superpower: null,
      profile: null,
      hasGap: false,
      gapData: null,
      hasFreedom: false,
      freedomData: null,
      completedStepsCount: 0,
      activePlan: null,
    };
  }

  try {
    const rawQuiz = localStorage.getItem(STORAGE_KEYS.QUIZ);
    const quizResult = rawQuiz ? JSON.parse(rawQuiz) : null;
    const superpower = quizResult?.superpower || quizResult?.type || null;
    const profile = superpower && SUPERPOWER_PROFILES[superpower] ? SUPERPOWER_PROFILES[superpower] : null;

    const rawGap = localStorage.getItem(STORAGE_KEYS.GAP);
    const gapData = rawGap ? JSON.parse(rawGap) : null;

    const rawFreedom = localStorage.getItem(STORAGE_KEYS.FREEDOM);
    const freedomData = rawFreedom ? JSON.parse(rawFreedom) : null;

    const rawCompleted = localStorage.getItem(STORAGE_KEYS.COMPLETED_STEPS);
    const completedSteps = rawCompleted ? JSON.parse(rawCompleted) : [];

    const activePlan = localStorage.getItem(STORAGE_KEYS.PLAN) || null;

    return {
      hasQuiz: Boolean(profile),
      superpower,
      profile,
      hasGap: Boolean(gapData),
      gapData,
      hasFreedom: Boolean(freedomData),
      freedomData,
      completedSteps,
      completedStepsCount: (profile ? 1 : 0) + (gapData ? 1 : 0) + (freedomData ? 1 : 0) + completedSteps.length,
      activePlan,
    };
  } catch {
    return {
      hasQuiz: false,
      superpower: null,
      profile: null,
      hasGap: false,
      gapData: null,
      hasFreedom: false,
      freedomData: null,
      completedStepsCount: 0,
      activePlan: null,
    };
  }
}

export const getUserData = getUserState;

export function subscribeUserState(callback) {
  if (typeof window === 'undefined') return () => {};

  const handler = () => {
    callback(getUserState());
  };

  window.addEventListener('dd_user_state_updated', handler);
  window.addEventListener('storage', handler);

  return () => {
    window.removeEventListener('dd_user_state_updated', handler);
    window.removeEventListener('storage', handler);
  };
}

export const subscribeUserData = subscribeUserState;

function notifyStateUpdate() {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('dd_user_state_updated'));
  }
}

export function saveQuizResult(result) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEYS.QUIZ, JSON.stringify(result));
    notifyStateUpdate();
  } catch (err) {
    console.error('Failed to save quiz result:', err);
  }
}

export const setUserQuizData = saveQuizResult;

export function saveGapResult(gapData) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEYS.GAP, JSON.stringify(gapData));
    notifyStateUpdate();
  } catch (err) {
    console.error('Failed to save gap result:', err);
  }
}

export function saveFreedomResult(freedomData) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEYS.FREEDOM, JSON.stringify(freedomData));
    notifyStateUpdate();
  } catch (err) {
    console.error('Failed to save freedom result:', err);
  }
}

export function saveScorecardResult(scorecardData) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEYS.SCORECARD, JSON.stringify(scorecardData));
    notifyStateUpdate();
  } catch (err) {
    console.error('Failed to save scorecard result:', err);
  }
}

export const setUserScorecardData = saveScorecardResult;

export function savePlanSelection(planId) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEYS.PLAN, planId);
    notifyStateUpdate();
  } catch (err) {
    console.error('Failed to save plan selection:', err);
  }
}
