# MS Asset Pipeline

**Related law:** [`SHIP_FOR_SALE.md`](./SHIP_FOR_SALE.md) (open first when shipping) · [`PRODUCT_LAW.md`](./PRODUCT_LAW.md) (media vault summary) · [`PRODUCT_PACKAGE.md`](./PRODUCT_PACKAGE.md) (product folder + zip + PDF) · [`PRODUCTION_PROCESS.md`](./PRODUCTION_PROCESS.md) · [`CMS_ADMIN.md`](./CMS_ADMIN.md)

**Status:** Living vault law · Updated 2026-08-11  

This file is the **authoritative map** of *where every video lives*, *what it is for*, *how new files are named*, and *what must never be touched*. If PRODUCT_LAW and this file disagree on storage detail, **this file wins for paths/names**; PRODUCT_LAW wins for product/UX behavior.

---

## 0. Non-negotiables (read first)

1. **Every video has exactly one role.** Never use one file for two roles (e.g. never point `previewVideo` and `videoBackgrounds` at the same path).  
2. **Client delivery HD is sacred after prep.** After initial encode + prompt wiring + design sign-off, **do not move, rename, overwrite, re-encode in place, or “quick fix” that file** unless there is an intentional new client release (new filename + updated references; old path kept for existing buyers).  
3. **Storefront captures never write into client or master paths.** Capture scripts output only under **storefront** locations/names.  
4. **Everything is recorded.** Path must appear in the **registry places** below so nobody hunts for “the client video” or “the product video.”  
5. **Future naming protocol** (opaque tokens + paid salt) applies to **new assets only**. **Do not rename** legacy files already in the repo (`sequence-01.mp4`, `*-web-v1.mp4`, `*-preview-v1.mp4`, etc.). Grandfather table is in §8.  
6. **No predictable public protocols** that let a shopper guess paid client filenames from product slugs alone.  
7. **`/backgrounds` library never streams client HD, masters, or site hero film.** Public tiles use a dedicated small **`backgrounds`** encode only (see role table + §2H in PRODUCTION_READY_CHECKLIST).  
8. **Backgrounds tile posters are pure film only.** Never point `backgrounds.ts` `poster` at storefront UI burns (`*-scroll-preview-*`, product cards with type). Cut a still from client HD / source film.

---

## 1. Roles (vault taxonomy)

| Role code | Purpose | Who consumes it | Content rules | Mutable after lock? |
|-----------|---------|-----------------|---------------|---------------------|
| **`master`** | Highest-quality source (gen export, camera, raw encode) | Operators only | May be large; may have audio temporarily | **Never overwrite**; new master = new file |
| **`client`** | Buyer pack + sold prompt `videoBackgrounds` + cleanroom B-roll `src` | **Buyers** + our live design | Clean film **only** — **no** burnt MS UI, Scroll badge, cursor, product shell | **Never edit in place** after prep |
| **`preview-page`** | In-page product player + **home/browse/gallery** loop | Public MS storefront | Burnt UI capture of the **built** design; muted. See **§1A Operator screenshot WebM law** | Recapture OK → **new** storefront file |
| **`preview-fs`** | Product “fullscreen” glass overlay | Public MS storefront | Same class as page; often 1920×1080; **mp4 OK** | Same as page |
| **`poster`** | Still for client film or load fallback | Prompt + sometimes product | From **client** film preferred for B-roll poster | New poster = new file if published |
| **`thumb`** | Gallery face still | Public gallery | WebP card art | New thumb = new file if published |
| **`backgrounds`** | `/backgrounds` library hover + free Copy URL | Public marketing page only | **Small** pure-film loop (default **640×360**); not buyer HD | New version = new `*-bg-v*.mp4` |
| **`work`** | ffmpeg experiments, densify, pads, frame dumps | Operators | Disposable | Always disposable |
| **`package`** | Client Product Package PDF (instructions + asset map) | Buyers (download) + Admin review | Golden-rule sections per PRODUCT_PACKAGE.md | New version = new file; see packages/ |

**Hard bans**

- Do **not** burn Scroll / cursor / MS chrome into **`client`** or **`master`**.  
- Do **not** run capture or densify with `-y` onto a locked **`client`** / **`master`** path. Always: `ffmpeg -i {locked} … {work or new role path}`.  
- Do **not** put storefront captures in the **client** folder or client naming form.  
- Do **not** put client HD in the **storefront** folder or `previewVideo` CMS field.  
- Do **not** point `src/config/backgrounds.ts` **`src`** at client HD, masters, site hero (`hero-bg-*`), watermarked stock tests, or full web HD used as buyer pack.  
- Do **not** point `src/config/backgrounds.ts` **`poster`** at storefront UI-burned stills (`*-scroll-preview-*.webp`, gallery thumbs with product chrome). Poster must be a **pure film** frame.  
- Do **not** re-encode an **operator-provided screenshot WebM** to mp4 for the **page / browse / gallery** role (see §1A).

### 1A. Operator screenshot WebM law (page + browse only)

**Scope:** Only products where the **operator** delivers a screenshot / Premiere export for storefront proof (e.g. `StillMindfullness_small2.webm`). Does **not** force every agent-captured SKU onto WebM.

| Role | Format when operator supplies screenshot WebM | Why |
|------|-----------------------------------------------|-----|
| **`preview-page`** (CMS/MDX `previewVideo`) | **Keep `.webm`** | Home, browse library, gallery cards, product page main player. Progressive WebM decode does not freeze the site the way some H.264 progressive mp4 loops do. |
| **Browse / gallery loop** (`REAL_PREVIEW_VIDEOS` / same path as page) | **Same WebM** as `previewVideo` | One page-role file; do not split page=mp4 and gallery=webm for operator screenshots. |
| **`preview-fs`** (`previewVideoFullscreen`) | **mp4 OK** (and preferred for FS) | Fullscreen overlay may stay H.264. |

