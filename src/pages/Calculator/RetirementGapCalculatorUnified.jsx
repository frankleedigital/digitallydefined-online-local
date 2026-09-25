import React, { useState, useEffect, useRef } from 'react';
import FadeInSection from '../../components/FadeInSection';
import DDCTA from '../../components/ui/DDCTA';
import DDLabel from '../../components/ui/DDLabel';
import DDCard from '../../components/ui/DDCard';
import { brutalCard, brutalHeading, brutalButtonPrimary, brutalButtonOutline, theme } from '../../config/theme';
import { callAgent } from '../../lib/buzz-agents';

const fmt = (n) => {
  if (n >= 1000000) return `$${(n / 1000000).toFixed(1)}M`;
  if (n >= 1000) return `$${(n / 1000).toFixed(0)}k`;
  return `$${n.toLocaleString()}`;
};

const ASSET_TYPES = [
  { id: 'templates', name: 'Template Hubs & Printables', icon: 'M', minYield: 50, maxYield: 2000, defaultYield: 500, color: '#F18B25' },
  { id: 'newsletters', name: 'Paid Newsletters', icon: 'E', minYield: 500, maxYield: 5000, defaultYield: 1500, color: '#47B7D4' },
  { id: 'youtube', name: 'YouTube Automation', icon: 'P', minYield: 300, maxYield: 8000, defaultYield: 1000, color: '#2D3748' },
  { id: 'rankandrent', name: 'Rank & Rent Sites', icon: 'R', minYield: 500, maxYield: 5000, defaultYield: 1500, color: 'var(--color-text)' },
  { id: 'digitalproducts', name: 'Digital Products', icon: 'D', minYield: 100, maxYield: 3000, defaultYield: 500, color: '#F18B25' },
];

function computeResult(formData, assets, multiplier) {
  const { currentAge, retireAge, currentSavings, monthlyContribution, annualReturn, desiredIncome, socialSecurity, swr } = formData;
  const yearsToRetire = Math.max(retireAge - currentAge, 1);
  const rate = annualReturn / 100;
  const needFromPortfolio = Math.max(0, desiredIncome - socialSecurity);
  const targetNestEgg = swr > 0 ? needFromPortfolio / (swr / 100) : 0;
  const futureSavings = currentSavings * Math.pow(1 + rate, yearsToRetire);
  const m = rate / 12;
  const periods = yearsToRetire * 12;
  const futureContributions = m === 0 ? monthlyContribution * periods : monthlyContribution * ((Math.pow(1 + m, periods) - 1) / m);
  const totalAtRetirement = futureSavings + futureContributions;
  const gap = Math.max(0, targetNestEgg - totalAtRetirement);
  const divisor = (Math.pow(1 + rate / 12, yearsToRetire * 12) - 1) / (rate / 12);
  const monthlyNeededToClose = gap > 0 && divisor > 0 ? gap / divisor : 0;
  const totalMonthlyIncome = Object.values(assets).reduce((sum, a) => sum + (a.qty * a.yield), 0);
  const liquidationValue = totalMonthlyIncome * multiplier;
  const traditional12m = 12000;
  const traditional24m = 24000;
  const digital12m = (totalMonthlyIncome * 12) + (totalMonthlyIncome * multiplier * 0.5);
  const digital24m = (totalMonthlyIncome * 24) + liquidationValue;
  const isOnTrack = gap === 0;
  const gapPercent = targetNestEgg > 0 ? Math.round((gap / targetNestEgg) * 100) : 0;
  return { needFromPortfolio, targetNestEgg, totalAtRetirement, gap, monthlyNeededToClose, yearsToRetire, traditional12m, traditional24m, digital12m, digital24m, isOnTrack, gapPercent, totalMonthlyIncome, liquidationValue };
}

