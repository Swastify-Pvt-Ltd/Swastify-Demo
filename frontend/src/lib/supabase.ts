import { createClient } from '@supabase/supabase-js';

// Define types for environment variables
interface SupabaseConfig {
  url: string;
  key: string;
}

// Get environment variables with TypeScript safety
const getSupabaseConfig = (): SupabaseConfig => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  
  if (!url || !key) {
    console.warn('Supabase environment variables are not set. Using empty strings as fallback.');
  }
  
  return {
    url: url || '',
    key: key || ''
  };
};

const config = getSupabaseConfig();

// Create and export the supabase client
export const supabase = createClient(config.url, config.key);