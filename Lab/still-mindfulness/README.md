# Lab - STILL mindfulness

**Ship target:** `MS-HERO-STIL01` · cleanroom `cleanroom/still-from-prompt` · demo `/demo/cleanroom-still`

## Why lab

Original research house for STILL. **Live product is not the lab hybrid.**

**Dual process (locked 2026-08-15):** **PSAVE + No Scroller.** Operator: "It is perfect."

- **No Scroller:** one pinned `100dvh` stage. The page does not physically scroll during the journey.
- **PSAVE:** scroll aims on **12** viewports. Down plays forward at 1.2x. Up reverses every 3rd frame. Leftover dest + 0.55s dest floor on lift.

Hybrid Option A (5s idle free-play), the `960vh` sticky track, GSAP ScrollTrigger, and the mode chip are **banned history**. Do not restore them from this folder.

Canonical method: `docs/PSAVE.md` §5D. Gold component: `cleanroom/still-from-prompt/StillMindfulnessHero.tsx`.

## Source film

- Operator drop: `test videos/Growth2_1.mp4` (30s, 1920x1080, 24fps)
- Vault master: `public/assets/videos/originals/still-cosmos-master-v1.mp4`
- Client HD: `public/assets/videos/still-cosmos-v1.mp4` (H.264 **GOP 3**, **no B-frames**, 24fps, 720 frames, 240 I / 480 P / 0 B, ~82 MB)
- Pre-GOP backup: `tmp/still-cosmos-v1.pre-gop.mp4` (~16.7 MB, long GOP, do not ship)
- Replacement films must be re-encoded GOP 3 / no B-frames (`docs/PSAVE.md` §14). Do not use a 1-2s keyframe interval.

## Research

See `research/BRAND-CRAFT.md` (Calm / Headspace language and craft lessons). Motion rows in that file that still mention idle hybrid / mode chip / breath ring are **historical**. Live product has no mode chip and no center ring.

## Production truth

Do **not** fork behavior in demo. Demo imports cleanroom `StillMindfulnessHero.tsx` only. Do **not** port lab hybrid notes into cleanroom or the buyer pack.

## Status

2026-08-15 - **PSAVE v2.0.0 locked.** Dual process PSAVE + No Scroller. Files zip + PDF. Storefront WebM left as-is. **Platinum Second Revision PASS** (backend-only).
