# AKM Book Reservation System

A full-stack web application for browsing and reserving books.

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React + Vite |
| Routing | React Router v6 |
| Backend | Node.js + Express |
| Database | Supabase (PostgreSQL) |
| Auth | Supabase Auth |
| Deployment | Netlify (client) + Render (server) |
| CI/CD | GitHub Actions |

## Team

- **Abhishek** — Scrum Master, UX Lead (Frontend)
- **Mahmoud** — Full-Stack Developer (API + DB)
- **Kritik** — DevOps (CI/CD, Deployment)

## Project Structure

```
AKM-System/
├── client/          # React + Vite frontend
│   └── src/
│       ├── components/   # Reusable UI components
│       ├── pages/        # Route-level page components
│       ├── context/      # React Context (Auth, Toast)
│       ├── hooks/        # Custom hooks
│       └── lib/          # Supabase client + API helpers
└── server/          # Express backend
    ├── routes/       # API route definitions
    ├── controllers/  # Route handler logic
    ├── middleware/   # Auth, error handling
    └── index.js      # Entry point
```

## Getting Started

### Client
```bash
cd client
npm install
npm run dev
```

### Server
```bash
cd server
npm install
npm run dev
```

## Environment Variables

### client/.env
```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_API_URL=http://localhost:5000
```

### server/.env
```
SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_KEY=your_service_role_key
PORT=5000
```
