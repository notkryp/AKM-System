# Standup — Day 5 (Sprint 2)
**Scrum Master:** Abhishek Pokharel

---

## Abhishek
- **Done:** LoginPage, SignupPage, ProtectedRoute, Navbar auth state, App.jsx routes — PR #33 merged ✅
- **Today:** Review Mahmoud's PR when ready, update product backlog
- **Blockers:** None

## Mahmoud
- **Done:** `feature/auth-backend` branch — `due_date` + `status` + `returned_at` on reservations, `PATCH /:id/return` admin endpoint, updated `requireAuth`/`requireAdmin` middleware, MyReservationsPage with due-date display, AdminPage with mark-as-returned, Playwright E2E test suite (reserve + cancel)
- **Today:** Open PR, request review from Abhishek
- **Blockers:** Migration must be run on Supabase before testing (`supabase/migrations/20260414_sprint2_due_date.sql`)

## Kritik
- **Today:** Starting `feature/lighthouse-ci` — Lighthouse CI step + seed GitHub Action
- **Blockers:** None
