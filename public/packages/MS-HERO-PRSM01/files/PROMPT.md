# PRISM - AI build prompt

**Product:** PRISM (liquid glass multi-panel identity hero)  
**Product ID:** MS-HERO-PRSM01  
**Brand:** ClickMotion · www.ClickMotion.dev  
**Version:** 2.0.0

You are an expert front-end engineer. Build this hero **exactly** as specified. Do not invent a different interaction. Do not reduce it to wallpaper loop, seek-scrub, or a tall sticky track. Do not collapse to a left-column-only layout.

---

## User will say

> Build PRISM using the files in this folder. Read PROMPT.md and follow it.

---

## What you are building

A full-viewport **creative identity studio** hero:

1. Multi-face sculpture film full-bleed under soft studio-mist atmosphere.
2. **Dual process = PSAVE + No Scroller.**
   - **No Scroller (pin-until-complete):** one `100dvh` stage. The page does not physically scroll during the journey. Wheel / trackpad / touch / keys drive virtual progress only.
   - **PSAVE (Perfect Scroll Video Engine):** scroll aims a destination on **12 viewports**. Down plays the film **forward** at 1.2x. Up plays it **backward** at the same 1.2x, exactly one 3-frame step per seek. Never jump a frame. When they lift, leftover dest plus a 0.55s dest floor keeps the film going a little, then rate eases to a stop.
3. Liquid-glass panels of many sizes on **both left and right** (chips, metrics, stats, profile, quotes, features, CTA). Three acts: Atelier / Proof / Invite.
4. After the last frame, a dark `#atelier` band may scroll in.
5. No GSAP. No 520vh sticky. No left-only dump.

Prefer integrating `source/PrismLiquidGlass.tsx` over rewriting.

---

## Asset contract

| Field | Value |
|-------|--------|
| Film | `/assets/videos/prism-faces-v1.mp4` (pack: `assets/prism-faces-v1.mp4`) |
| Poster | `/assets/posters/prism-faces-v1.webp` (pack: `assets/prism-faces-v1.webp`) |
| Duration | 47.63s silent |
| Encode | H.264, GOP 3, no B-frames, 24fps, 1143 frames, 381 I / 762 P / 0 B, ~126 MB |
| Attributes | muted playsInline preload auto. **No** wallpaper loop. **No** autoPlay as primary mode |
| Time | PSAVE two clocks: destination (gestures) vs playhead (decoded picture) |

### REQUIRED film subject

- Centered multi-face identity sculpture (stone, porcelain, iridescent paint)
- Empty left and right thirds for glass
- Soft cool-gray studio mist. No readable UI, logos, or watermarks

### FORBIDDEN

- Left-locked single portrait filling the frame
- Neon SaaS chrome, purple mesh, emoji
- 520vh sticky track + GSAP ScrollTrigger scrub
- Seeking `currentTime` across a jump
- Installing `gsap`
- Backend / storefront / admin language
- Using storefront preview videos as the hero
- Left-column-only layout

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
| Display | Syne 600-700, tracking tight |
| Body | DM Sans 400-600, 11-14px |
| Progress | violet → fuchsia → cyan hairline |

### Default chrome

| Slot | Text |
|------|------|
| Brand | PRISM |
| Kicker | Identity studio |
| Nav | Work · Approach · Atelier · Journal |
| Nav CTA | Book intro |
| Moments | Atelier (0-0.34) · Proof (0.34-0.66) · Invite (0.66-1) |
| Atelier kicker | Prism Atelier |
| Atelier h2 | Identity for brands / with many faces. |
| Atelier CTAs | Book a studio intro · View selected work |

### Default panels (playhead 0-1)

**Atelier**
- chip-live left silk 0.02-0.3: Now booking
- metric-brands right silk 0.04-0.32: 48 / Brands shaped
- feature-open left mercury 0.00-0.34: Identity studio / Your brand has more than one face. / We design systems that hold every expression of you - campaign, product, and culture - without losing the core.
- stat-cities right ice 0.08-0.36: 12 / Cities / Global campaign launches

