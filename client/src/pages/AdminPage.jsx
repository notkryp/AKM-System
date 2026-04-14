import { useEffect, useState } from 'react'
import { fetchAllReservations } from '../lib/api'
import { useAuth } from '../context/AuthContext'
import { useToast } from '../context/ToastContext'

export default function AdminPage() {
  const [reservations, setReservations] = useState([])
  const [loading, setLoading] = useState(true)
  const { getToken } = useAuth()
  const { addToast } = useToast()

  useEffect(() => {
    getToken()
      .then(token => fetchAllReservations(token))
      .then(setReservations)
      .catch(err => addToast(err.message, 'error'))
      .finally(() => setLoading(false))
  }, [getToken, addToast])

  if (loading) return (
    <div className="page-container">
      <div className="skeleton skeleton-heading" style={{ width: '180px', marginBottom: '1.5rem' }} />
      {[1,2,3,4].map(i => (
        <div key={i} className="skeleton" style={{ height: '60px', borderRadius: 'var(--radius-md)', marginBottom: '0.5rem' }} />
      ))}
    </div>
  )

  return (
    <div className="page-container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h1 style={{ fontWeight: 700, fontSize: 'var(--text-xl)' }}>Admin Dashboard</h1>
        <span style={{
          background: 'var(--color-warning-highlight)', color: 'var(--color-warning)',
          borderRadius: 'var(--radius-full)', padding: '0.25rem 0.75rem',
          fontSize: '0.8rem', fontWeight: 600,
        }}>
          {reservations.length} total reservations
        </span>
      </div>

      {reservations.length === 0 ? (
        <p style={{ color: 'var(--color-text-muted)', textAlign: 'center', padding: '3rem' }}>No reservations found.</p>
      ) : (
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--color-border)', textAlign: 'left' }}>
                {['Book', 'Author', 'Reserved By', 'Email', 'Pick-up Date'].map(h => (
                  <th key={h} style={{ padding: '0.625rem 0.75rem', fontWeight: 600, color: 'var(--color-text-muted)', whiteSpace: 'nowrap' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {reservations.map(r => (
                <tr key={r.id} style={{ borderBottom: '1px solid var(--color-divider)' }}>
                  <td style={{ padding: '0.75rem', fontWeight: 600 }}>{r.book?.title}</td>
                  <td style={{ padding: '0.75rem', color: 'var(--color-text-muted)' }}>{r.book?.author}</td>
                  <td style={{ padding: '0.75rem' }}>{r.name}</td>
                  <td style={{ padding: '0.75rem', color: 'var(--color-text-muted)' }}>{r.email}</td>
                  <td style={{ padding: '0.75rem', whiteSpace: 'nowrap' }}>
                    {new Date(r.pickup_date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
