const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

export async function fetchBooks() {
  const res = await fetch(`${API_URL}/api/books`)
  if (!res.ok) throw new Error('Failed to fetch books')
  return res.json()
}

export async function fetchBookById(id) {
  const res = await fetch(`${API_URL}/api/books/${id}`)
  if (!res.ok) throw new Error('Book not found')
  return res.json()
}

export async function createReservation(data, token) {
  const res = await fetch(`${API_URL}/api/reservations`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error('Failed to create reservation')
  return res.json()
}

export async function fetchMyReservations(token) {
  const res = await fetch(`${API_URL}/api/reservations/me`, {
    headers: { Authorization: `Bearer ${token}` },
  })
  if (!res.ok) throw new Error('Failed to fetch reservations')
  return res.json()
}

export async function cancelReservation(id, token) {
  const res = await fetch(`${API_URL}/api/reservations/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  })
  if (!res.ok) throw new Error('Failed to cancel reservation')
  return res.json()
}
