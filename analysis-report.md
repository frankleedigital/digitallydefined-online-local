# DigitallyDefined Online — Website Analysis Report

> Generated: 2026-09-19
> Repository: `digitallydefined-online-local`
> Live: https://digitallydefined.online

---

## 1. What This Website Does

DigitallyDefined is a **marketing + lead-generation site** targeting **Gen X women** who want to build **faceless digital assets** for retirement income. The site funnels visitors through a structured journey:

| Step | Purpose |
|------|---------|
| **Homepage** | Explains the promise; directs visitors to the quiz |
| **Quiz** | 7-question "Digital Superpower" assessment (collects name + email) |
| **Roadmap** | Personalized 3-phase build sequence based on quiz result |
| **Dashboard** | Private workspace gated by localStorage quiz completion |
| **Tools** | 5 AI-powered tools (Scorecard, Roadmap Builder, Product Designer, Social Content, Trends Explorer) |
| **Hermes Chat** | Floating AI mentor widget available on every page |

The site stores all user state in **localStorage** (no authentication). After quiz completion, a `dd-quiz-results` object is saved, gating access to `/dashboard`, `/tools/*`, `/roadmap`.

**Three-repo architecture** (per README):
- `digitallydefined-online-local` → Marketing site (this repo)
- `DigitallyDefined-Dashboard` → Authenticated dashboard
- `DigitallyDefined-Backend` → API, Hermes AI, social publishers

---

## 2. What's Working Well ✅

### 2.1 Core User Flow
- **Quiz → Roadmap → Dashboard → Tools** is a clean, logical funnel
- All pages route correctly through React Router v7 with proper `lazy()` loading
- Gating works: unauthenticated users are redirected to `/quiz` via `RequireUnlock` + `Navigate`

