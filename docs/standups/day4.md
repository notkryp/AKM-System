# Daily Standup — Day 4 (Sprint 1 Close)
**Date:** Thursday, 16 April 2026
**Scrum Master:** Abhishek Pokharel
**Sprint:** Sprint 1 — Review & Retrospective

---

## 👤 Abhishek (Scrum Master / UX Lead)
**Yesterday:** Merged PR #30 and PR #31, sprint review doc complete, product backlog refined for Sprint 2 with 18 new story points across admin panel, return flow, and UI polish.
**Today:** Tag `v1.0` release on GitHub, write Sprint 1 retrospective summary, share Sprint 2 planning doc with team, close all resolved issues.
**Blockers:** None

---

## 👤 Mahmoud (Full-Stack Developer)
**Yesterday:** PR #30 review feedback addressed, reservation flow tested end-to-end on staging — create, view, cancel all working correctly. ESLint errors resolved.
**Today:** Support Sprint 2 planning, identify back-end tasks (admin endpoints, overdue reservation logic), begin `AdminPage` back-end wiring.
**Blockers:** None

---

## 👤 Kritik (DevOps / Automation Lead)
**Yesterday:** PR #31 merged, CI fully green across all jobs (lint, build, E2E), Render redeployed with latest main branch automatically.
**Today:** Confirm `v1.0` deployment on Render and Netlify, document deployment URLs in README, create Sprint 2 DevOps task list (Lighthouse gate, branch protection rules).
**Blockers:** None

---

## ✅ Sprint 1 — Close Summary
- ✅ 12 / 12 story points delivered
- ✅ 3 feature PRs merged (#29, #30, #31) — all reviewed before merge
- ✅ CI passing: lint, unit tests, build, E2E
- ✅ Live deployments: API on Render, client on Netlify
- ✅ `v1.0` release tagged on GitHub
- ✅ Sprint Review and Retrospective completed
- 🔁 Sprint 2 backlog ready — 18 story points planned

## 🔄 Retrospective Highlights
- **What went well:** CI set up on Day 1 caught lint errors early; clear branch naming made PRs easy to review; Supabase migrations kept schema changes trackable.
- **What to improve:** Standup notes should be committed same day (not retroactively); E2E tests should run against a seeded test DB, not production.
- **Action items:** Kritik to add branch protection on `main` before Sprint 2; Mahmoud to write test fixtures for the reservation flow.
