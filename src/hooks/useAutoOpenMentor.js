import { useEffect, useRef, useState } from 'react';
import { useToolState } from '../hooks/useToolState.js';

export function useAutoOpenMentor(delay = 600) {
  const { toolState } = useToolState();
  const [openCount, setOpenCount] = useState(0);
  const prevFlags = useRef({ hasCalculated: false, analyzed: false, quizComplete: false });

  useEffect(() => {
    const fired = Boolean(
      toolState?.hasCalculated || toolState?.analyzed || toolState?.quizComplete
    );
    const wasFired = Boolean(
      prevFlags.current.hasCalculated ||
      prevFlags.current.analyzed ||
      prevFlags.current.quizComplete
    );

    prevFlags.current = {
      hasCalculated: Boolean(toolState?.hasCalculated),
      analyzed: Boolean(toolState?.analyzed),
      quizComplete: Boolean(toolState?.quizComplete),
    };

    if (fired && !wasFired) {
      const timer = setTimeout(() => {
        setOpenCount((n) => n + 1);
      }, delay);
      return () => clearTimeout(timer);
    }
  }, [toolState, delay]);

  return openCount;
}

export default useAutoOpenMentor;
