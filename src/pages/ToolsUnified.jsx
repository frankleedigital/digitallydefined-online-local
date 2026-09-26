import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Wrench,
  Calculator,
  Sparkles,
  Target,
  DollarSign,
  TrendingUp,
  Cpu,
  ArrowRight,
  Shield,
  Layers,
  CheckCircle,
  Clock,
  ExternalLink,
  MessageSquare
} from 'lucide-react';

export default function ToolsUnified() {
  const [activeCategory, setActiveCategory] = useState('all');

  const tools = [
    {
      id: 'gap-calculator',
      title: 'Retirement Gap Calculator',
      category: 'calculators',
      categoryLabel: 'Financial Modeling',
      icon: Calculator,
      color: '#F18B25',
      status: 'Live & Active',
      isLive: true,
      description:
        'Quantify your exact shortfall between current savings and desired retirement lifestyle. Calculates the faceless digital asset equivalent needed to close the gap permanently.',
      time: '3 mins',
      href: '/gap',
      actionLabel: 'Launch Calculator',
    },
    {
      id: 'superpower-quiz',
      title: 'Digital Superpower Diagnostic',
      category: 'diagnostics',
      categoryLabel: 'Archetype Assessment',
      icon: Sparkles,
      color: '#47B7D4',
      status: 'Live & Active',
      isLive: true,
      description:
        'Uncover your highest-leverage digital asset archetype (The Curator, The Systems Builder, The Template Architect, or The Research Synthesizer) based on your career experience.',
      time: '2 mins',
      href: '/quiz',
      actionLabel: 'Take Assessment',
    },
    {
      id: 'niche-scorecard',
      title: 'Niche Profitability Scorecard',
      category: 'diagnostics',
      categoryLabel: 'Market Validation',
      icon: Target,
      color: '#1F2937',
      status: 'Live & Active',
      isLive: true,
      description:
        'Score potential digital product niches across 4 commercial pillars: pain urgency, purchasing power, faceless delivery fit, and competition saturation before creating anything.',
      time: '4 mins',
      href: '/scorecard',
      actionLabel: 'Score Your Niche',
    },
    {
      id: 'roi-engine',
      title: '10X Asset ROI Multiplier',
      category: 'calculators',
      categoryLabel: 'Return on Effort',
      icon: TrendingUp,
      color: '#F18B25',
      status: 'Live & Active',
      isLive: true,
      description:
        'Compare the lifetime cashflow and net margins of faceless digital assets against physical real estate, stock portfolios, and active client consulting.',
      time: '3 mins',
      href: '/roi',
      actionLabel: 'Calculate Multiplier',
    },
    {
      id: 'freedom-calculator',
      title: 'Freedom Number Calculator',
      category: 'calculators',
      categoryLabel: 'Cashflow Planning',
      icon: DollarSign,
      color: '#47B7D4',
      status: 'Live & Active',
      isLive: true,
      description:
        'Determine your baseline monthly freedom threshold and map the exact unit sales per week needed across $27, $47, and $97 products to leave corporate work.',
      time: '3 mins',
      href: '/freedom',
      actionLabel: 'Find Freedom Number',
    },
    {
      id: 'automation-studio',
      title: 'Content & Automation Studio',
      category: 'automation',
      categoryLabel: 'AI Engine',
      icon: Cpu,
      color: '#1F2937',
      status: 'Coming Soon (Q2)',
      isLive: false,
      description:
        'Autonomous prompt pipelines and Supabase Edge scripts to generate, format, and schedule faceless newsletter content and digital download delivery automatically.',
      time: 'Autonomous',
      href: '/automation',
      actionLabel: 'Preview Architecture',
    },
  ];

  const filteredTools =
    activeCategory === 'all'
      ? tools
      : tools.filter((t) => t.category === activeCategory);

  const categories = [
    { id: 'all', label: 'All Tools & Agents' },
    { id: 'calculators', label: 'Financial Calculators' },
    { id: 'diagnostics', label: 'Archetype & Niche' },
    { id: 'automation', label: 'AI & Automation' },
  ];

  return (
    <div style={{ backgroundColor: '#FFFCF9', color: '#1F2937', minHeight: '100vh' }}>
      
      {/* Header Section — Centered */}
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
            <Wrench size={13} color="#F18B25" />
            <span>Interactive Diagnostic Suite</span>
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
          Tools, Calculators & Autonomous Engines
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
          Zero fluff, zero theory. Private, browser-based tools designed specifically to help 
          Gen X women evaluate retirement shortfalls, validate digital product niches, and model recurring cashflow.
        </p>

        {/* Filter Tabs (Thin Frame, No Shadow) */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem',
            marginBottom: '2.5rem',
          }}
        >
          {categories.map((cat) => {
            const isSelected = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                style={{
                  backgroundColor: isSelected ? '#1F2937' : '#FFFFFF',
                  color: isSelected ? '#FFFFFF' : '#1F2937',
                  border: '1.5px solid #1F2937',
                  padding: '0.5rem 1rem',
                  fontSize: '0.78rem',
                  fontFamily: "'Inter', system-ui, sans-serif",
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  letterSpacing: '0.04em',
                  cursor: 'pointer',
                  boxShadow: 'none',
                  transition: 'all 0.15s ease',
                }}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </section>

      {/* Grid of Tools — Centered (Max-Width 1040px) */}
      <section
        style={{
          maxWidth: '1040px',
          margin: '0 auto',
          padding: '0 1.25rem 4rem',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(310px, 1fr))',
            gap: '1.5rem',
          }}
        >
          {filteredTools.map((tool) => {
            const Icon = tool.icon;
            return (
              <div
                key={tool.id}
                style={{
                  backgroundColor: '#FFFFFF',
                  border: '1.5px solid #1F2937',
                  padding: '1.75rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  boxShadow: 'none',
                }}
              >
                <div>
                  {/* Card Header: Icon + Category + Status */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      justifyContent: 'space-between',
                      marginBottom: '1.25rem',
                    }}
                  >
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
                      <Icon size={20} color={tool.color} />
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.25rem' }}>
                      <span
                        style={{
                          fontSize: '0.68rem',
                          fontWeight: 800,
                          textTransform: 'uppercase',
                          letterSpacing: '0.06em',
                          color: '#6B7280',
                        }}
                      >
                        {tool.categoryLabel}
                      </span>
                      <span
                        style={{
                          fontSize: '0.65rem',
                          fontWeight: 700,
                          color: tool.isLive ? '#15803D' : '#B45309',
                          backgroundColor: tool.isLive ? '#DCFCE7' : '#FEF3C7',
                          padding: '0.1rem 0.4rem',
                          border: `1px solid ${tool.isLive ? '#86EFAC' : '#FDE68A'}`,
                        }}
                      >
                        {tool.status}
                      </span>
                    </div>
                  </div>

                  {/* Title */}
                  <h3
                    style={{
                      fontFamily: "'Inter', system-ui, sans-serif",
                      fontSize: '1.15rem',
                      fontWeight: 800,
                      textTransform: 'uppercase',
                      letterSpacing: '-0.01em',
                      color: '#1F2937',
                      marginBottom: '0.65rem',
                    }}
                  >
                    {tool.title}
                  </h3>

                  {/* Description */}
                  <p
                    style={{
                      fontFamily: "'DM Sans', system-ui, sans-serif",
                      fontSize: '0.88rem',
                      color: '#4B5563',
                      lineHeight: 1.55,
                      marginBottom: '1.5rem',
                    }}
                  >
                    {tool.description}
                  </p>
                </div>

                {/* Footer / CTA (Centered, Thin Frame) */}
                <div>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      paddingTop: '1rem',
                      borderTop: '1px solid #E5E7EB',
                      marginBottom: '1rem',
                      fontSize: '0.78rem',
                      color: '#6B7280',
                    }}
                  >
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
                      <Clock size={13} /> {tool.time}
                    </span>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
                      <Shield size={13} color="#F18B25" /> 100% Private
                    </span>
                  </div>

                  <Link
                    to={tool.href}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.45rem',
                      backgroundColor: tool.isLive ? '#F18B25' : '#FFFFFF',
                      border: '1.5px solid #1F2937',
                      color: '#1F2937',
                      fontFamily: "'Inter', system-ui, sans-serif",
                      fontSize: '0.82rem',
                      fontWeight: 800,
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                      padding: '0.75rem 1rem',
                      textDecoration: 'none',
                      boxShadow: 'none',
                    }}
                  >
                    <span>{tool.actionLabel}</span>
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Suggest a Tool Banner — Centered */}
        <div
          style={{
            marginTop: '3.5rem',
            backgroundColor: '#FAF8F5',
            border: '1.5px solid #1F2937',
            padding: '2rem 1.5rem',
            textAlign: 'center',
          }}
        >
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: '#F18B25', marginBottom: '0.5rem' }}>
            <MessageSquare size={16} />
            <span style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              Co-Creation Priority
            </span>
          </div>
          <h3
            style={{
              fontFamily: "'Inter', system-ui, sans-serif",
              fontSize: '1.25rem',
              fontWeight: 800,
              textTransform: 'uppercase',
              color: '#1F2937',
              marginBottom: '0.5rem',
            }}
          >
            Need a specific calculator or validation engine?
          </h3>
          <p
            style={{
              fontFamily: "'DM Sans', system-ui, sans-serif",
              fontSize: '0.92rem',
              color: '#4B5563',
              maxWidth: '560px',
              margin: '0 auto 1.5rem',
              lineHeight: 1.55,
            }}
          >
            We build custom tools based on community requests. Tell us what calculation or checklist would save you the most time.
          </p>
          <Link
            to="/#feedback"
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
              letterSpacing: '0.05em',
              padding: '0.75rem 1.5rem',
              textDecoration: 'none',
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
