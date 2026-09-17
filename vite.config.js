import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

/**
 * Hermes status middleware.
 * Serves GET /api/hermes/status — a light reachability probe for the Hermes
 * AI Mentor. Returns { online } and powers the MentorWidget green light.
 * Works in both `vite dev` and `vite preview`.
 */
function hermesStatusPlugin() {
  const checkHermes = async () => {
    const supabaseUrl =
      process.env.VITE_SUPABASE_URL || 'https://dijjlppdljpcgyoakdnq.supabase.co';
    const endpoint =
      process.env.VITE_HERMES_ENDPOINT || `${supabaseUrl}/functions/v1/hermes`;
    const apiKey = process.env.VITE_DASHBOARD_API_KEY || '';
    if (!apiKey) {
      console.warn('[hermes-status-middleware] VITE_DASHBOARD_API_KEY is not set.');
    }

    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 8000);
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey,
        },
        body: JSON.stringify({ action: 'status' }),
        signal: controller.signal,
      });
      let data = null;
      try {
        data = await res.json();
      } catch {
        /* non-JSON response still proves reachability */
      }
      // Any HTTP response means Hermes is reachable (fully online, auth-gated,
      // or live but misconfigured). Green light = reachable.
      const online = res.status >= 200 && res.status < 500;
      return {
        online,
        status: res.status,
        provider: data?.provider || null,
        message: data?.error || null,
        timestamp: Date.now(),
      };
    } catch (err) {
      return {
        online: false,
        error: err instanceof Error ? err.message : String(err),
        timestamp: Date.now(),
      };
    } finally {
      clearTimeout(timer);
    }
  };

  const middleware = (req, res, next) => {
    const url = (req.url || '').split('?')[0];
    if (url !== '/api/hermes/status') return next();

    checkHermes().then((payload) => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.setHeader('Cache-Control', 'no-store');
      res.end(JSON.stringify(payload));
    });
  };

  return {
    name: 'hermes-status-middleware',
    configureServer(server) {
      server.middlewares.use(middleware);
    },
    configurePreviewServer(server) {
      server.middlewares.use(middleware);
    },
  };
}

export default defineConfig({
  base: '/',
  plugins: [react(), hermesStatusPlugin()],
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    emptyOutDir: true,
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'analytics-vendor': ['@vercel/analytics/react', '@vercel/speed-insights/react'],
          'ui-vendor': ['lucide-react'],
        },
      },
    },
  },
  server: {
    port: 3001,
    open: false,
    allowedHosts: ['.monkeycode-ai.live'],
  },
});
