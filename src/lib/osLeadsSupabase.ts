import { createClient } from '@supabase/supabase-js';

function getRequiredEnv(name: 'VITE_OS_SUPABASE_URL' | 'VITE_OS_SUPABASE_ANON_KEY'): string {
  const value = import.meta.env[name];
  if (!value) {
    throw new Error(
      `Missing ${name}. Set it in .env (local) or Netlify/Vercel project settings, then rebuild the website.`,
    );
  }
  return value;
}

const osSupabaseUrl = getRequiredEnv('VITE_OS_SUPABASE_URL');
const osSupabaseAnonKey = getRequiredEnv('VITE_OS_SUPABASE_ANON_KEY');

export const osLeadsSupabase = createClient(osSupabaseUrl, osSupabaseAnonKey);