**Agent rules**

1. When the operator hands you a screenshot **WebM**, **copy it** into the vault as the page preview (e.g. `public/assets/videos/{slug}-preview-v1.webm`).  
2. Wire **MDX + CMS `previewVideo`**, **`REAL_PREVIEW_VIDEOS`**, **`owner-designs.previewPage`**, and **`product-packages.previewVideo`** to that **WebM**.  
3. **Never** “helpfully” re-encode that WebM to mp4 and point `previewVideo` at the mp4. That causes freeze regressions on the site.  
4. Fullscreen may remain a separate agent/operator **mp4** (`*-preview-fs-v1.mp4`).  
5. If the operator did **not** supply a screenshot WebM (agent Playwright capture only), mp4 page previews remain allowed until an operator WebM arrives — then switch page+browse to WebM and leave FS as mp4.

**Canonical STILL example:** operator `StillMindfullness_small2.webm` → `still-preview-v1.webm` for page+browse; `still-preview-fs-v1.mp4` for FS.

### 1B. Keyframes vs storefront (operator lock 2026-08-15)

Two different videos. Do not mix their encode jobs.

| Video | Plays reverse? | GOP 3 / dense I-frames? | When |
|-------|----------------|-------------------------|------|
| **`client`** full-size film (demo + buyer pack) | **Yes** on PSAVE (up-scroll walks the live picture) | **Yes.** Encode GOP 3 / no B-frames **while making the demo**, not as a later surprise remaster | Before feel lock |
| **`preview-page` / `preview-fs`** shop clip | **No.** It only plays forward on home / browse / product | **No.** Never remaster a storefront file for reverse | Leave existing files |

**Future factory (new SKUs):**

1. Remaster the **original full-size client film** to GOP 3 **as you build the demo**.  
2. The demo then reverse-plays that already-keyframed file.  
3. The storefront screenshot is a **forward recording of that demo replaying**. It is proof of the experience, not a second reverse engine.  
4. Do **not** GOP-encode the shop/product preview for reverse. It never plays backwards.

**Prism (locked):** leave `prism-scroll-preview-v1.mp4` + FS as they are. Do not recapture. Do not add keyframes. They work.

**Hard ban:** treating a storefront `*-preview*` as a PSAVE film, or running the GOP 3 recipe onto a shop clip “to be safe.”

---

## 2. Directory layout (strict places)

### Target layout (mandatory for **all new** assets)

```text
public/assets/videos/
  masters/          # role: master  (legacy originals/ also holds old masters)
  client/           # role: client  ONLY — locked buyer HD
  storefront/       # role: preview-page + preview-fs ONLY
  backgrounds/      # role: backgrounds ONLY — small /backgrounds tiles (never client HD)
  # never drop role-mixed files at videos/ root for NEW work

public/assets/posters/   # role: poster (WebP/JPG)
public/thumbnails/       # role: thumb  (WebP)
public/packages/
  {productId}/           # role: package PDF + files zip (client delivery)
    {Product}-package-{OpaqueId}[-{PaidSalt}].pdf
    {Product}-files-{OpaqueId}[-{PaidSalt}].zip   # rebuild pack (when required)
    files/               # staging tree for zip (START-HERE, PROMPT, source/, assets/)

tmp/                     # role: work only
  {product}/             # optional subfolder per SKU for frames / scratch encodes
```

| Path | Allowed roles | Forbidden |
|------|---------------|-----------|
| `public/assets/videos/masters/` | `master` | client, storefront, abandoned work |
| `public/assets/videos/client/` | `client` | storefront captures, masters, tmp |
| `public/assets/videos/storefront/` | `preview-page`, `preview-fs` | client HD, masters |
| `public/assets/videos/backgrounds/` | `backgrounds` | client HD, masters, site hero, storefront UI captures |
| `public/assets/videos/originals/` | **legacy masters** (grandfathered) | new client/storefront (prefer `masters/` for new SKUs) |
| `public/assets/videos/*` (flat root) | **legacy only** (grandfathered) | **new** files (new work → role folders) |
| `public/assets/posters/` | posters | videos |
| `public/thumbnails/` | gallery thumbs | full videos |
| `tmp/` | work | anything published / referenced by CMS |

### Backgrounds encodes (public library)

```bash
node scripts/encode-backgrounds-preview.mjs
# optional: node scripts/encode-backgrounds-preview.mjs --only aether-waves
```

- **Default:** 640×360, H.264, silent, `+faststart`, CRF ~30 → typically under ~1.5 MB.  
- **Registry:** `src/config/backgrounds.ts` must list **only** `/assets/videos/backgrounds/*-bg-v1.mp4` for video **`src`**.  
- **Poster:** pure film WebP from client HD (e.g. `posters/{slug}-v1.webp`). **Never** `*-scroll-preview-*` / UI-burned product stills — tiles use poster as the face on Admin + public `/backgrounds`.  
- **Admin mirror:** `/admin/backgrounds` reads the same catalog (preview player + paths + product links).  
- **On sale/production:** also set `backgroundsPreview` on `product-packages.ts` and `owner-designs.ts`.  
- **Never** list `sequence-01.mp4`, `*-web-v1.mp4`, `hero-bg-*`, or client paths on that page.

### Legacy layout (do not break)

Existing flagship files may remain **flat** under `public/assets/videos/` or under `originals/`. They stay valid. **Do not rename them “to match protocol.”**

---

