import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

/**
 * Wraps a route that requires authentication.
 * Redirects unauthenticated users to /login,
 * preserving the intended destination in location.state.from.
 *
 * Usage:
 *   <Route path="/my-reservations" element={
 *     <ProtectedRoute><MyReservationsPage /></ProtectedRoute>
 *   } />
 */
export default function ProtectedRoute({ children, adminOnly = false }) {
  const { user, loading, isAdmin } = useAuth()
  const location = useLocation()

  // Still resolving session — don't flash a redirect
  if (loading) return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '5rem' }}>
      <div className="skeleton" style={{ width: '120px', height: '16px', borderRadius: 'var(--radius-full)' }} />
    </div>
  )

  if (!user) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />
  }

  if (adminOnly && !isAdmin) {
    return <Navigate to="/" replace />
  }

  return children
}
