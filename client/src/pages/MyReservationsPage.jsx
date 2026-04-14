import { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useToast } from '../context/ToastContext'

const API = import.meta.env.VITE_API_URL

const STATUS_COLOURS = {
  active:    { bg: 'var(--color-primary-highlight)',  text: 'var(--color-primary)' },
  returned:  { bg: 'var(--color-success-highlight)',  text: 'var(--color-success)' },
  cancelled: { bg: 'var(--color-warning-highlight)',  text: 'var(--color-warning)' },
}

function dueDateLabel(due) {
  if (!due) return null
  const today = new Date()
  const dueDate = new Date(due)
  const diffDays = Math.ceil((dueDate - today) / (1000 * 60 * 60 * 24))
  if (diffDays < 0) return { text: `Overdue by ${Math.abs(diffDays)}d`, colour: 'var(--color-error)' }
  if (diffDays === 0) return { text: 'Due today!', colour: 'var(--color-warning)' }
  if (diffDays <= 3) return { text: `Due in ${diffDays}d`, colour: 'var(--color-warning)' }
  return { text: `Due ${dueDate.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}`, colour: 'var(--color-text-muted)' }
}

export default function MyReservationsPage() {
  const { session } = useAuth()
  const { addToast } = useToast()
  const [reservations, setReservations] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchReservations = async () => {
    try {
      const res = await fetch(`${API}/api/reservations/my`, {
        headers: { Authorization: `Bearer ${session?.access_token}` },
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      setReservations(data)
    } catch (err) {
      addToast(err.message, 'error')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchReservations() }, [])

  const handleCancel = async (id) => {
    if (!confirm('Cancel this reservation?')) return
    try {
      const res = await fetch(`${API}/api/reservations/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${session?.access_token}` },
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      addToast('Reservation cancelled', 'success')
      setReservations(prev => prev.filter(r => r.id !== id))
    } catch (err) {
      addToast(err.message, 'error')
    }
  }

  if (loading) return (
    <div style={{ maxWidth: '720px', margin: '0 auto', padding: 'var(--space-8) var(--space-4)' }}>
      {[...Array(3)].map((_, i) => (
        <div key={i} className="skeleton" style={{ height: '100px', borderRadius: 'var(--radius-lg)', marginBottom: 'var(--space-4)' }} />
      ))}
    </div>
  )

  return (
    <div style={{ maxWidth: '720px', margin: '0 auto', padding: 'var(--space-8) var(--space-4)' }}>
      <h1 style={{ fontWeight: 700, fontSize: 'var(--text-xl)', marginBottom: 'var(--space-6)' }}>My Reservations</h1>

      {reservations.length === 0 ? (
        <div style={{ textAlign: 'center', padding: 'var(--space-16)', color: 'var(--color-text-muted)' }}>
          <div style={{ fontSize: '2.5rem', marginBottom: 'var(--space-4)' }}>📚</div>
          <p style={{ fontWeight: 600 }}>No reservations yet</p>
          <p style={{ fontSize: '0.9rem', marginTop: 'var(--space-2)' }}>Browse the catalogue and reserve a book!</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
          {reservations.map(r => {
            const due = dueDateLabel(r.due_date)
            const colours = STATUS_COLOURS[r.status] || STATUS_COLOURS.active
            return (
              <div key={r.id} style={{
                background: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-lg)',
                padding: 'var(--space-5)',
                display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
                gap: 'var(--space-4)',
              }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-1)' }}>
                    <span style={{ fontWeight: 700, fontSize: 'var(--text-base)' }}>{r.book?.title}</span>
                    <span style={{
                      fontSize: 'var(--text-xs)', fontWeight: 600, padding: '2px 8px',
                      borderRadius: 'var(--radius-full)',
                      background: colours.bg, color: colours.text,
                    }}>{r.status}</span>
                  </div>
                  <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', marginBottom: 'var(--space-2)' }}>
                    by {r.book?.author}
                  </p>
                  <div style={{ display: 'flex', gap: 'var(--space-4)', fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
                    <span>📅 Pick up: {new Date(r.pickup_date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                    {due && (
                      <span style={{ color: due.colour, fontWeight: 600 }}>⏰ {due.text}</span>
                    )}
                  </div>
                </div>

                {r.status === 'active' && (
                  <button
                    onClick={() => handleCancel(r.id)}
                    style={{
                      padding: '0.375rem 0.875rem',
                      border: '1px solid var(--color-error)',
                      borderRadius: 'var(--radius-md)',
                      color: 'var(--color-error)',
                      background: 'transparent',
                      fontSize: '0.8rem', fontWeight: 600,
                      cursor: 'pointer', whiteSpace: 'nowrap',
                    }}
                  >
                    Cancel
                  </button>
                )}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
