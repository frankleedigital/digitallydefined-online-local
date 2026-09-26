import React, { useState, useEffect, useRef } from 'react';
import { useToolState } from '../../context/ToolStateContext.jsx';
import './RetirementGapCalculator.css';

// === Retirement Gap Calculator ===
// Gen X Retirement Gap Solver — faceless digital real estate path

const fmt = (n) => {
  if (n >= 1000000) return `$${(n / 1000000).toFixed(1)}M`;
  if (n >= 1000) return `$${(n / 1000).toFixed(0)}k`;
  return `$${n.toLocaleString()}`;
};

// Future Value of Lump Sum
const fvLump = (principal, rate, years) => principal * Math.pow(1 + rate, years);

// Future Value of Monthly Series
const fvSeries = (monthly, annualRate, years) => {
  const m = annualRate / 12;
  const periods = years * 12;
  if (m === 0) return monthly * periods;
  return monthly * ((Math.pow(1 + m, periods) - 1) / m);
};

const ASSET_TYPES = [
  { id: 'templates', name: 'Template Hubs & Printables', icon: '📋', minYield: 50, maxYield: 2000, defaultYield: 500, color: '#F18B25' },
  { id: 'newsletters', name: 'Paid Newsletters', icon: '✉️', minYield: 500, maxYield: 5000, defaultYield: 1500, color: '#47B7D4' },
  { id: 'youtube', name: 'YouTube Automation', icon: '🎬', minYield: 300, maxYield: 8000, defaultYield: 1000, color: '#2D3748' },
  { id: 'rankandrent', name: 'Rank & Rent Sites', icon: 'H', minYield: 500, maxYield: 5000, defaultYield: 1500, color: 'var(--color-text)' },
  { id: 'digitalproducts', name: 'Digital Products', icon: '📦', minYield: 100, maxYield: 3000, defaultYield: 500, color: '#F18B25' },
];

// Derive the complete result set from the current inputs (live updates)
function computeResult(formData, assets, multiplier) {
  const {
    currentAge, retireAge, currentSavings, monthlyContribution,
    annualReturn, desiredIncome, socialSecurity, swr,
  } = formData;

  const yearsToRetire = Math.max(retireAge - currentAge, 1);
  const rate = annualReturn / 100;

  const needFromPortfolio = Math.max(0, desiredIncome - socialSecurity);
  const targetNestEgg = swr > 0 ? needFromPortfolio / (swr / 100) : 0;

  const futureSavings = fvLump(currentSavings, rate, yearsToRetire);
  const futureContributions = fvSeries(monthlyContribution, rate, yearsToRetire);
  const totalAtRetirement = futureSavings + futureContributions;

  const gap = Math.max(0, targetNestEgg - totalAtRetirement);
  const divisor = (Math.pow(1 + rate / 12, yearsToRetire * 12) - 1) / (rate / 12);
  const monthlyNeededToClose = gap > 0 && divisor > 0 ? gap / divisor : 0;

  const totalMonthlyIncome = Object.values(assets).reduce((sum, a) => sum + (a.qty * a.yield), 0);
  const liquidationValue = totalMonthlyIncome * multiplier;

  const traditional12m = 12000; // ~$1k/mo savings
  const traditional24m = 24000;
  const digital12m = (totalMonthlyIncome * 12) + (totalMonthlyIncome * multiplier * 0.5);
  const digital24m = (totalMonthlyIncome * 24) + liquidationValue;

  const isOnTrack = gap === 0;
  const gapPercent = targetNestEgg > 0 ? Math.round((gap / targetNestEgg) * 100) : 0;

  return {
    needFromPortfolio, targetNestEgg, totalAtRetirement, gap, monthlyNeededToClose,
    yearsToRetire, traditional12m, traditional24m, digital12m, digital24m,
    isOnTrack, gapPercent, totalMonthlyIncome, liquidationValue,
  };
}

