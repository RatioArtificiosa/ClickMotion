# MERIDIAN - start here

You are about to place a **full-viewport luxury real estate hero** on your site: a cinematic estate film scrubbed by **pin-until-complete** virtual scroll progress, with three editorial chapters.

You do not need to be a programmer. Your AI does the technical work.

## What is in this folder

| Item | For |
|------|-----|
| **PROMPT.md** | Give this to your AI. One instruction: build from this folder. |
| **CUSTOMIZATION.md** | Later: rebrand copy, colors, film. |
| **assets/** | Client film + poster only (no storefront previews). |
| **source/** | Production React hero (drop-in). |

Default chapter copy is a **starting board**. Rewrite it until the page reads as your brand alone.

## Critical motion law (do not ignore)

- **Pin-until-complete:** one full-viewport stage. **No** tall multi-page scrollbar track.
- Wheel / trackpad / touch / keys advance **virtual progress 0→1**.
- Virtual effort is **3.2 viewports** with scrub lag **0.45** (gold Meridian pace - keep these numbers).
- Film is **scrubbed** (`currentTime = progress × duration`). Never autoplay loop wallpaper.
- On a real site: section pins while the journey runs, then **releases** so the membership band / page can continue.

## What you do (about 10 minutes)

1. Unzip this pack into a project folder.
2. Copy assets:
   - `assets/sequence-01.mp4` → `public/assets/videos/sequence-01.mp4`
   - `assets/sequence-01.webp` → `public/assets/posters/sequence-01.webp`
3. Copy `source/MeridianScrollNarrative.tsx` into your components folder.
4. Install: `gsap`, and Tailwind if needed.
5. Load **Cormorant Garamond** (or Playfair) + **Inter**. Wire CSS variables if you use them:
   - `--font-meridian-display`
   - `--font-meridian-sans`
6. Open your AI coding tool and say:

```
Build MERIDIAN using only the files in this pack folder.
Read PROMPT.md and follow it exactly. Use the source and assets provided.
Keep pin-until-complete virtual progress (3.2 viewports, scrub lag 0.45).
Do not build a tall multi-vh scroll track.
```

7. Confirm:
   - One full-viewport stage (document is not ~4 screens tall for the hero alone)
   - Scrolling advances the film and chapters
   - Gold progress line + markers 01-03
   - Membership band reachable after journey completes
   - Reduced motion: static chapter 01

## Default entry

```tsx
import MeridianScrollNarrative from "./source/MeridianScrollNarrative";

export default function Page() {
  return <MeridianScrollNarrative />;
}
```

## What this pack is not

- Not a recording of our website UI
- Not storefront preview videos
- Just what you need to rebuild the experience and make it yours

## If something fails

Paste the error into the same AI and say:

> Fix this for me without asking me to write code. Keep pin-until-complete (one viewport, virtual progress 3.2 viewports, scrub lag 0.45). Keep three chapters and scroll-scrubbed film. Never autoplay wallpaper. Never build a tall multi-vh page scroll track.

ClickMotion · www.ClickMotion.dev
