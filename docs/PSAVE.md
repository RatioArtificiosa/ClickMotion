# PSAVE — Perfect Scroll Video Engine

**Canonical method name:** **PSAVE** (always expand once: Perfect Scroll Video Engine)  
**Status:** Locked gold · first shipped on **ELYSE / MS-HERO-ELYS01** · second shipped on **REVEL / MS-HERO-REVL01** · third shipped on **VERTEX / MS-HERO-VERT01** · fourth shipped on **STILL / MS-HERO-STIL01** · fifth shipped on **PRISM / MS-HERO-PRSM01** · sixth shipped on **GROK BOT / MS-HERO-GROK01** · seventh shipped on **SKYSPIRES / MS-HERO-SKYS01** · 2026-08-16  
**Audience:** Operators, ClickMotion agents, and any human or AI that must rebuild or port this method  
**Gold implementations:** Elyse `cleanroom/elyse-from-prompt/ElyseScrollNarrative.tsx` · Revel `cleanroom/revel-from-prompt/RevelScrollNarrative.tsx` · Vertex `cleanroom/vertex-from-prompt/VertexHeroSection.tsx` · Still `cleanroom/still-from-prompt/StillMindfulnessHero.tsx` · Prism `cleanroom/prism-from-prompt/PrismLiquidGlass.tsx` · Grok Bot `cleanroom/grokbot-from-prompt/GrokBotHero.tsx` · SkySpires `cleanroom/skyspires-from-prompt/SkySpiresHero.tsx`  
**Gold demos:** `/demo/cleanroom-elyse` · `/demo/cleanroom-revel` · `/demo/cleanroom-vertex` · `/demo/cleanroom-still` · `/demo/cleanroom-prism` · `/demo/cleanroom-grokbot` · `/demo/cleanroom-skyspires`  
**Buyer-facing copies:** Elyse + Revel + Vertex + Still + Prism + Grok Bot sold prompts, buyer briefs, package PDFs (Still, Prism, and Grok Bot also ship a files zip)  
**Parent law:** pin-until-complete in [`PRODUCT_LAW.md`](./PRODUCT_LAW.md) → **Scroll narrative pin law**

If this file and any other note disagree, **this file plus the gold component win**.

---

## 0. Find this later

| What you need | Where |
|---------------|--------|
| The whole method | **This file** (`docs/PSAVE.md`) |
| Pin law (every scroll product) | [`PRODUCT_LAW.md`](./PRODUCT_LAW.md) → Scroll narrative pin law |
| Elyse sold prompt (method bible for buyers) | `content/prompts/heroes/MS-HERO-ELYS01.mdx` |
| Elyse buyer brief | `cleanroom/elyse-from-prompt/BUYER_PROMPT.md` |
| Elyse gold code | `cleanroom/elyse-from-prompt/ElyseScrollNarrative.tsx` |
| Elyse buyer PDF | `public/packages/MS-HERO-ELYS01/Elyse-package-e9l7s3e2k4m1-el5n8q.pdf` |
| Elyse prep | [`prep/MS-HERO-ELYS01-PREP.md`](./prep/MS-HERO-ELYS01-PREP.md) |
| Revel sold prompt | `content/prompts/heroes/MS-HERO-REVL01.mdx` |
| Revel buyer brief | `cleanroom/revel-from-prompt/BUYER_PROMPT.md` |
| Revel gold code | `cleanroom/revel-from-prompt/RevelScrollNarrative.tsx` |
| Revel buyer PDF | `public/packages/MS-HERO-REVL01/Revel-package-r7v3l9k2mx4q-rv8n3p.pdf` |
| Revel prep | [`prep/MS-HERO-REVL01-PREP.md`](./prep/MS-HERO-REVL01-PREP.md) |
| Vertex sold prompt | `content/prompts/heroes/MS-HERO-VERT01.mdx` |
| Vertex buyer brief | `cleanroom/vertex-from-prompt/BUYER_PROMPT.md` |
| Vertex gold code | `cleanroom/vertex-from-prompt/VertexHeroSection.tsx` |
| Vertex buyer PDF | `public/packages/MS-HERO-VERT01/Vertex-package-b352guxju0ic.pdf` |
| Vertex prep | [`prep/MS-HERO-VERT01-PREP.md`](./prep/MS-HERO-VERT01-PREP.md) |
| Still sold prompt | `content/prompts/heroes/MS-HERO-STIL01.mdx` |
| Still buyer brief | `cleanroom/still-from-prompt/BUYER_PROMPT.md` |
| Still gold code | `cleanroom/still-from-prompt/StillMindfulnessHero.tsx` |
| Still pack folder | `public/packages/MS-HERO-STIL01/files/` |
| Still buyer PDF | `public/packages/MS-HERO-STIL01/Still-package-s7i1l9m4ndf0-sk3p8w.pdf` |
| Still files zip | `public/packages/MS-HERO-STIL01/Still-files-s7i1l9m4ndf0-sk3p8w.zip` |
| Still prep | [`prep/MS-HERO-STIL01-PREP.md`](./prep/MS-HERO-STIL01-PREP.md) |
| Prism sold prompt | `content/prompts/heroes/MS-HERO-PRSM01.mdx` |
| Prism buyer brief | `cleanroom/prism-from-prompt/BUYER_PROMPT.md` |
| Prism gold code | `cleanroom/prism-from-prompt/PrismLiquidGlass.tsx` |
| Prism pack folder | `public/packages/MS-HERO-PRSM01/files/` |
| Prism buyer PDF | `public/packages/MS-HERO-PRSM01/Prism-package-p8r3sm7k2n4q-pr5m2x.pdf` |
| Prism files zip | `public/packages/MS-HERO-PRSM01/Prism-files-p8r3sm7k2n4q-pr5m2x.zip` |
| Prism prep | [`prep/MS-HERO-PRSM01-PREP.md`](./prep/MS-HERO-PRSM01-PREP.md) |
| Grok Bot sold prompt | `content/prompts/heroes/MS-HERO-GROK01.mdx` |
| Grok Bot gold code | `cleanroom/grokbot-from-prompt/GrokBotHero.tsx` |
| Grok Bot pack folder | `public/packages/MS-HERO-GROK01/files/` |
| Grok Bot buyer PDF | `public/packages/MS-HERO-GROK01/GrokBot-package-g7k0b8t4vg2n-gk4n8x.pdf` |
| Grok Bot files zip | `public/packages/MS-HERO-GROK01/GrokBot-files-g7k0b8t4vg2n-gk4n8x.zip` |
| Grok Bot prep | [`prep/MS-HERO-GROK01-PREP.md`](./prep/MS-HERO-GROK01-PREP.md) |
| Media roles / GOP note | [`ASSET_PIPELINE.md`](./ASSET_PIPELINE.md) |

Do not search Slack memory or old chats. Open this file.

---

## 1. One-sentence thesis

**Scroll aims. The film plays. The picture never jumps a frame.**

The visitor’s wheel, trackpad, finger, or keys do **not** seek the video. They move a **destination** along a short virtual track. A chase loop walks the **live** `<video>` toward that destination:

- **Down** plays the film **forward** at `1.2×` (`muted` native `play()`).
- **Up** plays the film **backward** at the same `1.2×` by walking `currentTime` **exactly one 3-frame step per seek**.
- A tiny click creeps a few frames.
- A crazy fling may aim halfway through the movie. The movie still **plays the movie** to get there.
- Copy, chapters, and the gold bar follow **what is on screen**, not the wheel target.
- The stage stays pinned until the **picture** arrives at `0` (scroll up) or `1` (scroll down). Then the page may continue.

That is the entire invention. Everything below is how to not break it.

---

## 2. Why PSAVE exists (the problem it cured)

Seek-scrub (old Vertex, old Revel, Meridian, GSAP `ScrollTrigger` scrub, `currentTime = target * duration`) maps scroll onto time. On a fast wheel the playhead **jumps**. Mid-film frames vanish. Reverse is a second jump. People feel the film “skip.”

PSAVE splits the job:

| Clock | Who writes it | Who reads it |
|-------|----------------|--------------|
| **Destination** `0…1` | Gestures (1:1 on the aim track) | Chase loop only |
| **Playhead** `0…1` | The decoded picture (`currentTime / duration`) | Copy, gold bar, chapters, release |

The destination may leap. The picture may not.

---

## 3. What PSAVE is not

| Method | Why it is not PSAVE |
|--------|---------------------|
| Tall sticky `460vh` track + `position: sticky` | Traditional scrollbar UX. Banned by pin law. |
| GSAP `ScrollTrigger` scrub of `currentTime` | Seeks across jumps. |
| Old Vertex seek-scrub (`3.2` vh, gain `0.22`, lag `0.45`) | Banned on live Vertex. Live Vertex is PSAVE (`3.6` vh + leftover dest + 0.55s coast floor). |
| Old Revel seek-scrub (`3.8` vh, gain `0.11`, lag `0.55`, swipe `0.09`) | Banned on live Revel. Live Revel is PSAVE (`12` vh, leftover dest + 0.55s coast floor). |
| Meridian native gold (`3.2` / `0.22` / `0.45`) | Seek-scrub. Still Meridian gold. Not PSAVE. |
| `video.currentTime = destination * duration` on a large delta | The jump. |
| Low-res canvas / ImageBitmap ring for reverse | Blurry. Repeats frames. Forbidden. |
| `playbackRate = -1` | Not reliable across browsers. Do not depend on it. |
| Autoplay wallpaper loop | Scroll does not own time. |
| Releasing because **destination** hit `0` or `1` | Picture may still be walking. Pin stays. |

