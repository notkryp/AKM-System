import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import bookRoutes from './routes/books.js'
import reservationRoutes from './routes/reservations.js'

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

// Health check
app.get('/api/health', (_req, res) => res.json({ status: 'ok' }))

// Routes
app.use('/api/books', bookRoutes)
app.use('/api/reservations', reservationRoutes)

// 404 handler
app.use((_req, res) => res.status(404).json({ error: 'Route not found' }))

// Global error handler
app.use((err, _req, res, _next) => {
  console.error(err.stack)
  res.status(500).json({ error: 'Internal server error' })
})

app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`))
