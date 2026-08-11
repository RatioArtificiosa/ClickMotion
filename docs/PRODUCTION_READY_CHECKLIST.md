# ClickMotion — Production-Ready Product Checklist

**Status:** Master publish gate · Canonical protocol · 2026-08-08  
**Audience:** Operators + any AI agent shipping a SKU for sale  
**Brand:** ClickMotion (customer-facing) · internal repo may still say MS  

This is the **single ultra-thorough checklist** for a product that is **complete, sellable, and package-excellent**. Do **not** mark `status: published` until every **applicable** box is checked. Flagships must clear **every** section; simple sections may skip video/PDF-gen steps only where noted “N/A if…”.

### Source of truth (if this file conflicts)

| Topic | Wins |
|-------|------|
| Paths, roles, naming, vault immutability | [`ASSET_PIPELINE.md`](./ASSET_PIPELINE.md) |
| Product UX, product page layout, storefront behavior | [`PRODUCT_LAW.md`](./PRODUCT_LAW.md) |
| Buyer package PDF structure + voice | [`PRODUCT_PACKAGE.md`](./PRODUCT_PACKAGE.md) |
| Brand wordmark + voice | [`BRAND.md`](./BRAND.md) |
| Factory velocity / factory steps | [`PRODUCTION_PROCESS.md`](./PRODUCTION_PROCESS.md) |
| Prompt density / Deepseek phases | [`DEEPSEEK_PROMPT_PIPELINE.md`](./DEEPSEEK_PROMPT_PIPELINE.md) |
| See → fix prompt loop | [`PROMPT_VISUAL_QA_LOOP.md`](./PROMPT_VISUAL_QA_LOOP.md) |
| Motion / code scorecard detail | [`QUALITY_CHECKLIST.md`](./QUALITY_CHECKLIST.md) (40 pts nested below) |
| Taxonomy IDs | [`TAXONOMY.md`](./TAXONOMY.md) + `src/config/taxonomy.ts` |

**Golden prompt + package standard (do not regress):** Meridian Product Package PDF (layout + prompt quality).  
Current opaque path is registered in `src/lib/product-packages.ts` (example:  
`public/packages/MS-HERO-MERI01/Meridian-package-p4ltcy7t4p0c-pd1w65.pdf`).  
Generator: `scripts/generate-product-package-pdf.py` (builds Meridian + Aether + Vertex).  
**All package PDFs use opaque suffix codes** (`{Product}-package-{OpaqueId}[-PaidSalt].pdf`) so shoppers cannot guess paid/free pack filenames from slugs.  
**Meridian layout + prompt density is the gold standard.** Clone structure, voice, tool set, and quality bar for every later SKU.

---

## How to use this document

1. Copy the **SKU header** below into a ticket / PR / admin note.  
2. Work top → bottom (factory order).  
3. Check every box. Write **N/A + why** only when the mode truly does not apply.  
4. Final sign-off requires **operator + optional second eyes** on package PDF and storefront capture.  
5. AIs must re-read this checklist before claiming “ready for production.”

### SKU header (fill first)

```text
Product ID:        MS-____-____
Title / short:     
Type:              hero | section | landing-page | special
Price tier:        free | starter | pro | agency | …
Interaction mode:  V video | S scroll | M mouse | 3D | hybrid | other
UI reference:      (named famous real products / craft direction — not “AI SaaS”)
Differentiator:    (vs last 5 published SKUs)
Operator:          
Date:              
Cleanroom route:   /demo/…
Package PDF path:  /packages/{id}/…
```

---

# PHASE 0 — Slot & differentiation (before writing)

- [ ] **0.1** Content plan / slot exists or is intentional one-off (`CONTENT_PLAN_100.md` or admin note).  
- [ ] **0.2** Product **type** + **ID scheme** correct (`MS-HERO-*` / `MS-SEC-*` / `MS-LP-*` / `MS-SPC-*`).  
- [ ] **0.3** **Differentiation matrix** filled: layout pattern, type system, palette temp, material, signature move, “must not clone.”  
- [ ] **0.4** Batch anti-samey rules respected (no two heroes share full font pair + near-black + liquid-glass + pill nav; max pill-nav / mesh-bg in batch per PRODUCTION_PROCESS).  
- [ ] **0.5** **Interaction mode** chosen and honest (V / S / M / 3D / hybrid).  
- [ ] **0.6** **UI reference direction** named (Stripe / Linear / editorial / Swiss / industrial / private bank / etc.). Apple optional, never mandatory for all.  
- [ ] **0.7** Authority test intent written: “Would a careful human product designer ship this UI?”  
- [ ] **0.8** Forbidden house chrome listed for this SKU (e.g. Motionsites pill nav, purple mesh, emoji, rainbow text).  

