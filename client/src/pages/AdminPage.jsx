import { useCallback, useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useToast } from '../context/ToastContext'

const API = import.meta.env.VITE_API_URL

const GENRES = ['Fiction', 'Non-Fiction', 'Technology', 'Science', 'Classic', 'Sci-Fi', 'Fantasy', 'Self-Help', 'Dystopian', 'History', 'Biography']

const EMPTY_BOOK = { title: '', author: '', genre: '', description: '' }

export default function AdminPage() {
  const { session } = useAuth()
  const { addToast } = useToast()

  const [reservations, setReservations] = useState([])
  const [resLoading, setResLoading]     = useState(true)
  const [returning, setReturning]       = useState(null)

  const [books, setBooks]               = useState([])
  const [booksLoading, setBooksLoading] = useState(true)
  const [deleting, setDeleting]         = useState(null)

  const [showAddModal, setShowAddModal] = useState(false)
  const [form, setForm]                 = useState(EMPTY_BOOK)
  const [adding, setAdding]             = useState(false)

  const [tab, setTab] = useState('reservations')

  const authHeaders = { Authorization: `Bearer ${session?.access_token}` }

  const fetchReservations = useCallback(async () => {
    try {
      const res  = await fetch(`${API}/api/reservations`, { headers: { Authorization: `Bearer ${session?.access_token}` } })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      setReservations(data)
    } catch (err) {
      addToast(err.message, 'error')
    } finally {
      setResLoading(false)
    }
  }, [session?.access_token, addToast])

  const handleReturn = async (id) => {
    setReturning(id)
    try {
      const res  = await fetch(`${API}/api/reservations/${id}/return`, { method: 'PATCH', headers: authHeaders })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      addToast(`✅ "${data.book?.title}" marked as returned`, 'success')
      setReservations(prev => prev.map(r => r.id === id ? { ...r, status: 'returned', returned_at: data.returned_at } : r))
    } catch (err) {
      addToast(err.message, 'error')
    } finally {
      setReturning(null)
    }
  }

  const fetchBooks = useCallback(async () => {
    try {
      const res  = await fetch(`${API}/api/books`)
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      setBooks(data)
    } catch (err) {
      addToast(err.message, 'error')
    } finally {
      setBooksLoading(false)
    }
  }, [addToast])

  const handleAddBook = async (e) => {
    e.preventDefault()
    setAdding(true)
    try {
      const res = await fetch(`${API}/api/books`, {
        method: 'POST',
        headers: { ...authHeaders, 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      addToast(`📚 "${data.title}" added`, 'success')
      setBooks(prev => [data, ...prev])
      setShowAddModal(false)
      setForm(EMPTY_BOOK)
    } catch (err) {
      addToast(err.message, 'error')
    } finally {
      setAdding(false)
    }
  }

  const handleDeleteBook = async (book) => {
    const activeRes = reservations.filter(r => r.book_id === book.id && r.status === 'active')
    if (activeRes.length > 0) {
      if (!window.confirm(`"${book.title}" has ${activeRes.length} active reservation(s). Delete anyway?`)) return
    } else {
      if (!window.confirm(`Delete "${book.title}"? This cannot be undone.`)) return
    }
    setDeleting(book.id)
    try {
      const res = await fetch(`${API}/api/books/${book.id}`, { method: 'DELETE', headers: authHeaders })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      addToast(`🗑️ "${book.title}" deleted`, 'success')
      setBooks(prev => prev.filter(b => b.id !== book.id))
    } catch (err) {
      addToast(err.message, 'error')
    } finally {
      setDeleting(null)
    }
  }

  useEffect(() => {
    fetchReservations()
    fetchBooks()
  }, [fetchReservations, fetchBooks])

  const active   = reservations.filter(r => r.status === 'active')
  const returned = reservations.filter(r => r.status === 'returned')

  const tabStyle = (t) => ({
    padding: 'var(--space-2) var(--space-5)',
    borderRadius: 'var(--radius-full)',
    border: 'none',
    background: tab === t ? 'var(--color-primary)' : 'transparent',
    color: tab === t ? '#fff' : 'var(--color-text-muted)',
    fontWeight: tab === t ? 600 : 400,
    fontSize: 'var(--text-sm)',
    cursor: 'pointer',
    transition: 'all var(--transition-interactive)',
  })

  const skeletons = (n, h = '72px') => [...Array(n)].map((_, i) => (
    <div key={i} className="skeleton" style={{ height: h, borderRadius: 'var(--radius-lg)', marginBottom: 'var(--space-3)' }} />
  ))

  return (
    <div style={{ maxWidth: '960px', margin: '0 auto', padding: 'var(--space-8) var(--space-4)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'var(--space-6)' }}>
        <div>
          <h1 style={{ fontWeight: 700, fontSize: 'var(--text-xl)', marginBottom: 'var(--space-1)' }}>Admin Dashboard</h1>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>
            {active.length} active reservation{active.length !== 1 ? 's' : ''} &middot; {books.length} book{books.length !== 1 ? 's' : ''} in catalogue
          </p>
        </div>
        {tab === 'books' && (
          <button
            onClick={() => setShowAddModal(true)}
            style={{
              padding: 'var(--space-2) var(--space-5)',
              background: 'var(--color-primary)',
              color: '#fff', border: 'none',
              borderRadius: 'var(--radius-md)',
              fontWeight: 600, fontSize: 'var(--text-sm)',
              cursor: 'pointer',
            }}
          >
            + Add Book
          </button>
        )}
      </div>

      <div style={{ display: 'flex', gap: 'var(--space-2)', marginBottom: 'var(--space-6)', background: 'var(--color-surface-offset)', borderRadius: 'var(--radius-full)', padding: '3px', width: 'fit-content' }}>
        <button style={tabStyle('reservations')} onClick={() => setTab('reservations')}>Reservations</button>
        <button style={tabStyle('books')} onClick={() => setTab('books')}>Books</button>
      </div>

      {tab === 'reservations' && (
        resLoading ? skeletons(4) : (
          <>
            <h2 style={{ fontWeight: 600, fontSize: 'var(--text-lg)', marginBottom: 'var(--space-4)' }}>Active ({active.length})</h2>
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
                      padding: 'var(--space-4) var(--space-5)', gap: 'var(--space-4)',
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
                        {returning === r.id ? 'Returning…' : 'Mark returned'}
                      </button>
                    </div>
                  )
                })}
              </div>
            )}

            <h2 style={{ fontWeight: 600, fontSize: 'var(--text-lg)', marginBottom: 'var(--space-4)' }}>Returned ({returned.length})</h2>
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
                    padding: 'var(--space-4) var(--space-5)', opacity: 0.7,
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
          </>
        )
      )}

      {tab === 'books' && (
        booksLoading ? skeletons(6, '60px') : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
            {books.length === 0 ? (
              <p style={{ color: 'var(--color-text-muted)' }}>No books in catalogue yet. Add one above.</p>
            ) : books.map(book => (
              <div key={book.id} style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                background: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-lg)',
                padding: 'var(--space-3) var(--space-5)', gap: 'var(--space-4)',
              }}>
                <div style={{ flex: 1 }}>
                  <span style={{ fontWeight: 600 }}>{book.title}</span>
                  <span style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem' }}> by {book.author}</span>
                  {book.genre && (
                    <span style={{
                      marginLeft: 'var(--space-2)',
                      fontSize: 'var(--text-xs)', padding: '2px 8px',
                      borderRadius: 'var(--radius-full)',
                      background: 'var(--color-surface-offset)', color: 'var(--color-text-faint)',
                    }}>{book.genre}</span>
                  )}
                </div>
                <div style={{ display: 'flex', gap: 'var(--space-2)', alignItems: 'center' }}>
                  <span style={{
                    fontSize: 'var(--text-xs)', fontWeight: 600, padding: '2px 8px',
                    borderRadius: 'var(--radius-full)',
                    background: book.available ? 'var(--color-success-highlight)' : 'var(--color-error-highlight)',
                    color: book.available ? 'var(--color-success)' : 'var(--color-error)',
                  }}>{book.available ? 'Available' : 'Reserved'}</span>
                  <button
                    onClick={() => handleDeleteBook(book)}
                    disabled={deleting === book.id}
                    style={{
                      padding: '0.35rem 0.875rem',
                      border: '1px solid var(--color-error)',
                      borderRadius: 'var(--radius-md)',
                      color: deleting === book.id ? 'var(--color-text-faint)' : 'var(--color-error)',
                      background: 'transparent',
                      fontSize: '0.8rem', fontWeight: 600,
                      cursor: deleting === book.id ? 'not-allowed' : 'pointer',
                    }}
                  >
                    {deleting === book.id ? 'Deleting…' : 'Delete'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )
      )}

      {showAddModal && (
        <div style={{
          position: 'fixed', inset: 0,
          background: 'oklch(0 0 0 / 0.5)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          zIndex: 1000, padding: 'var(--space-4)',
        }}
          onClick={e => { if (e.target === e.currentTarget) setShowAddModal(false) }}
        >
          <div style={{
            background: 'var(--color-surface)',
            borderRadius: 'var(--radius-xl)',
            padding: 'var(--space-8)',
            width: '100%', maxWidth: '480px',
            boxShadow: 'var(--shadow-lg)',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-6)' }}>
              <h2 style={{ fontWeight: 700, fontSize: 'var(--text-lg)' }}>Add New Book</h2>
              <button onClick={() => setShowAddModal(false)} style={{ background: 'none', border: 'none', color: 'var(--color-text-muted)', fontSize: '1.25rem', cursor: 'pointer', lineHeight: 1 }}>×</button>
            </div>

            <form onSubmit={handleAddBook} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
              {[['title', 'Title *'], ['author', 'Author *']].map(([field, label]) => (
                <div key={field}>
                  <label style={{ display: 'block', fontSize: 'var(--text-sm)', fontWeight: 500, marginBottom: 'var(--space-1)' }}>{label}</label>
                  <input
                    required
                    value={form[field]}
                    onChange={e => setForm(f => ({ ...f, [field]: e.target.value }))}
                    style={{
                      width: '100%', padding: 'var(--space-2) var(--space-3)',
                      border: '1px solid var(--color-border)',
                      borderRadius: 'var(--radius-md)',
                      background: 'var(--color-bg)',
                      fontSize: 'var(--text-sm)', color: 'var(--color-text)',
                    }}
                  />
                </div>
              ))}

              <div>
                <label style={{ display: 'block', fontSize: 'var(--text-sm)', fontWeight: 500, marginBottom: 'var(--space-1)' }}>Genre *</label>
                <select
                  required
                  value={form.genre}
                  onChange={e => setForm(f => ({ ...f, genre: e.target.value }))}
                  style={{
                    width: '100%', padding: 'var(--space-2) var(--space-3)',
                    border: '1px solid var(--color-border)',
                    borderRadius: 'var(--radius-md)',
                    background: 'var(--color-bg)',
                    fontSize: 'var(--text-sm)', color: 'var(--color-text)',
                  }}
                >
                  <option value="" disabled>Select genre…</option>
                  {GENRES.map(g => <option key={g} value={g}>{g}</option>)}
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: 'var(--text-sm)', fontWeight: 500, marginBottom: 'var(--space-1)' }}>Description</label>
                <textarea
                  rows={3}
                  value={form.description}
                  onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                  style={{
                    width: '100%', padding: 'var(--space-2) var(--space-3)',
                    border: '1px solid var(--color-border)',
                    borderRadius: 'var(--radius-md)',
                    background: 'var(--color-bg)',
                    fontSize: 'var(--text-sm)', color: 'var(--color-text)',
                    resize: 'vertical',
                  }}
                />
              </div>

              <div style={{ display: 'flex', gap: 'var(--space-3)', marginTop: 'var(--space-2)' }}>
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  style={{
                    flex: 1, padding: 'var(--space-3)',
                    border: '1px solid var(--color-border)',
                    borderRadius: 'var(--radius-md)',
                    background: 'transparent', color: 'var(--color-text)',
                    fontWeight: 500, cursor: 'pointer',
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={adding}
                  style={{
                    flex: 1, padding: 'var(--space-3)',
                    background: adding ? 'var(--color-text-faint)' : 'var(--color-primary)',
                    color: '#fff', border: 'none',
                    borderRadius: 'var(--radius-md)',
                    fontWeight: 600, cursor: adding ? 'not-allowed' : 'pointer',
                  }}
                >
                  {adding ? 'Adding…' : 'Add Book'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
