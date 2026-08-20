# FOLIO - start here

You are about to place a **mid-page enterprise decision section** on your site: five dense liquid-glass panels that pivot on a **pin-until-complete** journey over a looping motion film.

You do not need to be a programmer. Your AI does the technical work.

## What is in this folder

| Item | For |
|------|-----|
| **PROMPT.md** | Give this to your AI. One instruction: build from this folder. |
| **CUSTOMIZATION.md** | Later: rebrand sheets, copy, glass, film. |
| **assets/** | Client film only (no storefront previews). |
| **source/** | Production React section (drop-in). |

Default sheet names and metrics are a **starting board**. Rewrite them until every panel reads as your company alone.

## Critical motion law (do not ignore)

- **Pin-until-complete:** one full-viewport stage. **No** tall multi-page scrollbar track.
- Wheel / trackpad / touch / keys advance **virtual progress 0→1**.
- Glass panels pivot. Film **free-plays** muted (never scrub `video.currentTime`).
- On a real site: section pins while the journey runs, then **releases** so the page can continue.
- After release at the end, the **page owns scroll** until the section docks at the top.
- Scrolling up in the next section must move the **page**, not rewind the cards.

## What you do (about 10 minutes)

1. Unzip this pack into a project folder.
2. Copy assets:
   - `assets/folio-blurry-v1.mp4` → `public/assets/videos/folio-blurry-v1.mp4`
3. Copy `source/FolioPivotSection.tsx` into your components folder.
4. Install: `framer-motion`, and Tailwind if needed.
5. Load **Syne** + **DM Sans**. Wire CSS variables if you use them:
   - `--font-folio-display`
   - `--font-folio-sans`
6. Open your AI coding tool and say:

```
Build FOLIO using only the files in this pack folder.
Read PROMPT.md and follow it exactly. Use the source and assets provided.
Keep pin-until-complete virtual progress. After the last card, the page owns scroll until the section docks (top >= 0).
Do not build a tall multi-vh scroll track.
```

7. Confirm:
   - One full-viewport stage (no long page scroll through the section)
   - Five dense glass sheets with paper pivot
   - Film muted free-play under glass
   - Progress bar / dots update as you scroll
   - Reduced motion: static stacked cards

## Default entry

```tsx
import FolioPivotSection from "./source/FolioPivotSection";

export default function Page() {
  return <FolioPivotSection />;
}
```

## What this pack is not

- Not a recording of our website UI
- Not storefront preview videos
- Just what you need to rebuild the experience and make it yours

## If something fails

Paste the error into the same AI and say:

> Fix this for me without asking me to write code. Keep pin-until-complete (one viewport, virtual progress). Keep five liquid-glass decision sheets and free-play film under glass. Never scrub video.currentTime. Never build a tall multi-vh page scroll track.

ClickMotion · www.ClickMotion.dev
