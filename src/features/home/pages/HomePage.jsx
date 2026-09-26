import React, { useState } from 'react';
import DDSection from '../../../components/ui/DDSection';
import DDCTA from '../../../components/ui/DDCTA';
import DDLabel from '../../../components/ui/DDLabel';
import DDCard from '../../../components/ui/DDCard';
import DDInput from '../../../components/ui/DDInput';
import { useSiteContent } from '../../../hooks/useSiteContent';
import { callSupabaseEdge } from '../../../api/supabase.js';

const TRUST_BADGES = [
  {
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="0" ry="0" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    ),
    label: 'Privacy-first by design',
  },
  {
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
    label: 'No camera required',
  },
  {
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12" />
      </svg>
    ),
    label: 'Free to start',
  },
];

const HOW_IT_WORKS = [
  { step: '01', label: 'Quiz', text: 'Seven questions score your strongest digital superpower — content, systems, curation, teaching, or community.' },
  { step: '02', label: 'Roadmap', text: 'Get a personalized build sequence in the order that avoids wasted effort. No guessing what to do next.' },
  { step: '03', label: 'Tools', text: 'Use the niche scorecard, product designer, and content tools to validate before you build.' },
  { step: '04', label: 'Automate', text: 'Build digital assets that work while you sleep. The AI Mentor guides each step.' },
];

const VALUE_PROPS = [
  {
    label: 'Faceless by Design',
    title: 'Build without becoming the brand.',
    text: 'No face. No camera. No follower count required. DigitallyDefined is built specifically for women who want real financial results without public exposure.',
  },
  {
    label: 'Gen X Ready',
    title: 'Built for where you actually are.',
    text: 'Not 22. Not starting from zero experience. You have real skills, real judgment, and real constraints. This system is designed for that.',
  },
  {
    label: 'Close the Gap',
    title: 'The retirement gap is real. So is the solution.',
    text: 'Gen X women face a documented retirement shortfall. Digital real estate — faceless income assets — is one of the most accessible paths to closing it.',
  },
];

