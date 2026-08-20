# ELYSE - Luxury Wellness Retreat Scroll Hero

**Product ID:** `MS-HERO-ELYS01`  
**Price tier:** Pro (paid)  
**Genre:** Health · Wellness · Hero  
**Live reference build:** `/demo/cleanroom-elyse`  
**Canonical member prompt source:** `content/prompts/heroes/MS-HERO-ELYS01.mdx` · CMS body in `data/cms/store.json`  
**Clean-room component:** `ElyseScrollNarrative.tsx`

This file mirrors the sold prompt. Prefer MDX/CMS as the wire for members.

**Pack mode:** PDF-only (no files zip, no START-HERE folder). Rebuild from this brief plus the Elyse package PDF.

---

## Promise (buyer-facing)

**ELYSE** is a private wellness **pin-until-complete** scroll hero: one full-viewport earth stage, a 10-second golden-hour sanctuary film owned by virtual progress, four chapters from call to return. Not a tall multi-page scrollbar track. Not Aether cream spa. Not Revel pearl fashion.

**How you build it:** give your AI this brief plus the Elyse package PDF. Tell it: *Build ELYSE with PSAVE (Perfect Scroll Video Engine). Pin-until-complete. Scroll aims on 3.6 viewports. Down-scroll plays the film forward at 1.2x. Up-scroll plays it backward at the same 1.2x, one 3-frame step per seek. Never jump a frame. When they lift, leftover dest keeps the film going a little (friction, then a graceful stop). Copy and the gold bar follow the picture. Release only when the picture arrives. After release the page owns the runway. Replacement films must be re-encoded GOP 3, no B-frames. Do not seek the playhead across the film. Do not copy old Vertex seek-scrub or old Revel wheel-gain scrub. Do not build a 460vh sticky track.*

---

**You are an expert front-end engineer.** Build this design EXACTLY as specified.  
Do not invent a different aesthetic. Do not apply any host website marketing shell.  
Produce a single production-ready React + TypeScript + Tailwind (or styled-jsx) component.  
Support prefers-reduced-motion. Mobile-first responsive.

This document is the **only** design brief. Implement only what is written here.

---

## Product

Private wellness retreat house: **ELYSE**.

**Visual promise (must read as one coherent product):**  
A **scroll-as-narrative** hero on a **dark earth** canvas. Cream type `#F4EDE3`, soft gold `#C9A46A`. Cormorant Garamond display, Inter UI. The film is a golden-hour sanctuary - two tree-of-life faces meeting over a valley river. **PSAVE (Perfect Scroll Video Engine).** Scroll aims. The film plays forward or backward to that moment. Not a seek-scrub. Not an autoplay loop. Feels like Aman / Six Senses digital quiet - **not** cream spa Aether, not climate Terra, not pearl Revel fashion, not Meridian private-bank coastal.

**Signature interaction:** **pin-until-complete** + **PSAVE**. One pinned `100dvh` stage. Wheel / trackpad / touch / keys set a destination on a 3.6-viewport track. **Down-scroll plays the film forward at 1.2x. Up-scroll plays it backward at the same 1.2x.** Never jump a frame. Tiny clicks creep. A crazy scroll still plays the movie to that moment. **When they lift, leftover dest keeps the film going a little** (friction, then a graceful stop, never a screech). Four chapters and the gold bar follow **what is on screen**, not the wheel target. **Scroll cue** at start. After the picture reaches 1, the pin **releases** so the membership band can continue.

---

## Asset contract (NON-NEGOTIABLE)

### Background video (scroll-scrubbed, NOT loop autoplay)

| Field | Value |
|-------|--------|
| Public path | `/assets/videos/elyse-nature-v1.mp4` |
| Poster | `/assets/posters/elyse-nature-v1.webp` (mid-film still for reduced motion only) |
| Duration | ~10s cinematic sanctuary film |
| Attributes | `muted playsInline preload="auto"` - **NO autoPlay, NO loop as primary behavior**. **Do not** set this poster as the HTML `<video poster>` on first paint. |
| Object-fit | `cover`, `object-position: center 48%`, scale ~1.02 |
| Time control | PSAVE: scroll sets a destination. Down plays forward at 1.2x. Up reverses every 3rd 24fps frame on the live video. Never seek across a jump. Replacement films: re-encode GOP 3, no B-frames (see Film encode). |

#### Film subject (required story)

1. Dual monumental tree faces (warm and cool)  
2. Golden-hour valley river between them  
3. Luminous sun at the meeting  
4. Quiet earth, no logos, no UI text  