Do **not** copy **old** Vertex `0.22` / `0.45` or **old** Revel `0.11` / `0.55` GSAP lag onto a PSAVE product. Live Vertex and live Revel `0.55` is **leftover dest coast**, not seek-scrub lag. Do **not** put wheel-gain, swipe-cap, or GSAP lag back onto Elyse / live Vertex / live Revel.

---

## 4. Relationship to pin-until-complete

PSAVE **sits on** pin-until-complete. It does not replace it.

**Operator name for both together: Dual process = PSAVE + No Scroller.**

- **No Scroller** = pin-until-complete. The page does not physically scroll during the journey. Wheel / trackpad / touch / keys drive virtual progress. After the picture arrives, the pin releases.
- **PSAVE** = how the film is driven inside that pin (two clocks, play forward / reverse, leftover dest).

Do not ship PSAVE on a tall sticky scrollbar track. Do not ship No Scroller with seek-scrub and call it the dual process. Both legs are required.

**Pin-until-complete** (every scroll-narrative SKU):

1. One `100dvh` stage in **normal document flow** (not `position: sticky` on a tall spacer).
2. Wheel / trackpad / touch / keys are captured while the journey runs.
3. The page does not physically scroll as the product UX.
4. After the journey completes, the pin **releases** so the next sibling can scroll in.

**PSAVE** is *how the film is driven* inside that pin:

- Gestures write the destination.
- The film plays (forward or reverse) to the destination.
- Release is gated on the **picture**, not the destination.

A PSAVE product that still uses a `460vh` / `480vh` / `520vh` / `960vh` sticky track is **wrong**. A pin-until-complete product that seek-scrubs (Meridian, **old** Vertex, **old** Revel, **old** Still hybrid, **old** Prism 520vh) is valid pin law but is **not** PSAVE. Live Elyse, live Revel, live Vertex, live Still, and live Prism are PSAVE.

---

## 5. Locked constants (Elyse gold)

Copy these names. Do not invent new ones.

```ts
const VIRTUAL_VIEWPORTS = 3.6;   // aim track. Old 460vh sticky, ST top-top → bottom-bottom → 360vh
const PSAVE_RATE        = 1.2;   // film-seconds per wall-second, both directions
const PSAVE_FRAME       = 1 / 24; // 0.041666… s. One 24fps frame
const PSAVE_REV_STRIDE  = 3;     // reverse may recede by exactly 3 frames per seek
const PSAVE_REV_STEP    = PSAVE_FRAME * PSAVE_REV_STRIDE; // 0.125 s
const PSAVE_LIVE_MS     = 220;   // up/down events inside this window = the person is still scrolling
```

| Constant | Value | Why this number |
|----------|-------|-----------------|
| `VIRTUAL_VIEWPORTS` | `3.6` | Gold virtual effort. Old Elyse track was `460vh` sticky `100vh` with start `top top` / end `bottom bottom` → scroll distance `360vh` = **3.6 viewports**. All gestures aim **1:1** on this distance. There is **no** wheel gain. |
| `PSAVE_RATE` | `1.2` | Fast enough that a natural roll does not feel late. Slow enough that the film is still readable. Same number both ways so reverse feels like the inverse of forward. |
| `PSAVE_FRAME` | `1/24` | Elyse film is 24fps. Forward fallback seek (if `play()` is blocked) may not advance more than one frame in a tick. |
| `PSAVE_REV_STRIDE` | `3` | HTML video cannot play backward. Reverse is a staircase of seeks. One-frame seeks stutter. Five-frame seeks feel jumpy. **Every 3rd frame** is the locked stride. |
| `PSAVE_REV_STEP` | `0.125s` | `3 / 24`. The **only** legal reverse delta. Never `currentTime = destination`. |
| `PSAVE_LIVE_MS` | `220` | If an up event landed in the last 220ms and is newer than the last down event, the person is **still scrolling up**. Reverse must start **during** the gesture, not after they stop. |

Elyse film (gold file):

| Field | Value |
|-------|--------|
| Path | `/assets/videos/elyse-nature-v1.mp4` |
| Duration | `10.042s` |
| Frame rate | `24fps` |
| Frame count | `241` |
| Encode | H.264, **GOP 3**, **no B-frames**, **81 I-frames** (see §14) |
| Size | ~93 MB after GOP remaster |
| Poster file | `/assets/posters/elyse-nature-v1.webp` (**mid-film look-down** — never the HTML `poster`) |

Other PSAVE products may change duration, chapter ranges, and **`VIRTUAL_VIEWPORTS`**. They must **not** change the reverse stride law, the two-clock law, the leftover-dest stop law, the picture-gated release law, or the GOP law without a new written revision of this file.

---

## 5A. Locked constants (Revel gold, second ship)

Revel is the same engine. The film is different, so the **earn track** and the **stop** are product-specific.

```ts
const VIRTUAL_VIEWPORTS = 12;     // earned aim. Not Elyse 3.6. Not old 3.8 seek-scrub.
const PSAVE_RATE        = 1.2;    // same family rate
const PSAVE_FRAME       = 1 / 24;
const PSAVE_REV_STRIDE  = 3;
const PSAVE_REV_STEP    = PSAVE_FRAME * PSAVE_REV_STRIDE; // 0.125 s
const PSAVE_LIVE_MS     = 280;    // slightly longer than Elyse 220 so trackpad inertia still feeds dest
const PSAVE_COAST_SEC   = 0.55;   // leftover dest floor after last real intent
const PSAVE_EASE_SEC    = 0.55;   // forward rate tapers over the last leftover film-seconds
const PSAVE_FLIP_DEADZONE_PX = 32; // ignore tiny opposite ticks (trackpad bounce)
```

| Constant | Value | Why this number |
|----------|-------|-----------------|
| `VIRTUAL_VIEWPORTS` | `12` | Operator lock: ~5–6 natural scrolls to the halfway beat (she leaves the phone). Two flicks must not dump dest to “watching a video.” Old 3.8 on a 20s film ended the movie in two scrolls. Matching Elyse film-density (7.2) was still cheap. **12** is earned. Do not copy Elyse 3.6. Do not copy old 3.8. |
| `PSAVE_LIVE_MS` | `280` | Same job as Elyse 220. A hair longer so a pause of a fraction of a second is still “live” and dest is not declared done. |
| `PSAVE_COAST_SEC` | `0.55` | After the last real intent, dest must sit at least 0.55 film-seconds ahead (down) or behind (up). That leftover is the Elyse lift. On Revel leftover dest often dies (20s film + 1.2x eats dest; trackpad bounce snaps dest). The floor puts it back. This is **not** old GSAP `SCRUB_LAG 0.55`. |
| `PSAVE_EASE_SEC` | `0.55` | Forward `playbackRate` stays 1.2 until leftover dest is under 0.55s, then tapers toward ~0.42. Friction, then a graceful slowdown, then stop. Not a tire screech. |
| `PSAVE_FLIP_DEADZONE_PX` | `32` | End-of-gesture trackpad often fires a tiny opposite delta. Without this, dest snaps onto the playhead and the coast dies. Real reverse (larger opposite) still snaps dest to the picture. |

Revel film (gold file):

| Field | Value |
|-------|--------|
| Path | `/assets/videos/revel-breakout-v1.mp4` |
| Duration | `20.04s` |
| Frame rate | `24fps` |
| Frame count | `482` |
| Encode | H.264, **GOP 3**, **no B-frames**, **161 I-frames** |
| Size | ~51 MB after GOP remaster |
| Poster file | `/assets/posters/revel-breakout-v1.webp` (**this still IS frame 0** — HTML poster allowed) |
| Backup | `tmp/revel-breakout-v1.pre-gop.mp4` |

---

## 5B. Earn track and perceived time (do not match clocks blindly)

`VIRTUAL_VIEWPORTS` is **user effort**, not a formula on film duration.

| Wrong idea | Why it failed |
|------------|----------------|
| Copy Elyse `3.6` onto Revel | 20s film on a 10s track. Two flicks park dest at 1. Feels like a video playing. |
| Match Elyse film-seconds per viewport (`20.04 / 2.79 ≈ 7.2`) | Clock-matched. Still cheap on Revel. Two flicks still felt like watching a video. |
| Copy old Revel seek-scrub `3.8` + gain `0.11` | That was **seek-scrub**, not PSAVE. Banned. |

