import React from 'react';
import { RESULT_TYPES } from './ResultTypes';

export default function QuizResults() {
  return (
    <>
      <section className="hero" style={{ paddingBlock: '2.5rem' }}>
        <div className="container container--narrow">
          <p className="section__eyebrow">Quick Reference</p>
          <h1>Quiz Result Types</h1>
          <p className="hero__tagline" style={{ fontSize: '1.05rem', maxWidth: '560px', marginInline: 'auto' }}>
            All seven profile types with their strengths, tools, and monetization paths.
          </p>
        </div>
      </section>
      <section className="section" style={{ background: '#fff' }}>
        <div className="container grid-3">
          {Object.values(RESULT_TYPES).map(rt => (
            <div className="card" key={rt.key} style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
              <div className="card__heading">{rt.title}</div>
              <div style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: '0.78rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#D4A056', marginBottom: '0.75rem' }}>{rt.tagline}</div>
              <p className="card__text">{rt.description}</p>
              <div style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)', marginTop: 'auto' }}>
                <strong>First step:</strong> {rt.recommendedFirstStep}<br />
                <strong>Best fit:</strong> {rt.toolPreference}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
