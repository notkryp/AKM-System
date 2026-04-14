import { supabase } from '../lib/supabase.js'

// 14-day loan period
const LOAN_DAYS = 14

export async function createReservation(req, res) {
  const { bookId, name, email, pickupDate } = req.body

  // Diagnostic: confirm service-role client is initialised
  if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_KEY) {
    console.error('[createReservation] Missing SUPABASE_URL or SUPABASE_SERVICE_KEY env vars')
    return res.status(500).json({ error: 'Server misconfiguration: missing Supabase credentials' })
  }

  // Check book exists and is available
  const { data: book, error: bookError } = await supabase
    .from('books')
    .select('id, title, available')
    .eq('id', bookId)
    .single()

  if (bookError || !book) {
    console.error('[createReservation] Book lookup failed:', { bookId, bookError })
    return res.status(404).json({ error: 'Book not found' })
  }
  if (!book.available) return res.status(409).json({ error: `"${book.title}" is already reserved` })

  // Calculate due date: pickup + 14 days
  const pickup = pickupDate ? new Date(pickupDate) : new Date()
  const dueDate = new Date(pickup)
  dueDate.setDate(dueDate.getDate() + LOAN_DAYS)

  // Create reservation
  const { data, error } = await supabase
    .from('reservations')
    .insert({
      book_id: bookId,
      name,
      email,
      pickup_date: pickup.toISOString().split('T')[0],
      due_date: dueDate.toISOString().split('T')[0],
      user_id: req.user?.id ?? null,
      status: 'active',
    })
    .select('*, book:books(title, author)')
    .single()

  if (error) return res.status(500).json({ error: error.message })

  // Mark book unavailable
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

// Admin only — get all reservations
export async function getAllReservations(req, res) {
  const { data, error } = await supabase
    .from('reservations')
    .select('*, book:books(title, author, genre)')
    .order('created_at', { ascending: false })

  if (error) return res.status(500).json({ error: error.message })
  res.json(data)
}

// Admin only — mark a book as returned
export async function returnReservation(req, res) {
  const { id } = req.params

  // Find the reservation (any user — admin action)
  const { data: reservation, error: findError } = await supabase
    .from('reservations')
    .select('*')
    .eq('id', id)
    .single()

  if (findError || !reservation) {
    return res.status(404).json({ error: 'Reservation not found' })
  }

  if (reservation.status === 'returned') {
    return res.status(409).json({ error: 'Already marked as returned' })
  }

  // Update reservation status
  const { data, error } = await supabase
    .from('reservations')
    .update({
      status: 'returned',
      returned_at: new Date().toISOString(),
    })
    .eq('id', id)
    .select('*, book:books(title, author)')
    .single()

  if (error) return res.status(500).json({ error: error.message })

  // Free the book
  await supabase.from('books').update({ available: true }).eq('id', reservation.book_id)

  res.json(data)
}
