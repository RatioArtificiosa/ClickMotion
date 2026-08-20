# ORBIT FINANCE - start here

You are about to place a **trustworthy premium neobank hero** on your site: deep navy vault, gold orbital ring, DM Serif money type, and a living wealth architecture film.

You do not need to be a programmer. Your AI does the technical work.

## What is in this folder

| Item | For |
|------|-----|
| **PROMPT.md** | Give this to your AI. One instruction: build from this folder. |
| **CUSTOMIZATION.md** | Later: rebrand lockup, proof, colors, film, ring. |
| **VIDEO_GEN_PROMPT.md** | Optional: generate a new vault film (pure world, no UI). |
| **assets/** | Client film + poster only (no storefront previews). |
| **source/** | Production React hero (drop-in). |

Default names and proof numbers are a **starting board**. Rebuild them until every pixel reads as your bank alone.

## What you do (about 10 minutes)

1. Unzip this pack into a project folder.
2. Copy assets:
   - `assets/orbit-vault-v1.mp4` → `public/assets/videos/orbit-vault-v1.mp4`
   - `assets/orbit-vault-v1.webp` → `public/assets/posters/orbit-vault-v1.webp`
3. Copy `source/OrbitFinanceHero.tsx` into your components folder.
4. Install: `framer-motion`, `gsap`, `lucide-react` (and Tailwind if needed).
5. Load **DM Serif Display** + **Inter**. Wire:
   - `--font-orbit-display`
   - `--font-orbit-body`
6. Open your AI coding tool and say:

```
Build ORBIT FINANCE using only the files in this pack folder.
Read PROMPT.md and follow it exactly. Use the source and assets provided.
```

7. Confirm:
   - Full-viewport navy vault hero
   - Film muted free-play
   - Money, elevated. lockup
   - Gold orbital ring (desktop)
   - No scroll-scrub of film
   - Reduced motion: static layout

## Default entry

```tsx
import OrbitFinanceHero from "./source/OrbitFinanceHero";

export default function Page() {
  return <OrbitFinanceHero />;
}
```

## What this pack is not

- Not a recording of our website UI
- Not storefront preview videos
- Just what you need to rebuild the experience and make it yours

## If something fails

Paste the error into the same AI and say:

> Fix this for me without asking me to write code. Keep free-play muted film, DM Serif lockup, gold orbital ring. Never scrub video.currentTime with scroll.

ClickMotion · www.ClickMotion.dev
