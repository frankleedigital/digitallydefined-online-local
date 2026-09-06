import React, { useState, useEffect } from 'react';
import { ShieldCheck, FlaskConical, AlertTriangle, Mail, Check, Lock, Unlock } from 'lucide-react';
import { scoreNiche, tierCopy, CRITERIA } from './ScorecardLogic';
import { callAgent } from '../../lib/buzz-agents';
import { callSupabaseEdge } from '../../lib/supabase-edge';
import { useToolState } from '../../context/ToolStateContext.jsx';
import AiMentorChatBox from '../../components/AiMentorChatBox';

// Funnel lead sources — stored in website_leads AND synced to the Brevo list.
const FUNNEL_SOURCE = 'niche-scorecard';
const FUNNEL_TAGS = ['niche-scorecard', 'ai-insight'];
const FOOTER_SOURCE = 'niche-scorecard-footer';
const FOOTER_TAGS = ['niche-scorecard', 'footer-signup'];

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

  // Funnel: email unlocks the AI interpretation (Brevo-backed via `subscribe`).
  const [insightUnlocked, setInsightUnlocked] = useState(false);
  const [lead, setLead] = useState({ email: '', status: 'idle' });
  const [footerOptin, setFooterOptin] = useState({ email: '', status: 'idle' });

  const captureLead = async (email, source, tags, setStatus) => {
    const value = String(email || '').trim();
    if (!value) {
      setStatus('error');
      return false;
    }
    setStatus('submitting');
    try {
      await callSupabaseEdge('subscribe', { name: '', email: value, source, tags });
      setStatus('success');
      return true;
    } catch {
      setStatus('error');
      return false;
    }
  };

  const handleGateSubmit = async (e) => {
    e.preventDefault();
    const ok = await captureLead(
      lead.email,
      FUNNEL_SOURCE,
      FUNNEL_TAGS,
      (status) => setLead((s) => ({ ...s, status })),
    );
    if (ok) setInsightUnlocked(true);
  };

  const handleFooterSubmit = async (e) => {
    e.preventDefault();
    await captureLead(
      footerOptin.email,
      FOOTER_SOURCE,
      FOOTER_TAGS,
      (status) => setFooterOptin((s) => ({ ...s, status })),
    );
  };

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
  const tierColor = (tier) => tier === 'A' ? 'var(--color-blue)' : tier === 'B' ? 'var(--color-blue)' : tier === 'C' ? 'var(--color-accent)' : 'var(--color-red)';

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
              <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '6rem', height: '6rem', borderRadius: 0, fontFamily: "'Inter', sans-serif", fontWeight: 900, fontSize: '2.2rem', color: 'var(--color-surface)', background: tierColor(result.tier), border: '1px solid var(--color-border)' }}>
                {Math.round(result.pct * 100)}%
              </div>
              <div style={{ marginTop: 'var(--space-sm)', fontFamily: "'Inter', sans-serif", fontWeight: 800, fontSize: '1.5rem', textTransform: 'uppercase' }}>{copy.title}</div>
              <p style={{ maxWidth: '480px', marginInline: 'auto', fontSize: '1.05rem', lineHeight: 1.7, color: 'var(--color-text-muted)' }}>{copy.body}</p>
            </div>

            <div className="card" style={{ marginBottom: 'var(--space-lg)', background: 'var(--color-surface)' }}>
              <p className="section__eyebrow">AI-Assisted Interpretation</p>
              <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>
                {insightLoading ? 'Interpreting your score...' : insight?.summary || 'Use the score as a filter, then validate the market.'}
              </h2>

              {/* Funnel gate: email unlocks the full AI interpretation */}
              {insight && !insightUnlocked && (
                <div className="funnel-gate" style={{ borderTop: '1px solid rgba(0,0,0,0.08)', paddingTop: '1.25rem', marginTop: '1rem' }}>
                  <div className="ns-blur-lock" aria-hidden="true">
                    <div className="grid-2">
                      <div>
                        <h3 style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>Strongest signals</h3>
                        {insight.strongestSignals?.slice(0, 2).map(item => <p key={item}>+ {item}</p>)}
                        <h3 style={{ fontSize: '1rem', margin: '1rem 0 0.5rem' }}>Monetization paths</h3>
                        {insight.monetizationPaths?.slice(0, 1).map(item => <p key={item}>+ {item}</p>)}
                      </div>
                      <div>
                        <h3 style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>Risk flags</h3>
                        {insight.riskFlags?.slice(0, 2).map(item => <p key={item}>! {item}</p>)}
                      </div>
                    </div>
                  </div>

                  <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 800, fontSize: '1.1rem', margin: '1.25rem 0 0.35rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Lock size={18} aria-hidden="true" /> Unlock the full interpretation — free
                  </p>
                  <p style={{ fontSize: '0.95rem', lineHeight: 1.6, color: 'var(--color-text-muted)', margin: '0 0 1rem' }}>
                    Enter your email and get the complete read: all signals, monetization paths,
                    risk flags, validation experiments, and your exact next action.
                  </p>

                  <form className="ns-gate-form" onSubmit={handleGateSubmit}>
                    <input
                      className="ns-gate-input"
                      type="email"
                      required
                      value={lead.email}
                      onChange={(e) => setLead((s) => ({ ...s, email: e.target.value, status: 'idle' }))}
                      placeholder="you@example.com"
                      aria-label="Email address to unlock the AI interpretation"
                      disabled={lead.status === 'submitting' || lead.status === 'success'}
                    />
                    <button
                      type="submit"
                      className="btn btn--primary"
                      disabled={lead.status === 'submitting' || lead.status === 'success'}
                    >
                      {lead.status === 'submitting' ? 'Sending…' : lead.status === 'success' ? (
                        <><Check size={16} /> Unlocked</>
                      ) : (
                        <><Mail size={16} /> Send it to me</>
                      )}
                    </button>
                  </form>
                  {lead.status === 'success' && (
                    <p className="ns-gate-note ns-gate-note--success" role="status">
                      Unlocked — the full interpretation is below.
                    </p>
                  )}
                  {lead.status === 'error' && (
                    <p className="ns-gate-note ns-gate-note--error" role="alert">
                      That didn’t go through. Check the address and try again.
                    </p>
                  )}
                  <p className="ns-gate-note" style={{ color: 'var(--color-text-muted)' }}>No spam, ever. Unsubscribe anytime.</p>

                  <button
                    type="button"
                    className="ns-gate__reveal"
                    onClick={() => setInsightUnlocked(true)}
                  >
                    <Unlock size={15} style={{ marginRight: '0.5rem' }} aria-hidden="true" />
                    Already subscribed? Reveal the interpretation
                  </button>
                </div>
              )}

              {insight && insightUnlocked && (
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
              {insight?.nextAction && insightUnlocked && <div className="truth-bar"><strong>Next action</strong><span>{insight.nextAction}</span></div>}
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
            <div className="card" style={{ marginBottom: 'var(--space-lg)', background: 'var(--color-surface)' }}>
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
          <div className="card" style={{ padding: 'var(--space-lg)', background: 'var(--color-surface)' }}>
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
                <div key={criterion.key} style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '1rem', alignItems: 'center', padding: '1rem 0', borderBottom: criterion.key !== 'ease_of_entry' ? '1px solid var(--color-border)' : 'none' }}>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '0.95rem', marginBottom: '0.15rem' }}>{criterion.label}</div>
                    <div style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)' }}>{criterion.description}</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginTop: '0.35rem', lineHeight: 1.55 }}>{CRITERIA_HELP[criterion.key]}</div>
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

      <section className="section scorecard-scenarios-section">
        <div className="container container--narrow">
          <p className="section__eyebrow">See It in Action</p>
          <h2 className="scorecard-scenarios__heading">Example Niche Scoring Scenarios</h2>
          <p style={{ lineHeight: 1.7, color: 'var(--color-text-muted)', marginBottom: '1.5rem' }}>
            Not sure what an honest score feels like? Here are three made-up examples showing how different ideas land.
          </p>
          <div className="scorecard-scenarios">
            <article className="scenario-card">
              <span className="icon-chip" aria-hidden="true"><ShieldCheck size={22} strokeWidth={1.5} /></span>
              <h3>Strong: Emergency Plumbing in Phoenix</h3>
              <ul>
                <li>Demand 9 · Competition 7 · Monetization 8</li>
                <li>Sustainability 8 · Ease 6 · Privacy 7</li>
              </ul>
              <p style={{ color: 'var(--color-text-muted)', lineHeight: 1.7, margin: 0 }}>People search daily, revenue paths are clear, and it can run discreetly behind the scenes. A high score and an easy yes.</p>
            </article>
            <article className="scenario-card scenario-card--test">
              <span className="icon-chip" aria-hidden="true"><FlaskConical size={22} strokeWidth={1.5} /></span>
              <h3>Worth Testing: Local Food Tours</h3>
              <ul>
                <li>Demand 6 · Competition 5 · Monetization 7</li>
                <li>Sustainability 6 · Ease 8 · Privacy 9</li>
              </ul>
              <p style={{ color: 'var(--color-text-muted)', lineHeight: 1.7, margin: 0 }}>Nice demand and easy to run, but local competition is a question mark. Worth a small test before going all in.</p>
            </article>
            <article className="scenario-card scenario-card--risk">
              <span className="icon-chip" aria-hidden="true"><AlertTriangle size={22} strokeWidth={1.5} /></span>
              <h3>Needs Research: AI Chatbots for Everyone</h3>
              <ul>
                <li>Demand 8 · Competition 3 · Monetization 4</li>
                <li>Sustainability 5 · Ease 3 · Privacy 8</li>
              </ul>
              <p style={{ color: 'var(--color-text-muted)', lineHeight: 1.7, margin: 0 }}>Plenty of hype, but heavy competition and a muddy money path bring the score down. It needs a much sharper focus.</p>
            </article>
          </div>
          <div className="scenarios-cta-row">
            <a href="/quiz?start=true" className="btn btn--primary">Find Your Superpower →</a>
            <a href="/tools" className="btn btn--aqua">Browse the Free Tools →</a>
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

      {/* ——— FOOTER SIGNUP (funnel capture) ——— */}
      <section className="ns-signup" style={{ background: '#111111', borderTop: '1px solid #111' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: 'clamp(3rem,6vw,4rem) 24px' }}>
          <p className="section__eyebrow" style={{ color: 'var(--color-accent)' }}>Stay in the loop</p>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, letterSpacing: '-0.03em', fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)', color: '#ffffff', margin: '0.5rem 0 1rem' }}>
            New tools land here first.
          </h2>
          <p style={{ fontSize: '1.1rem', lineHeight: 1.6, color: 'rgba(255,255,255,0.72)', maxWidth: 560, margin: '0 0 1.5rem' }}>
            One short email when a new tool goes live. No hype, no daily noise — unsubscribe anytime.
          </p>

          {footerOptin.status === 'success' ? (
            <p className="ns-gate-note ns-gate-note--success" role="status" style={{ color: '#ffffff' }}>
              <Check size={16} style={{ marginRight: '0.5rem' }} aria-hidden="true" />
              You&rsquo;re on the list. Watch your inbox for the next tool.
            </p>
          ) : (
            <form className="ns-gate-form" onSubmit={handleFooterSubmit}>
              <input
                className="ns-gate-input"
                type="email"
                required
                value={footerOptin.email}
                onChange={(e) => setFooterOptin((s) => ({ ...s, email: e.target.value, status: 'idle' }))}
                placeholder="you@example.com"
                aria-label="Email address for new tool announcements"
                disabled={footerOptin.status === 'submitting'}
              />
              <button type="submit" className="btn btn--primary" disabled={footerOptin.status === 'submitting'}>
                {footerOptin.status === 'submitting' ? 'Adding you…' : 'Notify me'}
              </button>
            </form>
          )}
          {footerOptin.status === 'error' && (
            <p className="ns-gate-note ns-gate-note--error" role="alert" style={{ color: '#ffb4a6' }}>
              That didn&rsquo;t go through. Check the address and try again.
            </p>
          )}
        </div>
      </section>
    </>
  );
}