#### FORBIDDEN

- Autoplay loop as the main mode (scroll aims; the playhead walks)  
- Tall sticky multi-vh document scroll track (`460vh` spacer + sticky stage) as the product method  
- Seeking `currentTime` across a jump (GSAP scrub, wheel-gain dump, or `currentTime = target` on a large delta)  
- Cream spa Aether clone / climate Terra green / pearl Revel fashion  
- Host (ClickMotion) chrome inside the component  

```txt
Use ONLY the local path above. Never substitute a CDN URL.
Scroll aims. The film plays to that moment. Do not skip frames.
```

---

## Tech stack

- React 19 + TypeScript, `"use client"`  
- Tailwind utilities or equivalent styled-jsx  
- Playhead chase is the motion system. **Do not** use GSAP / ScrollTrigger to tween `currentTime` across a jump.  
- Optional CSS keyframes for chapter crossfade  
- **No** Framer required  
- **No** hls.js. Plain MP4 `<video>`.  
- Single default export: `ElyseScrollNarrative.tsx`  
- Props: `brand`, `backgroundSrc`, `posterSrc`

---

## Interaction mode (signature) - PIN-UNTIL-COMPLETE

| Spec | Value |
|------|--------|
| Mode | Scroll-as-narrative · **pin-until-complete** · **PSAVE** (Perfect Scroll Video Engine) |
| Stage | **One pinned `100dvh` frame** - **not** a tall multi-vh page track |
| Virtual effort | **`3.6 × viewport height`** to aim from start to end (≡ old 460vh track) |
| Aim | Wheel / trackpad / touch map **1:1** onto that track. They set a **destination**. They do not seek the picture. |
| Playhead | **PSAVE.** Walk the film toward the destination at **`1.2`** film-seconds per wall-second, both ways. Down: muted `play()` at `playbackRate 1.2`. Up: first **real** up-scroll cancels a leftover forward destination. Pause and walk the live video backward **exactly one 3-frame step (`0.125s`) per seek**, during the gesture and after they stop. Wait `seeked` before the next reverse step. Never assign `currentTime` to the stop point. No low-res buffer. No loop. |
| Lift | Leftover dest is the graceful stop (by design). The picture keeps going a little after they lift, then friction-stops. Ignore tiny opposite trackpad ticks (under ~32px) so bounce does not kill dest. Never pause on the last wheel tick. |
| Tiny click | Destination moves a little. The picture creeps a few frames, then leftover dest lets it finish the step. |
| Crazy scroll | Destination may sit halfway through the movie. The picture still **plays the movie** to get there. |
| Mapping | Destination `0→1` → full video duration (~10s). On-screen time is the playhead, not the destination. |
| Video | No loop. No wallpaper autoplay. Opening must decode **frame 0** (heads up). Kick-seek `0.04 → 0`, wait `seeked`, then fade the film in. |
| Opening still | The poster file is a **mid-film look-down**. Using it as HTML poster makes the first scroll jump backward to the start. Reduced motion may use the poster as a stage fallback and seek to `~0.42`. |
| Chapters | 4 states by **playhead** (what is on screen) |
| Progress UI | 1px gold gradient under nav `scaleX(playhead)` |
| Scroll cue | Word **Scroll** + thin gold line only while playhead &lt; 0.045 |
| Release | Only when the **picture** is at **0 + scroll up** or **1 + scroll down**. Do not release because the destination already hit an end. Snap the playhead to `0` / `1` when the last frame is on screen (settle can stop ~1 frame short). After release, the **page** owns scroll until the stage docks at the top. Pointer on the membership band never drives the film. |
| Capture API | Optional `window.__msScrollNarrative = { setProgress, getProgress, getTarget, productId: "MS-HERO-ELYS01" }`. `setProgress` may snap. `getProgress` is the playhead. `getTarget` is leftover dest. |
| Reduced motion | Static mid-film frame (~0.42), no chase |

**Hard ban:** tall sticky multi-vh document scroll track (`460vh` spacer + sticky stage) as the product method.  
**Hard ban:** seeking `currentTime` to a far destination (GSAP scrub tween, wheel-gain dump, or Vertex / Revel seek-scrub).

### Rebuild algorithm (mandatory - copy this logic, do not invent another method)

If you reach for `ScrollTrigger.create`, `position: sticky`, a `460vh` spacer, or `video.currentTime = target * duration` on a large jump, stop. Rebuild with this sequence:

