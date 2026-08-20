# VERTEX SECURITY - Brutalist Cybersecurity Scroll Hero

**Product ID:** `MS-HERO-VERT01`  
**Price tier:** Free listing - full prompt is MDX/CMS body (member copy)  
**Genre:** Tech · Cybersecurity · Hero  
**Live reference build:** `/demo/cleanroom-vertex`  
**Canonical member prompt source:** `content/prompts/heroes/MS-HERO-VERT01.mdx` · CMS body in `data/cms/store.json`  
**Clean-room component:** `VertexHeroSection.tsx`

This file mirrors the sold prompt. Prefer MDX/CMS as the wire for members.

**Pack mode:** PDF-only (no files zip, no START-HERE folder). Rebuild from this brief plus the Vertex package PDF.

---

## Promise (buyer-facing)

**VERTEX SECURITY** is an enterprise cybersecurity **pin-until-complete** scroll hero: one full-viewport black stage, a 12-second monochrome asteroid / wireframe globe film the playhead walks through three chapters that harden from zero-trust to prevention. **PSAVE** (Perfect Scroll Video Engine): scroll aims, down plays forward, up plays reverse, the picture never jumps a frame. Not a tall multi-page scrollbar track. Not Meridian dark coastal. Not Revel pearl fashion.

**How you build it:** give your AI this brief plus the Vertex package PDF. Tell it: *Build VERTEX with PSAVE (Perfect Scroll Video Engine). Pin-until-complete. Scroll aims on 3.6 viewports (even asteroid approach, like Elyse, not Revel 12). Down-scroll plays the film forward at 1.2x. Up-scroll plays it backward at the same 1.2x, one 3-frame step per seek. Never jump a frame. When they lift, leftover dest plus a 0.55s dest floor keeps the film going a little, then rate eases to a stop. Copy and the white bar follow the picture. Release only when the picture arrives. There is no footer band. After release the host page may continue. Replacement films must be re-encoded GOP 3, no B-frames. Do not seek the playhead across the film. Do not copy old Vertex wheel-gain 0.22 or GSAP lag 0.45. Do not build a 420vh sticky track.*

---

**You are an expert front-end engineer.** Build this design EXACTLY as specified.  
Do not invent a different aesthetic. Do not apply host website shell styles.  
Produce a single production-ready React + TypeScript + Tailwind component.  
Support `prefers-reduced-motion`. Desktop-first brutalist; mobile still full-bleed.

This document is the **entire product**. If something is not written here, do not invent it.

---

## Product

Enterprise cybersecurity brand: **VERTEX SECURITY** (wordmark **VERTEX**).

**Visual promise:** A **scroll-driven cinematic film** of a monochrome wireframe globe / asteroid approach. Black canvas, pure white type, Space Grotesk display, Inter UI. **PSAVE (Perfect Scroll Video Engine).** Scroll aims. The film plays forward or backward to that moment. No autoplay loop wallpaper. Never cyan/pink neon kits, aurora mesh, pill glass nav, or SaaS startup chrome.

**Famous-UI craft direction (not a clone):** Linear / Stripe enterprise density meets brutalist editorial. One video system + sharp geometry + scroll-as-narrative chapters.

---

## Asset contract (NON-NEGOTIABLE)

| Field | Value |
|-------|--------|
| Public path | `/assets/videos/vertex-globe-web-v1.mp4` |
| Poster | `/assets/posters/vertex-globe-v1.webp` (this still ≈ frame 0) |
| Attributes | `muted playsInline preload="auto"` - **NO autoplay, NO loop** |
| Object-fit | `cover`, full viewport pin stage |
| Duration | 12.04s @ 24fps · 289 frames · GOP 3 · 97 I / 192 P / 0 B |
| Control | PSAVE: scroll sets a destination. Down plays forward at 1.2x. Up reverses every 3rd 24fps frame on the live video. Never seek across a jump. |

