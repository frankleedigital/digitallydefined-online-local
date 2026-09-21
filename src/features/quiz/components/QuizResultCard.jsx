// src/features/quiz/components/QuizResultCard.jsx
// The personalized result view. Shared by /quiz (immediately after the last
// answer) and /results (the standalone page), so both always show identical
// copy for identical answers.

import React from 'react';

function Meter({ value, label }) {
  const percent = Math.round((Number(value) || 0) * 100);
  return (
    <div className="result-meter">
      <div className="result-meter__track" role="img" aria-label={`Match strength ${percent} percent`}>
        <span className="result-meter__fill" style={{ width: `${percent}%` }} />
      </div>
      <div className="result-meter__copy">
        <span>{label}</span>
        <span>{percent}% of your answers point this way</span>
      </div>
    </div>
  );
}

function Panel({ eyebrow, title, eyebrowTone = 'orange', children }) {
  return (
    <article className="story-card">
      <span className={`label label--${eyebrowTone}`}>{eyebrow}</span>
      <h3>{title}</h3>
      {children}
    </article>
  );
}

function List({ items }) {
  return (
    <ul className="dd-list">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

export default function QuizResultCard({
  result,
  eyebrow = 'Your result',
  showMeter = true,
  showEvidence = true,
  actions = null,
  children = null,
}) {
  if (!result) return null;

  const name = result.firstName || '';
  const sequence = result.buildSequence || [];
  const evidence = result.evidence || [];

  return (
    <div className="result-shell">
      <header className="result-hero">
        <span className="label label--orange">{eyebrow}</span>
        <h1>
          {name ? `${name}, your digital superpower is ` : 'Your digital superpower is '}
          <span className="result-hero__name">{result.superpowerName}</span>.
        </h1>
        <p className="result-hero__tagline">
          {result.personaTitle} — {result.tagline}
        </p>
        <p className="result-hero__summary">{result.summary || result.description}</p>
        {showMeter && (
          <Meter value={result.confidence} label={result.confidenceLabel || 'Signal strength'} />
        )}
      </header>

      <div className="story-grid story-grid--three">
        <Panel eyebrow="Strengths" title="What you already do well">
          <List items={result.strengths || []} />
        </Panel>
        <Panel eyebrow="Blind spots" title="Where this profile usually stalls" eyebrowTone="blue">
          <List items={result.blindSpots || []} />
        </Panel>
        <Panel eyebrow="Best-fit niches" title="Where your superpower meets demand">
          <List items={result.niches || []} />
        </Panel>
      </div>

      <div className="result-sequence">
        <span className="label label--blue">Your personalized build sequence</span>
        <h2>From superpower to an asset you own.</h2>
        <p className="result-sequence__intro">
          Built from your answers, in the order that avoids wasted work.
          {result.timeframe ? ` Typical window: ${result.timeframe}.` : ''}
        </p>
        {sequence.map((step) => (
          <div className="result-step" key={`${step.step}-${step.title}`}>
            <span className="result-step__index">{String(step.step).padStart(2, '0')}</span>
            <div className="result-step__body">
              <h3>{step.title}</h3>
              {step.timeframe ? <p className="result-step__meta">Target: {step.timeframe}</p> : null}
              {step.metric ? <p className="result-step__meta">Done when: {step.metric}</p> : null}
            </div>
          </div>
        ))}
      </div>

      <div className="result-tools">
        <h3>Tools that fit this sequence</h3>
        <List items={result.tools || []} />
      </div>

      <div className="truth-bar">
        <strong>Your next action</strong>
        <span>
          {result.nextAction}
          {result.nextActionReason ? ` ${result.nextActionReason}` : ''}
        </span>
      </div>

      {children}

      {showEvidence && evidence.length > 0 && (
        <details className="result-evidence">
          <summary>How this result was calculated</summary>
          <p>
            Seven answers, five superpowers, fixed weights. Questions about your income model and
            your definition of success count double. No AI, no guesswork, no profile stored on a
            server for this step.
          </p>
          <ul className="dd-list">
            {evidence.map((item) => (
              <li key={item.questionKey}>
                <strong>{item.question}</strong> — {item.answer} ({item.personaTitle})
              </li>
            ))}
          </ul>
        </details>
      )}

      {actions ? <div className="result-actions">{actions}</div> : null}
    </div>
  );
}
