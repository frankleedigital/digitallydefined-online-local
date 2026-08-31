// Vercel serverless function: GET /api/hermes/status
// Light reachability probe for the Hermes AI Mentor.
// Powers the MentorWidget green-light online indicator in production.

export default async function handler(req, res) {
  const supabaseUrl =
    process.env.VITE_SUPABASE_URL || 'https://dijjlppdljpcgyoakdnq.supabase.co';
  const endpoint =
    process.env.VITE_HERMES_ENDPOINT || `${supabaseUrl}/functions/v1/hermes`;
  // Same shared key the client uses. Prefer the VITE_ build var (inlined into
  // the client bundle and also available to serverless via project env); fall
  // back to the canonical secret name so the function works in both setups.
  const apiKey = process.env.VITE_DASHBOARD_API_KEY || process.env.DASHBOARD_API_KEY || '';
  if (!apiKey) {
    console.error('[hermes-status] VITE_DASHBOARD_API_KEY is not set. Status probe may be rejected (401).');
  }

  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('Content-Type', 'application/json');

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 8000);
  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
      },
      body: JSON.stringify({ action: 'status' }),
      signal: controller.signal,
    });

    let data = null;
    try {
      data = await response.json();
    } catch {
      /* non-JSON response still proves reachability */
    }

    const online = response.status >= 200 && response.status < 500;
    return res.status(200).json({
      online,
      status: response.status,
      provider: data?.provider || null,
      message: data?.error || null,
      timestamp: Date.now(),
    });
  } catch (err) {
    return res.status(200).json({
      online: false,
      error: err instanceof Error ? err.message : String(err),
      timestamp: Date.now(),
    });
  } finally {
    clearTimeout(timer);
  }
}
