/**
 * DigitallyDefined Funnel Automation Edge Function
 *
 * Pipeline: Quiz completions -> Lead scoring -> Email routing -> Notion sync -> Dashboard metrics
 *
 * Actions:
 *   funnel.process      — Full pipeline run (cron-triggered)
 *   funnel.lead          — Score a single lead and route
 *   funnel.metrics       — Return current funnel conversion metrics
 *   funnel.history       — Return recent funnel activity for dashboard
 */

import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import { corsHeaders } from "../_shared/cors-utils.ts";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL") || "";
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";
const DASHBOARD_API_KEY = Deno.env.get("DASHBOARD_API_KEY") || "DigitallyDefined-OS-2026";
const BREVO_API_KEY = Deno.env.get("BREVO_API_KEY") || "";
const BREVO_LIST_ID = Deno.env.get("BREVO_LIST_ID") || "2";
const BREVO_FROM_EMAIL = Deno.env.get("BREVO_FROM_EMAIL") || "hello@digitallydefined.online";
const BREVO_FROM_NAME = Deno.env.get("BREVO_FROM_NAME") || "DigitallyDefined";
const NOTION_API_KEY = Deno.env.get("NOTION_API_KEY") || Deno.env.get("NOTION_SECRET") || "";
const NOTION_LEADS_DB_ID = Deno.env.get("NOTION_LEADS_DB_ID") || "";

const json = (body: unknown, status = 200, origin = "") =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", ...corsHeaders(origin) },
  });

// ─── Supabase REST client helpers ──────────────────────────────

async function supabaseSelect(table: string, query: string = "*", filter?: string, limit = 50, orderBy = "created_at", orderDir = "desc") {
  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
    throw new Error("Supabase credentials not available");
  }
  let url = `${SUPABASE_URL}/rest/v1/${table}?select=${encodeURIComponent(query)}`;
  if (filter) url += `&${filter}`;
  url += `&order=${orderBy}.${orderDir}&limit=${limit}`;

  const res = await fetch(url, {
    headers: {
      apikey: SUPABASE_SERVICE_ROLE_KEY,
      Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) throw new Error(`Supabase ${table} query failed: ${res.status} ${res.statusText}`);
  return res.json();
}

async function supabaseInsert(table: string, payload: Record<string, unknown>, upsert = false) {
  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
    throw new Error("Supabase credentials not available");
  }
  const url = `${SUPABASE_URL}/rest/v1/${table}${upsert ? "?on_conflict=email,source" : ""}`;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      apikey: SUPABASE_SERVICE_ROLE_KEY,
      Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
      "Content-Type": "application/json",
      Prefer: upsert ? "resolution=merge-duplicates,return=representation" : "return=representation",
    },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(`Supabase ${table} insert failed: ${res.status} ${res.statusText}`);
  return res.json();
}

// ─── Lead Scoring ──────────────────────────────────────────────
//
// Scorecard logic: each lead gets a composite score based on
// engagement signals. We use a deterministic scoring matrix so
// results are reproducible, then enrich with AI for context.

enum LeadTier {
  Hot = "hot",
  Warm = "warm",
  Cold = "cold",
}

interface LeadScore {
  score: number;       // 0-100
  tier: LeadTier;
  rationale: string;
  dimensions: { name: string; score: number; max: number; notes: string }[];
}

