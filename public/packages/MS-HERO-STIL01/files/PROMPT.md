# STILL - AI build prompt

**Product:** STILL (mindfulness scroll narrative hero)  
**Product ID:** MS-HERO-STIL01  
**Brand:** ClickMotion · www.ClickMotion.dev  
**Version:** 2.0.0

You are an expert front-end engineer. Build this hero **exactly** as specified. Do not invent a different interaction. Do not reduce it to wallpaper loop, seek-scrub, hybrid idle, or a tall sticky track.

---

## User will say

> Build STILL using the files in this folder. Read PROMPT.md and follow it.

---

## What you are building

A full-viewport **mindfulness / mental wellness** hero:

1. Cosmic transformation film (arid desert → green life → lush cosmos) full-bleed under soft night **edge** scrims.
2. **Dual process = PSAVE + No Scroller.**
   - **No Scroller (pin-until-complete):** one `100dvh` stage. The page does not physically scroll during the journey. Wheel / trackpad / touch / keys drive virtual progress only.
   - **PSAVE (Perfect Scroll Video Engine):** scroll aims a destination on **12 viewports**. Down plays the film **forward** at 1.2x. Up plays it **backward** at the same 1.2x, exactly one 3-frame step per seek. Never jump a frame. When they lift, leftover dest plus a 0.55s dest floor keeps the film going a little, then rate eases to a stop.
3. Five chapter overlays with Calm/Headspace-class copy, chapter markers, mint progress line, floating whispers.
4. End chapter reveals dual CTAs + quiet stats.
5. No center ring. No mode chip. No 5s idle free-play. No GSAP.

Prefer integrating `source/StillMindfulnessHero.tsx` over rewriting.

---

## Asset contract

| Field | Value |
|-------|--------|
| Film | `/assets/videos/still-cosmos-v1.mp4` (pack: `assets/still-cosmos-v1.mp4`) |
| Poster | `/assets/posters/still-cosmos-v1.webp` (pack: `assets/still-cosmos-v1.webp`) |
| Duration | 30.00s silent |
| Encode | H.264, GOP 3, no B-frames, 24fps, 720 frames, 240 I / 480 P / 0 B, ~81.5 MB |
| Attributes | muted playsInline preload auto. **No** wallpaper loop. **No** autoPlay as primary mode |
| Time | PSAVE two clocks: destination (gestures) vs playhead (decoded picture) |

### REQUIRED film subject

- Transformation arc: dry desert → greening → lush cosmic landscape
- Lone figure optional; no readable UI text, logos, or watermarks
- Warm teal / mint cosmos grade, night sky, planets

### FORBIDDEN

- Generic stock office meditation only
- Neon SaaS chrome, purple mesh, emoji
- Hybrid Option A (5s idle free-play + reclaim scrollTo)
- Tall 960vh sticky track + GSAP ScrollTrigger
- Seeking `currentTime` across a jump
- Installing `gsap`
- Backend / storefront / admin language
- Using storefront preview videos as the hero

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

### Default copy

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

### Chapter table (playhead 0-1)

| Range | Id | Eyebrow | Titles | Whisper |
|-------|----|---------|--------|---------|
| 0-0.14 | arrive | Mindfulness · Sleep · Live programs | Soften. / Begin again. | Breathe in |
| 0.14-0.34 | arid | For the days that feel dry | When your mind / never lands. | Unclench |
| 0.34-0.56 | soften | Small practices · Real change | Softness / is a skill. | Ease |
| 0.56-0.78 | bloom | Daily calm · Night rest | Grow into / your quiet. | Expand |
| 0.78-1.01 | sky | A quieter way to live | Come home / to yourself. | Return |

Bodies:
1. A private practice for a louder world. Guided calm, deeper sleep, and in-person retreats when you are ready.
2. Stress less with short sessions that meet you where you are. No perfect breath required. No judgment.
3. Evidence-backed mindfulness and wind-downs you can finish in minutes. Build the habit that holds you.
4. Ten minutes can reset a morning. A night program can return your sleep. You choose the pace.
5. Less noise in your chest. Clearer mornings. Sleep that actually restores you. The calm you feel here is meant to follow you into the rest of your day.

