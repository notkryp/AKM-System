/**
 * validate — generic request body validation middleware.
 * @param {string[]} fields - required field names
 */
export function validate(fields) {
  return (req, res, next) => {
    const missing = fields.filter(f => {
      const val = req.body[f]
      return val === undefined || val === null || val === ''
    })

    if (missing.length > 0) {
      return res.status(400).json({
        error: `Missing required fields: ${missing.join(', ')}`,
        fields: missing,
      })
    }

    next()
  }
}

/**
 * validateEmail — checks email format.
 */
export function validateEmail(req, res, next) {
  const { email } = req.body
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: 'Invalid email format' })
  }
  next()
}

/**
 * validateDate — checks pickup_date is a valid future date.
 */
export function validateDate(req, res, next) {
  const { pickupDate } = req.body
  if (!pickupDate) return next()

  const date = new Date(pickupDate)
  if (isNaN(date.getTime())) {
    return res.status(400).json({ error: 'Invalid date format for pickupDate' })
  }

  const today = new Date()
  today.setHours(0, 0, 0, 0)
  if (date < today) {
    return res.status(400).json({ error: 'pickupDate must be today or in the future' })
  }

  next()
}
