import { Link } from 'react-router-dom'

export default function BookCard({ book }) {
  const { id, title, author, genre, available, cover_image } = book

  return (
    <div
      style={{
        background: 'var(--color-surface)',
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius-xl)',
        padding: 'var(--space-5)',
        display: 'flex', flexDirection: 'column', gap: 'var(--space-3)',
        boxShadow: 'var(--shadow-sm)',
        transition: 'box-shadow var(--transition-interactive), transform var(--transition-interactive)',
      }}
      onMouseEnter={e => { e.currentTarget.style.boxShadow = 'var(--shadow-md)'; e.currentTarget.style.transform = 'translateY(-2px)' }}
      onMouseLeave={e => { e.currentTarget.style.boxShadow = 'var(--shadow-sm)'; e.currentTarget.style.transform = 'translateY(0)' }}
    >
      {/* Top row: availability badge + genre */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{
          fontSize: 'var(--text-xs)', fontWeight: 600,
          padding: '0.2rem 0.65rem',
          borderRadius: 'var(--radius-full)',
          background: available ? 'var(--color-success-highlight)' : 'var(--color-error-highlight)',
          color: available ? 'var(--color-success)' : 'var(--color-error)',
        }}>
          {available ? '● Available' : '● Reserved'}
        </span>
        {genre && (
          <span style={{
            fontSize: 'var(--text-xs)',
            color: 'var(--color-text-faint)',
            background: 'var(--color-surface-offset)',
            padding: '0.15rem 0.5rem',
            borderRadius: 'var(--radius-full)',
          }}>
            {genre}
          </span>
        )}
      </div>

      {/* Cover image */}
      <div style={{
        width: '100%', height: 160,
        background: 'var(--color-surface-offset)',
        borderRadius: 'var(--radius-lg)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        overflow: 'hidden',
        color: 'var(--color-text-faint)',
      }}>
        {cover_image ? (
          <img
            src={cover_image}
            alt={`Cover of ${title}`}
            width={100}
            height={160}
            loading="lazy"
            style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 'var(--radius-lg)' }}
            onError={e => {
              e.currentTarget.style.display = 'none'
              e.currentTarget.nextSibling.style.display = 'flex'
            }}
          />
        ) : null}
        <div style={{
          display: cover_image ? 'none' : 'flex',
          width: '100%', height: '100%',
          alignItems: 'center', justifyContent: 'center',
        }}>
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
          </svg>
        </div>
      </div>

      {/* Title & author */}
      <div>
        <h3 style={{ fontWeight: 600, fontSize: 'var(--text-base)', lineHeight: 1.3, marginBottom: 'var(--space-1)' }}>{title}</h3>
        <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--text-sm)' }}>by {author}</p>
      </div>

      {/* Actions */}
      <div style={{ display: 'flex', gap: 'var(--space-2)', marginTop: 'auto' }}>
        <Link
          to={`/books/${id}`}
          style={{
            flex: 1, textAlign: 'center',
            padding: 'var(--space-2) var(--space-3)',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-md)',
            fontSize: 'var(--text-sm)',
            color: 'var(--color-text)',
            textDecoration: 'none',
            transition: 'background var(--transition-interactive)',
          }}
        >
          Details
        </Link>
        {available ? (
          <Link
            to={`/books/${id}/reserve`}
            style={{
              flex: 1, textAlign: 'center',
              padding: 'var(--space-2) var(--space-3)',
              background: 'var(--color-primary)',
              color: '#fff',
              borderRadius: 'var(--radius-md)',
              fontSize: 'var(--text-sm)',
              fontWeight: 500,
              textDecoration: 'none',
              transition: 'background var(--transition-interactive)',
            }}
          >
            Reserve
          </Link>
        ) : (
          <span style={{
            flex: 1, textAlign: 'center',
            padding: 'var(--space-2) var(--space-3)',
            background: 'var(--color-surface-offset)',
            color: 'var(--color-text-faint)',
            borderRadius: 'var(--radius-md)',
            fontSize: 'var(--text-sm)',
            cursor: 'not-allowed',
          }}>
            Unavailable
          </span>
        )}
      </div>
    </div>
  )
}