**Required subject:** Dark abstract / wireframe globe or orbital / asteroid approach, technical, cold, monochrome-friendly. Even steady motion (not a slow-then-kick cut).

**Forbidden:** Neon rainbow, people, logos, on-screen text, glass pill docks.

```txt
Use ONLY the local paths above. Never substitute a CDN URL or another monorepo video.
Scroll aims. The film plays to that moment. Do not autoplay.
```

### AI video generation prompt

```
Cinematic seamless narrative 10-14s, no audio, dark abstract wireframe globe or orbital network / asteroid approach on pure black, thin white/cyan-gray lines only, no logos, no text, no people. Technical cybersecurity atmosphere, 24fps feel, even steady motion.
```

Encode: MP4 H.264, 1920×1080, silent, progressive, `+faststart`, **GOP 3, no B-frames** (see film encode below).

---

## Tech stack

- React 19 + TypeScript, `"use client"`
- Tailwind CSS
- Playhead chase is the motion system. **Do not** use GSAP / ScrollTrigger to tween `currentTime`
- Optional CSS keyframes for chapter crossfade only (`vertexFade` / `vertexRise`)
- No Framer layout noise, no Three.js, no Lottie, no Magic UI / Aceternity / Lightswind
- Single default export `VertexHeroSection`; no host chrome

---

## Interaction mode (signature) - PIN-UNTIL-COMPLETE + PSAVE

| Spec | Value |
|------|--------|
| Mode | Scroll-as-narrative · **pin-until-complete** · **PSAVE** (Perfect Scroll Video Engine) |
| Stage | **One pinned `100dvh` frame** - **not** a tall multi-vh page track |
| Virtual effort | **`3.6 × viewport height`** to aim from start to end. Even asteroid approach. Not old 3.2 seek-scrub. Not Revel 12. |
| Aim | Wheel / trackpad / touch map **1:1** onto that track. They set a **destination**. They do not seek the picture. **No wheel gain.** |
| Playhead | **PSAVE.** Walk the film toward the destination at **`1.2`** film-seconds per wall-second, both ways. Down: muted `play()` at `playbackRate 1.2`, ease over the last `0.55s` of leftover dest. Up: first **real** up-scroll cancels a leftover forward destination. Pause and walk the live video backward **exactly one 3-frame step (`0.125s`) per seek**, during the gesture and after they stop. Wait `seeked`. Never assign `currentTime` to the stop point. No low-res buffer. No loop. |
| Lift | Leftover dest plus **`PSAVE_COAST_SEC = 0.55`**. After last real intent dest sits at least 0.55s of film ahead. Ignore opposite ticks under **32px**. Rate tapers 1.2 → ~0.42 over the last 0.55s. Friction, then a graceful stop. Never a screech. This 0.55 is **not** old GSAP lag 0.45. |
| Tiny click | Destination moves a little. The picture creeps a few frames. |
| Crazy scroll | Destination may sit ahead. The picture still **plays the movie** to get there. |
| Mapping | Destination `0→1` → full video duration (12.04s). On-screen time is the playhead, not the destination. |
| Video | No loop. No wallpaper autoplay. Opening poster ≈ frame 0. Kick-seek `0.04 → 0`, wait `seeked`, then fade the film in. |
| Chapters | 3 states by **playhead** (what is on screen) |
| Progress UI | 1px white line under nav `scaleX(playhead)` |
| Scroll cue | Word **Scroll** + thin white line only while playhead &lt; 0.04 |
| Release | Only when the **picture** is at **0 + scroll up** or **1 + scroll down**. After release, the **page** owns scroll until the stage docks at the top. |
| Capture API | Optional `window.__msScrollNarrative = { setProgress, getProgress, getTarget, productId: "MS-HERO-VERT01" }`. `getProgress` is the playhead. `getTarget` is leftover dest. |
| Reduced motion | Poster + chapter 01, no chase |
| Closing band | **None.** Do not add a membership / footer section. |

