# Architecture & Naming Convention

## Why Three Separate Repos?

The DigitallyDefined platform uses **three independent git repositories**, each deployed to its own Vercel project. This separation is intentional and should be maintained.

### Reasons to Keep Them Separate

| Reason | Detail |
|--------|--------|
| **Different deployment targets** | Marketing site → `digitallydefined.online`; Dashboard → `dashboard.digitallydefined.online`; Backend → `digitallydefined-backend-clean.vercel.app` |
| **Different tech stacks** | Marketing: pure React/Vite; Dashboard: React/Vite + Supabase + serverless API; Backend: Node.js + Python (Hermes MCP) |
| **Different deployment frequency** | Marketing site changes rarely; dashboard changes moderately; backend changes frequently (cron jobs, API endpoints) |
| **Independent scaling** | Each can be scaled, monitored, and rolled back independently |
| **Different environment variables** | Each repo has its own set of secrets (API keys, OAuth tokens, etc.) |
| **Team separation** | Marketing content, dashboard UI, and backend automation can be worked on by different people |
| **Vercel project isolation** | Each Vercel project has its own build logs, analytics, and environment variables |

### Why NOT to Merge

- **Breaking deployment independence** — A bug in the backend would break the marketing site build
- **Different build configurations** — Marketing site uses simple Vite; backend uses Vercel Functions with Node.js + Python
- **Different dependency trees** — Backend has 15+ social API dependencies; marketing site has none
- **Different CI/CD needs** — Backend needs cron job scheduling; marketing site doesn't
- **Vercel project boundaries** — Each Vercel project maps to one git repo; merging would require a monorepo setup with complex Vercel configuration

## Naming Convention

### Current State

| Local Folder | GitHub Repo | Package Name | Actual Purpose |
|--------------|-------------|--------------|----------------|
| `digitallydefined-online-local` | `digitallydefined-online` | `digitallydefined-online` | **Marketing site** |
| `DigitallyDefined-Dashboard` | `digitallydefined-reputation-dashboard` | `digitallydefined-reputation-dashboard` | **Dashboard app** (NOT the marketing site) |
| `DigitallyDefined-Backend` | `digitallydefined-backend-clean` | `digitallydefined-backend-clean` | **Backend API** |

The name `DigitallyDefined-Frontend` was misleading because it sounded like it should be the main marketing frontend, but it's actually the authenticated dashboard application. The folder has been renamed to `DigitallyDefined-Dashboard` to resolve this confusion.

### Recommended Naming (Future)

If you were starting fresh, the ideal naming would be:

| Role | Local Folder | GitHub Repo | Vercel Project | Package Name |
|------|--------------|-------------|----------------|--------------|
| Marketing site | `dd-marketing-site` | `dd-marketing-site` | `dd-marketing-site` | `dd-marketing-site` |
| Dashboard app | `dd-dashboard` | `dd-dashboard` | `dd-dashboard` | `dd-dashboard` |
| Backend API | `dd-backend` | `dd-backend` | `dd-backend` | `dd-backend` |

### What to Actually Do Now (Safe Approach)

**Do NOT rename GitHub repos or Vercel projects.** Renaming these would:
- Break existing CI/CD pipelines
- Break bookmarks and documentation links
- Require re-importing projects in Vercel
- Risk losing environment variable configurations
- Break any external references

**Instead, standardize naming through documentation only:**

1. ✅ Add this ARCHITECTURE.md (done) — explains the naming rationale
2. ✅ Add root README.md (done) — clearly states this is the marketing site
3. ✅ Add DEPLOYMENT_MAP.md (done) — maps repos to domains and Vercel projects
4. ✅ Update `.gitignore` comments — clarify why sub-projects are excluded
5. ✅ Update each repo's README — reference the architecture docs

### Local Folder Rename (Optional)

You have already renamed the local folder from `DigitallyDefined-Frontend` to `DigitallyDefined-Dashboard`. This clarifies the filesystem structure without disrupting git remotes or Vercel projects.

## Repo Responsibility Map

### 1. `digitallydefined-online-local` — Marketing Site

**Responsibility:** Public-facing website at `digitallydefined.online`

**What it owns:**
- Landing pages (Home, Products, Pricing, About, Contact)
- SEO pillar content (AI tools guides, etc.)
- Lead generation tools (quiz, calculator, scorecard)
- `/dashboard` redirect to `dashboard.digitallydefined.online`
- Email capture and welcome sequence

**What it does NOT own:**
- User authentication
- Dashboard UI
- Backend API
- Database
- AI agents

**Key files:**
- `src/app.jsx` — Routing (all marketing routes + dashboard redirect)
- `src/pages/` — Individual page components
- `src/components/` — Shared components (SiteLayout, BrandNav, etc.)
- `src/styles/` — Global styles (brand system, soft brutalist aesthetic)
- `vercel.json` — Simple SPA rewrite to `index.html`

### 2. `DigitallyDefined-Dashboard` — Dashboard App

**Responsibility:** Authenticated SaaS dashboard at `dashboard.digitallydefined.online`

**What it owns:**
- User authentication (Supabase Auth: email/password, Google OAuth)
- Dashboard UI (events, workflows, quizzes, profile, settings)
- Serverless API routes (`api/dashboard/*`)
- Supabase client connection
- Hermes AI chat client (`lib/hermesClient.js`)
- Realtime subscriptions

