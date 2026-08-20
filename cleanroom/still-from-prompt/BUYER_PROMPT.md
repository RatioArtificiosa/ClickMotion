# STILL - Mindfulness Scroll Narrative Hero

**Product ID:** `MS-HERO-STIL01`  
**Price tier:** Pro (paid · PaidSalt `sk3p8w`)  
**Genre:** Health · Wellness · Hero  
**Live reference build:** `/demo/cleanroom-still`  
**Canonical member prompt source:** `content/prompts/heroes/MS-HERO-STIL01.mdx` · CMS body in `data/cms/store.json`  
**Clean-room component:** `StillMindfulnessHero.tsx`

This file mirrors the sold prompt. Prefer MDX/CMS as the wire for members.

**Pack mode:** files zip + PDF (Studio-class folder). Rebuild from this brief plus `source/StillMindfulnessHero.tsx` and `assets/still-cosmos-v1.mp4`.

---

## Promise (buyer-facing)

**STILL** is a full-viewport **mindfulness pin-until-complete** scroll hero: one night-sky stage, a 30-second cosmic transformation film the playhead walks through five soft chapters from arid quiet to living cosmos. **Dual process = PSAVE + No Scroller.** **PSAVE** (Perfect Scroll Video Engine): scroll aims, down plays forward, up plays reverse, the picture never jumps a frame. **No Scroller:** the page does not physically scroll during the journey. Not a tall 960vh sticky track. Not hybrid Option A idle free-play. Not Meridian estate scrub. Not Elyse sanctuary gold.

**How you build it:** give your AI this brief plus the files pack. Tell it: *Build STILL using the files in this folder. Read PROMPT.md. Prefer source/StillMindfulnessHero.tsx. Dual process: PSAVE plus No Scroller. Pin-until-complete. Scroll aims on 12 viewports (30s even cosmos: two flicks must not dump the film). Down-scroll plays the film forward at 1.2x. Up-scroll plays it backward at the same 1.2x, one 3-frame step per seek. Never jump a frame. When they lift, leftover dest plus a 0.55s dest floor keeps the film going a little, then rate eases to a stop. Copy and the mint bar follow the picture. Release only when the picture arrives. After release the host page may continue. Replacement films must be re-encoded GOP 3, no B-frames. Do not seek the playhead across the film. Do not restore hybrid Option A, a 5s idle free-play, GSAP ScrollTrigger, or a 960vh sticky track. Do not install gsap.*

---

**You are an expert front-end engineer.** Build this design EXACTLY as specified.  
Do not invent a different aesthetic. Do not apply any host website marketing shell.  
Produce a single production-ready React + TypeScript + Tailwind component.  
Support prefers-reduced-motion. Mobile-first responsive.

Prefer integrating `source/StillMindfulnessHero.tsx` over rewriting the engine.

---

## Product

Mindfulness / mental wellness house: **STILL**.

**Visual promise (must read as one coherent product):**  
A **scroll-as-narrative** hero on a **deep night** canvas. Moon cream type `#eef6f4`, mint `#8fd0c8`. Cormorant Garamond display, Inter UI. The film is a cosmic growth journey: arid desert under planets, then greening, then lush emerald cosmos. **PSAVE (Perfect Scroll Video Engine).** Scroll aims. The film plays forward or backward to that moment. Not a seek-scrub. Not an autoplay loop. Not a 5s idle hybrid. Feels like Calm / Headspace craft language with prestige nature cinema. **Not** white spa, not neon SaaS, not Meridian private-bank coastal, not Elyse gold earth, not Revel pearl fashion.

**Signature interaction:** **Dual process = PSAVE + No Scroller.** One pinned `100dvh` stage. Wheel / trackpad / touch / keys set a destination on a **12-viewport** track. **Down-scroll plays the film forward at 1.2x. Up-scroll plays it backward at the same 1.2x.** Never jump a frame. Tiny clicks creep. A crazy scroll still plays the movie to that moment. **When they lift, leftover dest plus a 0.55s dest floor keeps the film going a little**, then rate eases to a stop. Five chapters, whispers, and the mint bar follow **what is on screen**, not the wheel target. After the picture reaches 1, the pin **releases** so a host page can continue.

---

## Asset contract (NON-NEGOTIABLE)

| Field | Value |
|-------|--------|
| Public path | `/assets/videos/still-cosmos-v1.mp4` |
| Pack file | `assets/still-cosmos-v1.mp4` |
| Poster | `/assets/posters/still-cosmos-v1.webp` |
| Duration | 30.00s silent cosmos film |
| Encode | H.264, GOP 3, no B-frames, 24fps, 720 frames, 240 I / 480 P / 0 B, ~81.5 MB |
| Attributes | `muted playsInline preload="auto"` - **NO autoPlay, NO loop as primary behavior** |
| Object-fit | `cover` |
| Time control | PSAVE: scroll sets a destination. Down plays forward at 1.2x. Up reverses every 3rd 24fps frame on the live video. Never seek across a jump. Replacement films: re-encode GOP 3, no B-frames. |

### REQUIRED film subject

