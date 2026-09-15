# API Routing — Quiz + Roadmap System

## Routes

### Website Routes (React Router)

| Route | Component | Purpose |
|---|---|---|
| `/quiz` | `DigitalSuperpowerQuiz` | Main quiz flow (intro → questions → email → results) |
| `/quiz/inbox` | `QuizInbox` | Confirmation page after quiz submission |
| `/dashboard` | `DashboardPage` | Dashboard entry point |
| `/dashboard/roadmap` | `DashboardRoadmap` | View stored roadmap by email |
| `/tool/roadmap` | `RoadmapGenerator` | Standalone roadmap generator tool |
| `/tool/scorecard` | `NicheProfitabilityScorecard` | Niche scorecard tool |

### Supabase Edge Function Actions

| Action | HTTP | Handler | Purpose |
|---|---|---|---|
| `quiz.complete` | POST | `hermes/index.ts` | Submit quiz, generate roadmap, send email |
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
User → /quiz → answers questions → submit email
         ↓
    callSupabaseEdge('quiz.complete', {...})
         ↓
    hermes edge function:
      1. scoreQuiz(answers) → persona
      2. upsertLead({email, name, tags})
      3. callOmniRoute(prompt) → roadmap JSON
      4. storeRoadmap({email, roadmap})
      5. sendBrevoEmail({...})
      6. return result
         ↓
    Website shows results page
         ↓
    User clicks "Check your inbox" → /quiz/inbox
    User clicks "View dashboard" → /dashboard/roadmap?email=...
         ↓
    Dashboard fetches roadmap:
      callSupabaseEdge('quiz.roadmap', {email})
         ↓
    Returns stored roadmap JSON
         ↓
    Renders roadmap display
```

## Error Handling

| Error | Cause | Recovery |
|---|---|---|
| `Missing quiz answers` | Empty answers object | Prompt user to complete quiz |
| `Invalid email` | Malformed email format | Show validation error |
| `AI provider failed` | OmniRoute + Gemini both down | Show error, allow retry |
| `Email send failed` | Brevo unavailable | Non-fatal — roadmap still stored |
| `No roadmap found` | Email not in database | Prompt to retake quiz |
