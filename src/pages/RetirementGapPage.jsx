// src/pages/RetirementGapPage.jsx
// Gen X Retirement Gap explainer — the problem and the digital real estate solution.

import React from 'react';
import DDLabel from '../components/ui/DDLabel';
import DDCard from '../components/ui/DDCard';
import DDCTA from '../components/ui/DDCTA';

const STATS = [
  { number: '47%', label: 'of Gen X women have less than $100K saved for retirement' },
  { number: '30%', label: 'have no retirement savings at all' },
  { number: '12yr', label: 'average career gap due to caregiving responsibilities' },
  { number: '$1.1M', label: 'estimated average retirement shortfall for Gen X women' },
];

const CAUSES = [
  { label: 'The Wage Gap', text: 'Gen X women earned on average 20–30% less than men throughout their careers. Lower earnings mean lower 401(k) contributions, lower Social Security credits, and less compound growth.' },
  { label: 'Career Interruptions', text: 'Caregiving for children and aging parents pulled millions of Gen X women out of the workforce for years — breaking retirement contribution streaks and growth trajectories.' },
  { label: 'The Pension Shift', text: 'Gen X was the first generation to bear full responsibility for their own retirement through 401(k)s and IRAs — with less institutional guidance than prior generations.' },
  { label: 'Divorce and Single Income', text: 'Higher divorce rates and longer periods of single-income living left many Gen X women planning for retirement alone, without the compounding advantage of a two-income household.' },
];

const SOLUTIONS = [
  { label: 'Digital Products', text: 'Create once, sell repeatedly. Courses, templates, and guides generate income without ongoing labor. No inventory, no shipping, no face required.' },
  { label: 'Content Assets', text: 'Niche sites, newsletters, and YouTube channels build traffic that converts to affiliate income, ad revenue, and product sales — passively, over time.' },
  { label: 'Faceless Communities', text: 'Membership sites and paid communities built around a topic — not your identity — generate recurring monthly income with minimal time investment after setup.' },
  { label: 'Email-First Businesses', text: 'The most durable digital asset. A niche email list you own and control — no algorithm dependency, no platform risk, direct access to an audience.' },
];

export default function RetirementGapPage() {
  return (
    <>
      {/* ── HERO ─────────────────────────────────────── */}
      <section className="dd-hero">
        <div className="dd-container dd-container--narrow">
          <DDLabel tone="orange">The Retirement Gap</DDLabel>
          <h1 className="dd-hero__headline">
            The Gen X retirement gap is real. So is the solution.
          </h1>
          <p className="dd-hero__lead">
            Gen X women face a documented, measurable retirement shortfall — the result of structural
            inequities that were not their fault. Digital real estate is one of the most accessible
            paths to closing it. This page explains both.
          </p>
          <div className="action-row">
            <DDCTA label="Find Your Asset Type →" href="/quiz" variant="primary" wide />
            <DDCTA label="Read the Framework" href="/framework" variant="outline" />
          </div>
        </div>
      </section>

      {/* ── STATS BANNER ─────────────────────────────── */}
      <section className="dd-section dd-section--alt dd-section--rule">
        <div className="dd-container">
          <div className="dd-section__head">
            <DDLabel tone="orange">The Numbers</DDLabel>
            <h2>The gap by the numbers.</h2>
          </div>
          <div className="dd-insight-row dd-insight-row--four">
            {STATS.map((stat) => (
              <div key={stat.label} className="dd-insight-stat">
                <span className="dd-insight-stat__number">{stat.number}</span>
                <span className="dd-insight-stat__label">{stat.label}</span>
              </div>
            ))}
          </div>
          <p className="dd-section__source">
            Sources: National Institute on Retirement Security, AARP Research, U.S. Census Bureau.
            These figures represent averages and estimates — individual situations vary.
          </p>
        </div>
      </section>

      {/* ── WHY THE GAP EXISTS ───────────────────────── */}
      <section className="dd-section dd-section--rule">
        <div className="dd-container">
          <div className="dd-section__head">
            <DDLabel tone="orange">Why It Exists</DDLabel>
            <h2>The causes are structural. Not personal.</h2>
            <p className="dd-section__intro">
              The retirement gap is not the result of poor financial decisions. It is the result
              of structural inequities that worked against Gen X women across four decades.
            </p>
          </div>
          <div className="dd-grid dd-grid--two">
            {CAUSES.map((item) => (
              <DDCard key={item.label}>
                <div className="dd-card__inner">
                  <DDLabel tone="orange">{item.label}</DDLabel>
                  <p className="dd-card__text">{item.text}</p>
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
            <span className="dd-banner-ink__eyebrow">The Opportunity</span>
            <strong className="dd-banner-ink__claim">
              Digital real estate compounds. Physical hours do not. That is the asymmetry worth building toward.
            </strong>
          </div>
        </div>
      </section>

      <section className="dd-section dd-section--rule">
        <div className="dd-container">
          <div className="dd-section__head">
            <DDLabel tone="orange">The Solution</DDLabel>
            <h2>Four digital asset types that close the gap.</h2>
            <p className="dd-section__intro">
              These are not get-rich-quick schemes. They are income assets that compound over time —
              built once, maintained with minimal ongoing effort, and generating returns without
              requiring your face or your personal brand.
            </p>
          </div>
          <div className="dd-grid dd-grid--two">
            {SOLUTIONS.map((item) => (
              <DDCard key={item.label}>
                <div className="dd-card__inner">
                  <DDLabel tone="orange">{item.label}</DDLabel>
                  <p className="dd-card__text">{item.text}</p>
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
            <DDLabel tone="orange">Why Now</DDLabel>
            <h2>The window is still open. For now.</h2>
          </div>
          <div className="dd-prose-block">
            <p className="dd-prose">
              Gen X women are between 44 and 59 years old. The ones who start building digital
              assets now have 10–20 years of compounding ahead of them before traditional
              retirement age. That is enough time to build meaningful, sustainable digital income.
            </p>
            <p className="dd-prose">
              The ones who wait another five years have a harder problem. Not impossible — but
              harder. The time to start is not when everything is perfect. It is now, with the
              information you have and the skills you already own.
            </p>
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────── */}
      <section className="dd-section dd-section--rule">
        <div className="dd-container dd-container--narrow">
          <div className="dd-section__head">
            <DDLabel tone="orange">Start</DDLabel>
            <h2>Find the asset type that fits your strengths.</h2>
            <p className="dd-section__intro">
              The quiz maps your existing skills and thinking style to the digital asset type most
              likely to work for you. Two minutes. Scored locally. No email required.
            </p>
          </div>
          <div className="action-row">
            <DDCTA label="Take the Quiz →" href="/quiz" variant="primary" />
            <DDCTA label="Read the Framework" href="/framework" variant="outline" />
          </div>
        </div>
      </section>
    </>
  );
}
