import React, { useState, useEffect } from 'react';
import { callAgent } from '../../lib/buzz-agents';
import { callSupabaseEdge } from '../../lib/supabase-edge';
import { getRoadmap } from '../../lib/roadmaps';
import { scoreQuiz } from '../Quiz/QuizLogic';
import { fetchPersonalization } from '../../lib/personalization';
import { PuterSaveButton } from '../../components/Puter/PuterAuth.jsx';
import { Check } from 'lucide-react';

// Footer funnel capture — stored in website_leads AND synced to the Brevo list.
const FOOTER_SOURCE = 'roadmap-generator-footer';
const FOOTER_TAGS = ['roadmap-generator', 'footer-signup'];

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
  const [stage, setStage] = useState('intro');
  const [contact, setContact] = useState({ name: '', email: '' });
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [resultKey, setResultKey] = useState(null);
  const [personalized, setPersonalized] = useState(null);
  const [personalization, setPersonalization] = useState(null);

  // Fetch personalization after quiz result
  useEffect(() => {
    if (resultKey) {
      fetchPersonalization(resultKey).then(p => setPersonalization(p));
    }
  }, [resultKey]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Footer funnel capture (Brevo-backed via the public `subscribe` action).
  const [footerOptin, setFooterOptin] = useState({ email: '', status: 'idle' });

  const handleFooterSubmit = async (e) => {
    e.preventDefault();
    const value = String(footerOptin.email || '').trim();
    if (!value) {
      setFooterOptin((s) => ({ ...s, status: 'error' }));
      return;
    }
    setFooterOptin((s) => ({ ...s, status: 'submitting' }));
    try {
      await callSupabaseEdge('subscribe', { name: '', email: value, source: FOOTER_SOURCE, tags: FOOTER_TAGS });
      setFooterOptin((s) => ({ ...s, status: 'success' }));
    } catch {
      setFooterOptin((s) => ({ ...s, status: 'error' }));
    }
  };

  const roadmap = resultKey ? getRoadmap(resultKey) : null;
  const question = QUESTIONS[currentQuestion];
  const progress = (Object.keys(answers).length / QUESTIONS.length) * 100;

  const beginQuiz = (event) => {
    event.preventDefault();
    if (!contact.name.trim() || !contact.email.trim()) return;
    setStage('quiz');
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
      await saveQuizResult({
        name: contact.name.trim(),
        email: contact.email.trim(),
        superpower: key,
        answers: finalAnswers,
        roadmap: aiRoadmap || fallback,
        source: 'digital-superpower-quiz',
      });
    } catch (saveError) {
      setError((current) => current || 'Your roadmap is ready, but we could not save it to your profile. You can still use everything shown below.');
    } finally {
      setLoading(false);
      if (intelligenceSuccess) {
        window.location.href = 'https://dashboard.digitallydefined.online/intelligence';
      }
    }
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

  const reset = () => {
    setStage('intro');
    setContact({ name: '', email: '' });
    setCurrentQuestion(0);
    setAnswers({});
    setResultKey(null);
    setPersonalized(null);
    setError('');
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
          <section className="story-section story-section--white" id="quiz-signup">
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
              <form className="quiz-signup" onSubmit={beginQuiz}>
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
              <article className="card">
                <span className="quiz-step-label">WHY THIS FITS YOU</span>
                <h2>Your built-in advantages</h2>
                {roadmap.strengths.map((item) => <p key={item}>✓ {item}</p>)}
              </article>
              <article className="card card--blue">
                <span className="quiz-step-label">PROPERTY TYPES TO EXPLORE</span>
                <h2>Where your experience can become an asset</h2>
                {roadmap.recommendedNiches.map((item) => <p key={item}>{item}</p>)}
              </article>
            </div>
            <div className="card roadmap-plan">
              <span className="label label--orange">Your personalized build sequence</span>
{personalization && personalization.roadmapAdjustments && personalization.roadmapAdjustments.length > 0 && (
  <div className="roadmap-adjustments">
    <strong>Personalized adjustments:</strong>
    {personalization.roadmapAdjustments.map((a, i) => (
      <p key={i}>{a}</p>
    ))}
  </div>
)}
              <h2>From superpower to owned digital property.</h2>
              {(personalized?.steps || roadmap.firstSteps).map((step, index) => (
                <div className="roadmap-step" key={step}>
                  <span>{String(index + 1).padStart(2, '0')}</span><p>{step}</p>
                </div>
              ))}
              {personalized?.nextAction && <div className="truth-bar"><strong>Your next action</strong><span>{personalized.nextAction}</span></div>}
            </div>
            <div className="card roadmap-next">
              <div><span className="label label--blue">STEP 03 / VALIDATE</span><h2>Do not build the whole thing yet.</h2><p>Take one of the suggested directions into the scorecard. Test demand, competition, monetization, durability, ease, and privacy fit first.</p></div>
              <div className="action-row">
                <a href="/tools/scorecard" className="btn btn--primary">Score My Niche →</a>
                <a href="/freedom" className="btn btn--outline">Model My Freedom Number</a>
                <button type="button" onClick={reset} className="btn btn--outline">Retake Quiz</button>
                {roadmap && (
                  <PuterSaveButton 
                    filename={`roadmap-${contact.name.replace(/\s+/g, '-').toLowerCase()}-${resultKey}.md`}
                    content={`# ${roadmap.title}\n\n## Overview\n${roadmap.overview}\n\n## Your Strengths\n${roadmap.strengths.map(s => `- ${s}`).join('\n')}\n\n## Recommended Niches\n${roadmap.recommendedNiches.map(n => `- ${n}`).join('\n')}\n\n## Action Steps\n${(personalized?.steps || roadmap.firstSteps).map((step, i) => `${i + 1}. ${step}`).join('\n')}\n\n${personalized?.nextAction ? `\n## Next Action\n${personalized.nextAction}\n` : ''}`}
                    mimeType="text/markdown"
                    onSaveComplete={(result) => console.log('Roadmap saved to Puter:', result)}
                  />
                )}
              </div>
            </div>
          </section>
        </>
      )}

      {/* ——— FOOTER SIGNUP (funnel capture) ——— */}
      <section className="ns-signup" style={{ background: '#111111', borderTop: '1px solid #111' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: 'clamp(3rem,6vw,4rem) 24px' }}>
          <p className="section__eyebrow" style={{ color: 'var(--color-accent)' }}>Stay in the loop</p>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, letterSpacing: '-0.03em', fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)', color: '#ffffff', margin: '0.5rem 0 1rem' }}>
            New tools land here first.
          </h2>
          <p style={{ fontSize: '1.1rem', lineHeight: 1.6, color: 'rgba(255,255,255,0.72)', maxWidth: 560, margin: '0 0 1.5rem' }}>
            One short email when a new tool goes live. No hype, no daily noise — unsubscribe anytime.
          </p>

          {footerOptin.status === 'success' ? (
            <p className="ns-gate-note ns-gate-note--success" role="status" style={{ color: '#ffffff' }}>
              <Check size={16} style={{ marginRight: '0.5rem' }} aria-hidden="true" />
              You&rsquo;re on the list. Watch your inbox for the next tool.
            </p>
          ) : (
            <form className="ns-gate-form" onSubmit={handleFooterSubmit}>
              <input
                className="ns-gate-input"
                type="email"
                required
                value={footerOptin.email}
                onChange={(e) => setFooterOptin((s) => ({ ...s, email: e.target.value, status: 'idle' }))}
                placeholder="you@example.com"
                aria-label="Email address for new tool announcements"
                disabled={footerOptin.status === 'submitting'}
              />
              <button type="submit" className="btn btn--primary" disabled={footerOptin.status === 'submitting'}>
                {footerOptin.status === 'submitting' ? 'Adding you…' : 'Notify me'}
              </button>
            </form>
          )}
          {footerOptin.status === 'error' && (
            <p className="ns-gate-note ns-gate-note--error" role="alert" style={{ color: '#ffb4a6' }}>
              That didn&rsquo;t go through. Check the address and try again.
            </p>
          )}
        </div>
      </section>
    </>
  );
}