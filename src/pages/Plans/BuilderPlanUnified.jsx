import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Layers,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Shield,
  Clock,
  Cpu,
  Database,
  Lock,
  Zap,
} from 'lucide-react';

export default function BuilderPlanUnified() {
  const [billingCycle, setBillingCycle] = useState('monthly'); // 'monthly' | 'lifetime'

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
              <Sparkles size={14} color="#F18B25" />
              <span>Core Execution Blueprint</span>
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
            The <span style={{ color: '#F18B25' }}>Builder</span> Plan
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
            The complete step-by-step operating system for Gen X women building their first $500–$2,000/month
            faceless digital asset portfolio. Zero tech intimidation.
          </p>

          {/* Billing Toggle */}
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
              Monthly ($47/mo)
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
              Lifetime Pass ($297)
            </button>
          </div>
        </div>
      </section>

      {/* 2. CARD & DELIVERABLES */}
      <section style={{ maxWidth: '900px', margin: '0 auto', padding: '4rem 1.25rem' }}>
        <div
          style={{
            backgroundColor: '#FFFFFF',
            border: '2px solid #1F2937',
            padding: 'clamp(2rem, 4vw, 3rem)',
            boxShadow: '6px 6px 0 0 #1F2937',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', borderBottom: '2px solid #1F2937', paddingBottom: '1.75rem', marginBottom: '2rem' }}>
            <div>
              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.75rem', fontWeight: 900, textTransform: 'uppercase', color: '#F18B25', letterSpacing: '0.1em' }}>
                Full Builder Access
              </span>
              <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '3rem', fontWeight: 900, color: '#1F2937', lineHeight: 1, marginTop: '0.35rem' }}>
                {billingCycle === 'monthly' ? '$47' : '$297'}
                <span style={{ fontSize: '1rem', fontWeight: 700, color: '#6B7280', textTransform: 'none', marginLeft: '0.35rem' }}>
                  {billingCycle === 'monthly' ? '/ month' : 'one-time payment'}
                </span>
              </div>
            </div>

            <a
              href="https://buy.stripe.com/test_builder"
              target="_blank"
              rel="noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '1rem 2rem',
                backgroundColor: '#F18B25',
                color: '#1F2937',
                border: '2px solid #1F2937',
                fontFamily: "'Inter', sans-serif",
                fontSize: '0.85rem',
                fontWeight: 900,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                textDecoration: 'none',
                boxShadow: '4px 4px 0 0 #1F2937',
              }}
            >
              <span>{billingCycle === 'monthly' ? 'Start Builder Membership' : 'Get Lifetime Access'}</span>
              <ArrowRight size={15} />
            </a>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
            <h2 style={{ fontFamily: "'Inter', sans-serif", fontSize: '1.25rem', fontWeight: 900, textTransform: 'uppercase', color: '#1F2937', margin: 0 }}>
              What's Included in Builder:
            </h2>

            {[
              {
                title: 'The 4-Tier Faceless System Video Course',
                desc: '12 bite-sized video modules walking step-by-step through niche validation, product architecture, automated funnels, and scaling.',
              },
              {
                title: 'Notion Digital Asset Operating System',
                desc: 'Ready-to-clone workspace with product databases, customer trackers, content calendar, and legal privacy checklist.',
              },
              {
                title: 'AI Prompt Chains & Product Blueprints',
                desc: 'Pre-engineered prompts that turn your corporate expertise into sellable checklists, calculators, and SOPs in under 60 minutes.',
              },
              {
                title: 'Email Automation & Lead Magnet Templates',
                desc: 'Pre-written 5-day welcome sequences and conversion email copy optimized for faceless distribution.',
              },
              {
                title: 'Private Gen X Peer Community Access',
                desc: 'Connect with hundreds of women walking the exact same digital reinvention journey with zero hustle culture fluff.',
              },
            ].map((item, idx) => (
              <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                <CheckCircle2 size={18} color="#16A34A" style={{ flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <h3 style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.95rem', fontWeight: 900, color: '#1F2937', margin: '0 0 0.2rem' }}>
                    {item.title}
                  </h3>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.88rem', color: '#4B5563', margin: 0, lineHeight: 1.5 }}>
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: '2.5rem', paddingTop: '1.5rem', borderTop: '1px solid #E5E7EB', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', fontSize: '0.75rem', color: '#6B7280', fontFamily: "'Inter', sans-serif", fontWeight: 800, textTransform: 'uppercase' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <Shield size={14} color="#16A34A" /> 30-Day Money Back Guarantee
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <Lock size={14} color="#16A34A" /> Cancel Anytime in 1-Click
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}
