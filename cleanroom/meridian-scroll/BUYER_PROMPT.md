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
| Poster | `/assets/posters/sequence-01.webp` - **must be exact film frame 0 at 1920×1080** (same crop as video; never a tighter still or 1088-tall crop) |
| Attributes | `muted playsInline preload="auto"` - **NO autoplay, NO loop** |
| Object-fit | `cover`, full viewport pin stage |
| Duration | ~12.0s @ 24fps |
| Control | `video.currentTime = progress * video.duration` |

**Required subject:** Luxury beachfront estates at sunset; continuous journey aerial → interiors → path to ocean. Warm gold light, palms, private wealth mood.

**Forbidden:** Neon, cyberpunk, cities, aircraft, faces to camera, on-screen text/logos, vertigo cuts.

```txt
Use ONLY the local paths above. Never substitute a CDN URL or another monorepo video.
Scroll (virtual progress) is the transport. Do not autoplay.
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
- **GSAP 3** for scrub lag only (`duration: 0.45` on progress proxy - same feel as legacy ScrollTrigger `scrub: 0.45`)
- Optional CSS keyframes for chapter crossfade only
- No Framer layout noise, no Three.js, no Lottie, no Magic UI / Aceternity / Lightswind
- Single default export; no host chrome

---

## Interaction mode (signature) - PIN-UNTIL-COMPLETE

| Spec | Value |
|------|--------|
| Mode | Scroll-as-narrative · **pin-until-complete** |
| Stage | **One pinned `100dvh` frame** - **not** a tall multi-vh page track |
| Virtual effort | **`3.2 × viewport height`** of wheel/trackpad distance for progress 0→1 (gold pace - do not change) |
| Mapping | Virtual progress `0→1` → full video duration |
| Scrub lag | `0.45` (GSAP tween on progress proxy, ease none) |
| Video | Always `pause()`; never `play()` as loop |
| Chapters | 3 states by progress |
| Progress UI | 1px gold line under nav `scaleX(progress)` |
| Scroll cue | Word **Scroll** + thin gold line only while progress &lt; 0.04 |
| Release | At progress **0 + scroll up** or progress **1 + scroll down**, allow host page to continue (membership band) |
| Capture API | Optional `window.__msScrollNarrative = { setProgress, getProgress }` |
| Reduced motion | Poster + chapter 01, no scrub |

**Hard ban:** tall sticky multi-vh document scroll track (`420vh` spacer + sticky stage) as the product method.  
**Hard ban:** changing virtual viewports or scrub lag without operator approval (this is the Meridian gold standard pace).

**Do not** add instructional copy such as "Scroll to move through the residence" or "never autoplayed." The Scroll cue + progress line + chapters are enough.

### Chapters (progress 0-1)

| # | Range | Eyebrow | Title (two lines) | Body |
|---|-------|---------|-------------------|------|
| 01 | 0.00-0.32 | Private Atlantic · By Appointment | The coastline / belongs to few. | A rare line of oceanfront residences where architecture, light, and silence are curated as carefully as capital. |
| 02 | 0.32-0.62 | Interiors · Bespoke | Every ascent / is intentional. | Hand-finished stone. Warm mahogany. Soft architecture that leads the eye - and the guest - toward the horizon. |
| 03 | 0.62-1.00 | The Arrival | Where the day / ends in gold. | A private path from lawn to shore. Reserved for owners who measure success not in square feet, but in unbroken views. |

Titles = two stacked block lines. Chapter 03 only: CTAs "Schedule a private tour" (solid cream) + "View the portfolio" (outline).

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

**Nav:** MERIDIAN + Private Residences · Residences · Architecture · Locations · Concierge · rectangular gold "Request Access". Not a pill dock.

**Anti-slop:** No aurora/mesh/warp, no shiny text, no border-beam, no marquee, no emoji, max one gold system.

---

## Layout

```
[Pinned 100dvh stage - pin-until-complete]
 video + dual scrim
 header + progress
 chapter copy (8) + markers 01-03 (4)
 scroll cue (progress < 4%)
[#request membership band - after pin releases]
 headline + stats 12 / 4 / 100% + mailto
```

---

## Motion numbers (GOLD - preserve)

| Item | Spec |
|------|------|
| Virtual viewports | **3.2** (≡ old 420vh track scroll distance) |
| Scrub lag | **0.45** |
| Chapter enter | 0.85s, y 18→0, cubic-bezier(0.22,1,0.36,1) |
| Seek threshold | `|Δt| > 0.016s` |
| Inputs | wheel, trackpad, touch, Arrow/Page/Space keys |

---

## Accessibility · Performance · Tags

- Reduced motion: static chapter 01  
- Focusable CTAs; cream on dark scrim contrast  
- Kill GSAP scrub tween on unmount; one video; no second WebGL  
- **technicalTags:** `video-background`, `scroll-trigger`  
- **styleTags:** `luxury`, `dark-cinematic`, `editorial`  
- **motionIntensity:** `aggressive`  
- **priceTier:** `pro` (paid)

---

## Expected output

One self-contained component: pin-until-complete virtual progress scrubbing film, three chapters, gold progress, start-only Scroll cue (no scaffold paragraphs), chapter-03 CTAs, membership band after release, reduced-motion path, exact asset paths. **No tall multi-vh page track.**
