import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <div style={{ textAlign: 'center', padding: '6rem 1rem' }}>
      <h1 style={{ fontSize: '4rem', fontWeight: 700, color: 'var(--color-text-muted)' }}>404</h1>
      <p style={{ fontSize: '1.25rem', marginTop: '0.5rem' }}>Page not found</p>
      <Link to="/" style={{
        display: 'inline-block', marginTop: '1.5rem',
        padding: '0.625rem 1.5rem',
        background: 'var(--color-primary)', color: '#fff',
        borderRadius: 'var(--radius-md)', fontWeight: 600
      }}>Go Home</Link>
    </div>
  )
}
