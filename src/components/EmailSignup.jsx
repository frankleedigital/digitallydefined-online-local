// Email signup that routes through Supabase Edge Function
import React, { useState } from 'react';
import { callSupabaseEdge } from '../lib/supabase-edge';

export default function EmailSignup({ source = 'homepage' }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus('submitting');

    try {
      await callSupabaseEdge('subscribe', {
        name,
        email,
        source,
        tags: ['website-signup'],
      });

      setStatus('success');
      setName('');
      setEmail('');
    } catch (err) {
      console.error('Subscription error:', err);
      setStatus('error');
    }
  }

  return (
    <section className="section signup-section">
      <div className="signup-card">
        <h2>
          {status === 'success' ? "You're In." : 'Get the Roadmap.'}
        </h2>
        <p>
          {status === 'success'
            ? "You're in. We'll send you tools, strategy, and your first step toward building a faceless digital asset."
            : 'Enter your email to receive your personalized roadmap based on your digital superpower profile.'}
        </p>

        {status === 'success' ? (
          <p className="form-status form-status--success">You're subscribed.</p>
        ) : status === 'error' ? (
          <p className="form-status form-status--error">Something went wrong. Try again.</p>
        ) : (
          <form onSubmit={handleSubmit}>
            <label className="form-label">Your Name</label>
            <input
              type="text"
              required
              placeholder="Real name (no fake personas)"
              value={name}
              onChange={e => setName(e.target.value)}
              className="form-input"
              style={{ marginBottom: '1rem' }}
            />
            <label className="form-label">Email Address</label>
            <input
              type="email"
              required
              placeholder="your@email.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="form-input"
              style={{ marginBottom: '1rem' }}
            />
            <button
                type="submit"
                style={{ ...brutalButtonPrimary, width: '100%' }}
                disabled={status === 'submitting'}
              >
              {status === 'submitting' ? 'Sending...' : 'Send Me My Roadmap →'}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
