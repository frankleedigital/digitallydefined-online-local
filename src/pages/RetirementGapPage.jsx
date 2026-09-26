// src/pages/RetirementGapPage.jsx
// Gen X Retirement Gap explainer — the problem and the digital real estate solution.

import React, { useMemo } from 'react';
import DDLabel from '../components/ui/DDLabel.jsx';
import DDCard from '../components/ui/DDCard.jsx';
import DDCTA from '../components/ui/DDCTA.jsx';
import { loadQuizResult } from '../features/quiz/lib/quizLogic.js';
import { getPersona } from '../features/quiz/lib/personas.js';

const STATS = [
  { number: '47%', label: 'of Gen X women hold less than $100K saved for retirement' },
  { number: '30%', label: 'possess zero dedicated retirement savings balances' },
  { number: '12yr', label: 'average career gap due to uncompensated caregiving roles' },
  { number: '$1.1M', label: 'estimated median retirement shortfall facing Gen X women' },
];

const CAUSES = [
  { label: 'The Historical Wage Gap', text: 'Gen X women earned 20–30% less than male peers over prime earning decades, crippling 401(k) compounding and Social Security bases.' },
  { label: 'Caregiving Pauses', text: 'Stepping out of the workforce for childrearing and eldercare created multi-year contribution freezes and missed corporate promotion cycles.' },
  { label: 'The 401(k) Experiment', text: 'Gen X was the inaugural generation pushed from defined-benefit pensions into volatile self-managed market plans with zero safety net.' },
  { label: 'Single-Income Realities', text: 'Navigating life on a single income or post-divorce eliminates household economies of scale, concentrating retirement burden entirely on one person.' },
];

const SOLUTIONS = [
  { label: 'High-Margin Digital Products', text: 'Engineered once and distributed infinitely via automated checkout. No inventory, zero shipping liability, 85%+ net margins.' },
  { label: 'Authority Content Properties', text: 'Niche search repositories that compound organic traffic into passive affiliate commissions, sponsor integrations, and lead sales.' },
  { label: 'Faceless Micro-Circles', text: 'Curated knowledge syndicates centered on shared professional outcomes that yield predictable monthly recurring revenue.' },
  { label: 'Sovereign Email Networks', text: 'The premier durable asset. Direct audience ledger that cannot be throttled or taxed by shifting third-party social algorithms.' },
];

