import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
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
    if (!form.email) e.email = 'Email is required'
    if (form.password.length < 8) e.password = 'Password must be at least 8 characters'
    if (form.password !== form.confirm) e.confirm = 'Passwords do not match'
    return e
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setLoading(true)
    const { error: authError } = await signUp(form.email, form.password)
    setLoading(false)
    if (authError) { setErrors({ general: authError.message }); return }
    addToast('Account created! Check your email to confirm. ✅')
    navigate('/')
  }

  const fields = [
    { name: 'email', label: 'Email', type: 'email' },
    { name: 'password', label: 'Password', type: 'password' },
    { name: 'confirm', label: 'Confirm Password', type: 'password' },
  ]

  return (
    <div style={{ maxWidth: '400px', margin: '4rem auto' }}>
      <h1 style={{ fontWeight: 700, fontSize: '1.5rem', marginBottom: '1.5rem' }}>Create Account</h1>
      {errors.general && <p style={{ color: 'var(--color-error)', marginBottom: '1rem' }}>{errors.general}</p>}
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {fields.map(({ name, label, type }) => (
          <div key={name} style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
            <label style={{ fontWeight: 600, fontSize: '0.875rem' }}>{label}</label>
            <input
              type={type}
              value={form[name]}
              onChange={e => setForm(f => ({ ...f, [name]: e.target.value }))}
              style={{ padding: '0.625rem', border: `1px solid ${errors[name] ? 'var(--color-error)' : 'var(--color-border)'}`, borderRadius: 'var(--radius-md)', fontSize: '1rem' }}
            />
            {errors[name] && <span style={{ color: 'var(--color-error)', fontSize: '0.8rem' }}>{errors[name]}</span>}
          </div>
        ))}
        <button type="submit" disabled={loading} style={{
          padding: '0.75rem', background: 'var(--color-primary)',
          color: '#fff', border: 'none', borderRadius: 'var(--radius-md)',
          fontWeight: 600, fontSize: '1rem'
        }}>
          {loading ? 'Creating account...' : 'Create Account'}
        </button>
      </form>
      <p style={{ marginTop: '1rem', color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>
        Already have an account? <Link to="/login" style={{ color: 'var(--color-primary)' }}>Log in</Link>
      </p>
    </div>
  )
}