function scoreQuizLead(quizData: Record<string, unknown>): LeadScore {
  const tags = Array.isArray(quizData.tags) ? quizData.tags as string[] : [];
  const metadata = (quizData.metadata as Record<string, unknown>) || {};
  const superpower = String(metadata.superpower || "").toLowerCase();

  // Deterministic scoring rules
  let score = 50; // baseline
  const dimensions: LeadScore["dimensions"] = [];

  // Dimension 1: Superpower match (strategic types tend to be hotter)
  const hotSuperpowers = ["strategist", "builder"];
  const warmSuperpowers = ["creator", "connector"];
  const coldSuperpowers = ["educator"];

  let spScore = 0;
  let spNotes = "";
  if (hotSuperpowers.includes(superpower)) {
    spScore = 20;
    spNotes = `${superpower} — high conversion potential`;
    score += 20;
  } else if (warmSuperpowers.includes(superpower)) {
    spScore = 10;
    spNotes = `${superpower} — moderate conversion potential`;
    score += 10;
  } else if (coldSuperpowers.includes(superpower)) {
    spScore = 0;
    spNotes = `${superpower} — needs education-first nurturing`;
    score += 0;
  } else {
    spScore = 5;
    spNotes = "Unclassified — default warmth";
    score += 5;
  }
  dimensions.push({ name: "Superpower Match", score: spScore, max: 20, notes: spNotes });

  // Dimension 2: Engagement depth (answers completeness)
  const metadataAnswers = metadata.answers as Record<string, unknown> | undefined;
  const directAnswers = quizData.answers as Record<string, unknown> | undefined;
  const answers = metadataAnswers || directAnswers;
  // If answers is an array (from quiz_roadmaps), count items; if object, count keys
  let answerCount = 0;
  if (Array.isArray(answers)) {
    answerCount = answers.length;
  } else if (answers && typeof answers === "object") {
    answerCount = Object.keys(answers as Record<string, unknown>).filter(
      (k) => (answers as Record<string, unknown>)[k] !== undefined && (answers as Record<string, unknown>)[k] !== null && (answers as Record<string, unknown>)[k] !== "",
    ).length;
  }
  // Use answer_count from metadata if available (set during enrichment)
  if (answerCount === 0 && metadata.answer_count) {
    answerCount = Number(metadata.answer_count) || 0;
  }
  let engScore = 0;
  let engNotes = "";
  if (answerCount >= 7) {
    engScore = 10;
    engNotes = `All ${answerCount} questions answered — strong engagement`;
    score += 10;
  } else if (answerCount >= 5) {
    engScore = 7;
    engNotes = `${answerCount}/7 questions answered — moderate engagement`;
    score += 7;
  } else if (answerCount >= 3) {
    engScore = 5;
    engNotes = `${answerCount}/7 questions answered — low engagement`;
    score += 5;
  } else {
    engScore = 3;
    engNotes = `Only ${answerCount} questions answered — very low engagement`;
    score += 3;
  }
  dimensions.push({ name: "Engagement Depth", score: engScore, max: 10, notes: engNotes });

  // Dimension 3: Source quality
  const source = String(quizData.source || "unknown");
  let srcScore = 0;
  let srcNotes = "";
  if (source.includes("digital-superpower-quiz")) {
    srcScore = 5;
    srcNotes = "High-intent quiz source";
    score += 5;
  } else if (source.includes("referral") || source.includes("community")) {
    srcScore = 3;
    srcNotes = "Referral/community source";
    score += 3;
  } else {
    srcScore = 2;
    srcNotes = `Source: ${source}`;
    score += 2;
  }
  dimensions.push({ name: "Source Quality", score: srcScore, max: 5, notes: srcNotes });

  // Dimension 4: Recency (how recently the quiz was completed)
  const leadCreatedAt = quizData.created_at;
  let recScore = 0;
  let recNotes = "";
  if (leadCreatedAt) {
    const createdMs = new Date(String(leadCreatedAt)).getTime();
    const nowMs = Date.now();
    const hoursAgo = (nowMs - createdMs) / (1000 * 60 * 60);
    if (hoursAgo < 1) {
      recScore = 10;
      recNotes = `Quiz completed < 1 hour ago — very fresh lead`;
    } else if (hoursAgo < 6) {
      recScore = 7;
      recNotes = `Quiz completed ${hoursAgo.toFixed(1)}h ago — fresh lead`;
    } else if (hoursAgo < 24) {
      recScore = 5;
      recNotes = `Quiz completed ${hoursAgo.toFixed(1)}h ago — within 24h window`;
    } else {
      recScore = 3;
      recNotes = `Quiz completed ${hoursAgo.toFixed(1)}h ago — older lead`;
    }
    score += recScore;
  } else {
    recScore = 5;
    recNotes = "Lead recency unknown — default warmth";
    score += 5;
  }
  dimensions.push({ name: "Recency", score: recScore, max: 10, notes: recNotes });

  // Cap at 100
  if (score > 100) score = 100;

  let tier: LeadTier;
  if (score >= 80) tier = LeadTier.Hot;
  else if (score >= 50) tier = LeadTier.Warm;
  else tier = LeadTier.Cold;

  return {
    score,
    tier,
    rationale: `${tier === LeadTier.Hot ? "Hot lead" : tier === LeadTier.Warm ? "Warm lead" : "Cold lead"} — score ${score}/100. ${dimensions.map((d) => d.notes).join("; ")}`,
    dimensions,
  };
}

// ─── Email Routing ─────────────────────────────────────────────

