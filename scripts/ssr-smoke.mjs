import { createServer } from 'vite';
import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { readdirSync } from 'node:fs';

/**
 * Renders every production route with react-dom/server to catch runtime
 * crashes that `vite build` cannot detect (e.g. undefined identifiers).
 * Usage: node scripts/ssr-smoke.mjs
 */
const ROUTES = [
  '/',
  '/quiz',
  '/results',
  '/roadmap/builder',
  '/roadmap/strategist',
  '/roadmap/not-a-superpower',
];

/**
 * Guarded routes: without a saved quiz result they render <Navigate to="/quiz">.
 * StaticRouter deliberately ignores that redirect (it is a no-op on the initial
 * render), so the assertion here is that the shell still renders and the gated
 * page copy never leaks into the HTML.
 */
const GUARDED_ROUTES = ['/roadmap', '/dashboard'];

// Content that must exist on the launcher for it to be "really" rendering.
const HOME_ASSERTIONS = [
  'Faceless Digital Real Estate for Gen X Women',
  'Take the Quiz',
  'Quiz → Roadmap → Dashboard → Tools',
];

// Distinctive copy per route — proves each path renders ITS OWN page.
const ROUTE_ASSERTIONS = {
  '/quiz': ['digital superpower', 'start the quiz'],
  '/results': ['no result on this device yet'],
  '/roadmap/builder': ['builder roadmap', 'digital architect'],
  '/roadmap/strategist': ['strategist roadmap', 'opportunity scout'],
  // Unknown persona segment must be answered honestly, not silently redirected.
  '/roadmap/not-a-superpower': ['not one of the five superpowers'],
};

/** Find a package's ESM file — root symlink first, then pnpm store. */
function findEsm(pkg, candidates) {
  const pnpm = resolve(process.cwd(), 'node_modules/.pnpm');
  const tries = [];
  // Root symlink (direct deps are hoisted here by pnpm)
  for (const file of candidates) tries.push(resolve(process.cwd(), `node_modules/${pkg}/${file}`));
  // pnpm store
  if (existsSync(pnpm)) {
    for (const dir of readdirSync(pnpm)) {
      if (dir === `${pkg}@` || dir.startsWith(`${pkg}@`)) {
        for (const file of candidates) {
          tries.push(resolve(pnpm, dir, `node_modules/${pkg}/${file}`));
        }
      }
    }
  }
  for (const candidate of tries) {
    if (existsSync(candidate)) return candidate;
  }
  throw new Error(`Could not locate ESM build for ${pkg}. Tried:\n${tries.join('\n')}`);
}

const rrdEsm = findEsm('react-router-dom', ['dist/index.mjs']);
const rrEsm = findEsm('react-router', ['dist/development/index.mjs', 'dist/index.mjs']);

const server = await createServer({
  root: process.cwd(),
  server: { middlewareMode: true },
  appType: 'custom',
  logLevel: 'error',
  // Pin the router to its real ESM builds and push it through Vite's
  // transform so named exports (Routes, Route, Navigate, StaticRouter)
  // resolve correctly under Node SSR.
  resolve: {
    alias: [
      { find: /^react-router-dom$/, replacement: rrdEsm },
      { find: /^react-router$/, replacement: rrEsm },
    ],
  },
  ssr: { noExternal: [/react-router/] },
});

let failures = 0;
try {
  const { renderRoute } = await server.ssrLoadModule('/scripts/ssr-smoke.jsx');

  for (const route of ROUTES) {
    try {
      const html = await renderRoute(route);
      if (typeof html !== 'string' || html.length <= 500) {
        failures += 1;
        console.log(`FAIL ${route} (suspiciously short output: len=${html?.length})`);
        continue;
      }
      console.log(`PASS ${route} (len=${html.length})`);

      const needles = ROUTE_ASSERTIONS[route] || [];
      for (const needle of needles) {
        if (html.toLowerCase().includes(needle.toLowerCase())) {
          console.log(`PASS content on ${route} -> "${needle}"`);
        } else {
          failures += 1;
          console.log(`FAIL content on ${route} -> missing "${needle}"`);
        }
      }
    } catch (err) {
      failures += 1;
      console.log(`FAIL ${route}: ${err && err.message ? err.message : err}`);
    }
  }

  const home = await renderRoute('/');
  for (const needle of HOME_ASSERTIONS) {
    if (home.includes(needle)) {
      console.log(`PASS content on / -> "${needle}"`);
    } else {
      failures += 1;
      console.log(`FAIL content on / -> missing "${needle}"`);
    }
  }

  // Guarded routes render the site shell; gated copy must not appear.
  for (const route of GUARDED_ROUTES) {
    try {
      const html = await renderRoute(route);
      const leaked = ['Phase by phase', 'Open my dashboard →', 'Tools that fit this sequence']
        .some((needle) => html.includes(needle));
      if (html.length > 2000 && !leaked) {
        console.log(`PASS ${route} (guarded, shell len=${html.length})`);
      } else {
        failures += 1;
        console.log(`FAIL ${route} (guarded route leaked gated content or failed to render)`);
      }
    } catch (err) {
      failures += 1;
      console.log(`FAIL ${route}: ${err && err.message ? err.message : err}`);
    }
  }
} finally {
  await server.close();
}

console.log(failures === 0 ? '\nALL ROUTES RENDER OK' : `\n${failures} FAILURE(S)`);
process.exitCode = failures === 0 ? 0 : 1;