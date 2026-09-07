import React, { useState } from 'react';
import { ArrowUpRight, Check, LockKeyhole, ScanLine, Sparkles } from 'lucide-react';
import DDSection from '../components/ui/DDSection';
import DDToolCard from '../components/ui/DDToolCard';
import DDCTA from '../components/ui/DDCTA';
import DDLabel from '../components/ui/DDLabel';
import { useSiteContent } from '../hooks/useSiteContent';
import { callSupabaseEdge } from '../lib/supabase-edge';

const tools = [
  { step: '01', title: 'Niche Discovery', description: 'Find a profitable, low-competition niche in one search.', cta: { label: 'Find a niche', href: '/tool/niche', variant: 'primary' } },
  { step: '02', title: 'Trend Scanner', description: 'Spot rising demand before it gets crowded.', cta: { label: 'Scan trends', href: '/tool/trends', variant: 'secondary' } },
  { step: '03', title: 'Niche Scorecard', description: 'Validate an idea in minutes before you invest time.', cta: { label: 'Score my niche', href: '/tool/scorecard', variant: 'primary' } },
  { step: '04', title: 'Roadmap Generator', description: 'Get a personalized build order for your first asset.', cta: { label: 'Build a roadmap', href: '/tool/roadmap', variant: 'secondary' } },
  { step: '05', title: 'Product Builder', description: 'Turn expertise into a sellable digital product.', cta: { label: 'Build a product', href: '/tool/product', variant: 'primary' } },
  { step: '06', title: 'Social & Automations', description: 'Publish, follow up, and measure on autopilot.', cta: { label: 'Automate it', href: '/tool/social', variant: 'secondary' } },
  { step: '07', title: 'Niche Scanner', description: 'Scan any idea and buy the full niche report.', cta: { label: 'Scan a niche', href: '/tool/niche-scanner', variant: 'primary' } },
];

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
              <DDCTA label="Find Your Superpower" href="/quiz?start=true" variant="primary" />
              <DDCTA label="Explore the tools" href="#tools" variant="outline" />
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

      <DDSection id="tools" eyebrow="Start with a decision" title="A practical system for building what you own." intro="Each tool answers one question and gives you a useful next move. Start anywhere. Keep the part that helps." rule="top">
        <div className="home-tools-grid">
          <article className="home-tools-feature">
            <div className="home-tools-feature__index">01</div>
            <div><p className="home-tools-feature__kicker">A good place to begin</p><h3>Find the idea worth building.</h3><p>Use the quiz to match your strengths, privacy preferences, and available time with a digital path that makes sense.</p><DDCTA label="Find my starting point" href="/quiz?start=true" variant="primary" /></div>
            <Sparkles className="home-tools-feature__mark" size={64} strokeWidth={1} aria-hidden="true" />
          </article>
          {tools.slice(1).map((tool) => <DDToolCard key={tool.step} {...tool} />)}
        </div>
      </DDSection>

      <DDSection id="case-study" eyebrow="The operating model" title="Small decisions. Compounding ownership." intro="The path is simple on purpose. Build one useful property, then make the next one easier." tone="panel" rule="top">
        <div className="home-path">
          {caseSteps.map(([title, text], index) => (
            <div key={title} className="home-path__step"><span className="home-path__number">0{index + 1}</span><DDLabel tone="orange">{title}</DDLabel><p>{text}</p></div>
          ))}
        </div>
        <DDCTA label="See the full build order" href="/tool/roadmap" variant="primary" />
      </DDSection>

      <DDSection id="launch" eyebrow="Keep going when you are ready" title="A calmer way to make digital progress." intro="Use the free tools first. When you want a clearer view of what is working, the dashboard keeps your signals and next steps in one place." tone="dark" rule="top">
        <div className="home-launch-grid">
          <div className="home-launch__copy"><div className="home-launch__signal"><span /> Your private workspace</div><h3>Build without becoming the brand.</h3><p>Track the properties you are building, see the gaps, and choose the next useful action with less noise.</p><div className="home-launch__actions"><DDCTA label="Open the AI Business Partner" href="/dashboard" variant="secondary" /><DDCTA label="Take the quiz first" href="/quiz?start=true" variant="outline" /></div></div>
          <div className="home-launch__capture"><p className="home-launch__capture-label">Get the free starter kit</p><p>One concise worksheet to turn an idea into a first property.</p>
            {optin.status === 'success' ? <p className="home-launch__success">You're in. Watch your inbox for your first step.</p> : <form onSubmit={handleOptin}><label htmlFor="starter-email">Email address</label><div className="home-launch__form-row"><input id="starter-email" type="email" required value={optin.email} onChange={(event) => setOptin({ email: event.target.value, status: 'idle' })} placeholder="you@example.com" /><button type="submit" disabled={optin.status === 'submitting'}>{optin.status === 'submitting' ? 'Joining...' : 'Send it'}</button></div></form>}
            {optin.status === 'error' && <p className="home-launch__error">That did not work. Please try again.</p>}
          </div>
        </div>
      </DDSection>
    </div>
  );
}
