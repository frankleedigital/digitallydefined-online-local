import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Compass,
  ArrowRight,
  CheckCircle2,
  Calculator,
  Target,
  Sparkles,
  Zap,
  Shield,
  FileText,
  Clock,
} from 'lucide-react';
import { getUserState } from '../lib/userState';

export default function StartHereUnified() {
  const [userState, setUserState] = useState(getUserState());

  useEffect(() => {
    const handleUpdate = () => setUserState(getUserState());
    window.addEventListener('dd_user_state_updated', handleUpdate);
    return () => window.removeEventListener('dd_user_state_updated', handleUpdate);
  }, []);

  const STEPS = [
    {
      num: '01',
      title: 'Discover Your Digital Superpower',
      desc: 'Take the 2-minute diagnostic to reveal your faceless creator archetype and monetize your corporate background.',
      time: '2 Minutes',
      status: userState.hasQuiz ? 'Completed' : 'Recommended First Step',
      completed: userState.hasQuiz,
      route: '/quiz',
      ctaText: userState.hasQuiz ? 'Retake Superpower Quiz' : 'Start 2-Min Quiz',
      icon: Compass,
      accent: '#F18B25',
    },
    {
      num: '02',
      title: 'Calculate Your Retirement Gap',
      desc: 'Run the numbers to see how many $500/mo faceless digital assets you need to bridge your personal retirement deficit.',
      time: '3 Minutes',
      status: userState.hasGap ? 'Completed' : 'Financial Diagnostic',
      completed: userState.hasGap,
      route: '/gap',
      ctaText: 'Open Gap Calculator',
      icon: Calculator,
      accent: '#DC2626',
    },
    {
      num: '03',
      title: 'Score Your First Digital Product Niche',
      desc: 'Validate buyer pain points, search intent, and commercial demand before creating a single file.',
      time: '5 Minutes',
      status: userState.hasScorecard ? 'Completed' : 'Validation Phase',
      completed: userState.hasScorecard,
      route: '/scorecard',
      ctaText: 'Run Niche Scorecard',
      icon: Target,
      accent: '#0284C7',
    },
    {
      num: '04',
      title: 'Select Your Execution Plan',
      desc: 'Join Builder ($47/mo) for complete DIY templates or Empire ($197/mo) for full automation and 1-on-1 architecture review.',
      time: 'Instant Access',
      status: 'Launch Phase',
      completed: false,
      route: '/pricing',
      ctaText: 'Compare Membership Plans',
      icon: Zap,
      accent: '#16A34A',
    },
  ];

  return (
    <div style={{ backgroundColor: '#FFFCF9', color: '#2D3748', minHeight: '100vh', paddingBottom: '5rem' }}>
      {/* 1. HERO */}
      <section
        style={{
          borderBottom: '2px solid #1F2937',
          backgroundColor: '#FFFFFF',
          padding: 'clamp(3rem, 5vw, 4.5rem) 1.25rem',
          textAlign: 'center',
        }}
      >
        <div style={{ maxWidth: '1080px', margin: '0 auto' }}>
          <div style={{ display: 'inline-block', marginBottom: '1rem' }}>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.45rem',
                padding: '0.35rem 0.85rem',
                backgroundColor: '#FFFCF9',
                border: '2px solid #1F2937',
                fontFamily: "'Inter', sans-serif",
                fontSize: '0.7rem',
                fontWeight: 900,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: '#1F2937',
              }}
            >
              <Compass size={14} color="#F18B25" />
              <span>Step-by-Step Onboarding</span>
            </span>
          </div>

          <h1
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 900,
              fontSize: 'clamp(2.2rem, 5vw, 3.8rem)',
              lineHeight: 1.1,
              letterSpacing: '-0.03em',
              textTransform: 'uppercase',
              color: '#1F2937',
              maxWidth: '850px',
              margin: '0 auto 1.25rem',
            }}
          >
            Start Your <span style={{ color: '#F18B25' }}>Digital Reinvention</span> Here
          </h1>

          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 'clamp(1rem, 1.8vw, 1.15rem)',
              lineHeight: 1.6,
              color: '#4B5563',
              maxWidth: '720px',
              margin: '0 auto 2.5rem',
            }}
          >
            Follow this 4-step sequence to diagnose your superpower, quantify your freedom number,
            and build your first faceless cash-flowing digital asset.
          </p>
        </div>
      </section>

      {/* 2. SEQUENTIAL ROADMAP */}
      <section style={{ maxWidth: '900px', margin: '0 auto', padding: '4rem 1.25rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {STEPS.map((step) => {
            const StepIcon = step.icon;
            return (
              <div
                key={step.num}
                style={{
                  backgroundColor: '#FFFFFF',
                  border: '2px solid #1F2937',
                  padding: 'clamp(1.5rem, 3vw, 2.25rem)',
                  boxShadow: '4px 4px 0 0 #1F2937',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: '1.5rem',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1.25rem', maxWidth: '580px' }}>
                  <div
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: '1.8rem',
                      fontWeight: 900,
                      color: step.accent,
                      lineHeight: 1,
                      marginTop: '0.15rem',
                    }}
                  >
                    {step.num}
                  </div>

                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem', flexWrap: 'wrap' }}>
                      <span
                        style={{
                          padding: '0.15rem 0.45rem',
                          backgroundColor: step.completed ? '#DCFCE7' : '#FFFCF9',
                          color: step.completed ? '#166534' : '#6B7280',
                          border: '1px solid #1F2937',
                          fontFamily: "'Inter', sans-serif",
                          fontSize: '0.65rem',
                          fontWeight: 800,
                          textTransform: 'uppercase',
                        }}
                      >
                        {step.status}
                      </span>

                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.72rem', color: '#6B7280', fontWeight: 600 }}>
                        <Clock size={12} /> {step.time}
                      </span>
                    </div>

                    <h2
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: '1.25rem',
                        fontWeight: 900,
                        textTransform: 'uppercase',
                        color: '#1F2937',
                        marginBottom: '0.4rem',
                      }}
                    >
                      {step.title}
                    </h2>

                    <p
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: '0.9rem',
                        lineHeight: 1.55,
                        color: '#4B5563',
                        margin: 0,
                      }}
                    >
                      {step.desc}
                    </p>
                  </div>
                </div>

                <Link
                  to={step.route}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.45rem',
                    padding: '0.85rem 1.6rem',
                    backgroundColor: step.completed ? '#FFFCF9' : '#F18B25',
                    color: '#1F2937',
                    border: '2px solid #1F2937',
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '0.78rem',
                    fontWeight: 900,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    textDecoration: 'none',
                    boxShadow: '3px 3px 0 0 #1F2937',
                    whiteSpace: 'nowrap',
                  }}
                >
                  <span>{step.ctaText}</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
