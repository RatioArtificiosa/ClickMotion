# SKU prep — MS-HERO-SABL01 · Sable

**Gate:** [`PRODUCTION_READY_CHECKLIST.md`](../PRODUCTION_READY_CHECKLIST.md)  
**Status:** **SALE-READY** · free-play full film · sparse private-house luxury

---

## SKU header

```text
Product ID:        MS-HERO-SABL01
Title / short:     Sable · Holiday luxury fashion walk hero
Type:              hero
Price tier:        pro
Interaction mode:  V free-play full film (not scrub) + short pin
UI reference:      The Row / Toteme film discipline × private-house type
Differentiator:    Uncut winter walk is the product; near-zero mid-frame copy
Operator:          ClickMotion
Date:              2026-08-09
Cleanroom route:   /demo/cleanroom-sable
Package PDF path:  /packages/MS-HERO-SABL01/Sable-package-s4b1e9k7m2x3-sb8n4p.pdf
```

---

## Locked paths

| Role | Path |
|------|------|
| Client HD | `public/assets/videos/sable-winter-v1.mp4` |
| Pure film poster | `public/assets/posters/sable-winter-v1.webp` |
| Backgrounds small | `public/assets/videos/backgrounds/sable-winter-bg-v1.mp4` |
| Storefront page | `public/assets/videos/sable-holiday-preview-v1.mp4` |
| Storefront FS | `public/assets/videos/sable-holiday-preview-fs-v1.mp4` |
| Thumbnail | `public/thumbnails/MS-HERO-SABL01.webp` |
| Package PDF | `/packages/MS-HERO-SABL01/Sable-package-s4b1e9k7m2x3-sb8n4p.pdf` |

Opaque id: `s4b1e9k7m2x3` · PaidSalt: `sb8n4p`

---

## Storefront capture

Script: `scripts/capture-sable-preview.mjs`

1. FG: nav + intro + footer (transparent)
2. BG: continuous full client HD (entire walk, no seek)
3. Duration matches film (~17s)
4. Page 1440×900 + FS 1920×1080

```bash
node scripts/capture-sable-preview.mjs
node scripts/encode-backgrounds-preview.mjs --only sable-winter
python scripts/generate-product-package-pdf.py
```

---

## Checklist

- [x] Cleanroom component (sparse, no scaffold)
- [x] Demo route `/demo/cleanroom-sable`
- [x] Client HD locked
- [x] Pure film poster
- [x] MDX published
- [x] Registries + CMS
- [x] Backgrounds encode job
- [x] Dual capture page + FS
- [x] Package PDF opaque+salt
- [x] audit-sale-ready
