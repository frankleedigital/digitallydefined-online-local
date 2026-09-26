// src/pages/FrameworkPage.jsx
// Faceless Digital Real Estate Framework — the explainer page.

import React from 'react';
import DDLabel from '../components/ui/DDLabel';
import DDCard from '../components/ui/DDCard';
import DDCTA from '../components/ui/DDCTA';

const ASSET_TYPES = [
  { label: 'Content Sites', text: 'Blogs, niche sites, resource hubs — built around a topic, not a person. Monetized through affiliate links, display ads, or digital products.' },
  { label: 'Digital Products', text: 'Templates, worksheets, guides, courses — created once and sold repeatedly. No inventory, no shipping, no face required.' },
  { label: 'Niche Communities', text: 'Private groups, membership sites, paid newsletters — built around an interest or outcome, not your personal identity.' },
  { label: 'Tools and Templates', text: 'Spreadsheets, calculators, planners, swipe files — high-value, low-effort assets that solve one specific problem.' },
  { label: 'Faceless Social Channels', text: 'YouTube channels, Pinterest accounts, TikTok pages — built around a topic using stock footage, text, or screen recordings. No face.' },
  { label: 'Email Lists', text: 'The most durable digital asset. A niche email list you own and control — no algorithm dependency, no platform risk.' },
];

const PRINCIPLES = [
  { step: '01', label: 'Own, Don\'t Rent', text: 'Social media followers are rented. Email lists, websites, and products are owned. Build assets you control.' },
  { step: '02', label: 'Faceless by Design', text: 'No personal brand required. The asset stands on its own — its value comes from the topic, the content, or the tool, not from your identity.' },
  { step: '03', label: 'Build Once, Earn Long', text: 'Digital assets compound. A piece of content published today can generate traffic and income for years. Physical hours are decoupled from income.' },
  { step: '04', label: 'Validate Before You Build', text: 'Check demand, competition, and monetization potential before spending time building. The Niche Scorecard does this in minutes.' },
];

export default function FrameworkPage() {
  return (
    <>
      {/* ── HERO ─────────────────────────────────────── */}
      <section className="dd-hero">
        <div className="dd-container dd-container--narrow">
          <DDLabel tone="orange">The Framework</DDLabel>
          <h1 className="dd-hero__headline">
            Faceless Digital Real Estate — explained.
          </h1>
          <p className="dd-hero__lead">
            Digital real estate is owning income-producing assets online — without a personal brand,
            a camera, or a social media following. This page explains exactly what it is, why it
            works for Gen X women, and how to start.
          </p>
          <div className="action-row">
            <DDCTA label="Take the Quiz →" href="/quiz" variant="primary" wide />
            <DDCTA label="See the Roadmaps" href="/roadmap/builder" variant="outline" />
          </div>
        </div>
      </section>

      {/* ── WHAT IS DIGITAL REAL ESTATE ──────────────── */}
      <section className="dd-banner-ink">
        <div className="dd-container">
          <div className="dd-banner-ink__inner">
            <span className="dd-banner-ink__eyebrow">The Core Idea</span>
            <strong className="dd-banner-ink__claim">
              Own income-producing digital assets. No face. No algorithm dependency. No clock-in required.
            </strong>
          </div>
        </div>
      </section>

      <section className="dd-section dd-section--rule">
        <div className="dd-container dd-container--narrow">
          <div className="dd-section__head">
            <DDLabel tone="orange">What It Is</DDLabel>
            <h2>Digital real estate in plain language.</h2>
            <p className="dd-section__intro">
              Physical real estate means owning property that generates rent. Digital real estate
              means owning online property that generates income — through traffic, products, leads,
              or memberships. The parallels are direct.
            </p>
          </div>

          <div className="dd-prose-block">
            <p className="dd-prose">
              A content site that ranks on Google and generates affiliate income is digital real
              estate. A digital product that sells while you sleep is digital real estate. A
              faceless YouTube channel with 10,000 subscribers in a niche is digital real estate.
              An email list of 2,000 people interested in a specific topic is digital real estate.
            </p>
            <p className="dd-prose">
              None of these require your face, your name, or your personal brand. They require
              a topic, a strategy, and consistent execution — which is exactly what DigitallyDefined
              is designed to support.
            </p>
          </div>
        </div>
      </section>

      {/* ── ASSET TYPES ──────────────────────────────── */}
      <section className="dd-section dd-section--alt dd-section--rule">
        <div className="dd-container">
          <div className="dd-section__head">
            <DDLabel tone="orange">Asset Types</DDLabel>
            <h2>Six types of faceless digital real estate.</h2>
            <p className="dd-section__intro">
              These are the asset types the DigitallyDefined system is built around. Your quiz
              result will point you toward the ones that match your strongest superpower.
            </p>
          </div>
          <div className="dd-grid dd-grid--three">
            {ASSET_TYPES.map((item) => (
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

      {/* ── CORE PRINCIPLES ──────────────────────────── */}
      <section className="dd-section dd-section--rule">
        <div className="dd-container">
          <div className="dd-section__head">
            <DDLabel tone="orange">Core Principles</DDLabel>
            <h2>Four rules the system runs on.</h2>
          </div>
          <div className="dd-grid dd-grid--four">
            {PRINCIPLES.map((item) => (
              <DDCard key={item.step}>
                <div className="dd-card__inner">
                  <span className="dd-step-number">{item.step}</span>
                  <DDLabel tone="orange">{item.label}</DDLabel>
                  <p className="dd-card__text">{item.text}</p>
                </div>
              </DDCard>
            ))}
          </div>
        </div>
      </section>

      {/* ── GEN X CONNECTION ─────────────────────────── */}
      <section className="dd-section dd-section--alt dd-section--rule">
        <div className="dd-container dd-container--narrow">
          <div className="dd-section__head">
            <DDLabel tone="orange">Why Gen X Women</DDLabel>
            <h2>Why this works specifically for you.</h2>
          </div>
          <div className="dd-prose-block">
            <p className="dd-prose">
              Gen X women have a documented retirement gap — a real, measurable shortfall between
              what they have saved and what they will need. The causes are structural: career
              interruptions, wage gaps, caregiving years, and the shift from pensions to 401(k)s.
            </p>
            <p className="dd-prose">
              Digital real estate is one of the most accessible ways to close that gap — because
              it does not require a new career, a visible personal brand, or starting over from
              zero. It requires the skills you already have, applied to a new model.
            </p>
            <p className="dd-prose">
              The Digital Superpower Quiz maps your existing strengths — how you think, how you
              learn, how you communicate — to the asset type most likely to work for you. No
              guessing. No generic advice.
            </p>
          </div>
          <div className="action-row">
            <DDCTA label="Read the Retirement Gap Explainer →" href="/retirement-gap" variant="outline" />
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────── */}
      <section className="dd-section dd-section--rule">
        <div className="dd-container dd-container--narrow">
          <div className="dd-section__head">
            <DDLabel tone="orange">Start Building</DDLabel>
            <h2>Ready to find your asset type?</h2>
            <p className="dd-section__intro">
              The quiz takes two minutes, scores your strongest superpower, and returns a
              personalized build sequence. No email required.
            </p>
          </div>
          <div className="action-row">
            <DDCTA label="Take the Quiz →" href="/quiz" variant="primary" />
            <DDCTA label="See Builder Plan" href="/builder" variant="outline" />
          </div>
        </div>
      </section>
    </>
  );
}
