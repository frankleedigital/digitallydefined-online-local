// src/features/tools/pages/ToolsPage.jsx
// Gated: requires dd-quiz-results in localStorage. Redirects to /quiz if absent.

import React from 'react';
import { Navigate } from 'react-router-dom';

const STORAGE_KEY = 'dd-quiz-results';

function getStoredResult() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

const TOOLS = [
  { key: 'niche',     name: 'Niche Profitability Scorecard',  desc: 'Score any niche across 6 criteria: demand, competition, monetization, sustainability, ease, and privacy fit.', href: '/tools/niche', icon: '🔍' },
  { key: 'roadmap',   name: 'Roadmap Builder',                desc: 'Generate a phased strategic roadmap with milestones and next actions.', href: '/tools/roadmap', icon: '🗺️' },
  { key: 'product',   name: 'Product Designer',               desc: 'Design a product concept with pricing, positioning, and launch strategy.', href: '/tools/product', icon: '📦' },
  { key: 'social',    name: 'Social Content',                 desc: 'Create platform-optimized social content for your niche.', href: '/tools/social', icon: '📱' },
  { key: 'trends',    name: 'Trends Explorer',                desc: 'Identify trending topics and emerging opportunities in your space.', href: '/tools/trends', icon: '📈' },
];

export default function ToolsPage() {
  const stored = getStoredResult();

  if (!stored) {
    return <Navigate to="/quiz" replace />;
  }

  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: '3rem 1.5rem' }}>
      <span style={{ fontSize: '0.72rem', fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--color-accent)', display: 'block', marginBottom: '0.5rem' }}>
        Your Toolset
      </span>
      <h1 style={{ fontSize: '1.75rem', fontWeight: 800, letterSpacing: '-0.03em', marginBottom: '0.5rem' }}>
        Tools unlocked after your quiz
      </h1>
      <p style={{ color: 'var(--color-text-muted)', marginBottom: '2rem' }}>
        Superpower: <strong style={{ color: 'var(--color-text)' }}>{stored.superpower}</strong>. Use these tools to validate, plan, and build.
      </p>

      <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))' }}>
        {TOOLS.map((tool) => (
          <a key={tool.key} href={tool.href} style={{ border: '1px solid var(--color-border)', padding: '1.25rem', background: 'var(--color-card)', textDecoration: 'none', display: 'flex', gap: '1rem', alignItems: 'flex-start', transition: 'box-shadow 0.15s' }}
             onMouseEnter={(e) => e.currentTarget.style.boxShadow = 'var(--shadow-hover)'}
             onMouseLeave={(e) => e.currentTarget.style.boxShadow = 'none'}>
            <span style={{ fontSize: '1.5rem' }}>{tool.icon}</span>
            <div>
              <div style={{ fontWeight: 700, fontSize: '1rem', marginBottom: '0.25rem' }}>{tool.name}</div>
              <div style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', lineHeight: 1.6 }}>{tool.desc}</div>
            </div>
          </a>
        ))}
      </div>

      <div style={{ marginTop: '2rem', borderTop: '1px solid var(--color-border)', paddingTop: '1rem', display: 'flex', gap: '0.75rem' }}>
        <a href="/dashboard" className="btn btn--outline" style={{ fontSize: '0.8rem', padding: '6px 12px' }}>Back to Dashboard</a>
        <a href="/roadmap" className="btn btn--outline" style={{ fontSize: '0.8rem', padding: '6px 12px' }}>View My Roadmap</a>
      </div>
    </div>
  );
}
