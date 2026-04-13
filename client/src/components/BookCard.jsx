import { Link } from 'react-router-dom'

export default function BookCard({ book }) {
  const { id, title, author, genre, available } = book

  return (
    <div style={{
      background: 'var(--color-surface)',
      border: '1px solid var(--color-border)',
      borderRadius: 'var(--radius-lg)',
      padding: '1.25rem',
      display: 'flex', flexDirection: 'column', gap: '0.5rem',
      boxShadow: 'var(--shadow-sm)',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <span style={{
          fontSize: '0.75rem', fontWeight: 600,
          padding: '0.2rem 0.6rem',
          borderRadius: 'var(--radius-md)',
          background: available ? '#dcfce7' : '#fee2e2',
          color: available ? 'var(--color-success)' : 'var(--color-error)',
        }}>
          {available ? 'Available' : 'Reserved'}
        </span>
        <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>{genre}</span>
      </div>
      <h3 style={{ fontWeight: 700, fontSize: '1rem' }}>{title}</h3>
      <p style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>by {author}</p>
      <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
        <Link to={`/books/${id}`} style={{
          flex: 1, textAlign: 'center',
          padding: '0.5rem',
          border: '1px solid var(--color-border)',
          borderRadius: 'var(--radius-md)',
          fontSize: '0.875rem',
        }}>View Details</Link>
        {available && (
          <Link to={`/books/${id}/reserve`} style={{
            flex: 1, textAlign: 'center',
            padding: '0.5rem',
            background: 'var(--color-primary)',
            color: '#fff',
            borderRadius: 'var(--radius-md)',
            fontSize: '0.875rem',
          }}>Reserve</Link>
        )}
      </div>
    </div>
  )
}
