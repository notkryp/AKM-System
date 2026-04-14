import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import bookRoutes from './routes/books.js'
import reservationRoutes from './routes/reservations.js'

const app = express()
const PORT = process.env.PORT || 5000

const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  process.env.CLIENT_URL,
].filter(Boolean)

app.use(cors({
  origin: (origin, cb) => {
    if (!origin || allowedOrigins.includes(origin)) return cb(null, true)
    cb(new Error('Not allowed by CORS'))
  },
  credentials: true,
}))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Health check
app.get('/health', (_req, res) => res.json({ status: 'ok', timestamp: new Date().toISOString() }))
app.get('/api/health', (_req, res) => res.json({ status: 'ok', timestamp: new Date().toISOString() }))

// Routes
app.use('/api/books', bookRoutes)
app.use('/api/reservations', reservationRoutes)

// 404 handler
app.use((_req, res) => res.status(404).json({ error: 'Route not found' }))

// Global error handler
app.use((err, _req, res, _next) => {
  console.error('[Error]', err.message)
  res.status(err.status || 500).json({ error: err.message || 'Internal server error' })
})

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
