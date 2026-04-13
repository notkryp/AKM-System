import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useToast } from '../context/ToastContext'

export default function Navbar() {
  const { user, signOut, isAdmin } = useAuth()
  const { addToast } = useToast()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await signOut()
    addToast('Logged out successfully')
    navigate('/')
  }

  return (
    <nav style={{
      background: 'var(--color-surface)',
      borderBottom: '1px solid var(--color-border)',
      padding: '1rem',
    }}>
      <div style={{
        maxWidth: '1200px', margin: '0 auto',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between'
      }}>
        <Link to="/" style={{ fontWeight: 700, fontSize: '1.25rem' }}>
          📚 AKM Books
        </Link>
        <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
          <Link to="/">Browse</Link>
          {user ? (
            <>
              <Link to="/my-reservations">My Reservations</Link>
              {isAdmin && <Link to="/admin">Admin</Link>}
              <span style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>
                {user.email}
              </span>
              <button onClick={handleLogout} style={{
                background: 'var(--color-primary)',
                color: '#fff', border: 'none',
                padding: '0.4rem 1rem',
                borderRadius: 'var(--radius-md)',
              }}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/signup" style={{
                background: 'var(--color-primary)',
                color: '#fff', padding: '0.4rem 1rem',
                borderRadius: 'var(--radius-md)',
              }}>Sign Up</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}
