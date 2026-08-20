# SKU prep — MS-HERO-ELYS01 · Elyse

**Gate:** [`PRODUCTION_READY_CHECKLIST.md`](../PRODUCTION_READY_CHECKLIST.md)  
**Status:** **SALE-READY** · scroll-as-narrative · private luxury wellness retreats

---

## SKU header

```text
Product ID:        MS-HERO-ELYS01
Title / short:     Elyse · Luxury wellness retreat scroll hero
Type:              hero
Price tier:        pro
Interaction mode:  S scroll · pin-until-complete (virtual progress, no tall track)
UI reference:      Aman / Six Senses restraint × private-bank type
Differentiator:    Golden-hour sanctuary film; four chapters call→return; invitation-only house
Operator:          ClickMotion
Date:              2026-08-14
Cleanroom route:   /demo/cleanroom-elyse
Package PDF path:  /packages/MS-HERO-ELYS01/Elyse-package-e9l7s3e2k4m1-el5n8q.pdf
Pin gold:          PSAVE · 3.6 vh aim 1:1 · 1.2x forward + reverse every 3rd frame · leftover dest on lift · GOP 3 client HD
Pack mode:         PDF-only (no files zip) · rebuild algorithm lives in sold prompt + PDF
Method spec:       docs/PSAVE.md (canonical)
```

---

## Locked paths

| Role | Path |
|------|------|
| Client HD | `public/assets/videos/elyse-nature-v1.mp4` (GOP 3, no B-frames, 81 I-frames — PSAVE reverse) |
| Pure film poster | `public/assets/posters/elyse-nature-v1.webp` |
| Backgrounds small | `public/assets/videos/backgrounds/elyse-nature-bg-v1.mp4` |
| Storefront page | `public/assets/videos/elyse-scroll-preview-v1.mp4` |
| Storefront FS | `public/assets/videos/elyse-scroll-preview-fs-v1.mp4` |
| Thumbnail | `public/thumbnails/MS-HERO-ELYS01.webp` |
| Package PDF | `/packages/MS-HERO-ELYS01/Elyse-package-e9l7s3e2k4m1-el5n8q.pdf` |

Opaque id: `e9l7s3e2k4m1` · PaidSalt: `el5n8q`

---

## Storefront capture

Script: `scripts/capture-elyse-preview.mjs`

### Pin method (locked 2026-08-14)

Do **not** rebuild as a 460vh sticky track. One `100dvh` stage. **PSAVE** (canonical: [`../PSAVE.md`](../PSAVE.md)): gestures aim on **3.6** viewports **1:1** (no wheel gain). Down plays the film at **1.2x**. Up plays it backward at the same **1.2x**, **exactly one 3-frame step per seek** on the live video. Never jump a frame. **Leftover dest on lift** keeps the film going a little (friction, then a graceful stop). Copy / bar / release follow the picture. After the last frame the **page** owns the runway until the stage docks. Pointer on `#request` never drives the film. Client HD is **GOP 3 / no B-frames** (81 I-frames). Replacement films must be remastered the same way before wiring. Pack is **PDF-only**; sold prompt + PDF carry this algorithm. Do not copy old Vertex / old Revel seek-scrub. Live Vertex is PSAVE (`3.6` + 0.55 coast).

1. Drive `window.__msScrollNarrative.setProgress(0…1)` (do not `scrollTo` a tall track)
2. Hide `[data-ms-scroll-cue]`
3. Duration matches film (~10s)
4. Page 1440×900 + FS 1920×1080
5. Do not recapture unless asked

```bash
node scripts/capture-elyse-preview.mjs
node scripts/encode-backgrounds-preview.mjs --only elyse-nature
python scripts/generate-product-package-pdf.py
```

---

## Checklist

- [x] Cleanroom component (no scaffold UI)
- [x] Demo route `/demo/cleanroom-elyse`
- [x] Client HD locked
- [x] Pure film poster
- [x] MDX published
- [x] Registries + CMS
- [x] Backgrounds encode job
- [x] Dual capture page + FS
- [x] Package PDF opaque+salt
- [x] audit-sale-ready
- [x] Scroll experience product flag
- [x] Pin-until-complete + PSAVE (3.6 aim 1:1 / 1.2x / 3-frame reverse / leftover dest on lift / GOP 3 / page-owns runway) in MDX v1.1.6, BUYER_PROMPT, PDF, CMS, owner-designs, product-packages, `docs/PSAVE.md`
