// src/hooks/useAuth.js — gated navigation helpers based on quiz completion

import { useState, useEffect } from 'react';

const STORAGE_KEY = 'dd-quiz-results';

export function useAuth() {
  const [unlocked, setUnlocked] = useState(false);

  useEffect(() => {
    function check() {
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        setUnlocked(!!raw);
      } catch {
        setUnlocked(false);
      }
    }
    check();
    window.addEventListener('storage', check);
    return () => window.removeEventListener('storage', check);
  }, []);

  return { unlocked };
}

export default { useAuth };
