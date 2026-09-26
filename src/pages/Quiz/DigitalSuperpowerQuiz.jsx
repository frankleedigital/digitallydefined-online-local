import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { callAgent } from '../../lib/buzz-agents';
import { callSupabaseEdge } from '../../lib/supabase-edge';
import { getRoadmap } from '../../lib/roadmaps';
import { scoreQuiz } from './QuizLogic';
import { useToolState } from '../../context/ToolStateContext.jsx';

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

  // Reset toolState when component mounts/unmounts
  useEffect(() => {
    updateToolState({ quizComplete: false });
    return () => updateToolState({ quizComplete: false });
  }, []);

  // Auto-start quiz if ?start=true
  useEffect(() => {
    if (searchParams.get('start') === 'true' && stage === 'intro') {
      setStage('form');
      // Scroll to form after state update
      setTimeout(() => {
        const form = document.getElementById('quiz-signup');
        if (form) form.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 100);
    }
  }, [searchParams]);

  // Detect dev mode from URL params
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

    let intelligenceSuccess = true;
    let intelligenceError = null;
    let intelData = null;
    try {
      const intelResponse = await callSupabaseEdge('intelligence', {
        userId: contact.email.trim(),
        answers: finalAnswers
      });
      if (intelResponse.success !== true) {
        intelligenceSuccess = false;
        intelligenceError = 'Intelligence analysis is still processing.';
      } else {
        intelData = intelResponse.data || null;
      }
    } catch (intelError) {
      intelligenceSuccess = false;
      intelligenceError = 'Intelligence analysis is still processing.';
    }

    const fallback = getRoadmap(key);
    const superpowerKey = String(intelData?.superpower || key).toLowerCase();
    setResultKey(superpowerKey);
    setStage('result');
    setLoading(true);
    setError('');

    updateToolState({
      quizComplete: true,
      quizSuperpower: superpowerKey,
      quizAnswers: finalAnswers,
    });

    if (intelligenceError) {
      setError((current) => current || intelligenceError);
    }

    const personalized = intelData?.personalized || null;
    const aiRoadmap = personalized || (intelData?.roadmap ? {
      steps: intelData.roadmap.steps || fallback?.firstSteps || [],
      estimatedTime: '',
      tools: intelData.recommendedTools || fallback?.toolsToUse || [],
      nextAction: intelData.roadmap.nextAction || '',
      personalizedSteps: personalized?.personalizedSteps || [],
      personalizedAssets: personalized?.personalizedAssets || [],
      personalizedNiches: personalized?.personalizedNiches || [],
      personalizedAutomation: personalized?.personalizedAutomation || [],
    } : null);

    setPersonalized(aiRoadmap);

    try {
      const saveResult = await saveQuizResult({
        name: contact.name.trim(),
        email: contact.email.trim(),
        superpower: superpowerKey,
        answers: finalAnswers,
        roadmap: aiRoadmap || fallback,
        source: 'digital-superpower-quiz',
        devMode: isDevMode,
        brevoTest: isBrevoTest,
        testEmail: isTestEmail,
        roadmapId: intelData?.roadmapId || `${superpowerKey}-roadmap`,
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
        <>
          <section className="page-hero">
            <span className="label label--blue">Digital Superpower Quiz</span>
            <h1>Find the faceless asset model that fits how you already think.</h1>
            <p>Enter your name and email, answer seven practical questions, and receive a personalized superpower roadmap for building digital real estate without becoming the face of the brand.</p>
            <div className="action-row"><a href="#quiz-signup" className="btn btn--primary">Take the Quiz →</a></div>
          </section>
          <section className="story-section story-section--white">
            <div className="quiz-entry">
              <div>
                <span className="label label--orange">What you will receive</span>
                <h2>A useful result, not just a label.</h2>
                <div className="quiz-benefits">
                  <p><strong>01</strong> Your strongest digital superpower.</p>
                  <p><strong>02</strong> Faceless asset models that fit it.</p>
                  <p><strong>03</strong> Your first build sequence and tools.</p>
                  <p><strong>04</strong> A roadmap connected to your email and result.</p>
                </div>
              </div>
              <form className="quiz-signup" onSubmit={beginQuiz} id="quiz-signup">
                <span className="quiz-step-label">STEP 01 / IDENTIFY YOURSELF</span>
                <label className="form-label">First Name</label>
                <input className="form-input" required value={contact.name} onChange={(e) => setContact({ ...contact, name: e.target.value })} placeholder="What should your roadmap call you?" />
                <label className="form-label">Email Address</label>
                <input className="form-input" type="email" required value={contact.email} onChange={(e) => setContact({ ...contact, email: e.target.value })} placeholder="Email for your roadmap and guidance" />
                <button className="btn btn--primary" type="submit">Start My Assessment →</button>
                <small>By continuing, you agree to receive your result and related DigitallyDefined guidance. Unsubscribe anytime.</small>
              </form>
            </div>
          </section>
        </>
      )}

      {stage === 'form' && (
        <section className="story-section story-section--white">
          <div className="quiz-entry">
            <div>
              <span className="label label--orange">What you will receive</span>
              <h2>A useful result, not just a label.</h2>
              <div className="quiz-benefits">
                <p><strong>01</strong> Your strongest digital superpower.</p>
                <p><strong>02</strong> Faceless asset models that fit it.</p>
                <p><strong>03</strong> Your first build sequence and tools.</p>
                <p><strong>04</strong> A roadmap connected to your email and result.</p>
              </div>
            </div>
            <form className="quiz-signup" onSubmit={beginQuiz} id="quiz-signup">
              <span className="quiz-step-label">STEP 01 / IDENTIFY YOURSELF</span>
              <label className="form-label">First Name</label>
              <input className="form-input" required value={contact.name} onChange={(e) => setContact({ ...contact, name: e.target.value })} placeholder="What should your roadmap call you?" />
              <label className="form-label">Email Address</label>
              <input className="form-input" type="email" required value={contact.email} onChange={(e) => setContact({ ...contact, email: e.target.value })} placeholder="Email for your roadmap and guidance" />
              <button className="btn btn--primary" type="submit">Start My Assessment →</button>
              <small>By continuing, you agree to receive your result and related DigitallyDefined guidance. Unsubscribe anytime.</small>
            </form>
          </div>
        </section>
      )}

      {stage === 'quiz' && (
        <section className="quiz-shell">
          <div className="quiz-progress-copy">
            <span>STEP 02 / DISCOVER</span>
            <span>Question {currentQuestion + 1} of {QUESTIONS.length}</span>
          </div>
          <div className="quiz-progress"><span style={{ width: `${progress}%` }} /></div>
          <div className="quiz-question">
            <p className="section__eyebrow">{contact.name}, choose the answer that feels most natural.</p>
            <h1>{question[1]}</h1>
            <div className="quiz-options">
              {question[2].map(([value, label]) => (
                <button key={value} type="button" onClick={() => chooseAnswer(value)}>
                  <span>{value.slice(0, 1).toUpperCase()}</span>{label}
                </button>
              ))}
            </div>
          </div>
        </section>
      )}

      {stage === 'result' && roadmap && (
        <>
          <section className="page-hero page-hero--ink">
            <span className="label label--orange">Your result / {ICONS[resultKey]}</span>
            <h1>{contact.name}, your superpower is <span style={{ color: 'var(--color-blue)' }}>{roadmap.title.replace(' Roadmap', '')}</span>.</h1>
            <p>{roadmap.overview}</p>
            <div className="action-row"><a href="/tools/scorecard" className="btn btn--primary">Score My Niche →</a></div>
          </section>
          <section className="story-section story-section--cream">
            {loading && <div className="quiz-status">Personalizing your faceless digital real estate roadmap...</div>}
            {error && <div className="quiz-status quiz-status--notice">{error}</div>}
            <div className="roadmap-grid">
              <article className="roadmap-panel">
                <span className="quiz-step-label">WHY THIS FITS YOU</span>
                <h2>Your built-in advantages</h2>
                {roadmap.strengths.map((item) => <p key={item}>✓ {item}</p>)}
              </article>
              <article className="roadmap-panel roadmap-panel--blue">
                <span className="quiz-step-label">PROPERTY TYPES TO EXPLORE</span>
                <h2>Where your experience can become an asset</h2>
                {roadmap.recommendedNiches.map((item) => <p key={item}>{item}</p>)}
              </article>
            </div>
            <div className="roadmap-plan">
              <span className="label label--orange">Your personalized build sequence</span>
              <h2>From superpower to owned digital property.</h2>
              {(personalized?.personalizedSteps || personalized?.steps || roadmap.firstSteps).map((step, index) => (
                <div className="roadmap-step" key={step}>
                  <span>{String(index + 1).padStart(2, '0')}</span><p>{step}</p>
                </div>
              ))}
              {(personalized?.nextAction || roadmap?.nextAction) && (
                <div className="truth-bar"><strong>Your next action</strong><span>{personalized.nextAction || roadmap.nextAction}</span></div>
              )}
            </div>

            {personalized?.personalizedAssets?.length ? (
              <div className="roadmap-plan" style={{ marginTop: '1.25rem' }}>
                <span className="label label--blue">Assets built for you</span>
                <h2>Digital assets matched to your experience.</h2>
                {personalized.personalizedAssets.map((asset) => (
                  <div key={asset} className="roadmap-step"><span>{asset}</span></div>
                ))}
              </div>
            ) : null}

            {personalized?.personalizedNiches?.length ? (
              <div className="roadmap-plan" style={{ marginTop: '1.25rem' }}>
                <span className="label label--orange">Niche directions</span>
                <h2>Where your strengths can become ownership.</h2>
                {personalized.personalizedNiches.map((niche) => (
                  <div key={niche} className="roadmap-step"><span>{niche}</span></div>
                ))}
              </div>
            ) : null}

            {personalized?.personalizedAutomation?.length ? (
              <div className="roadmap-plan" style={{ marginTop: '1.25rem' }}>
                <span className="label label--blue">Automation leverage</span>
                <h2>Workflows that run without you.</h2>
                {personalized.personalizedAutomation.map((item) => (
                  <div key={item} className="roadmap-step"><span>{item}</span></div>
                ))}
              </div>
            ) : null}
            <div className="roadmap-next">
              <div><span className="label label--blue">STEP 03 / VALIDATE</span><h2>Do not build the whole thing yet.</h2><p>Take one of the suggested directions into the scorecard. Test demand, competition, monetization, durability, ease, and privacy fit first.</p></div>
              <div className="action-row">
                <a href="/tools/scorecard" className="btn btn--primary">Score My Niche →</a>
                <a href="/freedom" className="btn btn--outline">Model My Freedom Number</a>
                <button type="button" onClick={reset} className="btn btn--outline">Retake Quiz</button>
              </div>
            </div>

            {/* Email delivery status */}
            {emailMode && (
              <div className="quiz-status quiz-status--info" style={{ marginTop: '20px', textAlign: 'center' }}>
                <strong>Your roadmap is ready.</strong>
                <br />
                <small style={{ opacity: 0.8 }}>
                  {emailMode === 'live' && 'Your roadmap email has been sent.'}
                  {emailMode !== 'live' && 'If you do not see it shortly, check your spam folder or resubmit from the form above.'}
                </small>
              </div>
            )}

            {!emailMode && (
              <div className="quiz-status quiz-status--notice" style={{ marginTop: '20px', textAlign: 'center' }}>
                Your roadmap is ready. If you submitted your email, your personalized guidance will arrive shortly.
              </div>
            )}

            {intelligenceReady && (
              <div style={{ textAlign: 'center', marginTop: '24px' }}>
                <a href="https://dashboard.digitallydefined.online/intelligence" target="_blank" rel="noopener noreferrer" className="btn btn--outline">
                  Open My Intelligence Dashboard →
                </a>
              </div>
            )}
          </section>
        </>
      )}
    </>
  );
}
