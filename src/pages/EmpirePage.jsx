// src/pages/EmpirePage.jsx
// Empire plan page — for women ready to scale to a full digital real estate portfolio.

import React, { useMemo } from 'react';
import DDLabel from '../components/ui/DDLabel.jsx';
import DDCard from '../components/ui/DDCard.jsx';
import DDCTA from '../components/ui/DDCTA.jsx';
import { loadQuizResult } from '../features/quiz/lib/quizLogic.js';
import { getPersona } from '../features/quiz/lib/personas.js';

const EMPIRE_INCLUDES = [
  { label: 'Everything in Builder', text: 'Diagnostic, 90-day roadmap, Niche Scorecard, Hermes AI Mentor, and community network.' },
  { label: 'Product Architect Tool', text: 'Design high-converting digital products with automated positioning and pricing models.' },
  { label: 'Social Engine Tool', text: 'Generate platform-optimized syndication copy without camera or voice recording.' },
  { label: 'Trends Intelligence', text: 'Identify emerging search velocity spikes and arbitrage opportunities before saturated competition.' },
  { label: 'Portfolio Ledger', text: 'Unified tracking system for multi-property valuation, monthly yield, and automated pipeline status.' },
  { label: 'Sovereign Playbooks', text: 'Turnkey automation recipes for lead capture, email nurture sequencing, and passive checkout fulfillment.' },
  { label: 'Priority AI Mentor Routing', text: 'Sub-second response SLA and extended memory context for high-output builders.' },
  { label: 'Strategic Roadmap Architect', text: 'Generate multi-phase asset growth blueprints for multiple simultaneous niches.' },
];

const WHY_EMPIRE = [
  {
    label: 'Portfolio Diversification',
    title: 'Multi-Asset Digital Real Estate',
    text: 'Move beyond a single income stream. Build a diversified holding of 3 to 5 faceless digital properties that hedge against algorithmic volatility.',
  },
  {
    label: 'Autonomous Operations',
    title: 'Zero-Maintenance Automation',
    text: 'Implement robust automated workflows for email delivery, lead scoring, and content syndication. Decouple daily operations from personal time entirely.',
  },
  {
    label: 'Holistic Intelligence',
    title: 'Centralized Property Ledger',
    text: 'Monitor revenue metrics, traffic compounding, and customer retention across all your properties in one authoritative dashboard.',
  },
];