---

## Motion law (dual process - mandatory)

```
const VIRTUAL_VIEWPORTS = 12;  // GOLD: 30s even cosmos. Not Elyse/Vertex 3.6. Not old 960vh.
const PSAVE_RATE = 1.2;
const PSAVE_FRAME = 1 / 24;
const PSAVE_REV_STRIDE = 3;    // reverse step = 0.125s
const PSAVE_LIVE_MS = 280;
const PSAVE_COAST_SEC = 0.55;
const PSAVE_EASE_SEC = 0.55;
const PSAVE_FLIP_DEADZONE_PX = 32;
```

### Two clocks

| Clock | Who writes it | Who reads it |
|-------|----------------|--------------|
| Destination 0-1 | Gestures, 1:1 on the 12 vh track | Chase loop only |
| Playhead 0-1 | Decoded picture (`currentTime / duration`) | Copy, mint bar, chapters, whispers, release |

The destination may leap. The picture may not.

### Rebuild algorithm

1. Render **one `100dvh` stage** in normal document flow. Do not `overflow: hidden` the page. Do not use `position: sticky`. Do not build a 960vh spacer.
2. Gestures add `deltaPx / (12 * innerHeight)` to **destination only**. Raw 1:1. No wheel gain.
3. Wheel (`passive: false`): ignore ctrl/meta zoom; normalize `deltaMode`; one apply per frame; `preventDefault` only while the pin owns the gesture.
4. Touch and keys are destination-only on the same track.
5. **Down:** muted `play()` at `playbackRate 1.2`. After lift, if dest is closer than 0.55s of film, push dest ahead. Ease rate toward ~0.42 over the last 0.55s of leftover dest.
6. **Up:** first **real** opposite gesture snaps dest onto the picture. Ignore opposite ticks under 32px inside the live window. Walk `currentTime` backward exactly one 3-frame step per seek. Wait `seeked`. Never seek to the stop point.
7. Copy, chapters, whispers, mint bar follow the **playhead**.
8. Release only when the **picture** is at 0+up or 1+down. Then `pageOwns` until the stage docks at the top.
9. Opening: kick-seek `0.04 → 0`, wait `seeked`, fade `.is-ready`.
10. Reduced motion: poster + chapter 1. No chase.
11. Root marker: `data-still-drive="psave"`.
12. Capture helper: `window.__msScrollNarrative = { setProgress, getProgress, getTarget, productId: "MS-HERO-STIL01" }`.

### Why 12 viewports

This film is **even** cosmos time and **30 seconds long**. Elyse (10s) and Vertex (12s) lock at 3.6. Two 1800px flicks on 3.6 dump dest past the last chapter. On 12, those flicks aim about one third of the film (~10s of picture). The visitor earns the lush valley. Do not copy 3.6. Do not restore 960vh.

### Hard bans

- Hybrid Option A / `STILL_IDLE_MS = 5000` / "Breathing with you" mode chip
- `TRACK_VH = 960` / GSAP `ScrollTrigger` / scrub 0.45
- `WHEEL_GAIN` / swipe cap / `video.currentTime = dest * duration` on a large delta
- Releasing because destination hit 1 while the picture is still walking
- Low-res canvas reverse buffer
- `playbackRate = -1`
- Wallpaper loop as primary
- Installing `gsap`

---

## Layout

- Stage: 100dvh, overflow hidden on the **stage**, night canvas under the film
- Video absolute cover, object-fit cover. No CSS zoom or blur on the film
- Dual edge scrims only (left type field + bottom vignette). NEVER grey-wash the entire frame
- Top header: STILL wordmark left; desktop nav Practice, Sleep, Stress, Retreats; right Sign in (glass) + Begin free (mint solid)
- Mint-to-violet progress hairline under the header (`transform: scaleX(playhead)`, origin left, DOM ref every tick)
- **No mode chip**
- Floating whisper words (one per chapter), soft mint when active
- Bottom content: chapter eyebrow, two-line display H1, body. Right-side chapter markers 01-05 on desktop
- Final chapter: dual CTAs Start free session + Explore programs. Three quiet stats
- Safe horizontal padding at least about 2rem. Hide center nav under 768px. Stack CTAs on small screens

