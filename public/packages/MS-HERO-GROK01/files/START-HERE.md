# Grok Bot - start here

**Version:** 2.1.0

You are about to place an **AI-agent scroll narrative** on your site: a full-viewport Las Vegas Sphere film under an ice liquid-glass HUD. Scroll plays the whole movie.

**Dual process = PSAVE + No Scroller.**

- **No Scroller:** the page does not physically scroll while the journey runs. Wheel, trackpad, finger, and keys aim the film.
- **PSAVE (Perfect Scroll Video Engine):** scroll aims. The film plays forward or backward to that moment. The picture never jumps a frame. When they lift, the film keeps going a little, then eases to a stop.

HUD loops stay alive: sheen, ice trip, marquee, orb. You do not need to be a programmer. Your AI does the technical work.

## What is in this folder

| Item | For |
|------|-----|
| **PROMPT.md** | Give this to your AI. One instruction: build from this folder. |
| **CUSTOMIZATION.md** | Later: swap brand, copy, colors, film. |
| **VIDEO_GEN_PROMPT.md** | Optional: generate a new client film with any video AI. Then re-encode GOP 3. |
| **assets/** | Client film + poster only (no website chrome, no storefront previews). |
| **source/** | Production React hero, CSS, and copy (drop-in). Prefer this over rewriting. |

## What you do (about 10 minutes)

1. Unzip this pack into a project folder (or open it next to your app). You should see this file at the top level.
2. Copy assets into your app:
   - `assets/grokbot-sphere-v1.mp4` → `public/assets/videos/grokbot-sphere-v1.mp4`
   - `assets/grokbot-sphere-v1.webp` → `public/assets/posters/grokbot-sphere-v1.webp`
3. Copy `source/GrokBotHero.tsx`, `source/hero.css`, and `source/copy.ts` into your components folder.
4. **Do not install gsap.** Tailwind is optional if your stack already has it. `lucide-react` is one small icon.
5. Load **Syne** (600/700/800) and **Outfit** (300/400/500). Wire CSS variables if you want parity:
   - `--font-gb-display`
   - `--font-gb-body`
6. Open your AI coding tool and say:

```
Build Grok Bot using only the files in this pack folder.
Read PROMPT.md and follow it exactly. Use the source and assets provided.
Dual process: PSAVE plus No Scroller. One 100dvh stage. Scroll aims on 12 viewports.
Down plays the whole Sphere film forward at 1.2x. Up plays it backward every 3rd frame. Never jump a frame.
HUD loops stay. Do not install gsap. Do not build a tall sticky track.
```

7. Confirm:
   - Full-viewport ice HUD over the Sphere film
   - The **page does not physically scroll** during the journey
   - Tiny wheel click creeps a few frames; a fling plays the movie (does not jump)
   - Lift mid-film: film keeps going a little, then eases to a stop
   - Scroll up: film walks backward, no jump to the start
   - HUD sheen, ice trip, marquee, and orb keep looping
   - Scroll badge hides about 5 seconds after the first real scroll
   - After the last frame, one more down-scroll may move the host page
   - Reduced motion: still frame + HUD only

## Default entry

```tsx
import GrokBotHero from "./source/GrokBotHero";

export default function Page() {
  return <GrokBotHero />;
}
```

If you use Next.js `next/font`, wrap the page so Syne and Outfit map to the CSS variables above (see PROMPT.md). **Do not** set `overflow: hidden` on the page. After the film finishes, a host page must be able to scroll.

## What this pack is not

- Not a recording of our website UI
- Not storefront preview videos (those are presentation only)
- Not a multi-file dump of thumbs or storefront chrome
- Not an xAI partnership kit. The Sphere is setting only.
- Just what you need to rebuild the experience and make it yours

## If something fails

Paste the error into the same AI and say:

> Fix this for me without asking me to write code. Keep dual process: PSAVE plus No Scroller. Scroll aims on 12 viewports. Down plays the whole film at 1.2x. Up reverses every 3rd frame. Leftover dest plus 0.55s dest floor on lift. Never jump a frame. HUD loops stay. Never restore gsap or a tall sticky track. Do not ask me to write code.

ClickMotion · www.ClickMotion.dev
