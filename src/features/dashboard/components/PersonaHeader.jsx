// src/features/dashboard/components/PersonaHeader.jsx

import React from 'react';
import { getPersona } from '../../quiz/lib/personas.js';

export default function PersonaHeader({ superpower }) {
  const persona = getPersona(superpower);
  if (!persona) return null;

  return (
    <div style={{ border: '1px solid var(--color-border)', padding: '1.5rem', background: 'var(--color-card)', marginBottom: '1.5rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
        <span style={{ fontSize: '0.72rem', fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--color-accent)' }}>
          {superpower.toUpperCase()} Superpower
        </span>
        <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', border: '1px solid var(--color-border)', padding: '2px 8px' }}>✓ Unlocked</span>
      </div>
      <h2 style={{ fontSize: '1.5rem', fontWeight: 800, letterSpacing: '-0.03em', margin: '0 0 0.5rem' }}>
        {persona.title}
      </h2>
      <p style={{ color: 'var(--color-text-muted)', lineHeight: 1.7, margin: 0 }}>{persona.description}</p>
      <p style={{ marginTop: '0.75rem', fontSize: '0.9rem', color: 'var(--color-text)' }}>
        <strong>Recommended first step:</strong> {persona.recommendedFirstStep}
      </p>
    </div>
  );
}