---

## Stack

React + TypeScript + Tailwind. **No GSAP. No ScrollTrigger. No Three.js.**

Load Cormorant Garamond + Inter with `display: swap`. Prefer CSS variables `--font-still-display` and `--font-still-body`.

Fonts via next/font example:

```tsx
const display = Cormorant_Garamond({ subsets: ["latin"], weight: ["400","500","600","700"], variable: "--font-still-display", display: "swap" });
const body = Inter({ subsets: ["latin"], weight: ["300","400","500","600"], variable: "--font-still-body", display: "swap" });
```

---

## Responsive (5 breakpoints)

| Breakpoint | Behavior |
|------------|----------|
| ≥1280px | Full nav, large display type, chapter markers, dual CTA row |
| ≥1024px | Full nav; side-by-side end CTAs |
| ≥768px | Nav links visible |
| <768px | Hide center nav links; stack CTAs; keep safe insets; **stage still one viewport** |
| ≤390px | Tighter type clamp; progress remains; film cover |

---

## Accessibility

- Semantic section / header / nav / h1
- Focus rings mint on night field
- Cream-on-night body contrast intent
- `prefers-reduced-motion`: still frame + chapter 1 only; no PSAVE
- Video decorative (`aria-hidden`)
- Pin consumes wheel/touch/keys while the journey runs; **releases** at ends
- Do not trap keyboard focus. Do not trap Space on focused links

---

## Performance

- Playhead chase only (no GSAP, no Framer)
- Single video element; decode readiness on metadata
- `will-change` only on progress bar transform
- Fonts display swap
- One viewport stage (no tall spacer DOM)
- Client film GOP 3 / no B-frames (not "keyframe every 1-2s")
- Prefer WebP poster

---

## Film encode (if you change the video)

```
ffmpeg -y -i your-film.mp4 -an -c:v libx264 -pix_fmt yuv420p -preset slow -crf 16 -g 3 -keyint_min 3 -bf 0 -sc_threshold 0 -movflags +faststart still-cosmos-v1.mp4
```

A long-GOP export will stall mid-reverse. Do not extract PNG frames. See VIDEO_GEN_PROMPT.md.

---

## AI tool instructions

1. Open this pack folder. You should see START-HERE.md at the top level.
2. Read **PROMPT.md** exactly.
3. Place `assets/still-cosmos-v1.mp4` and `.webp` at the public paths in START-HERE.
4. Use `source/StillMindfulnessHero.tsx`.
5. Do **not** install gsap. Wire fonts.
6. Mount hero on a page that is **not** `overflow: hidden`.
7. Verify: no physical page scroll during the journey; tiny click creeps; fling plays; lift coasts; reverse walks; five chapters; end CTAs.
8. Restage with CUSTOMIZATION.md. Optional new film: VIDEO_GEN_PROMPT.md, then GOP-3 remaster.

Cursor / Claude / Grok Build: prefer pack source. Lovable / Bolt: single file OK if PSAVE + No Scroller stay intact.

---

## Expected output (12 checks)

1. Full-viewport night mindfulness hero
2. Pinned 100dvh stage (no 960vh track)
3. Page does not physically scroll during the journey
4. PSAVE: aim 12 vh, 1.2x forward, reverse every 3rd frame, leftover dest + 0.55s floor on lift
5. Picture never jumps a frame
6. Five chapters + whispers + mint bar follow the picture
7. End CTAs + three stats in the last chapter
8. No mode chip. No 5s idle. No gsap
9. After last frame, host page may continue
10. Reduced-motion: poster + chapter 1
11. Local film + poster paths resolve
12. No storefront chrome in the client build

ClickMotion · www.ClickMotion.dev
