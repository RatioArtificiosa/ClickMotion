# MS-HERO-ACTU01 · Actually! · Prep / sale-ready

**Status:** sale-ready free listing · 2026-08-10  
**Brand name (storefront):** Actually!  
**Not on `/backgrounds`** — 3D product pack, no film tile.

| Item | Path / value |
|------|----------------|
| Product ID | `MS-HERO-ACTU01` |
| Opaque package | `a9ct7u4l2y1x` (no PaidSalt) |
| Package PDF | `/packages/MS-HERO-ACTU01/Actually-package-a9ct7u4l2y1x.pdf` |
| Live cleanroom | `/demo/cleanroom-actually` |
| Prompt | `content/prompts/heroes/MS-HERO-ACTU01.mdx` |
| Cleanroom | `cleanroom/actually-from-prompt/` |
| Preview page | `/assets/videos/actually-hero-preview-v1.mp4` |
| Preview FS | `/assets/videos/actually-hero-preview-fs-v1.mp4` |
| Poster | `/assets/posters/actually-hero-preview-v1.webp` |
| Thumbnail | `/thumbnails/MS-HERO-ACTU01.webp` |
| Client media | `/models/can.glb` + `/textures/labels/*` + `/hdri/studio_small_03_1k.hdr` |
| backgroundsPreview | **none** |

## Operator commands

```bash
# Storefront dual capture (MS server on :3004)
node scripts/capture-actually-preview.mjs

# Interactive demo movie (project-agnostic pattern)
node scripts/record-interactive-demo.mjs http://127.0.0.1:3004/demo/cleanroom-actually actually-hero
# Lab-specific rich acts:
node Lab/actually/scripts/record-hero-demo.mjs

# Package + CMS
python scripts/generate-product-package-pdf.py
node scripts/sync-free-heroes-cms.mjs
```

## Mode

Scroll pin scrub + pointer clip window + 3D grab. Not free-play film.

## Notes

- Interactive recording law: `docs/INTERACTIVE_DEMO_RECORDING.md`
- Description bar gold standard: Helix quality (experience + ownership)