export default function HomePage() {
  const content = useSiteContent();
  const [optin, setOptin] = useState({ email: '', status: 'idle' });

  const handleOptin = async (event) => {
    event.preventDefault();
    if (!optin.email.trim()) return;
    setOptin((s) => ({ ...s, status: 'submitting' }));
    try {
      await callSupabaseEdge('subscribe', {
        name: '',
        email: optin.email.trim(),
        source: 'homepage-cta',
        tags: ['website-signup'],
      });
      setOptin({ email: '', status: 'success' });
    } catch {
      setOptin((s) => ({ ...s, status: 'error' }));
    }
  };

  return (
    <>
      {/* ── HERO ─────────────────────────────────────── */}
      <section className="dd-hero">
        <div className="dd-container dd-container--narrow">
          <DDLabel tone="orange">
            Faceless Digital Real Estate for Gen X Women
          </DDLabel>
          <h1 className="dd-hero__headline">
            Build digital assets that work quietly.
          </h1>
          <p className="dd-hero__lead">
            {content['home.heroTagline'] ||
              'No camera. No followers. No overnight hustle. A personalized roadmap to faceless digital income — built around your actual strengths.'}
          </p>
          <div className="action-row">
            <DDCTA label="Take the Free Quiz →" href="/quiz" variant="primary" wide />
            <DDCTA label="Start Here" href="/start-here" variant="outline" />
          </div>
          <p className="dd-hero__note">
            Two minutes. Scored on this device. No email required to see your result.
          </p>
          <div className="dd-trust-row">
            {TRUST_BADGES.map((badge) => (
              <div key={badge.label} className="dd-trust-badge">
                {badge.icon}
                <span>{badge.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── QUIET ADVANTAGE BANNER ──────────────────── */}
      <section className="dd-banner-ink">
        <div className="dd-container">
          <div className="dd-banner-ink__inner">
            <span className="dd-banner-ink__eyebrow">The Quiet Advantage</span>
            <strong className="dd-banner-ink__claim">
              You do not need to be visible to be valuable.
            </strong>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <line x1="7" y1="17" x2="17" y2="7" />
              <polyline points="7 7 17 7 17 17" />
            </svg>
          </div>
        </div>
      </section>

      {/* ── VALUE PROPS ─────────────────────────────── */}
      <section className="dd-section dd-section--rule">
        <div className="dd-container">
          <div className="dd-section__head">
            <DDLabel tone="orange">Why DigitallyDefined</DDLabel>
            <h2>A system built around your real life.</h2>
          </div>
          <div className="dd-grid dd-grid--three">
            {VALUE_PROPS.map((vp) => (
              <DDCard key={vp.label}>
                <div className="dd-card__inner">
                  <DDLabel tone="orange">{vp.label}</DDLabel>
                  <h3 className="dd-card__title">{vp.title}</h3>
                  <p className="dd-card__text">{vp.text}</p>
                </div>
              </DDCard>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ────────────────────────────── */}
      <section className="dd-section dd-section--alt dd-section--rule">
        <div className="dd-container">
          <div className="dd-section__head">
            <DDLabel tone="orange">How It Works</DDLabel>
            <h2>Quiz → Roadmap → Dashboard → Tools</h2>
            <p className="dd-section__intro">
              One short quiz. One personalized roadmap. Tools unlock when you finish.
            </p>
          </div>
          <div className="dd-grid dd-grid--four">
            {HOW_IT_WORKS.map((item) => (
              <DDCard key={item.step}>
                <div className="dd-card__inner">
                  <span className="dd-step-number">{item.step}</span>
                  <DDLabel tone="orange">{item.label}</DDLabel>
                  <p className="dd-card__text">{item.text}</p>
                </div>
              </DDCard>
            ))}
          </div>
          <div className="action-row">
            <DDCTA label="Take the Quiz →" href="/quiz" variant="primary" />
            <DDCTA label="See the Roadmaps" href="/roadmap/builder" variant="outline" />
          </div>
        </div>
      </section>

      {/* ── FRAMEWORK / PROOF ───────────────────────── */}
      <section className="dd-section dd-section--rule">
        <div className="dd-container dd-container--narrow">
          <div className="dd-section__head">
            <DDLabel tone="orange">The Framework</DDLabel>
            <h2>Faceless digital real estate — explained.</h2>
            <p className="dd-section__intro">
              Digital real estate means owning income-producing assets online — content, tools, templates,
              communities — without a personal brand attached to a face or name. You build it once.
              It works while you sleep.
            </p>
          </div>
          <div className="dd-insight-row">
            <div className="dd-insight-stat">
              <span className="dd-insight-stat__number">5</span>
              <span className="dd-insight-stat__label">Superpower profiles</span>
            </div>
            <div className="dd-insight-stat">
              <span className="dd-insight-stat__number">4</span>
              <span className="dd-insight-stat__label">Build phases per roadmap</span>
            </div>
            <div className="dd-insight-stat">
              <span className="dd-insight-stat__number">0</span>
              <span className="dd-insight-stat__label">Cameras required</span>
            </div>
          </div>
          <div className="action-row">
            <DDCTA label="Read the Framework →" href="/framework" variant="outline" />
          </div>
        </div>
      </section>

      {/* ── EMAIL OPT-IN / CTA ──────────────────────── */}
      <section className="dd-section dd-section--alt dd-section--rule">
        <div className="dd-container dd-container--narrow">
          <div className="dd-section__head">
            <DDLabel tone="orange">Get Started Free</DDLabel>
            <h2>Your roadmap is one quiz away.</h2>
            <p className="dd-section__intro">
              Take the quiz and get your personalized build sequence — or drop your email and get the
              free starter worksheet sent to you.
            </p>
          </div>
          <div className="dd-grid dd-grid--two">
            <DDCard tone="ink">
              <div className="dd-card__inner">
                <DDLabel tone="orange">Recommended</DDLabel>
                <h3 className="dd-card__title">Take the Digital Superpower Quiz</h3>
                <p className="dd-card__text">
                  Seven questions. Scored on this device. Your personalized roadmap is ready the moment
                  you finish — no email required.
                </p>
                <DDCTA label="Start the Quiz →" href="/quiz" variant="primary" wide />
              </div>
            </DDCard>
            <DDCard>
              <div className="dd-card__inner">
                <DDLabel tone="orange">Free Starter Kit</DDLabel>
                <h3 className="dd-card__title">Get the worksheet first.</h3>
                <p className="dd-card__text">
                  One concise worksheet to turn an idea into a first digital property.
                </p>
                {optin.status === 'success' ? (
                  <p className="dd-notice dd-notice--sent">
                    You're in. Check your inbox for your first step.
                  </p>
                ) : (
                  <form onSubmit={handleOptin} className="dd-optin-form">
                    <DDInput
                      id="starter-email"
                      type="email"
                      required
                      label="Email address"
                      value={optin.email}
                      onChange={(e) => setOptin({ email: e.target.value, status: 'idle' })}
                      placeholder="you@example.com"
                    />
                    <DDCTA
                      label={optin.status === 'submitting' ? 'Sending...' : 'Send it →'}
                      type="submit"
                      disabled={optin.status === 'submitting'}
                      wide
                    />
                  </form>
                )}
                {optin.status === 'error' && (
                  <p className="dd-notice dd-notice--failed">That did not work. Please try again.</p>
                )}
              </div>
            </DDCard>
          </div>
        </div>
      </section>

      {/* ── INTERLINKING ────────────────────────────── */}
      <section className="dd-section dd-section--rule">
        <div className="dd-container">
          <div className="dd-section__head">
            <DDLabel tone="orange">Explore</DDLabel>
            <h2>Everything DigitallyDefined offers.</h2>
          </div>
          <div className="dd-grid dd-grid--three">
            <DDCard>
              <div className="dd-card__inner">
                <h3 className="dd-card__title">Start Here</h3>
                <p className="dd-card__text">New? This is your orientation page — where to start, what to do first, and how the system works.</p>
                <DDCTA label="Start Here →" href="/start-here" variant="outline" />
              </div>
            </DDCard>
            <DDCard>
              <div className="dd-card__inner">
                <h3 className="dd-card__title">Builder Plan</h3>
                <p className="dd-card__text">The entry-level plan for women building their first faceless digital property from scratch.</p>
                <DDCTA label="See Builder Plan →" href="/builder" variant="outline" />
              </div>
            </DDCard>
            <DDCard>
              <div className="dd-card__inner">
                <h3 className="dd-card__title">Empire Plan</h3>
                <p className="dd-card__text">For women ready to scale — multiple income streams, automation, and a full digital real estate portfolio.</p>
                <DDCTA label="See Empire Plan →" href="/empire" variant="outline" />
              </div>
            </DDCard>
          </div>
        </div>
      </section>
    </>
  );
}