export default function EmpirePage() {
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
              <span className="dd-pill-context">Portfolio Tier</span>
            </span>
          </div>

          <DDLabel tone="orange">Empire Tier</DDLabel>
          <h1 className="dd-hero__headline">
            Scale a Portfolio of Faceless Digital Assets
          </h1>
          <p className="dd-hero__lead">
            The advanced operating system for Gen X women scaling beyond a single property — multi-asset management, autonomous syndication, and private executive AI mentor capabilities.
          </p>

          <div className="action-row" style={{ marginTop: '2rem' }}>
            {stored ? (
              <>
                <DDCTA label="Go to Workspace Dashboard →" href="/dashboard" variant="primary" />
                <DDCTA label={`View ${persona?.title || ''} Roadmap`} href="/roadmap" variant="outline" />
              </>
            ) : (
              <>
                <DDCTA label="Take the Diagnostic Assessment →" href="/quiz" variant="primary" wide />
                <DDCTA label="Start with Builder ($0)" href="/builder" variant="outline" />
              </>
            )}
          </div>
          <p className="hero-note">
            Priority access for verified builders · Multi-asset scale
          </p>
        </div>
      </section>

      {/* ── WHY EMPIRE ───────────────────────────────── */}
      <section className="dd-banner-ink">
        <div className="dd-container">
          <div className="dd-banner-ink__inner">
            <span className="dd-banner-ink__eyebrow">Enterprise Leverage</span>
            <strong className="dd-banner-ink__claim">
              Not just additional tools. A complete digital asset operating company in a box.
            </strong>
          </div>
        </div>
      </section>

      <section className="dd-section dd-section--rule">
        <div className="dd-container">
          <div className="dd-section__head">
            <DDLabel tone="orange">Architecture</DDLabel>
            <h2>Built for Multi-Asset Portfolio Builders</h2>
            <p className="dd-section__intro">
              Engineered to compound digital real estate across multiple high-yield verticals simultaneously.
            </p>
          </div>
          <div className="dd-grid dd-grid--three" style={{ gap: '1.5rem', marginTop: '1.5rem' }}>
            {WHY_EMPIRE.map((item) => (
              <DDCard key={item.label}>
                <div className="dd-card__inner">
                  <div style={{ marginBottom: '0.5rem' }}>
                    <DDLabel tone="blue">{item.label}</DDLabel>
                  </div>
                  <h3 className="dd-card__title" style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>{item.title}</h3>
                  <p className="dd-card__text" style={{ fontSize: '0.875rem', lineHeight: '1.6' }}>{item.text}</p>
                </div>
              </DDCard>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHAT'S INCLUDED ──────────────────────────── */}
      <section className="dd-section dd-section--alt dd-section--rule">
        <div className="dd-container">
          <div className="dd-section__head">
            <DDLabel tone="orange">Complete Arsenal</DDLabel>
            <h2>Everything Included in Empire</h2>
            <p className="dd-section__intro">
              The full stack of high-leverage tools, automation blueprints, and priority intelligence.
            </p>
          </div>
          <div className="dd-grid dd-grid--four" style={{ gap: '1.25rem', marginTop: '1.5rem' }}>
            {EMPIRE_INCLUDES.map((item) => (
              <DDCard key={item.label}>
                <div className="dd-card__inner">
                  <div style={{ marginBottom: '0.5rem' }}>
                    <DDLabel tone="orange">{item.label}</DDLabel>
                  </div>
                  <p className="dd-card__text" style={{ fontSize: '0.8125rem', lineHeight: '1.5' }}>{item.text}</p>
                </div>
              </DDCard>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING ──────────────────────────────────── */}
      <section className="dd-section dd-section--rule">
        <div className="dd-container dd-container--narrow">
          <div className="dd-section__head">
            <DDLabel tone="orange">Access Status</DDLabel>
            <h2>Empire Tier Enrollment</h2>
            <p className="dd-section__intro">
              Full suite access opens to current Builder tier members sequentially. Take the diagnostic to lock in priority queue placement.
            </p>
          </div>
          <div className="dd-grid dd-grid--two" style={{ gap: '1.5rem', marginTop: '1.5rem' }}>
            <DDCard>
              <div className="dd-card__inner dd-card__inner--pricing" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <DDLabel tone="orange">Builder Tier (Active)</DDLabel>
                <div className="dd-price">
                  <span className="dd-price__amount" style={{ fontSize: '2.5rem', fontWeight: '800' }}>$0</span>
                  <span className="dd-price__period" style={{ color: 'var(--color-text-muted)' }}> / lifetime</span>
                </div>
                <p className="dd-card__text" style={{ fontSize: '0.875rem', lineHeight: '1.6' }}>
                  Launch your initial faceless property today. Diagnostic assessment, custom roadmap, and core Niche Scorecard included.
                </p>
                <DDCTA label="Start Free with Diagnostic →" href="/quiz" variant="primary" wide />
              </div>
            </DDCard>
            <DDCard tone="ink" className="dd-card--highlight">
              <div className="dd-card__inner dd-card__inner--pricing" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <DDLabel tone="blue">Empire Tier (Priority Queue)</DDLabel>
                <div className="dd-price">
                  <span className="dd-price__amount" style={{ fontSize: '1.75rem', fontWeight: '800' }}>Private Invitation</span>
                </div>
                <p className="dd-card__text" style={{ fontSize: '0.875rem', lineHeight: '1.6' }}>
                  Complete automation blueprints, portfolio ledger, and priority AI Mentor context. Early access queue now open.
                </p>
                <DDCTA label="Lock In Priority Queue →" href="/quiz" variant="outline" wide />
              </div>
            </DDCard>
          </div>
        </div>
      </section>

      {/* ── BOTTOM CTA ───────────────────────────────── */}
      <section className="dd-section dd-section--alt dd-section--rule">
        <div className="dd-container dd-container--narrow">
          <div className="dd-section__head">
            <DDLabel tone="orange">Begin Execution</DDLabel>
            <h2>Start with Builder. Scale to Empire.</h2>
            <p className="dd-section__intro">
              Master the first property sequence today with the free diagnostic assessment.
            </p>
          </div>
          <div className="action-row" style={{ marginTop: '1.5rem' }}>
            <DDCTA label="Take the Diagnostic →" href="/quiz" variant="primary" />
            <DDCTA label="Compare Tier Specs" href="/builder" variant="outline" />
          </div>
        </div>
      </section>
    </>
  );
}
