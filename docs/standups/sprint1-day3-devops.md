# Sprint 1 — Day 3 DevOps Notes
**Date:** 14 April 2026  
**Author:** Kritik (KRIITIIK) — DevOps Engineer

## Completed Today
- ✅ GitHub Actions CI pipeline — lint, test, build on every push/PR
- ✅ GitHub Actions deploy workflow — triggers Render + Netlify on merge to main
- ✅ Docker Compose for full local stack (server + client)
- ✅ Improved Dockerfile — non-root user, health check, production deps only
- ✅ PR template added to enforce consistent PR descriptions
- ✅ CODEOWNERS file — auto-assigns reviewers by file ownership

## CI/CD Architecture
```
Push / PR → ci.yml
  ├─ lint-and-test-server (ESLint + Jest)
  ├─ lint-and-build-client (ESLint + Vite build)
  └─ docker-build (validates Dockerfile)

Merge to main → deploy.yml
  ├─ Render deploy hook (backend)
  └─ Netlify build hook (frontend)
```

## Local Dev Setup
```bash
# Run full stack with Docker
cp server/.env.example server/.env  # fill in Supabase keys
docker compose up --build
# Client: http://localhost:5173
# Server: http://localhost:5000
```

## Next Steps
- Add Render + Netlify webhook secrets to GitHub repo secrets
- Consider adding Lighthouse CI for frontend performance checks
