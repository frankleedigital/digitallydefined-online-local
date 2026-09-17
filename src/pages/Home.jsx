import React, { useState } from 'react';
import { ArrowUpRight, Check, LockKeyhole } from 'lucide-react';
import DDSection from '../components/ui/DDSection';
import DDCTA from '../components/ui/DDCTA';
import DDLabel from '../components/ui/DDLabel';
import { useSiteContent } from '../hooks/useSiteContent';
import { callSupabaseEdge } from '../api/supabase.js';

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
    <div id="top" className="home-page">
      <section className="home-hero">
        <div className="dd-container home-hero__grid">
          <div className="home-hero__copy">
            <DDLabel tone="orange">{content['home.heroEyebrow']}</DDLabel>
            <h1>Build digital assets that work <em>quietly.</em></h1>
            <p className="home-hero__tagline">{content['home.heroTagline']}</p>
            <div className="home-hero__actions">
              <DDCTA label="Take the Quiz" href="/quiz" variant="primary" />
            </div>
            <div className="home-hero__proof">
              <span><LockKeyhole size={15} /> Privacy-first by design</span>
              <span><Check size={15} /> No camera required</span>
            </div>
          </div>

          <div className="asset-map" aria-label="A visual map of a digital asset system">
            <div className="asset-map__topline"><span>YOUR DIGITAL REAL ESTATE</span><span className="asset-map__status"><i /> BUILDING</span></div>
            <div className="asset-map__core">
              <div className="asset-map__orbit asset-map__orbit--one" />
              <div className="asset-map__orbit asset-map__orbit--two" />
              <div className="asset-map__center"><ScanLine size={28} strokeWidth={1.5} /><strong>ONE CLEAR<br />NEXT STEP</strong></div>
              <span className="asset-map__node asset-map__node--one">NICHE</span>
              <span className="asset-map__node asset-map__node--two">CONTENT</span>
              <span className="asset-map__node asset-map__node--three">SYSTEMS</span>
            </div>
            <div className="asset-map__footer"><span>01 / 04</span><span>OWNED, NOT PERFORMED</span></div>
          </div>
        </div>
      </section>

      <div className="home-truth-bar"><div className="dd-container home-truth-bar__inner"><span>THE QUIET ADVANTAGE</span><strong>You do not need to be visible to be valuable.</strong><ArrowUpRight size={19} aria-hidden="true" /></div></div>

      <DDSection id="process" eyebrow="How it works" title="Quiz → Roadmap → Dashboard" intro="One short quiz. One personalized roadmap. One private dashboard. Tools unlock only after the dashboard loads." rule="top">
        <div className="home-path">
          {caseSteps.map(([title, text], index) => (
            <div key={title} className="home-path__step"><span className="home-path__number">0{index + 1}</span><DDLabel tone="orange">{title}</DDLabel><p>{text}</p></div>
          ))}
        </div>
        <DDCTA label="See your roadmap" href="/roadmap" variant="primary" />
      </DDSection>

      <DDSection id="launch" eyebrow="Keep going when you are ready" title="A calmer way to make digital progress." intro="Use the free tools first. When you want a clearer view of what is working, the dashboard keeps your signals and next steps in one place." tone="dark" rule="top">
        <div className="home-launch-grid">
          <div className="home-launch__copy"><div className="home-launch__signal"><span /> Your private workspace</div><h3>Build without becoming the brand.</h3><p>Track the properties you are building, see the gaps, and choose the next useful action with less noise.</p><div className="home-launch__actions"><DDCTA label="Open your dashboard" href="/dashboard" variant="secondary" /><DDCTA label="Take the quiz first" href="/quiz" variant="outline" /></div></div>
          <div className="home-launch__capture"><p className="home-launch__capture-label">Get the free starter kit</p><p>One concise worksheet to turn an idea into a first property.</p>
            {optin.status === 'success' ? <p className="home-launch__success">You're in. Watch your inbox for your first step.</p> : <form onSubmit={handleOptin}><label htmlFor="starter-email">Email address</label><div className="home-launch__form-row"><input id="starter-email" type="email" required value={optin.email} onChange={(event) => setOptin({ email: event.target.value, status: 'idle' })} placeholder="you@example.com" /><button type="submit" disabled={optin.status === 'submitting'}>{optin.status === 'submitting' ? 'Joining...' : 'Send it'}</button></div></form>}
            {optin.status === 'error' && <p className="home-launch__error">That did not work. Please try again.</p>}
          </div>
        </div>
      </DDSection>
    </div>
  );
}