1. Render **one `100dvh` stage in normal document flow**. The `#request` membership band is the **next sibling**, not inside the stage. Do **not** `overflow: hidden` the page (band must be reachable after release).
2. Hold a **destination** in `0…1` and a **playhead** that is whatever `video.currentTime / duration` is showing. First paint: do **not** attach the mid-film poster. Kick-seek `0.04 → 0` (reduced: `~0.42`), wait `seeked`, fade the video in. The first scroll must continue from heads-up, never jump back to the start.
3. Virtual distance = `3.6 * window.innerHeight`. Gestures add `deltaPx / distance` to the **destination** only.
4. **Wheel / trackpad** (`passive: false`): ignore `ctrlKey` / `metaKey` (browser zoom). Normalize `deltaMode` (`1` → `×16`, `2` → `× innerHeight`). Map raw delta **1:1** onto the 3.6 track. Coalesce to one destination apply per animation frame. `preventDefault` while the pin owns the gesture.
5. **Touch:** finger `deltaY` 1:1 on the 3.6 track (destination only).
6. **Keys:** Arrow / Page / Space step `0.045` of the virtual distance (Page `×2.2`). Do **not** trap Space on a focused link or button.
7. **PSAVE:** each animation frame, walk the picture toward `destination * duration` at **1.2x**, never more than **1/24s** of film in one forward fallback tick. **Down / forward:** muted `play()` at `playbackRate 1.2`. After they lift, leftover dest keeps play going a little, then it arrives and pauses (friction stop, never a screech). Ignore tiny opposite trackpad ticks so dest is not snapped dead. **Up / reverse:** first real up-scroll cancels any pending forward destination (start from the picture). While they are still scrolling up, walk backward **exactly one 3-frame step (`1/24 * 3 = 0.125s`) per seek**. Never assign `currentTime` to the stop point. After they stop, keep walking those same 3-frame steps at 1.2x until the picture arrives. Wait for `seeked` before the next reverse step. No low-res buffer. No loop. If a replacement film is long or eventful and leftover dest dies, dest must sit at least 0.55s of film ahead after last intent and forward rate eases over that last half-second (`docs/PSAVE.md` §9.1).
8. **Release:** if the **picture** is at `0` and the gesture is up, or the **picture** is at `1` and the gesture is down, do **not** preventDefault. Test the live `currentTime` as well as the playhead ref (settle can stop ~1 frame short of duration). If the destination is already at an end but the picture is still walking, keep the pin and eat the gesture. Native page scroll reveals `#request` only after the picture arrives. Once released, the **page** owns scroll (including when the pointer is on the membership band) until the stage docks back at the top. Do not let a window wheel listener keep driving the film from the runway.
9. **Reduced motion:** skip listeners; seek to `~0.42`; static mid chapter.
10. Optional: `window.__msScrollNarrative = { setProgress, getProgress, getTarget, productId: "MS-HERO-ELYS01" }`. `setProgress` may snap. `getProgress` is the playhead.

### Film encode (mandatory if you change the video)

The shipped file `/assets/videos/elyse-nature-v1.mp4` is already remastered for PSAVE: H.264, **GOP 3**, **no B-frames**, ~81 I-frames on a 241-frame / 10.04s / 24fps film. Reverse seeks every `0.125s`. A normal export with **one I-frame at t=0** will stall mid-reverse, then jump near the start.

If you replace the sanctuary film:

```bash
ffmpeg -y -i your-film.mp4 -an -c:v libx264 -pix_fmt yuv420p -preset slow -crf 16 \
  -g 3 -keyint_min 3 -bf 0 -sc_threshold 0 -movflags +faststart \
  your-film-psave.mp4
```

Wire `backgroundSrc` to the remastered file. Keep 24fps, or change `PSAVE_FRAME` to `1/fps` and keep a 3-frame reverse stride. Do not extract PNG frames. Do not use a storefront preview as the hero. Do not set a mid-film still as the HTML poster. Keep leftover dest on lift. If the new film is much longer or has a slow-then-kick edit, size the aim track to the story beat (do not copy 3.6 or Revel 12 blindly) and add the 0.55s dest floor + rate ease if the stop becomes a screech.

---

## Design system

**Mode:** Dark earth stage. Cream headlines over the film with soft earth veils. Keep the center faces and sun luminous.

| Role | Hex | Notes |
|------|-----|--------|
| stage / root | `#0B0907` | Earth ink |
| cream | `#F4EDE3` / `#F7F1E8` | Type on film |
| gold | `#C9A46A` | Labels, progress, filament |
| warm highlight | `#F0D9A8` | Filament center |

