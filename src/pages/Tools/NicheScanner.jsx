import React, { useState } from 'react';
import { Search, ArrowRight, Lock, Unlock, Check, Zap, Download, Layers, Map, Mail } from 'lucide-react';
import { callAgent } from '../../lib/buzz-agents';
import { callSupabaseEdge } from '../../lib/supabase-edge';
import { theme, brutalBorder, brutalCard, brutalButtonPrimary, brutalEyebrow } from '../../config/theme';

/**
 * ============================================================
 * Niche Scanner — DigitallyDefined standalone micro-product
 * ============================================================
 * Free → paid pattern (proven by the ROI Calculator):
 *   • Free scan returns a quick verdict (demand, competition,
 *     keywords, one-line recommendation).
 *   • The Full Report (monetization, content angles, build
 *     order, next action) is gated behind a Gumroad purchase.
 *
 * 1. Real scan: calls the existing `agent.niche` edge function.
 * 2. Enrichment is deterministic (no extra AI cost).
 * 3. Full report is unlocked by the buyer on return from Gumroad.
 *
 * To go live: set GUMROAD_PRODUCT_URL to your Niche Scanner
 * Gumroad product link below.
 * ============================================================
 */

// ── CONFIGURATION ─────────────────────────────────────────────
// Set to the direct Gumroad checkout URL for the Niche Scanner
// Full Report product. Until you create it, the button stays
// visually live and points to your Gumroad (see GUMROAD_HOME).
const GUMROAD_PRODUCT_URL = ''; // e.g. 'https://frankleedigital.gumroad.com/l/niche-scanner'
const GUMROAD_HOME = 'https://gumroad.com';
// DEV only — set true to visually preview the unlocked Full Report
// in staging without going through the email funnel. Leave false in
// production so the funnel (scan → email → report) actually runs.
const PREVIEW_FULL_REPORT = false;

// Funnel lead sources — these land in website_leads AND the Brevo list.
const FUNNEL_SOURCE = 'niche-scanner';
const FUNNEL_TAGS = ['niche-scanner', 'full-report'];
const FOOTER_SOURCE = 'niche-scanner-footer';
const FOOTER_TAGS = ['niche-scanner', 'footer-signup'];

// Map the agent's High / Medium / Low strings to score + tone.
const LEVEL = {
  High: { score: 8, color: theme.colors.orange, label: 'High' },
  Medium: { score: 6, color: theme.colors.aqua, label: 'Medium' },
  Low: { score: 3, color: theme.colors.textMuted, label: 'Low' },
  high: { score: 8, color: theme.colors.orange, label: 'High' },
  medium: { score: 6, color: theme.colors.aqua, label: 'Medium' },
  low: { score: 3, color: theme.colors.textMuted, label: 'Low' },
};

const tierFor = (demand, competition) => {
  const d = LEVEL[demand]?.score ?? 5;
  const c = LEVEL[competition]?.score ?? 5;
  // Demand weighted higher; low competition is the premium outcome.
  const total = d * 0.62 + (10 - c) * 0.38;
  if (total >= 7.4) return { grade: 'A', label: 'Strong Opportunity', tone: theme.colors.orange };
  if (total >= 5.8) return { grade: 'B', label: 'Worth Testing', tone: theme.colors.aqua };
  if (total >= 4.2) return { grade: 'C', label: 'Needs Research', tone: theme.colors.textMuted };
  return { grade: 'D', label: 'High Risk / Low Signal', tone: theme.colors.red };
};

const MONETIZATION = [
  'Local-intent lead asset → sell the site or lease traffic to operators',
  'Niche digital product: template, guide, or checklist gated behind email',
  'Affiliate / sponsor support once the niche ranks for buying-intent queries',
];

const CONTENT_ANGLES = (niche) => ([
  `The no-hype starter guide for "${niche}" (list-style pillar page)`,
  `"${niche}" a 90-minute mini-system: one page, one lead magnet, one email`,
  `A comparison / decision post that answers the exact "is it worth it" query`,
]);

const BUILD_ORDER = [
  'Own one pillar page with a single lead magnet',
  'Gate it behind an email capture, reward with the magnet',
  'Add a follow-up sequence (Brevo) to turn leads into buyers',
  'Validate with the Niche Scorecard, then scale to 2–3 assets',
];

function scanSteps() {
  return [
    'Scoping demand across the niche…',
    'Weighing competition and whitespace…',
    'Clustering high-intent keywords…',
    'Drafting the recommendation…',
  ];
}