## 3. Future naming protocol (new files only)

### Grammar

```text
{Product}-{Purpose}-{OpaqueId}[-{PaidSalt}].{ext}
```

| Segment | Required? | Rules |
|---------|-----------|--------|
| **Product** | Yes | Short product brand or SKU token, e.g. `Meridian`, `Aether`, `Vertex`, or `ms-hero-meri01`. Prefer **human product name** for operators. No spaces. |
| **Purpose** | Yes | One of the purpose codes below. Encodes **role** so the folder + name agree. |
| **OpaqueId** | Yes | Random **mixed letters + digits**, length **10–14** recommended (e.g. `sd33e234kld9`). **Not** sequential (`v1`, `001`). **Not** a guessable function of the public product slug alone. Generate per file (secure random). |
| **PaidSalt** | **Only for paid client delivery HD** | Exactly **6** mixed alphanumeric characters (e.g. `ds654d`). Final segment after OpaqueId. Exists so a paid client pack filename is **not** a simple function of product name + purpose; casual reverse-engineering of “logical” download paths is harder. **Omit** for free client HD, masters, storefront, posters, thumbs, work. |
| **ext** | Yes | `mp4` / `webm` / `webp` as appropriate |

**Examples (illustrative — not real files)**

| Role | Example filename |
|------|------------------|
| Master | `Meridian-master-k9q2mX7pL3nR.mp4` |
| Client (free tier product) | `Aether-client-ab12cd34ef56.mp4` |
| Client (**paid** product) | `Meridian-client-sd33e234kld9-ds654d.mp4` |
| Storefront page | `Meridian-preview-page-h8j3k2m9n1pq.mp4` |
| Storefront fullscreen | `Meridian-preview-fs-t4u5v6w7x8yz.mp4` |
| Poster (client film) | `Meridian-poster-r2s3t4u5v6w7.webp` |
| Work scratch | `Meridian-work-zz99yy88xx77.mp4` (under `tmp/` only) |

### Purpose codes (use these strings)

| Purpose token | Role | Directory |
|---------------|------|-----------|
| `master` | master | `videos/masters/` |
| `client` | client | `videos/client/` |
| `preview-page` | storefront page | `videos/storefront/` |
| `preview-fs` | storefront fullscreen | `videos/storefront/` |
| `poster` | poster still | `posters/` |
| `thumb` | gallery thumbnail | `thumbnails/` (optional protocol; product-id thumbs still OK) |
| `package` | Product Package PDF | `packages/{productId}/` |
| `files` | Buyer rebuild **zip** (prompt + source + assets) | `packages/{productId}/` |
| `work` | scratch | `tmp/` only |

**Package PDF naming (new files):** `{Product}-package-{OpaqueId}[-{PaidSalt}].pdf` — PaidSalt only for paid tiers (same idea as client video).

**Files zip naming (new files):** `{Product}-files-{OpaqueId}[-{PaidSalt}].zip` — same OpaqueId family as the PDF when possible; PaidSalt only for paid tiers.

**Full zip tree, allowlist, download preference, registries:** [`PRODUCT_PACKAGE.md` §10](./PRODUCT_PACKAGE.md) (authoritative). Summary:

- Staging: `public/packages/{productId}/files/` with `START-HERE.md`, `PROMPT.md`, `CUSTOMIZATION.md`, `source/`, `assets/`.  
- Zip root = **contents of `files/`** (buyer sees START-HERE at top level).  
- Get Full Prompt API prefers zip over PDF when `checklist.filesZip` is true.  
- Gold zip structure: Studio Sequence `Studio-files-s7u2d1o9q4x1-p8k2m1.zip`.  
- Never put storefront `*-preview*` or thumbs inside the zip.

### Paid salt rules (detail)

1. Apply to **`client`** purpose files **and** paid delivery packages (**`package` PDF** + **`files` zip**) for products with **paid** price tier (pro / starter / agency — not free).  
2. Salt is **independent** of OpaqueId; regenerate both if you intentionally issue a new client or package release. Prefer matching salt across PDF + zip for one SKU generation.  
3. **Never** put PaidSalt on storefront previews (public files must not share the paid-pack suffix pattern).  
4. Free listings: `Product-client-{OpaqueId}.mp4` / `Product-package-{OpaqueId}.pdf` / `Product-files-{OpaqueId}.zip` **without** the final `-{PaidSalt}`.  
5. Operators store the full filename in MDX / CMS / `owner-designs` / `product-packages.ts` — humans look up the **registry**, not invent paths from memory.

### What “initial changes” means for client HD

**Allowed once (prep window):** encode from master → write **first** client file; strip audio; set resolution; wire prompt + cleanroom + CMS; visual QA of design.

**After prep (locked):** no move, no rename, no in-place ffmpeg, no densify onto that path. Need denser crop / retime / pad?

```bash
# CORRECT: copy-out to work or new versioned client path
ffmpeg -i public/assets/videos/client/Meridian-client-….mp4 … tmp/Meridian-work-….mp4
# If releasing a new client delivery:
# write NEW client filename + update MDX/CMS; keep old client file for existing buyers
```

**Incorrect:** `ffmpeg -y -i client.mp4 … client.mp4`

---

## 4. Where each product records its videos (so we never hunt)

Every shipped SKU must list paths in **all** applicable registries:

| Registry | Path | What it stores |
|----------|------|----------------|
| **Sold prompt MDX** | `content/prompts/heroes/*.mdx` (or section/LP) | `videoBackgrounds[].file` = **client**; `previewVideo` = **preview-page**; optional liveDemo |
| **CMS store** | `data/cms/store.json` | Same public fields after seed/edit; source of truth for live site |
| **Owner design vault** | `src/lib/owner-designs.ts` | `broll` (client), `previewPage`, `previewFs`, `demoHref`, `cleanroomPath`, `promptPath` |
| **Cleanroom component** | `cleanroom/{name}/*.tsx` | `VIDEO_SRC` / video `src` = **client** only |
| **This document** | §8 grandfather table | Human index for operators |

