import React from 'react';
import FadeInSection from '../components/FadeInSection';
import { theme, brutalCard, brutalHeading } from '../config/theme';
import DDCTA from '../components/ui/DDCTA';
import DDLabel from '../components/ui/DDLabel';
import DDCard from '../components/ui/DDCard';

export default function Products() {
  return (
    <>
      <FadeInSection>
        <section className="page-hero">
          <div style={{ maxWidth: 720, margin: '0 auto', textAlign: 'center' }}>
            <p className="section__eyebrow" style={{ color: theme.colors.orange, fontFamily: theme.fonts.heading, fontSize: '0.72rem', fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '0.5rem', display: 'block' }}>Products</p>
            <h1 style={{ ...brutalHeading, fontSize: 'clamp(1.6rem, 3.2vw, 2.4rem)', marginBottom: '1rem' }}>Built for privacy-first ownership.</h1>
            <p className="hero__tagline" style={{ color: theme.colors.muted, fontFamily: theme.fonts.body }}>Pick a starting point. Every product connects to the calculators, quiz, and roadmap so you can move from exploration to execution.</p>
            <div className="action-row"><DDCTA label="Explore Tools →" href="/tools" variant="primary" /></div>
          </div>
        </section>
      </FadeInSection>

      <FadeInSection delay={100}>
        <section className="section">
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem' }}>
              {[
                { title: 'Freedom Number Model', copy: 'Turn a monthly income target into an asset mix, gap, and liquidation value.', href: '/freedom', cta: 'Open Calculator →' },
                { title: 'Retirement Gap Analyzer', copy: 'Compare expected retirement income against your actual planned monthly expenses.', href: '/gap', cta: 'Calculate My Gap →' },
                { title: '10X ROI Model', copy: 'Model tenant revenue, lease price, and the cost advantage of owned digital property.', href: '/roi', cta: 'Model ROI →' },
                { title: 'Digital Superpower Quiz', copy: 'Get a faceless asset roadmap matched to how you naturally think and work.', href: '/quiz?start=true', cta: 'Take the Quiz →' },
                { title: 'Niche Scorecard', copy: 'Score demand, competition, monetization, durability, ease, and privacy fit.', href: '/tools/scorecard', cta: 'Score a Niche →' },
                { title: 'Asset Builder', copy: 'Choose your first asset type and get a build sequence tailored to your superpower.', href: '/tools', cta: 'Choose a Tool →' },
              ].map((item) => (
                <article key={item.title} style={{ ...brutalCard, padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', transition: 'transform 0.2s ease, box-shadow 0.2s ease' }} onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '2px 2px 0px rgba(0,0,0,0.12)'; }} onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '1px 1px 0px rgba(0,0,0,0.08)'; }}>
                  <div style={{ ...brutalHeading, fontSize: '1.1rem' }}>{item.title}</div>
                  <p style={{ color: 'var(--color-text-muted)', lineHeight: 1.6, margin: 0 }}>{item.copy}</p>
                  <a href={item.href} className="btn btn--outline dd-button dd-button--outline" style={{ width: 'fit-content', marginTop: '0.25rem' }}>{item.cta}</a>
                </article>
              ))}
            </div>
          </div>
        </section>
      </FadeInSection>
    </>
  );
}
