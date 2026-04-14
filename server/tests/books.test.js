/**
 * Unit tests for book controller functions.
 * Author: Mahmoud Abdullahi
 * 
 * Run with: node --experimental-vm-modules node_modules/.bin/jest
 */

// Mock supabase before importing controller
const mockSingle = jest.fn()
const mockSelect = jest.fn(() => ({ single: mockSingle, order: jest.fn(() => ({ data: [], error: null })) }))
const mockEq = jest.fn(() => ({ single: mockSingle, select: mockSelect }))
const mockFrom = jest.fn(() => ({ select: mockSelect, eq: mockEq }))

jest.mock('../lib/supabase.js', () => ({
  supabase: { from: mockFrom },
}))

import { getBookById } from '../controllers/books.js'

describe('getBookById', () => {
  let req, res

  beforeEach(() => {
    req = { params: { id: 'test-id' } }
    res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    }
    jest.clearAllMocks()
  })

  test('returns 404 when book not found', async () => {
    mockSelect.mockReturnValue({ eq: mockEq })
    mockEq.mockReturnValue({ single: jest.fn().mockResolvedValue({ data: null, error: { message: 'Not found' } }) })
    mockFrom.mockReturnValue({ select: mockSelect })

    await getBookById(req, res)

    expect(res.status).toHaveBeenCalledWith(404)
    expect(res.json).toHaveBeenCalledWith({ error: 'Book not found' })
  })

  test('returns book data when found', async () => {
    const mockBook = { id: 'test-id', title: '1984', author: 'George Orwell', available: true }
    mockSelect.mockReturnValue({ eq: mockEq })
    mockEq.mockReturnValue({ single: jest.fn().mockResolvedValue({ data: mockBook, error: null }) })
    mockFrom.mockReturnValue({ select: mockSelect })

    await getBookById(req, res)

    expect(res.json).toHaveBeenCalledWith(mockBook)
  })
})

describe('validate middleware', () => {
  test('returns 400 when required fields missing', () => {
    const { validate } = require('../middleware/validate.js')
    const middleware = validate(['title', 'author'])
    const req = { body: { title: 'Test' } }
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() }
    const next = jest.fn()

    middleware(req, res, next)

    expect(res.status).toHaveBeenCalledWith(400)
    expect(next).not.toHaveBeenCalled()
  })

  test('calls next when all fields present', () => {
    const { validate } = require('../middleware/validate.js')
    const middleware = validate(['title', 'author'])
    const req = { body: { title: 'Test', author: 'Author' } }
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() }
    const next = jest.fn()

    middleware(req, res, next)

    expect(next).toHaveBeenCalled()
  })
})
