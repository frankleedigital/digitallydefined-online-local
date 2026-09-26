import React, { useState, useEffect } from 'react';
import { Menu, X, Sparkles, ArrowRight, ShieldCheck, Zap } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import Logo from './Logo';
import { getUserState } from '../lib/userState';
import { theme } from '../config/theme';

export default function BrandNav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [userState, setUserState] = useState(getUserState());
  const location = useLocation();

  useEffect(() => {
    const handleUpdate = () => setUserState(getUserState());
    window.addEventListener('dd_user_state_updated', handleUpdate);
    window.addEventListener('storage', handleUpdate);
    return () => {
      window.removeEventListener('dd_user_state_updated', handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/framework', label: 'Framework' },
    { href: '/start-here', label: 'Start Here' },
    { href: '/quiz', label: 'Quiz' },
    { href: '/tools', label: 'Tools' },
    { href: '/builder', label: 'Builder Plan' },
    { href: '/empire', label: 'Empire Plan' },
    { href: '/pricing', label: 'Pricing' },
    { href: '/about', label: 'Our Mission' },
  ];

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        backgroundColor: '#FFFCF9',
        borderBottom: '2px solid #1F2937',
        padding: '0.75rem 1.25rem',
      }}
    >
      <div
        style={{
          maxWidth: '1080px',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
          flexWrap: 'nowrap',
        }}
      >
        {/* Brand Logo */}
        <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
          <Logo showTagline={false} size="medium" />
        </Link>

        {/* Desktop Navigation Links */}
        <nav
          style={{
            display: 'none',
            alignItems: 'center',
            gap: '1.15rem',
          }}
          className="desktop-nav-menu"
        >
          {navLinks.map((link) => {
            const isActive = location.pathname === link.href;
            return (
              <Link
                key={link.href}
                to={link.href}
                style={{
                  fontFamily: "'Inter', system-ui, sans-serif",
                  fontSize: '0.75rem',
                  fontWeight: 800,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  textDecoration: 'none',
                  color: isActive ? '#F18B25' : '#1F2937',
                  borderBottom: isActive ? '2px solid #F18B25' : '2px solid transparent',
                  paddingBottom: '2px',
                  transition: 'color 150ms ease',
                }}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Action CTAs + Personalization Badge */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
          {userState.hasQuiz && userState.profile ? (
            <Link
              to="/tools/roadmap"
              style={{
                display: 'none',
                alignItems: 'center',
                gap: '0.4rem',
                padding: '0.35rem 0.65rem',
                backgroundColor: '#FFFFFF',
                border: '2px solid #1F2937',
                fontSize: '0.65rem',
                fontWeight: 800,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                color: '#1F2937',
                textDecoration: 'none',
                boxShadow: '2px 2px 0 0 #1F2937',
              }}
              className="user-progress-badge"
            >
              <Sparkles size={13} color="#F18B25" />
              <span>{userState.profile.title.replace('The ', '')}</span>
            </Link>
          ) : null}

          <Link
            to={userState.hasQuiz ? '/gap' : '/quiz'}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              padding: '0.45rem 0.95rem',
              backgroundColor: '#F18B25',
              color: '#1F2937',
              border: '2px solid #1F2937',
              fontFamily: "'Inter', system-ui, sans-serif",
              fontSize: '0.72rem',
              fontWeight: 900,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              whiteSpace: 'nowrap',
              boxShadow: '2px 2px 0 0 #1F2937',
            }}
          >
            <span>{userState.hasQuiz ? 'Calculate Gap →' : 'Take Free Quiz →'}</span>
          </Link>

          <a
            href="https://dashboard.digitallydefined.online"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'none',
              alignItems: 'center',
              gap: '0.4rem',
              padding: '0.45rem 0.75rem',
              backgroundColor: '#FFFFFF',
              color: '#1F2937',
              border: '2px solid #1F2937',
              fontFamily: "'Inter', system-ui, sans-serif",
              fontSize: '0.72rem',
              fontWeight: 800,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              whiteSpace: 'nowrap',
            }}
            className="dashboard-link-btn"
          >
            <span>Dashboard</span>
          </a>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '36px',
              height: '36px',
              backgroundColor: '#FFFFFF',
              border: '2px solid #1F2937',
              cursor: 'pointer',
              color: '#1F2937',
              boxShadow: '2px 2px 0 0 #1F2937',
            }}
            className="mobile-toggle-btn"
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {menuOpen && (
        <div
          style={{
            maxWidth: '1080px',
            margin: '0.75rem auto 0',
            paddingTop: '0.75rem',
            borderTop: '2px solid #1F2937',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.65rem',
          }}
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              onClick={() => setMenuOpen(false)}
              style={{
                fontFamily: "'Inter', system-ui, sans-serif",
                fontSize: '0.82rem',
                fontWeight: 800,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                textDecoration: 'none',
                color: location.pathname === link.href ? '#F18B25' : '#1F2937',
                padding: '0.4rem 0.25rem',
              }}
            >
              {link.label}
            </Link>
          ))}
          <div style={{ paddingTop: '0.5rem', borderTop: '1px solid #E5E7EB', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            <Link
              to="/gap"
              onClick={() => setMenuOpen(false)}
              style={{
                flex: 1,
                textAlign: 'center',
                padding: '0.55rem',
                backgroundColor: '#FFFFFF',
                border: '2px solid #1F2937',
                fontSize: '0.72rem',
                fontWeight: 800,
                textTransform: 'uppercase',
                textDecoration: 'none',
                color: '#1F2937',
                boxShadow: '2px 2px 0 0 #1F2937',
              }}
            >
              Retirement Gap
            </Link>
            <a
              href="https://dashboard.digitallydefined.online"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                flex: 1,
                textAlign: 'center',
                padding: '0.55rem',
                backgroundColor: '#1F2937',
                border: '2px solid #1F2937',
                fontSize: '0.72rem',
                fontWeight: 800,
                textTransform: 'uppercase',
                textDecoration: 'none',
                color: '#FFFFFF',
              }}
            >
              Open Dashboard
            </a>
          </div>
        </div>
      )}

      {/* Embedded CSS for responsive breakpoint behavior */}
      <style>{`
        @media (min-width: 1024px) {
          .desktop-nav-menu {
            display: flex !important;
          }
          .mobile-toggle-btn {
            display: none !important;
          }
          .dashboard-link-btn,
          .user-progress-badge {
            display: inline-flex !important;
          }
        }
      `}</style>
    </header>
  );
}