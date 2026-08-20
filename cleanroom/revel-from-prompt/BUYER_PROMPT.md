# REVEL - Scroll Narrative Fashion Commerce Hero

**Product ID:** `MS-HERO-REVL01`  
**Price tier:** Pro (paid)  
**Genre:** Ecommerce · Fashion · Hero  
**Live reference build:** `/demo/cleanroom-revel`  
**Canonical member prompt source:** `content/prompts/heroes/MS-HERO-REVL01.mdx` · CMS body in `data/cms/store.json`  
**Clean-room component:** `RevelScrollNarrative.tsx`

This file mirrors the sold prompt. Prefer MDX/CMS as the wire for members.

**Pack mode:** PDF-only (no files zip, no START-HERE folder). Rebuild from this brief plus the Revel package PDF.

---

## Promise (buyer-facing)

**REVEL** is a fashion-commerce **pin-until-complete** scroll hero: one full-viewport pearl stage, a 20-second iPhone breakout film the playhead walks through four chapters from feed to freedom. **PSAVE** (Perfect Scroll Video Engine): scroll aims, down plays forward, up plays reverse, the picture never jumps a frame. Not a tall multi-page scrollbar track. Not Meridian dark coastal. Not Vertex mono security.

**How you build it:** give your AI this brief plus the Revel package PDF. Tell it: *Build REVEL with PSAVE (Perfect Scroll Video Engine). Pin-until-complete. Scroll aims on 12 viewports so the kick is earned (about 5 or 6 scrolls to halfway). Down-scroll plays the film forward at 1.2x. Up-scroll plays it backward at the same 1.2x, one 3-frame step per seek. Never jump a frame. When they lift, leftover dest plus a 0.55s dest floor keeps the film going a little, then rate eases to a stop. Copy and the rose bar follow the picture. Release only when the picture arrives. After release the page owns the atelier. Replacement films must be re-encoded GOP 3, no B-frames. Do not seek the playhead across the film. Do not copy old Vertex seek-scrub or the old Revel wheel-gain scrub. Do not build a 480vh sticky track.*

---

**You are an expert front-end engineer.** Build this design EXACTLY as specified.  
Do not invent a different aesthetic. Do not apply any host website marketing shell.  
Produce a single production-ready React + TypeScript + Tailwind component.  
Support prefers-reduced-motion. Mobile-first responsive.

This document is the **only** design brief. Implement only what is written here.

---

## Product

Fashion commerce brand: **REVEL**.

**Visual promise (must read as one coherent product):**  
A **scroll-as-narrative** hero on a **light pearl studio** canvas. Rose-gold `#C4A574` and soft blush accents. Instrument Serif display, Inter UI. The film is a gold iPhone breakout - feed, shatter, woman free. **PSAVE (Perfect Scroll Video Engine).** Scroll aims. The film plays forward or backward to that moment. Not a seek-scrub. Not an autoplay loop. Feels like a high-fashion campaign site (Apple product film pacing × Vogue digital) - **not** dark luxury coastal scroll (Meridian), not mono security scrub (Vertex), not neon cyberpunk, not climate forest, not quantum lab.

**Signature interaction:** **pin-until-complete** + **PSAVE**. One pinned `100dvh` stage. Wheel / trackpad / touch / keys set a destination on a **12-viewport** track. **Down-scroll plays the film forward at 1.2x. Up-scroll plays it backward at the same 1.2x.** Never jump a frame. Tiny clicks creep. A crazy scroll still plays the movie to that moment. **The film is slow then a kick** (phone, walk to glass, then jump). Halfway (she leaves the viewpoint) takes about **5 or 6 scrolls**. **When they lift, leftover dest plus a 0.55s dest floor keeps the film going a little**, then rate eases to a stop. Four chapters and the rose bar follow **what is on screen**, not the wheel target. **Scroll cue** at start. After the picture reaches 1, the pin **releases** so the atelier band can continue.

---

## Asset contract (NON-NEGOTIABLE)

### Background video (PSAVE, NOT loop autoplay)

