// src/features/dashboard/components/ToolGrid.jsx

import React, { useState } from 'react';
import { runAgent } from '../api/dashboardApi.js';

const TOOLS = [
  { key: 'niche',     name: 'Niche Finder',   desc: 'Analyze a niche for demand, competition, and monetization potential.', icon: '🔍' },
  { key: 'roadmap',   name: 'Roadmap Builder', desc: 'Generate a phased strategic roadmap with milestones.', icon: '🗺️' },
  { key: 'scorecard', name: 'Scorecard',       desc: 'Score a business across demand, monetization, risk and more.', icon: '📊' },
  { key: 'product',   name: 'Product Design',  desc: 'Design a product concept with pricing and launch strategy.', icon: '📦' },
  { key: 'social',    name: 'Social Content',  desc: 'Create platform-optimized social content.', icon: '📱' },
  { key: 'trends',    name: 'Trends',          desc: 'Identify trending topics and emerging opportunities.', icon: '📈' },
];

export default function ToolGrid({ onToolRun }) {
  const [running, setRunning] = useState(null);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  async function handleRun(toolKey) {
    setRunning(toolKey);
    setResult(null);
    setError(null);
    try {
      const data = await runAgent(toolKey, { niche: '' });
      setResult(data);
      onToolRun?.(toolKey, data);
    } catch (e) {
      setError(e.message || 'Agent call failed.');
    } finally {
      setRunning(null);
    }
  }

  return (
    <div>
      <h3 style={{ fontSize: '1rem', fontWeight: 800, letterSpacing: '-0.01em', marginBottom: '1rem' }}>
        Your Tools — unlocked after quiz completion
      </h3>
      <div style={{ display: 'grid', gap: '0.75rem', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))' }}>
        {TOOLS.map((tool) => (
          <div key={tool.key} style={{ border: '1px solid var(--color-border)', padding: '1rem', background: 'var(--color-card)', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ fontSize: '1.25rem' }}>{tool.icon}</span>
              <span style={{ fontWeight: 700, fontSize: '0.95rem' }}>{tool.name}</span>
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', margin: 0, flex: 1 }}>{tool.desc}</p>
            <button className="btn btn--outline" style={{ alignSelf: 'flex-start', fontSize: '0.8rem', padding: '6px 12px' }} onClick={() => handleRun(tool.key)} disabled={running === tool.key}>
              {running === tool.key ? 'Running...' : 'Run →'}
            </button>
          </div>
        ))}
      </div>
      {running && (
        <div style={{ marginTop: '1rem', padding: '1rem', border: '1px solid var(--color-border)', background: 'var(--color-surface)', fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
          Running <strong>{TOOLS.find((t) => t.key === running)?.name}</strong>...
        </div>
      )}
      {result && (
        <div style={{ marginTop: '1rem', padding: '1rem', border: '1px solid var(--color-border)', background: 'var(--color-surface)' }}>
          <pre style={{ fontSize: '0.75rem', whiteSpace: 'pre-wrap', color: 'var(--color-text-muted)', margin: 0 }}>{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
      {error && (
        <div style={{ marginTop: '1rem', padding: '1rem', border: '1px solid #8B1A0A', background: 'rgba(139,26,10,0.1)', fontSize: '0.85rem', color: '#8B1A0A' }}>
          {error}
        </div>
      )}
    </div>
  );
}
