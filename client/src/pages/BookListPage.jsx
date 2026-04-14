import { useEffect, useState, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { fetchBooks } from '../lib/api'
import BookCard from '../components/BookCard'
import BookCardSkeleton from '../components/BookCardSkeleton'
import SearchBar from '../components/SearchBar'

const GENRES = ['All', 'Technology', 'Fiction', 'Classic', 'Sci-Fi', 'Fantasy', 'Self-Help', 'Dystopian']

export default function BookListPage() {
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [search, setSearch] = useState('')
  const [genre, setGenre] = useState('All')
  const [availableOnly, setAvailableOnly] = useState(false)

  const load = useCallback(() => {
    setLoading(true)
    setError(null)
    fetchBooks({
      search: search || undefined,
      genre: genre !== 'All' ? genre : undefined,
      available: availableOnly ? true : undefined,
    })
      .then(setBooks)
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }, [search, genre, availableOnly])

  useEffect(() => {
    const t = setTimeout(load, search ? 350 : 0)
    return () => clearTimeout(t)
  }, [load, search])

  return (
    <div className="page-container">
      {/* Header */}
      <div style={{ marginBottom: '1.5rem' }}>
        <h1 style={{ fontWeight: 700, fontSize: 'var(--text-xl)', marginBottom: '0.25rem' }}>Book Catalogue</h1>
        <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>
          {loading ? 'Loading...' : `${books.length} book${books.length !== 1 ? 's' : ''} available`}
        </p>
      </div>

      {/* Search */}
      <SearchBar value={search} onChange={setSearch} placeholder="Search by title or author..." />

      {/* Genre filter chips */}
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', margin: '1rem 0' }}>
        {GENRES.map(g => (
          <button
            key={g}
            onClick={() => setGenre(g)}
            style={{
              padding: '0.3rem 0.875rem',
              borderRadius: 'var(--radius-full)',
              border: `1px solid ${genre === g ? 'var(--color-primary)' : 'var(--color-border)'}`,
              background: genre === g ? 'var(--color-primary)' : 'transparent',
              color: genre === g ? '#fff' : 'var(--color-text-muted)',
              fontSize: '0.8rem', fontWeight: genre === g ? 600 : 400,
              cursor: 'pointer',
              transition: 'all var(--transition-interactive)',
            }}
          >
            {g}
          </button>
        ))}

        {/* Available toggle */}
        <button
          onClick={() => setAvailableOnly(v => !v)}
          style={{
            padding: '0.3rem 0.875rem',
            borderRadius: 'var(--radius-full)',
            border: `1px solid ${availableOnly ? 'var(--color-success)' : 'var(--color-border)'}`,
            background: availableOnly ? 'var(--color-success)' : 'transparent',
            color: availableOnly ? '#fff' : 'var(--color-text-muted)',
            fontSize: '0.8rem', fontWeight: availableOnly ? 600 : 400,
            cursor: 'pointer',
            transition: 'all var(--transition-interactive)',
            marginLeft: 'auto',
          }}
        >
          {availableOnly ? '✓ Available only' : 'Available only'}
        </button>
      </div>

      {/* Error */}
      {error && (
        <div style={{
          padding: '1rem', background: 'var(--color-error-highlight)',
          borderRadius: 'var(--radius-md)', color: 'var(--color-error)',
          marginBottom: '1rem', fontSize: '0.875rem',
        }}>
          {error} — <button onClick={load} style={{ color: 'var(--color-primary)', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 600 }}>Retry</button>
        </div>
      )}

      {/* Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(min(260px, 100%), 1fr))',
        gap: '1.25rem',
      }}>
        {loading
          ? Array.from({ length: 6 }).map((_, i) => <BookCardSkeleton key={i} />)
          : books.length > 0
            ? books.map(book => <BookCard key={book.id} book={book} />)
            : (
              <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '4rem', color: 'var(--color-text-muted)' }}>
                <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>🔍</div>
                <p style={{ fontWeight: 600, marginBottom: '0.25rem' }}>No books found</p>
                <p style={{ fontSize: '0.875rem' }}>Try a different search or genre</p>
              </div>
            )
        }
      </div>
    </div>
  )
}
