# Zero Energy — cleanroom (MS-HERO-ZERO01)

Operator-facing Next mount of the frozen Zero Energy can-gallery.

## Surfaces

| Surface | Path | Role |
|---------|------|------|
| Frozen clone (do not edit) | `E:\website-tests\zero-energy-clone` | Source of truth |
| Lab copy | `Lab/zero-energy/app` | Isolated Vite lab, port 3070 |
| This folder | `cleanroom/zero-energy-from-prompt` | Next.js demo + future pack source |
| Demo | `/demo/cleanroom-zero` | Operator check |
| Assets | `/assets/zero-energy/` | GLB, HDR, labels, fonts, CSS, audio |

Lab imports the same `CanGallery` module. This cleanroom is that module with:

- asset base remapped to `/assets/zero-energy/`
- Three **0.161.0** vendored (`vendor/three`) so MS `three@0.185` / R3F never leak in
- `initWebglScene` / dispose so the Next SPA can unmount

Scene math, Lenis clock, HUD, copy, and labels stay frozen.

## Boot

1. `ZeroEnergyGallery` renders `CanGallery`
2. `CanGallery` effect: `initWebglScene()` then `initHud()`
3. Lenis (`autoRaf: false`, `infinite`) drives `lenis.raf` inside the Three loop
4. HUD ScrollTriggers bind to sections; they do **not** scrub the 3D clock

## Local-only

No remote fonts, CDN, fetch, mailto, or socials in this folder. Do not copy URLs from `research/`.
