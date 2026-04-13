import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { createReservation } from '../lib/api'
import { useToast } from '../context/ToastContext'
import { useAuth } from '../context/AuthContext'

export default function ReservationFormPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addToast } = useToast()
  const { user } = useAuth()

  const today = new Date().toISOString().split('T')[0]

  const [form, setForm] = useState({ name: '', email: '', pickupDate: today })
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'Full name is required'
    if (!form.email.trim()) e.email = 'Email is required'
    else if (!/^[^@]+@[^@]+\.[^@]+$/.test(form.email)) e.email = 'Enter a valid email'
    if (!form.pickupDate) e.pickupDate = 'Pick-up date is required'
    else if (form.pickupDate < today) e.pickupDate = 'Pick-up date must be today or in the future'
    return e
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }

    setSubmitting(true)
    try {
      const token = (await import('../lib/supabase')).supabase.auth.getSession()?.access_token
      await createReservation({ bookId: id, ...form }, token)
      addToast('Book reserved successfully! 🎉')
      navigate('/')
    } catch (err) {
      addToast(err.message, 'error')
    } finally {
      setSubmitting(false)
    }
  }

  const field = (label, name, type = 'text') => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
      <label style={{ fontWeight: 600, fontSize: '0.875rem' }}>{label}</label>
      <input
        type={type}
        value={form[name]}
        onChange={e => setForm(f => ({ ...f, [name]: e.target.value }))}
        min={type === 'date' ? today : undefined}
        style={{
          padding: '0.625rem', border: `1px solid ${errors[name] ? 'var(--color-error)' : 'var(--color-border)'}`,
          borderRadius: 'var(--radius-md)', fontSize: '1rem',
        }}
      />
      {errors[name] && <span style={{ color: 'var(--color-error)', fontSize: '0.8rem' }}>{errors[name]}</span>}
    </div>
  )

  return (
    <div style={{ maxWidth: '480px' }}>
      <h1 style={{ fontWeight: 700, fontSize: '1.5rem', marginBottom: '1.5rem' }}>Reserve a Book</h1>
      <form onSubmit={handleSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {field('Full Name', 'name')}
        {field('Email Address', 'email', 'email')}
        {field('Pick-up Date', 'pickupDate', 'date')}
        <button
          type="submit"
          disabled={submitting}
          style={{
            padding: '0.75rem', background: 'var(--color-primary)',
            color: '#fff', border: 'none', borderRadius: 'var(--radius-md)',
            fontWeight: 600, fontSize: '1rem', marginTop: '0.5rem',
          }}
        >
          {submitting ? 'Reserving...' : 'Confirm Reservation'}
        </button>
      </form>
    </div>
  )
}