interface EmailRoute {
  tier: LeadTier;
  sequence: string;
  subject: string;
  templateKey: string;
  delaySeconds: number; // send delay
}

const HOT_LEAD_SEQUENCE: EmailRoute[] = [
  {
    tier: LeadTier.Hot,
    sequence: "hot-quiz-to-sale",
    subject: "{name}, your {superpower} superpower + 3 faceless assets that pay",
    templateKey: "hot_immediate",
    delaySeconds: 0, // send immediately
  },
  {
    tier: LeadTier.Hot,
    sequence: "hot-quiz-to-sale",
    subject: "{name}, 1 asset built this week = $500/mo while you sleep",
    templateKey: "hot_day1",
    delaySeconds: 86400,
  },
  {
    tier: LeadTier.Hot,
    sequence: "hot-quiz-to-sale",
    subject: "{name}, ready to turn your {superpower} into revenue?",
    templateKey: "hot_day3",
    delaySeconds: 259200,
  },
];

const WARM_LEAD_SEQUENCE: EmailRoute[] = [
  {
    tier: LeadTier.Warm,
    sequence: "warm-nurture",
    subject: "{name}, your roadmap is ready — start here",
    templateKey: "warm_immediate",
    delaySeconds: 0,
  },
  {
    tier: LeadTier.Warm,
    sequence: "warm-nurture",
    subject: "{name}, why one asset beats five projects",
    templateKey: "warm_day3",
    delaySeconds: 259200,
  },
  {
    tier: LeadTier.Warm,
    sequence: "warm-nurture",
    subject: "{name}, your next 30-minute move",
    templateKey: "warm_day7",
    delaySeconds: 604800,
  },
];

const COLD_LEAD_SEQUENCE: EmailRoute[] = [
  {
    tier: LeadTier.Cold,
    sequence: "cold-educational",
    subject: "{name}, your {superpower} superpower — the educational path",
    templateKey: "cold_immediate",
    delaySeconds: 0,
  },
  {
    tier: LeadTier.Cold,
    sequence: "cold-educational",
    subject: "{name}, systems > hustle: why faceless works",
    templateKey: "cold_day2",
    delaySeconds: 172800,
  },
  {
    tier: LeadTier.Cold,
    sequence: "cold-educational",
    subject: "{name}, the privacy-first approach to digital real estate",
    templateKey: "cold_day5",
    delaySeconds: 432000,
  },
  {
    tier: LeadTier.Cold,
    sequence: "cold-educational",
    subject: "{name}, your first small asset (no audience needed)",
    templateKey: "cold_day10",
    delaySeconds: 864000,
  },
];

function getRoutesForTier(tier: LeadTier): EmailRoute[] {
  switch (tier) {
    case LeadTier.Hot: return HOT_LEAD_SEQUENCE;
    case LeadTier.Warm: return WARM_LEAD_SEQUENCE;
    default: return COLD_LEAD_SEQUENCE;
  }
}

function routeName(tier: LeadTier): string {
  switch (tier) {
    case LeadTier.Hot: return "hot";
    case LeadTier.Warm: return "warm";
    default: return "cold";
  }
}

// ─── Brevo Email Sending ───────────────────────────────────────

async function sendBrevoEmail(email: string, name: string, subject: string, htmlContent: string, tags: string[] = []) {
  if (!BREVO_API_KEY) {
    console.log(`[funnel-email] DEV MODE — would send to ${email} (${name}): ${subject}`);
    return { ok: true, mode: "dev", sent: false, to: email };
  }

  const res = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Api-Key": BREVO_API_KEY,
    },
    body: JSON.stringify({
      sender: { email: BREVO_FROM_EMAIL, name: BREVO_FROM_NAME },
      to: [{ email, name }],
      subject,
      contentMigration: "replace",
      htmlContent,
      tags: ["quiz-funnel", "lead-" + tags[0], ...tags],
    }),
    signal: AbortSignal.timeout(30000),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    return { ok: false, error: `Brevo ${res.status}: ${text.slice(0, 200)}`, sent: false, to: email };
  }

  const data = await res.json().catch(() => ({}));
  return { ok: true, mode: "live", sent: true, to: email, messageId: data.messageId };
}

function interpolateTemplate(template: string, vars: Record<string, string>): string {
  let result = template;
  for (const [key, val] of Object.entries(vars)) {
    result = result.split(`{${key}}`).join(val || "");
  }
  return result;
}

