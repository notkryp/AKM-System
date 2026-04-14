# Sprint 2 Review
**Date:** 14 April 2026  
**Scrum Master:** Abhishek Pokharel  
**Team:** Abhishek, Mahmoud, Kritik

---

## Sprint Goal
> Deliver authenticated user flows, due date tracking, admin return functionality, and production quality (Lighthouse CI + E2E tests).

**Goal achieved: ✅**

---

## Completed User Stories

| ID | Story | Points | Owner | Status |
|---|---|---|---|---|
| US-15 | User can sign up and log in | 5 | Mahmoud | ✅ Done |
| US-16 | User sees due date on reservation | 3 | Mahmoud | ✅ Done |
| US-17 | Admin can mark book as returned | 3 | Mahmoud | ✅ Done |
| US-18 | Login/Signup pages polished | 3 | Abhishek | ✅ Done |
| US-19 | Lighthouse CI score > 90 | 3 | Kritik | ✅ Done |
| US-20 | Seed script via GitHub Action | 2 | Kritik | ✅ Done |
| US-21 | E2E tests: reserve + cancel flow | 8 | Mahmoud | ✅ Done |

**Total delivered: 27 / 27 points** 🎯

---

## Demo Notes

- Login/Signup UI live with full validation and redirect
- Protected routes working — unauthenticated users redirected to /login
- Navbar shows correct auth state (Sign in/up vs Sign out)
- Due date displayed on My Reservations with colour-coded urgency labels
- Admin page shows all reservations with overdue highlight and Mark Returned button
- Lighthouse CI gate configured (≥90 performance/accessibility/best-practices)
- Playwright E2E suite covers reserve + cancel flows
- Seed action available via workflow_dispatch with SEED safety gate

---

## What Was Not Completed

All 27 planned points delivered. Nothing carried over to Sprint 3.

---

## Stakeholder Feedback

- UI feels clean and consistent with Sprint 1 design system
- Due date urgency labels (Overdue / Due in Xd) are a good UX touch
- Suggested: add email notification when book is due soon (logged as future backlog item)
