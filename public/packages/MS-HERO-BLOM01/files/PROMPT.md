# BLOOM - AI build prompt

**Product:** BLOOM (kids & teen girls yoga course + app hero)  
**Brand:** ClickMotion · www.ClickMotion.dev  

You are an expert front-end engineer. Build this hero **exactly** as specified using **only the files in this pack**. Do not invent a dark spa adult wellness look. Do not add emoji spam. Do not scrub the video with scroll. Do not reduce Kids/Teens to a single static path.

---

## User will say

> Build BLOOM using the files in this folder. Read PROMPT.md and follow it.

---

## What you are building

A full-viewport **yoga course + mobile app** hero for kids and teen girls:

1. Sunlit multi-girl class film free-plays (muted loop) under soft warm paper scrims.
2. **Kids / Teens** path toggle restages badge, titles, body, modules, whisper, CTAs, and phone card while the film keeps playing.
3. Module chips with minutes; selecting a chip updates the phone card.
4. Dual CTAs: free class + get/download app.
5. Quiet proof stats + parent trust line.
6. Optional soft desktop film scale parallax on the **wrapper only**. **Never** set `video.currentTime` from scroll.

This is **free-play class cinema + dual-age path restage**. Not STILL hybrid scrub. Not Meridian estate scroll. Not emoji kids junk. Not adult night spa.

---

## Files to use (this pack)

```
START-HERE.md          human steps
PROMPT.md              this file
CUSTOMIZATION.md       restage later
VIDEO_GEN_PROMPT.md    optional new class film
assets/
  luna-yoga-v1.mp4     pure class film (~45s silent 1080p loopable)
  luna-yoga-v1.webp    poster still
source/
  BloomYogaHero.tsx    production React hero (drop-in)
```

Place media in the host app as:

- `public/assets/videos/luna-yoga-v1.mp4`
- `public/assets/posters/luna-yoga-v1.webp`

Prefer integrating `source/BloomYogaHero.tsx` over rewriting. Paths inside the component already match those public URLs (`BLOOM_VIDEO_SRC` / `BLOOM_POSTER_SRC`).

---

## Asset contract

| Field | Value |
|-------|--------|
| Film | `/assets/videos/luna-yoga-v1.mp4` (~45s silent 1080p loopable) |
| Poster | `/assets/posters/luna-yoga-v1.webp` |
| Attributes | autoPlay muted loop playsInline preload auto |
| Object-fit | cover |
| Mode | Free-play class film - **not** scroll-scrub, **not** idle hybrid |

### REQUIRED film subject

- Stylized diverse girls in a bright yoga class
- Belonging / circle energy, sunlit studio, rainbow mats welcome
- No logos, no UI, no readable watermarks

### FORBIDDEN

- Empty mat only, adult dark spa only, neon cyber yoga
- Body-shame fitness copy
- Em dashes in customer copy
- Trademark names (Headspace, Calm, Alo, Peloton) in UI
- Backend / storefront / admin language in the buyer build
- Scrubbing `video.currentTime` from scroll

---

## Design system

| Token | Value |
|-------|--------|
| Canvas / paper | `#fff8f5` |
| Ink | `#2a2438` |
| Lilac | `#c4a8e8` |
| Peach CTA | `#ffb5a7` |
| Butter (kids active) | `#ffe8a3` |
| Soft mint (teens active) | `#b8e0d2` |
| Display + body | Plus Jakarta Sans (or equal soft geometric), medium-semibold |
| Glass | paper ~72% + blur ~28px, soft inset highlight |
| Safe inset | min ~2rem horizontal |
| Touch | targets ≥44px |

**Aesthetic:** Soft kids education prestige meets beauty-commerce warmth. Belonging class energy. Not clinical white spa, not neon SaaS, not purple mesh, not STILL night cosmos, not espresso travel wallpaper.