---

# PHASE 1 — Concept & sold prompt (the product is the prompt)

## 1A. Concept brief

- [ ] **1A.1** One-line promise (buyer-facing).  
- [ ] **1A.2** Who it is for + desire/problem.  
- [ ] **1A.3** Signature behavior stated in plain English (scroll owns film / mouse follow / 3D orbit / loop film / …).  
- [ ] **1A.4** If video: subject required + subject forbidden (no wrong film ever).  
- [ ] **1A.5** No temporary infrastructure notes in concept that will age (no “DNS not ready,” no internal-only hacks).  

## 1B. Prompt structure (body sections)

Master templates: `content/prompts/_template.md` / `_template-short.md`.

All **applicable** sections present with real content (not TBD):

- [ ] **1B.1** Design System (hex/HSL tokens, fonts + weights + tracking, spacing base, aesthetic direction).  
- [ ] **1B.2** Layout Structure (nav, regions, dimensions, safe insets).  
- [ ] **1B.3** Content Slots (default copy → change to; max lengths).  
- [ ] **1B.4** Motion Specification (**quantified**: duration, ease/bezier/spring, delay, stagger, scrub if scroll, reduced-motion).  
- [ ] **1B.5** Video / Media Integration (paths, attrs, overlays, poster, object-fit, forbidden subjects).  
- [ ] **1B.6** Responsive Behavior (**5 breakpoints**, distinct behavior).  
- [ ] **1B.7** Accessibility (reduced motion, focus, contrast intent, semantic structure).  
- [ ] **1B.8** Performance Notes (JS budget, video preload, images).  
- [ ] **1B.9** AI Tool Instructions (how to paste / build; not host-shell dependent).  
- [ ] **1B.10** Expected Output (**≥7 numbered, testable** bullets).  

Density floor (heroes / LPs):

- [ ] **1B.11** Hero body density target **≥ ~3.5–4K chars** of real spec (flagships higher).  
- [ ] **1B.12** Exact copy strings for eyebrow, H1, sub, CTAs (not “premium headline”).  
- [ ] **1B.13** No “animate nicely” / “modern dark” without numbers and hex.  
- [ ] **1B.14** Safe margins: min **px-8 / 2rem** horizontal; lockups in center ~84% of frame; type never flush to edge.  

## 1C. Frontmatter / taxonomy / commercial meta

- [ ] **1C.1** `id`, `slug`, `title`, `version`, dates, `author`, `status` valid.  
- [ ] **1C.2** `type`, `category`, `subcategory` from taxonomy (no invented enums).  
- [ ] **1C.3** `styleTags` honest and from allowed set.  
- [ ] **1C.4** `technicalTags` honest for mode (scroll → `scroll-trigger` etc.; video → `video-background`).  
- [ ] **1C.5** `motionIntensity` matches actual motion count/feel.  
- [ ] **1C.6** `difficulty` + `priceTier` match value (free ≠ extreme 3D special).  
- [ ] **1C.7** `aiToolsRating` filled for tools we sell against.  
- [ ] **1C.8** `frameworksSupported` accurate.  
- [ ] **1C.9** `dependencies` with versions when required.  
- [ ] **1C.10** `compatibleWith` IDs exist if set.  
- [ ] **1C.11** `useCases` / `positionInPage` set if used.  
- [ ] **1C.12** Storefront **description** (sales, not technical):  
  - Soft **≤160**, hard **≤180** chars; **no em dash**; **no** GSAP/ScrollTrigger/Three laundry list  
  - **Ultra-premium bar (mandatory from 2026-08-10):** match **Helix (MS-SEC-HELI01)** quality — beautiful craft language; what the visitor feels + what the buyer gains; customization / brand ownership over negative absences (“no film…”); no hype clichés  
  - See `PRODUCT_LAW.md` → Meta panel → Storefront description (reference line + bans)  
- [ ] **1C.13** Title / short title display clean (dash split rules).  
- [ ] **1C.14** Media fields reserved correctly:  
  - `previewVideo` → **storefront** only  
  - `videoBackgrounds[].file` → **client HD** only  
  - `thumbnail`, `poster` set  
  - never same path for client + storefront  

## 1D. Copy laws (sold prompt + public site + package)

- [ ] **1D.1** **No em dash** (`—` / `–`) anywhere customer-facing. Use comma, period, or ` - `.  
- [ ] **1D.2** No lorem outside clearly marked slot defaults.  
- [ ] **1D.3** Product is self-contained: prompt never requires MS shell, admin, or embed hacks.  
- [ ] **1D.4** No permanent third-party competitor CDN as source of truth.  
- [ ] **1D.5** Customer voice for package/marketing: you/your; ask AI to change X to Y.  

## 1E. Quality scorecard (40 points — all applicable must pass)

