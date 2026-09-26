import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Logo from './Logo';
import {
  Sparkles,
  Calculator,
  Compass,
  Layers,
  Wrench,
  ArrowRight,
  Menu,
  X,
  Bot
} from 'lucide-react';
import { getUserData, subscribeUserData } from '../lib/userState';

export default function BrandNav() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userData, setUserData] = useState(() => getUserData());
  const location = useLocation();

  useEffect(() => {
    const unsub = subscribeUserData((updated) => {
      setUserData(updated);
    });
    return unsub;
  }, []);

  const isActive = (path) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  const navLinks = [
    { label: 'Start Here', href: '/start-here', icon: Compass },
    { label: 'Framework', href: '/framework', icon: Layers },
    { label: 'Tools', href: '/tools', icon: Wrench },
    { label: 'Gap Calculator', href: '/gap', icon: Calculator },
    { label: 'Quiz', href: '/quiz', icon: Sparkles },
    { label: 'Plans', href: '/pricing', icon: null },
  ];

  return (
    <header
      style={{
        backgroundColor: '#FFFFFF',
        borderBottom: '1.5px solid #1F2937',
        position: 'sticky',
        top: 0,
        zIndex: 100,
      }}
    >
      {/* Top Value Banner — Warm, Airy, Feminine (No dark masculine bar) */}
      <div
        style={{
          backgroundColor: '#FFF7ED',
          borderBottom: '1px solid #FED7AA',
          padding: '0.45rem 1rem',
          textAlign: 'center',
          fontSize: '0.78rem',
          fontFamily: "'DM Sans', system-ui, sans-serif",
          color: '#9A3412',
          fontWeight: 600,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.5rem',
        }}
      >
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.35rem',
            backgroundColor: '#FFFFFF',
            border: '1px solid #F18B25',
            color: '#F18B25',
            fontSize: '0.65rem',
            fontWeight: 800,
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            padding: '0.1rem 0.45rem',
          }}
        >
          GEN X REINVENTION
        </span>
        <span>
          Build faceless digital real estate with AI — 0 camera hours, no tech overwhelm.
        </span>
        <Link
          to="/gap"
          style={{
            color: '#F18B25',
            fontWeight: 700,
            textDecoration: 'underline',
            marginLeft: '0.25rem',
          }}
        >
          Check your retirement gap →
        </Link>
      </div>

      {/* Main Nav Container — Centered, Max-Width 1040px */}
      <div
        style={{
          maxWidth: '1040px',
          margin: '0 auto',
          padding: '0.75rem 1.25rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* Brand Logo */}
        <Link to="/" style={{ textDecoration: 'none' }}>
          <Logo size="medium" />
        </Link>

        {/* Desktop Nav Items */}
        <nav
          style={{
            display: 'none',
            alignItems: 'center',
            gap: '1.5rem',
          }}
          className="desktop-nav"
        >
          {navLinks.map((link) => {
            const active = isActive(link.href);
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                to={link.href}
                style={{
                  fontFamily: "'Inter', system-ui, sans-serif",
                  fontSize: '0.82rem',
                  fontWeight: active ? 800 : 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  color: active ? '#F18B25' : '#1F2937',
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  padding: '0.35rem 0.25rem',
                  borderBottom: active ? '2px solid #F18B25' : '2px solid transparent',
                  transition: 'all 0.15s ease',
                }}
              >
                {Icon && <Icon size={14} strokeWidth={2} />}
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Action Group */}
        <div
          style={{
            display: 'none',
            alignItems: 'center',
            gap: '0.75rem',
          }}
          className="desktop-nav"
        >
          {/* User State Badge */}
          {userData?.superpower?.type ? (
            <Link
              to="/quiz"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
                backgroundColor: '#FFF7ED',
                border: '1px solid #F18B25',
                color: '#9A3412',
                fontSize: '0.72rem',
                fontWeight: 700,
                padding: '0.35rem 0.65rem',
                textDecoration: 'none',
              }}
            >
              <Sparkles size={12} color="#F18B25" />
              <span>Archetype: {userData.superpower.type}</span>
            </Link>
          ) : (
            <Link
              to="/quiz"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
                backgroundColor: '#FFFFFF',
                border: '1.5px solid #1F2937',
                color: '#1F2937',
                fontSize: '0.75rem',
                fontWeight: 800,
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                padding: '0.45rem 0.85rem',
                textDecoration: 'none',
                boxShadow: 'none',
              }}
            >
              <Sparkles size={13} color="#F18B25" />
              <span>Free Quiz</span>
            </Link>
          )}

          {/* Primary CTA */}
          <Link
            to="/start-here"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              backgroundColor: '#F18B25',
              border: '1.5px solid #1F2937',
              color: '#1F2937',
              fontSize: '0.75rem',
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              padding: '0.45rem 1rem',
              textDecoration: 'none',
              boxShadow: 'none',
            }}
          >
            <span>Start Here</span>
            <ArrowRight size={13} strokeWidth={2.5} />
          </Link>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle navigation"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '38px',
            height: '38px',
            backgroundColor: '#FFFFFF',
            border: '1.5px solid #1F2937',
            color: '#1F2937',
            cursor: 'pointer',
            padding: 0,
            boxShadow: 'none',
          }}
          className="mobile-toggle"
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Drawer (Zero Shadow, Thin Frame) */}
      {mobileMenuOpen && (
        <div
          style={{
            backgroundColor: '#FFFFFF',
            borderTop: '1.5px solid #1F2937',
            padding: '1rem 1.25rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.75rem',
          }}
        >
          {navLinks.map((link) => {
            const active = isActive(link.href);
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                to={link.href}
                onClick={() => setMobileMenuOpen(false)}
                style={{
                  fontFamily: "'Inter', system-ui, sans-serif",
                  fontSize: '0.9rem',
                  fontWeight: active ? 800 : 600,
                  textTransform: 'uppercase',
                  color: active ? '#F18B25' : '#1F2937',
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.6rem',
                  padding: '0.65rem 0.5rem',
                  borderBottom: '1px solid #F3F4F6',
                }}
              >
                {Icon && <Icon size={16} color={active ? '#F18B25' : '#1F2937'} />}
                {link.label}
              </Link>
            );
          })}

          <div
            style={{
              paddingTop: '0.75rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5rem',
            }}
          >
            <Link
              to="/start-here"
              onClick={() => setMobileMenuOpen(false)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                backgroundColor: '#F18B25',
                border: '1.5px solid #1F2937',
                color: '#1F2937',
                fontSize: '0.85rem',
                fontWeight: 800,
                textTransform: 'uppercase',
                padding: '0.75rem',
                textDecoration: 'none',
                boxShadow: 'none',
              }}
            >
              <span>Get Started</span>
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      )}

      {/* Inline styles for responsive display */}
      <style>{`
        @media (min-width: 820px) {
          .desktop-nav {
            display: flex !important;
          }
          .mobile-toggle {
            display: none !important;
          }
        }
      `}</style>
    </header>
  );
}
