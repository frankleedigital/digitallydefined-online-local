import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { isQuizComplete } from '../hooks/useToolState.js';

const FACEBOOK_GROUP_URL = 'https://www.facebook.com/groups/digitallydefin1';

export default function BrandNav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [unlocked, setUnlocked] = useState(false);

  useEffect(() => {
    setUnlocked(isQuizComplete());
    const handler = () => setUnlocked(isQuizComplete());
    window.addEventListener('storage', handler);
    return () => window.removeEventListener('storage', handler);
  }, []);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/quiz', label: 'Quiz' },
    ...(unlocked ? [{ href: '/roadmap', label: 'Roadmap' }, { href: '/dashboard', label: 'Dashboard' }, { href: '/tools', label: 'Tools' }] : []),
    { href: FACEBOOK_GROUP_URL, label: 'Community', external: true },
  ];

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

        <button type="button" className="mobile-menu-btn brand-nav__menu" onClick={() => setMenuOpen((open) => !open)} aria-expanded={menuOpen} aria-label={menuOpen ? 'Close menu' : 'Open menu'}>
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


