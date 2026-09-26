// src/pages/FrameworkPage.jsx
// Faceless Digital Real Estate Framework — Master Explainer & Interactive Asset Blueprint

import React, { useMemo } from 'react';
import DDLabel from '../components/ui/DDLabel.jsx';
import DDCard from '../components/ui/DDCard.jsx';
import DDCTA from '../components/ui/DDCTA.jsx';
import { loadQuizResult } from '../features/quiz/lib/quizLogic.js';
import { getPersona } from '../features/quiz/lib/personas.js';

// SVG Icons for each digital asset class
const ASSET_ICONS = {
  content: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
      <line x1="8" y1="6" x2="16" y2="6" />
      <line x1="8" y1="10" x2="16" y2="10" />
    </svg>
  ),
  products: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="7" width="20" height="14" rx="0" ry="0" />
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </svg>
  ),
  community: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  tools: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="4" width="16" height="16" rx="0" />
      <line x1="9" y1="9" x2="15" y2="9" />
      <line x1="9" y1="15" x2="15" y2="15" />
      <line x1="12" y1="9" x2="12" y2="15" />
    </svg>
  ),
  media: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="23 7 16 12 23 17 23 7" />
      <rect x="1" y="5" width="15" height="14" rx="0" ry="0" />
    </svg>
  ),
  email: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  ),
};

const ASSET_TYPES = [
  {
    id: 'content',
    title: 'Authority Content Hubs',
    personaMatch: ['creator', 'educator'],
    type: 'Search & Ad Revenue Asset',
    metric: 'Compounding Organic Traffic',
    description: 'Niche search hubs, specialized directories, and curated resource guides. Built around high-intent topics, not personal charisma. Monetized through affiliate partnerships, premium placements, and digital product cross-sells.',
    advantage: 'Operates 24/7 without on-camera presence or daily social posting.',
  },
  {
    id: 'products',
    title: 'Automated Digital Products',
    personaMatch: ['builder', 'educator'],
    type: 'Direct Transaction Asset',
    metric: '100% Margin Recurring Yield',
    description: 'High-utility worksheets, operational checklists, SOP bundles, and targeted execution blueprints. Engineered once and delivered automatically via private secure delivery links.',
    advantage: 'Zero physical inventory, zero shipping friction, zero personal branding needed.',
  },
  {
    id: 'community',
    title: 'Faceless Niche Circles',
    personaMatch: ['connector'],
    type: 'Recurring Membership Asset',
    metric: 'Predictable Monthly Cashflow',
    description: 'Micro-communities and moderated mastermind portals centered on a singular outcome, professional transition, or shared objective. The value stems from the peer exchange and curated resources.',
    advantage: 'Community members generate engagement; you act as the quiet architect.',
  },
  {
    id: 'tools',
    title: 'Micro-Tools & Utility Calculators',
    personaMatch: ['builder', 'strategist'],
    type: 'Lead Generation & SaaS Asset',
    metric: 'High Conversion Lead Magnet',
    description: 'Interactive scorecards, ROI calculators, assessment engines, and dynamic decision trees. They solve an urgent, discrete pain point in under 90 seconds.',
    advantage: 'Natural viral loops and industry backlinks without personal self-promotion.',
  },
  {
    id: 'media',
    title: 'Faceless Media Channels',
    personaMatch: ['creator', 'strategist'],
    type: 'Ad Revenue & Sponsorship Asset',
    metric: 'Passive Platform Syndication',
    description: 'Topic-driven YouTube channels, Pinterest resource boards, and curated audiovisual repositories utilizing screen captures, typography motion, and AI-assisted voice narration.',
    advantage: 'Total anonymity with full algorithmic scale and global monetization.',
  },
  {
    id: 'email',
    title: 'Private Owned Email Lists',
    personaMatch: ['builder', 'creator', 'educator', 'strategist', 'connector'],
    type: 'Sovereign Audience Asset',
    metric: 'Immune to Algorithm Volatility',
    description: 'The foundation of all digital real estate. A direct, unmediated communication pipeline with high-intent subscribers who opted in for your specific domain intelligence.',
    advantage: 'Direct inbox sovereignty. You own the distribution ledger completely.',
  },
];

const PRINCIPLES = [
  {
    num: '01',
    label: 'Asset Sovereignty',
    title: 'Own the Deed, Never Just Rent',
    text: 'Social platforms are tenant spaces governed by shifting algorithms and terms. True digital real estate consists of owned domain property, proprietary mailing lists, and direct checkout funnels you govern.',
  },
  {
    num: '02',
    label: 'Faceless Architecture',
    title: 'Identity-Free Enterprise',
    text: 'Your enterprise value must not rely on your personal likeness, daily appearances, or celebrity status. The asset carries its own equity and can operate or sell independently of you.',
  },
  {
    num: '03',
    label: 'Compounding Leverage',
    title: 'Decouple Hours from Yield',
    text: 'Traditional work trades discrete time for compensation. Digital assets are built once and distribute infinitely, allowing yield to compound quietly while you focus on life.',
  },
  {
    num: '04',
    label: 'Calculated Validation',
    title: 'Validate Demand Before Building',
    text: 'Never spend weeks creating an asset on pure speculation. Use structured scorecards, keyword search velocity, and monetization tests to confirm profitability upfront.',
  },
];

