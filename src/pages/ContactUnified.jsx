import React, { useState } from 'react';
import {
  Send,
  CheckCircle2,
  HelpCircle,
  Shield,
  MessageSquare,
} from 'lucide-react';

export default function ContactUnified() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('submitting');
    try {
      const stored = localStorage.getItem('dd_contact_messages') || '[]';
      const parsed = JSON.parse(stored);
      parsed.push({
        name,
        email,
        message,
        timestamp: new Date().toISOString(),
      });
      localStorage.setItem('dd_contact_messages', JSON.stringify(parsed));
      setStatus('success');
      setName('');
      setEmail('');
      setMessage('');
    } catch {
      setStatus('error');
    }
  };

  return (
    <div style={{ backgroundColor: '#FFFCF9', color: '#2D3748', minHeight: '100vh', paddingBottom: '5rem' }}>
      {/* 1. HERO */}
      <section
        style={{
          borderBottom: '2px solid #1F2937',
          backgroundColor: '#FFFFFF',
          padding: 'clamp(3rem, 5vw, 4.5rem) 1.25rem',
          textAlign: 'center',
        }}
      >
        <div style={{ maxWidth: '1080px', margin: '0 auto' }}>
          <div style={{ display: 'inline-block', marginBottom: '1rem' }}>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.45rem',
                padding: '0.35rem 0.85rem',
                backgroundColor: '#FFFCF9',
                border: '2px solid #1F2937',
                fontFamily: "'Inter', sans-serif",
                fontSize: '0.7rem',
                fontWeight: 900,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: '#1F2937',
              }}
            >
              <MessageSquare size={14} color="#F18B25" />
              <span>Direct Communication</span>
            </span>
          </div>

          <h1
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 900,
              fontSize: 'clamp(2.2rem, 5vw, 3.8rem)',
              lineHeight: 1.1,
              letterSpacing: '-0.03em',
              textTransform: 'uppercase',
              color: '#1F2937',
              maxWidth: '850px',
              margin: '0 auto 1.25rem',
            }}
          >
            Get in Touch With <span style={{ color: '#F18B25' }}>DigitallyDefined</span>
          </h1>

          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 'clamp(1rem, 1.8vw, 1.15rem)',
              lineHeight: 1.6,
              color: '#4B5563',
              maxWidth: '720px',
              margin: '0 auto 2.5rem',
            }}
          >
            Have a question about the Builder plan, our calculators, or partnership opportunities? Send us a direct note.
          </p>
        </div>
      </section>

      {/* 2. FORM */}
      <section style={{ maxWidth: '750px', margin: '0 auto', padding: '4rem 1.25rem' }}>
        <div
          style={{
            backgroundColor: '#FFFFFF',
            border: '2px solid #1F2937',
            padding: 'clamp(1.75rem, 3.5vw, 2.75rem)',
            boxShadow: '6px 6px 0 0 #1F2937',
          }}
        >
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '1.25rem' }}>
              <label style={{ display: 'block', fontFamily: "'Inter', sans-serif", fontSize: '0.72rem', fontWeight: 800, textTransform: 'uppercase', color: '#1F2937', marginBottom: '0.35rem' }}>
                Your Name:
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.75rem 0.85rem',
                  border: '2px solid #1F2937',
                  fontSize: '0.88rem',
                  fontFamily: "'DM Sans', sans-serif",
                  backgroundColor: '#FFFFFF',
                  outline: 'none',
                }}
              />
            </div>

            <div style={{ marginBottom: '1.25rem' }}>
              <label style={{ display: 'block', fontFamily: "'Inter', sans-serif", fontSize: '0.72rem', fontWeight: 800, textTransform: 'uppercase', color: '#1F2937', marginBottom: '0.35rem' }}>
                Your Email Address:
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.75rem 0.85rem',
                  border: '2px solid #1F2937',
                  fontSize: '0.88rem',
                  fontFamily: "'DM Sans', sans-serif",
                  backgroundColor: '#FFFFFF',
                  outline: 'none',
                }}
              />
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', fontFamily: "'Inter', sans-serif", fontSize: '0.72rem', fontWeight: 800, textTransform: 'uppercase', color: '#1F2937', marginBottom: '0.35rem' }}>
                Your Message:
              </label>
              <textarea
                rows={5}
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.75rem 0.85rem',
                  border: '2px solid #1F2937',
                  fontSize: '0.88rem',
                  fontFamily: "'DM Sans', sans-serif",
                  backgroundColor: '#FFFFFF',
                  outline: 'none',
                  resize: 'vertical',
                }}
              />
            </div>

            <button
              type="submit"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.45rem',
                padding: '0.85rem 1.75rem',
                backgroundColor: '#F18B25',
                color: '#1F2937',
                border: '2px solid #1F2937',
                fontFamily: "'Inter', sans-serif",
                fontSize: '0.8rem',
                fontWeight: 900,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                cursor: 'pointer',
                boxShadow: '3px 3px 0 0 #1F2937',
              }}
            >
              <Send size={15} />
              <span>Send Message</span>
            </button>

            {status === 'success' && (
              <div
                style={{
                  marginTop: '1.25rem',
                  padding: '0.85rem 1.25rem',
                  backgroundColor: '#DCFCE7',
                  border: '2px solid #16A34A',
                  color: '#166534',
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '0.8rem',
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                }}
              >
                <CheckCircle2 size={16} />
                <span>Message received! We will respond to your email shortly.</span>
              </div>
            )}
          </form>
        </div>
      </section>
    </div>
  );
}
