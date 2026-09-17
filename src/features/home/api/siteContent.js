// lib/siteContent.js
// Runtime site copy loader for the DigitallyDefined marketing site.
// Hermes can change these fields through the `website.edit` action (which writes
// overrides to the Supabase `site_content` table). This module merges those
// overrides over the hardcoded defaults below, then components render the merged
// values. If the fetch fails or returns nothing for a key, the default copy is
// used — so the site never breaks when the store is unavailable.

import { getSupabaseEdgeUrl, getSupabaseEdgeHeaders } from '../../../api/supabase.js';

export const DEFAULT_SITE_CONTENT = {
  'nav.tagline': 'Digital Reinvention for Gen X Women',
  'home.heroEyebrow': 'Start here / not everywhere',
  'home.heroHeadline': 'Build Faceless Digital Assets.',
  'home.heroTagline':
    'Start your path to freedom-based digital ownership. No camera. No invented urgency. No promise of overnight income.',
  'home.pathHeading': 'One path from retirement anxiety to an asset you own.',
  'home.finalCtaHeading': 'Start with the truth of your numbers. Then build one useful asset.',
};

const SESSION_KEY = 'dd_site_content_cache';
let cached = null;
let inflight = null;

function readSessionCache() {
  if (typeof window === 'undefined' || !window.sessionStorage) return null;
  try {
    const raw = window.sessionStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed === 'object') return parsed;
  } catch {
    // ignore invalid cache state and retry network fetch
  }
  return null;
}

function writeSessionCache(content) {
  if (typeof window === 'undefined' || !window.sessionStorage) return;
  try {
    window.sessionStorage.setItem(SESSION_KEY, JSON.stringify(content));
  } catch {
    // storage may be full or unavailable; fail silently
  }
}

/**
 * Fetch website content overrides (merged over defaults), cached for the page
 * session. Returns the full content map. Never throws.
 */
export async function getSiteContent() {
  if (cached) return cached;
  if (inflight) return inflight;

  const sessionCache = readSessionCache();
  if (sessionCache) {
    cached = { ...DEFAULT_SITE_CONTENT, ...sessionCache };
    return cached;
  }

  inflight = (async () => {
    const content = { ...DEFAULT_SITE_CONTENT };
    try {
      const res = await fetch(getSupabaseEdgeUrl(), {
        method: 'POST',
        headers: getSupabaseEdgeHeaders(),
        body: JSON.stringify({ action: 'website.content' }),
        signal: AbortSignal.timeout(8000),
      });
      if (res.ok) {
        const data = await res.json();
        if (data?.content && typeof data.content === 'object') {
          for (const [key, value] of Object.entries(data.content)) {
            if (key in content && typeof value === 'string' && value) {
              content[key] = value;
            }
          }
        }
      }
    } catch {
      // offline / availability — fall back to defaults
    }
    cached = content;
    writeSessionCache(content);
    return content;
  })();

  try {
    return await inflight;
  } finally {
    inflight = null;
  }
}

export default getSiteContent;
