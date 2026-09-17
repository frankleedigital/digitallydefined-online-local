import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import ErrorBoundary from './components/ErrorBoundary.jsx';
import { initTracking, trackPageView } from './utils/analytics.js';
import './styles/global.css';
import './styles/tailwind.css';

// Vercel Analytics + Speed Insights
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';

// Initialize Puter.js for cloud OS features
import puter from './puter-adapter.js';

// Global Puter availability check
window.puter = puter;

// DigitallyDefined analytics pipeline
initTracking();
window.addEventListener('popstate', () => trackPageView());
const originalPushState = window.history.pushState.bind(window.history);
window.history.pushState = (...args) => {
  originalPushState(...args);
  trackPageView();
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
        <App />
        <Analytics />
        <SpeedInsights />
      </BrowserRouter>
    </ErrorBoundary>
  </React.StrictMode>
);