Run the full table in [`QUALITY_CHECKLIST.md`](./QUALITY_CHECKLIST.md). Summary gates:

### Motion (1–10)

- [ ] Easing variety (not easeOut everywhere)  
- [ ] Stagger 0.05–0.2s  
- [ ] Scrub true or 0.5–2 (not ~5) when scroll  
- [ ] Parallax 0.2–0.8, never >1  
- [ ] `prefers-reduced-motion` covered  
- [ ] Transform/opacity only (no CLS-y layout anims)  
- [ ] 60fps intent; no long tasks during motion  
- [ ] Entrance <1.2s total when applicable  
- [ ] Hover <100ms where interactive  
- [ ] Intensity matches declaration  

### Code contract (11–20)

- [ ] Prefer single component / default export (or explicit multi-file if special)  
- [ ] Imports + deps pinned  
- [ ] Tailwind-first (or justified exception)  
- [ ] No `any` if TS  
- [ ] Slots / defaults marked  
- [ ] Compatible IDs valid  
- [ ] Zod frontmatter passes  
- [ ] Required body sections present  
- [ ] AI tool instructions present  
- [ ] Expected Output numbered & testable  

### Responsive (21–28)

- [ ] 5 breakpoints documented  
- [ ] No horizontal scroll at 320px  
- [ ] Touch targets ≥44×44  
- [ ] Readable type at 320px  
- [ ] Media scales/hides correctly  
- [ ] Nav collapses  
- [ ] Motion reduced on mobile where needed  
- [ ] Spot-check major browsers (or Playwright)  

### Performance (29–34)

- [ ] JS budget stated  
- [ ] Images WebP/AVIF + lazy where sensible  
- [ ] Poster first, video async  
- [ ] Font display swap  
- [ ] `will-change` discipline  
- [ ] Lighthouse performance intent ≥90 for simple heroes  

### Commercial (35–40 + media vault)

- [ ] Production copy  
- [ ] Content slots max lengths  
- [ ] Thumbnail + storefront preview  
- [ ] Client HD separate + locked role  
- [ ] Client has **no** burnt MS UI  
- [ ] No in-place overwrite of master/client  
- [ ] Product page layout law if shown on site  
- [ ] Paths in MDX + CMS + owner-designs  
- [ ] Package PDF gate (Phase 8)  
- [ ] Price tier fair  
- [ ] Description ≤180  
- [ ] License / commercial note  

---

# PHASE 2 — Media vault (roles never mix)

Read [`ASSET_PIPELINE.md`](./ASSET_PIPELINE.md) first.

## 2A. Roles

- [ ] **2A.1** Every file has **exactly one role**: master | client | preview-page | preview-fs | **backgrounds** | poster | thumb | work | package.  
- [ ] **2A.2** Client film is **clean B-roll only** (no Scroll badge, cursor, product shell, MS chrome).  
- [ ] **2A.3** Storefront captures are **burnt UI of the built design**, separate files.  
- [ ] **2A.4** Work/experiments only under `tmp/` (or disposable work names).  
- [ ] **2A.5** Grandfathered legacy filenames **not renamed** “to match protocol.”  
- [ ] **2A.6** **Backgrounds page never streams client HD, masters, site hero film, or storefront product captures.** Only role **`backgrounds`**.  

## 2H. Backgrounds library (`/backgrounds`) — mandatory small encodes

**Why:** Free “Copy URL” + hover preview on `/backgrounds` are public. Piping buyer-pack / client HD / site hero there leaks full-res assets and wastes bandwidth.

- [ ] **2H.1** For every film tile on `/backgrounds`, encode a **dedicated small preview** (do not reuse client HD path).  
- [ ] **2H.2** Output folder **only**: `public/assets/videos/backgrounds/`  
- [ ] **2H.3** Naming: `{slug}-bg-v1.mp4` (backgrounds role; not client / preview-page / hero).  
- [ ] **2H.4** Spec (default): **640×360** 16:9, H.264, silent (`-an`), `+faststart`, CRF ~28–32, target typically **under ~1.5 MB**.  
- [ ] **2H.5** Encode via `node scripts/encode-backgrounds-preview.mjs` (add job when shipping a new film tile).  
- [ ] **2H.6** Register **only** the small path in `src/config/backgrounds.ts` (`src` field).  
- [ ] **2H.7** Free Copy URL must resolve to the **backgrounds** file (never client HD / `sequence-01` / `*-web-v1` / hero).  
- [ ] **2H.8** **Forbidden on `/backgrounds`:** site hero film (`hero-bg-*`), watermarked stock tests, masters, client HD, storefront UI captures as “pure background” if they burn product chrome (unless intentionally a product-demo tile with its own small encode).  
- [ ] **2H.9** **Poster still = pure film only** (WebP cut from client HD / source film). **Never** use storefront UI burns as backgrounds poster:
  - Forbidden: `*-scroll-preview-*.webp`, `*-preview-v1.webp` with burnt cards/type, gallery thumbs that show product chrome  
  - Required: e.g. `{slug}-v1.webp` or `{film}-web-still-v1.webp` showing **film only** (no cards, no headings, no UI)  
  - Why: Admin + public `/backgrounds` tiles use `poster` as the face — UI burn looks like a product demo, not a background  
