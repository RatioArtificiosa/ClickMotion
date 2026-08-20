# ACTUALLY - start here

You are about to place a **product hero** on your site: a living 3D vessel, a pointer window into the brand, and scroll that opens the formula.

**No Scroller (pin-until-complete).**

- Scroll aims the reveal. The page does not physically scroll while the viewing runs.
- The circle window expands. The can locks. The formula story lands.
- Wheel, trackpad, finger, and keys advance the journey.
- When the journey ends, the pin releases so the rest of your page may continue.
- Then the **page owns scroll** until the hero docks at the top of the viewport again.
- Scrolling up in the next section must move the **page**, not rewind the reveal.

Do not add PSAVE. Do not install lenis.

You do not need to be a programmer. Your AI does the technical work.

## What is in this folder

| Item | For |
|------|-----|
| **PROMPT.md** | Give this to your AI. One instruction: build from this folder. |
| **CUSTOMIZATION.md** | Later: swap brand, mesh, copy. |
| **assets/can.glb** | Default 3D vessel. |
| **assets/still-01-clear-2.png** (and dawn / dusk) | Demo labels. |
| **assets/studio_small_03_1k.hdr** | Studio reflections. |
| **assets/actually-01.png** | Optional marketing still. |
| **source/** | Production React hero (drop-in). Prefer this over rewriting. |

## What you do (about 10 minutes)

1. Unzip this pack into a project folder. You should see this file at the top level.
2. Copy assets into your app:
   - `assets/can.glb` → `public/models/can.glb`
   - `assets/still-*.png` → `public/textures/labels/`
   - `assets/studio_small_03_1k.hdr` → `public/hdri/studio_small_03_1k.hdr`
3. Copy `source/` into your components folder.
4. Install `gsap`, `three`, `@react-three/fiber`, `@react-three/drei`. **Do not install lenis.**
5. Open your AI coding tool and say:

```
Build ACTUALLY using only the files in this pack folder.
Read PROMPT.md and follow it exactly. Use the source and assets provided.
No Scroller: pin-until-complete. One 100dvh stage. Scroll aims on 1.2 viewports.
Release at 0 plus up or 1 plus down.
After release at the end, the page owns scroll until the stage docks (top >= 0; implement >= -2).
Do not install lenis. Do not build a tall multi-vh sticky track. Do not add PSAVE.
Keep gsap for pointer, clip, and support tweens only. Do not use ScrollTrigger to pin.
```

6. Confirm:
   - Full-viewport bone paper over ink
   - The **page does not physically scroll** during the viewing
   - Pointer window + living 3D can + grab
   - After the last moment, one more down-scroll lets the page continue
   - After release, scrolling up in the next section moves the page, not the reveal
   - Reduced motion: static product pose

## Default entry

```tsx
import ActuallyHero from "./source/ActuallyHero";

export default function Page() {
  return <ActuallyHero />;
}
```

**Do not** set `overflow: hidden` on the page. After the hero finishes, the next section must be able to scroll in.

## What this pack is not

- Not a recording of our website UI
- Not storefront preview videos
- Not a tall GSAP pin track
- Not PSAVE
- Just what you need to rebuild the experience and make it yours

## If something fails

Paste the error into the same AI and say:

> Fix this for me without asking me to write code. Keep No Scroller: pin-until-complete. Scroll aims on 1.2 viewports. After release at the end, the page owns until dock. Never restore ScrollTrigger pin, lenis, SmoothScroll, or a tall multi-vh sticky track. Do not add PSAVE. Do not ask me to write code.

ClickMotion · www.ClickMotion.dev