**Typography:** Cormorant Garamond display + Inter UI. Wordmark tracking `0.34em` uppercase.

**Signature:** optional soft gold filament at ~46% height where the two nature faces meet.

---

## Chapters (virtual progress 0-1)

| Progress | Beat | Title |
|----------|------|--------|
| 0–0.24 | The call | The earth is / still waiting. |
| 0.24–0.50 | The land | Sanctuaries, / not destinations. |
| 0.50–0.76 | The practice | Days shaped / by intention. |
| 0.76–1.00 | The return | Leave whole. / Return clear. |

Finale chapter shows CTAs: **Begin a private inquiry** + **View the calendar**.

Closing band after release: **For those who measure wealth in stillness.** Stats 12 / 6 / 8. Request an introduction.

---

## Expected output

1. `ElyseScrollNarrative.tsx` - default export, `"use client"`  
2. Pin-until-complete playhead chase (scroll aims, film walks, no frame jumps)  
3. Four chapters + progress + scroll cue driven by the **picture**  
4. Earth ink + cream + gold system  
5. Closing membership band **after the picture arrives and the pin releases**  
6. Reduced-motion path  
7. **No tall multi-vh page track.** **No seek-scrub.** **No Vertex / Revel wheel-gain dump.**  

---

## Hard constraints

- Implement **only** this brief.  
- **Do not** clone Aether cream wellness.  
- **Do not** use external CDN video URLs.  
- **Do not** invent ClickMotion / MS host chrome.  
- **Do not** rebuild as a tall sticky scroll track.  
- **Do not** seek the playhead across a jump. Scroll aims. The film plays to that moment, forward or reverse.  
- **Do not** copy Vertex wheel-gain scrub or old Revel GSAP lag-seek. Elyse gold is **PSAVE at 1.2x** on a **3.6** viewport aim track with leftover dest on lift.  
- **Do not** pause on the last wheel tick. Leftover dest is the graceful stop.  
- **Do not** use `elyse-nature-v1.webp` as the HTML opening poster. That still is mid-film (heads down). First paint is frame 0 (heads up).  
- **Do not** wire a replacement film that still has one I-frame (or long GOP + B-frames). Re-encode GOP 3, no B-frames first.  
- **Do not** let a window wheel listener drive the film when the pointer is on the membership band.  

---

## What to tell your AI

```
Build ELYSE from this prompt (and the Elyse package PDF if you have it).
There is no files zip and no START-HERE folder.
Use /assets/videos/elyse-nature-v1.mp4 (or the video URL in the PDF).
Implement PSAVE (Perfect Scroll Video Engine) as pin-until-complete: one 100dvh stage. Scroll aims on 3.6 viewports.
Down-scroll plays the film forward at 1.2x. Up-scroll plays it backward every 3rd frame at the same 1.2x. Never jump a frame.
When they stop scrolling, leftover dest keeps the film going a little (friction, then a graceful stop). Ignore tiny opposite trackpad ticks.
Copy and the gold bar follow the picture. Release only when the picture arrives. After release the page owns the runway.
If you change the video, re-encode GOP 3, no B-frames, crf 16, then wire that file. Size the aim track to the story beat, not another SKU's number.
Do not import ScrollTrigger. Do not seek currentTime across a jump. Do not build a tall multi-vh track.
```

## Package notes (operators)

- Opaque: `e9l7s3e2k4m1` · PaidSalt: `el5n8q`
- Pack mode: **PDF-only** (peer: Vertex / Revel). No `files/` folder, no files zip
- Client HD: `/assets/videos/elyse-nature-v1.mp4` · poster `/assets/posters/elyse-nature-v1.webp` (mid-film still, not HTML opening poster)
- Storefront: `elyse-scroll-preview-v1.mp4` + FS `elyse-scroll-preview-fs-v1.mp4`
- Pin gold: PSAVE · 3.6 vh aim track · 1.2x forward and reverse · reverse every 3rd frame · leftover dest on lift · GOP 3 client HD
- Method spec (operators): `docs/PSAVE.md` (Elyse 3.6 leftover dest; Revel 12 + 0.55 coast is the second ship; Vertex 3.6 + 0.55 coast is the third ship)
- Demo: `/demo/cleanroom-elyse` (do not overflow-hidden the page)
- Pin migration: 2026-08-14 · playhead chase: 2026-08-14 · PSAVE lock: 2026-08-14 · leftover-dest / earn law recorded: 2026-08-14

ClickMotion · www.ClickMotion.dev
