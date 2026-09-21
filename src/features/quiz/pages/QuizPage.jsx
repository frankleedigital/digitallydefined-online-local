// src/features/quiz/pages/QuizPage.jsx
// Digital Superpower Quiz — value first, personalization local.
//
// Flow: intro → seven questions → personalized result → optional email delivery.
// Scoring and personalization are deterministic and local (lib/quizLogic.js),
// so the result renders even when every backend is unavailable.
//
// Brand rules applied here: no email gate before the value, no countdowns,
// no hype copy, one question per screen, sharp edges, high contrast.

import React, { useEffect, useRef, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { QUESTIONS } from '../lib/questions.js';
import { buildQuizResult, saveQuizResult } from '../lib/quizLogic.js';
import QuizResultCard from '../components/QuizResultCard.jsx';
import { submitQuiz } from '../api/quizApi.js';
import { useToolState } from '../../../hooks/useToolState.js';
import { trackQuizStart, trackQuizComplete, trackFormSubmit } from '../../../utils/analytics.js';

const STAGES = { INTRO: 'intro', QUESTIONS: 'questions', RESULT: 'result' };
const OPTION_LETTERS = ['A', 'B', 'C', 'D', 'E'];

const BENEFITS = [
  { number: '01', text: 'Your strongest digital superpower, scored across all seven answers.' },
  { number: '02', text: 'The strengths and blind spots that come with that profile.' },
  { number: '03', text: 'Best-fit niches where that profile is actually paid.' },
  { number: '04', text: 'A personalized build sequence, in the order that avoids wasted effort.' },
];

export default function QuizPage() {
  const { updateToolState } = useToolState();
  const [searchParams] = useSearchParams();

  const [stage, setStage] = useState(STAGES.INTRO);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);
  const [contact, setContact] = useState({ name: '', email: '' });
  const [delivery, setDelivery] = useState({ state: 'idle', message: '' });
  const autoStarted = useRef(false);

  const question = QUESTIONS[step];
  const progress = Math.round((Object.keys(answers).length / QUESTIONS.length) * 100);

  // QA flags that only affect email delivery (existing test links keep working).
  const isDevMode = searchParams.get('dev') === 'true' || searchParams.get('devMode') === 'true';
  const isBrevoTest = searchParams.get('brevoTest') === 'true';
  const isTestEmail = searchParams.get('testEmail') === 'true';
  const wantsStart = searchParams.get('start') === 'true';

  useEffect(() => {
    updateToolState({ quizComplete: false });
    return () => updateToolState({ quizComplete: false });
  }, [updateToolState]);

  // Homepage / static fallback CTA: /quiz?start=true goes straight to question 1.
  useEffect(() => {
    if (wantsStart && !autoStarted.current) {
      autoStarted.current = true;
      trackQuizStart('/quiz');
      setStage(STAGES.QUESTIONS);
    }
  }, [wantsStart]);

  function startQuiz() {
    trackQuizStart('/quiz');
    setStage(STAGES.QUESTIONS);
  }

  /** Send the roadmap — best effort. The result is already on screen and saved. */
  async function deliver(deliveryResult, recipient) {
    setDelivery({ state: 'sending', message: 'Sending your roadmap…' });
    try {
      await submitQuiz({
        name: recipient.name,
        email: recipient.email,
        superpower: deliveryResult.superpower,
        answers: deliveryResult.answers,
        roadmap: { ...deliveryResult },
        devMode: isDevMode,
        brevoTest: isBrevoTest,
        testEmail: isTestEmail,
      });
      const sent = { ...deliveryResult, emailSent: true };
      setResult(sent);
      saveQuizResult(sent);
      setDelivery({
        state: 'sent',
        message: `Your roadmap is on the way to ${recipient.email}. It can take a few minutes to arrive.`,
      });
    } catch {
      setDelivery({
        state: 'failed',
        message: 'The email could not be sent right now. Your roadmap is on this page and saved in this browser.',
      });
    }
  }

  function finishQuiz(finalAnswers) {
    const nextResult = buildQuizResult({
      name: contact.name,
      email: contact.email,
      answers: finalAnswers,
    });

    // Persist immediately: /results, /roadmap and /dashboard all read this key.
    // The old flow only saved on a successful AI call, which is why a stale
    // persona could stay on screen forever.
    setResult(nextResult);
    saveQuizResult(nextResult);
    trackQuizComplete({ email: contact.email, superpower: nextResult.superpower });
    updateToolState({
      quizComplete: true,
      quizSuperpower: nextResult.superpower,
      quizAnswers: finalAnswers,
    });
    setStage(STAGES.RESULT);
    if (typeof window !== 'undefined') window.scrollTo({ top: 0 });
    if (contact.email) deliver(nextResult, contact);
  }

  function selectAnswer(value) {
    const nextAnswers = { ...answers, [question.key]: value };
    setAnswers(nextAnswers);
    if (step < QUESTIONS.length - 1) {
      setStep(step + 1);
      return;
    }
    finishQuiz(nextAnswers);
  }

  function goBack() {
    if (step === 0) {
      setStage(STAGES.INTRO);
      return;
    }
    setStep(step - 1);
  }

  function handleCapture(event) {
    event.preventDefault();
    const recipient = { name: contact.name.trim(), email: contact.email.trim() };
    if (!recipient.email) return;
    const personalized = buildQuizResult({ ...recipient, answers });
    setResult(personalized);
    saveQuizResult(personalized);
    trackFormSubmit({ formName: 'quiz_email_capture', email: recipient.email, funnel_step: 'quiz_result' });
    deliver(personalized, recipient);
  }

  function retake() {
    setStage(STAGES.INTRO);
    setStep(0);
    setAnswers({});
    setResult(null);
    setContact({ name: '', email: '' });
    setDelivery({ state: 'idle', message: '' });
    if (typeof window !== 'undefined') window.scrollTo({ top: 0 });
  }

  if (stage === STAGES.INTRO) {
    return (
      <>
        <section className="page-hero">
          <div className="dd-container">
            <span className="label label--orange">Digital Superpower Quiz</span>
            <h1>Find the digital asset model that fits how you already think.</h1>
            <p>Seven practical questions. One superpower. A build sequence you can start this week.</p>
            <div className="action-row">
              <button type="button" className="btn btn--primary" onClick={startQuiz}>Start the quiz →</button>
            </div>
            <p className="hero-note">
              About two minutes. No camera, no follower count, and no email needed to see your result.
            </p>
          </div>
        </section>

        <section className="story-section story-section--white">
          <div className="dd-container dd-container--narrow">
            <div className="story-heading">
              <span className="label label--blue">What you get</span>
              <h2>A useful result, not a label.</h2>
              <p>
                Your answers are scored on this device. You decide afterwards whether you want the
                roadmap emailed to you.
              </p>
            </div>
            <div className="quiz-benefits">
              {BENEFITS.map((item) => (
                <p key={item.number}>
                  <strong>{item.number}</strong>
                  <span>{item.text}</span>
                </p>
              ))}
            </div>
          </div>
        </section>
      </>
    );
  }

  if (stage === STAGES.QUESTIONS && question) {
    const selectedValue = answers[question.key];
    return (
      <section className="quiz-shell">
        <div className="dd-container dd-container--narrow">
          <div className="quiz-progress-copy">
            <span>Step 02 / Discover</span>
            <span>Question {step + 1} of {QUESTIONS.length}</span>
          </div>
          <div
            className="quiz-progress"
            role="progressbar"
            aria-valuemin="0"
            aria-valuemax="100"
            aria-valuenow={progress}
            aria-label="Quiz progress"
          >
            <span style={{ width: `${progress}%` }} />
          </div>

          <div className="quiz-question">
            <p className="section__eyebrow">Choose the answer that feels most natural. There is no wrong one.</p>
            <h1>{question.label}</h1>
            <div className="quiz-options">
              {question.options.map((option, index) => (
                <button
                  key={option.value}
                  type="button"
                  className={selectedValue === option.value ? 'is-selected' : ''}
                  aria-pressed={selectedValue === option.value}
                  onClick={() => selectAnswer(option.value)}
                >
                  <span>{OPTION_LETTERS[index] || index + 1}</span>
                  {option.label}
                </button>
              ))}
            </div>
            <div className="quiz-actions">
              <button type="button" className="btn btn--outline" onClick={goBack}>
                ← {step === 0 ? 'Back to start' : 'Previous question'}
              </button>
              <span className="quiz-actions__note">Scored on this device. Nothing is sent until you ask.</span>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="story-section story-section--cream">
      <div className="dd-container">
        <QuizResultCard
          result={result}
          eyebrow="Step 03 / Your result"
          actions={
            <>
              <Link className="btn btn--primary" to={`/roadmap/${result?.superpower || 'builder'}`}>
                Open my roadmap →
              </Link>
              <Link className="btn btn--outline" to="/results">Full result page</Link>
              <button type="button" className="btn btn--outline" onClick={retake}>Retake the quiz</button>
            </>
          }
        >
          {!result?.emailSent && (
            <form className="quiz-capture" onSubmit={handleCapture}>
              <span className="label label--orange">Optional</span>
              <h3>Want this roadmap in your inbox?</h3>
              <p>
                Add a first name and an email and we will send the same roadmap you see here.
                Nothing else is sent unless you ask for it.
              </p>
              <div className="quiz-capture__row">
                <div>
                  <label className="form-label" htmlFor="quiz-name">First name</label>
                  <input
                    id="quiz-name"
                    className="form-input"
                    value={contact.name}
                    onChange={(event) => setContact({ ...contact, name: event.target.value })}
                    placeholder="What should the roadmap call you?"
                  />
                </div>
                <div>
                  <label className="form-label" htmlFor="quiz-email">Email address</label>
                  <input
                    id="quiz-email"
                    className="form-input"
                    type="email"
                    required
                    value={contact.email}
                    onChange={(event) => setContact({ ...contact, email: event.target.value })}
                    placeholder="you@example.com"
                  />
                </div>
              </div>
              <button className="btn btn--primary" type="submit" disabled={delivery.state === 'sending'}>
                {delivery.state === 'sending' ? 'Sending…' : 'Email my roadmap →'}
              </button>
            </form>
          )}

          {delivery.message ? (
            <div className={`dd-notice dd-notice--${delivery.state}`}>{delivery.message}</div>
          ) : null}

          <div className="result-secondary">
            <Link className="result-secondary__link" to="/dashboard">Open my dashboard →</Link>
            <Link
              className="result-secondary__link"
              to={`/quiz/inbox${contact.email ? `?email=${encodeURIComponent(contact.email)}` : ''}`}
            >
              Check my inbox
            </Link>
          </div>
        </QuizResultCard>
      </div>
    </section>
  );
}
