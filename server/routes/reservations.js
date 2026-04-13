import { Router } from 'express'
import { requireAuth } from '../middleware/auth.js'
import {
  createReservation,
  getMyReservations,
  deleteReservation
} from '../controllers/reservations.js'

const router = Router()

router.post('/', createReservation)
router.get('/me', requireAuth, getMyReservations)
router.delete('/:id', requireAuth, deleteReservation)

export default router
