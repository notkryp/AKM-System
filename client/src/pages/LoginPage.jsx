import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useToast } from '../context/ToastContext'

export default function LoginPage() {
  const { signIn } = useAuth()
  const { addToast } = useToast()
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    const { error: authError } = await signIn(form.email, form.password)
    setLoading(false)
    if (authError) { setError(authError.message); return }
    addToast('Welcome back! 👋')
    navigate('/')
  }

  return (
    <div style={{ maxWidth: '400px', margin: '4rem auto' }}>
      <h1 style={{ fontWeight: 700, fontSize: '1.5rem', marginBottom: '1.5rem' }}>Log In</h1>
      {error && <p style={{ color: 'var(--color-error)', marginBottom: '1rem' }}>{error}</p>}
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {['email', 'password'].map(field => (
          <div key={field} style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
            <label style={{ fontWeight: 600, fontSize: '0.875rem', textTransform: 'capitalize' }}>{field}</label>
            <input
              type={field}
              value={form[field]}
              onChange={e => setForm(f => ({ ...f, [field]: e.target.value }))}
              required
              style={{ padding: '0.625rem', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', fontSize: '1rem' }}
            />
          </div>
        ))}
        <button type="submit" disabled={loading} style={{
          padding: '0.75rem', background: 'var(--color-primary)',
          color: '#fff', border: 'none', borderRadius: 'var(--radius-md)',
          fontWeight: 600, fontSize: '1rem'
        }}>
          {loading ? 'Logging in...' : 'Log In'}
        </button>
      </form>
      <p style={{ marginTop: '1rem', color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>
        Don't have an account? <Link to="/signup" style={{ color: 'var(--color-primary)' }}>Sign up</Link>
      </p>
    </div>
  )
}
