import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Calculator,
  ArrowRight,
  TrendingUp,
  Shield,
  CheckCircle2,
  DollarSign,
  AlertTriangle,
  Zap,
  Layers,
  Sparkles,
  Info,
} from 'lucide-react';
import { saveGapResult } from '../../lib/userState';

export default function RetirementGapCalculatorUnified() {
  const [currentAge, setCurrentAge] = useState(48);
  const [targetAge, setTargetAge] = useState(62);
  const [currentSavings, setCurrentSavings] = useState(85000);
  const [desiredMonthlyIncome, setDesiredMonthlyIncome] = useState(5000);
  const [expectedSocialSecurity, setExpectedSocialSecurity] = useState(1800);

  // Math
  const netMonthlyDeficit = Math.max(0, desiredMonthlyIncome - expectedSocialSecurity);
  const totalAnnualDeficit = netMonthlyDeficit * 12;
  // Rule of 25 (4% safe withdrawal rate)
  const totalLumpSumNeeded = totalAnnualDeficit * 25;
  const netRetirementGap = Math.max(0, totalLumpSumNeeded - currentSavings);
  const yearsRemaining = Math.max(1, targetAge - currentAge);
  const monthlySavingsRequiredTraditional = Math.round(netRetirementGap / (yearsRemaining * 12));

  // Faceless Asset Solution ($500/mo cashflow per digital asset)
  const digitalAssetsNeeded = Math.ceil(netMonthlyDeficit / 500);

  useEffect(() => {
    saveGapResult({
      currentAge,
      targetAge,
      currentSavings,
      desiredMonthlyIncome,
      expectedSocialSecurity,
      netRetirementGap,
      digitalAssetsNeeded,
    });
  }, [currentAge, targetAge, currentSavings, desiredMonthlyIncome, expectedSocialSecurity, netRetirementGap, digitalAssetsNeeded]);

  return (
    <div style={{ backgroundColor: '#FFFCF9', color: '#2D3748', minHeight: '100vh', paddingBottom: '5rem' }}>
      {/* 1. HERO */}
      <section
        style={{
          borderBottom: '2px solid #1F2937',
          backgroundColor: '#FFFFFF',
          padding: 'clamp(3rem, 5vw, 4.5rem) 1.25rem',
          textAlign: 'center',
        }}
      >
        <div style={{ maxWidth: '1080px', margin: '0 auto' }}>
          <div style={{ display: 'inline-block', marginBottom: '1rem' }}>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.45rem',
                padding: '0.35rem 0.85rem',
                backgroundColor: '#FEE2E2',
                border: '2px solid #DC2626',
                fontFamily: "'Inter', sans-serif",
                fontSize: '0.7rem',
                fontWeight: 900,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: '#DC2626',
              }}
            >
              <Calculator size={14} color="#DC2626" />
              <span>Gen X Financial Diagnostic</span>
            </span>
          </div>

          <h1
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 900,
              fontSize: 'clamp(2.2rem, 5vw, 3.8rem)',
              lineHeight: 1.1,
              letterSpacing: '-0.03em',
              textTransform: 'uppercase',
              color: '#1F2937',
              maxWidth: '850px',
              margin: '0 auto 1.25rem',
            }}
          >
            Retirement <span style={{ color: '#F18B25' }}>Gap</span> Calculator
          </h1>

          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 'clamp(1rem, 1.8vw, 1.15rem)',
              lineHeight: 1.6,
              color: '#4B5563',
              maxWidth: '720px',
              margin: '0 auto 2.5rem',
            }}
          >
            Traditional financial planning tells you to save $1.2M+ in cash. We show you how to generate
            equivalent monthly cashflow with 3–5 automated, faceless digital assets.
          </p>
        </div>
      </section>

      {/* 2. CALCULATOR CORE */}
      <section style={{ maxWidth: '1080px', margin: '0 auto', padding: '4rem 1.25rem' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '2.5rem',
            alignItems: 'start',
          }}
        >
          {/* Left Inputs */}
          <div
            style={{
              backgroundColor: '#FFFFFF',
              border: '2px solid #1F2937',
              padding: 'clamp(1.75rem, 3vw, 2.5rem)',
              boxShadow: '4px 4px 0 0 #1F2937',
            }}
          >
            <h2 style={{ fontFamily: "'Inter', sans-serif", fontSize: '1.25rem', fontWeight: 900, textTransform: 'uppercase', color: '#1F2937', marginBottom: '1.5rem', borderBottom: '2px solid #1F2937', paddingBottom: '0.75rem' }}>
              Your Assumptions
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.35rem' }}>
              <div>
                <label style={{ display: 'flex', justifyContent: 'space-between', fontFamily: "'Inter', sans-serif", fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', color: '#1F2937', marginBottom: '0.4rem' }}>
                  <span>Current Age:</span>
                  <span style={{ color: '#F18B25' }}>{currentAge} years old</span>
                </label>
                <input
                  type="range"
                  min="35"
                  max="65"
                  value={currentAge}
                  onChange={(e) => setCurrentAge(Number(e.target.value))}
                  style={{ width: '100%', accentColor: '#F18B25' }}
                />
              </div>

              <div>
                <label style={{ display: 'flex', justifyContent: 'space-between', fontFamily: "'Inter', sans-serif", fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', color: '#1F2937', marginBottom: '0.4rem' }}>
                  <span>Target Freedom Age:</span>
                  <span style={{ color: '#F18B25' }}>{targetAge} years old</span>
                </label>
                <input
                  type="range"
                  min={currentAge + 1}
                  max="75"
                  value={targetAge}
                  onChange={(e) => setTargetAge(Number(e.target.value))}
                  style={{ width: '100%', accentColor: '#F18B25' }}
                />
              </div>

              <div>
                <label style={{ display: 'flex', justifyContent: 'space-between', fontFamily: "'Inter', sans-serif", fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', color: '#1F2937', marginBottom: '0.4rem' }}>
                  <span>Current 401(k) / Liquid Savings:</span>
                  <span style={{ color: '#1F2937' }}>${currentSavings.toLocaleString()}</span>
                </label>
                <input
                  type="range"
                  min="0"
                  max="500000"
                  step="5000"
                  value={currentSavings}
                  onChange={(e) => setCurrentSavings(Number(e.target.value))}
                  style={{ width: '100%', accentColor: '#1F2937' }}
                />
              </div>

              <div>
                <label style={{ display: 'flex', justifyContent: 'space-between', fontFamily: "'Inter', sans-serif", fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', color: '#1F2937', marginBottom: '0.4rem' }}>
                  <span>Desired Monthly Income:</span>
                  <span style={{ color: '#47B7D4' }}>${desiredMonthlyIncome.toLocaleString()}/mo</span>
                </label>
                <input
                  type="range"
                  min="2500"
                  max="15000"
                  step="250"
                  value={desiredMonthlyIncome}
                  onChange={(e) => setDesiredMonthlyIncome(Number(e.target.value))}
                  style={{ width: '100%', accentColor: '#47B7D4' }}
                />
              </div>

              <div>
                <label style={{ display: 'flex', justifyContent: 'space-between', fontFamily: "'Inter', sans-serif", fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', color: '#1F2937', marginBottom: '0.4rem' }}>
                  <span>Projected Social Security / Pension:</span>
                  <span style={{ color: '#16A34A' }}>${expectedSocialSecurity.toLocaleString()}/mo</span>
                </label>
                <input
                  type="range"
                  min="0"
                  max="4000"
                  step="100"
                  value={expectedSocialSecurity}
                  onChange={(e) => setExpectedSocialSecurity(Number(e.target.value))}
                  style={{ width: '100%', accentColor: '#16A34A' }}
                />
              </div>
            </div>
          </div>

          {/* Right Comparison & Solutions */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
            {/* The Harsh Reality */}
            <div
              style={{
                backgroundColor: '#FFFFFF',
                border: '2px solid #1F2937',
                padding: '1.75rem',
                boxShadow: '4px 4px 0 0 #1F2937',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', marginBottom: '0.5rem' }}>
                <AlertTriangle size={16} color="#DC2626" />
                <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.72rem', fontWeight: 900, textTransform: 'uppercase', color: '#DC2626', letterSpacing: '0.08em' }}>
                  The Traditional Deficit Model
                </span>
              </div>

              <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '2.5rem', fontWeight: 900, color: '#DC2626', lineHeight: 1 }}>
                ${netRetirementGap.toLocaleString()}
              </div>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.85rem', color: '#6B7280', margin: '0.4rem 0 1rem' }}>
                Total lump-sum capital required under standard 4% withdrawal rules. You would need to invest{' '}
                <strong>${monthlySavingsRequiredTraditional.toLocaleString()}/month</strong> for {yearsRemaining} years.
              </p>
            </div>

            {/* The Faceless Asset Solution */}
            <div
              style={{
                backgroundColor: '#FFFCF9',
                border: '2px solid #1F2937',
                padding: '2rem',
                boxShadow: '6px 6px 0 0 #1F2937',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', marginBottom: '0.5rem' }}>
                <Zap size={16} color="#F18B25" />
                <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.72rem', fontWeight: 900, textTransform: 'uppercase', color: '#F18B25', letterSpacing: '0.08em' }}>
                  The DigitallyDefined Solution
                </span>
              </div>

              <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '2.75rem', fontWeight: 900, color: '#1F2937', lineHeight: 1 }}>
                {digitalAssetsNeeded} Digital Assets
              </div>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.9rem', color: '#4B5563', margin: '0.5rem 0 1.5rem', lineHeight: 1.55 }}>
                Each generating ~$500/mo bridges your <strong>${netMonthlyDeficit.toLocaleString()}/mo</strong> shortfall completely.
                No stock market panic. Zero dependence on corporate employment.
              </p>

              <Link
                to="/quiz"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.9rem 1.75rem',
                  backgroundColor: '#F18B25',
                  color: '#1F2937',
                  border: '2px solid #1F2937',
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '0.8rem',
                  fontWeight: 900,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  textDecoration: 'none',
                  boxShadow: '3px 3px 0 0 #1F2937',
                }}
              >
                <span>Find Your Asset Archetype</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
