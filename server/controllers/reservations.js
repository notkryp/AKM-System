import { supabase } from '../lib/supabase.js'

export async function createReservation(req, res) {
  const { bookId, name, email, pickupDate } = req.body

  // Check book exists and is available
  const { data: book, error: bookError } = await supabase
    .from('books')
    .select('id, title, available')
    .eq('id', bookId)
    .single()

  if (bookError || !book) return res.status(404).json({ error: 'Book not found' })
  if (!book.available) return res.status(409).json({ error: `"${book.title}" is already reserved` })

  // Create reservation
  const { data, error } = await supabase
    .from('reservations')
    .insert({
      book_id: bookId,
      name,
      email,
      pickup_date: pickupDate,
      user_id: req.user?.id ?? null,
    })
    .select('*, book:books(title, author)')
    .single()

  if (error) return res.status(500).json({ error: error.message })

  // Mark book unavailable atomically
  await supabase.from('books').update({ available: false }).eq('id', bookId)

  res.status(201).json(data)
}

export async function getMyReservations(req, res) {
  const { data, error } = await supabase
    .from('reservations')
    .select('*, book:books(title, author, genre)')
    .eq('user_id', req.user.id)
    .order('created_at', { ascending: false })

  if (error) return res.status(500).json({ error: error.message })
  res.json(data)
}

export async function deleteReservation(req, res) {
  // Ownership check
  const { data: reservation, error: findError } = await supabase
    .from('reservations')
    .select('*')
    .eq('id', req.params.id)
    .eq('user_id', req.user.id)
    .single()

  if (findError || !reservation) {
    return res.status(404).json({ error: 'Reservation not found or not yours' })
  }

  const { error } = await supabase
    .from('reservations')
    .delete()
    .eq('id', req.params.id)

  if (error) return res.status(500).json({ error: error.message })

  // Free the book
  await supabase.from('books').update({ available: true }).eq('id', reservation.book_id)

  res.json({ message: 'Reservation cancelled successfully' })
}

// Admin only
export async function getAllReservations(req, res) {
  const { data, error } = await supabase
    .from('reservations')
    .select('*, book:books(title, author, genre)')
    .order('created_at', { ascending: false })

  if (error) return res.status(500).json({ error: error.message })
  res.json(data)
}
