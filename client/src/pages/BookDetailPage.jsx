import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { fetchBookById } from '../lib/api'

export default function BookDetailPage() {
  const { id } = useParams()
  const [book, setBook] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchBookById(id).then(setBook).finally(() => setLoading(false))
  }, [id])

  if (loading) return <p>Loading...</p>
  if (!book) return <p>Book not found.</p>

  return (
    <div style={{ maxWidth: '640px' }}>
      <Link to="/" style={{ color: 'var(--color-primary)', fontSize: '0.875rem' }}>← Back to all books</Link>
      <h1 style={{ marginTop: '1rem', fontWeight: 700, fontSize: '1.75rem' }}>{book.title}</h1>
      <p style={{ color: 'var(--color-text-muted)', marginTop: '0.25rem' }}>by {book.author}</p>
      <span style={{
        display: 'inline-block', marginTop: '0.75rem',
        padding: '0.2rem 0.75rem', borderRadius: 'var(--radius-md)',
        background: book.available ? '#dcfce7' : '#fee2e2',
        color: book.available ? 'var(--color-success)' : 'var(--color-error)',
        fontWeight: 600, fontSize: '0.875rem'
      }}>
        {book.available ? 'Available' : 'Reserved'}
      </span>
      <p style={{ marginTop: '1.25rem', lineHeight: 1.7 }}>{book.description}</p>
      {book.available && (
        <Link to={`/books/${id}/reserve`} style={{
          display: 'inline-block', marginTop: '1.5rem',
          padding: '0.625rem 1.5rem',
          background: 'var(--color-primary)', color: '#fff',
          borderRadius: 'var(--radius-md)', fontWeight: 600,
        }}>Reserve This Book</Link>
      )}
    </div>
  )
}
