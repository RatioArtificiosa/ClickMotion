# Product Package Law (Client Delivery PDF + Files Zip)

**Status:** Golden-rule protocol · Updated 2026-08-11  
**Related:** **[`SHIP_FOR_SALE.md`](./SHIP_FOR_SALE.md)** (open first when shipping) · [`PRODUCT_LAW.md`](./PRODUCT_LAW.md) · [`ASSET_PIPELINE.md`](./ASSET_PIPELINE.md) · [`BRAND.md`](./BRAND.md) · **[`PRODUCTION_READY_CHECKLIST.md`](./PRODUCTION_READY_CHECKLIST.md)** (full publish gate) · **[`PLATINUM_SECOND_REVISION.md`](./PLATINUM_SECOND_REVISION.md)** (mandatory second revision after every new product post) · Admin → **Product packages**

**Gold standard (PDF layout):** Meridian package layout (opaque name, e.g. `Meridian-package-p4ltcy7t4p0c-pd1w65.pdf`) — do not ship thinner buyer packages. All PDFs use opaque suffixes so filenames are not guessable from product slugs.

**Gold standard (product folder + files zip):** Studio Sequence — **both** of:

- Product folder: `public/packages/MS-SEC-STUDIO01/files/`  
- Zip of that folder: `public/packages/MS-SEC-STUDIO01/Studio-files-s7u2d1o9q4x1-p8k2m1.zip`  

Each product keeps the **folder** (every file needed to make the end product with AI) **and** the **zip** (same contents for download). Clone this shape for every later rebuild SKU.

This document defines the **client delivery package**: what the buyer downloads after **Get Full Prompt**. There are **two complementary deliverables**:

| Deliverable | Role | When required |
|-------------|------|----------------|
| **Files zip** | Primary rebuild pack: prompt + source + client assets | **Required** when the product is built from cleanroom/source + assets (flagship interactive / scroll / 3D / film-section products). Prefer zip for download when registered. |
| **Product Package PDF** | Buyer manual (golden-rule layout, per-tool prompts, customize) | **Always** generate and register for video-class and flagship SKUs. Remains the instruction manual even when zip is primary download. |

Storefront CTA label stays **Get Full Prompt**. Server prefers zip when present; otherwise PDF. See §10.

---

## 1. Purpose

When a product is published, the buyer does not only get a prompt string. They get a **package**:

### 1A. Files zip (primary rebuild pack — when applicable)

- A single opaque-named **`.zip`** the buyer can open next to their app  
- Contains **only** what is needed to rebuild: `START-HERE.md`, `PROMPT.md`, `CUSTOMIZATION.md`, `source/`, `assets/`  
- **Buyer voice**; no MS backend, CMS, MDX paths, admin, storefront captures, thumbs, or lab chrome  
- Complete enough that the buyer says: *Build using only the files in this pack. Read PROMPT.md.*  
- Brand: **ClickMotion** · www.ClickMotion.dev in START-HERE footer  
- **No em dash** characters in buyer-facing markdown  

### 1B. Product Package PDF (manual — always for flagships)

- Forbes / private-bank quality, **buyer voice** (you / your)  
- Complete enough to build with an AI tool (no coding knowledge required)  
- Safe: **no backend leaks** (no thumbnails, storefront captures, CMS, MDX paths, admin, scaffolds)  
- Customizable via plain English “Ask your AI to change X to Y” lines  
- Brand: **ClickMotion**, Birthstone wordmark + white glow, www.ClickMotion.dev  
- **No em dash** characters; use comma, period, or ` - `  
- **Font size always fits** page width (titles, wordmark, URLs shrink to fit; never clip)  

**Do not change product-page CTA button labels** as part of this protocol.

---

## 2. Publish gate — everything required before “published”

A product is **not** fully shippable until **all** of the following exist and are registered (paths recorded; legacy names OK until new naming applies).