| Field | Value |
|-------|--------|
| Public path | `/assets/videos/revel-breakout-v1.mp4` |
| Poster | `/assets/posters/revel-breakout-v1.webp` (this still **is** frame 0) |
| Duration | ~20s cinematic breakout film |
| Attributes | `muted playsInline preload="auto"` - **NO autoPlay, NO loop as primary behavior** |
| Object-fit | `cover`, full viewport pin stage |
| Time control | PSAVE: scroll sets a destination. Down plays forward at 1.2x. Up reverses every 3rd 24fps frame on the live video. Never seek across a jump. Replacement films: re-encode GOP 3, no B-frames. |

#### Film subject (required story)

1. Gold phone floating in pearl studio, social icons orbit  
2. Shoe / sole shatters through glass screen  
3. Shards + hearts + icons suspended midair  
4. Woman breaks free, mid-leap over the phone  

#### FORBIDDEN

- Autoplay loop as the main mode (scroll aims; the playhead walks)  
- Tall sticky multi-vh document scroll track (`480vh` spacer + sticky stage) as the product method  
- Seeking `currentTime` across a jump (GSAP scrub, wheel-gain dump, or `currentTime = target` on a large delta)  
- Dark-only Meridian/Vertex clones  
- Cyan neon cyberpunk city  
- Host (ClickMotion) chrome inside the component  

```txt
Use ONLY the local path above. Never substitute a CDN URL.
Scroll aims. The film plays to that moment. Do not skip frames.
```

---

## Tech stack

- React 19 + TypeScript, `"use client"`  
- Tailwind CSS utilities  
- Playhead chase is the motion system. **Do not** use GSAP / ScrollTrigger to tween `currentTime` across a jump.  
- Optional CSS keyframes for chapter crossfade  
- **No** Framer required  
- **No** hls.js. Plain MP4 `<video>`.  
- Single default export: `RevelScrollNarrative.tsx`  
- Props: `brand`, `backgroundSrc`, `posterSrc`

---

## Interaction mode (signature) - PIN-UNTIL-COMPLETE

| Spec | Value |
|------|--------|
| Mode | Scroll-as-narrative · **pin-until-complete** · **PSAVE** (Perfect Scroll Video Engine) |
| Stage | **One pinned `100dvh` frame** - **not** a tall multi-vh page track |
| Virtual effort | **`12 × viewport height`** to aim from start to end. Earned. Not Elyse 3.6. Not old 3.8 seek-scrub. |
| Aim | Wheel / trackpad / touch map **1:1** onto that track. They set a **destination**. They do not seek the picture. |
| Playhead | **PSAVE.** Walk the film toward the destination at **`1.2`** film-seconds per wall-second, both ways. Down: muted `play()` at `playbackRate 1.2`, ease over the last `0.55s` of leftover dest. Up: first **real** up-scroll cancels a leftover forward destination. Pause and walk the live video backward **exactly one 3-frame step (`0.125s`) per seek**, during the gesture and after they stop. Wait `seeked`. Never assign `currentTime` to the stop point. No low-res buffer. No loop. |
| Lift | Leftover dest plus **`PSAVE_COAST_SEC = 0.55`**. After last real intent dest sits at least 0.55s of film ahead. Ignore opposite ticks under **32px**. Rate tapers 1.2 → ~0.42 over the last 0.55s. Friction, then a graceful stop. Never a screech. This 0.55 is **not** old GSAP lag. |
| Tiny click | Destination moves a little. The picture creeps a few frames. |
| Crazy scroll | Destination may sit halfway through the movie. The picture still **plays the movie** to get there. |
| Mapping | Destination `0→1` → full video duration (~20s). On-screen time is the playhead, not the destination. |
| Video | No loop. No wallpaper autoplay. Opening poster **is** frame 0. Kick-seek `0.04 → 0`, wait `seeked`, then fade the film in. |
| Chapters | 4 states by **playhead** (what is on screen) |
| Progress UI | 1px rose-gold line under nav `scaleX(playhead)` |
| Scroll cue | Word **Scroll** + thin rose-gold line only while playhead &lt; 0.05 |
| Release | Only when the **picture** is at **0 + scroll up** or **1 + scroll down**. Snap the playhead to `0` / `1` when the last frame is on screen. After release, the **page** owns scroll until the stage docks at the top. Pointer on the atelier never drives the film. |
| Capture API | Optional `window.__msScrollNarrative = { setProgress, getProgress, getTarget, productId: "MS-HERO-REVL01" }`. `setProgress` may snap. `getProgress` is the playhead. |
| Reduced motion | Static mid-film frame (~0.45), no chase |

