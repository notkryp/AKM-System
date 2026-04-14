import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useToast } from '../context/ToastContext'

export default function Navbar() {
  const { user, signOut, isAdmin } = useAuth()
  const { addToast } = useToast()
  const navigate = useNavigate()
  const location = useLocation()

  const handleSignOut = async () => {
    await signOut()
    addToast('Signed out successfully', 'success')
    navigate('/')
  }

  const isActive = (path) => location.pathname === path

  const linkStyle = (path) => ({
    color: isActive(path) ? 'var(--color-primary)' : 'var(--color-text-muted)',
    fontWeight: isActive(path) ? 600 : 400,
    fontSize: '0.9rem',
    textDecoration: 'none',
    padding: '0.25rem 0',
    borderBottom: isActive(path) ? '2px solid var(--color-primary)' : '2px solid transparent',
    transition: 'all var(--transition-interactive)',
  })

  return (
    <nav style={{
      position: 'sticky', top: 0, zIndex: 100,
      background: 'var(--color-surface)',
      borderBottom: '1px solid var(--color-border)',
      backdropFilter: 'blur(8px)',
    }}>
      <div style={{
        maxWidth: '1100px', margin: '0 auto',
        padding: '0 clamp(var(--space-4), 4vw, var(--space-8))',
        height: '60px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        gap: '1rem',
      }}>
        {/* Logo */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none' }}>
          <span style={{ fontSize: '1.25rem' }}>📚</span>
          <span style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--color-text)' }}>AKM Books</span>
        </Link>

        {/* Nav links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <Link to="/" style={linkStyle('/')}>Catalogue</Link>

          {user && (
            <Link to="/my-reservations" style={linkStyle('/my-reservations')}>My Reservations</Link>
          )}

          {isAdmin && (
            <Link to="/admin" style={linkStyle('/admin')}>Admin</Link>
          )}
        </div>

        {/* Auth */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          {user ? (
            <>
              <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', display: 'none' }}>
                {user.email}
              </span>
              <button
                onClick={handleSignOut}
                style={{
                  padding: '0.4rem 1rem',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-md)',
                  fontSize: '0.875rem', fontWeight: 500,
                  background: 'transparent',
                  color: 'var(--color-text-muted)',
                  cursor: 'pointer',
                }}
              >
                Sign out
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                style={{
                  padding: '0.4rem 0.875rem',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-md)',
                  fontSize: '0.875rem', fontWeight: 500,
                  color: 'var(--color-text-muted)',
                  textDecoration: 'none',
                }}
              >
                Sign in
              </Link>
              <Link
                to="/signup"
                style={{
                  padding: '0.4rem 0.875rem',
                  background: 'var(--color-primary)',
                  color: '#fff',
                  borderRadius: 'var(--radius-md)',
                  fontSize: '0.875rem', fontWeight: 600,
                  textDecoration: 'none',
                }}
              >
                Sign up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}
