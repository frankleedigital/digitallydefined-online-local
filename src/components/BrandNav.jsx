import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';

// Replace with your Facebook Group URL
const FACEBOOK_GROUP_URL = 'https://www.facebook.com/groups/YOUR_GROUP_ID';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/quiz', label: 'Quiz' },
  { href: FACEBOOK_GROUP_URL, label: 'Community', external: true },
];

export default function BrandNav() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="brand-nav">
      <div className="brand-nav__inner dd-container">
        <Link to="/" className="brand-logo" aria-label="DigitallyDefined home">
          <span className="brand-logo__name">Digitally<span>Defined</span></span>
        </Link>

        <nav className="desktop-nav brand-nav__links" aria-label="Primary navigation">
          {navLinks.map((link) =>
            link.external ? (
              <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer" className="nav-link">{link.label}</a>
            ) : (
              <Link key={link.href} to={link.href} className="nav-link">{link.label}</Link>
            )
          )}
        </nav>

        <button
          type="button"
          className="mobile-menu-btn brand-nav__menu"
          onClick={() => setMenuOpen((open) => !open)}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {menuOpen && (
        <nav id="mobile-navigation" className="brand-nav__mobile" aria-label="Mobile navigation">
          {navLinks.map((link) =>
            link.external ? (
              <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer" onClick={() => setMenuOpen(false)}>{link.label}</a>
            ) : (
              <Link key={link.href} to={link.href} onClick={() => setMenuOpen(false)}>{link.label}</Link>
            )
          )}
        </nav>
      )}
    </header>
  );
}

