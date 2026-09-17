// src/features/roadmap/components/RoadmapPersonaCard.jsx

import React from 'react';
import { getPersona } from '../../quiz/lib/personas.js';

export default function RoadmapPersonaCard({ superpower }) {
  const persona = getPersona(superpower);
  if (!persona) return null;

  return (
    <div style={{ border: '1px solid var(--color-border)', padding: '1.5rem', background: 'var(--color-card)', marginBottom: '1.5rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.75rem' }}>
        <span style={{ fontSize: '0.72rem', fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--color-accent)' }}>
          {superpower.toUpperCase()}
        </span>
        <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>{persona.tagline}</span>
      </div>
      <p style={{ margin: 0, color: 'var(--color-text-muted)', lineHeight: 1.7 }}>{persona.description}</p>
    </div>
  );
}
