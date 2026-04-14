import { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useToast } from '../context/ToastContext'

const API = import.meta.env.VITE_API_URL

export default function AdminPage() {
  const { session } = useAuth()
  const { addToast } = useToast()
  const [reservations, setReservations] = useState([])
  const [loading, setLoading] = useState(true)
  const [returning, setReturning] = useState(null)

  const fetchAll = async () => {
    try {
      const res = await fetch(`${API}/api/reservations`, {
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

  useEffect(() => { fetchAll() }, [])

  const handleReturn = async (id) => {
    setReturning(id)
    try {
      const res = await fetch(`${API}/api/reservations/${id}/return`, {
        method: 'PATCH',
        headers: { Authorization: `Bearer ${session?.access_token}` },
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      addToast(`✅ "${data.book?.title}" marked as returned`, 'success')
      setReservations(prev =>
        prev.map(r => r.id === id ? { ...r, status: 'returned', returned_at: data.returned_at } : r)
      )
    } catch (err) {
      addToast(err.message, 'error')
    } finally {
      setReturning(null)
    }
  }

  const active   = reservations.filter(r => r.status === 'active')
  const returned = reservations.filter(r => r.status === 'returned')

  if (loading) return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: 'var(--space-8) var(--space-4)' }}>
      {[...Array(4)].map((_, i) => (
        <div key={i} className="skeleton" style={{ height: '72px', borderRadius: 'var(--radius-lg)', marginBottom: 'var(--space-3)' }} />
      ))}
    </div>
  )

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: 'var(--space-8) var(--space-4)' }}>
      <h1 style={{ fontWeight: 700, fontSize: 'var(--text-xl)', marginBottom: 'var(--space-2)' }}>⛏️ Admin — Reservations</h1>
      <p style={{ color: 'var(--color-text-muted)', marginBottom: 'var(--space-6)', fontSize: '0.9rem' }}>
        {active.length} active &middot; {returned.length} returned
      </p>

      {/* Active reservations */}
      <h2 style={{ fontWeight: 600, fontSize: 'var(--text-lg)', marginBottom: 'var(--space-4)' }}>Active</h2>
      {active.length === 0 ? (
        <p style={{ color: 'var(--color-text-muted)', marginBottom: 'var(--space-8)' }}>No active reservations.</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', marginBottom: 'var(--space-8)' }}>
          {active.map(r => {
            const overdue = r.due_date && new Date(r.due_date) < new Date()
            return (
              <div key={r.id} style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                background: 'var(--color-surface)',
                border: `1px solid ${overdue ? 'var(--color-error)' : 'var(--color-border)'}`,
                borderRadius: 'var(--radius-lg)',
                padding: 'var(--space-4) var(--space-5)',
                gap: 'var(--space-4)',
              }}>
                <div>
                  <p style={{ fontWeight: 600 }}>{r.book?.title}</p>
                  <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
                    {r.name} &middot; {r.email}
                    {r.due_date && (
                      <span style={{ color: overdue ? 'var(--color-error)' : 'var(--color-text-muted)', fontWeight: overdue ? 700 : 400 }}>
                        {' '}&middot; Due {new Date(r.due_date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}
                        {overdue && ' ⚠️ OVERDUE'}
                      </span>
                    )}
                  </p>
                </div>
                <button
                  onClick={() => handleReturn(r.id)}
                  disabled={returning === r.id}
                  style={{
                    padding: '0.4rem 1rem',
                    background: returning === r.id ? 'var(--color-text-faint)' : 'var(--color-success)',
                    color: '#fff', border: 'none',
                    borderRadius: 'var(--radius-md)',
                    fontSize: '0.8rem', fontWeight: 600,
                    cursor: returning === r.id ? 'not-allowed' : 'pointer',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {returning === r.id ? 'Returning...' : 'Mark returned'}
                </button>
              </div>
            )
          })}
        </div>
      )}

      {/* Returned */}
      <h2 style={{ fontWeight: 600, fontSize: 'var(--text-lg)', marginBottom: 'var(--space-4)' }}>Returned</h2>
      {returned.length === 0 ? (
        <p style={{ color: 'var(--color-text-muted)' }}>No returned books yet.</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
          {returned.map(r => (
            <div key={r.id} style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              background: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-lg)',
              padding: 'var(--space-4) var(--space-5)',
              opacity: 0.7,
            }}>
              <div>
                <p style={{ fontWeight: 600 }}>{r.book?.title}</p>
                <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
                  {r.name} &middot; Returned {r.returned_at ? new Date(r.returned_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }) : '—'}
                </p>
              </div>
              <span style={{
                fontSize: 'var(--text-xs)', fontWeight: 600, padding: '2px 8px',
                borderRadius: 'var(--radius-full)',
                background: 'var(--color-success-highlight)', color: 'var(--color-success)',
              }}>returned</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
