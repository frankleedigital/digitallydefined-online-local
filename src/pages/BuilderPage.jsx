// src/pages/BuilderPage.jsx
// Builder plan page — entry-level plan for first-time digital property builders.

import React, { useMemo } from 'react';
import DDLabel from '../components/ui/DDLabel.jsx';
import DDCard from '../components/ui/DDCard.jsx';
import DDCTA from '../components/ui/DDCTA.jsx';
import { loadQuizResult } from '../features/quiz/lib/quizLogic.js';
import { getPersona } from '../features/quiz/lib/personas.js';

const INCLUDES = [
  { label: 'Superpower Diagnostic', text: 'Determine your highest-leverage digital archetype. Evaluated client-side without mandatory email capture.' },
  { label: 'Personalized Roadmap', text: 'A phased 90-day build sequence calibrated to your cognitive style and execution profile.' },
  { label: 'Niche Scorecard Tool', text: 'Evaluate potential niches across 6 quantitative criteria before deploying engineering effort.' },
  { label: 'Hermes AI Mentor', text: 'On-demand contextual guidance embedded directly into your workspace for build-phase troubleshooting.' },
  { label: 'Asset Blueprint SOP', text: 'Structured execution worksheet to structure, validate, and launch your initial faceless property.' },
  { label: 'Sovereign Community', text: 'Private syndicate for Gen X women building non-linear digital real estate assets.' },
];

const COMPARE = [
  { feature: 'Digital Superpower Quiz', builder: true, empire: true },
  { feature: 'Personalized Roadmap', builder: true, empire: true },
  { feature: 'Niche Scorecard', builder: true, empire: true },
  { feature: 'Hermes AI Mentor', builder: true, empire: true },
  { feature: 'Community Access', builder: true, empire: true },
  { feature: 'Product Designer Tool', builder: false, empire: true },
  { feature: 'Social Content Tool', builder: false, empire: true },
  { feature: 'Trends Explorer', builder: false, empire: true },
  { feature: 'Multi-asset Portfolio Tracker', builder: false, empire: true },
  { feature: 'Automation Playbooks', builder: false, empire: true },
  { feature: 'Priority Mentor Access', builder: false, empire: true },
];

const CheckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const DashIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

