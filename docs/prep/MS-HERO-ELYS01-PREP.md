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
Interaction mode:  S scroll (video scrub / scroll-as-narrative)
UI reference:      Aman / Six Senses restraint × private-bank type
Differentiator:    Golden-hour sanctuary film; four chapters call→return; invitation-only house
Operator:          ClickMotion
Date:              2026-08-09
Cleanroom route:   /demo/cleanroom-elyse
Package PDF path:  /packages/MS-HERO-ELYS01/Elyse-package-e9l7s3e2k4m1-el5n8q.pdf
```

---

## Locked paths

| Role | Path |
|------|------|
| Client HD | `public/assets/videos/elyse-nature-v1.mp4` |
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

1. Programmatic scroll of `.elyse-pin` track (Meridian-style full burn)
2. Hide `[data-ms-scroll-cue]`
3. Duration matches film (~10s)
4. Page 1440×900 + FS 1920×1080

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