### A. Storefront media (Admin → Products → Preview media)

| Element | Role | CMS / public use | Storage (new files) | Legacy OK example |
|---------|------|------------------|---------------------|-------------------|
| **Preview video** | Full design capture for product page hero + home/browse/gallery loop | `previewVideo` | `videos/storefront/` + naming protocol. **If operator screenshot is WebM → keep WebM** for this field (never re-encode page role to mp4). FS may be mp4. ASSET_PIPELINE §1A | `still-preview-v1.webm` (operator) or agent `*-preview-v1.mp4` |
| **Thumbnail** | Gallery card face (home / browse) | `thumbnail` | `thumbnails/` | `MS-HERO-MERI01.webp` |
| **Poster** | Product-page fallback while video loads | `poster` (or thumbnail fallback) | `posters/` | `sequence-01.webp` |

Exactly as labeled in Admin “Preview media”: preview = full design capture; thumbnail = gallery face; poster = product-page still fallback.

### B. Client package media (buyer pack)

| Element | Role | Where referenced | Storage (new) | Legacy OK |
|---------|------|------------------|---------------|-----------|
| **Client HD video** | B-roll only (no MS UI) | Prompt `videoBackgrounds`, cleanroom, PDF § Video | `videos/client/` | `sequence-01.mp4` |
| **Client poster** | Still for buyer build | Prompt poster field, PDF | `posters/` | `sequence-01.webp` |
| **Fullscreen storefront** (recommended) | Product FS overlay | gallery-utils / CMS map | `videos/storefront/` | `*-preview-fs-v1.mp4` |

### C. Product package PDF (this law)

| Element | Role | Storage | Naming (new files) |
|---------|------|---------|-------------------|
| **Product Package PDF** | Full client instructions (manual) | `public/packages/{productId}/` | `{Product}-package-{OpaqueId}[-{PaidSalt}].pdf` — PaidSalt only if paid tier |

### D. Files zip (rebuild pack — this law §10)

| Element | Role | Storage | Naming (new files) |
|---------|------|---------|-------------------|
| **Files zip** | Primary Get Full Prompt payload when registered | `public/packages/{productId}/` | `{Product}-files-{OpaqueId}[-{PaidSalt}].zip` — **same OpaqueId family as the PDF**; PaidSalt only if paid tier |
| **Staging tree** | Operator-editable source of the zip | `public/packages/{productId}/files/` | Not public as a download path; rebuild zip from this folder |

### E. Build & catalog

| Element | Role |
|---------|------|
| Sold prompt MDX | Full body + frontmatter |
| CMS product row | Published; media fields filled |
| Cleanroom / live demo (flagship) | Owner proof at `/demo/...` |
| `owner-designs.ts` row (flagships) | `broll`, `previewPage`, `previewFs`, `packagePdf`, paths |
| `product-packages.ts` | `pdfHref` + optional `filesZipHref` + checklist flags |

**Hard rule:** never publish with only a prompt and no storefront media. Never point package PDF or zip assets at storefront `*-preview*` files for “background video” or rebuild media.

**Do not rename** existing Meridian / Aether / Vertex files. New assets follow [`ASSET_PIPELINE.md`](./ASSET_PIPELINE.md) naming.

---

## 3. Brand chrome (locked)

| Item | Value |
|------|--------|
| Brand | **ClickMotion** (see [`BRAND.md`](./BRAND.md)) |
| Wordmark | Birthstone, white + soft white glow on dark |
| Website | www.ClickMotion.dev |
| Font fit | Titles, wordmark, URLs: shrink point size until string fits max width |

First approved Meridian PDF is the **Golden Rule** layout: later products clone structure, swap product content, keep brand chrome.

---

## 4. PDF structure (Golden Rule — buyer-facing order)

Every Product Package PDF uses this order. Section titles may be styled; order is law.

