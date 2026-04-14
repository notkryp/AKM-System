import { useEffect, useState } from 'react'
import { fetchBooks } from '../lib/api'
import BookCard from '../components/BookCard'
import BookCardSkeleton from '../components/BookCardSkeleton'
import SearchBar from '../components/SearchBar'

const GRID = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
  gap: 'var(--space-5)',
}

export default function BookListPage() {
  const [books, setBooks] = useState([])
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchBooks()
      .then(setBooks)
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  const filtered = books.filter(b =>
    b.title?.toLowerCase().includes(query.toLowerCase()) ||
    b.author?.toLowerCase().includes(query.toLowerCase())
  )

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: 'var(--space-6)' }}>
        <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 400, fontSize: 'var(--text-xl)', marginBottom: 'var(--space-1)' }}>
          Browse Books
        </h1>
        <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--text-sm)', marginBottom: 'var(--space-4)' }}>
          {loading ? 'Loading...' : `${books.length} books available`}
        </p>
        <SearchBar value={query} onChange={setQuery} />
      </div>

      {/* Error */}
      {error && (
        <div style={{
          padding: 'var(--space-4)', borderRadius: 'var(--radius-lg)',
          background: 'var(--color-error-bg)', color: 'var(--color-error)',
          border: '1px solid var(--color-error)',
          marginBottom: 'var(--space-6)', fontSize: 'var(--text-sm)',
        }}>
          ⚠️ Failed to load books: {error}. Is the backend running?
        </div>
      )}

      {/* Skeletons */}
      {loading && (
        <div style={GRID}>
          {Array.from({ length: 8 }).map((_, i) => <BookCardSkeleton key={i} />)}
        </div>
      )}

      {/* Empty state */}
      {!loading && !error && filtered.length === 0 && (
        <div style={{
          textAlign: 'center', padding: 'var(--space-16) var(--space-8)',
          color: 'var(--color-text-muted)',
        }}>
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2"
            style={{ margin: '0 auto var(--space-4)', color: 'var(--color-text-faint)' }}>
            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
          </svg>
          <p style={{ fontWeight: 600, marginBottom: 'var(--space-2)', color: 'var(--color-text)' }}>
            No books found for "{query}"
          </p>
          <p style={{ fontSize: 'var(--text-sm)', marginBottom: 'var(--space-4)' }}>Try a different search term</p>
          <button
            onClick={() => setQuery('')}
            style={{
              color: 'var(--color-primary)', fontSize: 'var(--text-sm)',
              border: '1px solid var(--color-primary)',
              padding: 'var(--space-2) var(--space-4)',
              borderRadius: 'var(--radius-md)',
              cursor: 'pointer',
            }}
          >
            Clear search
          </button>
        </div>
      )}

      {/* Grid */}
      {!loading && !error && filtered.length > 0 && (
        <div style={GRID}>
          {filtered.map(book => <BookCard key={book.id} book={book} />)}
        </div>
      )}
    </div>
  )
}