function buildHotLeadEmail(name: string, superpower: string, score: number): string {
  const spDisplay = superpower || "Builder";
  return `<!DOCTYPE html>
<html><head><meta charset="utf-8"><title>Your ${spDisplay} roadmap</title></head>
<body style="margin:0;padding:0;background:#0a0a12;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#0a0a12;padding:40px 20px;">
  <tr><td align="center">
    <table width="600" cellpadding="0" cellspacing="0" style="background:#1a1a2e;border:1px solid #2a2a4a;">
      <tr><td style="padding:40px;text-align:center;border-bottom:1px solid #2a2a4a;">
        <h1 style="margin:0;color:#c9a84c;font-size:24px;font-weight:600;">DigitallyDefined</h1>
      </td></tr>
      <tr><td style="padding:40px;">
        <p style="margin:0 0 20px;color:#c9a84c;font-size:14px;text-transform:uppercase;letter-spacing:1px;">Hot Lead — Priority Follow-Up</p>
        <h2 style="margin:0 0 20px;color:#fff;font-size:28px;">Hello ${name},</h2>
        <p style="margin:0 0 20px;color:#a0a0b0;font-size:16px;line-height:1.6;">
          Your ${spDisplay} profile scored ${score}/100 — you're in our priority follow-up queue.
          Your lead score indicates high potential for rapid conversion to a paying customer.
        </p>
        <p style="margin:0 0 20px;color:#a0a0b0;font-size:16px;line-height:1.6;">
          A member of the DigitallyDefined team will reach out within 2 hours.
          In the meantime, here's your personalized roadmap attached.
        </p>
        <div style="background:#0a0a12;border:1px solid #c9a84c;padding:20px;margin:20px 0;">
          <p style="margin:0;color:#c9a84c;font-size:16px;font-weight:600;">Superpower: ${spDisplay}</p>
          <p style="margin:5px 0 0;color:#a0a0b0;font-size:14px;">Lead Tier: HOT — Priority Sales Follow-Up</p>
        </div>
        <p style="margin:0 0 20px;color:#a0a0b0;font-size:16px;line-height:1.6;">
          Ready to build your first faceless asset? <a href="https://dashboard.digitallydefined.online/intelligence" style="color:#c9a84c;">Open your intelligence dashboard</a>.
        </p>
      </td></tr>
      <tr><td style="padding:40px;border-top:1px solid #2a2a4a;text-align:center;">
        <p style="margin:0;color:#666;font-size:13px;">© 2026 DigitallyDefined — HOT LEAD AUTOMATION</p>
      </td></tr>
    </table>
  </td></tr>
</table></body></html>`;
}

function buildWarmLeadEmail(name: string, superpower: string, roadmap?: Record<string, unknown>): string {
  const spDisplay = superpower || "Builder";
  const steps = Array.isArray(roadmap?.steps) ? roadmap.steps as string[] : [];
  const stepsHtml = steps.slice(0, 3).map((s, i) => `<li style="margin-bottom:8px;">${s}</li>`).join("");

  return `<!DOCTYPE html>
<html><head><meta charset="utf-8"><title>Your ${spDisplay} roadmap</title></head>
<body style="margin:0;padding:0;background:#0a0a12;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#0a0a12;padding:40px 20px;">
  <tr><td align="center">
    <table width="600" cellpadding="0" cellspacing="0" style="background:#1a1a2e;border:1px solid #2a2a4a;">
      <tr><td style="padding:40px;text-align:center;border-bottom:1px solid #2a2a4a;">
        <h1 style="margin:0;color:#c9a84c;font-size:24px;font-weight:600;">DigitallyDefined</h1>
      </td></tr>
      <tr><td style="padding:40px;">
        <p style="margin:0 0 20px;color:#c9a84c;font-size:14px;text-transform:uppercase;letter-spacing:1px;">Warm Lead — Nurturing Sequence</p>
        <h2 style="margin:0 0 20px;color:#fff;font-size:28px;">Hello ${name},</h2>
        <p style="margin:0 0 20px;color:#a0a0b0;font-size:16px;line-height:1.6;">
          Your ${spDisplay} profile is ready. Here's your personalized roadmap to start building faceless digital real estate.
        </p>
        ${stepsHtml ? `<ol style="margin:0 0 20px;color:#a0a0b0;font-size:15px;line-height:1.8;padding-left:20px;">${stepsHtml}</ol>` : ""}
        <div style="background:#0a0a12;border-left:3px solid #c9a84c;padding:20px;margin:20px 0;">
          <p style="margin:0 0 5px;color:#c9a84c;font-size:12px;text-transform:uppercase;letter-spacing:1px;">Warm Lead Next Step</p>
          <p style="margin:0;color:#fff;font-size:16px;">Score your niche — the scorecard will show you which directions have the strongest monetization potential.</p>
        </div>
        <div style="text-align:center;padding:20px 0;">
          <a href="https://digitallydefined.online/tools/scorecard" style="display:inline-block;background:#c9a84c;color:#0a0a12;padding:14px 32px;text-decoration:none;font-weight:600;font-size:16px;">Score My Niche →</a>
        </div>
      </td></tr>
      <tr><td style="padding:40px;border-top:1px solid #2a2a4a;text-align:center;">
        <p style="margin:0;color:#666;font-size:13px;">© 2026 DigitallyDefined — Warm Lead Nurturing Sequence</p>
      </td></tr>
    </table>
  </td></tr>
</table></body></html>`;
}

