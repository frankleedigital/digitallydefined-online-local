// src/features/quiz/components/QuizEmailCapture.jsx
// Optional delivery step shown after the final answer, before the result is
// revealed. Ported from digitallydefined-website-clean with copy rewritten to
// the DigitallyDefined voice (calm, direct, no hype — see Brand_Guidelines.md)
// and the danger red from the brand palette instead of the old text-red-400.
//
// Brand: white card, thin black frame, squared edges, Inter headings, DM Sans body.

import React, { useState } from 'react';
import DDLabel from '../../../components/ui/DDLabel';
import DDCard from '../../../components/ui/DDCard';
import DDInput from '../../../components/ui/DDInput';
import DDCTA from '../../../components/ui/DDCTA';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function QuizEmailCapture({ onSubmit, submitting, error }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [touched, setTouched] = useState(false);

  const valid = EMAIL_RE.test(email.trim());

  function handleSubmit(e) {
    e.preventDefault();
    setTouched(true);
    if (!valid) return;
    onSubmit({ name: name.trim(), email: email.trim() });
  }

  return (
    <form className="quiz-capture" onSubmit={handleSubmit} noValidate>
      <DDCard className="quiz-capture__card">
        <DDLabel tone="orange">Optional</DDLabel>
        <h2 className="quiz-capture__title">Where should we send your roadmap?</h2>
        <p className="quiz-capture__text">
          Add a first name and an email and we will send the same roadmap you see here,
          plus your next three steps. Nothing else is sent unless you ask for it.
        </p>

        <div className="quiz-capture__row">
          <div>
            <label className="form-label" htmlFor="dd-quiz-name">First name</label>
            <DDInput
              id="dd-quiz-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="What should the roadmap call you?"
              autoComplete="given-name"
            />
          </div>
          <div>
            <label className="form-label" htmlFor="dd-quiz-email">Email address</label>
            <DDInput
              id="dd-quiz-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              autoComplete="email"
            />
          </div>
        </div>

        {touched && !valid ? (
          <p className="quiz-capture__error">Please enter a valid email address.</p>
        ) : null}
        {error ? <p className="quiz-capture__error">{error}</p> : null}

        <DDCTA type="submit" disabled={submitting} className="quiz-capture__submit">
          {submitting ? 'Building your roadmap…' : 'Send my roadmap →'}
        </DDCTA>
      </DDCard>
    </form>
  );
}
