import React from 'react';
import { theme, brutalBorder, brutalCard, brutalHeading, brutalButtonPrimary } from '../config/theme';

export default function Automation() {
  const steps = [
    { num: '01', title: 'Capture', desc: 'Visitor lands on your site. Email capture or quiz completion. No face needed.' },
    { num: '02', title: 'Nurture', desc: 'Automated email sequences deliver value and position your digital products as the next logical step.' },
    { num: '03', title: 'Convert', desc: 'Quiz results trigger personalized product recommendations. Automated checkout. One-click upsells.' },
    { num: '04', title: 'Scale', desc: 'Content engines generate SEO pages, social posts, and lead magnets on autopilot.' }
  ];

  return (
    <>
      <section className="hero hero--dark">
        <div style={{ maxWidth: 720, margin: '0 auto', textAlign: 'center' }}>
          <p className="section__eyebrow">Automation</p>
          <h1 style={{ marginBottom: '1rem', ...brutalHeading, fontSize: 'clamp(2rem, 5vw, 3rem)' }}>Systems That Run Without You.</h1>
          <p className="hero__tagline" style={{ fontFamily: theme.fonts.body }}>Configure once. Run continuously. No more tool management — just configured systems doing the work.</p>
        </div>
      </section>
      <section className="section" style={{ backgroundColor: theme.colors.background }}>
        <div className="container container--narrow">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <p className="section__eyebrow">Automation</p>
            <h2 style={{ maxWidth: 700, margin: '0 auto 1rem', ...brutalHeading, fontSize: 'clamp(1.5rem, 3vw, 2rem)' }}>Four steps from visitor to customer.</h2>
            <p className="section__subtitle" style={{ fontSize: '1.15rem', fontFamily: theme.fonts.body, color: theme.colors.textMuted }}>Configure once. Run continuously. No more tool management — just configured systems doing the work.</p>
          </div>
          <div style={{ display: 'grid', gap: '1.5rem' }}>
            {steps.map(s => (
              <div key={s.num} style={{ ...brutalCard, padding: '2rem', display: 'flex', gap: '2rem', alignItems: 'flex-start' }}>
                <div style={{ flexShrink: 0, width: '4rem', height: '4rem', backgroundColor: theme.colors.orange, color: theme.colors.textPrimary, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: theme.fonts.heading, fontWeight: 900, fontSize: '1.5rem', border: brutalBorder }}>{s.num}</div>
                <div style={{ flex: 1, paddingTop: '0.5rem' }}>
                  <div className="card__heading" style={{ fontSize: '1.2rem', marginBottom: '0.75rem', fontFamily: theme.fonts.heading }}>{s.title}</div>
                  <p style={{ fontSize: '1.05rem', lineHeight: 1.7, color: theme.colors.textMuted, fontFamily: theme.fonts.body, margin: 0 }}>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="section section--dark">
        <div className="container container--narrow" style={{ textAlign: 'center' }}>
          <h2 style={{ color: theme.colors.card, ...brutalHeading, fontSize: 'clamp(1.3rem, 2.5vw, 1.8rem)' }}>What We're Building</h2>
          <p style={{ color: 'rgba(255,255,255,0.7)', maxWidth: 600, margin: '1rem auto 2rem', fontFamily: theme.fonts.body, lineHeight: 1.6 }}>We're automating the pieces that free you up: lead capture, email sequences, content scheduling, and revenue tracking. Some of these run today; the full system is shipping in stages through our backend.</p>
        </div>
      </section>
    </>
  );
}