# Definition of Done (DoD)
**Author:** Abhishek Pokharel (Scrum Master)  
**Date:** 13 April 2026

A User Story is considered **Done** when ALL of the following are true:

## Code Quality
- [ ] Code written and pushed to a feature branch (not directly to `main`)
- [ ] ESLint passes with no errors
- [ ] No `console.log` debug statements left in production code
- [ ] Code is readable and follows project conventions

## Review
- [ ] Pull Request opened with a clear title and description
- [ ] At least 1 team member has reviewed and approved the PR
- [ ] All PR review comments addressed
- [ ] PR linked to the corresponding GitHub Issue

## Testing
- [ ] Feature tested manually in the browser / Postman
- [ ] No regressions on existing features
- [ ] Edge cases considered (empty state, error state)

## CI/CD
- [ ] GitHub Actions CI pipeline passes (lint + build)
- [ ] Feature works in Netlify preview deploy

## Documentation
- [ ] GitHub Issue updated and closed
- [ ] Sprint board card moved to Done
- [ ] Any new API endpoints documented in `docs/api.md`

## Deployment
- [ ] Merged to `main` via PR
- [ ] Live on Netlify production URL