- [ ] **2H.10** Video binary must still be the small encode; poster is a still of the **same pure film**.  
- [ ] **2H.11** Bandwidth/security smoke: DevTools → Network on `/backgrounds` — no requests to client HD / master / hero full-res paths.  
- [ ] **2H.12** **Admin wired:** tile visible on **Admin → Backgrounds** (`/admin/backgrounds`) with correct small `src`, **pure-film `poster`**, `productId`, `sourceFilm`. Visual check: tile face has **no** product UI text/cards.  
- [ ] **2H.13** **Registries on sale:** `product-packages.backgroundsPreview` + `owner-designs.backgroundsPreview` set to the **same small path** as the catalog.  
- [ ] **2H.14** **Never ship a production/sale SKU without updating Admin registries** (packages, designs, backgrounds catalog when listed). Admin is the operator source of truth for “what is fed where.”

## 2B. Client HD (buyer pack film)

- [ ] **2B.1** Encoded from master (or approved source) once in prep window.  
- [ ] **2B.2** Spec: MP4 H.264, silent (`-an`), progressive, preferably **1920×1080**, `+faststart`.  
- [ ] **2B.3** Duration typically 8–14s unless narrative requires otherwise.  
- [ ] **2B.4** Web-friendly size target often **under ~15–20MB** for client (masters may be larger).  
- [ ] **2B.5** Subject matches prompt **required** list; zero **forbidden** subjects.  
- [ ] **2B.6** New files: `videos/client/` + `{Product}-client-{OpaqueId}[-{PaidSalt}].mp4`  
  - PaidSalt **6 chars only** on paid client HD  
  - Free: no PaidSalt  
- [ ] **2B.7** After prep: **locked** — no move, rename, in-place ffmpeg, densify onto same path.  
- [ ] **2B.8** Need densify/crop/retime? Copy-out to `tmp/` or **new** client filename + update all refs; keep old file for existing buyers.  
- [ ] **2B.9** Scroll-scrub SKUs: frequent keyframes recommended for smooth bidirectional seek (optional densify as **new** file if janky; not required if current encode already seeks well).  
- [ ] **2B.10** Client path wired in: MDX `videoBackgrounds`, cleanroom `VIDEO_SRC`, package PDF, `owner-designs.broll`.  

## 2C. Master

- [ ] **2C.1** Highest quality source retained under `masters/` or legacy `originals/`.  
- [ ] **2C.2** Never overwritten; new master = new file.  

## 2D. Poster & thumbnail

- [ ] **2D.1** Client poster from client film frame (preferred) under `public/assets/posters/`.  
- [ ] **2D.2** Gallery thumbnail under `public/thumbnails/` (WebP; keep light).  
- [ ] **2D.3** Product-page poster field set (fallback while video loads).  
- [ ] **2D.4** New files use protocol naming when not grandfathered.  

## 2E. Storefront previews (MS site proof)

- [ ] **2E.1** Page preview capture (~1600×900 class preferred) → `previewVideo` / storefront role.  
- [ ] **2E.2** Fullscreen preview target **1920×1080** when dual-preview required / flagship.  
- [ ] **2E.3** Capture scripts write **only** storefront paths; never client/master.  
- [ ] **2E.4** Hide `[data-ms-scroll-cue]` (and similar) in capture so badges are not double-burnt.  
- [ ] **2E.5** Recording shows **signature interaction** (scroll the scrub, move mouse, orbit 3D).  
- [ ] **2E.6** Always **muted** on MS.  
- [ ] **2E.7** Prefer `controlsList="nodownload"`, no PiP abuse; context-menu blocked on public site (not DRM).  
- [ ] **2E.8** Display law independent of capture resolution: product main player **~960×540** contain.  

## 2F. CDN & ownership

- [ ] **2F.1** Objects owned by ClickMotion/MS (R2 / storage + CDN under our account).  
- [ ] **2F.2** Repo uses relative `/assets/…` (or registered paths); production rewrites to MS CDN.  
- [ ] **2F.3** No Motionsites / third-party permanent hotlinks in sold prompts.  
- [ ] **2F.4** Immutable versioned filenames + long cache after publish.  

## 2G. Registries (no hunting)

Every path listed in **all** that apply:

