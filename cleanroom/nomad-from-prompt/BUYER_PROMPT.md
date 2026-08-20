# Nomad Travel - AI build prompt

**Product:** Nomad Travel (luxury travel platform hero)  
**Brand:** ClickMotion · www.ClickMotion.dev  

You are an expert front-end engineer. Build this hero **exactly** as specified using **only the files in this pack**. Do not invent a different aesthetic. Do not turn it into a scroll-scrub multi-chapter film. Do not apply host website marketing chrome.

---

## User will say

> Build Nomad Travel using the files in this folder. Read PROMPT.md and follow it.

---

## What you are building

A full-viewport **luxury travel / private stays** hero:

1. **Cinematic empty-destination film** fills the frame (`object-fit: cover`), muted, looping, free-play.
2. Warm **espresso + terracotta + cream** editorial system. Playfair Display headlines, Inter UI.
3. Fixed warm nav (Compass mark + NOMAD wordmark, desktop links, Sign in glass, Book a Stay solid).
4. Left content column: badge → H1 → terracotta accent line → body → dual CTAs → quiet proof stats.
5. Soft **staggered entrance** (Framer Motion). Desktop only: light **GSAP scale parallax** on the film wrap (1 → 1.06), scrubbed to scroll. **Never** set `video.currentTime` from scroll.
6. Gradients keep cream type legible on the film (left type field + bottom vignette + soft terracotta horizon glow). Never grey-wash the whole frame.

Feels like a private travel club launch (Aman × Condé Nast Traveler craft). **Not** backpacker, neon cyberpunk, fintech chrome, spa-white wellness, or multi-chapter scroll film.

---

## Files to use (this pack)

```
START-HERE.md          human steps
PROMPT.md              this file
CUSTOMIZATION.md       restage later
VIDEO_GEN_PROMPT.md    optional new film brief
assets/
  nomad-montage-v1.mp4 pure client film (no UI)
  nomad-montage-v1.webp poster still
source/
  NomadTravelHero.tsx  production component
```

Place media in the host app as:

- `public/assets/videos/nomad-montage-v1.mp4`
- `public/assets/posters/nomad-montage-v1.webp`

Paths already used in `NomadTravelHero.tsx` match those public URLs.

---

## Stack

| Package | Role |
|---------|------|
| react | UI (`"use client"` if Next App Router) |
| framer-motion | Staggered entrance |
| gsap + ScrollTrigger | Desktop film scale parallax only |
| lucide-react | `Compass`, `ArrowUpRight` |
| tailwindcss | Utility classes as written (or convert carefully) |

Install: `framer-motion`, `gsap`, `lucide-react`.

Fonts: **Playfair Display** (500-700) + **Inter** (300-500). Prefer `next/font` with:

```ts
// example Next.js wiring
const display = Playfair_Display({ variable: "--font-nomad-display", subsets: ["latin"], weight: ["400","500","600","700"], display: "swap" });
const body = Inter({ variable: "--font-nomad-body", subsets: ["latin"], weight: ["300","400","500","600"], display: "swap" });
```

Wrap the page root with both `variable` classNames. Component falls back to system serif/sans if variables are missing.

---

## Asset contract (NON-NEGOTIABLE)

| Field | Value |
|-------|--------|
| Film | `/assets/videos/nomad-montage-v1.mp4` |
| Poster | `/assets/posters/nomad-montage-v1.webp` |
| Duration (shipped film) | ~30s seamless-feel loop (silent) |
| Attributes | `autoPlay muted loop playsInline preload="auto"` |
| Object-fit | `cover`, full viewport |
| Offscreen | IntersectionObserver pause/resume |
| Scrub | **Forbidden.** Never drive `currentTime` from scroll |

### REQUIRED subject (if regenerating film)

- Empty luxury destinations: cliff villa + infinity pool, desert lodge, hidden jungle edge
- Warm terracotta stone / cream limestone / espresso voids
- Slow cinematic aerial or elevated glide
- Large dark warm voids so cream type stays legible

### FORBIDDEN in background video

- People / faces / tourist crowds as heroes
- Readable text, logos, hotel brands, watermarks, HUD, UI, map pins
- Neon cyan-pink cyberpunk city
- Backpacker hostel energy
- Cold blue fintech chrome

### Implementer rule

```txt
Use ONLY the local paths above (or buyer-updated paths after restage).
Never substitute a random CDN stock clip.
Never use a website storefront preview capture as the background film.
```

