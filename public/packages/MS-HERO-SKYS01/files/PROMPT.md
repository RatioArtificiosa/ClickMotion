# SkySpires - AI build prompt

**Product:** SkySpires (sunrise scroll hero)  
**SKU:** MS-HERO-SKYS01  
**Brand:** ClickMotion · www.ClickMotion.dev  
**Version:** 2.1.0

You are an expert front-end engineer. Build this hero **exactly** as specified using **only the files in this pack**. Prefer integrating `source/SkySpiresHero.tsx`, `source/hero.css`, and `source/copy.ts` over rewriting from scratch. Do not invent a different interaction. Do not reduce it to wallpaper loop, seek-scrub, or a tall sticky track.

---

## User will say

> Build SkySpires using the files in this folder. Read PROMPT.md and follow it exactly.

---

## What you are building

A full-viewport **design-studio** hero:

1. One **pinned `100dvh` stage** in normal document flow. Sunrise film full-bleed under a frost liquid-glass HUD.
2. **Dual process = PSAVE + No Scroller.**
   - **No Scroller (pin-until-complete):** the page does not physically scroll during the journey. Wheel / trackpad / touch / keys drive virtual progress only.
   - **PSAVE (Perfect Scroll Video Engine):** scroll aims a destination on **12 viewports**. Down plays the **whole** film **forward** at 1.2x. Up plays it **backward** at the same 1.2x, exactly one 3-frame step per seek. Never jump a frame. When they lift, leftover dest plus a 0.55s dest floor keeps the film going a little, then rate eases to a stop.
3. Frost HUD stays alive: nav, editorial title, CTAs, stats list then gauge, process dock, scroll cue. CSS / interval loops keep running while the film chases.
4. **Pin freeing (mandatory):** after the picture arrives at 1 + down, the **page owns** wheel / touch / keys until the stage docks (`getBoundingClientRect().top >= -2`). Pointer on the next sibling never drives the film.
5. Capture helper: `window.__msScrollNarrative = { setProgress, getProgress, getTarget, pageOwns, productId: "MS-HERO-SKYS01" }`. Root: `data-skyspires-drive="psave"` · `data-product="MS-HERO-SKYS01"`. After release: `data-skyspires-owns="page"`.
6. No GSAP. No tall track. No Nexora. No filament.

**Hard ban:** GSAP ScrollTrigger pin + scrub.  
**Hard ban:** a 12 vh **document spacer** (that number is virtual earn only).  
**Hard ban:** seeking `currentTime` across a jump.  
**Hard ban:** `overflow: hidden` on the host page.  
**Hard ban:** installing `gsap`.  
**Hard ban:** retuning `.lg-fill` / `.lg-spec` on dock, CTA, Log In, or stats.  
**Hard ban:** restoring filament, colored step boxes, purple S, Lab · hero, CTA wrap-flash.

---

## Files to use

```
START-HERE.md
PROMPT.md
CUSTOMIZATION.md
VIDEO_GEN_PROMPT.md
assets/
  skyspires-sunrise-v1.mp4
  skyspires-sunrise-v1.webp
source/
  SkySpiresHero.tsx
  hero.css
  copy.ts
```

Place media:

- `public/assets/videos/skyspires-sunrise-v1.mp4`
- `public/assets/posters/skyspires-sunrise-v1.webp`

### Stack

| Package | Role |
|---------|------|
| React + TypeScript | Hero |
| `lucide-react` | Line icons (optional) |
| `tailwindcss` | Optional. Isolated CSS in `hero.css` is required |

Do **not** install `gsap` or `lenis`.

---

## Asset contract

| Field | Value |
|-------|--------|
| Film | `/assets/videos/skyspires-sunrise-v1.mp4` (pack: `assets/skyspires-sunrise-v1.mp4`) |
| Poster | `/assets/posters/skyspires-sunrise-v1.webp` (pack: `assets/skyspires-sunrise-v1.webp`) |
| Duration | 25.04s silent |
| Encode | H.264, GOP 3, no B-frames, 24fps, 201 I / 400 P / 0 B, ~18 MB |
| Attributes | muted playsInline preload auto. **No** wallpaper loop. **No** autoPlay as primary mode |
| Time | PSAVE two clocks: destination (gestures) vs playhead (decoded picture) |

### REQUIRED film subject