| # | Section | Must include |
|---|---------|--------------|
| 00 | **Cover** | ClickMotion wordmark + site, product title, one-line promise, what is inside (video + per-tool prompts + customize) |
| 01 | **Start here** | Simple numbered steps (~10 min); video link in a clear box |
| 02 | **Background video (standalone)** | Client HD **URL alone** + file name note; what the film shows; offline fallback language |
| 03 | **Per-tool ready prompts (mandatory)** | Full paste-ready prompt **per AI tool we list** (Cursor, Claude, Grok Build, Lovable, Codex / ChatGPT, Bolt, Your Smart AI Agent). Video URL **inside** each prompt. Multi-page OK. Slight per-tool opener. No React jargon for the human. Future-proof: do not hardcode “DNS not ready” or temporary infrastructure notes. |
| 04 | **Customize without coding** | “Ask your AI to change…” fill-in lines (brand name, headlines, buttons, colors, video, mobile, fix broken) |
| 05 | **New background video (optional)** | Full AI video-gen prompt; then tell coding AI to swap the file |
| 06 | **Close** | Reminders + wordmark + site |

**Hard content rules for PDF body:**

- Speak to the **buyer**, not operators.  
- **No** backend / storefront / thumbnail / CMS / MDX / admin / scaffold language.  
- **No em dashes.**  
- Full prompts live **in the PDF**, not as “open this path.”  
- Storefront `*-preview*` videos are never the buyer background film (operator-only; omit from PDF).

Page count is flexible. Prefer generous margins; prompt pages may be denser.

---

## 5. Design system for the PDF itself (visual law)

The package PDF is a **product**, not a memo.

| Token | Spec |
|-------|------|
| Page | US Letter (or A4 if brand standard later); consistent |
| Margins | ≥ 0.7" outer; calm negative space |
| Palette | Deep ink canvas (`#0c0a08`–`#12141a`), cream type (`#f4f0e8`), single metal accent gold (`#c9a66b`) — premium dark, not neon SaaS |
| Type | Birthstone for ClickMotion wordmark only; clean sans for body 9–11pt; titles use fit-to-width |
| Fit | **Always change font size to fit** max content width (wordmark, product name, long URLs, prompt lines). Min floors so text stays readable. Never clip brand wordmark. |
| Rules | Thin gold or white/10 hairlines; no clip-art; no stock gradients |
| Cover | Full-bleed dark; ClickMotion wordmark + glow; product name large; quiet subtitle |
| Footer | Mini wordmark (fit) · website · page number |

**Forbidden in the PDF chrome:** Comic fonts, rainbow gradients, “AI generated” watermarks, cluttered icons, Motionsites-style pill kits, em dashes, backend jargon.

---

## 6. Storage & registries

```text
public/packages/
  {productId}/                         # e.g. MS-SEC-STUDIO01/
    {Product}-package-{OpaqueId}[-{PaidSalt}].pdf
    {Product}-files-{OpaqueId}[-{PaidSalt}].zip   # optional but required for rebuild SKUs
    files/                             # staging tree (source of zip; keep in repo)
      START-HERE.md
      PROMPT.md
      CUSTOMIZATION.md
      source/                          # production React (or other) sources
      assets/                          # client rebuild media only
scripts/
  generate-product-package-pdf.py      # golden-rule PDF generator
docs/
  PRODUCT_PACKAGE.md                   # this law
```

| Registry | Field |
|----------|--------|
| `src/lib/owner-designs.ts` | `packagePdf?: string` (public URL path) |
| `src/lib/product-packages.ts` | Admin index: `pdfHref`, `filesZipHref`, `filesZipRepoPath`, checklist |
| CMS (future) | optional `packagePdf` / zip path on product row |
| Admin UI | `/admin/packages` — review, open, status |
| Download API | `GET /api/packages/[productId]/download` — zip preferred, then PDF |

---

## 7. Free vs paid packages

