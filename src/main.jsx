import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import ErrorBoundary from './components/ErrorBoundary.jsx';
import { initTracking, trackPageView } from './utils/analytics.js';
import './styles/global.css';
import './styles/tailwind.css';

function AnalyticsBootstrap() {
  const [analyticsReady, setAnalyticsReady] = useState(false);

  useEffect(() => {
    let ignored = false;

    Promise.all([
      import('@vercel/analytics/react'),
      import('@vercel/speed-insights/react'),
    ]).then(([analyticsMod, insightsMod]) => {
      if (ignored) return;
      window.__dd_analytics_loaded__ = true;
      setAnalyticsReady(true);
      window.__dd_analytics_modules__ = { analyticsMod, insightsMod };
    }).catch(() => {
      if (!ignored) setAnalyticsReady(false);
    });

    return () => {
      ignored = true;
    };
  }, []);

  if (!analyticsReady) return null;

  const { Analytics } = window.__dd_analytics_modules__.analyticsMod;
  const { SpeedInsights } = window.__dd_analytics_modules__.insightsMod;
  return (
    <>
      <Analytics />
      <SpeedInsights />
    </>
  );
}

// DigitallyDefined analytics pipeline
if (!window.__dd_tracking_initialized__) {
  initTracking();
  window.__dd_tracking_initialized__ = true;

  window.addEventListener('popstate', () => trackPageView());
  const originalPushState = window.history.pushState.bind(window.history);
  window.history.pushState = (...args) => {
    originalPushState(...args);
    trackPageView();
  };
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
        <App />
        <AnalyticsBootstrap />
      </BrowserRouter>
    </ErrorBoundary>
  </React.StrictMode>
);

