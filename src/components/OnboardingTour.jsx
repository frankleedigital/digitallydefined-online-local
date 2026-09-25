import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { brutalBorder, theme } from '../config/theme';

const STORAGE_KEY = 'dd-onboarding-v1';

const STEPS = [
  {
    id: 'welcome',
    route: '/',
    title: 'Welcome to DigitallyDefined',
    body: "You're in the right place. This is a privacy-first platform built for Gen X women who want to build faceless digital assets — no camera, no overnight promises, no performance.",
    cta: 'Show me around',
    skip: true,
  },
  {
    id: 'home',
    route: '/',
    title: 'Start with your path',
    body: "This page lays out the full sequence — from understanding your retirement gap to building your first digital asset. Read through it when you're ready, or jump straight to the first tool.",
    anchor: '#build-path',
    cta: 'Next: Calculate my gap',
    skip: true,
  },
  {
    id: 'gap',
    route: '/gap',
    title: 'Step 1 — Face the number',
    body: 'The Retirement Gap Calculator turns a vague fear into a planning number. Enter your current savings, retirement goals, and expected income. The result is a scenario, not a verdict.',
    cta: 'Next: Find my superpower',
    skip: true,
  },
  {
    id: 'quiz',
    route: '/quiz',
    title: 'Step 2 — Find your superpower',
    body: 'Seven practical questions. Your result is a personalized asset roadmap matched to how you naturally think and work — not a generic label.',
    cta: 'Next: Score a niche idea',
    skip: true,
  },
  {
    id: 'scorecard',
    route: '/tools/scorecard',
    title: 'Step 3 — Score a niche',
    body: 'Rate demand, competition, monetization, durability, ease, and privacy fit for any idea. You get an instant profitability score before you invest a single hour.',
    cta: 'Next: Model my freedom number',
    skip: true,
  },
  {
    id: 'freedom',
    route: '/freedom',
    title: 'Step 4 — Model your freedom number',
    body: 'Set a monthly income target. Mix asset types and yields until your portfolio covers your gap. See what a realistic plan looks like before you commit to anything.',
    cta: 'Next: Explore all tools',
    skip: true,
  },
  {
    id: 'tools',
    route: '/tools',
    title: 'Step 5 — All your tools',
    body: "This is your toolkit. Quiz, calculators, scorecard, and builders — all in one place. Come back here any time you need to validate an idea or model a decision.",
    cta: "Got it — I'm ready to build",
    skip: false,
    last: true,
  },
];

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function saveState(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {}
}

