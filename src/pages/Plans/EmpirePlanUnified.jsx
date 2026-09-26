import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Crown,
  CheckCircle2,
  ArrowRight,
  Shield,
  Clock,
  Sparkles,
  Lock,
  Layers,
  Cpu,
  Workflow
} from 'lucide-react';

export default function EmpirePlanUnified() {
  const [billing, setBilling] = useState('monthly');

  const inclusions = [
    {
      title: 'Full Autonomous Content & Distribution Engines',
      description: 'Supabase Edge and Brevo pipelines that publish and syndicate content without manual intervention.',
    },
    {
      title: '5+ Asset Portfolio Scaling Blueprints',
      description: 'Systematic frameworks to build and stack $27, $47, and $97 products into a multi-asset digital ecosystem.',
    },
    {
      title: 'Quarterly Portfolio & Strategy Reviews',
      description: 'Direct review of your funnel metrics, conversion bottlenecks, and monetization models.',
    },
    {
      title: 'Priority Feature & Tool Access',
      description: 'Early access to all new autonomous agents, calculators, and prompt updates.',
    },
  ];

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
              color: '#1F2937',
              boxShadow: 'none',
            }}
          >
            <Crown size={13} color="#F18B25" />
            <span>Empire & Automation Tier</span>
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
          Scale a Complete Faceless Digital Portfolio
        </h1>

        <p
          style={{
            fontFamily: "'DM Sans', system-ui, sans-serif",
            fontSize: '1.05rem',
            color: '#4B5563',
            maxWidth: '680px',
            margin: '0 auto 2rem',
            lineHeight: 1.6,
          }}
        >
          Designed for experienced leaders and Gen X women ready to deploy automated multi-asset ecosystems 
          that permanently bridge the retirement gap with recurring hands-off income.
        </p>

        {/* Pricing Selection */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            backgroundColor: '#FAF8F5',
            border: '1.5px solid #1F2937',
            padding: '0.25rem',
          }}
        >
          <button
            type="button"
            onClick={() => setBilling('monthly')}
            style={{
              backgroundColor: billing === 'monthly' ? '#1F2937' : 'transparent',
              color: billing === 'monthly' ? '#FFFFFF' : '#1F2937',
              border: 'none',
              padding: '0.45rem 1rem',
              fontFamily: "'Inter', system-ui, sans-serif",
              fontSize: '0.75rem',
              fontWeight: 800,
              textTransform: 'uppercase',
              cursor: 'pointer',
            }}
          >
            $197 / Month
          </button>
          <button
            type="button"
            onClick={() => setBilling('lifetime')}
            style={{
              backgroundColor: billing === 'lifetime' ? '#1F2937' : 'transparent',
              color: billing === 'lifetime' ? '#FFFFFF' : '#1F2937',
              border: 'none',
              padding: '0.45rem 1rem',
              fontFamily: "'Inter', system-ui, sans-serif",
              fontSize: '0.75rem',
              fontWeight: 800,
              textTransform: 'uppercase',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem',
            }}
          >
            <span>$997 Lifetime</span>
            <span style={{ color: '#F18B25', fontSize: '0.65rem' }}>SAVE 58%</span>
          </button>
        </div>
      </section>

      {/* Empire Inclusions List — Centered */}
      <section
        style={{
          maxWidth: '1040px',
          margin: '0 auto',
          padding: '0 1.25rem 4.5rem',
        }}
      >
        <div
          style={{
            backgroundColor: '#FFFFFF',
            border: '1.5px solid #1F2937',
            padding: 'clamp(1.5rem, 4vw, 2.5rem)',
            marginBottom: '2.5rem',
          }}
        >
          <h2
            style={{
              fontFamily: "'Inter', system-ui, sans-serif",
              fontSize: '1.3rem',
              fontWeight: 900,
              textTransform: 'uppercase',
              color: '#1F2937',
              marginBottom: '1.5rem',
              paddingBottom: '0.75rem',
              borderBottom: '1.5px solid #1F2937',
            }}
          >
            What You Receive with Empire Tier
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
            {inclusions.map((item, idx) => (
              <div
                key={idx}
                style={{
                  padding: '1.25rem',
                  backgroundColor: '#FAF8F5',
                  border: '1px solid #1F2937',
                }}
              >
                <h3
                  style={{
                    fontFamily: "'Inter', system-ui, sans-serif",
                    fontSize: '1rem',
                    fontWeight: 800,
                    textTransform: 'uppercase',
                    color: '#1F2937',
                    marginBottom: '0.5rem',
                  }}
                >
                  {item.title}
                </h3>
                <p style={{ fontSize: '0.88rem', color: '#4B5563', lineHeight: 1.5, margin: 0 }}>
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Action Checkout Box — Centered */}
        <div
          style={{
            backgroundColor: '#1F2937',
            color: '#FFFFFF',
            border: '2px solid #1F2937',
            padding: '2.5rem 1.5rem',
            textAlign: 'center',
          }}
        >
          <h3
            style={{
              fontFamily: "'Inter', system-ui, sans-serif",
              fontSize: '1.6rem',
              fontWeight: 900,
              textTransform: 'uppercase',
              color: '#FFFFFF',
              marginBottom: '0.5rem',
            }}
          >
            Build your automated empire
          </h3>
          <p
            style={{
              fontFamily: "'DM Sans', system-ui, sans-serif",
              fontSize: '1rem',
              color: '#D1D5DB',
              maxWidth: '540px',
              margin: '0 auto 1.75rem',
            }}
          >
            Includes Builder Tier access plus complete autonomous pipelines and quarterly strategic audits.
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <a
              href="https://buy.stripe.com/test_empire"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                backgroundColor: '#F18B25',
                border: '1.5px solid #FFFFFF',
                color: '#1F2937',
                fontFamily: "'Inter', system-ui, sans-serif",
                fontSize: '0.88rem',
                fontWeight: 800,
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                padding: '0.9rem 2.25rem',
                textDecoration: 'none',
              }}
            >
              <span>Enroll in Empire Tier ({billing === 'monthly' ? '$197/mo' : '$997'})</span>
              <ArrowRight size={15} />
            </a>

            <Link
              to="/pricing"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                backgroundColor: 'transparent',
                border: '1.5px solid #FFFFFF',
                color: '#FFFFFF',
                fontSize: '0.88rem',
                fontWeight: 800,
                textTransform: 'uppercase',
                padding: '0.9rem 1.75rem',
                textDecoration: 'none',
              }}
            >
              <span>Compare All Plans</span>
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
