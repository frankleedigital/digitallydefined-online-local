import React from 'react';
import FadeInSection from '../components/FadeInSection';
import { theme, brutalCard, brutalHeading } from '../config/theme';
import { callAgent } from '../lib/buzz-agents';
import DDCard from '../components/ui/DDCard';
import DDLabel from '../components/ui/DDLabel';
import DDCTA from '../components/ui/DDCTA';

const STEPS = [
  { num: '01', title: 'Capture', desc: 'Visitor lands on your site. Email capture or quiz completion. No face needed.' },
  { num: '02', title: 'Nurture', desc: 'Automated email sequences deliver value and position your digital products as the next logical step.' },
  { num: '03', title: 'Convert', desc: 'Quiz results trigger personalized product recommendations. Automated checkout. One-click upsells.' },
  { num: '04', title: 'Scale', desc: 'Content engines generate SEO pages, social posts, and lead magnets on autopilot.' },
];

export default function Automation() {
  return (
    <>
      <FadeInSection>
        <section className="page-hero page-hero--ink">
          <span className="label label--orange">Automation</span>
          <h1 style={{ ...brutalHeading, fontSize: 'clamp(1.6rem, 3.2vw, 2.4rem)', marginBottom: '1rem' }}>Systems That Work While You Sleep.</h1>
          <p className="hero__tagline">Configure once. Run forever. No more tool management — just configured systems doing the work.</p>
        </section>
      </FadeInSection>

      <FadeInSection delay={100}>
        <section className="story-section story-section--white">
          <div style={{ maxWidth: 900, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
              <DDLabel tone="blue">Automation</DDLabel>
              <h2 style={{ ...brutalHeading, fontSize: 'clamp(1.3rem, 2.6vw, 1.7rem)', margin: '0.5rem 0' }}>Your Faceless Empire. Four Steps.</h2>
              <p style={{ fontSize: '1.15rem', color: theme.colors.muted }}>Configure once. Run forever. No more tool management — just configured systems doing the work.</p>
            </div>
            <div style={{ display: 'grid', gap: '1.25rem' }}>
              {STEPS.map((s) => (
                <div key={s.num} style={{ ...brutalCard, padding: '1.5rem', display: 'flex', gap: '1.5rem', alignItems: 'flex-start', transition: 'transform 0.2s ease, box-shadow 0.2s ease' }} onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '2px 2px 0px rgba(0,0,0,0.12)'; }} onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '1px 1px 0px rgba(0,0,0,0.08)'; }}>
                  <div style={{ flexShrink: 0, width: '3.5rem', height: '3.5rem', background: '#F18B25', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: '1.25rem', border: '2px solid #111111' }}>{s.num}</div>
                  <div>
                    <div style={{ ...brutalHeading, fontSize: '1.15rem', marginBottom: '0.5rem' }}>{s.title}</div>
                    <p style={{ color: 'var(--color-text-muted)', lineHeight: 1.7, margin: 0 }}>{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </FadeInSection>

      <FadeInSection delay={140}>
        <section className="story-section story-section--cream">
          <div style={{ maxWidth: 900, margin: '0 auto', ...brutalCard, padding: '1.5rem' }}>
            <DDLabel tone="orange">What We're Building</DDLabel>
            <h2 style={{ ...brutalHeading, fontSize: 'clamp(1.2rem, 2.4vw, 1.5rem)', margin: '0.5rem 0' }}>Live automation modules</h2>
            <p style={{ color: theme.colors.muted, lineHeight: 1.7 }}>
              We're automating the pieces that free you up: lead capture, email sequences, content scheduling, and revenue tracking. Some of these run today; the full system is shipping in stages through our backend.
            </p>
            <div style={{ marginTop: '1rem', display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              <DDCTA label="Use the Free Tools →" href="/tools" variant="primary" />
              <DDCTA label="Ask About Automation" href="/contact" variant="outline" />
            </div>
          </div>
        </section>
      </FadeInSection>
    </>
  );
}
