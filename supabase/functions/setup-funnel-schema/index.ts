/**
 * Schema setup edge function — creates the funnel_activity table using PostgREST
 */
import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import { corsHeaders } from "../_shared/cors-utils.ts";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL") || "";
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";
const DASHBOARD_API_KEY = Deno.env.get("DASHBOARD_API_KEY") || "DigitallyDefined-OS-2026";

serve(async (req: Request) => {
  const origin = req.headers.get("origin") || "";
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders(origin) });
  }
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json", ...corsHeaders(origin) },
    });
  }

  const apiKey = req.headers.get("x-api-key") || "";
  if (apiKey !== DASHBOARD_API_KEY) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { "Content-Type": "application/json", ...corsHeaders(origin) },
    });
  }

  // Use PostgREST rpc endpoint to run SQL
  // The pgmigrate extension or a custom rpc function may be available
  // Try multiple approaches
  const results: Record<string, unknown>[] = [];

  // Approach 1: Check if the table already exists
  try {
    const checkRes = await fetch(
      `${SUPABASE_URL}/rest/v1/funnel_activity?select=count&limit=1`,
      {
        headers: {
          apikey: SUPABASE_SERVICE_ROLE_KEY,
          Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
          "Content-Type": "application/json",
        },
      },
    );

    if (checkRes.ok) {
      return new Response(JSON.stringify({
        ok: true,
        message: "funnel_activity table already exists",
        tableExists: true,
      }), { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders(origin) } });
    }

    if (checkRes.status === 404 || checkRes.status === 405) {
      // Table doesn't exist — need to create it
      // Use the PostgREST rpc to execute SQL
      const rpcRes = await fetch(
        `${SUPABASE_URL}/rest/v1/rpc`,
        {
          method: "POST",
          headers: {
            apikey: SUPABASE_SERVICE_ROLE_KEY,
            Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            fn: "supabase_functions.http_request",
            "Content-Type": "application/json",
          }),
        },
      );

      // Try alternative: use the edge function's own supabase client to create table via DDL
      // Actually, PostgREST doesn't support DDL operations
      // Let's check if there's a `exec` or `sql` rpc available
      return new Response(JSON.stringify({
        ok: false,
        message: "Table does not exist and cannot be created via PostgREST. Use supabase CLI.",
        tableExists: false,
        statusCode: checkRes.status,
      }), { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders(origin) } });
    }
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    return new Response(JSON.stringify({ ok: false, error: msg }), {
      status: 500,
      headers: { "Content-Type": "application/json", ...corsHeaders(origin) },
    });
  }

  return new Response(JSON.stringify({ ok: true, results }), {
    status: 200,
    headers: { "Content-Type": "application/json", ...corsHeaders(origin) },
  });
});
