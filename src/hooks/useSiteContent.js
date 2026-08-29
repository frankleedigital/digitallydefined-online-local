// hooks/useSiteContent.js
// React hook that loads the merged site content (defaults + Hermes overrides)
// once per app, returning a stable map. Falls back to defaults until loaded.

import { useEffect, useState } from 'react';
import { getSiteContent, DEFAULT_SITE_CONTENT } from '../lib/siteContent';

export function useSiteContent() {
  const [content, setContent] = useState(DEFAULT_SITE_CONTENT);

  useEffect(() => {
    let active = true;
    getSiteContent().then((loaded) => {
      if (active) setContent(loaded);
    });
    return () => {
      active = false;
    };
  }, []);

  return content;
}

export default useSiteContent;