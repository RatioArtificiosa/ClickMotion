# VERVE SOCIAL - AI build prompt

**Product:** VERVE SOCIAL (creator social platform hero)  
**Brand:** ClickMotion · www.ClickMotion.dev  

You are an expert front-end engineer. Build this hero **exactly** as specified using **only the files in this pack**. Do not invent Motionsites cyan kits. Do not scrub the video with scroll. Do not burn UI into the film. Do not use competitor brand names in the marquee. Do not invent audited stats.

---

## User will say

> Build VERVE SOCIAL using the files in this folder. Read PROMPT.md and follow it.

---

## What you are building

A full-viewport **creator social platform hero**:

1. Plum-ink canvas `#1A0A14`, cream type `#FDF7FA`, hot rose `#EC4899`, amber `#F59E0B`.
2. Film free-plays muted full-bleed (autoPlay muted loop playsInline).
3. Bold two-line lockup: **BE PRESENT.** / **BE TOGETHER.** (second line rose).
4. Infinite horizontal social marquee (CSS `translate3d`, dual identical rows, ~42s linear loop, soft edge mask). Synthetic community tokens only.
5. Desktop soft film wrap scale parallax only (`1 → 1.06`, scrub 1.2) - **never** `video.currentTime` from scroll. Off mobile.
6. Reduced motion: poster still, static marquee row, no parallax, full type visible.
7. Top chrome: wordmark + nav + Sign in / Join free. Proof rail under CTAs (placeholders unless buyer supplies real numbers).

This page sells **belonging / presence**, not a dashboard product tour.

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
| Attributes | muted autoPlay loop playsInline preload auto |
| Mode | Free-play + marquee + desktop scale parallax. Never scroll-scrub currentTime |

### FORBIDDEN

- Competitor brands / trademarks in marquee or UI  
- Scroll scrub of film (`video.currentTime` driven by scroll)  
- Cyan Motionsites primary kit as brand system  
- Em dashes in customer-facing copy (use hyphen or period)  
- Storefront preview filenames (`*-preview*`) in the buyer build  
- TikTok sticker kitsch, emoji confetti, cyberpunk rain city  
- Fake celebrity claims or invented audited metrics  

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

**Aesthetic:** Premium Gen-Z / creator social night - belonging and presence. Funded launch craft, not template mesh.

**Scrims:** left and lower plum gradients so type stays legible over faces.

**CSS variables:**

- `--font-verve-display` - Syne / Clash  
- `--font-verve-body` - Inter  

---

## Default copy

| Slot | Default |
|------|---------|
| wordmark | VERVE |
| badge | New · creator social |
| H1 | BE PRESENT. / BE TOGETHER. |
| Body | Nights out, small circles, people who make your week feel alive - not ads dressed as friends. |
| CTA | Join free · See how it works |
| Marquee | #nightsout · @crew · live now · your people · stay late · real faces · soft chaos · belong · be present · small circles |
| Proof | 2M weekly presence · 180 cities · 0 fake reach (placeholders) |

---

## Motion law

```
film = free-play muted loop autoplay playsInline
marquee = infinite CSS translate3d ~42s linear · dual rows · edge mask fade
parallax = desktop film wrap scale 1 → 1.06 scrub 1.2 (off <768px)
NEVER set video.currentTime from scroll
prefers-reduced-motion = poster + static marquee + no parallax
IntersectionObserver = pause film off-screen
GSAP ScrollTrigger = kill on unmount
```

---

## Layout structure

1. Full viewport section (`100dvh`)  
2. Film layer absolute + scrims  
3. Top header bar  
4. Left lockup (badge, H1 stack, body, CTAs, proof)  
5. Bottom marquee bar  

---

## Responsive

| Breakpoint | Behavior |
|------------|----------|
| ≥768px | Center nav visible; film parallax allowed |
| <768px | Hide center nav; disable parallax; stack CTAs |
| ≤390px | Tighter type; keep marquee readable; ≥44px targets |

---

## Stack

React + TypeScript + Tailwind. Framer Motion + GSAP ScrollTrigger. Lucide OK.

Install: `framer-motion`, `gsap`, `lucide-react`.

---

## AI tool notes

**Cursor / Claude / Grok Build:** Prefer `source/VerveSocialHero.tsx` over rewrite.  
**Lovable / Bolt:** Single file OK if free-play, marquee, and reduced-motion stay intact.

---

## Expected checks

1. Full-viewport plum-night hero  
2. Film free-plays muted  
3. Bold lockup + dual CTAs  
4. Infinite marquee (static if reduced motion)  
5. No scroll-scrub of film  
6. Desktop parallax only; off mobile  
7. Local film + poster resolve  
8. No competitor brands; no em dashes  
9. Reduced motion path works  

---

## What to tell your AI

```
Build VERVE SOCIAL using only the files in this pack folder.
Read PROMPT.md and follow it exactly. Use source/ and assets/ as provided.
```

To rebrand later, open CUSTOMIZATION.md. To generate a new culture film, open VIDEO_GEN_PROMPT.md.

---

## Package notes (operators)

- Opaque: `v3rv3s0c1al` · PaidSalt: `vs7k2m`  
- Files zip root = START-HERE.md (no nested `files/` wrapper)  
- Client media only under assets/  
- Storefront dual previews are never in this pack  
- First production post: 2026-08-13 · Platinum Second Revision: 2026-08-13  

ClickMotion · www.ClickMotion.dev
