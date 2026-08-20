# SKU prep — MS-HERO-REVL01 · Revel

**Gate:** [`PRODUCTION_READY_CHECKLIST.md`](../PRODUCTION_READY_CHECKLIST.md)  
**Process:** [`PRODUCTION_PROCESS.md`](../PRODUCTION_PROCESS.md)  
**Operator:** original concept (not Deepseek first-10) · completed 2026-08-09  
**Status:** **SALE-READY** · master `Iphone-Breakout.mp4` (20s) · scroll narrative

---

## SKU header

```text
Product ID:        MS-HERO-REVL01
Title / short:     Revel · Scroll narrative fashion commerce hero
Type:              hero
Price tier:        pro
Interaction mode:  S scroll · pin-until-complete (virtual progress, no tall track)
UI reference:      High-fashion campaign site (Vogue digital × Apple product film)
Differentiator:    LIGHT pearl studio canvas · rose gold · Instrument Serif
                   iPhone breakout film chapters · virtual progress owns timeline
                   Must not become Meridian dark coastal, Vertex mono, Neon city,
                   Apex quantum, Terra forest, or Verve loud social kitsch.
Operator:          ClickMotion
Date:              2026-08-14
Cleanroom route:   /demo/cleanroom-revel
Package PDF path:  /packages/MS-HERO-REVL01/Revel-package-r7v3l9k2mx4q-rv8n3p.pdf
Pin gold:          PSAVE · 12 vh aim · 1.2x · 3-frame reverse · 280ms live · 0.55s dest floor + rate ease · 32px bounce ignore · GOP 3
Method spec:       docs/PSAVE.md §5A / §5B / §9.1
Pack mode:         PDF-only (no files zip) · rebuild algorithm lives in sold prompt + PDF
```

---

## Phase 0 — Slot & differentiation

| # | Item | Status |
|---|------|--------|
| 0.1 | Original SKU (variety outside Deepseek first-10) | Done |
| 0.2 | ID `MS-HERO-REVL01` | Done |
| 0.3 | Differentiation matrix | Done — **only light-mode scroll flagship** |
| 0.4 | Anti-samey | Done vs Meridian/Vertex scroll siblings |
| 0.5 | Mode: pin-until-complete (not tall 480vh track) | Done |
| 0.6 | UI reference: fashion campaign | Done |
| 0.7 | Authority test | Done |
| 0.8 | Forbidden chrome | Done |

### Differentiation matrix

| Axis | Meridian | Vertex | **Revel** |
|------|----------|--------|-----------|
| Canvas | Dark ink | Black mono | **Pearl light `#F7F4F1`** |
| Accent | Estate gold | White | **Rose gold + blush** |
| Type | Cormorant serif | Space Grotesk | **Instrument Serif + Inter** |
| Film | Coast estate journey | Globe abstract | **iPhone social breakout** |
| Mood | Private bank calm | SOC seriousness | **Fashion freedom / campaign** |
| Chapters | 3 contemplative | Scroll harden | **4 feed→break→shatter→arrival** |

### Film chapter map (20s source)

| Progress | Beat | Visual |
|----------|------|--------|
| 0–28% | The feed | Floating gold phone, orbiting icons |
| 28–58% | The break | Sole shatters glass screen |
| 58–82% | The shatter | Shards + hearts midair |
| 82–100% | The arrival | Woman free mid-leap |

### Pin method (locked 2026-08-14)

Do **not** rebuild as a 480vh sticky track. One `100dvh` stage. **PSAVE** (canonical: [`../PSAVE.md`](../PSAVE.md)): gestures aim on **12** viewports **1:1** (no wheel gain). Down plays the film at **1.2x**. Up plays it backward every 3rd frame. Leftover dest plus a **0.55s dest floor** + rate ease on lift (friction, then a graceful stop). Ignore opposite ticks under **32px**. Film is slow then a kick; halfway takes ~5–6 scrolls. Do not flatten the edit. Atelier band is the next sibling after release. Pack is **PDF-only**; sold prompt + PDF carry this algorithm. Do not copy old Vertex seek-scrub `0.22` / old Revel seek-scrub `0.11` / GSAP `0.55`. Live Vertex is PSAVE (`3.6` + 0.55 coast).

---

## Locked paths

| Role | Path |
|------|------|
| Master | `public/assets/videos/originals/revel-breakout-master-v1.mp4` |
| Client HD | `public/assets/videos/revel-breakout-v1.mp4` |
| Client poster | `public/assets/posters/revel-breakout-v1.webp` |
| Backgrounds | `public/assets/videos/backgrounds/revel-breakout-bg-v1.mp4` |
| Storefront page | `public/assets/videos/revel-scroll-preview-v1.mp4` |
| Storefront FS | `public/assets/videos/revel-scroll-preview-fs-v1.mp4` |
| Package PDF | `/packages/MS-HERO-REVL01/Revel-package-r7v3l9k2mx4q-rv8n3p.pdf` |

---

## Checklist

- [x] Phase 0–1 (original concept + dense prompt)
- [x] Phase 2 media
- [x] Phase 3 cleanroom `/demo/cleanroom-revel`
- [x] Phase 4 dual-preview capture
- [x] Package PDF + registries + CMS (prompt v1.3.0, pack version 1.3.0)
- [x] SCROLL_EXPERIENCE_PRODUCT_IDS includes REVL01
- [x] Pin-until-complete + PSAVE (12 vh / leftover dest floor 0.55 / GOP 3) in MDX, BUYER_PROMPT, PDF, CMS, owner-designs, product-packages, `docs/PSAVE.md`
- [x] Phase 13 Platinum Second Revision (backend-only, 2026-08-14): PASS
  - Operator scoped: backend only (no recapture, no storefront restyle)
  - Folder+zip N/A: PDF-only peer of Vertex
  - Sold prompt now has Promise / What to tell / Package notes (PDF-only, no START-HERE hunt)
  - HTTP matrix 200 + download unauth 401
  - Residual: storefront poster-flash / recapture not in this pass (G skipped)

### Platinum residuals (durable)

- **G storefront visual** skipped by operator (backend-only). Do not recapture `revel-scroll-preview*` unless asked.
- **No files zip** is intentional (Vertex-class PDF-only). Do not invent a Studio folder unless the operator changes the delivery model.
- Film chapter 4 returning to the phone in the last 2s is source-film art, not a seek bug. Do not remaster unless asked.