- [ ] **2G.1** Sold MDX frontmatter  
- [ ] **2G.2** CMS `data/cms/store.json` (or Admin product)  
- [ ] **2G.3** `src/lib/owner-designs.ts` (flagships): `broll`, `previewPage`, `previewFs`, `demoHref`, `cleanroomPath`, `promptPath`, `packagePdf`, **`backgroundsPreview`** (if on library)  
- [ ] **2G.4** Cleanroom component `src`  
- [ ] **2G.5** ASSET_PIPELINE §8 grandfather / operator table if flagship  
- [ ] **2G.6** `src/lib/product-packages.ts` when PDF ready (include **`backgroundsPreview`** if on library)  
- [ ] **2G.7** **`src/config/backgrounds.ts`** if the film is listed on `/backgrounds`  
- [ ] **2G.8** **Admin review after any production/sale wire-up:** Admin → Products (readiness) · Packages · Designs · **Backgrounds** — paths match, no role leaks 

---

# PHASE 3 — Clean-room build (proof the prompt works)

- [ ] **3.1** Builder sees **only** buyer prompt + declared asset paths (no secret design memory).  
- [ ] **3.2** Cleanroom lives under `cleanroom/{name}/` with runnable demo route `/demo/...`.  
- [ ] **3.3** Cleanroom uses **client HD**, not storefront preview.  
- [ ] **3.4** Scroll/cursor badges on demos are **HTML overlays only**, never baked into client film.  
- [ ] **3.5** First-pass success preferred; if build needs “tribal knowledge,” prompt is incomplete → fix prompt.  
- [ ] **3.6** Reduced-motion path works (still frame / chapter 1 only for scrub heroes as specified).  
- [ ] **3.7** Mobile check: no clipped type, tappable CTAs, premium feel retained.  

---

# PHASE 4 — Visual QA loop (fix the prompt, not only code)

Per [`PROMPT_VISUAL_QA_LOOP.md`](./PROMPT_VISUAL_QA_LOOP.md):

- [ ] **4.1** SEE: screenshot + network media URL + console clean  
- [ ] **4.2** Brand name + palette match design system  
- [ ] **4.3** Exact copy present  
- [ ] **4.4** Nav / layout match  
- [ ] **4.5** Hierarchy readable at a glance  
- [ ] **4.6** **Background video subject matches product** (asset match is first-class)  
- [ ] **4.7** No forbidden video subjects  
- [ ] **4.8** Motion feels premium  
- [ ] **4.9** Mobile + reduced-motion OK  
- [ ] **4.10** No host MS chrome required by the product  
- [ ] **4.11** FAIL → edit **buyer prompt** (+ assets if subject wrong) → rebuild clean-room  
- [ ] **4.12** PASS only when blind rebuild would succeed  

---

# PHASE 5 — Storefront capture & product page

## 5A. Capture

- [ ] **5A.1** Muted screen record of final clean design (signature behavior).  
- [ ] **5A.2** Page + FS files written with storefront naming only.  
- [ ] **5A.3** Trim/encode storefront for web (do not touch client HD).  
- [ ] **5A.4** Thumbnail + poster stills exported and optimized.  

## 5B. Product page shell (locked law)

Component: `PromptProductView` / `PRODUCT_PAGE_LAYOUT`.

- [ ] **5B.1** Main preview max **~960×540** (16:9 contain on black).  
- [ ] **5B.2** Main width sacred — do not shrink for meta/rail.  
- [ ] **5B.3** Meta height = main height on `lg+`.  
- [ ] **5B.4** Related rail: **3** cards, `space-between`, titles **flush left** under thumbs.  
- [ ] **5B.5** Genre gallery below unchanged (not rail rules).  
- [ ] **5B.6** Preview non-interactive (`pointer-events-none`), muted, loop.  
- [ ] **5B.7** Fullscreen = **90% glass stage**, not browser Fullscreen API; close X / outside / Escape.  
- [ ] **5B.8** Scroll-as-narrative SKUs: HTML Scroll badge on product + FS (not burnt into capture).  
- [ ] **5B.9** Value line under CTA exact: **`· Auto Customization Guide · HD Video Background ·`**  
- [ ] **5B.10** Paid crown: superscript on last letter of short title (product meta).  
- [ ] **5B.11** CTA labels unchanged protocol: Free “Copy full prompt” / Paid “Unlock full prompt” (do not rename for PDF work).  
- [ ] **5B.12** Likes baseline 250–999; heart interactive + persist.  
- [ ] **5B.13** Description length enforced.  
- [ ] **5B.14** Right-click / context menu blocked on public media (admin excluded).  

## 5C. Gallery

