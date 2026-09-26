import React from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo';
import SocialIcons from './SocialIcons';
import { Shield, Sparkles, ArrowRight, Lock, EyeOff } from 'lucide-react';
import { theme } from '../config/theme';

export default function BrandFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      style={{
        backgroundColor: '#FFFCF9',
        borderTop: '2px solid #1F2937',
        padding: '3.5rem 1.25rem 2.5rem',
        marginTop: 'auto',
      }}
    >
      <div
        style={{
          maxWidth: '1080px',
          margin: '0 auto',
        }}
      >
        {/* Top Section: Brand Statement & Community Card */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '2.5rem',
            marginBottom: '3rem',
            paddingBottom: '2.5rem',
            borderBottom: '2px solid #1F2937',
          }}
        >
          {/* Brand Col */}
          <div>
            <Logo size="medium" showTagline={true} style={{ marginBottom: '1.25rem' }} />
            <p
              style={{
                fontFamily: "'DM Sans', system-ui, sans-serif",
                fontSize: '0.92rem',
                lineHeight: 1.65,
                color: '#4B5563',
                maxWidth: '420px',
                marginTop: '1rem',
              }}
            >
              The definitive operating system for Gen X women building faceless digital real estate.
              Close the retirement gap, build quiet wealth, and scale recurring income assets without
              ever stepping in front of a camera.
            </p>

            <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  padding: '0.35rem 0.65rem',
                  backgroundColor: '#FFFFFF',
                  border: '2px solid #1F2937',
                  fontSize: '0.68rem',
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  color: '#1F2937',
                  boxShadow: '2px 2px 0 0 #1F2937',
                }}
              >
                <EyeOff size={13} color="#F18B25" />
                <span>Faceless by Design</span>
              </div>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  padding: '0.35rem 0.65rem',
                  backgroundColor: '#FFFFFF',
                  border: '2px solid #1F2937',
                  fontSize: '0.68rem',
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  color: '#1F2937',
                  boxShadow: '2px 2px 0 0 #1F2937',
                }}
              >
                <Lock size={13} color="#47B7D4" />
                <span>Privacy-First</span>
              </div>
            </div>
          </div>

          {/* Quick Links: Blueprint & Roadmaps */}
          <div>
            <h4
              style={{
                fontFamily: "'Inter', system-ui, sans-serif",
                fontSize: '0.82rem',
                fontWeight: 900,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: '#1F2937',
                marginBottom: '1rem',
              }}
            >
              Core Ecosystem
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: '0.65rem' }}>
              {[
                { label: 'Faceless Framework', href: '/framework' },
                { label: 'Start Here Blueprint', href: '/start-here' },
                { label: 'Digital Superpower Quiz', href: '/quiz' },
                { label: 'Retirement Gap Calculator', href: '/gap' },
                { label: 'Freedom Number Calculator', href: '/freedom' },
                { label: '10x ROI Wealth Tool', href: '/roi' },
                { label: 'Niche Scorecard', href: '/scorecard' },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    to={item.href}
                    style={{
                      fontFamily: "'DM Sans', system-ui, sans-serif",
                      fontSize: '0.88rem',
                      fontWeight: 600,
                      color: '#4B5563',
                      textDecoration: 'none',
                    }}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Plans & Studio */}
          <div>
            <h4
              style={{
                fontFamily: "'Inter', system-ui, sans-serif",
                fontSize: '0.82rem',
                fontWeight: 900,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: '#1F2937',
                marginBottom: '1rem',
              }}
            >
              Plans & Studio
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: '0.65rem' }}>
              {[
                { label: 'Builder Plan ($47/mo)', href: '/builder' },
                { label: 'Empire Plan ($197/mo)', href: '/empire' },
                { label: 'Full Pricing Matrix', href: '/pricing' },
                { label: 'Digital Products Catalog', href: '/products' },
                { label: 'AI & Automation Engine', href: '/automation' },
                { label: 'Our Mission & Story', href: '/about' },
                { label: 'Contact & Support', href: '/contact' },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    to={item.href}
                    style={{
                      fontFamily: "'DM Sans', system-ui, sans-serif",
                      fontSize: '0.88rem',
                      fontWeight: 600,
                      color: '#4B5563',
                      textDecoration: 'none',
                    }}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Community & Mastermind */}
          <div>
            <div
              style={{
                backgroundColor: '#FFFFFF',
                border: '2px solid #1F2937',
                padding: '1.35rem',
                boxShadow: '4px 4px 0 0 #1F2937',
              }}
            >
              <h4
                style={{
                  fontFamily: "'Inter', system-ui, sans-serif",
                  fontSize: '0.85rem',
                  fontWeight: 900,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: '#1F2937',
                  marginBottom: '0.5rem',
                }}
              >
                Join 1,280+ Gen X Women
              </h4>
              <p
                style={{
                  fontFamily: "'DM Sans', system-ui, sans-serif",
                  fontSize: '0.82rem',
                  color: '#6B7280',
                  lineHeight: 1.5,
                  marginBottom: '1rem',
                }}
              >
                Access private discussions, asset teardowns, and peer feedback in our exclusive community.
              </p>
              <a
                href="https://facebook.com/groups/digitallydefin1"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  width: '100%',
                  padding: '0.75rem 1rem',
                  backgroundColor: '#F18B25',
                  color: '#1F2937',
                  border: '2px solid #1F2937',
                  fontFamily: "'Inter', system-ui, sans-serif",
                  fontSize: '0.75rem',
                  fontWeight: 900,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  textDecoration: 'none',
                  boxSizing: 'border-box',
                  boxShadow: '2px 2px 0 0 #1F2937',
                }}
              >
                <span>Join Community</span>
                <ArrowRight size={14} />
              </a>
            </div>
            <div style={{ marginTop: '1.25rem' }}>
              <SocialIcons />
            </div>
          </div>
        </div>

        {/* Bottom Strip */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem',
            fontSize: '0.75rem',
            color: '#6B7280',
            fontFamily: "'DM Sans', system-ui, sans-serif",
          }}
        >
          <div>
            &copy; {currentYear} DIGITALLYDEFINED. All rights reserved. Built for Gen X Women.
          </div>
          <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'center' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
              <span
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  backgroundColor: '#16A34A',
                  display: 'inline-block',
                }}
              />
              All Systems Operational
            </span>
            <span>Privacy-First Architecture</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
