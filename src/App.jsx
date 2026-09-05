import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Quiz from './pages/Quiz/DigitalSuperpowerQuiz';
import NicheDiscovery from './pages/Tools/NicheDiscovery';
import RoadmapGenerator from './pages/Tools/RoadmapGenerator';
import Scorecard from './pages/Scorecard/NicheProfitabilityScorecard';
import Trends from './pages/Tools/Trends';
import Product from './pages/Tools/Product';
import Social from './pages/Tools/Social';
import MentorTopicWrapper from './components/Mentor/MentorTopicWrapper.jsx';

function ExternalRedirect({ to }) {
  useEffect(() => {
    window.location.href = to;
  }, [to]);
  return null;
}

/**
 * DigitallyDefined — lightweight single-page launcher.
 *
 * Primary surface: the `/` launcher (Hero → Tools → Case Study → CTA).
 * Each tool opens in its own minimal `/tool/*` route. Legacy paths redirect
 * so existing in-page CTAs never dead-end.
 */
function App() {
  const tool = (topic, el) => <MentorTopicWrapper topic={topic}>{el}</MentorTopicWrapper>;

  return (
    <Routes>
      {/* Launcher */}
      <Route path="/" element={tool('home', <Home />)} />

      {/* Quiz */}
      <Route path="/quiz" element={tool('quiz', <Quiz />)} />

      {/* Tools */}
      <Route path="/tool/niche" element={tool('tools', <NicheDiscovery />)} />
      <Route path="/tool/trends" element={tool('tools', <Trends />)} />
      <Route path="/tool/roadmap" element={tool('roadmap', <RoadmapGenerator />)} />
      <Route path="/tool/scorecard" element={tool('scorecard', <Scorecard />)} />
      <Route path="/tool/product" element={tool('tools', <Product />)} />
      <Route path="/tool/social" element={tool('tools', <Social />)} />

      {/* Dashboard */}
      <Route path="/dashboard" element={<ExternalRedirect to="https://dashboard.digitallydefined.online" />} />

      {/* Legacy redirects — keep old in-page CTAs alive */}
      <Route path="/tools" element={<Navigate to="/#tools" replace />} />
      <Route path="/tools/niche" element={<Navigate to="/tool/niche" replace />} />
      <Route path="/tools/roadmap" element={<Navigate to="/tool/roadmap" replace />} />
      <Route path="/tools/scorecard" element={<Navigate to="/tool/scorecard" replace />} />
      <Route path="/scorecard" element={<Navigate to="/tool/scorecard" replace />} />
      <Route path="/gap" element={<Navigate to="/#tools" replace />} />
      <Route path="/freedom" element={<Navigate to="/#tools" replace />} />
      <Route path="/roi" element={<Navigate to="/#tools" replace />} />
      <Route path="/tools/calculator" element={<Navigate to="/#tools" replace />} />
      <Route path="/about" element={<Navigate to="/" replace />} />
      <Route path="/contact" element={<Navigate to="/#tools" replace />} />
      <Route path="/pricing" element={<Navigate to="/" replace />} />
      <Route path="/products" element={<Navigate to="/" replace />} />
      <Route path="/automation" element={<Navigate to="/#tools" replace />} />

      {/* Fallback → launcher */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
