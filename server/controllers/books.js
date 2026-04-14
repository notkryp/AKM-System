import { supabase } from '../lib/supabase.js'

export async function getBooks(req, res) {
  const { genre, available, search } = req.query

  let query = supabase.from('books').select('*').order('title')

  if (genre) query = query.eq('genre', genre)
  if (available !== undefined) query = query.eq('available', available === 'true')
  if (search) query = query.or(`title.ilike.%${search}%,author.ilike.%${search}%`)

  const { data, error } = await query
  if (error) return res.status(500).json({ error: error.message })

  res.json(data)
}

export async function getBookById(req, res) {
  const { data, error } = await supabase
    .from('books')
    .select('*')
    .eq('id', req.params.id)
    .single()

  if (error || !data) return res.status(404).json({ error: 'Book not found' })
  res.json(data)
}

export async function updateBook(req, res) {
  const allowed = ['title', 'author', 'genre', 'available', 'description']
  const updates = Object.fromEntries(
    Object.entries(req.body).filter(([k]) => allowed.includes(k))
  )

  if (Object.keys(updates).length === 0) {
    return res.status(400).json({ error: 'No valid fields to update' })
  }

  const { data, error } = await supabase
    .from('books')
    .update(updates)
    .eq('id', req.params.id)
    .select()
    .single()

  if (error || !data) return res.status(404).json({ error: 'Book not found or update failed' })
  res.json(data)
}

export async function createBook(req, res) {
  const { title, author, genre, description } = req.body

  const { data, error } = await supabase
    .from('books')
    .insert({ title, author, genre, description, available: true })
    .select()
    .single()

  if (error) return res.status(500).json({ error: error.message })
  res.status(201).json(data)
}

export async function deleteBook(req, res) {
  const { error } = await supabase
    .from('books')
    .delete()
    .eq('id', req.params.id)

  if (error) return res.status(500).json({ error: error.message })
  res.json({ message: 'Book deleted successfully' })
}
