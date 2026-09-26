// src/features/tools/pages/ToolsPage.jsx
// Gated: requires dd-quiz-results in localStorage. Redirects to /quiz if absent.

import React from 'react';
import { Navigate } from 'react-router-dom';
import DDToolCard from '../../../components/ui/DDToolCard';
import DDLabel from '../../../components/ui/DDLabel';
import DDSection from '../../../components/ui/DDSection';
import DDCTA from '../../../components/ui/DDCTA';

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
    <>
      {/* ── HERO ───────────────────────────────────── */}
      <section className="dd-hero">
        <div className="dd-container dd-container--narrow">
          <DDLabel tone="orange">Your Toolset</DDLabel>
          <h1 className="dd-hero__headline">Tools unlocked by your quiz.</h1>
          <p className="dd-hero__lead">
            Superpower: <strong>{stored.superpower}</strong>. Use these tools to validate your niche,
            plan your product, and build your first digital property.
          </p>
        </div>
      </section>

      {/* ── TOOLS GRID ─────────────────────────────── */}
      <section className="dd-section dd-section--rule">
        <div className="dd-container">
          <div className="dd-grid dd-grid--three">
            {TOOLS.map((tool, index) => (
              <DDToolCard
                key={tool.key}
                step={index + 1}
                title={tool.name}
                description={tool.desc}
                href={tool.status === 'active' ? tool.href : undefined}
                note={tool.status === 'coming-soon' ? 'Coming soon' : undefined}
                className={tool.status === 'coming-soon' ? 'dd-tool-card--disabled' : ''}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── NEXT STEP ──────────────────────────────── */}
      <section className="dd-section dd-section--alt dd-section--rule">
        <div className="dd-container dd-container--narrow">
          <div className="dd-section__head">
            <DDLabel tone="orange">Next Step</DDLabel>
            <h2>Your roadmap tells you what to build first.</h2>
            <p className="dd-section__intro">
              Not sure where to start? Your personalized roadmap has a 4-phase build sequence
              based on your superpower. Follow it before using the tools.
            </p>
          </div>
          <div className="action-row">
            <DDCTA label="View My Roadmap →" href="/roadmap" variant="primary" />
            <DDCTA label="Back to Dashboard" href="/dashboard" variant="outline" />
          </div>
        </div>
      </section>
    </>
  );
}
