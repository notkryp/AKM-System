# Sprint 1 — Day 1 Standup
**Date:** Monday 13 April 2026  
**Facilitator:** Abhishek Pokharel (Scrum Master)

## Attendees
- Abhishek Pokharel — Scrum Master / UX Lead
- Kritik — DevOps / Automation Lead
- Mahmoud — Full-Stack Developer

## Yesterday
- Abhishek: Initialised GitHub repo, pushed full project scaffold (React+Vite client, Express server), set up CI/CD workflows, added Supabase migrations and seed data, created 15 user stories across 3 milestones.
- Kritik: Reviewed sprint plan, set up local dev environment, cloned repo.
- Mahmoud: Reviewed scaffold code, explored Supabase schema, set up local environment.

## Today
- Abhishek: Create wireframes, write sprint docs, facilitate sprint planning meeting.
- Kritik: Fix CI lockfile issue, configure Netlify deploy, add Docker support.
- Mahmoud: Build `GET /api/books` and `GET /api/books/:id` endpoints, connect to Supabase.

## Blockers
- CI pipeline failing due to missing `package-lock.json` — Kritik to resolve today.
- Supabase anon key format changed (new `sb_publishable_` format) — resolved by team.

## Notes
- Sprint 1 goal: V1.0 — Book listing, search, reservation form, live API.
- Target: Tag `v1.0` by end of Day 2.