**Lookup order when you need “the client video for Meridian”:**

1. `owner-designs.ts` → `broll`  
2. else MDX `videoBackgrounds[0].file`  
3. else CMS product media fields  

**Lookup order for “product page video”:**

1. CMS / MDX `previewVideo`  
2. `owner-designs.ts` → `previewPage`  
3. **never** client path  

---

## 5. Specs by role

### Master

| Property | Spec |
|----------|------|
| Location | `public/assets/videos/masters/` (new) or legacy `originals/` |
| Naming | `{Product}-master-{OpaqueId}.mp4` |
| Quality | Highest practical; size unrestricted |
| Edit | Never overwrite |

### Client delivery HD

| Property | Spec |
|----------|------|
| Location | `public/assets/videos/client/` (new) |
| Naming free | `{Product}-client-{OpaqueId}.mp4` |
| Naming paid | `{Product}-client-{OpaqueId}-{PaidSalt}.mp4` |
| Format | MP4 H.264; audio stripped (`-an`) |
| Resolution | 1920×1080 (16:9) preferred |
| Duration | 8–14s typical; scroll-scrub / pin-journey may match narrative length |
| Size | Prefer web-friendly (often under ~15–20MB); masters stay fat in `masters/` |
| Content | **No burnt UI** |
| Referenced by | `videoBackgrounds`, cleanroom `src`, buyer download |

### Storefront previews

| Property | Page (`preview-page`) | Fullscreen (`preview-fs`) |
|----------|----------------------|---------------------------|
| Location | `public/assets/videos/storefront/` | same |
| Naming | `{Product}-preview-page-{OpaqueId}.mp4` | `{Product}-preview-fs-{OpaqueId}.mp4` |
| Capture res | ~1600×900 class | **1920×1080** target |
| Display on MS | Product template **~960×540** contain | 90% glass stage |
| Content | Burnt design UI; hide `[data-ms-scroll-cue]` in capture | Same; product page re-adds Scroll/cursor as **HTML** |
| Scroll-narrative | Capture full **pin-until-complete** journey (prefer virtual progress drive; stage stays pinned) — PRODUCT_LAW | Same |
| CMS | `previewVideo` | fullscreen map / `previewVideoFullscreen` |

```bash
# Capture → storefront only (never client/)
node scripts/capture-meridian-preview.mjs
# New scripts must write storefront/ + new naming protocol
```

### Posters & thumbs

| Asset | Location | Notes |
|-------|----------|--------|
| Client poster | `public/assets/posters/` | From client film frame |
| Gallery thumb | `public/thumbnails/` | Often `{prompt-id}.webp`; under 80KB |

---

## 6. CDN & delivery

| Layer | Role |
|-------|------|
| Object store | MS-owned R2 / Supabase Storage / etc. |
| CDN | MS edge in front of bucket |
| Canonical in CMS/prompts | Relative `/assets/videos/…` |
| Production | `{MS_CDN_BASE}` rewrite or absolute CDN URL |
| Cache | opaque / versioned filenames → long immutable cache |

Buyer download = **client** path (signed if gated). Storefront streams **storefront** paths only.

**Banned:** permanent third-party hotlinks as source of truth in sold prompts.

---

## 7. Versioning & releases

| Event | Action |
|-------|--------|
| First client prep | Write one client file; lock path; record everywhere |
| Better encode / densify for **operators only** | `tmp/` work file; do not replace client |
| New **buyer** client release | **New** client filename (new OpaqueId + new PaidSalt if paid); update MDX/CMS/cleanroom; **keep old client file** |
| New storefront capture | New storefront filename; never touch client |
| Mistake on locked client | Restore from backup/git; do not “fix forward” on same path without a release decision |

---

## 8. Grandfather table — existing files (DO NOT RENAME)

These remain valid. New protocol does **not** require migration.