**Hard ban:** tall sticky multi-vh document scroll track (`480vh` spacer + sticky stage) as the product method.  
**Hard ban:** seeking `currentTime` to a far destination (GSAP scrub tween, wheel-gain dump, or old Vertex / old Revel seek-scrub). Live Vertex is PSAVE (`3.6` + 0.55 coast).

### Rebuild algorithm (mandatory - copy this logic, do not invent another method)

If you reach for `ScrollTrigger.create`, `position: sticky`, a `480vh` spacer, or `video.currentTime = target * duration` on a large jump, stop. Rebuild with this sequence:

1. Render **one `100dvh` stage in normal document flow**. The `#atelier` band is the **next sibling**, not inside the stage. Do **not** `overflow: hidden` the page (atelier must be reachable after release).
2. Hold a **destination** in `0…1` and a **playhead** that is whatever `video.currentTime / duration` is showing. The poster is frame 0. Kick-seek `0.04 → 0` (reduced: `~0.45`), wait `seeked`, fade the video in.
3. Virtual distance = `12 * window.innerHeight`. Gestures add `deltaPx / distance` to the **destination** only.
4. **Wheel / trackpad** (`passive: false`): ignore `ctrlKey` / `metaKey` (browser zoom). Normalize `deltaMode` (`1` → `×16`, `2` → `× innerHeight`). Map raw delta **1:1** onto the 12 track. Ignore opposite ticks under 32px inside the live window. Coalesce to one destination apply per animation frame. `preventDefault` while the pin owns the gesture.
5. **Touch:** finger `deltaY` 1:1 on the 12 track (destination only).
6. **Keys:** Arrow / Page / Space step `0.045` of the virtual distance (Page `×2.2`). Do **not** trap Space on a focused link or button.
7. **PSAVE:** each animation frame, walk the picture toward `destination * duration` at **1.2x**, never more than **1/24s** of film in one forward fallback tick. **Down / forward:** muted `play()` at `playbackRate 1.2`, ease over the last 0.55s of leftover dest. After they lift, if dest is closer than 0.55s of film, push dest that far once. **Up / reverse:** first real up-scroll cancels any pending forward destination. While they are still scrolling up, walk backward **exactly one 3-frame step (`0.125s`) per seek**. Never assign `currentTime` to the stop point. After they stop, keep walking those same 3-frame steps at 1.2x until the picture arrives. Wait for `seeked`. No low-res buffer. No loop.
8. **Release:** if the **picture** is at `0` and the gesture is up, or the **picture** is at `1` and the gesture is down, do **not** preventDefault. Test the live `currentTime` as well as the playhead ref. If the destination is already at an end but the picture is still walking, keep the pin and eat the gesture. Once released, the **page** owns scroll (including when the pointer is on the atelier) until the stage docks back at the top.
9. **Reduced motion:** skip listeners; seek to `~0.45`; static mid-break chapter.
10. Optional: `window.__msScrollNarrative = { setProgress, getProgress, getTarget, productId: "MS-HERO-REVL01" }`.

### Film encode (mandatory if you change the video)

The shipped file `/assets/videos/revel-breakout-v1.mp4` is already remastered for PSAVE: H.264, **GOP 3**, **no B-frames**, ~161 I-frames on a 482-frame / 20.04s / 24fps film. Reverse seeks every `0.125s`. A normal export with a 2-second GOP will stall mid-reverse.

If you replace the breakout film:

