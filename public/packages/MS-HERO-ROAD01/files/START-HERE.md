# ROADSTER - start here

You are about to place a **studio-drive hero** on your site: a looping high-key film, scroll-paced product cards, then a black specs sheet that pulls up over the film with a spinning 3D model.

**No Scroller (pin-until-complete).**

- Scroll aims the cards and the sheet. The page does not physically scroll while the viewing runs.
- The film loops on its own clock. Scroll never seeks the video.
- Wheel, trackpad, finger, and keys advance the journey.
- When the sheet is fully up, the pin releases so the rest of your page may continue.
- Then the **page owns scroll** until the hero docks at the top of the viewport again.
- Scrolling up in the next section must move the **page**, not rewind the story.

Do not add PSAVE. Do not install gsap or lenis.

You do not need to be a programmer. Your AI does the technical work.

## What is in this folder

| Item | For |
|------|-----|
| **PROMPT.md** | Give this to your AI. One instruction: build from this folder. |
| **CUSTOMIZATION.md** | Later: swap brand, film, GLB, specs. |
| **assets/studio-drive.mp4** | Pure studio film (no website chrome). |
| **assets/roadster.glb** | 3D vehicle for the turntable. |
| **source/** | Production React hero (drop-in). Prefer this over rewriting. |

## What you do (about 15 minutes)

1. Unzip this pack into a project folder. You should see this file at the top level.
2. Copy assets into your app:
   - `assets/studio-drive.mp4` → `public/assets/roadster/studio-drive.mp4`
   - `assets/roadster.glb` → `public/assets/roadster/roadster.glb`
3. Copy `source/` into your components folder (keep the three files together).
4. Install `three`, `@react-three/fiber`, `@react-three/drei`. **Do not install gsap or lenis.**
5. Open your AI coding tool and say:

```
Build ROADSTER using only the files in this pack folder.
Read PROMPT.md and follow it exactly. Use the source and assets provided.
No Scroller: pin-until-complete. One 100dvh stage. Scroll aims on 13.3 viewports.
Release at 0 plus up or 1 plus down.
After release at the end, the page owns scroll until the stage docks (top >= 0; implement >= -2).
Do not install gsap or lenis. Do not build a tall multi-vh sticky track. Do not add PSAVE.
Never map scroll to video.currentTime.
```

6. Confirm:
   - Full-viewport high-key film
   - The **page does not physically scroll** during the viewing
   - Cards enter, hold, and exit. Then the black sheet pulls up with a spinning model
   - After the last moment, one more down-scroll lets the page continue
   - After release, scrolling up in the next section moves the page, not the story
   - Reduced motion: settled cards and docked sheet

## Default entry

```tsx
import TeslaRoadsterPromo from "./source/TeslaRoadsterPromo";

export default function Page() {
  return <TeslaRoadsterPromo />;
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

> Fix this for me without asking me to write code. Keep No Scroller: pin-until-complete. Scroll aims on 13.3 viewports. After release at the end, the page owns until dock. Never restore ScrollTrigger pin, gsap, lenis, SmoothScroll, or a tall multi-vh sticky track. Do not add PSAVE. Do not scrub the film. Do not ask me to write code.

ClickMotion · www.ClickMotion.dev