export default function FrameworkPage() {
  const stored = useMemo(() => loadQuizResult(), []);
  const persona = stored?.superpower ? getPersona(stored.superpower) : null;

  return (
    <>
      {/* ── HERO SECTION ──────────────────────────────── */}
      <section className="dd-hero">
        <div className="dd-container dd-container--narrow">
          <div className="dd-brand-badge-wrapper" style={{ marginBottom: '1.25rem' }}>
            <span className="dd-logo-pill">
              <strong>DIGITALLY</strong><em>DEFINED</em>
              <span className="dd-pill-divider">/</span>
              <span className="dd-pill-context">Operating Framework</span>
            </span>
          </div>

          <DDLabel tone="orange">The Blueprint</DDLabel>
          <h1 className="dd-hero__headline">
            Faceless Digital Real Estate
          </h1>
          <p className="dd-hero__lead">
            The modern asset class for Gen X women: high-leverage, privacy-first digital income streams built on ownership, automation, and real-world acumen — without becoming a public influencer.
          </p>

          <div className="action-row" style={{ marginTop: '2rem' }}>
            {stored ? (
              <>
                <DDCTA label="Go to Your Dashboard →" href="/dashboard" variant="primary" />
                <DDCTA label={`View ${persona?.title || ''} Roadmap`} href="/roadmap" variant="outline" />
              </>
            ) : (
              <>
                <DDCTA label="Take the 2-Minute Diagnostic →" href="/quiz" variant="primary" />
                <DDCTA label="Explore Builder Plan" href="/builder" variant="outline" />
              </>
            )}
          </div>
        </div>
      </section>

      {/* ── PERSONALIZED USER INSIGHT (IF QUIZ TAKEN) ──── */}
      {stored && (
        <section className="dd-banner-ink">
          <div className="dd-container">
            <div className="dd-banner-ink__inner" style={{ textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
                <DDLabel tone="orange">Profile Verified: {persona?.title}</DDLabel>
                <span style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)', fontFamily: 'var(--font-mono)' }}>
                  Superpower: {persona?.superpowerName || stored.superpower}
                </span>
              </div>
              <strong className="dd-banner-ink__claim" style={{ fontSize: '1.125rem', lineHeight: '1.5' }}>
                Your ideal asset blueprint starts with {persona?.recommendedFirstStep || 'building your first targeted asset'}.
              </strong>
            </div>
          </div>
        </section>
      )}

      {/* ── CORE THESIS BANNER ───────────────────────── */}
      <section className="dd-section dd-section--rule">
        <div className="dd-container dd-container--narrow">
          <div className="dd-section__head">
            <DDLabel tone="orange">The Thesis</DDLabel>
            <h2>Physical vs. Digital Real Estate</h2>
            <p className="dd-section__intro">
              Why digital property outperforms traditional rentals in speed, margin, and peace of mind.
            </p>
          </div>

          <div className="dd-grid dd-grid--two" style={{ gap: '1.5rem', marginTop: '1.5rem' }}>
            <DDCard>
              <div className="dd-card__inner">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <DDLabel tone="blue">Traditional Real Estate</DDLabel>
                  <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--color-text-muted)' }}>Heavy Capital</span>
                </div>
                <ul className="dd-list" style={{ marginTop: '0.5rem' }}>
                  <li>Requires $50k+ down payments and personal debt guarantees</li>
                  <li>Physical maintenance, tenant disputes, local market risk</li>
                  <li>Net cash flow yield typically 6% – 10% annually</li>
                  <li>Tied to physical geography and municipal tax changes</li>
                </ul>
              </div>
            </DDCard>

            <DDCard>
              <div className="dd-card__inner">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <DDLabel tone="orange">Digital Real Estate</DDLabel>
                  <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--color-accent)' }}>85%–95% Net Margin</span>
                </div>
                <ul className="dd-list" style={{ marginTop: '0.5rem' }}>
                  <li>Built with sweat equity, domain intelligence, and automation tools</li>
                  <li>Zero tenants, zero physical overhead, zero personal face exposure</li>
                  <li>Global market distribution accessible to billions of searchers</li>
                  <li>Compounding enterprise equity with turnkey exit potential</li>
                </ul>
              </div>
            </DDCard>
          </div>
        </div>
      </section>

      {/* ── THE 6 ASSET CLASSES ───────────────────────── */}
      <section className="dd-section dd-section--alt dd-section--rule">
        <div className="dd-container">
          <div className="dd-section__head">
            <DDLabel tone="orange">Asset Portfolio</DDLabel>
            <h2>The Six Digital Property Types</h2>
            <p className="dd-section__intro">
              Engineered for anonymity, automated delivery, and high-margin recurring yield.
            </p>
          </div>

          <div className="dd-grid dd-grid--three" style={{ gap: '1.5rem' }}>
            {ASSET_TYPES.map((asset) => {
              const isMatch = stored?.superpower && asset.personaMatch.includes(stored.superpower);
              return (
                <DDCard key={asset.id} className={isMatch ? 'dd-card--highlight' : ''}>
                  <div className="dd-card__inner" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                      <div style={{ color: isMatch ? 'var(--color-accent)' : 'var(--color-text)' }}>
                        {ASSET_ICONS[asset.id]}
                      </div>
                      {isMatch ? (
                        <DDLabel tone="orange">Recommended for You</DDLabel>
                      ) : (
                        <span style={{ fontSize: '0.6875rem', fontFamily: 'var(--font-mono)', color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>
                          {asset.type}
                        </span>
                      )}
                    </div>

                    <h3 className="dd-card__title" style={{ fontSize: '1.125rem', marginBottom: '0.5rem' }}>
                      {asset.title}
                    </h3>
                    <p className="dd-card__text" style={{ flexGrow: 1, fontSize: '0.875rem', lineHeight: '1.6', marginBottom: '1rem' }}>
                      {asset.description}
                    </p>

                    <div style={{ paddingTop: '0.75rem', borderTop: '1px solid var(--color-border)' }}>
                      <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', fontFamily: 'var(--font-mono)' }}>
                        <strong>Key Edge:</strong> {asset.advantage}
                      </div>
                    </div>
                  </div>
                </DDCard>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── THE 4 IMMUTABLE LAWS ──────────────────────── */}
      <section className="dd-section dd-section--rule">
        <div className="dd-container">
          <div className="dd-section__head">
            <DDLabel tone="orange">Operating Rules</DDLabel>
            <h2>The Four Immutable Laws of the System</h2>
            <p className="dd-section__intro">
              The foundational governance that keeps your digital assets resilient and sovereign.
            </p>
          </div>

          <div className="dd-grid dd-grid--two" style={{ gap: '1.5rem' }}>
            {PRINCIPLES.map((principle) => (
              <DDCard key={principle.num}>
                <div className="dd-card__inner">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                    <span style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.875rem',
                      fontWeight: '700',
                      color: 'var(--color-accent)',
                      border: '1px solid var(--color-border)',
                      padding: '0.125rem 0.5rem',
                      backgroundColor: 'var(--color-bg)'
                    }}>
                      LAW {principle.num}
                    </span>
                    <DDLabel tone="blue">{principle.label}</DDLabel>
                  </div>
                  <h3 className="dd-card__title" style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>
                    {principle.title}
                  </h3>
                  <p className="dd-card__text" style={{ fontSize: '0.9375rem', lineHeight: '1.6' }}>
                    {principle.text}
                  </p>
                </div>
              </DDCard>
            ))}
          </div>
        </div>
      </section>

      {/* ── GEN X RETIREMENT GAP BRIDGE ──────────────── */}
      <section className="dd-section dd-section--alt dd-section--rule">
        <div className="dd-container dd-container--narrow">
          <div className="dd-section__head">
            <DDLabel tone="orange">Strategic Imperative</DDLabel>
            <h2>Closing the Gen X Retirement Gap</h2>
            <p className="dd-section__intro">
              Why digital asset ownership is the most pragmatic financial bridge for women in their 40s and 50s.
            </p>
          </div>

          <div className="dd-prose-block">
            <p className="dd-prose">
              Gen X women carry a documented retirement savings deficit caused by caregiving leaves, unequal corporate ladders, and rising cost of living. Trading more linear hours at a traditional job will not solve this mathematical deficit.
            </p>
            <p className="dd-prose">
              Building 2 to 3 faceless digital properties creates non-linear, high-margin monthly income that closes the gap without risking your savings, taking out mortgages, or sacrificing personal privacy.
            </p>
          </div>

          <div className="action-row" style={{ marginTop: '1.5rem' }}>
            <DDCTA label="Read Full Retirement Gap Analysis →" href="/retirement-gap" variant="outline" />
          </div>
        </div>
      </section>

      {/* ── CONVERSION ACTION CTA ─────────────────────── */}
      <section className="dd-section dd-section--rule">
        <div className="dd-container dd-container--narrow">
          <div className="dd-section__head">
            <DDLabel tone="orange">Execute</DDLabel>
            <h2>Map Your Superpower to an Asset Class</h2>
            <p className="dd-section__intro">
              Discover which digital property model aligns with your natural strengths. Takes 2 minutes with zero cost.
            </p>
          </div>

          <div className="action-row" style={{ marginTop: '1.5rem' }}>
            {stored ? (
              <>
                <DDCTA label="Go to Workspace Dashboard →" href="/dashboard" variant="primary" />
                <DDCTA label="Retake Assessment" href="/quiz" variant="outline" />
              </>
            ) : (
              <>
                <DDCTA label="Start the Free Assessment →" href="/quiz" variant="primary" />
                <DDCTA label="Explore the Plans" href="/builder" variant="outline" />
              </>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