export default function RetirementGapPage() {
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
              <span className="dd-pill-context">Macro Analysis</span>
            </span>
          </div>

          <DDLabel tone="orange">The Retirement Gap</DDLabel>
          <h1 className="dd-hero__headline">
            The Gen X Retirement Deficit & The Sovereign Solution
          </h1>
          <p className="dd-hero__lead">
            Gen X women carry a documented, systemic retirement shortfall born of historical wage gaps and caregiving pauses. Trading more discrete hours cannot bridge this gap. Building compounding digital real estate can.
          </p>

          <div className="action-row" style={{ marginTop: '2rem' }}>
            {stored ? (
              <>
                <DDCTA label="Go to Workspace Dashboard →" href="/dashboard" variant="primary" />
                <DDCTA label={`View ${persona?.title || ''} Roadmap`} href="/roadmap" variant="outline" />
              </>
            ) : (
              <>
                <DDCTA label="Discover Your Asset Archetype →" href="/quiz" variant="primary" wide />
                <DDCTA label="Read the Framework" href="/framework" variant="outline" />
              </>
            )}
          </div>
          <p className="hero-note">
            Non-speculative · Ownership-based · Evaluated locally in 2 minutes
          </p>
        </div>
      </section>

      {/* ── STATS BANNER ─────────────────────────────── */}
      <section className="dd-section dd-section--alt dd-section--rule">
        <div className="dd-container">
          <div className="dd-section__head">
            <DDLabel tone="orange">The Evidence</DDLabel>
            <h2>The Retirement Shortfall by the Numbers</h2>
            <p className="dd-section__intro">
              Empirical data revealing the structural savings gap confronting Gen X women.
            </p>
          </div>
          <div className="dd-insight-row dd-insight-row--four" style={{ marginTop: '2rem' }}>
            {STATS.map((stat) => (
              <div key={stat.label} className="dd-insight-stat">
                <span className="dd-insight-stat__number">{stat.number}</span>
                <span className="dd-insight-stat__label">{stat.label}</span>
              </div>
            ))}
          </div>
          <p className="dd-section__source" style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
            Data compiled from National Institute on Retirement Security, AARP Public Policy Institute, and U.S. Census Bureau datasets.
          </p>
        </div>
      </section>

      {/* ── WHY THE GAP EXISTS ───────────────────────── */}
      <section className="dd-section dd-section--rule">
        <div className="dd-container">
          <div className="dd-section__head">
            <DDLabel tone="orange">Systemic Origins</DDLabel>
            <h2>Structural Hurdles, Not Individual Failure</h2>
            <p className="dd-section__intro">
              This shortfall was created by macroeconomic friction and structural biases across four decades of corporate reality.
            </p>
          </div>
          <div className="dd-grid dd-grid--two" style={{ gap: '1.5rem', marginTop: '1.5rem' }}>
            {CAUSES.map((item) => (
              <DDCard key={item.label}>
                <div className="dd-card__inner">
                  <div style={{ marginBottom: '0.5rem' }}>
                    <DDLabel tone="orange">{item.label}</DDLabel>
                  </div>
                  <p className="dd-card__text" style={{ fontSize: '0.9375rem', lineHeight: '1.6' }}>{item.text}</p>
                </div>
              </DDCard>
            ))}
          </div>
        </div>
      </section>

      {/* ── THE SOLUTION ─────────────────────────────── */}
      <section className="dd-banner-ink">
        <div className="dd-container">
          <div className="dd-banner-ink__inner">
            <span className="dd-banner-ink__eyebrow">The Leverage Thesis</span>
            <strong className="dd-banner-ink__claim">
              Discrete hourly labor cannot solve compound shortfalls. Digital assets generate asymmetric, recurring yield that closes the delta.
            </strong>
          </div>
        </div>
      </section>

      <section className="dd-section dd-section--rule">
        <div className="dd-container">
          <div className="dd-section__head">
            <DDLabel tone="orange">The Solution Model</DDLabel>
            <h2>Four Sovereign Asset Classes That Bridge the Gap</h2>
            <p className="dd-section__intro">
              Pragmatic, high-margin digital properties built once and operated quietly with minimal weekly overhead.
            </p>
          </div>
          <div className="dd-grid dd-grid--two" style={{ gap: '1.5rem', marginTop: '1.5rem' }}>
            {SOLUTIONS.map((item) => (
              <DDCard key={item.label}>
                <div className="dd-card__inner">
                  <div style={{ marginBottom: '0.5rem' }}>
                    <DDLabel tone="blue">{item.label}</DDLabel>
                  </div>
                  <p className="dd-card__text" style={{ fontSize: '0.9375rem', lineHeight: '1.6' }}>{item.text}</p>
                </div>
              </DDCard>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY NOW ──────────────────────────────────── */}
      <section className="dd-section dd-section--alt dd-section--rule">
        <div className="dd-container dd-container--narrow">
          <div className="dd-section__head">
            <DDLabel tone="orange">The Compounding Horizon</DDLabel>
            <h2>The Strategic Window of Opportunity</h2>
          </div>
          <div className="dd-prose-block">
            <p className="dd-prose">
              Gen X women currently sit between ages 44 and 59. Those who establish sovereign digital properties today benefit from a 10 to 15-year compounding runway ahead of traditional retirement benchmarks.
            </p>
            <p className="dd-prose">
              By packaging existing industry acumen and analytical mastery into faceless digital assets, you convert a lifetime of experience into non-linear recurring equity.
            </p>
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────── */}
      <section className="dd-section dd-section--rule">
        <div className="dd-container dd-container--narrow">
          <div className="dd-section__head">
            <DDLabel tone="orange">Take Action</DDLabel>
            <h2>Discover Your Highest-Leverage Asset Match</h2>
            <p className="dd-section__intro">
              The diagnostic assessment aligns your cognitive instincts to the property class that offers the highest probability of success.
            </p>
          </div>
          <div className="action-row" style={{ marginTop: '1.5rem' }}>
            <DDCTA label="Take the Diagnostic Assessment →" href="/quiz" variant="primary" />
            <DDCTA label="Explore the Framework" href="/framework" variant="outline" />
          </div>
        </div>
      </section>
    </>
  );
}
