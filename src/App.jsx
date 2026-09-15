import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Quiz from './pages/Quiz/DigitalSuperpowerQuiz';
import QuizInbox from './pages/Quiz/QuizInbox';
import QuizResults from './pages/Quiz/QuizResults';

/**
 * DigitallyDefined — Quiz Funnel
 * Simple landing page that funnels users into the Digital Superpower Quiz.
 */
function App() {
  return (
    <Routes>
      {/* Landing page */}
      <Route path="/" element={<Home />} />

      {/* Quiz flow */}
      <Route path="/quiz" element={<Quiz />} />
      <Route path="/quiz/results" element={<QuizResults />} />
      <Route path="/quiz/inbox" element={<QuizInbox />} />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;