- [ ] **5C.1** Cards always-on loop (prefer previewVideo); **not** hover-to-play only.  
- [ ] **5C.2** 16:9 contain; no edge crop of burnt UI.  
- [ ] **5C.3** Thumbnail face is correct product.  

---

# PHASE 6 — Live demo & owner vault

- [ ] **6.1** Flagship `/demo/...` route works and matches prompt intent.  
- [ ] **6.2** Admin → Original designs (`/admin/designs`) lists demo, client, storefront page/fs, cleanroom, MDX.  
- [ ] **6.3** Operators can reopen design without touching locked client HD.  

---

# PHASE 7 — CMS & catalog publish data

- [ ] **7.1** Product row in Admin / `store.json` complete.  
- [ ] **7.2** **Preview media** triad filled: preview video + thumbnail + poster.  
- [ ] **7.3** Client HD referenced only in buyer/prompt fields, never as gallery-only substitute for UI proof.  
- [ ] **7.4** Genres / collections membership correct if any.  
- [ ] **7.5** `status: published` only after gates below.  
- [ ] **7.6** Public loaders CMS-authoritative; `force-dynamic` where required.  
- [ ] **7.7** Sitemap / SEO title description sane.  
- [ ] **7.8** Seed path from MDX documented if used.  

---

# PHASE 8 — Product Package PDF (buyer delivery gold standard)

**Law:** [`PRODUCT_PACKAGE.md`](./PRODUCT_PACKAGE.md) · **Gold standard:** Meridian `Meridian-package-GOLDEN-RULE.pdf`

## 8A. When required

- [ ] **8A.1** Every free and paid product ships a Product Package PDF (not prompt-only).  
- [ ] **8A.2** PDF download UX may lag; **file + registries must exist before publish**.  

## 8B. Brand chrome (PDF)

- [ ] **8B.1** Brand name **ClickMotion** (customer-facing).  
- [ ] **8B.2** Wordmark: Birthstone, **pure white** core + **white Grok-style glow** (never cream/gray brand fill).  
- [ ] **8B.3** Cover: wordmark near gold L-corner, slightly raised, right margin (not full-bleed width).  
- [ ] **8B.4** Footer mini wordmark same white + glow treatment every page.  
- [ ] **8B.5** Website **www.ClickMotion.dev** / `https://www.ClickMotion.dev`.  
- [ ] **8B.6** Font sizes **always fit** max width (wordmark, titles, URLs, long lines); never clip wordmark.  
- [ ] **8B.7** Palette: deep ink, cream body, single gold accent — premium dark, not neon SaaS.  
- [ ] **8B.8** Prompt panels: **visible box** (lighter well + gold border); cream text readable.  

## 8C. Fixed section order

- [ ] **8C.0** Cover — wordmark, site, product, promise, what’s inside  
- [ ] **8C.1** Start here — simple steps (~10 min)  
- [ ] **8C.2** Background video **standalone** (client URL + file name)  
- [ ] **8C.3** Per-tool ready prompts (full paste bodies)  
- [ ] **8C.4** Customize without coding (“Ask your AI…”)  
- [ ] **8C.5** Optional video-gen prompt for new B-roll  
- [ ] **8C.6** Close / reminders  

## 8D. Prompt gold standard (must not regress)

Tool sections (minimum set; add more if catalog tools grow):

- [ ] Cursor  
- [ ] Claude  
- [ ] Grok Build  
- [ ] Lovable  
- [ ] Codex / ChatGPT  
- [ ] Bolt  
- [ ] Your Smart AI Agent (catch-all for any smart AI)  

Each tool prompt:

- [ ] **8D.1** Short per-tool opener (or generic agent opener for Smart AI).  
- [ ] **8D.2** Full design brief **inside the PDF** (not “open this path”).  
- [ ] **8D.3** **Client video URL inside** every tool prompt.  
- [ ] **8D.4** Scroll/scrub or mode specs quantified for the AI implementer.  
- [ ] **8D.5** Look & feel + forbidden AI-slop listed.  
- [ ] **8D.6** Layout + chapters/content exact enough to rebuild.  
- [ ] **8D.7** Technical note speaks to the AI; human need not know React.  
- [ ] **8D.8** Closer: expected result + “fix without asking me for code knowledge.”  
- [ ] **8D.9** Multi-page OK; continuation headers clear.  

## 8E. Buyer steps & future-proof language

- [ ] **8E.1** “Open the AI tool you already use.” (no brittle tool-list-only step).  
- [ ] **8E.2** Point users to Smart AI Agent section if tool not named.  
- [ ] **8E.3** “When the preview looks absolutely stunning…” (or equal premium bar).  
- [ ] **8E.4** Cover “what’s inside” lists tools + **or any smart AI**.  
- [ ] **8E.5** **No** temporary DNS / “site not live yet” / internal ops notes.  
- [ ] **8E.6** Offline fallback only: local file name + tell AI to use it (evergreen).  
- [ ] **8E.7** Video URL standalone **and** inside prompts.  
- [ ] **8E.8** Customize section: brand, headlines, eyebrows, buttons, colors, video swap, mobile, fix broken.  
- [ ] **8E.9** Optional video-gen prompt + “then tell coding AI to swap.”  

