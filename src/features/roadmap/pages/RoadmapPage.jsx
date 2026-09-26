// RoadmapPage.jsx - Brand Compliant Version
import React, { useMemo } from "react";
import { useParams } from "react-router-dom";
import {
  loadQuizResult,
  buildPersonaPreview,
  resolvePersonaParam,
} from "../../quiz/lib/quizLogic.js";
import { PERSONA_KEYS } from "../../quiz/lib/scoring.js";
import { getPersona } from "../../quiz/lib/personas.js";
import DDSection from "../../../components/ui/DDSection";
import DDCard from "../../../components/ui/DDCard";
import DDLabel from "../../../components/ui/DDLabel";
import DDCTA from "../../../components/ui/DDCTA";

function PersonaPicker({ title, message }) {
  return (
    <section className="dd-hero">
      <div className="dd-container dd-container--narrow">
        <DDLabel tone="orange">Roadmap</DDLabel>
        <h1 className="dd-hero__headline">{title}</h1>
        <p className="dd-hero__lead">{message}</p>
        <div className="dd-grid dd-grid--three" style={{ marginTop: '2rem' }}>
          {PERSONA_KEYS.map((key) => {
            const persona = getPersona(key);
            return (
              <DDCTA
                key={key}
                label={persona.title}
                href={`/roadmap/${key}`}
                variant="outline"
              />
            );
          })}
        </div>
        <div className="action-row">
          <DDCTA label="Take the quiz" href="/quiz" variant="primary" />
          <DDCTA label="Back to home" href="/" variant="outline" />
        </div>
      </div>
    </section>
  );
}

