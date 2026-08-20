# Grok Bot - AI build prompt

**Product:** Grok Bot (Las Vegas Sphere scroll hero)  
**SKU:** MS-HERO-GROK01  
**Brand:** ClickMotion · www.ClickMotion.dev  
**Version:** 2.1.0

You are an expert front-end engineer. Build this hero **exactly** as specified using **only the files in this pack**. Prefer integrating `source/GrokBotHero.tsx`, `source/hero.css`, and `source/copy.ts` over rewriting from scratch. Do not invent a different interaction. Do not reduce it to wallpaper loop, seek-scrub, or a tall sticky track.

---

## User will say

> Build Grok Bot using the files in this folder. Read PROMPT.md and follow it exactly.

---

## What you are building

A full-viewport **AI-agent** hero:

1. One **pinned `100dvh` stage** in normal document flow. Las Vegas Sphere film full-bleed under an ice liquid-glass HUD.
2. **Dual process = PSAVE + No Scroller.**
   - **No Scroller (pin-until-complete):** the page does not physically scroll during the journey. Wheel / trackpad / touch / keys drive virtual progress only.
   - **PSAVE (Perfect Scroll Video Engine):** scroll aims a destination on **12 viewports**. Down plays the **whole** film **forward** at 1.2x. Up plays it **backward** at the same 1.2x, exactly one 3-frame step per seek. Never jump a frame. When they lift, leftover dest plus a 0.55s dest floor keeps the film going a little, then rate eases to a stop.
3. Ice HUD stays alive: nav, three-line title, lead, dual CTAs, three proofs, Inbox Bot thread, place line, job ticker. CSS loops (sheen 12.5s, ice trip, marquee, orb) keep running while the film chases.
4. Scroll badge on the black open. Hide it 5 seconds after the first real scroll.
5. **Pin freeing (mandatory):** after the picture arrives at 1 + down, the **page owns** wheel / touch / keys until the stage docks (`getBoundingClientRect().top >= -2`). Pointer on the next sibling never drives the film.
6. Capture helper: `window.__msScrollNarrative = { setProgress, getProgress, getTarget, pageOwns, productId: "MS-HERO-GROK01" }`. Root: `data-grokbot-drive="psave"` · `data-product="MS-HERO-GROK01"`. After release: `data-grokbot-owns="page"`.
7. No GSAP. No tall track. No Optimus. Sphere is setting only.

**Hard ban:** GSAP ScrollTrigger pin + scrub.  
**Hard ban:** a 12 vh **document spacer** (that number is virtual earn only).  
**Hard ban:** seeking `currentTime` across a jump.  
**Hard ban:** `overflow: hidden` on the host page.  
**Hard ban:** installing `gsap`.  
**Hard ban:** cutting the film to a highlight loop.  
**Hard ban:** Optimus / partnership claims. The Sphere is setting only.

---

## Files to use

```
START-HERE.md
PROMPT.md
CUSTOMIZATION.md
VIDEO_GEN_PROMPT.md
assets/
  grokbot-sphere-v1.mp4
  grokbot-sphere-v1.webp
source/
  GrokBotHero.tsx
  hero.css
  copy.ts
```

Place media:

- `public/assets/videos/grokbot-sphere-v1.mp4`
- `public/assets/posters/grokbot-sphere-v1.webp`

### Stack

| Package | Role |
|---------|------|
| React + TypeScript | Hero |
| `lucide-react` | One arrow icon (optional) |
| `tailwindcss` | Optional. Isolated CSS in `hero.css` is required |

Do **not** install `gsap` or `lenis`.

---

## Asset contract

| Field | Value |
|-------|--------|
| Film | `/assets/videos/grokbot-sphere-v1.mp4` (pack: `assets/grokbot-sphere-v1.mp4`) |
| Poster | `/assets/posters/grokbot-sphere-v1.webp` (pack: `assets/grokbot-sphere-v1.webp`) |
| Duration | 62.52s silent |
| Encode | H.264, GOP 3, no B-frames, 25fps, 521 I / 1042 P / 0 B, ~127 MB |
| Attributes | muted playsInline preload auto. **No** wallpaper loop. **No** autoPlay as primary mode |
| Time | PSAVE two clocks: destination (gestures) vs playhead (decoded picture) |

### REQUIRED film subject

- Las Vegas Sphere at dusk/night with a white Grok Bot face on the dome
- City hotels, blue hour. Even time. The whole movie plays
- No readable UI text, logos other than the dome face, or watermarks

### FORBIDDEN

- Optimus / humanoid Tesla robot
- Partnership title cards or xAI claims
- Neon SaaS chrome, purple mesh, emoji
- Tall sticky track + GSAP ScrollTrigger
- Seeking `currentTime` across a jump
- Installing `gsap`
- Backend / storefront / admin language
- Using storefront preview videos as the hero
- Cutting the film to a highlight loop
- Em dashes in customer-facing copy

---

## Design system

