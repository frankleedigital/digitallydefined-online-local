import React from 'react';
import { useSearchParams } from 'react-router-dom';
import DDCTA from '../../../components/ui/DDCTA';
import DDLabel from '../../../components/ui/DDLabel';
import DDSection from '../../../components/ui/DDSection';
import DDCard from '../../../components/ui/DDCard';

export default function QuizInboxPage() {
  const [searchParams] = useSearchParams();
  const email = searchParams.get('email') || '';

  return (
    <DDSection className="dd-section--padding">
      <div className="dd-container dd-container--narrow" style={{ textAlign: 'center' }}>
        <DDCard className="dd-card--icon-container" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 64, height: 64, marginBottom: 24 }}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
            <polyline points="22,6 12,13 2,6" />
          </svg>
        </DDCard>
        <DDLabel tone="blue">Check your inbox</DDLabel>
        <h1>Your personalized roadmap is on its way.</h1>
        <p>
          {email
            ? `We sent your personalized roadmap to <strong>{email}</strong>. It includes your superpower type, the next 3 steps, and the tool we recommend for your archetype.`
            : 'Your personalized roadmap has been sent to your email. It includes your superpower type, the next 3 steps, and the tool we recommend for your archetype.'}
          {' '}Please allow a few minutes for delivery — check your spam folder if you don't see it.
        </p>
        <div className="action-row">
          <DDCTA label="View my roadmap" href="/roadmap" variant="primary" />
          <DDCTA label="Retake the quiz" href="/quiz" variant="outline" />
        </div>
        <p className="dd-notice dd-notice--quiet mt-2">
          Didn't get it? Email us or give it a minute — sometimes emails take up to 5 minutes to arrive.
        </p>
      </div>
    </DDSection>
  );
}