| Product | Role | Current path (do not rename) | Registry |
|---------|------|------------------------------|----------|
| Meridian | client | `/assets/videos/sequence-01.mp4` | MDX + cleanroom + owner-designs `broll` |
| Meridian | poster | `/assets/posters/sequence-01.webp` | MDX |
| Meridian | preview-page | `/assets/videos/meridian-scroll-preview-v1.mp4` | MDX `previewVideo` |
| Meridian | preview-fs | `/assets/videos/meridian-scroll-preview-fs-v1.mp4` | gallery-utils / owner-designs |
| Meridian | demo | `/demo/scroll-narrative` | cleanroom `meridian-scroll` |
| Meridian | prompt | `content/prompts/heroes/MS-HERO-MERI01.mdx` | — |
| Meridian | package PDF | `/packages/MS-HERO-MERI01/Meridian-package-p4ltcy7t4p0c-pd1w65.pdf` | product-packages + owner-designs (opaque; golden-rule layout) |
| Aether | package PDF | `/packages/MS-HERO-AETH01/Aether-package-8rgb4zhx7zrd.pdf` | product-packages + owner-designs |
| Vertex | package PDF | `/packages/MS-HERO-VERT01/Vertex-package-b352guxju0ic.pdf` | product-packages + owner-designs (PDF-only pack, free, no PaidSalt) |
| Aether | client | `/assets/videos/aether-waves-web-v1.mp4` | MDX + owner-designs |
| Aether | master-ish / large | `/assets/videos/aether-waves-v1.mp4` (+ originals) | internal |
| Aether | preview-page / fs | `aether-preview-v1.mp4` / `aether-preview-fs-v1.mp4` | MDX / owner-designs |
| Vertex | client | `/assets/videos/vertex-globe-web-v1.mp4` | MDX + cleanroom + owner-designs `broll` · **PSAVE GOP 3 / no B-frames / 97 I-frames** (see [`PSAVE.md`](./PSAVE.md) §14 / §5C). Backup: `tmp/vertex-globe-web-v1.pre-gop.mp4` |
| Vertex | larger / globe | `vertex-globe-v1.mp4` (+ originals) | internal |
| Vertex | preview-page / fs | `vertex-preview-v1.mp4` / `vertex-preview-fs-v1.mp4` | MDX / gallery-utils / owner-designs · do not recapture unless asked |
| Vertex | prompt | `content/prompts/heroes/MS-HERO-VERT01.mdx` | CMS body v4.0.0 · pin-until-complete · **PSAVE** 3.6 vh + 0.55 dest floor · GOP 3 · PDF-only · no footer band |
| Vertex | demo | `/demo/cleanroom-vertex` | cleanroom `vertex-from-prompt` · do not overflow-hidden |
| Revel | client | `/assets/videos/revel-breakout-v1.mp4` | MDX + cleanroom + owner-designs `broll` · **PSAVE GOP 3 / no B-frames / 161 I-frames** (see [`PSAVE.md`](./PSAVE.md) §14). Backup: `tmp/revel-breakout-v1.pre-gop.mp4` |
| Revel | poster | `/assets/posters/revel-breakout-v1.webp` | MDX (this still **is** frame 0) |
| Revel | preview-page / fs | `revel-scroll-preview-v1.mp4` / `revel-scroll-preview-fs-v1.mp4` | MDX / gallery-utils / owner-designs |
| Revel | backgrounds | `/assets/videos/backgrounds/revel-breakout-bg-v1.mp4` | product-packages |
| Revel | demo | `/demo/cleanroom-revel` | cleanroom `revel-from-prompt` |
| Revel | prompt | `content/prompts/heroes/MS-HERO-REVL01.mdx` | CMS body v1.3.0 · pin-until-complete · **PSAVE** 12 vh · 0.55s dest floor · GOP 3 · PDF-only |
| Revel | package PDF | `/packages/MS-HERO-REVL01/Revel-package-r7v3l9k2mx4q-rv8n3p.pdf` | product-packages + owner-designs (PDF-only pack) |
| Elyse | client | `/assets/videos/elyse-nature-v1.mp4` | MDX + cleanroom + owner-designs `broll` · **PSAVE GOP 3 / no B-frames / 81 I-frames** (see [`PSAVE.md`](./PSAVE.md) §14). Backup of pre-GOP file: `tmp/elyse-nature-v1.pre-gop.mp4` |
| Elyse | poster | `/assets/posters/elyse-nature-v1.webp` | MDX |
| Elyse | preview-page / fs | `elyse-scroll-preview-v1.mp4` / `elyse-scroll-preview-fs-v1.mp4` | MDX / gallery-utils / owner-designs |
| Elyse | backgrounds | `/assets/videos/backgrounds/elyse-nature-bg-v1.mp4` | product-packages |
| Elyse | demo | `/demo/cleanroom-elyse` | cleanroom `elyse-from-prompt` |
| Elyse | prompt | `content/prompts/heroes/MS-HERO-ELYS01.mdx` | CMS body v1.1.6 · pin-until-complete · **PSAVE** (see [`PSAVE.md`](./PSAVE.md)) · 3.6 vh leftover dest · 1.2x fwd/rev · 3-frame reverse · GOP 3 · PDF-only |
| Elyse | package PDF | `/packages/MS-HERO-ELYS01/Elyse-package-e9l7s3e2k4m1-el5n8q.pdf` | product-packages + owner-designs (PDF-only pack) |
| Still | client | `/assets/videos/still-cosmos-v1.mp4` | MDX + cleanroom + owner-designs `broll` · **PSAVE GOP 3 / no B-frames / 240 I-frames** (see [`PSAVE.md`](./PSAVE.md) §14 / §5D). Backup: `tmp/still-cosmos-v1.pre-gop.mp4` |
| Still | poster | `/assets/posters/still-cosmos-v1.webp` | MDX |
| Still | preview-page / fs | `still-preview-v1.webm` (keep WebM) / `still-preview-fs-v1.mp4` | MDX / gallery-utils / owner-designs · do not recapture unless asked |
| Still | demo | `/demo/cleanroom-still` | cleanroom `still-from-prompt` · do not overflow-hidden |
| Still | prompt | `content/prompts/heroes/MS-HERO-STIL01.mdx` | CMS body v2.0.0 · pin-until-complete · **PSAVE** 12 vh · 0.55s dest floor · GOP 3 · files zip + PDF |
| Still | package | `/packages/MS-HERO-STIL01/Still-package-s7i1l9m4ndf0-sk3p8w.pdf` + files zip | product-packages + owner-designs |
| Prism | client | `/assets/videos/prism-faces-v1.mp4` | MDX + cleanroom + owner-designs `broll` · **PSAVE GOP 3 / no B-frames / 381 I-frames** (see [`PSAVE.md`](./PSAVE.md) §14 / §5E). Backup: `tmp/prism-faces-v1.pre-gop.mp4` |
| Prism | poster | `/assets/posters/prism-faces-v1.webp` | MDX |
| Prism | preview-page / fs | `prism-scroll-preview-v1.mp4` / `prism-scroll-preview-fs-v1.mp4` | MDX / gallery-utils / owner-designs · **leave as-is** (operator 2026-08-15). No recapture. No GOP 3. Shop clip never plays reverse. |
| Prism | backgrounds | `/assets/videos/backgrounds/prism-faces-bg-v1.mp4` | product-packages |
| Prism | demo | `/demo/cleanroom-prism` | cleanroom `prism-from-prompt` · do not overflow-hidden |
| Prism | prompt | `content/prompts/heroes/MS-HERO-PRSM01.mdx` | CMS body v2.0.0 · pin-until-complete · **PSAVE** 12 vh · 0.55s dest floor · GOP 3 · files zip + PDF |
| Prism | package | `/packages/MS-HERO-PRSM01/Prism-package-p8r3sm7k2n4q-pr5m2x.pdf` + files zip | product-packages + owner-designs |
| Mirage | client | `/assets/videos/mirage-desert-v1.mp4` | MDX + cleanroom + pack `assets/` · free-play desert film. **Not PSAVE. No GOP 3.** Do not reverse. |
| Mirage | poster (film) | `/assets/posters/mirage-desert-v1.webp` | Pure film still. Pack `assets/`. Never a storefront UI burn. |
| Mirage | preview-page / fs | `mirage-scroll-preview-v1.mp4` / `mirage-scroll-preview-fs-v1.mp4` | MDX / gallery-utils / owner-designs · **leave as-is**. No recapture. No GOP 3. Shop clip never plays reverse. |
| Mirage | poster / thumb | `/assets/posters/mirage-scroll-preview-v1.webp` · `/thumbnails/MS-HERO-MIRA01.webp` | product-packages storefront poster + MDX thumb |
| Mirage | backgrounds | `/assets/videos/backgrounds/mirage-desert-bg-v1.mp4` | Small encode of client HD. Poster = `mirage-desert-v1.webp`. Never stream full client HD here. |
| Mirage | demo | `/demo/cleanroom-mirage` | cleanroom `mirage-from-prompt` · do not overflow-hidden · `#mirage-after` is demo-only runway |
| Mirage | prompt | `content/prompts/heroes/MS-HERO-MIRA01.mdx` | CMS body v2.0.0 · pin-until-complete · **No Scroller only** (not PSAVE) · earn 5 × 1.55 vh · pin freeing (page owns until dock) · files zip + PDF |
| Mirage | package | `/packages/MS-HERO-MIRA01/Mirage-package-m1r4ge8k2n9x-mg7k3p.pdf` + files zip | product-packages + owner-designs |
| Helix | client | `/assets/images/orbit/orbit-01.jpg` … `orbit-09.jpg` | MDX + cleanroom + pack `assets/` · nine stills, no film |
| Helix | preview-page / fs | `helix-gallery-preview-v1.mp4` / `helix-gallery-preview-fs-v1.mp4` | MDX / gallery-utils / owner-designs · **leave as-is**. No recapture. No GOP 3. Shop clip never plays reverse. |
| Helix | poster / thumb | `/assets/posters/helix-gallery-preview-v1.webp` · `/thumbnails/MS-SEC-HELI01.webp` | MDX + CMS |
| Helix | demo | `/demo/cleanroom-helix` | cleanroom `helix-from-prompt` · do not overflow-hidden · `#helix-after` is demo-only runway · no SmoothScroll / gsap-register |
| Helix | prompt | `content/prompts/sections/MS-SEC-HELI01.mdx` | CMS body **v2.2.0** · pin-until-complete · **No Scroller only** (not PSAVE) · earn 5/3 vh · pin freeing (page owns until dock) · PaidSalt `t2v8c6` · Platinum backend 2026-08-15 |
| Helix | package | `/packages/MS-SEC-HELI01/Helix-package-h3l1x9k2m7p4-t2v8c6.pdf` + files zip | product-packages + owner-designs |
| Helix | backgrounds | **N/A** (gallery cards, not a film tile) | do not list on `/backgrounds` |
| Studio Sequence | client | `/assets/videos/studio-surreal-v1.mp4` | MDX + cleanroom + pack `assets/billboard-film.mp4` · free-play board cinema. **Not PSAVE. No GOP 3.** Do not reverse. Do not seek. |
| Studio Sequence | plate | `/assets/images/studio/ny.png` | Demo plate. Pack `assets/street-plate.png`. |
| Studio Sequence | preview-page / fs | `studio-sequence-preview-v1.webm` (keep WebM) / `studio-sequence-preview-fs-v1.mp4` | MDX / gallery-utils / owner-designs · **leave as-is**. No recapture. Operator screenshot WebM (ASSET_PIPELINE §1A). |
| Studio Sequence | poster / thumb | `/assets/posters/studio-sequence-preview-v1.webp` · `/thumbnails/MS-SEC-STUDIO01.webp` | MDX + CMS |
| Studio Sequence | backgrounds | `/assets/videos/backgrounds/studio-surreal-bg-v1.mp4` | Small encode of client HD. Never stream full client HD here. |
| Studio Sequence | demo | `/demo/cleanroom-studio` | cleanroom `studio-from-prompt` · do not overflow-hidden · `#studio-after` is demo-only runway · no SmoothScroll / gsap-register |
| Studio Sequence | prompt | `content/prompts/sections/MS-SEC-STUDIO01.mdx` | CMS body **v2.1.0** · pin-until-complete · **No Scroller only** (not PSAVE) · earn 4/3 vh · pin freeing (page owns until dock) · PaidSalt `p8k2m1` · Platinum backend 2026-08-15 |
| Studio Sequence | package | `/packages/MS-SEC-STUDIO01/Studio-package-s7u2d1o9q4x1-p8k2m1.pdf` + files zip | product-packages + owner-designs |
| Lineup | client | `/models/can.glb` + labels + HDRI | MDX + cleanroom + pack `assets/` · 3D pack, no film |
| Lineup | preview-page / fs | `lineup-reveal-preview-v1.webm` (keep WebM) / `lineup-reveal-preview-fs-v1.mp4` | MDX / gallery-utils / owner-designs · **leave as-is**. No recapture. |
| Lineup | poster / thumb | `/assets/posters/lineup-reveal-preview-v1.webp` · `/thumbnails/MS-SEC-LINE01.webp` | MDX + CMS |
| Lineup | demo | `/demo/cleanroom-lineup` | cleanroom `lineup-from-prompt` · do not overflow-hidden · `#lineup-after` is demo-only runway · no SmoothScroll / lenis |
| Lineup | prompt | `content/prompts/sections/MS-SEC-LINE01.mdx` | CMS body **v2.1.0** · pin-until-complete · **No Scroller only** (not PSAVE) · earn N vh · snap on lift · pin freeing · PaidSalt `q3n7w2` · Platinum backend 2026-08-16 |
| Lineup | package | `/packages/MS-SEC-LINE01/Lineup-package-l7n3e9k2m4p8-q3n7w2.pdf` + files zip | product-packages + owner-designs |
| Lineup | backgrounds | **N/A** (3D pack, not a film tile) | do not list on `/backgrounds` |
| Actually! | client | `/models/can.glb` + labels + HDRI | MDX + cleanroom + pack `assets/` · 3D pack, no film |
| Actually! | preview-page / fs | `actually-hero-preview-v1.mp4` / `actually-hero-preview-fs-v1.mp4` | MDX / gallery-utils · **leave as-is**. No recapture. |
| Actually! | poster / thumb | `/assets/posters/actually-hero-preview-v1.webp` · `/thumbnails/MS-HERO-ACTU01.webp` | MDX + CMS |
| Actually! | demo | `/demo/cleanroom-actually` | cleanroom `actually-from-prompt` · do not overflow-hidden · `#actually-after` · no SmoothScroll / lenis |
| Actually! | prompt | `content/prompts/heroes/MS-HERO-ACTU01.mdx` | CMS body **v2.1.0** · pin-until-complete · **No Scroller only** · earn 1.2 vh · pin freeing · PaidSalt `r5m4x9` · Platinum backend 2026-08-16 |
| Actually! | package | `/packages/MS-HERO-ACTU01/Actually-package-a9ct7u4l2y1x-r5m4x9.pdf` + files zip | product-packages + owner-designs |
| Actually! | backgrounds | **N/A** | do not list on `/backgrounds` |
| Roadster | client | `/assets/roadster/studio-drive.mp4` + `roadster.glb` | MDX + cleanroom + pack `assets/` · loop film, never seek |
| Roadster | preview-page / fs | `roadster-studio-drive-preview-v1.mp4` / `roadster-studio-drive-preview-fs-v1.mp4` | MDX / gallery-utils · **leave as-is**. No recapture. |
| Roadster | poster / thumb | `/assets/posters/roadster-studio-drive-v1.webp` · `/thumbnails/MS-HERO-ROAD01.webp` | MDX + CMS |
| Roadster | demo | `/demo/cleanroom-roadster` (+ `/demo/tesla-roadster`) | cleanroom `tesla-roadster` · do not overflow-hidden · `#roadster-after` · no gsap / ScrollTrigger |
| Roadster | prompt | `content/prompts/heroes/MS-HERO-ROAD01.mdx` | CMS body **v2.1.0** · pin-until-complete · **No Scroller only** · earn 13.3 vh · pin freeing · PaidSalt `rd7n4x` · Platinum backend 2026-08-16 |
| Roadster | package | `/packages/MS-HERO-ROAD01/Roadster-package-r0ad8t3r5k2m-rd7n4x.pdf` + files zip | product-packages + owner-designs |
| Roadster | backgrounds | **N/A** as a browse tile | client film is pack-only |
| Grok Bot | client | `/assets/videos/grokbot-sphere-v1.mp4` | MDX + cleanroom + pack `assets/` · **PSAVE GOP 3 / no B-frames / 521 I-frames** · 62.52s 25fps |
| Grok Bot | poster (film) | `/assets/posters/grokbot-sphere-v1.webp` | Pure film still. Pack `assets/`. |
| Grok Bot | preview-page / gallery | `grokbot-preview-v1.webm` (keep WebM) | Operator `GrokBot-VEGAS.webm` · **full 63.76s** on product page AND gallery. Never re-encode to mp4. Never use client HD as preview. |
| Grok Bot | preview-fs | `grokbot-preview-fs-v1.mp4` | Operator `GrokBot-VEGAS_FS.mp4` · full 63.76s 1080p |
| Grok Bot | poster / thumb (shop) | `/assets/posters/grokbot-preview-v1.webp` · `/thumbnails/MS-HERO-GROK01.webp` | Cut from operator WebM |
| Grok Bot | backgrounds | `/assets/videos/backgrounds/grokbot-sphere-bg-v1.mp4` | Small encode of client HD. Poster = `grokbot-sphere-v1.webp`. |
| Grok Bot | demo | `/demo/cleanroom-grokbot` | cleanroom `grokbot-from-prompt` · do not overflow-hidden · `#grokbot-after` |
| Grok Bot | prompt | `content/prompts/heroes/MS-HERO-GROK01.mdx` | CMS body **v2.1.0** · pin-until-complete · **PSAVE + No Scroller** · earn 12 vh · PaidSalt `gk4n8x` · Platinum backend 2026-08-16 |
| Grok Bot | package | `/packages/MS-HERO-GROK01/GrokBot-package-g7k0b8t4vg2n-gk4n8x.pdf` + files zip | product-packages + owner-designs |
| SkySpires | client | `/assets/videos/skyspires-sunrise-v1.mp4` | GOP 3 / 24fps / 201 I / 25.04s · pack `assets/` |
| SkySpires | poster (film) | `/assets/posters/skyspires-sunrise-v1.webp` | Pure film still |
| SkySpires | preview-page / fs | `skyspires-preview-v1.mp4` / `skyspires-preview-fs-v1.mp4` | Agent capture until operator Premiere. Switch page+gallery to WebM if operator WebM arrives. |
| SkySpires | poster / thumb (shop) | `/assets/posters/skyspires-preview-v1.webp` · `/thumbnails/MS-HERO-SKYS01.webp` | HUD still |
| SkySpires | backgrounds | `/assets/videos/backgrounds/skyspires-sunrise-bg-v1.mp4` | Small encode of client HD |
| SkySpires | demo | `/demo/cleanroom-skyspires` | cleanroom `skyspires-from-prompt` · `#skyspires-after` |
| SkySpires | prompt | `content/prompts/heroes/MS-HERO-SKYS01.mdx` | v2.1.0 · PSAVE + No Scroller · 12 vh · PaidSalt `sk5n2q` · Platinum backend 2026-08-16 |
| SkySpires | package | `/packages/MS-HERO-SKYS01/SkySpires-package-s4y8p1r3sk7n-sk5n2q.pdf` + files zip | product-packages + owner-designs |
| Zero Energy | client (3D pack) | `/assets/zero-energy/webgl/can.glb` (+ labels, HDRI, fonts) | MDX empty `videoBackgrounds` + owner-designs `broll` + pack `assets/` |
| Zero Energy | preview-page | `/assets/videos/zero-energy-preview-v1.webm` | MDX `previewVideo` · operator WebM · keep WebM |
| Zero Energy | preview-fs | `/assets/videos/zero-energy-preview-fs-v1.mp4` | gallery-utils / owner-designs |
| Zero Energy | poster / thumb | `/assets/posters/zero-energy-preview-v1.webp` · `/thumbnails/MS-HERO-ZERO01.webp` | MDX + CMS |
| Zero Energy | package | `/packages/MS-HERO-ZERO01/ZeroEnergy-package-q8w3n6k2xm5r-n4k8p2.pdf` + files zip | product-packages + owner-designs |
| Zero Energy | backgrounds | **N/A** (3D pack, not a film tile) | do not list on `/backgrounds` |

