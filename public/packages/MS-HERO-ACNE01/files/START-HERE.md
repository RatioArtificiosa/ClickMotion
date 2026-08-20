# Acne Secret - start here

You are about to place a **Sabri Suby-class HVCO lead-capture hero** on your site: a full-viewport private clear-skin briefing. Film free-plays muted. For the first fifteen seconds it holds centered at half the screen over a dark frosted blur. Then it docks left and the lead form + combat-cadence copy dock right. The brand name stays locked until email.

You do not need to be a programmer. Your AI does the technical work.

## What is in this folder

| Item | For |
|------|-----|
| **PROMPT.md** | Give this to your AI. One instruction: build from this folder. |
| **CUSTOMIZATION.md** | Later: swap brand, copy, colors, film, unlock name. |
| **VIDEO_GEN_PROMPT.md** | Optional: generate a new class/product film. |
| **assets/** | Client film + poster only (no storefront previews). |
| **source/** | Production React hero (drop-in). |

## What you do (about 10 minutes)

1. Unzip this pack into a project folder (or open it next to your app).
2. Copy assets into your app:
   - `assets/acne-secret-v1.webm` → `public/assets/videos/acne-secret-v1.webm`
   - `assets/acne-secret-v1.webp` → `public/assets/posters/acne-secret-v1.webp`
3. Copy `source/AcneSecretHero.tsx` into your components folder.
4. Install: `framer-motion`, `lucide-react` (and Tailwind if your stack uses it).
5. Load **Inter** (or equal bold geometric sans). Wire:
   - `--font-acne-display`
   - `--font-acne-body`
6. Open your AI coding tool and say:

```
Build Acne Secret using only the files in this pack folder.
Read PROMPT.md and follow it exactly. Use the source and assets provided.
```

7. Confirm:
   - Full-viewport dark HVCO hero
   - Film muted free-play
   - 0-15s centered cinema at ~50% width over dark blur
   - Then film left, form right
   - Brand locked until email; unlock shows your brand (demo default is labeled synthetic)
   - No medical cure claims
   - Reduced motion: docked layout immediately

## Default entry

```tsx
import AcneSecretHero from "./source/AcneSecretHero";

export default function Page() {
  return <AcneSecretHero />;
}
```

## What this pack is not

- Not a recording of our website UI
- Not storefront preview videos
- Not a multi-file dump of thumbs or admin assets
- Just what you need to rebuild the experience and make it yours

## If something fails

Paste the error into the same AI and say:

> Fix this for me without asking me to write code. Keep free-play muted film, 15s cinema hold at half width over dark blur, then left dock + lead form, brand locked until email. No medical cure claims.

ClickMotion · www.ClickMotion.dev
