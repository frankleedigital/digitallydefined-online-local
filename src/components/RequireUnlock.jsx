// src/components/RequireUnlock.jsx
// Route guard: tools, dashboard, and roadmap unlock only after quiz completion.
// Redirects to /quiz when the user has not finished the Digital Superpower Quiz.

import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { isQuizComplete } from '../hooks/useToolState.js';

export default function RequireUnlock({ children }) {
  const location = useLocation();

  if (!isQuizComplete()) {
    return <Navigate to="/quiz" replace state={{ from: location.pathname }} />;
  }

  return children;
}