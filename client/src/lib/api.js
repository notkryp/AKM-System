const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

/**
 * Core fetch wrapper with error handling.
 * Extracts error message from JSON response body when available.
 */
async function request(path, options = {}) {
  const res = await fetch(`${API_URL}${path}`, {
    headers: { 'Content-Type': 'application/json', ...options.headers },
    ...options,
  })

  if (!res.ok) {
    let message = `Request failed (${res.status})`
    try {
      const body = await res.json()
      if (body?.error) message = body.error
    } catch {}
    throw new Error(message)
  }

  // 204 No Content
  if (res.status === 204) return null
  return res.json()
}

/** Attach Bearer token header if token provided */
function authHeader(token) {
  return token ? { Authorization: `Bearer ${token}` } : {}
}

// ─── Books ───────────────────────────────────────────────────────────────────────────────

export function fetchBooks({ genre, search, available } = {}) {
  const params = new URLSearchParams()
  if (genre) params.set('genre', genre)
  if (search) params.set('search', search)
  if (available !== undefined) params.set('available', available)
  const qs = params.toString()
  return request(`/api/books${qs ? `?${qs}` : ''}`)
}

export function fetchBookById(id) {
  return request(`/api/books/${id}`)
}

// ─── Reservations ───────────────────────────────────────────────────────────────────────

export function createReservation(data, token) {
  return request('/api/reservations', {
    method: 'POST',
    headers: authHeader(token),
    body: JSON.stringify(data),
  })
}

export function fetchMyReservations(token) {
  return request('/api/reservations/my', {
    headers: authHeader(token),
  })
}

export function cancelReservation(id, token) {
  return request(`/api/reservations/${id}`, {
    method: 'DELETE',
    headers: authHeader(token),
  })
}

// ─── Admin ───────────────────────────────────────────────────────────────────────────────

// GET /api/reservations/ — admin only, returns all reservations
export function fetchAllReservations(token) {
  return request('/api/reservations/', {
    headers: authHeader(token),
  })
}

export function updateBook(id, updates, token) {
  return request(`/api/books/${id}`, {
    method: 'PATCH',
    headers: authHeader(token),
    body: JSON.stringify(updates),
  })
}
