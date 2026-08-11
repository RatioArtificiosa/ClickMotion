# Residual backlog

Durable capture from ultra-audits and scoped work. Chat is not memory.

## 2026-08-08 — CMS Admin

| ID | Severity | Gap | Why it matters | Suggested later fix | Status |
|----|----------|-----|----------------|---------------------|--------|
| CMS-01 | HIGH | File-based `data/cms/store.json` is single-node; multi-instance deploys do not share writes | Admin changes on one instance vanish on another; race on concurrent writers across machines | Shared volume, or port CMS store to Supabase `prompts` / `collections` + genres table with service role | open |
| CMS-02 | MEDIUM | `POST /api/admin/seed` with `force: true` overwrites all admin edits | Accidental wipe of live catalog | Soft merge, export backup before force, confirm UI | open |
| CMS-03 | MEDIUM | File lock is process-local + flock file; Windows rename races under heavy parallel write across processes | Rare lost update under concurrent admin tabs / multi-worker | Serialize via single writer worker or SQLite | open |
| CMS-04 | LOW | Admin session is password-shared (no per-user audit log) | Cannot attribute who published what | Supabase Auth admin role + audit table | open |
| CMS-05 | LOW | No rate limit on login / upload endpoints | Brute force / disk fill | Middleware rate limit + max uploads/day | open |
| CMS-06 | NOTE | Static taxonomy in `src/config/taxonomy.ts` still used by some filters until CMS genres fully replace labels everywhere | Slight label drift if CMS renames genre id | Gallery filters load genres from CMS API | open |
| CMS-07 | LOW | `GET /api/admin/products|genres|collections` returns published/visible data without auth (mutations still require admin) | Minor catalog enumeration via admin path prefix | Require auth for all `/api/admin/*` GETs or move public list to `/api/public/*` | open |
| CMS-08 | NOTE | Lock acquire uses busy-wait spin (15ms) on the Node event loop while waiting | Under lock contention, request latency spikes | Prefer `fs` async sleep / queue worker instead of spin | open |
| CMS-09 | LOW | Product likes are client-only optimistic UI (not persisted) | Count resets on refresh | Persist likes column updates or remove interactive like until real | open |
| ASSET-01 | MEDIUM | AETHER bg replaced with `14506495_3840_2160_30fps.mp4` but still full 4K ~226MB | Slow loads / not production-ready | Re-encode to 1080p H.264 silent 8–14s under 5–10MB; refresh poster webp | open |

## 2026-08-09 — Terra Nova sale-ready ultra-audit

| ID | Severity | Gap | Why it matters | Suggested later fix | Status |
|----|----------|-----|----------------|---------------------|--------|
| TERR-01 | LOW | `isPackageSaleReady()` does not require `checklist.backgroundsPreview` even though flagships register it | Admin could mark sale-ready without small backgrounds encode | Gate on `backgroundsPreview` for pro flagships or always when field set | open |
| TERR-02 | LOW | `demo-heroes.ts` Terra entry still lists `fontHead: Playfair Display` and `video: null` (stub catalog) | Only affects legacy demo-heroes consumers; cleanroom uses Fraunces correctly | Align stub with Fraunces + client path or delete unused stub fields | done 2026-08-09 |
| TERR-03 | NOTE | Package download API returns 401 for unknown product ids (auth before existence) | Slightly less precise than 404 for authenticated probes | After session, return 404 when pack missing | open |
| TERR-04 | NOTE | Originals `_manifest.json` is stale (pre-Terra HF downloads only) | Operator inventory incomplete for masters | Regenerate manifest to include terra/lumina/neon masters | open |

## 2026-08-09 — Apex Quantum prep + Terra double-check

| ID | Severity | Gap | Why it matters | Suggested later fix | Status |
|----|----------|-----|----------------|---------------------|--------|
| APEX-01 | HIGH | Apex was `published` in CMS without client HD / storefront / package | Broken product page media for a paid SKU | Set CMS+MDX to **draft** until film pipeline; re-publish only after sale-ready gate | done 2026-08-09 (drafted) |
| APEX-02 | MEDIUM | Prep complete; waiting on master film | Cannot encode/capture/PDF until handoff | User generates film from VIDEO_GEN_PROMPT.md | done 2026-08-09 (crylabtower → sale-ready) |

## 2026-08-09 — Revel original scroll hero

| ID | Severity | Gap | Why it matters | Suggested later fix | Status |
|----|----------|-----|----------------|---------------------|--------|
| REVL-01 | NOTE | Storefront previews are 20s (~13–20 MB) to carry full breakout narrative | Heavier than 12s flagship previews | Optional second encode 12s highlight cut for mobile gallery | open |
| REVL-02 | NOTE | Original SKU outside Deepseek first-10 | Intentional variety | Keep pending Deepseek heroes (Verve polish, Orbit, Nexus, Nomad) for later | open |
| TERR-DC | NOTE | Terra/windyfarms full double-check 97/97 OK (disk, FE, BE, package, PDF) | Evidence for sale-ready claim | Re-run `python tmp/doublecheck-terra.py` after any Terra path change | done 2026-08-09 |

## 2026-08-08 — Ultra-audit fixes (done, not residual)

| ID | Severity | Gap | Resolution |
|----|----------|-----|------------|
| AUD-01 | HIGH | Product/home/browse pages could statically cache CMS catalog | `export const dynamic = "force-dynamic"` on home, browse, browse/[slug] |
| AUD-02 | HIGH | Empty CMS published set fell back to MDX/manifest (admin unpublish resurrected static catalog) | CMS authoritative when `seededAt` / any store data; empty means empty |
| AUD-03 | MEDIUM | `public-map` genreLine ternary was dead identical branches | Simplified to CMS label line |
| AUD-04 | MEDIUM | `ensureCmsSeededSync` bypassed file lock | Uses `withStoreLockSync` + shared write path |
| AUD-05 | MEDIUM | Seed TOCTOU: outer check then write without re-check under lock | Re-check `seededAt`/products inside `updateStore` mutator |
| AUD-06 | MEDIUM | SortableList optimistic reorder stuck on API failure | Rollback list + clients rethrow after toast |
| AUD-07 | LOW | Upload allowed `.bin` fallback / weak type gate | Extension allowlist only; path must stay under uploads root |
| AUD-08 | LOW | `withAdmin` could leak 500 `err.message` internals | Cap non-4xx messages to generic Server error |
)
