import { supabaseAuth } from '../lib/supabase.js'

/**
 * requireAuth — verifies the Supabase JWT from Authorization header.
 * Attaches req.user on success.
 */
export async function requireAuth(req, res, next) {
  const authHeader = req.headers.authorization

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Missing or invalid Authorization header' })
  }

  const token = authHeader.split(' ')[1]

  const { data: { user }, error } = await supabaseAuth.auth.getUser(token)

  if (error || !user) {
    return res.status(401).json({ error: 'Invalid or expired token' })
  }

  req.user = user
  next()
}

/**
 * requireAdmin — must be used after requireAuth.
 * Checks user_metadata.role === 'admin'.
 */
export function requireAdmin(req, res, next) {
  const role = req.user?.user_metadata?.role
  if (role !== 'admin') {
    return res.status(403).json({ error: 'Admin access required' })
  }
  next()
}

/**
 * optionalAuth — attaches req.user if token present, but does not block if missing.
 */
export async function optionalAuth(req, res, next) {
  const authHeader = req.headers.authorization
  if (!authHeader || !authHeader.startsWith('Bearer ')) return next()

  const token = authHeader.split(' ')[1]
  const { data: { user } } = await supabaseAuth.auth.getUser(token)
  if (user) req.user = user
  next()
}