```bash
ffmpeg -y -i your-film.mp4 -an -c:v libx264 -pix_fmt yuv420p -preset slow -crf 16 \
  -g 3 -keyint_min 3 -bf 0 -sc_threshold 0 -movflags +faststart \
  your-film-psave.mp4
```

Wire `backgroundSrc` to the remastered file. Keep 24fps, or change `PSAVE_FRAME` to `1/fps` and keep a 3-frame reverse stride. Do not extract PNG frames. Do not use a storefront preview as the hero.

---

## Design system

**Mode:** Light studio base with dark type on chrome; **cream/white headlines over the film** with soft dark bottom scrim for legibility.

| Role | Hex | Notes |
|------|-----|--------|
| page / root | `#F7F4F1` | Pearl canvas |
| ink | `#1A1614` | Charcoal UI |
| cream | `#F7F4F1` | Headlines on film |
| rose gold | `#C4A574` | Accent, progress, eyebrows |
| blush | `#E8B4B8` | Progress gradient mid |
| glass | `rgba(255,255,255,0.4)` | Nav CTA frost |

**Fonts:**

- Display: `Instrument Serif` (or Playfair if unavailable), medium feel, tracking `-0.03em`  
- Body / UI: `Inter` 300-600  

**Chrome:** Thin rose-gold progress under nav. Fashion uppercase tracking. Sharp-ish buttons (small radius ok, not neon pills). No glitch.

**Anti-slop hard ban:**

- Purple mesh SaaS, emoji, shiny rainbow text  
- Full-bleed dark private-bank clone of Meridian  
- Brutalist mono Vertex chrome  
- Neon cyan/pink rain city  
- Host marketing shell  

**Famous-UI craft direction (not a clone):** High-fashion digital campaign + Apple keynote restraint. One film. Virtual progress owns time. Stop.

---

## Layout

```
[Pinned 100dvh stage - pin-until-complete]
 video + dual scrim + rose vignette
 header + rose-gold progress
 chapter copy (8) + markers 01-04 (4)
 scroll cue (progress < 5%)
[#atelier closing band - after pin releases]
 headline + 4 meta cards + Request a campaign kit
```

### Navbar

- Left: **REVEL** + optional "Fashion Commerce"  
- Center (md+): Collections · Lookbook · Campaigns · Journal  
- Right: **Enter atelier** frost button  

### Chapters (copy tied to virtual progress)

| Progress | Id | Eyebrow | Title lines | Body gist |
|----------|-----|---------|-------------|-----------|
| 0–0.28 | feed | Chapter one · The feed | She lived / inside the glow. | Phone, profile, orbiting hearts |
| 0.28–0.58 | break | Chapter two · The break | Then something / had to give. | Sole through glass |
| 0.58–0.82 | shatter | Chapter three · The shatter | Shards of / attention fall. | Icons suspended midair |
| 0.82–1.0 | arrival | Chapter four · The arrival | Now she / owns the room. | Free mid-leap + CTAs |

Chapter index rail (right on lg): 01–04 with active rose-gold bar.

Finale CTAs (chapter 4 only): **Shop the drop** (charcoal fill) · **Watch campaign** (frost outline).

### Closing band `#atelier`

Pearl section **after the pin releases**. Headline "Fashion that breaks the scroll." Grid of 4 meta cards + **Request a campaign kit**.

---

## Motion numbers (GOLD - preserve)

| Item | Spec |
|------|------|
| Aim track | **12** viewports. Raw 1:1. No wheel gain. Halfway beat ~5–6 scrolls. |
| PSAVE rate | **1.2x** both directions |
| Reverse | Every **3rd** 24fps frame (`0.125s`) on the live video |
| Live window | **280ms** |
| Lift | Dest floor **0.55s** + rate ease **0.55s** + flip deadzone **32px** |
| Chapter enter | revelFade 0.65s / revelRise 0.85s, y 28→0, cubic-bezier(0.22,1,0.36,1) |
| Inputs | wheel / trackpad / touch / Arrow/Page/Space (destination only) |
| Reduced motion | static ~0.45 progress frame |