| Token | Value |
|-------|--------|
| Ice | `#eef4ff` |
| Amber | `#f0d7a8` |
| Mist | `rgba(232, 238, 248, 0.74)` |
| Mute | `rgba(220, 228, 240, 0.52)` |
| Frost | `rgba(255, 255, 255, 0.045)` (3-6% white) |
| Frost heavy | `rgba(255, 255, 255, 0.062)` |
| Primary 3D | `#0a0c12` |
| Display | Syne 800. CSS var `--font-gb-display` |
| Body | Outfit 300-500. CSS var `--font-gb-body`. Lead line-height 1.55 |
| Blur | thin 12 (nav, proofs, ticker). heavy 18 (thread only) |
| Saturate | 210-250% |
| Sheen | one pass per 12.5s on the 3D primary |
| Ice trip | `--trace-at` 0 to 880, hide at 890 |

Do not drift these tokens.

Fonts via next/font example:

```tsx
const display = Syne({ subsets: ["latin"], weight: ["600","700","800"], variable: "--font-gb-display", display: "swap" });
const body = Outfit({ subsets: ["latin"], weight: ["300","400","500"], variable: "--font-gb-body", display: "swap" });
```

### Default copy (exact)

| Slot | Text |
|------|------|
| Brand | Grok Bot |
| House | SuperGrok Heavy |
| Nav | Product · How it works · Safety · Enterprise |
| Ghost / solid | Sign in · Download |
| Kicker | Early beta |
| H1 | Finish / the / swing. |
| Lead | Always-on agents with their own computer. They sign into the tools you already use, work 24/7, and only come back when something needs you. |
| Primary CTA | Meet your first Bot |
| Secondary CTA | Download for macOS |
| Proofs | Own computer / Jobs do not stall when you step away. · Your stack / CRM, inbox, sites - even tools with no API. · A real team / Bots work in parallel. You are not the middleman. |
| Thread | Close Q3 inbound. / Signed into the CRM. Scoring 142 leads. / 18 drafts ready. Need you on the top five. |
| Ticker | Sales outbound · Inbox to zero · Bug reproduction · New-hire seating · Invoice run · Follow-ups · Marketing campaigns |
| Place | Sphere · Las Vegas |

Keep these strings unless the buyer restages. Official Grok Bot language. The only house hyphen is `sites - even tools`.

---

## Motion law (dual process - mandatory)

