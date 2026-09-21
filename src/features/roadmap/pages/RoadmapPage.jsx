// src/features/roadmap/pages/RoadmapPage.jsx
// The personalized roadmap, reachable three ways:
//   /roadmap            → the result saved on this device
//   /roadmap/:type      → a shareable link for one of the five superpowers
//   /quiz/results       → routed here for backwards compatibility
//
// Content comes from the same deterministic result the quiz produced, so the
// roadmap and the result page can never disagree. No AI is involved.

import React, { useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  loadQuizResult,
  buildPersonaPreview,
  resolvePersonaParam,
} from '../../quiz/lib/quizLogic.js';
import { PERSONA_KEYS } from '../../quiz/lib/scoring.js';
import { getPersona } from '../../quiz/lib/personas.js';

function PersonaPicker({ title, message }) {
  return (
    <section className="page-hero">
      <div className="dd-container">
        <span className="label label--orange">Roadmap</span>
        <h1>{title}</h1>
        <p>{message}</p>
        <div className="result-explore__grid">
          {PERSONA_KEYS.map((key) => {
            const persona = getPersona(key);
            return (
              <Link key={key} className="result-explore__card" to={`/roadmap/${key}`}>
                <span className="label label--orange">{persona.title}</span>
                <strong>{persona.superpowerName || persona.title}</strong>
                <span className="result-explore__tagline">{persona.tagline}</span>
              </Link>
            );
          })}
        </div>
        <div className="action-row">
          <Link className="btn btn--primary" to="/quiz">Take the quiz →</Link>
          <Link className="btn btn--outline" to="/">Back to home</Link>
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
  const sequence = result.buildSequence || [];
  const isPersonalized = result.source !== 'persona-template';
  const generated = result.generatedAt ? new Date(result.generatedAt) : null;
  const generatedLabel = generated && !Number.isNaN(generated.getTime())
    ? generated.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })
    : '';

  const heading = result.firstName
    ? `${result.firstName}, here is your ${persona.title} roadmap.`
    : `Your ${persona.title} roadmap.`;

  const meta = isPersonalized
    ? `Scored from ${result.answered} of ${result.total || 7} answers${generatedLabel ? ` on ${generatedLabel}` : ''}. Saved in this browser only.`
    : 'Overview mode. Take the quiz to personalize this roadmap with your own answers.';

  return (
    <>
      <section className="page-hero page-hero--ink">
        <div className="dd-container">
          <span className="label label--blue">{persona.title} / {result.superpowerName}</span>
          <h1>{heading}</h1>
          <p>{result.overview}</p>
          <div className="action-row">
            {isPersonalized ? (
              <Link className="btn btn--primary" to="/results">See my result page →</Link>
            ) : (
              <Link className="btn btn--primary" to="/quiz">Take the quiz to personalize →</Link>
            )}
            <Link className="btn btn--outline" to={`/roadmap/${otherPersona(result.superpower)}`}>
              Compare another superpower
            </Link>
          </div>
          <p className="hero-note hero-note--ink">{meta}</p>
        </div>
      </section>

      <section className="story-section story-section--white">
        <div className="dd-container">
          <div className="roadmap-grid">
            <article className="roadmap-panel">
              <span className="label label--orange">Strengths</span>
              <h3>What you already do well</h3>
              <ul className="dd-list">
                {(result.strengths || []).map((item) => <li key={item}>{item}</li>)}
              </ul>
            </article>

            <article className="roadmap-panel">
              <span className="label label--blue">Blind spots</span>
              <h3>Where this profile usually stalls</h3>
              <ul className="dd-list">
                {(result.blindSpots || []).map((item) => <li key={item}>{item}</li>)}
              </ul>
            </article>

            <article className="roadmap-panel">
              <span className="label label--orange">Best-fit niches</span>
              <h3>Where your superpower meets demand</h3>
              <ul className="dd-list">
                {(result.niches || []).map((item) => <li key={item}>{item}</li>)}
              </ul>
            </article>

            <article className="roadmap-panel">
              <span className="label label--blue">Tools to use</span>
              <h3>In the order you need them</h3>
              <ul className="dd-list">
                {(result.tools || []).map((item) => <li key={item}>{item}</li>)}
              </ul>
            </article>
          </div>

          <div className="roadmap-plan">
            <span className="label label--orange">Your personalized build sequence</span>
            <h2>Phase by phase, without wasted effort.</h2>
            <p>
              Each phase produces one thing you can point at.
              {result.timeframe ? ` Typical window for this profile: ${result.timeframe}.` : ''}
            </p>

            {sequence.map((step) => (
              <div className="roadmap-step" key={`${step.step}-${step.title}`}>
                <span>{String(step.step).padStart(2, '0')}</span>
                <div>
                  <h3>{step.title}</h3>
                  {step.timeframe ? <p className="roadmap-step__meta">Target: {step.timeframe}</p> : null}
                  {step.metric ? <p className="roadmap-step__meta">Done when: {step.metric}</p> : null}
                </div>
              </div>
            ))}
          </div>

          <div className="truth-bar">
            <strong>Start here</strong>
            <span>
              {result.nextAction}
              {result.nextActionReason ? ` ${result.nextActionReason}` : ''}
            </span>
          </div>

          <div className="roadmap-next">
            <div>
              <span className="label label--blue">Step 04 / Build</span>
              <h2>Keep the roadmap in view while you build.</h2>
              <p>
                Your dashboard unlocks after the quiz and holds the tools this sequence points to.
                Everything stays private to this browser.
              </p>
            </div>
            <div className="action-row">
              <Link className="btn btn--primary" to="/dashboard">Open my dashboard →</Link>
              <Link className="btn btn--outline" to="/tools">See the tools</Link>
              <Link className="btn btn--outline" to="/quiz">Retake the quiz</Link>
            </div>
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
