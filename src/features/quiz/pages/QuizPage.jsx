import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { callAgent } from '../../../api/client.js';
import { getRoadmap } from '../lib/roadmapData.js';
import { scoreQuiz } from '../lib/scoring.js';
import { QUESTIONS, ICONS } from '../lib/questions.js';
import { submitQuiz, fetchIntelligence } from '../api/quizApi.js';
import { useToolState } from '../../../hooks/useToolState.js';
import { trackQuizStart, trackQuizComplete } from '../../../utils/analytics.js';

export default function QuizPage() {
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
    trackQuizStart({ source: '/quiz', email: contact.email.trim() });
    setStage('quiz');
  };

  const chooseAnswer = (value) => {
    const nextAnswers = { ...answers, [question.key]: value };
    setAnswers(nextAnswers);
    if (currentQuestion < QUESTIONS.length - 1) {
      setCurrentQuestion((current) => current + 1);
    } else {
      finishQuiz(nextAnswers);
    }
  };

  const finishQuiz = async (finalAnswers) => {
    const key = scoreQuiz(finalAnswers);
    trackQuizComplete({ email: contact.email.trim(), superpower: key });
    let intelligenceSuccess = false;
    let intelligenceError = null;
    try {
      const intelResponse = await fetchIntelligence({ userId: contact.email.trim(), answers: finalAnswers });
      if (intelResponse?.success === true) {
        intelligenceSuccess = true;
        localStorage.setItem('dd-quiz-results', JSON.stringify({ userId: contact.email.trim(), answers: finalAnswers, superpower: key }));
      }
    } catch (e) {
      intelligenceError = 'Intelligence analysis failed. Your roadmap is still ready below.';
    }
    const fallback = getRoadmap(key);
    setResultKey(key);
    setStage('result');
    setLoading(true);
    setError('');
    updateToolState({ quizComplete: true, quizSuperpower: key, quizAnswers: finalAnswers });
    if (intelligenceError) setError(intelligenceError);
    let aiRoadmap = null;
    try {
      const response = await callAgent('roadmap', { name: contact.name.trim(), superpower: key, answers: finalAnswers, profile: fallback, goal: 'Build faceless digital real estate' });
      aiRoadmap = response.data;
      setPersonalized(aiRoadmap);
    } catch (e) {
      setError('Your core roadmap is ready. AI personalization is temporarily unavailable.');
    }
    try {
      const saveResult = await submitQuiz({ name: contact.name.trim(), email: contact.email.trim(), superpower: key, answers: finalAnswers, roadmap: aiRoadmap || fallback, devMode: isDevMode, brevoTest: isBrevoTest, testEmail: isTestEmail });
      if (saveResult?.emailMode) setEmailMode(saveResult.emailMode);
    } catch (e) {
      setError((prev) => prev || 'Your roadmap is ready, but we could not save it to your profile.');
    } finally {
      setLoading(false);
      setIntelligenceReady(intelligenceSuccess);
    }
  };

  const reset = () => {
    setStage('intro'); setContact({ name: '', email: '' }); setCurrentQuestion(0);
    setAnswers({}); setResultKey(null); setPersonalized(null); setError(''); setIntelligenceReady(false);
  };

  return (
    <>
      {stage === 'intro' && (
        <>
          <section className="page-hero">
            <span className="label label--blue">Digital Superpower Quiz</span>
            <h1>Find the faceless asset model that fits how you already think.</h1>
            <p>Enter your name and email, answer seven practical questions, and receive a personalized superpower roadmap.</p>
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
          <div className="quiz-progress-copy"><span>STEP 02 / DISCOVER</span><span>Question {currentQuestion + 1} of {QUESTIONS.length}</span></div>
          <div className="quiz-progress"><span style={{ width: `${progress}%` }} /></div>
          <div className="quiz-question">
            <p className="section__eyebrow">{contact.name}, choose the answer that feels most natural.</p>
            <h1>{question.label}</h1>
            <div className="quiz-options">
              {question.options.map(({ value, label }) => (
                <button key={value} type="button" onClick={() => chooseAnswer(value)}><span>{value.slice(0, 1).toUpperCase()}</span>{label}</button>
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
            <div className="action-row"><a href="/roadmap" className="btn btn--primary">See Your Roadmap →</a></div>
          </section>
          <section className="story-section story-section--cream">
            {loading && <div className="quiz-status">Personalizing your roadmap...</div>}
            {error && <div className="quiz-status quiz-status--notice">{error}</div>}
            <div className="roadmap-grid">
              <article className="roadmap-panel"><span className="label label--blue">Your strengths</span><h3>What you already do well</h3><ul>{roadmap.strengths.map((item) => <li key={item}>{item}</li>)}</ul></article>
              <article className="roadmap-panel"><span className="label label--orange">Your blind spots</span><h3>Where people like you commonly stall</h3><ul>{roadmap.challenges.map((item) => <li key={item}>{item}</li>)}</ul></article>
              <article className="roadmap-panel"><span className="label label--blue">Best-fit niches</span><h3>Where your superpower meets demand</h3>{roadmap.recommendedNiches.map((item) => <p key={item}>{item}</p>)}</article>
            </div>
            <div className="roadmap-plan">
              <span className="label label--orange">Your personalized build sequence</span>
              <h2>From superpower to owned digital property.</h2>
              {(personalized?.steps || roadmap.firstSteps).map((step, index) => (<div className="roadmap-step" key={step}><span>{String(index + 1).padStart(2, '0')}</span><p>{step}</p></div>))}
              {personalized?.nextAction && <div className="truth-bar"><strong>Your next action</strong><span>{personalized.nextAction}</span></div>}
            </div>
            <div className="roadmap-next">
              <div><span className="label label--blue">STEP 03 / VALIDATE</span><h2>Open your dashboard to continue.</h2><p>Your roadmap is ready. Continue in your private dashboard to unlock tools.</p></div>
              <div className="action-row">
                <a href="/dashboard" className="btn btn--primary">Open My Dashboard →</a>
                <button type="button" onClick={reset} className="btn btn--outline">Retake Quiz</button>
              </div>
            </div>
            {!isDevMode && !isBrevoTest && !isTestEmail && <div className="quiz-status quiz-status--notice" style={{ marginTop: '20px', textAlign: 'center' }}>✓ Check your inbox for the personalized roadmap email</div>}
            <div style={{ textAlign: 'center', marginTop: '16px' }}>
              <a href={`/quiz/inbox?email=${encodeURIComponent(contact.email)}`} className="btn btn--outline" style={{ marginRight: '8px' }}>Check your inbox →</a>
              <a href="/roadmap" className="btn btn--outline" style={{ marginLeft: '8px' }}>View my roadmap →</a>
            </div>
            {intelligenceReady && <div style={{ textAlign: 'center', marginTop: '24px' }}><a href="/dashboard" className="btn btn--outline">Open My Dashboard →</a></div>}
          </section>
        </>
      )}
    </>
  );
}
