# API Routing — Quiz + Roadmap System

## Routes

### Website Routes (React Router)

| Route | Component | Purpose |
|---|---|---|
| `/quiz` | `features/quiz/pages/QuizPage.jsx` | Quiz flow: intro → questions → personalized result → optional email |
| `/quiz/inbox` | `features/quiz/pages/QuizInboxPage.jsx` | Confirmation page after quiz submission |
| `/dashboard` | `features/dashboard/pages/DashboardPage.jsx` | Dashboard entry point |
| `/results` | `features/quiz/pages/ResultsPage.jsx` | Personalized result — reads the saved result, never route state |
| `/quiz/results` | `features/quiz/pages/ResultsPage.jsx` | Legacy alias of `/results` (kept for old links) |
| `/roadmap` | `features/roadmap/pages/RoadmapPage.jsx` | Personalized roadmap from the saved result (requires the quiz) |
| `/roadmap/:type` | `features/roadmap/pages/RoadmapPage.jsx` | Shareable roadmap for one superpower (builder/creator/educator/strategist/connector) |
| `/tools` | `features/tools/pages/ToolsPage.jsx` | Tool launcher (requires the quiz) |

### Supabase Edge Function Actions

| Action | HTTP | Handler | Purpose |
|---|---|---|---|
| `quiz.complete` | POST | `hermes/index.ts` | Store lead + result, send the roadmap email (no AI) |
| `quiz.roadmap` | GET | `hermes/index.ts` | Fetch stored roadmap by email |

### Clean Backend Routes (for reference)

| Route | Method | Handler | Purpose |
|---|---|---|---|
| `/api/niche` | POST | `niche.js` | Niche analysis agent |
| `/api/roadmap` | POST | `roadmap.js` | Roadmap generation agent |
| `/api/scorecard` | POST | `scorecard.js` | Scorecard agent |
| `/api/product` | POST | `product.js` | Product generation agent |
| `/api/social` | POST | `social.js` | Social content agent |
| `/api/trends` | POST | `trends.js` | Trends analysis agent |
| `/api/chat` | POST | `chat.js` | Conversational AI |
| `/api/dashboard` | POST | `dashboard.js` | Dashboard data fetch |

## Request/Response Schemas

### quiz.complete (POST)
```json
// Request
{
  "action": "quiz.complete",
  "answers": { "q1": "builder", "q2": "creator", ... },
  "name": "Jane Doe",
  "email": "jane@example.com"
}

// Response
{
  "success": true,
  "persona": "builder",
  "confidence": 0.57,
  "profile": { "superpowerName": "Digital Architect", ... },
  "roadmap": { "title": "...", "steps": [...], "next3Steps": [...] },
  "emailSent": true,
  "roadmapId": "uuid"
}
```

### quiz.roadmap (GET)
```json
// Request
GET /functions/v1/hermes?action=quiz.roadmap&email=jane@example.com

// Response
{
  "success": true,
  "roadmap": { "title": "...", "steps": [...], ... },
  "superpower": "builder",
  "createdAt": "2026-09-15T00:55:00Z"
}
```

## Data Flow

```
User → /quiz → answers seven questions → scored on the device
         ↓
    buildQuizResult({ answers })  — features/quiz/lib/quizLogic.js
         ↓
    local scoring + personalization (no AI, no network):
      1. weighted tally + fixed tie-breaks → superpower
      2. strengths, blind spots, best-fit niches
      3. personalized build sequence + next action
      4. save to localStorage (dd-quiz-results) — always, not only on AI success
      5. optional: deliver the same roadmap by email (quiz.complete, best effort)
      6. return the saved result to /results and /roadmap
         ↓
    Website shows the personalized result page
         ↓
    User clicks "Check your inbox" → /quiz/inbox
    User clicks "Open my roadmap" → /roadmap/:type or /roadmap
         ↓
    /roadmap and /results read the same saved result:
      loadQuizResult() — features/quiz/lib/quizLogic.js
         ↓
    Returns the saved personalized result
         ↓
    Renders the personalized roadmap (plus public /roadmap/:type previews)
```

## Error Handling

| Error | Cause | Recovery |
|---|---|---|
| `Missing quiz answers` | Empty answers object | Prompt user to complete quiz |
| `Invalid email` | Malformed email format | Show validation error |
| `No saved result` | Quiz not finished on this device | `/results` and `/roadmap` show an honest empty state with a link to `/quiz` |
| `Email send failed` | Brevo / edge unavailable | Non-fatal — the result is already on screen and saved locally |
| `No roadmap found` | Email not in database | Prompt to retake quiz |