**Perceived time is not clock time.** Elyse’s sanctuary film is even: light moves slowly the whole 10s. Revel’s breakout film is designed uneven: she lives in the phone and walks up to the glass (**slow**), then a kick and jump out (**fast**). Halfway through the movie is “she leaves the viewpoint.” That beat **must feel earned** (~5–6 scrolls), even though the second half of the file is a quicker action cut. Do not “fix” the film. Size the aim track to the **story beat**, then lock it with the operator.

When you port PSAVE:

1. Start from leftover dest + 1.2x + 3-frame reverse (family).
2. Smoke two natural flicks. If dest dumps a chapter or “feels like a video,” **raise** `VIRTUAL_VIEWPORTS`. Do not add wheel gain.
3. Smoke a lift mid-chapter. If the picture **screeches to a stop**, leftover dest died. Add bounce deadzone + coast floor + rate ease (Revel gold).
4. Never shorten the track because the second half of the film is faster. That is the edit. The user earns the cut.

Elyse stays at **3.6**. Vertex stays at **3.6** (even asteroid approach, plus the family coast so lift is not a screech). Revel stays at **12** (slow-then-kick). Still stays at **12** (even **long** 30s cosmos: two flicks on 3.6 dump dest). Prism stays at **12** (even **long** 47.63s faces: two flicks on 3.6 dump dest). Those numbers are not interchangeable. Do not copy 12 onto a short even film. Do not copy Elyse/Vertex 3.6 onto a slow-then-kick film **or** a long even film.

---

## 5C. Locked constants (Vertex gold, third ship)

Vertex is the same engine. The film is an **even / steady asteroid approach** (rocks shed toward the viewpoint the whole 12s). That is Elyse-like perceived time, not Revel slow-then-kick. Operator lock: “very much like Elyse,” then “I feel that it is perfect.”

```ts
const VIRTUAL_VIEWPORTS = 3.6;  // Elyse earn. Not old Vertex 3.2 seek-scrub. Not Revel 12.
const PSAVE_RATE        = 1.2;
const PSAVE_FRAME       = 1 / 24;
const PSAVE_REV_STRIDE  = 3;
const PSAVE_REV_STEP    = PSAVE_FRAME * PSAVE_REV_STRIDE; // 0.125 s
const PSAVE_LIVE_MS     = 220;  // same as Elyse
const PSAVE_COAST_SEC   = 0.55; // family leftover dest floor
const PSAVE_EASE_SEC    = 0.55; // family rate taper
const PSAVE_FLIP_DEADZONE_PX = 32;
```

| Constant | Value | Why this number |
|----------|-------|-----------------|
| `VIRTUAL_VIEWPORTS` | `3.6` | Even film. Same earn as Elyse. Old Vertex `3.2` + wheel gain `0.22` is **seek-scrub** and banned. Do not raise to Revel 12: there is no halfway “kick” to earn. |
| `PSAVE_LIVE_MS` | `220` | Same live window as Elyse. |
| `PSAVE_COAST_SEC` / `PSAVE_EASE_SEC` | `0.55` | 12s even film still eats dest at 1.2×. Without the Revel-class floor the lift is a tire screech. Family law. This is **not** old GSAP `SCRUB_LAG 0.45`. |
| `PSAVE_FLIP_DEADZONE_PX` | `32` | Same bounce ignore as Revel. |

Vertex film (gold file):

| Field | Value |
|-------|--------|
| Path | `/assets/videos/vertex-globe-web-v1.mp4` |
| Duration | `12.04s` |
| Frame rate | `24fps` |
| Frame count | `289` |
| Encode | H.264, **GOP 3**, **no B-frames**, **97 I-frames** / 192 P / 0 B |
| Size | ~25.2 MB after GOP remaster (was ~9.6 MB, 13 I / 190 B) |
| Poster file | `/assets/posters/vertex-globe-v1.webp` (**this still ≈ frame 0** — HTML poster allowed; still kick-seek `0.04→0`) |
| Backup | `tmp/vertex-globe-web-v1.pre-gop.mp4` |

Vertex has **no footer / atelier / membership band**. The narrative ends when the picture arrives at 1. `pageOwns` still exists so a **host embed** can release into the next sibling. The demo page must **not** be `overflow: hidden`.

Vertex chapters (playhead `0…1`):

| Range | Chapter |
|-------|---------|
| `0 – 0.34` | 01 Zero Trust / SECURITY. |
| `0.34 – 0.66` | 02 Every packet / is a signal. |
| `0.66 – 1.01` | 03 Prevention / is the product. (CTAs + stats) |

Do **not** recapture storefront (`vertex-preview-v1.mp4` / FS) unless the operator asks.

---

## 5D. Locked constants (Still gold, fourth ship)

Still is the same engine. The film is an **even / long cosmos growth** (desert greening the whole 30s). That is Elyse-like perceived time on a file **three times longer**. Operator lock: “It is perfect.” Dual process name: **PSAVE + No Scroller**.

```ts
const VIRTUAL_VIEWPORTS = 12;  // LONG even film. Not Elyse/Vertex 3.6. Not old 960vh.
const PSAVE_RATE        = 1.2;
const PSAVE_FRAME       = 1 / 24;
const PSAVE_REV_STRIDE  = 3;
const PSAVE_REV_STEP    = PSAVE_FRAME * PSAVE_REV_STRIDE; // 0.125 s
const PSAVE_LIVE_MS     = 280;  // Revel-class live window
const PSAVE_COAST_SEC   = 0.55; // family leftover dest floor
const PSAVE_EASE_SEC    = 0.55; // family rate taper
const PSAVE_FLIP_DEADZONE_PX = 32;
```

| Constant | Value | Why this number |
|----------|-------|-----------------|
| `VIRTUAL_VIEWPORTS` | `12` | 30s even cosmos. Two 1800px flicks on 3.6 dump dest past the last chapter (feels like watching a video). On 12 those flicks aim ~10s of picture. Same number as Revel, **different reason** (length, not a kick). Do not restore `960vh`. |
| `PSAVE_LIVE_MS` | `280` | Same live window as Revel. A hair longer than Elyse/Vertex 220 so a pause of a fraction of a second is still “live.” |
| `PSAVE_COAST_SEC` / `PSAVE_EASE_SEC` | `0.55` | 30s film eats dest at 1.2×. Without the floor the lift is a tire screech. Family law. This is **not** old GSAP `SCRUB 0.45`. |
| `PSAVE_FLIP_DEADZONE_PX` | `32` | Same bounce ignore as Revel / Vertex. |

Still film (gold file):

| Field | Value |
|-------|--------|
| Path | `/assets/videos/still-cosmos-v1.mp4` |
| Duration | `30.00s` |
| Frame rate | `24fps` |
| Frame count | `720` |
| Encode | H.264, **GOP 3**, **no B-frames**, **240 I-frames** / 480 P / 0 B |
| Size | ~81.5 MB after GOP remaster (was ~16.7 MB, GOP ~30 / 24 I) |
| Poster file | `/assets/posters/still-cosmos-v1.webp` (kick-seek `0.04→0` still) |
| Backup | `tmp/still-cosmos-v1.pre-gop.mp4` |

Still has **no required footer band**. The narrative ends when the picture arrives at 1. `pageOwns` still exists so a **host embed** can release into the next sibling. The demo page must **not** be `overflow: hidden`.

**Banned history (old Still v1):** hybrid Option A (`STILL_IDLE_MS = 5000` free-play + reclaim `scrollTo`), `TRACK_VH = 960` sticky, GSAP `ScrollTrigger` scrub `0.45`, mode chip “Breathing with you.” Do not restore.

Still chapters (playhead `0…1`):

| Range | Chapter |
|-------|---------|
| `0 – 0.14` | Soften. / Begin again. |
| `0.14 – 0.34` | When your mind / never lands. |
| `0.34 – 0.56` | Softness / is a skill. |
| `0.56 – 0.78` | Grow into / your quiet. |
| `0.78 – 1.01` | Come home / to yourself. (CTAs + stats) |

Pack mode: **files zip + PDF** (first PSAVE SKU that ships a Studio-class folder). Storefront page+browse is operator WebM `still-preview-v1.webm` (keep WebM). Do **not** recapture unless the operator asks.

---

## 5E. Locked constants (Prism gold, fifth ship)

Prism is the same engine. The film is an **even / long multi-face sculpture** (faces morph the whole 47.63s). That is Still-like perceived time on a longer file. Operator lock: “It is perfect.” Dual process name: **PSAVE + No Scroller**.

```ts
const VIRTUAL_VIEWPORTS = 12;  // LONG even film. Not Elyse/Vertex 3.6. Not old 520vh.
const PSAVE_RATE        = 1.2;
const PSAVE_FRAME       = 1 / 24;
const PSAVE_REV_STRIDE  = 3;
const PSAVE_REV_STEP    = PSAVE_FRAME * PSAVE_REV_STRIDE; // 0.125 s
const PSAVE_LIVE_MS     = 280;  // Revel/Still-class live window
const PSAVE_COAST_SEC   = 0.55; // family leftover dest floor
const PSAVE_EASE_SEC    = 0.55; // family rate taper
const PSAVE_FLIP_DEADZONE_PX = 32;
```