export default function RoadmapPage() {
  const { type } = useParams();
  const stored = useMemo(() => loadQuizResult(), []);
  const requested = resolvePersonaParam(type);

  const result = useMemo(() => {
    if (requested) {
      if (stored && stored.superpower === requested) return stored;
      return buildPersonaPreview(requested);
    }
    return stored || null;
  }, [requested, stored]);

  // A bad :type is answered honestly instead of silently redirecting.
  if (type && !requested) {
    return (
      <PersonaPicker
        title="That is not one of the five superpowers."
        message="The quiz scores five profiles: Builder, Creator, Educator, Strategist and Connector. Pick one below, or take the quiz to find yours."
      />
    );
  }

  if (!result) {
    return (
      <PersonaPicker
        title="Your roadmap starts with the quiz."
        message="Answer seven questions and your roadmap is built on this device in about two minutes. No email required to see it."
      />
    );
  }

  const persona = getPersona(result.superpower);
  const isPersonalized = result.source !== 'persona-template';
  const sequence = result.sequence || result.buildSequence || [];
  const heading = isPersonalized
    ? `Your ${persona?.title || result.superpower} roadmap.`
    : `The ${persona?.title || result.superpower} roadmap.`;
  const meta = isPersonalized
    ? 'Built from your quiz answers. Stays on this device.'
    : 'Preview only. Take the quiz to personalize this roadmap.';
  const nextPersona = otherPersona(result.superpower);

  return (
    <>
      {/* ── HERO ─────────────────────────────────────── */}
      <section className="dd-hero">
        <div className="dd-container dd-container--narrow">
          <DDLabel tone="blue">{persona?.title || result.superpower} / {persona?.superpowerName || result.superpowerName || 'Roadmap'}</DDLabel>
          <h1 className="dd-hero__headline">{heading}</h1>
          <p className="dd-hero__lead">{result.overview}</p>
          <div className="action-row">
            {isPersonalized ? (
              <DDCTA label="See my result page" href="/results" variant="primary" />
            ) : (
              <DDCTA label="Take the quiz to personalize" href="/quiz" variant="primary" />
            )}
            <DDCTA
              label="Compare another superpower"
              href={`/roadmap/${nextPersona}`}
              variant="outline"
            />
          </div>
          <p className="dd-hero__note">{meta}</p>
        </div>
      </section>

      {/* ── STRENGTHS / BLIND SPOTS / NICHES / TOOLS ─── */}
      <section className="dd-section dd-section--alt dd-section--rule">
        <div className="dd-container">
          <div className="dd-grid dd-grid--two">
            <DDCard>
              <div className="dd-card__inner">
                <DDLabel tone="orange">Strengths</DDLabel>
                <h3 className="dd-card__title">What you already do well</h3>
                <ul className="dd-list">
                  {(result.strengths || []).map((item) => <li key={item}>{item}</li>)}
                </ul>
              </div>
            </DDCard>

            <DDCard>
              <div className="dd-card__inner">
                <DDLabel tone="blue">Blind spots</DDLabel>
                <h3 className="dd-card__title">Where this profile usually stalls</h3>
                <ul className="dd-list">
                  {(result.blindSpots || []).map((item) => <li key={item}>{item}</li>)}
                </ul>
              </div>
            </DDCard>

            <DDCard>
              <div className="dd-card__inner">
                <DDLabel tone="orange">Best-fit niches</DDLabel>
                <h3 className="dd-card__title">Where your superpower meets demand</h3>
                <ul className="dd-list">
                  {(result.niches || []).map((item) => <li key={item}>{item}</li>)}
                </ul>
              </div>
            </DDCard>

            <DDCard>
              <div className="dd-card__inner">
                <DDLabel tone="blue">Tools to use</DDLabel>
                <h3 className="dd-card__title">In the order you need them</h3>
                <ul className="dd-list">
                  {(result.tools || []).map((item) => <li key={item}>{item}</li>)}
                </ul>
              </div>
            </DDCard>
          </div>
        </div>
      </section>

      {/* ── BUILD SEQUENCE ───────────────────────────── */}
      {sequence.length > 0 && (
        <section className="dd-section dd-section--rule">
          <div className="dd-container dd-container--narrow">
            <div className="dd-section__head">
              <DDLabel tone="orange">Your personalized build sequence</DDLabel>
              <h2>Phase by phase, without wasted effort.</h2>
              <p className="dd-section__intro">
                Each phase produces one thing you can point at.
                {result.timeframe ? ` Typical window for this profile: ${result.timeframe}.` : ''}
              </p>
            </div>

            <div className="dd-steps-list">
              {sequence.map((step) => (
                <div key={`step-${step.step}`} className="dd-step-row">
                  <div className="dd-step-row__number">
                    <span>{String(step.step).padStart(2, '0')}</span>
                  </div>
                  <div className="dd-step-row__content">
                    <h3 className="dd-step-row__title">{step.title}</h3>
                    {step.timeframe && (
                      <p className="dd-step-row__text">Target: {step.timeframe}</p>
                    )}
                    {step.metric && (
                      <p className="dd-step-row__text">Done when: {step.metric}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── NEXT ACTION ──────────────────────────────── */}
      {result.nextAction && (
        <section className="dd-section dd-section--alt dd-section--rule">
          <div className="dd-container dd-container--narrow">
            <div className="truth-bar">
              <strong>Start here</strong>
              <span>
                {result.nextAction}
                {result.nextActionReason ? ` — ${result.nextActionReason}` : ''}
              </span>
            </div>
          </div>
        </section>
      )}

      {/* ── CTA ──────────────────────────────────────── */}
      <section className="dd-section dd-section--rule">
        <div className="dd-container dd-container--narrow">
          <div className="dd-section__head">
            <DDLabel tone="blue">Step 04 / Build</DDLabel>
            <h2>Keep the roadmap in view while you build.</h2>
            <p className="dd-section__intro">
              Your roadmap stays on this device and points to the tools in your private workspace.
              Everything stays private to this browser.
            </p>
          </div>
          <div className="action-row">
            <DDCTA label="See the tools" href="/tools" variant="primary" />
            <DDCTA label="Retake the quiz" href="/quiz" variant="outline" />
          </div>
        </div>
      </section>
    </>
  );
}

/** The next persona in canonical order — used for the "compare" link. */
function otherPersona(current) {
  const index = PERSONA_KEYS.indexOf(current);
  return PERSONA_KEYS[(index + 1) % PERSONA_KEYS.length];
}