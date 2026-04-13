import { createContext, useContext, useState, useCallback } from 'react'

const ToastContext = createContext(null)

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])

  const addToast = useCallback((message, type = 'success') => {
    const id = Date.now()
    setToasts(prev => [...prev, { id, message, type }])
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id))
    }, 4000)
  }, [])

  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(t => t.id !== id))
  }, [])

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      {/* Toast container */}
      <div style={{
        position: 'fixed', bottom: '1.5rem', right: '1.5rem',
        display: 'flex', flexDirection: 'column', gap: '0.5rem',
        zIndex: 9999
      }}>
        {toasts.map(toast => (
          <div key={toast.id} style={{
            padding: '0.75rem 1.25rem',
            borderRadius: 'var(--radius-md)',
            background: toast.type === 'success' ? 'var(--color-success)'
              : toast.type === 'error' ? 'var(--color-error)'
              : '#374151',
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            boxShadow: 'var(--shadow-md)',
            minWidth: '260px',
            maxWidth: '380px',
          }}>
            <span style={{ flex: 1 }}>{toast.message}</span>
            <button
              onClick={() => removeToast(toast.id)}
              style={{ background: 'none', border: 'none', color: '#fff', fontSize: '1.1rem', cursor: 'pointer' }}
              aria-label="Dismiss"
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}

export const useToast = () => {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used inside ToastProvider')
  return ctx
}
