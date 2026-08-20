# MS-SEC-DOPA01 — Dopamine footer ship prep

**Status:** Sale-ready · pro · Platinum Second Revision PASS · 2026-08-11  
**Product:** Dopamine — Complete Fashion Footer  
**Lab source:** `Lab/dopamine` (footer only; film is separate)  
**Ship truth:** `cleanroom/dopamine-from-prompt` + `public/packages/MS-SEC-DOPA01`  
**Law:** Post-ship second revision is mandatory for every SKU — [`docs/PLATINUM_SECOND_REVISION.md`](../PLATINUM_SECOND_REVISION.md)

## Media

| Role | Path |
|------|------|
| Page preview | `/assets/videos/dopamine-footer-preview-v1.webm` ← Media Encoder VP9 (MP4 retained for rollback) |
| FS preview | `/assets/videos/dopamine-footer-preview-fs-v1.mp4` ← operator Dopamine.mp4 (**unchanged**) |
| Lab archive | `Lab/dopamine/operator-previews/Dopamine-Small-2.mp4` (+ same file as preview alias) |
| Operator drop | `test videos/Dopamine-Small-2.mp4` |
| Poster | `/assets/posters/dopamine-footer-preview-v1.webp` |
| Thumb | `/thumbnails/MS-SEC-DOPA01.webp` |
| Client | `/assets/dopamine/*` (Woman1, masks, Lottie) |

## Package

- Opaque: `d0p4m1n38k2x` · PaidSalt: `f7t3r9`
- Folder: `public/packages/MS-SEC-DOPA01/files/`
- Zip: `Dopamine-files-d0p4m1n38k2x-f7t3r9.zip`
- PDF: `Dopamine-package-d0p4m1n38k2x-f7t3r9.pdf`

## Demo

`/demo/cleanroom-dopamine`

## Registries

- [x] MDX `content/prompts/sections/MS-SEC-DOPA01.mdx`
- [x] CMS store.json pro published
- [x] product-packages.ts
- [x] owner-designs.ts
- [x] gallery-utils dual + demo slug

## Notes

- Use `dop-container` never Tailwind `.container`
- No external links in default footer
- Film/lips section not included in this SKU
- Reduced motion: settled footer (no scramble thrash)
- MDX body parity with Phobia section density (r2)
- Get Full Prompt prefers files zip; unauth download → 401
