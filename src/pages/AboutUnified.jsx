import React from 'react';
import { Link } from 'react-router-dom';
import {
  Shield,
  Sparkles,
  ArrowRight,
  Target,
  Heart,
  Lock,
  Layers,
  CheckCircle2,
  TrendingUp,
  Clock
} from 'lucide-react';

export default function AboutUnified() {
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
            <Shield size={13} color="#F18B25" />
            <span>Our Origin & Purpose</span>
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
          Built for the Generation That Did Everything Right
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
          Gen X women are the economic backbone of families, corporations, and communities—yet face the 
          steepest retirement deficit in modern history. DigitallyDefined was built to change that reality.
        </p>
      </section>

      {/* Main Narrative — Centered */}
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
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '1.75rem',
            marginBottom: '3rem',
          }}
        >
          <div
            style={{
              backgroundColor: '#FFFFFF',
              border: '1.5px solid #1F2937',
              padding: 'clamp(1.5rem, 3.5vw, 2.25rem)',
              boxShadow: 'none',
            }}
          >
            <h2
              style={{
                fontFamily: "'Inter', system-ui, sans-serif",
                fontSize: '1.25rem',
                fontWeight: 900,
                textTransform: 'uppercase',
                color: '#1F2937',
                marginBottom: '1rem',
                paddingBottom: '0.65rem',
                borderBottom: '1.5px solid #1F2937',
              }}
            >
              The Unspoken Reality
            </h2>
            <p style={{ fontSize: '0.92rem', color: '#4B5563', lineHeight: 1.6, marginBottom: '1rem' }}>
              Between caregiving for aging parents, raising children into adulthood, navigating corporate glass ceilings, 
              and enduring two major recessions, millions of Gen X women find themselves with 10–15 years left before traditional retirement age.
            </p>
            <p style={{ fontSize: '0.92rem', color: '#4B5563', lineHeight: 1.6, margin: 0 }}>
              The traditional financial advice — <em>"just save 15% more"</em> — doesn't add up when you have a $500k shortfall. You don't need another generic budget. You need <strong>high-margin leverage</strong>.
            </p>
          </div>

          <div
            style={{
              backgroundColor: '#FFFFFF',
              border: '1.5px solid #1F2937',
              padding: 'clamp(1.5rem, 3.5vw, 2.25rem)',
              boxShadow: 'none',
            }}
          >
            <h2
              style={{
                fontFamily: "'Inter', system-ui, sans-serif",
                fontSize: '1.25rem',
                fontWeight: 900,
                textTransform: 'uppercase',
                color: '#1F2937',
                marginBottom: '1rem',
                paddingBottom: '0.65rem',
                borderBottom: '1.5px solid #1F2937',
              }}
            >
              Quiet Power & Faceless Assets
            </h2>
            <p style={{ fontSize: '0.92rem', color: '#4B5563', lineHeight: 1.6, marginBottom: '1rem' }}>
              We reject influencer culture, dancing on TikTok, and exhausting content treadmills. 
              Modern AI tools now allow a single experienced woman to package her problem-solving frameworks into utility-first digital real estate.
            </p>
            <p style={{ fontSize: '0.92rem', color: '#4B5563', lineHeight: 1.6, margin: 0 }}>
              Templates, calculators, prompt packs, and automated Notion systems generate recurring $500–$2,000 monthly income streams that work 24/7 in the background.
            </p>
          </div>
        </div>

        {/* 3 Core Tenets — Centered */}
        <div
          style={{
            backgroundColor: '#FAF8F5',
            border: '1.5px solid #1F2937',
            padding: '2rem 1.5rem',
            textAlign: 'center',
          }}
        >
          <h3
            style={{
              fontFamily: "'Inter', system-ui, sans-serif",
              fontSize: '1.25rem',
              fontWeight: 900,
              textTransform: 'uppercase',
              color: '#1F2937',
              marginBottom: '1.5rem',
            }}
          >
            Our Standing Principles
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem', textAlign: 'left' }}>
            <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #1F2937', padding: '1.25rem' }}>
              <div style={{ fontSize: '0.72rem', fontWeight: 800, color: '#F18B25', textTransform: 'uppercase', marginBottom: '0.35rem' }}>
                Principle 01
              </div>
              <h4 style={{ fontFamily: "'Inter', system-ui, sans-serif", fontSize: '0.95rem', fontWeight: 800, textTransform: 'uppercase', color: '#1F2937', marginBottom: '0.4rem' }}>
                0 Hours On Camera
              </h4>
              <p style={{ fontSize: '0.82rem', color: '#4B5563', lineHeight: 1.5, margin: 0 }}>
                Your value is in your insights, structure, and problem-solving systems—not your personal likeness.
              </p>
            </div>

            <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #1F2937', padding: '1.25rem' }}>
              <div style={{ fontSize: '0.72rem', fontWeight: 800, color: '#F18B25', textTransform: 'uppercase', marginBottom: '0.35rem' }}>
                Principle 02
              </div>
              <h4 style={{ fontFamily: "'Inter', system-ui, sans-serif", fontSize: '0.95rem', fontWeight: 800, textTransform: 'uppercase', color: '#1F2937', marginBottom: '0.4rem' }}>
                High-Margin Utility
              </h4>
              <p style={{ fontSize: '0.82rem', color: '#4B5563', lineHeight: 1.5, margin: 0 }}>
                We create digital assets with 85%+ net margins and automated delivery that don't trade hours for dollars.
              </p>
            </div>

            <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #1F2937', padding: '1.25rem' }}>
              <div style={{ fontSize: '0.72rem', fontWeight: 800, color: '#F18B25', textTransform: 'uppercase', marginBottom: '0.35rem' }}>
                Principle 03
              </div>
              <h4 style={{ fontFamily: "'Inter', system-ui, sans-serif", fontSize: '0.95rem', fontWeight: 800, textTransform: 'uppercase', color: '#1F2937', marginBottom: '0.4rem' }}>
                100% Client Privacy
              </h4>
              <p style={{ fontSize: '0.82rem', color: '#4B5563', lineHeight: 1.5, margin: 0 }}>
                Diagnostic calculations remain on your device. We respect boundaries, clarity, and autonomy.
              </p>
            </div>
          </div>

          <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'center' }}>
            <Link
              to="/start-here"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                backgroundColor: '#F18B25',
                border: '1.5px solid #1F2937',
                color: '#1F2937',
                fontSize: '0.85rem',
                fontWeight: 800,
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                padding: '0.85rem 2rem',
                textDecoration: 'none',
              }}
            >
              <span>Begin Your Path Here</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
