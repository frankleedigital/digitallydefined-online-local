// src/api/client.js — unified agent client
// Backend gateway owns: niche, roadmap, scorecard, product, social, trends, chat, dashboard
// Hermes edge owns: quiz submission/email, reputation, website content
//
// Note: the AI "intelligence" personalization action was retired. Quiz results
// are now scored and personalized locally (features/quiz/lib/quizLogic.js), so
// nothing in the product depends on an AI provider being reachable.

import { callAgentEndpoint } from './backend.js';
import { callSupabaseEdge } from './supabase.js';

/**
 * Agent runtime mapping.
 * 'backend' = DigitallyDefined backend gateway (/api/<endpoint>)
 * 'hermes'  = legacy Supabase Hermes edge function (quiz email, reputation, content)
 */
const RUNTIME = {
  'agent.niche': 'backend',
  'agent.roadmap': 'backend',
  'agent.scorecard': 'backend',
  'agent.product': 'backend',
  'agent.social': 'backend',
  'agent.trends': 'backend',
  'agent.chat': 'backend',
  'agent.dashboard': 'backend',

  'agent.reputation': 'hermes',
  'agent.quiz': 'hermes',
  'quiz.complete': 'hermes',
  'quiz.roadmap': 'hermes',
  'public.chat': 'hermes',
  'chat': 'backend',
  'website.content': 'hermes',
  'license.verify': 'hermes',
  'analytics': 'hermes',
  'subscribe': 'hermes',
  'personalize': 'hermes',
  'events': 'hermes',
  'optimization': 'hermes',
  'report': 'hermes',
  'mentor.dev': 'hermes',
  'hermes.agent': 'hermes',
};

function runtimeFor(action) {
  if (RUNTIME[action]) return RUNTIME[action];
  if (action.startsWith('integration.') || action.startsWith('notion.') || action.startsWith('automation.')) return 'hermes';
  if (action.startsWith('agent.')) return 'backend';
  return 'hermes';
}

/**
 * Call an agent/tool by name with structured JSON input.
 * @param {string} agentName - niche | roadmap | scorecard | product | social | trends | chat
 * @param {object} inputData - structured payload
 */
export async function callAgent(agentName, inputData = {}) {
  const action = `agent.${agentName}`;
  const runtime = runtimeFor(action);

  try {
    if (runtime === 'backend') {
      return await callAgentEndpoint(agentName, inputData);
    }

    const payload = await callSupabaseEdge(action, { inputData });
    if (payload && payload.success === false) {
      throw new Error(payload.error || `Agent ${agentName} failed`);
    }
    return payload;
  } catch (error) {
    console.error(`Agent ${agentName} error:`, error);
    throw error;
  }
}

export default { callAgent, RUNTIME, runtimeFor };
