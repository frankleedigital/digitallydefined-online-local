import React, { useState } from 'react';
import DDSection from '../../../components/ui/DDSection';
import DDCTA from '../../../components/ui/DDCTA';
import DDLabel from '../../../components/ui/DDLabel';
import { useSiteContent } from '../../../hooks/useSiteContent';
import { callSupabaseEdge } from '../../../api/supabase.js';

const caseSteps = [
  ['Pick', 'Choose a niche with real demand.'],
  ['Score', 'Validate it before you build.'],
  ['Plan', 'Get an exact build order.'],
  ['Automate', 'Set it to run while you sleep.'],
];

export default function Home() {
  const content = useSiteContent();
  const [optin, setOptin] = useState({ email: '', status: 'idle' });

  const handleOptin = async (event) => {
    event.preventDefault();
    if (!optin.email.trim()) return;
    setOptin((state) => ({ ...state, status: 'submitting' }));
    try {
      await callSupabaseEdge('subscribe', { name: '', email: optin.email.trim(), source: 'launcher-cta', tags: ['website-signup'] });
      setOptin({ email: '', status: 'success' });
    } catch {
      setOptin((state) => ({ ...state, status: 'error' }));
    }
  };

  return (
    <div id="top" className="dd-container">
      <section className="page-hero">
        <div className="dd-container">
          <DDLabel tone="orange">{content['home.heroEyebrow']}</DDLabel>
          <h1>Build digital assets that work quietly.</h1>
          <p>{content['home.heroTagline']}</p>
          <div className="action-row">
            <DDCTA label="Take the Quiz" href="/quiz" variant="primary" />
          </div>
          <div className="proof-row">
            <div className="dd-card">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="0" ry="0" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
              <span>Privacy-first by design</span>
            </div>
            <div className="dd-card">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span>No camera required</span>
            </div>
          </div>
        </div>
      </section>

      <div className="home-truth-bar">
        <div className="dd-container home-truth-bar__inner">
          <span>THE QUIET ADVANTAGE</span>
          <strong>You do not need to be visible to be valuable.</strong>
          <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="7" y1="17" x2="17" y2="7" />
            <polyline points="7 7 17 7 17 17" />
          </svg>
        </div>
      </div>

      <DDSection id="process" eyebrow="How it works" title="Quiz → Roadmap → Community" intro="One short quiz. One personalized roadmap. Tools unlock after you finish." rule="top">
        <div className="dd-container">
          <div className="dd-grid">
            {caseSteps.map(([title, text], index) => (
              <div key={title} className="dd-card">
                <span className="step-number">{String(index + 1).padStart(2, '0')}</span>
                <DDLabel tone="orange">{title}</DDLabel>
                <p>{text}</p>
              </div>
            ))}
          </div>
          <div className="action-row">
            <DDCTA label="See your roadmap" href="/roadmap" variant="primary" />
          </div>
        </div>
      </DDSection>

      <DDSection id="launch" eyebrow="Keep going when you are ready" title="A calmer way to make digital progress." intro="Use the free tools first. When you want a clearer view of what is working, the site keeps your signals and next steps in one place." rule="top">
        <div className="dd-container">
          <div className="dd-grid">
            <div className="dd-card">
              <h3>Build without becoming the brand.</h3>
              <p>Track the properties you are building, see the gaps, and choose the next useful action with less noise.</p>
            </div>
            <div className="dd-card">
              <p className="form-label">Get the free starter kit</p>
              <p>One concise worksheet to turn an idea into a first property.</p>
              {optin.status === 'success' ? (
                <p className="dd-notice dd-notice--sent">You're in. Watch your inbox for your first step.</p>
              ) : (
                <form onSubmit={handleOptin}>
                  <label htmlFor="starter-email">Email address</label>
                  <input
                    id="starter-email"
                    type="email"
                    required
                    value={optin.email}
                    onChange={(event) => setOptin({ email: event.target.value, status: 'idle' })}
                    placeholder="you@example.com"
                  />
                  <button type="submit" className="btn btn--primary" disabled={optin.status === 'submitting'}>
                    {optin.status === 'submitting' ? 'Joining...' : 'Send it'}
                  </button>
                </form>
              )}
              {optin.status === 'error' && <p className="dd-notice dd-notice--failed">That did not work. Please try again.</p>}
            </div>
          </div>
        </div>
      </DDSection>
    </div>
  );
}
