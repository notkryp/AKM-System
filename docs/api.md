# API Documentation
**Maintained by:** Abhishek Pokharel (Scrum Master)  
**Last updated:** 14 April 2026

Base URL: `https://akm-server.onrender.com` (production) | `http://localhost:5000` (local)

---

## Books

### GET /api/books
Returns all books.

**Query params:**
| Param | Type | Description |
|---|---|---|
| `search` | string | Filter by title or author (optional) |
| `genre` | string | Filter by genre (optional) |

**Response 200:**
```json
[
  {
    "id": "uuid",
    "title": "The Great Gatsby",
    "author": "F. Scott Fitzgerald",
    "genre": "Classic",
    "description": "...",
    "available": true,
    "created_at": "2026-04-13T00:00:00Z"
  }
]
```

---

### GET /api/books/:id
Returns a single book by ID.

**Response 200:**
```json
{
  "id": "uuid",
  "title": "1984",
  "author": "George Orwell",
  "genre": "Dystopian",
  "description": "...",
  "available": true,
  "created_at": "2026-04-13T00:00:00Z"
}
```

**Response 404:**
```json
{ "error": "Book not found" }
```

---

## Reservations

### POST /api/reservations
Create a new reservation.

**Body:**
```json
{
  "book_id": "uuid",
  "name": "John Doe",
  "email": "john@example.com",
  "pickup_date": "2026-04-20"
}
```

**Response 201:**
```json
{
  "id": "uuid",
  "book_id": "uuid",
  "name": "John Doe",
  "email": "john@example.com",
  "pickup_date": "2026-04-20",
  "created_at": "2026-04-14T00:00:00Z"
}
```

**Response 400:**
```json
{ "error": "Book is not available" }
```

---

### GET /api/reservations/me
Get all reservations for the authenticated user.

**Headers:** `Authorization: Bearer <token>`

**Response 200:**
```json
[
  {
    "id": "uuid",
    "book_id": "uuid",
    "pickup_date": "2026-04-20",
    "books": { "title": "The Great Gatsby", "author": "F. Scott Fitzgerald" }
  }
]
```

---

### DELETE /api/reservations/:id
Cancel a reservation.

**Headers:** `Authorization: Bearer <token>`

**Response 200:**
```json
{ "message": "Reservation cancelled" }
```

**Response 403:**
```json
{ "error": "Unauthorized" }
```
