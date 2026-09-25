import React, { useState } from 'react';
import { callSupabaseEdge } from '../lib/supabase-edge';
import FadeInSection from '../components/FadeInSection';
import { theme, brutalCard, brutalHeading, brutalButtonPrimary } from '../config/theme';
import DDCTA from '../components/ui/DDCTA';
import DDCard from '../components/ui/DDCard';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus('sending');
    try {
      await callSupabaseEdge('contact', {
        name: form.name,
        email: form.email,
        message: form.message,
        source: 'contact-page',
      });
      setStatus('success');
      setForm({ name: '', email: '', message: '' });
    } catch (err) {
      setStatus('error');
    }
  }

  return (
    <>
      <FadeInSection>
        <section className="page-hero">
          <div style={{ maxWidth: 720, margin: '0 auto', textAlign: 'center' }}>
          <p className="section__eyebrow" style={{ color: theme.colors.orange, fontFamily: theme.fonts.heading, fontSize: '0.72rem', fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '0.5rem', display: 'block' }}>Contact</p>
          <h1 style={{ ...brutalHeading, fontSize: 'clamp(1.6rem, 3.2vw, 2.4rem)', marginBottom: '1rem' }}>Let's Build Something That Works.</h1>
          <p className="hero__tagline" style={{ color: theme.colors.muted, fontFamily: theme.fonts.body }}>Questions about the platform? Partnerships? Or just need help getting started? Drop us a line.</p>
          <div className="action-row"><DDCTA label="Send a Message →" href="#contact-form" variant="primary" /></div>
          </div>
        </section>
      </FadeInSection>

      <FadeInSection delay={100}>
        <section className="section" id="contact-form">
          <div style={{ maxWidth: 700, margin: '0 auto' }}>
            <div style={{ ...brutalCard, padding: '2rem' }}>
              <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '1.5rem' }}>
                  <label className="form-label">Your Name</label>
                  <input type="text" className="form-input dd-input" required placeholder="What should we call you?" value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
                </div>
                <div style={{ marginBottom: '1.5rem' }}>
                  <label className="form-label">Email Address</label>
                  <input type="email" className="form-input dd-input" required placeholder="your@email.com" value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
                </div>
                <div style={{ marginBottom: '2rem' }}>
                  <label className="form-label">Message</label>
                  <textarea className="form-input form-textarea dd-input" required placeholder="Tell us what you're building." value={form.message} onChange={e => setForm({...form, message: e.target.value})}></textarea>
                </div>
                <button type="submit" style={{ ...brutalButtonPrimary, width: '100%' }} disabled={status === 'sending'}>
                  {status === 'sending' ? 'Sending...' : 'Send Message →'}
                </button>
                {status === 'success' && (
                  <div style={{ marginTop: '1.5rem', padding: '1rem', background: theme.colors.background, border: `2px solid ${theme.colors.orange}`, color: theme.colors.textPrimary, fontWeight: 700, textAlign: 'center', fontFamily: theme.fonts.body }}>
                    ✓ Message sent. We'll be in touch.
                  </div>
                )}
                {status === 'error' && (
                  <div style={{ marginTop: '1.5rem', padding: '1rem', background: theme.colors.background, border: `2px solid ${theme.colors.darkRed}`, color: theme.colors.textPrimary, fontWeight: 700, textAlign: 'center', fontFamily: theme.fonts.body }}>
                    ✗ Something went wrong. Try again or email hello@digitallydefined.online
                  </div>
                )}
              </form>
            </div>
          </div>
        </section>
      </FadeInSection>

      <FadeInSection delay={140}>
        <section className="section section--dark">
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <h2 style={{ color: '#fff', ...brutalHeading, fontSize: 'clamp(1.3rem, 2.6vw, 1.7rem)' }}>Quick Start Path</h2>
          </div>
          <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem' }}>
          {[
            { title: '1. Take the Quiz', copy: 'Discover your digital superpower and get a personalized roadmap.', href: '/quiz?start=true', label: 'Start Now →' },
            { title: '2. Score a Niche Idea', copy: 'Rate your niche against 6 criteria and get an instant profitability assessment.', href: '/tools/scorecard', label: 'Score My Niche →' },
            { title: '3. Use the Free Tools', copy: 'Calculate your gap, validate a niche, and model the first asset before you invest.', href: '/tools', label: 'Explore Tools →' },
          ].map((item) => (
            <div key={item.title} style={{ ...brutalCard, padding: '1.25rem', textAlign: 'center', transition: 'transform 0.2s ease, box-shadow 0.2s ease' }} onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '2px 2px 0px rgba(0,0,0,0.12)'; }} onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '1px 1px 0px rgba(0,0,0,0.08)'; }}>
              <div style={{ ...brutalHeading, fontSize: '1.05rem', marginBottom: '0.5rem' }}>{item.title}</div>
              <p style={{ fontSize: '0.9rem', color: theme.colors.muted, lineHeight: 1.6, marginBottom: '1rem', fontFamily: theme.fonts.body }}>{item.copy}</p>
              <DDCTA label={item.label} href={item.href} variant="outline" style={{ width: 'fit-content', fontSize: '0.8rem', padding: '0.5rem 1rem' }} />
            </div>
          ))}
            </div>
          </div>
        </section>
      </FadeInSection>
    </>
  );
}
