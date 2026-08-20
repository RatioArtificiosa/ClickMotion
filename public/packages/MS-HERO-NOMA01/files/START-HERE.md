# Nomad Travel - start here

You are about to place a **luxury travel platform hero** on your site: a full-viewport cinematic film of extraordinary empty places under a warm espresso, terracotta, and cream editorial system. Soft entrances. Optional light film parallax on desktop. No scroll-scrubbed video timeline.

You do not need to be a programmer. Your AI does the technical work.

## What is in this folder

| Item | For |
|------|-----|
| **PROMPT.md** | Give this to your AI. One instruction: build from this folder. |
| **CUSTOMIZATION.md** | Later: swap brand strings, colors, film, fonts, stats. |
| **VIDEO_GEN_PROMPT.md** | Optional: generate a new background film with any video AI. |
| **assets/** | Client film + poster only (no website chrome, no storefront previews). |
| **source/** | Production React hero (drop-in). |

## What you do (about 10 minutes)

1. Unzip this pack into a project folder (or open it next to your app).
2. Copy assets into your app:
   - `assets/nomad-montage-v1.mp4` → `public/assets/videos/nomad-montage-v1.mp4`
   - `assets/nomad-montage-v1.webp` → `public/assets/posters/nomad-montage-v1.webp`
3. Copy `source/NomadTravelHero.tsx` into your components folder.
4. Install: `framer-motion`, `gsap`, `lucide-react` (and Tailwind if your stack uses it).
5. Load **Playfair Display** (display) and **Inter** (UI). Wire CSS variables if you want parity with the reference:
   - `--font-nomad-display`
   - `--font-nomad-body`
6. Open your AI coding tool and say:

```
Build Nomad Travel using only the files in this pack folder.
Read PROMPT.md and follow it exactly. Use the source and assets provided.
```

7. Confirm:
   - Full-viewport warm editorial hero
   - Film loops muted, never scrubbed by scroll
   - Soft staggered entrance
   - Desktop: subtle scale parallax on the film only
   - Mobile: stack CTAs, hide center nav links, no parallax

## Default entry

```tsx
import NomadTravelHero from "./source/NomadTravelHero";

export default function Page() {
  return <NomadTravelHero />;
}
```

If you use Next.js `next/font`, wrap the page so Playfair and Inter map to the CSS variables above (see PROMPT.md).

## What this pack is not

- Not a recording of our website UI
- Not storefront preview videos (those are presentation only)
- Not a multi-file dump of thumbs, admin assets, or lab chrome
- Just what you need to rebuild the experience and make it yours

## If something fails

Paste the error into the same AI and say:

> Fix this for me without asking me to write code. Keep free-play muted film loop, soft entrance, and desktop film parallax only. Never scrub video.currentTime with scroll.

ClickMotion · www.ClickMotion.dev
