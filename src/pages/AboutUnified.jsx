import React from 'react';
import FadeInSection from '../components/FadeInSection';
import { theme, brutalCard, brutalHeading } from '../config/theme';
import DDCTA from '../components/ui/DDCTA';
import DDLabel from '../components/ui/DDLabel';
import DDCard from '../components/ui/DDCard';

export default function About() {
  return (
    <>
      <FadeInSection>
        <section className="page-hero page-hero--ink">
          <span className="label label--orange">Why DigitallyDefined exists</span>
          <h1>Women don’t need visibility to build something valuable.</h1>
          <p>DigitallyDefined is a privacy‑first platform for Gen X women who want to turn experience into faceless digital real estate, automated income systems, and assets their families can inherit.</p>
          <div className="action-row">
            <a href="/gap" className="btn btn--primary dd-button dd-button--primary">Start the Build Path →</a>
          </div>
        </section>
      </FadeInSection>

      <FadeInSection delay={80}>
        <section className="story-section story-section--cream">
          <div style={{ ...brutalCard, padding: '1.5rem' }}>
            <DDLabel tone="blue">The belief</DDLabel>
            <h2 style={{ ...brutalHeading, fontSize: 'clamp(1.3rem, 2.6vw, 1.7rem)', margin: '0.5rem 0' }}>Faceless is a strategy — not a limitation.</h2>
            <p style={{ fontSize: '1.05rem', lineHeight: 1.7, color: theme.colors.muted }}>
              Ownership should feel safe. It should not require performance, exposure, or constant visibility.
            </p>
            <div style={{ marginTop: '1rem', display: 'grid', gap: '1rem' }}>
              <p>
                The visible internet rewards noise, speed, and nonstop output. Many capable women looked at that bargain and reasonably decided it wasn’t for them. But choosing privacy should never mean choosing small.
              </p>
              <p>
                AI lowers the cost of building. It helps you research, structure, draft, repurpose, and maintain — without demanding more of your identity. Your judgment is still the asset. Technology simply lets it travel farther.
              </p>
            </div>
          </div>
        </section>
      </FadeInSection>

      <FadeInSection delay={120}>
        <section className="story-section story-section--white">
          <div className="story-heading">
            <span className="label label--orange">One practical path</span>
            <h2 style={{ ...brutalHeading, fontSize: 'clamp(1.3rem, 2.6vw, 1.7rem)' }}>Clarity, property, and systems that can outlive the founder.</h2>
          </div>

          <div className="story-grid story-grid--three">
            {[
              { title: 'Find the number', copy: 'Free calculators and planning tools turn retirement uncertainty into a clear target you can actually work toward.', tone: 'orange' },
              { title: 'Build the property', copy: 'Choose a niche digital asset that fits your experience, privacy needs, available time, and realistic path to revenue.', tone: 'blue' },
              { title: 'Document the system', copy: 'Use practical AI and automation to reduce repetitive work, protect the asset, and make it transferable to someone else.', tone: 'orange' },
            ].map((item, idx) => (
              <article
                key={item.title}
                style={{
                  ...brutalCard,
                  padding: '1.25rem',
                  borderLeft: `4px solid ${item.tone === 'blue' ? '#47B7D4' : '#F18B25'}`,
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '2px 2px 0px rgba(0,0,0,0.12)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '1px 1px 0px rgba(0,0,0,0.08)'; }}
              >
                <span style={{ fontWeight: 900, color: 'var(--color-text-muted)', fontSize: '0.85rem' }}>{String(idx + 1).padStart(2, '0')}</span>
                <h3 style={{ ...brutalHeading, fontSize: '1.1rem', margin: '0.4rem 0' }}>{item.title}</h3>
                <p style={{ margin: 0, color: 'var(--color-text-muted)', lineHeight: 1.6 }}>{item.copy}</p>
              </article>
            ))}
          </div>
        </section>
      </FadeInSection>

      <FadeInSection delay={160}>
        <section className="legacy-section">
          <div style={{ ...brutalCard, padding: '1.5rem', maxWidth: 900, margin: '0 auto', textAlign: 'center' }}>
            <DDLabel tone="orange">The larger mission</DDLabel>
            <h2 style={{ ...brutalHeading, fontSize: 'clamp(1.3rem, 2.6vw, 1.7rem)', margin: '0.5rem 0' }}>Close more than a retirement gap.</h2>
            <p style={{ color: theme.colors.muted, lineHeight: 1.7 }}>
              We’re building toward a future where families inherit more than bills, passwords, and unfinished plans. They inherit documented assets, operating knowledge, and proof that financial patterns can change.
            </p>
            <div style={{ marginTop: '1.25rem' }}>
              <DDCTA label="Start the Build Path →" href="/gap" variant="primary" />
            </div>
          </div>
        </section>
      </FadeInSection>
    </>
  );
}
