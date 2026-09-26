# DigitallyDefined Unified Platform

> **This is the Marketing Site repository** — the public-facing website at `https://digitallydefined.online`.

## What Is This?

This repository contains the **DigitallyDefined marketing website** — the public entry point for `digitallydefined.online`. It serves landing pages, SEO content, lead magnets, calculators, quizzes, and redirects authenticated users to the dashboard at `dashboard.digitallydefined.online`.

## Architecture Overview

The DigitallyDefined platform consists of **three independent git repositories** that are co-located in the same parent directory on the local filesystem. Each repo is deployed independently to Vercel and serves a distinct purpose.

```
c:\Users\frank\Documents\
├── digitallydefined-online-local/          ← THIS REPO (marketing site)
│   ├── src/                                ← Marketing site source code
│   ├── index.html
│   ├── vite.config.js
│   ├── package.json
│   └── vercel.json
├── DigitallyDefined-Dashboard/             ← Dashboard app (separate git repo)
│   ├── src/                                ← Dashboard source code
│   ├── api/                                ← Serverless API routes
│   ├── lib/                                ← Supabase client, Hermes client
│   ├── auth/                               ← Login/SignUp pages
│   └── vercel.json
└── DigitallyDefined-Backend/               ← Backend API (separate git repo)
    ├── api/                                ← API endpoints (Hermes, social, cron)
    ├── lib/                                ← AI router, OmniRoute, publishers
    ├── hermes/                             ← Python MCP agent
    ├── schemas/                            ← JSON schemas
    ├── agents/                             ← AI agents
    ├── supabase/                           ← Edge functions, migrations
    └── vercel.json
```

### The Three Repositories

| # | Local Folder | GitHub Repo | Vercel Project | Domain | Purpose |
|---|--------------|-------------|----------------|--------|---------|
| 1 | `digitallydefined-online-local` | `digitallydefined-online` | `digitallydefined-online` | `digitallydefined.online` | **Marketing site** — public-facing website |
| 2 | `DigitallyDefined-Dashboard` | `digitallydefined-reputation-dashboard` | `digitallydefined-reputation-dashboard` | `dashboard.digitallydefined.online` | **Dashboard app** — authenticated SaaS UI |
| 3 | `DigitallyDefined-Backend` | `digitallydefined-backend-clean` | `digitallydefined-backend-clean` | `digitallydefined-backend-clean.vercel.app` | **Backend API** — Hermes AI, cron jobs, social publishers, Notion sync |

> **Important naming note:** The folder `DigitallyDefined-Dashboard` was previously named `DigitallyDefined-Frontend`. This was renamed to clarify that it is the **dashboard application**, not the marketing site. The marketing site is `digitallydefined-online-local`. See [ARCHITECTURE.md](./ARCHITECTURE.md) for the full naming rationale.

## Quick Start (Marketing Site)

```bash
# Install dependencies
pnpm install

# Start development server
pnpm run dev

# Build for production
pnpm run build
```

The site will be available at `http://localhost:5173`.

## Deployment

This project is deployed to Vercel as the `digitallydefined-online` project. The `/dashboard` route automatically redirects to `https://dashboard.digitallydefined.online`.

For the complete deployment map, environment variable documentation, and inter-repo dependencies, see:

- **[DEPLOYMENT_MAP.md](./DEPLOYMENT_MAP.md)** — Which repo controls which domain, dependency chain, and environment variable reference
- **[ARCHITECTURE.md](./ARCHITECTURE.md)** — Naming conventions, repo responsibilities, and safe vs. risky changes

## Related Repositories

| Repo | Purpose | Docs |
|------|---------|------|
| `DigitallyDefined-Dashboard` | Authenticated dashboard at `dashboard.digitallydefined.online` | [README.md](../DigitallyDefined-Dashboard/README.md) |
| `DigitallyDefined-Backend` | Backend API at `digitallydefined-backend-clean.vercel.app` | [OMNIROUTE_INTEGRATION.md](../DigitallyDefined-Backend/OMNIROUTE_INTEGRATION.md) |

## License

Proprietary — All rights reserved © DigitallyDefined