## 8F. Hard bans in PDF

- [ ] **8F.1** No backend leaks: thumbnails, storefront `*-preview*`, CMS, MDX paths, admin, scaffolds, internal IDs.  
- [ ] **8F.2** Never instruct buyer to use storefront capture as background film.  
- [ ] **8F.3** No em dashes.  
- [ ] **8F.4** No comic fonts, rainbow chrome, “AI generated” watermark.  
- [ ] **8F.5** Do not change product-page CTA labels as part of PDF work.  

## 8G. Storage & approval

- [ ] **8G.1** File under `public/packages/{productId}/`.  
- [ ] **8G.2** Naming new: `{Product}-package-{OpaqueId}[-{PaidSalt}].pdf`.  
- [ ] **8G.3** Registered in `product-packages.ts` + `owner-designs.packagePdf`.  
- [ ] **8G.4** Visible in Admin → Product packages.  
- [ ] **8G.5** Operator opened PDF and spot-checked cover, video URL, one full tool prompt, customize, footer glow.  
- [ ] **8G.6** Regenerator script (if any) committed; Meridian golden rule not casually broken.  

### Meridian regenerate (reference)

```bash
python scripts/generate-product-package-pdf.py
# → public/packages/{id}/{Product}-package-{OpaqueId}[-PaidSalt].pdf
```

---

# PHASE 9 — Site chrome & brand (if product touches marketing surfaces)

- [ ] **9.1** Header wordmark: Birthstone + white glow + **FitWordmark** (always fits; no truncate).  
- [ ] **9.2** Nav IA current: Browse · Collections · Backgrounds · MCP · Pricing (no Blog unless reintroduced on purpose).  
- [ ] **9.3** Footer: Backgrounds not Blog; MCP → `/mcp`; brand ClickMotion.  
- [ ] **9.4** Customer name ClickMotion; internal MS folders OK.  
- [ ] **9.5** Backgrounds library uses client-safe films / gradients; premium gate honest.  
- [ ] **9.6** MCP page setup steps accurate; URL from env when live.  

---

# PHASE 10 — Machine gates & engineering hygiene

- [ ] **10.1** `npm run validate:prompts` (or project equivalent) passes.  
- [ ] **10.2** `npm run validate:assets` passes (or documented warn only for drafts).  
- [ ] **10.3** `npx tsc --noEmit` / typecheck clean for touched code.  
- [ ] **10.4** Lint clean on touched files if project requires.  
- [ ] **10.5** No secrets committed; no private keys in prompts.  
- [ ] **10.6** Capture scripts and package generators do not write to locked client paths.  
- [ ] **10.7** Extreme motionIntensity: extra manual review.  

---

# PHASE 11 — Commerce & license

- [ ] **11.1** Price tier matches plan matrix (`src/config/plans.ts` / Stripe).  
- [ ] **11.2** Free vs paid entitlements understood (copy vs unlock).  
- [ ] **11.3** Paid client filenames use PaidSalt when new protocol applies.  
- [ ] **11.4** License / commercial-use note in prompt or package as required.  
- [ ] **11.5** Do not redistribute prompt as buyer’s own product (language present if policy requires).  
- [ ] **11.6** Checkout / webhook paths unaffected by this SKU (or tested if new).  

---

# PHASE 12 — Final sign-off (definition of “ready for sale”)

Print or paste this block into the PR:

```text
SKU: _______________
Date: _______________
Operator: _______________

[ ] Phase 0 Differentiation
[ ] Phase 1 Prompt complete + 40-pt quality
[ ] Phase 2 Media vault (client locked, storefront separate, registries)
[ ] Phase 3 Clean-room demo
[ ] Phase 4 Visual QA loop passed (prompt is source of truth)
[ ] Phase 5 Storefront capture + product page law
[ ] Phase 6 Owner vault + live demo
[ ] Phase 7 CMS published fields complete
[ ] Phase 8 Package PDF gold-standard (tools + video URL + no leaks)
[ ] Phase 9 Brand / nav if affected
[ ] Phase 10 Machine gates green
[ ] Phase 11 Commerce / license
[ ] Spot-check: gallery card loops correct film
[ ] Spot-check: product page main ~960×540, muted
[ ] Spot-check: client pack video ≠ storefront preview
[ ] Spot-check: open package PDF and paste one tool prompt mentally “would a non-coder succeed?”
[ ] No em dashes in public surfaces
[ ] No temporary “coming soon DNS” language in buyer docs

SIGNED READY FOR SALE: _______________
```

