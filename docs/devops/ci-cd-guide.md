# CI/CD Guide
**Author:** Kritik (DevOps Lead)  
**Date:** 14 April 2026

## Overview
The AKM System uses GitHub Actions for CI/CD with automatic deployment to Netlify.

## Workflows

### CI (`ci.yml`)
Triggers on every push to `main`, `develop`, and `feature/**` branches.

| Job | What it does |
|---|---|
| `lint-and-build-client` | Installs deps, lints, builds React app |
| `lint-server` | Installs deps, lints Express server |

### Deploy (`deploy.yml`)
Triggers only on push to `main`.
- Builds the React client
- Deploys to Netlify production

## Local Development

### Without Docker
```bash
# Terminal 1 — backend
cd server && npm install && npm run dev

# Terminal 2 — frontend  
cd client && npm install && npm run dev
```

### With Docker
```bash
# Copy env file
cp .env.example .env
# Fill in SUPABASE_URL and SUPABASE_SERVICE_KEY

# Start all services
docker-compose up --build
```

## Required GitHub Secrets

| Secret | Used by |
|---|---|
| `VITE_SUPABASE_URL` | CI build + Deploy |
| `VITE_SUPABASE_ANON_KEY` | CI build + Deploy |
| `VITE_API_URL` | CI build + Deploy |
| `NETLIFY_AUTH_TOKEN` | Deploy workflow |
| `NETLIFY_SITE_ID` | Deploy workflow |

## Netlify Setup Steps
1. Go to [netlify.com](https://netlify.com) → Sign up / Log in
2. Click **"Add new site"** → **"Import an existing project"**
3. Connect GitHub → select `notkryp/AKM-System`
4. Build settings:
   - Base directory: `client`
   - Build command: `npm install && npm run build`
   - Publish directory: `client/dist`
5. Add environment variables:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
   - `VITE_API_URL` (your Render backend URL)
6. Click **Deploy site**
7. Copy the **Site ID** from Site Settings → add to GitHub Secrets as `NETLIFY_SITE_ID`
8. Copy your **Personal access token** from User Settings → add to GitHub Secrets as `NETLIFY_AUTH_TOKEN`
