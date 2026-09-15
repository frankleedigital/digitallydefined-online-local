import React from 'react';
import { Link } from 'react-router-dom';
import { RESULT_TYPES } from './ResultTypes';

export default function QuizResults() {
  return (
    <div className="container container--narrow" style={{ paddingBlock: '4rem' }}>
      <h1 style={{ fontSize: '1.75rem', marginBottom: 16 }}>Your Digital Superpower Results</h1>
      <p style={{ color: 'var(--color-text-muted)', marginBottom: 24 }}>All seven profile types with their strengths, tools, and monetization paths.</p>
      <div style={{ display: 'grid', gap: 20, gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
        {Object.values(RESULT_TYPES).map(rt => (
          <div key={rt.key} className="card">
            <h3 style={{ fontSize: '1.1rem' }}>{rt.title}</h3>
            <p style={{ color: 'var(--color-accent)', textTransform: 'uppercase', fontSize: '0.75rem', letterSpacing: '0.05em', marginBottom: 8 }}>{rt.tagline}</p>
            <p style={{ color: 'var(--color-text-muted)', lineHeight: 1.6, fontSize: '0.9rem' }}>{rt.description}</p>
            <div style={{ marginTop: 12, fontSize: '0.85rem' }}>
              <strong style={{ color: 'var(--color-text)' }}>First step:</strong> {rt.recommendedFirstStep}<br />
              <strong style={{ color: 'var(--color-text)' }}>Best fit:</strong> {rt.toolPreference}
            </div>
          </div>
        ))}
      </div>
      <Link to="/quiz/inbox" className="btn btn--primary" style={{ display: 'inline-block', marginTop: 32 }}>
        Back to results
      </Link>
    </div>
  );
}
