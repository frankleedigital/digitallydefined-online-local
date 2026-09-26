import React, { useState } from 'react';
import {
  Mail,
  MessageSquare,
  Shield,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Clock
} from 'lucide-react';

export default function ContactUnified() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '', topic: 'General Inquiry' });

  const handleSubmit = (e) => {
    e.preventDefault();
    const existing = JSON.parse(localStorage.getItem('dd_contact_messages') || '[]');
    existing.push({ ...formData, timestamp: new Date().toISOString() });
    localStorage.setItem('dd_contact_messages', JSON.stringify(existing));
    setSubmitted(true);
  };

  return (
    <div style={{ backgroundColor: '#FFFCF9', color: '#1F2937', minHeight: '100vh' }}>
      
      {/* Header — Centered */}
      <section
        style={{
          maxWidth: '1040px',
          margin: '0 auto',
          padding: 'clamp(3rem, 6vw, 4.5rem) 1.25rem 2rem',
          textAlign: 'center',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.45rem',
              backgroundColor: '#FFFFFF',
              border: '1.5px solid #1F2937',
              padding: '0.35rem 0.85rem',
              fontSize: '0.72rem',
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              color: '#F18B25',
              boxShadow: 'none',
            }}
          >
            <Mail size={13} color="#F18B25" />
            <span>Direct Communication</span>
          </div>
        </div>

        <h1
          style={{
            fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
            fontWeight: 900,
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            textTransform: 'uppercase',
            letterSpacing: '-0.02em',
            color: '#1F2937',
            marginBottom: '1rem',
          }}
        >
          Connect With Our Team & Hermes
        </h1>

        <p
          style={{
            fontFamily: "'DM Sans', system-ui, sans-serif",
            fontSize: '1.05rem',
            color: '#4B5563',
            maxWidth: '620px',
            margin: '0 auto 2.5rem',
            lineHeight: 1.6,
          }}
        >
          Have questions about the archetype quiz, builder roadmap, or enterprise automation systems? 
          We respond within 24 business hours.
        </p>
      </section>

      {/* Form Container — Centered (Max-Width 720px) */}
      <section
        style={{
          maxWidth: '720px',
          margin: '0 auto',
          padding: '0 1.25rem 4.5rem',
        }}
      >
        <div
          style={{
            backgroundColor: '#FFFFFF',
            border: '1.5px solid #1F2937',
            padding: 'clamp(1.5rem, 4vw, 2.5rem)',
            boxShadow: 'none',
          }}
        >
          {submitted ? (
            <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
              <div
                style={{
                  width: '54px',
                  height: '54px',
                  backgroundColor: '#FFF7ED',
                  border: '1.5px solid #F18B25',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1.25rem',
                }}
              >
                <CheckCircle2 size={28} color="#F18B25" />
              </div>
              <h3
                style={{
                  fontFamily: "'Inter', system-ui, sans-serif",
                  fontSize: '1.3rem',
                  fontWeight: 900,
                  textTransform: 'uppercase',
                  color: '#1F2937',
                  marginBottom: '0.5rem',
                }}
              >
                Message Received
              </h3>
              <p style={{ fontSize: '0.92rem', color: '#4B5563', maxWidth: '420px', margin: '0 auto 1.5rem', lineHeight: 1.5 }}>
                Thank you for reaching out. A team specialist or Hermes assistant will review your note shortly.
              </p>
              <button
                type="button"
                onClick={() => setSubmitted(false)}
                style={{
                  backgroundColor: '#1F2937',
                  color: '#FFFFFF',
                  border: 'none',
                  fontSize: '0.78rem',
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  padding: '0.65rem 1.5rem',
                  cursor: 'pointer',
                }}
              >
                Send Another Note
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem', marginBottom: '1.25rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', color: '#1F2937', marginBottom: '0.4rem' }}>
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g., Sarah Jenkins"
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '1.5px solid #1F2937',
                      fontSize: '0.9rem',
                      fontFamily: "'DM Sans', system-ui, sans-serif",
                      outline: 'none',
                      backgroundColor: '#FAF8F5',
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', color: '#1F2937', marginBottom: '0.4rem' }}>
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="sarah@example.com"
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '1.5px solid #1F2937',
                      fontSize: '0.9rem',
                      fontFamily: "'DM Sans', system-ui, sans-serif",
                      outline: 'none',
                      backgroundColor: '#FAF8F5',
                    }}
                  />
                </div>
              </div>

              <div style={{ marginBottom: '1.25rem' }}>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', color: '#1F2937', marginBottom: '0.4rem' }}>
                  Subject / Topic
                </label>
                <select
                  value={formData.topic}
                  onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1.5px solid #1F2937',
                    fontSize: '0.9rem',
                    fontFamily: "'DM Sans', system-ui, sans-serif",
                    outline: 'none',
                    backgroundColor: '#FAF8F5',
                  }}
                >
                  <option value="General Inquiry">General Inquiry</option>
                  <option value="Superpower Diagnostic Question">Superpower Diagnostic Question</option>
                  <option value="Retirement Gap Modeling">Retirement Gap Modeling</option>
                  <option value="Builder Tier Implementation">Builder Tier Implementation</option>
                  <option value="Empire Custom Automation">Empire Custom Automation</option>
                </select>
              </div>

              <div style={{ marginBottom: '1.75rem' }}>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', color: '#1F2937', marginBottom: '0.4rem' }}>
                  How can we help?
                </label>
                <textarea
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell us about your background, career experience, or any questions regarding building faceless digital assets..."
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1.5px solid #1F2937',
                    fontSize: '0.9rem',
                    fontFamily: "'DM Sans', system-ui, sans-serif",
                    outline: 'none',
                    backgroundColor: '#FAF8F5',
                    resize: 'vertical',
                  }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <button
                  type="submit"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    backgroundColor: '#F18B25',
                    border: '1.5px solid #1F2937',
                    color: '#1F2937',
                    fontFamily: "'Inter', system-ui, sans-serif",
                    fontSize: '0.88rem',
                    fontWeight: 800,
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em',
                    padding: '0.9rem 2.25rem',
                    cursor: 'pointer',
                  }}
                >
                  <span>Submit Inquiry</span>
                  <ArrowRight size={15} />
                </button>
              </div>
            </form>
          )}
        </div>
      </section>

    </div>
  );
}
