import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { fetchBookById } from '../lib/api'
import { useAuth } from '../context/AuthContext'

// ── Static mock reviews (replace with API call when backend ready) ──
const MOCK_REVIEWS = [
  { id: 1, user: 'Alice M.', rating: 5, date: '2026-03-10', spoiler: false, comment: 'A chilling masterpiece. Orwell\'s vision of totalitarianism feels more relevant than ever. Absolutely essential reading.' },
  { id: 2, user: 'James K.', rating: 4, date: '2026-02-28', spoiler: true,  comment: 'The ending where Winston finally breaks completely devastated me. Room 101 is one of the most haunting scenes in all of literature.' },
  { id: 3, user: 'Priya S.', rating: 5, date: '2026-01-15', spoiler: false, comment: 'Read this in one sitting. The world-building is dense but every page is gripping. Big Brother is watching — and it\'s terrifying.' },
  { id: 4, user: 'Tom R.',   rating: 3, date: '2025-12-20', spoiler: false, comment: 'Important book, somewhat slow in the middle. The appendix on Newspeak is a fascinating political essay in disguise.' },
  { id: 5, user: 'Sara B.',  rating: 4, date: '2025-11-05', spoiler: true,  comment: 'Julia and Winston\'s relationship gives the story its heart. Seeing them betray each other at the end is gut-wrenching.' },
]

function StarRating({ value, onChange }) {
  const [hovered, setHovered] = useState(0)
  return (
    <div style={{ display: 'flex', gap: '0.2rem', cursor: onChange ? 'pointer' : 'default' }}>
      {[1,2,3,4,5].map(star => (
        <span
          key={star}
          onMouseEnter={() => onChange && setHovered(star)}
          onMouseLeave={() => onChange && setHovered(0)}
          onClick={() => onChange && onChange(star)}
          style={{
            fontSize: '1.25rem',
            color: star <= (hovered || value) ? '#f59e0b' : 'var(--color-border)',
            transition: 'color 0.15s',
            userSelect: 'none',
          }}
        >★</span>
      ))}
    </div>
  )
}

