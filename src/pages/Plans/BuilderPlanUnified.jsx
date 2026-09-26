import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Zap,
  CheckCircle2,
  ArrowRight,
  Shield,
  Clock,
  Sparkles,
  Lock,
  Layers,
  FileText,
  Workflow
} from 'lucide-react';

export default function BuilderPlanUnified() {
  const [billing, setBilling] = useState('monthly'); // 'monthly' | 'lifetime'

  const modules = [
    {
      title: 'Module 1: Archetype & Knowledge Extraction',
      description: 'Turn 10–25 years of career problem-solving into structured, sellable digital frameworks.',
      deliverable: '1 Validated Product Specification Document',
    },
    {
      title: 'Module 2: AI Prompt Blueprints for High-Utility Assets',
      description: 'Step-by-step prompts for Claude & ChatGPT to build templates, guides, and client-side calculators.',
      deliverable: '1 Complete Digital Asset Pack ($27–$97 retail price)',
    },
    {
      title: 'Module 3: Faceless Sales Page & 1-Page Funnel',
      description: 'Copy-and-paste sales page templates with high-converting soft brutalist cards and centered CTAs.',
      deliverable: '1 Live Checkout Funnel via Lemon Squeezy or Stripe',
    },
    {
      title: 'Module 4: Automated Delivery & Welcome Engines',
      description: 'Set up instant digital file delivery and automated email sequences without technical frustration.',
      deliverable: '1 Fully Automated Hands-Off Fulfillment Pipeline',
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
              backgroundColor: '#FFF7ED',
              border: '1.5px solid #F18B25',
              padding: '0.35rem 0.85rem',
              fontSize: '0.72rem',
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              color: '#F18B25',
              boxShadow: 'none',
            }}
          >
            <Zap size={13} color="#F18B25" />
            <span>Builder Fast-Track Tier</span>
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
          Build Your First 2 Faceless Digital Assets
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
          The step-by-step implementation toolkit designed for Gen X women to transform 
          career experience into recurring digital revenue—with zero camera time.
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
            $47 / Month
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
            <span>$297 Lifetime</span>
            <span style={{ color: '#F18B25', fontSize: '0.65rem' }}>SAVE 50%</span>
          </button>
        </div>
      </section>

      {/* Modules List — Centered */}
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
            Core Curriculum & Implementation Blueprints
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {modules.map((mod, idx) => (
              <div
                key={idx}
                style={{
                  padding: '1.25rem',
                  backgroundColor: '#FAF8F5',
                  border: '1px solid #1F2937',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                  <h3
                    style={{
                      fontFamily: "'Inter', system-ui, sans-serif",
                      fontSize: '1rem',
                      fontWeight: 800,
                      textTransform: 'uppercase',
                      color: '#1F2937',
                      margin: 0,
                    }}
                  >
                    {mod.title}
                  </h3>
                  <span
                    style={{
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      color: '#9A3412',
                      backgroundColor: '#FFF7ED',
                      padding: '0.15rem 0.5rem',
                      border: '1px solid #FED7AA',
                    }}
                  >
                    Output: {mod.deliverable}
                  </span>
                </div>
                <p style={{ fontSize: '0.88rem', color: '#4B5563', lineHeight: 1.5, margin: 0 }}>
                  {mod.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Action Checkout Box — Centered */}
        <div
          style={{
            backgroundColor: '#FFF7ED',
            border: '2px solid #F18B25',
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
              color: '#1F2937',
              marginBottom: '0.5rem',
            }}
          >
            Ready to start building?
          </h3>
          <p
            style={{
              fontFamily: "'DM Sans', system-ui, sans-serif",
              fontSize: '1rem',
              color: '#4B5563',
              maxWidth: '540px',
              margin: '0 auto 1.75rem',
            }}
          >
            Get instant access to all prompt blueprints, Notion templates, and the Hermes AI Mentor workspace.
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <a
              href="https://buy.stripe.com/test_builder"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                backgroundColor: '#F18B25',
                border: '1.5px solid #1F2937',
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
              <span>Enroll in Builder Tier ({billing === 'monthly' ? '$47/mo' : '$297'})</span>
              <ArrowRight size={15} />
            </a>

            <Link
              to="/pricing"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                backgroundColor: '#FFFFFF',
                border: '1.5px solid #1F2937',
                color: '#1F2937',
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
