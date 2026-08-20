# VERVE SOCIAL - AI build prompt

**Product:** VERVE SOCIAL (creator social platform hero)  
**Brand:** ClickMotion · www.ClickMotion.dev  

You are an expert front-end engineer. Build this hero **exactly** as specified using **only the files in this pack**. Do not invent Motionsites cyan kits. Do not scrub the video with scroll. Do not burn UI into the film. Do not use competitor brand names in the marquee.

---

## User will say

> Build VERVE SOCIAL using the files in this folder. Read PROMPT.md and follow it.

---

## What you are building

A full-viewport **creator social platform hero**:

1. Plum-ink canvas `#1A0A14`, cream type, hot rose `#EC4899`, amber `#F59E0B`.
2. Film free-plays muted full-bleed (autoPlay muted loop playsInline).
3. Bold two-line lockup: **BE PRESENT.** / **BE TOGETHER.**
4. Infinite horizontal social marquee (CSS/transform, not film text).
5. Desktop soft film wrap scale parallax only - **never** `video.currentTime` from scroll.
6. Reduced motion: poster still, static marquee, full type.

---

## Files to use (this pack)

```
START-HERE.md
PROMPT.md
CUSTOMIZATION.md
VIDEO_GEN_PROMPT.md
assets/
  verve-presence-v1.mp4
  verve-presence-v1.webp
source/
  VerveSocialHero.tsx
```

Place media:

- `public/assets/videos/verve-presence-v1.mp4`
- `public/assets/posters/verve-presence-v1.webp`

Prefer integrating `source/VerveSocialHero.tsx` over rewriting.

---

## Asset contract

| Field | Value |
|-------|--------|
| Film | `/assets/videos/verve-presence-v1.mp4` (~15s silent loop) |
| Poster | `/assets/posters/verve-presence-v1.webp` |
| Mode | Free-play + marquee. Never scroll-scrub currentTime |

### FORBIDDEN

- Competitor brands in marquee or UI  
- Scroll scrub of film  
- Cyan Motionsites primary kit  
- Em dashes in customer-facing copy  
- Storefront preview filenames in the buyer build  

---

## Design system

| Token | Value |
|-------|--------|
| Canvas | `#1A0A14` |
| Cream | `#FDF7FA` |
| Hot rose | `#EC4899` |
| Amber | `#F59E0B` |
| Display | Syne or Clash Display 800 |
| Body | Inter |

**Aesthetic:** Premium Gen-Z / creator social night - belonging and presence. Not TikTok sticker kitsch. Not cyberpunk rain.

---

## Default copy

| Slot | Default |
|------|---------|
| H1 | BE PRESENT. / BE TOGETHER. |
| Body | Nights out, small circles, people who make your week feel alive - not ads dressed as friends. |
| CTA | Join free · See how it works |
| Marquee | #nightsout · @crew · live now · your people · stay late · real faces · soft chaos · belong |

---

## Motion law

```
film = free-play muted loop
marquee = infinite CSS translate ~36s linear
parallax = desktop film wrap scale 1 → 1.06 scrub 1.2 (off mobile)
NEVER set video.currentTime from scroll
prefers-reduced-motion = poster + static marquee + no parallax
IntersectionObserver = pause film off-screen
```

---

## Stack

React + TypeScript + Tailwind. Framer Motion + GSAP ScrollTrigger. Lucide OK.

Install: `framer-motion`, `gsap`, `lucide-react`.

---

## Expected checks

1. Full-viewport plum-night hero  
2. Film free-plays muted  
3. Bold lockup + dual CTAs  
4. Infinite marquee (static if reduced motion)  
5. No scroll-scrub  
6. Local film + poster resolve  
7. No competitor brands  

---

## What to tell your AI

```
Build VERVE SOCIAL using only the files in this pack folder.
Read PROMPT.md and follow it exactly. Use source/ and assets/ as provided.
```

---

## Package notes (operators)

- Opaque: `v3rv3s0c1al` · PaidSalt: `vs7k2m`
- Files zip root = START-HERE.md
- Client media only under assets/
- First production post: 2026-08-13

ClickMotion · www.ClickMotion.dev
