import { createClient } from '@supabase/supabase-js'

// Service-role client — bypasses RLS, used for DB operations only
export const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
)

// Anon-key client — used ONLY for auth.getUser() token verification
// The service-role client must NOT be used for getUser() as it ignores the JWT
export const supabaseAuth = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
)
