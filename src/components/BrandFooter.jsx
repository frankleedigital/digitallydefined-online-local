import React from 'react';
import SocialIcons from './SocialIcons';
import { FACEBOOK_GROUP_URL } from './BrandNav';

export default function BrandFooter() {
  return (
    <footer className="brand-footer">
      <div className="brand-footer__inner dd-container">
        <div className="brand-logo brand-logo--footer">
          <span className="brand-logo__name">Digitally<span>Defined</span></span>
          <small>Digital Reinvention for Gen X Women</small>
        </div>

        <p>Build faceless digital property. Close the retirement gap. Leave a working legacy.</p>
        <SocialIcons />

        <a
          href={FACEBOOK_GROUP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn--primary"
        >
          Join the Community
        </a>

        <small className="brand-footer__copyright">
          &copy; {new Date().getFullYear()} DigitallyDefined. All rights reserved.
        </small>
      </div>
    </footer>
  );
}
