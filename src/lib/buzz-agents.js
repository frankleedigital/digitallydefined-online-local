// Buzz Agents Integration for DigitallyDefined
// Free tier agents only - paid agents hidden from website
// All agent calls route directly through Supabase Edge Functions

import { callSupabaseEdge, getSupabaseEdgeUrl, getSupabaseEdgeHeaders } from './supabase-edge';
import { callFastAPI } from './fastapi';
import { runtimeFor } from './agentRegistry';

// Agent configurations
const AGENTS = {
  'digital-superpower-quiz': {
    name: 'Digital Superpower Quiz',
    description: 'Identify your digital superpower through a 7-question assessment',
    endpoint: 'agent.quiz',
    icon: '🎯',
    category: 'quiz',
    order: 1,
  },
  'niche-keyword-discovery': {
    name: 'Niche & Keyword Discovery',
    description: 'Find profitable niches and keyword clusters for Gen X women',
    endpoint: 'agent.niche',
    icon: '🔍',
    category: 'tools',
    order: 2,
  },
  'roadmap-generator': {
    name: 'Roadmap Generator',
    description: 'Generate a personalized digital roadmap based on your superpower',
    endpoint: 'agent.roadmap',
    icon: '🗺️',
    category: 'tools',
    order: 3,
  },
  'digital-wealth-calculator': {
    name: 'Digital Wealth Calculator',
    description: 'Calculate your freedom number and retirement gap',
    endpoint: 'agent.wealth',
    icon: '💰',
    category: 'calculators',
    order: 4,
  },
  'reputation-intelligence': {
    name: 'Reputation Intelligence',
    description: 'Check demand and reputation signals for your niche',
    endpoint: 'agent.reputation',
    icon: '⭐',
    category: 'tools',
    order: 5,
  },
  'scorecard-interpreter': {
    name: 'Niche Scorecard Interpreter',
    description: 'Turn scorecard inputs into risks, validation tests, and monetization paths',
    endpoint: 'agent.scorecard',
    icon: '📊',
    category: 'tools',
    order: 6,
  },
  'retirement-guide': {
    name: 'Retirement Gap Guide',
    description: 'Explain retirement calculator scenarios in plain language',
    endpoint: 'agent.wealth',
    icon: '🧭',
    category: 'calculators',
    order: 7,
  },
  'asset-plan': {
    name: 'Digital Asset Portfolio Guide',
    description: 'Interpret portfolio assumptions, risks, and build order',
    endpoint: 'agent.roadmap',
    icon: '🏠',
    category: 'calculators',
    order: 8,
  },
};

// Hidden paid agents (not exposed on website)
const PAID_AGENTS = [
  'ai-rankand-rent-builder',
  'content-repurposer',
  'facebook-community-agent',
  'json-schema-generator',
];

export function getFreeAgents() {
  return Object.values(AGENTS)
    .filter(agent => !PAID_AGENTS.includes(agent.name.toLowerCase().replace(/\s+/g, '-')))
    .sort((a, b) => a.order - b.order);
}

export function isPaidAgent(name) {
  return PAID_AGENTS.includes(name.toLowerCase().replace(/\s+/g, '-'));
}

export function getAgent(name) {
  return AGENTS[name] || null;
}

// Call an agent via Supabase Edge Function
export async function callAgent(agentName, inputData, provider = null) {
  try {
    // allow caller to ask the backend to use a specific provider
    if (provider) inputData = { ...(inputData || {}), provider };

    const action = `agent.${agentName}`;

    // FastAPI-owned microservices are served by the FastAPI layer (via the
    // backend proxy). Fall back to Hermes if FastAPI is unreachable/errors so
    // the marketing site never breaks.
    if (runtimeFor(action) === 'fastapi') {
      try {
        const fastResult = await callFastAPI(agentName, inputData);
        return fastResult;
      } catch (fastErr) {
        console.warn(
          `CallAgent: FastAPI unavailable for ${action}, falling back to Hermes:`,
          fastErr && fastErr.message ? fastErr.message : fastErr
        );
      }
    }

    const payload = await callSupabaseEdge(action, { inputData });

    if (!payload.success) {
      throw new Error(payload.error || `Agent ${agentName} did not return a successful result`);
    }
    return payload;
  } catch (error) {
    console.error(`Agent ${agentName} error:`, error);
    throw error;
  }
}

export default AGENTS;
