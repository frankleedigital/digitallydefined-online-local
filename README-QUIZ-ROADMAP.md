# DigitallyDefined Website — Quiz + Roadmap Integration

## Overview

This document explains how the Personalized Digital Superpower Quiz connects to the backend and Supabase Edge Functions.

## Architecture

```
Website (Vite + React)
    │
    ├── POST /api/hermes → quiz.complete action
    │   └── Supabase Edge Function (hermes/index.ts)
    │       ├── Score quiz answers (scoreQuiz)
    │       ├── Upsert website_leads in Supabase
    │       ├── Call AI (OmniRoute → Gemini fallback)
    │       │   └── Generate personalized roadmap JSON
    │       ├── Store quiz_roadmaps in Supabase
    │       ├── Send email via Brevo
    │       └── Return { persona, confidence, roadmap, emailSent }
    │
    └── GET /api/hermes → quiz.roadmap action
        └── Supabase Edge Function (hermes/index.ts)
            └── Fetch stored roadmap by email
                └── Return roadmap JSON
```

## Quiz Flow

### 1. User takes the quiz
- Route: `/quiz`
- Component: `DigitalSuperpowerQuiz.jsx`
- 7 questions → scoring via `scoreQuiz()` (majority vote)
- Email capture → form submission

### 2. Quiz submission
- Calls `callSupabaseEdge('quiz.complete', { answers, name, email })`
- Backend edge function:
  1. Scores quiz (deterministic, no AI)
  2. Upserts `website_leads` row (email, name, tags)
  3. Builds prompt for AI roadmap generation
  4. Calls OmniRoute (primary) → Gemini fallback
  5. Stores roadmap in `quiz_roadmaps` table
  6. Sends email via Brevo (async, non-fatal)
  7. Returns result with persona, confidence, roadmap preview

### 3. Results display
- Shows persona card (Builder/Creator/Educator/Connector/Strategist)
- Displays AI-generated roadmap steps
- Shows "Check your inbox" confirmation
- Links to `/quiz/inbox` and `/dashboard/roadmap`

### 4. Confirmation page
- Route: `/quiz/inbox?email=...`
- Component: `QuizInbox.jsx`
- Shows email confirmation message
- Links back to dashboard or quiz

### 5. Dashboard roadmap view
- Route: `/dashboard/roadmap?email=...`
- Component: `DashboardRoadmap.jsx`
- Fetches stored roadmap via `quiz.roadmap` action
- Renders roadmap steps, next 3 steps, recommended tool, CTA

## API Routes

| Action | Method | Purpose |
|---|---|---|
| `quiz.complete` | POST | Submit quiz, generate roadmap, send email |
| `quiz.roadmap` | GET | Fetch stored roadmap for email |

## Supabase Tables

| Table | Purpose |
|---|---|
| `website_leads` | Stores quiz taker contact info (upsert on email+source) |
| `quiz_roadmaps` | Stores generated roadmap JSON (email, persona, roadmap, answers) |

## Environment Variables (website)

```bash
VITE_SUPABASE_URL=https://dijjlppdljpcgyoakdnq.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
VITE_DASHBOARD_API_KEY=your-api-key
```

## Supabase Secrets (edge function)

```bash
OMNIROUTE_API_KEY      # OmniRoute gateway JWT
OMNIROUTE_URL          # http://45.79.180.236:20128/v1 (or tunnel URL)
GEMINI_API_KEY         # Fallback AI provider
BREVO_API_KEY          # Email delivery
SUPABASE_SERVICE_ROLE_KEY  # Database writes
```

## Files Modified

| File | Change |
|---|---|
| `src/pages/Quiz/DigitalSuperpowerQuiz.jsx` | Added inbox/dashboard links after results |
| `src/pages/Quiz/QuizInbox.jsx` | **NEW** — confirmation page |
| `src/pages/Dashboard/DashboardPage.jsx` | **NEW** — dashboard entry |
| `src/pages/Dashboard/DashboardRoadmap.jsx` | **NEW** — roadmap viewer |
| `src/App.jsx` | Added routes for new pages |

## Deploy

```bash
# 1. Deploy edge functions (already done)
supabase functions deploy quiz-submit
supabase functions deploy quiz-roadmap

# 2. Build and deploy website
npm run build
vercel --prod
```
