import React from 'react';
import { renderToPipeableStream } from 'react-dom/server';
import { PassThrough } from 'node:stream';
import { StaticRouter } from 'react-router-dom';
import App from '../src/App.jsx';

/**
 * SSR smoke entry — renders a route to a string without a browser.
 * Catches runtime crashes (undefined identifiers, bad imports) that
 * `vite build` cannot detect.
 *
 * Uses renderToPipeableStream + onAllReady so lazily imported routes
 * (QuizPage, ResultsPage, RoadmapPage) are fully rendered instead of
 * resolving to their Suspense fallback.
 *
 * There is no localStorage in this environment on purpose: the quiz storage
 * helpers must degrade gracefully (they guard on `typeof window`), and this
 * render proves the quiz, results and roadmap pages survive without it.
 */
export function renderRoute(location, { timeoutMs = 20000 } = {}) {
  return new Promise((resolve, reject) => {
    let html = '';
    const stream = new PassThrough();
    stream.on('data', (chunk) => { html += chunk.toString(); });
    stream.on('end', () => resolve(html));

    const { pipe, abort } = renderToPipeableStream(
      <StaticRouter location={location}>
        <App />
      </StaticRouter>,
      {
        onAllReady() { pipe(stream); },
        onShellError(error) { reject(error); },
        onError(error) {
          // Non-fatal render errors are reported by the runner as missing copy;
          // a thrown shell error is what actually fails the route.
          console.error(`[ssr-smoke] render error on ${location}:`, error?.message || error);
        },
      }
    );

    setTimeout(() => abort(), timeoutMs);
  });
}