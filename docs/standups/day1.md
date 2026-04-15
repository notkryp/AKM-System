# Daily Standup — Day 1
**Date:** Monday, 13 April 2026
**Scrum Master:** Abhishek Pokharel
**Sprint:** Sprint 1 — Goal: Book listing, search, reservation flow, live API

---

## 👤 Abhishek (Scrum Master / UX Lead)
**Yesterday:** N/A — Sprint kickoff day. Initialised GitHub repo, pushed project scaffold (React + Vite client, Express server), created Supabase project, defined 15 user stories across 3 milestones.
**Today:** Set up Vite routing skeleton, create `BookListPage` component, configure global CSS design tokens, write Sprint 1 planning doc.
**Blockers:** None

---

## 👤 Mahmoud (Full-Stack Developer)
**Yesterday:** N/A — Reviewed project scaffold and Supabase schema, set up local dev environment.
**Today:** Implement `GET /api/books` and `GET /api/books/:id` endpoints, connect to Supabase, write basic unit tests for book routes.
**Blockers:** Needs Supabase service role key — Abhishek to share via secure channel today. ✅ Resolved in standup.

---

## 👤 Kritik (DevOps / Automation Lead)
**Yesterday:** N/A — Cloned repo, reviewed CI requirements, set up local Docker environment.
**Today:** Fix CI pipeline lockfile issue, configure GitHub Actions to run lint and tests on push, write Dockerfile for server.
**Blockers:** `package-lock.json` missing from repo — causing CI install failures. Will regenerate and commit today.

---

## 📝 Sprint Notes
- Sprint 1 goal agreed: deliver V1.0 with book listing, search/filter, and reservation form by end of Day 3.
- Backlog groomed: 12 story points in sprint, 3 carry-over to Sprint 2.
- Team agreed on branch naming: `feature/<short-description>`, PRs require 1 review before merge.
