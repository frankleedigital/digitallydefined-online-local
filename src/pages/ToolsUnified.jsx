import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Wrench,
  Calculator,
  Compass,
  TrendingUp,
  DollarSign,
  Cpu,
  Target,
  ArrowRight,
  Shield,
  Zap,
  CheckCircle2,
  Sparkles,
  Layers,
  Database,
  Search,
} from 'lucide-react';

const ECOSYSTEM_TOOLS = [
  {
    id: 'gap-calc',
    title: 'Retirement Gap Calculator',
    badge: 'Flagship Tool',
    category: 'Calculators',
    tagColor: '#DC2626',
    tagBg: '#FEE2E2',
    icon: Calculator,
    desc: 'Model your exact retirement shortfall based on current savings, projected age, and needed monthly income. Calculates the precise number of faceless digital assets required to bridge the gap.',
    specs: ['Median Gen X Gap Modeling', 'Faceless Asset Equivalent Calculator', 'Instant Monthly Cashflow Targets'],
    route: '/gap',
    cta: 'Launch Gap Calculator',
  },
  {
    id: 'superpower-quiz',
    title: 'Digital Superpower Quiz',
    badge: 'Personalization Engine',
    category: 'Assessment',
    tagColor: '#F18B25',
    tagBg: '#FEF3C7',
    icon: Compass,
    desc: 'A 2-minute diagnostic scoring your career expertise into one of 4 proven faceless archetypes: The Content Architect, The Curator, The Systems Builder, or The Template Designer.',
    specs: ['4 Proven Gen X Archetypes', 'Zero Tech Jargon', 'Dynamic Next-Step Plan Generation'],
    route: '/quiz',
    cta: 'Take Superpower Quiz',
  },
  {
    id: 'niche-scorecard',
    title: 'Niche Profitability Scorecard',
    badge: 'Validation Tool',
    category: 'Validation',
    tagColor: '#0284C7',
    tagBg: '#E0F2FE',
    icon: Target,
    desc: 'Score any digital product niche from 0 to 100 based on 5 weighted metrics: Audience Pain Point, Spending Power, Search Intent, Evergreen Demand, and Privacy Ease.',
    specs: ['Weighted 0-100 Scoring Index', 'Immediate Viability Filter', 'Niche Risk Assessment'],
    route: '/scorecard',
    cta: 'Run Niche Scorecard',
  },
  {
    id: 'roi-engine',
    title: '10X ROI Engine',
    badge: 'ROI Modeler',
    category: 'Calculators',
    tagColor: '#16A34A',
    tagBg: '#DCFCE7',
    icon: TrendingUp,
    desc: 'Calculate the exponential return on time and money when building digital assets vs traditional hourly consulting or corporate overtime. Highlights the power of $27-$97 recurring templates.',
    specs: ['Hours-to-Revenue Multiplier', 'Digital Asset Margin Modeling', 'Break-Even Timelines'],
    route: '/calculator/roi',
    cta: 'Launch ROI Engine',
  },
  {
    id: 'freedom-calculator',
    title: 'Freedom Number Calculator',
    badge: 'Milestone Planner',
    category: 'Calculators',
    tagColor: '#8B5CF6',
    tagBg: '#EDE9FE',
    icon: DollarSign,
    desc: 'Define your absolute baseline freedom number: the exact monthly income required to quit burnout corporate work or subsidize part-time career transitions.',
    specs: ['Core Expense Floor Analysis', 'Phase-by-Phase Freedom Tiers', 'Asset Allocation Plan'],
    route: '/calculator/freedom',
    cta: 'Calculate Freedom Number',
  },
  {
    id: 'automation-studio',
    title: 'Content & Automation Studio',
    badge: 'Systems Engine',
    category: 'Automation',
    tagColor: '#47B7D4',
    tagBg: '#E0F2FE',
    icon: Cpu,
    desc: 'Explore the automated backend architecture: how Supabase, OmniRoute AI, and scheduled cron jobs manage faceless newsletter generation, content formatting, and customer lead routing.',
    specs: ['Faceless Content Pipeline', 'Zero-Camera Distribution', 'OmniRoute LLM Infrastructure'],
    route: '/automation',
    cta: 'Explore Automation Studio',
  },
];

