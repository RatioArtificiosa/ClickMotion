# MERIDIAN - Scroll Narrative Private Residences Hero

**Product ID:** `MS-HERO-MERI01` 
**Price tier:** Pro (paid) - not included in free listings 
**Genre:** Real Estate · Luxury · Hero 
**Live reference build:** `/demo/scroll-narrative` 
**Canonical member prompt source:** `content/prompts/heroes/MS-HERO-MERI01.mdx` · CMS body in `data/cms/store.json`

This file mirrors the sold prompt. Prefer MDX/CMS as the wire for members.

---

**You are an expert front-end engineer.** Build this design EXACTLY as specified. 
Do not invent a different aesthetic. Do not apply host website shell styles. 
Produce a single production-ready React + TypeScript + Tailwind component. 
Support `prefers-reduced-motion`. Desktop-first cinematic; mobile still full-bleed.

This document is the **entire product**. If something is not written here, do not invent it.

---

## Product

Ultra-luxury private residence brand: **MERIDIAN**.

**Visual promise:** A **scroll-driven cinematic film** of an Atlantic oceanfront estate - aerial mansions at golden hour → warm interiors / staircase → garden path opening to sunset ocean. Typography is quiet, editorial, Forbes / Four Seasons Private Residences level. **Scroll owns the video timeline.** No autoplay loop wallpaper. Never SaaS purple gradients, never pill glass nav, never aurora mesh.

**Famous-UI craft direction (not a clone):** Aman / Four Seasons Residences editorial calm × Apple product film pacing × restrained scroll-sequenced storytelling.

---

## Asset contract (NON-NEGOTIABLE)

| Field | Value |
|-------|--------|
| Public path | `/assets/videos/sequence-01.mp4` |
| Poster | `/assets/posters/sequence-01.webp` |
| Attributes | `muted playsInline preload="auto"` - **NO autoplay, NO loop** |
| Object-fit | `cover`, full viewport sticky stage |
| Duration | ~12.0s @ 24fps |
| Control | `video.currentTime = scrollProgress * video.duration` |

**Required subject:** Luxury beachfront estates at sunset; continuous journey aerial → interiors → path to ocean. Warm gold light, palms, private wealth mood.

**Forbidden:** Neon, cyberpunk, cities, aircraft, faces to camera, on-screen text/logos, vertigo cuts.

```txt
Use ONLY the local paths above. Never substitute a CDN URL or another monorepo video.
Scroll is the transport. Do not autoplay.
```

### AI video generation prompt

```
Cinematic 4K continuous single-take feel, ~12 seconds, no audio, 24fps.
Sequence as one journey: (1) slow aerial over Mediterranean-revival beachfront mansions at golden hour sunset, Atlantic waves, warm orange sky; (2) dissolve into ascending limestone staircase with dark mahogany banisters, recessed step lights, warm interior glow toward bright ocean windows; (3) emerge onto manicured lawn path between palms and hedges leading to beach gates and open sunset ocean horizon.
Ultra luxury real estate atmosphere, natural light only, no people faces, no text, no UI, no logos. Smooth camera, expensive restraint. Seamless emotional arc (not hard cuts).
```

Encode: MP4 H.264, 1920×1080, silent, progressive, `+faststart`, frequent keyframes for scrub.

---

## Tech stack

- React 19 + TypeScript, `"use client"`
- Tailwind CSS
- **GSAP 3 + ScrollTrigger** (`scrub: 0.45`)
- Optional CSS keyframes for chapter crossfade only
- No Framer layout noise, no Three.js, no Lottie, no Magic UI / Aceternity / Lightswind
- Single default export; no host chrome

---

## Interaction mode (signature)

| Spec | Value |
|------|--------|
| Mode | Scroll-as-narrative |
| Stage | Sticky `100vh` |
| Track | **420vh** desktop; reduced-motion → `100vh` static |
| Mapping | Progress `0→1` → full video duration |
| Scrub | `0.45` |
| Video | Always `pause()`; never `play()` as loop |
| Chapters | 3 states by progress |
| Progress UI | 1px gold line under nav `scaleX(progress)` |
| Scroll cue | Word **Scroll** + thin gold line only while progress &lt; 0.04 |
| Reduced motion | Poster + chapter 01, no scrub |

**Do not** add instructional copy such as “Scroll to move through the residence” or “never autoplayed.” The Scroll cue + progress line + chapters are enough.

### Chapters (progress 0-1)

| # | Range | Eyebrow | Title (two lines) | Body |
|---|-------|---------|-------------------|------|
| 01 | 0.00-0.32 | Private Atlantic · By Appointment | The coastline / belongs to few. | A rare line of oceanfront residences where architecture, light, and silence are curated as carefully as capital. |
| 02 | 0.32-0.62 | Interiors · Bespoke | Every ascent / is intentional. | Hand-finished stone. Warm mahogany. Soft architecture that leads the eye - and the guest - toward the horizon. |
| 03 | 0.62-1.00 | The Arrival | Where the day / ends in gold. | A private path from lawn to shore. Reserved for owners who measure success not in square feet, but in unbroken views. |

Titles = two stacked block lines. Chapter 03 only: CTAs “Schedule a private tour” (solid cream) + “View the portfolio” (outline).

---

## Design system

| Token | Value |
|-------|--------|
| Canvas | `#0c0a08` |
| Cream | `#f7f1e8` |
| Gold | `#c9a66b` |
| Soft gold | `#e8d5b0` / `#f0d9a8` |
| Scrim | linear top 0.55 → mid open → bottom 0.72 + soft radial vignette |

**Type:** Display Cormorant Garamond (or Playfair) 500, `clamp(2.75rem, 7.2vw, 5.85rem)`, tracking `-0.02em`. Body Inter light 15-17px. Nav/eyebrows Inter 10-11px uppercase wide tracking.

**Nav:** MERIDIAN + Private Residences · Residences · Architecture · Locations · Concierge · rectangular gold “Request Access”. Not a pill dock.

**Anti-slop:** No aurora/mesh/warp, no shiny text, no border-beam, no marquee, no emoji, max one gold system.

---

## Layout

```
[420vh track]
 [Sticky 100vh]
 video + dual scrim
 header + progress
 chapter copy (8) + markers 01-03 (4)
 scroll cue (progress < 4%)
[#request membership band]
 headline + stats 12 / 4 / 100% + mailto
```

---

## Motion numbers

| Item | Spec |
|------|------|
| ScrollTrigger | start `top top`, end `bottom bottom` |
| scrub | `0.45` |
| Chapter enter | 0.85s, y 18→0, cubic-bezier(0.22,1,0.36,1) |
| Seek threshold | `|Δt| > 0.016s` |

---

## Accessibility · Performance · Tags

- Reduced motion: static chapter 01 
- Focusable CTAs; cream on dark scrim contrast 
- Kill ScrollTrigger on unmount; one video; no second WebGL 
- **technicalTags:** `video-background`, `scroll-trigger` 
- **styleTags:** `luxury`, `dark-cinematic`, `editorial` 
- **motionIntensity:** `aggressive` 
- **priceTier:** `pro` (paid)

---

## Expected output

One self-contained component: scroll-scrubbed film, three chapters, gold progress, start-only Scroll cue (no scaffold paragraphs), chapter-03 CTAs, membership band, reduced-motion path, exact asset paths.
