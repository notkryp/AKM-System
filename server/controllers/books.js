import { supabase } from '../lib/supabase.js'

export async function getAllBooks(_req, res) {
  const { data, error } = await supabase
    .from('books')
    .select('id, title, author, genre, available')
    .order('title')

  if (error) return res.status(500).json({ error: error.message })
  res.json(data)
}

export async function getBookById(req, res) {
  const { data, error } = await supabase
    .from('books')
    .select('*')
    .eq('id', req.params.id)
    .single()

  if (error) return res.status(404).json({ error: 'Book not found' })
  res.json(data)
}
