import React from 'react';
import DDCard from './DDCard';
import DDCTA from './DDCTA';
import { theme } from '../../config/theme';

/**
 * DDToolCard — a tool tile: number / flat icon + title + description + CTA + sub-links.
 */
export default function DDToolCard({ step, title, description, cta, icon, note, subLinks = [], className = '', style }) {
  return (
    <DDCard as="article" tone="card" className={`dd-tool-card ${className}`.trim()} style={{ display: 'grid', gap: '1rem', padding: '1.25rem', ...style }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
        <span
          aria-hidden="true"
          style={{
            display: 'inline-grid', placeItems: 'center', width: 44, height: 44, flexShrink: 0,
            border: '1px solid #111', borderRadius: 0,
            backgroundColor: theme.colors.card, color: theme.colors.textPrimary,
            fontFamily: theme.fonts.heading, fontWeight: 800, fontSize: '1rem',
          }}
        >
          {icon || step}
        </span>
        <div style={{ flex: 1 }}>
          <h3 style={{ fontSize: '1.15rem', fontWeight: 800, fontFamily: theme.fonts.heading, letterSpacing: '-0.03em', margin: '0 0 0.4rem', color: theme.colors.textPrimary }}>{title}</h3>
          <p style={{ fontSize: '0.95rem', lineHeight: 1.6, color: theme.colors.textMuted, margin: '0 0 0.5rem' }}>{description}</p>
          {note ? <p style={{ fontSize: '0.85rem', color: theme.colors.textMuted }}>{note}</p> : null}
        </div>
      </div>
      {subLinks.length > 0 ? (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
          {subLinks.map((l, i) => <a key={i} href={l.href} style={{ fontSize: '0.85rem', fontWeight: 700, color: theme.colors.aqua, textDecoration: 'underline' }}>{l.label}</a>)}
        </div>
      ) : null}
      {cta ? <DDCTA {...cta} className="dd-btn" /> : null}
    </DDCard>
  );
}