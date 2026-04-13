import { supabase } from '../lib/supabase.js'

export async function requireAuth(req, res, next) {
  const token = req.headers.authorization?.split('Bearer ')[1]
  if (!token) return res.status(401).json({ error: 'Unauthorised — no token provided' })

  const { data: { user }, error } = await supabase.auth.getUser(token)
  if (error || !user) return res.status(401).json({ error: 'Unauthorised — invalid token' })

  req.user = user
  next()
}

export function requireAdmin(req, res, next) {
  if (req.user?.user_metadata?.role !== 'admin') {
    return res.status(403).json({ error: 'Forbidden — admin access only' })
  }
  next()
}