- Cinematic sunrise / sky architecture
- Even time. The whole movie plays
- No readable UI text, logos, or watermarks

### FORBIDDEN

- Nexora / NEXORĀ naming
- Process filament, colored step boxes, icon tints
- Tall sticky track + GSAP ScrollTrigger
- Seeking `currentTime` across a jump
- Installing `gsap`
- Using storefront preview videos as the hero
- Em dashes in customer-facing copy

---

## Design system

| Token | Value |
|-------|--------|
| Ink | `#f7f3ec` |
| Mist | `rgba(236, 242, 250, 0.78)` |
| Gold | `#e8c48a` / edge `#f6e2a8` |
| Peach | `#f0b090` |
| Violet | `#8b7cff` |
| Sky right | `3.2%` (Log In flush to stats) |
| Display | Playfair Display 500. CSS var `--font-sky-display` |
| Body | Outfit 300-500. CSS var `--font-sky-body` |

Glass lock: do not retune `.lg-fill` / `.lg-spec` on dock, CTA, Log In, stats. Distortion filter exists in the DOM and is not applied to those panes. Stats side edges stay `#f6e2a8`, 2px, static.

### Default copy (exact)

| Slot | Text |
|------|------|
| Brand | SkySpires |
| Nav | Home · About · Process · Community · News · Students · Contact |
| H1 | Design / without / limits. |
| Kicker | AI-Powered Design Studio |
| Body | We blend human creativity with artificial intelligence to build digital experiences that inspire and perform. |
| Primary CTA | Start Your Project |
| Secondary | See Case Studies |
| Stats | 987+ Projects · 98% Client Satisfaction · 28+ Years |
| Rings | 98% NPS · 28+ Years · 987+ Projects |
| Dock | Strategy · Design · Develop · Launch |

---

## Motion law (dual process - mandatory)

```
const VIRTUAL_VIEWPORTS = 12;  // GOLD: 25.04s even sunrise. Not Elyse 3.6.
const PSAVE_RATE = 1.2;
const PSAVE_FRAME = 1 / 24;    // this film is 24fps
const PSAVE_REV_STRIDE = 3;
const PSAVE_LIVE_MS = 280;
const PSAVE_COAST_SEC = 0.55;
const PSAVE_EASE_SEC = 0.55;
const PSAVE_FLIP_DEADZONE_PX = 32;
```

### Two clocks

| Clock | Who writes it | Who reads it |
|-------|----------------|--------------|
| Destination 0-1 | Gestures, 1:1 on the 12 vh track | Chase loop only |
| Playhead 0-1 | Decoded picture (`currentTime / duration`) | Release only |

The destination may leap. The picture may not. HUD CSS loops do not follow either clock. They keep running.

### HUD clocks (independent)

| Clock | Period |
|-------|--------|
| CTA | 12.5s (scale 0-2s, gold trip ~5-11.5s, fade 880-890) |
| Dock sheen | 6.4s LTR |
| Dock gold trip | 12s (one lap, wait, loop) |
| Stats list | 10s then gauge |
| Rings | 2.8s |
| CDMX clock | 15s |

Video 25.04s is **not** synced to the CTA (accepted residual).

### Rebuild algorithm

1. Render **one `100dvh` stage** in normal document flow. Do not `overflow: hidden` the page. Do not use `position: sticky`. Do not build a tall spacer.
2. Gestures add `deltaPx / (12 * innerHeight)` to **destination only**. Raw 1:1. No wheel gain.
3. Wheel (`passive: false`): ignore ctrl/meta zoom; normalize `deltaMode`; one apply per frame; `preventDefault` only while the pin owns the gesture.
4. Touch and keys are destination-only on the same track.
5. **Down:** muted `play()` at `playbackRate 1.2`. After lift, if dest is closer than 0.55s of film, push dest ahead. Ease rate toward ~0.42 over the last 0.55s of leftover dest.
6. **Up:** first **real** opposite gesture snaps dest onto the picture. Ignore opposite ticks under 32px. Walk `currentTime` backward exactly one 3-frame step per seek. Wait `seeked`. Never seek to the stop point.
7. HUD sheen, gold trip, stats, rings, and clock keep looping. Do not pause them when the film chases.
8. Release only when the **picture** is at 0+up or 1+down. Then `pageOwns` until the stage docks (`top >= -2`).
9. Reduced motion: poster + static HUD. No chase.
10. Root marker: `data-skyspires-drive="psave"`. After release: `data-skyspires-owns="page"`.
11. Capture helper: `window.__msScrollNarrative = { setProgress, getProgress, getTarget, pageOwns, productId: "MS-HERO-SKYS01" }`.

