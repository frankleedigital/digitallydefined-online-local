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
  Compass,
  Calculator,
  Target,
  FileText,
  DollarSign,
  Cpu,
  BarChart3,
  HelpCircle,
  CheckCircle2,
  AlertTriangle,
  MessageSquare,
  Send,
  HeartHandshake,
} from 'lucide-react';
import { getUserState } from '../lib/userState';

export default function HomeUnified() {
  const [userState, setUserState] = useState(getUserState());

  // Feedback State (Community Voice instead of social proof)
  const [feedbackCategory, setFeedbackCategory] = useState('Faceless Digital Products');
  const [feedbackValuation, setFeedbackValuation] = useState('Extremely Validating & Practical');
  const [feedbackNote, setFeedbackNote] = useState('');
  const [feedbackEmail, setFeedbackEmail] = useState('');
  const [feedbackStatus, setFeedbackStatus] = useState(null);

  // Quick gap teaser state
  const [previewSavings, setPreviewSavings] = useState(75000);
  const [previewMonthlyNeed, setPreviewMonthlyNeed] = useState(4500);

  useEffect(() => {
    const handleStateUpdate = () => {
      setUserState(getUserState());
    };
    window.addEventListener('dd_user_state_updated', handleStateUpdate);
    return () => window.removeEventListener('dd_user_state_updated', handleStateUpdate);
  }, []);

  const handleFeedbackSubmit = (e) => {
    e.preventDefault();
    setFeedbackStatus('submitting');
    try {
      const stored = localStorage.getItem('dd_community_feedback') || '[]';
      const parsed = JSON.parse(stored);
      parsed.push({
        category: feedbackCategory,
        valuation: feedbackValuation,
        note: feedbackNote,
        email: feedbackEmail,
        timestamp: new Date().toISOString(),
      });
      localStorage.setItem('dd_community_feedback', JSON.stringify(parsed));
      setFeedbackStatus('success');
      setFeedbackNote('');
      setFeedbackEmail('');
    } catch {
      setFeedbackStatus('error');
    }
  };

  const calculatedPreviewShortfall = Math.max(0, previewMonthlyNeed * 300 - previewSavings);
  const calculatedAssetsNeeded = Math.ceil(previewMonthlyNeed / 500);

  return (
    <div style={{ backgroundColor: '#FFFCF9', color: '#2D3748', minHeight: '100vh', paddingBottom: '5rem' }}>
      {/* 0. DYNAMIC PERSONALIZATION STATUS BANNER */}
      <section style={{ backgroundColor: '#1F2937', color: '#FFFFFF', padding: '0.65rem 1.25rem', borderBottom: '2px solid #1F2937' }}>
        <div style={{ maxWidth: '1080px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem', fontSize: '0.78rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ backgroundColor: '#F18B25', color: '#1F2937', padding: '0.15rem 0.45rem', fontWeight: 900, textTransform: 'uppercase', fontSize: '0.65rem', letterSpacing: '0.05em' }}>
              {userState.hasQuiz ? 'Profile Active' : 'Gen X Fact'}
            </span>
            <span style={{ color: '#E5E7EB', fontWeight: 500 }}>
              {userState.hasQuiz
                ? `Archetype detected: ${userState.superpowerTitle || 'The Content Architect'}. Ready to build your digital asset.`
                : '74% of Gen X women report a retirement gap. Faceless digital real estate replaces corporate salary with zero camera presence.'}
            </span>
          </div>

          <Link
            to={userState.hasQuiz ? '/start-here' : '/quiz'}
            style={{
              color: '#F18B25',
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.25rem',
            }}
          >
            <span>{userState.hasQuiz ? 'View Action Plan' : 'Take 2-Min Quiz'}</span>
            <ArrowRight size={13} />
          </Link>
        </div>
      </section>

      {/* 1. HERO SECTION (CENTERED & CONVERSION-FOCUSED) */}
      <section
        style={{
          borderBottom: '2px solid #1F2937',
          backgroundColor: '#FFFFFF',
          padding: 'clamp(3.5rem, 6vw, 5.5rem) 1.25rem',
          textAlign: 'center',
        }}
      >
        <div style={{ maxWidth: '1080px', margin: '0 auto' }}>
          <div style={{ display: 'inline-block', marginBottom: '1.25rem' }}>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.45rem',
                padding: '0.4rem 0.9rem',
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
              <span>Gen X Women & Digital Reinvention</span>
            </span>
          </div>

          <h1
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 900,
              fontSize: 'clamp(2.4rem, 5.5vw, 4.2rem)',
              lineHeight: 1.08,
              letterSpacing: '-0.03em',
              textTransform: 'uppercase',
              color: '#1F2937',
              maxWidth: '920px',
              margin: '0 auto 1.5rem',
            }}
          >
            Close The Retirement Gap. Build <span style={{ color: '#F18B25' }}>Faceless Digital</span> Real Estate.
          </h1>

          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 'clamp(1.05rem, 2vw, 1.25rem)',
              lineHeight: 1.65,
              color: '#4B5563',
              maxWidth: '760px',
              margin: '0 auto 2.5rem',
            }}
          >
            You are not behind. You are not too late. You are early in the AI shift. We help Gen X women build automated,
            faceless digital income assets without being on camera, dancing on social media, or sacrificing privacy.
          </p>

          {/* Hard Data Strip */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))',
              gap: '1rem',
              maxWidth: '880px',
              margin: '0 auto 2.5rem',
            }}
          >
            <div style={{ backgroundColor: '#FFFCF9', border: '2px solid #1F2937', padding: '1rem', textAlign: 'center', boxShadow: '3px 3px 0 0 #1F2937' }}>
              <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '1.75rem', fontWeight: 900, color: '#C20F0A', lineHeight: 1 }}>
                $540,000
              </div>
              <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.65rem', fontWeight: 800, textTransform: 'uppercase', color: '#6B7280', marginTop: '0.35rem' }}>
                Median Gen X Retirement Deficit
              </div>
            </div>

            <div style={{ backgroundColor: '#FFFCF9', border: '2px solid #1F2937', padding: '1rem', textAlign: 'center', boxShadow: '3px 3px 0 0 #1F2937' }}>
              <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '1.75rem', fontWeight: 900, color: '#16A34A', lineHeight: 1 }}>
                85%+
              </div>
              <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.65rem', fontWeight: 800, textTransform: 'uppercase', color: '#6B7280', marginTop: '0.35rem' }}>
                Net Margin on Faceless Assets
              </div>
            </div>

            <div style={{ backgroundColor: '#FFFCF9', border: '2px solid #1F2937', padding: '1rem', textAlign: 'center', boxShadow: '3px 3px 0 0 #1F2937' }}>
              <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '1.75rem', fontWeight: 900, color: '#47B7D4', lineHeight: 1 }}>
                0 Hours
              </div>
              <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.65rem', fontWeight: 800, textTransform: 'uppercase', color: '#6B7280', marginTop: '0.35rem' }}>
                Required On Camera or Video
              </div>
            </div>

            <div style={{ backgroundColor: '#FFFCF9', border: '2px solid #1F2937', padding: '1rem', textAlign: 'center', boxShadow: '3px 3px 0 0 #1F2937' }}>
              <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '1.75rem', fontWeight: 900, color: '#F18B25', lineHeight: 1 }}>
                10-15 hrs
              </div>
              <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.65rem', fontWeight: 800, textTransform: 'uppercase', color: '#6B7280', marginTop: '0.35rem' }}>
                Weekly Automation Rhythm
              </div>
            </div>
          </div>

          {/* Centered Dual CTAs */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '1rem',
              flexWrap: 'wrap',
              marginBottom: '2rem',
            }}
          >
            <Link
              to="/quiz"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '1.05rem 2.25rem',
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
              <Compass size={16} />
              <span>Discover Your Superpower (2 Min)</span>
              <ArrowRight size={15} />
            </Link>

            <Link
              to="/gap"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '1.05rem 2rem',
                backgroundColor: '#FFFFFF',
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
              <Calculator size={16} />
              <span>Calculate Retirement Gap</span>
            </Link>
          </div>

          {/* Trust points */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '1.5rem',
              flexWrap: 'wrap',
              fontFamily: "'Inter', sans-serif",
              fontSize: '0.72rem',
              fontWeight: 800,
              textTransform: 'uppercase',
              color: '#6B7280',
            }}
          >
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <CheckCircle2 size={14} color="#16A34A" /> 100% Privacy Guaranteed
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <CheckCircle2 size={14} color="#16A34A" /> No Social Media Dancing
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <CheckCircle2 size={14} color="#16A34A" /> AI-Powered Asset Kits
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <CheckCircle2 size={14} color="#16A34A" /> Built for Gen X Women
            </span>
          </div>
        </div>
      </section>

      {/* 2. THE MISSION SECTION (MATCHES PRACTICAL PATH WIDTH & CENTERING) */}
      <section
        style={{
          maxWidth: '1080px',
          margin: '0 auto',
          padding: '4.5rem 1.25rem',
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <span
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '0.72rem',
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '0.15em',
              color: '#F18B25',
            }}
          >
            Why DigitallyDefined Exists
          </span>
          <h2
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 'clamp(1.8rem, 4vw, 2.75rem)',
              fontWeight: 900,
              textTransform: 'uppercase',
              letterSpacing: '-0.03em',
              color: '#1F2937',
              marginTop: '0.5rem',
              lineHeight: 1.15,
            }}
          >
            The Generation That Carried Everything Is Finally Building for Themselves.
          </h2>
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '1rem',
              lineHeight: 1.65,
              color: '#6B7280',
              maxWidth: '740px',
              margin: '0.85rem auto 0',
            }}
          >
            Gen X women have spent decades managing corporate burnout, raising children, and caring for aging parents.
            You didn't fail traditional retirement — traditional retirement models failed you.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '1.75rem',
          }}
        >
          {/* Mission Card 1 */}
          <div
            style={{
              backgroundColor: '#FFFFFF',
              border: '2px solid #1F2937',
              padding: '2rem 1.5rem',
              boxShadow: '4px 4px 0 0 #1F2937',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  backgroundColor: '#FEE2E2',
                  border: '1.5px solid #DC2626',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1rem',
                }}
              >
                <AlertTriangle size={18} color="#DC2626" />
              </div>

              <h3
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '1.2rem',
                  fontWeight: 900,
                  textTransform: 'uppercase',
                  color: '#1F2937',
                  marginBottom: '0.5rem',
                }}
              >
                The Reality Check
              </h3>

              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: '0.9rem',
                  lineHeight: 1.6,
                  color: '#4B5563',
                  margin: 0,
                }}
              >
                Gen X has the largest retirement gap in American history. Relying solely on market returns and 401(k) contributions
                at age 45-59 creates an unavoidable shortfall that traditional financial planners ignore.
              </p>
            </div>

            <div
              style={{
                marginTop: '1.5rem',
                paddingTop: '1rem',
                borderTop: '1px solid #E5E7EB',
                fontSize: '0.75rem',
                fontWeight: 800,
                color: '#DC2626',
                fontFamily: "'Inter', sans-serif",
                textTransform: 'uppercase',
              }}
            >
              74% feel underprepared · $540k avg gap
            </div>
          </div>

          {/* Mission Card 2 */}
          <div
            style={{
              backgroundColor: '#FFFFFF',
              border: '2px solid #1F2937',
              padding: '2rem 1.5rem',
              boxShadow: '4px 4px 0 0 #1F2937',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  backgroundColor: '#E0F2FE',
                  border: '1.5px solid #0284C7',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1rem',
                }}
              >
                <EyeOff size={18} color="#0284C7" />
              </div>

              <h3
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '1.2rem',
                  fontWeight: 900,
                  textTransform: 'uppercase',
                  color: '#1F2937',
                  marginBottom: '0.5rem',
                }}
              >
                The Faceless Breakthrough
              </h3>

              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: '0.9rem',
                  lineHeight: 1.6,
                  color: '#4B5563',
                  margin: 0,
                }}
              >
                You do not need to become an influencer or build a personal brand. Digital assets — Notion hubs, specialized calculators,
                automation blueprints, and niche databases — sell based on pure utility and problem-solving.
              </p>
            </div>

            <div
              style={{
                marginTop: '1.5rem',
                paddingTop: '1rem',
                borderTop: '1px solid #E5E7EB',
                fontSize: '0.75rem',
                fontWeight: 800,
                color: '#0284C7',
                fontFamily: "'Inter', sans-serif",
                textTransform: 'uppercase',
              }}
            >
              Zero on-camera time · Total identity privacy
            </div>
          </div>

          {/* Mission Card 3 */}
          <div
            style={{
              backgroundColor: '#FFFFFF',
              border: '2px solid #1F2937',
              padding: '2rem 1.5rem',
              boxShadow: '4px 4px 0 0 #1F2937',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  backgroundColor: '#DCFCE7',
                  border: '1.5px solid #16A34A',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1rem',
                }}
              >
                <Cpu size={18} color="#16A34A" />
              </div>

              <h3
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '1.2rem',
                  fontWeight: 900,
                  textTransform: 'uppercase',
                  color: '#1F2937',
                  marginBottom: '0.5rem',
                }}
              >
                The AI Multiplier
              </h3>

              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: '0.9rem',
                  lineHeight: 1.6,
                  color: '#4B5563',
                  margin: 0,
                }}
              >
                Generative AI handles 80% of the mechanical work: drafting, structuring, formatting, and coding.
                Your 20+ years of professional and life experience is the irreplaceable ingredient that commands premium prices.
              </p>
            </div>

            <div
              style={{
                marginTop: '1.5rem',
                paddingTop: '1rem',
                borderTop: '1px solid #E5E7EB',
                fontSize: '0.75rem',
                fontWeight: 800,
                color: '#16A34A',
                fontFamily: "'Inter', sans-serif",
                textTransform: 'uppercase',
              }}
            >
              Fast execution · 85%+ profit margins
            </div>
          </div>
        </div>
      </section>

      {/* 3. THE 4-STEP PRACTICAL PATH (PRACTICAL FRAMEWORK) */}
      <section
        style={{
          backgroundColor: '#FFFFFF',
          borderTop: '2px solid #1F2937',
          borderBottom: '2px solid #1F2937',
          padding: '4.5rem 1.25rem',
        }}
      >
        <div style={{ maxWidth: '1080px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '0.72rem',
                fontWeight: 800,
                textTransform: 'uppercase',
                letterSpacing: '0.15em',
                color: '#47B7D4',
              }}
            >
              The Step-by-Step Blueprint
            </span>
            <h2
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 'clamp(1.8rem, 4vw, 2.75rem)',
                fontWeight: 900,
                textTransform: 'uppercase',
                letterSpacing: '-0.03em',
                color: '#1F2937',
                marginTop: '0.5rem',
              }}
            >
              The 4-Step Practical Path to Faceless Wealth
            </h2>
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '1rem',
                color: '#6B7280',
                maxWidth: '680px',
                margin: '0.75rem auto 0',
              }}
            >
              How we take you from financial anxiety to owning a portfolio of cash-generating digital assets.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '1.5rem',
            }}
          >
            {[
              {
                step: '01',
                title: 'Claim Your Niche',
                desc: 'Audit your unmonetized skills, score high-demand niches (0-100), and secure your digital boundaries with zero identity exposure.',
                icon: Database,
                accent: '#F18B25',
              },
              {
                step: '02',
                title: 'Package Assets',
                desc: 'Turn your deep industry experience into high-utility digital products ($27-$97) using structured Notion templates and automated tools.',
                icon: TrendingUp,
                accent: '#47B7D4',
              },
              {
                step: '03',
                title: 'Automate Traffic',
                desc: 'Build self-sustaining traffic flywheels using search intent, curated newsletters, and automated lead capture magnets.',
                icon: Layers,
                accent: '#16A34A',
              },
              {
                step: '04',
                title: 'Compound Cashflow',
                desc: 'Stack multiple $500/mo assets to replace corporate salary, close your retirement gap, and establish generational digital property.',
                icon: DollarSign,
                accent: '#8B5CF6',
              },
            ].map((p) => {
              const StepIcon = p.icon;
              return (
                <div
                  key={p.step}
                  style={{
                    backgroundColor: '#FFFCF9',
                    border: '2px solid #1F2937',
                    padding: '1.75rem',
                    boxShadow: '4px 4px 0 0 #1F2937',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                      <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '1.75rem', fontWeight: 900, color: p.accent, lineHeight: 1 }}>
                        {p.step}
                      </span>
                      <div
                        style={{
                          width: '32px',
                          height: '32px',
                          backgroundColor: '#FFFFFF',
                          border: '1.5px solid #1F2937',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <StepIcon size={16} color="#1F2937" />
                      </div>
                    </div>

                    <h3
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: '1.15rem',
                        fontWeight: 900,
                        textTransform: 'uppercase',
                        color: '#1F2937',
                        marginBottom: '0.5rem',
                      }}
                    >
                      {p.title}
                    </h3>

                    <p
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: '0.88rem',
                        lineHeight: 1.55,
                        color: '#4B5563',
                        margin: 0,
                      }}
                    >
                      {p.desc}
                    </p>
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
              <span>Explore The Full Framework</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* 4. INTERACTIVE RETIREMENT GAP PREVIEW CALCULATOR */}
      <section
        style={{
          maxWidth: '1080px',
          margin: '0 auto',
          padding: '4.5rem 1.25rem',
        }}
      >
        <div
          style={{
            backgroundColor: '#FFFFFF',
            border: '2px solid #1F2937',
            padding: 'clamp(2rem, 4vw, 3rem)',
            boxShadow: '6px 6px 0 0 #1F2937',
          }}
        >
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <span
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '0.72rem',
                fontWeight: 900,
                textTransform: 'uppercase',
                letterSpacing: '0.15em',
                color: '#F18B25',
              }}
            >
              Instant Diagnostic Tool
            </span>
            <h2
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)',
                fontWeight: 900,
                textTransform: 'uppercase',
                letterSpacing: '-0.03em',
                color: '#1F2937',
                marginTop: '0.5rem',
              }}
            >
              Model Your Retirement Gap Right Now
            </h2>
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '0.95rem',
                color: '#6B7280',
                maxWidth: '650px',
                margin: '0.5rem auto 0',
              }}
            >
              Adjust your parameters to see how many $500/mo faceless digital assets you need to achieve total freedom.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '2rem',
              alignItems: 'center',
            }}
          >
            {/* Left Controls */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div>
                <label style={{ display: 'flex', justifyContent: 'space-between', fontFamily: "'Inter', sans-serif", fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', color: '#1F2937', marginBottom: '0.4rem' }}>
                  <span>Current Savings / 401(k):</span>
                  <span style={{ color: '#F18B25' }}>${previewSavings.toLocaleString()}</span>
                </label>
                <input
                  type="range"
                  min="0"
                  max="500000"
                  step="5000"
                  value={previewSavings}
                  onChange={(e) => setPreviewSavings(Number(e.target.value))}
                  style={{ width: '100%', accentColor: '#F18B25' }}
                />
              </div>

              <div>
                <label style={{ display: 'flex', justifyContent: 'space-between', fontFamily: "'Inter', sans-serif", fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', color: '#1F2937', marginBottom: '0.4rem' }}>
                  <span>Desired Monthly Income:</span>
                  <span style={{ color: '#47B7D4' }}>${previewMonthlyNeed.toLocaleString()}/mo</span>
                </label>
                <input
                  type="range"
                  min="2000"
                  max="15000"
                  step="250"
                  value={previewMonthlyNeed}
                  onChange={(e) => setPreviewMonthlyNeed(Number(e.target.value))}
                  style={{ width: '100%', accentColor: '#47B7D4' }}
                />
              </div>
            </div>

            {/* Right Output Card */}
            <div
              style={{
                backgroundColor: '#FFFCF9',
                border: '2px solid #1F2937',
                padding: '1.75rem',
                textAlign: 'center',
              }}
            >
              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.68rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#6B7280' }}>
                Your Projected Solution
              </span>
              <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '2.4rem', fontWeight: 900, color: '#1F2937', margin: '0.5rem 0 0.25rem', lineHeight: 1 }}>
                {calculatedAssetsNeeded} Faceless Assets
              </div>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.85rem', color: '#4B5563', margin: '0 0 1.25rem' }}>
                Generating ~$500/mo each replaces ${previewMonthlyNeed.toLocaleString()}/mo without needing ${calculatedPreviewShortfall.toLocaleString()} in stock market capital.
              </p>

              <Link
                to="/gap"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  padding: '0.75rem 1.5rem',
                  backgroundColor: '#F18B25',
                  color: '#1F2937',
                  border: '2px solid #1F2937',
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '0.78rem',
                  fontWeight: 900,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  textDecoration: 'none',
                  boxShadow: '3px 3px 0 0 #1F2937',
                }}
              >
                <span>Full Interactive Gap Calculator</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 5. GEN X WOMEN COMMUNITY VOICE & FEEDBACK SECTION (USER DIRECTION: CO-CREATION INSTEAD OF FAKE SOCIAL PROOF) */}
      <section
        style={{
          backgroundColor: '#FFFFFF',
          borderTop: '2px solid #1F2937',
          borderBottom: '2px solid #1F2937',
          padding: '4.5rem 1.25rem',
        }}
      >
        <div style={{ maxWidth: '1080px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
                fontFamily: "'Inter', sans-serif",
                fontSize: '0.72rem',
                fontWeight: 800,
                textTransform: 'uppercase',
                letterSpacing: '0.15em',
                color: '#F18B25',
              }}
            >
              <HeartHandshake size={15} />
              <span>Community Voice & Co-Creation Hub</span>
            </span>

            <h2
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 'clamp(1.8rem, 4vw, 2.75rem)',
                fontWeight: 900,
                textTransform: 'uppercase',
                letterSpacing: '-0.03em',
                color: '#1F2937',
                marginTop: '0.5rem',
              }}
            >
              What Do You Want to Build? We’re Listening.
            </h2>
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '1rem',
                color: '#6B7280',
                maxWidth: '680px',
                margin: '0.75rem auto 0',
              }}
            >
              DigitallyDefined is built with and for Gen X women. Share what topics you need most,
              and give honest feedback on how valuable the site and tools feel to your journey.
            </p>
          </div>

          <div
            style={{
              backgroundColor: '#FFFCF9',
              border: '2px solid #1F2937',
              padding: 'clamp(1.75rem, 3.5vw, 2.75rem)',
              boxShadow: '6px 6px 0 0 #1F2937',
              maxWidth: '850px',
              margin: '0 auto',
            }}
          >
            <form onSubmit={handleFeedbackSubmit}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem', marginBottom: '1.25rem' }}>
                {/* Topic interest */}
                <div>
                  <label style={{ display: 'block', fontFamily: "'Inter', sans-serif", fontSize: '0.72rem', fontWeight: 800, textTransform: 'uppercase', color: '#1F2937', marginBottom: '0.35rem' }}>
                    What do you want to learn more about?
                  </label>
                  <select
                    value={feedbackCategory}
                    onChange={(e) => setFeedbackCategory(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.7rem 0.85rem',
                      border: '2px solid #1F2937',
                      fontSize: '0.88rem',
                      fontFamily: "'DM Sans', sans-serif",
                      backgroundColor: '#FFFFFF',
                      outline: 'none',
                      fontWeight: 600,
                    }}
                  >
                    <option value="Faceless Digital Products">Faceless Digital Products ($27–$97)</option>
                    <option value="AI Workflow & Prompt Systems">AI Workflow & Prompt Systems</option>
                    <option value="Retirement Gap & Financial Models">Closing the $500k+ Retirement Gap</option>
                    <option value="Niche Selection & Validation">Niche Selection & Validation</option>
                    <option value="Automated Distribution & Newsletters">Automated Distribution & Newsletters</option>
                    <option value="Notion & Systems Building">Notion & Systems Architecture</option>
                  </select>
                </div>

                {/* Value perception */}
                <div>
                  <label style={{ display: 'block', fontFamily: "'Inter', sans-serif", fontSize: '0.72rem', fontWeight: 800, textTransform: 'uppercase', color: '#1F2937', marginBottom: '0.35rem' }}>
                    How do you feel about the website value?
                  </label>
                  <select
                    value={feedbackValuation}
                    onChange={(e) => setFeedbackValuation(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.7rem 0.85rem',
                      border: '2px solid #1F2937',
                      fontSize: '0.88rem',
                      fontFamily: "'DM Sans', sans-serif",
                      backgroundColor: '#FFFFFF',
                      outline: 'none',
                      fontWeight: 600,
                    }}
                  >
                    <option value="Extremely Validating & Practical">Extremely Validating & Practical</option>
                    <option value="Clear Strategy - Ready to Build">Clear Strategy — Ready to Build</option>
                    <option value="Need More Examples & Templates">Need More Examples & Templates</option>
                    <option value="Interested In Hands-On Guidance">Interested in Hands-On Guidance</option>
                  </select>
                </div>
              </div>

              {/* Note / Feedback */}
              <div style={{ marginBottom: '1.25rem' }}>
                <label style={{ display: 'block', fontFamily: "'Inter', sans-serif", fontSize: '0.72rem', fontWeight: 800, textTransform: 'uppercase', color: '#1F2937', marginBottom: '0.35rem' }}>
                  Your Thoughts, Career Background, or Questions:
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Tell us about your background, what challenges you are facing, or what tool you would like us to build next..."
                  value={feedbackNote}
                  onChange={(e) => setFeedbackNote(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.75rem 0.85rem',
                    border: '2px solid #1F2937',
                    fontSize: '0.88rem',
                    fontFamily: "'DM Sans', sans-serif",
                    backgroundColor: '#FFFFFF',
                    outline: 'none',
                    resize: 'vertical',
                  }}
                />
              </div>

              {/* Optional Email */}
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', fontFamily: "'Inter', sans-serif", fontSize: '0.72rem', fontWeight: 800, textTransform: 'uppercase', color: '#1F2937', marginBottom: '0.35rem' }}>
                  Your Email (Optional — for direct roadmap updates):
                </label>
                <input
                  type="email"
                  placeholder="your@email.com"
                  value={feedbackEmail}
                  onChange={(e) => setFeedbackEmail(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.7rem 0.85rem',
                    border: '2px solid #1F2937',
                    fontSize: '0.88rem',
                    fontFamily: "'DM Sans', sans-serif",
                    backgroundColor: '#FFFFFF',
                    outline: 'none',
                  }}
                />
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
                <button
                  type="submit"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.45rem',
                    padding: '0.85rem 1.75rem',
                    backgroundColor: '#F18B25',
                    color: '#1F2937',
                    border: '2px solid #1F2937',
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '0.8rem',
                    fontWeight: 900,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    cursor: 'pointer',
                    boxShadow: '3px 3px 0 0 #1F2937',
                  }}
                >
                  <Send size={15} />
                  <span>Submit Community Feedback</span>
                </button>

                <span style={{ fontSize: '0.72rem', color: '#6B7280', fontFamily: "'Inter', sans-serif", fontWeight: 700, textTransform: 'uppercase' }}>
                  ✓ 100% Anonymous & Privacy Protected
                </span>
              </div>

              {feedbackStatus === 'success' && (
                <div
                  style={{
                    marginTop: '1.25rem',
                    padding: '0.85rem 1.25rem',
                    backgroundColor: '#DCFCE7',
                    border: '2px solid #16A34A',
                    color: '#166534',
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '0.8rem',
                    fontWeight: 800,
                    textTransform: 'uppercase',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                  }}
                >
                  <CheckCircle2 size={16} />
                  <span>Thank you! Your feedback has been saved and will shape our next asset blueprints.</span>
                </div>
              )}
            </form>
          </div>
        </div>
      </section>

      {/* 6. FINAL CONVERSION BANNER */}
      <section
        style={{
          maxWidth: '1080px',
          margin: '0 auto',
          padding: '4.5rem 1.25rem 0',
          textAlign: 'center',
        }}
      >
        <div
          style={{
            backgroundColor: '#1F2937',
            color: '#FFFFFF',
            border: '2px solid #1F2937',
            padding: 'clamp(2.5rem, 5vw, 4rem) 1.5rem',
            boxShadow: '6px 6px 0 0 #F18B25',
          }}
        >
          <span
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '0.72rem',
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '0.15em',
              color: '#F18B25',
              display: 'inline-block',
              marginBottom: '0.75rem',
            }}
          >
            Your Reinvention Starts Today
          </span>

          <h2
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 'clamp(1.9rem, 4vw, 3rem)',
              fontWeight: 900,
              textTransform: 'uppercase',
              letterSpacing: '-0.03em',
              color: '#FFFFFF',
              maxWidth: '750px',
              margin: '0 auto 1.25rem',
              lineHeight: 1.12,
            }}
          >
            Stop Trading Time for Corporate Uncertainty. Build Your Faceless Asset.
          </h2>

          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '1rem',
              color: '#D1D5DB',
              maxWidth: '620px',
              margin: '0 auto 2.25rem',
            }}
          >
            Join hundreds of Gen X women creating recurring digital income with complete privacy and zero social media pressure.
          </p>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <Link
              to="/quiz"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '1rem 2.25rem',
                backgroundColor: '#F18B25',
                color: '#1F2937',
                border: '2px solid #FFFFFF',
                fontFamily: "'Inter', sans-serif",
                fontSize: '0.85rem',
                fontWeight: 900,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                textDecoration: 'none',
                boxShadow: '4px 4px 0 0 #FFFFFF',
              }}
            >
              <span>Take Free Superpower Quiz</span>
              <ArrowRight size={16} />
            </Link>

            <Link
              to="/builder"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '1rem 2rem',
                backgroundColor: 'transparent',
                color: '#FFFFFF',
                border: '2px solid #FFFFFF',
                fontFamily: "'Inter', sans-serif",
                fontSize: '0.85rem',
                fontWeight: 900,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                textDecoration: 'none',
              }}
            >
              <span>Join Builder Plan ($47/mo)</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
