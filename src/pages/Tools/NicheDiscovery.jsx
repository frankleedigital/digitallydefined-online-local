import React, { useState, useEffect } from 'react';
import { callAgent } from '../../lib/buzz-agents';
import { fetchPersonalization } from '../../lib/personalization';

const SAMPLE_NICHES = [
  {
    niche: 'Retirement Planning for Gen X Women',
    demand: 'High',
    competition: 'Medium',
    keywords: ['Gen X retirement planning', 'faceless digital real estate', 'women retirement gap', 'passive income after 50'],
    recommendation: 'Strong fit for a faceless information product: clear demand, a specific audience, and room to rank with niche-focused content.',
  },
  {
    niche: 'Local Service Websites (Rank & Rent)',
    demand: 'High',
    competition: 'Medium',
    keywords: ['emergency plumber near me', 'roofing contractor', 'HVAC repair quotes'],
    recommendation: 'Solid rank-and-rent play. Local service markets stay competitive but reward sites that outrank thin directories.',
  },
  {
    niche: 'Paid Newsletters for Busy Professionals',
    demand: 'Medium',
    competition: 'Low',
    keywords: ['newsletter for working moms', 'finance digest for women', 'weekly business briefing'],
    recommendation: 'Low competition and recurring revenue make this a smart starter asset, especially if you already write or curate well.',
  },
];

export default function NicheDiscovery() {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState(null);
  const [personalization, setPersonalization] = useState(null);
  
  // Fetch personalization after result
  useEffect(() => {
    if (result?.key) {
      fetchPersonalization(result.key).then(p => setPersonalization(p));
    }
  }, [result?.key]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    
    setLoading(true);
    setError(null);
    setResult(null);
    
    try {
      const response = await callAgent('niche', { query });
      if (response.success) {
        setResult(response.data);
      } else {
        setResult(null);
      }
    } catch (err) {
      setError('Failed to analyze niche. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <section className="page-hero">
        <div className="container container--narrow" style={{ textAlign: 'center' }}>
          <p className="section__eyebrow">AI-Assisted Niche Discovery</p>
          <h1 style={{ marginBottom: '1rem' }}>
            Find Your Profitable Niche
          </h1>
          <p className="hero__tagline" style={{ fontSize: '1.1rem', maxWidth: '500px', margin: '0 auto' }}>
            AI-powered niche analysis for Gen X women building faceless digital real estate.
          </p>
          <div className="action-row"><a href="#niche-discovery" className="btn btn--primary">Discover My Niche →</a></div>
        </div>
      </section>

      <section className="section" id="niche-discovery">
        <div className="container container--narrow" style={{ maxWidth: 700 }}>
          <form onSubmit={handleSubmit} className="card interactive-form-card" style={{ marginBottom: '2rem' }}>
            <label className="form-label">What niche or topic do you want to explore?</label>
            <input 
              type="text" 
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="e.g., retirement planning for Gen X women, local roofing services..."
              className="form-input"
              style={{ marginBottom: '1rem' }}
            />
            <button type="submit" disabled={loading || !query.trim()} className="btn btn--primary">
              {loading ? 'Analyzing...' : 'Discover Niche →'}
            </button>
          </form>

          {error && (
            <>
              <div style={{ padding: '1rem', background: 'var(--color-red)', color: 'var(--color-surface)', marginBottom: '1.5rem' }}>
                {error}
              </div>
              <div className="card" style={{ padding: '2rem', marginBottom: '2rem' }}>
                <h2 style={{ fontSize: '1.3rem', marginBottom: '0.5rem' }}>Try One of These Instead</h2>
                <p style={{ color: 'var(--color-text-muted)', marginBottom: '1.5rem' }}>
                  The AI analyzer is temporarily unavailable. These proven niche starting points work for faceless digital assets.
                </p>
                {SAMPLE_NICHES.map((sample) => (
                  <div key={sample.niche} style={{ padding: '1.25rem 0', borderBottom: '1px solid rgba(0,0,0,0.08)' }}>
                    <div style={{ fontWeight: 700, fontSize: '1.05rem', marginBottom: '0.5rem' }}>{sample.niche}</div>
                    <div style={{ display: 'flex', gap: '1rem', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                      <span>Demand: <strong style={{ color: sample.demand === 'High' ? 'var(--color-blue)' : 'var(--color-accent)' }}>{sample.demand}</strong></span>
                      <span>Competition: <strong style={{ color: sample.competition === 'Low' ? 'var(--color-blue)' : 'var(--color-accent)' }}>{sample.competition}</strong></span>
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.5rem' }}>
                      {sample.keywords.map((kw, idx) => (
                        <span key={idx} style={{ padding: '0.25rem 0.75rem', background: 'var(--color-bg)', border: '1px solid var(--color-border)', fontSize: '0.85rem' }}>{kw}</span>
                      ))}
                    </div>
                    <p style={{ margin: 0, color: 'var(--color-text-muted)', lineHeight: 1.6 }}>{sample.recommendation}</p>
                  </div>
                ))}
              </div>
            </>
          )}

          {result && (
            <div className="card" style={{ padding: '2rem' }}>
              <h2 style={{ fontSize: '1.3rem', marginBottom: '1rem' }}>{result.niche || 'Your Niche'}</h2>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
                <div style={{ padding: '1rem', background: 'var(--color-surface)' }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Demand</div>
                  <div style={{ fontWeight: 700, fontSize: '1.2rem', color: result.demand === 'High' ? 'var(--color-blue)' : result.demand === 'Medium' ? 'var(--color-accent)' : 'var(--color-red)' }}>
                    {result.demand || 'Medium'}
                  </div>
                </div>
                <div style={{ padding: '1rem', background: 'var(--color-surface)' }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Competition</div>
                  <div style={{ fontWeight: 700, fontSize: '1.2rem', color: result.competition === 'Low' ? 'var(--color-blue)' : result.competition === 'Medium' ? 'var(--color-accent)' : 'var(--color-red)' }}>
                    {result.competition || 'Medium'}
                  </div>
                </div>
              </div>

              {result.keywords?.length > 0 && (
                <div style={{ marginBottom: '1.5rem' }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Keywords</div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                    {result.keywords.map((kw, idx) => (
                      <span key={idx} style={{ padding: '0.25rem 0.75rem', background: 'var(--color-bg)', border: '1px solid var(--color-border)', fontSize: '0.85rem' }}>
                        {kw}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {result.recommendation && (
                <div style={{ padding: '1rem', background: 'var(--color-bg)', borderLeft: '4px solid var(--color-accent)' }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Recommendation</div>
                  <p style={{ margin: 0, lineHeight: 1.6 }}>{result.recommendation}</p>
                </div>
              )}

              <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem' }}>
                <a href="/gap" className="btn btn--primary">Calculate My Gap →</a>
                <button onClick={() => setResult(null)} className="btn btn--outline">Analyze Another</button>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
