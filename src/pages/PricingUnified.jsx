import React, { useState } from 'react';
import FadeInSection from '../components/FadeInSection';
import { theme, brutalCard, brutalHeading, brutalBorder } from '../config/theme';
import DDCTA from '../components/ui/DDCTA';
import DDLabel from '../components/ui/DDLabel';
import DDCard from '../components/ui/DDCard';

export default function Pricing() {
  const [billing, setBilling] = useState('monthly');

  const plans = [
    { name: 'Free', price: '$0', desc: 'Explore tools, take the quiz, grab free resources.', features: ['Digital Superpower Quiz', 'Niche Profitability Scorecard', '10x ROI Calculator', 'Free AI Tools lists', 'Community forum access'], cta: 'Start Free', ctaHref: '/quiz?start=true', ctaClass: 'dd-button dd-button--outline' },
    { name: 'Builder', price: billing === 'monthly' ? '$27/mo' : '$297/year', desc: 'The automation starter kit. Systems that actually work.', features: ['Everything in Free', 'Automated email sequences', 'Social media scheduling (5 platforms)', 'AI content engine access', 'Notion dashboard templates', 'SEO content calendar'], cta: 'Join Waitlist', ctaHref: '/contact', ctaClass: 'dd-button dd-button--primary', highlighted: true },
    { name: 'Empire', price: billing === 'monthly' ? '$67/mo' : '$697/year', desc: 'Full faceless empire builder. Automate everything.', features: ['Everything in Builder', 'Unlimited social posting', 'Google Sheets revenue tracking', 'Custom CRM integration', 'Priority support', 'Exclusive templates & SOPs', 'API access for custom builds'], cta: 'Join Waitlist', ctaHref: '/contact', ctaClass: 'dd-button dd-button--primary' }
  ];

  return (
    <>
      <FadeInSection>
        <section className="page-hero">
          <div style={{ maxWidth: 720, margin: '0 auto', textAlign: 'center' }}>
          <p className="section__eyebrow" style={{ color: theme.colors.orange, fontFamily: theme.fonts.heading, fontSize: '0.72rem', fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '0.5rem', display: 'block' }}>Pricing</p>
          <h1 style={{ ...brutalHeading, fontSize: 'clamp(1.6rem, 3.2vw, 2.4rem)', marginBottom: '1rem' }}>Leverage Over Burnout. Pick Your System.</h1>
          <p className="hero__tagline" style={{ color: theme.colors.muted, fontFamily: theme.fonts.body }}>No hidden fees. No upsells. Just pricing that reflects actual value.</p>
          <div className="action-row"><DDCTA label="See the Plans →" href="#plans" variant="primary" /></div>
          </div>
        </section>
      </FadeInSection>

      <FadeInSection delay={100}>
        <section className="section" id="plans" style={{ paddingBottom: '3rem' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
              <p className="section__eyebrow">Pricing</p>
              <h2 style={{ ...brutalHeading, fontSize: 'clamp(1.3rem, 2.6vw, 1.7rem)', maxWidth: 700, margin: '0 auto 1rem' }}>Compare the Plans</h2>
              <p className="section__subtitle" style={{ fontSize: '1.15rem' }}>Start free. Upgrade when you're ready to scale.</p>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '3rem' }}>
              <button onClick={() => setBilling('monthly')} className={`btn ${billing === 'monthly' ? 'btn--primary dd-button dd-button--primary' : 'btn--outline dd-button dd-button--outline'}`}>Monthly</button>
              <button onClick={() => setBilling('yearly')} className={`btn ${billing === 'yearly' ? 'btn--primary dd-button dd-button--primary' : 'btn--outline dd-button dd-button--outline'}`}>Yearly <span style={{ opacity: 0.9, fontSize: '0.75rem' }}>(Save 17%)</span></button>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem', alignItems: 'start' }}>
              {plans.map(plan => (
                <div key={plan.name} style={{ ...brutalCard, padding: '2rem', border: plan.highlighted ? `3px solid ${theme.colors.orange}` : brutalBorder, display: 'flex', flexDirection: 'column', position: 'relative', transition: 'transform 0.2s ease, box-shadow 0.2s ease' }} onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '2px 2px 0px rgba(0,0,0,0.12)'; }} onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '1px 1px 0px rgba(0,0,0,0.08)'; }}>
                  {plan.highlighted && <div style={{ position: 'absolute', top: '-12px', left: '50%', transform: 'translateX(-50%)', background: theme.colors.orange, color: '#FFFFFF', padding: '0.35rem 1rem', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', border: brutalBorder }}>Most Popular</div>}
                  <div style={{ marginBottom: '1.5rem' }}>
                    <div style={{ ...brutalHeading, fontSize: '1.1rem', marginBottom: '0.75rem' }}>{plan.name}</div>
                    <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem', fontWeight: 900, fontFamily: theme.fonts.heading }}>{plan.price}</div>
                    <p style={{ color: theme.colors.muted, fontSize: '0.95rem', fontFamily: theme.fonts.body }}>{plan.desc}</p>
                  </div>
                  <ul style={{ listStyle: 'none', flex: 1, marginBottom: '1.5rem' }}>
                    {plan.features.map(f => (
                      <li key={f} style={{ padding: '0.5rem 0', fontSize: '0.95rem', lineHeight: 1.6, borderBottom: '1px solid rgba(0,0,0,0.08)', fontFamily: theme.fonts.body }}>✓ {f}</li>
                    ))}
                  </ul>
                  <DDCTA label={plan.cta} href={plan.ctaHref} variant={plan.ctaClass.includes('outline') ? 'outline' : 'primary'} style={{ width: '100%' }} />
                </div>
              ))}
            </div>
          </div>
        </section>
      </FadeInSection>
    </>
  );
}
