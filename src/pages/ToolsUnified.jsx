import React, { useEffect, useState } from 'react';
import { fetchPersonalization } from '../lib/personalization';
import FadeInSection from '../components/FadeInSection';
import { brutalCard, brutalHeading } from '../config/theme';
import { callAgent } from '../lib/buzz-agents';

const tools = [
  { step: '01', title: 'Digital Superpower Quiz', description: 'Answer seven questions to discover how you naturally create value. Your result determines which asset type fits your personality and schedule.', href: '/quiz?start=true', cta: 'Start the Quiz', agent: 'quiz', note: 'Start here if you are not sure where to begin.' },
  { step: '02', title: 'Retirement Gap Calculator', description: 'Enter your current savings and retirement goals. See exactly how much income you need from digital assets to close your gap.', href: '/gap', cta: 'Calculate My Gap', agent: 'wealth' },
  { step: '03', title: 'Freedom Number Calculator', description: 'Set your monthly target. Model how many assets at what yield covers your gap. See the path from anxiety to plan.', href: '/freedom', cta: 'Model My Freedom Number', agent: 'wealth' },
  { step: '04', title: 'Niche & ROI Tools', description: 'Score a niche idea for viability, then model the revenue potential with the 10X ROI Calculator for rank-and-rent properties.', href: '/tools/scorecard', cta: 'Validate My Idea', agent: 'scorecard', subLinks: [ { href: '/tools/scorecard', label: 'Niche Scorecard' }, { href: '/roi', label: 'ROI Calculator' } ] },
];

export default function Tools() {
  const [personalization, setPersonalization] = useState(null);
  const [agentStatus, setAgentStatus] = useState({});

  useEffect(() => {
    let active = true;
    fetchPersonalization()
      .then((data) => { if (active) setPersonalization(data); })
      .catch(() => { if (active) setPersonalization(null); });
    return () => { active = false; };
  }, []);

  const handleAgentAsk = async (agentKey, question) => {
    setAgentStatus((prev) => ({ ...prev, [agentKey]: 'loading' }));
    try {
      await callAgent(agentKey, { question, context: 'tools-page' });
      setAgentStatus((prev) => ({ ...prev, [agentKey]: 'ready' }));
    } catch (err) {
      setAgentStatus((prev) => ({ ...prev, [agentKey]: 'error' }));
    }
  };

  return (
    <>
      <FadeInSection>
        <div style={{ maxWidth: 720, margin: '0 auto', textAlign: 'center' }}>
          <p className="section__eyebrow" style={{ color: theme.colors.orange, fontFamily: theme.fonts.heading, fontSize: '0.72rem', fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '0.5rem', display: 'block' }}>Tools</p>
          <h1 style={{ ...brutalHeading, fontSize: 'clamp(1.6rem, 3.2vw, 2.4rem)', marginBottom: '1rem' }}>Make the next decision with clearer numbers.</h1>
          <p className="hero__tagline" style={{ color: theme.colors.muted, fontFamily: theme.fonts.body }}>Use practical calculators and scorecards to find your starting point, validate an idea, and model an asset before you invest.</p>
          <div className="action-row"><DDCTA label="See the Tools →" href="#tool-library" variant="primary" /></div>
        </div>
      </FadeInSection>

      <FadeInSection delay={100}>
        <section className="story-section story-section--white" id="tool-library">
          <div className="story-heading">
            <DDLabel tone="orange">Know before you build</DDLabel>
            <h2 style={{ ...brutalHeading, fontSize: 'clamp(1.3rem, 2.6vw, 1.7rem)' }}>Follow the sequence. Or jump to what you need.</h2>
            <p style={{ color: theme.colors.muted, fontFamily: theme.fonts.body }}>No account is required. Step 01 is recommended for first-time visitors. The others assume you have already identified your gap or superpower.</p>
          </div>

          <div className="tools-grid">
            {tools.map(({ step, title, description, href, cta, note, subLinks, agent }) => (
              <article key={step} style={{ ...brutalCard, padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.75rem', transition: 'transform 0.2s ease, box-shadow 0.2s ease' }} onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '2px 2px 0px rgba(0,0,0,0.12)'; }} onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '1px 1px 0px rgba(0,0,0,0.08)'; }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <span style={{ fontWeight: 900, color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>{step}</span>
                  <div>
                    <h2 style={{ ...brutalHeading, fontSize: '1.15rem', margin: 0 }}>{title}</h2>
                    <p style={{ color: 'var(--color-text-muted)', lineHeight: 1.6, margin: 0 }}>{description}</p>
                    {note && <p style={{ margin: '0.4rem 0 0', color: '#F18B25', fontWeight: 700 }}>{note}</p>}
                    {subLinks && subLinks.length > 0 && (
                      <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem', flexWrap: 'wrap' }}>
                        {subLinks.map((link, idx) => (
                          <a key={idx} href={link.href} className="dd-link" style={{ fontSize: '0.9rem' }}>{link.label}</a>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', alignItems: 'center' }}>
                  <DDCTA label={cta + ' →'} href={href} variant="primary" />
                  <button type="button" style={{ ...brutalButtonOutline, padding: '0.5rem 1rem', fontSize: '0.8rem' }} disabled={agentStatus[agent] === 'loading'} onClick={() => handleAgentAsk(agent, `Help me with ${title}`)}>
                    {agentStatus[agent] === 'loading' ? 'Asking agent…' : 'Ask the agent'}
                  </button>
                  {agentStatus[agent] === 'ready' && <span style={{ color: theme.colors.success, fontWeight: 700, fontFamily: theme.fonts.body }}>Agent suggestion ready</span>}
                  {agentStatus[agent] === 'error' && <span style={{ color: theme.colors.darkRed, fontWeight: 700, fontFamily: theme.fonts.body }}>Agent temporarily unavailable</span>}
                </div>
              </article>
            ))}
          </div>

          <div className="tools-footer">
            {personalization && (
              <div style={{ ...brutalCard, padding: '1.25rem', marginBottom: '1rem' }}>
                <h3 style={{ ...brutalHeading, fontSize: '1.05rem', marginBottom: '0.5rem' }}>Recommended for you</h3>
                <p style={{ margin: 0, color: theme.colors.muted, lineHeight: 1.6, fontFamily: theme.fonts.body }}>{personalization.nicheSuggestion}{personalization.assetSuggestions?.length > 0 ? `: ${personalization.assetSuggestions[0]}` : ''}</p>
                {personalization.homepageRecommendations?.[0] && <p style={{ margin: '0.5rem 0 0', color: theme.colors.muted, lineHeight: 1.6, fontFamily: theme.fonts.body }}>{personalization.homepageRecommendations[0]}</p>}
              </div>
            )}
            <p>Not sure which tool to use? <a href="/quiz?start=true" className="dd-link" style={{ fontFamily: theme.fonts.body }}>Take the quiz first</a> — it tells you exactly where to start based on how you think.</p>
          </div>
        </section>
      </FadeInSection>
    </>
  );
}
