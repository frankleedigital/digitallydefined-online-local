// src/pages/StartHerePage.jsx
// Orientation page for new visitors — where to start, what to do first.

import React from 'react';
import DDLabel from '../components/ui/DDLabel';
import DDCard from '../components/ui/DDCard';
import DDCTA from '../components/ui/DDCTA';

const STEPS = [
  {
    step: '01',
    label: 'Take the Quiz',
    title: 'Find your digital superpower.',
    text: 'Seven questions. Scored on this device. No email required to see your result. You will get a superpower profile and a personalized build sequence.',
    cta: { label: 'Take the Quiz →', href: '/quiz', variant: 'primary' },
  },
  {
    step: '02',
    label: 'Read Your Roadmap',
    title: 'Get your build sequence.',
    text: 'Your roadmap shows exactly what to build, in what order, and why — based on your superpower. No guessing. No generic advice.',
    cta: { label: 'Preview a Roadmap →', href: '/roadmap/builder', variant: 'outline' },
  },
  {
    step: '03',
    label: 'Use the Tools',
    title: 'Validate before you build.',
    text: 'The Niche Scorecard, Product Designer, and Social Content tools unlock after the quiz. Use them to validate your idea and plan your first asset.',
    cta: { label: 'See the Tools →', href: '/tools', variant: 'outline' },
  },
  {
    step: '04',
    label: 'Choose a Plan',
    title: 'Go deeper when you are ready.',
    text: 'The Builder plan supports your first property. The Empire plan is for women ready to scale to multiple income streams and automation.',
    cta: { label: 'See Plans →', href: '/builder', variant: 'outline' },
  },
];

const FAQS = [
  {
    q: 'Do I need a face or personal brand?',
    a: 'No. DigitallyDefined is built for faceless digital real estate — income assets that are not attached to your face, name, or social media presence.',
  },
  {
    q: 'Do I need followers or an audience?',
    a: 'No. The system is designed to work without an existing audience. You build the asset first, then the audience finds it.',
  },
  {
    q: 'What does "digital real estate" mean?',
    a: 'It means owning income-producing digital assets — content sites, tools, templates, courses, communities — the same way you would own physical property. You build it once and it generates returns over time.',
  },
  {
    q: 'Is this only for Gen X women?',
    a: 'DigitallyDefined is built specifically around the constraints, strengths, and goals of Gen X women — but the framework works for anyone who wants to build faceless digital income.',
  },
  {
    q: 'How long does the quiz take?',
    a: 'About two minutes. Seven questions. Scored locally on your device — nothing is sent anywhere unless you choose to receive your roadmap by email.',
  },
];

export default function StartHerePage() {
  return (
    <>
      {/* ── HERO ─────────────────────────────────────── */}
      <section className="dd-hero">
        <div className="dd-container dd-container--narrow">
          <DDLabel tone="orange">New Here?</DDLabel>
          <h1 className="dd-hero__headline">
            Start here. Everything else follows.
          </h1>
          <p className="dd-hero__lead">
            DigitallyDefined is a system for building faceless digital income — without a personal
            brand, a camera, or an existing audience. This page tells you exactly where to start.
          </p>
          <div className="action-row">
            <DDCTA label="Take the Quiz →" href="/quiz" variant="primary" wide />
          </div>
          <p className="dd-hero__note">
            Two minutes. Scored on this device. No email required.
          </p>
        </div>
      </section>

      {/* ── WHAT THIS IS ─────────────────────────────── */}
      <section className="dd-banner-ink">
        <div className="dd-container">
          <div className="dd-banner-ink__inner">
            <span className="dd-banner-ink__eyebrow">What DigitallyDefined Is</span>
            <strong className="dd-banner-ink__claim">
              A system for building digital real estate — quietly, intentionally, on your terms.
            </strong>
          </div>
        </div>
      </section>

      {/* ── THE 4 STEPS ──────────────────────────────── */}
      <section className="dd-section dd-section--rule">
        <div className="dd-container">
          <div className="dd-section__head">
            <DDLabel tone="orange">The Path</DDLabel>
            <h2>Four steps. No shortcuts skipped.</h2>
            <p className="dd-section__intro">
              Every step builds on the last. The quiz is free. The tools unlock after. The plans
              support you when you are ready to go deeper.
            </p>
          </div>

          <div className="dd-steps-list">
            {STEPS.map((item) => (
              <div key={item.step} className="dd-step-row">
                <div className="dd-step-row__number">
                  <span>{item.step}</span>
                </div>
                <div className="dd-step-row__content">
                  <DDLabel tone="orange">{item.label}</DDLabel>
                  <h3 className="dd-step-row__title">{item.title}</h3>
                  <p className="dd-step-row__text">{item.text}</p>
                  <div className="dd-step-row__cta">
                    <DDCTA label={item.cta.label} href={item.cta.href} variant={item.cta.variant} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────── */}
      <section className="dd-section dd-section--alt dd-section--rule">
        <div className="dd-container dd-container--narrow">
          <div className="dd-section__head">
            <DDLabel tone="orange">Common Questions</DDLabel>
            <h2>You probably have these questions.</h2>
          </div>

          <div className="dd-faq-list">
            {FAQS.map((item) => (
              <div key={item.q} className="dd-faq-item">
                <h3 className="dd-faq-item__q">{item.q}</h3>
                <p className="dd-faq-item__a">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FRAMEWORK LINK ───────────────────────────── */}
      <section className="dd-section dd-section--rule">
        <div className="dd-container dd-container--narrow">
          <div className="dd-section__head">
            <DDLabel tone="orange">Go Deeper</DDLabel>
            <h2>Want the full picture first?</h2>
            <p className="dd-section__intro">
              Read the Faceless Digital Real Estate Framework — a plain-language explanation of
              what digital real estate is, why it works for Gen X women, and how the retirement
              gap connects to it.
            </p>
          </div>
          <div className="action-row">
            <DDCTA label="Read the Framework →" href="/framework" variant="outline" />
            <DDCTA label="Take the Quiz →" href="/quiz" variant="primary" />
          </div>
        </div>
      </section>
    </>
  );
}
