// src/features/dashboard/pages/DashboardPage.jsx
// Gated: requires dd-quiz-results in localStorage. Redirects to /quiz if absent.

import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import PersonaHeader from '../components/PersonaHeader.jsx';
import ToolGrid from '../components/ToolGrid.jsx';

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
    <div className="dd-container" style={{ paddingTop: '3rem', paddingBottom: '3rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, letterSpacing: '-0.03em', margin: 0 }}>Dashboard</h1>
          {email && <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', margin: '0.25rem 0 0' }}>Signed in as {email}</p>}
        </div>
        <button className="btn btn--outline" style={{ fontSize: '0.8rem', padding: '6px 12px' }} onClick={() => { clearSession(); window.location.href = '/quiz'; }}>
          Sign Out
        </button>
      </div>

      <PersonaHeader superpower={stored.superpower} />

      <ToolGrid />

      <div style={{ marginTop: '2rem', borderTop: '1px solid var(--color-border)', paddingTop: '1.5rem' }}>
        <a href="/tools" className="btn btn--primary">Go to Tools →</a>
      </div>
    </div>
  );
}
