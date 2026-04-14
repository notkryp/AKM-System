export default function BookCardSkeleton() {
  return (
    <div style={{
      background: 'var(--color-surface)',
      border: '1px solid var(--color-border)',
      borderRadius: 'var(--radius-xl)',
      padding: 'var(--space-5)',
      display: 'flex', flexDirection: 'column', gap: 'var(--space-3)',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div className="skeleton" style={{ width: 80, height: 22 }} />
        <div className="skeleton" style={{ width: 50, height: 22 }} />
      </div>
      <div className="skeleton" style={{ width: '100%', height: 120, borderRadius: 'var(--radius-lg)' }} />
      <div>
        <div className="skeleton" style={{ width: '70%', height: 20, marginBottom: 'var(--space-2)' }} />
        <div className="skeleton" style={{ width: '45%', height: 16 }} />
      </div>
      <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
        <div className="skeleton" style={{ flex: 1, height: 36, borderRadius: 'var(--radius-md)' }} />
        <div className="skeleton" style={{ flex: 1, height: 36, borderRadius: 'var(--radius-md)' }} />
      </div>
    </div>
  )
}
