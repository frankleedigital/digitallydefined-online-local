// src/features/dashboard/pages/DashboardPage.jsx
// Gated: requires dd-quiz-results in localStorage. Redirects to /quiz if absent.

import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import PersonaHeader from '../components/PersonaHeader.jsx';
import ToolGrid from '../components/ToolGrid.jsx';
import DDLabel from '../../../components/ui/DDLabel.jsx';
import DDCard from '../../../components/ui/DDCard.jsx';
import DDCTA from '../../../components/ui/DDCTA.jsx';

const STORAGE_KEY = 'dd-quiz-results';

function getStoredResult() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function clearSession() {
  localStorage.removeItem(STORAGE_KEY);
}

export default function DashboardPage() {
  const stored = getStoredResult();
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (stored?.userId) setEmail(stored.userId);
  }, [stored]);

  if (!stored) {
    return <Navigate to="/quiz" replace />;
  }

  return (
    <>
      {/* ── DASHBOARD HEADER ─────────────────────────── */}
      <section className="dd-dashboard-header">
        <div className="dd-container">
          <div className="dd-dashboard-header__inner">
            <div>
              <DDLabel tone="orange">Your Workspace</DDLabel>
              <h1 className="dd-dashboard-header__title">Dashboard</h1>
              {email && (
                <p className="dd-dashboard-header__sub">
                  Signed in as {email}
                </p>
              )}
            </div>
            <button
              className="dd-btn dd-btn--outline dd-btn--sm"
              onClick={() => { clearSession(); window.location.href = '/quiz'; }}
            >
              Sign Out
            </button>
          </div>
        </div>
      </section>

      {/* ── PERSONA HEADER ───────────────────────────── */}
      <section className="dd-section dd-section--rule">
        <div className="dd-container">
          <PersonaHeader superpower={stored.superpower} />
        </div>
      </section>

      {/* ── TOOL GRID ────────────────────────────────── */}
      <section className="dd-section dd-section--alt dd-section--rule">
        <div className="dd-container">
          <div className="dd-section__head">
            <DDLabel tone="orange">Your Tools</DDLabel>
            <h2>Tools unlocked by your quiz result.</h2>
            <p className="dd-section__intro">
              Superpower: <strong>{stored.superpower}</strong>. Use these tools to validate your niche, plan your product, and build.
            </p>
          </div>
          <ToolGrid />
        </div>
      </section>

      {/* ── NEXT STEPS ───────────────────────────────── */}
      <section className="dd-section dd-section--rule">
        <div className="dd-container">
          <div className="dd-section__head">
            <DDLabel tone="orange">Next Steps</DDLabel>
            <h2>What to do next.</h2>
          </div>
          <div className="dd-grid dd-grid--three">
            <DDCard>
              <div className="dd-card__inner">
                <DDLabel tone="orange">01</DDLabel>
                <h3 className="dd-card__title">Review your roadmap.</h3>
                <p className="dd-card__text">Your personalized build sequence — the exact order of actions for your superpower profile.</p>
                <DDCTA label="Open Roadmap →" href="/roadmap" variant="primary" />
              </div>
            </DDCard>
            <DDCard>
              <div className="dd-card__inner">
                <DDLabel tone="orange">02</DDLabel>
                <h3 className="dd-card__title">Score your niche.</h3>
                <p className="dd-card__text">Validate a niche idea across 6 criteria before you commit time to building anything.</p>
                <DDCTA label="Open Niche Scorecard →" href="/tools/niche" variant="outline" />
              </div>
            </DDCard>
            <DDCard>
              <div className="dd-card__inner">
                <DDLabel tone="orange">03</DDLabel>
                <h3 className="dd-card__title">Explore all tools.</h3>
                <p className="dd-card__text">See your full unlocked toolset — niche, roadmap, product, social, and trends tools.</p>
                <DDCTA label="Go to Tools →" href="/tools" variant="outline" />
              </div>
            </DDCard>
          </div>
        </div>
      </section>
    </>
  );
}