export default function RetirementGapCalculator() {
  const calculatorRef = useRef(null);
  const interactedRef = useRef(false);
  const { updateToolState } = useToolState();

  const [formData, setFormData] = useState({
    currentAge: 52,
    retireAge: 67,
    currentSavings: 120000,
    monthlyContribution: 600,
    annualReturn: 6,
    desiredIncome: 55000,
    socialSecurity: 24000,
    swr: 4,
  });

  const [assets, setAssets] = useState({
    templates: { qty: 2, yield: 500 },
    newsletters: { qty: 1, yield: 1500 },
    youtube: { qty: 0, yield: 1000 },
    rankandrent: { qty: 0, yield: 1500 },
    digitalproducts: { qty: 1, yield: 500 },
  });

  const [multiplier, setMultiplier] = useState(35);

  // Live result — recomputed on every render from current inputs
  const result = computeResult(formData, assets, multiplier);

  const markInteracted = () => { interactedRef.current = true; };

  const handleChange = (key, value) => {
    markInteracted();
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const handleAssetChange = (id, field, value) => {
    markInteracted();
    setAssets(prev => ({ ...prev, [id]: { ...prev[id], [field]: Number(value) } }));
  };

  const handleMultiplier = (value) => {
    markInteracted();
    setMultiplier(Number(value));
  };

  // Auto-scroll to calculator on mount
  useEffect(() => {
    if (calculatorRef.current) {
      calculatorRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  // Publish live results to Hermes after the user first interacts
  // (avoids auto-opening Hermes on page load)
  useEffect(() => {
    if (!interactedRef.current) return;
    updateToolState({
      hasCalculated: true,
      gapAmount: Math.round(result.gap / (Math.max(formData.retireAge - formData.currentAge, 1) * 12)) || 0,
      desiredIncome: Math.round(formData.desiredIncome / 12),
      currentSavings: formData.currentSavings,
      yearsToRetirement: Math.max(formData.retireAge - formData.currentAge, 1),
      totalMonthlyIncome: result.totalMonthlyIncome,
      monthlyNeededToClose: Math.round(result.monthlyNeededToClose),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result.gap, result.totalMonthlyIncome, result.monthlyNeededToClose, formData]);
return (
    <main className="gap-page">
      {/* Hero */}
      <section className="gap-hero">
        <div className="gap-hero__inner">
          <p className="section__eyebrow">Retirement Gap Calculator</p>
          <h1>How Big Is Your Retirement Gap?</h1>
          <p className="hero__tagline">
            Gen X women retire with 35% less than men. Calculate your gap and see how faceless digital assets close it — in years, not decades.
          </p>
          <div className="action-row"><a href="#gap-calculator" className="btn btn--primary">Calculate My Gap →</a></div>
        </div>
      </section>

      {/* Calculator */}
      <section className="gap-workspace" id="gap-calculator" ref={calculatorRef}>
        {/* Intro card — centered, thin black frame */}
        <div className="gap-intro-card">
          <span className="gap-intro-card__eyebrow">Start Here</span>
          <h2 className="gap-intro-card__title">Your Retirement Gap Isn&rsquo;t a Judgment &mdash; It&rsquo;s a Starting Point.</h2>

          <div className="gap-intro-card__cols">
            <div className="gap-intro-card__col">
              <h3>What To Do Here</h3>
              <ol>
                <li>Enter your desired income</li>
                <li>Add your current savings</li>
                <li>Set years left to work</li>
                <li>See your monthly gap</li>
              </ol>
            </div>
            <div className="gap-intro-card__col">
              <h3>What Happens Next</h3>
              <p>Hermes turns your gap into a realistic digital asset plan, a first step you can take today, and a path that fits your time and strengths.</p>
            </div>
          </div>

          <p className="gap-intro-card__closing">This page isn&rsquo;t about judgment. It&rsquo;s about clarity &mdash; and clarity is power.</p>
        </div>

        {/* Two-column grid: inputs (left) + live results (right) */}
        <div className="gap-grid">
          {/* Left — Calculator Inputs */}
          <div className="gap-inputs-card">
            <article className="gap-card">
              <header className="gap-card__heading">
                <span className="gap-step">01</span>
                <div>
                  <h2>Enter Your Numbers</h2>
                  <p>Fill in your details below. Your results update instantly in the panel to the right.</p>
                </div>
              </header>
<div className="gap-form-grid">
                <div>
                  <label className="form-label">Current Age</label>
                  <input type="number" value={formData.currentAge} onChange={e => handleChange('currentAge', e.target.value)} className="form-input" />
                </div>
                <div>
                  <label className="form-label">Retirement Age</label>
                  <input type="number" value={formData.retireAge} onChange={e => handleChange('retireAge', e.target.value)} className="form-input" />
                </div>
              </div>

              <div className="gap-form-grid">
                <div>
                  <label className="form-label">Current Savings</label>
                  <input type="number" value={formData.currentSavings} onChange={e => handleChange('currentSavings', e.target.value)} className="form-input" />
                </div>
                <div>
                  <label className="form-label">Monthly Contribution</label>
                  <input type="number" value={formData.monthlyContribution} onChange={e => handleChange('monthlyContribution', e.target.value)} className="form-input" />
                </div>
              </div>

              <div className="gap-form-grid">
                <div>
                  <label className="form-label">Annual Return (%)</label>
                  <input type="number" step="0.1" value={formData.annualReturn} onChange={e => handleChange('annualReturn', e.target.value)} className="form-input" />
                </div>
                <div>
                  <label className="form-label">Social Security / Yr</label>
                  <input type="number" value={formData.socialSecurity} onChange={e => handleChange('socialSecurity', e.target.value)} className="form-input" />
                </div>
              </div>

              <div className="gap-form-full">
                <label className="form-label">Desired Annual Retirement Income</label>
                <input type="number" value={formData.desiredIncome} onChange={e => handleChange('desiredIncome', e.target.value)} className="form-input" />
              </div>

              <h3 className="gap-section-title">Digital Asset Portfolio</h3>
              <div className="gap-assets">
                {ASSET_TYPES.map(asset => (
                  <div key={asset.id} className="gap-asset">
                    <div className="gap-asset__top">
                      <div className="gap-asset__name">
                        <span className="gap-asset-icon">{asset.icon}</span>
                        <strong>{asset.name}</strong>
                      </div>
                      <label>
                        Qty:
                        <input type="number" min="0" max="10" value={assets[asset.id].qty} onChange={e => handleAssetChange(asset.id, 'qty', e.target.value)} />
                      </label>
                    </div>
                    <div className="gap-asset-control">
                      <span>Monthly yield</span>
                      <output>{fmt(assets[asset.id].yield)}/mo</output>
                    </div>
                    <input
                      type="range"
                      min={asset.minYield}
                      max={asset.maxYield}
                      step={Math.ceil((asset.maxYield - asset.minYield) / 20)}
                      value={assets[asset.id].yield}
                      onChange={e => handleAssetChange(asset.id, 'yield', e.target.value)}
                    />
                  </div>
                ))}
              </div>
<div className="gap-total">
                <div>
                  <span>Total Monthly Income</span>
                  <strong>{fmt(result.totalMonthlyIncome)}</strong>
                </div>
                <div>
                  <span>Exit Value</span>
                  <strong>{fmt(result.liquidationValue)}</strong>
                </div>
              </div>

              {/* Exit multiplier */}
              <div className="gap-control">
                <div className="gap-control__label">
                  <label htmlFor="market-multiplier">Exit Strategy Multiplier</label>
                  <output>{multiplier}x</output>
                </div>
                <input
                  id="market-multiplier"
                  type="range"
                  className="range-slate"
                  min="30"
                  max="40"
                  step="1"
                  value={multiplier}
                  onChange={e => handleMultiplier(e.target.value)}
                />
                <div className="freedom-range-labels">
                  <span>30x Conservative</span>
                  <span>40x Premium</span>
                </div>
              </div>
            </article>
          </div>

          {/* Right — Results panel (sticky + scroll) */}
          <aside className="gap-results-panel">
            <article className="gap-card gap-results-card">
              <header className="gap-card__heading">
                <span className="gap-step gap-step--blue">Live</span>
                <div>
                  <h2>Your Results Will Appear Here</h2>
                  <p>Updates instantly as you adjust your numbers.</p>
                </div>
              </header>
<div className={`gap-result-block ${result.isOnTrack ? 'gap-result-block--ontrack' : 'gap-result-block--gap'}`}>
                <h3 className="gap-result-title">Your Retirement Gap</h3>
                <div className="gap-result-value">
                  <div className={`gap-value ${result.isOnTrack ? 'ontrack' : 'gap'}`}>
                    {result.isOnTrack ? '✓ ON TRACK' : fmt(result.gap)}
                  </div>
                  <div className="gap-label">
                    {result.isOnTrack ? 'You have enough to retire!' : `Shortfall by age ${formData.retireAge}`}
                  </div>
                </div>
                <div className="gap-result-grid">
                  <div className="gap-result-item">
                    <label>Target Nest Egg</label>
                    <div className="value">{fmt(result.targetNestEgg)}</div>
                  </div>
                  <div className="gap-result-item">
                    <label>Projected at Retirement</label>
                    <div className="value">{fmt(result.totalAtRetirement)}</div>
                  </div>
                </div>
                {!result.isOnTrack && (
                  <div className="gap-close-message">
                    <strong>To Close the Gap:</strong>
                    <div className="gap-close-message-content">
                      You need <strong>{fmt(result.monthlyNeededToClose)}/mo</strong> more in contributions, OR build digital assets generating <strong>{fmt(result.monthlyNeededToClose * 12)}/year</strong> in passive income.
                    </div>
                  </div>
                )}
              </div>

              <div className="gap-result-block gap-result-block--plain">
                <h3 className="gap-result-title">24-Month Comparison</h3>
                <div className="gap-comparison-item">
                  <div className="gap-comparison-header">
                    <span className="label">Traditional Savings</span>
                    <span className="value">{fmt(result.traditional24m)}</span>
                  </div>
                  <div className="gap-comparison-note">~$1k/mo saved over 2 years</div>
                </div>
                <div className="gap-comparison-item highlight">
                  <div className="gap-comparison-header">
                    <span className="label">Digital Assets (Projected)</span>
                    <span className="value highlight">{fmt(result.digital24m)}</span>
                  </div>
                  <div className="gap-comparison-note">With exit multiplier + cashflow</div>
                </div>
                {!result.isOnTrack && (
                  <div className="gap-win-message">
                    <strong>Digital Assets Win By:</strong>
                    <div className="gap-win-amount">{fmt(result.digital24m - result.traditional24m)}</div>
                    <div className="gap-win-note">That&rsquo;s {(result.digital24m / result.traditional24m).toFixed(0)}x more in 2 years.</div>
                  </div>
                )}
              </div>

              <div className="gap-result-block gap-result-block--plain">
                <h3 className="gap-result-title">What&rsquo;s Your Next Step?</h3>
                <div className="gap-cta-stack">
                  <a href="/quiz" className="btn btn--primary">Take the Digital Superpower Quiz →</a>
                  <a href="/scorecard" className="btn btn--outline">Score a Niche Idea →</a>
                  <a href="/tools" className="btn btn--outline">Explore the Free Tools →</a>
                </div>
              </div>
              <p className="gap-privacy">Your calculations stay in your browser. No data is stored or shared.</p>
            </article>
          </aside>
        </div>
{/* SEO text — below the calculator grid */}
        <section className="gap-seo">
          <h2>Why the Retirement Gap Matters for Gen X Women</h2>
          <p>
            Most Gen X women discover a gap between what they want in retirement and what traditional savings will actually provide.
            This calculator turns that fear into a number you can work with — a starting point for building predictable income through faceless digital real estate.
          </p>
          <p>
            Digital assets can be automated, scaled, and built around your strengths. The results above model how even a modest portfolio of digital products, newsletters, and automation can close a shortfall in years, not decades.
            This page is not about judgment. It&rsquo;s about clarity — and clarity is power.
          </p>
        </section>
      </section>

      {/* Final CTA */}
      <section className="section section--dark gap-final-cta">
        <div className="container container--narrow">
          <h2>Your Gap Is Real. Your Solution Is Too.</h2>
          <p>The retirement gap affects every Gen X woman. But digital assets are the great equalizer — faceless, automated, and built on your expertise.</p>
          <a href="/gap" className="btn btn--primary">Start the Build Path →</a>
        </div>
      </section>
    </main>
  );
}
