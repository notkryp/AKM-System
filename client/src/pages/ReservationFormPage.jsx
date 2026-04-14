import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { fetchBookById, createReservation } from '../lib/api'
import { useToast } from '../context/ToastContext'
import { useAuth } from '../context/AuthContext'

export default function ReservationFormPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addToast } = useToast()
  const { user, getToken } = useAuth()

  const today = new Date().toISOString().split('T')[0]

  const [book, setBook] = useState(null)
  const [bookLoading, setBookLoading] = useState(true)
  const [bookError, setBookError] = useState(null)
  const [form, setForm] = useState({
    name: user?.user_metadata?.full_name || '',
    email: user?.email || '',
    pickupDate: today,
  })
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)

  // Load book details
  useEffect(() => {
    fetchBookById(id)
      .then(data => {
        setBook(data)
        if (!data.available) setBookError('This book is no longer available.')
      })
      .catch(() => setBookError('Book not found.'))
      .finally(() => setBookLoading(false))
  }, [id])

  // Pre-fill form when user loads
  useEffect(() => {
    if (user) {
      setForm(f => ({
        ...f,
        name: f.name || user.user_metadata?.full_name || '',
        email: f.email || user.email || '',
      }))
    }
  }, [user])

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'Full name is required'
    if (!form.email.trim()) e.email = 'Email is required'
    else if (!/^[^@]+@[^@]+\.[^@]+$/.test(form.email)) e.email = 'Enter a valid email'
    if (!form.pickupDate) e.pickupDate = 'Pick-up date is required'
    else if (form.pickupDate < today) e.pickupDate = 'Pick-up date must be today or future'
    return e
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }

    setSubmitting(true)
    try {
      const token = await getToken()
      await createReservation({ bookId: id, ...form }, token)
      addToast(`"${book?.title}" reserved successfully! 🎉`, 'success')
      navigate('/')
    } catch (err) {
      addToast(err.message, 'error')
    } finally {
      setSubmitting(false)
    }
  }

  const onChange = (field) => (e) => {
    setForm(f => ({ ...f, [field]: e.target.value }))
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: undefined }))
  }

  if (bookLoading) return (
    <div className="page-container">
      <div className="skeleton skeleton-heading" style={{ width: '200px', marginBottom: '2rem' }} />
      <div className="skeleton" style={{ height: '300px', borderRadius: 'var(--radius-lg)' }} />
    </div>
  )

  if (bookError) return (
    <div className="page-container" style={{ textAlign: 'center', paddingTop: '4rem' }}>
      <p style={{ color: 'var(--color-error)', fontSize: '1.125rem', marginBottom: '1rem' }}>{bookError}</p>
      <Link to="/" style={{ color: 'var(--color-primary)' }}>← Back to books</Link>
    </div>
  )

  return (
    <div className="page-container">
      <Link to={`/books/${id}`} style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem', display: 'inline-flex', alignItems: 'center', gap: '0.25rem', marginBottom: '1.5rem' }}>
        ← {book?.title}
      </Link>

      <h1 style={{ fontWeight: 700, fontSize: 'var(--text-xl)', marginBottom: '0.25rem' }}>Reserve a Book</h1>
      <p style={{ color: 'var(--color-text-muted)', marginBottom: '2rem', fontSize: '0.9rem' }}>
        Reserving: <strong style={{ color: 'var(--color-text)' }}>{book?.title}</strong> by {book?.author}
      </p>

      <form onSubmit={handleSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', maxWidth: '480px' }}>
        {[['Full Name', 'name', 'text'], ['Email Address', 'email', 'email'], ['Pick-up Date', 'pickupDate', 'date']].map(([label, field, type]) => (
          <div key={field} style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
            <label style={{ fontWeight: 600, fontSize: '0.875rem', color: 'var(--color-text)' }}>{label}</label>
            <input
              type={type}
              value={form[field]}
              onChange={onChange(field)}
              min={type === 'date' ? today : undefined}
              style={{
                padding: '0.625rem 0.75rem',
                border: `1px solid ${errors[field] ? 'var(--color-error)' : 'var(--color-border)'}`,
                borderRadius: 'var(--radius-md)',
                fontSize: 'var(--text-base)',
                background: 'var(--color-surface)',
                color: 'var(--color-text)',
                outline: 'none',
                transition: 'border-color var(--transition-interactive)',
              }}
            />
            {errors[field] && (
              <span style={{ color: 'var(--color-error)', fontSize: '0.8rem' }}>{errors[field]}</span>
            )}
          </div>
        ))}

        <button
          type="submit"
          disabled={submitting}
          style={{
            padding: '0.75rem 1.5rem',
            background: submitting ? 'var(--color-text-faint)' : 'var(--color-primary)',
            color: '#fff', border: 'none', borderRadius: 'var(--radius-md)',
            fontWeight: 600, fontSize: 'var(--text-base)',
            cursor: submitting ? 'not-allowed' : 'pointer',
            transition: 'background var(--transition-interactive)',
          }}
        >
          {submitting ? 'Reserving...' : 'Confirm Reservation'}
        </button>
      </form>
    </div>
  )
}
