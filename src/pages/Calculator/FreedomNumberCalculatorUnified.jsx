import React, { useState, useEffect } from 'react';
import FadeInSection from '../../components/FadeInSection';
import DDCTA from '../../components/ui/DDCTA';
import DDLabel from '../../components/ui/DDLabel';
import { brutalCard, brutalHeading, brutalButtonPrimary, brutalButtonOutline, brutalBorder, theme } from '../../config/theme';
import { useToolState } from '../../context/ToolStateContext.jsx';
import { callAgent } from '../../lib/buzz-agents';

const money = (value) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(value);

const ASSETS = [
  { id: 'templates', name: 'Template Hubs / Printables', range: '$50 - $2,000/mo', min: 50, max: 2000, step: 50, tone: 'orange', icon: 'T' },
  { id: 'newsletters', name: 'Paid Newsletters (Mid-Tier)', range: '$2,000 - $10,000/mo', min: 2000, max: 10000, step: 250, tone: 'blue', icon: 'N' },
  { id: 'youtube', name: 'YouTube Automation', range: '$500 - $10,000/mo', min: 500, max: 10000, step: 250, tone: 'slate', icon: 'Y' },
];

export default function FreedomNumberCalculator() {
  const { updateToolState } = useToolState();
  const [freedomGoal, setFreedomGoal] = useState(5000);
  const [multiplier, setMultiplier] = useState(35);
  const [assets, setAssets] = useState({ templates: { qty: 2, yield: 1000 }, newsletters: { qty: 1, yield: 4500 }, youtube: { qty: 0, yield: 3000 } });
  const [agentResult, setAgentResult] = useState(null);
  const [agentLoading, setAgentLoading] = useState(false);

  const totalMonthlyIncome = Object.values(assets).reduce((total, asset) => total + asset.qty * asset.yield, 0);
  const liquidationValue = totalMonthlyIncome * multiplier;
  const gap = Math.max(freedomGoal - totalMonthlyIncome, 0);
  const goalMet = totalMonthlyIncome >= freedomGoal;
  const digital12m = totalMonthlyIncome * 12 * 0.55 + totalMonthlyIncome * multiplier * 0.8;
  const digital24m = totalMonthlyIncome * 24 * 0.8 + liquidationValue;
  const chartMax = Math.max(24000, digital12m, digital24m);
  const barHeight = (value) => `${Math.max(4, (value / chartMax) * 100)}%`;

  const updateAsset = (id, field, value) => setAssets((current) => ({ ...current, [id]: { ...current[id], [field]: Number(value) } }));

  useEffect(() => {
    const assetCount = Object.values(assets).reduce((n, a) => n + a.qty, 0);
    updateToolState({ monthlyGoal: freedomGoal, totalMonthlyIncome, assetCount, yieldPerAsset: assetCount > 0 ? Math.round(totalMonthlyIncome / assetCount) : 0, hasCalculated: totalMonthlyIncome > 0, goalMet, gap });
  }, [totalMonthlyIncome, freedomGoal, gap, goalMet, assets, updateToolState]);

  const askAgent = async () => {
    setAgentLoading(true);
    setAgentResult(null);
    try {
      const response = await callAgent('wealth', { context: 'freedom-number', assets, goal: freedomGoal });
      setAgentResult(response.data || response);
    } catch (err) {
      setAgentResult('Agent unavailable right now.');
    } finally {
      setAgentLoading(false);
    }
  };

  return (
    <>
      <FadeInSection>
        <section className="page-hero">
          <DDLabel tone="blue">Close The Retirement Gap</DDLabel>
          <h1 style={{ ...brutalHeading, fontSize: 'clamp(1.6rem, 3.2vw, 2.4rem)', marginBottom: '1rem' }}>Calculate Your <span style={{ color: theme.colors.orange }}>Freedom Number</span></h1>
          <p className="hero__tagline" style={{ color: theme.colors.muted, fontFamily: theme.fonts.body }}>Discover how faceless digital real estate can help Gen X women build predictable income, close the retirement gap, and create assets their families can inherit.</p>
          <div className="action-row"><DDCTA label="Calculate My Freedom Number →" href="#calculator-section" variant="primary" /></div>
        </section>
      </FadeInSection>

      <FadeInSection delay={100}>
        <section className="section" id="calculator-section">
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
              <div style={{ ...brutalCard, padding: '1.25rem' }}>
                <DDLabel tone="orange" style={{ marginBottom: '0.75rem', display: 'inline-block' }}>01 / Your Target</DDLabel>
                <h2 style={{ ...brutalHeading, fontSize: '1.15rem', marginBottom: '0.75rem' }}>Monthly Freedom Goal</h2>
                <div style={{ marginBottom: '1rem' }}>
                  <output style={{ fontSize: '1.6rem', fontWeight: 900, fontFamily: theme.fonts.heading }}>{money(freedomGoal)}</output>
                </div>
                <input type="range" min="2000" max="25000" step="500" value={freedomGoal} onChange={(event) => setFreedomGoal(Number(event.target.value))} style={{ width: '100%', accentColor: theme.colors.orange }} />
              </div>

              <div style={{ ...brutalCard, padding: '1.25rem', background: theme.colors.panel }}>
                <DDLabel tone="blue" style={{ marginBottom: '0.75rem', display: 'inline-block' }}>02 / Asset Mix</DDLabel>
                <h2 style={{ ...brutalHeading, fontSize: '1.15rem', marginBottom: '0.75rem' }}>Your Digital Real Estate Mix</h2>
                <div style={{ display: 'grid', gap: '1rem' }}>
                  {ASSETS.map((asset) => (
                    <div key={asset.id} style={{ ...brutalCard, padding: '1rem', border: '1px solid rgba(0,0,0,0.08)' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                        <strong style={{ fontFamily: theme.fonts.body }}>{asset.name}</strong>
                        <span style={{ color: theme.colors.muted, fontSize: '0.85rem', fontFamily: theme.fonts.body }}>{asset.range}</span>
                      </div>
                      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                        <label style={{ fontSize: '0.85rem', fontFamily: theme.fonts.body }}>Qty</label>
                        <input className="form-input dd-input" type="number" min="0" max="10" value={assets[asset.id].qty} onChange={(event) => updateAsset(asset.id, 'qty', event.target.value)} style={{ fontFamily: theme.fonts.body }} />
                        <label style={{ fontSize: '0.85rem', fontFamily: theme.fonts.body }}>Yield</label>
                        <input className="form-input dd-input" type="number" min={asset.min} max={asset.max} step={asset.step} value={assets[asset.id].yield} onChange={(event) => updateAsset(asset.id, 'yield', event.target.value)} style={{ fontFamily: theme.fonts.body }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div style={{ marginTop: '1.25rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
              <div style={{ ...brutalCard, padding: '1.25rem' }}>
                <DDLabel tone="orange" style={{ marginBottom: '0.75rem', display: 'inline-block' }}>03 / Outcome</DDLabel>
                <h2 style={{ ...brutalHeading, fontSize: '1.15rem', marginBottom: '0.75rem' }}>Projected Portfolio Income</h2>
                <div style={{ fontSize: '2rem', fontWeight: 900, marginBottom: '0.5rem', fontFamily: theme.fonts.heading }}>{money(totalMonthlyIncome)}</div>
                <div style={{ color: goalMet ? theme.colors.success : theme.colors.darkRed, fontWeight: 700, fontFamily: theme.fonts.body }}>{goalMet ? '✓ Goal Achieved' : `Gap: ${money(gap)}/mo`}</div>
              </div>

              <div style={{ ...brutalCard, padding: '1.25rem' }}>
                <DDLabel tone="blue" style={{ marginBottom: '0.75rem', display: 'inline-block' }}>24-Month Projection</DDLabel>
                <div style={{ display: 'grid', gap: '0.75rem' }}>
                  <div>
                    <div style={{ fontSize: '0.8rem', color: theme.colors.muted, textTransform: 'uppercase', fontFamily: theme.fonts.body }}>Traditional Savings</div>
                    <div style={{ height: 10, background: '#e5e5e5', border: brutalBorder, marginTop: '0.25rem' }}>
                      <div style={{ height: '100%', width: `${Math.min(100, (24000 / chartMax) * 100)}%`, background: theme.colors.darkRed, fontFamily: theme.fonts.heading }} />
                    </div>
                    <div style={{ fontSize: '0.9rem', fontWeight: 700, fontFamily: theme.fonts.body }}>{money(24000)}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.8rem', color: theme.colors.muted, textTransform: 'uppercase', fontFamily: theme.fonts.body }}>Digital Assets</div>
                    <div style={{ height: 10, background: '#e5e5e5', border: brutalBorder, marginTop: '0.25rem' }}>
                      <div style={{ height: '100%', width: `${Math.min(100, (digital24m / chartMax) * 100)}%`, background: theme.colors.aquaBlue, fontFamily: theme.fonts.heading }} />
                    </div>
                    <div style={{ fontSize: '0.9rem', fontWeight: 700, color: theme.colors.aquaBlue, fontFamily: theme.fonts.body }}>{money(digital24m)}</div>
                  </div>
                </div>
                <button type="button" style={{ ...brutalButtonOutline, width: '100%', marginTop: '1rem', padding: '0.5rem 1rem', fontFamily: theme.fonts.body }} disabled={agentLoading} onClick={askAgent}>{agentLoading ? 'Asking agent…' : 'Ask Hermes to improve this plan'}</button>
                {agentResult && <div style={{ marginTop: '1rem', ...brutalCard, padding: '1rem', fontFamily: theme.fonts.body }}>{typeof agentResult === 'string' ? agentResult : JSON.stringify(agentResult, null, 2)}</div>}
              </div>
            </div>
          </div>
        </section>
      </FadeInSection>
    </>
  );
}
