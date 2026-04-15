# Daily Standup — Day 3
**Date:** Wednesday, 15 April 2026
**Scrum Master:** Abhishek Pokharel
**Sprint:** Sprint 1

---

## 👤 Abhishek (Scrum Master / UX Lead)
**Yesterday:** `BookDetailPage` complete with available/unavailable badge, full design system CSS committed, sprint artefacts written and pushed.
**Today:** Review and merge PR #30 (reservations + auth), review PR #31 (DevOps), prepare Sprint 1 review doc and retrospective notes, update product backlog for Sprint 2.
**Blockers:** None

---

## 👤 Mahmoud (Full-Stack Developer)
**Yesterday:** Reservations API complete (create, list, delete, return), JWT auth middleware working, `AuthContext` and `api.js` wrapper done on the frontend, `ReservationFormPage` and `MyReservationsPage` built and connected to live API.
**Today:** Open PR #30, address review comments, fix ESLint warnings in `api.js` catch block, verify reservation flow end-to-end on staging.
**Blockers:** `supabaseAuth` export was unused — identified by CI lint step. Fixed by wiring it into `auth.js` middleware.

---

## 👤 Kritik (DevOps / Automation Lead)
**Yesterday:** Docker Compose running full stack locally, Render API deployed and live, Netlify client deployed, `.env.example` committed for both client and server.
**Today:** Open PR #31 for DevOps branch, commit standup notes, fix wait-on port mismatch in Playwright E2E CI job (was targeting `:5173`, Vite runs on `:3000`).
**Blockers:** Playwright E2E job timing out — resolved by correcting `wait-on` URL to `http://localhost:3000` and adding `--host` flag to Vite dev server.

---

## 📝 Sprint Notes
- PR #30 (full-stack features) in review.
- PR #31 (DevOps) in review.
- Sprint 1 retrospective scheduled for end of day.
- All 12 story points expected to be delivered by end of day.
