# MS-SEC-HELI01 HELIX — production prep

**Status:** Published free section · 2026-08-10  
**Type:** Carousel / gallery mid-page section  
**Mode:** Scroll pin scrub (WebGL helix) · **no background film**

## Paths

| Role | Path |
|------|------|
| Cleanroom | `cleanroom/helix-from-prompt/` |
| Demo | `/demo/cleanroom-helix` |
| Prompt | `content/prompts/sections/MS-SEC-HELI01.mdx` |
| Client media | `/assets/images/orbit/orbit-01.jpg` … `orbit-09.jpg` |
| Storefront page | `/assets/videos/helix-gallery-preview-v1.mp4` (~28s, 1440×900) |
| Storefront FS | `/assets/videos/helix-gallery-preview-fs-v1.mp4` (~28s, 1920×1080) |
| Poster / thumb | `/assets/posters/helix-gallery-preview-v1.webp` · `/thumbnails/MS-SEC-HELI01.webp` |
| Package | `/packages/MS-SEC-HELI01/Helix-package-h3l1x9k2m7p4.pdf` |
| Backgrounds page | **N/A** (do not add) |

## Capture

```bash
node scripts/capture-helix-preview.mjs
# optional URL: http://127.0.0.1:3004/demo/cleanroom-helix
```

Full UI presentation encode (CRF 16, 30fps, full pin journey). No BG composite.

## Recreate PDF / CMS

```bash
python scripts/generate-product-package-pdf.py
node scripts/sync-free-heroes-cms.mjs
python scripts/audit-sale-ready.py
```

## Lab (isolated, non-storefront)

`Lab/design-in-motion/` remains the ORION-sourced experiment sandbox. Production lives in cleanroom + public paths above.