### Why 12 viewports

This film is **even** sunrise time and **25 seconds long**. Elyse (10s) locks at 3.6. Two 1800px flicks on 3.6 dump dest. On 12, those flicks aim about one third of the film. Do not copy 3.6.

---

## Layout

- Stage 100vw × 100vh. Overflow hidden on the **stage only**. Film cover, object-position 50% 52%.
- Top nav: SKYSPIRES (no S icon), seven links, chevron on Process only, Sign Up / Log In. `--sky-right: 3.2%`.
- Left copy: kicker, two-line H1, body, dual CTAs.
- Right stats: list 10s then gauge.
- Bottom dock: four neutral frost steps, sheen, one gold trip.
- Tailwind preflight: use `button.sky-cta`, `button.sky-login`, `a.sky-mark` so resets do not flatten the HUD.

---

## Responsive (5 breakpoints)

| Breakpoint | Behavior |
|------------|----------|
| ≥1280px | Full nav, large display, stats, dock |
| ≥1100px | Full HUD |
| <1100px | Tighter type; stats narrower |
| <820px | Hide center nav and stats; dock 2x2; **stage still one viewport** |
| Reduced motion | 100vh static; poster + HUD; no chase |

---

## Accessibility

- Semantic section / header / nav / h1
- Focus rings violet on frost
- `prefers-reduced-motion`: still + HUD. No PSAVE
- Video decorative (`aria-hidden`)
- Pin consumes gestures while the journey runs; **releases** at ends
- Do not trap keyboard focus. Do not trap Space on focused links

---

## Performance

- Playhead chase only (no GSAP, no Framer, no ScrollTrigger)
- Single video element
- HUD CSS + two intervals
- Fonts display swap
- Client film GOP 3 / no B-frames
- Prefer WebP poster

---

## Film encode (if you change the video)

```
ffmpeg -y -i your-film.mp4 -an -c:v libx264 -pix_fmt yuv420p -preset medium -crf 18 -g 3 -keyint_min 3 -bf 0 -sc_threshold 0 -movflags +faststart skyspires-sunrise-v1.mp4
```

A long-GOP export will stall mid-reverse. Keep `PSAVE_FRAME = 1/fps`.

---

## AI tool instructions

1. Open this pack folder. You should see START-HERE.md at the top level.
2. Read **PROMPT.md** exactly.
3. Place `assets/skyspires-sunrise-v1.mp4` and `.webp` at the public paths in START-HERE.
4. Use `source/SkySpiresHero.tsx`, `source/hero.css`, and `source/copy.ts`.
5. Do **not** install gsap. Wire Playfair Display + Outfit.
6. Mount hero on a page that is **not** `overflow: hidden`.
7. Verify: no physical page scroll during the journey; HUD loops stay; glass fills unchanged; pin frees after last frame.
8. Restage with CUSTOMIZATION.md.

---

## Expected output (12 checks)

1. Full-viewport frost HUD over the sunrise film
2. Pinned 100dvh stage (no tall track)
3. Page does not physically scroll during the journey
4. PSAVE: aim 12 vh, 1.2x forward, reverse every 3rd frame, leftover dest + 0.55s floor
5. Picture never jumps a frame. The **whole** film plays
6. HUD sheen, gold trip, stats, rings keep looping
7. Glass fills on dock / CTA / Log In / stats unchanged
8. After last frame, host page may continue. Page owns until dock
9. Reduced-motion: poster + HUD
10. Local film + poster paths resolve
11. No storefront chrome in the client build
12. No Nexora. No filament. Token lock holds

## Confirm after build

- Page scrollY stays 0 while two desktop flicks advance dest
- Tiny wheel click creeps a few frames (no jump)
- Lift mid-film: film keeps going a little, then eases to a stop
- Scroll up: film walks backward every 3rd frame
- After the last frame, one more down-scroll moves the host page
- HUD loops never freeze
- Reduced motion shows poster + HUD

## After it works

Open CUSTOMIZATION.md. Restage brand, copy, tokens, and film one request at a time.

ClickMotion · www.ClickMotion.dev
