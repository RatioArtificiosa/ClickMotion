# STUDIO SEQUENCE - start here

You are about to place a **cinematic camera pull-out** on your site: visitors begin inside a full-bleed film, then the world draws back until that same film plays on a street billboard.

**No Scroller (pin-until-complete).**

- Scroll aims the camera. The page does not physically scroll while the viewing runs.
- The film free-plays on its own clock. Scroll never seeks the video.
- Wheel, trackpad, finger, and keys advance the pull-out.
- When the journey ends, the pin releases so the rest of your page may continue.
- Then the **page owns scroll** until the section docks at the top of the viewport again.
- Scrolling up in the next section must move the **page**, not rewind the camera.

Do not add PSAVE. Do not install gsap or lenis.

You do not need to be a programmer. Your AI does the technical work.

## What is in this folder

| Item | For |
|------|-----|
| **PROMPT.md** | Give this to your AI. One instruction: build from this folder. |
| **CUSTOMIZATION.md** | Later: swap film, plate, earn, brand. |
| **assets/billboard-film.mp4** | The pure billboard cinema (no website chrome). |
| **assets/street-plate.png** | The street stage the camera pulls out to. |
| **source/** | Production React section (drop-in). Prefer this over rewriting. |

## What you do (about 10 minutes)

1. Unzip this pack into a project folder. You should see this file at the top level.
2. Copy assets into your app:
   - `assets/billboard-film.mp4` → `public/assets/studio/billboard-film.mp4`
   - `assets/street-plate.png` → `public/assets/studio/street-plate.png`
3. Copy `source/StudioSequence.tsx` and `source/studio-data.ts` into your components folder.
4. **Do not install gsap. Do not install lenis.**
5. Open your AI coding tool and say:

```
Build STUDIO SEQUENCE using only the files in this pack folder.
Read PROMPT.md and follow it exactly. Use the source and assets provided.
No Scroller: pin-until-complete. One 100dvh stage. Scroll aims on 4 viewports desktop / 3 mobile.
Camera follows progress 1:1. Film free-plays. Release at 0 plus up or 1 plus down.
After release at the end, the page owns scroll until the stage docks (top >= 0; implement >= -2).
Do not install gsap or lenis. Do not build a tall multi-vh sticky track. Do not add PSAVE. Do not seek the film with scroll.
```

6. Confirm:
   - Full-viewport black stage
   - The **page does not physically scroll** during the viewing
   - Open is full-bleed film
   - End is a living street billboard with the same film on the board
   - After the last moment, one more down-scroll lets the page continue
   - After release, scrolling up in the next section moves the page, not the camera
   - Reduced motion: street rest, film may still play

## Default entry

```tsx
import StudioSequence from "./source/StudioSequence";

export default function Page() {
  return <StudioSequence />;
}
```

**Do not** set `overflow: hidden` on the page. After the pull-out finishes, the next section must be able to scroll in.

## What this pack is not

- Not a recording of our website UI
- Not storefront preview videos
- Not a tall GSAP pin track
- Not PSAVE (the film does not play in reverse)
- Just what you need to rebuild the experience and make it yours

## If something fails

Paste the error into the same AI and say:

> Fix this for me without asking me to write code. Keep No Scroller: pin-until-complete. Scroll aims on 4 viewports desktop / 3 mobile. Camera follows progress 1:1. Film free-plays. After release at the end, the page owns until dock. Never restore gsap, lenis, SmoothScroll, or a tall multi-vh sticky track. Do not add PSAVE. Do not seek the film with scroll. Do not ask me to write code.

ClickMotion · www.ClickMotion.dev
