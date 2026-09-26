import React from 'react';
import { Link } from 'react-router-dom';
import {
  Compass,
  Sparkles,
  Calculator,
  ArrowRight,
  Shield,
  Layers,
  CheckCircle2,
  Lock,
  Clock,
  Wrench,
  Bot
} from 'lucide-react';
import { getUserData } from '../lib/userState';

export default function StartHereUnified() {
  const userData = getUserData();

  const steps = [
    {
      num: '01',
      title: 'Identify Your Archetype & Superpower',
      badge: 'Step 1 · 2 Minutes',
      icon: Sparkles,
      color: '#F18B25',
      description:
        'Discover which digital product model matches your natural career strengths—Curator, Systems Builder, Template Architect, or Research Synthesizer.',
      href: '/quiz',
      btnText: 'Take The Free Diagnostic',
      status: userData?.superpower?.type ? `Completed: ${userData.superpower.type}` : 'Recommended First Step',
      isDone: !!userData?.superpower?.type,
    },
    {
      num: '02',
      title: 'Calculate Your Exact Retirement Gap',
      badge: 'Step 2 · 3 Minutes',
      icon: Calculator,
      color: '#47B7D4',
      description:
        'Input your target retirement age and monthly income goal to calculate how many $500/mo faceless assets are needed to bridge your shortfall.',
      href: '/gap',
      btnText: 'Calculate Retirement Gap',
      status: userData?.gap?.gapAmount ? `Calculated: $${userData.gap.gapAmount.toLocaleString()}` : 'Financial Clarity',
      isDone: !!userData?.gap?.gapAmount,
    },
    {
      num: '03',
      title: 'Explore the 4-Tier Blueprint & Tools',
      badge: 'Step 3 · Action Plan',
      icon: Layers,
      color: '#1F2937',
      description:
        'Review the 4-phase framework, test the Niche Scorecard, and choose whether to build independently or with our structured blueprints.',
      href: '/framework',
      btnText: 'Explore Framework',
      status: 'Execution Roadmap',
      isDone: false,
    },
  ];

  return (
    <div style={{ backgroundColor: '#FFFCF9', color: '#1F2937', minHeight: '100vh' }}>
      
      {/* Header — Centered */}
      <section
        style={{
          maxWidth: '1040px',
          margin: '0 auto',
          padding: 'clamp(3rem, 6vw, 4.5rem) 1.25rem 2.5rem',
          textAlign: 'center',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.45rem',
              backgroundColor: '#FFFFFF',
              border: '1.5px solid #1F2937',
              padding: '0.35rem 0.85rem',
              fontSize: '0.72rem',
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              color: '#F18B25',
              boxShadow: 'none',
            }}
          >
            <Compass size={13} color="#F18B25" />
            <span>Fast-Track Onboarding</span>
          </div>
        </div>

        <h1
          style={{
            fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
            fontWeight: 900,
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            textTransform: 'uppercase',
            letterSpacing: '-0.02em',
            color: '#1F2937',
            marginBottom: '1rem',
          }}
        >
          Your 3-Step Reinvention Roadmap
        </h1>

        <p
          style={{
            fontFamily: "'DM Sans', system-ui, sans-serif",
            fontSize: '1.05rem',
            color: '#4B5563',
            maxWidth: '680px',
            margin: '0 auto 2.5rem',
            lineHeight: 1.6,
          }}
        >
          Follow these 3 simple steps to transition from feeling behind on retirement to holding 
          a clear, math-backed plan for generating automated digital cashflow.
        </p>
      </section>

      {/* 3 Step Cards — Centered */}
      <section
        style={{
          maxWidth: '1040px',
          margin: '0 auto',
          padding: '0 1.25rem 4.5rem',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.num}
                style={{
                  backgroundColor: '#FFFFFF',
                  border: '1.5px solid #1F2937',
                  padding: 'clamp(1.5rem, 4vw, 2.25rem)',
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '1.5rem',
                  boxShadow: 'none',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1.25rem', maxWidth: '640px' }}>
                  <div
                    style={{
                      width: '48px',
                      height: '48px',
                      backgroundColor: '#FAF8F5',
                      border: '1.5px solid #1F2937',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <Icon size={22} color={step.color} />
                  </div>

                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.35rem' }}>
                      <span
                        style={{
                          fontSize: '0.72rem',
                          fontWeight: 800,
                          textTransform: 'uppercase',
                          letterSpacing: '0.08em',
                          color: '#F18B25',
                        }}
                      >
                        {step.badge}
                      </span>
                      {step.isDone && (
                        <span
                          style={{
                            fontSize: '0.68rem',
                            fontWeight: 700,
                            color: '#15803D',
                            backgroundColor: '#DCFCE7',
                            padding: '0.1rem 0.4rem',
                            border: '1px solid #86EFAC',
                          }}
                        >
                          ✓ Completed
                        </span>
                      )}
                    </div>

                    <h2
                      style={{
                        fontFamily: "'Inter', system-ui, sans-serif",
                        fontSize: '1.2rem',
                        fontWeight: 900,
                        textTransform: 'uppercase',
                        color: '#1F2937',
                        margin: '0 0 0.5rem 0',
                      }}
                    >
                      {step.title}
                    </h2>

                    <p
                      style={{
                        fontFamily: "'DM Sans', system-ui, sans-serif",
                        fontSize: '0.9rem',
                        color: '#4B5563',
                        lineHeight: 1.55,
                        margin: 0,
                      }}
                    >
                      {step.description}
                    </p>
                  </div>
                </div>

                {/* Step Action Button */}
                <div>
                  <Link
                    to={step.href}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.45rem',
                      backgroundColor: step.isDone ? '#FAF8F5' : '#F18B25',
                      border: '1.5px solid #1F2937',
                      color: '#1F2937',
                      fontFamily: "'Inter', system-ui, sans-serif",
                      fontSize: '0.82rem',
                      fontWeight: 800,
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                      padding: '0.8rem 1.5rem',
                      textDecoration: 'none',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    <span>{step.btnText}</span>
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* AI Mentor Callout — Centered */}
        <div
          style={{
            marginTop: '3rem',
            backgroundColor: '#FAF8F5',
            border: '1.5px solid #1F2937',
            padding: '2rem 1.5rem',
            textAlign: 'center',
          }}
        >
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: '#F18B25', marginBottom: '0.5rem' }}>
            <Bot size={18} />
            <span style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              Hermes AI Mentor
            </span>
          </div>
          <h3
            style={{
              fontFamily: "'Inter', system-ui, sans-serif",
              fontSize: '1.25rem',
              fontWeight: 800,
              textTransform: 'uppercase',
              color: '#1F2937',
              marginBottom: '0.5rem',
            }}
          >
            Have questions about where to begin?
          </h3>
          <p
            style={{
              fontFamily: "'DM Sans', system-ui, sans-serif",
              fontSize: '0.92rem',
              color: '#4B5563',
              maxWidth: '560px',
              margin: '0 auto 1.5rem',
              lineHeight: 1.55,
            }}
          >
            Click the orange Hermes icon at the bottom-right corner of any page. Hermes can interpret your 
            quiz archetype, explain retirement gap numbers, or help you brainstorm your first digital product idea.
          </p>
        </div>
      </section>

    </div>
  );
}
