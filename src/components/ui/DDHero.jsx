import React from 'react';
import DDCTA from './DDCTA';
import DDLabel from './DDLabel';
import { theme } from '../../config/theme';

/**
 * DDHero — the top-of-page brutalist hero.
 * label → H1 → tagline → CTA row → optional extra capture/hook.
 */
export default function DDHero({ label, labelTone = 'default', title, tagline, ctas = [], narrow = true, dark = false, className = '', style, extra }) {
  return (
    <section
      className={`dd-hero ${className}`.trim()}
      style={{
        background: dark ? '#111111' : theme.colors.background,
        color: dark ? '#fff' : theme.colors.textPrimary,
        borderBottom: dark ? 'none' : '1px solid #111',
        padding: 'clamp(2.5rem,6vw,4rem) 0',
        ...style,
      }}
    >
      <div style={{ maxWidth: narrow ? 720 : 1100, margin: '0 auto', padding: '0 24px', textAlign: 'center' }}>
        {label ? <DDLabel tone={dark ? 'orange' : labelTone} style={dark ? { color: theme.colors.orange } : undefined}>{label}</DDLabel> : null}
        <h1
          style={{
            fontFamily: theme.fonts.heading,
            fontWeight: 800,
            letterSpacing: '-0.03em',
            fontSize: 'clamp(2.25rem,5vw,3.4rem)',
            lineHeight: 1.1,
            margin: '0 0 1rem',
            color: dark ? '#fff' : theme.colors.textPrimary,
          }}
        >
          {title}
        </h1>
        {tagline ? <p style={{ fontSize: '1.15rem', lineHeight: 1.6, color: dark ? 'rgba(255,255,255,0.8)' : theme.colors.textMuted, maxWidth: 640, margin: '0 0 1.5rem' }}>{tagline}</p> : null}
        {ctas.length > 0 ? (
          <div className="action-row dd-action-row" style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
            {ctas.map((c, i) => <DDCTA key={i} {...c} className="dd-btn" />)}
          </div>
        ) : null}
        {extra ? <div style={{ marginTop: '1.5rem' }}>{extra}</div> : null}
      </div>
    </section>
  );
}