| Constant | Value | Why this number |
|----------|-------|-----------------|
| `VIRTUAL_VIEWPORTS` | `12` | 47.63s even faces. Two 1800px flicks on 3.6 dump dest past Invite (feels like watching a video). On 12 those flicks aim ~one third of the film. Same number as Still / Revel, **different reason** (length, not a kick). Do not restore `520vh`. |
| `PSAVE_LIVE_MS` | `280` | Same live window as Revel / Still. |
| `PSAVE_COAST_SEC` / `PSAVE_EASE_SEC` | `0.55` | 48s film eats dest at 1.2×. Without the floor the lift is a tire screech. Family law. This is **not** old GSAP `scrub 0.55`. |
| `PSAVE_FLIP_DEADZONE_PX` | `32` | Same bounce ignore as Revel / Vertex / Still. |

Prism film (gold file):

| Field | Value |
|-------|--------|
| Path | `/assets/videos/prism-faces-v1.mp4` |
| Duration | `47.63s` |
| Frame rate | `24fps` |
| Frame count | `1143` |
| Encode | H.264, **GOP 3**, **no B-frames**, **381 I-frames** / 762 P / 0 B |
| Size | ~126 MB after GOP remaster (was ~27.9 MB, long GOP) |
| Poster file | `/assets/posters/prism-faces-v1.webp` (kick-seek `0.04→0`) |
| Backup | `tmp/prism-faces-v1.pre-gop.mp4` |

Prism **has** a required next-sibling band: `#atelier` (dark closing studio). `pageOwns` after the last frame. The demo page must **not** be `overflow: hidden`.

**Banned history (old Prism v1):** `520vh` sticky + GSAP `ScrollTrigger` scrub `0.55` seeking `currentTime`. Do not restore.

Prism acts (playhead `0…1`):

| Range | Act |
|-------|-----|
| `0 – 0.34` | Atelier |
| `0.34 – 0.66` | Proof |
| `0.66 – 1` | Invite |

Pack mode: **files zip + PDF**. Storefront `prism-scroll-preview-v1.mp4` + FS. Do **not** recapture unless the operator asks.

---

## 6. Stage and DOM

```text
.elyse-root                          (or product root)
  .elyse-pin                         100dvh, position: relative, in document flow
    .elyse-stage
      <video>                        muted playsInline preload="auto"
                                     NO autoPlay, NO loop, NO HTML poster
      veils / type / nav / gold bar
  #request                           NEXT SIBLING (membership / runway)
```

Rules:

- The pin is **one viewport tall**. It is **not** `position: fixed` and **not** `position: sticky` on a multi-vh spacer.
- The runway / next section is a **sibling after** the pin, never inside it.
- The **page** must **not** be `overflow: hidden`. After release the band must be able to scroll into view.
- `data-elyse-drive="psave"` marks the method on the root.
- Optional datasets for debug / capture: `data-elyse-playhead`, `data-elyse-target`, `data-elyse-dir` (`fwd` | `rev` | `idle`).

`sectionInView` (when the window listener may consider the stage):

```ts
const r = pin.getBoundingClientRect();
const mid = window.innerHeight * 0.5;
return r.top < mid && r.bottom > mid * 0.35;
```

That is **not** enough by itself. Also see §11 (pointer + page-owns).

---

## 7. The two clocks, in code

```ts
targetProgressRef   // destination 0…1   written by gestures
progressRef         // playhead 0…1      written by paintPlayheadUi from the picture
video.currentTime   // seconds            the decoder’s truth
```

**Aim math (destination only):**

```ts
virtualDistance = VIRTUAL_VIEWPORTS * window.innerHeight   // 3.6 × vh
destination     = clamp01(destination + deltaPx / virtualDistance)
```

`deltaPx` is **raw** (after `deltaMode` normalize). **No wheel gain. No swipe cap. No max-event dump.**

Wheel `deltaMode`:

- `0` (pixels): use `deltaY` as-is
- `1` (lines): `deltaY * 16`
- `2` (pages): `deltaY * innerHeight`

Ignore `ctrlKey` / `metaKey` (browser zoom). Ignore mostly-horizontal pans (`|deltaX| > |deltaY|` and `|deltaY| < 1`).

Coalesce wheel deltas to **one** `applyDelta` per animation frame.

Keys (Elyse gold):

- Arrow / Space: `± 0.045 * virtualDistance`
- PageUp / PageDown: that step `× 2.2`
- Do **not** trap Space on a focused `a, button, input, textarea, select, [contenteditable]`

Touch: finger `deltaY` (previous Y minus current Y) 1:1 onto the same track.

**Opposite-intent snap** (mandatory):

```ts
if (deltaPx < 0 && destination > playhead) destination = playhead; // first up cancels leftover forward aim
if (deltaPx > 0 && destination < playhead) destination = playhead; // first down cancels leftover reverse aim
```

Without this, an up-scroll after a crazy down-aim seeks (or walks) toward a stale far destination. Reverse would appear to “jump to where I stop.”

**Tiny opposite bounce (family law, required on Revel, recommended on every PSAVE):**

A trackpad often fires a 8–30px opposite tick when the person lifts. That tick is **not** reverse intent. If you run the opposite-intent snap on it, dest collapses onto the playhead and the film **stops dead**. That is the screech.

```ts
// ignore, do not markIntent, do not snap dest
if (thisSign !== lastIntentSign
    && abs(deltaPx) < PSAVE_FLIP_DEADZONE_PX   // 32
    && now - lastIntentAt < PSAVE_LIVE_MS + 120)
  return true
```

A **real** reverse (larger opposite, or opposite after the bounce window) still snaps dest to the picture. Do not disable opposite-intent snap.

`applyDelta` return value:

- `false` → this gesture is **release** (do not `preventDefault`)
- `true` → pin **owns** the gesture (or is eating it until the picture arrives)

Eat vs release:

| Condition | Return | Meaning |
|-----------|--------|---------|
| Picture at start **and** gesture up | `false` | Release (page already at top is a no-op) |
| Picture at end **and** gesture down | `false` | Release (runway may scroll in) |
| Destination at start **and** gesture up, picture not there yet | `true` | Eat. Pin stays. Film walks home. |
| Destination at end **and** gesture down, picture not there yet | `true` | Eat. Pin stays. Film plays to the last frame. |
| Otherwise | `true` | Move destination. |

---

## 8. Picture-arrived (do not trust the destination)

The chase can settle about one frame short of `duration`. If you only test `progressRef >= 0.9995`, the pin **never releases**.

Gold tests (use **both** the ref and the live clock):

```ts
pictureAtStart =
  progressRef <= 0.0005
  || currentTime <= 0.04

pictureAtEnd =
  progressRef >= 0.9995
  || currentTime >= duration - 0.08
```

When the chase settles (`|destinationTime - pictureTime| <= PSAVE_FRAME * 0.6`):

- If at film end → snap `currentTime = duration - 0.001`, `paintPlayheadUi(1)`
- If at film start → snap `currentTime = 0`, `paintPlayheadUi(0)`
- Else paint `currentTime / duration`

`ended` handler: pause, `loop = false`, seek `duration - 0.001`, paint `1`.

Never wait for `ended` alone. The settle path often pauses **before** `ended` fires.

---

## 9. Forward path (down-scroll)

When `destinationTime > pictureTime` and the person is **not** live-up:

1. Clear any reverse wait.
2. Disarm reverse.
3. `playbackRate = PSAVE_RATE` (`1.2`).
4. If paused, `video.play()` (muted, so autoplay policy allows it).
5. If `play()` rejects, fallback: seek forward by at most `min(error, PSAVE_RATE * dt, PSAVE_FRAME)` — **one frame**.
6. If `currentTime >= duration - 0.08`, pause, snap to last frame, paint `1`. Stop.

The limiter is the **playhead**, not the wheel. A fling can set destination to `1` in one burst. The film still plays ~`duration / 1.2` wall-seconds to the end (~8.4s for a 10s film).

Do **not** tween `currentTime` toward the destination with GSAP. Native `play()` is the forward engine. That is why forward looks like cinema.

### 9.1 The lift: leftover dest, friction, then a graceful stop

When the person **stops scrolling**, PSAVE must **not** pause on the last wheel tick.

**Elyse gold (by design):** leftover dest sits ahead of the playhead. `play()` at 1.2× keeps walking until dest. That leftover is the “keeps going a little.” It is not an accident. It is the friction stop.

**Why Revel lost it:** a 20s film at 1.2× eats dest in a fraction of a second, then a tiny opposite trackpad tick snaps dest onto the playhead. Chase sees `|err| <= settle` and **pauses**. That is a tire screech.

**Revel gold (same law, explicit floor):**

