# Deployment Map — DigitallyDefined Unified Platform

This document maps every repository to its Vercel project, domain, dependencies, and environment variables.

## 1. Vercel / Domain Mapping

| Vercel Project | Domain | GitHub Repo | Local Folder | Framework | Build Command |
|----------------|--------|-------------|--------------|-----------|---------------|
| `digitallydefined-online` | `digitallydefined.online` | `frankielee1971/digitallydefined-online` | `digitallydefined-online-local` | Vite (React) | `vite build` |
| `digitallydefined-reputation-dashboard` | `dashboard.digitallydefined.online` | `frankielee1971/digitallydefined-reputation-dashboard` | `DigitallyDefined-Dashboard` | Vite (React) + Serverless API | `vite build` |
| `digitallydefined-os-backend` | `digitallydefined-os-backend.vercel.app` | `frankielee1971/digitallydefined-os-backend` | `DigitallyDefined-Backend` | Node.js (Vercel Functions) + Python (Hermes MCP) | N/A (functions) |

### DNS Configuration

| Domain | Type | Points To |
|--------|------|-----------|
| `digitallydefined.online` | A / CNAME | Vercel (`digitallydefined-online` project) |
| `dashboard.digitallydefined.online` | CNAME | Vercel (`digitallydefined-reputation-dashboard` project) |
| `digitallydefined-os-backend.vercel.app` | — | Vercel default (no custom domain needed) |

### Cross-Origin Resource Sharing (CORS)

The backend (`digitallydefined-os-backend`) is configured to accept requests from:

- `https://dashboard.digitallydefined.online`
- `https://digitallydefined.online`
- `http://localhost:3000` (dev)
- `http://localhost:5173` (dev)

Configured in `DigitallyDefined-Backend/vercel.json` under `headers` → `Access-Control-Allow-Origin`.

## 2. Dependency Chain

```
User visits digitallydefined.online
    │
    ├── Marketing site (digitallydefined-online-local)
    │   ├── Serves landing pages, quizzes, calculators
    │   └── /dashboard → 301 redirect to dashboard.digitallydefined.online
    │
    └── User navigates to dashboard.digitallydefined.online
        │
        ├── Dashboard app (DigitallyDefined-Dashboard)
        │   ├── Supabase Auth (login/signup)
        │   ├── Dashboard UI (events, workflows, quizzes, profile, settings)
        │   ├── Serverless API routes (api/dashboard/*)
        │   │   └── Calls Supabase directly
        │   └── Hermes AI requests (lib/hermesClient.js)
        │       └── POST → https://digitallydefined-os-backend.vercel.app/api/hermes
        │           (with x-api-key: DASHBOARD_API_KEY)
        │
        └── Backend API (DigitallyDefined-Backend)
            ├── api/hermes.js → OmniRoute AI gateway (lib/omniroute.js)
            ├── api/index.js → Unified router (brain.brief, automation.sync, etc.)
            ├── api/cron/* → Scheduled jobs (daily followup, post-publisher)
            ├── api/{facebook,instagram,linkedin,threads,tiktok,youtube,pinterest}.js → Social publishers
            ├── api/notion-webhook.js → Notion sync
            ├── api/sync.js → Data aggregation
            ├── hermes/ → Python MCP agent (Authority Silo Architect)
            └── supabase/functions/ → Edge functions
```

### Key Dependencies

| Repo | Depends On | How |
|------|------------|-----|
| `digitallydefined-online-local` | `DigitallyDefined-Dashboard` | HTTP redirect (`/dashboard` → `https://dashboard.digitallydefined.online`) |
| `DigitallyDefined-Dashboard` | `DigitallyDefined-Backend` | HTTP API calls (`lib/hermesClient.js` → `https://digitallydefined-os-backend.vercel.app/api/hermes`) |
| `DigitallyDefined-Dashboard` | Supabase | Auth, database (direct client connection) |
| `DigitallyDefined-Backend` | Supabase | Edge functions, database |
|| `DigitallyDefined-Backend` | OmniRoute | AI gateway (`lib/omniroute.js`, `supabase/functions/_shared/omniroute.ts`) ||
| `DigitallyDefined-Backend` | Social APIs | Facebook, Instagram, LinkedIn, Threads, TikTok, YouTube, Pinterest, Brevo, SendPulse |
| `DigitallyDefined-Backend` | Notion API | Content sync, webhooks |
| `DigitallyDefined-Backend` | AgentOps | AI monitoring (optional) |

