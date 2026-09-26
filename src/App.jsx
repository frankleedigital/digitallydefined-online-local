import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import SiteLayout from './components/Layout/SiteLayout.jsx';
import RequireUnlock from './components/RequireUnlock.jsx';

const HomePage = lazy(() => import('./features/home/pages/HomePage.jsx'));
const QuizPage = lazy(() => import('./features/quiz/pages/QuizPage.jsx'));
const ResultsPage = lazy(() => import('./features/quiz/pages/ResultsPage.jsx'));
const QuizInboxPage = lazy(() => import('./features/quiz/pages/QuizInboxPage.jsx'));
const RoadmapPage = lazy(() => import('./features/roadmap/pages/RoadmapPage.jsx'));
const DashboardPage = lazy(() => import('./features/dashboard/pages/DashboardPage.jsx'));
const ToolsPage = lazy(() => import('./features/tools/pages/ToolsPage.jsx'));
const NicheTool = lazy(() => import('./features/tools/niche/NicheTool.jsx'));
const RoadmapTool = lazy(() => import('./features/tools/roadmap/RoadmapTool.jsx'));
const ProductTool = lazy(() => import('./features/tools/product/ProductTool.jsx'));
const SocialTool = lazy(() => import('./features/tools/social/SocialTool.jsx'));
const TrendsTool = lazy(() => import('./features/tools/trends/TrendsTool.jsx'));

// New pages
const StartHerePage = lazy(() => import('./pages/StartHerePage.jsx'));
const BuilderPage = lazy(() => import('./pages/BuilderPage.jsx'));
const EmpirePage = lazy(() => import('./pages/EmpirePage.jsx'));
const FrameworkPage = lazy(() => import('./pages/FrameworkPage.jsx'));
const RetirementGapPage = lazy(() => import('./pages/RetirementGapPage.jsx'));

function guarded(element) {
  return <SiteLayout><RequireUnlock>{element}</RequireUnlock></SiteLayout>;
}

function App() {
  return (
    <Suspense fallback={<div style={{ minHeight: '60vh', display: 'grid', placeItems: 'center', color: 'var(--color-text-muted)' }}>Loading…</div>}>
      <Routes>
        {/* Public funnel */}
        <Route path="/" element={<SiteLayout><HomePage /></SiteLayout>} />
        <Route path="/start-here" element={<SiteLayout><StartHerePage /></SiteLayout>} />
        <Route path="/quiz" element={<SiteLayout><QuizPage /></SiteLayout>} />
        <Route path="/quiz/inbox" element={<SiteLayout><QuizInboxPage /></SiteLayout>} />

        {/* Results — reads localStorage, never route state */}
        <Route path="/results" element={<SiteLayout><ResultsPage /></SiteLayout>} />

        {/* Plan pages */}
        <Route path="/builder" element={<SiteLayout><BuilderPage /></SiteLayout>} />
        <Route path="/empire" element={<SiteLayout><EmpirePage /></SiteLayout>} />

        {/* Explainer / framework pages */}
        <Route path="/framework" element={<SiteLayout><FrameworkPage /></SiteLayout>} />
        <Route path="/retirement-gap" element={<SiteLayout><RetirementGapPage /></SiteLayout>} />

        {/* Personalized roadmap (post-quiz) + shareable persona roadmaps */}
        <Route path="/roadmap" element={guarded(<RoadmapPage />)} />
        <Route path="/roadmap/:type" element={<SiteLayout><RoadmapPage /></SiteLayout>} />
        <Route path="/quiz/results" element={guarded(<ResultsPage />)} />

        {/* Private workspace + tools (unlocked after quiz) */}
        <Route path="/dashboard" element={guarded(<DashboardPage />)} />
        <Route path="/tools" element={guarded(<ToolsPage />)} />
        <Route path="/tools/niche" element={guarded(<NicheTool />)} />
        <Route path="/tools/roadmap" element={guarded(<RoadmapTool />)} />
        <Route path="/tools/product" element={guarded(<ProductTool />)} />
        <Route path="/tools/social" element={guarded(<SocialTool />)} />
        <Route path="/tools/trends" element={guarded(<TrendsTool />)} />
        <Route path="/scorecard" element={guarded(<NicheTool />)} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
}

export default App;


