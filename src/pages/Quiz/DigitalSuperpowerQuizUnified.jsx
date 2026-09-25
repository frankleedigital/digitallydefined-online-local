import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { callAgent } from '../../lib/buzz-agents';
import { callSupabaseEdge } from '../../lib/supabase-edge';
import { getRoadmap } from '../../lib/roadmaps';
import { scoreQuiz } from './QuizLogic';
import { useToolState } from '../../context/ToolStateContext.jsx';
import FadeInSection from '../../components/FadeInSection';
import DDCTA from '../../components/ui/DDCTA';
import DDLabel from '../../components/ui/DDLabel';
import { theme, brutalCard, brutalHeading, brutalEyebrow, brutalButtonPrimary, brutalButtonOutline } from '../../config/theme';

const QUESTIONS = [
  ['q1', 'When you learn a new tool, what do you do first?', [
    ['builder', 'Open it and start building something small'],
    ['creator', 'Think about how it could shape my content'],
    ['educator', 'Look for tutorials or guides before touching it'],
    ['strategist', 'Check whether it fits a bigger workflow'],
    ['connector', 'See if I can use it to help someone else'],
  ]],
  ['q2', 'Which phrase sounds like a good Saturday?', [
    ['builder', 'Tweaking a website or automation until it works'],
    ['creator', 'Writing, designing, or creating in private'],
    ['educator', 'Reading a deep-dive article or course module'],
    ['strategist', "Mapping next quarter's priorities on paper"],
    ['connector', 'Checking in on my group or mentoring someone'],
  ]],
  ['q3', 'Someone offers you a new project. You ask:', [
    ['strategist', 'What is the outcome and timeline?'],
    ['builder', 'What tools and assets already exist?'],
    ['educator', 'Who has done this and what can I learn?'],
    ['creator', 'Who is the audience and what will they feel?'],
    ['connector', 'Who else needs to be in the room?'],
  ]],
  ['q4', 'Your ideal income model is:', [
    ['builder', 'Owned assets that generate leads or rent'],
    ['educator', 'Guides, templates, or teaching systems'],
    ['strategist', 'High-leverage planning and decision tools'],
    ['creator', 'Content-driven products with automated delivery'],
    ['connector', 'Community, referrals, or partner offers'],
  ]],
  ['q5', 'Which risk statement sounds most like you?', [
    ['strategist', 'I prefer planning over betting'],
    ['builder', 'I will test small and scale what works'],
    ['educator', 'I want proof before I commit'],
    ['creator', 'I care more about autonomy than visibility'],
    ['connector', 'I move when I know people are with me'],
  ]],
  ['q6', 'Which workflow feels most natural?', [
    ['builder', 'Build, measure, improve'],
    ['educator', 'Research, document, share'],
    ['strategist', 'Clarify, prioritize, delegate'],
    ['creator', 'Ideate, draft, refine in private'],
    ['connector', 'Listen, match needs, connect people'],
  ]],
  ['q7', 'What does success actually mean to you?', [
    ['builder', 'Assets that work while I am offline'],
    ['educator', 'Clarity I can pass forward to others'],
    ['strategist', 'A system that makes decisions easier'],
    ['creator', 'Work that feels like mine, not performative'],
    ['connector', 'A network that lifts everyone'],
  ]],
];

const ICONS = { builder: '01', creator: '02', educator: '03', strategist: '04', connector: '05' };

async function saveQuizResult(payload) {
  const data = await callSupabaseEdge('quiz.complete', payload);
  if (!data) throw new Error('Unable to save quiz result');
  return data;
}