---

## Accessibility

- Semantic header / section / h1  
- Video `aria-hidden` when copy is complete  
- Focusable CTAs with visible focus  
- Pin consumes wheel/touch while the journey runs; **releases** at ends so the atelier can continue. Do not trap Space on focused links.  
- `prefers-reduced-motion` respected  

---

## Content slots

| Slot | Default |
|------|---------|
| brand | REVEL |
| chapter1 title | She lived / inside the glow. |
| chapter2 title | Then something / had to give. |
| chapter3 title | Shards of / attention fall. |
| chapter4 title | Now she / owns the room. |
| cta_primary | Shop the drop |
| cta_secondary | Watch campaign |
| nav_cta | Enter atelier |

---

## Expected output

1. `RevelScrollNarrative.tsx` - default export, `"use client"`  
2. Pin-until-complete PSAVE (scroll aims, film walks, no frame jumps)  
3. Four chapters + progress + scroll cue driven by the **picture**  
4. Light pearl + rose-gold system  
5. Closing atelier band **after the picture arrives and the pin releases**  
6. Reduced-motion path  
7. **No tall multi-vh page track.** **No seek-scrub.** **No GSAP / wheel-gain dump.**  

---

## Hard constraints

- Implement **only** this brief.  
- **Do not** clone Meridian gold-coast dark theme.  
- **Do not** use external CDN video URLs.  
- **Do not** invent ClickMotion / MS host chrome.  
- **Do not** rebuild as a tall sticky scroll track.  
- **Do not** seek the playhead across a jump. Map raw wheel **1:1** onto the **12** viewport aim track (destination only).  
- **Do not** copy Vertex wheel gain `0.22` or old Revel seek-scrub `0.11` / `0.035` / `0.09` / GSAP lag `0.55`. Revel gold is **PSAVE on 12 vh** with leftover dest floor **0.55s**.  
- **Do not** pause on the last wheel tick. The stop is friction, then a graceful slowdown.  

---

## What to tell your AI

```
Build REVEL from this prompt (and the Revel package PDF if you have it).
There is no files zip and no START-HERE folder.
Use /assets/videos/revel-breakout-v1.mp4 (or the video URL in the PDF).
Implement PSAVE (Perfect Scroll Video Engine) as pin-until-complete: one 100dvh stage. Scroll aims on 12 viewports.
Down-scroll plays the film forward at 1.2x. Up-scroll plays it backward every 3rd frame at the same 1.2x. Never jump a frame.
When they stop, leftover dest plus a 0.55s dest floor keeps the film going a little, then rate eases to a stop. Ignore tiny opposite ticks.
The film is slow then a kick. Halfway (she leaves the phone) takes about 5 or 6 scrolls. Do not flatten the edit.
Copy and the rose bar follow the picture. Release only when the picture arrives. After release the page owns the atelier.
If you change the video, re-encode GOP 3, no B-frames, crf 16, then wire that file.
Do not import ScrollTrigger. Do not seek currentTime across a jump. Do not build a tall multi-vh track.
```

## Package notes (operators)

- Opaque: `r7v3l9k2mx4q` · PaidSalt: `rv8n3p`
- Pack mode: **PDF-only** (peer: Vertex). No `files/` folder, no files zip
- Client HD: `/assets/videos/revel-breakout-v1.mp4` · poster `/assets/posters/revel-breakout-v1.webp`
- Storefront: `revel-scroll-preview-v1.mp4` + FS `revel-scroll-preview-fs-v1.mp4`
- Pin gold: PSAVE · 12 vh · 1.2x · 3-frame reverse · 280ms live · 0.55s dest floor + rate ease · 32px bounce ignore · GOP 3
- Method spec (operators): `docs/PSAVE.md` §5A / §5B / §9.1
- Demo: `/demo/cleanroom-revel` (do not overflow-hidden the page)
- PSAVE lock: 2026-08-14 · earn + lift lock: 2026-08-14

ClickMotion · www.ClickMotion.dev
