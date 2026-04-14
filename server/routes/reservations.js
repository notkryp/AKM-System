import { Router } from 'express'
import {
  createReservation,
  getMyReservations,
  deleteReservation,
  getAllReservations,
  returnReservation,
} from '../controllers/reservations.js'
import { requireAuth } from '../middleware/requireAuth.js'
import { requireAdmin } from '../middleware/requireAuth.js'

const router = Router()

// Protected — authenticated users
router.post('/',              requireAuth, createReservation)
router.get('/my',             requireAuth, getMyReservations)
router.delete('/:id',         requireAuth, deleteReservation)

// Admin only
router.get('/',               requireAuth, requireAdmin, getAllReservations)
router.patch('/:id/return',   requireAuth, requireAdmin, returnReservation)

export default router
