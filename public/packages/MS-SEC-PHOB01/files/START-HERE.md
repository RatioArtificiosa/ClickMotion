# Phobia - start here

You are about to place a **cursor-fleeing forms** section on your site: a pure black void where photo cutouts and letter debris rest in a crafted cluster, scatter when idle, flee your pointer with rotation and scale, then elastic-return home - with a premium white-glow cursor that makes the stage feel expensive.

You do not need to be a programmer. Your AI does the technical work.

## What is in this folder

| Item | For |
|------|-----|
| **PROMPT.md** | Give this to your AI. One instruction: build from this folder. |
| **CUSTOMIZATION.md** | Later: swap cutouts, letters, poses, influence feel, cursor. |
| **assets/** | Client cutout images only (no website chrome, no storefront video). |
| **source/** | Production React section + data (drop-in). |

## What you do (about 10 minutes)

1. Unzip this pack into a project folder (or open it next to your app).
2. Copy assets into your app:
   - `assets/*` → `public/assets/phobia/`
3. Copy `source/*` into your components folder (keep the two files together).
4. Install: `gsap`
5. Open your AI coding tool and say:

```
Build Phobia using only the files in this pack folder.
Read PROMPT.md and follow it exactly. Use the source and assets provided.
```

6. Move the pointer:
   - Idle (no pointer in the section): objects **spread**
   - Near a rest home: objects **flee** with rotation / scale
   - Clear of the bubble: **elastic return**
   - Inside the stage: premium **white-glow cursor** + soft trail

## Default entry

```tsx
import PhobiaSection from "./source/PhobiaSection";

export default function Page() {
  return <PhobiaSection />;
}
```

## What this pack is not

- Not a recording of our website UI
- Not storefront preview videos (those are presentation only)
- Not a multi-file dump of thumbs, posters, or admin assets
- Just what you need to rebuild the experience and make it yours

## If something fails

Paste the error into the same AI and say:

> Fix this for me without asking me to write code. Keep rest-based radial flee and elastic return.

ClickMotion · www.ClickMotion.dev