| | Free | Paid |
|-|------|------|
| PDF quality | Same golden-rule layout | Same layout |
| Zip quality | Same structure when zip applies | Same structure |
| Content depth | Full enough to build | Same + any paid-only notes if needed |
| Client video naming | No PaidSalt | PaidSalt on **new** client files (ASSET_PIPELINE) |
| PDF naming (new) | `{Product}-package-{OpaqueId}.pdf` | `{Product}-package-{OpaqueId}-{PaidSalt}.pdf` |
| **Files zip naming (new)** | `{Product}-files-{OpaqueId}.zip` | `{Product}-files-{OpaqueId}-{PaidSalt}.zip` |
| Storefront CTAs | Unchanged (**Get Full Prompt**) | Unchanged |

**OpaqueId + PaidSalt:** Prefer the **same OpaqueId** (and same PaidSalt when paid) on both PDF and zip for one SKU so operators treat them as one package generation. Never put PaidSalt on storefront previews.

---

## 8. Approval workflow

1. Generate PDF from golden-rule script / template.  
2. Build staging tree `public/packages/{id}/files/` (see §10).  
3. Zip staging tree → `{Product}-files-{OpaqueId}[-{PaidSalt}].zip` next to the PDF.  
4. Place under `public/packages/{id}/`.  
5. Register in `product-packages.ts` (`pdfHref`, `filesZipHref` when present, checklist) + `owner-designs.packagePdf`.  
6. Operator reviews in **Admin → Product packages**.  
7. User approves or requests edits → revise PDF / zip contents only (not product page buttons).  
8. **After first production post:** agent tells operator first pass is done and **asks permission** for **Platinum Second Revision** ([`PLATINUM_SECOND_REVISION.md`](./PLATINUM_SECOND_REVISION.md)); re-verify folder/zip/PDF/registries/smoke; re-zip if source changed.  
9. First approved Meridian PDF remains **locked golden rule** for PDF layout. Studio Sequence zip remains **locked gold** for files-tree structure.

---

## 9. Operator checklist (publish)

- [ ] Preview video, thumbnail, poster filled (Admin Preview media)  
- [ ] Client HD + poster locked and referenced in prompt  
- [ ] Storefront page (+ fs) capture separate from client  
- [ ] Product Package PDF generated and registered  
- [ ] **Files zip** built + registered when product is a rebuild SKU (§10)  
- [ ] Download path smoke-tested: Get Full Prompt → zip if registered, else PDF  
- [ ] PDF contains **full ready prompts per tool** (section 03), not only a file path  
- [ ] Video URL appears **standalone** and **inside** each tool prompt (when film product)  
- [ ] Buyer voice only; no backend / storefront / thumbnail leaks in PDF **or** zip  
- [ ] No em dashes; ClickMotion + www.ClickMotion.dev in buyer-facing pack docs  
- [ ] Font sizes fit page width (no clipped titles/URLs/wordmark)  
- [ ] MDX + CMS + owner-designs + product-packages paths agree  
- [ ] No rename of grandfathered media  
- [ ] **Platinum Second Revision** after first post: operator told first pass finished → permission asked → [`PLATINUM_SECOND_REVISION.md`](./PLATINUM_SECOND_REVISION.md) / Phase 13 PASS (re-zip if source fixed)  

**Regenerate flagship package PDFs (Meridian + Aether + Vertex):**

```bash
python scripts/generate-product-package-pdf.py
```

Outputs (opaque names — see `src/lib/product-packages.ts` for current tokens):

- `public/packages/MS-HERO-MERI01/Meridian-package-{OpaqueId}-{PaidSalt}.pdf` (pro)
- `public/packages/MS-HERO-AETH01/Aether-package-{OpaqueId}.pdf` (free)
- `public/packages/MS-HERO-VERT01/Vertex-package-{OpaqueId}.pdf` (free)

**Rebuild Studio-class files zip (example):**

