import React, { useState, useEffect } from 'react';
import { scoreNiche, tierCopy, CRITERIA } from './ScorecardLogic';
import { callAgent } from '../../lib/buzz-agents';
import { useToolState } from '../../context/ToolStateContext.jsx';
import AiMentorChatBox from '../../components/AiMentorChatBox';

// Helper guidance shown under each scoring field. Content only — does not affect scoring.
const CRITERIA_HELP = {
  demand: 'A 7\u201310 usually means people already search for this. 1\u20133 means you\u2019ll need to build awareness from scratch.',
  competition: 'Score high when you can realistically reach buyers without beating huge, funded brands. Low when the top results are crowded.',
  monetization: 'High = you can name at least three clear ways to earn. Low = the money path still feels fuzzy.',
  sustainability: 'Picture demand three years from today. Steady or growing = high. A fading trend = low.',
  ease: 'Can you launch a solid first version with what you already have? Quick and mostly no-code = high. Big team or rare skills = low.',
  privacyFit: 'Higher is better if you prefer to work without being in front of a camera or using your real name.',
};

export default function NicheProfitabilityScorecard() {
  const { updateToolState } = useToolState();
  const [scores, setScores] = useState({});
  const [result, setResult] = useState(null);
  const [nicheName, setNicheName] = useState('');
  const [insight, setInsight] = useState(null);
  const [insightLoading, setInsightLoading] = useState(false);

  // Reset toolState when component mounts/unmounts
  useEffect(() => {
    updateToolState({ analyzed: false });
    return () => updateToolState({ analyzed: false });
  }, []);

  const handleScoreChange = (key, value) => {
    const num = Math.min(10, Math.max(0, Number(value || '')));
    if (Number.isNaN(num)) return;
    setScores(prev => ({ ...prev, [key]: num }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (CRITERIA.some(c => scores[c.key] === undefined || scores[c.key] === null)) return;
    const scored = scoreNiche(scores);
    setResult(scored);
    setInsight(null);
    setInsightLoading(true);

    // Derive the strongest and weakest scoring criteria so Hermes can point at
    // concrete leverage / risk areas.
    const criterionScores = CRITERIA.map((c) => ({
      key: c.key,
      label: c.label,
      value: Number(scores[c.key] || 0),
    }));
    const strength = [...criterionScores].sort((a, b) => b.value - a.value)[0]?.label || null;
    const weakness = [...criterionScores].sort((a, b) => a.value - b.value)[0]?.label || null;

    // Publish results to Hermes
    updateToolState({
      analyzed: true,
      analysisComplete: true,
      niche: nicheName || 'Unnamed niche',
      score: Math.round(scored.pct * 100),
      recommendation: tierCopy(scored.tier).title,
      nicheScore: Math.round(scored.pct * 100),
      nicheCategory: scored.tier,
      nicheInputs: scores,
      strength,
      weakness,
    });
    try {
      const response = await callAgent('scorecard', {
        nicheName: nicheName || 'Unnamed niche',
        scores,
        result: scored,
        criteria: CRITERIA,
      });
      setInsight(response.data);
    } catch {
      setInsight(null);
    } finally {
      setInsightLoading(false);
    }
  };

  const allAnswered = CRITERIA.every(c => scores[c.key] != null && scores[c.key] > -1);
  const tierColor = (tier) => tier === 'A' ? 'var(--color-success)' : tier === 'B' ? 'var(--color-accent)' : tier === 'C' ? 'var(--color-accent)' : 'var(--color-red)';

  if (result) {
    const copy = tierCopy(result.tier);
    return (
      <>
        <section className="page-hero">
          <div className="container container--narrow">
            <p className="section__eyebrow">Results</p>
            <h1>Niche Score for &ldquo;{nicheName || 'your niche'}&rdquo;</h1>
            <div className="action-row"><a href="#score-results" className="btn btn--primary">Review My Score →</a></div>
          </div>
        </section>

        <section className="section" id="score-results">
          <div className="container container--narrow">
            {/* Score badge */}
            <div style={{ textAlign: 'center', marginBottom: 'var(--space-xl)' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '6rem', height: '6rem', borderRadius: 0, fontFamily: "'Inter', sans-serif", fontWeight: 900, fontSize: '2.2rem', color: '#fff', background: tierColor(result.tier), border: '1px solid #000' }}>
                {Math.round(result.pct * 100)}%
              </div>
              <div style={{ marginTop: 'var(--space-sm)', fontFamily: "'Inter', sans-serif", fontWeight: 800, fontSize: '1.5rem', textTransform: 'uppercase' }}>{copy.title}</div>
              <p style={{ maxWidth: '480px', marginInline: 'auto', fontSize: '1.05rem', lineHeight: 1.7, color: 'var(--color-text-muted)' }}>{copy.body}</p>
            </div>

            <div className="card" style={{ marginBottom: 'var(--space-lg)', background: '#fff' }}>
              <p className="section__eyebrow">AI-Assisted Interpretation</p>
              <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>
                {insightLoading ? 'Interpreting your score...' : insight?.summary || 'Use the score as a filter, then validate the market.'}
              </h2>
              {insight && (
                <div className="grid-2">
                  <div>
                    <h3 style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>Strongest signals</h3>
                    {insight.strongestSignals?.map(item => <p key={item}>+ {item}</p>)}
                    <h3 style={{ fontSize: '1rem', margin: '1rem 0 0.5rem' }}>Monetization paths</h3>
                    {insight.monetizationPaths?.map(item => <p key={item}>+ {item}</p>)}
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>Risk flags</h3>
                    {insight.riskFlags?.map(item => <p key={item}>! {item}</p>)}
                    <h3 style={{ fontSize: '1rem', margin: '1rem 0 0.5rem' }}>Validation experiments</h3>
                    {insight.validationExperiments?.map(item => <p key={item}>→ {item}</p>)}
                  </div>
                </div>
              )}
              {insight?.nextAction && <div className="truth-bar"><strong>Next action</strong><span>{insight.nextAction}</span></div>}
            </div>

            {/* Breakdown table */}
            <div className="card" style={{ marginBottom: 'var(--space-lg)' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '1rem', alignItems: 'center', padding: '0.9rem 0', borderBottom: '1px solid rgba(0,0,0,0.08)', fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: '0.78rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--color-text-muted)' }}>
                <span>Criterion</span>
                <span>Score</span>
              </div>
              {CRITERIA.map(c => (
                <div key={c.key} style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '1rem', alignItems: 'center', padding: '0.85rem 0', borderBottom: c.key !== 'demand_market' ? '1px solid rgba(0,0,0,0.04)' : 'none' }}>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '0.95rem' }}>{c.label}</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>{c.description}</div>
                  </div>
                  <div style={{ fontFamily: "'Inter', sans-serif", fontWeight: 800, fontSize: '1.2rem', color: 'var(--color-text)' }}>{scores[c.key]} / 10</div>
                </div>
              ))}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '1rem', alignItems: 'center', padding: '0.85rem 0', marginTop: '0.5rem', borderTop: '2px solid rgba(0,0,0,0.08)', fontFamily: "'Inter', sans-serif", fontWeight: 800, fontSize: '1rem' }}>
                <span>Total: {result.total}/{result.maxPossible} raw points ({Math.round(result.pct * 100)}%)</span>
                <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 800, fontSize: '1.1rem', color: tierColor(result.tier) }}>{copy.title}</span>
              </div>
            </div>

            {/* What Your Score Means */}
            <div className="card" style={{ marginBottom: 'var(--space-lg)', background: '#fff' }}>
              <p className="section__eyebrow">What Your Score Means</p>
              <h2 style={{ fontSize: '1.4rem', marginBottom: '0.75rem' }}>A quick way to read your result</h2>
              <p style={{ lineHeight: 1.7, color: 'var(--color-text-muted)', marginBottom: '1rem' }}>
                Your score is a percentage out of 100. Here&rsquo;s how to think about it before you choose your next step:
              </p>
              <ul style={{ lineHeight: 1.9, color: 'var(--color-text-muted)', paddingLeft: '1.25rem', margin: 0 }}>
                <li><strong>0\u201320</strong> — Low signal. The idea likely needs more market proof before it&rsquo;s worth your time.</li>
                <li><strong>21\u201340</strong> — Mixed at best. Look closely at competition and monetization before building.</li>
                <li><strong>41\u201360</strong> — Worth exploring. Choose the weakest criteria and dig a little deeper there.</li>
                <li><strong>61\u201380</strong> — Strong lean-in. Validate demand, then launch a small first version.</li>
                <li><strong>81\u2013100</strong> — Excellent. This is close to a build-and-go niche. Protect your positioning early.</li>
              </ul>
              <p style={{ lineHeight: 1.7, color: 'var(--color-text-muted)', marginTop: '1rem', fontStyle: 'italic' }}>
                Whatever your number, it&rsquo;s a starting point — not a label on you. One idea scoring low simply means you move on to the next.
              </p>
            </div>

            {/* Next steps */}
            <div style={{ textAlign: 'center' }}>
              <a href="/tools/calculator" className="btn btn--primary">Calculate My ROI →</a>
              <button onClick={() => { setResult(null); setScores({}); setInsight(null); }} className="btn btn--ghost" style={{ marginLeft: 'var(--space-sm)' }}>Reassess Niche</button>
              <p style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)', marginTop: 'var(--space-sm)' }}>Scores are based on simplified criteria. Use this as a filter, not a final verdict.</p>
            </div>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <section className="page-hero">
        <div className="container container--narrow">
          <p className="section__eyebrow">Validation Tool</p>
          <h1>Niche Profitability Scorecard</h1>
          <p className="hero__tagline" style={{ fontSize: '1.1rem', maxWidth: '520px', marginInline: 'auto' }}>
            Rate each criterion from 0 to 10. Get an instant profitability assessment before you invest time or money.
          </p>
          <div className="action-row"><a href="#niche-scorecard" className="btn btn--primary">Score My Niche →</a></div>
        </div>
      </section>

      <section className="section">
        <div className="container container--narrow">
          <div className="card" style={{ padding: 'var(--space-lg)', background: '#fff' }}>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '0.75rem' }}>How This Scorecard Works</h2>
            <p style={{ lineHeight: 1.7, color: 'var(--color-text-muted)', marginBottom: '1rem' }}>
              This tool is a quick, honest first look at a business idea — a filter, not a final verdict. It scores six simple
              criteria on a scale of <strong>0 to 10</strong> and combines them into one overall percentage. You don&rsquo;t need
              perfect data or fancy research. Give your best honest rating and you&rsquo;ll get a clear sense of where your niche stands.
            </p>
            <ul style={{ lineHeight: 1.8, color: 'var(--color-text-muted)', paddingLeft: '1.25rem', margin: 0 }}>
              <li><strong>Rate each criterion from 0 to 10</strong> based on your honest gut and what you already know.</li>
              <li><strong>Answer every field</strong> — all six are required before your score unlocks.</li>
              <li><strong>Leave the math to the tool.</strong> You just rate the idea; the weighting is handled for you.</li>
              <li><strong>Your answers stay with you.</strong> Nothing is stored or shared. Privacy first, always.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="section" id="niche-scorecard">
        <div className="container container--narrow">
          <AiMentorChatBox />
          <form onSubmit={handleSubmit} className="card interactive-form-card">
            <div style={{ marginBottom: '1.25rem' }}>
              <label className="form-label">Niche Name (optional)</label>
              <input type="text" value={nicheName} onChange={e => setNicheName(e.target.value)} className="form-input" placeholder="e.g. Emergency Plumbing in Phoenix" />
            </div>

            <div className="scorecard-criteria">
              {CRITERIA.map(criterion => (
                <div key={criterion.key} style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '1rem', alignItems: 'center', padding: '1rem 0', borderBottom: criterion.key !== 'ease_of_entry' ? '1px solid rgba(0,0,0,0.06)' : 'none' }}>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '0.95rem', marginBottom: '0.15rem' }}>{criterion.label}</div>
                    <div style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)' }}>{criterion.description}</div>
                    <div style={{ fontSize: '0.8rem', color: '#7A7A7A', marginTop: '0.35rem', lineHeight: 1.55 }}>{CRITERIA_HELP[criterion.key]}</div>
                  </div>
                  <input type="number" min="0" max="10" value={scores[criterion.key] ?? ''} onChange={e => handleScoreChange(criterion.key, e.target.value)}
                    className="form-input" style={{ width: '5rem', textAlign: 'center', padding: '0.5rem 0.4rem', fontWeight: 800, fontSize: '1.1rem' }} />
                </div>
              ))}
            </div>

            <div style={{ textAlign: 'center', marginTop: 'var(--space-lg)' }}>
              <button type="submit" disabled={!allAnswered} className="btn btn--primary" style={{ opacity: allAnswered ? 1 : 0.5, cursor: allAnswered ? 'pointer' : 'default' }}>Calculate My Score</button>
              <p style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)', marginTop: '0.75rem' }}>Enter a score from 0 to 10 for each item. All fields must be filled to submit.</p>
            </div>
          </form>
        </div>
      </section>

      <section className="section">
        <div className="container container--narrow">
          <p className="section__eyebrow">See It in Action</p>
          <h2 style={{ fontSize: '1.8rem', marginBottom: '0.5rem' }}>Example Niche Scoring Scenarios</h2>
          <p style={{ lineHeight: 1.7, color: 'var(--color-text-muted)', marginBottom: '1.5rem' }}>
            Not sure what an honest score feels like? Here are three made-up examples showing how different ideas land.
          </p>
          <div style={{ display: 'grid', gap: '1.25rem', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))' }}>
            <div className="card" style={{ background: '#fff', padding: '1.25rem' }}>
              <h3 style={{ fontSize: '1.05rem', marginBottom: '0.5rem' }}>Strong: Emergency Plumbing in Phoenix</h3>
              <ul style={{ color: 'var(--color-text-muted)', lineHeight: 1.8, paddingLeft: '1.25rem', margin: '0 0 0.75rem' }}>
                <li>Demand 9 · Competition 7 · Monetization 8</li>
                <li>Sustainability 8 · Ease 6 · Privacy 7</li>
              </ul>
              <p style={{ color: 'var(--color-text-muted)', lineHeight: 1.7, margin: 0 }}>People search daily, revenue paths are clear, and it can run discreetly behind the scenes. A high score and an easy yes.</p>
            </div>
            <div className="card" style={{ background: '#fff', padding: '1.25rem' }}>
              <h3 style={{ fontSize: '1.05rem', marginBottom: '0.5rem' }}>Worth Testing: Local Food Tours</h3>
              <ul style={{ color: 'var(--color-text-muted)', lineHeight: 1.8, paddingLeft: '1.25rem', margin: '0 0 0.75rem' }}>
                <li>Demand 6 · Competition 5 · Monetization 7</li>
                <li>Sustainability 6 · Ease 8 · Privacy 9</li>
              </ul>
              <p style={{ color: 'var(--color-text-muted)', lineHeight: 1.7, margin: 0 }}>Nice demand and easy to run, but local competition is a question mark. Worth a small test before going all in.</p>
            </div>
            <div className="card" style={{ background: '#fff', padding: '1.25rem' }}>
              <h3 style={{ fontSize: '1.05rem', marginBottom: '0.5rem' }}>Needs Research: AI Chatbots for Everyone</h3>
              <ul style={{ color: 'var(--color-text-muted)', lineHeight: 1.8, paddingLeft: '1.25rem', margin: '0 0 0.75rem' }}>
                <li>Demand 8 · Competition 3 · Monetization 4</li>
                <li>Sustainability 5 · Ease 3 · Privacy 8</li>
              </ul>
              <p style={{ color: 'var(--color-text-muted)', lineHeight: 1.7, margin: 0 }}>Plenty of hype, but heavy competition and a muddy money path bring the score down. It needs a much sharper focus.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container container--narrow">
          <div className="card" style={{ background: 'rgba(77, 182, 209, 0.08)', borderLeft: '4px solid var(--color-blue)', padding: '1.5rem' }}>
            <h2 style={{ fontSize: '1.4rem', marginBottom: '0.5rem' }}>You&rsquo;ve Got This — Take a Breath</h2>
            <p style={{ lineHeight: 1.8, color: 'var(--color-text-muted)', margin: 0 }}>
              It&rsquo;s completely normal to feel a little unsure at first. Most people score their first idea either too high
              or too low — that&rsquo;s part of learning. You don&rsquo;t need to perfect everything today. This score isn&rsquo;t a test of
              you; it&rsquo;s a gentle compass for your next step. One idea isn&rsquo;t your whole future. Stay calm, stay private, and
              trust that every score brings you closer to an idea that truly fits <em>you</em>.
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container container--narrow" style={{ textAlign: 'center' }}>
          <p className="section__eyebrow">What&rsquo;s Next</p>
          <h2 style={{ fontSize: '1.8rem', marginBottom: '0.5rem' }}>Next Steps After You Score</h2>
          <p style={{ lineHeight: 1.7, color: 'var(--color-text-muted)', maxWidth: '540px', margin: '0 auto 1.5rem' }}>
            A strong score is a great starting point. Move forward at your own pace with these free companion tools.
          </p>
          <div className="action-row">
            <a href="/tools/calculator" className="btn btn--primary">Calculate My ROI →</a>
            <a href="/quiz" className="btn btn--ghost">Find My Digital Superpower</a>
            <a href="/gap" className="btn btn--ghost">Check My Retirement Gap</a>
            <a href="/freedom" className="btn btn--ghost">Model My Freedom Number</a>
          </div>
          <p style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)', marginTop: '1rem' }}>Everything here stays in your browser. You&rsquo;re never locked in.</p>
        </div>
      </section>
    </>
  );
}
