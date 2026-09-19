import React from 'react';
import BrandNav from '../BrandNav';
import BrandFooter from '../BrandFooter';
import MentorWidget from '../MentorWidget';

/**
 * SiteLayout
 * Wraps every page with the shared site chrome (nav + footer + AI Mentor widget).
 */

export default function Layout({ children }) {
  return (
    <div className="site-shell">
      <BrandNav />

      <main className="site-main">
        {children}
      </main>

      <BrandFooter />

      {/* AI Mentor (Hermes) — available on every page */}
      <MentorWidget />
    </div>
  );
}