```bash
# From repo root after editing public/packages/MS-SEC-STUDIO01/files/
cd public/packages/MS-SEC-STUDIO01
# Windows PowerShell:
Compress-Archive -Path files\* -DestinationPath Studio-files-s7u2d1o9q4x1-p8k2m1.zip -Force
# Or zip CLI so root entries are START-HERE.md, PROMPT.md, … (not a nested files/ folder):
# cd files && zip -r ../Studio-files-{OpaqueId}[-{PaidSalt}].zip .
```

**Critical zip root rule:** Archive **contents of `files/`**, not the `files` folder itself. Buyer must open the zip and immediately see `START-HERE.md` at the top level.

---

## 10. Files zip protocol (full law — do not forget)

### 10.1 When a files zip is required

| Product shape | Files zip? |
|---------------|------------|
| Flagship with cleanroom source the buyer should rebuild from (Studio, Lineup, Actually, Helix, and later rebuild SKUs) | **Required** before sale-ready |
| Video-hero with client film only, Meridian-class “prompt + film URL in PDF” | PDF may be enough **until** a files pack is authored; prefer adding zip when source is productized |
| Free simple listing with no cleanroom pack | PDF or prompt-only per older path; still no storefront leaks |

**Rule of thumb:** If an AI can rebuild the product from a folder of files better than from a long paste alone, ship a **files zip**. Studio Sequence is the proof that zip-first delivery is the premium path.

### 10.2 Naming

```text
{Product}-files-{OpaqueId}[-{PaidSalt}].zip
```

| Segment | Rules |
|---------|--------|
| **Product** | Short brand token matching PDF (`Studio`, `Lineup`, `Actually`, `Helix`, `Meridian`, …). No spaces. |
| **Purpose** | Always the token **`files`** (not `package`, not `client`). |
| **OpaqueId** | Same random opaque segment used for this SKU’s package PDF when possible (10–14 mixed alnum). |
| **PaidSalt** | Exactly **6** alnum chars **only if** `priceTier` is paid (`starter` / `pro` / `agency`). **Omit** for free. Same salt as PDF when both exist. |
| **ext** | `.zip` only |

**Examples**

| Tier | Example |
|------|---------|
| Paid | `Studio-files-s7u2d1o9q4x1-p8k2m1.zip` |
| Free | `Aether-files-8rgb4zhx7zrd.zip` |

**Storage path (public download):**

```text
public/packages/{productId}/{Product}-files-{OpaqueId}[-{PaidSalt}].zip
```

Public URL:

```text
/packages/{productId}/{Product}-files-{OpaqueId}[-{PaidSalt}].zip
```

### 10.3 Product folder (source of truth) + zip (download copy)

**Law model:** Each product has a **product folder** with all files needed to build the end product with the buyer’s AI, **and** a **zip file** containing those same files.

Always maintain the **unzipped product folder** operators edit:

```text
public/packages/{productId}/files/     ← product folder
  START-HERE.md          # buyer entry; ~10 min steps; what is / is not in the pack
  PROMPT.md              # single source prompt for AI rebuild (buyer-facing)
  CUSTOMIZATION.md       # ask-AI restage lines (film, copy, colors, pace, brand)
  source/                # production-ready implementation files (React/TS, data, helpers)
  assets/                # client rebuild media ONLY (see 10.5)
```

Then build:

```text
public/packages/{productId}/{Product}-files-{OpaqueId}[-{PaidSalt}].zip
```

from the **contents** of that product folder.

Optional later additions (still buyer-safe): `README.md` alias is **not** required if START-HERE exists; prefer one entry doc.

**Do not** ship zip-only without keeping the product folder. **Do not** put the product folder under `tmp/` only. Path under `public/packages/{id}/files/` is intentional so the pack can be inspected and re-zipped without hunting.

### 10.4 Required file roles inside the zip

