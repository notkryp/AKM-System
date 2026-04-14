import { Router } from 'express'
import {
  createReservation,
  getMyReservations,
  deleteReservation,
  getAllReservations,
} from '../controllers/reservations.js'
import { requireAuth, requireAdmin, optionalAuth } from '../middleware/auth.js'
import { validate, validateEmail, validateDate } from '../middleware/validate.js'

const router = Router()

// Create reservation — auth optional (guests can reserve too)
router.post(
  '/',
  optionalAuth,
  validate(['bookId', 'name', 'email', 'pickupDate']),
  validateEmail,
  validateDate,
  createReservation
)

// My reservations — must be logged in
router.get('/my', requireAuth, getMyReservations)

// Cancel reservation — must be logged in + own it
router.delete('/:id', requireAuth, deleteReservation)

// Admin — all reservations
router.get('/admin', requireAuth, requireAdmin, getAllReservations)

export default router
