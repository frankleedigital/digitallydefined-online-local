import React from 'react';
import DDHero from '../../components/ui/DDHero';
import DDSection from '../../components/ui/DDSection';
import DDCard from '../../components/ui/DDCard';
import DDCTA from '../../components/ui/DDCTA';
import { theme } from '../../config/theme';

/**
 * ToolShell — minimal CRO page wrapper for the lightweight tool routes
 * (/tool/trends, /tool/product, /tool/social).
 *
 * Each tool page is a clean single-block: hero → short value stack →
 * primary next action → related tool. No heavy logic, no dead-end.
 */
export default function ToolShell({ eyebrow, title, tagline, ctas = [], points = [], related = [] }) {
  return (
    <>
      <DDHero
        label={eyebrow}
        title={title}
        tagline={tagline}
        ctas={ctas}
      />

      <DDSection tone="white" rule="top" narrow>
        {points.length > 0 && (
          <div style={{ display: 'grid', gap: '1rem', marginBottom: '1.5rem' }}>
            {points.map((p, i) => (
              <DDCard key={i} tone="panel" style={{ padding: '1rem 1.25rem' }}>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                  <span
                    aria-hidden="true"
                    style={{
                      display: 'inline-grid', placeItems: 'center', width: 32, height: 32, flexShrink: 0,
                      border: `1px solid ${theme.colors.border}`, borderRadius: 0,
                      fontFamily: theme.fonts.heading, fontWeight: 800, fontSize: '0.9rem',
                      color: theme.colors.textPrimary,
                    }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span>
                    <strong style={{ display: 'block', fontSize: '1rem', color: theme.colors.textPrimary }}>{p.title}</strong>
                    <span style={{ fontSize: '0.92rem', lineHeight: 1.6, color: theme.colors.textMuted }}>{p.body}</span>
                  </span>
                </div>
              </DDCard>
            ))}
          </div>
        )}

        {ctas.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
            {ctas.map((c, i) => <DDCTA key={i} {...c} />)}
          </div>
        )}

        {related.length > 0 && (
          <div style={{ borderTop: '1px solid rgba(17,17,17,0.08)', marginTop: '2rem', paddingTop: '1.25rem' }}>
            <p style={{ fontFamily: theme.fonts.heading, fontWeight: 800, fontSize: '0.8rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: theme.colors.textMuted, margin: '0 0 0.75rem' }}>
              Next step
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
              {related.map((r, i) => <DDCTA key={i} {...r} variant="outline" />)}
            </div>
          </div>
        )}
      </DDSection>
    </>
  );
}