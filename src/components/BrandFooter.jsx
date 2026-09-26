import React from 'react';
import SocialIcons from './SocialIcons';
import { FACEBOOK_GROUP_URL } from './BrandNav';

export default function BrandFooter() {
  return (
    <footer className="brand-footer">
      <div className="brand-footer__inner dd-container">

        {/* Top row: logo + nav columns */}
        <div className="brand-footer__top">
          <div className="brand-footer__brand">
            <div className="brand-logo brand-logo--footer">
              <span className="brand-logo__name">Digitally<span>Defined</span></span>
            </div>
            <small className="brand-footer__tagline">Digital Reinvention for Gen X Women</small>
            <p className="brand-footer__mission">
              Build faceless digital property. Close the retirement gap. Leave a working legacy.
            </p>
            <SocialIcons />
          </div>

          <div className="brand-footer__nav-cols">
            <div className="brand-footer__nav-col">
              <span className="brand-footer__nav-heading">Start</span>
              <a href="/" className="brand-footer__nav-link">Home</a>
              <a href="/start-here" className="brand-footer__nav-link">Start Here</a>
              <a href="/quiz" className="brand-footer__nav-link">Take the Quiz</a>
              <a href="/roadmap/builder" className="brand-footer__nav-link">See a Roadmap</a>
            </div>
            <div className="brand-footer__nav-col">
              <span className="brand-footer__nav-heading">Learn</span>
              <a href="/framework" className="brand-footer__nav-link">The Framework</a>
              <a href="/retirement-gap" className="brand-footer__nav-link">Retirement Gap</a>
              <a href="/builder" className="brand-footer__nav-link">Builder Plan</a>
              <a href="/empire" className="brand-footer__nav-link">Empire Plan</a>
            </div>
            <div className="brand-footer__nav-col">
              <span className="brand-footer__nav-heading">Community</span>
              <a href={FACEBOOK_GROUP_URL} target="_blank" rel="noopener noreferrer" className="brand-footer__nav-link">Facebook Group</a>
              <a href="/tools" className="brand-footer__nav-link">Tools</a>
              <a href="/dashboard" className="brand-footer__nav-link">Dashboard</a>
            </div>
          </div>
        </div>

        {/* Bottom row: CTA + copyright */}
        <div className="brand-footer__bottom">
          <a
            href={FACEBOOK_GROUP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="dd-btn dd-btn--primary"
          >
            Join the Community →
          </a>
          <small className="brand-footer__copyright">
            &copy; {new Date().getFullYear()} DigitallyDefined. All rights reserved.
          </small>
        </div>

      </div>
    </footer>
  );
}
