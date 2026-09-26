import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Calculator,
  ArrowRight,
  TrendingUp,
  Shield,
  Layers,
  Sparkles,
  AlertTriangle,
  CheckCircle2,
  DollarSign,
  Lock,
} from 'lucide-react';
import { setUserGapData } from '../../lib/userState';

export default function RetirementGapCalculatorUnified() {
  const [currentAge, setCurrentAge] = useState(52);
  const [retireAge, setRetireAge] = useState(67);
  const [currentSavings, setCurrentSavings] = useState(120000);
  const [monthlyContribution, setMonthlyContribution] = useState(600);
  const [desiredMonthly, setDesiredMonthly] = useState(5000);
  const [socialSecurityMonthly, setSocialSecurityMonthly] = useState(2000);
  const [annualReturn, setAnnualReturn] = useState(6);

  // Math
  const yearsToRetire = Math.max(1, retireAge - currentAge);
  const r = annualReturn / 100;
  const monthlyRate = r / 12;
  const totalMonths = yearsToRetire * 12;

  // Future value of current savings
  const fvSavings = currentSavings * Math.pow(1 + r, yearsToRetire);

  // Future value of monthly contributions
  const fvContributions =
    monthlyRate > 0
      ? monthlyContribution * ((Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate)
      : monthlyContribution * totalMonths;

  const totalAtRetirement = fvSavings + fvContributions;

  // Monthly deficit from portfolio (desired - SS)
  const monthlyNeededFromPortfolio = Math.max(0, desiredMonthly - socialSecurityMonthly);
  // 4% safe withdrawal rule (Target nest egg = Annual needed / 0.04 = Monthly needed * 300)
  const targetNestEgg = monthlyNeededFromPortfolio * 300;

  const gap = Math.max(0, targetNestEgg - totalAtRetirement);
  const isOnTrack = gap <= 0;

  // Assets required to replace monthly deficit
  const assetsRequired = Math.ceil(monthlyNeededFromPortfolio / 500);

  // Save to persistent userState
  useEffect(() => {
    setUserGapData({
      currentAge,
      retireAge,
      currentSavings,
      desiredMonthly,
      gap,
      isOnTrack,
      monthlyNeededFromPortfolio,
      assetsRequired,
    });
  }, [currentAge, retireAge, currentSavings, desiredMonthly, gap, isOnTrack, monthlyNeededFromPortfolio, assetsRequired]);

  const fmt = (n) => `$${Math.round(n).toLocaleString()}`;

  return (
    <div style={{ backgroundColor: '#FFFCF9', color: '#2D3748', minHeight: '100vh', paddingBottom: '5rem' }}>
      {/* 1. HERO */}
      <section
        style={{
          borderBottom: '2px solid #111111',
          backgroundColor: '#FFFFFF',
          padding: 'clamp(3rem, 6vw, 4.5rem) 1.25rem',
          textAlign: 'center',
        }}
      >
        <div style={{ maxWidth: '850px', margin: '0 auto' }}>
          <div style={{ display: 'inline-block', marginBottom: '1rem' }}>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                padding: '0.35rem 0.8rem',
                backgroundColor: '#FFFCF9',
                border: '2px solid #111111',
                fontFamily: "'Inter', system-ui, sans-serif",
                fontSize: '0.7rem',
                fontWeight: 900,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: '#111111',
              }}
            >
              <Calculator size={14} color="#47B7D4" />
              <span>Interactive Financial Diagnostic</span>
            </span>
          </div>

          <h1
            style={{
              fontFamily: "'Inter', system-ui, sans-serif",
              fontSize: 'clamp(2.2rem, 5vw, 3.8rem)',
              fontWeight: 900,
              textTransform: 'uppercase',
              letterSpacing: '-0.03em',
              color: '#111111',
              lineHeight: 1.1,
              marginBottom: '1rem',
            }}
          >
            Retirement Gap <span style={{ color: '#47B7D4' }}>Calculator</span>
          </h1>

          <p
            style={{
              fontFamily: "'DM Sans', system-ui, sans-serif",
              fontSize: 'clamp(1rem, 1.8vw, 1.2rem)',
              lineHeight: 1.65,
              color: '#4B5563',
              maxWidth: '680px',
              margin: '0 auto 2rem',
            }}
          >
            Turn vague retirement anxiety into a concrete mathematical blueprint. See exactly how many faceless digital assets will bridge your shortfall.
          </p>
        </div>
      </section>

      {/* 2. CALCULATOR GRID */}
      <section style={{ maxWidth: '1100px', margin: '3.5rem auto 0', padding: '0 1.25rem' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '2rem',
            alignItems: 'start',
          }}
        >
          {/* Inputs Card */}
          <div
            style={{
              backgroundColor: '#FFFFFF',
              border: '2px solid #111111',
              padding: '2rem',
              boxShadow: '4px 4px 0 0 rgba(0,0,0,1)',
            }}
          >
            <div
              style={{
                fontFamily: "'Inter', system-ui, sans-serif",
                fontSize: '0.85rem',
                fontWeight: 900,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: '#111111',
                marginBottom: '1.5rem',
                borderBottom: '2px solid #111111',
                paddingBottom: '0.75rem',
              }}
            >
              01 / Your Parameters
            </div>

            <div style={{ display: 'grid', gap: '1.25rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '0.35rem' }}>
                    Current Age: {currentAge}
                  </label>
                  <input
                    type="range"
                    min="35"
                    max="70"
                    value={currentAge}
                    onChange={(e) => setCurrentAge(Number(e.target.value))}
                    style={{ width: '100%', accentColor: '#47B7D4' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '0.35rem' }}>
                    Target Retirement: {retireAge}
                  </label>
                  <input
                    type="range"
                    min="50"
                    max="80"
                    value={retireAge}
                    onChange={(e) => setRetireAge(Number(e.target.value))}
                    style={{ width: '100%', accentColor: '#47B7D4' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '0.35rem' }}>
                  Current Retirement Savings ($)
                </label>
                <input
                  type="number"
                  step="5000"
                  value={currentSavings}
                  onChange={(e) => setCurrentSavings(Number(e.target.value))}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    backgroundColor: '#FFFCF9',
                    border: '2px solid #111111',
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 700,
                    boxSizing: 'border-box',
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '0.35rem' }}>
                  Monthly Savings Addition ($)
                </label>
                <input
                  type="number"
                  step="50"
                  value={monthlyContribution}
                  onChange={(e) => setMonthlyContribution(Number(e.target.value))}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    backgroundColor: '#FFFCF9',
                    border: '2px solid #111111',
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 700,
                    boxSizing: 'border-box',
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '0.35rem' }}>
                  Desired Monthly Income in Retirement ($)
                </label>
                <input
                  type="number"
                  step="250"
                  value={desiredMonthly}
                  onChange={(e) => setDesiredMonthly(Number(e.target.value))}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    backgroundColor: '#FFFCF9',
                    border: '2px solid #111111',
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 700,
                    boxSizing: 'border-box',
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '0.35rem' }}>
                  Estimated Monthly Social Security / Pension ($)
                </label>
                <input
                  type="number"
                  step="100"
                  value={socialSecurityMonthly}
                  onChange={(e) => setSocialSecurityMonthly(Number(e.target.value))}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    backgroundColor: '#FFFCF9',
                    border: '2px solid #111111',
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 700,
                    boxSizing: 'border-box',
                  }}
                />
              </div>
            </div>
          </div>

          {/* Results Card */}
          <div
            style={{
              backgroundColor: '#FFFFFF',
              border: '2px solid #111111',
              padding: '2rem',
              boxShadow: '4px 4px 0 0 rgba(0,0,0,1)',
            }}
          >
            <div
              style={{
                fontFamily: "'Inter', system-ui, sans-serif",
                fontSize: '0.85rem',
                fontWeight: 900,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: '#111111',
                marginBottom: '1.5rem',
                borderBottom: '2px solid #111111',
                paddingBottom: '0.75rem',
              }}
            >
              02 / Diagnostic Verdict
            </div>

            <div
              style={{
                backgroundColor: isOnTrack ? '#ECFDF5' : '#FEF2F2',
                border: '2px solid #111111',
                padding: '1.5rem',
                marginBottom: '1.5rem',
                textAlign: 'center',
              }}
            >
              <div
                style={{
                  fontFamily: "'Inter', system-ui, sans-serif",
                  fontSize: '0.72rem',
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  color: isOnTrack ? '#16A34A' : '#DC2626',
                  marginBottom: '0.25rem',
                }}
              >
                {isOnTrack ? 'Full Target Met' : 'Documented Retirement Gap'}
              </div>

              <div
                style={{
                  fontFamily: "'Inter', system-ui, sans-serif",
                  fontSize: '3rem',
                  fontWeight: 900,
                  color: isOnTrack ? '#16A34A' : '#111111',
                  lineHeight: 1,
                }}
              >
                {isOnTrack ? '$0 GAP' : fmt(gap)}
              </div>

              <div style={{ fontSize: '0.82rem', color: '#6B7280', marginTop: '0.5rem' }}>
                {isOnTrack
                  ? 'Your traditional portfolio meets your target retirement needs.'
                  : `Projected capital shortfall at age ${retireAge}.`}
              </div>
            </div>

            {/* Metrics Breakdown */}
            <div style={{ display: 'grid', gap: '0.75rem', marginBottom: '1.75rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #E5E7EB', paddingBottom: '0.5rem' }}>
                <span style={{ fontSize: '0.85rem', color: '#6B7280' }}>Target Nest Egg (at 4% SWR):</span>
                <strong style={{ fontFamily: "'Inter', sans-serif" }}>{fmt(targetNestEgg)}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #E5E7EB', paddingBottom: '0.5rem' }}>
                <span style={{ fontSize: '0.85rem', color: '#6B7280' }}>Projected at Age {retireAge}:</span>
                <strong style={{ fontFamily: "'Inter', sans-serif" }}>{fmt(totalAtRetirement)}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #E5E7EB', paddingBottom: '0.5rem' }}>
                <span style={{ fontSize: '0.85rem', color: '#6B7280' }}>Monthly Needed from Digital Real Estate:</span>
                <strong style={{ fontFamily: "'Inter', sans-serif", color: '#F18B25' }}>{fmt(monthlyNeededFromPortfolio)}/mo</strong>
              </div>
            </div>

            {/* Solution Block */}
            <div
              style={{
                backgroundColor: '#FFFCF9',
                border: '2px solid #111111',
                padding: '1.25rem',
                marginBottom: '1.5rem',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <Sparkles size={16} color="#F18B25" />
                <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.78rem', fontWeight: 900, textTransform: 'uppercase' }}>
                  The Faceless Asset Solution:
                </span>
              </div>
              <p style={{ fontSize: '0.88rem', color: '#4B5563', lineHeight: 1.5, margin: 0 }}>
                Building <strong>{assetsRequired} faceless digital asset(s)</strong> yielding ~$500/month each completely covers your monthly retirement deficit.
              </p>
            </div>

            <Link
              to="/quiz"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                width: '100%',
                padding: '0.9rem',
                backgroundColor: '#F18B25',
                color: '#111111',
                border: '2px solid #111111',
                fontFamily: "'Inter', system-ui, sans-serif",
                fontSize: '0.82rem',
                fontWeight: 900,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                textDecoration: 'none',
                boxSizing: 'border-box',
              }}
            >
              <span>Discover Your Superpower to Build Assets</span>
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
