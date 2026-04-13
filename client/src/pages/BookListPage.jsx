import { useEffect, useState } from 'react'
import { fetchBooks } from '../lib/api'
import BookCard from '../components/BookCard'
import SearchBar from '../components/SearchBar'

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
    b.title.toLowerCase().includes(query.toLowerCase()) ||
    b.author.toLowerCase().includes(query.toLowerCase())
  )

  if (loading) return <p>Loading books...</p>
  if (error) return <p style={{ color: 'var(--color-error)' }}>Error: {error}</p>

  return (
    <div>
      <div style={{ marginBottom: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <h1 style={{ fontWeight: 700, fontSize: '1.75rem' }}>Browse Books</h1>
        <SearchBar value={query} onChange={setQuery} />
      </div>
      {filtered.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--color-text-muted)' }}>
          <p style={{ fontSize: '1.25rem' }}>No books found for "{query}"</p>
          <button onClick={() => setQuery('')} style={{ marginTop: '1rem', color: 'var(--color-primary)' }}>
            Clear search
          </button>
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '1.25rem',
        }}>
          {filtered.map(book => <BookCard key={book.id} book={book} />)}
        </div>
      )}
    </div>
  )
}
