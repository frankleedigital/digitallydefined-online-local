/**
 * Unified agent registry — decides whether an action is served by the Hermes
 * Supabase edge function or the FastAPI microservice layer.
 *
 * FastAPI owns the microservice tools (niche/roadmap/asset-plan/offer-architect/
 * wealth/product/domain/affiliate/rankrent/blueprint/trends). Hermes owns the
 * interaction/context actions (chat, quiz, scorecard, reputation, integrations,
 * notion, license, website content).
 */
export const RUNTIME = {
  // FastAPI-owned microservices
  'agent.niche': 'fastapi',
  'agent.roadmap': 'fastapi',
  'agent.asset-plan': 'fastapi',
  'agent.offer-architect': 'fastapi',
  'agent.wealth': 'fastapi',
  'agent.product': 'fastapi',
  'agent.domain': 'fastapi',
  'agent.affiliate': 'fastapi',
  'agent.rankrent': 'fastapi',
  'agent.blueprint': 'fastapi',
  'agent.trends': 'fastapi',

  // Hermes-owned
  'agent.scorecard': 'hermes',
  'agent.reputation': 'hermes',
  'agent.quiz': 'hermes',
  'quiz.complete': 'hermes',
  'public.chat': 'hermes',
  'chat': 'hermes',
  'website.content': 'hermes',
  'license.verify': 'hermes',
  'analytics': 'hermes',
};

/** Resolve which runtime owns an action string. Defaults to Hermes. */
export function runtimeFor(action) {
  if (RUNTIME[action]) return RUNTIME[action];
  if (action.startsWith('integration.') || action.startsWith('notion.') || action.startsWith('automation.')) return 'hermes';
  if (action.startsWith('fastapi.')) return 'fastapi';
  return 'hermes';
}

export default { RUNTIME, runtimeFor };