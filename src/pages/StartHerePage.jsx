// src/pages/StartHerePage.jsx
// Orientation page for new visitors — where to start, what to do first.

import React, { useMemo } from 'react';
import DDLabel from '../components/ui/DDLabel.jsx';
import DDCard from '../components/ui/DDCard.jsx';
import DDCTA from '../components/ui/DDCTA.jsx';
import { loadQuizResult } from '../features/quiz/lib/quizLogic.js';
import { getPersona } from '../features/quiz/lib/personas.js';

const STEPS = [
  {
    step: '01',
    label: 'Diagnostic Assessment',
    title: 'Discover Your Digital Superpower',
    text: 'A 7-question diagnostic evaluated locally on your device. Zero mandatory email gating. Maps your natural cognitive strengths to an optimal digital property class.',
    cta: { label: 'Take the Diagnostic →', href: '/quiz', variant: 'primary' },
  },
  {
    step: '02',
    label: 'Custom Roadmap',
    title: 'Unlock Your 90-Day Build Sequence',
    text: 'Your tailored blueprint defines what asset to engineer first, how to validate market demand, and when to automate distribution without personal face exposure.',
    cta: { label: 'Explore Roadmaps →', href: '/roadmap/builder', variant: 'outline' },
  },
  {
    step: '03',
    label: 'Asset Toolkit',
    title: 'Leverage Dedicated Tooling',
    text: 'The Niche Scorecard, Digital Product Architect, and Content Engine unlock upon quiz completion. Eliminate speculation and model cashflow upfront.',
    cta: { label: 'Explore Tools →', href: '/tools', variant: 'outline' },
  },
  {
    step: '04',
    label: 'Execution Tier',
    title: 'Scale to Portfolio Ownership',
    text: 'Select Builder for single-asset launch support or Empire for multi-property portfolio automation and private mentor access.',
    cta: { label: 'View Plans & Tiers →', href: '/builder', variant: 'outline' },
  },
];

const FAQS = [
  {
    q: 'Do I need a face or personal brand?',
    a: 'No. DigitallyDefined is built exclusively for faceless digital real estate — digital assets where enterprise value and transaction flow reside in the product, domain, and systems rather than personal celebrity.',
  },
  {
    q: 'Do I need an existing audience or follower base?',
    a: 'No. Our frameworks leverage compounding search queries, high-utility tools, and private email syndication. You build the utility asset first; organic high-intent demand follows.',
  },
  {
    q: 'What is the definition of "Digital Real Estate"?',
    a: 'Digital real estate refers to income-generating online properties — authority content hubs, automated digital tools, private newsletters, and templates — yielding 85%+ margins with zero physical debt.',
  },
  {
    q: 'Is this only designed for Gen X women?',
    a: 'The methodology is tailored to the strengths, career mastery, and time realities of Gen X women closing the retirement gap, while remaining accessible to any builder seeking privacy-first income.',
  },
  {
    q: 'How long does the assessment take?',
    a: 'Under 120 seconds. 7 direct questions scored immediately in your browser cache with zero tracking friction.',
  },
];