1. Ignore tiny opposite ticks (§7). Dest stays ahead.
2. On the falling edge of live (no up/down inside `PSAVE_LIVE_MS`): if dest is closer than `PSAVE_COAST_SEC` (0.55s of film) in the last intent direction, **push dest** to `playhead ± 0.55s`. Do this once per gesture (`coastApplied`). A new real intent clears the flag.
3. While chasing forward, if leftover dest is under `PSAVE_EASE_SEC` (0.55s), taper `playbackRate` from 1.2 toward a floor of ~0.42. Then settle-pause.
4. Do not apply the coast floor at film start on up, or film end on down (release must still work).
5. If dest is already well ahead (a real leftover), do not add more.

Operator lock on Revel: the stop is **friction, then a much more graceful slowdown**, not a sudden screech. Do not restore GSAP `power1.out` seek-scrub to fake this.

Elyse’s 10s even film usually keeps leftover dest without the explicit floor. Still teach leftover dest in the Elyse prompt so a replacement film does not lose the lift. If a replacement is long or eventful, copy Revel’s floor + ease + deadzone.

**Vertex gold (even 12s asteroid, third ship):** same law as Revel’s explicit floor. The film is even like Elyse, but 12s at 1.2× still eats dest. Live Vertex ships `PSAVE_COAST_SEC 0.55` + `PSAVE_EASE_SEC 0.55` + deadzone `32` + live `220`. Do not strip the floor because “it is an even film.”

---

## 10. Reverse path (up-scroll) — the 3-frame law

Browsers do not play MP4 backward. Reverse is a **commanded clock** (`revHead`) that only ever subtracts `PSAVE_REV_STEP`.

### 10.1 Reverse law (non-negotiable)

1. **Never** assign `currentTime = destination`.
2. Each seek may recede by **exactly** `PSAVE_REV_STEP` (`0.125s` = 3 frames at 24fps), or less if that would pass the destination.
3. Wait for `seeked` (safety timeout 200ms) before the next reverse seek.
4. Start reverse **while the gesture is live**, not after they stop.
5. After they stop, keep walking the same 3-frame steps at `PSAVE_RATE` until the picture arrives.
6. Walk the **live `<video>`**. No canvas. No ImageBitmap ring. No downscaled buffer.
7. `revHead` is the commanded time. UI paints `revHead / duration` while reverse is armed, so the gold bar does not wait on a late `seeked`.

### 10.2 Live-up detection

```ts
liveUp   = (now - lastUpAt   < PSAVE_LIVE_MS) && (lastUpAt >= lastDownAt)
liveDown = (now - lastDownAt < PSAVE_LIVE_MS) && (lastDownAt > lastUpAt)
```

`markIntent(delta)` stamps `lastUpAt` or `lastDownAt` from **every** consumed wheel / touch / key.

### 10.3 Issue one reverse step

```ts
next = max(destinationTime, revHead - PSAVE_REV_STEP)
if (next >= revHead) return          // already there
revHead = next
pause()
playbackRate = 1
wait for seeked (or 200ms safety)
currentTime = revHead
```

### 10.4 Chase order for reverse

1. **Live up:** arm reverse from `video.currentTime` if not armed. Pause. If `revHead > destination + settle` and not busy, issue one step **immediately** (do not wait for the 1.2× accumulator). Paint `revHead`.
2. **Armed, not live, still above destination:** accumulate `revAcc += PSAVE_RATE * dt`. When `revAcc >= PSAVE_REV_STEP`, subtract one step and issue. This is the 1.2× reverse after they stop.
3. **Armed and arrived:** disarm, clear wait.
4. Otherwise fall through to settle / forward / reverse-from-idle.

First up-scroll of a gesture also **snaps destination down to the playhead** (§7) so reverse never walks toward a leftover forward target.

### 10.5 Why reverse failed before (do not repeat)

| Failed idea | What the person saw | Why |
|-------------|---------------------|-----|
| Seek-scrub reverse (`currentTime = dest`) | Jump to where they stopped | Illegal jump |
| Every-rAF `currentTime--` | Stutter / tear | Decoder cannot keep up |
| 640×360 canvas buffer of extracted frames | Blurry, repeated frames | Wrong resolution; ring reuse |
| Wait until gesture ends, then catch up | “It waits till I stop” | Reverse must start live |
| Reverse only works near `t = 0` | Mid-film stall, then a jump near the start | **One I-frame at t=0**. Mid reverse must decode from 0. See §14. |

---

## 11. Release, page-owns, and the runway

### 11.1 When the pin may release

Only when the **picture** has arrived:

- Picture at **start** + gesture **up** → do not `preventDefault`
- Picture at **end** + gesture **down** → do not `preventDefault`

If destination is already at an end but the picture is still walking, **eat** the gesture (`preventDefault`, do not move destination further).

### 11.2 After release, the page owns scroll

A window-level `wheel` listener with only `sectionInView()` will keep stealing the wheel after the film ends. The pin is still ~100dvh. The membership band is on screen. The person puts the mouse on the runway, scrolls, and the **video** moves instead of the page.

Gold lock:

```ts
let pageOwns = false

// on every wheel / touch / key:
if (pin.getBoundingClientRect().top >= -2) pageOwns = false   // stage docked at top
if (pageOwns) return                                          // page scroll, do not touch the film

// when we actually release at the end:
if (pictureAtEnd && gestureDown) pageOwns = true
```

While `pageOwns` is true:

- No `preventDefault`
- No `applyDelta`
- No reverse / forward
- The runway scrolls like a normal page

When the person scrolls back up until the pin’s top is `>= -2` (docked), `pageOwns` clears. The next up-scroll on the stage reverses the film again.

### 11.3 Pointer must be on the stage

Even mid-journey (or after a scrollbar jump), a window listener must **ignore** events whose target is **not** the pin:

```ts
eventOnPin(e):
  pin.contains(e.target)
  || pin.contains(document.elementFromPoint(e.clientX, e.clientY))
```

Touch: same test with the touch point. Keys have no pointer; they honor `pageOwns` + `sectionInView` + no trap on focused controls.

Together: **mouse on the membership band never drives the film.**

---

## 12. Opening frame (heads-up law)

The Elyse poster file (`elyse-nature-v1.webp`) is a **mid-film look-down**. If you set it as the HTML `<video poster>`:

1. First paint is heads-down.
2. First scroll decodes frame 0 (heads-up).
3. The woman **jumps backward** to the start.

That is a product bug, not a feature.

Gold opening:

1. **Do not** set the HTML `poster` attribute.
2. Video starts `opacity: 0`.
3. On metadata / loaded data: kick-seek `0.04`, then on `seeked` seek `0`, wait `seeked` again, then fade in (`.is-ready { opacity: 1 }`).
4. Reduced motion: may use the poster as a **CSS stage fallback** and seek to `~0.42` (mid chapter). Skip PSAVE listeners.

First scroll must continue from heads-up. It must never jump *to* heads-up.

If a replacement film’s poster is the true first frame, you may use it as HTML poster. If you are not sure, do the kick-seek and skip HTML poster.

---

## 13. UI follows the picture

| Surface | Driven by |
|---------|-----------|
| Gold bar `scaleX` | Playhead |
| Chapter eyebrow / title / body | `chapterIndex(playhead)` |
| Scroll cue (“Scroll”) | Playhead `< 0.045` |
| Finale CTAs | Active chapter is last |
| Release | Picture-arrived, not destination |
| `getProgress()` | Playhead |
| `getTarget()` | Destination |
| `setProgress(p)` | **Snap** both clocks (capture / QA only) |

`paintPlayheadUi` always writes `progressRef` and the bar. React state (`setProgress` / `setActiveChapter`) only on chapter or cue change, so the chase rAF does not thrash React. **Release must not depend on React state.** Use `progressRef` + `video.currentTime`.

Elyse chapter ranges (playhead `0…1`):

| Range | Chapter |
|-------|---------|
| `0 – 0.24` | 01 The call |
| `0.24 – 0.50` | 02 The land |
| `0.50 – 0.76` | 03 The practice |
| `0.76 – 1.01` | 04 The return |

---

## 14. Video encode law (keyframes) — replacement films

**This is the section you need when the background video changes.**

PSAVE reverse seeks to `t, t-0.125, t-0.250, …`. The decoder must reach each of those times **from a nearby keyframe**.

### 14.1 What went wrong on the original Elyse master

Probe of the first client file:

- **1 I-frame**, at `t = 0`
- 76 P-frames, 164 B-frames
- Mid-film reverse had to decode from the start of the file on every seek
- Symptom: reverse **stalls in the middle**, then **jumps near the beginning**, then walks the last second gracefully to `0`

Forward `play()` hid the problem. Reverse revealed it.

### 14.2 What we ship now

Same pictures. Re-encoded in place after a backup:

```text
tmp/elyse-nature-v1.pre-gop.mp4     ← backup of the pre-GOP file
public/assets/videos/elyse-nature-v1.mp4
  -g 3 -keyint_min 3 -bf 0 -sc_threshold 0 -crf 16
  → 81 I-frames, 160 P-frames, 0 B-frames
  duration still 10.042s
  ~92.5 MB (was ~34 MB)
```

