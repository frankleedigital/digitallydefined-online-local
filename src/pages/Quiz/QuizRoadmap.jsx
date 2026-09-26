import React from 'react';
import { buildRoadmapPayload } from '../../lib/roadmaps';

const roadmap = buildRoadmapPayload('creator'); // default

export default function QuizRoadmap() {
  if (!roadmap) return null;
  return (
    <section style={{ maxWidth: '720px', margin: 'var(--space-xl) auto', padding: '0 1.5rem' }}>
      <h1 style={{ fontSize: '1.8rem', marginBottom: 'var(--space-sm)' }}>{roadmap.title}</h1>
      <p style={{ fontSize: '0.9rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#D4A056', fontWeight: 700, marginBottom: 'var(--space-lg)' }}>{roadmap.tagline}</p>

      <div style={{ background: '#fff', borderRadius: '12px', border: '1px solid rgba(0,0,0,0.06)', padding: '2rem', marginBottom: 'var(--space-md)' }}>
        <h3 style={{ fontSize: '1.1rem', marginBottom: 'var(--space-xs)' }}>Recommended First Step</h3>
        <p style={{ lineHeight: 1.7 }}>{roadmap.recommendedFirstStep}</p>
      </div>

      {roadmap.steps.map((step, i) => (
        <div key={i} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', marginBottom: 'var(--space-sm)' }}>
          <span style={{ flexShrink: 0, width: '2rem', height: '2rem', borderRadius: '50%', background: i === 0 ? 'var(--color-text)' : 'var(--color-card)', color: i === 0 ? 'var(--color-card)' : 'var(--color-text-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Inter', sans-serif", fontWeight: 800, fontSize: '0.85rem' }}>{i + 1}</span>
          <p style={{ fontSize: '0.95rem', lineHeight: 1.6, color: '#3A3A3A' }}>{step}</p>
        </div>
      ))}
    </section>
  );
}
