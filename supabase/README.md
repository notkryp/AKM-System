# Supabase Setup

## 1. Run migrations in order

In your Supabase project → **SQL Editor**, run each file in order:

```
supabase/migrations/001_initial_schema.sql   ← tables + RLS policies
supabase/seed.sql                             ← sample book data
```

## 2. Set environment variables

### client/.env
```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
VITE_API_URL=http://localhost:5000
```

### server/.env
```
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_KEY=your-service-role-key
PORT=5000
```

## 3. GitHub Secrets (for CI/CD)

Add these in **GitHub → Settings → Secrets and variables → Actions**:

| Secret name | Where to get it |
|---|---|
| `VITE_SUPABASE_URL` | Supabase → Project Settings → API |
| `VITE_SUPABASE_ANON_KEY` | Supabase → Project Settings → API |
| `VITE_API_URL` | Your Render backend URL (after deploy) |
| `NETLIFY_AUTH_TOKEN` | Netlify → User Settings → Personal access tokens |
| `NETLIFY_SITE_ID` | Netlify → Site Settings → Site ID |