**GOP 3** means an I-frame every 3 frames, which matches `PSAVE_REV_STRIDE`. Reverse never has to walk more than one GOP to paint the next step.

### 14.3 Recipe for a replacement film

We normally deliver a client HD file that **already has these keyframes**. If the buyer (or an agent) swaps the background, they **must** re-encode before PSAVE reverse will be premium.

**Inputs we accept:** any silent cinematic MP4, ideally 24fps, 8–20 seconds, 1920×1080 or larger, no burnt UI, no audio required.

**ffmpeg (copy this):**

```bash
# 1. Backup the source. Never overwrite a master in place without a copy.
cp "your-film.mp4" "your-film.pre-gop.mp4"

# 2. Probe what you have
ffprobe -select_streams v:0 -show_entries stream=r_frame_rate,duration,nb_frames \
  -show_entries frame=pict_type -of csv=p=0 "your-film.mp4"
# Count I / P / B. If you see one I-frame at the start, reverse will fail.

# 3. Remaster for PSAVE reverse (same pictures, dense keyframes, no B-frames)
ffmpeg -y -i "your-film.mp4" -an \
  -c:v libx264 -pix_fmt yuv420p \
  -preset slow -crf 16 \
  -g 3 -keyint_min 3 -bf 0 -sc_threshold 0 \
  -movflags +faststart \
  "your-film-psave.mp4"

# 4. Confirm
ffprobe -show_frames -select_streams v:0 -show_entries frame=pict_type \
  -of csv=p=0 "your-film-psave.mp4" | find /c "I"
# Expect roughly (frameCount / 3) I-frames. Elyse 241 frames → 81 I.
```

| Flag | Meaning |
|------|---------|
| `-an` | Strip audio. Hero films are silent. |
| `-g 3` | Max GOP length 3 frames |
| `-keyint_min 3` | Min GOP length 3 (closed, regular) |
| `-bf 0` | **No B-frames.** B-frames make backward seeks decode a whole pyramid. |
| `-sc_threshold 0` | No scene-cut GOP resets (keeps the cadence even) |
| `-crf 16` | Visually lossless for a hero. File will be larger. That is correct. |
| `+faststart` | Moov atom at front so the first frame can decode quickly |

**24fps is gold** because `PSAVE_FRAME = 1/24` and `PSAVE_REV_STEP = 3/24`. If the replacement is 30fps or 60fps:

- Either conform to 24fps (`-r 24`) **or**
- Change `PSAVE_FRAME` to `1 / fps` and keep `PSAVE_REV_STRIDE = 3` so `PSAVE_REV_STEP = 3 / fps`

Do not leave `1/24` on a 30fps file. The reverse staircase will not land on frames.

**WebM / VP9:** fullscreen storefront may be mp4 or webm. **PSAVE client film is MP4 H.264.** Do not drive PSAVE off a storefront WebM. Do not use a 1-keyframe-per-GOP default VP9 encode for reverse.

**Do not extract PNG frames** and play a flipbook. The operator law on Elyse is: keep the film, put keyframes *in* the film.

### 14.4 How to tell the buyer’s AI

```
Replace the sanctuary film with my file. Re-encode it for PSAVE reverse before you wire it:
H.264, no audio, GOP 3, no B-frames, crf 16, +faststart.
Then point backgroundSrc at the remastered file.
Keep PSAVE: scroll aims, play forward 1.2x, reverse every 3rd frame, never jump.
Do not set a mid-film still as the HTML video poster.
Do not use the storefront preview as the hero film.
```

### 14.5 Storefront vs client (do not confuse)

| Role | File | PSAVE? |
|------|------|--------|
| Client HD (the design) | `elyse-nature-v1.mp4` | **Yes.** GOP 3. |
| Storefront page / FS | `elyse-scroll-preview-v1.mp4` / `-fs-` | **No.** Forward-only shop clip. Never GOP for reverse. Never scrub. Leave existing files (Prism lock 2026-08-15: no recapture). Future SKUs: GOP the full-size **client** film while building the demo, then screenshot that demo. |
| Backgrounds library | `elyse-nature-bg-v1.mp4` | Small tile. Not the hero. |
| Poster | `elyse-nature-v1.webp` | Mid-film still. Reduced-motion fallback only. |

---

## 15. Capture API

```ts
window.__msScrollNarrative = {
  setProgress,   // snap both clocks (QA / storefront capture)
  getProgress,   // playhead
  getTarget,     // destination
  productId: "MS-HERO-ELYS01",
}
```

Storefront capture: drive `setProgress(0…1)` over the film length. Do **not** `window.scrollTo` a fake tall track. Hide `[data-ms-scroll-cue]` before burning. Do not recapture unless asked.

`setProgress` is allowed to jump. Real visitors never call it.

---

## 16. Reduced motion

- `prefers-reduced-motion: reduce` → no wheel / touch / key listeners, no chase.
- Seek to `~0.42` (mid-film still).
- Poster may be the CSS stage background.
- Show a static chapter. No PSAVE.

---

## 17. Chase loop (state machine)

Every animation frame, after metadata exists:

```
dt = min(0.05, wallDelta)
destinationTime = destination * duration
liveUp / liveDown from §10.2
settle = PSAVE_FRAME * 0.6

if liveUp:
    arm reverse from currentTime if needed
    pause
    if revHead > destinationTime + settle and not busy: issueReverseStep
    paint revHead
    return

if reverse armed and revHead > destinationTime + settle:
    accumulate 1.2×, issue 3-frame steps
    paint revHead
    return

if reverse armed and arrived: disarm

err = destinationTime - pictureTime

if |err| <= settle:
    pause
    snap to 0 or 1 if at a film end, else paint picture
    return

if err > 0 and not liveUp:
    forward path (§9)
    return

// err < 0 and not already handled
arm reverse if needed
issueReverseStep
paint revHead
```

Cap `dt` at 50ms so a tab thaw does not dump half a second of reverse accumulator in one frame.

---

## 18. Hard bans (print these in every buyer brief)

1. Tall multi-vh sticky track (`460vh` spacer + `position: sticky` + ScrollTrigger pin).
2. `video.currentTime = destination * duration` on a large jump.
3. GSAP / ScrollTrigger scrub of the playhead.
4. Old Vertex `0.22` / old Revel seek-scrub `0.11` / GSAP lag `0.45`/`0.55` / swipe-cap numbers on a PSAVE product. (Live Vertex / live Revel `PSAVE_COAST_SEC 0.55` is leftover dest, not that lag.)
5. Low-res canvas or extracted-frame buffer for reverse.
6. Releasing because the **destination** hit an end while the picture is still walking.
7. Mid-film still as the HTML `<video poster>` when frame 0 is a different pose.
8. `overflow: hidden` on the page (runway can never appear).
9. Window wheel listener that keeps driving the film when the pointer is on the runway.
10. Replacement film with **one I-frame** (or a long GOP with B-frames).
11. Autoplay loop as the primary mode.
12. Burning MS / ClickMotion chrome into client HD.

---

## 19. Rebuild algorithm (copy into prompts)

If you reach for `ScrollTrigger.create`, `position: sticky`, a `460vh` spacer, or `video.currentTime = target * duration` on a large jump, stop.

1. Render **one `100dvh` stage** in normal document flow. The next section is the **next sibling**. Do not `overflow: hidden` the page.
2. Hold a **destination** `0…1` and a **playhead** equal to what the video is showing.
3. Opening: no mid-film HTML poster. Kick-seek `0.04 → 0`, wait `seeked`, fade in.
4. Virtual distance = `3.6 * innerHeight`. Gestures add `deltaPx / distance` to the **destination only**. Raw 1:1. No wheel gain.
5. Wheel (`passive: false`): ignore ctrl/meta zoom; normalize `deltaMode`; one apply per frame; `preventDefault` only while the pin owns the gesture.
6. Touch and keys are destination-only on the same track.
7. Each frame, walk the picture toward `destination * duration` at **1.2×**, never more than **1/24s** of film in a forward fallback tick.
8. **Down:** muted `play()` at `playbackRate 1.2`. Leftover dest after they lift is the graceful stop (Elyse). If leftover dest dies (12s+ even film, or long / eventful film), push dest at least `0.55s` of film ahead and ease rate over that last half-second (Vertex + Revel).
9. **Up:** first **real** up-scroll snaps destination to the picture. Ignore tiny opposite ticks (`< 32px` inside the live window). Walk live `currentTime` backward **exactly one 3-frame step per seek**, during the gesture and after. Wait `seeked`. Never seek to the stop point. No buffer. No loop.
10. Copy, chapters, gold bar follow the **playhead**.
11. Release only when the **picture** is at `0+up` or `1+down`. Eat gestures while the picture is still walking to an already-finished destination.
12. After release, **page owns** scroll until the stage docks at the top. Pointer on the runway never drives the film.
13. Replacement video: re-encode **GOP 3, no B-frames, crf 16** before wiring (§14). Size `VIRTUAL_VIEWPORTS` to **story earn**, not film-seconds (§5B). Do not extract PNG frames.
14. Reduced motion: still at `~0.42` (Elyse) / `~0.45` (Revel) / chapter 01 + poster (Vertex) / poster + chapter 1 (Still), no chase.

