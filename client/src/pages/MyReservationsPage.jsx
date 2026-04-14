import { useEffect, useState, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { fetchMyReservations, cancelReservation } from '../lib/api'
import { useToast } from '../context/ToastContext'
import { useAuth } from '../context/AuthContext'

export default function MyReservationsPage() {
  const [reservations, setReservations] = useState([])
  const [loading, setLoading] = useState(true)
  const [cancelling, setCancelling] = useState(null)
  const { addToast } = useToast()
  const { getToken } = useAuth()

  const loadReservations = useCallback(async () => {
    setLoading(true)
    try {
      const token = await getToken()
      const data = await fetchMyReservations(token)
      setReservations(data)
    } catch (err) {
      addToast(err.message, 'error')
    } finally {
      setLoading(false)
    }
  }, [getToken, addToast])

  useEffect(() => { loadReservations() }, [loadReservations])

  const handleCancel = async (id, title) => {
    if (!window.confirm(`Cancel reservation for "${title}"?`)) return
    setCancelling(id)
    try {
      const token = await getToken()
      await cancelReservation(id, token)
      setReservations(prev => prev.filter(r => r.id !== id))
      addToast(`Reservation for "${title}" cancelled`, 'success')
    } catch (err) {
      addToast(err.message, 'error')
    } finally {
      setCancelling(null)
    }
  }

  if (loading) return (
    <div className="page-container">
      <div className="skeleton skeleton-heading" style={{ width: '220px', marginBottom: '1.5rem' }} />
      {[1, 2, 3].map(i => (
        <div key={i} className="skeleton" style={{ height: '88px', borderRadius: 'var(--radius-lg)', marginBottom: '1rem' }} />
      ))}
    </div>
  )

  if (reservations.length === 0) return (
    <div className="page-container" style={{ textAlign: 'center', paddingTop: '5rem' }}>
      <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📚</div>
      <h2 style={{ fontWeight: 700, marginBottom: '0.5rem' }}>No reservations yet</h2>
      <p style={{ color: 'var(--color-text-muted)', marginBottom: '1.5rem' }}>Find a book you love and reserve it!</p>
      <Link
        to="/"
        style={{
          display: 'inline-block', padding: '0.625rem 1.25rem',
          background: 'var(--color-primary)', color: '#fff',
          borderRadius: 'var(--radius-md)', fontWeight: 600, textDecoration: 'none',
        }}
      >
        Browse Books
      </Link>
    </div>
  )

  return (
    <div className="page-container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h1 style={{ fontWeight: 700, fontSize: 'var(--text-xl)' }}>My Reservations</h1>
        <span style={{
          background: 'var(--color-primary-highlight)', color: 'var(--color-primary)',
          borderRadius: 'var(--radius-full)', padding: '0.25rem 0.75rem',
          fontSize: '0.8rem', fontWeight: 600,
        }}>
          {reservations.length} {reservations.length === 1 ? 'book' : 'books'}
        </span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
        {reservations.map(r => (
          <div
            key={r.id}
            style={{
              background: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-lg)',
              padding: '1.25rem 1.5rem',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: '1rem',
            }}
          >
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ fontWeight: 700, fontSize: 'var(--text-base)', marginBottom: '0.125rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {r.book?.title}
              </p>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>by {r.book?.author}</p>
              <p style={{ fontSize: '0.8rem', marginTop: '0.375rem', color: 'var(--color-text-muted)' }}>
                📅 Pick-up: <strong>{new Date(r.pickup_date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</strong>
              </p>
            </div>

            <button
              onClick={() => handleCancel(r.id, r.book?.title)}
              disabled={cancelling === r.id}
              style={{
                padding: '0.4rem 1rem',
                background: cancelling === r.id ? 'var(--color-text-faint)' : 'transparent',
                color: cancelling === r.id ? '#fff' : 'var(--color-error)',
                border: `1px solid ${cancelling === r.id ? 'transparent' : 'var(--color-error)'}`,
                borderRadius: 'var(--radius-md)',
                fontSize: '0.875rem', fontWeight: 600,
                cursor: cancelling === r.id ? 'not-allowed' : 'pointer',
                whiteSpace: 'nowrap',
                transition: 'all var(--transition-interactive)',
              }}
            >
              {cancelling === r.id ? 'Cancelling...' : 'Cancel'}
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
