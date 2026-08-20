# STILL - start here

You are about to place a **mindfulness scroll narrative** on your site: a full-viewport cosmic transformation film under soft night type, with five quiet chapters.

**Dual process = PSAVE + No Scroller.**

- **No Scroller:** the page does not physically scroll while the journey runs. Wheel, trackpad, finger, and keys aim the film.
- **PSAVE (Perfect Scroll Video Engine):** scroll aims. The film plays forward or backward to that moment. The picture never jumps a frame. When they lift, the film keeps going a little, then eases to a stop.

You do not need to be a programmer. Your AI does the technical work.

## What is in this folder

| Item | For |
|------|-----|
| **PROMPT.md** | Give this to your AI. One instruction: build from this folder. |
| **CUSTOMIZATION.md** | Later: swap brand, chapters, colors, film. |
| **VIDEO_GEN_PROMPT.md** | Optional: generate a new client film with any video AI. Then re-encode GOP 3. |
| **assets/** | Client film + poster only (no website chrome, no storefront previews). |
| **source/** | Production React hero (drop-in). Prefer this over rewriting. |

## What you do (about 10 minutes)

1. Unzip this pack into a project folder (or open it next to your app). You should see this file at the top level.
2. Copy assets into your app:
   - `assets/still-cosmos-v1.mp4` → `public/assets/videos/still-cosmos-v1.mp4`
   - `assets/still-cosmos-v1.webp` → `public/assets/posters/still-cosmos-v1.webp`
3. Copy `source/StillMindfulnessHero.tsx` into your components folder.
4. **Do not install gsap.** Tailwind is optional if your stack already has it.
5. Load **Cormorant Garamond** (display) and **Inter** (UI). Wire CSS variables if you want parity:
   - `--font-still-display`
   - `--font-still-body`
6. Open your AI coding tool and say:

```
Build STILL using only the files in this pack folder.
Read PROMPT.md and follow it exactly. Use the source and assets provided.
Dual process: PSAVE plus No Scroller. One 100dvh stage. Scroll aims on 12 viewports.
Down plays the film forward at 1.2x. Up plays it backward every 3rd frame. Never jump a frame.
Do not install gsap. Do not build a tall 960vh sticky track. Do not add a 5s idle free-play.
```

7. Confirm:
   - Full-viewport night mindfulness hero
   - The **page does not physically scroll** during the journey
   - Tiny wheel click creeps a few frames; a fling plays the movie (does not jump)
   - Lift mid-chapter: film keeps going a little, then eases to a stop
   - Scroll up: film walks backward, no jump to the start
   - Five chapters, mint progress line, end CTAs + stats
   - No mode chip. No "Breathing with you"
   - After the last frame, one more down-scroll may move the host page
   - Reduced motion: still frame + chapter 1 only

## Default entry

```tsx
import StillMindfulnessHero from "./source/StillMindfulnessHero";

export default function Page() {
  return <StillMindfulnessHero />;
}
```

If you use Next.js `next/font`, wrap the page so Cormorant Garamond and Inter map to the CSS variables above (see PROMPT.md). **Do not** set `overflow: hidden` on the page. After the film finishes, a host page must be able to scroll.

## What this pack is not

- Not a recording of our website UI
- Not storefront preview videos (those are presentation only)
- Not a multi-file dump of thumbs or storefront chrome
- Not the old hybrid (scroll-scrub + 5s idle free-play on a 960vh track)
- Just what you need to rebuild the experience and make it yours

## If something fails

Paste the error into the same AI and say:

> Fix this for me without asking me to write code. Keep dual process: PSAVE plus No Scroller. Scroll aims on 12 viewports. Down plays at 1.2x. Up reverses every 3rd frame. Leftover dest plus 0.55s dest floor on lift. Never jump a frame. Never restore gsap, a 960vh sticky track, or 5s idle free-play. Do not ask me to write code.

ClickMotion · www.ClickMotion.dev
