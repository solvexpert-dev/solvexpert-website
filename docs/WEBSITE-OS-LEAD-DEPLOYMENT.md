# Website → SolveXpert OS Lead Deployment (Netlify)

Public website forms submit to the **SolveXpert OS** Supabase project using the **anon public key only**.

## Forms that write to OS `leads`

| Form | Route / trigger | Client |
| ---- | ---------------- | ------ |
| `ContactForm` | `/contact` | `osLeadsSupabase` |
| `LeadCaptureForm` | Homepage modal (`Book Free Audit`) | `osLeadsSupabase` |

**Never** use `service_role` in the website frontend.

## Required environment variables

Set in **Netlify** → Site settings → Environment variables (and local `.env`):

| Variable | Value |
| -------- | ----- |
| `VITE_OS_SUPABASE_URL` | `https://geqoeiokyedimkbckkbw.supabase.co` |
| `VITE_OS_SUPABASE_ANON_KEY` | OS project **anon** key (Supabase Dashboard → API) |

Apply to **Production**, **Deploy Previews**, and **Branch deploys** if used.

## Netlify setup

1. Open [Netlify Dashboard](https://app.netlify.com) → site for `solvexpert.co.uk`.
2. Confirm **Build settings** (or `netlify.toml` in repo):
   - Build command: `npm run build`
   - Publish directory: `dist`
3. **Site configuration** → **Environment variables** → add `VITE_OS_SUPABASE_URL` and `VITE_OS_SUPABASE_ANON_KEY`.
4. Remove legacy `VITE_SUPABASE_*` vars if present (old `pbchchmdggijzqkicozz` project).
5. **Deploys** → **Trigger deploy** → **Clear cache and deploy site**.

Repo: `https://github.com/solvexpert-dev/solvexpert-website`

## Verify production bundle

After deploy:

```bash
BUNDLE=$(curl -sS "https://solvexpert.co.uk/" | grep -oE 'assets/index-[^"]+\.js' | head -1)
curl -sS "https://solvexpert.co.uk/$BUNDLE" | grep -o 'geqoeiokyedimkbckkbw'
```

Expected: at least one match. Active lead insert must **not** use `contact_submissions` or `pbchchmdggijzqkicozz`.

## Smoke test

1. Submit test lead on `/contact` or homepage audit form.
2. In SolveXpert OS → **Leads** → confirm `source: WEBSITE`.
3. Anon `SELECT` on `leads` from browser must return no rows (RLS).

See SolveXpert OS: `docs/WEBSITE-LEAD-INTEGRATION-CHECKLIST.md`
