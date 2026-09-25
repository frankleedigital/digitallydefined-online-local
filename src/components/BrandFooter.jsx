import React from 'react';
import SocialIcons from './SocialIcons';
import { theme } from '../config/theme';

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
          href="https://facebook.com/groups/digitallydefin1"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '14px 20px',
            background: theme.colors.orange,
            color: '#111111',
            border: '1px solid #111111',
            borderRadius: 0,
            fontFamily: "'DM Sans', system-ui, sans-serif",
            fontWeight: 700,
            fontSize: '0.85rem',
            textDecoration: 'none',
            marginTop: '1rem',
          }}
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
