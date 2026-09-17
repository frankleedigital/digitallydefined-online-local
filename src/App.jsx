import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import SiteLayout from './components/Layout/SiteLayout.jsx';
import RequireUnlock from './components/RequireUnlock.jsx';

// Public flow: home -> quiz -> results -> roadmap -> dashboard -> tools
import HomePage from './features/home/pages/HomePage.jsx';
import QuizPage from './features/quiz/pages/QuizPage.jsx';
import QuizInboxPage from './features/quiz/pages/QuizInboxPage.jsx';
import RoadmapPage from './features/roadmap/pages/RoadmapPage.jsx';

// Unlocked after quiz completion
import DashboardPage from './features/dashboard/pages/DashboardPage.jsx';
import ToolsPage from './features/tools/pages/ToolsPage.jsx';
import NicheTool from './features/tools/niche/NicheTool.jsx';
import RoadmapTool from './features/tools/roadmap/RoadmapTool.jsx';
import ProductTool from './features/tools/product/ProductTool.jsx';
import SocialTool from './features/tools/social/SocialTool.jsx';
import TrendsTool from './features/tools/trends/TrendsTool.jsx';

function guarded(element) {
  return <SiteLayout><RequireUnlock>{element}</RequireUnlock></SiteLayout>;
}

function App() {
  return (
    <Routes>
      {/* Public funnel */}
      <Route path="/" element={<SiteLayout><HomePage /></SiteLayout>} />
      <Route path="/quiz" element={<SiteLayout><QuizPage /></SiteLayout>} />
      <Route path="/quiz/inbox" element={<SiteLayout><QuizInboxPage /></SiteLayout>} />

      {/* Personalized roadmap (post-quiz) */}
      <Route path="/roadmap" element={guarded(<RoadmapPage />)} />
      <Route path="/quiz/results" element={guarded(<RoadmapPage />)} />

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
  );
}

export default App;


