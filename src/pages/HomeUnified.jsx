import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  ArrowRight,
  Shield,
  Clock,
  TrendingUp,
  Calculator,
  Compass,
  Layers,
  Wrench,
  CheckCircle2,
  HeartHandshake,
  Lock,
  ChevronRight,
  MessageSquare,
  HelpCircle,
  Award,
  Send,
  Check
} from 'lucide-react';
import { getUserData, subscribeUserData } from '../lib/userState';

export default function HomeUnified() {
  const [userData, setUserData] = useState(() => getUserData());

  // Community Feedback / Co-Creation State
  const [feedbackCategory, setFeedbackCategory] = useState('Faceless Digital Products ($27–$97)');
  const [rating, setRating] = useState('5');
  const [feedbackNotes, setFeedbackNotes] = useState('');
  const [userBackground, setUserBackground] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const unsub = subscribeUserData((updated) => {
      setUserData(updated);
    });
    return unsub;
  }, []);

  const handleFeedbackSubmit = (e) => {
    e.preventDefault();
    const submission = {
      category: feedbackCategory,
      rating: rating,
      notes: feedbackNotes,
      background: userBackground,
      timestamp: new Date().toISOString(),
    };
    try {
      const existing = JSON.parse(localStorage.getItem('dd_community_feedback') || '[]');
      existing.push(submission);
      localStorage.setItem('dd_community_feedback', JSON.stringify(existing));
    } catch (err) {
      console.error('Failed to save feedback locally', err);
    }
    setSubmitted(true);
  };

  const topicOptions = [
    'Faceless Digital Products ($27–$97)',
    'Closing the $500k+ Retirement Gap',
    'AI Workflow & Prompt Blueprints',
    'Niche Selection & Validation Scorecard',
    'Automated Content & Email Distribution',
    'Notion Operating Systems & Templates',
  ];

  return (
    <div style={{ backgroundColor: '#FFFCF9', color: '#1F2937', minHeight: '100vh' }}>
      
      {/* ========================================================
          HERO SECTION — Centered, Clean, Feminine, Shadow-Free
         ======================================================== */}
      <section
        style={{
          maxWidth: '1040px',
          margin: '0 auto',
          padding: 'clamp(3rem, 6vw, 4.5rem) 1.25rem 3rem',
          textAlign: 'center',
        }}
      >
        {/* Eyebrow Pill */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.25rem' }}>
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
            <span>Gen X Women's Digital Reinvention</span>
          </div>
        </div>

        {/* Main Headline */}
        <h1
          style={{
            fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
            fontWeight: 900,
            fontSize: 'clamp(2.1rem, 4.5vw, 3.4rem)',
            lineHeight: 1.12,
            letterSpacing: '-0.03em',
            textTransform: 'uppercase',
            color: '#1F2937',
            maxWidth: '860px',
            margin: '0 auto 1.25rem',
          }}
        >
          You are not behind. <br />
          You are <span style={{ color: '#F18B25', fontStyle: 'italic' }}>early in the AI shift.</span>
        </h1>

        {/* Supporting Subtitle */}
        <p
          style={{
            fontFamily: "'DM Sans', system-ui, sans-serif",
            fontSize: 'clamp(1rem, 1.8vw, 1.18rem)',
            lineHeight: 1.6,
            color: '#4B5563',
            maxWidth: '680px',
            margin: '0 auto 2.25rem',
          }}
        >
          Gen X women face the largest retirement deficit in history ($540,000 median gap). 
          Build quiet, high-margin faceless digital real estate using AI—without being on camera, 
          without tech overwhelm, and without risking your savings.
        </p>

        {/* Centered Primary CTAs */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1rem',
            marginBottom: '2.5rem',
          }}
        >
          <Link
            to="/gap"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              backgroundColor: '#F18B25',
              border: '1.5px solid #1F2937',
              color: '#1F2937',
              fontFamily: "'Inter', system-ui, sans-serif",
              fontSize: '0.88rem',
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              padding: '0.9rem 2rem',
              textDecoration: 'none',
              boxShadow: 'none',
            }}
          >
            <Calculator size={16} strokeWidth={2.5} />
            <span>Calculate Your Retirement Gap</span>
            <ArrowRight size={15} strokeWidth={2.5} />
          </Link>

          <Link
            to="/quiz"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              backgroundColor: '#FFFFFF',
              border: '1.5px solid #1F2937',
              color: '#1F2937',
              fontFamily: "'Inter', system-ui, sans-serif",
              fontSize: '0.88rem',
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              padding: '0.9rem 1.75rem',
              textDecoration: 'none',
              boxShadow: 'none',
            }}
          >
            <Sparkles size={16} color="#F18B25" />
            <span>Discover Your Superpower</span>
          </Link>
        </div>

        {/* 3 Core Trust Badges */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1.5rem',
            fontSize: '0.82rem',
            fontFamily: "'DM Sans', system-ui, sans-serif",
            color: '#4B5563',
            fontWeight: 600,
          }}
        >
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
            <Shield size={14} color="#F18B25" /> 100% Faceless (No Camera)
          </span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
            <Clock size={14} color="#F18B25" /> 5–7 Hours / Week
          </span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
            <Lock size={14} color="#F18B25" /> Private Client-Side Tools
          </span>
        </div>
      </section>

      {/* ========================================================
          DATA & REALITY SECTION — Centered, Honest, Evidence-Based
         ======================================================== */}
      <section
        style={{
          backgroundColor: '#FAF8F5',
          borderTop: '1.5px solid #1F2937',
          borderBottom: '1.5px solid #1F2937',
          padding: 'clamp(2.5rem, 5vw, 3.75rem) 1.25rem',
        }}
      >
        <div style={{ maxWidth: '1040px', margin: '0 auto', textAlign: 'center' }}>
          <div
            style={{
              fontFamily: "'Inter', system-ui, sans-serif",
              fontSize: '0.72rem',
              fontWeight: 800,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: '#F18B25',
              marginBottom: '0.5rem',
            }}
          >
            The Gen X Reality & The Digital Bridge
          </div>
          <h2
            style={{
              fontFamily: "'Inter', system-ui, sans-serif",
              fontWeight: 900,
              fontSize: 'clamp(1.5rem, 3vw, 2.2rem)',
              textTransform: 'uppercase',
              letterSpacing: '-0.02em',
              color: '#1F2937',
              maxWidth: '750px',
              margin: '0 auto 2rem',
            }}
          >
            Why traditional retirement advice failed Gen X women
          </h2>

          {/* 3 Metric Cards (Thin Frame, No Shadow) */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '1.25rem',
              textAlign: 'left',
            }}
          >
            <div
              style={{
                backgroundColor: '#FFFFFF',
                border: '1.5px solid #1F2937',
                padding: '1.75rem',
                boxShadow: 'none',
              }}
            >
              <div
                style={{
                  fontFamily: "'Inter', system-ui, sans-serif",
                  fontSize: '2rem',
                  fontWeight: 900,
                  color: '#E05D52',
                  marginBottom: '0.35rem',
                }}
              >
                $540,000
              </div>
              <div
                style={{
                  fontFamily: "'Inter', system-ui, sans-serif",
                  fontSize: '0.8rem',
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  color: '#1F2937',
                  marginBottom: '0.5rem',
                }}
              >
                Median Retirement Deficit
              </div>
              <p
                style={{
                  fontFamily: "'DM Sans', system-ui, sans-serif",
                  fontSize: '0.86rem',
                  color: '#4B5563',
                  lineHeight: 1.55,
                  margin: 0,
                }}
              >
                Gen X women spent peak earning years balancing caregiving, mortgage shifts, and career interruptions.
              </p>
            </div>

            <div
              style={{
                backgroundColor: '#FFFFFF',
                border: '1.5px solid #1F2937',
                padding: '1.75rem',
                boxShadow: 'none',
              }}
            >
              <div
                style={{
                  fontFamily: "'Inter', system-ui, sans-serif",
                  fontSize: '2rem',
                  fontWeight: 900,
                  color: '#1F2937',
                  marginBottom: '0.35rem',
                }}
              >
                74%
              </div>
              <div
                style={{
                  fontFamily: "'Inter', system-ui, sans-serif",
                  fontSize: '0.8rem',
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  color: '#1F2937',
                  marginBottom: '0.5rem',
                }}
              >
                Underprepared by Traditional Models
              </div>
              <p
                style={{
                  fontFamily: "'DM Sans', system-ui, sans-serif",
                  fontSize: '0.86rem',
                  color: '#4B5563',
                  lineHeight: 1.55,
                  margin: 0,
                }}
              >
                Saving 10% of a salary into a 401(k) cannot close a 6-figure gap in 10–15 years. You need scalable leverage.
              </p>
            </div>

            <div
              style={{
                backgroundColor: '#FFFFFF',
                border: '1.5px solid #1F2937',
                padding: '1.75rem',
                boxShadow: 'none',
              }}
            >
              <div
                style={{
                  fontFamily: "'Inter', system-ui, sans-serif",
                  fontSize: '2rem',
                  fontWeight: 900,
                  color: '#F18B25',
                  marginBottom: '0.35rem',
                }}
              >
                3–5 Assets
              </div>
              <div
                style={{
                  fontFamily: "'Inter', system-ui, sans-serif",
                  fontSize: '0.8rem',
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  color: '#1F2937',
                  marginBottom: '0.5rem',
                }}
              >
                The Faceless Real Estate Solution
              </div>
              <p
                style={{
                  fontFamily: "'DM Sans', system-ui, sans-serif",
                  fontSize: '0.86rem',
                  color: '#4B5563',
                  lineHeight: 1.55,
                  margin: 0,
                }}
              >
                3 to 5 micro-digital assets generating $500/mo each provide $1,500–$2,500/mo in recurring cashflow—equivalent to a $600k portfolio.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          MISSION & PHILOSOPHY — Centered, Matching Practical Path Width
         ======================================================== */}
      <section
        style={{
          maxWidth: '1040px',
          margin: '0 auto',
          padding: 'clamp(3rem, 6vw, 4.5rem) 1.25rem',
          textAlign: 'center',
        }}
      >
        <div
          style={{
            fontFamily: "'Inter', system-ui, sans-serif",
            fontSize: '0.72rem',
            fontWeight: 800,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: '#F18B25',
            marginBottom: '0.5rem',
          }}
        >
          Our Core Mission
        </div>
        <h2
          style={{
            fontFamily: "'Inter', system-ui, sans-serif",
            fontWeight: 900,
            fontSize: 'clamp(1.6rem, 3.2vw, 2.4rem)',
            textTransform: 'uppercase',
            letterSpacing: '-0.02em',
            color: '#1F2937',
            maxWidth: '800px',
            margin: '0 auto 1.5rem',
          }}
        >
          Quiet power, practical execution, zero camera drama
        </h2>
        <p
          style={{
            fontFamily: "'DM Sans', system-ui, sans-serif",
            fontSize: '1.05rem',
            lineHeight: 1.65,
            color: '#4B5563',
            maxWidth: '720px',
            margin: '0 auto 2.5rem',
          }}
        >
          You don’t need to dance on TikTok, show your face, or master complex coding. 
          Your decades of professional expertise, organization, and problem-solving are 
          the ultimate fuel for high-demand digital templates, guides, and tools.
        </p>

        {/* 3 Mission Pillars (Matching width & alignment) */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.25rem',
            textAlign: 'left',
          }}
        >
          <div
            style={{
              backgroundColor: '#FFFFFF',
              border: '1.5px solid #1F2937',
              padding: '1.75rem',
            }}
          >
            <div
              style={{
                width: '40px',
                height: '40px',
                backgroundColor: '#FFF7ED',
                border: '1px solid #F18B25',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1rem',
              }}
            >
              <HeartHandshake size={20} color="#F18B25" />
            </div>
            <h3
              style={{
                fontFamily: "'Inter', system-ui, sans-serif",
                fontSize: '1rem',
                fontWeight: 800,
                textTransform: 'uppercase',
                color: '#1F2937',
                marginBottom: '0.5rem',
              }}
            >
              1. Empathy & Dignity
            </h3>
            <p
              style={{
                fontFamily: "'DM Sans', system-ui, sans-serif",
                fontSize: '0.88rem',
                color: '#4B5563',
                lineHeight: 1.55,
                margin: 0,
              }}
            >
              No shame about where you are starting from. We provide step-by-step systems tailored for busy lives and real responsibilities.
            </p>
          </div>

          <div
            style={{
              backgroundColor: '#FFFFFF',
              border: '1.5px solid #1F2937',
              padding: '1.75rem',
            }}
          >
            <div
              style={{
                width: '40px',
                height: '40px',
                backgroundColor: '#F0F9FF',
                border: '1px solid #47B7D4',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1rem',
              }}
            >
              <Award size={20} color="#47B7D4" />
            </div>
            <h3
              style={{
                fontFamily: "'Inter', system-ui, sans-serif",
                fontSize: '1rem',
                fontWeight: 800,
                textTransform: 'uppercase',
                color: '#1F2937',
                marginBottom: '0.5rem',
              }}
            >
              2. Experience Monetization
            </h3>
            <p
              style={{
                fontFamily: "'DM Sans', system-ui, sans-serif",
                fontSize: '0.88rem',
                color: '#4B5563',
                lineHeight: 1.55,
                margin: 0,
              }}
            >
              Transform your career knowledge into high-utility digital assets that buyers gladly pay for again and again.
            </p>
          </div>

          <div
            style={{
              backgroundColor: '#FFFFFF',
              border: '1.5px solid #1F2937',
              padding: '1.75rem',
            }}
          >
            <div
              style={{
                width: '40px',
                height: '40px',
                backgroundColor: '#FAF8F5',
                border: '1px solid #1F2937',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1rem',
              }}
            >
              <TrendingUp size={20} color="#1F2937" />
            </div>
            <h3
              style={{
                fontFamily: "'Inter', system-ui, sans-serif",
                fontSize: '1rem',
                fontWeight: 800,
                textTransform: 'uppercase',
                color: '#1F2937',
                marginBottom: '0.5rem',
              }}
            >
              3. Automated Cashflow
            </h3>
            <p
              style={{
                fontFamily: "'DM Sans', system-ui, sans-serif",
                fontSize: '0.88rem',
                color: '#4B5563',
                lineHeight: 1.55,
                margin: 0,
              }}
            >
              Set up automated distribution pipelines so your digital real estate generates income 24/7 without active hourly labor.
            </p>
          </div>
        </div>
      </section>

      {/* ========================================================
          PRACTICAL 4-PHASE PATHWAY — Centered, Modular
         ======================================================== */}
      <section
        style={{
          backgroundColor: '#FAF8F5',
          borderTop: '1.5px solid #1F2937',
          borderBottom: '1.5px solid #1F2937',
          padding: 'clamp(3rem, 6vw, 4.5rem) 1.25rem',
        }}
      >
        <div style={{ maxWidth: '1040px', margin: '0 auto', textAlign: 'center' }}>
          <div
            style={{
              fontFamily: "'Inter', system-ui, sans-serif",
              fontSize: '0.72rem',
              fontWeight: 800,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: '#F18B25',
              marginBottom: '0.5rem',
            }}
          >
            The Practical Blueprint
          </div>
          <h2
            style={{
              fontFamily: "'Inter', system-ui, sans-serif",
              fontWeight: 900,
              fontSize: 'clamp(1.5rem, 3vw, 2.2rem)',
              textTransform: 'uppercase',
              letterSpacing: '-0.02em',
              color: '#1F2937',
              maxWidth: '750px',
              margin: '0 auto 2.5rem',
            }}
          >
            4 Steps from Zero to Automated Digital Income
          </h2>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))',
              gap: '1.25rem',
              textAlign: 'left',
              marginBottom: '2.5rem',
            }}
          >
            {/* Phase 1 */}
            <div
              style={{
                backgroundColor: '#FFFFFF',
                border: '1.5px solid #1F2937',
                padding: '1.5rem',
              }}
            >
              <div
                style={{
                  fontSize: '0.72rem',
                  fontWeight: 800,
                  color: '#F18B25',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  marginBottom: '0.5rem',
                }}
              >
                Phase 01
              </div>
              <h3
                style={{
                  fontFamily: "'Inter', system-ui, sans-serif",
                  fontSize: '1rem',
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  color: '#1F2937',
                  marginBottom: '0.5rem',
                }}
              >
                Diagnostic & Niche
              </h3>
              <p style={{ fontSize: '0.85rem', color: '#4B5563', lineHeight: 1.5, margin: 0 }}>
                Identify your archetype and quantify your exact retirement gap using our private tools.
              </p>
            </div>

            {/* Phase 2 */}
            <div
              style={{
                backgroundColor: '#FFFFFF',
                border: '1.5px solid #1F2937',
                padding: '1.5rem',
              }}
            >
              <div
                style={{
                  fontSize: '0.72rem',
                  fontWeight: 800,
                  color: '#47B7D4',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  marginBottom: '0.5rem',
                }}
              >
                Phase 02
              </div>
              <h3
                style={{
                  fontFamily: "'Inter', system-ui, sans-serif",
                  fontSize: '1rem',
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  color: '#1F2937',
                  marginBottom: '0.5rem',
                }}
              >
                AI Asset Build
              </h3>
              <p style={{ fontSize: '0.85rem', color: '#4B5563', lineHeight: 1.5, margin: 0 }}>
                Package your knowledge into high-value Notion hubs, templates, or calculators in under 10 days.
              </p>
            </div>

            {/* Phase 3 */}
            <div
              style={{
                backgroundColor: '#FFFFFF',
                border: '1.5px solid #1F2937',
                padding: '1.5rem',
              }}
            >
              <div
                style={{
                  fontSize: '0.72rem',
                  fontWeight: 800,
                  color: '#1F2937',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  marginBottom: '0.5rem',
                }}
              >
                Phase 03
              </div>
              <h3
                style={{
                  fontFamily: "'Inter', system-ui, sans-serif",
                  fontSize: '1rem',
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  color: '#1F2937',
                  marginBottom: '0.5rem',
                }}
              >
                Faceless Launch
              </h3>
              <p style={{ fontSize: '0.85rem', color: '#4B5563', lineHeight: 1.5, margin: 0 }}>
                Deploy simple 1-page checkout funnels with zero video recording or social media burnout.
              </p>
            </div>

            {/* Phase 4 */}
            <div
              style={{
                backgroundColor: '#FFFFFF',
                border: '1.5px solid #1F2937',
                padding: '1.5rem',
              }}
            >
              <div
                style={{
                  fontSize: '0.72rem',
                  fontWeight: 800,
                  color: '#F18B25',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  marginBottom: '0.5rem',
                }}
              >
                Phase 04
              </div>
              <h3
                style={{
                  fontFamily: "'Inter', system-ui, sans-serif",
                  fontSize: '1rem',
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  color: '#1F2937',
                  marginBottom: '0.5rem',
                }}
              >
                Scale & Automate
              </h3>
              <p style={{ fontSize: '0.85rem', color: '#4B5563', lineHeight: 1.5, margin: 0 }}>
                Connect automated email engines and build 3–5 assets to permanently secure your income floor.
              </p>
            </div>
          </div>

          {/* Centered CTA */}
          <div style={{ textAlign: 'center' }}>
            <Link
              to="/framework"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                backgroundColor: '#FFFFFF',
                border: '1.5px solid #1F2937',
                color: '#1F2937',
                fontFamily: "'Inter', system-ui, sans-serif",
                fontSize: '0.85rem',
                fontWeight: 800,
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                padding: '0.85rem 1.75rem',
                textDecoration: 'none',
              }}
            >
              <Layers size={15} color="#F18B25" />
              <span>Explore The Full 4-Tier Framework</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* ========================================================
          COMMUNITY FEEDBACK & CO-CREATION HUB — Replaces Fake Social Proof
         ======================================================== */}
      <section
        style={{
          maxWidth: '1040px',
          margin: '0 auto',
          padding: 'clamp(3rem, 6vw, 4.5rem) 1.25rem',
          textAlign: 'center',
        }}
      >
        <div
          style={{
            fontFamily: "'Inter', system-ui, sans-serif",
            fontSize: '0.72rem',
            fontWeight: 800,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: '#F18B25',
            marginBottom: '0.5rem',
          }}
        >
          Community Voice & Co-Creation
        </div>
        <h2
          style={{
            fontFamily: "'Inter', system-ui, sans-serif",
            fontWeight: 900,
            fontSize: 'clamp(1.5rem, 3vw, 2.2rem)',
            textTransform: 'uppercase',
            letterSpacing: '-0.02em',
            color: '#1F2937',
            maxWidth: '750px',
            margin: '0 auto 1.25rem',
          }}
        >
          Help us build what you need most
        </h2>
        <p
          style={{
            fontFamily: "'DM Sans', system-ui, sans-serif",
            fontSize: '1rem',
            lineHeight: 1.6,
            color: '#4B5563',
            maxWidth: '660px',
            margin: '0 auto 2.5rem',
          }}
        >
          We don't do fake testimonials. We build in the open with Gen X women. 
          Tell us what topics, tools, or templates would help you reinvent yourself fastest.
        </p>

        {/* Feedback Card (Thin Frame, No Shadow) */}
        <div
          style={{
            maxWidth: '680px',
            margin: '0 auto',
            backgroundColor: '#FFFFFF',
            border: '1.5px solid #1F2937',
            padding: 'clamp(1.5rem, 4vw, 2.25rem)',
            textAlign: 'left',
          }}
        >
          {submitted ? (
            <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
              <div
                style={{
                  width: '50px',
                  height: '50px',
                  backgroundColor: '#FFF7ED',
                  border: '1.5px solid #F18B25',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1rem',
                }}
              >
                <Check size={26} color="#F18B25" />
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
                Thank You for Your Feedback!
              </h3>
              <p
                style={{
                  fontFamily: "'DM Sans', system-ui, sans-serif",
                  fontSize: '0.9rem',
                  color: '#4B5563',
                  maxWidth: '460px',
                  margin: '0 auto 1.5rem',
                  lineHeight: 1.55,
                }}
              >
                Your response has been saved locally and helps direct the next set of free tools and blueprints we build.
              </p>
              <button
                type="button"
                onClick={() => setSubmitted(false)}
                style={{
                  backgroundColor: '#FFFFFF',
                  border: '1.5px solid #1F2937',
                  padding: '0.5rem 1.25rem',
                  fontSize: '0.78rem',
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                }}
              >
                Submit another idea
              </button>
            </div>
          ) : (
            <form onSubmit={handleFeedbackSubmit}>
              {/* Question 1: What do you want to learn most? */}
              <div style={{ marginBottom: '1.5rem' }}>
                <label
                  style={{
                    display: 'block',
                    fontFamily: "'Inter', system-ui, sans-serif",
                    fontSize: '0.82rem',
                    fontWeight: 800,
                    textTransform: 'uppercase',
                    letterSpacing: '0.04em',
                    color: '#1F2937',
                    marginBottom: '0.75rem',
                  }}
                >
                  1. What area of digital reinvention do you want to know more about?
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '0.6rem' }}>
                  {topicOptions.map((topic) => {
                    const isSelected = feedbackCategory === topic;
                    return (
                      <button
                        key={topic}
                        type="button"
                        onClick={() => setFeedbackCategory(topic)}
                        style={{
                          textAlign: 'left',
                          padding: '0.65rem 0.85rem',
                          backgroundColor: isSelected ? '#FFF7ED' : '#FFFFFF',
                          border: isSelected ? '1.5px solid #F18B25' : '1px solid #E5E7EB',
                          color: isSelected ? '#9A3412' : '#1F2937',
                          fontSize: '0.82rem',
                          fontWeight: isSelected ? 700 : 500,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          gap: '0.5rem',
                        }}
                      >
                        <span>{topic}</span>
                        {isSelected && <CheckCircle2 size={14} color="#F18B25" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Question 2: How do you feel about the website clarity & value? */}
              <div style={{ marginBottom: '1.5rem' }}>
                <label
                  style={{
                    display: 'block',
                    fontFamily: "'Inter', system-ui, sans-serif",
                    fontSize: '0.82rem',
                    fontWeight: 800,
                    textTransform: 'uppercase',
                    letterSpacing: '0.04em',
                    color: '#1F2937',
                    marginBottom: '0.5rem',
                  }}
                >
                  2. How clear and practical does this website feel to your situation?
                </label>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  {['1 - Confusing', '2', '3 - Clear', '4', '5 - Extremely Helpful'].map((val, idx) => {
                    const numVal = (idx + 1).toString();
                    const isSelected = rating === numVal;
                    return (
                      <button
                        key={val}
                        type="button"
                        onClick={() => setRating(numVal)}
                        style={{
                          flex: 1,
                          padding: '0.65rem 0.35rem',
                          textAlign: 'center',
                          backgroundColor: isSelected ? '#F18B25' : '#FFFFFF',
                          border: '1.5px solid #1F2937',
                          color: '#1F2937',
                          fontSize: '0.78rem',
                          fontWeight: 800,
                          cursor: 'pointer',
                        }}
                      >
                        {val}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Question 3: Career Background / Ideas */}
              <div style={{ marginBottom: '1.5rem' }}>
                <label
                  style={{
                    display: 'block',
                    fontFamily: "'Inter', system-ui, sans-serif",
                    fontSize: '0.82rem',
                    fontWeight: 800,
                    textTransform: 'uppercase',
                    letterSpacing: '0.04em',
                    color: '#1F2937',
                    marginBottom: '0.5rem',
                  }}
                >
                  3. Your background or specific questions (Optional & Private)
                </label>
                <textarea
                  rows={3}
                  value={feedbackNotes}
                  onChange={(e) => setFeedbackNotes(e.target.value)}
                  placeholder="e.g., 'I have 20 years in HR management and want to know how to turn that into a 1-page template...'"
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1.5px solid #1F2937',
                    fontFamily: "'DM Sans', system-ui, sans-serif",
                    fontSize: '0.88rem',
                    color: '#1F2937',
                    outline: 'none',
                    backgroundColor: '#FFFFFF',
                    resize: 'vertical',
                    boxSizing: 'border-box',
                  }}
                />
              </div>

              {/* Centered Submit Button */}
              <div style={{ textAlign: 'center' }}>
                <button
                  type="submit"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    backgroundColor: '#F18B25',
                    border: '1.5px solid #1F2937',
                    color: '#1F2937',
                    fontFamily: "'Inter', system-ui, sans-serif",
                    fontSize: '0.85rem',
                    fontWeight: 800,
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em',
                    padding: '0.85rem 2rem',
                    cursor: 'pointer',
                    boxShadow: 'none',
                  }}
                >
                  <Send size={15} strokeWidth={2.5} />
                  <span>Submit Community Feedback</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </section>

      {/* ========================================================
          FINAL CTA BANNER — Centered, Direct
         ======================================================== */}
      <section
        style={{
          backgroundColor: '#FFF7ED',
          borderTop: '1.5px solid #1F2937',
          padding: 'clamp(3rem, 6vw, 4.5rem) 1.25rem',
          textAlign: 'center',
        }}
      >
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2
            style={{
              fontFamily: "'Inter', system-ui, sans-serif",
              fontWeight: 900,
              fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)',
              textTransform: 'uppercase',
              letterSpacing: '-0.02em',
              color: '#1F2937',
              marginBottom: '1rem',
            }}
          >
            Ready to close your gap with faceless assets?
          </h2>
          <p
            style={{
              fontFamily: "'DM Sans', system-ui, sans-serif",
              fontSize: '1.05rem',
              color: '#4B5563',
              lineHeight: 1.6,
              marginBottom: '2rem',
            }}
          >
            Take the 2-minute diagnostic or calculate your exact numbers to get your customized step-by-step roadmap.
          </p>

          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '1rem',
            }}
          >
            <Link
              to="/gap"
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
                padding: '0.9rem 2rem',
                textDecoration: 'none',
              }}
            >
              <Calculator size={16} />
              <span>Launch Gap Calculator</span>
              <ArrowRight size={15} />
            </Link>

            <Link
              to="/start-here"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                backgroundColor: '#FFFFFF',
                border: '1.5px solid #1F2937',
                color: '#1F2937',
                fontFamily: "'Inter', system-ui, sans-serif",
                fontSize: '0.88rem',
                fontWeight: 800,
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                padding: '0.9rem 1.75rem',
                textDecoration: 'none',
              }}
            >
              <Compass size={16} color="#F18B25" />
              <span>Read 3-Step Start Guide</span>
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
