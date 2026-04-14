import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useToast } from '../context/ToastContext'

export default function SignupPage() {
  const { signUp } = useAuth()
  const { addToast } = useToast()
  const navigate = useNavigate()

  const [form, setForm] = useState({ email: '', password: '', confirm: '' })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  const validate = () => {
    const e = {}
    if (!form.email.trim()) e.email = 'Email is required'
    else if (!/^[^@]+@[^@]+\.[^@]+$/.test(form.email)) e.email = 'Enter a valid email'
    if (!form.password) e.password = 'Password is required'
    else if (form.password.length < 8) e.password = 'Password must be at least 8 characters'
    if (!form.confirm) e.confirm = 'Please confirm your password'
    else if (form.confirm !== form.password) e.confirm = 'Passwords do not match'
    return e
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }

    setLoading(true)
    try {
      await signUp(form.email, form.password)
      addToast('Account created! Check your email to confirm. 📬', 'success')
      navigate('/login')
    } catch (err) {
      addToast(err.message, 'error')
    } finally {
      setLoading(false)
    }
  }

  const onChange = (field) => (e) => {
    setForm(f => ({ ...f, [field]: e.target.value }))
    if (errors[field]) setErrors(p => ({ ...p, [field]: undefined }))
  }

  return (
    <div style={{
      minHeight: '80vh', display: 'flex', alignItems: 'center',
      justifyContent: 'center', padding: 'var(--space-4)',
    }}>
      <div style={{
        width: '100%', maxWidth: '420px',
        background: 'var(--color-surface)',
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius-xl)',
        padding: 'clamp(1.5rem, 5vw, 2.5rem)',
        boxShadow: 'var(--shadow-md)',
      }}>
        <div style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
          <div style={{
            width: '48px', height: '48px', borderRadius: 'var(--radius-lg)',
            background: 'var(--color-primary)', color: '#fff',
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '1.5rem', marginBottom: '1rem',
          }}>📚</div>
          <h1 style={{ fontWeight: 700, fontSize: 'var(--text-xl)', marginBottom: '0.25rem' }}>Create account</h1>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>Join AKM Book Reservation</p>
        </div>

        <form onSubmit={handleSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: '1.125rem' }}>
          {[
            ['Email', 'email', 'email', 'you@example.com', 'email'],
            ['Password', 'password', 'password', '8+ characters', 'new-password'],
            ['Confirm Password', 'confirm', 'password', 'Re-enter password', 'new-password'],
          ].map(([label, field, type, placeholder, autoComplete]) => (
            <div key={field} style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
              <label style={{ fontWeight: 600, fontSize: '0.875rem' }}>{label}</label>
              <input
                type={type}
                value={form[field]}
                onChange={onChange(field)}
                placeholder={placeholder}
                autoComplete={autoComplete}
                style={{
                  padding: '0.625rem 0.875rem',
                  border: `1px solid ${errors[field] ? 'var(--color-error)' : 'var(--color-border)'}`,
                  borderRadius: 'var(--radius-md)',
                  fontSize: 'var(--text-base)',
                  background: 'var(--color-surface-2)',
                  outline: 'none',
                }}
              />
              {errors[field] && <span style={{ color: 'var(--color-error)', fontSize: '0.8rem' }}>{errors[field]}</span>}
            </div>
          ))}

          <button
            type="submit"
            disabled={loading}
            style={{
              marginTop: '0.25rem',
              padding: '0.75rem',
              background: loading ? 'var(--color-text-faint)' : 'var(--color-primary)',
              color: '#fff', border: 'none',
              borderRadius: 'var(--radius-md)',
              fontWeight: 600, fontSize: 'var(--text-base)',
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'background var(--transition-interactive)',
            }}
          >
            {loading ? 'Creating account...' : 'Create account'}
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '1.25rem', fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>
          Already have an account?{' '}
          <Link to="/login" style={{ color: 'var(--color-primary)', fontWeight: 600 }}>Sign in</Link>
        </p>
      </div>
    </div>
  )
}