## 3. Environment Variables

### Shared Variables (used across multiple repos)

| Variable | Used By | Purpose |
|----------|---------|---------|
| `SUPABASE_URL` | Frontend, Backend | Supabase project URL |
| `SUPABASE_ANON_KEY` | Frontend | Public anon key (client-side safe) |
| `SUPABASE_SERVICE_ROLE_KEY` | Backend | Service role key (server-side only, NEVER expose to frontend) |
| `DASHBOARD_API_KEY` | Frontend, Backend | API key for frontend → backend authentication |

### Frontend-Only Variables (`DigitallyDefined-Dashboard`)

| Variable | Purpose |
|----------|---------|
| `VITE_HERMES_GATEWAY_URL` | Backend Hermes endpoint URL |
| `VITE_DASHBOARD_API_URL` | Supabase Edge Functions URL |
| `VITE_DASHBOARD_API_KEY` | API key (mirrors `DASHBOARD_API_KEY`) |

### Backend-Only Variables (`DigitallyDefined-Backend`)

| Variable | Purpose |
|----------|---------|
| `OMNIROUTE_API_KEY` | Unified AI gateway key |
| `OMNIROUTE_BASE_URL` | OmniRoute endpoint (default: `https://omniroute.ai`) |
| `OMNIROUTE_MODEL` | Default model (default: `openai/gpt-4o-mini`) |
| `OMNIROUTE_FALLBACK_MODEL_1` | Fallback model 1 |
| `OMNIROUTE_FALLBACK_MODEL_2` | Fallback model 2 |
| `AGENTOPS_API_KEY` | AI monitoring (optional) |
| `NOTION_API_KEY` | Notion integration |
| `NOTION_*_DB_ID` | Notion database IDs (ideas, content, automations, etc.) |
| `FACEBOOK_GROUP_ID` | Facebook group ID |
| `FACEBOOK_ACCESS_TOKEN` | Facebook access token |
| `SENDPULSE_API_ID` | SendPulse API ID |
| `SENDPULSE_API_SECRET` | SendPulse API secret |
| `BREVO_API_KEY` | Brevo email API key |
| `SHEETS_WEBHOOK_URL` | Google Sheets webhook URL |
| `ANTIGRAVITY_API_KEY` | Antigravity API key (optional) |
| `GOOGLE_CLIENT_ID` | Google OAuth client ID |
| `GOOGLE_CLIENT_SECRET` | Google OAuth client secret |

### Marketing Site Variables (`digitallydefined-online-local`)

The marketing site currently has **no environment variables** — it's a static React app with no backend dependencies. All API calls (if any) would go through the frontend or backend.

### Variables That Can Be Removed (Legacy)

Once OmniRoute is confirmed working, these are no longer needed:

- `GROQ_API_KEY`
- `OPENROUTER_API_KEY`
- `OPENROUTER_MODEL`
- `OPENAI_API_KEY`
- `ANTHROPIC_API_KEY`
- `GOOGLE_API_KEY`
- `ZAI_API_KEY`
- `NOUS_API_KEY`

## 4. Deployment Order

1. **Backend** (`DigitallyDefined-Backend`) — Deploy first. The dashboard depends on it.
2. **Dashboard** (`DigitallyDefined-Dashboard`) — Deploy second. The marketing site redirects here.
3. **Marketing site** (`digitallydefined-online-local`) — Deploy last. Only depends on the dashboard URL for redirect.

## 5. Local Development

### Running All Three Locally

```bash
# Terminal 1: Marketing site
cd digitallydefined-online-local
npm run dev
# → http://localhost:5173

# Terminal 2: Dashboard app
cd DigitallyDefined-Dashboard
npm run dev
# → http://localhost:5174 (or next available port)

# Terminal 3: Backend (Vercel dev or direct)
cd DigitallyDefined-Backend
npx vercel dev
# → http://localhost:3000
```

### Environment Setup

Each repo needs its own `.env` file. Copy from the example files:

- Frontend (Dashboard): Create `.env.local` with Supabase + backend URL vars
- Backend: Create `.env` with OmniRoute, Notion, social API keys, Supabase keys
- Marketing site: No `.env` needed (currently)

> **Important:** The `.env.local` and `.env` files are in `.gitignore` and should never be committed.
