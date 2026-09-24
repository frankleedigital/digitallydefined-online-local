// src/features/tools/pages/ToolsPage.jsx
// Gated: requires dd-quiz-results in localStorage. Redirects to /quiz if absent.

import React from 'react';
import { Navigate } from 'react-router-dom';
import DDToolCard from '../../../components/ui/DDToolCard.jsx';
import DDLabel from '../../../components/ui/DDLabel.jsx';

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
  { key: 'niche',     name: 'Niche Profitability Scorecard',  desc: 'Score any niche across 6 criteria: demand, competition, monetization, sustainability, ease, and privacy fit.', href: '/tools/niche', status: 'active' },
  { key: 'roadmap',   name: 'Roadmap Builder',                desc: 'Generate a phased strategic roadmap with milestones and next actions.', href: '/tools/roadmap', status: 'coming-soon' },
  { key: 'product',   name: 'Product Designer',               desc: 'Design a product concept with pricing, positioning, and launch strategy.', href: '/tools/product', status: 'coming-soon' },
  { key: 'social',    name: 'Social Content',                 desc: 'Create platform-optimized social content for your niche.', href: '/tools/social', status: 'coming-soon' },
  { key: 'trends',    name: 'Trends Explorer',                desc: 'Identify trending topics and emerging opportunities in your space.', href: '/tools/trends', status: 'coming-soon' },
];

export default function ToolsPage() {
  const stored = getStoredResult();

  if (!stored) {
    return <Navigate to="/quiz" replace />;
  }

  return (
    <div className="dd-container" style={{ paddingTop: '3rem', paddingBottom: '3rem' }}>
      <DDLabel tone="orange" style={{ display: 'block', marginBottom: '0.5rem' }}>Your Toolset</DDLabel>
      <h1 style={{ fontSize: '1.75rem', fontWeight: 800, letterSpacing: '-0.03em', marginBottom: '0.5rem' }}>
        Tools unlocked after your quiz
      </h1>
      <p style={{ color: 'var(--color-text-muted)', marginBottom: '2rem' }}>
        Superpower: <strong style={{ color: 'var(--color-text)' }}>{stored.superpower}</strong>. Use these tools to validate, plan, and build.
      </p>

      <div className="story-grid story-grid--three">
        {TOOLS.map((tool, index) => (
          <DDToolCard
            key={tool.key}
            step={index + 1}
            title={tool.name}
            description={tool.desc}
            note={tool.status === 'coming-soon' ? 'Coming soon' : undefined}
            className={tool.status === 'coming-soon' ? 'tool-card--disabled' : ''}
            style={{ opacity: tool.status === 'coming-soon' ? 0.6 : 1 }}
          />
        ))}
      </div>

      <div style={{ marginTop: '2rem', borderTop: '1px solid var(--color-border)', paddingTop: '1rem', display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
        <a href="/dashboard" className="btn btn--outline" style={{ fontSize: '0.8rem', padding: '6px 12px' }}>Back to Dashboard</a>
        <a href="/roadmap" className="btn btn--outline" style={{ fontSize: '0.8rem', padding: '6px 12px' }}>View My Roadmap</a>
      </div>
    </div>
  );
}