export default function StartHerePage() {
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
              <span className="dd-pill-context">Orientation & Onboarding</span>
            </span>
          </div>

          <DDLabel tone="orange">Start Here</DDLabel>
          <h1 className="dd-hero__headline">
            Build Digital Real Estate. Quietly.
          </h1>
          <p className="dd-hero__lead">
            The sovereign operating framework for Gen X women to build, launch, and monetize faceless digital property — without public vanity metrics or camera appearances.
          </p>

          <div className="action-row" style={{ marginTop: '2rem' }}>
            {stored ? (
              <>
                <DDCTA label="Go to Workspace Dashboard →" href="/dashboard" variant="primary" />
                <DDCTA label={`View ${persona?.title || ''} Roadmap`} href="/roadmap" variant="outline" />
              </>
            ) : (
              <>
                <DDCTA label="Take the Diagnostic →" href="/quiz" variant="primary" />
                <DDCTA label="Explore Framework" href="/framework" variant="outline" />
              </>
            )}
          </div>
          <p className="hero-note">
            Two minutes · 100% private · Browser-evaluated · Instant superpower match
          </p>
        </div>
      </section>

      {/* ── WHAT THIS IS ─────────────────────────────── */}
      <section className="dd-banner-ink">
        <div className="dd-container">
          <div className="dd-banner-ink__inner">
            <span className="dd-banner-ink__eyebrow">Operating Mandate</span>
            <strong className="dd-banner-ink__claim">
              Replace linear hours with compounding digital assets. Built on real acumen, automated for peace of mind.
            </strong>
          </div>
        </div>
      </section>

      {/* ── THE 4 STEPS ──────────────────────────────── */}
      <section className="dd-section dd-section--rule">
        <div className="dd-container">
          <div className="dd-section__head">
            <DDLabel tone="orange">The Four Milestones</DDLabel>
            <h2>The Structured Execution Path</h2>
            <p className="dd-section__intro">
              Every milestone compounds into the next. Start with the free diagnostic, unlock validated tooling, and construct sovereign digital properties.
            </p>
          </div>

          <div className="dd-steps-list" style={{ marginTop: '2rem' }}>
            {STEPS.map((item) => (
              <div key={item.step} className="dd-step-row" style={{
                display: 'grid',
                gridTemplateColumns: '80px 1fr',
                gap: '1.5rem',
                padding: '2rem 0',
                borderBottom: '1px solid var(--color-border)'
              }}>
                <div className="dd-step-row__number">
                  <span style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '1.5rem',
                    fontWeight: '800',
                    color: 'var(--color-accent)',
                    border: '1px solid var(--color-border)',
                    padding: '0.5rem 0.75rem',
                    backgroundColor: 'var(--color-surface)'
                  }}>{item.step}</span>
                </div>
                <div className="dd-step-row__content">
                  <div style={{ marginBottom: '0.5rem' }}>
                    <DDLabel tone="blue">{item.label}</DDLabel>
                  </div>
                  <h3 className="dd-step-row__title" style={{ fontSize: '1.375rem', marginBottom: '0.5rem' }}>{item.title}</h3>
                  <p className="dd-step-row__text" style={{ fontSize: '0.9375rem', lineHeight: '1.6', color: 'var(--color-text-muted)', marginBottom: '1.25rem' }}>{item.text}</p>
                  <div className="dd-step-row__cta">
                    <DDCTA label={item.cta.label} href={item.cta.href} variant={item.cta.variant} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQS ─────────────────────────────────────── */}
      <section className="dd-section dd-section--alt dd-section--rule">
        <div className="dd-container dd-container--narrow">
          <div className="dd-section__head">
            <DDLabel tone="orange">Clear Answers</DDLabel>
            <h2>Frequently Asked Questions</h2>
            <p className="dd-section__intro">
              Direct clarity on privacy, time commitment, and digital property ownership.
            </p>
          </div>

          <div className="dd-grid dd-grid--one" style={{ gap: '1.25rem', marginTop: '2rem' }}>
            {FAQS.map((faq) => (
              <DDCard key={faq.q}>
                <div className="dd-card__inner">
                  <h3 style={{ fontSize: '1.125rem', marginBottom: '0.75rem', color: 'var(--color-text)' }}>{faq.q}</h3>
                  <p style={{ fontSize: '0.9375rem', lineHeight: '1.6', color: 'var(--color-text-muted)' }}>{faq.a}</p>
                </div>
              </DDCard>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER CTA ───────────────────────────────── */}
      <section className="dd-section dd-section--rule">
        <div className="dd-container dd-container--narrow">
          <div className="dd-section__head">
            <DDLabel tone="orange">Begin Today</DDLabel>
            <h2>Take Your First Step</h2>
            <p className="dd-section__intro">
              Find your superpower, discover your matching asset class, and start building digital real estate.
            </p>
          </div>
          <div className="action-row" style={{ marginTop: '1.5rem' }}>
            <DDCTA label="Take the Diagnostic →" href="/quiz" variant="primary" />
            <DDCTA label="Explore Plans & Tiers" href="/builder" variant="outline" />
          </div>
        </div>
      </section>
    </>
  );
}