export default function DigitalSuperpowerQuiz() {
  const { updateToolState } = useToolState();
  const [searchParams] = useSearchParams();
  const [stage, setStage] = useState('intro');
  const [contact, setContact] = useState({ name: '', email: '' });
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [resultKey, setResultKey] = useState(null);
  const [personalized, setPersonalized] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [emailMode, setEmailMode] = useState(null);
  const [intelligenceReady, setIntelligenceReady] = useState(false);

  useEffect(() => {
    updateToolState({ quizComplete: false });
    return () => updateToolState({ quizComplete: false });
  }, []);

  useEffect(() => {
    if (searchParams.get('start') === 'true' && stage === 'intro') {
      setStage('form');
      setTimeout(() => {
        const form = document.getElementById('quiz-signup');
        if (form) form.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 100);
    }
  }, [searchParams]);

  const isDevMode = searchParams.get('dev') === 'true' || searchParams.get('devMode') === 'true';
  const isBrevoTest = searchParams.get('brevoTest') === 'true';
  const isTestEmail = searchParams.get('testEmail') === 'true';

  const roadmap = resultKey ? getRoadmap(resultKey) : null;
  const question = QUESTIONS[currentQuestion];
  const progress = (Object.keys(answers).length / QUESTIONS.length) * 100;

  const beginQuiz = (event) => {
    event.preventDefault();
    if (!contact.name.trim() || !contact.email.trim()) return;
    setStage('quiz');
  };

  const chooseAnswer = (value) => {
    const nextAnswers = { ...answers, [question[0]]: value };
    setAnswers(nextAnswers);
    if (currentQuestion < QUESTIONS.length - 1) {
      setCurrentQuestion((current) => current + 1);
    } else {
      finishQuiz(nextAnswers);
    }
  };

  const finishQuiz = async (finalAnswers) => {
    const key = scoreQuiz(finalAnswers);

    let intelligenceSuccess = false;
    let intelligenceError = null;
    try {
      const intelResponse = await callSupabaseEdge('intelligence', {
        userId: contact.email.trim(),
        answers: finalAnswers
      });
      if (intelResponse.success === true) {
        intelligenceSuccess = true;
        localStorage.setItem('dd-quiz-results', JSON.stringify({
          userId: contact.email.trim(),
          answers: finalAnswers,
          superpower: key
        }));
      }
    } catch (intelError) {
      intelligenceError = 'Intelligence analysis failed. Your roadmap is still ready below.';
    }

    const fallback = getRoadmap(key);
    setResultKey(key);
    setStage('result');
    setLoading(true);
    setError('');

    updateToolState({
      quizComplete: true,
      quizSuperpower: key,
      quizAnswers: finalAnswers,
    });

    if (intelligenceError) {
      setError((current) => current || intelligenceError);
    }

    let aiRoadmap = null;
    try {
      const response = await callAgent('roadmap', {
        name: contact.name.trim(),
        superpower: key,
        answers: finalAnswers,
        profile: fallback,
        goal: 'Build faceless digital real estate that supports retirement and creates a transferable family asset',
      });
      aiRoadmap = response.data;
      setPersonalized(aiRoadmap);
    } catch (agentError) {
      setError('Your core roadmap is ready. AI personalization is temporarily unavailable, so we are showing the proven roadmap for your superpower.');
    }

    try {
      const saveResult = await saveQuizResult({
        name: contact.name.trim(),
        email: contact.email.trim(),
        superpower: key,
        answers: finalAnswers,
        roadmap: aiRoadmap || fallback,
        source: 'digital-superpower-quiz',
        devMode: isDevMode,
        brevoTest: isBrevoTest,
        testEmail: isTestEmail,
      });

      if (saveResult?.emailMode) {
        setEmailMode(saveResult.emailMode);
      }
    } catch (saveError) {
      setError((current) => current || 'Your roadmap is ready, but we could not save it to your profile. You can still use everything shown below.');
    } finally {
      setLoading(false);
      setIntelligenceReady(intelligenceSuccess);
    }
  };

  const reset = () => {
    setStage('intro');
    setContact({ name: '', email: '' });
    setCurrentQuestion(0);
    setAnswers({});
    setResultKey(null);
    setPersonalized(null);
    setError('');
    setIntelligenceReady(false);
  };

  return (
    <>
      {stage === 'intro' && (
        <FadeInSection>
          <section className="page-hero">
            <DDLabel tone="blue">Digital Superpower Quiz</DDLabel>
            <h1>Find the faceless asset model that fits how you already think.</h1>
            <p style={{ color: theme.colors.muted, fontFamily: theme.fonts.body, maxWidth: 640, margin: '0 auto', lineHeight: 1.6 }}>Enter your name and email, answer seven practical questions, and receive a personalized superpower roadmap for building digital real estate without becoming the face of the brand.</p>
            <div className="action-row"><DDCTA label="Take the Quiz →" href="#quiz-signup" variant="primary" /></div>
          </section>
          <section className="story-section story-section--white">
            <div className="quiz-entry">
              <div>
                <DDLabel tone="orange">What you will receive</DDLabel>
                <h2 style={{ ...brutalHeading, fontSize: 'clamp(1.4rem, 3vw, 2rem)', margin: '0.5rem 0' }}>A useful result, not just a label.</h2>
                <div className="quiz-benefits">
                  <p><strong>01</strong> Your strongest digital superpower.</p>
                  <p><strong>02</strong> Faceless asset models that fit it.</p>
                  <p><strong>03</strong> Your first build sequence and tools.</p>
                  <p><strong>04</strong> A roadmap connected to your email and result.</p>
                </div>
              </div>
              <form className="quiz-signup" onSubmit={beginQuiz} id="quiz-signup">
                <span style={{ fontFamily: theme.fonts.heading, fontSize: '0.65rem', fontWeight: 900, letterSpacing: '0.12em', color: theme.colors.textPrimary, display: 'block', marginBottom: '0.5rem' }}>STEP 01 / IDENTIFY YOURSELF</span>
                <label className="form-label" style={{ fontFamily: theme.fonts.body }}>First Name</label>
                <input className="form-input dd-input" required value={contact.name} onChange={(e) => setContact({ ...contact, name: e.target.value })} placeholder="What should your roadmap call you?" style={{ fontFamily: theme.fonts.body }} />
                <label className="form-label" style={{ fontFamily: theme.fonts.body }}>Email Address</label>
                <input className="form-input dd-input" type="email" required value={contact.email} onChange={(e) => setContact({ ...contact, email: e.target.value })} placeholder="Email for your roadmap and guidance" style={{ fontFamily: theme.fonts.body }} />
                <DDCTA label="Start My Assessment →" variant="primary" onClick={(e) => { e.preventDefault(); beginQuiz(e); }} style={{ width: '100%' }} />
                <small style={{ color: theme.colors.muted, fontFamily: theme.fonts.body, display: 'block', marginTop: '0.5rem' }}>By continuing, you agree to receive your result and related DigitallyDefined guidance. Unsubscribe anytime.</small>
              </form>
            </div>
          </section>
        </FadeInSection>
      )}

      {stage === 'form' && (
        <FadeInSection>
          <section className="story-section story-section--white">
            <div className="quiz-entry">
              <div>
                <DDLabel tone="orange">What you will receive</DDLabel>
                <h2 style={{ ...brutalHeading, fontSize: 'clamp(1.4rem, 3vw, 2rem)', margin: '0.5rem 0' }}>A useful result, not just a label.</h2>
                <div className="quiz-benefits">
                  <p><strong>01</strong> Your strongest digital superpower.</p>
                  <p><strong>02</strong> Faceless asset models that fit it.</p>
                  <p><strong>03</strong> Your first build sequence and tools.</p>
                  <p><strong>04</strong> A roadmap connected to your email and result.</p>
                </div>
              </div>
              <form className="quiz-signup" onSubmit={beginQuiz} id="quiz-signup">
                <span style={{ fontFamily: theme.fonts.heading, fontSize: '0.65rem', fontWeight: 900, letterSpacing: '0.12em', color: theme.colors.textPrimary, display: 'block', marginBottom: '0.5rem' }}>STEP 01 / IDENTIFY YOURSELF</span>
                <label className="form-label" style={{ fontFamily: theme.fonts.body }}>First Name</label>
                <input className="form-input dd-input" required value={contact.name} onChange={(e) => setContact({ ...contact, name: e.target.value })} placeholder="What should your roadmap call you?" style={{ fontFamily: theme.fonts.body }} />
                <label className="form-label" style={{ fontFamily: theme.fonts.body }}>Email Address</label>
                <input className="form-input dd-input" type="email" required value={contact.email} onChange={(e) => setContact({ ...contact, email: e.target.value })} placeholder="Email for your roadmap and guidance" style={{ fontFamily: theme.fonts.body }} />
                <DDCTA label="Start My Assessment →" variant="primary" onClick={(e) => { e.preventDefault(); beginQuiz(e); }} style={{ width: '100%' }} />
                <small style={{ color: theme.colors.muted, fontFamily: theme.fonts.body, display: 'block', marginTop: '0.5rem' }}>By continuing, you agree to receive your result and related DigitallyDefined guidance. Unsubscribe anytime.</small>
              </form>
            </div>
          </section>
        </FadeInSection>
      )}

      {stage === 'quiz' && (
        <FadeInSection>
          <section className="quiz-shell">
            <div className="quiz-progress-copy">
              <span>STEP 02 / DISCOVER</span>
              <span>Question {currentQuestion + 1} of {QUESTIONS.length}</span>
            </div>
            <div className="quiz-progress"><span style={{ width: `${progress}%` }} /></div>
            <div className="quiz-question">
              <p className="section__eyebrow" style={{ color: theme.colors.orange, fontFamily: theme.fonts.heading, fontSize: '0.72rem', fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>{contact.name}, choose the answer that feels most natural.</p>
              <h1 style={{ ...brutalHeading, fontSize: 'clamp(2rem, 5vw, 4rem)', margin: '1rem 0 2rem' }}>{question[1]}</h1>
              <div className="quiz-options">
                {question[2].map(([value, label]) => (
                  <button key={value} type="button" onClick={() => chooseAnswer(value)} style={{ ...brutalButtonOutline, justifyContent: 'flex-start', padding: '1rem', fontSize: '1rem', fontFamily: theme.fonts.body, transition: 'transform 0.2s ease, filter 0.2s ease' }} onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.filter = 'brightness(0.96)'; }} onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.filter = 'brightness(1)'; }}>
                    <span style={{ display: 'grid', width: '2rem', height: '2rem', placeItems: 'center', border: brutalBorder, background: theme.colors.aquaBlue, fontWeight: 900, fontFamily: theme.fonts.heading, color: theme.colors.textPrimary }}>{value.slice(0, 1).toUpperCase()}</span>{label}
                  </button>
                ))}
              </div>
            </div>
          </section>
        </FadeInSection>
      )}

      {stage === 'result' && roadmap && (
        <>
          <FadeInSection>
            <section className="page-hero page-hero--ink">
              <DDLabel tone="orange">Your result / {ICONS[resultKey]}</DDLabel>
              <h1>{contact.name}, your superpower is <span style={{ color: theme.colors.aquaBlue }}>{roadmap.title.replace(' Roadmap', '')}</span>.</h1>
              <p style={{ color: 'rgba(255,255,255,0.8)', fontFamily: theme.fonts.body, maxWidth: 640, margin: '0 auto', lineHeight: 1.6 }}>{roadmap.overview}</p>
              <div className="action-row"><DDCTA label="Score My Niche →" href="/tools/scorecard" variant="primary" /></div>
            </section>
          </FadeInSection>

          <FadeInSection delay={100}>
            <section className="story-section story-section--cream">
              {loading && <div className="quiz-status" style={{ fontFamily: theme.fonts.body }}>Personalizing your faceless digital real estate roadmap...</div>}
              {error && <div className="quiz-status quiz-status--notice" style={{ fontFamily: theme.fonts.body }}>{error}</div>}
              <div className="roadmap-grid">
                <article style={{ ...brutalCard, padding: '1.25rem', transition: 'transform 0.2s ease, box-shadow 0.2s ease' }} onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '2px 2px 0px rgba(0,0,0,0.12)'; }} onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '1px 1px 0px rgba(0,0,0,0.08)'; }}>
                  <span style={{ fontFamily: theme.fonts.heading, fontSize: '0.65rem', fontWeight: 900, letterSpacing: '0.12em', color: theme.colors.textPrimary, display: 'block', marginBottom: '0.5rem' }}>WHY THIS FITS YOU</span>
                  <h2 style={{ ...brutalHeading, fontSize: '1.15rem', margin: '0.5rem 0' }}>Your built-in advantages</h2>
                  {roadmap.strengths.map((item) => <p key={item} style={{ margin: '0.25rem 0', fontFamily: theme.fonts.body }}>✓ {item}</p>)}
                </article>
                <article style={{ ...brutalCard, padding: '1.25rem', background: theme.colors.aquaBlue + '18', borderColor: theme.colors.aquaBlue, transition: 'transform 0.2s ease, box-shadow 0.2s ease' }} onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '2px 2px 0px rgba(0,0,0,0.12)'; }} onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '1px 1px 0px rgba(0,0,0,0.08)'; }}>
                  <span style={{ fontFamily: theme.fonts.heading, fontSize: '0.65rem', fontWeight: 900, letterSpacing: '0.12em', color: theme.colors.textPrimary, display: 'block', marginBottom: '0.5rem' }}>PROPERTY TYPES TO EXPLORE</span>
                  <h2 style={{ ...brutalHeading, fontSize: '1.15rem', margin: '0.5rem 0' }}>Where your experience can become an asset</h2>
                  {roadmap.recommendedNiches.map((item) => <p key={item} style={{ margin: '0.25rem 0', fontFamily: theme.fonts.body }}>{item}</p>)}
                </article>
              </div>
            </section>
          </FadeInSection>

          <FadeInSection delay={180}>
            <section className="story-section story-section--white">
              <div className="roadmap-plan">
                <DDLabel tone="orange">Your personalized build sequence</DDLabel>
                <h2 style={{ ...brutalHeading, fontSize: 'clamp(1.4rem, 3vw, 2rem)', margin: '0.5rem 0' }}>From superpower to owned digital property.</h2>
                <div style={{ display: 'grid', gap: '0.75rem' }}>
                  {(personalized?.steps || roadmap.firstSteps).map((step, index) => (
                    <div key={step} className="roadmap-step" style={{ ...brutalCard, padding: '0.9rem', display: 'flex', gap: '0.75rem', alignItems: 'flex-start', transition: 'transform 0.2s ease, box-shadow 0.2s ease' }} onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '2px 2px 0px rgba(0,0,0,0.12)'; }} onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '1px 1px 0px rgba(0,0,0,0.08)'; }}>
                      <span style={{ fontWeight: 900, color: theme.colors.orange, fontFamily: theme.fonts.heading }}>{String(index + 1).padStart(2, '0')}</span>
                      <p style={{ margin: 0, fontFamily: theme.fonts.body }}>{step}</p>
                    </div>
                  ))}
                </div>
                {personalized?.nextAction && (
                  <div className="truth-bar" style={{ ...brutalCard, padding: '1rem', marginTop: '1rem', borderLeft: `4px solid ${theme.colors.orange}` }}>
                    <strong>Your next action</strong>
                    <span>{personalized.nextAction}</span>
                  </div>
                )}
              </div>
            </section>
          </FadeInSection>

          <FadeInSection delay={220}>
            <section className="story-section story-section--cream">
              <div className="roadmap-next">
                <div>
                  <DDLabel tone="blue">STEP 03 / VALIDATE</DDLabel>
                  <h2 style={{ ...brutalHeading, fontSize: 'clamp(1.3rem, 2.8vw, 1.8rem)', margin: '0.5rem 0' }}>Do not build the whole thing yet.</h2>
                  <p style={{ color: theme.colors.muted, fontFamily: theme.fonts.body, lineHeight: 1.6, maxWidth: 640 }}>Take one of the suggested directions into the scorecard. Test demand, competition, monetization, durability, ease, and privacy fit first.</p>
                </div>
                <div className="action-row" style={{ flexDirection: 'wrap' }}>
                  <DDCTA label="Score My Niche →" href="/tools/scorecard" variant="primary" />
                  <DDCTA label="Model My Freedom Number" href="/freedom" variant="outline" />
                  <button type="button" style={{ ...brutalButtonOutline, padding: '0.5rem 1rem', fontSize: '0.8rem', fontFamily: theme.fonts.body }} onClick={reset}>Retake Quiz</button>
                </div>
              </div>
            </section>
          </FadeInSection>

          <FadeInSection delay={240}>
            <section className="story-section story-section--white">
              {emailMode && (
                <div className="quiz-status quiz-status--info" style={{ marginTop: '20px', textAlign: 'center', ...brutalCard, padding: '1rem' }}>
                  <strong>Email Mode:</strong> {emailMode === 'dev' && '⚠️ DEV MODE — Email skipped (no Brevo quota used)'}
                  {emailMode === 'test' && '🧪 TEST MODE — Sent with X-Brevo-Test header (sandbox, no delivery)'}
                  {emailMode === 'blackhole' && '🕳️ BLACKHOLE MODE — Sent to blackhole@brevo.com (accepts, no delivery)'}
                  {emailMode === 'live' && '✅ LIVE MODE — Real email sent via Brevo'}
                  <br />
                  <small style={{ opacity: 0.8 }}>
                    {emailMode !== 'live' && 'Check your inbox (or Brevo logs) for the roadmap email.'}
                    {emailMode === 'live' && 'Your roadmap email has been sent.'}
                  </small>
                </div>
              )}

              {!isDevMode && !isBrevoTest && !isTestEmail && (
                <div className="quiz-status quiz-status--notice" style={{ marginTop: '20px', textAlign: 'center', ...brutalCard, padding: '1rem', fontFamily: theme.fonts.body }}>
                  ✓ Check your inbox for the personalized roadmap email
                </div>
              )}

              {intelligenceReady && (
                <div style={{ textAlign: 'center', marginTop: '24px' }}>
                  <DDCTA label="Open My Intelligence Dashboard →" href="https://dashboard.digitallydefined.online/intelligence" variant="outline" target="_blank" />
                </div>
              )}
            </section>
          </FadeInSection>
        </>
      )}
    </>
  );
}
