# DigitallyDefined Website — Quiz + Roadmap Integration

## Overview

This document explains how the Personalized Digital Superpower Quiz connects to the backend and Supabase Edge Functions.

## Personalization (local, deterministic)

Scoring and personalization run entirely in the browser — no AI provider is needed
to show a result:

- `features/quiz/lib/scoring.js` — weighted tally with fixed tie-breaks (q4/q7 count double)
- `features/quiz/lib/personalize.js` — strengths, blind spots, niches, build sequence from the answers
- `features/quiz/lib/quizLogic.js` — builds and persists the result in `localStorage` (`dd-quiz-results`)

The result is saved on every completion, so `/results`, `/roadmap` and `/dashboard`
always agree and an old persona can never stay stuck on screen.

## Architecture

```
Website (Vite + React)
    │
    ├── POST /api/hermes → quiz.complete action (delivery only)
    │   └── Supabase Edge Function (hermes/index.ts)
    │       ├── Receive name, email, superpower, answers, roadmap
    │       ├── Upsert website_leads in Supabase
    │       ├── (personalization already happened locally on the website)
    │       │   └── see features/quiz/lib/personalize.js
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
- 7 questions → scored locally by `scoreQuizDetailed()` (weighted, deterministic)
- Email capture → form submission

### 2. Quiz submission
- Calls `callSupabaseEdge('quiz.complete', { answers, name, email })`
- Backend edge function:
  1. Validates name, email and superpower
  2. Upserts `website_leads` row (email, name, tags)
  3. Stores the delivered result in `quiz_roadmaps`
  4. Sends the roadmap email via Brevo (non-fatal)
  5. Mirrors the completion into Notion (non-fatal)
  6. Returns { emailMode, emailSent }
  7. The website never blocks on this call — the result is already on screen

### 3. Results display
- Shows persona card (Builder/Creator/Educator/Connector/Strategist)
- Displays the locally personalized result (superpower, strengths, blind spots, niches, build sequence)
- Shows "Check your inbox" confirmation
- Links to `/quiz/inbox`, `/results` and `/roadmap/:type`

### 4. Confirmation page
- Route: `/quiz/inbox?email=...`
- Component: `QuizInbox.jsx`
- Shows email confirmation message
- Links back to dashboard or quiz

### 5. Dashboard roadmap view
- Route: `/roadmap` (personalized) and `/roadmap/:type` (shareable)
- Component: `features/roadmap/pages/RoadmapPage.jsx`
- Reads the saved result via `loadQuizResult()` (localStorage `dd-quiz-results`)
- Renders strengths, blind spots, niches, build sequence, tools and the next action

## API Routes

| Action | Method | Purpose |
|---|---|---|
| `quiz.complete` | POST | Store lead + result, send the roadmap email |
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
| `src/features/quiz/lib/scoring.js` | Rewritten — weighted deterministic scoring with fixed tie-breaks |
| `src/features/quiz/lib/personalize.js` | **NEW** — local personalization (no AI) |
| `src/features/quiz/lib/quizLogic.js` | **NEW** — result builder + `dd-quiz-results` storage + legacy healing |
| `src/features/quiz/components/QuizResultCard.jsx` | **NEW** — shared personalized result view |
| `src/features/quiz/pages/QuizPage.jsx` | Rebuilt — value-first flow, always persists the result |
| `src/features/quiz/pages/ResultsPage.jsx` | **NEW** — `/results` (and `/quiz/results`) |
| `src/features/roadmap/pages/RoadmapPage.jsx` | Rebuilt — supports `/roadmap/:type` |
| `src/features/quiz/api/quizApi.js` | AI personalization removed; email delivery kept as best effort |
| `src/App.jsx` | Routes: `/results`, `/quiz/results`, `/roadmap`, `/roadmap/:type` |
| `src/styles/global.css` | Brand-kit classes restored + quiz/result/roadmap components |
| `scripts/ssr-smoke.jsx` / `.mjs` | Fixed harness; renders lazy routes and asserts copy |
| `scripts/quiz-logic-check.mjs` | **NEW** — deterministic logic verification |

## Deploy

```bash
# 1. Deploy edge functions (already done)
supabase functions deploy quiz-submit
supabase functions deploy quiz-roadmap

# 2. Build and deploy website
npm run build
vercel --prod
```