function buildColdLeadEmail(name: string, superpower: string): string {
  const spDisplay = superpower || "Builder";
  return `<!DOCTYPE html>
<html><head><meta charset="utf-8"><title>${spDisplay} — Your educational path</title></head>
<body style="margin:0;padding:0;background:#0a0a12;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#0a0a12;padding:40px 20px;">
  <tr><td align="center">
    <table width="600" cellpadding="0" cellspacing="0" style="background:#1a1a2e;border:1px solid #2a2a4a;">
      <tr><td style="padding:40px;text-align:center;border-bottom:1px solid #2a2a4a;">
        <h1 style="margin:0;color:#c9a84c;font-size:24px;font-weight:600;">DigitallyDefined</h1>
      </td></tr>
      <tr><td style="padding:40px;">
        <p style="margin:0 0 20px;color:#c9a84c;font-size:14px;text-transform:uppercase;letter-spacing:1px;">Educational Nurturing Sequence</p>
        <h2 style="margin:0 0 20px;color:#fff;font-size:28px;">Hello ${name},</h2>
        <p style="margin:0 0 20px;color:#a0a0b0;font-size:16px;line-height:1.6;">
          Your ${spDisplay} superpower is ready. This message starts our educational sequence —
          no pressure, no hype. We send one short note every few days.
        </p>
        <p style="margin:0 0 20px;color:#a0a0b0;font-size:16px;line-height:1.6;">
          You'll receive:
        </p>
        <ul style="margin:0 0 20px;color:#a0a0b0;font-size:15px;line-height:1.8;padding-left:20px;">
          <li>Faceless real estate concepts — privacy-first, no personal branding</li>
          <li>Tool mastery — one tool at a time, no overwhelm</li>
          <li>Asset thinking — how small digital assets compound over time</li>
          <li>Your first build — concrete, doable in a weekend</li>
        </ul>
        <div style="text-align:center;">
          <a href="https://digitallydefined.online/tools" style="display:inline-block;background:#c9a84c;color:#0a0a12;padding:14px 32px;text-decoration:none;font-weight:600;font-size:16px;">Explore All Tools →</a>
        </div>
      </td></tr>
      <tr><td style="padding:40px;border-top:1px solid #2a2a4a;text-align:center;">
        <p style="margin:0;color:#666;font-size:13px;">© 2026 DigitallyDefined — Educational Sequence</p>
      </td></tr>
    </table>
  </td></tr>
</table></body></html>`;
}

// ─── Notion Sync ───────────────────────────────────────────────

