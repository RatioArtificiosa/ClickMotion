# HELIX - start here

You are about to place a **mid-page design gallery** on your site: nine of your pieces ride a 3D helix while giant titles cross a calm gray stage.

**No Scroller (pin-until-complete).**

- Scroll aims the helix. The page does not physically scroll while the viewing runs.
- Wheel, trackpad, finger, and keys advance the cards and titles.
- When the journey ends, the pin releases so the rest of your page may continue.
- Then the **page owns scroll** until the section docks at the top of the viewport again.
- Scrolling up in the next section must move the **page**, not rewind the helix.

There is no film to rewind. Do not add PSAVE. Do not install gsap or lenis.

You do not need to be a programmer. Your AI does the technical work.

## What is in this folder

| Item | For |
|------|-----|
| **PROMPT.md** | Give this to your AI. One instruction: build from this folder. |
| **CUSTOMIZATION.md** | Later: swap brand, titles, cards, colors. |
| **assets/** | Nine gallery stills only (no storefront previews). |
| **source/** | Production React section (drop-in). Prefer this over rewriting. |

## What you do (about 10 minutes)

1. Unzip this pack into a project folder. You should see this file at the top level.
2. Copy assets into your app:
   - `assets/orbit-01.jpg` … `assets/orbit-09.jpg` → `public/assets/images/orbit/orbit-01.jpg` … `orbit-09.jpg`
3. Copy `source/HelixGallerySection.tsx` and `source/OrbitHelix.tsx` into your components folder.
4. Install **three** and **@react-three/fiber**. Tailwind is optional if your stack already has it.
5. **Do not install gsap. Do not install lenis.**
6. Load **Inter** (or Neue Haas / Helvetica Neue) for titles and **Birthstone** (or your brand script) for the wordmark. Wire CSS variables if you want parity:
   - `--font-helix-display`
   - `--font-helix-wordmark`
7. Open your AI coding tool and say:

```
Build HELIX using only the files in this pack folder.
Read PROMPT.md and follow it exactly. Use the source and assets provided.
No Scroller: pin-until-complete. One 100dvh stage. Scroll aims on 5 viewports desktop / 3 mobile.
Titles and helix follow progress 1:1. Release at 0 plus up or 1 plus down.
After release at the end, the page owns scroll until the stage docks (top >= 0; implement >= -2).
Do not install gsap or lenis. Do not build a tall multi-vh sticky track. Do not add PSAVE.
```

8. Confirm:
   - Full-viewport cool-gray gallery section
   - The **page does not physically scroll** during the viewing
   - Nine cards ride the helix with thin guide rails
   - "Design in" enters from the left; "motion" from the right; they cross and leave
   - After the last moment, one more down-scroll lets the page continue
   - After release, scrolling up in the next section moves the page, not the helix
   - Reduced motion: mid composition, no chase

## Default entry

```tsx
import HelixGallerySection from "./source/HelixGallerySection";

export default function Page() {
  return <HelixGallerySection />;
}
```

If you use Next.js `next/font`, wrap the page so Inter and Birthstone map to the CSS variables above (see PROMPT.md). **Do not** set `overflow: hidden` on the page. After the helix finishes, the next section must be able to scroll in.

## What this pack is not

- Not a recording of our website UI
- Not storefront preview videos
- Not a tall GSAP pin track
- Not PSAVE (there is no reverse-played film)
- Just what you need to rebuild the experience and make it yours

## If something fails

Paste the error into the same AI and say:

> Fix this for me without asking me to write code. Keep No Scroller: pin-until-complete. Scroll aims on 5 viewports desktop / 3 mobile. Titles and helix follow progress 1:1. After release at the end, the page owns until dock. Never restore gsap, lenis, SmoothScroll, or a tall multi-vh sticky track. Do not add PSAVE. Do not ask me to write code.

ClickMotion · www.ClickMotion.dev
