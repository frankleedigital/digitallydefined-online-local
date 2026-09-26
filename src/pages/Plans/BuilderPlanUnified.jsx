import React from 'react';
import { Link } from 'react-router-dom';
import {
  Shield,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Zap,
  Lock,
  Layers,
  FileText,
  DollarSign,
  Star,
} from 'lucide-react';
import { setUserPlanTier } from '../../lib/userState';

export default function BuilderPlanUnified() {
  const handleSelectPlan = () => {
    setUserPlanTier('builder');
  };

  const features = [
    'Access to all 12+ Faceless Digital Real Estate Playbooks',
    'Full Notion Operations System & Template Library',
    'Interactive Niche Profitability & Freedom Number Calculators',
    'Standard AI Prompt Engineering Packs for Content & Systems',
    'Member-only Private Community & Forum Access',
    'Bi-weekly live Q&A teardowns and asset audits',
    'Email support with 48h SLA',
    'Cancel anytime with 1-click self-serve billing',
  ];

  return (
    <div style={{ backgroundColor: '#FFFCF9', color: '#2D3748', minHeight: '100vh', paddingBottom: '5rem' }}>
      {/* 1. HERO */}
      <section
        style={{
          borderBottom: '2px solid #111111',
          backgroundColor: '#FFFFFF',
          padding: 'clamp(3rem, 6vw, 4.5rem) 1.25rem',
          textAlign: 'center',
        }}
      >
        <div style={{ maxWidth: '850px', margin: '0 auto' }}>
          <div style={{ display: 'inline-block', marginBottom: '1rem' }}>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                padding: '0.35rem 0.8rem',
                backgroundColor: '#FFFCF9',
                border: '2px solid #111111',
                fontFamily: "'Inter', system-ui, sans-serif",
                fontSize: '0.7rem',
                fontWeight: 900,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: '#111111',
              }}
            >
              <Zap size={14} color="#F18B25" />
              <span>For Solo Operators & Asset Creators</span>
            </span>
          </div>

          <h1
            style={{
              fontFamily: "'Inter', system-ui, sans-serif",
              fontSize: 'clamp(2.2rem, 5vw, 3.8rem)',
              fontWeight: 900,
              textTransform: 'uppercase',
              letterSpacing: '-0.03em',
              color: '#111111',
              lineHeight: 1.1,
              marginBottom: '1rem',
            }}
          >
            The Builder <span style={{ color: '#F18B25' }}>Membership</span>
          </h1>

          <p
            style={{
              fontFamily: "'DM Sans', system-ui, sans-serif",
              fontSize: 'clamp(1rem, 1.8vw, 1.2rem)',
              lineHeight: 1.65,
              color: '#4B5563',
              maxWidth: '680px',
              margin: '0 auto 2rem',
            }}
          >
            Everything you need to launch and monetize your first 1–3 faceless digital properties.
          </p>
        </div>
      </section>

      {/* 2. PRICING & BENEFIT CARD */}
      <section style={{ maxWidth: '850px', margin: '3.5rem auto 0', padding: '0 1.25rem' }}>
        <div
          style={{
            backgroundColor: '#FFFFFF',
            border: '2px solid #111111',
            padding: 'clamp(2rem, 4vw, 3rem)',
            boxShadow: '6px 6px 0 0 rgba(0,0,0,1)',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'baseline',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              borderBottom: '2px solid #111111',
              paddingBottom: '1.5rem',
              marginBottom: '2rem',
            }}
          >
            <div>
              <span
                style={{
                  fontFamily: "'Inter', system-ui, sans-serif",
                  fontSize: '0.75rem',
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  letterSpacing: '0.12em',
                  color: '#F18B25',
                }}
              >
                Monthly Pass
              </span>
              <div
                style={{
                  fontFamily: "'Inter', system-ui, sans-serif",
                  fontSize: '3.5rem',
                  fontWeight: 900,
                  color: '#111111',
                  lineHeight: 1,
                  marginTop: '0.25rem',
                }}
              >
                $47 <span style={{ fontSize: '1.1rem', fontWeight: 600, color: '#6B7280' }}>/ month</span>
              </div>
            </div>

            <div style={{ textAlign: 'right', marginTop: '0.5rem' }}>
              <div style={{ fontSize: '0.78rem', fontWeight: 800, color: '#16A34A', textTransform: 'uppercase' }}>
                ✓ 14-Day Money Back Guarantee
              </div>
              <div style={{ fontSize: '0.72rem', color: '#6B7280', marginTop: '0.2rem' }}>
                Zero risk. Cancel anytime.
              </div>
            </div>
          </div>

          <div style={{ marginBottom: '2.5rem' }}>
            <h3
              style={{
                fontFamily: "'Inter', system-ui, sans-serif",
                fontSize: '0.9rem',
                fontWeight: 900,
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                color: '#111111',
                marginBottom: '1.25rem',
              }}
            >
              What is included in Builder:
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '0.85rem' }}>
              {features.map((feat, i) => (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '0.6rem',
                    fontFamily: "'DM Sans', system-ui, sans-serif",
                    fontSize: '0.9rem',
                    color: '#2D3748',
                    lineHeight: 1.5,
                  }}
                >
                  <CheckCircle2 size={18} color="#F18B25" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ textAlign: 'center' }}>
            <a
              href="https://facebook.com/groups/digitallydefin1"
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleSelectPlan}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                width: '100%',
                maxWidth: '420px',
                padding: '1.1rem 2rem',
                backgroundColor: '#F18B25',
                color: '#111111',
                border: '2px solid #111111',
                fontFamily: "'Inter', system-ui, sans-serif",
                fontSize: '0.85rem',
                fontWeight: 900,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                textDecoration: 'none',
                boxShadow: '4px 4px 0 0 rgba(0,0,0,1)',
              }}
            >
              <span>Join Builder Plan ($47/mo)</span>
              <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}