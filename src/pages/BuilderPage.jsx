// src/pages/BuilderPage.jsx
// Builder plan page — entry-level plan for first-time digital property builders.

import React from 'react';
import DDLabel from '../components/ui/DDLabel';
import DDCard from '../components/ui/DDCard';
import DDCTA from '../components/ui/DDCTA';

const INCLUDES = [
  { label: 'Digital Superpower Quiz', text: 'Find your strongest profile. Scored on your device. No email required.' },
  { label: 'Personalized Roadmap', text: 'A 4-phase build sequence tailored to your quiz result and superpower.' },
  { label: 'Niche Scorecard Tool', text: 'Score any niche across 6 criteria before you commit to building.' },
  { label: 'AI Mentor Access', text: 'Ask the Hermes AI Mentor anything about your build at any stage.' },
  { label: 'Starter Worksheet', text: 'One concise worksheet to turn an idea into a first digital property.' },
  { label: 'Community Access', text: 'Join the private DigitallyDefined Facebook community for Gen X women.' },
];

const COMPARE = [
  { feature: 'Digital Superpower Quiz', builder: true, empire: true },
  { feature: 'Personalized Roadmap', builder: true, empire: true },
  { feature: 'Niche Scorecard', builder: true, empire: true },
  { feature: 'AI Mentor', builder: true, empire: true },
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
  return (
    <>
      {/* ── HERO ─────────────────────────────────────── */}
      <section className="dd-hero">
        <div className="dd-container dd-container--narrow">
          <DDLabel tone="orange">Builder Plan</DDLabel>
          <h1 className="dd-hero__headline">
            Build your first digital property. Free.
          </h1>
          <p className="dd-hero__lead">
            The Builder plan is everything you need to find your niche, validate it, and build
            your first faceless digital income asset — without a camera, without a personal brand,
            and without paying anything to start.
          </p>
          <div className="action-row">
            <DDCTA label="Start Free with the Quiz →" href="/quiz" variant="primary" wide />
            <DDCTA label="See Empire Plan" href="/empire" variant="outline" />
          </div>
          <p className="dd-hero__note">
            Free to start. No credit card required.
          </p>
        </div>
      </section>

      {/* ── WHAT'S INCLUDED ──────────────────────────── */}
      <section className="dd-section dd-section--rule">
        <div className="dd-container">
          <div className="dd-section__head">
            <DDLabel tone="orange">What's Included</DDLabel>
            <h2>Everything in the Builder plan.</h2>
            <p className="dd-section__intro">
              All six of these are free. The quiz unlocks the tools. The roadmap tells you what
              to build first.
            </p>
          </div>
          <div className="dd-grid dd-grid--three">
            {INCLUDES.map((item) => (
              <DDCard key={item.label}>
                <div className="dd-card__inner">
                  <div className="dd-card__check-row">
                    <span className="dd-card__check"><CheckIcon /></span>
                    <DDLabel tone="orange">{item.label}</DDLabel>
                  </div>
                  <p className="dd-card__text">{item.text}</p>
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
            <DDLabel tone="orange">Pricing</DDLabel>
            <h2>Free to start. Always.</h2>
          </div>
          <div className="dd-grid dd-grid--two">
            <DDCard>
              <div className="dd-card__inner dd-card__inner--pricing">
                <DDLabel tone="orange">Builder</DDLabel>
                <div className="dd-price">
                  <span className="dd-price__amount">$0</span>
                  <span className="dd-price__period">/ forever</span>
                </div>
                <p className="dd-card__text">
                  The complete foundation — quiz, roadmap, niche tool, AI mentor, and community.
                  No time limit. No credit card.
                </p>
                <DDCTA label="Start Free →" href="/quiz" variant="primary" wide />
              </div>
            </DDCard>
            <DDCard tone="ink">
              <div className="dd-card__inner dd-card__inner--pricing">
                <DDLabel tone="orange">Empire</DDLabel>
                <div className="dd-price">
                  <span className="dd-price__amount">Coming Soon</span>
                </div>
                <p className="dd-card__text">
                  Full suite — all tools, automation playbooks, multi-asset portfolio tracker,
                  and priority AI Mentor access. Built for women ready to scale.
                </p>
                <DDCTA label="See Empire Plan →" href="/empire" variant="outline" wide />
              </div>
            </DDCard>
          </div>
        </div>
      </section>

      {/* ── FEATURE COMPARISON ───────────────────────── */}
      <section className="dd-section dd-section--rule">
        <div className="dd-container dd-container--narrow">
          <div className="dd-section__head">
            <DDLabel tone="orange">Compare Plans</DDLabel>
            <h2>Builder vs Empire.</h2>
          </div>
          <div className="dd-compare-table">
            <div className="dd-compare-table__header">
              <span>Feature</span>
              <span>Builder</span>
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
            <DDLabel tone="orange">Ready?</DDLabel>
            <h2>Start with the quiz. Everything else unlocks.</h2>
            <p className="dd-section__intro">
              Two minutes. Scored on your device. Your personalized roadmap is ready the moment
              you finish.
            </p>
          </div>
          <div className="action-row">
            <DDCTA label="Take the Free Quiz →" href="/quiz" variant="primary" />
            <DDCTA label="Start Here" href="/start-here" variant="outline" />
          </div>
        </div>
      </section>
    </>
  );
}