**Typography:**
- H1: `clamp(2.75rem, 7vw, 5.5rem)`, weight 600, tracking about `-0.03em`, line-height about `0.94`
- Second H1 line in lilac
- Body: 15-16px, ink ~72%
- Micro / chips / whisper: 10-12px uppercase tracking

---

## Layout structure (exact)

- Full viewport hero (`min-h-[100dvh]`), overflow hidden, paper canvas under the film
- Video absolute cover under dual paper gradients: left type field + bottom vignette + soft lilac rim glow lower-right. **Never** grey-wash the entire frame
- Top header: flower mark + **BLOOM** wordmark · desktop nav Classes · App · Ages · Stories · Sign in (glass) · Get the app (peach solid)
- Content grid max ~1400px: left stack (path, badge, H1, body, whisper, modules, CTAs, stats, parent line) + right soft phone card on desktop
- Age path: glass pill `role="tablist"` with Kids | Teens
- Phone card: active module label, minutes, path meta, progress bar, "Open today's flow"

---

## Default copy

### Kids (default path)

| Slot | Text |
|------|------|
| Badge | For girls 7-12 |
| H1 | Soft strength. / Big smiles. |
| Body | Short classes you can finish. Breathe, stretch, and feel proud in your own body. |
| Whisper | Join the circle |
| CTAs | Start free class · Get the app |
| Modules | Breathe 5 · Stretch 8 · Animal flows 10 · Wind-down 7 |
| Phone default title | Morning stretch circle · 8 min · Kids |

### Teens

| Slot | Text |
|------|------|
| Badge | Course + app for teens |
| H1 | Your calm. / Your circle. |
| Body | Flows for busy school days, soft nights, and real confidence. No judgment. Just show up. |
| Whisper | Come as you are |
| CTAs | Join free · Download app |
| Modules | Focus 8 · Flow 15 · Soft strength 12 · Sleep wind-down 10 |
| Phone default title | After-school reset · 12 min · Teens |

### Shared

Nav: Classes · App · Ages · Stories · Sign in · Get the app  
Stats: 120+ interactive classes · 7-17 ages welcome · 10 min starter flows  
Parent: Made for girls. Easy for parents to start.

---

## Motion law (non-negotiable)

```
film = free-play muted loop (autoPlay muted loop playsInline)
entrance = staggered fade/up ~0.7s ease [0.25, 0.46, 0.45, 0.94]
age toggle = crossfade copy stack ~0.35s (film keeps playing; never seeks)
module select = updates phone card only
desktop only optional:
  GSAP ScrollTrigger scales film WRAP 1 → 1.05
  scrub ~1.2, start top top, end bottom top
  NEVER set video.currentTime from scroll
mobile (<768px): no wrap parallax; hide center nav; stack CTAs
prefers-reduced-motion:
  poster still, no stagger, no parallax, video paused at t=0
IntersectionObserver:
  pause when off-screen, play when visible (threshold ~0.12)
Cleanup on unmount: kill ScrollTrigger tween; disconnect IO
```

### Free-play vs scrub (do not confuse)

| Mode | BLOOM required | Forbidden for BLOOM |
|------|----------------|---------------------|
| Free-play loop | Yes (primary) | Wallpaper with no path UI |
| Scroll scrub of film time | No | STILL / Meridian style seek |
| Idle hybrid Option A | No | STILL reclaim engine |
| Desktop wrap scale only | Optional yes | Binding scroll to currentTime |

---

## Stack

| Package | Role |
|---------|------|
| react | UI |
| framer-motion | Entrance + path/module crossfade |
| gsap + ScrollTrigger | Optional desktop wrap scale only |
| lucide-react | Flower2, Smartphone, Sparkles (or equal) |
| tailwindcss | Utility layout (optional if you port styles) |

Install: `framer-motion`, `gsap`, `lucide-react`.  
Fonts: Plus Jakarta Sans with `display: swap`. Prefer CSS variables `--font-bloom-display` and `--font-bloom-body`.

---

## Default entry