For a brand-new film, read **VIDEO_GEN_PROMPT.md**.

---

## Design system

| Token | Value |
|-------|--------|
| Canvas | `#1C140A` espresso |
| Cream type | `#FEF3C7` |
| Terracotta | `#C17A4A` |
| Display | Playfair Display 500-700, tracking `-0.03em`, leading `0.9`, size `clamp(3rem, 9vw, 7.5rem)` |
| Body | Inter 300-400, 15-16px, leading 1.7, cream ~68% |
| Badge / nav micro | Inter 10-12px, uppercase tracking on badge |
| Radius | Full pills `9999px` |
| Glass | cream ~8% + blur 48px |
| Spacing | 8px grid · content max ~44rem · full-bleed video |
| Safe inset | min horizontal ~2rem so type never kisses the frame edge |

### Copy (locked defaults)

| Slot | Text |
|------|------|
| Badge | Curated luxury stays |
| H1 | Go beyond. |
| Accent line | Stay forever. |
| Body | Curated luxury stays in the world's most extraordinary places. Private villas, cliffside hideaways, and journeys written for the few who never settle for ordinary. |
| CTA primary | Explore Stays |
| CTA secondary | Watch Journey |
| Nav links | Destinations · Stays · Journeys · Concierge · Journal |
| Nav CTAs | Sign in · Book a Stay |
| Stats | 48 Countries · 120+ Private stays · 24/7 Concierge |

### Layout

- Section: `h-screen min-h-[100dvh]`, overflow hidden, canvas bg
- Video absolute cover under content
- Dual gradients: left espresso type field, bottom vignette, soft terracotta horizon glow
- Content left column `max-w ~44rem`, vertically centered
- Fixed nav: logo + Compass, desktop links, Sign in glass + Book a Stay solid
- Quiet proof rail under CTAs (border-t hairline)
- Optional scroll cue (hide if reduced motion)

### Motion

| Layer | Spec |
|-------|------|
| Entrance | Stagger fade/up: badge → H1 → accent → body → CTAs → stats |
| Ease | `[0.25, 0.46, 0.45, 0.94]` · ~0.75s per step with delays |
| Parallax | Desktop only: film wrap scale `1 → 1.06`, ScrollTrigger `start: top top` / `end: bottom top`, `scrub: 1.25` |
| Reduced motion | Opacity only; no parallax; hide scroll cue |
| Mobile ≤767 | No parallax tween |

### Accessibility

- Semantic `<section>`, `<header>`, `<nav>`, `<h1>`
- Focus rings terracotta
- Cream on espresso overlays meet body contrast intent
- Video decorative (`aria-hidden`)
- `prefers-reduced-motion` respected

### Performance

- Preload film with `auto` for smooth start; pause when offscreen
- `will-change` only on parallax wrap while scrolling
- Fonts `display: swap`
- No extra libraries beyond the stack above

---

## Default entry

```tsx
import NomadTravelHero from "./source/NomadTravelHero";

export default function Page() {
  return <NomadTravelHero />;
}
```

Prefer integrating the provided `NomadTravelHero.tsx` over rewriting from scratch. If you must rewrite, match behavior and tokens pixel-for-pixel in spirit.

---

## Expected checks

1. Full-viewport luxury travel hero with looping pure film  
2. Fixed warm editorial nav (desktop links + dual nav CTAs)  
3. Exact default copy slots unless restaged  
4. Staggered Framer entrance with specified ease  
5. Desktop film scale parallax only; never video scrub  
6. Mobile: stacked CTAs, hidden center nav links, no parallax  
7. Reduced-motion safe  
8. Local film + poster paths resolve (no broken media)  
9. No storefront chrome, no grey full-frame wash  

---

## Anti-patterns (forbidden)

- Binding scroll progress to `video.currentTime`
- Using storefront preview captures as the hero film
- Multi-chapter scrub narrative (that is a different product family)
- Neon / mesh / purple SaaS chrome
- Grey-washing the entire frame so the film dies
- Leaving broken asset paths
- Redesigning into a generic dark SaaS hero

---

## After it works

- QA every expected check above.
- To restage brand, film, or colors, read **CUSTOMIZATION.md**.
- To generate a new film, read **VIDEO_GEN_PROMPT.md**.

Build it. Make it feel expensive, warm, and unhurried.

ClickMotion · www.ClickMotion.dev
