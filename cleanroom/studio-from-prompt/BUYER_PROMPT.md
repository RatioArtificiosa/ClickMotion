# Studio Sequence — Buyer prompt (MS-SEC-STUDIO01)

Paste into your AI coding tool after you unlock the package.

---

Build the **Studio Sequence** mid-page section from this package.

## What it is

A scroll-pinned **camera pull-out**: visitors start *inside* a full-bleed film, then the world scales out to reveal that film playing on a street billboard. Premium. Cinematic. One section, not a full site.

## Non-negotiables

1. Use the package video (or my custom video) at **full length** — do not cut, trim, or seek with scroll.  
2. Scroll only moves the **camera** (world scale around the billboard).  
3. Film loops end-to-end when it finishes.  
4. No CSS filters that regrade the film unless I ask.  
5. Any video path I give must drop in via `videoSrc` / `studio-data.ts` only.

## Default media

- Billboard film (pure, no UI frames): `/assets/videos/studio-surreal-v1.mp4`  
- Street plate: `/assets/images/studio/ny.png`  
- Config: `studio-data.ts` → `STUDIO_DEFAULTS`

## Stack

React, GSAP ScrollTrigger, optional Lenis (`SmoothScroll.tsx`). No Three.js.

## Customize later

See **CUSTOMIZATION.md** for swap-video, swap-plate, and AI film prompts.

If I say “use my video at [URL or path]”, only change `videoSrc` (and optional poster). Keep camera math and full-length playback.
