import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Shield,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Zap,
  Crown,
  Lock,
} from 'lucide-react';

export default function PricingUnified() {
  const [billingCycle, setBillingCycle] = useState('monthly'); // 'monthly' | 'lifetime'

  const PLANS = [
    {
      id: 'starter',
      name: 'Starter Tools',
      badge: 'Free Tier',
      badgeBg: '#FFFCF9',
      badgeColor: '#1F2937',
      price: '$0',
      period: 'Forever free',
      desc: 'Essential diagnostics and calculators to benchmark your financial position.',
      features: [
        'Retirement Gap Diagnostic Calculator',
        'Digital Superpower Quiz (Archetype profile)',
        'Niche Profitability Scorecard (Basic)',
        'Weekly Faceless Blueprint Newsletter',
      ],
      cta: 'Start Free Today',
      route: '/start-here',
      primary: false,
    },
    {
      id: 'builder',
      name: 'Builder Plan',
      badge: 'Most Popular',
      badgeBg: '#F18B25',
      badgeColor: '#1F2937',
      price: billingCycle === 'monthly' ? '$47' : '$297',
      period: billingCycle === 'monthly' ? '/ month' : 'lifetime pass',
      desc: 'The complete step-by-step operating system to build your first $500–$2k/mo digital asset.',
      features: [
        'Complete 4-Tier Faceless System Video Course',
        'Notion Digital Asset Operating System',
        'AI Prompt Chains & Product Blueprint Kits',
        'Email Automation & Lead Magnet Templates',
        'Private Gen X Peer Community Access',
      ],
      cta: billingCycle === 'monthly' ? 'Join Builder ($47/mo)' : 'Get Lifetime ($297)',
      route: '/builder',
      primary: true,
    },
    {
      id: 'empire',
      name: 'Empire Tier',
      badge: 'Advisory Suite',
      badgeBg: '#FEF3C7',
      badgeColor: '#B45309',
      price: billingCycle === 'monthly' ? '$197' : '$997',
      period: billingCycle === 'monthly' ? '/ month' : 'lifetime pass',
      desc: 'For Gen X leaders building a multi-asset portfolio with private architecture review.',
      features: [
        'Everything in Builder Plan',
        'Private 1-on-1 Product & Niche Review',
        'Custom Automation & Edge Webhook Blueprints',
        'Multi-Asset Portfolio Scaling Playbook',
        'Direct Access Advisory Slack / Discord',
      ],
      cta: billingCycle === 'monthly' ? 'Join Empire ($197/mo)' : 'Get Empire Lifetime ($997)',
      route: '/empire',
      primary: false,
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
              <Shield size={14} color="#F18B25" />
              <span>Transparent & Risk-Free</span>
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
            Simple, Honest <span style={{ color: '#F18B25' }}>Membership</span> Plans
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
            Every plan comes with a 30-day 100% money-back guarantee. No lock-in contracts. Cancel anytime.
          </p>

          {/* Toggle */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              backgroundColor: '#FFFCF9',
              border: '2px solid #1F2937',
              padding: '0.35rem',
              boxShadow: '3px 3px 0 0 #1F2937',
            }}
          >
            <button
              onClick={() => setBillingCycle('monthly')}
              style={{
                padding: '0.55rem 1.25rem',
                backgroundColor: billingCycle === 'monthly' ? '#1F2937' : 'transparent',
                color: billingCycle === 'monthly' ? '#FFFFFF' : '#1F2937',
                border: 'none',
                fontFamily: "'Inter', sans-serif",
                fontSize: '0.75rem',
                fontWeight: 900,
                textTransform: 'uppercase',
                cursor: 'pointer',
              }}
            >
              Monthly Billing
            </button>
            <button
              onClick={() => setBillingCycle('lifetime')}
              style={{
                padding: '0.55rem 1.25rem',
                backgroundColor: billingCycle === 'lifetime' ? '#1F2937' : 'transparent',
                color: billingCycle === 'lifetime' ? '#FFFFFF' : '#1F2937',
                border: 'none',
                fontFamily: "'Inter', sans-serif",
                fontSize: '0.75rem',
                fontWeight: 900,
                textTransform: 'uppercase',
                cursor: 'pointer',
              }}
            >
              Lifetime Pass (Save 40%)
            </button>
          </div>
        </div>
      </section>

      {/* 2. PLANS GRID */}
      <section style={{ maxWidth: '1080px', margin: '0 auto', padding: '4rem 1.25rem' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem',
            alignItems: 'stretch',
          }}
        >
          {PLANS.map((plan) => (
            <div
              key={plan.id}
              style={{
                backgroundColor: '#FFFFFF',
                border: plan.primary ? '3px solid #1F2937' : '2px solid #1F2937',
                padding: '2.25rem 1.75rem',
                boxShadow: plan.primary ? '6px 6px 0 0 #F18B25' : '4px 4px 0 0 #1F2937',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                position: 'relative',
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                  <span
                    style={{
                      padding: '0.2rem 0.55rem',
                      backgroundColor: plan.badgeBg,
                      color: plan.badgeColor,
                      border: '1.5px solid #1F2937',
                      fontFamily: "'Inter', sans-serif",
                      fontSize: '0.65rem',
                      fontWeight: 900,
                      textTransform: 'uppercase',
                    }}
                  >
                    {plan.badge}
                  </span>
                </div>

                <h2 style={{ fontFamily: "'Inter', sans-serif", fontSize: '1.5rem', fontWeight: 900, textTransform: 'uppercase', color: '#1F2937', margin: '0 0 0.5rem' }}>
                  {plan.name}
                </h2>

                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.88rem', color: '#6B7280', margin: '0 0 1.5rem', lineHeight: 1.5 }}>
                  {plan.desc}
                </p>

                <div style={{ borderTop: '2px solid #1F2937', borderBottom: '2px solid #1F2937', padding: '1.25rem 0', marginBottom: '1.75rem' }}>
                  <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '2.75rem', fontWeight: 900, color: '#1F2937', lineHeight: 1 }}>
                    {plan.price}
                    <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#6B7280', textTransform: 'none', marginLeft: '0.35rem' }}>
                      {plan.period}
                    </span>
                  </div>
                </div>

                <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 2rem', display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                  {plan.features.map((feat, idx) => (
                    <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.45rem', fontSize: '0.85rem', color: '#1F2937', fontFamily: "'DM Sans', sans-serif" }}>
                      <CheckCircle2 size={15} color="#16A34A" style={{ flexShrink: 0, marginTop: '2px' }} />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Link
                to={plan.route}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.45rem',
                  padding: '0.9rem 1.5rem',
                  backgroundColor: plan.primary ? '#F18B25' : '#FFFCF9',
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
                <span>{plan.cta}</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
