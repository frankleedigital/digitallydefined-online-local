// src/features/quiz/lib/roadmapData.js — static roadmap data for 5 personas

const ROADMAPS = {
  creator: {
    superpowerType: 'creator',
    title: 'Creator Roadmap',
    overview: 'You think in content, story, and audience experience. This roadmap turns that instinct into a private, repeatable asset system.',
    strengths: [
      'Turns insight into publishable assets without needing to be on camera',
      'Senses audience emotion and can shape messaging quickly',
      'Builds content that keeps generating value after publication',
    ],
    challenges: [
      'Private output can feel invisible without a public persona',
      'Distribution may feel like self-promotion unless it is automated',
      'Monetization paths are not always clear for content-first models',
    ],
    recommendedNiches: [
      'Local service niches with high intent but low video presence',
      'Quiet hobbies with passionate but underserved audiences',
      'Professional niches where privacy is a feature, not a bug',
    ],
    firstSteps: [
      'Choose one niche from the Niche Profitability Scorecard output',
      'Build one pillar-page outline using a simple AI writing assistant',
      'Set up one automated delivery method: email, download, or Notion template',
    ],
    toolsToUse: [
      'Digital Superpower Quiz — completed',
      'Niche Profitability Scorecard — validate one niche',
      '10x ROI Calculator — model the asset before building',
    ],
    cta: {
      community: 'Join the community to share your content-roadmap privately.',
      scorecard: 'Open the Niche Profitability Scorecard.',
      calculator: 'Model your first asset with the 10x ROI Calculator.',
      startHere: 'Return to the homepage if you want to retake the quiz.',
    },
  },
  builder: {
    superpowerType: 'builder',
    title: 'Builder Roadmap',
    overview: 'You care about infrastructure, templates, and repeatable systems. This roadmap gives you a build order for a simple, profitable digital asset.',
    strengths: [
      'Makes complex income paths simple enough to run without constant oversight',
      'Tests small and scales what works',
      'Prefers tools and assets over talk and visibility',
    ],
    challenges: [
      'May over-build before validating demand',
      'Can underestimate the importance of a clear monetization path',
      'Sometimes delays launch in search of a better system',
    ],
    recommendedNiches: [
      'Rank-and-rent in local home services',
      'Template and workbook markets for organized professionals',
      'Micro-SaaS or tool wrappers for repetitive tasks',
    ],
    firstSteps: [
      'Run the Niche Profitability Scorecard on one local-service niche',
      'Map the workflow from lead capture to lease or sale',
      'Build a minimum version: one landing page, one lead magnet, one automation',
    ],
    toolsToUse: [
      'Digital Superpower Quiz — completed',
      'Niche Profitability Scorecard — pick a validated niche',
      '10x ROI Calculator — confirm the asset is worth building',
    ],
    cta: {
      community: 'Join the community to find builder accountability.',
      scorecard: 'Open the Niche Profitability Scorecard.',
      calculator: 'Model your asset with the 10x ROI Calculator.',
      startHere: 'Return to the homepage to review your quiz result.',
    },
  },
  educator: {
    superpowerType: 'educator',
    title: 'Educator Roadmap',
    overview: 'You learn deeply and want to translate that into trust. This roadmap helps you package one provable system into a product others can buy.',
    strengths: [
      'Turns complexity into clarity others can follow',
      'Builds trust through demonstrated knowledge, not hype',
      'Creates evergreen teaching assets that sell while you sleep',
    ],
    challenges: [
      'May over-explain instead of shipping a simple version',
      'Can wait for perfect curriculum before launching',
      'Risk of competing on price instead of positioning',
    ],
    recommendedNiches: [
      'Professional certification prep for non-traditional students',
      'Privacy-first productivity systems for remote workers',
      'Faceless course niches with high search intent',
    ],
    firstSteps: [
      'Pick one system you already teach and document it as a checklist',
      'Validate demand with a free mini-course or PDF lead magnet',
      'Build an email sequence that delivers value before asking for anything',
    ],
    toolsToUse: [
      'Digital Superpower Quiz — completed',
      'Niche Profitability Scorecard — validate teaching niche',
      '10x ROI Calculator — model the course or product launch',
    ],
    cta: {
      community: 'Join the community to share teaching frameworks privately.',
      scorecard: 'Open the Niche Profitability Scorecard.',
      calculator: 'Model your course or product launch ROI.',
      startHere: 'Return to the homepage to review your roadmap options.',
    },
  },
  connector: {
    superpowerType: 'connector',
    title: 'Connector Roadmap',
    overview: 'You see relationships, partnerships, and group dynamics. This roadmap turns your network instinct into owned digital real estate that compounds.',
    strengths: [
      'Matches people, offers, and opportunities with precision',
      'Builds trust through genuine relationships, not cold outreach',
      'Creates network effects that compound over time',
    ],
    challenges: [
      'May rely on relationships before building owned assets',
      'Can spread thin across too many people or offers',
      'Sometimes needs a clear monetization path separate from introductions',
    ],
    recommendedNiches: [
      'Local referral networks: contractors, wellness, professional services',
      'Micro-communities around shared privacy or faceless values',
      'Partner or affiliate programs that reward introductions',
    ],
    firstSteps: [
      'Map one community or partner path inside your niche',
      'Run the Niche Profitability Scorecard to confirm the niche pays for leads or access',
      'Design a simple referral or partnership agreement template',
    ],
    toolsToUse: [
      'Digital Superpower Quiz — completed',
      'Niche Profitability Scorecard — validate the niche and partnership model',
      '10x ROI Calculator — model the value of a single referral or lease',
    ],
    cta: {
      community: 'Join the community to connect with other connectors.',
      scorecard: 'Open the Niche Profitability Scorecard.',
      calculator: 'Model a referral or lease value with the 10x ROI Calculator.',
      startHere: 'Return to the homepage to review your roadmap options.',
    },
  },
  strategist: {
    superpowerType: 'strategist',
    title: 'Strategist Roadmap',
    overview: 'You prioritize outcomes over activity. This roadmap gives you a prioritized build sequence so you do not waste effort on the wrong model.',
    strengths: [
      'Chooses the right model and cuts the rest',
      'Prevents wasted effort by aligning assets with outcomes',
      'Makes decisions faster with less noise',
    ],
    challenges: [
      'May over-plan and under-build',
      'Can delay launch waiting for the perfect model',
      'Sometimes needs a forcing function to commit to one asset',
    ],
    recommendedNiches: [
      'High-margin local services: legal, accounting, roofing, medical',
      'Digital product markets where positioning matters more than volume',
      'Portfolio-style rank-and-rent with multiple small assets',
    ],
    firstSteps: [
      'Run the Niche Profitability Scorecard before building anything new',
      'Pick one asset type: rank-and-rent, template, or lead magnet',
      'Set a 30-day build limit and use the 10x ROI Calculator to confirm the numbers',
    ],
    toolsToUse: [
      'Digital Superpower Quiz — completed',
      'Niche Profitability Scorecard — filter niches before building',
      '10x ROI Calculator — confirm asset economics before committing',
    ],
    cta: {
      community: 'Join the community to find other strategists building quietly.',
      scorecard: 'Open the Niche Profitability Scorecard.',
      calculator: 'Model your first asset with the 10x ROI Calculator.',
      startHere: 'Return to the homepage to retake the quiz or review your result.',
    },
  },
};

export function getRoadmap(resultKey) {
  const roadmap = ROADMAPS[resultKey];
  if (!roadmap) return null;
  return roadmap;
}

export function buildRoadmapPayload(resultKey, contact = {}) {
  const roadmap = getRoadmap(resultKey);
  if (!roadmap) return null;
  return {
    superpowerType: resultKey,
    roadmap,
    contact,
    generatedAt: new Date().toISOString(),
    tags: ['roadmap-generated', `quiz-result-${resultKey}`, 'roadmap-delivered'],
  };
}

export default ROADMAPS;
