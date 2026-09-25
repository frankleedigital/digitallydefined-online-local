import React, { useState } from 'react';
import EmailSignup from '../components/EmailSignup';
import { fetchPersonalization } from '../lib/personalization';
import { callSupabaseEdge } from '../lib/supabase-edge';
import DDHero from '../components/ui/DDHero';
import DDCTA from '../components/ui/DDCTA';
import DDLabel from '../components/ui/DDLabel';
import DDCard from '../components/ui/DDCard';
import FadeInSection from '../components/FadeInSection';
import { theme, brutalCard, brutalHeading, brutalButtonPrimary, brutalButtonOutline } from '../config/theme';

const pressures = [
  ['01', 'The caregiving squeeze', 'You may be helping children launch, supporting aging parents, and trying to protect your own future at the same time.', '/assets/brand/icon-audience.svg'],
  ['02', 'The interrupted career', 'Years spent caregiving, underpaid, divorced, downsized, or rebuilding can show up later as smaller savings and benefits.', '/assets/brand/icon-document.svg'],
  ['03', 'The time gap', 'The old advice assumes decades of uninterrupted compounding. Many Gen X women need an income strategy that can begin now.', '/assets/brand/icon-chart.svg'],
  ['04', 'The visibility tax', 'The internet keeps insisting that income requires constant posting, personal exposure, and becoming a full-time personality. It does not.', '/assets/brand/icon-shield.svg'],
];

const advantages = [
  ['Pattern recognition', 'You have lived through analog and digital change. You can spot what is useful, what is noise, and what real people will pay to solve.'],
  ['Earned expertise', 'Careers, caregiving, reinvention, and hard-won judgment create niche knowledge that AI can help package without replacing your voice.'],
  ['Trust instincts', 'Gen X skepticism is an advantage. Clear, useful, no-hype digital assets stand out in an internet crowded with performance.'],
  ['Resourcefulness', 'You learned to figure things out before tutorials existed. With AI handling repetition, that independence becomes leverage.'],
];

const assets = [
  ['Search property', 'A useful niche website that attracts high-intent visitors and generates leads for a business.', '/assets/brand/icon-domain.svg'],
  ['Knowledge property', 'Templates, guides, databases, calculators, and resource libraries built around a specific problem.', '/assets/brand/icon-document.svg'],
  ['Audience property', 'A faceless newsletter, directory, or content channel that compounds attention you control.', '/assets/brand/icon-email.svg'],
  ['System property', 'Automated funnels and workflows that capture, nurture, route, and measure demand without constant manual work.', '/assets/brand/icon-gear.svg'],
];

const path = [
  ['01', 'Face the number', 'Use the Retirement Gap Calculator to turn a vague fear into a planning number. The result is a scenario, not a verdict.', '/gap', 'Calculate the gap'],
  ['02', 'Name your advantage', 'Take the Digital Superpower Quiz to identify the kind of asset-building work that fits how you naturally think.', '/quiz', 'Find your superpower'],
  ['03', 'Choose a problem', 'Use niche discovery and the profitability scorecard to test demand, privacy fit, durability, and ways to earn.', '/scorecard', 'Score a niche'],
  ['04', 'Model one asset', 'Use the ROI and Freedom Number calculators to compare a realistic asset plan with your monthly target.', '/freedom', 'Model the portfolio'],
  ['05', 'Build the first version', 'Turn the validated idea into one small, useful property. Document the process so it can be improved, automated, and repeated.', '/tools', 'Choose a build tool'],
];

