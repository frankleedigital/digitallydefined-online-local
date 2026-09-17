// src/config/appConfig.js — central runtime configuration

export const config = {
  backendUrl: (import.meta.env.VITE_BACKEND_URL || 'https://digitallydefined-backend-clean.vercel.app/api').replace(/\/+$/, ''),
  supabaseUrl: import.meta.env.VITE_SUPABASE_URL || 'https://dijjlppdljpcgyoakdnq.supabase.co',
  dashboardApiKey: import.meta.env.VITE_DASHBOARD_API_KEY || '',
  hermesEndpoint: import.meta.env.VITE_HERMES_ENDPOINT || `${import.meta.env.VITE_SUPABASE_URL || 'https://dijjlppdljpcgyoakdnq.supabase.co'}/functions/v1/hermes`,
};
