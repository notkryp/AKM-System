import { supabase } from '../lib/supabase.js'

/**
 * Middleware: verify Supabase JWT from Authorization header.
 * Attaches the authenticated user to req.user.
 */
export async function requireAuth(req, res, next) {
  const authHeader = req.headers.authorization
  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Missing or invalid Authorization header' })
  }

  const token = authHeader.split(' ')[1]

  const { data: { user }, error } = await supabase.auth.getUser(token)

  if (error || !user) {
    return res.status(401).json({ error: 'Invalid or expired token' })
  }

  req.user = user
  next()
}

/**
 * Middleware: verify the user has admin role.
 * Must run AFTER requireAuth.
 * Checks user_metadata.role or app_metadata.role set in Supabase.
 */
export function requireAdmin(req, res, next) {
  const role =
    req.user?.app_metadata?.role ||
    req.user?.user_metadata?.role

  if (role !== 'admin') {
    return res.status(403).json({ error: 'Admin access required' })
  }
  next()
}
