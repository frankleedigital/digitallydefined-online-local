import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSiteContent } from '../hooks/useSiteContent';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/#tools', label: 'Tools' },
  { href: '/quiz', label: 'Quiz' },
];

const navCtas = [{ href: '/dashboard', label: 'Open Dashboard →' }];

const externalLinks = [];

export default function BrandNav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const content = useSiteContent();

  return (
    <header className="brand-nav">
      <div className="brand-nav__inner dd-container">
        <Link to="/" className="brand-logo" aria-label="DigitallyDefined home">
          <span className="brand-logo__name">Digitally<span>Defined</span></span>
          <small>{content['nav.tagline']}</small>
        </Link>

        <nav className="desktop-nav brand-nav__links" aria-label="Primary navigation">
          {navLinks.map((link) => (
            <Link key={link.href} to={link.href}>{link.label}</Link>
          ))}
        </nav>

        <div className="brand-nav__end">
          {navCtas.map((link) => (
            <Link key={link.href} to={link.href} className="nav-cta">
              {link.label}
            </Link>
          ))}

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
      </div>

      {menuOpen && (
        <nav id="mobile-navigation" className="brand-nav__mobile" aria-label="Mobile navigation">
          {navLinks.map((link) => (
            <Link key={link.href} to={link.href} onClick={() => setMenuOpen(false)}>
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
