# Sprint 1 Review
**Sprint Duration:** 14 April 2026 (Day 3 condensed sprint)  
**Scrum Master:** Abhishek Pokharel  
**Team:** Abhishek (UX Lead), Mahmoud (Full-Stack), Kritik (DevOps)

---

## Sprint Goal
> Deliver a working Book Reservation System with live frontend, backend API, database, and CI/CD pipeline — demonstrating full-stack Agile delivery.

---

## Definition of Done (DoD)
- [ ] Feature works end-to-end in production (Netlify + Render + Supabase)
- [ ] Code reviewed via PR before merging to `main`
- [ ] No secrets committed to repository
- [ ] CI pipeline passes (lint + test + build)
- [ ] Standup note added to `docs/standups/`

---

## Completed User Stories (Sprint 1)

| Story | Points | Owner | Status |
|---|---|---|---|
| View all books in catalogue | 2 | Abhishek | ✅ Done |
| Search books by title/author | 3 | Abhishek | ✅ Done |
| Filter books by genre | 2 | Abhishek | ✅ Done |
| Filter by availability | 1 | Abhishek | ✅ Done |
| View book detail page | 2 | Abhishek | ✅ Done |
| Reserve a book (form) | 5 | Mahmoud | ✅ Done |
| Cancel a reservation | 3 | Mahmoud | ✅ Done |
| View my reservations | 3 | Mahmoud | ✅ Done |
| Admin view all reservations | 3 | Mahmoud | ✅ Done |
| Auth middleware (JWT verify) | 3 | Mahmoud | ✅ Done |
| Input validation middleware | 2 | Mahmoud | ✅ Done |
| Unit tests (Jest) | 3 | Mahmoud | ✅ Done |
| CI pipeline (GitHub Actions) | 5 | Kritik | ✅ Done |
| Docker Compose local stack | 3 | Kritik | ✅ Done |
| Deploy to Render + Netlify | 5 | Kritik | ✅ Done |

**Total story points delivered: 45**

---

## Sprint Velocity
- Planned: 45 points
- Delivered: 45 points
- Velocity: 100%

---

## Sprint Retrospective

### What went well 🟢
- All three environments live on Day 1 (Netlify, Render, Supabase)
- Clear role separation — no merge conflicts
- PR reviews enforced via CODEOWNERS
- CI catches lint/build issues before merge

### What to improve 🟡
- Add Supabase Auth sign-up/login flow (currently stubbed)
- Add E2E tests (Playwright) in Sprint 2
- Seed script should be automated, not manual SQL

### Action items for Sprint 2 🔵
- Abhishek: Login/Signup UI polish + protected route guard
- Mahmoud: Supabase Auth integration + due date feature
- Kritik: Lighthouse CI + automated seed via GitHub Action

---

## Burndown (Sprint 1)
```
Day 1: 45 pts remaining → Deploy infra, seed DB
Day 2: 30 pts remaining → Backend API complete
Day 3:  0 pts remaining → Frontend complete, all PRs merged
```
