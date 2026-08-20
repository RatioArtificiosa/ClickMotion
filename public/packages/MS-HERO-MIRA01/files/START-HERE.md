# MIRAGE - start here

You are about to place a **full-viewport agency hero** on your site: five morphic liquid-glass story cards pivot on the left while desert film plays freely on the right.

**No Scroller (pin-until-complete).**

- Scroll aims the cards. The page does not physically scroll while the viewing runs.
- Wheel, trackpad, finger, and keys advance the five glass sheets.
- The film free-plays muted. It does not rewind. It is not scrubbed.
- When the last card closes and the visitor scrolls down, the pin **releases**.
- Then the **page owns scroll** until the hero docks at the top of the viewport again.
- Scrolling up in the next section must move the **page**, not rewind the cards.

There is no reverse-played film. Do not add PSAVE. Do not install gsap or lenis.

You do not need to be a programmer. Your AI does the technical work.

## What is in this folder

| Item | For |
|------|-----|
| **PROMPT.md** | Give this to your AI. One instruction: build from this folder. |
| **CUSTOMIZATION.md** | Later: swap brand, headline, cards, accents, film. |
| **assets/** | Client desert film + pure film poster (no storefront previews). |
| **source/** | Production React hero (drop-in). Prefer this over rewriting. |

Default demo content (MIRAGE wordmark, sample agency sheets, "Creative that / survives the heat.") is only a starting board. Tell your AI to restage everything until it reads as you alone.

## Critical motion law (do not ignore)

- **No Scroller:** one `100dvh` stage. **No** tall multi-page scrollbar track.
- Earn is **virtual**: `5 x 1.55` viewports at five sheets (7.75 viewport heights of wheel distance). Not page height.
- Cards follow progress 1:1. Film **free-plays** muted (never scrub `video.currentTime`).
- Release at progress **0 plus up**, or progress **1 plus down**.
- **Pin freeing (mandatory):** after release at the end, the **page** owns the wheel until the stage docks (`stage.top >= 0`, use `>= -2`). Pointer on the next sibling never drives the cards.

## What you do (about 10 minutes)

1. Unzip this pack into a project folder. You should see this file at the top level.
2. Copy assets into your app:
   - `assets/mirage-desert-v1.mp4` → `public/assets/videos/mirage-desert-v1.mp4`
   - `assets/mirage-desert-v1.webp` → `public/assets/posters/mirage-desert-v1.webp` (optional poster)
3. Copy `source/MirageAgencyHero.tsx` into your components folder.
4. Install **framer-motion**. Tailwind is optional if your stack already has it.
5. **Do not install gsap. Do not install lenis.**
6. Load **Syne** (display) and **DM Sans** (body). Wire CSS variables if you want parity:
   - `--font-mirage-display`
   - `--font-mirage-sans`
7. Open your AI coding tool and say:

```
Build MIRAGE using only the files in this pack folder.
Read PROMPT.md and follow it exactly. Use the source and assets provided.
No Scroller: pin-until-complete. One 100dvh stage. Scroll aims virtual progress on 5 x 1.55 viewports.
Cards follow that progress 1:1. Film free-plays muted. At 0 plus up, or 1 plus down, release.
After release at the end, the page owns scroll until the stage docks (top >= 0).
Pointer on the next sibling must never drive the cards.
Do not install gsap or lenis. Do not build a tall multi-vh sticky track. Do not add PSAVE. Do not scrub the film.
```

8. Confirm:
   - Full-viewport dark cinematic hero
   - The **page does not physically scroll** during the five-card viewing
   - Desert film plays on the right and never rewinds
   - Five morphic dark glass cards pivot on the left
   - After the last card, one more down-scroll lets the page continue
   - Scrolling up in the next section moves the page first. Cards do not rewind until the hero is back at the top
   - Reduced motion: static stacked cards, no video chase

## Default entry

```tsx
import MirageAgencyHero from "./source/MirageAgencyHero";

export default function Page() {
  return <MirageAgencyHero />;
}
```

If you use Next.js `next/font`, wrap the page so Syne and DM Sans map to the CSS variables above (see PROMPT.md). **Do not** set `overflow: hidden` on the page. After the last card, the next section must be able to scroll in.

## What this pack is not

- Not a recording of our website UI
- Not storefront preview videos
- Not a tall sticky scroll track
- Not PSAVE (the film does not play in reverse)
- Just what you need to rebuild the experience and make it yours

## If something fails

Paste the error into the same AI and say:

> Fix this for me without asking me to write code. Keep No Scroller: pin-until-complete. Scroll aims on 5 x 1.55 viewports. Cards follow progress 1:1. Film free-plays. After the last card, the page owns scroll until the hero docks at the top. Never restore gsap, lenis, or a tall multi-vh sticky track. Do not add PSAVE. Do not scrub video.currentTime. Do not ask me to write code.

ClickMotion · www.ClickMotion.dev
