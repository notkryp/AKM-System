import { useEffect, useState } from 'react'
import { fetchMyReservations, cancelReservation } from '../lib/api'
import { useToast } from '../context/ToastContext'
import { supabase } from '../lib/supabase'

export default function MyReservationsPage() {
  const [reservations, setReservations] = useState([])
  const [loading, setLoading] = useState(true)
  const { addToast } = useToast()

  const loadReservations = async () => {
    const { data: { session } } = await supabase.auth.getSession()
    fetchMyReservations(session?.access_token)
      .then(setReservations)
      .finally(() => setLoading(false))
  }

  useEffect(() => { loadReservations() }, [])

  const handleCancel = async (id) => {
    if (!confirm('Are you sure you want to cancel this reservation?')) return
    try {
      const { data: { session } } = await supabase.auth.getSession()
      await cancelReservation(id, session?.access_token)
      setReservations(prev => prev.filter(r => r.id !== id))
      addToast('Reservation cancelled')
    } catch (err) {
      addToast(err.message, 'error')
    }
  }

  if (loading) return <p>Loading your reservations...</p>

  if (reservations.length === 0) return (
    <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--color-text-muted)' }}>
      <p style={{ fontSize: '1.25rem' }}>No reservations yet</p>
      <a href="/" style={{ color: 'var(--color-primary)', marginTop: '0.5rem', display: 'inline-block' }}>
        Browse books →
      </a>
    </div>
  )

  return (
    <div>
      <h1 style={{ fontWeight: 700, fontSize: '1.75rem', marginBottom: '1.5rem' }}>My Reservations</h1>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {reservations.map(r => (
          <div key={r.id} style={{
            background: 'var(--color-surface)', border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-lg)', padding: '1.25rem',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center'
          }}>
            <div>
              <p style={{ fontWeight: 700 }}>{r.book?.title}</p>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>by {r.book?.author}</p>
              <p style={{ fontSize: '0.8rem', marginTop: '0.25rem', color: 'var(--color-text-muted)' }}>
                Pick-up: {new Date(r.pickup_date).toLocaleDateString()}
              </p>
            </div>
            <button
              onClick={() => handleCancel(r.id)}
              style={{
                padding: '0.4rem 1rem', background: 'var(--color-error)',
                color: '#fff', border: 'none', borderRadius: 'var(--radius-md)',
                fontSize: '0.875rem'
              }}
            >
              Cancel
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
