import React, { useState } from 'react';
import DDHero from '../components/ui/DDHero';
import DDSection from '../components/ui/DDSection';
import DDToolCard from '../components/ui/DDToolCard';
import DDCTA from '../components/ui/DDCTA';
import DDLabel from '../components/ui/DDLabel';
import { useSiteContent } from '../hooks/useSiteContent';
import { callSupabaseEdge } from '../lib/supabase-edge';
import { theme } from '../config/theme';

/**
 * DigitallyDefined — single-page launcher.
 *
 * Sections: Hero → Tools → Case Study → CTA (dashboard + AI partner) → Footer.
 * Every CTA is one obvious next action. No navbar clutter, no overwhelm.
 * Copy is Hermes-editable via the site-content store (useSiteContent).
 */

const tools = [
  {
    step: '01',
    title: 'Niche Discovery',
    description: 'Find a profitable, low-competition niche in one search.',
    cta: { label: 'Find a niche →', href: '/tool/niche', variant: 'primary' },
  },
  {
    step: '02',
    title: 'Trend Scanner',
    description: 'Spot rising demand before it gets crowded.',
    cta: { label: 'Scan trends →', href: '/tool/trends', variant: 'secondary' },
  },
  {
    step: '03',
    title: 'Niche Scorecard',
    description: 'Validate an idea in minutes before you invest time.',
    cta: { label: 'Score my niche →', href: '/tool/scorecard', variant: 'primary' },
  },
  {
    step: '04',
    title: 'Roadmap Generator',
    description: 'Get a personalized build order for your first asset.',
    cta: { label: 'Build a roadmap →', href: '/tool/roadmap', variant: 'secondary' },
  },
  {
    step: '05',
    title: 'Product Builder',
    description: 'Turn expertise into a sellable digital product.',
    cta: { label: 'Build a product →', href: '/tool/product', variant: 'primary' },
  },
  {
    step: '06',
    title: 'Social & Automations',
    description: 'Publish, follow up, and measure on autopilot.',
    cta: { label: 'Automate it →', href: '/tool/social', variant: 'secondary' },
  },
];

const caseSteps = [
  ['Pick', 'Choose a niche with real demand.'],
  ['Score', 'Validate it before you build.'],
  ['Plan', 'Get an exact build order.'],
  ['Automate', 'Set it to run while you sleep.'],
];

const primaryBtn = {
  border: '1px solid #111',
  borderRadius: 0,
  background: theme.colors.orange,
  color: theme.colors.textPrimary,
  padding: '14px 20px',
  cursor: 'pointer',
  fontFamily: theme.fonts.body,
};

export default function Home() {
  const content = useSiteContent();
  const [optin, setOptin] = useState({ email: '', status: 'idle' });

  const handleOptin = async (e) => {
    e.preventDefault();
    if (!optin.email.trim()) return;
    setOptin((s) => ({ ...s, status: 'submitting' }));
    try {
      await callSupabaseEdge('subscribe', {
        name: '',
        email: optin.email.trim(),
        source: 'launcher-cta',
        tags: ['website-signup'],
      });
      setOptin({ email: '', status: 'success' });
    } catch {
      setOptin((s) => ({ ...s, status: 'error' }));
    }
  };

  return (
    <div id="top">
      {/* ——— HERO ——— */}
      <DDHero
        label={content['home.heroEyebrow']}
        title={content['home.heroHeadline']}
        tagline={content['home.heroTagline']}
        ctas={[
          { label: 'Find Your Superpower →', href: '/quiz?start=true', variant: 'primary' },
          { label: 'See the Tools', href: '#tools', variant: 'outline' },
        ]}
      />
{/* ——— TOOLS ——— */}
      <DDSection
        id="tools"
        eyebrow="Free AI Tools"
        title="One tool per decision. Zero overwhelm."
        intro="Pick a tool. Get a clear next step. Build one faceless digital asset at a time — no account, no fluff."
        rule="top"
      >
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: theme.spacing.gridGap }}>
          {tools.map((t) => <DDToolCard key={t.step} {...t} />)}
        </div>
      </DDSection>

      {/* ——— CASE STUDY ——— */}
      <DDSection
        id="case-study"
        eyebrow="Case Study"
        title="The 4-agent AI money machine."
        intro="Niche → Scorecard → Roadmap → Automation. Four focused agents that turn one good idea into a faceless asset you own."
        tone="white"
        rule="top"
      >
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: theme.spacing.gridGap, marginBottom: '1.5rem' }}>
          {caseSteps.map(([k, v]) => (
            <div key={k} style={{ border: `1px solid ${theme.colors.border}`, borderRadius: 0, padding: '1rem 1.25rem', background: theme.colors.panel }}>
              <DDLabel tone="orange">{k}</DDLabel>
              <p style={{ margin: '0.5rem 0 0', fontSize: '0.95rem', lineHeight: 1.6, color: theme.colors.textMuted }}>{v}</p>
            </div>
          ))}
        </div>
        <DDCTA label="See how it builds →" href="/tool/roadmap" variant="primary" />
      </DDSection>

      {/* ——— CTA — DASHBOARD + AI BUSINESS PARTNER ——— */}
      <DDSection
        id="launch"
        eyebrow="Your AI Business Partner"
        title="Plug in your numbers. Get a plan you can act on today."
        intro="The dashboard connects your live website analytics to an AI business partner that tells you what to build, fix, and double down on next."
        tone="dark"
        rule="top"
      >
        <div style={{ maxWidth: 560, margin: '0 0 1.5rem' }}>
          {optin.status === 'success' ? (
            <p style={{ margin: 0, fontSize: '1.05rem', color: theme.colors.success }}>
              You're in. Watch your inbox for your first step.
            </p>
          ) : (
            <form onSubmit={handleOptin} style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
              <input
                type="email"
                required
                value={optin.email}
                onChange={(e) => setOptin({ email: e.target.value, status: 'idle' })}
                placeholder="your@email.com"
                aria-label="Email address"
                style={{
                  flex: '1 1 200px', border: `1px solid ${theme.colors.border}`, borderRadius: 0,
                  background: '#fff', padding: '14px 20px', fontSize: '1rem', color: theme.colors.textPrimary,
                  fontFamily: theme.fonts.body,
                }}
              />
              <button type="submit" disabled={optin.status === 'submitting'} style={primaryBtn}>
                {optin.status === 'submitting' ? 'Joining…' : 'Get the Free Starter Kit →'}
              </button>
            </form>
          )}
          {optin.status === 'error' && <p style={{ color: theme.colors.red, fontSize: '0.9rem' }}>That didn't work — please try again.</p>}
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
          <DDCTA label="Open the AI Business Partner →" href="/dashboard" variant="secondary" />
          <DDCTA label="Take the Quiz First" href="/quiz?start=true" variant="outline" />
        </div>
      </DDSection>
    </div>
  );
}