- Transformation arc: dry desert → greening → lush cosmic landscape
- Lone figure optional; no readable UI text, logos, or watermarks
- Warm teal / mint cosmos grade, night sky, planets

### FORBIDDEN

- Autoplay loop as the main mode
- Tall sticky multi-vh document scroll track (`960vh` spacer + sticky stage)
- Hybrid Option A (5s idle free-play + reclaim scrollTo)
- Seeking `currentTime` across a jump (GSAP scrub, wheel-gain dump, or `currentTime = target` on a large delta)
- Installing `gsap`
- Generic office meditation stock / neon cyberpunk / clinical white spa
- Host (ClickMotion) chrome inside the component
- Storefront preview WebM/MP4 as the hero film

```txt
Use ONLY the local path above. Never substitute a CDN URL.
Scroll aims. The film plays to that moment. Do not skip frames.
```

---

## Design system

| Token | Value |
|-------|--------|
| Canvas | `#070b12` deep night |
| Cream / moon | `#eef6f4` |
| Mint accent | `#8fd0c8` |
| Soft violet (sparing) | `#c5b8e0` |
| Display | Cormorant Garamond or Playfair, medium, tracking -0.02em, line-height 0.94, clamp(2.6rem, 7.2vw, 5.75rem) |
| Body | Inter 300-500, 15-16px, cream ~72% |
| Progress | mint → soft violet gradient hairline |

### Default copy (exact)

| Slot | Text |
|------|------|
| Brand | STILL |
| Nav | Practice · Sleep · Stress · Retreats |
| Nav CTAs | Sign in · Begin free |
| Ch1 | Soften. / Begin again. |
| Ch2 | When your mind / never lands. |
| Ch3 | Softness / is a skill. |
| Ch4 | Grow into / your quiet. |
| Ch5 | Come home / to yourself. |
| Whispers | Breathe in · Unclench · Ease · Expand · Return |
| Primary CTA | Start free session |
| Secondary CTA | Explore programs |
| Stats | 10 min daily sessions · Science led programs · Live retreats and circles |

Chapter bodies and eyebrows: see sold prompt Content Slots. Five bands: `0-0.14` / `0.14-0.34` / `0.34-0.56` / `0.56-0.78` / `0.78-1.01`.

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
**UI:** chapters, whispers, mint bar follow playhead (`currentTime / duration`).  
**Release:** picture at 0+up or 1+down only. Then `pageOwns` until the stage docks.  
**Open:** kick-seek `0.04 → 0`, fade `.is-ready`.  
**Reduced motion:** poster + chapter 1. No chase.  
**Earn:** 12 vh because this 30s even film dumps dest on 3.6. Do not copy Elyse/Vertex 3.6. Do not restore 960vh.

Capture helper: `window.__msScrollNarrative = { setProgress, getProgress, getTarget, productId: "MS-HERO-STIL01" }`. Root: `data-still-drive="psave"`.

---

## Stack

React + TypeScript + Tailwind. **No GSAP. No ScrollTrigger. No Three.js.**

Load Cormorant Garamond + Inter with `display: swap`. Prefer CSS variables `--font-still-display` and `--font-still-body`.

---

## Film encode (if you change the video)

```
ffmpeg -y -i your-film.mp4 -an -c:v libx264 -pix_fmt yuv420p -preset slow -crf 16 -g 3 -keyint_min 3 -bf 0 -sc_threshold 0 -movflags +faststart your-film-psave.mp4
```

A normal export with a 2-second GOP will stall mid-reverse. Do not extract PNG frames.

---

## What to tell your AI

```
Build STILL using only the files in this pack folder.
Read PROMPT.md and follow it exactly. Prefer source/StillMindfulnessHero.tsx.
Dual process: PSAVE (Perfect Scroll Video Engine) plus No Scroller (pin-until-complete).
One 100dvh stage. Scroll aims on 12 viewports. The page does not physically scroll during the journey.
Down-scroll plays the film forward at 1.2x. Up-scroll plays it backward every 3rd frame at the same 1.2x. Never jump a frame.
When they stop, leftover dest plus a 0.55s dest floor keeps the film going a little, then rate eases to a stop. Ignore tiny opposite ticks.
The film is a 30s even cosmos. Two flicks must not dump dest. Do not copy Elyse 3.6. Do not restore 960vh or 5s idle hybrid.
Copy and the mint bar follow the picture. Release only when the picture arrives. After release the page may continue.
If you change the video, re-encode GOP 3, no B-frames, crf 16, then wire that file.
Do not import ScrollTrigger or gsap. Do not seek currentTime across a jump. Do not build a tall multi-vh track.
```

## Package notes (operators)

- Opaque: `s7i1l9m4ndf0` · PaidSalt: `sk3p8w`
- Pack mode: files zip + PDF
- Pin gold: PSAVE · 12 vh · 1.2x · 3-frame reverse · 280ms live · 0.55s dest floor + rate ease · 32px bounce ignore · GOP 3 (240 I / 480 P / 0 B)
- Method spec: `docs/PSAVE.md` §5D
- Operator feel lock 2026-08-15: "It is perfect."

ClickMotion · www.ClickMotion.dev
