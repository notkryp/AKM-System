export default function SearchBar({ value, onChange, placeholder = 'Search by title or author...' }) {
  return (
    <input
      type="search"
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      aria-label="Search books"
      style={{
        width: '100%',
        maxWidth: '480px',
        padding: '0.625rem 1rem',
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius-md)',
        fontSize: '1rem',
        outline: 'none',
        background: 'var(--color-surface)',
      }}
    />
  )
}
