import React from 'react';
import { Link } from 'react-router-dom';
import {
  Layers,
  Sparkles,
  Target,
  Cpu,
  Share2,
  TrendingUp,
  ArrowRight,
  Shield,
  CheckCircle2,
  Compass,
  FileText,
  Workflow
} from 'lucide-react';

export default function FrameworkUnified() {
  const tiers = [
    {
      tier: 'Tier 01',
      name: 'Niche Identification & Asset Validation',
      icon: Target,
      color: '#F18B25',
      timeframe: 'Days 1–7',
      objective: 'Discover high-demand, low-competition digital product topics based on your career experience.',
      steps: [
        'Take the Superpower Quiz to identify your creator archetype (Curator, Architect, Builder, Synthesizer).',
        'Use the Niche Profitability Scorecard to evaluate commercial intent and purchasing power.',
        'Validate problem urgency with search queries before writing a single word.',
      ],
      deliverable: '1 Validated Digital Asset Topic & Problem Statement',
    },
    {
      tier: 'Tier 02',
      name: 'Automated AI Asset Production',
      icon: Cpu,
      color: '#47B7D4',
      timeframe: 'Days 8–18',
      objective: 'Build high-utility digital templates, Notion systems, or interactive calculators using structured AI prompts.',
      steps: [
        'Apply our proprietary prompt blueprints to extract 10–20 years of career knowledge into clean modules.',
        'Format deliverables into Notion templates, fillable PDFs, or client-side calculation engines.',
        'Package into clean, white-card soft brutalist designs that look professional and trustworthy.',
      ],
      deliverable: '1 Complete Faceless Digital Product ($27–$97 Price Point)',
    },
    {
      tier: 'Tier 03',
      name: 'Faceless 1-Page Funnel & Checkout',
      icon: Share2,
      color: '#1F2937',
      timeframe: 'Days 19–24',
      objective: 'Deploy a high-converting, centered 1-page checkout funnel with zero video recording required.',
      steps: [
        'Set up a high-readability sales page with clear problem-solution hierarchy and centered CTAs.',
        'Connect Stripe / Lemon Squeezy checkout for immediate automated product delivery.',
        'Add client-side calculators or free sample lead magnets to build an email list.',
      ],
      deliverable: '1 Live, Automated Checkout Funnel with Instant Delivery',
    },
    {
      tier: 'Tier 04',
      name: 'Automated Distribution & Multi-Asset Scaling',
      icon: TrendingUp,
      color: '#F18B25',
      timeframe: 'Days 25–30+',
      objective: 'Set up autonomous email sequences and build 3–5 total assets to permanently bridge the retirement gap.',
      steps: [
        'Trigger automated welcome and educational email sequences via Brevo / Supabase Edge.',
        'Repurpose asset snippets into faceless text/graphic posts on LinkedIn or Pinterest.',
        'Stack 3–5 micro-assets to create $1,500–$2,500/mo in recurring cashflow floor.',
      ],
      deliverable: 'A Complete Self-Sustaining Digital Real Estate Portfolio',
    },
  ];

  return (
    <div style={{ backgroundColor: '#FFFCF9', color: '#1F2937', minHeight: '100vh' }}>
      
      {/* Header — Centered */}
      <section
        style={{
          maxWidth: '1040px',
          margin: '0 auto',
          padding: 'clamp(3rem, 6vw, 4.5rem) 1.25rem 2.5rem',
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
            <Layers size={13} color="#F18B25" />
            <span>System Architecture</span>
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
          The 4-Tier Faceless System Framework
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
          A methodical, step-by-step engineering pathway designed for Gen X women to transform 
          career experience into automated digital assets—without camera pressure, complex tech, or guessing.
        </p>

        {/* Centered CTA */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <Link
            to="/start-here"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              backgroundColor: '#F18B25',
              border: '1.5px solid #1F2937',
              color: '#1F2937',
              fontFamily: "'Inter', system-ui, sans-serif",
              fontSize: '0.85rem',
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              padding: '0.85rem 1.75rem',
              textDecoration: 'none',
              boxShadow: 'none',
            }}
          >
            <Compass size={15} />
            <span>Start 3-Step Guide</span>
            <ArrowRight size={14} />
          </Link>

          <Link
            to="/gap"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              backgroundColor: '#FFFFFF',
              border: '1.5px solid #1F2937',
              color: '#1F2937',
              fontFamily: "'Inter', system-ui, sans-serif",
              fontSize: '0.85rem',
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              padding: '0.85rem 1.75rem',
              textDecoration: 'none',
              boxShadow: 'none',
            }}
          >
            <Sparkles size={15} color="#F18B25" />
            <span>Retirement Gap Calculator</span>
          </Link>
        </div>
      </section>

      {/* 4 Tiers List — Centered Container (Max-Width 1040px) */}
      <section
        style={{
          maxWidth: '1040px',
          margin: '0 auto',
          padding: '0 1.25rem 4.5rem',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {tiers.map((t, idx) => {
            const Icon = t.icon;
            return (
              <div
                key={t.tier}
                style={{
                  backgroundColor: '#FFFFFF',
                  border: '1.5px solid #1F2937',
                  padding: 'clamp(1.5rem, 4vw, 2.25rem)',
                  boxShadow: 'none',
                }}
              >
                {/* Tier Header */}
                <div
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '1rem',
                    paddingBottom: '1.25rem',
                    borderBottom: '1.5px solid #1F2937',
                    marginBottom: '1.5rem',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                    <div
                      style={{
                        width: '42px',
                        height: '42px',
                        backgroundColor: '#FAF8F5',
                        border: '1.5px solid #1F2937',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Icon size={20} color={t.color} />
                    </div>
                    <div>
                      <span
                        style={{
                          fontSize: '0.72rem',
                          fontWeight: 800,
                          textTransform: 'uppercase',
                          letterSpacing: '0.08em',
                          color: '#F18B25',
                          display: 'block',
                        }}
                      >
                        {t.tier} · {t.timeframe}
                      </span>
                      <h2
                        style={{
                          fontFamily: "'Inter', system-ui, sans-serif",
                          fontSize: '1.3rem',
                          fontWeight: 900,
                          textTransform: 'uppercase',
                          color: '#1F2937',
                          margin: 0,
                        }}
                      >
                        {t.name}
                      </h2>
                    </div>
                  </div>

                  <div
                    style={{
                      backgroundColor: '#FAF8F5',
                      border: '1px solid #1F2937',
                      padding: '0.35rem 0.75rem',
                      fontSize: '0.75rem',
                      fontFamily: "'Inter', system-ui, sans-serif",
                      fontWeight: 800,
                      textTransform: 'uppercase',
                      color: '#1F2937',
                    }}
                  >
                    Target: {t.deliverable}
                  </div>
                </div>

                {/* Objective */}
                <p
                  style={{
                    fontFamily: "'DM Sans', system-ui, sans-serif",
                    fontSize: '1rem',
                    color: '#1F2937',
                    fontWeight: 600,
                    lineHeight: 1.5,
                    marginBottom: '1.25rem',
                  }}
                >
                  {t.objective}
                </p>

                {/* Checklist Steps */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                  {t.steps.map((step, sIdx) => (
                    <div
                      key={sIdx}
                      style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '0.65rem',
                        fontSize: '0.9rem',
                        fontFamily: "'DM Sans', system-ui, sans-serif",
                        color: '#4B5563',
                        lineHeight: 1.55,
                      }}
                    >
                      <CheckCircle2 size={16} color="#F18B25" style={{ flexShrink: 0, marginTop: '0.2rem' }} />
                      <span>{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Centered Bottom CTA */}
        <div
          style={{
            marginTop: '3rem',
            backgroundColor: '#FFF7ED',
            border: '1.5px solid #1F2937',
            padding: '2.25rem 1.5rem',
            textAlign: 'center',
          }}
        >
          <h3
            style={{
              fontFamily: "'Inter', system-ui, sans-serif",
              fontSize: '1.4rem',
              fontWeight: 900,
              textTransform: 'uppercase',
              color: '#1F2937',
              marginBottom: '0.5rem',
            }}
          >
            Ready to execute Tier 01?
          </h3>
          <p
            style={{
              fontFamily: "'DM Sans', system-ui, sans-serif",
              fontSize: '0.95rem',
              color: '#4B5563',
              maxWidth: '560px',
              margin: '0 auto 1.5rem',
            }}
          >
            Start with the 2-minute Superpower Diagnostic or model your retirement gap right now.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <Link
              to="/quiz"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.45rem',
                backgroundColor: '#F18B25',
                border: '1.5px solid #1F2937',
                color: '#1F2937',
                fontSize: '0.82rem',
                fontWeight: 800,
                textTransform: 'uppercase',
                padding: '0.8rem 1.75rem',
                textDecoration: 'none',
              }}
            >
              <Sparkles size={14} />
              <span>Launch Archetype Quiz</span>
            </Link>
            <Link
              to="/tools"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.45rem',
                backgroundColor: '#FFFFFF',
                border: '1.5px solid #1F2937',
                color: '#1F2937',
                fontSize: '0.82rem',
                fontWeight: 800,
                textTransform: 'uppercase',
                padding: '0.8rem 1.5rem',
                textDecoration: 'none',
              }}
            >
              <span>View All Tools</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
