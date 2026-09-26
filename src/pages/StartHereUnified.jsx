import React from 'react';
import { Link } from 'react-router-dom';
import {
  Compass,
  ArrowRight,
  Sparkles,
  Calculator,
  Target,
  Layers,
  CheckCircle2,
  Lock,
  EyeOff,
  Flame,
  Shield,
} from 'lucide-react';
import { getUserState } from '../lib/userState';

export default function StartHereUnified() {
  const userState = getUserState();

  const steps = [
    {
      step: '01',
      title: 'Discover Your Digital Superpower',
      time: '2 minutes',
      desc: 'Take the 7-question diagnostic to find whether you excel at Content Architecture, Systems Operation, Curation, Knowledge Education, or Community Building.',
      cta: 'Start Superpower Quiz',
      href: '/quiz',
      completed: userState.hasQuiz,
      accent: '#F18B25',
    },
    {
      step: '02',
      title: 'Calculate Your Retirement Gap',
      time: '3 minutes',
      desc: 'Use our proprietary calculator to turn vague financial anxiety into a clear monthly target and see exactly how many $500/mo faceless assets you need.',
      cta: 'Calculate Retirement Gap',
      href: '/gap',
      completed: userState.hasGap,
      accent: '#47B7D4',
    },
    {
      step: '03',
      title: 'Score Your First Niche Idea',
      time: '5 minutes',
      desc: 'Run your topic through the Niche Profitability Scorecard to evaluate demand density, competition, faceless viability, and monetization potential.',
      cta: 'Launch Niche Scorecard',
      href: '/scorecard',
      completed: false,
      accent: '#16A34A',
    },
    {
      step: '04',
      title: 'Join the Builder Plan & Studio',
      time: 'Instant Access',
      desc: 'Get full access to all design templates, automated workflows, AI prompt systems, private mastermind channels, and weekly asset teardowns.',
      cta: 'Explore Builder Plan ($47/mo)',
      href: '/builder',
      completed: userState.planTier === 'builder' || userState.planTier === 'empire',
      accent: '#8B5CF6',
    },
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
              <Compass size={14} color="#F18B25" />
              <span>Official Orientation Guide</span>
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
              marginBottom: '1.25rem',
            }}
          >
            Start Here: Your <span style={{ color: '#F18B25' }}>4-Step</span> Launch Path
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
            Follow this clear, sequential checklist. No guessing what comes next. Built specifically for Gen X women building quiet digital wealth.
          </p>
        </div>
      </section>

      {/* 2. SEQUENTIAL STEP CARDS */}
      <section style={{ maxWidth: '900px', margin: '3.5rem auto 0', padding: '0 1.25rem' }}>
        <div style={{ display: 'grid', gap: '1.75rem' }}>
          {steps.map((s) => (
            <div
              key={s.step}
              style={{
                backgroundColor: '#FFFFFF',
                border: '2px solid #111111',
                padding: '2rem',
                boxShadow: '4px 4px 0 0 rgba(0,0,0,1)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '1rem',
                  borderBottom: '2px solid #111111',
                  paddingBottom: '0.75rem',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <span
                    style={{
                      fontFamily: "'Inter', system-ui, sans-serif",
                      fontSize: '1.25rem',
                      fontWeight: 900,
                      color: s.accent,
                    }}
                  >
                    STEP {s.step}
                  </span>
                  <span
                    style={{
                      fontFamily: "'Inter', system-ui, sans-serif",
                      fontSize: '0.68rem',
                      fontWeight: 800,
                      textTransform: 'uppercase',
                      letterSpacing: '0.1em',
                      backgroundColor: '#FFFCF9',
                      border: '1px solid #111111',
                      padding: '0.2rem 0.5rem',
                    }}
                  >
                    {s.time}
                  </span>
                </div>

                {s.completed && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: '#16A34A', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase' }}>
                    <CheckCircle2 size={16} />
                    <span>Completed</span>
                  </div>
                )}
              </div>

              <h2
                style={{
                  fontFamily: "'Inter', system-ui, sans-serif",
                  fontSize: '1.4rem',
                  fontWeight: 900,
                  textTransform: 'uppercase',
                  letterSpacing: '-0.02em',
                  color: '#111111',
                  marginBottom: '0.5rem',
                }}
              >
                {s.title}
              </h2>

              <p
                style={{
                  fontFamily: "'DM Sans', system-ui, sans-serif",
                  fontSize: '0.92rem',
                  lineHeight: 1.6,
                  color: '#4B5563',
                  marginBottom: '1.5rem',
                }}
              >
                {s.desc}
              </p>

              <div>
                <Link
                  to={s.href}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.85rem 1.75rem',
                    backgroundColor: s.completed ? '#FFFFFF' : s.accent,
                    color: '#111111',
                    border: '2px solid #111111',
                    fontFamily: "'Inter', system-ui, sans-serif",
                    fontSize: '0.8rem',
                    fontWeight: 900,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    textDecoration: 'none',
                  }}
                >
                  <span>{s.cta}</span>
                  <ArrowRight size={15} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}