// src/features/roadmap/pages/RoadmapPage.jsx
// Reads quiz result from localStorage, renders the user's personalized roadmap.
// Redirects to /quiz if no result found.

import React from 'react';
import { Navigate } from 'react-router-dom';
import { getRoadmap } from '../../quiz/lib/roadmapData.js';
import { renderRoadmap } from '../../quiz/lib/renderRoadmap.js';

const STORAGE_KEY = 'dd-quiz-results';

function getStoredResult() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export default function RoadmapPage() {
  const stored = getStoredResult();

  if (!stored) {
    return <Navigate to="/quiz" replace />;
  }

  const { superpower } = stored;
  const roadmap = getRoadmap(superpower);

  if (!roadmap) {
    return <Navigate to="/quiz" replace />;
  }

  const rendered = renderRoadmap({});
  const steps = rendered.steps?.length > 0
    ? rendered.steps.map((s) => s.description || s.step).filter(Boolean)
    : roadmap.firstSteps;
  const nextAction = rendered.nextAction?.action || '';

  return (
    <div style={{ maxWidth: 720, margin: '0 auto', padding: '3rem 1.5rem' }}>
      <span style={{ fontSize: '0.72rem', fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--color-accent)', display: 'block', marginBottom: '0.5rem' }}>
        YOUR PERSONALIZED ROADMAP
      </span>
      <h1 style={{ fontSize: '2rem', fontWeight: 800, letterSpacing: '-0.03em', marginBottom: '0.5rem', lineHeight: 1.1 }}>
        {roadmap.title}
      </h1>
      <p style={{ color: 'var(--color-text-muted)', lineHeight: 1.7, marginBottom: '2rem' }}>{roadmap.overview}</p>

      <div style={{ display: 'grid', gap: '1.5rem', marginBottom: '2rem' }}>
        <div style={{ border: '1px solid var(--color-border)', padding: '1.5rem', background: 'var(--color-surface)' }}>
          <h3 style={{ fontSize: '0.85rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.75rem', color: 'var(--color-accent)' }}>Your Strengths</h3>
          <ul style={{ margin: 0, paddingLeft: '1.25rem', color: 'var(--color-text-muted)', lineHeight: 1.8 }}>
            {roadmap.strengths.map((s) => <li key={s}>{s}</li>)}
          </ul>
        </div>
        <div style={{ border: '1px solid var(--color-border)', padding: '1.5rem', background: 'var(--color-surface)' }}>
          <h3 style={{ fontSize: '0.85rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.75rem', color: '#F18B25' }}>Build Sequence</h3>
          <ol style={{ margin: 0, paddingLeft: '1.25rem', color: 'var(--color-text-muted)', lineHeight: 1.8 }}>
            {steps.map((step, i) => <li key={i}><strong style={{ color: 'var(--color-text)' }}>{i + 1}.</strong> {step}</li>)}
          </ol>
          {nextAction && <div style={{ marginTop: '1rem', padding: '0.75rem', background: 'rgba(241,139,37,0.1)', borderLeft: '3px solid var(--color-accent)' }}><strong>Next action:</strong> {nextAction}</div>}
        </div>
        <div style={{ border: '1px solid var(--color-border)', padding: '1.5rem', background: 'var(--color-surface)' }}>
          <h3 style={{ fontSize: '0.85rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.75rem', color: 'var(--color-accent)' }}>Recommended Niches</h3>
          <ul style={{ margin: 0, paddingLeft: '1.25rem', color: 'var(--color-text-muted)', lineHeight: 1.8 }}>
            {roadmap.recommendedNiches.map((n) => <li key={n}>{n}</li>)}
          </ul>
        </div>
      </div>

      <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: '1.5rem', display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
        <a href="/dashboard" className="btn btn--primary">Open My Dashboard →</a>
        <a href="/quiz" className="btn btn--outline">Retake Quiz</a>
        <a href="/" className="btn btn--outline">Back to Home</a>
      </div>
    </div>
  );
}