**Publish action:** set `status: published` only after the block is complete.

---

# Appendix A — Factory line (time order)

```text
0 SLOT           Differentiation + mode + UI reference
1 PROMPT         Dense buyer prompt + video-gen prompt if needed
2 MACHINE        validate prompts/assets schema
3 MEDIA          Master → client encode → lock; posters/thumbs
4 CLEAN-ROOM     Build from prompt only
5 VISUAL QA      Screenshot → fix prompt → rebuild
6 PROOF CAPTURE  Muted storefront page (+ fs)
7 PACKAGE PDF    Golden-rule PDF + registries
8 CMS            All media fields + description + tags
9 PUBLISH        status published → gallery + product
```

Steady-state target: **2–4 h** video hero; **1–2 h** simple section; **4–8 h** special/3D/mouse.

---

# Appendix B — Hard bans (instant fail)

1. Client HD and storefront preview share one file.  
2. Client HD contains burnt Scroll/cursor/MS shell.  
3. `ffmpeg -y` overwrite of locked client or master.  
4. Rename of grandfathered media “for cleanliness.”  
5. Sold prompt only works with secret cleanroom knowledge.  
6. Package PDF points buyers at `*-preview*` as background video.  
7. Package PDF missing full per-tool prompts (path-only).  
8. Em dashes in customer copy.  
9. Competitor CDN as permanent media source.  
10. Publish without preview video + thumbnail + poster + package PDF (when video product).  
11. Shrinking product main preview below 960 budget to fatten meta/rail.  
12. Temporary infrastructure language locked into buyer PDFs.  
13. Wordmark truncated/clipped or non-white (cream brand) on package.  
14. AI-kit default look sold as “premium” without real UI reference.  

---

# Appendix C — Gold standard artifacts (do not lose)

| Artifact | Path / note |
|----------|-------------|
| Meridian package PDF (prompt gold standard) | See `product-packages.ts` · opaque under `public/packages/MS-HERO-MERI01/` |
| Aether / Vertex packages | Opaque PDFs under `public/packages/MS-HERO-AETH01/` and `…VERT01/` |
| PDF generator | `scripts/generate-product-package-pdf.py` |
| Meridian cleanroom | `cleanroom/meridian-scroll/` · `/demo/scroll-narrative` |
| Meridian client HD | `/assets/videos/sequence-01.mp4` (grandfathered; do not rename) |
| Brand | [`BRAND.md`](./BRAND.md) · Birthstone · FitWordmark |
| Product page law | [`PRODUCT_LAW.md`](./PRODUCT_LAW.md) · `PromptProductView` |
| Asset vault | [`ASSET_PIPELINE.md`](./ASSET_PIPELINE.md) |

**Rule:** When improving package prompts, raise the bar to match or beat Meridian gold — never ship thinner buyer packages.

---

# Appendix D — Related docs index

| Doc | Use |
|-----|-----|
| [`PRODUCT_LAW.md`](./PRODUCT_LAW.md) | Product + storefront UX law |
| [`ASSET_PIPELINE.md`](./ASSET_PIPELINE.md) | Video roles, paths, naming |
| [`PRODUCT_PACKAGE.md`](./PRODUCT_PACKAGE.md) | PDF protocol |
| [`BRAND.md`](./BRAND.md) | ClickMotion identity |
| [`PRODUCTION_PROCESS.md`](./PRODUCTION_PROCESS.md) | Factory velocity |
| [`DEEPSEEK_PROMPT_PIPELINE.md`](./DEEPSEEK_PROMPT_PIPELINE.md) | Prompt authoring phases |
| [`PROMPT_VISUAL_QA_LOOP.md`](./PROMPT_VISUAL_QA_LOOP.md) | See → fix prompt |
| [`QUALITY_CHECKLIST.md`](./QUALITY_CHECKLIST.md) | 40-point prompt scorecard |
| [`TAXONOMY.md`](./TAXONOMY.md) | Tags / enums |
| [`CMS_ADMIN.md`](./CMS_ADMIN.md) | Admin operations |
| [`HANDOFF.md`](./HANDOFF.md) | Operator handoff snapshot |
| [`CONTENT_PLAN_100.md`](./CONTENT_PLAN_100.md) | Catalog plan |
| [`SCAFFOLDING.md`](./SCAFFOLDING.md) | System design backbone |
| [`UI_ANIMATION_RESOURCES.md`](./UI_ANIMATION_RESOURCES.md) | Motion craft map |

---

*This checklist is the production protocol. Update it when product law, package gold standard, or vault rules change — and keep Meridian PDF quality as the non-negotiable floor for buyer packages.*