**Hard ban:** tall sticky multi-vh document scroll track (`420vh` spacer + sticky stage) as the product method.  
**Hard ban:** seeking `currentTime` to a far destination (GSAP scrub tween, old Vertex wheel-gain `0.22`, old scrub lag `0.45`).  
**Hard ban:** restoring `VIRTUAL_VIEWPORTS = 3.2` or copying Revel `12` onto this even film.

**Do not** add instructional copy such as "Scroll to move through the platform." The Scroll cue + progress line + chapters are enough.

### Rebuild algorithm (mandatory - copy this logic, do not invent another method)

If you reach for `ScrollTrigger.create`, `position: sticky`, a `420vh` spacer, `gsap.to` on a progress proxy, or `video.currentTime = target * duration` on a large jump, stop. Rebuild with this sequence:

1. Render **one `100dvh` stage in normal document flow**. There is **no** footer band. Do **not** `overflow: hidden` the page (a host embed must be able to scroll after release).
2. Hold a **destination** in `0…1` and a **playhead** that is whatever `video.currentTime / duration` is showing. The poster is ≈ frame 0. Kick-seek `0.04 → 0`, wait `seeked`, fade the video in.
3. Virtual distance = `3.6 * window.innerHeight`. Gestures add `deltaPx / distance` to the **destination** only.
4. **Wheel / trackpad** (`passive: false`): ignore `ctrlKey` / `metaKey` (browser zoom). Normalize `deltaMode` (`1` → `×16`, `2` → `× innerHeight`). Map raw delta **1:1** onto the 3.6 track. Ignore opposite ticks under 32px inside the live window. Coalesce to one destination apply per animation frame. `preventDefault` while the pin owns the gesture.
5. **Touch:** finger `deltaY` 1:1 on the 3.6 track (destination only).
6. **Keys:** Arrow / Page / Space step `0.045` of the virtual distance (Page `×2.2`). Do **not** trap Space on a focused link or button.
7. **PSAVE:** each animation frame, walk the picture toward `destination * duration` at **1.2x**, never more than **1/24s** of film in one forward fallback tick. **Down / forward:** muted `play()` at `playbackRate 1.2`, ease over the last 0.55s of leftover dest. After they lift, if dest is closer than 0.55s of film, push dest that far once. **Up / reverse:** first real up-scroll cancels any pending forward destination. While they are still scrolling up, walk backward **exactly one 3-frame step (`0.125s`) per seek**. Never assign `currentTime` to the stop point. After they stop, keep walking those same 3-frame steps at 1.2x until the picture arrives. Wait for `seeked`. No low-res buffer. No loop.
8. **Release:** if the **picture** is at `0` and the gesture is up, or the **picture** is at `1` and the gesture is down, do **not** preventDefault. Test the live `currentTime` as well as the playhead ref. If the destination is already at an end but the picture is still walking, keep the pin and eat the gesture. Once released, the **page** owns scroll until the stage docks back at the top.
9. **Reduced motion:** skip listeners; poster + chapter 01; no chase.
10. Optional: `window.__msScrollNarrative = { setProgress, getProgress, getTarget, productId: "MS-HERO-VERT01" }`.

### Film encode (mandatory if you change the video)

The shipped file `/assets/videos/vertex-globe-web-v1.mp4` is already remastered for PSAVE: H.264, **GOP 3**, **no B-frames**, 97 I-frames on a 289-frame / 12.04s / 24fps film. Reverse seeks every `0.125s`. The previous encode (13 I / 190 B) stalled mid-reverse.

If you replace the globe film:

```bash
ffmpeg -y -i your-film.mp4 -an -c:v libx264 -pix_fmt yuv420p -preset slow -crf 16 \
  -g 3 -keyint_min 3 -bf 0 -sc_threshold 0 -movflags +faststart \
  your-film-psave.mp4
```

Wire the remastered file. Keep 24fps, or change `PSAVE_FRAME` to `1/fps` and keep a 3-frame reverse stride. Do not extract PNG frames. Do not use a storefront preview as the hero.