function ReviewCard({ review }) {
  const [revealed, setRevealed] = useState(false)
  return (
    <div style={{
      background: 'var(--color-surface)',
      border: '1px solid var(--color-border)',
      borderRadius: 'var(--radius-lg)',
      padding: '1rem 1.25rem',
    }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
          <div style={{
            width: 34, height: 34, borderRadius: '50%',
            background: 'var(--color-primary-highlight)',
            color: 'var(--color-primary)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontWeight: 700, fontSize: '0.8rem', flexShrink: 0,
          }}>
            {review.user.charAt(0)}
          </div>
          <div>
            <p style={{ fontWeight: 600, fontSize: '0.875rem', margin: 0 }}>{review.user}</p>
            <p style={{ fontSize: '0.7rem', color: 'var(--color-text-faint)', margin: 0 }}>{review.date}</p>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
          <StarRating value={review.rating} />
          {review.spoiler && (
            <span style={{
              fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em',
              background: 'var(--color-warning-highlight)', color: 'var(--color-warning)',
              borderRadius: 'var(--radius-full)', padding: '0.15rem 0.5rem',
            }}>⚠ Spoiler</span>
          )}
        </div>
      </div>

      {/* Comment body */}
      {review.spoiler && !revealed ? (
        <div style={{
          background: 'var(--color-surface-offset)',
          borderRadius: 'var(--radius-md)',
          padding: '0.75rem 1rem',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.75rem',
        }}>
          <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', margin: 0 }}>
            This review contains spoilers. Reveal at your own risk.
          </p>
          <button
            onClick={() => setRevealed(true)}
            style={{
              flexShrink: 0,
              fontSize: '0.75rem', fontWeight: 600,
              background: 'var(--color-warning)', color: '#fff',
              border: 'none', borderRadius: 'var(--radius-md)',
              padding: '0.35rem 0.75rem', cursor: 'pointer',
              transition: 'background var(--transition-interactive)',
            }}
          >Reveal</button>
        </div>
      ) : (
        <div style={{ position: 'relative' }}>
          <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', lineHeight: 1.65, margin: 0 }}>
            {review.comment}
          </p>
          {review.spoiler && revealed && (
            <button
              onClick={() => setRevealed(false)}
              style={{
                marginTop: '0.5rem',
                fontSize: '0.7rem', color: 'var(--color-text-faint)',
                background: 'none', border: 'none', cursor: 'pointer', padding: 0,
                textDecoration: 'underline',
              }}
            >Hide spoiler</button>
          )}
        </div>
      )}
    </div>
  )
}

export default function BookDetailPage() {
  const { id } = useParams()
  const { user } = useAuth()
  const [book, setBook]     = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError]   = useState(null)

  // Review form state
  const [reviews, setReviews]         = useState(MOCK_REVIEWS)
  const [newRating, setNewRating]     = useState(0)
  const [newComment, setNewComment]   = useState('')
  const [isSpoiler, setIsSpoiler]     = useState(false)
  const [filter, setFilter]           = useState('all') // 'all' | 'spoiler' | 'clean'
  const [submitted, setSubmitted]     = useState(false)

  useEffect(() => {
    fetchBookById(id)
      .then(setBook)
      .catch(() => setError('Book not found'))
      .finally(() => setLoading(false))
  }, [id])

  const avgRating = reviews.length
    ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1)
    : null

  const filteredReviews = reviews.filter(r => {
    if (filter === 'spoiler') return r.spoiler
    if (filter === 'clean')   return !r.spoiler
    return true
  })

  function handleSubmitReview(e) {
    e.preventDefault()
    if (!newRating || !newComment.trim()) return
    const review = {
      id: Date.now(),
      user: user?.email?.split('@')[0] || 'Anonymous',
      rating: newRating,
      date: new Date().toISOString().slice(0, 10),
      spoiler: isSpoiler,
      comment: newComment.trim(),
    }
    setReviews(prev => [review, ...prev])
    setNewRating(0)
    setNewComment('')
    setIsSpoiler(false)
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
  }

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
    <div className="page-container" style={{ paddingBottom: '4rem' }}>
      <Link to="/" style={{
        color: 'var(--color-text-muted)', fontSize: '0.875rem',
        display: 'inline-flex', alignItems: 'center', gap: '0.25rem',
        marginBottom: '1.5rem', textDecoration: 'none',
      }}>← Back to catalogue</Link>

      {/* ── Book header ── */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'clamp(140px, 20vw, 220px) 1fr',
        gap: 'clamp(1rem, 3vw, 2.5rem)',
        alignItems: 'start',
        marginBottom: '2.5rem',
      }}>
        {/* Cover */}
        <div style={{ position: 'relative' }}>
          {book.cover_url ? (
            <img
              src={book.cover_url}
              alt={`Cover of ${book.title}`}
              width={220} height={330}
              loading="lazy"
              style={{ width: '100%', height: 'auto', borderRadius: 'var(--radius-lg)', display: 'block', objectFit: 'cover' }}
              onError={e => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex' }}
            />
          ) : null}
          <div style={{
            display: book.cover_url ? 'none' : 'flex',
            background: 'var(--color-surface-offset)',
            borderRadius: 'var(--radius-lg)',
            aspectRatio: '2/3',
            alignItems: 'center', justifyContent: 'center',
            fontSize: '3rem',
            border: '1px solid var(--color-border)',
          }}>📖</div>
        </div>

        {/* Info */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem', flexWrap: 'wrap' }}>
            <span style={{
              background: 'var(--color-surface-offset)', color: 'var(--color-text-muted)',
              borderRadius: 'var(--radius-full)', padding: '0.2rem 0.625rem', fontSize: '0.75rem', fontWeight: 500,
            }}>{book.genre}</span>
            <span style={{
              background: book.available ? 'var(--color-success-highlight)' : 'var(--color-error-highlight)',
              color: book.available ? 'var(--color-success)' : 'var(--color-error)',
              borderRadius: 'var(--radius-full)', padding: '0.2rem 0.625rem', fontSize: '0.75rem', fontWeight: 600,
            }}>{book.available ? '● Available' : '● Reserved'}</span>
          </div>

          <h1 style={{ fontWeight: 700, fontSize: 'var(--text-xl)', lineHeight: 1.2, marginBottom: '0.375rem' }}>
            {book.title}
          </h1>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '1rem', marginBottom: '0.875rem' }}>
            by <strong style={{ color: 'var(--color-text)' }}>{book.author}</strong>
          </p>

          {/* Aggregate rating */}
          {avgRating && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
              <StarRating value={Math.round(avgRating)} />
              <span style={{ fontWeight: 700, fontSize: '1rem' }}>{avgRating}</span>
              <span style={{ fontSize: '0.8rem', color: 'var(--color-text-faint)' }}>({reviews.length} review{reviews.length !== 1 ? 's' : ''})</span>
            </div>
          )}

          {book.description && (
            <p style={{ color: 'var(--color-text-muted)', lineHeight: 1.7, marginBottom: '1.5rem', maxWidth: '55ch' }}>
              {book.description}
            </p>
          )}

          {book.available ? (
            <Link to={`/books/${id}/reserve`} style={{
              display: 'inline-block', padding: '0.75rem 1.75rem',
              background: 'var(--color-primary)', color: '#fff',
              borderRadius: 'var(--radius-md)', fontWeight: 600,
              textDecoration: 'none', fontSize: '0.9rem',
              transition: 'background var(--transition-interactive)',
            }}>Reserve this book</Link>
          ) : (
            <button disabled style={{
              padding: '0.75rem 1.75rem', background: 'var(--color-surface-offset)',
              color: 'var(--color-text-faint)', border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-md)', fontWeight: 600, cursor: 'not-allowed', fontSize: '0.9rem',
            }}>Currently unavailable</button>
          )}
        </div>
      </div>

      {/* ── Divider ── */}
      <hr style={{ border: 'none', borderTop: '1px solid var(--color-divider)', marginBottom: '2rem' }} />

      {/* ── Reviews section ── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 480px), 1fr))', gap: '2.5rem', alignItems: 'start' }}>

        {/* Left: reviews list */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '1rem' }}>
            <h2 style={{ fontSize: 'var(--text-lg)', fontWeight: 700, margin: 0 }}>Reader Reviews</h2>
            {/* Spoiler filter */}
            <div style={{ display: 'flex', gap: '0.375rem' }}>
              {['all', 'clean', 'spoiler'].map(f => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  style={{
                    fontSize: '0.72rem', fontWeight: 600, textTransform: 'capitalize',
                    padding: '0.25rem 0.625rem',
                    borderRadius: 'var(--radius-full)',
                    border: '1px solid var(--color-border)',
                    background: filter === f ? 'var(--color-primary)' : 'var(--color-surface)',
                    color: filter === f ? '#fff' : 'var(--color-text-muted)',
                    cursor: 'pointer',
                    transition: 'background var(--transition-interactive), color var(--transition-interactive)',
                  }}
                >{f === 'all' ? 'All' : f === 'clean' ? 'No Spoilers' : '⚠ Spoilers Only'}</button>
              ))}
            </div>
          </div>

          {filteredReviews.length === 0 ? (
            <p style={{ color: 'var(--color-text-faint)', fontSize: '0.875rem' }}>No reviews match this filter.</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
              {filteredReviews.map(r => <ReviewCard key={r.id} review={r} />)}
            </div>
          )}
        </div>

        {/* Right: write a review */}
        <div>
          <h2 style={{ fontSize: 'var(--text-lg)', fontWeight: 700, marginBottom: '1rem' }}>Leave a Review</h2>
          {!user ? (
            <div style={{
              background: 'var(--color-surface)', border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-lg)', padding: '1.25rem',
              textAlign: 'center',
            }}>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem', marginBottom: '0.75rem' }}>
                You need to be logged in to leave a review.
              </p>
              <Link to="/login" style={{
                display: 'inline-block', padding: '0.5rem 1.25rem',
                background: 'var(--color-primary)', color: '#fff',
                borderRadius: 'var(--radius-md)', fontWeight: 600,
                textDecoration: 'none', fontSize: '0.875rem',
              }}>Log in</Link>
            </div>
          ) : (
            <form onSubmit={handleSubmitReview} style={{
              background: 'var(--color-surface)', border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-lg)', padding: '1.25rem',
              display: 'flex', flexDirection: 'column', gap: '1rem',
            }}>
              {/* Star picker */}
              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-text-muted)', display: 'block', marginBottom: '0.375rem' }}>Your Rating *</label>
                <StarRating value={newRating} onChange={setNewRating} />
              </div>

              {/* Comment */}
              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-text-muted)', display: 'block', marginBottom: '0.375rem' }}>Your Review *</label>
                <textarea
                  value={newComment}
                  onChange={e => setNewComment(e.target.value)}
                  placeholder="What did you think of this book?"
                  rows={4}
                  style={{
                    width: '100%', resize: 'vertical',
                    background: 'var(--color-bg)', color: 'var(--color-text)',
                    border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)',
                    padding: '0.625rem 0.75rem', fontSize: '0.875rem', lineHeight: 1.6,
                    outline: 'none',
                  }}
                />
              </div>

              {/* Spoiler toggle */}
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', cursor: 'pointer', userSelect: 'none' }}>
                <div
                  onClick={() => setIsSpoiler(p => !p)}
                  role="checkbox"
                  aria-checked={isSpoiler}
                  tabIndex={0}
                  onKeyDown={e => e.key === ' ' && setIsSpoiler(p => !p)}
                  style={{
                    width: 38, height: 22, borderRadius: 'var(--radius-full)',
                    background: isSpoiler ? 'var(--color-warning)' : 'var(--color-border)',
                    position: 'relative', transition: 'background 0.2s', flexShrink: 0,
                  }}
                >
                  <div style={{
                    position: 'absolute', top: 3, left: isSpoiler ? 19 : 3,
                    width: 16, height: 16, borderRadius: '50%', background: '#fff',
                    transition: 'left 0.2s',
                  }} />
                </div>
                <span style={{ fontSize: '0.8rem', fontWeight: 600, color: isSpoiler ? 'var(--color-warning)' : 'var(--color-text-muted)' }}>
                  {isSpoiler ? '⚠ Mark as Spoiler' : 'Contains Spoilers?'}
                </span>
              </label>

              <button
                type="submit"
                disabled={!newRating || !newComment.trim()}
                style={{
                  padding: '0.65rem 1.25rem', fontWeight: 600, fontSize: '0.875rem',
                  background: (!newRating || !newComment.trim()) ? 'var(--color-surface-offset)' : 'var(--color-primary)',
                  color: (!newRating || !newComment.trim()) ? 'var(--color-text-faint)' : '#fff',
                  border: 'none', borderRadius: 'var(--radius-md)',
                  cursor: (!newRating || !newComment.trim()) ? 'not-allowed' : 'pointer',
                  transition: 'background var(--transition-interactive)',
                }}
              >Submit Review</button>

              {submitted && (
                <p style={{ fontSize: '0.8rem', color: 'var(--color-success)', fontWeight: 600 }}>
                  ✓ Review submitted!
                </p>
              )}
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
