import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { useToast } from '../context/ToastContext'

export default function Navbar() {
  const { user, signOut, isAdmin } = useAuth()
  const { addToast } = useToast()
  const navigate = useNavigate()
  const location = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)
  const [theme, setTheme] = useState(() => {
    const stored = window.__theme
    if (stored) return stored
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    window.__theme = theme
  }, [theme])

  // Close menu on route change
  useEffect(() => { setMenuOpen(false) }, [location.pathname])

  const handleLogout = async () => {
    await signOut()
    addToast('Logged out successfully', 'success')
    navigate('/')
  }

  const toggleTheme = () => setTheme(t => t === 'dark' ? 'light' : 'dark')

  const navLinks = (
    <>
      <Link to="/" style={linkStyle(location.pathname === '/')}>Browse</Link>
      {user && <Link to="/my-reservations" style={linkStyle(location.pathname === '/my-reservations')}>My Reservations</Link>}
      {user && isAdmin && <Link to="/admin" style={linkStyle(location.pathname === '/admin')}>Admin</Link>}
    </>
  )

  const authButtons = user ? (
    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
      <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', maxWidth: 180, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
        {user.email}
      </span>
      <button onClick={handleLogout} style={btnStyle}>Logout</button>
    </div>
  ) : (
    <div style={{ display: 'flex', gap: 'var(--space-2)', alignItems: 'center' }}>
      <Link to="/login" style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)' }}>Login</Link>
      <Link to="/signup" style={btnStyle}>Sign Up</Link>
    </div>
  )

  return (
    <>
      <nav style={{
        background: 'var(--color-surface)',
        borderBottom: '1px solid var(--color-border)',
        position: 'sticky', top: 0, zIndex: 100,
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        transition: 'background var(--transition)',
      }}>
        <div style={{
          maxWidth: 1200, margin: '0 auto',
          padding: 'var(--space-3) var(--space-4)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          gap: 'var(--space-4)',
        }}>
          {/* Logo */}
          <Link to="/" style={{ fontWeight: 700, fontSize: 'var(--text-lg)', letterSpacing: '-0.02em', display: 'flex', alignItems: 'center', gap: 'var(--space-2)', flexShrink: 0 }}>
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-label="AKM Books">
              <rect width="28" height="28" rx="7" fill="var(--color-primary)"/>
              <path d="M7 21V9a2 2 0 012-2h10a2 2 0 012 2v12" stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
              <path d="M7 21h14" stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
              <path d="M11 7v6l3-2 3 2V7" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span>AKM Books</span>
          </Link>

          {/* Desktop nav */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-6)', flex: 1, justifyContent: 'center' }} className="desktop-nav">
            {navLinks}
          </div>

          {/* Right side */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              style={{
                width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center',
                borderRadius: 'var(--radius-md)',
                color: 'var(--color-text-muted)',
                transition: 'background var(--transition), color var(--transition)',
              }}
            >
              {theme === 'dark' ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
              )}
            </button>

            {/* Desktop auth — hidden on mobile */}
            <div className="desktop-auth">{authButtons}</div>

            {/* Hamburger */}
            <button
              onClick={() => setMenuOpen(o => !o)}
              aria-label="Toggle menu"
              className="hamburger"
              style={{
                width: 36, height: 36, display: 'none', alignItems: 'center', justifyContent: 'center',
                borderRadius: 'var(--radius-md)',
                color: 'var(--color-text)',
              }}
            >
              {menuOpen ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 6h16M4 12h16M4 18h16"/></svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div style={{
            borderTop: '1px solid var(--color-border)',
            padding: 'var(--space-4)',
            display: 'flex', flexDirection: 'column', gap: 'var(--space-3)',
            animation: 'fadeIn 0.15s ease',
          }}>
            {navLinks}
            <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: 'var(--space-3)', marginTop: 'var(--space-1)' }}>
              {authButtons}
            </div>
          </div>
        )}
      </nav>

      <style>{`
        @media (max-width: 640px) {
          .desktop-nav { display: none !important; }
          .desktop-auth { display: none !important; }
          .hamburger { display: flex !important; }
        }
      `}</style>
    </>
  )
}

const linkStyle = (active) => ({
  fontSize: 'var(--text-sm)',
  fontWeight: active ? 600 : 400,
  color: active ? 'var(--color-text)' : 'var(--color-text-muted)',
  paddingBottom: '2px',
  borderBottom: active ? '2px solid var(--color-primary)' : '2px solid transparent',
  transition: 'color var(--transition), border-color var(--transition)',
})

const btnStyle = {
  background: 'var(--color-primary)',
  color: '#fff',
  border: 'none',
  padding: 'var(--space-2) var(--space-4)',
  borderRadius: 'var(--radius-md)',
  fontSize: 'var(--text-sm)',
  fontWeight: 500,
  cursor: 'pointer',
  transition: 'background var(--transition)',
  textDecoration: 'none',
  display: 'inline-block',
  flexShrink: 0,
}
