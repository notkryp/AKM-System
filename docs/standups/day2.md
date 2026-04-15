# Daily Standup — Day 2
**Date:** Tuesday, 14 April 2026
**Scrum Master:** Abhishek Pokharel
**Sprint:** Sprint 1

---

## 👤 Abhishek (Scrum Master / UX Lead)
**Yesterday:** Completed `BookListPage` with genre filter chips and search input, set up design system tokens in `index.css`, configured React Router with lazy-loaded routes.
**Today:** Build `BookDetailPage`, add skeleton loaders for loading states, write sprint artefact docs (user stories, wireframes), review Mahmoud's PR once ready.
**Blockers:** None

---

## 👤 Mahmoud (Full-Stack Developer)
**Yesterday:** Implemented `GET /api/books` with genre/search/available filters, `GET /api/books/:id`, deployed Supabase schema with seed data (20 books), wrote 4 unit tests for book controller.
**Today:** Build reservations API (`POST /api/reservations`, `GET /api/reservations/my`, `DELETE /api/reservations/:id`), implement JWT auth middleware, set up `api.js` client wrapper on the frontend.
**Blockers:** Token refresh edge case — `supabase.auth.getSession()` returning stale token. Resolved by switching to `getUser()` on every request.

---

## 👤 Kritik (DevOps / Automation Lead)
**Yesterday:** Fixed CI lockfile issue, GitHub Actions now running lint + tests on every push and PR, Dockerfile for server tested locally and building correctly.
**Today:** Set up Docker Compose for full-stack local development, configure Render deployment for the Express API, connect Netlify for the React client, add `.env.example` files.
**Blockers:** Render free tier has cold start delay (~30s). Added `/health` endpoint as a workaround for uptime monitoring.

---

## 📝 Sprint Notes
- Books API PR (#29) opened — review assigned to Abhishek.
- CI passing on all branches. Render deployment URL confirmed live.
- On track to tag `v1.0` by end of Day 3.
