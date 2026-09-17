// src/features/home/pages/HomePage.jsx
// Landing page: funnels visitors into the Digital Superpower Quiz.
// Tools and dashboard stay hidden until the quiz is completed.

import React from 'react';
import DDSection from '../../../components/ui/DDSection.jsx';
import DDCTA from '../../../components/ui/DDCTA.jsx';
import { theme } from '../../../config/theme';

const COMMUNITY_URL = 'https://facebook.com/groups/digitallydefind';

const FLOW = [
  { step: '01', title: 'Take the Quiz', body: 'Seven questions. One digital superpower. About 90 seconds.' },
  { step: '02', title: 'Get Your Roadmap', body: 'A personalized build sequence created from your answers.' },
  { step: '03', title: 'Open Your Dashboard', body: 'Your private workspace — unlocked only after the quiz.' },
  { step: '04', title: 'Use Your Tools', body: 'Scorecard, roadmap, product, social and trends unlock here.' },
];

export default function HomePage() {
  return (
    <div id="top" className="home-page">
      {/* Hero — the only thing above the fold */}
      <section className="page-hero">
        <div className="dd-container">
          <span className="label label--orange">Faceless digital real estate</span>
          <h1>Faceless Digital Real Estate for Gen X Women</h1>
          <p>Discover your Digital Superpower and get your personalized roadmap.</p>
          <p style={{ fontSize: '0.95rem', color: theme.colors.textMuted, maxWidth: 640 }}>
            Build digital assets quietly, intentionally, and without becoming the brand.
          </p>
          <div className="action-row">
            <DDCTA label="Take the Quiz" href="/quiz" variant="primary" />
            <DDCTA label="Join the Community" href={COMMUNITY_URL} variant="outline" target="_blank" rel="noopener noreferrer" />
          </div>
        </div>
      </section>

      {/* Flow — explains the sequence without exposing any tools early */}
      <DDSection
        id="how-it-works"
        eyebrow="How it works"
        title="Quiz → Roadmap → Dashboard → Tools"
        intro="One short quiz. One personalized roadmap. One private dashboard. Tools unlock only after you finish."
        rule="top"
      >
        <div className="home-path">
          {FLOW.map((item) => (
            <div key={item.step} className="home-path__step">
              <span className="home-path__number">{item.step}</span>
              <h3 style={{ fontFamily: theme.fonts.heading, fontWeight: 800, letterSpacing: '-0.02em', fontSize: '1.1rem', margin: '0 0 0.35rem' }}>
                {item.title}
              </h3>
              <p style={{ color: theme.colors.textMuted, lineHeight: 1.6, margin: 0 }}>{item.body}</p>
            </div>
          ))}
        </div>
      </DDSection>

      {/* Quiet close — no tool grid, no clutter */}
      <DDSection
        id="start"
        eyebrow="Start here"
        title="Start with the quiz. Everything else follows."
        intro="No camera. No followers required. Just one asset you own, with a roadmap that fits how you actually work."
        tone="dark"
        rule="top"
        className="dd-section--cta-center"
      >
        <div className="action-row">
          <DDCTA label="Take the Quiz" href="/quiz" variant="primary" style={{ minWidth: 220 }} />
        </div>
      </DDSection>
    </div>
  );
}