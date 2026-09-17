import { useState, useEffect, useCallback, useRef } from 'react';
import { getHermesStatus } from '../lib/hermes.js';

const DEFAULT_INTERVAL = 30000;

/**
 * Polls /api/hermes/status so the MentorWidget can show a green light
 * whenever Hermes is reachable.
 */
export function useHermesStatus({ interval = DEFAULT_INTERVAL, enabled = true } = {}) {
  const [online, setOnline] = useState(false);
  const [checking, setChecking] = useState(true);
  const [error, setError] = useState(null);
  const [lastChecked, setLastChecked] = useState(null);
  const mounted = useRef(true);

  const check = useCallback(async () => {
    if (!mounted.current) return;
    setChecking(true);
    const result = await getHermesStatus();
    if (!mounted.current) return;
    setOnline(Boolean(result.online));
    setError(result.error || null);
    setLastChecked(result.checkedAt || Date.now());
    setChecking(false);
  }, []);

  useEffect(() => {
    mounted.current = true;
    if (enabled) check();
    return () => {
      mounted.current = false;
    };
  }, [enabled, check]);

  useEffect(() => {
    if (!enabled) return undefined;
    const id = setInterval(check, interval);
    return () => clearInterval(id);
  }, [enabled, interval, check]);

  return { online, checking, error, lastChecked, refresh: check };
}

export default useHermesStatus;