**Proof**
- quote-client right mercury 0.28-0.58: They saw every side of us. / Prism built a visual language our audience finally recognized as whole - fierce, soft, and unmistakably ours.
- profile-iris left ice 0.30-0.58: Iris Vale / Creative Director / Prism Atelier
- chip-drop left silk 0.34-0.62: Spring drop live
- chip-awards right silk 0.36-0.64: Awwwards jury
- stat-retention left ice 0.40-0.64: 94% / Client return / Year-over-year retainers
- feature-mid right mercury 0.42-0.68: What we ship / Systems, not one-offs. / Brand films, digital experiences, and identity kits built to scale from first look to global rollout.

**Invite**
- metric-years left silk 0.64-0.94: 9 / Years open
- feature-close left mercury 0.66-1.01: Next season / Bring your story into the light. / Limited studio slots for brands ready to show every face of who they are - with clarity and courage.
- quote-close right ice 0.64-0.96: Quiet confidence. / The work does not shout. It holds the room - and invites people closer.
- cta-book right mercury 0.70-1.01: Start a project / Book a studio intro / Thirty minutes. Your brief. Our eyes on the work. / Request a slot
- chip-nyc left silk 0.76-1.01: NYC · remote
- stat-weeks right silk 0.78-1.01: 6 wk / Avg. kickoff / From brief to first film

Panel fade 0.045. Enter from the side 36px + 10px rise. Follow the **playhead**.

---

## Motion law (dual process - mandatory)

```
const VIRTUAL_VIEWPORTS = 12;  // GOLD: 47.63s even faces. Not Elyse/Vertex 3.6. Not old 520vh.
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
| Playhead 0-1 | Decoded picture (`currentTime / duration`) | Panels, moment pill, violet bar, release |

The destination may leap. The picture may not.

### Rebuild algorithm

1. Render **one `100dvh` stage** in normal document flow. Next sibling is `#atelier`. Do not `overflow: hidden` the page. Do not use `position: sticky`. Do not build a 520vh spacer.
2. Gestures add `deltaPx / (12 * innerHeight)` to **destination only**. Raw 1:1. No wheel gain.
3. Wheel (`passive: false`): ignore ctrl/meta zoom; normalize `deltaMode`; one apply per frame; `preventDefault` only while the pin owns the gesture.
4. Touch and keys are destination-only on the same track.
5. **Down:** muted `play()` at `playbackRate 1.2`. After lift, if dest is closer than 0.55s of film, push dest ahead. Ease rate toward ~0.42 over the last 0.55s of leftover dest.
6. **Up:** first **real** opposite gesture snaps dest onto the picture. Ignore opposite ticks under 32px inside the live window. Walk `currentTime` backward exactly one 3-frame step per seek. Wait `seeked`. Never seek to the stop point.
7. Glass panels, moment pill, violet bar follow the **playhead**.
8. Release only when the **picture** is at 0+up or 1+down. Then `pageOwns` until the stage docks at the top so `#atelier` can scroll in.
9. Opening: kick-seek `0.04 → 0`, wait `seeked`.
10. Reduced motion: playhead 0.42 (readable mid composition). No chase.
11. Root marker: `data-prism-drive="psave"`.
12. Capture helper: `window.__msScrollNarrative = { setProgress, getProgress, getTarget, productId: "MS-HERO-PRSM01" }`.

### Why 12 viewports

This film is **even** faces time and **47.63 seconds long**. Elyse (10s) and Vertex (12s) lock at 3.6. Two 1800px flicks on 3.6 dump dest past Invite. On 12, those flicks aim about one third of the film. The visitor earns every face. Same number as Still and Revel, different reason (length, not a kick). Do not copy 3.6. Do not restore 520vh.

### Hard bans

- `520vh` / GSAP `ScrollTrigger` / scrub 0.55
- `WHEEL_GAIN` / swipe cap / `video.currentTime = dest * duration` on a large delta
- Releasing because destination hit 1 while the picture is still walking
- Low-res canvas reverse buffer
- `playbackRate = -1`
- Wallpaper loop as primary
- Installing `gsap`
- Left-column-only layout

---

## Layout

- Stage: 100dvh, overflow hidden on the **stage**, studio-mist canvas under the film
- Video absolute cover, object-fit cover. No CSS zoom or blur on the film
- Side atmosphere (violet/cyan edge wash + top/bottom vignette). NEVER grey-wash the sculpture
- Top header: PRISM wordmark left; Identity studio; desktop nav Work, Approach, Atelier, Journal; right Book intro glass pill
- Violet-to-cyan progress hairline under the header (`transform: scaleX(playhead)`, origin left, DOM ref every tick)
- Top-center moment pill: Atelier / Proof / Invite
- Both-side multi-panel field on `sm+`. Mobile: one mercury strip at the bottom
- `#atelier` next sibling, dark `#0E1016`, after picture-gated release
- Safe side insets. Hide nav links under `md`. Hide multi-panel field under `sm`

