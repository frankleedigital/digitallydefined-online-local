import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Calculator,
  ArrowRight,
  TrendingUp,
  Shield,
  Clock,
  Sparkles,
  Info,
  DollarSign,
  Layers,
  HelpCircle,
  CheckCircle2
} from 'lucide-react';
import { saveGapResult } from '../../lib/userState';

export default function RetirementGapCalculatorUnified() {
  const [currentAge, setCurrentAge] = useState(52);
  const [targetRetirementAge, setTargetRetirementAge] = useState(65);
  const [desiredMonthlyIncome, setDesiredMonthlyIncome] = useState(6000);
  const [currentSavings, setCurrentSavings] = useState(150000);
  const [monthlyContribution, setMonthlyContribution] = useState(600);
  const [expectedReturn, setExpectedReturn] = useState(6);

  // Calculations
  const yearsToRetire = Math.max(1, targetRetirementAge - currentAge);
  const monthsToRetire = yearsToRetire * 12;
  const annualIncomeGoal = desiredMonthlyIncome * 12;
  // Standard 4% safe withdrawal rule requires 25x annual income
  const totalNestEggNeeded = annualIncomeGoal * 25;

  // Future value of current savings + monthly contributions
  const monthlyRate = (expectedReturn / 100) / 12;
  const fvExisting = currentSavings * Math.pow(1 + monthlyRate, monthsToRetire);
  const fvContributions =
    monthlyRate > 0
      ? monthlyContribution * ((Math.pow(1 + monthlyRate, monthsToRetire) - 1) / monthlyRate)
      : monthlyContribution * monthsToRetire;

  const estimatedFutureSavings = Math.round(fvExisting + fvContributions);
  const projectedShortfall = Math.max(0, Math.round(totalNestEggNeeded - estimatedFutureSavings));
  const monthlyShortfallIncome = Math.round((projectedShortfall * 0.04) / 12);

  // Faceless Asset Equivalents
  const assetsNeeded500 = Math.max(1, Math.ceil(monthlyShortfallIncome / 500));
  const assetsNeeded1000 = Math.max(1, Math.ceil(monthlyShortfallIncome / 1000));

  useEffect(() => {
    saveGapResult({
      currentAge,
      targetRetirementAge,
      desiredMonthlyIncome,
      currentSavings,
      gapAmount: projectedShortfall,
      monthlyShortfallIncome,
      assetsNeeded: assetsNeeded500,
    });
  }, [currentAge, targetRetirementAge, desiredMonthlyIncome, currentSavings, projectedShortfall, monthlyShortfallIncome, assetsNeeded500]);

  return (
    <div style={{ backgroundColor: '#FFFCF9', color: '#1F2937', minHeight: '100vh' }}>
      
      {/* Header — Centered */}
      <section
        style={{
          maxWidth: '1040px',
          margin: '0 auto',
          padding: 'clamp(3rem, 6vw, 4.5rem) 1.25rem 2rem',
          textAlign: 'center',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.45rem',
              backgroundColor: '#FFFFFF',
              border: '1.5px solid #1F2937',
              padding: '0.35rem 0.85rem',
              fontSize: '0.72rem',
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              color: '#F18B25',
              boxShadow: 'none',
            }}
          >
            <Calculator size={13} color="#F18B25" />
            <span>Interactive Financial Diagnostic</span>
          </div>
        </div>

        <h1
          style={{
            fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
            fontWeight: 900,
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            textTransform: 'uppercase',
            letterSpacing: '-0.02em',
            color: '#1F2937',
            marginBottom: '1rem',
          }}
        >
          Gen X Retirement Gap Calculator
        </h1>

        <p
          style={{
            fontFamily: "'DM Sans', system-ui, sans-serif",
            fontSize: '1.05rem',
            color: '#4B5563',
            maxWidth: '680px',
            margin: '0 auto 2.5rem',
            lineHeight: 1.6,
          }}
        >
          Discover your exact shortfall under traditional savings models and see how few faceless digital 
          assets are required to replace hundreds of thousands in missing stock capital.
        </p>
      </section>

      {/* Main Calculator Layout — Centered (Max-Width 1040px) */}
      <section
        style={{
          maxWidth: '1040px',
          margin: '0 auto',
          padding: '0 1.25rem 4.5rem',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '1.75rem',
          }}
        >
          {/* Inputs Column (Thin Frame, No Shadow) */}
          <div
            style={{
              backgroundColor: '#FFFFFF',
              border: '1.5px solid #1F2937',
              padding: 'clamp(1.5rem, 3vw, 2rem)',
              boxShadow: 'none',
            }}
          >
            <h3
              style={{
                fontFamily: "'Inter', system-ui, sans-serif",
                fontSize: '1.05rem',
                fontWeight: 800,
                textTransform: 'uppercase',
                color: '#1F2937',
                marginBottom: '1.5rem',
                paddingBottom: '0.75rem',
                borderBottom: '1.5px solid #1F2937',
              }}
            >
              Your Baseline Assumptions
            </h3>

            {/* Current Age */}
            <div style={{ marginBottom: '1.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
                <label style={{ fontSize: '0.82rem', fontWeight: 700, color: '#1F2937' }}>Current Age</label>
                <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#F18B25' }}>{currentAge} yrs</span>
              </div>
              <input
                type="range"
                min={38}
                max={64}
                value={currentAge}
                onChange={(e) => setCurrentAge(Number(e.target.value))}
                style={{ width: '100%', accentColor: '#F18B25' }}
              />
            </div>

            {/* Target Retirement Age */}
            <div style={{ marginBottom: '1.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
                <label style={{ fontSize: '0.82rem', fontWeight: 700, color: '#1F2937' }}>Target Retirement Age</label>
                <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#F18B25' }}>{targetRetirementAge} yrs</span>
              </div>
              <input
                type="range"
                min={currentAge + 1}
                max={75}
                value={targetRetirementAge}
                onChange={(e) => setTargetRetirementAge(Number(e.target.value))}
                style={{ width: '100%', accentColor: '#F18B25' }}
              />
            </div>

            {/* Desired Monthly Retirement Income */}
            <div style={{ marginBottom: '1.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
                <label style={{ fontSize: '0.82rem', fontWeight: 700, color: '#1F2937' }}>Desired Monthly Income</label>
                <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#1F2937' }}>${desiredMonthlyIncome.toLocaleString()}/mo</span>
              </div>
              <input
                type="range"
                min={3000}
                max={15000}
                step={250}
                value={desiredMonthlyIncome}
                onChange={(e) => setDesiredMonthlyIncome(Number(e.target.value))}
                style={{ width: '100%', accentColor: '#F18B25' }}
              />
            </div>

            {/* Current Retirement Savings */}
            <div style={{ marginBottom: '1.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
                <label style={{ fontSize: '0.82rem', fontWeight: 700, color: '#1F2937' }}>Current Savings / 401(k)</label>
                <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#1F2937' }}>${currentSavings.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min={0}
                max={800000}
                step={10000}
                value={currentSavings}
                onChange={(e) => setCurrentSavings(Number(e.target.value))}
                style={{ width: '100%', accentColor: '#F18B25' }}
              />
            </div>

            {/* Monthly Ongoing Contribution */}
            <div style={{ marginBottom: '1.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
                <label style={{ fontSize: '0.82rem', fontWeight: 700, color: '#1F2937' }}>Current Monthly Savings</label>
                <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#1F2937' }}>${monthlyContribution.toLocaleString()}/mo</span>
              </div>
              <input
                type="range"
                min={0}
                max={3000}
                step={50}
                value={monthlyContribution}
                onChange={(e) => setMonthlyContribution(Number(e.target.value))}
                style={{ width: '100%', accentColor: '#F18B25' }}
              />
            </div>

            {/* Privacy Disclaimer */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.45rem',
                fontSize: '0.75rem',
                color: '#6B7280',
                paddingTop: '0.75rem',
                borderTop: '1px solid #F3F4F6',
              }}
            >
              <Shield size={14} color="#F18B25" />
              <span>Numbers remain 100% private to your browser.</span>
            </div>
          </div>

          {/* Results Column (Thin Frame, No Shadow) */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {/* Shortfall Card */}
            <div
              style={{
                backgroundColor: '#FFFFFF',
                border: '1.5px solid #1F2937',
                padding: 'clamp(1.5rem, 3vw, 2rem)',
                boxShadow: 'none',
              }}
            >
              <div style={{ fontSize: '0.72rem', fontWeight: 800, textTransform: 'uppercase', color: '#E05D52', letterSpacing: '0.08em', marginBottom: '0.35rem' }}>
                Estimated Retirement Deficit
              </div>
              <div
                style={{
                  fontFamily: "'Inter', system-ui, sans-serif",
                  fontSize: 'clamp(2rem, 3.5vw, 2.75rem)',
                  fontWeight: 900,
                  color: projectedShortfall > 0 ? '#E05D52' : '#15803D',
                  lineHeight: 1.1,
                  marginBottom: '0.75rem',
                }}
              >
                ${projectedShortfall.toLocaleString()}
              </div>
              <p style={{ fontSize: '0.88rem', color: '#4B5563', lineHeight: 1.5, margin: 0 }}>
                {projectedShortfall > 0
                  ? `To reach $${desiredMonthlyIncome.toLocaleString()}/mo in retirement via traditional 401(k) portfolios, you would need an additional $${projectedShortfall.toLocaleString()} in invested principal.`
                  : 'Your traditional savings track looks solid! Digital assets can accelerate your freedom date.'}
              </p>
            </div>

            {/* Faceless Asset Leverage Bridge */}
            <div
              style={{
                backgroundColor: '#FFF7ED',
                border: '1.5px solid #1F2937',
                padding: 'clamp(1.5rem, 3vw, 2rem)',
                boxShadow: 'none',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#F18B25', marginBottom: '0.35rem' }}>
                <Sparkles size={16} />
                <span style={{ fontSize: '0.72rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  The Digital Asset Alternative
                </span>
              </div>
              <h4
                style={{
                  fontFamily: "'Inter', system-ui, sans-serif",
                  fontSize: '1.25rem',
                  fontWeight: 900,
                  textTransform: 'uppercase',
                  color: '#1F2937',
                  marginBottom: '0.75rem',
                }}
              >
                Bridge the gap with {assetsNeeded500} Faceless Digital Assets
              </h4>
              <p style={{ fontSize: '0.88rem', color: '#4B5563', lineHeight: 1.55, marginBottom: '1.25rem' }}>
                Instead of trying to save an extra ${projectedShortfall.toLocaleString()} out of pocket, 
                building <strong>{assetsNeeded500} digital assets</strong> producing ~$500/month each covers your monthly deficit of <strong>${monthlyShortfallIncome.toLocaleString()}/mo</strong> forever.
              </p>

              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                <Link
                  to="/start-here"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.45rem',
                    backgroundColor: '#F18B25',
                    border: '1.5px solid #1F2937',
                    color: '#1F2937',
                    fontSize: '0.8rem',
                    fontWeight: 800,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    padding: '0.75rem 1.25rem',
                    textDecoration: 'none',
                  }}
                >
                  <span>Build Asset #1</span>
                  <ArrowRight size={14} />
                </Link>

                <Link
                  to="/quiz"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.45rem',
                    backgroundColor: '#FFFFFF',
                    border: '1.5px solid #1F2937',
                    color: '#1F2937',
                    fontSize: '0.8rem',
                    fontWeight: 800,
                    textTransform: 'uppercase',
                    padding: '0.75rem 1.25rem',
                    textDecoration: 'none',
                  }}
                >
                  <Sparkles size={14} color="#F18B25" />
                  <span>Find Your Niche Archetype</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
