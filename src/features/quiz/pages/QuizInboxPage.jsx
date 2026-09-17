import React from 'react';
import { useSearchParams } from 'react-router-dom';

export default function QuizInboxPage() {
  const [searchParams] = useSearchParams();
  const email = searchParams.get('email') || '';

  return (
    <div className="container container--narrow" style={{ paddingBlock: '4rem' }}>
      <div style={{ maxWidth: 520, margin: '0 auto', textAlign: 'center' }}>
        <div style={{ fontSize: 48, marginBottom: 16 }}>✉️</div>
        <h1 style={{ fontSize: '1.75rem', marginBottom: 12 }}>Check your inbox</h1>
        <p style={{ color: 'var(--color-text-muted)', lineHeight: 1.7, marginBottom: 24 }}>
          {email
            ? `We sent your personalized roadmap to <strong style={{ color: 'var(--color-text)' }}>{email}</strong>. It includes your superpower type, the next 3 steps, and the tool we recommend for your archetype.`
            : 'Your personalized roadmap has been sent to your email. It includes your superpower type, the next 3 steps, and the tool we recommend for your archetype.'}
          {' '}Please allow a few minutes for delivery — check your spam folder if you don&apos;t see it.
        </p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href="/roadmap" className="btn btn--primary">View my roadmap →</a>
          <a href="/quiz" className="btn btn--outline">Retake the quiz</a>
        </div>
        <p style={{ marginTop: 24, fontSize: 12, color: 'var(--color-text-muted)' }}>
          Didn&apos;t get it? Email us or give it a minute — sometimes emails take up to 5 minutes to arrive.
        </p>
      </div>
    </div>
  );
}