---

## 20. Smoke (must all pass)

| # | Act | Expect |
|---|-----|--------|
| 1 | Hard refresh, no scroll | Heads **up** (frame 0). No mid-film look-down. |
| 2 | One tiny wheel click down | A few frames creep. No jump. |
| 3 | Crazy fling down mid-film | Destination may leap. Picture **plays** forward at 1.2×. No skipped beat. |
| 4 | Mid-film, scroll up while moving | Reverse starts **during** the gesture. Every step is `0.125s`. No jump to 0. |
| 5 | Stop mid reverse | Continues 3-frame steps at 1.2× to the destination. Does not leap to the stop point. |
| 6 | Reverse from `t ≈ 6s` | Same 3-frame walk. No stall-then-jump-to-start. (If this fails, GOP is wrong.) |
| 7 | Picture at last frame, one more down | Page scrolls. Membership band (`#request`) enters the viewport. |
| 8 | Mouse on the band, wheel | **Page** moves. Film does **not**. |
| 9 | Scroll band away, dock stage at top, wheel up | Film takes over and reverses. |
| 10 | `prefers-reduced-motion` | Static mid still. No chase. |
| 11 | Mid-film, wheel | `scrollY` stays `0` until picture-at-end release. |
| 12 | Lift mid-chapter | Picture **keeps going a little**, then friction-eases to a stop. No tire screech. Dest stays ahead of playhead for ~0.5s of film. |
| 13 | Two natural flicks on Revel | Dest is a few seconds of picture, **not** half the film. Halfway beat (she leaves the phone) takes ~5–6 scrolls. |
| 14 | Two natural flicks on Vertex | Dest moves a chapter-scale amount on the **3.6** track. Film **plays**. No wheel-gain dump. Lift coasts (0.55s), no screech. |
| 15 | Vertex picture at last frame, one more down | Pin releases. Host page may continue. **No** footer band on Vertex. Demo page is not `overflow: hidden`. |
| 16 | Two natural flicks on Still | Dest is about one third of the 30s film (~10s of picture), **not** the last chapter. Page `scrollY` stays `0`. |
| 17 | Still lift mid-chapter | Picture keeps going a little (0.55s floor), then friction-eases. No screech. No 5s idle free-play. |
| 18 | Still reverse from mid-film | 3-frame walk. No stall-then-jump (if this fails, GOP is wrong; gold file is 240 I). |
| 19 | Prism reverse from mid-film | 3-frame walk. No stall-then-jump (if this fails, GOP is wrong; gold file is 381 I). |

Capture helper checks: `getProgress()` is the picture; `getTarget()` is the aim.

---

## 21. Porting PSAVE to another SKU

Do **not** roll PSAVE onto Meridian / Folio / Helix / Mirage unless the operator names PSAVE. **Elyse, Revel, Vertex, Still, and Prism are named.** Live Elyse, live Revel, live Vertex, live Still, and live Prism are PSAVE. Still and Prism dual process = PSAVE + No Scroller. **Helix is No Scroller only** (no reverse-played film). **Mirage is No Scroller only** (free-play desert film + card pivot; film never rewinds). Hybrid Option A, the `960vh` sticky track, and old Prism `520vh` GSAP scrub are banned. Locked earn `12` vh on Still’s 30s cosmos and Prism’s 47.63s faces (operator: “It is perfect.”).

When you *are* told to put PSAVE on a new film:

| Keep (method) | Re-derive (product) |
|---------------|---------------------|
| Two clocks | `VIRTUAL_VIEWPORTS` from **story earn**, not old seek-scrub numbers, not Elyse 3.6, not film-seconds/vh |
| 1.2× both ways | Chapter ranges vs duration |
| 3-frame reverse law | Brand, type, veils |
| Leftover dest on lift | Coast floor + rate ease if leftover dest dies (long or eventful film) |
| Tiny-opposite deadzone | Runway / next sibling content |
| Picture-gated release | Copy |
| pageOwns + pointer-on-pin | File name |
| GOP 3 / no B-frames | Poster (check if poster is really frame 0) |
| No HTML mid-film poster unless it **is** frame 0 | Perceived-time map: which beat must feel earned |
| No GSAP seek-scrub | |

Update **this file** if the method itself changes. Update the SKU prompt / PDF if only the product wrapper changes.

---

## 22. Elyse file index

| Role | Path |
|------|------|
| Gold component | `cleanroom/elyse-from-prompt/ElyseScrollNarrative.tsx` |
| Buyer brief (mirrors sold prompt) | `cleanroom/elyse-from-prompt/BUYER_PROMPT.md` |
| Sold prompt | `content/prompts/heroes/MS-HERO-ELYS01.mdx` |
| Demo | `src/app/(marketing)/demo/cleanroom-elyse/page.tsx` |
| Client HD | `public/assets/videos/elyse-nature-v1.mp4` |
| GOP backup | `tmp/elyse-nature-v1.pre-gop.mp4` |
| Poster (mid-film) | `public/assets/posters/elyse-nature-v1.webp` |
| Package PDF | `public/packages/MS-HERO-ELYS01/Elyse-package-e9l7s3e2k4m1-el5n8q.pdf` |
| PDF spec | `elyse_spec()` in `scripts/generate-product-package-pdf.py` |
| CMS upsert | `scripts/cms-upsert-elyse.cjs` |
| Prep | `docs/prep/MS-HERO-ELYS01-PREP.md` |
| Pack mode | **PDF-only** (no files zip). Opaque `e9l7s3e2k4m1` · PaidSalt `el5n8q` |

---

## 22A. Revel file index

| Role | Path |
|------|------|
| Gold component | `cleanroom/revel-from-prompt/RevelScrollNarrative.tsx` |
| Buyer brief (mirrors sold prompt) | `cleanroom/revel-from-prompt/BUYER_PROMPT.md` |
| Sold prompt | `content/prompts/heroes/MS-HERO-REVL01.mdx` |
| Demo | `src/app/(marketing)/demo/cleanroom-revel/page.tsx` |
| Client HD | `public/assets/videos/revel-breakout-v1.mp4` |
| GOP backup | `tmp/revel-breakout-v1.pre-gop.mp4` |
| Poster (frame 0) | `public/assets/posters/revel-breakout-v1.webp` |
| Package PDF | `public/packages/MS-HERO-REVL01/Revel-package-r7v3l9k2mx4q-rv8n3p.pdf` |
| PDF spec | `revel_spec()` in `scripts/generate-product-package-pdf.py` |
| CMS upsert | `scripts/cms-upsert-revel.cjs` |
| Prep | `docs/prep/MS-HERO-REVL01-PREP.md` |
| Pack mode | **PDF-only** (no files zip). Opaque `r7v3l9k2mx4q` · PaidSalt `rv8n3p` |
| Locked earn | `VIRTUAL_VIEWPORTS = 12` · `PSAVE_LIVE_MS = 280` · `PSAVE_COAST_SEC = 0.55` · `PSAVE_EASE_SEC = 0.55` · `PSAVE_FLIP_DEADZONE_PX = 32` |

---

## 22B. Vertex file index

| Role | Path |
|------|------|
| Gold component | `cleanroom/vertex-from-prompt/VertexHeroSection.tsx` |
| Buyer brief (mirrors sold prompt) | `cleanroom/vertex-from-prompt/BUYER_PROMPT.md` |
| Sold prompt | `content/prompts/heroes/MS-HERO-VERT01.mdx` |
| Demo | `src/app/(marketing)/demo/cleanroom-vertex/page.tsx` |
| Client HD | `public/assets/videos/vertex-globe-web-v1.mp4` |
| GOP backup | `tmp/vertex-globe-web-v1.pre-gop.mp4` |
| Poster (≈ frame 0) | `public/assets/posters/vertex-globe-v1.webp` |
| Package PDF | `public/packages/MS-HERO-VERT01/Vertex-package-b352guxju0ic.pdf` |
| PDF spec | `vertex_spec()` in `scripts/generate-product-package-pdf.py` |
| CMS upsert | `scripts/cms-upsert-vertex.cjs` |
| Prep | `docs/prep/MS-HERO-VERT01-PREP.md` |
| Pack mode | **PDF-only** (free listing, no files zip, no PaidSalt). Opaque `b352guxju0ic` |
| Locked earn | `VIRTUAL_VIEWPORTS = 3.6` · `PSAVE_LIVE_MS = 220` · `PSAVE_COAST_SEC = 0.55` · `PSAVE_EASE_SEC = 0.55` · `PSAVE_FLIP_DEADZONE_PX = 32` |
| Closing band | **None.** Do not add a footer / atelier / membership section. |

---

## 22C. Still file index

