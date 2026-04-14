# Sprint 2 Planning
**Sprint Duration:** Days 4–6  
**Scrum Master:** Abhishek Pokharel  
**Team:** Abhishek (UX Lead), Mahmoud (Full-Stack), Kritik (DevOps)

---

## Sprint Goal
> Deliver authenticated user flows, due date tracking, admin return functionality, and production quality (Lighthouse CI + E2E tests).

---

## Sprint 2 Backlog

| ID | User Story | Points | Owner | Sprint Task |
|---|---|---|---|---|
| US-15 | User can sign up and log in | 5 | Mahmoud | Supabase Auth integration, email confirm |
| US-16 | User sees due date on reservation | 3 | Mahmoud | Add `due_date` column, show in MyReservations |
| US-17 | Admin can mark book as returned | 3 | Mahmoud | PATCH `/api/reservations/:id/return` endpoint |
| US-18 | Login/Signup pages polished | 3 | Abhishek | LoginPage, SignupPage, ProtectedRoute, Navbar auth state |
| US-19 | Lighthouse CI score > 90 | 3 | Kritik | Add Lighthouse step to CI workflow |
| US-20 | Seed script via GitHub Action | 2 | Kritik | `npm run seed` step on manual trigger |
| US-21 | E2E tests: reserve + cancel flow | 8 | Mahmoud | Playwright setup, 2 test suites |

**Total planned: 27 points**

---

## Definition of Done (unchanged)
- Feature works end-to-end in production
- Code reviewed via PR before merge
- No secrets committed
- CI passes
- Standup note added

---

## Sprint 2 Assignments

### Abhishek — `feature/auth-ui`
- [x] LoginPage (email/password, validation, redirect)
- [x] SignupPage (email/password/confirm, validation)
- [x] ProtectedRoute component
- [x] Navbar with auth state (Sign in / Sign up / Sign out)
- [x] Updated App.jsx with all routes

### Mahmoud — `feature/auth-backend`
- [ ] Due date on reservation (DB + API + UI)
- [ ] Admin mark-as-returned endpoint
- [ ] Playwright E2E tests

### Kritik — `feature/lighthouse-ci`
- [ ] Lighthouse CI step in GitHub Actions
- [ ] Automated seed GitHub Action (manual trigger)
