export default function SearchBar({ value, onChange }) {
  return (
    <div style={{ position: 'relative', maxWidth: 480 }}>
      <svg
        width="18" height="18" viewBox="0 0 24 24" fill="none"
        stroke="var(--color-text-muted)" strokeWidth="2"
        style={{ position: 'absolute', left: 'var(--space-3)', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}
      >
        <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
      </svg>
      <input
        type="text"
        placeholder="Search by title or author..."
        value={value}
        onChange={e => onChange(e.target.value)}
        style={{
          width: '100%',
          paddingLeft: 'calc(var(--space-3) + 18px + var(--space-2))',
          paddingRight: value ? 'calc(var(--space-3) + 20px)' : 'var(--space-3)',
          paddingBlock: 'var(--space-3)',
          background: 'var(--color-surface)',
          border: '1px solid var(--color-border)',
          borderRadius: 'var(--radius-lg)',
          fontSize: 'var(--text-sm)',
          color: 'var(--color-text)',
          transition: 'border-color var(--transition), box-shadow var(--transition)',
          outline: 'none',
        }}
        onFocus={e => { e.target.style.borderColor = 'var(--color-primary)'; e.target.style.boxShadow = '0 0 0 3px rgba(37,99,235,0.12)' }}
        onBlur={e => { e.target.style.borderColor = 'var(--color-border)'; e.target.style.boxShadow = 'none' }}
      />
      {value && (
        <button
          onClick={() => onChange('')}
          aria-label="Clear search"
          style={{
            position: 'absolute', right: 'var(--space-3)', top: '50%', transform: 'translateY(-50%)',
            color: 'var(--color-text-muted)', display: 'flex', alignItems: 'center', padding: 2,
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M18 6L6 18M6 6l12 12"/>
          </svg>
        </button>
      )}
    </div>
  )
}