| Role | Path |
|------|------|
| Gold component | `cleanroom/still-from-prompt/StillMindfulnessHero.tsx` |
| Buyer brief (mirrors sold prompt) | `cleanroom/still-from-prompt/BUYER_PROMPT.md` |
| Sold prompt | `content/prompts/heroes/MS-HERO-STIL01.mdx` |
| Demo | `src/app/(marketing)/demo/cleanroom-still/page.tsx` |
| Client HD | `public/assets/videos/still-cosmos-v1.mp4` |
| GOP backup | `tmp/still-cosmos-v1.pre-gop.mp4` |
| Poster | `public/assets/posters/still-cosmos-v1.webp` |
| Package PDF | `public/packages/MS-HERO-STIL01/Still-package-s7i1l9m4ndf0-sk3p8w.pdf` |
| Files zip | `public/packages/MS-HERO-STIL01/Still-files-s7i1l9m4ndf0-sk3p8w.zip` |
| Pack folder | `public/packages/MS-HERO-STIL01/files/` |
| PDF spec | `still_spec()` in `scripts/generate-product-package-pdf.py` |
| CMS upsert | `scripts/cms-upsert-still.cjs` |
| Prep | `docs/prep/MS-HERO-STIL01-PREP.md` |
| Pack mode | **files zip + PDF** (paid). Opaque `s7i1l9m4ndf0` · PaidSalt `sk3p8w` |
| Locked earn | `VIRTUAL_VIEWPORTS = 12` · `PSAVE_LIVE_MS = 280` · `PSAVE_COAST_SEC = 0.55` · `PSAVE_EASE_SEC = 0.55` · `PSAVE_FLIP_DEADZONE_PX = 32` |
| Storefront | page+browse `still-preview-v1.webm` (keep WebM) · FS `still-preview-fs-v1.mp4` |
| Banned history | hybrid Option A · `960vh` sticky · GSAP scrub · mode chip |

---

## 22D. Prism file index

| Role | Path |
|------|------|
| Gold component | `cleanroom/prism-from-prompt/PrismLiquidGlass.tsx` |
| Buyer brief (mirrors sold prompt) | `cleanroom/prism-from-prompt/BUYER_PROMPT.md` |
| Sold prompt | `content/prompts/heroes/MS-HERO-PRSM01.mdx` |
| Demo | `src/app/(marketing)/demo/cleanroom-prism/page.tsx` |
| Client HD | `public/assets/videos/prism-faces-v1.mp4` |
| GOP backup | `tmp/prism-faces-v1.pre-gop.mp4` |
| Poster | `public/assets/posters/prism-faces-v1.webp` |
| Package PDF | `public/packages/MS-HERO-PRSM01/Prism-package-p8r3sm7k2n4q-pr5m2x.pdf` |
| Files zip | `public/packages/MS-HERO-PRSM01/Prism-files-p8r3sm7k2n4q-pr5m2x.zip` |
| Pack folder | `public/packages/MS-HERO-PRSM01/files/` |
| PDF spec | `prism_spec()` in `scripts/generate-product-package-pdf.py` |
| CMS upsert | `scripts/cms-upsert-prism.cjs` |
| Prep | `docs/prep/MS-HERO-PRSM01-PREP.md` |
| Pack mode | **files zip + PDF** (paid). Opaque `p8r3sm7k2n4q` · PaidSalt `pr5m2x` |
| Locked earn | `VIRTUAL_VIEWPORTS = 12` · `PSAVE_LIVE_MS = 280` · `PSAVE_COAST_SEC = 0.55` · `PSAVE_EASE_SEC = 0.55` · `PSAVE_FLIP_DEADZONE_PX = 32` |
| Storefront | page+browse `prism-scroll-preview-v1.mp4` · FS `prism-scroll-preview-fs-v1.mp4` |
| Closing band | `#atelier` next sibling |
| Banned history | `520vh` sticky · GSAP `ScrollTrigger` scrub `0.55` |
| Platinum | Backend-only PASS 2026-08-15 (wiring, prompts, documents, registries, CMS, zip/PDF). Visuals / storefront recapture skipped. |

---

## 23. History (so we do not re-open closed doors)

| Date | Decision |
|------|----------|
| 2026-08-14 | Elyse migrated off 460vh sticky to pin-until-complete. |
| 2026-08-14 | Seek-scrub + GSAP lag felt jumpy. Operator: scroll should aim, film should play, never jump. Named **PSAVE**. |
| 2026-08-14 | Reverse via canvas buffer: blurry, repeats. Removed. Live video only. |
| 2026-08-14 | Reverse every frame: jumpy. Locked **every 3rd frame**. |
| 2026-08-14 | Reverse waited until scroll stopped, then jumped to the stop point. Fixed: live start + `revHead` + never seek to dest. |
| 2026-08-14 | Mid-film reverse stalled then jumped to the start. Root cause: **1 I-frame**. GOP-3 remaster. |
| 2026-08-14 | Pin did not release: settle painted `~0.997`. Picture-arrived snap to `1`. |
| 2026-08-14 | Mouse on runway still drove the film. `pageOwns` + pointer-on-pin. |
| 2026-08-14 | Opening jump: HTML poster was mid-film look-down. Kick-seek `0.04→0`. |
| 2026-08-14 | Operator named PSAVE on Revel. Ported method. Art unchanged. GOP-3 remaster (161 I). |
| 2026-08-14 | Revel on 3.8 vh: two scrolls ended the film. Raised toward Elyse density (7.2). Still cheap. |
| 2026-08-14 | Revel lock: **12 vh** earn. Halfway beat takes ~5–6 scrolls. Film edit (slow then kick) stays. |
| 2026-08-14 | Revel lift was a screech (dest eaten + trackpad bounce). Locked leftover dest floor `0.55s`, rate ease `0.55s`, flip deadzone `32px`, live window `280ms`. Operator: friction then graceful stop. |
| 2026-08-14 | Operator named PSAVE on Vertex (“very much like Elyse”). Ported family engine. Art / chapters / chrome unchanged. **No footer band.** |
| 2026-08-14 | Vertex old encode: 13 I / 190 B. Reverse would stall. GOP-3 remaster in place: 97 I / 192 P / 0 B, 12.04s / 24fps / 289 frames, ~25.2 MB. Backup `tmp/vertex-globe-web-v1.pre-gop.mp4`. |
| 2026-08-14 | Vertex lock: **3.6 vh** (even asteroid approach) + family coast `0.55` / ease `0.55` / deadzone `32` / live `220`. Old `3.2` / `0.22` / `0.45` / GSAP banned. Operator: “I feel that it is perfect.” Do not recapture storefront. |
| 2026-08-14 | Operator named **dual process = PSAVE + No Scroller** on Still. Removed hybrid Option A and the `960vh` sticky track. Art / chapters / whispers / CTAs unchanged. |
| 2026-08-14 | Still old encode: ~16.7 MB, GOP ~30, 24 I. Reverse would stall. GOP-3 remaster: 240 I / 480 P / 0 B, 30.00s / 24fps / 720 frames, ~81.5 MB. Backup `tmp/still-cosmos-v1.pre-gop.mp4`. |
| 2026-08-15 | Still lock: **12 vh** (30s even cosmos) + family coast `0.55` / ease `0.55` / deadzone `32` / live `280`. Operator: “It is perfect.” Do not recapture storefront WebM. Do not restore hybrid / 960vh / gsap. |
| 2026-08-15 | Operator named **PSAVE + No Scrollbar** on Prism. Removed 520vh sticky and GSAP ScrollTrigger seek-scrub. Art / panels / atelier unchanged. |
| 2026-08-15 | Prism old encode: ~27.9 MB, long GOP. Reverse would stall. GOP-3 remaster: 381 I / 762 P / 0 B, 47.63s / 24fps / 1143 frames, ~126 MB. Backup `tmp/prism-faces-v1.pre-gop.mp4`. |
| 2026-08-15 | Prism lock: **12 vh** (47.63s even faces) + family coast `0.55` / ease `0.55` / deadzone `32` / live `280`. Operator: “It is perfect.” Do not recapture storefront. Do not restore 520vh / gsap. |
| 2026-08-15 | Prism Platinum Second Revision PASS (backend-only). Wiring, prompts, documents, registries, CMS, zip/PDF hashes re-smoked. Visuals / storefront recapture skipped by operator. |

Do not reopen these as “new ideas” without reading this table.

---

## 24. Operator one-liner

> PSAVE: pin-until-complete, aim 1:1 on a product earn track (Elyse 3.6 leftover dest / Vertex 3.6 + 0.55 coast / Revel 12 + 0.55 coast / Still 12 + 0.55 coast on a 30s even film / Prism 12 + 0.55 coast on a 47.63s even faces film), play 1.2× forward, reverse every 3rd frame on the live video, leftover dest keeps going a little on lift (Vertex + Revel + Still + Prism: 0.55s floor + rate ease + 32px bounce ignore), UI and release follow the picture, GOP 3 no B-frames, page owns the next sibling after the last frame. Vertex has no footer band. Still and Prism ship files zip + PDF. Dual process on Still and Prism = PSAVE + No Scroller.

If someone says “use PSAVE,” they mean this file.