export default function ToolsUnified() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTools = ECOSYSTEM_TOOLS.filter((tool) => {
    const matchesCat = selectedCategory === 'All' || tool.category === selectedCategory;
    const matchesSearch =
      tool.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.desc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div style={{ backgroundColor: '#FFFCF9', color: '#2D3748', minHeight: '100vh', paddingBottom: '5rem' }}>
      {/* 1. HEADER / HERO */}
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
              <Wrench size={14} color="#F18B25" />
              <span>Diagnostic & Execution Suite</span>
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
            Tools, Calculators & <span style={{ color: '#F18B25' }}>Autonomous</span> Engines
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
            Every tool in the DigitallyDefined ecosystem is engineered to eliminate guesswork, validate niche viability,
            and calculate your fastest mathematical path to retirement freedom.
          </p>

          {/* Quick Filter Bar */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexWrap: 'wrap',
              gap: '0.5rem',
            }}
          >
            {['All', 'Calculators', 'Assessment', 'Validation', 'Automation'].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                style={{
                  padding: '0.55rem 1.1rem',
                  backgroundColor: selectedCategory === cat ? '#1F2937' : '#FFFCF9',
                  color: selectedCategory === cat ? '#FFFFFF' : '#1F2937',
                  border: '2px solid #1F2937',
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '0.75rem',
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                  boxShadow: selectedCategory === cat ? '3px 3px 0 0 #F18B25' : '2px 2px 0 0 #1F2937',
                  transition: 'all 0.15s ease',
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 2. TOOLS GRID */}
      <section style={{ maxWidth: '1080px', margin: '0 auto', padding: '4rem 1.25rem' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '2rem',
          }}
        >
          {filteredTools.map((tool) => {
            const ToolIcon = tool.icon;
            return (
              <div
                key={tool.id}
                style={{
                  backgroundColor: '#FFFFFF',
                  border: '2px solid #1F2937',
                  padding: '2rem',
                  boxShadow: '4px 4px 0 0 #1F2937',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                    <span
                      style={{
                        padding: '0.2rem 0.55rem',
                        backgroundColor: tool.tagBg,
                        color: tool.tagColor,
                        border: `1.5px solid ${tool.tagColor}`,
                        fontFamily: "'Inter', sans-serif",
                        fontSize: '0.65rem',
                        fontWeight: 900,
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                      }}
                    >
                      {tool.badge}
                    </span>

                    <div
                      style={{
                        width: '36px',
                        height: '36px',
                        backgroundColor: '#FFFCF9',
                        border: '1.5px solid #1F2937',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <ToolIcon size={18} color="#1F2937" />
                    </div>
                  </div>

                  <h3
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: '1.35rem',
                      fontWeight: 900,
                      textTransform: 'uppercase',
                      color: '#1F2937',
                      marginBottom: '0.75rem',
                    }}
                  >
                    {tool.title}
                  </h3>

                  <p
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: '0.9rem',
                      lineHeight: 1.6,
                      color: '#4B5563',
                      marginBottom: '1.5rem',
                    }}
                  >
                    {tool.desc}
                  </p>

                  <div style={{ marginBottom: '1.75rem' }}>
                    <div
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: '0.68rem',
                        fontWeight: 900,
                        textTransform: 'uppercase',
                        color: '#6B7280',
                        marginBottom: '0.5rem',
                        letterSpacing: '0.05em',
                      }}
                    >
                      Key Capabilities:
                    </div>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                      {tool.specs.map((s, idx) => (
                        <li
                          key={idx}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.45rem',
                            fontSize: '0.82rem',
                            color: '#1F2937',
                            fontFamily: "'DM Sans', sans-serif",
                            fontWeight: 600,
                          }}
                        >
                          <CheckCircle2 size={13} color="#16A34A" />
                          <span>{s}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <Link
                  to={tool.route}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    padding: '0.85rem 1.25rem',
                    backgroundColor: '#FFFCF9',
                    color: '#1F2937',
                    border: '2px solid #1F2937',
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '0.78rem',
                    fontWeight: 900,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    textDecoration: 'none',
                    boxShadow: '3px 3px 0 0 #1F2937',
                    transition: 'all 0.15s ease',
                  }}
                >
                  <span>{tool.cta}</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. NEED A CUSTOM TOOL CTA */}
      <section style={{ maxWidth: '1080px', margin: '0 auto', padding: '0 1.25rem' }}>
        <div
          style={{
            backgroundColor: '#1F2937',
            color: '#FFFFFF',
            border: '2px solid #1F2937',
            padding: '2.5rem',
            textAlign: 'center',
            boxShadow: '6px 6px 0 0 #F18B25',
          }}
        >
          <h2
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '1.65rem',
              fontWeight: 900,
              textTransform: 'uppercase',
              color: '#FFFFFF',
              marginBottom: '0.5rem',
            }}
          >
            Need a Specific Calculator or Generator?
          </h2>
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '0.95rem',
              color: '#D1D5DB',
              maxWidth: '600px',
              margin: '0 auto 1.5rem',
            }}
          >
            We are actively engineering tools based on member feedback. Submit your idea through our Community Hub.
          </p>

          <Link
            to="/#feedback"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.45rem',
              padding: '0.85rem 1.75rem',
              backgroundColor: '#F18B25',
              color: '#1F2937',
              border: '2px solid #FFFFFF',
              fontFamily: "'Inter', sans-serif",
              fontSize: '0.8rem',
              fontWeight: 900,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              boxShadow: '3px 3px 0 0 #FFFFFF',
            }}
          >
            <span>Request a Custom Tool</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </section>
    </div>
  );
}
