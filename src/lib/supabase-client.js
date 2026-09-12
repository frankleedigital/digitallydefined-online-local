// lib/supabase-client.js
// Supabase client for marketing site - lightweight wrapper

import { createClient } from '@supabase/supabase-js'

const MARKETING_SITE_SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || ''
const MARKETING_SITE_SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || ''

export const createSupabaseClient = () => {
  if (!MARKETING_SITE_SUPABASE_URL || !MARKETING_SITE_SUPABASE_ANON_KEY) {
    console.warn('Marketing site Supabase environment variables not set')
    return null
  }
  
  return createClient(MARKETING_SITE_SUPABASE_URL, MARKETING_SITE_SUPABASE_ANON_KEY)
}

// Example usage for form submission
export async function submitEmailToSupabase(email) {
  const supabase = createSupabaseClient()
  if (!supabase) return false
  
  try {
    const { data, error } = await supabase.from('email_subscriptions').insert({
      email,
      source: 'marketing-site',
      created_at: new Date().toISOString(),
    })
    
    return !error
  } catch (err) {
    console.error('Supabase submission error:', err)
    return false
  }
}

export default { createSupabaseClient, submitEmailToSupabase }
