# PRISM - Liquid Glass Multi-Panel Identity Hero

**Product ID:** `MS-HERO-PRSM01`  
**Price tier:** Pro (paid · PaidSalt `pr5m2x`)  
**Genre:** Agency · Creative · Hero  
**Live reference build:** `/demo/cleanroom-prism`  
**Canonical member prompt source:** `content/prompts/heroes/MS-HERO-PRSM01.mdx` · CMS body in `data/cms/store.json`  
**Clean-room component:** `PrismLiquidGlass.tsx`

This file mirrors the sold prompt. Prefer MDX/CMS as the wire for members.

**Pack mode:** files zip + PDF (Studio-class folder). Rebuild from this brief plus `source/PrismLiquidGlass.tsx` and `assets/prism-faces-v1.mp4`.

---

## Promise (buyer-facing)

**PRISM** is a full-viewport **creative identity pin-until-complete** scroll hero: one studio-mist stage, a 48-second multi-face sculpture film the playhead walks through three acts (Atelier, Proof, Invite) while liquid-glass panels of many sizes float on **both left and right**. **Dual process = PSAVE + No Scroller.** **PSAVE** (Perfect Scroll Video Engine): scroll aims, down plays forward, up plays reverse, the picture never jumps a frame. **No Scroller:** the page does not physically scroll during the journey. Not a tall 520vh sticky track. Not GSAP ScrollTrigger seek-scrub. Not Meridian estate scrub. Not Revel pearl fashion. Not a left-column-only essay.

**How you build it:** give your AI this brief plus the files pack. Tell it: *Build PRISM using the files in this folder. Read PROMPT.md. Prefer source/PrismLiquidGlass.tsx. Dual process: PSAVE plus No Scroller. Pin-until-complete. Scroll aims on 12 viewports (47.63s even faces: two flicks must not dump the film). Down-scroll plays the film forward at 1.2x. Up-scroll plays it backward at the same 1.2x, one 3-frame step per seek. Never jump a frame. When they lift, leftover dest plus a 0.55s dest floor keeps the film going a little, then rate eases to a stop. Glass panels, moment pill, and the violet bar follow the picture. Release only when the picture arrives. After release the atelier band may scroll in. Replacement films must be re-encoded GOP 3, no B-frames. Do not seek the playhead across the film. Do not restore GSAP ScrollTrigger or a 520vh sticky track. Do not install gsap. Do not collapse to a left-column-only layout.*

---

**You are an expert front-end engineer.** Build this design EXACTLY as specified.  
Do not invent a different aesthetic. Do not apply any host website marketing shell.  
Produce a single production-ready React + TypeScript + Tailwind component.  
Support prefers-reduced-motion. Mobile-first responsive.

Prefer integrating `source/PrismLiquidGlass.tsx` over rewriting the engine.

---

## Product

Creative identity studio: **PRISM**.

**Visual promise (must read as one coherent product):**  
A **scroll-as-narrative** hero on a **studio mist** canvas. White type on liquid glass. Syne display, DM Sans UI. Violet / cyan prism accents. The film is a centered multi-face sculpture. **PSAVE (Perfect Scroll Video Engine).** Scroll aims. The film plays forward or backward to that moment. Not a seek-scrub. Not an autoplay loop. Information lives in **both-side** floating panels. **Not** left-column-only. **Not** Meridian private-bank coastal. **Not** Revel pearl fashion. **Not** Vertex mono security.

**Signature interaction:** **Dual process = PSAVE + No Scroller.** One pinned `100dvh` stage. Wheel / trackpad / touch / keys set a destination on a **12-viewport** track. **Down-scroll plays the film forward at 1.2x. Up-scroll plays it backward at the same 1.2x.** Never jump a frame. Tiny clicks creep. A crazy scroll still plays the movie to that moment. **When they lift, leftover dest plus a 0.55s dest floor keeps the film going a little**, then rate eases to a stop. Glass panels, moment pill, and the violet bar follow **what is on screen**, not the wheel target. After the picture reaches 1, the pin **releases** so `#atelier` can continue.

---

## Asset contract (NON-NEGOTIABLE)

| Field | Value |
|-------|--------|
| Public path | `/assets/videos/prism-faces-v1.mp4` |
| Pack file | `assets/prism-faces-v1.mp4` |
| Poster | `/assets/posters/prism-faces-v1.webp` |
| Duration | 47.63s silent faces film |
| Encode | H.264, GOP 3, no B-frames, 24fps, 1143 frames, 381 I / 762 P / 0 B, ~126 MB |
| Attributes | `muted playsInline preload="auto"` - **NO autoPlay, NO loop as primary behavior** |
| Object-fit | `cover` |
| Time control | PSAVE: scroll sets a destination. Down plays forward at 1.2x. Up reverses every 3rd 24fps frame on the live video. Never seek across a jump. Replacement films: re-encode GOP 3, no B-frames. |

### REQUIRED film subject

- Centered multi-face identity sculpture (stone, porcelain, iridescent paint)
- Empty left and right thirds for glass
- Soft cool-gray studio mist

### FORBIDDEN