```
const VIRTUAL_VIEWPORTS = 12;  // GOLD: 62.5s even Sphere. Not Elyse/Vertex 3.6.
const PSAVE_RATE = 1.2;
const PSAVE_FRAME = 1 / 25;    // this film is 25fps
const PSAVE_REV_STRIDE = 3;    // reverse step = 0.12s
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

### Rebuild algorithm

1. Render **one `100dvh` stage** in normal document flow. Do not `overflow: hidden` the page. Do not use `position: sticky`. Do not build a tall spacer.
2. Gestures add `deltaPx / (12 * innerHeight)` to **destination only**. Raw 1:1. No wheel gain.
3. Wheel (`passive: false`): ignore ctrl/meta zoom; normalize `deltaMode`; one apply per frame; `preventDefault` only while the pin owns the gesture.
4. Touch and keys are destination-only on the same track.
5. **Down:** muted `play()` at `playbackRate 1.2`. After lift, if dest is closer than 0.55s of film, push dest ahead. Ease rate toward ~0.42 over the last 0.55s of leftover dest.
6. **Up:** first **real** opposite gesture snaps dest onto the picture. Ignore opposite ticks under 32px inside the live window. Walk `currentTime` backward exactly one 3-frame step per seek. Wait `seeked`. Never seek to the stop point.
7. HUD sheen, ice trip, marquee, and orb keep looping. Do not pause them when the film chases.
8. Release only when the **picture** is at 0+up or 1+down. Then `pageOwns` until the stage docks at the top (`top >= -2`). Pointer on the next sibling never drives the film.
9. Opening: film starts black. Show a Scroll badge. Hide it 5 seconds after the first real scroll.
10. Reduced motion: poster + static HUD. No chase.
11. Root marker: `data-grokbot-drive="psave"`. After release: `data-grokbot-owns="page"`.
12. Capture helper: `window.__msScrollNarrative = { setProgress, getProgress, getTarget, pageOwns, productId: "MS-HERO-GROK01" }`.

### Why 12 viewports

This film is **even** Sphere time and **62.5 seconds long**. Elyse (10s) and Vertex (12s) lock at 3.6. Two 1800px flicks on 3.6 dump dest past the last beat. On 12, those flicks aim about one third of the film. The visitor earns the Sphere. Do not copy 3.6. Do not flatten the edit.

### Hard bans

- `video.currentTime = dest * duration` on a large delta
- Releasing because destination hit 1 while the picture is still walking
- Low-res canvas reverse buffer
- `playbackRate = -1`
- Wallpaper loop as primary
- Installing `gsap`
- Freezing HUD loops
- A 3.6 aim track on this film

---

## Layout

- Stage 100vw × 100vh. Overflow hidden on the **stage only**. Film cover, slight scale 1.04, object-position 52% 46%.
- Dual-edge veil. Center Sphere stays clean. Grain ~3.5%. Pointer spotlight.
- Top nav: orb + Grok Bot, four links, Sign in, Download.
- Left copy: kicker, three-line title, lead, two CTAs.
- Right: Inbox Bot thread (heavy glass + ice trip).
- Bottom: three proof cards, place line, In flight ticker.
- Tailwind preflight: use `button.gb-primary`, `button.gb-primary.gb-primary-sm`, `a.gb-mark`, `button.gb-link`, `button.gb-ghost` so resets do not flatten the 3D CTA.
- Safe horizontal padding at least about 2rem. Hide center nav under 768px. Stack CTAs on small screens.

---

## Responsive (5 breakpoints)

| Breakpoint | Behavior |
|------------|----------|
| ≥1280px | Full nav, large display type, thread + proofs + ticker |
| ≥1024px | Full nav; thread visible; dual CTA row |
| ≥768px | Nav links visible; thread may compress |
| <768px | Hide center nav links; stack CTAs; keep proofs readable; **stage still one viewport** |
| ≤390px | Tighter type clamp; ticker may hide; film cover |

---

## Accessibility

- Semantic section / header / nav / h1
- Focus rings ice on night field
- Ice-on-night body contrast intent
- `prefers-reduced-motion`: still frame + HUD only; no PSAVE
- Video decorative (`aria-hidden`)
- Pin consumes wheel/touch/keys while the journey runs; **releases** at ends
- Do not trap keyboard focus. Do not trap Space on focused links
- Scroll badge is `aria-hidden`

---

## Performance

- Playhead chase only (no GSAP, no Framer, no ScrollTrigger)
- Single video element; decode readiness on metadata
- HUD CSS animations are cheap transforms / opacity
- Fonts display swap
- One viewport stage (no tall spacer DOM)
- Client film GOP 3 / no B-frames (not "keyframe every 1-2s")
- Prefer WebP poster
- lucide-react is one icon

---

## Film encode (if you change the video)

```
ffmpeg -y -i your-film.mp4 -an -c:v libx264 -pix_fmt yuv420p -preset medium -crf 18 -g 3 -keyint_min 3 -bf 0 -sc_threshold 0 -movflags +faststart grokbot-sphere-v1.mp4
```

A long-GOP export will stall mid-reverse. Do not extract PNG frames. See VIDEO_GEN_PROMPT.md. Keep `PSAVE_FRAME = 1/fps`.

---

## AI tool instructions

1. Open this pack folder. You should see START-HERE.md at the top level.
2. Read **PROMPT.md** exactly.
3. Place `assets/grokbot-sphere-v1.mp4` and `.webp` at the public paths in START-HERE.
4. Use `source/GrokBotHero.tsx`, `source/hero.css`, and `source/copy.ts`.
5. Do **not** install gsap. Wire Syne + Outfit.
6. Mount hero on a page that is **not** `overflow: hidden`.
7. Verify: no physical page scroll during the journey; tiny click creeps; fling plays; lift coasts; reverse walks; HUD loops stay; Scroll badge hides; host page continues after the last frame.
8. Restage with CUSTOMIZATION.md. Optional new film: VIDEO_GEN_PROMPT.md, then GOP-3 remaster.

Cursor / Claude / Grok Build: prefer pack source. Lovable / Bolt: single file OK if PSAVE + No Scroller stay intact.

---

## Expected output (12 checks)

1. Full-viewport ice HUD over the Sphere film
2. Pinned 100dvh stage (no tall track)
3. Page does not physically scroll during the journey
4. PSAVE: aim 12 vh, 1.2x forward, reverse every 3rd frame, leftover dest + 0.55s floor on lift
5. Picture never jumps a frame. The **whole** film plays
6. HUD sheen, ice trip, marquee, orb keep looping
7. Scroll badge hides 5 seconds after first real scroll
8. After last frame, host page may continue. Page owns until dock
9. Reduced-motion: poster + HUD
10. Local film + poster paths resolve
11. No storefront chrome in the client build
12. No Optimus. No partnership claim. Token lock holds

## Confirm after build

- Page scrollY stays 0 while two desktop flicks advance dest (two 1800px flicks must not dump the film)
- Tiny wheel click creeps a few frames (no jump)
- Lift mid-film: film keeps going a little, then eases to a stop
- Scroll up: film walks backward every 3rd frame
- After the last frame, one more down-scroll moves the host page
- After release, scrolling up in the next section moves the page, not the film
- HUD loops never freeze
- Reduced motion shows poster + HUD

## After it works

Open CUSTOMIZATION.md. Restage brand, copy, tokens, and film one request at a time.

ClickMotion · www.ClickMotion.dev
