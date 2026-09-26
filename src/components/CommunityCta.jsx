import React, { useState } from 'react';
import SocialIcons from './SocialIcons';
import { callSupabaseEdge } from '../lib/supabase-edge';

export default function CommunityCta() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  async function handleJoin(e) {
    e.preventDefault();
    try {
      await callSupabaseEdge('subscribe', {
        email,
        source: 'community-cta',
        tags: ['community-signup'],
      });
      setSubmitted(true);
      setEmail('');
    } catch (err) {
      console.error('Community signup failed:', err);
    }
  }

  return (
    <section className="section signup-section">
      <div className="signup-card">
        <h2>Join the Faceless Community</h2>
        <p>Real talk. Real systems. No fluff. Join women building digital real estate on their own terms.</p>
        
        {submitted ? (
          <p className="form-status form-status--success">You're in. Check your inbox.</p>
        ) : (
          <form onSubmit={handleJoin} style={{ display: 'flex', gap: '0.75rem', maxWidth: 450, margin: '0 auto', flexWrap: 'wrap', justifyContent: 'center' }}>
            <input type="email" required placeholder="Your email" value={email} onChange={e => setEmail(e.target.value)} className="form-input" style={{ flex: 1, minWidth: 200 }} />
            <button type="submit" style={{ ...brutalButtonPrimary }}>Join Community →</button>
          </form>
        )}
        
        <SocialIcons style={{ marginTop: '2rem', justifyContent: 'center' }} />
      </div>
    </section>
  );
}