export default function NicheScanner() {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState(null);
  const [tier, setTier] = useState(null);
  const [scanning, setScanning] = useState(false);
  const [step, setStep] = useState(0);
  const [error, setError] = useState(null);
  const [unlocked, setUnlocked] = useState(PREVIEW_FULL_REPORT);

  // Funnel lead capture (Brevo-backed via the public `subscribe` action).
  const [lead, setLead] = useState({ email: '', status: 'idle' });
  const [footerOptin, setFooterOptin] = useState({ email: '', status: 'idle' });

  /**
   * captureLead — posts the signup to the `subscribe` edge action.
   * The backend saves the lead to website_leads and syncs the contact
   * to the Brevo list (BREVO_API_KEY lives server-side only).
   * Returns true when the lead was captured.
   */
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

  // Funnel step 2: email → unlock the Full Report.
  const handleGateSubmit = async (e) => {
    e.preventDefault();
    const ok = await captureLead(
      lead.email,
      FUNNEL_SOURCE,
      FUNNEL_TAGS,
      (status) => setLead((s) => ({ ...s, status })),
    );
    if (ok) setUnlocked(true);
  };

  // Footer opt-in: next-tool announcements.
  const handleFooterSubmit = async (e) => {
    e.preventDefault();
    await captureLead(
      footerOptin.email,
      FOOTER_SOURCE,
      FOOTER_TAGS,
      (status) => setFooterOptin((s) => ({ ...s, status })),
    );
  };

  const scan = async (e) => {
    if (e) e.preventDefault();
    const q = query.trim();
    if (!q || scanning) return;

    setScanning(true);
    setError(null);
    setResult(null);
    setTier(null);
    setStep(0);

    // Play the scan steps while the real agent call resolves.
    for (let i = 1; i <= scanSteps().length; i++) {
      setStep(i);
      await new Promise((r) => setTimeout(r, 420));
    }

    try {
      const res = await callAgent('niche', { query: q });
      if (res && res.success && res.data) {
        const d = res.data;
        setResult(d);
        setTier(tierFor(d.demand, d.competition));
      } else {
        throw new Error('No analysis returned');
      }
    } catch (err) {
      setError('Failed to analyze that niche. Please try again.');
    } finally {
      setScanning(false);
    }
  };

  const buyUrl = GUMROAD_PRODUCT_URL || GUMROAD_HOME;
  const t = theme;
  const grade = tier?.grade || '—';

  return (
    <div className="ns-root">
      {/* ——— HERO ——— */}
      <section className="ns-hero">
        <div className="ns-hero__inner" style={{ maxWidth: 1100, margin: '0 auto', padding: 'clamp(3rem,7vw,4.5rem) 24px' }}>
          <p className="ns-eyebrow ns-eyebrow--orange">AI-Assisted Niche Scanner</p>
          <h1 className="ns-h1">
            Scan a niche.<br />
            <span className="ns-h1__accent">Own the whitespace.</span>
          </h1>
          <p className="ns-tagline">
            Type any idea. Get a demand + competition + keyword read in seconds —
            then a Full Report that tells you which niche is worth building.
          </p>

          {/* Scanner input */}
          <form className="ns-scan-form" onSubmit={scan} aria-label="Scan a niche">
            <input
              className="ns-scan-input"
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="e.g., retirement planning for Gen X women"
              aria-label="Niche or topic to scan"
              disabled={scanning}
            />
            <button type="submit" className="ns-scan-btn" disabled={scanning}>
              <span className="ns-btn-bullet" aria-hidden="true"><Search size={18} /></span>
              {scanning ? 'Scanning…' : 'Scan Niche'}
            </button>
          </form>
          <p className="ns-privacy">No login required. Your idea stays in your browser.</p>
        </div>
      </section>

      {/* ——— SCANNING STATE ——— */}
      {scanning && (
        <section className="ns-section" style={{ background: t.colors.background }}>
          <div className="ns-scanning" style={{ maxWidth: 720, margin: '0 auto', padding: 'clamp(2rem,5vw,3.5rem) 24px' }}>
            <p className="ns-eyebrow">Scanning</p>
            <h2 className="ns-section-h2" style={{ color: t.colors.textPrimary }}>Reading the signal…</h2>
            <ol className="ns-step-list">
              {scanSteps().map((label, i) => (
                <li key={i} className={`ns-step ${i < step ? 'ns-step--done' : i === step && step < scanSteps().length ? 'ns-step--active' : ''}`}>
                  <span className="ns-step__mark">
                    {i < step ? <Check size={14} /> : String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="ns-step__label">{label}</span>
                </li>
              ))}
            </ol>
          </div>
        </section>
      )}

      {/* ——— RESULT — FREE PREVIEW ——— */}
      {result && (
        <section className="ns-section" style={{ background: t.colors.background }}>
          <div className="ns-result" style={{ maxWidth: 1100, margin: '0 auto', padding: 'clamp(2rem,5vw,3.5rem) 24px' }}>
            {/* Report sheet */}
            <div className="ns-sheet" style={brutalCard}>
              {/* Report header */}
              <div className="ns-sheet__head">
                <p className="ns-eyebrow">Scan Report — Free Preview</p>
                <p className="ns-sheet__index" aria-hidden="true">NS / 001</p>
              </div>
              <h2 className="ns-result__niche" style={{ color: t.colors.textPrimary }}>{result.niche || query}</h2>

              {/* Verdict stamp */}
              <div className="ns-verdict" style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '1.25rem', alignItems: 'center' }}>
                <span className="ns-verdict__stamp" style={{ color: tier.tone, borderColor: tier.tone }}>
                  {grade}
                </span>
                <div>
                  <p className="ns-verdict__label" style={brutalEyebrow}>Verdict</p>
                  <p className="ns-verdict__title" style={{ color: tier.tone, fontWeight: 800, fontSize: '1.35rem', margin: '0 0 0.25rem' }}>
                    {tier.label}
                  </p>
                  <p className="ns-verdict__body" style={{ color: t.colors.textMuted, margin: 0 }}>
                    {result.recommendation || 'A directional read on demand, competition, and fit for this niche.'}
                  </p>
                </div>
              </div>

              {/* Demand / Competition meters */}
              <div className="ns-meters" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0,1fr))', gap: '1rem' }}>
                {[
                  { label: 'Demand', value: result.demand, color: LEVEL[result.demand]?.color },
                  { label: 'Competition', value: result.competition, color: LEVEL[result.competition]?.color },
                ].map((m) => (
                  <div key={m.label} className="ns-meter" style={brutalCard}>
                    <p className="ns-meter__label" style={brutalEyebrow}>{m.label}</p>
                    <strong className="ns-meter__value" style={{ color: m.color }}>
                      {String(m.value || '—').toUpperCase()}
                    </strong>
                    <div className="ns-meter__bar">
                      <span className="ns-meter__fill" style={{ width: `${(LEVEL[m.value]?.score ?? 5) * 10}%`, background: m.color }} />
                    </div>
                  </div>
                ))}
              </div>

              {/* Keywords */}
              {result.keywords?.length > 0 && (
                <div className="ns-block" style={{ borderTop: brutalBorder, paddingTop: '1.5rem' }}>
                  <p className="ns-block__label" style={brutalEyebrow}>Keywords</p>
                  <div className="ns-chips" style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
                    {result.keywords.map((kw, i) => (
                      <span key={i} className="ns-chip" style={{ border: brutalBorder }}>
                        <span className="ns-chip__idx" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                        {kw}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* ——— FULL REPORT (gated) ——— */}
            <div className={`ns-full ${!unlocked ? 'ns-full--locked' : ''}`} style={brutalCard}>
              <div className="ns-full__head">
                <div>
                  <p className="ns-eyebrow ns-eyebrow--aqua">Full Report</p>
                  <h2 className="ns-section-h2" style={{ color: t.colors.textPrimary, marginBottom: '0.4rem' }}>
                    What’s really in this niche
                  </h2>
                  <p className="ns-full__sub" style={{ color: t.colors.textMuted, margin: 0 }}>
                    Monetization, content angles, build order, and your next action.
                  </p>
                </div>
                {!unlocked && (
                  <span className="ns-lock-badge" aria-hidden="true"><Lock size={16} /></span>
                )}
              </div>

              {unlocked ? (
                <div className="ns-full__body">
                  {/* Monetization */}
                  <div className="ns-full-row" style={{ borderTop: brutalBorder }}>
                    <div className="ns-full-row__idx" aria-hidden="true">01</div>
                    <div className="ns-full-row__content">
                      <p className="ns-block__label" style={brutalEyebrow}>Monetization</p>
                      <ul className="ns-list">
                        {MONETIZATION.map((m) => <li key={m}>{m}</li>)}
                      </ul>
                    </div>
                  </div>

                  {/* Content angles */}
                  <div className="ns-full-row" style={{ borderTop: brutalBorder }}>
                    <div className="ns-full-row__idx" aria-hidden="true">02</div>
                    <div className="ns-full-row__content">
                      <p className="ns-block__label" style={brutalEyebrow}>3 Content Angles</p>
                      <ul className="ns-list">
                        {CONTENT_ANGLES(result.niche || query).map((c) => <li key={c}>{c}</li>)}
                      </ul>
                    </div>
                  </div>

                  {/* Build order */}
                  <div className="ns-full-row" style={{ borderTop: brutalBorder }}>
                    <div className="ns-full-row__idx" aria-hidden="true">03</div>
                    <div className="ns-full-row__content">
                      <p className="ns-block__label" style={brutalEyebrow}>Build Order</p>
                      <ol className="ns-list ns-list--num">
                        {BUILD_ORDER.map((b) => <li key={b}>{b}</li>)}
                      </ol>
                    </div>
                  </div>

                  {/* Next action */}
                  <div className="ns-next-action" style={{ border: brutalBorder, background: t.colors.panel }}>
                    <p className="ns-block__label" style={brutalEyebrow}>Your Next Action</p>
                    <p className="ns-next-action__text" style={{ color: t.colors.textPrimary, margin: 0 }}>
                      {result.recommendation}. Open the Niche Scorecard to validate this niche before building.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="ns-full__gate">
                  <p className="ns-gate__prompt">
                    <Lock size={18} style={{ marginRight: '0.5rem' }} aria-hidden="true" />
                    Unlock the Full Report — free.
                  </p>
                  <p className="ns-gate__copy" style={{ color: t.colors.textMuted }}>
                    The quick read is above. The Full Report adds monetization, content angles,
                    build order, and your next action. Enter your email and it unlocks instantly —
                    no card, no account.
                  </p>

                  <form className="ns-gate-form" onSubmit={handleGateSubmit}>
                    <input
                      className="ns-gate-input"
                      type="email"
                      required
                      value={lead.email}
                      onChange={(e) => setLead((s) => ({ ...s, email: e.target.value, status: 'idle' }))}
                      placeholder="you@example.com"
                      aria-label="Email address to unlock the full report"
                      disabled={lead.status === 'submitting' || lead.status === 'success'}
                    />
                    <button
                      type="submit"
                      className="ns-gate__btn"
                      disabled={lead.status === 'submitting' || lead.status === 'success'}
                      style={brutalButtonPrimary}
                    >
                      {lead.status === 'submitting' ? (
                        'Sending…'
                      ) : lead.status === 'success' ? (
                        <>
                          <Check size={16} /> Unlocked
                        </>
                      ) : (
                        <>
                          <Mail size={16} /> Send me the report
                        </>
                      )}
                    </button>
                  </form>

                  {lead.status === 'success' && (
                    <p className="ns-gate-note ns-gate-note--success" role="status">
                      Full report unlocked below. A copy is on its way to your inbox.
                    </p>
                  )}
                  {lead.status === 'error' && (
                    <p className="ns-gate-note ns-gate-note--error" role="alert">
                      That didn’t go through. Check the address and try again.
                    </p>
                  )}
                  <p className="ns-gate-note" style={{ color: t.colors.textMuted }}>
                    No spam, ever. Unsubscribe anytime.
                  </p>

                  <button
                    type="button"
                    className="ns-gate__reveal"
                    onClick={() => setUnlocked(true)}
                  >
                    <Unlock size={15} style={{ marginRight: '0.5rem' }} aria-hidden="true" />
                    Already subscribed? Reveal the report
                  </button>

                  <a
                    href={buyUrl}
                    className="ns-gate__buy"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Prefer to own it? Buy the printable PDF — $9 <ArrowRight size={14} />
                  </a>
                </div>
              )}

              {unlocked && (
                <div className="ns-full__deliver" style={{ borderTop: brutalBorder }}>
                  <button
                    type="button"
                    className="ns-gate__btn"
                    onClick={() => window.print()}
                    style={brutalButtonPrimary}
                  >
                    <Download size={16} style={{ marginRight: '0.5rem' }} aria-hidden="true" />
                    Save / print this report
                  </button>
                  <a
                    href={buyUrl}
                    className="ns-gate__btn"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ ...brutalButtonPrimary, background: t.colors.aqua }}
                  >
                    Keep it — buy the printable PDF $9 <ArrowRight size={16} />
                  </a>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* ——— ERROR ——— */}
      {error && !scanning && (
        <div className="ns-error" style={{ maxWidth: 720, margin: '0 auto', padding: '2rem 24px' }}>
          <p style={{ color: t.colors.red, fontWeight: 700 }}>{error}</p>
          <p style={{ color: t.colors.textMuted }}>Double-check the niche spelling, then try the scan again.</p>
        </div>
      )}

      {/* ——— VALUE STACK ——— */}
      <section className="ns-section" style={{ background: t.colors.panel }}>
        <div className="ns-value" style={{ maxWidth: 1100, margin: '0 auto', padding: 'clamp(3rem,6vw,4rem) 24px' }}>
          <p className="ns-eyebrow ns-eyebrow--orange">Why it matters</p>
          <h2 className="ns-section-h2">Pick the right idea before you invest a week.</h2>
          <div className="ns-value-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0,1fr))', gap: '1.5rem' }}>
            {[
              { icon: <Zap size={22} />, t: 'Demand, not vibes', b: 'A directional demand + competition read on any idea in seconds.' },
              { icon: <Layers size={22} />, t: 'Own the whitespace', b: 'See the low-competition angle before the market gets crowded.' },
              { icon: <Map size={22} />, t: 'A path, not a guess', b: 'The Full Report hands you a build order and next action.' },
            ].map((c) => (
              <div key={c.t} className="ns-value-card" style={brutalCard}>
                <span className="ns-value-card__icon" aria-hidden="true">{c.icon}</span>
                <h3 className="ns-value-card__title">{c.t}</h3>
                <p className="ns-value-card__body">{c.b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ——— META / CROSS-SELL ——— */}
      <section className="ns-section" style={{ background: t.colors.background }}>
        <div className="ns-meta" style={{ maxWidth: 1100, margin: '0 auto', padding: 'clamp(2rem,5vw,3rem) 24px' }}>
          <p className="ns-eyebrow">Proof over promises</p>
          <div className="ns-meta__list" style={{ borderTop: brutalBorder }}>
            {[
              { label: 'Built on', value: 'Live niche analysis' },
              { label: 'Pricing', value: 'Free read → email unlocks the full report → $9 printable PDF' },
              { label: 'Privacy', value: 'Stays in your browser' },
            ].map((m) => (
              <div key={m.label} className="ns-meta__row" style={{ borderBottom: brutalBorder }}>
                <span className="ns-meta__label" style={brutalEyebrow}>{m.label}</span>
                <span className="ns-meta__value">{m.value}</span>
              </div>
            ))}
          </div>

          <div className="ns-cross" style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginTop: '2rem' }}>
            <a href="/tool/scorecard" className="ns-gate__btn" style={brutalButtonPrimary}>Validate it → Niche Scorecard <ArrowRight size={16} /></a>
            <a href="/tool/roadmap" className="ns-gate__btn" style={{ ...brutalButtonPrimary, background: t.colors.aqua }}>
              Build it → Roadmap <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </section>

      {/* ——— FOOTER SIGNUP (funnel capture) ——— */}
      <section className="ns-signup" style={{ background: '#111111', borderTop: brutalBorder }}>
        <div className="ns-signup__inner" style={{ maxWidth: 1100, margin: '0 auto', padding: 'clamp(3rem,6vw,4rem) 24px' }}>
          <p className="ns-eyebrow ns-eyebrow--orange">Stay in the loop</p>
          <h2 className="ns-section-h2" style={{ color: '#ffffff' }}>
            New tools land here first.
          </h2>
          <p className="ns-tagline" style={{ color: 'rgba(255,255,255,0.72)', marginBottom: '1.5rem' }}>
            One short email when a new tool goes live. No hype, no daily noise — unsubscribe anytime.
          </p>

          {footerOptin.status === 'success' ? (
            <p className="ns-gate-note ns-gate-note--success" role="status" style={{ color: '#ffffff' }}>
              <Check size={16} style={{ marginRight: '0.5rem' }} aria-hidden="true" />
              You’re on the list. Watch your inbox for the next tool.
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
              <button
                type="submit"
                className="ns-gate__btn"
                disabled={footerOptin.status === 'submitting'}
                style={brutalButtonPrimary}
              >
                {footerOptin.status === 'submitting' ? 'Adding you…' : 'Notify me'}
              </button>
            </form>
          )}
          {footerOptin.status === 'error' && (
            <p className="ns-gate-note ns-gate-note--error" role="alert" style={{ color: '#ffb4a6' }}>
              That didn’t go through. Check the address and try again.
            </p>
          )}
        </div>
      </section>
    </div>
  );
}