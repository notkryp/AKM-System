import { createContext, useContext, useState, useCallback, useRef } from 'react'

const ToastContext = createContext(null)

const ICONS = {
  success: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>,
  error:   <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>,
  warning: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>,
  info:    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>,
}

const COLORS = {
  success: { bg: 'var(--color-success-bg)', color: 'var(--color-success)', border: 'var(--color-success)' },
  error:   { bg: 'var(--color-error-bg)',   color: 'var(--color-error)',   border: 'var(--color-error)' },
  warning: { bg: 'var(--color-warning-bg)', color: 'var(--color-warning)', border: 'var(--color-warning)' },
  info:    { bg: 'var(--color-surface-offset)', color: 'var(--color-text-muted)', border: 'var(--color-border)' },
}

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])
  const idRef = useRef(0)

  const addToast = useCallback((message, type = 'info', duration = 3500) => {
    const id = ++idRef.current
    setToasts(t => [...t, { id, message, type, leaving: false }])
    setTimeout(() => {
      setToasts(t => t.map(x => x.id === id ? { ...x, leaving: true } : x))
      setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 320)
    }, duration)
  }, [])

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <div style={{
        position: 'fixed', bottom: 'var(--space-6)', right: 'var(--space-6)',
        zIndex: 9999, display: 'flex', flexDirection: 'column', gap: 'var(--space-2)',
        pointerEvents: 'none', maxWidth: 360,
      }}>
        {toasts.map(({ id, message, type, leaving }) => {
          const c = COLORS[type] || COLORS.info
          return (
            <div key={id} style={{
              display: 'flex', alignItems: 'center', gap: 'var(--space-3)',
              padding: 'var(--space-3) var(--space-4)',
              background: 'var(--color-surface)',
              border: `1px solid ${c.border}`,
              borderLeft: `4px solid ${c.border}`,
              borderRadius: 'var(--radius-lg)',
              boxShadow: 'var(--shadow-lg)',
              color: 'var(--color-text)',
              fontSize: 'var(--text-sm)',
              pointerEvents: 'auto',
              animation: `${leaving ? 'slideOut' : 'slideIn'} 0.3s ease forwards`,
            }}>
              <span style={{ color: c.color, flexShrink: 0 }}>{ICONS[type]}</span>
              <span style={{ lineHeight: 1.4 }}>{message}</span>
            </div>
          )
        })}
      </div>
    </ToastContext.Provider>
  )
}

export const useToast = () => useContext(ToastContext)
