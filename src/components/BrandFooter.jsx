import React from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo';
import {
  Shield,
  Sparkles,
  Lock,
  Layers,
  Wrench,
  Calculator,
  Compass,
  Heart,
  Bot
} from 'lucide-react';

export default function BrandFooter() {
  return (
    <footer
      style={{
        backgroundColor: '#FFFFFF',
        borderTop: '1.5px solid #1F2937',
        marginTop: 'auto',
      }}
    >
      {/* Centered Footer Content Container (Max-Width 1040px) */}
      <div
        style={{
          maxWidth: '1040px',
          margin: '0 auto',
          padding: '3.5rem 1.25rem 2.5rem',
        }}
      >
        {/* Top Grid: Manifesto & Ecosystem */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '2.5rem',
            paddingBottom: '2.5rem',
            borderBottom: '1px solid #E5E7EB',
          }}
        >
          {/* Brand & Gen X Women Mission */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
            <Logo size="medium" />
            <p
              style={{
                fontFamily: "'DM Sans', system-ui, sans-serif",
                fontSize: '0.88rem',
                color: '#4B5563',
                lineHeight: 1.6,
                margin: 0,
              }}
            >
              The faceless digital ecosystem designed specifically for Gen X women to close the
              retirement gap by building automated digital assets with AI—without being on camera.
            </p>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                backgroundColor: '#FFF7ED',
                border: '1px solid #F18B25',
                padding: '0.35rem 0.65rem',
                fontSize: '0.72rem',
                fontWeight: 700,
                color: '#9A3412',
                marginTop: '0.25rem',
                width: 'fit-content',
              }}
            >
              <Shield size={13} color="#F18B25" />
              <span>100% Faceless • Zero Camera Required</span>
            </div>
          </div>

          {/* Quick Pathways */}
          <div>
            <h4
              style={{
                fontFamily: "'Inter', system-ui, sans-serif",
                fontSize: '0.8rem',
                fontWeight: 800,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: '#1F2937',
                marginBottom: '1rem',
              }}
            >
              System Pathways
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              <li>
                <Link to="/start-here" style={{ color: '#4B5563', textDecoration: 'none', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Compass size={14} color="#F18B25" />
                  <span>3-Step Start Guide</span>
                </Link>
              </li>
              <li>
                <Link to="/framework" style={{ color: '#4B5563', textDecoration: 'none', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Layers size={14} color="#47B7D4" />
                  <span>4-Tier Faceless System</span>
                </Link>
              </li>
              <li>
                <Link to="/pricing" style={{ color: '#4B5563', textDecoration: 'none', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <span style={{ width: '14px', textAlign: 'center', fontWeight: 800, color: '#F18B25', fontSize: '0.8rem' }}>$</span>
                  <span>Plans & Membership</span>
                </Link>
              </li>
              <li>
                <Link to="/about" style={{ color: '#4B5563', textDecoration: 'none', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Heart size={14} color="#E05D52" />
                  <span>About Our Mission</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Interactive Tools */}
          <div>
            <h4
              style={{
                fontFamily: "'Inter', system-ui, sans-serif",
                fontSize: '0.8rem',
                fontWeight: 800,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: '#1F2937',
                marginBottom: '1rem',
              }}
            >
              Interactive Tools
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              <li>
                <Link to="/gap" style={{ color: '#4B5563', textDecoration: 'none', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Calculator size={14} color="#F18B25" />
                  <span>Retirement Gap Calculator</span>
                </Link>
              </li>
              <li>
                <Link to="/quiz" style={{ color: '#4B5563', textDecoration: 'none', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Sparkles size={14} color="#47B7D4" />
                  <span>Superpower Archetype Quiz</span>
                </Link>
              </li>
              <li>
                <Link to="/tools" style={{ color: '#4B5563', textDecoration: 'none', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Wrench size={14} color="#1F2937" />
                  <span>Complete Tools Directory</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Privacy & Trust Box */}
          <div
            style={{
              backgroundColor: '#FAF8F5',
              border: '1.5px solid #1F2937',
              padding: '1.25rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.65rem',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
              <Lock size={15} color="#1F2937" />
              <span
                style={{
                  fontFamily: "'Inter', system-ui, sans-serif",
                  fontSize: '0.75rem',
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  color: '#1F2937',
                }}
              >
                Privacy-First Architecture
              </span>
            </div>
            <p
              style={{
                fontFamily: "'DM Sans', system-ui, sans-serif",
                fontSize: '0.8rem',
                color: '#4B5563',
                margin: 0,
                lineHeight: 1.5,
              }}
            >
              Calculators and quiz assessments run client-side. Your financial figures and answers
              remain private to your browser session.
            </p>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Principles */}
        <div
          style={{
            paddingTop: '1.5rem',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem',
            fontSize: '0.78rem',
            color: '#6B7280',
            fontFamily: "'DM Sans', system-ui, sans-serif",
          }}
        >
          <div>
            © {new Date().getFullYear()} DigitallyDefined. Built for Gen X Women Reinventing Themselves.
          </div>
          <div style={{ display: 'flex', gap: '1.25rem' }}>
            <Link to="/about" style={{ color: '#6B7280', textDecoration: 'none' }}>Manifesto</Link>
            <Link to="/contact" style={{ color: '#6B7280', textDecoration: 'none' }}>Contact & Feedback</Link>
            <Link to="/start-here" style={{ color: '#F18B25', textDecoration: 'none', fontWeight: 700 }}>Get Started</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
