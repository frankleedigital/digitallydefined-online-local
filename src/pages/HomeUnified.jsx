import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  ArrowRight,
  Shield,
  EyeOff,
  Lock,
  Zap,
  TrendingUp,
  Database,
  Layers,
  DollarSign,
  CheckCircle2,
  BookOpen,
  Users,
  Compass,
  Calculator,
  ChevronRight,
  ExternalLink,
  Flame,
} from 'lucide-react';
import { getUserState } from '../lib/userState';
import { theme } from '../config/theme';

export default function HomeUnified() {
  const [userState, setUserState] = useState(getUserState());

  useEffect(() => {
    const handleUpdate = () => setUserState(getUserState());
    window.addEventListener('dd_user_state_updated', handleUpdate);
    return () => window.removeEventListener('dd_user_state_updated', handleUpdate);
  }, []);

  const realEstateSteps = [
    {
      num: '01',
      title: 'Claim It',
      desc: 'Identify every digital property you already own or have a right to: domains, search terms, social assets, and unmonetized expertise.',
      icon: Database,
      accent: '#F18B25',
    },
    {
      num: '02',
      title: 'Optimize It',
      desc: 'Package knowledge into high-converting digital assets: Notion systems, micro-guides, evergreen SEO boards, and automated toolkits.',
      icon: TrendingUp,
      accent: '#47B7D4',
    },
    {
      num: '03',
      title: 'Expand It',
      desc: 'Systematically add complementary faceless assets. Build an interconnected portfolio that compounds value every month.',
      icon: Layers,
      accent: '#16A34A',
    },
    {
      num: '04',
      title: 'Monetize It',
      desc: 'Convert digital traffic into recurring cash flow through automated funnels, digital product sales, and affiliate ecosystems.',
      icon: DollarSign,
      accent: '#8B5CF6',
    },
  ];

  const facelessAssets = [
    {
      title: 'Notion Operations Hubs',
      type: 'Systems Asset',
      estRevenue: '$500 - $2,500/mo',
      desc: 'Turnkey workflow templates for solo operators and micro-businesses.',
      tag: 'Builder Favorite',
      accent: '#47B7D4',
    },
    {
      title: 'Evergreen SEO & Content Engines',
      type: 'Traffic Asset',
      estRevenue: '$800 - $3,200/mo',
      desc: 'Faceless search-driven content generating automated affiliate income.',
      tag: 'High Passive',
      accent: '#F18B25',
    },
    {
      title: 'Signature Digital Playbooks',
      type: 'Knowledge Asset',
      estRevenue: '$1,200 - $4,500/mo',
      desc: 'Concise 25-page PDF implementation guides priced at $27 - $97.',
      tag: 'Fast Launch',
      accent: '#16A34A',
    },
    {
      title: 'Interactive Calculators & Tools',
      type: 'Lead Magnet Asset',
      estRevenue: '$1,000 - $5,000/mo',
      desc: 'High-utility single-purpose web calculators that capture qualified buyers.',
      tag: 'High Conversion',
      accent: '#8B5CF6',
    },
    {
      title: 'Curated Email Masterminds',
      type: 'Community Asset',
      estRevenue: '$1,500 - $6,000/mo',
      desc: 'Paid micro-newsletters and curated industry intelligence digests.',
      tag: 'Recurring MRR',
      accent: '#C20F0A',
    },
    {
      title: 'Automated Lead Funnels',
      type: 'Conversion Asset',
      estRevenue: '$2,000 - $8,000/mo',
      desc: 'Zero-touch email sequences converting cold visitors into buyers.',
      tag: 'Scalable',
      accent: '#111111',
    },
  ];

  return (
    <div style={{ backgroundColor: '#FFFCF9', color: '#2D3748', minHeight: '100vh' }}>
      {/* 1. PERSONALIZATION BANNER */}
      <div
        style={{
          borderBottom: '2px solid #111111',
          backgroundColor: '#FFFFFF',
          padding: '0.75rem 1.25rem',
        }}
      >
        <div
          style={{
            maxWidth: '1100px',
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '0.75rem',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '24px',
                height: '24px',
                backgroundColor: '#F18B25',
                border: '1px solid #111111',
              }}
            >
              <Sparkles size={14} color="#111111" />
            </span>
            <span
              style={{
                fontFamily: "'Inter', system-ui, sans-serif",
                fontSize: '0.78rem',
                fontWeight: 800,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
              }}
            >
              {userState.hasQuiz && userState.profile ? (
                <>
                  Profile Active:{' '}
                  <span style={{ color: '#F18B25' }}>{userState.profile.title}</span> — Next Step:{' '}
                  <span style={{ color: '#111111' }}>{userState.profile.starterAsset}</span>
                </>
              ) : (
                <>
                  Orientation Active — Step 1: Discover Your Digital Superpower in 2 Minutes
                </>
              )}
            </span>
          </div>

          <Link
            to={userState.hasQuiz ? '/tools/roadmap' : '/quiz'}
            style={{
              fontFamily: "'Inter', system-ui, sans-serif",
              fontSize: '0.72rem',
              fontWeight: 900,
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              color: '#111111',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.35rem',
              borderBottom: '2px solid #F18B25',
              paddingBottom: '2px',
            }}
          >
            <span>{userState.hasQuiz ? 'View Roadmap →' : 'Take Free Quiz →'}</span>
          </Link>
        </div>
      </div>

      {/* 2. ABOVE-THE-FOLD HERO SECTION */}
      <section
        style={{
          maxWidth: '1100px',
          margin: '0 auto',
          padding: 'clamp(3rem, 6vw, 5.5rem) 1.25rem 3.5rem',
          textAlign: 'center',
        }}
      >
        {/* Eyebrow badge */}
        <div style={{ display: 'inline-block', marginBottom: '1.25rem' }}>
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.4rem 0.9rem',
              backgroundColor: '#FFFFFF',
              border: '2px solid #111111',
              fontFamily: "'Inter', system-ui, sans-serif",
              fontSize: '0.68rem',
              fontWeight: 900,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: '#111111',
            }}
          >
            <EyeOff size={14} color="#F18B25" />
            <span>Faceless Digital Real Estate for Gen X Women</span>
          </span>
        </div>

        {/* Main Hero Headline */}
        <h1
          style={{
            fontFamily: "'Inter', system-ui, sans-serif",
            fontWeight: 900,
            fontSize: 'clamp(2.4rem, 5.5vw, 4.2rem)',
            lineHeight: 1.08,
            letterSpacing: '-0.03em',
            textTransform: 'uppercase',
            color: '#111111',
            maxWidth: '920px',
            margin: '0 auto 1.5rem',
          }}
        >
          Build Digital Assets That <span style={{ color: '#F18B25' }}>Work Quietly</span>.
        </h1>

        {/* Subtitle */}
        <p
          style={{
            fontFamily: "'DM Sans', system-ui, sans-serif",
            fontSize: 'clamp(1rem, 2vw, 1.25rem)',
            lineHeight: 1.6,
            color: '#4B5563',
            maxWidth: '720px',
            margin: '0 auto 2.5rem',
          }}
        >
          Start your path to freedom-based digital ownership. No camera. No invented urgency.
          No personal branding theater. Just income-producing digital assets built around your real skills.
        </p>

        {/* Centered CTA Buttons */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1rem',
            flexWrap: 'wrap',
            marginBottom: '2.5rem',
          }}
        >
          <Link
            to="/quiz"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.6rem',
              padding: '1rem 2.25rem',
              backgroundColor: '#F18B25',
              color: '#111111',
              border: '2px solid #111111',
              fontFamily: "'Inter', system-ui, sans-serif",
              fontSize: '0.85rem',
              fontWeight: 900,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              boxShadow: '4px 4px 0 0 rgba(0,0,0,1)',
              transition: 'transform 100ms ease',
            }}
          >
            <span>Take the Free Quiz</span>
            <ArrowRight size={16} />
          </Link>

          <Link
            to="/start-here"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.6rem',
              padding: '1rem 2rem',
              backgroundColor: '#FFFFFF',
              color: '#111111',
              border: '2px solid #111111',
              fontFamily: "'Inter', system-ui, sans-serif",
              fontSize: '0.85rem',
              fontWeight: 900,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              textDecoration: 'none',
            }}
          >
            <span>Start Here Blueprint</span>
          </Link>

          <Link
            to="/gap"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.6rem',
              padding: '1rem 2rem',
              backgroundColor: '#FFFFFF',
              color: '#111111',
              border: '2px solid #111111',
              fontFamily: "'Inter', system-ui, sans-serif",
              fontSize: '0.85rem',
              fontWeight: 900,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              textDecoration: 'none',
            }}
          >
            <Calculator size={15} color="#47B7D4" />
            <span>Retirement Gap Tool</span>
          </Link>
        </div>

        {/* Value Props Row */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1.5rem',
            flexWrap: 'wrap',
            paddingTop: '1.5rem',
            borderTop: '1px solid #E5E7EB',
            maxWidth: '780px',
            margin: '0 auto',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.78rem', fontWeight: 700, color: '#4B5563' }}>
            <Lock size={15} color="#16A34A" />
            <span>Privacy-First by Design</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.78rem', fontWeight: 700, color: '#4B5563' }}>
            <EyeOff size={15} color="#F18B25" />
            <span>0 Cameras Required</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.78rem', fontWeight: 700, color: '#4B5563' }}>
            <Shield size={15} color="#47B7D4" />
            <span>Built for Gen X Women</span>
          </div>
        </div>
      </section>

      {/* 3. SOCIAL PROOF & METRICS STRIP */}
      <section
        style={{
          backgroundColor: '#FFFFFF',
          borderTop: '2px solid #111111',
          borderBottom: '2px solid #111111',
          padding: '2.5rem 1.25rem',
        }}
      >
        <div
          style={{
            maxWidth: '1100px',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '1.5rem',
          }}
        >
          <div
            style={{
              padding: '1.5rem',
              border: '2px solid #111111',
              backgroundColor: '#FFFCF9',
              textAlign: 'center',
            }}
          >
            <div
              style={{
                fontFamily: "'Inter', system-ui, sans-serif",
                fontSize: '2.5rem',
                fontWeight: 900,
                color: '#111111',
                lineHeight: 1,
                marginBottom: '0.4rem',
              }}
            >
              1,280+
            </div>
            <div
              style={{
                fontFamily: "'Inter', system-ui, sans-serif",
                fontSize: '0.72rem',
                fontWeight: 800,
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                color: '#6B7280',
              }}
            >
              Gen X Women Building
            </div>
          </div>

          <div
            style={{
              padding: '1.5rem',
              border: '2px solid #111111',
              backgroundColor: '#FFFCF9',
              textAlign: 'center',
            }}
          >
            <div
              style={{
                fontFamily: "'Inter', system-ui, sans-serif",
                fontSize: '2.5rem',
                fontWeight: 900,
                color: '#F18B25',
                lineHeight: 1,
                marginBottom: '0.4rem',
              }}
            >
              $48,000
            </div>
            <div
              style={{
                fontFamily: "'Inter', system-ui, sans-serif",
                fontSize: '0.72rem',
                fontWeight: 800,
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                color: '#6B7280',
              }}
            >
              Average Portfolio Asset Value
            </div>
          </div>

          <div
            style={{
              padding: '1.5rem',
              border: '2px solid #111111',
              backgroundColor: '#FFFCF9',
              textAlign: 'center',
            }}
          >
            <div
              style={{
                fontFamily: "'Inter', system-ui, sans-serif",
                fontSize: '2.5rem',
                fontWeight: 900,
                color: '#47B7D4',
                lineHeight: 1,
                marginBottom: '0.4rem',
              }}
            >
              5
            </div>
            <div
              style={{
                fontFamily: "'Inter', system-ui, sans-serif",
                fontSize: '0.72rem',
                fontWeight: 800,
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                color: '#6B7280',
              }}
            >
              Superpower Monetization Paths
            </div>
          </div>

          <div
            style={{
              padding: '1.5rem',
              border: '2px solid #111111',
              backgroundColor: '#FFFCF9',
              textAlign: 'center',
            }}
          >
            <div
              style={{
                fontFamily: "'Inter', system-ui, sans-serif",
                fontSize: '2.5rem',
                fontWeight: 900,
                color: '#16A34A',
                lineHeight: 1,
                marginBottom: '0.4rem',
              }}
            >
              0
            </div>
            <div
              style={{
                fontFamily: "'Inter', system-ui, sans-serif",
                fontSize: '0.72rem',
                fontWeight: 800,
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                color: '#6B7280',
              }}
            >
              Cameras / Public Exposure
            </div>
          </div>
        </div>
      </section>

      {/* 4. THE 4-STEP REAL ESTATE FRAMEWORK */}
      <section
        style={{
          maxWidth: '1100px',
          margin: '0 auto',
          padding: '4.5rem 1.25rem',
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <span
            style={{
              fontFamily: "'Inter', system-ui, sans-serif",
              fontSize: '0.72rem',
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '0.15em',
              color: '#F18B25',
            }}
          >
            The Operating System
          </span>
          <h2
            style={{
              fontFamily: "'Inter', system-ui, sans-serif",
              fontSize: 'clamp(1.8rem, 4vw, 2.75rem)',
              fontWeight: 900,
              textTransform: 'uppercase',
              letterSpacing: '-0.03em',
              color: '#111111',
              marginTop: '0.5rem',
            }}
          >
            How Faceless Real Estate Works
          </h2>
          <p
            style={{
              fontFamily: "'DM Sans', system-ui, sans-serif",
              fontSize: '1rem',
              color: '#6B7280',
              maxWidth: '650px',
              margin: '0.75rem auto 0',
            }}
          >
            Just like physical real estate, digital real estate produces cash flow without your presence.
            You build it once with precision, optimize it, and let it work 24/7.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '1.5rem',
          }}
        >
          {realEstateSteps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.num}
                style={{
                  backgroundColor: '#FFFFFF',
                  border: '2px solid #111111',
                  padding: '1.75rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  position: 'relative',
                }}
              >
                <div>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: '1.25rem',
                      borderBottom: '2px solid #111111',
                      paddingBottom: '0.85rem',
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "'Inter', system-ui, sans-serif",
                        fontSize: '1.25rem',
                        fontWeight: 900,
                        color: step.accent,
                      }}
                    >
                      {step.num}
                    </span>
                    <div
                      style={{
                        width: '32px',
                        height: '32px',
                        border: '1px solid #111111',
                        backgroundColor: '#FFFCF9',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Icon size={18} color="#111111" />
                    </div>
                  </div>

                  <h3
                    style={{
                      fontFamily: "'Inter', system-ui, sans-serif",
                      fontSize: '1.15rem',
                      fontWeight: 900,
                      textTransform: 'uppercase',
                      letterSpacing: '-0.02em',
                      color: '#111111',
                      marginBottom: '0.65rem',
                    }}
                  >
                    {step.title}
                  </h3>

                  <p
                    style={{
                      fontFamily: "'DM Sans', system-ui, sans-serif",
                      fontSize: '0.88rem',
                      lineHeight: 1.6,
                      color: '#4B5563',
                      marginBottom: '1.5rem',
                    }}
                  >
                    {step.desc}
                  </p>
                </div>

                <div style={{ paddingTop: '0.85rem', borderTop: '1px solid #E5E7EB' }}>
                  <span
                    style={{
                      fontFamily: "'Inter', system-ui, sans-serif",
                      fontSize: '0.68rem',
                      fontWeight: 800,
                      textTransform: 'uppercase',
                      letterSpacing: '0.1em',
                      color: step.accent,
                    }}
                  >
                    Phase {step.num} Protocol
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
          <Link
            to="/framework"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.85rem 1.75rem',
              backgroundColor: '#FFFFFF',
              color: '#111111',
              border: '2px solid #111111',
              fontFamily: "'Inter', system-ui, sans-serif",
              fontSize: '0.78rem',
              fontWeight: 900,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              textDecoration: 'none',
            }}
          >
            <span>Read the Complete Framework Guide</span>
            <ArrowRight size={15} />
          </Link>
        </div>
      </section>

      {/* 5. FACELESS DIGITAL REAL ESTATE TAXONOMY */}
      <section
        style={{
          backgroundColor: '#FFFFFF',
          borderTop: '2px solid #111111',
          borderBottom: '2px solid #111111',
          padding: '4.5rem 1.25rem',
        }}
      >
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span
              style={{
                fontFamily: "'Inter', system-ui, sans-serif",
                fontSize: '0.72rem',
                fontWeight: 800,
                textTransform: 'uppercase',
                letterSpacing: '0.15em',
                color: '#47B7D4',
              }}
            >
              Asset Portfolio Taxonomy
            </span>
            <h2
              style={{
                fontFamily: "'Inter', system-ui, sans-serif",
                fontSize: 'clamp(1.8rem, 4vw, 2.75rem)',
                fontWeight: 900,
                textTransform: 'uppercase',
                letterSpacing: '-0.03em',
                color: '#111111',
                marginTop: '0.5rem',
              }}
            >
              6 Types of Digital Real Estate You Can Build
            </h2>
            <p
              style={{
                fontFamily: "'DM Sans', system-ui, sans-serif",
                fontSize: '1rem',
                color: '#6B7280',
                maxWidth: '650px',
                margin: '0.75rem auto 0',
              }}
            >
              Each asset type requires zero video presence, zero social media dance routines, and generates independent monthly revenue.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '1.5rem',
            }}
          >
            {facelessAssets.map((asset, idx) => (
              <div
                key={idx}
                style={{
                  backgroundColor: '#FFFCF9',
                  border: '2px solid #111111',
                  padding: '1.75rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                <div>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: '1rem',
                      borderBottom: '1px solid #E5E7EB',
                      paddingBottom: '0.75rem',
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "'Inter', system-ui, sans-serif",
                        fontSize: '0.65rem',
                        fontWeight: 800,
                        textTransform: 'uppercase',
                        letterSpacing: '0.12em',
                        color: asset.accent,
                      }}
                    >
                      {asset.type}
                    </span>
                    <span
                      style={{
                        fontFamily: "'Inter', system-ui, sans-serif",
                        fontSize: '0.62rem',
                        fontWeight: 800,
                        textTransform: 'uppercase',
                        letterSpacing: '0.1em',
                        backgroundColor: '#FFFFFF',
                        border: '1px solid #111111',
                        padding: '0.2rem 0.5rem',
                      }}
                    >
                      {asset.tag}
                    </span>
                  </div>

                  <h3
                    style={{
                      fontFamily: "'Inter', system-ui, sans-serif",
                      fontSize: '1.2rem',
                      fontWeight: 900,
                      textTransform: 'uppercase',
                      letterSpacing: '-0.02em',
                      color: '#111111',
                      marginBottom: '0.5rem',
                    }}
                  >
                    {asset.title}
                  </h3>

                  <p
                    style={{
                      fontFamily: "'DM Sans', system-ui, sans-serif",
                      fontSize: '0.88rem',
                      lineHeight: 1.6,
                      color: '#4B5563',
                      marginBottom: '1.25rem',
                    }}
                  >
                    {asset.desc}
                  </p>
                </div>

                <div
                  style={{
                    backgroundColor: '#FFFFFF',
                    border: '1px solid #111111',
                    padding: '0.65rem 0.85rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'Inter', system-ui, sans-serif",
                      fontSize: '0.65rem',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      letterSpacing: '0.1em',
                      color: '#6B7280',
                    }}
                  >
                    Target Cash Flow:
                  </span>
                  <span
                    style={{
                      fontFamily: "'Inter', system-ui, sans-serif",
                      fontSize: '0.85rem',
                      fontWeight: 900,
                      color: '#111111',
                    }}
                  >
                    {asset.estRevenue}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. CALL TO ACTION INTERLOCK */}
      <section
        style={{
          maxWidth: '1100px',
          margin: '0 auto',
          padding: '4.5rem 1.25rem',
          textAlign: 'center',
        }}
      >
        <div
          style={{
            backgroundColor: '#FFFFFF',
            border: '2px solid #111111',
            padding: 'clamp(2.5rem, 5vw, 4rem) 1.5rem',
            boxShadow: '6px 6px 0 0 rgba(0,0,0,1)',
          }}
        >
          <span
            style={{
              fontFamily: "'Inter', system-ui, sans-serif",
              fontSize: '0.72rem',
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '0.15em',
              color: '#F18B25',
              display: 'inline-block',
              marginBottom: '0.5rem',
            }}
          >
            Ready to Build Your Digital Freedom?
          </span>

          <h2
            style={{
              fontFamily: "'Inter', system-ui, sans-serif",
              fontSize: 'clamp(2rem, 4.5vw, 3.2rem)',
              fontWeight: 900,
              textTransform: 'uppercase',
              letterSpacing: '-0.03em',
              color: '#111111',
              maxWidth: '750px',
              margin: '0 auto 1.25rem',
            }}
          >
            Your Roadmap Is One 2-Minute Quiz Away.
          </h2>

          <p
            style={{
              fontFamily: "'DM Sans', system-ui, sans-serif",
              fontSize: '1.05rem',
              lineHeight: 1.6,
              color: '#4B5563',
              maxWidth: '620px',
              margin: '0 auto 2.25rem',
            }}
          >
            Discover your highest-margin digital superpower. Get your build sequence, starter asset recommendations, and access to all studio tools immediately.
          </p>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '1rem',
              flexWrap: 'wrap',
            }}
          >
            <Link
              to="/quiz"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '1rem 2.5rem',
                backgroundColor: '#F18B25',
                color: '#111111',
                border: '2px solid #111111',
                fontFamily: "'Inter', system-ui, sans-serif",
                fontSize: '0.85rem',
                fontWeight: 900,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                textDecoration: 'none',
              }}
            >
              <span>Start Free Quiz Now</span>
              <ArrowRight size={16} />
            </Link>

            <Link
              to="/pricing"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '1rem 2rem',
                backgroundColor: '#FFFFFF',
                color: '#111111',
                border: '2px solid #111111',
                fontFamily: "'Inter', system-ui, sans-serif",
                fontSize: '0.85rem',
                fontWeight: 900,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                textDecoration: 'none',
              }}
            >
              <span>Explore Plans ($47/mo)</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
