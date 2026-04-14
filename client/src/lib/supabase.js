import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Warn in dev if vars are missing — but don't crash the app
if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Warning: Missing Supabase environment variables. Auth and data features will not work.')
}

export const supabase = createClient(
  supabaseUrl ?? 'https://placeholder.supabase.co',
  supabaseAnonKey ?? 'placeholder-anon-key'
)
