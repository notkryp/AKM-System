import { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { fetchBookById } from '../lib/api'
import { useAuth } from '../context/AuthContext'

export default function BookDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()
  const [book, setBook] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchBookById(id)
      .then(setBook)
      .catch(() => setError('Book not found'))
      .finally(() => setLoading(false))
  }, [id])

  if (loading) return (
    <div className="page-container">
      <div className="skeleton" style={{ width: '120px', height: '14px', marginBottom: '1.5rem' }} />
      <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr', gap: '2rem' }}>
        <div className="skeleton" style={{ height: '280px', borderRadius: 'var(--radius-lg)' }} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <div className="skeleton skeleton-heading" style={{ width: '60%' }} />
          <div className="skeleton skeleton-text" />
          <div className="skeleton skeleton-text" style={{ width: '40%' }} />
        </div>
      </div>
    </div>
  )

  if (error) return (
    <div className="page-container" style={{ textAlign: 'center', paddingTop: '4rem' }}>
      <p style={{ color: 'var(--color-error)', marginBottom: '1rem' }}>{error}</p>
      <Link to="/" style={{ color: 'var(--color-primary)' }}>← Back to catalogue</Link>
    </div>
  )

  return (
    <div className="page-container">
      <Link to="/" style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem', display: 'inline-flex', alignItems: 'center', gap: '0.25rem', marginBottom: '1.5rem', textDecoration: 'none' }}>
        ← Back to catalogue
      </Link>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'clamp(140px, 20vw, 200px) 1fr',
        gap: 'clamp(1rem, 3vw, 2.5rem)',
        alignItems: 'start',
      }}>
        {/* Book cover placeholder */}
        <div style={{
          background: 'var(--color-surface-offset)',
          borderRadius: 'var(--radius-lg)',
          aspectRatio: '2/3',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '3rem',
          border: '1px solid var(--color-border)',
        }}>
          📖
        </div>

        {/* Info */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem', flexWrap: 'wrap' }}>
            <span style={{
              background: 'var(--color-surface-offset)', color: 'var(--color-text-muted)',
              borderRadius: 'var(--radius-full)', padding: '0.2rem 0.625rem', fontSize: '0.75rem', fontWeight: 500,
            }}>
              {book.genre}
            </span>
            <span style={{
              background: book.available ? 'var(--color-success-highlight)' : 'var(--color-error-highlight)',
              color: book.available ? 'var(--color-success)' : 'var(--color-error)',
              borderRadius: 'var(--radius-full)', padding: '0.2rem 0.625rem', fontSize: '0.75rem', fontWeight: 600,
            }}>
              {book.available ? '● Available' : '● Reserved'}
            </span>
          </div>

          <h1 style={{ fontWeight: 700, fontSize: 'var(--text-xl)', lineHeight: 1.2, marginBottom: '0.375rem' }}>
            {book.title}
          </h1>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '1rem', marginBottom: '1.25rem' }}>
            by <strong style={{ color: 'var(--color-text)' }}>{book.author}</strong>
          </p>

          {book.description && (
            <p style={{ color: 'var(--color-text-muted)', lineHeight: 1.7, marginBottom: '1.5rem', maxWidth: '55ch' }}>
              {book.description}
            </p>
          )}

          {book.available ? (
            <Link
              to={`/books/${id}/reserve`}
              style={{
                display: 'inline-block', padding: '0.75rem 1.75rem',
                background: 'var(--color-primary)', color: '#fff',
                borderRadius: 'var(--radius-md)', fontWeight: 600,
                textDecoration: 'none', fontSize: '0.9rem',
                transition: 'background var(--transition-interactive)',
              }}
            >
              Reserve this book
            </Link>
          ) : (
            <button disabled style={{
              padding: '0.75rem 1.75rem', background: 'var(--color-surface-offset)',
              color: 'var(--color-text-faint)', border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-md)', fontWeight: 600, cursor: 'not-allowed', fontSize: '0.9rem',
            }}>
              Currently unavailable
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
