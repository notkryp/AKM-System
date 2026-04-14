import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <div style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      minHeight: '60vh', textAlign: 'center', gap: 'var(--space-4)',
    }}>
      <p style={{ fontSize: 'clamp(4rem,12vw,8rem)', fontWeight: 800, color: 'var(--color-surface-offset)', lineHeight: 1 }}>404</p>
      <h1 style={{ fontSize: 'var(--text-xl)', fontFamily: 'var(--font-display)', fontWeight: 400 }}>Page not found</h1>
      <p style={{ color: 'var(--color-text-muted)', maxWidth: '40ch', fontSize: 'var(--text-sm)' }}>
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link to="/" style={{
        marginTop: 'var(--space-2)',
        background: 'var(--color-primary)', color: '#fff',
        padding: 'var(--space-3) var(--space-6)',
        borderRadius: 'var(--radius-lg)', fontWeight: 500,
        fontSize: 'var(--text-sm)',
      }}>← Back to books</Link>
    </div>
  )
}