| Path | Required? | Content law |
|------|-----------|-------------|
| `START-HERE.md` | **Yes** | Buyer entry. Table of what is in the folder. Numbered steps (~10 min). Explicit “what this pack is not” (not site UI recording, not thumbs, not admin). Closing: ClickMotion · www.ClickMotion.dev |
| `PROMPT.md` | **Yes** | Full rebuild specification. Buyer voice. AI is told to use `source/` + `assets/` from this pack. No MDX/CMS/admin paths. No storefront preview filenames. |
| `CUSTOMIZATION.md` | **Yes** | Plain-English “Ask your AI to change X to Y” for brand, copy, colors, media swap, motion pace, mobile, fix-broken. |
| `source/*` | **Yes** for code products | Drop-in production sources (components, data config, gsap register, smooth scroll bridge if needed). Strip MS shell, lab-only hacks, operator comments that leak vault paths. |
| `assets/*` | **Yes** when media is part of the product | Client media only (see 10.5). Relative names preferred (`billboard-film.mp4`, `can.glb`, `orbit-01.jpg`). |

### 10.5 What may go in `assets/` (allowlist)

| Allowed | Examples |
|---------|----------|
| Client film (pure B-roll / billboard cinema) | `billboard-film.mp4`, product client HD copy |
| Client stills / plates | `street-plate.png`, pure film posters for buyer |
| 3D / texture / HDRI used by the design | `can.glb`, label maps, studio HDRI |
| Gallery stills that **are** the product media | Helix `orbit-0N.jpg` |

| **Forbidden in the zip** | Why |
|--------------------------|-----|
| Storefront page / FS captures (`*-preview*`, `*-preview-fs*`) | UI-burned; not rebuild media |
| Gallery thumbnails, MS product-page posters of chrome | Storefront role |
| CMS, MDX, admin, seed JSON, vault notes | Backend leak |
| Lab-only paths, Motionsites dumps, watermarked tests | Not buyer product |
| Masters folder dumps, full originals library | Wrong role / size / rights |
| Second product’s assets “just in case” | Scope creep; confuses buyer |
| Git, `node_modules`, env secrets | Security |

**Hard rule:** If it would never appear inside the **sold design** as rebuild media, it does not go in the zip.

### 10.6 What the buyer is told to do

START-HERE must encode this flow (adapt paths per product):

1. Unzip the pack.  
2. Copy `assets/*` into the buyer app’s public/media paths as documented.  
3. Copy `source/*` into their components (keep together).  
4. Tell AI: *Build {Product} using only the files in this pack. Read PROMPT.md and follow it exactly.*  
5. Verify the signature interaction (scroll pin-until-complete / film loop / 3D grab / helix / etc.).  
   - If the product is **scroll narrative or hybrid-with-scroll**, START-HERE + PROMPT must say the section **pins until the journey finishes**, then releases — **not** a tall multi-vh traditional page scroll (PRODUCT_LAW pin law).  
   - If the product is **PSAVE** (Elyse, live Revel, live Vertex, live Still, live Prism; others only when named), PROMPT must carry the full method: two clocks, product earn track, 1.2x play, 3-frame reverse, leftover dest on lift, picture-gated release, page-owns next sibling, GOP 3 encode for replacement films. Canonical: [`PSAVE.md`](./PSAVE.md). PDF-only packs (Elyse, Revel, Vertex) put that algorithm in the sold prompt + PDF. Still and Prism are **files zip + PDF**: the same algorithm lives in `files/PROMPT.md` and the sold prompt.

### 10.7 Download delivery (product page + API)

**CTA:** Product page button remains **Get Full Prompt** (label locked).  
**Auth:** Google sign-in; member quotas silent (server-side only).  
**API:** `GET /api/packages/{productId}/download`

**Selection order (law — matches implementation):**

1. If `product-packages.ts` has `filesZipHref` **and** `checklist.filesZip === true` → serve the **zip**.  
2. Else if `pdfHref` **and** `checklist.packagePdf === true` → serve the **PDF**.  
3. Else → `404 NO_PACKAGE`.