### 2.2 Design System
- **Soft Brutalism** aesthetic is consistent: 1px black borders, 0px border-radius, hard shadows, orange (#F18B25) + aqua (#47B7D4) palette
- `global.css` (~1,200 lines) is comprehensive and well-organized
- Typography: Inter (headings) + DM Sans (body) + Playfair Display (serif accents)
- Mobile responsive with proper breakpoints at 768px and 600px

### 2.3 Static Quiz Roadmaps
- 5 personas (Creator, Builder, Educator, Connector, Strategist) with full roadmap data in `roadmapData.js`
- Local scoring logic in `scoring.js` works without backend
- Roadmap page (`RoadmapPage.jsx`) renders strengths, challenges, niches, and build steps

### 2.4 Niche Profitability Scorecard
- `/tools/niche` is a fully functional interactive tool
- 6 criteria scoring (demand, competition, monetization, sustainability, ease, privacy fit)
- Calls backend AI for interpretation (`callAgent('scorecard', ...)`)
- Visual tier display (A/B/C/D) with color coding

### 2.5 Analytics Pipeline
- Page views tracked via `initTracking()` + `trackPageView()` on route changes
- Quiz start/completion events tracked
- Buffered flush to backend (8-event queue, 30s interval, beacon fallback)
- Session IDs stored in localStorage

### 2.6 AI Mentor (Hermes)
- `MentorWidget` is a sophisticated floating chat component
- Idle detection (25s timeout) triggers popup
- Scroll-aware: hides toggle while scrolling down
- Typing indicator, dev mode detection, error handling
- Status polling via `useHermesStatus` (30s interval)
- Connected to Supabase Edge Function at `/functions/v1/hermes`

### 2.7 SSR Fallback
- `index.html` includes inline static HTML fallback visible before React hydrates
- Improves SEO and first paint; fades out after hydration via `#root.hydrated`

### 2.8 Dynamic Content System
- `useSiteContent` hook fetches overrides from Supabase (`website.content` action)
- 5-minute session cache with TTL
- Graceful fallback to hardcoded defaults

### 2.9 Architecture Documentation
- `ARCHITECTURE.md`, `DEPLOYMENT_MAP.md`, `README.md` are thorough and clear
- Three-repo separation is well-documented with rationale

---

## 3. What's Broken or Needs Attention ⚠️

### 3.1 [BUG] Duplicate AI Chat Interface
**Location:** `SiteLayout.jsx` + `ChatWidget.jsx` + `MentorWidget.jsx`

The site renders **THREE** chat interfaces:
1. `ChatWidget` (hardcoded in `SiteLayout.jsx`) — calls `callSupabaseEdge('public.chat', ...)` with `userId: 'website-user'` (static, no personalization)
2. `MentorWidget` (imported but **NOT rendered** in `SiteLayout.jsx`) — the sophisticated Hermes chat with idle detection, typing indicator, dev mode, etc.
3. `AiMentorChatBox` (exists but unused in layout)

**Result:** Users see the basic `ChatWidget` ("AI Planning Guide") instead of the advanced `MentorWidget` ("Hermes"). The advanced widget is imported in the codebase but never mounted.

**Fix:** Replace `<ChatWidget />` in `SiteLayout.jsx` with `<MentorWidget />` or remove `ChatWidget` entirely if `MentorWidget` is the intended primary.

---

### 3.2 [BUG] Empty/Stub Tool Pages
**Location:** `src/features/tools/`

Four of five tools are nearly empty stubs:

| Tool | File | Status |
|------|------|--------|
| Niche Tool | `NicheTool.jsx` | ✅ **Working** — full UI + backend call |
| Roadmap Tool | `RoadmapTool.jsx` | ❌ ~14 lines, placeholder |
| Product Tool | `ProductTool.jsx` | ❌ ~13 lines, placeholder |
| Social Tool | `SocialTool.jsx` | ❌ ~13 lines, placeholder |
| Trends Tool | `TrendsTool.jsx` | ❌ ~13 lines, placeholder |

The tools listed in `ToolsPage.jsx` claim these exist, but clicking them leads to empty pages. The backend endpoints (`/roadmap`, `/product`, `/social`, `/trends`) exist in `backend.js` but have no frontend UI.

**Fix:** Implement the four stub tools or update `ToolsPage.jsx` to only show working tools.

---

### 3.3 [BUG] Duplicate CSS in `global.css`
**Location:** `src/styles/global.css`

The file contains **multiple overlapping theme systems**:
- Original "Soft Brutalism" tokens (`--color-bg`, `--color-accent`, etc.)
- Second block redefines `.brand-nav`, `.btn`, `.card` with different styles
- Third block adds "Premium Brand System v2" with serif fonts, aqua/orange/red colors
- Fourth block adds "DD Design System" utilities (`.dd-container`, `.dd-card`, etc.)
- Fifth block adds "Niche Scanner" styles
- Sixth block adds tool-specific styles

**Result:** Conflicting styles, specificity wars, inconsistent appearance. For example:
- `.btn` is defined 3 times with different rules
- `.brand-nav__inner` has 2 competing definitions
- Color tokens are duplicated (`--color-bg` vs `--color-lemon` vs `--color-panel`)

**Fix:** Consolidate into a single design system file. The "Premium Brand System v2" changes (serif headings, italic accents, new color palette) appear to be work-in-progress and conflict with the established Soft Brutalism style.

---

### 3.4 [BUG] Theme Config Parsing Error
**Location:** `src/config/theme.js`

```javascript
export const tokens = {
  palette: {
    // ...
    "success": "#16A34A",
    "gold": "#EAB308",
    "pointer",  // ← INVALID: missing colon and value
  },
  fontFamily: theme.fonts.body,  // ← Reference to `theme` before it's defined
};
```

This will cause a **runtime JavaScript error** when the module loads, potentially breaking the entire app if `theme.js` is imported during hydration.

**Fix:** Remove the invalid `"pointer"` key and fix the circular reference.

---

### 3.5 [BUG] ChatWidget Calls Wrong Endpoint
**Location:** `ChatWidget.jsx` line ~50

```javascript
const data = await callSupabaseEdge('public.chat', {
  message: userMsg.content,
  userId: 'website-user'  // ← Hardcoded static user ID
});
```

Unlike `MentorWidget` which passes user context, tool state, and page info, this widget sends a hardcoded `userId: 'website-user'`. This means:
- No personalization
- No conversation history
- No tool-aware responses

---

### 3.6 [WARN] Missing Email Integration Verification
**Location:** `QuizPage.jsx` + `quizApi.js`

The quiz collects email and claims to send a personalized roadmap email ("✓ Check your inbox for the personalized roadmap email"), but:
- `submitQuiz` calls `callSupabaseEdge('quiz.complete', ...)` 
- The welcome sequence email (`email/welcome-sequence.md`) exists as documentation but there's no visible confirmation in the UI that email was actually sent
- No error handling if email fails (only catches DB save failure)

**Recommendation:** Add a visible "Email sent ✓" confirmation or a fallback message if the email service is down.

---

### 3.7 [WARN] Facebook Community URL May Be Broken
**Location:** `HomePage.jsx` + `BrandNav.jsx`

```javascript
const COMMUNITY_URL = 'https://facebook.com/groups/digitallydefind';  // Note: "defind" not "defined"
```

The URL uses `digitallydefind` (missing 'e'). This may be intentional (a typo in the group name) or a bug. The `BrandNav.jsx` also references this URL.

**Recommendation:** Verify the correct Facebook Group URL.

---

### 3.8 [WARN] localStorage Gating is Weak
**Location:** All gated pages (`DashboardPage`, `RoadmapPage`, `ToolsPage`, individual tools)

Access control is purely client-side:
```javascript
if (!stored) {
  return <Navigate to="/quiz" replace />;
}
```

**Problem:** Anyone who knows the URL can see the content if they manipulate localStorage (or if they previously completed the quiz on the same device). There's no server-side validation.

**Recommendation:** This is acceptable for a marketing funnel (low-risk content), but be aware that "gated" content is not truly private.

---

### 3.9 [WARN] No Favicon
**Location:** `index.html`

```html
<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
```

The `favicon.svg` file is referenced but may not exist in the public directory. Check that `public/favicon.svg` exists.

---

### 3.10 [WARN] Open Graph Image May Be Missing
**Location:** `index.html`

```html
<meta property="og:image" content="https://digitallydefined.online/og-image.png" />
```

Verify that `public/og-image.png` exists and is the correct size (recommended: 1200x630px).

---

## 4. Architecture Notes

### 4.1 Backend Integration
The site calls two backend services:
1. **Supabase Edge Functions** (`https://dijjlppdljpcgyoakdnq.supabase.co/functions/v1/hermes`)
   - Actions: `quiz.complete`, `intelligence`, `quiz.roadmap`, `public.chat`, `website.content`
   - Used for: quiz submission, AI personalization, chat, dynamic content
   
2. **Vercel Backend API** (`https://digitallydefined-backend-clean.vercel.app/api`)
   - Endpoints: `/niche`, `/roadmap`, `/scorecard`, `/product`, `/social`, `/trends`, `/chat`, `/dashboard`
   - Used for: tool calculations, AI agent calls

Both require `VITE_DASHBOARD_API_KEY` for authentication (checked in `appConfig.js`).

### 4.2 State Management
- **Quiz results:** `localStorage.dd-quiz-results`
- **Tool state:** `localStorage.dd-tool-state`
- **Site content:** `sessionStorage.dd_site_content_cache` (5-min TTL)
- **Analytics session:** `localStorage.dd_session_id`

All state is client-side only. No server sessions.

---

## 5. Priority Recommendations

| Priority | Issue | Impact | Effort |
|----------|-------|--------|--------|
| 🔴 High | Replace `ChatWidget` with `MentorWidget` in `SiteLayout` | Users see wrong chat interface | Low |
| 🔴 High | Fix `theme.js` parsing error | Potential app crash on load | Low |
| 🔴 High | Implement missing tool pages (roadmap, product, social, trends) | Tools page shows broken links | Medium |
| 🟡 Medium | Consolidate `global.css` duplicates | Maintenance nightmare, inconsistent styles | High |
| 🟡 Medium | Verify Facebook community URL | Broken link in nav + homepage | Low |
| 🟡 Medium | Add email sent confirmation in quiz results | User uncertainty | Low |
| 🟢 Low | Verify favicon.svg exists | Missing favicon | Low |
| 🟢 Low | Verify og-image.png exists | Poor social sharing preview | Low |

---

## 6. Quick Wins (5 Minutes)

1. **Fix ChatWidget:** Edit `src/components/Layout/SiteLayout.jsx`, replace `<ChatWidget />` with `<MentorWidget />`
2. **Fix theme.js:** Remove `"pointer"` line and fix circular reference
3. **Verify URLs:** Check Facebook group URL and favicon/OG image files

---

*Report generated by Agnes Code Analysis*
