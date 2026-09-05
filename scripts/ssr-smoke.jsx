import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import App from '../src/App.jsx';
import { ToolStateProvider } from '../src/context/ToolStateContext.jsx';

/**
 * SSR smoke entry — renders a route to a string without a browser.
 * Catches runtime crashes (undefined identifiers, bad imports) that
 * `vite build` cannot detect.
 */
export function renderRoute(location) {
  return renderToString(
    <ToolStateProvider>
      <StaticRouter location={location}>
        <App />
      </StaticRouter>
    </ToolStateProvider>
  );
}