### Chapters (playhead 0-1)

| # | Range | Eyebrow | Title (two lines) | Body focus |
|---|-------|---------|-------------------|------------|
| 01 | 0.00-0.34 | Zero Trust Architecture | SECURITY. / WITHOUT COMPROMISE. | zero-day prevention |
| 02 | 0.34-0.66 | Global Threat Fabric | Every packet / is a signal. | telemetry + intent |
| 03 | 0.66-1.01 | Built for SOC teams | Prevention / is the product. | CTAs + MTTR / Coverage / SOC stats |

Chapter 03 only: dual CTAs "Request Demo" + "View Threat Intel", stats `< 4m MTTR · 99.99% Coverage · 2,400+ SOC teams`.

---

## Design system

| Token | Value |
|-------|--------|
| Canvas | `#000000` |
| Text | `#FFFFFF` |
| Muted | white at 40-65% |
| CTA primary | white fill, black text |
| CTA secondary | white border outline |
| Scrim | `linear-gradient(105deg, rgba(0,0,0,0.86) 0%, rgba(0,0,0,0.58) 42%, rgba(0,0,0,0.38) 100%)` + `linear-gradient(180deg, rgba(0,0,0,0.5) 0%, transparent 28%, rgba(0,0,0,0.58) 100%)` |

**Type:** Display Space Grotesk 700, chapter 1 H1 `clamp(2.35rem, 6vw, 5.5rem)`, leading 0.92, tracking -0.04em. Sub `WITHOUT COMPROMISE.` white/70, smaller clamp. Body Inter 400, 15-17px, white/65. Nav / labels 10-11px uppercase tracking 0.16-0.28em.

**Radius:** **0** on CTAs and chrome (brutalist - no rounded-full pills).

**Safe margins:** Horizontal padding `px-10` to `lg:px-20`. Keep primary copy inside an inner max-width so gallery `object-cover` crop never clips letters.

**Anti-slop:** No cyan/pink neon kit tokens, aurora mesh, border-beam, shiny text, glass pill dock nav, Magic UI default stacks.

---

## Layout

```
[Pinned 100dvh stage - pin-until-complete]
 video + dual scrim
 header + white progress hairline
 chapter copy (8) + markers 01-03 (4)
 scroll cue (playhead < 4%)
[NO footer / closing band]
```

---

## Motion numbers (GOLD - preserve)

| Item | Spec |
|------|------|
| Virtual viewports | **3.6** (even asteroid approach; do not restore 3.2; do not copy Revel 12) |
| Wheel | **1:1** on the aim track. **No** `WHEEL_GAIN`. |
| Rate | **1.2x** both directions |
| Reverse stride | **exactly 3 frames** (0.125s) per seek |
| Live window | **220ms** |
| Coast / ease | **0.55s** dest floor + rate taper to ~0.42 |
| Bounce ignore | opposite ticks under **32px** |
| Chapter enter | vertexFade 0.65s / vertexRise 0.8s, y 16→0, cubic-bezier(0.22,1,0.36,1) |
| Inputs | wheel (1:1), trackpad (1:1), touch (1:1), Arrow/Page/Space keys |

---

## Accessibility · Performance · Tags

- Reduced motion: static chapter 01
- Video `aria-hidden`; focus outlines white; contrast white on black scrim
- One video; no GSAP; no WebGL
- **technicalTags:** `video-background`, `scroll-trigger`
- **styleTags:** `brutalist`, `minimal`, `dark-cinematic`
- **motionIntensity:** `aggressive`
- **priceTier:** `free`

---

## Expected output

One self-contained component: pin-until-complete PSAVE walking the globe film (3.6 vh aim, 1.2x both ways, 3-frame reverse, 0.55s dest floor on lift), three chapters from the picture, white progress hairline, start-only Scroll cue, chapter-03 CTAs + stats, reduced-motion path, exact asset paths. **No tall multi-vh page track. No footer band. No GSAP.**
