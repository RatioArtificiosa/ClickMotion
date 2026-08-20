# BLOOM - start here

You are about to place a **kids and teen girls yoga course + app hero** on your site: a full-viewport sunlit class film under a warm paper, lilac, and peach system. Soft entrances. Kids / Teens path restage. Module chips and dual CTAs. Optional light film parallax on desktop. No scroll-scrubbed video timeline.

You do not need to be a programmer. Your AI does the technical work.

## What is in this folder

| Item | For |
|------|-----|
| **PROMPT.md** | Give this to your AI. One instruction: build from this folder. |
| **CUSTOMIZATION.md** | Later: swap brand, Kids/Teens paths, colors, film, stats. |
| **VIDEO_GEN_PROMPT.md** | Optional: generate a new class film with any video AI. |
| **assets/** | Client film + poster only (no website chrome, no storefront previews). |
| **source/** | Production React hero (drop-in). |

## What you do (about 10 minutes)

1. Unzip this pack into a project folder (or open it next to your app).
2. Copy assets into your app:
   - `assets/luna-yoga-v1.mp4` → `public/assets/videos/luna-yoga-v1.mp4`
   - `assets/luna-yoga-v1.webp` → `public/assets/posters/luna-yoga-v1.webp`
3. Copy `source/BloomYogaHero.tsx` into your components folder.
4. Install: `framer-motion`, `gsap`, `lucide-react` (and Tailwind if your stack uses it).
5. Load **Plus Jakarta Sans** (display + UI). Wire CSS variables if you want parity with the reference:
   - `--font-bloom-display`
   - `--font-bloom-body`
6. Open your AI coding tool and say:

```
Build BLOOM using only the files in this pack folder.
Read PROMPT.md and follow it exactly. Use the source and assets provided.
```

7. Confirm:
   - Full-viewport soft wellness hero with living class film
   - Film loops muted, never scrubbed by scroll
   - Kids / Teens toggle restages badge, titles, body, modules, phone card, CTAs
   - Dual CTAs (free class + get/download app)
   - Desktop: subtle scale parallax on the film wrap only
   - Mobile: stack layout, hide center nav links, no parallax
   - Reduced motion: poster still + static copy

## Default entry

```tsx
import BloomYogaHero from "./source/BloomYogaHero";

export default function Page() {
  return <BloomYogaHero />;
}
```

If you use Next.js `next/font`, wrap the page so Plus Jakarta Sans maps to the CSS variables above (see PROMPT.md).

## What this pack is not

- Not a recording of our website UI
- Not storefront preview videos (those are presentation only)
- Not a multi-file dump of thumbs, admin assets, or lab chrome
- Just what you need to rebuild the experience and make it yours

## If something fails

Paste the error into the same AI and say:

> Fix this for me without asking me to write code. Keep free-play muted class film, Kids/Teens path restage, dual CTAs, and soft paper/lilac craft. Never scrub video.currentTime with scroll.

ClickMotion · www.ClickMotion.dev