- Autoplay loop as the main mode
- Tall sticky multi-vh document scroll track (`520vh` spacer + sticky stage)
- Seeking `currentTime` across a jump (GSAP scrub or `currentTime = target` on a large delta)
- Installing `gsap`
- Left-column-only layout
- Host (ClickMotion) chrome inside the component
- Storefront preview MP4 as the hero film

```txt
Use ONLY the local path above. Never substitute a CDN URL.
Scroll aims. The film plays to that moment. Do not skip frames.
```

---

## Design system

| Token | Value |
|-------|--------|
| Studio mist | `#E8EAEF` |
| Ink | `#0E1016` |
| Violet | `#A78BFA` |
| Soft violet | `#C4B5FD` |
| Cyan | `#67E8F9` |
| Fuchsia | `#F0ABFC` |
| Display | Syne 600-700 |
| Body | DM Sans 400-600, 11-14px |
| Progress | violet → fuchsia → cyan |

Default chrome and the full 16-panel table: see sold prompt Content Slots. Three acts: `0-0.34` Atelier / `0.34-0.66` Proof / `0.66-1` Invite.

---

## Motion law (mandatory)

```
const VIRTUAL_VIEWPORTS = 12;
const PSAVE_RATE = 1.2;
const PSAVE_FRAME = 1 / 24;
const PSAVE_REV_STRIDE = 3;
const PSAVE_LIVE_MS = 280;
const PSAVE_COAST_SEC = 0.55;
const PSAVE_EASE_SEC = 0.55;
const PSAVE_FLIP_DEADZONE_PX = 32;
```

**Dual process:**
1. **No Scroller:** one `100dvh` stage. Gestures do not move `window.scrollY` while the journey runs.
2. **PSAVE:** gestures write destination only. The film plays to that destination.

**Down:** muted `play()` at 1.2x. After lift, leftover dest + 0.55s dest floor + rate ease to ~0.42.  
**Up:** first real opposite snap dest to picture. Ignore ticks under 32px. Walk `currentTime` backward exactly one 3-frame step (0.125s) per seek. Wait `seeked`. Never seek to the stop point.  
**UI:** panels, moment pill, violet bar follow playhead (`currentTime / duration`).  
**Release:** picture at 0+up or 1+down only. Then `pageOwns` until the stage docks so `#atelier` can scroll in.  
**Open:** kick-seek `0.04 → 0`.  
**Reduced motion:** playhead 0.42. No chase.  
**Earn:** 12 vh because this 47.63s even film dumps dest on 3.6. Do not copy Elyse/Vertex 3.6. Do not restore 520vh.

Capture helper: `window.__msScrollNarrative = { setProgress, getProgress, getTarget, productId: "MS-HERO-PRSM01" }`. Root: `data-prism-drive="psave"`.

---

## Stack

React + TypeScript + Tailwind. **No GSAP. No ScrollTrigger. No Three.js.**

Load Syne + DM Sans with `display: swap`. Prefer CSS variables `--font-prism-display` and `--font-prism-sans`.

---

## Film encode (if you change the video)

```
ffmpeg -y -i your-film.mp4 -an -c:v libx264 -pix_fmt yuv420p -preset slow -crf 16 -g 3 -keyint_min 3 -bf 0 -sc_threshold 0 -movflags +faststart your-film-psave.mp4
```

A normal export with a 2-second GOP will stall mid-reverse. Do not extract PNG frames.

---

## What to tell your AI

```
Build PRISM using only the files in this pack folder.
Read PROMPT.md and follow it exactly. Prefer source/PrismLiquidGlass.tsx.
Dual process: PSAVE (Perfect Scroll Video Engine) plus No Scroller (pin-until-complete).
One 100dvh stage. Scroll aims on 12 viewports. The page does not physically scroll during the journey.
Down-scroll plays the film forward at 1.2x. Up-scroll plays it backward every 3rd frame at the same 1.2x. Never jump a frame.
When they stop, leftover dest plus a 0.55s dest floor keeps the film going a little, then rate eases to a stop. Ignore tiny opposite ticks.
The film is a 47.63s even multi-face sculpture. Two flicks must not dump dest. Do not copy Elyse 3.6. Do not restore 520vh or GSAP scrub.
Glass panels, moment pill, and the violet bar follow the picture. Release only when the picture arrives. After release the atelier band may scroll in.
If you change the video, re-encode GOP 3, no B-frames, crf 16, then wire that file.
Do not import ScrollTrigger or gsap. Do not seek currentTime across a jump. Do not build a tall multi-vh track. Do not collapse to a left-column-only layout.
```

## Package notes (operators)

- Opaque: `p8r3sm7k2n4q` · PaidSalt: `pr5m2x`
- Pack mode: files zip + PDF
- Pin gold: PSAVE · 12 vh · 1.2x · 3-frame reverse · 280ms live · 0.55s dest floor + rate ease · 32px bounce ignore · GOP 3 (381 I / 762 P / 0 B)
- Method spec: `docs/PSAVE.md` §5E
- Operator feel lock 2026-08-15: "It is perfect."

ClickMotion · www.ClickMotion.dev