Add a row here (or always in `owner-designs.ts`) for every new flagship.

---

## 9. Encoding examples (always new output path)

```bash
# Master → paid client (new protocol)
ffmpeg -i public/assets/videos/masters/Meridian-master-OPAQUE.mp4 \
  -vf "scale=1920:1080:flags=lanczos" -c:v libx264 -crf 23 -preset slow -an -movflags +faststart \
  public/assets/videos/client/Meridian-client-OPAQUE2-SALTED.mp4

# PSAVE client HD (Elyse / Revel / Vertex / Still / Prism / any Perfect Scroll Video Engine film) — dense keyframes, no B-frames
# Do NOT use the generic crf 23 long-GOP encode above for a PSAVE hero. Reverse will stall.
ffmpeg -y -i your-film.mp4 -an -c:v libx264 -pix_fmt yuv420p -preset slow -crf 16 \
  -g 3 -keyint_min 3 -bf 0 -sc_threshold 0 -movflags +faststart \
  your-film-psave.mp4
# Full law: docs/PSAVE.md §14

# Poster from client
ffmpeg -i public/assets/videos/client/Meridian-client-OPAQUE2-SALTED.mp4 \
  -ss 0.5 -vframes 1 public/assets/posters/Meridian-poster-OPAQUE3.webp
```