async function syncLeadToNotion(lead: Record<string, unknown>, score: LeadScore) {
  if (!NOTION_API_KEY || !NOTION_LEADS_DB_ID) {
    return { ok: false, error: "Notion credentials or DB ID not configured", synced: false };
  }

  try {
    const email = String(lead.email || "");
    const name = String(lead.name || "");
    const superpower = String((lead.metadata as Record<string, unknown>)?.superpower || "");

    const res = await fetch(`https://api.notion.com/v1/pages`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${NOTION_API_KEY}`,
        "Notion-Version": "2022-06-28",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        parent: { database_id: NOTION_LEADS_DB_ID },
        properties: {
          Name: { title: [{ text: { content: name || email || "Unknown" } }] },
          Email: { rich_text: [{ text: { content: email } }] },
          Source: { select: { name: String(lead.source || "quiz") } },
          Tags: {
            multi_select: (Array.isArray(lead.tags) ? lead.tags : []).map((t) => ({ name: String(t) })),
          },
          "Lead Tier": { select: { name: routeName(score.tier).toUpperCase() } },
          "Lead Score": { number: score.score },
          "Superpower": { rich_text: [{ text: { content: superpower } }] },
          "Qualified At": { date: { start: new Date().toISOString() } },
          "Status": { select: { name: score.tier === LeadTier.Hot ? "Qualified - Hot" : score.tier === LeadTier.Warm ? "Nurturing - Warm" : "Nurturing - Cold" } },
        },
      }),
    });

    if (!res.ok) {
      const text = await res.text().catch(() => "");
      return { ok: false, error: `Notion API ${res.status}: ${text.slice(0, 200)}`, synced: false };
    }

    const data = await res.json();
    return { ok: true, synced: true, pageId: data.id, url: data.url };
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    return { ok: false, error: msg, synced: false };
  }
}

// ─── Funnel Processing ─────────────────────────────────────────

async function processSingleLead(lead: Record<string, unknown>) {
  const email = String(lead.email || "").toLowerCase();
  const name = String(lead.name || "");

  if (!email) {
    return { email: "unknown", skipped: true, reason: "No email address" };
  }

  // Step 1: Check if already processed (idempotency)
  const existing = await supabaseSelect(
    "funnel_activity",
    "*",
    `email=eq.${encodeURIComponent(email)}`,
    1,
    "created_at",
    "desc",
  ).catch(() => []);

  if (existing && Array.isArray(existing) && existing.length > 0) {
    const latest = existing[0] as Record<string, unknown>;
    // If we already processed and sent emails for this lead, skip
    if (latest.status === "complete") {
      return { email, skipped: true, reason: "Already processed", tier: latest.tier };
    }
  }

  // Step 2: Look up quiz roadmaps for answers (enrichment + scoring)
  let roadmap = null;
  const roadmaps = await supabaseSelect(
    "quiz_roadmaps",
    "*",
    `email=eq.${encodeURIComponent(email)}`,
    1,
    "created_at",
    "desc",
  ).catch(() => []);
  if (roadmaps && Array.isArray(roadmaps) && roadmaps.length > 0) {
    roadmap = roadmaps[0] as Record<string, unknown>;
  }

  // Enrich lead with quiz answers from roadmap for scoring
  const enrichedLead = { ...lead };
  if (roadmap?.answers) {
    (enrichedLead.metadata as Record<string, unknown>) = {
      ...((lead.metadata as Record<string, unknown>) || {}),
      answers: roadmap.answers,
      answer_count: Array.isArray(roadmap.answers) ? roadmap.answers.length : undefined,
      roadmap_id: roadmap.id,
    };
  }

  // Step 3: Score the lead (now with quiz answers included)
  const score = scoreQuizLead(enrichedLead);

  // Step 5: Route to email sequence
  const routes = getRoutesForTier(score.tier);
  const routeVars: Record<string, string> = {
    name: name || "there",
    superpower: String((lead.metadata as Record<string, unknown>)?.superpower || "Builder"),
    score: String(score.score),
    email: email,
  };

  const emailResults: { template: string; result: Record<string, unknown> }[] = [];

  // Send the immediate follow-up (delaySeconds === 0)
  const immediateRoute = routes.find((r) => r.delaySeconds === 0);
  if (immediateRoute) {
    const subject = interpolateTemplate(immediateRoute.subject, routeVars);
    let htmlContent = "";
    let toEmail = email;

    if (score.tier === LeadTier.Hot) {
      htmlContent = buildHotLeadEmail(name || "there", routeVars.superpower, score.score);
    } else if (score.tier === LeadTier.Warm) {
      htmlContent = buildWarmLeadEmail(name || "there", routeVars.superpower, (roadmap as Record<string, unknown>) || undefined);
    } else {
      htmlContent = buildColdLeadEmail(name || "there", routeVars.superpower);
    }

    const result = await sendBrevoEmail(toEmail, name || "there", subject, htmlContent, ["quiz-complete", routeName(score.tier)]);
    emailResults.push({ template: immediateRoute.templateKey, result });
  }

  // Log immediate follow-up scheduled emails as pending
  for (const route of routes.filter((r) => r.delaySeconds > 0)) {
    const scheduledSubject = interpolateTemplate(route.subject, routeVars);
    await supabaseInsert(
      "funnel_activity",
      {
        email,
        name,
        lead_score: score.score,
        tier: score.tier,
        status: "scheduled",
        sequence: route.sequence,
        template: route.templateKey,
        subject: scheduledSubject,
        scheduled_for: new Date(Date.now() + route.delaySeconds * 1000).toISOString(),
        metadata: { superpower: routeVars.superpower, source: lead.source },
      },
      false,
    ).catch((e) => console.error(`[funnel] Failed to schedule ${route.templateKey} for ${email}:`, e.message));
  }

  // Step 5: Record the funnel activity (immediate email sent)
  await supabaseInsert(
    "funnel_activity",
    {
      email,
      name,
      lead_score: score.score,
      tier: score.tier,
      status: "complete",
      sequence: routes[0]?.sequence || "default",
      template: immediateRoute?.templateKey || "default",
      subject: immediateRoute ? interpolateTemplate(immediateRoute.subject, routeVars) : "",
      metadata: {
        superpower: routeVars.superpower,
        source: lead.source,
        quiz_answers: lead.answers,
        roadmap_id: lead.quiz_roadmap_id || lead.metadata?.roadmap_id,
      },
    },
    false,
  ).catch((e) => console.error(`[funnel] Failed to log activity for ${email}:`, e.message));

  // Step 6: Sync to Notion
  const notionResult = await syncLeadToNotion(lead, score);

  return {
    email,
    name,
    score: score.score,
    tier: score.tier,
    rationale: score.rationale,
    dimensions: score.dimensions,
    emailResults,
    notionSync: notionResult,
    emailSent: emailResults.length > 0 && emailResults[0].result?.ok && emailResults[0].result?.sent,
  };
}

// ─── Funnel Metrics ────────────────────────────────────────────

async function getFunnelMetrics() {
  const [leads, activities, roadmapResults, emailFollowups] = await Promise.all([
    supabaseSelect("website_leads", "*", "source=eq.digital-superpower-quiz", 1000, "created_at", "desc").catch(() => []),
    supabaseSelect("funnel_activity", "*", "", 1000, "created_at", "desc").catch(() => []),
    supabaseSelect("quiz_roadmaps", "*", "", 1000, "created_at", "desc").catch(() => []),
    supabaseSelect("funnel_activity", "*", "status=eq.complete", 1000, "created_at", "desc").catch(() => []),
  ]);

  const totalQuizLeads = Array.isArray(leads) ? leads.filter((l: Record<string, unknown>) => l.source === "digital-superpower-quiz").length : 0;
  const scoredLeads = Array.isArray(activities) ? activities.filter((a: Record<string, unknown>) => a.status === "complete" && a.tier).length : 0;
  const hotLeads = Array.isArray(activities) ? activities.filter((a: Record<string, unknown>) => a.status === "complete" && a.tier === "hot").length : 0;
  const warmLeads = Array.isArray(activities) ? activities.filter((a: Record<string, unknown>) => a.status === "complete" && a.tier === "warm").length : 0;
  const coldLeads = Array.isArray(activities) ? activities.filter((a: Record<string, unknown>) => a.status === "complete" && a.tier === "cold").length : 0;
  const emailsSent = Array.isArray(activities) ? activities.filter((a: Record<string, unknown>) => a.status === "complete" && a.tier).length : 0;
  const totalRoadmaps = Array.isArray(roadmapResults) ? roadmapResults.length : 0;

  const quizToEmail = totalQuizLeads > 0 ? (scoredLeads / totalQuizLeads) * 100 : 0;
  const emailToProduct = emailsSent > 0 ? Math.min((totalRoadmaps / emailsSent) * 100, 100) : 0;
  const quizToRoadmap = totalQuizLeads > 0 ? Math.min((totalRoadmaps / totalQuizLeads) * 100, 100) : 0;

  return {
    totalQuizLeads,
    scoredLeads,
    hotLeads,
    warmLeads,
    coldLeads,
    emailsSent,
    totalRoadmaps,
    funnelConversion: {
      quiz_to_email: { rate: quizToEmail.toFixed(1) + "%", completed: scoredLeads, total: totalQuizLeads },
      email_to_product: { rate: emailToProduct.toFixed(1) + "%", completed: emailsSent, total: emailsSent },
      quiz_to_roadmap: { rate: quizToRoadmap.toFixed(1) + "%", completed: totalRoadmaps, total: totalQuizLeads },
    },
    tierDistribution: {
      hot: scoredLeads > 0 ? Math.round((hotLeads / scoredLeads) * 100) : 0,
      warm: scoredLeads > 0 ? Math.round((warmLeads / scoredLeads) * 100) : 0,
      cold: scoredLeads > 0 ? Math.round((coldLeads / scoredLeads) * 100) : 0,
    },
    timestamp: new Date().toISOString(),
  };
}

// ─── Main Handler ──────────────────────────────────────────────

serve(async (req: Request) => {
  const origin = req.headers.get("origin") || "";
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: { "Access-Control-Allow-Origin": "*", ...corsHeaders(origin) } });
  }
  if (req.method !== "POST") {
    return json({ error: "Method not allowed - use POST" }, 405, origin);
  }

  let body: Record<string, unknown>;
  try {
    const text = await req.text();
    body = text ? JSON.parse(text) : {};
  } catch {
    return json({ error: "Invalid JSON body" }, 400, origin);
  }

  const action = String(body.action || "").trim();

  // Auth check for non-public actions
  const expectedKey = DASHBOARD_API_KEY;
  const providedKey = (req.headers.get("x-api-key") || req.headers.get("authorization") || "").trim();
  if (!expectedKey || providedKey !== expectedKey) {
    return json({ error: "Unauthorized - Invalid or missing API key" }, 401, origin);
  }

  if (action === "funnel.process") {
    // Full pipeline run — process all leads since last run
    const since = body.since || new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(); // default: last 24h

    let leads: Record<string, unknown>[] = [];
    try {
      leads = await supabaseSelect(
        "website_leads",
        "*",
        `source=eq.digital-superpower-quiz&created_at=gte.${encodeURIComponent(since)}&tags=cs.{"quiz-complete"}`,
        200,
        "created_at",
        "desc",
      ) as Record<string, unknown>[];
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      return json({ ok: false, error: `Failed to fetch leads: ${msg}` }, 500, origin);
    }

    if (!Array.isArray(leads)) leads = [];

    const results: Record<string, unknown>[] = [];
    let processed = 0;
    let skipped = 0;
    let hot = 0;
    let warm = 0;
    let cold = 0;

    for (const lead of leads) {
      try {
        const result = await processSingleLead(lead);
        results.push(result);
        processed++;
        if (result.tier === LeadTier.Hot) hot++;
        else if (result.tier === LeadTier.Warm) warm++;
        else if (result.tier === LeadTier.Cold) cold++;
        else if (result.skipped) skipped++;
      } catch (e) {
        const msg = e instanceof Error ? e.message : String(e);
        results.push({ email: String(lead.email || "unknown"), error: msg, ok: false });
        skipped++;
      }
    }

    // Update funnel_activity summary
    const metrics = await getFunnelMetrics();

    return json({
      ok: true,
      action: "funnel.process",
      status: "completed",
      since,
      totalLeads: leads.length,
      processed,
      skipped,
      tierBreakdown: { hot, warm, cold },
      results: results.slice(0, 50), // return first 50 for dashboard
      metrics,
      timestamp: new Date().toISOString(),
    }, 200, origin);
  }

  if (action === "funnel.lead") {
    // Score a single lead
    const email = String(body.email || "").trim().toLowerCase();
    if (!email) return json({ error: "Email is required" }, 400, origin);

    const lead = {
      email,
      name: String(body.name || ""),
      source: String(body.source || "digital-superpower-quiz"),
      tags: Array.isArray(body.tags) ? body.tags : [],
      metadata: body.metadata || {},
      answers: body.answers || {},
      ...(body.quizData || {}),
    };

    try {
      const result = await processSingleLead(lead);
      return json({ ok: true, lead: result }, 200, origin);
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      return json({ ok: false, error: msg }, 500, origin);
    }
  }

  if (action === "funnel.metrics") {
    try {
      const metrics = await getFunnelMetrics();
      return json({ ok: true, metrics }, 200, origin);
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      return json({ ok: false, error: msg }, 502, origin);
    }
  }

  if (action === "funnel.history") {
    const limit = Number(body.limit || 50);
    try {
      const history = await supabaseSelect("funnel_activity", "*", "", limit, "created_at", "desc");
      return json({ ok: true, history: Array.isArray(history) ? history : [] }, 200, origin);
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      return json({ ok: false, error: msg }, 502, origin);
    }
  }

  // If not funnеl action, return available actions
  return json({
    error: `Unknown action: ${action}`,
    availableActions: ["funnel.process", "funnel.lead", "funnel.metrics", "funnel.history"],
  }, 404, origin);
});
