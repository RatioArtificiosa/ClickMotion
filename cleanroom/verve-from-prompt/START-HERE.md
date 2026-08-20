# VERVE SOCIAL - start here

You are about to place a **creator social platform hero** on your site: plum-night canvas, living culture film, bold presence type, and an infinite community marquee.

You do not need to be a programmer. Your AI does the technical work.

## What is in this folder

| Item | For |
|------|-----|
| **PROMPT.md** | Give this to your AI. One instruction: build from this folder. |
| **CUSTOMIZATION.md** | Later: swap brand, copy, colors, film, marquee. |
| **VIDEO_GEN_PROMPT.md** | Optional: generate a new culture film. |
| **assets/** | Client film + poster only (no storefront previews). |
| **source/** | Production React hero (drop-in). |

## What you do (about 10 minutes)

1. Unzip this pack into a project folder.
2. Copy assets:
   - `assets/verve-presence-v1.mp4` → `public/assets/videos/verve-presence-v1.mp4`
   - `assets/verve-presence-v1.webp` → `public/assets/posters/verve-presence-v1.webp`
3. Copy `source/VerveSocialHero.tsx` into your components folder.
4. Install: `framer-motion`, `gsap`, `lucide-react` (and Tailwind if needed).
5. Load **Syne** (or Clash Display) + **Inter**. Wire:
   - `--font-verve-display`
   - `--font-verve-body`
6. Open your AI coding tool and say:

```
Build VERVE SOCIAL using only the files in this pack folder.
Read PROMPT.md and follow it exactly. Use the source and assets provided.
```

7. Confirm:
   - Full-viewport plum-night hero
   - Film muted free-play
   - BE PRESENT / BE TOGETHER lockup
   - Infinite social marquee
   - No scroll-scrub of film
   - Reduced motion: static layout

## Default entry

```tsx
import VerveSocialHero from "./source/VerveSocialHero";

export default function Page() {
  return <VerveSocialHero />;
}
```

## What this pack is not

- Not a recording of our website UI
- Not storefront preview videos
- Just what you need to rebuild the experience and make it yours

## If something fails

Paste the error into the same AI and say:

> Fix this for me without asking me to write code. Keep free-play muted film, bold social lockup, infinite marquee. Never scrub video.currentTime with scroll.

ClickMotion · www.ClickMotion.dev
