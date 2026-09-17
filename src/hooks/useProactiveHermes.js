import { useToolState } from '../hooks/useToolState.js';
import { sendToHermes } from './hermes.js';
import { useEffect, useRef, useCallback } from 'react';

/**
 * useProactiveHermes
 * 
 * Monitors user behavior and triggers proactive Hermes interventions when:
 * - User hesitates on an input (no activity for 8+ seconds)
 * - User shows frustration (rapid input changes, 5+ times in 10 seconds)
 * - User completes a tool with a concerning result (high gap, low score)
 * - User is about to leave after viewing results (exit intent)
 */

export function useProactiveHermes({
  enabled = true,
  context = {},
  onIntervention
}) {
  const { toolState, updateToolState } = useToolState();
  const hesitationTimer = useRef(null);
  const frustrationCounter = useRef({ count: 0, startTime: null });
  const hasIntervened = useRef({});
  const lastActivityRef = useRef(Date.now());

  const resetHesitationTimer = useCallback(() => {
    if (!enabled) return;
    
    if (hesitationTimer.current) {
      clearTimeout(hesitationTimer.current);
    }
    
    lastActivityRef.current = Date.now();
    
    // Set timer for proactive intervention after 8 seconds of inactivity
    hesitationTimer.current = setTimeout(() => {
      const timeSinceLastActivity = Date.now() - lastActivityRef.current;
      
      if (timeSinceLastActivity >= 8000 && !hasIntervened.current.hesitation) {
        hasIntervened.current.hesitation = true;
        
        const interventionData = {
          type: 'hesitation',
          timestamp: Date.now(),
          context: { ...context, toolState },
          message: 'I notice you\'re taking a moment. Would you like help understanding this calculation?'
        };
        
        updateToolState({
          lastAction: 'hermes_proactive_hesitation',
          snapshot: { ...toolState.snapshot, lastIntervention: interventionData }
        });
        
        if (onIntervention) {
          onIntervention(interventionData);
        }
      }
    }, 8000);
  }, [enabled, context, toolState, updateToolState, onIntervention]);

  const trackFrustration = useCallback(() => {
    if (!enabled) return;
    
    const now = Date.now();
    
    // Reset counter if more than 10 seconds since last change
    if (!frustrationCounter.current.startTime || 
        now - frustrationCounter.current.startTime > 10000) {
      frustrationCounter.current = { count: 1, startTime: now };
      return;
    }
    
    frustrationCounter.current.count++;
    
    // If 5+ changes in 10 seconds, trigger intervention
    if (frustrationCounter.current.count >= 5 && !hasIntervened.current.frustration) {
      hasIntervened.current.frustration = true;
      
      const interventionData = {
        type: 'frustration',
        timestamp: now,
        context: { ...context, toolState },
        message: 'It looks like you\'re adjusting the numbers quite a bit. Want me to explain how this works?'
      };
      
      updateToolState({
        lastAction: 'hermes_proactive_frustration',
        snapshot: { ...toolState.snapshot, lastIntervention: interventionData }
      });
      
      if (onIntervention) {
        onIntervention(interventionData);
      }
    }
  }, [enabled, context, toolState, updateToolState, onIntervention]);

  const triggerResultIntervention = useCallback(async (resultData) => {
    if (!enabled || !resultData) return;
    
    const shouldIntervene = 
      (resultData.gap && resultData.gap > 100000) ||  // High retirement gap
      (resultData.score && resultData.score < 50) ||   // Low niche score
      (resultData.goalMet === false);                   // Goal not met
    
    if (shouldIntervene && !hasIntervened.current.result) {
      hasIntervened.current.result = true;
      
      // Get personalized guidance from Hermes
      const hermesMessage = buildResultInterventionMessage(resultData);
      
      try {
        const response = await sendToHermes(hermesMessage, {
          toolState,
          page: window.location.pathname,
          action: 'hermes.proactive_result'
        });
        
        const interventionData = {
          type: 'result_concern',
          timestamp: Date.now(),
          context: { ...context, toolState, resultData },
          message: response?.message || getDefaultResultMessage(resultData),
          hermesResponse: response
        };
        
        updateToolState({
          lastAction: 'hermes_proactive_result',
          snapshot: { ...toolState.snapshot, lastIntervention: interventionData }
        });
        
        if (onIntervention) {
          onIntervention(interventionData);
        }
      } catch (error) {
        console.error('[ProactiveHermes] Failed to get intervention:', error);
      }
    }
  }, [enabled, context, toolState, updateToolState, onIntervention]);

  const triggerExitIntervention = useCallback(() => {
    if (!enabled || !hasIntervened.current.result || hasIntervened.current.exit) return;
    
    hasIntervened.current.exit = true;
    
    const interventionData = {
      type: 'exit_intent',
      timestamp: Date.now(),
      context: { ...context, toolState },
      message: 'Before you go - would you like a personalized action plan based on your results?'
    };
    
    updateToolState({
      lastAction: 'hermes_exit_intent',
      snapshot: { ...toolState.snapshot, lastIntervention: interventionData }
    });
    
    if (onIntervention) {
      onIntervention(interventionData);
    }
  }, [enabled, context, toolState, updateToolState, onIntervention]);

  const resetInterventions = useCallback((type) => {
    if (type) {
      hasIntervened.current[type] = false;
    } else {
      hasIntervened.current = {};
    }
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (hesitationTimer.current) {
        clearTimeout(hesitationTimer.current);
      }
    };
  }, []);

  return {
    resetHesitationTimer,
    trackFrustration,
    triggerResultIntervention,
    triggerExitIntervention,
    resetInterventions,
    hasIntervened: hasIntervened.current
  };
}

function buildResultInterventionMessage(resultData) {
  if (resultData.gap && resultData.gap > 100000) {
    return `The user just saw their retirement gap of $${resultData.gap.toLocaleString()}. 
    This is a significant gap that may feel overwhelming. 
    Provide empathetic guidance on realistic first steps to start closing this gap,
    emphasizing that small consistent actions compound over time.`;
  }
  
  if (resultData.score && resultData.score < 50) {
    return `The user received a low niche score of ${resultData.score}/100. 
    They may be discouraged. Provide constructive feedback on what they can improve,
    suggest alternative niches, or explain how to validate demand differently.`;
  }
  
  if (resultData.goalMet === false) {
    return `The user's current plan doesn't meet their freedom goal. 
    They have a gap of $${resultData.gap?.toLocaleString() || 'unknown'}. 
    Provide specific, actionable suggestions to bridge this gap,
    such as increasing asset count, improving yields, or adjusting timeline.`;
  }
  
  return 'The user received concerning results. Provide supportive, actionable guidance.';
}

function getDefaultResultMessage(resultData) {
  if (resultData.gap && resultData.gap > 100000) {
    return 'That gap might feel daunting, but it\'s actually a clear target. Want to explore a step-by-step plan to close it?';
  }
  
  if (resultData.score && resultData.score < 50) {
    return 'This score suggests there\'s room for optimization. Want me to suggest ways to improve this niche or find a better one?';
  }
  
  if (resultData.goalMet === false) {
    return 'You\'re not quite at your freedom number yet. Want to see what adjustments could get you there faster?';
  }
  
  return 'Want to discuss your results and create an action plan?';
}

export default useProactiveHermes;
