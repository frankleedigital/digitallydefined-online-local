// src/hooks/useToolState.js — quiz/dashboard state with localStorage persistence

import { useState, useCallback } from 'react';

const STORAGE_KEY = 'dd-tool-state';

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function saveState(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {}
}

const DEFAULT_STATE = {
  stage: 'idle',
  lastAction: null,
  snapshot: {},
  scorecard: {},
  quiz: {},
  roi: {},
  freedom: {},
  niche: {},
  _lastUpdated: null,
};

let initialState = loadState() || DEFAULT_STATE;

export function useToolState() {
  const [toolState, setToolState] = useState(initialState);

  const mergeDeep = (target, updates) => {
    const output = { ...target };
    for (const key of Object.keys(updates)) {
      if (typeof updates[key] === 'object' && updates[key] !== null && !Array.isArray(updates[key])) {
        output[key] = mergeDeep(target[key] || {}, updates[key]);
      } else {
        output[key] = updates[key];
      }
    }
    return output;
  };

  const updateToolState = useCallback((updates) => {
    setToolState((prev) => {
      const merged = mergeDeep(prev, updates);
      const next = {
        ...merged,
        _lastUpdated: Date.now(),
        lastAction: updates.lastAction || prev.lastAction || null,
        snapshot: { ...merged.snapshot, updatedAt: Date.now(), stage: merged.stage },
      };
      saveState(next);
      return next;
    });
  }, []);

  const clearToolState = useCallback(() => {
    const cleared = { ...DEFAULT_STATE, _lastUpdated: Date.now() };
    setToolState(cleared);
    saveState(cleared);
  }, []);

  const clearChannel = useCallback((channel) => {
    setToolState((prev) => {
      const next = { ...prev, [channel]: {}, _lastUpdated: Date.now(), lastAction: `cleared_${channel}` };
      saveState(next);
      return next;
    });
  }, []);

  return { toolState, updateToolState, clearToolState, clearChannel };
}

/** Check whether the user has completed the quiz (reads from localStorage). */
export function isQuizComplete() {
  try {
    const raw = localStorage.getItem('dd-quiz-results');
    return !!raw;
  } catch {
    return false;
  }
}

/** Get the stored quiz result. */
export function getQuizResult() {
  try {
    const raw = localStorage.getItem('dd-quiz-results');
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export default { useToolState, isQuizComplete, getQuizResult };
