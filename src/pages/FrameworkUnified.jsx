import React from 'react';
import { Link } from 'react-router-dom';
import {
  Layers,
  ArrowRight,
  Database,
  TrendingUp,
  Cpu,
  DollarSign,
  Shield,
  CheckCircle2,
  Lock,
  EyeOff,
  Sparkles,
  Zap,
} from 'lucide-react';

export default function FrameworkUnified() {
  const TIERS = [
    {
      tier: '01',
      title: 'Audience & Niche Architecture',
      subtitle: 'Identify High-Pain Problems Without Identity Exposure',
      accent: '#F18B25',
      icon: Database,
      deliverables: [
        'Proprietary 0-100 Niche Profitability Scoring formula',
        'Faceless brand identity guidelines (typography, palette, tone)',
        'Legal entity & domain separation protocols for privacy',
        'Customer search intent keyword maps',
      ],
      description:
        'We begin by uncovering the exact intersection of your corporate expertise and urgent digital demand. You will never put your face on camera, use your personal name, or broadcast your personal life.',
    },
    {
      tier: '02',
      title: 'Automated Asset Creation',
      subtitle: 'Turn Professional Knowledge Into Scalable Products',
      accent: '#47B7D4',
      icon: TrendingUp,
      deliverables: [
        'Structured Notion Operating Systems ($47–$97 pricing sweet spot)',
        'Micro-SaaS & Interactive Calculator blueprints',
        'AI prompt chains for instant high-value documentation',
        'Automated checkout & frictionless instant delivery',
      ],
      description:
        'Transform complex workflows into high-utility digital templates. Customers buy immediate clarity and time savings — not video personality.',
    },
    {
      tier: '03',
      title: 'Faceless Traffic Flywheel',
      subtitle: 'Systematize Inbound Leads on Autopilot',
      accent: '#16A34A',
      icon: Cpu,
      deliverables: [
        'Search-driven editorial content funnels',
        'Automated Brevo & Substack email automation sequences',
        'Faceless Pinterest & SEO distribution matrices',
        'Zero-budget inbound lead magnet architecture',
      ],
      description:
        'Instead of fighting social media algorithms with endless daily video uploads, we build durable search assets and email pipelines that deliver sales 24/7.',
    },
    {
      tier: '04',
      title: 'Cashflow Stacking & Empire Scaling',
      subtitle: 'Bridge the Retirement Gap With Multiple Micro-Assets',
      accent: '#8B5CF6',
      icon: DollarSign,
      deliverables: [
        'Portfolio diversification across 3–5 complementary niches',
        'High-ticket backend consulting ladders (optional, camera-free)',
        'Recurring membership & community infrastructure',
        'Asset valuation & digital real estate exit planning',
      ],
      description:
        'By stacking 4 to 6 digital assets each producing $300–$750/month, you generate $2,000–$4,500/mo in resilient cashflow — neutralizing the Gen X retirement deficit forever.',
    },
  ];

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
                backgroundColor: '#FFFCF9',
                border: '2px solid #1F2937',
                fontFamily: "'Inter', sans-serif",
                fontSize: '0.7rem',
                fontWeight: 900,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: '#1F2937',
              }}
            >
              <Layers size={14} color="#F18B25" />
              <span>Core Architecture</span>
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
              maxWidth: '880px',
              margin: '0 auto 1.25rem',
            }}
          >
            The 4-Tier <span style={{ color: '#F18B25' }}>Faceless Asset</span> Framework
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
            A predictable, step-by-step operating system designed specifically for Gen X women.
            No dancing on video. No public exposure. Just systematic digital assets that work 24/7.
          </p>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <Link
              to="/quiz"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.9rem 2rem',
                backgroundColor: '#F18B25',
                color: '#1F2937',
                border: '2px solid #1F2937',
                fontFamily: "'Inter', sans-serif",
                fontSize: '0.8rem',
                fontWeight: 900,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                textDecoration: 'none',
                boxShadow: '4px 4px 0 0 #1F2937',
              }}
            >
              <span>Map Your Tier With The Quiz</span>
              <ArrowRight size={15} />
            </Link>

            <Link
              to="/gap"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.9rem 1.75rem',
                backgroundColor: '#FFFFFF',
                color: '#1F2937',
                border: '2px solid #1F2937',
                fontFamily: "'Inter', sans-serif",
                fontSize: '0.8rem',
                fontWeight: 900,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                textDecoration: 'none',
                boxShadow: '4px 4px 0 0 #1F2937',
              }}
            >
              <span>Calculate Retirement Need</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 2. TIERS BREAKDOWN */}
      <section style={{ maxWidth: '1080px', margin: '0 auto', padding: '4.5rem 1.25rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
          {TIERS.map((tier) => {
            const TierIcon = tier.icon;
            return (
              <div
                key={tier.tier}
                style={{
                  backgroundColor: '#FFFFFF',
                  border: '2px solid #1F2937',
                  padding: 'clamp(1.75rem, 3.5vw, 2.75rem)',
                  boxShadow: '6px 6px 0 0 #1F2937',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.25rem' }}>
                  <div>
                    <span
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: '0.75rem',
                        fontWeight: 900,
                        textTransform: 'uppercase',
                        color: tier.accent,
                        letterSpacing: '0.1em',
                        display: 'block',
                        marginBottom: '0.25rem',
                      }}
                    >
                      Tier {tier.tier}
                    </span>
                    <h2
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: 'clamp(1.4rem, 3vw, 2rem)',
                        fontWeight: 900,
                        textTransform: 'uppercase',
                        color: '#1F2937',
                        margin: 0,
                        lineHeight: 1.15,
                      }}
                    >
                      {tier.title}
                    </h2>
                    <p
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: '0.95rem',
                        fontWeight: 600,
                        color: '#6B7280',
                        margin: '0.35rem 0 0',
                      }}
                    >
                      {tier.subtitle}
                    </p>
                  </div>

                  <div
                    style={{
                      width: '44px',
                      height: '44px',
                      backgroundColor: '#FFFCF9',
                      border: '2px solid #1F2937',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <TierIcon size={22} color={tier.accent} />
                  </div>
                </div>

                <p
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: '0.95rem',
                    lineHeight: 1.65,
                    color: '#4B5563',
                    marginBottom: '1.5rem',
                  }}
                >
                  {tier.description}
                </p>

                <div
                  style={{
                    backgroundColor: '#FFFCF9',
                    border: '1.5px solid #1F2937',
                    padding: '1.25rem 1.5rem',
                  }}
                >
                  <div
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: '0.7rem',
                      fontWeight: 900,
                      textTransform: 'uppercase',
                      color: '#1F2937',
                      letterSpacing: '0.08em',
                      marginBottom: '0.75rem',
                    }}
                  >
                    Core Blueprint Deliverables:
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '0.75rem' }}>
                    {tier.deliverables.map((item, idx) => (
                      <div
                        key={idx}
                        style={{
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: '0.45rem',
                          fontFamily: "'DM Sans', sans-serif",
                          fontSize: '0.85rem',
                          color: '#1F2937',
                          lineHeight: 1.4,
                        }}
                      >
                        <CheckCircle2 size={15} color="#16A34A" style={{ flexShrink: 0, marginTop: '2px' }} />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. READY TO START */}
      <section style={{ maxWidth: '1080px', margin: '0 auto', padding: '0 1.25rem', textAlign: 'center' }}>
        <div
          style={{
            backgroundColor: '#1F2937',
            color: '#FFFFFF',
            border: '2px solid #1F2937',
            padding: '3rem 1.5rem',
            boxShadow: '6px 6px 0 0 #F18B25',
          }}
        >
          <h2
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '1.85rem',
              fontWeight: 900,
              textTransform: 'uppercase',
              color: '#FFFFFF',
              marginBottom: '0.5rem',
            }}
          >
            Implement The Framework in 30 Days
          </h2>
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '1rem',
              color: '#D1D5DB',
              maxWidth: '620px',
              margin: '0 auto 1.75rem',
            }}
          >
            Get instant access to step-by-step video templates, Notion blueprints, and automated prompt chains.
          </p>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <Link
              to="/builder"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.9rem 2rem',
                backgroundColor: '#F18B25',
                color: '#1F2937',
                border: '2px solid #FFFFFF',
                fontFamily: "'Inter', sans-serif",
                fontSize: '0.82rem',
                fontWeight: 900,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                textDecoration: 'none',
                boxShadow: '4px 4px 0 0 #FFFFFF',
              }}
            >
              <span>Join Builder Plan ($47/mo)</span>
              <ArrowRight size={15} />
            </Link>

            <Link
              to="/start-here"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.9rem 1.75rem',
                backgroundColor: 'transparent',
                color: '#FFFFFF',
                border: '2px solid #FFFFFF',
                fontFamily: "'Inter', sans-serif",
                fontSize: '0.82rem',
                fontWeight: 900,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                textDecoration: 'none',
              }}
            >
              <span>See Guided Onboarding</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
