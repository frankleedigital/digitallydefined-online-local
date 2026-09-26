import React from 'react';
import { Link } from 'react-router-dom';
import {
  Compass,
  ArrowRight,
  Shield,
  EyeOff,
  Layers,
  Database,
  TrendingUp,
  DollarSign,
  CheckCircle2,
  Sparkles,
  Zap,
  Target,
  FileText,
  Lock,
} from 'lucide-react';

export default function FrameworkUnified() {
  const corePhases = [
    {
      num: '01',
      title: 'Claim It',
      tagline: 'Audit & Secure Your Digital Boundaries',
      desc: 'Identify every digital asset, unmonetized skill, niche authority point, and web property you own or can command. Secure the naming, domain, and architecture without attaching your personal identity.',
      bullets: [
        'Domain & search-intent mapping',
        'Niche authority & category scoring',
        'Faceless brand infrastructure setup',
        'Zero-exposure identity protection',
      ],
      accent: '#F18B25',
    },
    {
      num: '02',
      title: 'Optimize It',
      tagline: 'Package High-Utility Solutions',
      desc: 'Turn expertise into structured, modular, and sellable digital products. Build high-converting Notion hubs, PDF playbooks, automated calculators, and resource matrices that deliver immediate outcome-based value.',
      bullets: [
        'Micro-asset product design ($27 - $97)',
        'Conversion-optimized white card UI',
        'Automated fulfillment & delivery pipelines',
        'Lead magnet & scorecard integration',
      ],
      accent: '#47B7D4',
    },
    {
      num: '03',
      title: 'Expand It',
      tagline: 'Scale Interconnected Portfolios',
      desc: 'Systematically link single assets into an ecosystem. Create traffic flywheels between your search tools, newsletters, lead scoring magnets, and paid product libraries so each asset feeds the others.',
      bullets: [
        'Cross-asset traffic distribution',
        'Faceless newsletter & email digests',
        'Evergreen content syndication',
        'Multi-asset customer lifetime value',
      ],
      accent: '#16A34A',
    },
    {
      num: '04',
      title: 'Monetize It',
      tagline: 'Automate Recurring Cash Flow',
      desc: 'Connect frictionless checkout, recurring subscription tiers, affiliate partnerships, and high-ticket micro-consults. Let the digital property generate monthly cash flow while you maintain total time sovereignty.',
      bullets: [
        'Automated recurring Stripe/LemonSqueezy billing',
        'High-margin affiliate recommendation grids',
        'Private cohort & challenge monetization',
        'Asset portfolio valuation and transferability',
      ],
      accent: '#8B5CF6',
    },
  ];

  const superpowerMatrix = [
    {
      title: 'The Content Architect',
      bestAssets: 'Turnkey Templates, Notion Systems, Playbooks',
      mrrGoal: '$3,000 - $8,000/mo',
      coreAdvantage: 'Structures complex information into clean, actionable formats.',
    },
    {
      title: 'The Systems Operator',
      bestAssets: 'Automations, Zapier Workflows, Calculation Tools',
      mrrGoal: '$4,000 - $12,000/mo',
      coreAdvantage: 'Eliminates friction and builds high-leverage workflows.',
    },
    {
      title: 'The Curation Specialist',
      bestAssets: 'Niche Directories, Resource Banks, Curated Digests',
      mrrGoal: '$2,500 - $7,000/mo',
      coreAdvantage: 'Filters the firehose of noise into trusted signal.',
    },
    {
      title: 'The Knowledge Educator',
      bestAssets: 'Micro-Courses, Framework Decks, Executive Guides',
      mrrGoal: '$3,500 - $10,000/mo',
      coreAdvantage: 'Translates 20+ years of domain experience into clarity.',
    },
    {
      title: 'The Community Builder',
      bestAssets: 'Private Circles, Peer Challenges, Micro-Masterminds',
      mrrGoal: '$5,000 - $15,000/mo',
      coreAdvantage: 'Fosters trust, connection, and accountability among peers.',
    },
  ];

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
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
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
              <Compass size={14} color="#F18B25" />
              <span>The Faceless Real Estate OS</span>
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
              marginBottom: '1.25rem',
            }}
          >
            The 4-Phase <span style={{ color: '#F18B25' }}>Digital Real Estate</span> Framework
          </h1>

          <p
            style={{
              fontFamily: "'DM Sans', system-ui, sans-serif",
              fontSize: 'clamp(1rem, 1.8vw, 1.2rem)',
              lineHeight: 1.65,
              color: '#4B5563',
              maxWidth: '720px',
              margin: '0 auto 2rem',
            }}
          >
            How Gen X women build high-margin, privacy-first digital assets that compound monthly revenue
            without dancing on TikTok, filming video courses, or trading time for money.
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <Link
              to="/quiz"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.9rem 2rem',
                backgroundColor: '#F18B25',
                color: '#111111',
                border: '2px solid #111111',
                fontFamily: "'Inter', system-ui, sans-serif",
                fontSize: '0.82rem',
                fontWeight: 900,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                textDecoration: 'none',
                boxShadow: '4px 4px 0 0 rgba(0,0,0,1)',
              }}
            >
              <span>Discover Your Superpower</span>
              <ArrowRight size={15} />
            </Link>

            <Link
              to="/start-here"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.9rem 1.75rem',
                backgroundColor: '#FFFFFF',
                color: '#111111',
                border: '2px solid #111111',
                fontFamily: "'Inter', system-ui, sans-serif",
                fontSize: '0.82rem',
                fontWeight: 900,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                textDecoration: 'none',
              }}
            >
              <span>View Onboarding Path</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 2. THE 4 PHASES DETAILED */}
      <section style={{ maxWidth: '1100px', margin: '4rem auto 0', padding: '0 1.25rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <span
            style={{
              fontFamily: "'Inter', system-ui, sans-serif",
              fontSize: '0.72rem',
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              color: '#F18B25',
            }}
          >
            Systematic Execution
          </span>
          <h2
            style={{
              fontFamily: "'Inter', system-ui, sans-serif",
              fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)',
              fontWeight: 900,
              textTransform: 'uppercase',
              letterSpacing: '-0.02em',
              color: '#111111',
              marginTop: '0.4rem',
            }}
          >
            The Four Core Lifecycle Phases
          </h2>
        </div>

        <div style={{ display: 'grid', gap: '2rem' }}>
          {corePhases.map((phase) => (
            <div
              key={phase.num}
              style={{
                backgroundColor: '#FFFFFF',
                border: '2px solid #111111',
                padding: '2rem',
                boxShadow: '4px 4px 0 0 rgba(0,0,0,1)',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '2rem',
                alignItems: 'center',
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                  <span
                    style={{
                      fontFamily: "'Inter', system-ui, sans-serif",
                      fontSize: '1.75rem',
                      fontWeight: 900,
                      color: phase.accent,
                    }}
                  >
                    PHASE {phase.num}
                  </span>
                  <span
                    style={{
                      fontFamily: "'Inter', system-ui, sans-serif",
                      fontSize: '0.7rem',
                      fontWeight: 800,
                      textTransform: 'uppercase',
                      letterSpacing: '0.1em',
                      backgroundColor: '#FFFCF9',
                      border: '1px solid #111111',
                      padding: '0.2rem 0.5rem',
                    }}
                  >
                    {phase.tagline}
                  </span>
                </div>

                <h3
                  style={{
                    fontFamily: "'Inter', system-ui, sans-serif",
                    fontSize: '1.6rem',
                    fontWeight: 900,
                    textTransform: 'uppercase',
                    letterSpacing: '-0.02em',
                    color: '#111111',
                    marginBottom: '0.75rem',
                  }}
                >
                  {phase.title}
                </h3>

                <p
                  style={{
                    fontFamily: "'DM Sans', system-ui, sans-serif",
                    fontSize: '0.95rem',
                    lineHeight: 1.65,
                    color: '#4B5563',
                  }}
                >
                  {phase.desc}
                </p>
              </div>

              <div
                style={{
                  backgroundColor: '#FFFCF9',
                  border: '2px solid #111111',
                  padding: '1.5rem',
                }}
              >
                <div
                  style={{
                    fontFamily: "'Inter', system-ui, sans-serif",
                    fontSize: '0.75rem',
                    fontWeight: 900,
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    color: '#111111',
                    marginBottom: '1rem',
                    borderBottom: '1px solid #E5E7EB',
                    paddingBottom: '0.5rem',
                  }}
                >
                  Key Phase Deliverables:
                </div>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: '0.65rem' }}>
                  {phase.bullets.map((b, i) => (
                    <li
                      key={i}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        fontFamily: "'DM Sans', system-ui, sans-serif",
                        fontSize: '0.88rem',
                        fontWeight: 600,
                        color: '#2D3748',
                      }}
                    >
                      <CheckCircle2 size={16} color={phase.accent} />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. SUPERPOWER MONETIZATION MATRIX */}
      <section style={{ maxWidth: '1100px', margin: '4.5rem auto 0', padding: '0 1.25rem' }}>
        <div
          style={{
            backgroundColor: '#FFFFFF',
            border: '2px solid #111111',
            padding: '2.5rem 1.5rem',
          }}
        >
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <span
              style={{
                fontFamily: "'Inter', system-ui, sans-serif",
                fontSize: '0.72rem',
                fontWeight: 800,
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                color: '#47B7D4',
              }}
            >
              Archetype Alignment
            </span>
            <h2
              style={{
                fontFamily: "'Inter', system-ui, sans-serif",
                fontSize: 'clamp(1.6rem, 3.2vw, 2.2rem)',
                fontWeight: 900,
                textTransform: 'uppercase',
                letterSpacing: '-0.02em',
                color: '#111111',
                marginTop: '0.4rem',
              }}
            >
              The 5 Superpower Monetization Models
            </h2>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '1.25rem',
            }}
          >
            {superpowerMatrix.map((sp, idx) => (
              <div
                key={idx}
                style={{
                  backgroundColor: '#FFFCF9',
                  border: '2px solid #111111',
                  padding: '1.5rem',
                }}
              >
                <h4
                  style={{
                    fontFamily: "'Inter', system-ui, sans-serif",
                    fontSize: '1.1rem',
                    fontWeight: 900,
                    textTransform: 'uppercase',
                    color: '#111111',
                    marginBottom: '0.5rem',
                  }}
                >
                  {sp.title}
                </h4>

                <p
                  style={{
                    fontFamily: "'DM Sans', system-ui, sans-serif",
                    fontSize: '0.85rem',
                    color: '#4B5563',
                    marginBottom: '1rem',
                    lineHeight: 1.5,
                  }}
                >
                  {sp.coreAdvantage}
                </p>

                <div
                  style={{
                    borderTop: '1px solid #E5E7EB',
                    paddingTop: '0.75rem',
                    display: 'grid',
                    gap: '0.4rem',
                  }}
                >
                  <div style={{ fontSize: '0.75rem', color: '#6B7280', fontFamily: "'DM Sans', sans-serif" }}>
                    <strong style={{ color: '#111111' }}>Ideal Assets:</strong> {sp.bestAssets}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#F18B25', fontWeight: 800, fontFamily: "'Inter', sans-serif" }}>
                    Target MRR: {sp.mrrGoal}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
            <Link
              to="/quiz"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.85rem 2rem',
                backgroundColor: '#F18B25',
                color: '#111111',
                border: '2px solid #111111',
                fontFamily: "'Inter', system-ui, sans-serif",
                fontSize: '0.82rem',
                fontWeight: 900,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                textDecoration: 'none',
              }}
            >
              <span>Take the 2-Minute Superpower Quiz →</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}