export default function RetirementGapCalculator() {
  const calculatorRef = useRef(null);
  const [formData, setFormData] = useState({ currentAge: 52, retireAge: 67, currentSavings: 120000, monthlyContribution: 600, annualReturn: 6, desiredIncome: 55000, socialSecurity: 24000, swr: 4 });
  const [assets, setAssets] = useState({ templates: { qty: 2, yield: 500 }, newsletters: { qty: 1, yield: 1500 }, youtube: { qty: 0, yield: 1000 }, rankandrent: { qty: 0, yield: 1500 }, digitalproducts: { qty: 1, yield: 500 } });
  const [multiplier, setMultiplier] = useState(35);
  const [agentResult, setAgentResult] = useState(null);
  const [agentLoading, setAgentLoading] = useState(false);

  const result = computeResult(formData, assets, multiplier);
  const handleChange = (key, value) => setFormData((prev) => ({ ...prev, [key]: value }));
  const handleAssetChange = (id, field, value) => setAssets((prev) => ({ ...prev, [id]: { ...prev[id], [field]: Number(value) } }));
  const handleMultiplier = (value) => setMultiplier(Number(value));

  useEffect(() => {
    if (calculatorRef.current) calculatorRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  const askAgent = async () => {
    setAgentLoading(true);
    setAgentResult(null);
    try {
      const response = await callAgent('wealth', { context: 'retirement-gap', formData, assets, result });
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
          <DDLabel tone="blue">Retirement Gap Calculator</DDLabel>
          <h1 style={{ ...brutalHeading, fontSize: 'clamp(1.6rem, 3.2vw, 2.4rem)', marginBottom: '1rem' }}>How Big Is Your Retirement Gap?</h1>
          <p className="hero__tagline" style={{ color: theme.colors.muted, fontFamily: theme.fonts.body }}>Gen X women retire with less than men. Calculate your gap and see how faceless digital assets can close it — in years, not decades.</p>
          <div className="action-row"><DDCTA label="Calculate My Gap →" href="#gap-calculator" variant="primary" /></div>
        </section>
      </FadeInSection>

      <FadeInSection delay={100}>
        <section className="section" id="gap-calculator" ref={calculatorRef}>
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            <div style={{ ...brutalCard, padding: '1.25rem', marginBottom: '1.25rem' }}>
              <DDLabel tone="orange" style={{ marginBottom: '0.5rem', display: 'inline-block' }}>Start Here</DDLabel>
              <h2 style={{ ...brutalHeading, fontSize: 'clamp(1.2rem, 2.4vw, 1.5rem)', margin: '0.5rem 0' }}>Your Retirement Gap Isn&rsquo;t a Judgment &mdash; It&rsquo;s a Starting Point.</h2>
              <p style={{ color: theme.colors.muted, lineHeight: 1.7, fontFamily: theme.fonts.body }}>This page isn&rsquo;t about judgment. It&rsquo;s about clarity — and clarity is power.</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
              <div style={{ ...brutalCard, padding: '1.25rem' }}>
                <DDLabel tone="blue" style={{ marginBottom: '0.75rem', display: 'inline-block' }}>01 / Your Numbers</DDLabel>
                <div style={{ display: 'grid', gap: '1rem' }}>
                  {Object.entries(formData).map(([key, value]) => (
                    <div key={key}>
                      <label className="form-label" style={{ fontFamily: theme.fonts.body }}>{key}</label>
                      <input className="form-input dd-input" type="number" value={value} onChange={(e) => handleChange(key, Number(e.target.value))} style={{ fontFamily: theme.fonts.body }} />
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ ...brutalCard, padding: '1.25rem', background: theme.colors.panel }}>
                <DDLabel tone="orange" style={{ marginBottom: '0.75rem', display: 'inline-block' }}>Live Results</DDLabel>
                <div style={{ marginBottom: '1rem' }}>
                  <div style={{ fontSize: '0.8rem', color: theme.colors.muted, textTransform: 'uppercase', fontFamily: theme.fonts.body }}>Retirement Gap</div>
                  <div style={{ fontSize: '2rem', fontWeight: 900, color: result.isOnTrack ? theme.colors.success : theme.colors.textPrimary, fontFamily: theme.fonts.heading }}>{result.isOnTrack ? '✓ ON TRACK' : fmt(result.gap)}</div>
                  <div style={{ fontSize: '0.9rem', color: theme.colors.muted, fontFamily: theme.fonts.body }}>{result.isOnTrack ? 'You have enough to retire!' : `Shortfall by age ${formData.retireAge}`}</div>
                </div>
                <div style={{ display: 'grid', gap: '0.75rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(0,0,0,0.08)', paddingBottom: '0.5rem' }}>
                    <span style={{ fontFamily: theme.fonts.body }}>Target Nest Egg</span>
                    <strong style={{ fontFamily: theme.fonts.heading }}>{fmt(result.targetNestEgg)}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(0,0,0,0.08)', paddingBottom: '0.5rem' }}>
                    <span style={{ fontFamily: theme.fonts.body }}>Projected at Retirement</span>
                    <strong style={{ fontFamily: theme.fonts.heading }}>{fmt(result.totalAtRetirement)}</strong>
                  </div>
                </div>
                {!result.isOnTrack && (
                  <div style={{ marginTop: '1rem', ...brutalCard, padding: '1rem', borderLeft: `4px solid ${theme.colors.orange}` }}>
                    <strong style={{ fontFamily: theme.fonts.body }}>To Close the Gap:</strong>
                    <div style={{ color: theme.colors.muted, lineHeight: 1.6, fontFamily: theme.fonts.body }}>You need <strong>{fmt(result.monthlyNeededToClose)}/mo</strong> more in contributions, OR build digital assets generating <strong>{fmt(result.monthlyNeededToClose * 12)}/year</strong> in passive income.</div>
                  </div>
                )}
              </div>
            </div>

            <div style={{ marginTop: '1.25rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
              <div style={{ ...brutalCard, padding: '1.25rem' }}>
                <DDLabel tone="blue" style={{ marginBottom: '0.75rem', display: 'inline-block' }}>24-Month Comparison</DDLabel>
                <div style={{ display: 'grid', gap: '0.75rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(0,0,0,0.08)', paddingBottom: '0.5rem' }}>
                    <span style={{ fontFamily: theme.fonts.body }}>Traditional Savings</span>
                    <strong style={{ fontFamily: theme.fonts.heading }}>{fmt(result.traditional24m)}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(0,0,0,0.08)', paddingBottom: '0.5rem' }}>
                    <span style={{ fontFamily: theme.fonts.body }}>Digital Assets (Projected)</span>
                    <strong style={{ color: theme.colors.aquaBlue, fontFamily: theme.fonts.heading }}>{fmt(result.digital24m)}</strong>
                  </div>
                </div>
              </div>
              <div style={{ ...brutalCard, padding: '1.25rem' }}>
                <DDLabel tone="orange" style={{ marginBottom: '0.75rem', display: 'inline-block' }}>Next Steps</DDLabel>
                <div style={{ display: 'grid', gap: '0.75rem' }}>
                  <DDCTA label="Take the Digital Superpower Quiz →" href="/quiz?start=true" variant="primary" />
                  <DDCTA label="Score a Niche Idea →" href="/tools/scorecard" variant="outline" />
                  <button type="button" style={{ ...brutalButtonOutline, padding: '0.5rem 1rem', fontSize: '0.8rem', fontFamily: theme.fonts.body }} disabled={agentLoading} onClick={askAgent}>{agentLoading ? 'Asking agent…' : 'Ask Hermes for a gap plan'}</button>
                </div>
                {agentResult && <div style={{ marginTop: '1rem', ...brutalCard, padding: '1rem', fontFamily: theme.fonts.body }}>{typeof agentResult === 'string' ? agentResult : JSON.stringify(agentResult, null, 2)}</div>}
              </div>
            </div>
          </div>
        </section>
      </FadeInSection>
    </>
  );
}
