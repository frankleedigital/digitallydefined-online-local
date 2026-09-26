import React from 'react';
import BrandNav from '../BrandNav';
import BrandFooter from '../BrandFooter';
import MentorWidget from '../MentorWidget';

/**
 * SiteLayout
 * Wraps every page with the shared site chrome (nav + footer + Hermes AI Mentor).
 */

export default function Layout({ children }) {
  return (
    <div className="site-shell" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <BrandNav />

      <main className="site-main" style={{ flex: 1 }}>
        {children}
      </main>

      <BrandFooter />

      {/* Hermes AI Mentor — Always accessible, shadow-free, visible across key pages */}
      <MentorWidget />
    </div>
  );
}