export default function OnboardingTour() {
  const navigate = useNavigate();
  const location = useLocation();
  const [visible, setVisible] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);
  const [dismissed, setDismissed] = useState(false);

  // On mount: check localStorage
  useEffect(() => {
    const state = loadState();
    if (!state) {
      // First visit — start tour
      setStepIndex(0);
      setVisible(true);
      saveState({ started: true, stepIndex: 0, completed: false });
    } else if (state.completed || state.dismissed) {
      // Already completed or dismissed — never show again
      setDismissed(true);
    } else if (state.started && typeof state.stepIndex === 'number') {
      // Resume from where she left off
      setStepIndex(state.stepIndex);
      setVisible(true);
    }
  }, []);

  const step = STEPS[stepIndex];

  const advance = useCallback(() => {
    const next = stepIndex + 1;
    if (next >= STEPS.length) {
      // Completed
      setVisible(false);
      setDismissed(true);
      saveState({ started: true, stepIndex: STEPS.length - 1, completed: true });
      return;
    }
    const nextStep = STEPS[next];
    setStepIndex(next);
    saveState({ started: true, stepIndex: next, completed: false });
    // Navigate if we need to change route
    if (nextStep.route !== location.pathname) {
      navigate(nextStep.route);
    }
  }, [stepIndex, location.pathname, navigate]);

  const dismiss = useCallback(() => {
    setVisible(false);
    setDismissed(true);
    saveState({ started: true, stepIndex, completed: false, dismissed: true });
  }, [stepIndex]);

  if (dismissed || !visible || !step) return null;

  const progress = ((stepIndex) / (STEPS.length - 1)) * 100;

  return (
    <>
      {/* Backdrop */}
      <div
        aria-hidden="true"
        style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.45)',
          zIndex: 9000,
        }}
        onClick={dismiss}
      />

      {/* Modal card */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="onboarding-title"
        style={{
          position: 'fixed',
          bottom: '2rem',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 9001,
          width: 'min(520px, calc(100vw - 2rem))',
          background: '#FFFFFF',
          border: '1px solid #111111',
          boxShadow: '4px 4px 0px rgba(0,0,0,0.18)',
          fontFamily: "'DM Sans', system-ui, sans-serif",
        }}
      >
        {/* Progress bar */}
        <div style={{ height: 3, background: '#e5e5e5', width: '100%' }}>
          <div
            style={{
              height: '100%',
              width: `${progress}%`,
              background: '#F18B25',
              transition: 'width 0.3s ease',
            }}
          />
        </div>

        {/* Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0.75rem 1.25rem',
            borderBottom: '1px solid #111',
          }}
        >
          <span
            style={{
              fontFamily: "'Inter', system-ui, sans-serif",
              fontSize: '0.62rem',
              fontWeight: 900,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: '#F18B25',
            }}
          >
            {stepIndex === 0 ? 'Welcome' : `Step ${stepIndex} of ${STEPS.length - 1}`}
          </span>

          <button
            type="button"
            onClick={dismiss}
            aria-label="Skip tour"
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontFamily: "'DM Sans', system-ui, sans-serif",
              fontSize: '0.75rem',
              color: '#5F5F5F',
              fontWeight: 700,
              padding: '0.25rem 0.5rem',
            }}
          >
            Skip tour ×
          </button>
        </div>

        {/* Body */}
        <div style={{ padding: '1.5rem 1.25rem 1.25rem' }}>
          <h2
            id="onboarding-title"
            style={{
              fontFamily: "'Inter', system-ui, sans-serif",
              fontWeight: 900,
              fontSize: 'clamp(1.1rem, 2.5vw, 1.35rem)',
              letterSpacing: '-0.02em',
              color: '#111111',
              margin: '0 0 0.75rem',
              lineHeight: 1.2,
            }}
          >
            {step.title}
          </h2>

          <p
            style={{
              fontSize: '0.95rem',
              lineHeight: 1.65,
              color: '#5F5F5F',
              margin: '0 0 1.5rem',
            }}
          >
            {step.body}
          </p>

          {/* Step dots */}
          <div
            style={{
              display: 'flex',
              gap: '0.4rem',
              alignItems: 'center',
              marginBottom: '1.25rem',
            }}
          >
            {STEPS.map((s, i) => (
              <div
                key={s.id}
                style={{
                  width: i === stepIndex ? 20 : 8,
                  height: 8,
                  background: i === stepIndex ? '#F18B25' : i < stepIndex ? '#111111' : '#e5e5e5',
                  border: '1px solid #111111',
                  transition: 'all 0.2s ease',
                  flexShrink: 0,
                }}
              />
            ))}
          </div>

          {/* CTA row */}
          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', flexWrap: 'wrap' }}>
            <button
              type="button"
              onClick={advance}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '12px 20px',
                background: '#F18B25',
                color: '#111111',
                border: '1px solid #111111',
                borderRadius: 0,
                fontFamily: "'DM Sans', system-ui, sans-serif",
                fontWeight: 700,
                fontSize: '0.85rem',
                cursor: 'pointer',
                letterSpacing: '-0.01em',
                flexShrink: 0,
              }}
            >
              {step.cta}
            </button>

            {step.skip && !step.last && (
              <button
                type="button"
                onClick={dismiss}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontFamily: "'DM Sans', system-ui, sans-serif",
                  fontSize: '0.82rem',
                  color: '#5F5F5F',
                  fontWeight: 600,
                  padding: 0,
                  textDecoration: 'underline',
                  textUnderlineOffset: 3,
                }}
              >
                Explore on my own
              </button>
            )}
          </div>

          {/* Privacy micro */}
          <p
            style={{
              margin: '1rem 0 0',
              fontSize: '0.68rem',
              color: '#9a9a9a',
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              fontFamily: "'Inter', system-ui, sans-serif",
              fontWeight: 600,
            }}
          >
            No account needed · Progress saved locally · Skip anytime
          </p>
        </div>
      </div>
    </>
  );
}