---

## 10. Break-apart / special media

- Prefer role folders + purpose token `client` (or dedicated purpose if sold as a separate pack asset).  
- Tag taxonomy: `disintegration` / `exploded-view` / `break-apart`.  
- Must still appear in prompt `videoBackgrounds` or an explicit asset list.

---

## 11. Operator checklist (every SKU)

- [ ] Roles separated: master / client / preview-page / preview-fs / poster / thumb  
- [ ] New files use **folder + naming protocol**; legacy left alone  
- [ ] Paid client has **PaidSalt**; free client does not  
- [ ] Client locked after prep; no in-place edits  
- [ ] Client has **no burnt MS UI**; audio stripped  
- [ ] Paths recorded in MDX + CMS + `owner-designs.ts` + cleanroom  
- [ ] Capture scripts write only to **storefront/**  
- [ ] Each path opens successfully  
- [ ] Grandfather table or owner-designs updated for new SKUs  
- [ ] After first production post: **Platinum Second Revision** permission asked + media matrix re-smoked ([`PLATINUM_SECOND_REVISION.md`](./PLATINUM_SECOND_REVISION.md))  
- [ ] PSAVE: GOP 3 only on **client** full-size film, encoded **while making the demo**. Never GOP a storefront preview (it never plays reverse). See **§1B**.  

---

## 12. CDN & caching (summary)

| Asset type | Cache |
|------------|--------|
| Videos / posters / thumbs (opaque / versioned names) | `public, max-age=31536000, immutable` |
| Gated client downloads | short-lived signed URL preferred |
| manifest | shorter TTL + SWR |

**Why:** video-first catalog with **ownership** of objects and filenames that do not leak a simple “guess the paid pack URL” pattern for future SKUs.
