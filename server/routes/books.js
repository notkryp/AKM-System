import { Router } from 'express'
import { getBooks, getBookById, createBook, updateBook, deleteBook } from '../controllers/books.js'
import { requireAuth, requireAdmin } from '../middleware/auth.js'
import { validate } from '../middleware/validate.js'

const router = Router()

// Public
router.get('/',    getBooks)
router.get('/:id', getBookById)

// Admin only
router.post('/',    requireAuth, requireAdmin, validate(['title', 'author', 'genre']), createBook)
router.patch('/:id', requireAuth, requireAdmin, updateBook)
router.delete('/:id', requireAuth, requireAdmin, deleteBook)

export default router
