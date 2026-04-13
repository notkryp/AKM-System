import { supabase } from '../lib/supabase.js'

export async function createReservation(req, res) {
  const { bookId, name, email, pickupDate } = req.body

  if (!bookId || !name || !email || !pickupDate) {
    return res.status(400).json({ error: 'All fields are required' })
  }

  // Check book is available
  const { data: book } = await supabase.from('books').select('available').eq('id', bookId).single()
  if (!book?.available) return res.status(409).json({ error: 'Book is not available' })

  // Create reservation
  const { data, error } = await supabase.from('reservations').insert({
    book_id: bookId,
    name,
    email,
    pickup_date: pickupDate,
    user_id: req.user?.id ?? null,
  }).select().single()

  if (error) return res.status(500).json({ error: error.message })

  // Mark book as unavailable
  await supabase.from('books').update({ available: false }).eq('id', bookId)

  res.status(201).json(data)
}

export async function getMyReservations(req, res) {
  const { data, error } = await supabase
    .from('reservations')
    .select('*, book:books(title, author)')
    .eq('user_id', req.user.id)
    .order('created_at', { ascending: false })

  if (error) return res.status(500).json({ error: error.message })
  res.json(data)
}

export async function deleteReservation(req, res) {
  const { data: reservation } = await supabase
    .from('reservations')
    .select('*')
    .eq('id', req.params.id)
    .eq('user_id', req.user.id)
    .single()

  if (!reservation) return res.status(404).json({ error: 'Reservation not found' })

  await supabase.from('reservations').delete().eq('id', req.params.id)
  await supabase.from('books').update({ available: true }).eq('id', reservation.book_id)

  res.json({ message: 'Reservation cancelled' })
}