```tsx
import BloomYogaHero from "./source/BloomYogaHero";

export default function Page() {
  return <BloomYogaHero />;
}
```

If you use Next.js `next/font`, wrap the page so Plus Jakarta maps to the CSS variables above (see START-HERE).

---

## Responsive (5 breakpoints)

| Breakpoint | Behavior |
|------------|----------|
| ≥1280px | Full nav, large display type, phone card beside stack |
| ≥1024px | Full nav; side-by-side content + phone |
| ≥768px | Nav links visible; dual CTA row |
| <768px | Hide center nav links; stack CTAs; phone under content; no film parallax |
| ≤390px | Tighter type clamp; keep ≥44px targets; film cover |

---

## Accessibility

- Semantic `section` / `header` / `nav` / `h1`
- Age path `role="tablist"` / `role="tab"` / `aria-selected`
- Focus rings lilac on paper field
- Ink-on-paper contrast intent for body
- `prefers-reduced-motion`: static entrance, video paused, no parallax
- Decorative video (`aria-hidden`)
- Touch targets ≥44px
- Do not trap keyboard focus

---

## Performance

- Preload auto on client film for smooth free-play start
- `will-change` only on film wrap when parallax is active
- Fonts display swap
- No Three.js; single hero component
- Prefer WebP poster
- Pause film when off-screen (IntersectionObserver)
- Kill GSAP / disconnect observers on unmount

---

## AI tool instructions

1. Open this pack folder.  
2. Read **PROMPT.md** exactly.  
3. Place `assets/luna-yoga-v1.mp4` and `.webp` at public paths in START-HERE.  
4. Use `source/BloomYogaHero.tsx`.  
5. Install `framer-motion`, `gsap`, `lucide-react`. Wire fonts.  
6. Mount hero; verify free-play film, Kids/Teens restage, modules, dual CTAs, reduced motion.  
7. Restage with CUSTOMIZATION.md. Optional new film: VIDEO_GEN_PROMPT.md.  

**Cursor / Claude / Grok Build:** prefer pack source.  
**Lovable / Bolt:** single file OK if free-play + Kids/Teens path + reduced-motion stay intact.

---

## Expected checks

1. Full-viewport hero with free-play class film  
2. Kids/Teens toggle restages badge, H1, body, modules, whisper, CTAs, phone card  
3. Module chips update phone card  
4. Dual CTAs present and tappable (≥44px)  
5. Stats + parent line readable  
6. Film never seeks from scroll  
7. Desktop optional wrap scale only (no currentTime scrub)  
8. Mobile: stack layout, nav collapses, no parallax, no horizontal scroll  
9. Reduced motion safe (poster still, video paused)  
10. Local film + poster resolve  
11. Soft paper scrims keep type legible without grey-washing the class  
12. No storefront chrome burned into the client build  

---

## Anti-patterns

- Scroll-scrub of `video.currentTime`  
- Single static age path (remove Kids/Teens)  
- Adult night spa palette as the primary system  
- Emoji spam / rainbow neon kids junk  
- Body-shame fitness language  
- Medical claims  
- Grey-washing the full film frame  
- Burning storefront UI into client assets  
- Em dashes in customer copy  
- Competitor brand names in UI  

---

## What to tell your AI

```
Build BLOOM using only the files in this pack folder.
Read PROMPT.md and follow it exactly. Use source/ and assets/ as provided.
```

To restage later, open CUSTOMIZATION.md. To generate a new class film, open VIDEO_GEN_PROMPT.md.

---

## Package notes (operators)

- Opaque: `b1o0m7y0g4k2` · PaidSalt: `bm4k8p`
- Files zip root = START-HERE.md
- Client media only under package `assets/` (no storefront previews)
- Mode: free-play class film + Kids/Teens path - **not** hybrid scrub, **not** wallpaper-only without path UI
- First production post: 2026-08-12
- Platinum Second Revision: 2026-08-12 (pack density, hash re-sync, re-smoke; visuals locked)

ClickMotion · www.ClickMotion.dev