### Liquid glass (mandatory)

1. SVG filters once: `#glass-distortion` (Ice Ripple, seed 92, scale 65) and `#glass-distortion-mercury` (scale 120)
2. Host isolation + outer glow
3. FX layer: frost blur + saturate + distortion
4. Dual reflection washes
5. Content plate: white type + text-shadow
6. Tiers: silk / ice / mercury
7. `prefers-reduced-transparency`: solid elevated plates

---

## Stack

React + TypeScript + Tailwind. **No GSAP. No ScrollTrigger. No Three.js.**

Load Syne + DM Sans with `display: swap`. Prefer CSS variables `--font-prism-display` and `--font-prism-sans`.

Fonts via next/font example:

```tsx
const display = Syne({ subsets: ["latin"], weight: ["500","600","700"], variable: "--font-prism-display", display: "swap" });
const sans = DM_Sans({ subsets: ["latin"], weight: ["400","500","600"], variable: "--font-prism-sans", display: "swap" });
```

---

## Responsive

| Breakpoint | Behavior |
|------------|----------|
| ≥1280px | Full nav, both-side multi-panel field |
| ≥640px (`sm`) | Multi-panel field visible |
| <640px | Hide multi-panel field; one mercury strip; **stage still one viewport** |
| ≤390px | Tighter type; Book intro stays |
| Reduced motion | Playhead 0.42; no chase |
| Reduced transparency | Solid plates; no SVG distortion |

---

## Accessibility

- Semantic header / nav / section
- Focus rings violet
- White on darkened glass contrast intent
- `prefers-reduced-motion`: mid composition at 0.42; no PSAVE
- Video decorative (`aria-hidden`)
- Pin consumes wheel/touch/keys while the journey runs; **releases** at ends
- Do not trap keyboard focus. Do not trap Space on focused links

---

## Performance

- Playhead chase only (no GSAP, no Framer)
- Single video element; decode readiness on metadata
- Progress bar transform via DOM ref
- Fonts display swap
- One viewport stage (no tall spacer DOM)
- Client film GOP 3 / no B-frames
- Prefer WebP poster
- SVG filters once

---

## Film encode (if you change the video)

```
ffmpeg -y -i your-film.mp4 -an -c:v libx264 -pix_fmt yuv420p -preset slow -crf 16 -g 3 -keyint_min 3 -bf 0 -sc_threshold 0 -movflags +faststart prism-faces-v1.mp4
```

A long-GOP export will stall mid-reverse. Do not extract PNG frames. See VIDEO_GEN_PROMPT.md.

---

## AI tool instructions

1. Open this pack folder. You should see START-HERE.md at the top level.
2. Read **PROMPT.md** exactly.
3. Place `assets/prism-faces-v1.mp4` and `.webp` at the public paths in START-HERE.
4. Use `source/PrismLiquidGlass.tsx`.
5. Do **not** install gsap. Wire fonts.
6. Mount hero on a page that is **not** `overflow: hidden`.
7. Verify: no physical page scroll during the journey; tiny click creeps; fling plays; lift coasts; reverse walks; both-side glass; atelier after last frame.
8. Restage with CUSTOMIZATION.md. Optional new film: VIDEO_GEN_PROMPT.md, then GOP-3 remaster.

Cursor / Claude / Grok Build: prefer pack source. Lovable / Bolt: single file OK if PSAVE + No Scroller and both-side glass stay intact.

---

## Expected output (12 checks)

1. Full-viewport studio-mist identity hero
2. Pinned 100dvh stage (no 520vh track)
3. Page does not physically scroll during the journey
4. PSAVE: aim 12 vh, 1.2x forward, reverse every 3rd frame, leftover dest + 0.55s floor on lift
5. Picture never jumps a frame
6. Liquid glass on both sides + moment pill + violet bar follow the picture
7. `#atelier` band after last frame
8. No gsap. No 520vh sticky. No left-column-only dump
9. After last frame, host page may continue
10. Reduced-motion: playhead 0.42
11. Local film + poster paths resolve
12. No storefront chrome in the client build

ClickMotion · www.ClickMotion.dev
