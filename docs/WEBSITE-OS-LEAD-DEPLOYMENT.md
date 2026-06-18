# Website → SolveXpert OS Lead Deployment (Vercel)

## Active URLs

| App | URL |
| --- | --- |
| **Public website** (active) | https://solvexpert-website.vercel.app |
| **SolveXpert OS** (internal) | https://solvexpert-os-26x9.vercel.app/login |

Do **not** change or deploy to legacy domains (`solvexpert.co.uk`, `www.solvexpert.co.uk`) unless explicitly requested.

## Overview

Public website forms submit to the **SolveXpert OS** Supabase project (`geqoeiokyedimkbckkbw`) using the **anon public key only**. Inserts go to the OS `leads` table.

**Never** use `service_role` in the website frontend.

## Forms that write to OS `leads`

| Form | Route / trigger | Client |
| ---- | ---------------- | ------ |
| `ContactForm` | `/contact` | `osLeadsSupabase` |
| `LeadCaptureForm` | Homepage modal (`Book Free Audit`) | `osLeadsSupabase` |

## Required environment variables

Set in **Vercel** → Project → Settings → Environment Variables (and local `.env` for development):

| Variable | Value |
| -------- | ----- |
| `VITE_OS_SUPABASE_URL` | `https://geqoeiokyedimkbckkbw.supabase.co` |
| `VITE_OS_SUPABASE_ANON_KEY` | OS project **anon** key (Supabase Dashboard → API) |

Apply to **Production**, **Preview**, and **Development** as needed.

Remove legacy `VITE_SUPABASE_URL` / `VITE_SUPABASE_ANON_KEY` from Vercel if still present (old website Supabase project).

## Vercel setup

1. Open [Vercel Dashboard](https://vercel.com) → project **solvexpert-website**.
2. Confirm Git repo: `solvexpert-dev/solvexpert-website`, production branch: `main`.
3. Build command: `npm run build` (default for Vite).
4. Output directory: `dist`.
5. SPA routing: `vercel.json` rewrites all routes to `index.html`.
6. Add `VITE_OS_SUPABASE_URL` and `VITE_OS_SUPABASE_ANON_KEY` under Environment Variables.
7. Redeploy production after env changes (Vite inlines env at build time).

Repo: https://github.com/solvexpert-dev/solvexpert-website

## Verify production bundle

After deploy:

```bash
BUNDLE=$(curl -sS "https://solvexpert-website.vercel.app/" | grep -oE 'assets/index-[^"]+\.js' | head -1)
curl -sS "https://solvexpert-website.vercel.app/$BUNDLE" | grep -o 'geqoeiokyedimkbckkbw'
```

Expected: at least one match. Active lead insert must **not** use `contact_submissions` or `pbchchmdggijzqkicozz`.

Confirm `/contact` loads (HTTP 200, form visible).

## Smoke test

1. Submit test lead on https://solvexpert-website.vercel.app/contact or homepage audit form.
2. In SolveXpert OS → **Leads** (https://solvexpert-os-26x9.vercel.app/leads) → confirm `source: WEBSITE`.
3. Anon `SELECT` on `leads` from browser must return no rows (RLS).

See SolveXpert OS: `docs/WEBSITE-LEAD-INTEGRATION-CHECKLIST.md`
