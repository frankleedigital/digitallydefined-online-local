import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Check,
  ArrowRight,
  Shield,
  Sparkles,
  Zap,
  Crown,
  HelpCircle,
  Clock,
  Lock,
  Layers,
  CheckCircle2
} from 'lucide-react';

export default function PricingUnified() {
  const [billingCycle, setBillingCycle] = useState('monthly'); // 'monthly' | 'lifetime'

  const plans = [
    {
      id: 'starter',
      name: 'Starter & Discovery',
      badge: 'Free Forever',
      priceMonthly: '$0',
      priceLifetime: '$0',
      period: 'no credit card required',
      description: 'Full access to all client-side calculators, archetype diagnostic, and the 4-tier blueprint.',
      icon: Sparkles,
      color: '#47B7D4',
      features: [
        'Digital Superpower Quiz & Archetype Profile',
        'Retirement Gap Calculator & Financial Model',
        'Niche Profitability Scorecard',
        'Complete 4-Tier Blueprint Overview',
        'Client-Side Data Privacy',
      ],
      ctaText: 'Start Free Today',
      ctaHref: '/start-here',
      isPopular: false,
      btnStyle: {
        backgroundColor: '#FFFFFF',
        color: '#1F2937',
      },
    },
    {
      id: 'builder',
      name: 'Builder Fast-Track',
      badge: 'Most Popular',
      priceMonthly: '$47',
      priceLifetime: '$297',
      period: billingCycle === 'monthly' ? '/ month' : 'one-time payment',
      description: 'The step-by-step implementation toolkit to build and launch your first 2 faceless digital assets.',
      icon: Zap,
      color: '#F18B25',
      features: [
        'Everything in Starter Tier',
        '10 Faceless Asset Prompt Blueprints (AI-Powered)',
        'Pre-built Notion Template Operating Systems',
        '1-Page Checkout Funnel Copy & Design Frameworks',
        'Stripe & Lemon Squeezy Integration Cheatsheets',
        'Hermes AI Mentor System Guidance',
      ],
      ctaText: 'Join Builder Tier',
      ctaHref: '/plans/builder',
      isPopular: true,
      btnStyle: {
        backgroundColor: '#F18B25',
        color: '#1F2937',
      },
    },
    {
      id: 'empire',
      name: 'Empire & Automation',
      badge: 'Complete Portfolio',
      priceMonthly: '$197',
      priceLifetime: '$997',
      period: billingCycle === 'monthly' ? '/ month' : 'one-time payment',
      description: 'For women ready to build a 5+ asset portfolio with autonomous email sequences and multi-platform distribution.',
      icon: Crown,
      color: '#1F2937',
      features: [
        'Everything in Builder Tier',
        'Autonomous Content & Email Workflow Pipelines',
        'Supabase Edge Automation Blueprints',
        'Multi-Asset Portfolio Scaling Playbook',
        'Private Quarterly Strategy & Portfolio Review',
        'Direct Access to Next-Gen Tools & Updates',
      ],
      ctaText: 'Join Empire Tier',
      ctaHref: '/plans/empire',
      isPopular: false,
      btnStyle: {
        backgroundColor: '#1F2937',
        color: '#FFFFFF',
      },
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
              color: '#F18B25',
              boxShadow: 'none',
            }}
          >
            <Sparkles size={13} color="#F18B25" />
            <span>Transparent Investment</span>
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
          Simple, Predictable Plans for Gen X Women
        </h1>

        <p
          style={{
            fontFamily: "'DM Sans', system-ui, sans-serif",
            fontSize: '1.05rem',
            color: '#4B5563',
            maxWidth: '640px',
            margin: '0 auto 2rem',
            lineHeight: 1.6,
          }}
        >
          Start completely free with our diagnostic tools, or unlock production-ready prompt systems 
          and templates to build your faceless digital real estate in days.
        </p>

        {/* Toggle Monthly / Lifetime */}
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
            onClick={() => setBillingCycle('monthly')}
            style={{
              backgroundColor: billingCycle === 'monthly' ? '#1F2937' : 'transparent',
              color: billingCycle === 'monthly' ? '#FFFFFF' : '#1F2937',
              border: 'none',
              padding: '0.45rem 1rem',
              fontFamily: "'Inter', system-ui, sans-serif",
              fontSize: '0.75rem',
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              cursor: 'pointer',
            }}
          >
            Monthly Membership
          </button>
          <button
            type="button"
            onClick={() => setBillingCycle('lifetime')}
            style={{
              backgroundColor: billingCycle === 'lifetime' ? '#1F2937' : 'transparent',
              color: billingCycle === 'lifetime' ? '#FFFFFF' : '#1F2937',
              border: 'none',
              padding: '0.45rem 1rem',
              fontFamily: "'Inter', system-ui, sans-serif",
              fontSize: '0.75rem',
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem',
            }}
          >
            <span>Lifetime Access</span>
            <span style={{ color: '#F18B25', fontSize: '0.65rem', fontWeight: 900 }}>SAVE 50%</span>
          </button>
        </div>
      </section>

      {/* Pricing Cards Grid — Centered (Max-Width 1040px) */}
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
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '1.5rem',
            alignItems: 'stretch',
          }}
        >
          {plans.map((plan) => {
            const Icon = plan.icon;
            const price = billingCycle === 'monthly' ? plan.priceMonthly : plan.priceLifetime;
            return (
              <div
                key={plan.id}
                style={{
                  backgroundColor: '#FFFFFF',
                  border: plan.isPopular ? '2px solid #F18B25' : '1.5px solid #1F2937',
                  padding: '1.75rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  boxShadow: 'none',
                  position: 'relative',
                }}
              >
                {/* Popular Pill */}
                {plan.isPopular && (
                  <div
                    style={{
                      position: 'absolute',
                      top: '-12px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      backgroundColor: '#F18B25',
                      border: '1.5px solid #1F2937',
                      color: '#1F2937',
                      fontSize: '0.65rem',
                      fontWeight: 900,
                      textTransform: 'uppercase',
                      letterSpacing: '0.08em',
                      padding: '0.15rem 0.65rem',
                    }}
                  >
                    {plan.badge}
                  </div>
                )}

                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '1rem' }}>
                    <div
                      style={{
                        width: '38px',
                        height: '38px',
                        backgroundColor: '#FAF8F5',
                        border: '1.5px solid #1F2937',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Icon size={18} color={plan.color} />
                    </div>
                    <div>
                      <h3
                        style={{
                          fontFamily: "'Inter', system-ui, sans-serif",
                          fontSize: '1.1rem',
                          fontWeight: 900,
                          textTransform: 'uppercase',
                          color: '#1F2937',
                          margin: 0,
                        }}
                      >
                        {plan.name}
                      </h3>
                      {!plan.isPopular && (
                        <span style={{ fontSize: '0.7rem', color: '#6B7280', fontWeight: 600 }}>
                          {plan.badge}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Price */}
                  <div style={{ marginBottom: '1.25rem' }}>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.35rem' }}>
                      <span
                        style={{
                          fontFamily: "'Inter', system-ui, sans-serif",
                          fontSize: '2.5rem',
                          fontWeight: 900,
                          color: '#1F2937',
                          lineHeight: 1,
                        }}
                      >
                        {price}
                      </span>
                      <span style={{ fontSize: '0.82rem', color: '#6B7280', fontWeight: 600 }}>
                        {plan.period}
                      </span>
                    </div>
                    <p style={{ fontSize: '0.85rem', color: '#4B5563', lineHeight: 1.5, marginTop: '0.65rem', margin: 0 }}>
                      {plan.description}
                    </p>
                  </div>

                  {/* Features List */}
                  <div style={{ borderTop: '1px solid #E5E7EB', paddingTop: '1.25rem', marginBottom: '1.75rem' }}>
                    <div style={{ fontSize: '0.72rem', fontWeight: 800, textTransform: 'uppercase', color: '#1F2937', marginBottom: '0.75rem' }}>
                      What's Included:
                    </div>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                      {plan.features.map((feat, fIdx) => (
                        <li
                          key={fIdx}
                          style={{
                            display: 'flex',
                            alignItems: 'flex-start',
                            gap: '0.5rem',
                            fontSize: '0.84rem',
                            fontFamily: "'DM Sans', system-ui, sans-serif",
                            color: '#4B5563',
                            lineHeight: 1.45,
                          }}
                        >
                          <Check size={15} color="#F18B25" style={{ flexShrink: 0, marginTop: '0.15rem' }} />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* CTA Button */}
                <div>
                  <Link
                    to={plan.ctaHref}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.45rem',
                      backgroundColor: plan.btnStyle.backgroundColor,
                      color: plan.btnStyle.color,
                      border: '1.5px solid #1F2937',
                      fontFamily: "'Inter', system-ui, sans-serif",
                      fontSize: '0.82rem',
                      fontWeight: 800,
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                      padding: '0.85rem',
                      textDecoration: 'none',
                      boxShadow: 'none',
                    }}
                  >
                    <span>{plan.ctaText}</span>
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* 100% Satisfaction & Guarantee Banner — Centered */}
        <div
          style={{
            marginTop: '3.5rem',
            backgroundColor: '#FAF8F5',
            border: '1.5px solid #1F2937',
            padding: '2rem 1.5rem',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1.5rem',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', maxWidth: '640px' }}>
            <div
              style={{
                width: '46px',
                height: '46px',
                backgroundColor: '#FFF7ED',
                border: '1.5px solid #F18B25',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <Shield size={22} color="#F18B25" />
            </div>
            <div>
              <h4
                style={{
                  fontFamily: "'Inter', system-ui, sans-serif",
                  fontSize: '1rem',
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  color: '#1F2937',
                  margin: '0 0 0.25rem 0',
                }}
              >
                14-Day Practical Action Guarantee
              </h4>
              <p style={{ fontSize: '0.85rem', color: '#4B5563', margin: 0, lineHeight: 1.5 }}>
                If you follow the prompt blueprints and don't have a validated digital product topic and draft within 14 days, email us for an unconditional refund.
              </p>
            </div>
          </div>

          <Link
            to="/start-here"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.45rem',
              backgroundColor: '#FFFFFF',
              border: '1.5px solid #1F2937',
              color: '#1F2937',
              fontSize: '0.78rem',
              fontWeight: 800,
              textTransform: 'uppercase',
              padding: '0.7rem 1.25rem',
              textDecoration: 'none',
              whiteSpace: 'nowrap',
            }}
          >
            <span>Start Free Diagnostic</span>
            <ArrowRight size={13} />
          </Link>
        </div>
      </section>

    </div>
  );
}