**What it does NOT own:**
- Marketing content
- AI model logic (proxies to backend)
- Social media publishing
- Cron jobs
- Notion sync

**Key files:**
- `src/App.jsx` — Root component with auth-guarded routes
- `src/main.jsx` — Entry point with BrowserRouter
- `src/contexts/AuthContext.jsx` — Supabase auth state
- `src/components/` — ProtectedRoute, Layout
- `src/pages/` — Login, SignUp, Dashboard, Events, Workflows, Quiz, Profile, Settings
- `api/dashboard/` — Serverless functions for CRUD operations
- `lib/hermesClient.js` — Calls backend Hermes endpoint
- `lib/supabase.ts` — Supabase client
- `vercel.json` — Build config with API routes and env vars

### 3. `DigitallyDefined-Backend` — Backend API

**Responsibility:** API layer at `digitallydefined-backend-clean.vercel.app`

**What it owns:**
- Hermes AI agent (Node.js + Python MCP)
- OmniRoute AI gateway client (`lib/omniroute.js`)
- Social media publishers (Facebook, Instagram, LinkedIn, Threads, TikTok, YouTube, Pinterest)
- Cron jobs (daily followup, post-publisher)
- Notion sync and webhooks
- Email marketing (Brevo, SendPulse)
- Google Sheets integration
- Antigravity automation
- Supabase Edge Functions
- JSON schemas for content silos

**What it does NOT own:**
- Frontend UI
- Marketing content
- User-facing authentication pages

**Key files:**
- `api/index.js` — Unified API router (1340 lines, handles all actions)
- `api/hermes.js` — Hermes AI handler with CORS
- `api/cron/` — Scheduled jobs
- `api/{facebook,instagram,...}.js` — Social publishers
- `lib/omniroute.js` — Unified AI gateway client
- `lib/social-publishers.js` — Social media publishing logic
- `lib/notion-client.js` — Notion API client
- `hermes/` — Python MCP agent (Authority Silo Architect)
- `schemas/` — JSON schemas for funnel stages
- `agents/` — AI agent implementations
- `vercel.json` — Cron jobs + CORS headers

## Safe Cleanup Actions

### ✅ Do These (Low Risk, High Value)

1. **Add documentation files** (already done):
   - `README.md` in root (marketing site)
   - `DEPLOYMENT_MAP.md` in root
   - `ARCHITECTURE.md` in root (this file)

2. **Update `.gitignore` comments** in `digitallydefined-online-local`:
   ```
   # Exclude sub-projects (they have their own git repos)
   # - DigitallyDefined-Dashboard: Dashboard app (dashboard.digitallydefined.online)
   # - DigitallyDefined-Backend: Backend API (digitallydefined-backend-clean.vercel.app)
   DigitallyDefined-Backend/
   DigitallyDefined-Dashboard/
   ```

3. **Add architecture reference to each repo's README**:
   - In `DigitallyDefined-Dashboard/README.md`: Add link to root `ARCHITECTURE.md`
   - In `DigitallyDefined-Backend/OMNIROUTE_INTEGRATION.md`: Add link to root `DEPLOYMENT_MAP.md`

4. **Clean up legacy environment variables** (once OmniRoute is confirmed):
   - Remove `GROQ_API_KEY`, `OPENROUTER_API_KEY`, `OPENAI_API_KEY`, etc. from Vercel
   - Remove them from `.env` files

5. **Fix ChatWidget duplication**: Removed ChatWidget from BrandNav to prevent double rendering on every page. ChatWidget now renders once via SiteLayout.

6. **Ensure consistent SiteLayout usage**: Fixed StartHere.jsx and Tools.jsx to wrap content in SiteLayout, ensuring header/nav/footer appear consistently across all marketing pages.

7. **Apply brand system globally**: `src/styles/global.css` defines the DigitallyDefined brand colors, fonts, and soft-brutalist UI standard. All components should use these design tokens.

### ⚠️ Do These With Caution

8. **VS Code workspace file** may need updating if you use multi-root workspace with the new folder name.

9. **Local development scripts** that reference the old folder path need updating.

### ❌ Do NOT Do These (High Risk, Low Value)

1. **Renaming GitHub repos** — Breaks CI/CD, bookmarks, documentation links, and requires re-importing in Vercel.

2. **Renaming Vercel projects** — Breaks deployment hooks, environment variable configurations, and analytics history.

3. **Merging repos into a monorepo** — Would require complete rebuild of Vercel configurations, different build commands, complex path aliases, and risks breaking all three deployments simultaneously.

4. **Moving code between repos** — Would break import paths, serverless function routing, module imports, and Vercel function routing.

5. **Changing the `/dashboard` redirect** — The marketing site's redirect to `dashboard.digitallydefined.online` is the correct architecture. Don't make the dashboard part of the marketing site repo.

## Summary

**Keep 3 repos. Keep them separate. Document the naming clearly.**

The architecture is sound. The misleading name `DigitallyDefined-Frontend` has been resolved through documentation and the local folder has been renamed to `DigitallyDefined-Dashboard`. The three documentation files created/updated in this audit (`README.md`, `DEPLOYMENT_MAP.md`, `ARCHITECTURE.md`) will prevent future confusion. All marketing pages now share a unified SiteLayout with consistent header, footer, and brand styling. The ChatWidget duplication issue has been fixed, and CTO best practices (clear CTAs, fast load times, mobile-first responsive design) are maintained.
