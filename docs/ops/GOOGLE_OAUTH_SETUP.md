# Google OAuth setup (operator only)

**Not a public page.** Configure credentials so “Get Full Prompt” can sign members in with Google.

## 1. Create a Google Cloud OAuth client

1. Open [Google Cloud Console](https://console.cloud.google.com/).
2. Create or select a project (e.g. `ClickMotion`).
3. **APIs & Services → OAuth consent screen**
   - User type: **External** (or Internal if Workspace-only).
   - App name: `ClickMotion`
   - Support email: your email
   - Authorized domains: `clickmotion.dev` (and localhost is allowed for testing without domain for some steps)
   - Scopes: default `email`, `profile`, `openid` (Auth.js / Google provider)
4. **APIs & Services → Credentials → Create credentials → OAuth client ID**
   - Application type: **Web application**
   - Name: `ClickMotion Web`
   - **Authorized JavaScript origins**
     - `http://localhost:3004` (or your dev port)
     - `https://www.clickmotion.dev`
     - `https://clickmotion.dev` (if used)
   - **Authorized redirect URIs** (Auth.js v5)
     - `http://localhost:3004/api/auth/callback/google`
     - `https://www.clickmotion.dev/api/auth/callback/google`
     - Match your real origin + `/api/auth/callback/google`
5. Copy **Client ID** and **Client secret**.

## 2. Environment variables

Add to `.env.local` (never commit secrets):

```bash
# Auth.js
AUTH_SECRET=          # long random string: openssl rand -base64 32
AUTH_GOOGLE_ID=       # Google OAuth Client ID
AUTH_GOOGLE_SECRET=   # Google OAuth Client secret

# Optional aliases (also accepted by the app)
# GOOGLE_CLIENT_ID=
# GOOGLE_CLIENT_SECRET=
# NEXTAUTH_SECRET=

# Public site URL (used for redirects / absolute links)
NEXT_PUBLIC_SITE_URL=http://localhost:3004
# Production: https://www.ClickMotion.dev

# Paid membership until Stripe→member plan is fully wired
# Comma-separated emails that always get paid entitlements
PAID_MEMBER_EMAILS=you@example.com
```

Restart `next dev` after changing env.

## 3. Verify

1. Open a product page → **Get Full Prompt**
2. You should be sent to Google → back to the site → PDF download starts if entitled.
3. Free product + free account: package PDF for free listings only.
4. Paid email in `PAID_MEMBER_EMAILS`: any product package (subject to server-side daily cap).

## 4. Membership model (server-side)

| Plan | Product access | Cap (not shown publicly) |
|------|----------------|---------------------------|
| Free (default after Google sign-in) | Free listings only | 3 package downloads **total** |
| Paid (`PAID_MEMBER_EMAILS` or plan field) | All products | 10 package downloads **per UTC day** |

Ledger file: `data/members/store.json` (local; move to DB/Supabase later if multi-instance).

## 5. Production checklist

- [ ] OAuth consent screen published (or test users added while in Testing)
- [ ] Redirect URIs match production domain exactly (https)
- [ ] `AUTH_SECRET` set and stable across deploys
- [ ] `NEXT_PUBLIC_SITE_URL` is production URL
- [ ] `PAID_MEMBER_EMAILS` or Stripe webhook → `setMemberPlan` for paid users