export default function Home() {
  const [optEmail, setOptEmail] = useState('');
  const [optStatus, setOptStatus] = useState(null);

  async function handleOptIn(e) {
    e.preventDefault();
    setOptStatus('submitting');
    try {
      await callSupabaseEdge('subscribe', {
        name: '',
        email: optEmail,
        source: 'homepage-hero',
        tags: ['website-signup'],
      });
      setOptEmail('');
      setOptStatus('success');
    } catch (err) {
      console.error('Subscription error:', err);
      setOptStatus('error');
    }
  }

  return (
    <>
      <FadeInSection>
        <section style={{ background: theme.colors.background, borderBottom: brutalBorder, padding: 'clamp(3.5rem,8vw,6rem) 0' }}>
          <div style={{ maxWidth: 960, margin: '0 auto', padding: '0 24px', textAlign: 'center' }}>
            <DDLabel tone="orange">Start here / not everywhere</DDLabel>
            <h1 style={{ ...brutalHeading, fontSize: 'clamp(2.4rem,5.5vw,3.8rem)', margin: '0 0 1.25rem' }}>Build Faceless Digital Assets.</h1>
            <p style={{ fontSize: '1.15rem', lineHeight: 1.6, color: theme.colors.muted, maxWidth: 720, margin: '0 auto 2rem' }}>Start your path to freedom-based digital ownership. No camera. No invented urgency. No promise of overnight income.</p>
            
            {optStatus === 'success' ? (
              <p style={{ color: theme.colors.success, fontWeight: 700, marginBottom: '1.25rem' }}>You're in. Watch your inbox for your first step.</p>
            ) : (
              <form onSubmit={handleOptIn} style={{ maxWidth: 520, margin: '0 auto 1.5rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                <input
                  type="email"
                  required
                  placeholder="your@email.com"
                  style={{ flex: '1 1 220px', padding: '0.75rem 1rem', border: brutalBorder, background: theme.colors.card, fontSize: '1rem', outline: 'none', fontFamily: theme.fonts.body }}
                  value={optEmail}
                  onChange={(e) => setOptEmail(e.target.value)}
                  aria-label="Email address"
                />
                <DDCTA label={optStatus === 'submitting' ? 'Starting…' : 'Start Here →'} onClick={(e) => { e.preventDefault(); handleOptIn(e); }} disabled={optStatus === 'submitting'} />
              </form>
            )}

            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
              <DDCTA label="Find Your Superpower First →" href="/quiz?start=true" variant="primary" />
              <DDCTA label="Calculate My Retirement Gap →" href="/gap" variant="outline" />
            </div>
          </div>
        </section>
      </FadeInSection>

      <FadeInSection delay={80}>
        <section className="tools-cta" aria-label="Free planning tools" style={{ marginTop: 0 }}>
          <div className="tools-cta__row">
            <DDCTA label="Freedom Number Calculator" href="/freedom" variant="outline" />
            <DDCTA label="Asset Builder" href="/tools" variant="outline" />
            <DDCTA label="10X ROI" href="/roi" variant="outline" />
            <DDCTA label="Digital Superpower Quiz" href="/quiz" variant="outline" />
          </div>
        </section>
      </FadeInSection>

      <FadeInSection delay={100}>
        <section className="philosophy-strip" aria-label="DigitallyDefined principles">
          <span>FACELESS BY DESIGN</span><i aria-hidden="true">•</i>
          <span>AI AS LEVERAGE</span><i aria-hidden="true">•</i>
          <span>SYSTEMS OVER HUSTLE</span><i aria-hidden="true">•</i>
          <span>ASSETS OVER ALGORITHMS</span>
        </section>
      </FadeInSection>

      <FadeInSection delay={120}>
        <section className="story-section story-section--white" id="build-path">
          <div className="story-heading">
            <span className="label label--blue">Start here / not everywhere</span>
            <h2>One path from retirement anxiety to an asset you own.</h2>
            <p>You do not need another pile of ideas. You need a sequence that respects your time, privacy, experience, and actual financial goal.</p>
          </div>
          <div className="path-list">
            {path.map(([number, title, copy, href, cta]) => (
              <article className="path-step" key={number}>
                <span className="path-step__number">{number}</span>
                <div><h2>{title}</h2><p>{copy}</p></div>
                <DDCTA label={cta + ' →'} href={href} variant="primary" />
              </article>
            ))}
          </div>
        </section>
      </FadeInSection>

      <FadeInSection delay={140}>
        <section className="expectation-strip" aria-label="What DigitallyDefined is and is not">
          <div><strong>What this is</strong><p>A practical system for building owned digital assets with AI assistance.</p></div>
          <div><strong>What this is not</strong><p>A guarantee, a get-rich-quick plan, or a demand that you become a public personality.</p></div>
          <div><strong>What comes first</strong><p>Clarity, validation, one small build, and a documented process you can repeat.</p></div>
        </section>
      </FadeInSection>

      <FadeInSection delay={160}>
        <section className="ticker" aria-label="DigitallyDefined principles">
          <span>FACELESS BY DESIGN</span><span>AI AS LEVERAGE</span><span>SYSTEMS OVER HUSTLE</span><span>ASSETS OVER ALGORITHMS</span>
        </section>
      </FadeInSection>

      <FadeInSection delay={180}>
        <section className="story-section story-section--cream">
          <div className="story-heading">
            <span className="label label--orange">The part no one planned for</span>
            <h2>You did everything you were told. The math still feels uncertain.</h2>
            <p>This is not a failure of discipline. It is the accumulated weight of unequal pay, unpaid care, career interruptions, rising costs, and retirement systems designed around a different life.</p>
          </div>
          <div className="story-grid story-grid--four">
            {pressures.map(([number, title, copy, icon]) => (
              <article className="story-card" key={number}>
                <img className="story-card__icon" src={icon} alt="" />
                <span className="story-card__number">{number}</span>
                <h3>{title}</h3>
                <p>{copy}</p>
              </article>
            ))}
          </div>
          <div className="truth-bar">
            <strong>The goal is not to erase the past.</strong>
            <span>It is to build an asset base that gives the next decade more options than the last one did.</span>
          </div>
        </section>
      </FadeInSection>

      <FadeInSection delay={200}>
        <section className="story-section story-section--white">
          <div className="split-story">
            <div className="story-heading story-heading--left">
              <span className="label label--blue">Your unfair advantage</span>
              <h2>Gen X is not late to the internet. We are built for this version of it.</h2>
              <p>You do not need to compete with twenty-year-old creators at being twenty. Your advantage is context: knowing how businesses work, what people actually need, and how to keep going when the novelty wears off.</p>
              <a href="/quiz?start=true" className="text-link" style={{ fontFamily: theme.fonts.body, fontSize: '0.9rem', fontWeight: 700, color: theme.colors.orange, textDecoration: 'none' }}>Find your digital superpower →</a>
            </div>
            <div className="advantage-list">
              {advantages.map(([title, copy], index) => (
                <div className="advantage-row" key={title}>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <div><h3>{title}</h3><p>{copy}</p></div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </FadeInSection>

      <FadeInSection delay={220}>
        <section className="story-section story-section--ink">
          <div className="story-heading">
            <span className="label label--orange">What you are building</span>
            <h2>Digital real estate is useful online property that can earn, grow, and transfer.</h2>
            <p>Instead of renting all your attention to social platforms, you build assets you can control: a domain, an email list, a searchable resource, a product library, a lead engine, or a documented automation.</p>
          </div>
          <div className="asset-grid">
            {assets.map(([title, copy, icon], index) => (
              <article className="asset-card" key={title}>
                <img className="asset-card__icon" src={icon} alt="" />
                <span>PROPERTY {String(index + 1).padStart(2, '0')}</span>
                <h3>{title}</h3>
                <p>{copy}</p>
              </article>
            ))}
          </div>
          <p className="disclaimer">Digital assets take research, testing, maintenance, and time to become profitable. Calculator projections are planning scenarios, not income guarantees.</p>
        </section>
      </FadeInSection>

      <FadeInSection delay={240}>
        <section className="story-section story-section--automation">
          <div className="automation-map">
            <div className="story-heading story-heading--left">
              <span className="label label--blue">The quiet operating system</span>
              <h2>You bring the judgment. Simple AI systems carry the repetition.</h2>
              <p>DigitallyDefined helps you move from an idea to a repeatable asset workflow: research the problem, validate demand, create useful content, capture interest, follow up, and measure what is working without manually rebuilding every step.</p>
            </div>
            <div className="system-diagram" aria-label="Faceless digital asset workflow">
              <div className="system-node system-node--orange"><small>YOU</small><strong>Direction + lived expertise</strong></div>
              <div className="system-arrow">↓</div>
              <div className="system-node system-node--black"><small>AI ASSISTANCE</small><strong>Research + structure + production</strong></div>
              <div className="system-arrow">↓</div>
              <div className="system-node system-node--blue"><small>AUTOMATION</small><strong>Capture + follow-up + measurement</strong></div>
              <div className="system-arrow">↓</div>
              <div className="system-node"><small>DIGITAL PROPERTY</small><strong>Compounding assets you control</strong></div>
            </div>
          </div>
        </section>
      </FadeInSection>

      <FadeInSection delay={260}>
        <section className="legacy-section">
          <div className="legacy-section__copy">
            <span className="label label--orange">Beyond retirement</span>
            <h2>A legacy is not only money. It is a working system your family does not have to start from zero.</h2>
            <p>Generational trauma often includes scarcity, silence, financial confusion, and knowledge that disappears with one person. A documented digital portfolio can hold something different: owned assets, recurring processes, customer relationships, operating instructions, and the confidence that wealth-building is learnable.</p>
          </div>
          <div className="legacy-stack">
            <div><DDLabel tone="orange">01</DDLabel><strong>Build</strong><small style={{ color: theme.colors.muted, fontFamily: theme.fonts.body }}>Create useful assets around problems you understand.</small></div>
            <div><DDLabel tone="orange">02</DDLabel><strong>Protect</strong><small style={{ color: theme.colors.muted, fontFamily: theme.fonts.body }}>Document ownership, access, revenue, and maintenance.</small></div>
            <div><DDLabel tone="orange">03</DDLabel><strong>Transfer</strong><small style={{ color: theme.colors.muted, fontFamily: theme.fonts.body }}>Leave a clear digital inheritance, not a locked account mystery.</small></div>
            <div><DDLabel tone="orange">04</DDLabel><strong>Teach</strong><small style={{ color: theme.colors.muted, fontFamily: theme.fonts.body }}>Pass down the system and the belief that assets can be built.</small></div>
          </div>
        </section>
      </FadeInSection>

      <FadeInSection delay={280}>
        <section className="final-cta">
          <span className="label label--blue">Your next chapter can own property</span>
          <h2>Start with the truth of your numbers. Then build one useful asset.</h2>
          <div className="action-row">
            <DDCTA label="Calculate My Retirement Gap →" href="/gap" variant="outline" />
            <DDCTA label="Find Your Superpower First →" href="/quiz?start=true" variant="primary" />
          </div>
          <p className="microcopy">Not sure where to start? Take the 2-minute quiz to find your digital asset superpower.</p>
        </section>
      </FadeInSection>

      <EmailSignup source="homepage-story" />
    </>
  );
}
