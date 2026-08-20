# PRISM - start here

You are about to place a **creative identity scroll narrative** on your site: a full-viewport multi-face sculpture film under liquid-glass panels that float on both sides.

**Dual process = PSAVE + No Scroller.**

- **No Scroller:** the page does not physically scroll while the journey runs. Wheel, trackpad, finger, and keys aim the film.
- **PSAVE (Perfect Scroll Video Engine):** scroll aims. The film plays forward or backward to that moment. The picture never jumps a frame. When they lift, the film keeps going a little, then eases to a stop.

You do not need to be a programmer. Your AI does the technical work.

## What is in this folder

| Item | For |
|------|-----|
| **PROMPT.md** | Give this to your AI. One instruction: build from this folder. |
| **CUSTOMIZATION.md** | Later: swap brand, panels, colors, film. |
| **VIDEO_GEN_PROMPT.md** | Optional: generate a new client film with any video AI. Then re-encode GOP 3. |
| **assets/** | Client film + poster only (no website chrome, no storefront previews). |
| **source/** | Production React hero (drop-in). Prefer this over rewriting. |

## What you do (about 10 minutes)

1. Unzip this pack into a project folder (or open it next to your app). You should see this file at the top level.
2. Copy assets into your app:
   - `assets/prism-faces-v1.mp4` → `public/assets/videos/prism-faces-v1.mp4`
   - `assets/prism-faces-v1.webp` → `public/assets/posters/prism-faces-v1.webp`
3. Copy `source/PrismLiquidGlass.tsx` into your components folder.
4. **Do not install gsap.** Tailwind is optional if your stack already has it.
5. Load **Syne** (display) and **DM Sans** (UI). Wire CSS variables if you want parity:
   - `--font-prism-display`
   - `--font-prism-sans`
6. Open your AI coding tool and say:

```
Build PRISM using only the files in this pack folder.
Read PROMPT.md and follow it exactly. Use the source and assets provided.
Dual process: PSAVE plus No Scroller. One 100dvh stage. Scroll aims on 12 viewports.
Down plays the film forward at 1.2x. Up plays it backward every 3rd frame. Never jump a frame.
Do not install gsap. Do not build a tall 520vh sticky track. Do not collapse to a left-column-only layout.
```

7. Confirm:
   - Full-viewport studio-mist identity hero
   - The **page does not physically scroll** during the journey
   - Tiny wheel click creeps a few frames; a fling plays the movie (does not jump)
   - Lift mid-act: film keeps going a little, then eases to a stop
   - Scroll up: film walks backward, no jump to the start
   - Liquid glass panels on **both left and right** (chips, metrics, quotes, features, CTA)
   - Moment pill Atelier / Proof / Invite follows the picture
   - After the last frame, one more down-scroll reveals the dark atelier band
   - Reduced motion: mid composition at 0.42, no chase

## Default entry

```tsx
import PrismLiquidGlass from "./source/PrismLiquidGlass";

export default function Page() {
  return <PrismLiquidGlass />;
}
```

If you use Next.js `next/font`, wrap the page so Syne and DM Sans map to the CSS variables above (see PROMPT.md). **Do not** set `overflow: hidden` on the page. After the film finishes, the atelier band must be able to scroll in.

## What this pack is not

- Not a recording of our website UI
- Not storefront preview videos (those are presentation only)
- Not a multi-file dump of thumbs or storefront chrome
- Not the old seek-scrub (520vh sticky + GSAP ScrollTrigger)
- Just what you need to rebuild the experience and make it yours

## If something fails

Paste the error into the same AI and say:

> Fix this for me without asking me to write code. Keep dual process: PSAVE plus No Scroller. Scroll aims on 12 viewports. Down plays at 1.2x. Up reverses every 3rd frame. Leftover dest plus 0.55s dest floor on lift. Never jump a frame. Never restore gsap, a 520vh sticky track, or a left-column-only layout. Do not ask me to write code.

ClickMotion · www.ClickMotion.dev
