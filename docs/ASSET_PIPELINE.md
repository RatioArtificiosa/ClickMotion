# MS Asset Pipeline

**Related law:** [`PRODUCT_LAW.md`](./PRODUCT_LAW.md) (media vault summary) · [`PRODUCTION_PROCESS.md`](./PRODUCTION_PROCESS.md) · [`CMS_ADMIN.md`](./CMS_ADMIN.md)

**Status:** Living vault law · Updated 2026-08-09 (backgrounds posters = pure film only)  

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
| **`preview-page`** | In-page MS product player + gallery loop | Public MS storefront | Burnt UI capture of the **built** design; muted | Recapture OK → **new** storefront file |
| **`preview-fs`** | Product “fullscreen” glass overlay | Public MS storefront | Same class as page; often 1920×1080 | Same as page |
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
  {productId}/           # role: package PDF (client delivery manual)

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
| `work` | scratch | `tmp/` only |

**Package PDF naming (new files):** `{Product}-package-{OpaqueId}[-{PaidSalt}].pdf` — PaidSalt only for paid tiers (same idea as client video). Law + section order: [`PRODUCT_PACKAGE.md`](./PRODUCT_PACKAGE.md).

### Paid salt rules (detail)

1. Apply **only** to **`client`** purpose files for products with **paid** price tier (pro / starter / agency — not free).  
2. Salt is **independent** of OpaqueId; regenerate both if you intentionally issue a new client release.  
3. **Never** put PaidSalt on storefront previews (public files must not share the paid-pack suffix pattern).  
4. Free listings: `Product-client-{OpaqueId}.mp4` **without** the final `-{PaidSalt}`.  
5. Operators store the full filename in MDX / CMS / `owner-designs` — humans look up the **registry**, not invent paths from memory.

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
| Duration | 8–14s typical; scroll-scrub may match narrative length |
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
| Vertex | package PDF | `/packages/MS-HERO-VERT01/Vertex-package-b352guxju0ic.pdf` | product-packages + owner-designs |
| Aether | client | `/assets/videos/aether-waves-web-v1.mp4` | MDX + owner-designs |
| Aether | master-ish / large | `/assets/videos/aether-waves-v1.mp4` (+ originals) | internal |
| Aether | preview-page / fs | `aether-preview-v1.mp4` / `aether-preview-fs-v1.mp4` | MDX / owner-designs |
| Vertex | client | `/assets/videos/vertex-globe-web-v1.mp4` | MDX + owner-designs |
| Vertex | larger / globe | `vertex-globe-v1.mp4` (+ originals) | internal |
| Vertex | preview-page / fs | `vertex-preview-v1.mp4` / `vertex-preview-fs-v1.mp4` | MDX / owner-designs |

Add a row here (or always in `owner-designs.ts`) for every new flagship.

---

## 9. Encoding examples (always new output path)

```bash
# Master → paid client (new protocol)
ffmpeg -i public/assets/videos/masters/Meridian-master-OPAQUE.mp4 \
  -vf "scale=1920:1080:flags=lanczos" -c:v libx264 -crf 23 -preset slow -an -movflags +faststart \
  public/assets/videos/client/Meridian-client-OPAQUE2-SALTED.mp4

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

---

## 12. CDN & caching (summary)

| Asset type | Cache |
|------------|--------|
| Videos / posters / thumbs (opaque / versioned names) | `public, max-age=31536000, immutable` |
| Gated client downloads | short-lived signed URL preferred |
| manifest | shorter TTL + SWR |

**Why:** video-first catalog with **ownership** of objects and filenames that do not leak a simple “guess the paid pack URL” pattern for future SKUs.