export default function BuilderPage() {
  const stored = useMemo(() => loadQuizResult(), []);
  const persona = stored?.superpower ? getPersona(stored.superpower) : null;

  return (
    <>
      {/* ── HERO ─────────────────────────────────────── */}
      <section className="dd-hero">
        <div className="dd-container dd-container--narrow">
          <div className="dd-brand-badge-wrapper" style={{ marginBottom: '1.25rem' }}>
            <span className="dd-logo-pill">
              <strong>DIGITALLY</strong><em>DEFINED</em>
              <span className="dd-pill-divider">/</span>
              <span className="dd-pill-context">Execution Tier</span>
            </span>
          </div>

          <DDLabel tone="orange">Builder Tier</DDLabel>
          <h1 className="dd-hero__headline">
            Build Your First Digital Property. Free.
          </h1>
          <p className="dd-hero__lead">
            The fundamental architecture to identify, validate, and launch your first sovereign income property — with zero cost, zero camera requirements, and zero audience needed.
          </p>

          <div className="action-row" style={{ marginTop: '2rem' }}>
            {stored ? (
              <>
                <DDCTA label="Go to Workspace Dashboard →" href="/dashboard" variant="primary" />
                <DDCTA label={`View ${persona?.title || ''} Roadmap`} href="/roadmap" variant="outline" />
              </>
            ) : (
              <>
                <DDCTA label="Start Free with the Quiz →" href="/quiz" variant="primary" wide />
                <DDCTA label="See Empire Plan" href="/empire" variant="outline" />
              </>
            )}
          </div>
          <p className="hero-note">
            Free forever tier · Zero credit card required · Instant tool unlock
          </p>
        </div>
      </section>

      {/* ── WHAT'S INCLUDED ──────────────────────────── */}
      <section className="dd-section dd-section--rule">
        <div className="dd-container">
          <div className="dd-section__head">
            <DDLabel tone="orange">Core Capabilities</DDLabel>
            <h2>Everything Included in the Builder Tier</h2>
            <p className="dd-section__intro">
              Six foundational assets included at zero financial barrier. Complete the diagnostic to unlock instant tool access.
            </p>
          </div>
          <div className="dd-grid dd-grid--three" style={{ gap: '1.5rem', marginTop: '1.5rem' }}>
            {INCLUDES.map((item) => (
              <DDCard key={item.label}>
                <div className="dd-card__inner">
                  <div className="dd-card__check-row" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
                    <span className="dd-card__check" style={{ color: 'var(--color-accent)' }}><CheckIcon /></span>
                    <DDLabel tone="orange">{item.label}</DDLabel>
                  </div>
                  <p className="dd-card__text" style={{ fontSize: '0.875rem', lineHeight: '1.6' }}>{item.text}</p>
                </div>
              </DDCard>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING ──────────────────────────────────── */}
      <section className="dd-section dd-section--alt dd-section--rule">
        <div className="dd-container dd-container--narrow">
          <div className="dd-section__head">
            <DDLabel tone="orange">Tier Pricing</DDLabel>
            <h2>Transparent & Accessible</h2>
          </div>
          <div className="dd-grid dd-grid--two" style={{ gap: '1.5rem', marginTop: '1.5rem' }}>
            <DDCard className="dd-card--highlight">
              <div className="dd-card__inner dd-card__inner--pricing" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <DDLabel tone="orange">Builder Tier</DDLabel>
                  <span style={{ fontSize: '0.6875rem', fontFamily: 'var(--font-mono)', color: 'var(--color-accent)', fontWeight: '700' }}>ACTIVE TIER</span>
                </div>
                <div className="dd-price">
                  <span className="dd-price__amount" style={{ fontSize: '2.5rem', fontWeight: '800' }}>$0</span>
                  <span className="dd-price__period" style={{ color: 'var(--color-text-muted)' }}> / lifetime</span>
                </div>
                <p className="dd-card__text" style={{ fontSize: '0.875rem', lineHeight: '1.6' }}>
                  The foundational platform — diagnostic engine, personalized roadmap, Niche Scorecard, Hermes AI Mentor, and community network.
                </p>
                {stored ? (
                  <DDCTA label="Access Dashboard →" href="/dashboard" variant="primary" wide />
                ) : (
                  <DDCTA label="Take Diagnostic Assessment →" href="/quiz" variant="primary" wide />
                )}
              </div>
            </DDCard>

            <DDCard tone="ink">
              <div className="dd-card__inner dd-card__inner--pricing" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <DDLabel tone="blue">Empire Tier</DDLabel>
                  <span style={{ fontSize: '0.6875rem', fontFamily: 'var(--font-mono)', color: 'var(--color-blue)', fontWeight: '700' }}>ADVANCED</span>
                </div>
                <div className="dd-price">
                  <span className="dd-price__amount" style={{ fontSize: '1.75rem', fontWeight: '800' }}>Portfolio Scale</span>
                </div>
                <p className="dd-card__text" style={{ fontSize: '0.875rem', lineHeight: '1.6' }}>
                  Full enterprise suite — multi-property tracker, automated content generation, trends intelligence, and priority mentor routing.
                </p>
                <DDCTA label="Explore Empire Plan →" href="/empire" variant="outline" wide />
              </div>
            </DDCard>
          </div>
        </div>
      </section>

      {/* ── FEATURE COMPARISON ───────────────────────── */}
      <section className="dd-section dd-section--rule">
        <div className="dd-container dd-container--narrow">
          <div className="dd-section__head">
            <DDLabel tone="orange">Direct Comparison</DDLabel>
            <h2>Builder vs Empire Tier Specs</h2>
          </div>
          <div className="dd-compare-table" style={{ marginTop: '1.5rem' }}>
            <div className="dd-compare-table__header">
              <span>Capability</span>
              <span>Builder ($0)</span>
              <span>Empire</span>
            </div>
            {COMPARE.map((row) => (
              <div key={row.feature} className="dd-compare-table__row">
                <span className="dd-compare-table__feature">{row.feature}</span>
                <span className={`dd-compare-table__cell ${row.builder ? 'dd-compare-table__cell--yes' : 'dd-compare-table__cell--no'}`}>
                  {row.builder ? <CheckIcon /> : <DashIcon />}
                </span>
                <span className={`dd-compare-table__cell ${row.empire ? 'dd-compare-table__cell--yes' : 'dd-compare-table__cell--no'}`}>
                  {row.empire ? <CheckIcon /> : <DashIcon />}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BOTTOM CTA ───────────────────────────────── */}
      <section className="dd-section dd-section--alt dd-section--rule">
        <div className="dd-container dd-container--narrow">
          <div className="dd-section__head">
            <DDLabel tone="orange">Launch Now</DDLabel>
            <h2>Unlock Your Personalized Roadmap</h2>
            <p className="dd-section__intro">
              Spend 2 minutes on the diagnostic. Receive an instant asset blueprint ready to execute.
            </p>
          </div>
          <div className="action-row" style={{ marginTop: '1.5rem' }}>
            <DDCTA label="Start the Free Assessment →" href="/quiz" variant="primary" />
            <DDCTA label="Orientation & Start Guide" href="/start-here" variant="outline" />
          </div>
        </div>
      </section>
    </>
  );
}
