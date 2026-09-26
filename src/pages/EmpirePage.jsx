// src/pages/EmpirePage.jsx
// Empire plan page — for women ready to scale to a full digital real estate portfolio.

import React from 'react';
import DDLabel from '../components/ui/DDLabel';
import DDCard from '../components/ui/DDCard';
import DDCTA from '../components/ui/DDCTA';

const EMPIRE_INCLUDES = [
  { label: 'Everything in Builder', text: 'Quiz, roadmap, niche scorecard, AI mentor, starter worksheet, and community.' },
  { label: 'Product Designer Tool', text: 'Design a product concept with pricing, positioning, and a launch strategy — before you build.' },
  { label: 'Social Content Tool', text: 'Create platform-optimized social content for your niche without showing your face.' },
  { label: 'Trends Explorer', text: 'Identify trending topics and emerging opportunities in your space before they peak.' },
  { label: 'Multi-Asset Portfolio Tracker', text: 'Track all your digital properties, income streams, and build progress in one place.' },
  { label: 'Automation Playbooks', text: 'Step-by-step automation setups for email sequences, content distribution, and passive income flows.' },
  { label: 'Priority AI Mentor Access', text: 'Faster response times and extended context for the AI Mentor — built for active builders.' },
  { label: 'Roadmap Builder Tool', text: 'Generate a custom phased strategic roadmap for any niche or product idea.' },
];

const WHY_EMPIRE = [
  {
    label: 'Scale Past One Asset',
    title: 'Build a portfolio, not just a product.',
    text: 'The Builder plan gets you to your first asset. Empire is for women who are ready to build a second, third, and fourth — and connect them into a system.',
  },
  {
    label: 'Automate the Work',
    title: 'Set it. Let it run.',
    text: 'Empire includes automation playbooks for every part of the system — from lead capture to content distribution to email sequences. Build once, run while you sleep.',
  },
  {
    label: 'Track Everything',
    title: 'Know what is working.',
    text: 'The multi-asset portfolio tracker shows every digital property you own, its income stage, and the next action for each one. No spreadsheets required.',
  },
];

export default function EmpirePage() {
  return (
    <>
      {/* ── HERO ─────────────────────────────────────── */}
      <section className="dd-hero">
        <div className="dd-container dd-container--narrow">
          <DDLabel tone="orange">Empire Plan</DDLabel>
          <h1 className="dd-hero__headline">
            Build a portfolio of faceless digital income.
          </h1>
          <p className="dd-hero__lead">
            Empire is for women who are past the first asset and ready to scale — multiple income
            streams, automation, a full digital real estate portfolio, and priority AI Mentor access.
          </p>
          <div className="action-row">
            <DDCTA label="Join the Waitlist →" href="/quiz" variant="primary" wide />
            <DDCTA label="Start with Builder — Free" href="/builder" variant="outline" />
          </div>
          <p className="dd-hero__note">
            Empire is coming soon. Start with the free Builder plan today.
          </p>
        </div>
      </section>

      {/* ── WHY EMPIRE ───────────────────────────────── */}
      <section className="dd-banner-ink">
        <div className="dd-container">
          <div className="dd-banner-ink__inner">
            <span className="dd-banner-ink__eyebrow">Empire</span>
            <strong className="dd-banner-ink__claim">
              Not just more tools. A complete digital real estate operating system.
            </strong>
          </div>
        </div>
      </section>

      <section className="dd-section dd-section--rule">
        <div className="dd-container">
          <div className="dd-section__head">
            <DDLabel tone="orange">Why Empire</DDLabel>
            <h2>Built for women ready to scale.</h2>
          </div>
          <div className="dd-grid dd-grid--three">
            {WHY_EMPIRE.map((item) => (
              <DDCard key={item.label}>
                <div className="dd-card__inner">
                  <DDLabel tone="orange">{item.label}</DDLabel>
                  <h3 className="dd-card__title">{item.title}</h3>
                  <p className="dd-card__text">{item.text}</p>
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
            <DDLabel tone="orange">What's Included</DDLabel>
            <h2>Everything in Empire.</h2>
            <p className="dd-section__intro">
              Empire includes the complete Builder foundation plus the full tool suite, automation
              playbooks, portfolio tracker, and priority mentor access.
            </p>
          </div>
          <div className="dd-grid dd-grid--four">
            {EMPIRE_INCLUDES.map((item) => (
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

      {/* ── PRICING ──────────────────────────────────── */}
      <section className="dd-section dd-section--rule">
        <div className="dd-container dd-container--narrow">
          <div className="dd-section__head">
            <DDLabel tone="orange">Pricing</DDLabel>
            <h2>Empire is coming soon.</h2>
            <p className="dd-section__intro">
              We are finishing the full tool suite before opening Empire. Take the quiz now to
              get early access when it launches — and start building with the free Builder plan
              in the meantime.
            </p>
          </div>
          <div className="dd-grid dd-grid--two">
            <DDCard>
              <div className="dd-card__inner dd-card__inner--pricing">
                <DDLabel tone="orange">Builder — Now</DDLabel>
                <div className="dd-price">
                  <span className="dd-price__amount">$0</span>
                  <span className="dd-price__period">/ forever</span>
                </div>
                <p className="dd-card__text">
                  Start building your first faceless digital property today. Free. No credit card.
                </p>
                <DDCTA label="Start Free →" href="/quiz" variant="primary" wide />
              </div>
            </DDCard>
            <DDCard tone="ink">
              <div className="dd-card__inner dd-card__inner--pricing">
                <DDLabel tone="orange">Empire — Coming Soon</DDLabel>
                <div className="dd-price">
                  <span className="dd-price__amount">TBA</span>
                </div>
                <p className="dd-card__text">
                  Full suite. All tools. Automation playbooks. Portfolio tracker. Priority mentor.
                  Join the waitlist to be first when it opens.
                </p>
                <DDCTA label="Join the Waitlist →" href="/quiz" variant="outline" wide />
              </div>
            </DDCard>
          </div>
        </div>
      </section>

      {/* ── BOTTOM CTA ───────────────────────────────── */}
      <section className="dd-section dd-section--alt dd-section--rule">
        <div className="dd-container dd-container--narrow">
          <div className="dd-section__head">
            <DDLabel tone="orange">Start Now</DDLabel>
            <h2>Begin with Builder. Scale to Empire.</h2>
            <p className="dd-section__intro">
              Every Empire user starts with the quiz. Take it now and build your foundation
              while Empire finishes.
            </p>
          </div>
          <div className="action-row">
            <DDCTA label="Take the Free Quiz →" href="/quiz" variant="primary" />
            <DDCTA label="Compare Plans" href="/builder" variant="outline" />
          </div>
        </div>
      </section>
    </>
  );
}
