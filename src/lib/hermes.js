const templates = {
  retirement_gap: (p) => `
    The user just completed the Retirement Gap Calculator.
    Here are their results:
    - Gap Amount: $${p.gapAmount}
    - Monthly Needed To Close: $${p.monthlyNeededToClose}
    - Desired Monthly Income: $${p.desiredIncome}
    - Current Savings: $${p.currentSavings}
    - Years Until Retirement: ${p.yearsToRetirement}
    - Total Monthly Income: $${p.totalMonthlyIncome}

    Provide guidance on closing the retirement gap, improving savings strategy,
    and realistic next steps based on their timeline.
  `,

  freedom_number: (p) => `
    The user just completed the Freedom Number Calculator.
    Here are their results:
    - Monthly Freedom Goal: $${p.monthlyGoal}
    - Total Monthly Income: $${p.totalMonthlyIncome}
    - Asset Count: ${p.assetCount}
    - Yield Per Asset: $${p.yieldPerAsset}
    - Gap: $${p.gap}
    - Goal Met: ${p.goalMet ? 'Yes' : 'No'}

    Provide guidance on achieving financial freedom, improving asset yield,
    and optimizing their passive income strategy.
  `,

  tenx_roi: (p) => `
    The user just completed the TenX ROI Calculator.
    Here are their results:
    - Closed Leads: ${p.roiClosedLeads}
    - Gross Revenue: $${p.roiGrossRevenue}
    - Monthly Rent: $${p.roiMonthlyRent}
    - Equity Cap: $${p.roiEquityCap}
    - PPC Spend: $${p.roiPpcSpend}
    - Savings: $${p.roiSavings}

    Provide guidance on improving ROI, optimizing acquisition channels,
    and identifying the strongest leverage points in their business model.
  `,

  niche_scorecard: (p) => `
    The user just completed the Niche Profitability Scorecard.
    Here are their results:
    - Total Score: ${p.score}
    - Category: ${p.category}

    Weighted Inputs:
    ${Object.entries(p.inputs || {})
      .map(([k, v]) => `- ${k}: ${v}`)
      .join('\n')}

    Provide guidance on niche selection, profitability potential,
    and strategic positioning based on their scorecard.
  `,
};

export function safePayload(payload) {
  if (!payload || typeof payload !== 'object') return {};

  // Remove undefined values so templates don't break
  return Object.fromEntries(
    Object.entries(payload).filter(([_, v]) => v !== undefined)
  );
}

export function buildHermesMessage(topic, payload) {
  const safe = safePayload(payload);
  const template = templates[topic];

  try {
    if (!template) {
      return `
        The user triggered a calculator event, but no template exists
        for the topic "${topic}". Provide general financial guidance.
      `;
    }

    return template(safe);
  } catch (err) {
    return `
      The user triggered a calculator event, but the template for
      "${topic}" encountered an error. Provide general guidance based
      on the available data: ${JSON.stringify(safe, null, 2)}
    `;
  }
}

export function getHermesEndpoint() {
  if (import.meta.env.VITE_HERMES_ENDPOINT) {
    return import.meta.env.VITE_HERMES_ENDPOINT;
  }
  const baseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://dijjlppdljpcgyoakdnq.supabase.co';
  return `${baseUrl}/functions/v1/hermes`;
}

export function getHermesHeaders(extra = {}) {
  const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

  if (!anonKey && import.meta.env.DEV) {
    console.warn('[Hermes] VITE_SUPABASE_ANON_KEY is not set. AI features will fail.');
  }

  const headers = {
    'Content-Type': 'application/json',
    'x-api-key': import.meta.env.VITE_DASHBOARD_API_KEY || 'DigitallyDefined-OS-2026',
    ...extra,
  };

  if (anonKey) {
    headers['apikey'] = anonKey;
    headers['Authorization'] = `Bearer ${anonKey}`;
  }

  return headers;
}

let typingCallback = null;

export function onHermesTyping(cb) {
  typingCallback = cb;
}

/**
 * Probe Hermes reachability via /api/hermes/status.
 * The endpoint is served by the Vite middleware (dev/preview) and by the
 * Vercel serverless function (production).
 */
export async function getHermesStatus() {
  try {
    const res = await fetch('/api/hermes/status', {
      method: 'GET',
      headers: { Accept: 'application/json' },
      signal: AbortSignal.timeout(9000),
    });
    if (!res.ok) return { online: false, status: res.status, checkedAt: Date.now() };
    const data = await res.json();
    return {
      online: Boolean(data?.online),
      status: data?.status ?? res.status,
      provider: data?.provider || null,
      checkedAt: Date.now(),
    };
  } catch (err) {
    return { online: false, error: err instanceof Error ? err.message : String(err), checkedAt: Date.now() };
  }
}

export async function sendToHermes(message, context = {}) {
  if (typingCallback) typingCallback(true);

  try {
    // Developer-mode requests go to the dedicated (protected) mentor.dev action,
    // which returns structured guidance (filePath, codeSnippet, exactChange).
    // Everyone else uses hermes.agent, which activates the full Hermes brain.
    const action =
      (import.meta.env.VITE_HERMES_ACTION) ||
      (context.devMode ? 'mentor.dev' : 'hermes.agent');

    const res = await fetch(getHermesEndpoint(), {
      method: 'POST',
      headers: getHermesHeaders(),
      body: JSON.stringify({
        action,
        message,
        systemPrompt: context.systemPrompt || context.system || null,
        toolState: context.toolState || null,
        page: context.page || null,
        ...context,
      }),
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.error || errorData.message || `Hermes request failed: ${res.status}`);
    }

    return await res.json();
  } finally {
    if (typingCallback) typingCallback(false);
  }
}

export default { getHermesEndpoint, getHermesHeaders, sendToHermes };
