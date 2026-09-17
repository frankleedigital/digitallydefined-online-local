// src/features/tools/niche/NicheTool.jsx — Niche Profitability Scorecard

import React, { useState } from 'react';
import { scoreNiche, tierCopy, CRITERIA } from './NicheLogic.js';
import { callAgent } from '../../../api/client.js';

export default function NicheTool() {
  const [nicheName, setNicheName] = useState('');
  const [scores, setScores] = useState({});
  const [result, setResult] = useState(null);
  const [insight, setInsight] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleScoreChange = (key, value) => {
    const num = Math.min(10, Math.max(0, Number(value || '')));
    if (Number.isNaN(num)) return;
    setScores(prev => ({ ...prev, [key]: num }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;
    if (CRITERIA.some(c => scores[c.key] == null)) return;
    const scored = scoreNiche(scores);
    setResult(scored);
    setInsight(null);
    setLoading(true);
    try {
      const response = await callAgent('scorecard', { nicheName, scores, result: scored, criteria: CRITERIA });
      setInsight(response?.data || null);
    } catch {
      setInsight(null);
    } finally {
      setLoading(false);
    }
  };

  const allAnswered = CRITERIA.every(c => scores[c.key] != null && scores[c.key] > -1);
  const tierColor = (tier) => tier === 'A' ? 'var(--color-blue)' : tier === 'B' ? 'var(--color-blue)' : tier === 'C' ? 'var(--color-accent)' : 'var(--color-red)';

  return (
    <div style={{ maxWidth: 720, margin: '0 auto', padding: '3rem 1.5rem' }}>
      <span style={{ fontSize: '0.72rem', fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--color-accent)', display: 'block', marginBottom: '0.5rem' }}>
        Niche Profitability Scorecard
      </span>
      <h1 style={{ fontSize: '1.75rem', fontWeight: 800, letterSpacing: '-0.03em', marginBottom: '1.5rem' }}>
        Score any niche in 60 seconds
      </h1>

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.25rem' }}>Niche name</label>
          <input className="form-input" value={nicheName} onChange={(e) => setNicheName(e.target.value)} placeholder="e.g. emergency plumbing in Phoenix" />
        </div>

        <div style={{ border: '1px solid var(--color-border)', marginBottom: '1.5rem' }}>
          {CRITERIA.map((criterion) => (
            <div key={criterion.key} style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '1rem', alignItems: 'center', padding: '1rem', borderBottom: criterion.key !== 'ease' ? '1px solid var(--color-border)' : 'none' }}>
              <div>
                <div style={{ fontWeight: 600, fontSize: '0.95rem' }}>{criterion.label}</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>{criterion.description}</div>
              </div>
              <input type="number" min="0" max="10" value={scores[criterion.key] ?? ''} onChange={(e) => handleScoreChange(criterion.key, e.target.value)} className="form-input" style={{ width: '5rem', textAlign: 'center', fontWeight: 800 }} />
            </div>
          ))}
        </div>

        <button type="submit" disabled={!allAnswered || loading} className="btn btn--primary" style={{ opacity: allAnswered && !loading ? 1 : 0.5, cursor: allAnswered && !loading ? 'pointer' : 'default' }}>
          {loading ? 'Calculating…' : 'Calculate My Score'}
        </button>
      </form>

      {result && (
        <div style={{ marginTop: '2rem', border: '1px solid var(--color-border)', padding: '1.5rem', background: 'var(--color-surface)' }}>
          <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '5rem', height: '5rem', fontWeight: 900, fontSize: '1.8rem', color: 'var(--color-surface)', background: tierColor(result.tier), border: '1px solid var(--color-border)' }}>
              {Math.round(result.pct * 100)}%
            </div>
            <div style={{ marginTop: '0.75rem', fontWeight: 800, fontSize: '1.25rem', textTransform: 'uppercase' }}>{tierCopy(result.tier).title}</div>
            <p style={{ color: 'var(--color-text-muted)', maxWidth: 480, margin: '0.5rem auto 0' }}>{tierCopy(result.tier).body}</p>
          </div>

          {loading && <p style={{ textAlign: 'center', color: 'var(--color-text-muted)' }}>Getting AI interpretation...</p>}
          {insight && !loading && (
            <div style={{ marginTop: '1rem', padding: '1rem', background: 'var(--color-card)', border: '1px solid var(--color-border)' }}>
              <h3 style={{ fontSize: '0.85rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--color-accent)', marginBottom: '0.5rem' }}>AI Interpretation</h3>
              <p style={{ color: 'var(--color-text-muted)', lineHeight: 1.7 }}>{insight?.summary || 'Analysis complete.'}</p>
              {insight?.nextAction && <div style={{ marginTop: '0.75rem', padding: '0.5rem', background: 'rgba(241,139,37,0.1)', borderLeft: '3px solid var(--color-accent)' }}><strong>Next action:</strong> {insight.nextAction}</div>}
            </div>
          )}
        </div>
      )}

      <div style={{ marginTop: '2rem', borderTop: '1px solid var(--color-border)', paddingTop: '1rem', display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
        <a href="/dashboard" className="btn btn--outline" style={{ fontSize: '0.8rem', padding: '6px 12px' }}>Back to Dashboard</a>
        <a href="/quiz" className="btn btn--outline" style={{ fontSize: '0.8rem', padding: '6px 12px' }}>Retake Quiz</a>
      </div>
    </div>
  );
}
