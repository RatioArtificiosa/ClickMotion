# Product Package Law (Client Delivery PDF)

**Status:** Golden-rule protocol · Updated 2026-08-08  
**Related:** [`PRODUCT_LAW.md`](./PRODUCT_LAW.md) · [`ASSET_PIPELINE.md`](./ASSET_PIPELINE.md) · [`BRAND.md`](./BRAND.md) · **[`PRODUCTION_READY_CHECKLIST.md`](./PRODUCTION_READY_CHECKLIST.md)** (full publish gate) · Admin → **Product packages**

**Gold standard:** Meridian package layout (opaque name, e.g. `Meridian-package-p4ltcy7t4p0c-pd1w65.pdf`) — do not ship thinner buyer packages. All PDFs use opaque suffixes so filenames are not guessable from product slugs.

This document defines the **client delivery package**: a single ultra-premium PDF every buyer (free or paid) receives with the product. Storefront buttons stay as they are today (Copy / Unlock); the PDF is the **canonical instruction** for the pack.

---

## 1. Purpose

When a product is published, the buyer does not only get a prompt string. They get a **Product Package PDF** that is:

- Forbes / private-bank quality, **buyer voice** (you / your)  
- Complete enough to build with an AI tool (no coding knowledge required)  
- Safe: **no backend leaks** (no thumbnails, storefront captures, CMS, MDX paths, admin, scaffolds)  
- Customizable via plain English “Ask your AI to change X to Y” lines  
- Brand: **ClickMotion**, Birthstone wordmark + white glow, www.ClickMotion.dev  
- **No em dash** characters; use comma, period, or ` - `  
- **Font size always fits** page width (titles, wordmark, URLs shrink to fit; never clip)  

**Do not change product-page CTA button labels** as part of this protocol. Delivery UX for PDF download can ship later; the PDF + vault must exist first.

---

## 2. Publish gate — everything required before “published”

A product is **not** fully shippable until **all** of the following exist and are registered (paths recorded; legacy names OK until new naming applies).

### A. Storefront media (Admin → Products → Preview media)

| Element | Role | CMS / public use | Storage (new files) | Legacy OK example |
|---------|------|------------------|---------------------|-------------------|
| **Preview video** | Full design capture for product page hero + gallery loop | `previewVideo` | `videos/storefront/` + naming protocol | `meridian-scroll-preview-v1.mp4` |
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
| **Product Package PDF** | Full client instructions | `public/packages/{productId}/` | `{Product}-package-{OpaqueId}[-{PaidSalt}].pdf` — PaidSalt only if paid tier (same idea as client video) |

### D. Build & catalog

| Element | Role |
|---------|------|
| Sold prompt MDX | Full body + frontmatter |
| CMS product row | Published; media fields filled |
| Cleanroom / live demo (flagship) | Owner proof at `/demo/...` |
| `owner-designs.ts` row (flagships) | `broll`, `previewPage`, `previewFs`, `packagePdf`, paths |

**Hard rule:** never publish with only a prompt and no storefront media. Never point package PDF video links at storefront `*-preview*` files for “background video.”

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
  {productId}/                 # e.g. MS-HERO-MERI01/
    {Product}-package-….pdf    # client-facing file (CDN later)
scripts/
  generate-product-package-pdf.py   # golden-rule generator
docs/
  PRODUCT_PACKAGE.md           # this law
```

| Registry | Field |
|----------|--------|
| `src/lib/owner-designs.ts` | `packagePdf?: string` (public URL path) |
| `src/lib/product-packages.ts` | Admin index of package status |
| CMS (future) | optional `packagePdf` on product row |
| Admin UI | `/admin/packages` — review, open, status |

---

## 7. Free vs paid packages

| | Free | Paid |
|-|------|------|
| PDF quality | Same golden-rule layout | Same layout |
| Content depth | Full enough to build | Same + any paid-only notes if needed |
| Client video naming | No PaidSalt | PaidSalt on **new** client files (ASSET_PIPELINE) |
| PDF naming (new) | `{Product}-package-{OpaqueId}.pdf` | `{Product}-package-{OpaqueId}-{PaidSalt}.pdf` |
| Storefront CTAs | Unchanged (“Copy full prompt” / “Unlock…”) | Unchanged |

---

## 8. Approval workflow

1. Generate PDF from golden-rule script / template.  
2. Place under `public/packages/{id}/`.  
3. Register in `product-packages.ts` + `owner-designs.packagePdf`.  
4. Operator reviews in **Admin → Product packages**.  
5. User approves or requests edits → revise PDF only (not product page buttons).  
6. First approved Meridian file becomes **locked golden rule** for layout (clone for next SKUs).

---

## 9. Operator checklist (publish)

- [ ] Preview video, thumbnail, poster filled (Admin Preview media)  
- [ ] Client HD + poster locked and referenced in prompt  
- [ ] Storefront page (+ fs) capture separate from client  
- [ ] Product Package PDF generated and registered  
- [ ] PDF contains **full ready prompts per tool** (section 03), not only a file path  
- [ ] Video URL appears **standalone** and **inside** each tool prompt  
- [ ] Buyer voice only; no backend / storefront / thumbnail leaks  
- [ ] No em dashes; ClickMotion + Birthstone wordmark + www.ClickMotion.dev  
- [ ] Font sizes fit page width (no clipped titles/URLs/wordmark)  
- [ ] MDX + CMS + owner-designs paths agree (operator side)  
- [ ] No rename of grandfathered media  

**Regenerate all flagship package PDFs (Meridian + Aether + Vertex):**

```bash
python scripts/generate-product-package-pdf.py
```

Outputs (opaque names — see `src/lib/product-packages.ts` for current tokens):

- `public/packages/MS-HERO-MERI01/Meridian-package-{OpaqueId}-{PaidSalt}.pdf` (pro)
- `public/packages/MS-HERO-AETH01/Aether-package-{OpaqueId}.pdf` (free)
- `public/packages/MS-HERO-VERT01/Vertex-package-{OpaqueId}.pdf` (free)

---

*This file is the Product Package golden rule. Update when the approved PDF layout changes.*
