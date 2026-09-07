import { createServer } from 'vite';
import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { readdirSync } from 'node:fs';

/**
 * Renders every production route with react-dom/server to catch runtime
 * crashes that `vite build` cannot detect (e.g. undefined identifiers).
 * Usage: node scripts/ssr-smoke.mjs
 */
const ROUTES = ['/', '/quiz', '/tool/niche', '/tool/trends', '/tool/roadmap', '/tool/scorecard', '/tool/product', '/tool/social'];

// Content that must exist on the launcher for it to be "really" rendering.
const HOME_ASSERTIONS = [
  'Find Your Superpower',
  'Find the idea worth building',
  'Niche Scorecard',
  'Small decisions. Compounding ownership.',
  'Open the AI Business Partner',
];

// Distinctive copy per route — proves each path renders ITS OWN page.
const ROUTE_ASSERTIONS = {
  '/quiz': ['digital superpower'],
  '/tool/niche': ['profitable niche'],
  '/tool/trends': ['ai-assisted trend scanner'],
  '/tool/roadmap': ['roadmap'],
  '/tool/scorecard': ['scorecard'],
  '/tool/product': ['product builder'],
  '/tool/social': ['automations'],
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
      const html = renderRoute(route);
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

  const home = renderRoute('/');
  for (const needle of HOME_ASSERTIONS) {
    if (home.includes(needle)) {
      console.log(`PASS content on / -> "${needle}"`);
    } else {
      failures += 1;
      console.log(`FAIL content on / -> missing "${needle}"`);
    }
  }
} finally {
  await server.close();
}

console.log(failures === 0 ? '\nALL ROUTES RENDER OK' : `\n${failures} FAILURE(S)`);
process.exitCode = failures === 0 ? 0 : 1;