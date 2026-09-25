import React, { useState, useEffect } from 'react';
import { scoreNiche, tierCopy, CRITERIA } from './ScorecardLogic';
import { callAgent } from '../../lib/buzz-agents';
import { useToolState } from '../../context/ToolStateContext.jsx';
import AiMentorChatBox from '../../components/AiMentorChatBox';
import FadeInSection from '../../components/FadeInSection';
import { theme, brutalCard, brutalHeading } from '../../config/theme';
import DDCTA from '../../components/ui/DDCTA';

const CRITERIA_HELP = {
  demand: 'A 7–10 usually means people already search for this. 1–3 means you’ll need to build awareness from scratch.',
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
  const [agentStatus, setAgentStatus] = useState('idle');

  useEffect(() => {
    updateToolState({ analyzed: false });
    return () => updateToolState({ analyzed: false });
  }, [updateToolState]);

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
    setAgentStatus('idle');

    const criterionScores = CRITERIA.map((c) => ({ key: c.key, label: c.label, value: Number(scores[c.key] || 0) }));
    const strength = [...criterionScores].sort((a, b) => b.value - a.value)[0]?.label || null;
    const weakness = [...criterionScores].sort((a, b) => a.value - b.value)[0]?.label || null;

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
      const response = await callAgent('scorecard', { nicheName: nicheName || 'Unnamed niche', scores, result: scored, criteria: CRITERIA });
      setInsight(response.data || response);
      setAgentStatus('ready');
    } catch {
      setInsight(null);
      setAgentStatus('error');
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
        <FadeInSection>
          <section className="page-hero">
            <div style={{ maxWidth: 720, margin: '0 auto', textAlign: 'center' }}>
              <p className="section__eyebrow">Results</p>
              <h1 style={{ ...brutalHeading, fontSize: 'clamp(1.6rem, 3.2vw, 2.4rem)', marginBottom: '1rem' }}>Niche Score for &ldquo;{nicheName || 'your niche'}&rdquo;</h1>
              <div className="action-row"><DDCTA label="Review My Score →" href="#score-results" variant="primary" /></div>
            </div>
          </section>
        </FadeInSection>

        <FadeInSection delay={100}>
          <section className="section" id="score-results">
            <div style={{ maxWidth: 900, margin: '0 auto' }}>
              <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '6rem', height: '6rem', borderRadius: 0, fontFamily: "'Inter', sans-serif", fontWeight: 900, fontSize: '2.2rem', color: '#fff', background: tierColor(result.tier), border: '2px solid #111111' }}>
                  {Math.round(result.pct * 100)}%
                </div>
                <div style={{ marginTop: '1rem', ...brutalHeading, fontSize: '1.5rem', textTransform: 'uppercase' }}>{copy.title}</div>
                <p style={{ maxWidth: 480, marginInline: 'auto', color: 'var(--color-text-muted)', lineHeight: 1.7 }}>{copy.body}</p>
              </div>

              <div style={{ ...brutalCard, padding: '1.25rem', marginBottom: '1.25rem' }}>
                <p className="section__eyebrow">AI-Assisted Interpretation</p>
                <h2 style={{ ...brutalHeading, fontSize: '1.3rem', marginBottom: '1rem' }}>{insightLoading ? 'Interpreting your score...' : insight?.summary || 'Use the score as a filter, then validate the market.'}</h2>
                {insight && (
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem' }}>
                    <div style={{ ...brutalCard, padding: '1rem', background: '#FFFCF9' }}>
                      <h3 style={{ ...brutalHeading, fontSize: '1rem', marginBottom: '0.5rem' }}>Strongest signals</h3>
                      {insight.strongestSignals?.map(item => <p key={item} style={{ margin: '0.25rem 0' }}>+ {item}</p>)}
                      <h3 style={{ ...brutalHeading, fontSize: '1rem', margin: '1rem 0 0.5rem' }}>Monetization paths</h3>
                      {insight.monetizationPaths?.map(item => <p key={item} style={{ margin: '0.25rem 0' }}>+ {item}</p>)}
                    </div>
                    <div style={{ ...brutalCard, padding: '1rem', background: '#FFFCF9' }}>
                      <h3 style={{ ...brutalHeading, fontSize: '1rem', marginBottom: '0.5rem' }}>Risk flags</h3>
                      {insight.riskFlags?.map(item => <p key={item} style={{ margin: '0.25rem 0' }}>! {item}</p>)}
                      <h3 style={{ ...brutalHeading, fontSize: '1rem', margin: '1rem 0 0.5rem' }}>Validation experiments</h3>
                      {insight.validationExperiments?.map(item => <p key={item} style={{ margin: '0.25rem 0' }}>→ {item}</p>)}
                    </div>
                  </div>
                )}
                {insight?.nextAction && <div style={{ ...brutalCard, padding: '1rem', marginTop: '1rem', borderLeft: '4px solid #F18B25' }}><strong>Next action</strong><span style={{ marginLeft: '0.5rem' }}>{insight.nextAction}</span></div>}
                <div style={{ marginTop: '1rem', display: 'flex', gap: '0.75rem', flexWrap: 'wrap', alignItems: 'center' }}>
                  <button type="button" className="btn btn--outline dd-button dd-button--outline" disabled={agentStatus === 'loading'} onClick={async () => { setAgentStatus('loading'); try { const r = await callAgent('scorecard', { nicheName, scores, result: scored, criteria: CRITERIA }); setInsight(r.data || r); setAgentStatus('ready'); } catch { setAgentStatus('error'); } }}>
                    {agentStatus === 'loading' ? 'Refreshing agent insight…' : 'Refresh agent insight'}
                  </button>
                  {agentStatus === 'ready' && <span style={{ color: '#16A34A', fontWeight: 700 }}>Agent insight ready</span>}
                  {agentStatus === 'error' && <span style={{ color: '#8B1A0A', fontWeight: 700 }}>Agent temporarily unavailable</span>}
                </div>
              </div>

              <div style={{ ...brutalCard, padding: '1.25rem', marginBottom: '1.25rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '1rem', alignItems: 'center', padding: '0.9rem 0', borderBottom: '1px solid rgba(0,0,0,0.08)', ...brutalHeading, fontSize: '0.78rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--color-text-muted)' }}>
                  <span>Criterion</span><span>Score</span>
                </div>
                {CRITERIA.map(c => (
                  <div key={c.key} style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '1rem', alignItems: 'center', padding: '0.85rem 0', borderBottom: c.key !== 'demand_market' ? '1px solid rgba(0,0,0,0.04)' : 'none' }}>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: '0.95rem' }}>{c.label}</div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>{c.description}</div>
                    </div>
                    <div style={{ fontWeight: 800, fontSize: '1.2rem', color: 'var(--color-text)' }}>{scores[c.key]} / 10</div>
                  </div>
                ))}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '1rem', alignItems: 'center', padding: '0.85rem 0', marginTop: '0.5rem', borderTop: '2px solid rgba(0,0,0,0.08)', ...brutalHeading, fontSize: '1rem' }}>
                  <span>Total: {result.total}/{result.maxPossible} raw points ({Math.round(result.pct * 100)}%)</span>
                  <span style={{ color: tierColor(result.tier) }}>{copy.title}</span>
                </div>
              </div>

              <div style={{ ...brutalCard, padding: '1.25rem', marginBottom: '1.25rem' }}>
                <p className="section__eyebrow">What Your Score Means</p>
                <h2 style={{ ...brutalHeading, fontSize: '1.3rem', marginBottom: '0.75rem' }}>A quick way to read your result</h2>
                <p style={{ color: 'var(--color-text-muted)', lineHeight: 1.7, marginBottom: '1rem' }}>Your score is a percentage out of 100. Here&rsquo;s how to think about it before you choose your next step:</p>
                <ul style={{ color: 'var(--color-text-muted)', lineHeight: 1.9, paddingLeft: '1.25rem', margin: 0 }}>
                  <li><strong>0–20</strong> — Low signal. The idea likely needs more market proof before it&rsquo;s worth your time.</li>
                  <li><strong>21–40</strong> — Mixed at best. Look closely at competition and monetization before building.</li>
                  <li><strong>41–60</strong> — Worth exploring. Choose the weakest criteria and dig a little deeper there.</li>
                  <li><strong>61–80</strong> — Strong lean-in. Validate demand, then launch a small first version.</li>
                  <li><strong>81–100</strong> — Excellent. This is close to a build-and-go niche. Protect your positioning early.</li>
                </ul>
                <p style={{ color: 'var(--color-text-muted)', lineHeight: 1.7, marginTop: '1rem', fontStyle: 'italic' }}>Whatever your number, it&rsquo;s a starting point — not a label on you. One idea scoring low simply means you move on to the next.</p>
              </div>

              <div style={{ textAlign: 'center' }}>
                <div className="action-row" style={{ justifyContent: 'center' }}>
                      <DDCTA label="Calculate My ROI →" href="/tools/calculator" variant="primary" />
                      <button onClick={() => { setResult(null); setScores({}); setInsight(null); }} className="btn btn--outline">Reassess Niche</button>
                </div>
                <p style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)', marginTop: '1rem' }}>Scores are based on simplified criteria. Use this as a filter, not a final verdict.</p>
              </div>
            </div>
          </section>
        </FadeInSection>
      </>
    );
  }

  return (
    <>
      <FadeInSection>
        <section className="page-hero">
          <div style={{ maxWidth: 720, margin: '0 auto', textAlign: 'center' }}>
            <p className="section__eyebrow">Validation Tool</p>
            <h1 style={{ ...brutalHeading, fontSize: 'clamp(1.6rem, 3.2vw, 2.4rem)', marginBottom: '1rem' }}>Niche Profitability Scorecard</h1>
            <p className="hero__tagline">Rate each criterion from 0 to 10. Get an instant profitability assessment before you invest time or money.</p>
            <div className="action-row"><a href="#niche-scorecard" className="btn btn--primary dd-button dd-button--primary">Score My Niche →</a></div>
          </div>
        </section>
      </FadeInSection>

      <FadeInSection delay={100}>
        <section className="section">
          <div style={{ maxWidth: 900, margin: '0 auto' }}>
            <div style={{ ...brutalCard, padding: '1.25rem', marginBottom: '1.25rem' }}>
              <h2 style={{ ...brutalHeading, fontSize: '1.3rem', marginBottom: '0.75rem' }}>How This Scorecard Works</h2>
              <p style={{ color: 'var(--color-text-muted)', lineHeight: 1.7, marginBottom: '1rem' }}>This tool is a quick, honest first look at a business idea — a filter, not a final verdict. It scores six simple criteria on a scale of 0 to 10 and combines them into one overall percentage.</p>
              <ul style={{ color: 'var(--color-text-muted)', lineHeight: 1.8, paddingLeft: '1.25rem', margin: 0 }}>
                <li><strong>Rate each criterion from 0 to 10</strong> based on your honest gut and what you already know.</li>
                <li><strong>Answer every field</strong> — all six are required before your score unlocks.</li>
                <li><strong>Leave the math to the tool.</strong> You just rate the idea; the weighting is handled for you.</li>
                <li><strong>Your answers stay with you.</strong> Nothing is stored or shared. Privacy first, always.</li>
              </ul>
            </div>
          </div>
        </section>
      </FadeInSection>

      <FadeInSection delay={120}>
        <section className="section" id="niche-scorecard">
          <div style={{ maxWidth: 900, margin: '0 auto' }}>
            <AiMentorChatBox />
            <form onSubmit={handleSubmit} style={{ ...brutalCard, padding: '1.25rem', marginTop: '1.25rem' }}>
              <div style={{ marginBottom: '1.25rem' }}>
                <label className="form-label">Niche Name (optional)</label>
                <input type="text" value={nicheName} onChange={e => setNicheName(e.target.value)} className="form-input dd-input" placeholder="e.g. Emergency Plumbing in Phoenix" />
              </div>

              <div style={{ display: 'grid', gap: '0.75rem' }}>
                {CRITERIA.map(criterion => (
                  <div key={criterion.key} style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '1rem', alignItems: 'center', padding: '1rem 0', borderBottom: criterion.key !== 'ease_of_entry' ? '1px solid rgba(0,0,0,0.06)' : 'none' }}>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: '0.95rem', marginBottom: '0.15rem' }}>{criterion.label}</div>
                      <div style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)' }}>{criterion.description}</div>
                      <div style={{ fontSize: '0.8rem', color: '#7A7A7A', marginTop: '0.35rem', lineHeight: 1.55 }}>{CRITERIA_HELP[criterion.key]}</div>
                    </div>
                    <input type="number" min="0" max="10" value={scores[criterion.key] ?? ''} onChange={e => handleScoreChange(criterion.key, e.target.value)} className="form-input dd-input" style={{ width: '5rem', textAlign: 'center', padding: '0.5rem 0.4rem', fontWeight: 800, fontSize: '1.1rem' }} />
                  </div>
                ))}
              </div>

              <div style={{ textAlign: 'center', marginTop: '2rem' }}>
                <button type="submit" disabled={!allAnswered} className="btn btn--primary" style={{ opacity: allAnswered ? 1 : 0.5, cursor: allAnswered ? 'pointer' : 'default' }}>Calculate My Score</button>
                <p style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)', marginTop: '0.75rem' }}>Enter a score from 0 to 10 for each item. All fields must be filled to submit.</p>
              </div>
            </form>
          </div>
        </section>
      </FadeInSection>

      <FadeInSection delay={140}>
        <section className="section">
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
              <p className="section__eyebrow">See It in Action</p>
              <h2 style={{ ...brutalHeading, fontSize: 'clamp(1.3rem, 2.6vw, 1.7rem)', marginBottom: '0.5rem' }}>Example Niche Scoring Scenarios</h2>
              <p style={{ color: 'var(--color-text-muted)', lineHeight: 1.7, maxWidth: 720, margin: '0 auto' }}>Not sure what an honest score feels like? Here are three examples showing how different ideas land.</p>
            </div>
            <div style={{ display: 'grid', gap: '1.25rem', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))' }}>
              {[
                { title: 'Strong: Emergency Plumbing in Phoenix', copy: 'Demand 9 · Competition 7 · Monetization 8. People search daily, revenue paths are clear, and it can run discreetly behind the scenes.', tone: 'var(--color-success)' },
                { title: 'Worth Testing: Local Food Tours', copy: 'Demand 6 · Competition 5 · Monetization 7. Nice demand and easy to run, but local competition is a question mark.', tone: '#f18b25' },
                { title: 'Needs Research: AI Chatbots for Everyone', copy: 'Demand 8 · Competition 3 · Monetization 4. Plenty of hype, but heavy competition and a muddy money path bring the score down.', tone: 'var(--color-red)' },
              ].map((item) => (
                <div key={item.title} style={{ ...brutalCard, padding: '1.25rem', borderLeft: `4px solid ${item.tone}` }}>
                  <h3 style={{ ...brutalHeading, fontSize: '1.05rem', marginBottom: '0.5rem' }}>{item.title}</h3>
                  <p style={{ color: 'var(--color-text-muted)', lineHeight: 1.7, margin: 0 }}>{item.copy}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </FadeInSection>

      <FadeInSection delay={160}>
        <section className="section">
          <div style={{ maxWidth: 900, margin: '0 auto', ...brutalCard, padding: '1.5rem', background: 'rgba(77, 182, 209, 0.08)', borderLeft: '4px solid #47B7D4' }}>
            <h2 style={{ ...brutalHeading, fontSize: 'clamp(1.2rem, 2.4vw, 1.5rem)', marginBottom: '0.75rem' }}>You&rsquo;ve Got This — Take a Breath</h2>
            <p style={{ color: 'var(--color-text-muted)', lineHeight: 1.8, margin: 0 }}>It&rsquo;s completely normal to feel a little unsure at first. Most people score their first idea either too high or too low — that&rsquo;s part of learning. You don&rsquo;t need to perfect everything today. This score isn&rsquo;t a test of you; it&rsquo;s a gentle compass for your next step.</p>
          </div>
        </section>
      </FadeInSection>

      <FadeInSection delay={180}>
        <section className="section">
          <div style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center' }}>
            <p className="section__eyebrow">What&rsquo;s Next</p>
            <h2 style={{ ...brutalHeading, fontSize: 'clamp(1.3rem, 2.6vw, 1.7rem)', marginBottom: '0.5rem' }}>Next Steps After You Score</h2>
            <p style={{ color: 'var(--color-text-muted)', lineHeight: 1.7, maxWidth: 720, margin: '0 auto 1.5rem' }}>A strong score is a great starting point. Move forward at your own pace with these free companion tools.</p>
              <div className="action-row" style={{ justifyContent: 'center', flexWrap: 'wrap' }}>
              <DDCTA label="Calculate My ROI →" href="/tools/calculator" variant="primary" />
              <DDCTA label="Find My Digital Superpower" href="/quiz" variant="outline" />
              <DDCTA label="Check My Retirement Gap" href="/gap" variant="outline" />
              <DDCTA label="Model My Freedom Number" href="/freedom" variant="outline" />
            </div>
            <p style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)', marginTop: '1rem' }}>Everything here stays in your browser. You&rsquo;re never locked in.</p>
          </div>
        </section>
      </FadeInSection>
    </>
  );
}