**Content-Type:** `application/zip` or `application/pdf`.  
**Disposition:** attachment; filename = basename of the opaque file.  
**Toast (client):** zip → “Files pack downloaded”; PDF → “Package downloaded”.

**Paid vs free access:** CMS `priceTier` (fallback: package registry `tier`). Free members may not download paid packages (`PAID_REQUIRED` → pricing).

### 10.8 Registry fields (`src/lib/product-packages.ts`)

For every zip-backed SKU:

```ts
filesZipHref: "/packages/{productId}/{Product}-files-{OpaqueId}[-{PaidSalt}].zip",
filesZipRepoPath: "public/packages/{productId}/{Product}-files-{OpaqueId}[-{PaidSalt}].zip",
checklist: {
  // …
  packagePdf: true,
  filesZip: true,   // only when zip exists on disk and is buyer-ready
},
```

Also keep `pdfHref` / `pdfRepoPath` / `opaqueId` / `paidSalt` / `tier` accurate.  
`owner-designs.ts` notes should mention the zip basename for operators.

### 10.9 Rebuild / release procedure

1. Edit staging tree under `public/packages/{productId}/files/`.  
2. Verify no storefront / backend leaks (`rg` for `preview`, `admin`, `cms`, `mdx`, `thumbnail`).  
3. Rebuild zip so **root** is the contents of `files/` (see §9 zip commands).  
4. Confirm opaque filename + PaidSalt match registry and tier.  
5. Set `checklist.filesZip: true` only after the zip file exists at `filesZipRepoPath`.  
6. Smoke: signed-in Get Full Prompt downloads zip; unzip shows START-HERE at root.  
7. Do **not** delete the staging `files/` tree after zipping (operators need it).  
8. Client media inside the zip is a **buyer copy**; vault client HD remains locked under role folders (ASSET_PIPELINE). Replacing vault client HD requires a **new** client filename + package re-issue if sold media changes.

### 10.10 Per-product asset shape (examples)

| SKU | `assets/` typical | `source/` typical |
|-----|-------------------|-------------------|
| Studio Sequence | `billboard-film.mp4`, `street-plate.png` | `StudioSequence.tsx`, `studio-data.ts` (No Scroller, no gsap/lenis) |
| Lineup / Actually | GLB + labels + HDRI | Section/hero components + product data arrays |
| Helix | `orbit-0N.jpg` (gallery stills) | Helix gallery section + data |
| Film-only heroes (Meridian-class) | Often film URL in PDF only; add zip when cleanroom is productized | Optional |

### 10.11 Relationship PDF ↔ zip

| Concern | PDF | Zip |
|---------|-----|-----|
| Primary Get Full Prompt payload when both exist | Fallback | **Preferred** |
| Per-tool long paste prompts | Yes (section 03) | Optional; PROMPT.md is the single rebuild prompt |
| Offline / print manual | Yes | No |
| Drop-in source + media | No | **Yes** |
| Opaque + PaidSalt naming | `…-package-…` | `…-files-…` |
| Storefront media | Never | Never |

Ship **both** for rebuild flagships. Never ship a zip without START-HERE + PROMPT. Never ship storefront previews inside either.

### 10.12 Agent / operator memory (hard)

1. **Always** re-read this §10 when productizing a cleanroom into a sale SKU.  
2. **Always** register zip in `product-packages.ts` with `checklist.filesZip: true` or the API will not serve it.  
3. **Always** use purpose token **`files`**, not `package`, for the zip basename.  
4. **Always** PaidSalt on paid zip/PDF; never on storefront.  
5. **Never** forget: download prefers zip over PDF when both are registered.  
6. **Never** put UI capture videos in the buyer pack.  

---

*This file is the Product Package golden rule for **PDF + files zip**. Update when the approved PDF layout or zip tree shape changes.*
