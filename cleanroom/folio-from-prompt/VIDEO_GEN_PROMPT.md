# FOLIO — Video generation / media map (MS-SEC-FOLI01)

**Product:** MS-SEC-FOLI01 · Folio  
**Interaction (live):** Scroll-driven card pivot over looping wallpaper under glass  
**Storefront demos:** Separate FG capture + continuous BG composite (not live scroll scrub)

## Roles

| Role | Path | Notes |
|------|------|--------|
| Master / vault | `public/assets/videos/originals/folio-blurry-master-v1.mp4` | Immutable source |
| Client HD | `public/assets/videos/folio-blurry-v1.mp4` | Buyer pack film; also underlay for storefront composite |
| Backgrounds small | `public/assets/videos/backgrounds/folio-blurry-bg-v1.mp4` | 640×360 pure film only |
| Backgrounds poster | `public/assets/posters/folio-blurry-v1.webp` | **Pure film still** for `/backgrounds` + Admin tiles — no UI |
| Storefront preview | `public/assets/videos/folio-scroll-preview-v1.mp4` | Product page demo (burn) |
| Storefront FS | `public/assets/videos/folio-scroll-preview-fs-v1.mp4` | 1920×1080 demo (burn) |
| Storefront poster | `public/assets/posters/folio-scroll-preview-v1.webp` | UI-burned composite (product page only) |
| Thumbnail | `public/thumbnails/MS-SEC-FOLI01.webp` | Gallery (product card, not backgrounds) |

## Subject

Abstract soft-focus "blurry vision" motion loop - organic color fields, gentle light shifts. No people, no logos, no UI text. Silent seamless loop.

## Encode commands

```bash
# Backgrounds small (if regenerating)
node scripts/encode-backgrounds-preview.mjs --only folio-blurry

# Backgrounds pure-film poster (NEVER use folio-scroll-preview-*.webp here)
ffmpeg -y -ss 1 -i public/assets/videos/folio-blurry-v1.mp4 -frames:v 1 \
  -vf "scale=1280:-1" -q:v 70 public/assets/posters/folio-blurry-v1.webp
# Wire: src/config/backgrounds.ts → poster: "/assets/posters/folio-blurry-v1.webp"

# Storefront captures (dev server on :3004) — full runbook:
#   docs/prep/MS-SEC-FOLI01-PREVIEW-CAPTURE.md
node scripts/capture-folio-preview.mjs http://127.0.0.1:3004/demo/cleanroom-folio
```

## Storefront recapture (read before redoing)

**Authoritative runbook:** [`docs/prep/MS-SEC-FOLI01-PREVIEW-CAPTURE.md`](../../docs/prep/MS-SEC-FOLI01-PREVIEW-CAPTURE.md)

Locked method (do not regress):

1. Capture **foreground only** (cards/titles) as RGBA PNGs with transparent bg  
2. Composite **continuous** `folio-blurry-v1.mp4` under plates in ffmpeg  
3. Use **continuous** sheet scroll curve (`warpLocal` 0→1, linear open/close, short face, dense close)  
4. Never seek-scrub the bg video inside Playwright for storefront burns  
5. Never hide `.folio-header` / `.folio-sheet-head` when stripping site chrome  

## Forbidden

- Never stream client HD on `/backgrounds`
- Never point broll at `*-preview*` files
- Never use backgrounds small as client HD in the sold prompt
- Never overwrite client HD / master with UI-burnt previews
- **Never** set `backgrounds.ts` `poster` to `folio-scroll-preview-*.webp` or any UI-burned storefront still — backgrounds tiles must show **film only**
