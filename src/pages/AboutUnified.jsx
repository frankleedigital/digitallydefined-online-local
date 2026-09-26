import React from 'react';
import { Link } from 'react-router-dom';
import {
  Shield,
  ArrowRight,
  Sparkles,
  EyeOff,
  TrendingUp,
  Cpu,
  HeartHandshake,
  CheckCircle2,
} from 'lucide-react';

export default function AboutUnified() {
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
              <HeartHandshake size={14} color="#F18B25" />
              <span>The Faceless Manifesto</span>
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
            Built For The Women Who <span style={{ color: '#F18B25' }}>Carried It All</span>
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
            DigitallyDefined is the anti-influencer digital wealth platform. We help Gen X women build privacy-first
            cashflow engines that restore financial control without personal sacrifice.
          </p>
        </div>
      </section>

      {/* 2. STORY & PILLARS */}
      <section style={{ maxWidth: '900px', margin: '0 auto', padding: '4rem 1.25rem' }}>
        <div
          style={{
            backgroundColor: '#FFFFFF',
            border: '2px solid #1F2937',
            padding: 'clamp(2rem, 4vw, 3rem)',
            boxShadow: '6px 6px 0 0 #1F2937',
            display: 'flex',
            flexDirection: 'column',
            gap: '2rem',
          }}
        >
          <div>
            <h2 style={{ fontFamily: "'Inter', sans-serif", fontSize: '1.4rem', fontWeight: 900, textTransform: 'uppercase', color: '#1F2937', marginBottom: '0.75rem' }}>
              Why We Are Passionate About Gen X
            </h2>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.95rem', lineHeight: 1.7, color: '#4B5563', margin: 0 }}>
              Gen X was promised that loyalty, corporate dedication, and a standard 401(k) would guarantee a dignified retirement.
              Instead, layoffs after 45, rising healthcare costs, caregiving obligations for parents and children, and inflation created a $540,000 median shortfall.
              We reject the idea that you are "too late." Your lifetime of domain knowledge is the highest-value raw material on the internet.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', paddingTop: '1rem', borderTop: '2px solid #1F2937' }}>
            <div>
              <h3 style={{ fontFamily: "'Inter', sans-serif", fontSize: '1.05rem', fontWeight: 900, textTransform: 'uppercase', color: '#F18B25', marginBottom: '0.35rem' }}>
                1. Quiet Power
              </h3>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.88rem', color: '#4B5563', margin: 0, lineHeight: 1.55 }}>
                We believe true authority is delivered through clean, useful tools and systems — not loud social media dances.
              </p>
            </div>

            <div>
              <h3 style={{ fontFamily: "'Inter', sans-serif", fontSize: '1.05rem', fontWeight: 900, textTransform: 'uppercase', color: '#47B7D4', marginBottom: '0.35rem' }}>
                2. Total Privacy
              </h3>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.88rem', color: '#4B5563', margin: 0, lineHeight: 1.55 }}>
                Your personal life belongs to you. Every asset model we teach is designed to function seamlessly without your face or name.
              </p>
            </div>

            <div>
              <h3 style={{ fontFamily: "'Inter', sans-serif", fontSize: '1.05rem', fontWeight: 900, textTransform: 'uppercase', color: '#16A34A', marginBottom: '0.35rem' }}>
                3. Mathematical Certainty
              </h3>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.88rem', color: '#4B5563', margin: 0, lineHeight: 1.55 }}>
                We model income on simple, reliable math: 3 products x 15 sales/mo at $47 = $2,115/mo in passive cashflow.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
