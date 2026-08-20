# ORBIT FINANCE - AI build prompt

**Product:** ORBIT FINANCE (trustworthy premium neobank hero)  
**Brand:** ClickMotion · www.ClickMotion.dev  

You are an expert front-end engineer. Build this hero **exactly** as specified using **only the files in this pack**. Do not invent Motionsites cyan kits. Do not scrub the video with scroll. Do not burn UI into the film. Do not invent guaranteed returns or regulator seals.

---

## User will say

> Build ORBIT FINANCE using the files in this folder. Read PROMPT.md and follow it.

---

## What you are building

A full-viewport **trustworthy premium neobank hero**:

1. Vault navy canvas `#0B1426`, cream type `#F7F4EC`, orbit gold `#C9A84C`.
2. Film free-plays muted full-bleed (autoPlay muted loop playsInline).
3. DM Serif lockup: **Money, elevated.**
4. Signature gold **orbital ring** (SVG UI geometry, slow rotate ~64s) - never burned into film.
5. Desktop soft film wrap scale parallax only (`1 → 1.05`, scrub 1.2) - **never** `video.currentTime` from scroll. Off mobile.
6. Reduced motion: poster still, static ring, no parallax, full type visible.
7. Top chrome: wordmark + nav + Open account. Proof rail under CTAs (placeholders unless buyer supplies real numbers).
8. Optional soft card plate (no PAN / numbers).

This page sells **trust and elevation**, not day-trader dopamine.

---

## Files to use (this pack)

```
START-HERE.md
PROMPT.md
CUSTOMIZATION.md
VIDEO_GEN_PROMPT.md
assets/
  orbit-vault-v1.mp4
  orbit-vault-v1.webp
source/
  OrbitFinanceHero.tsx
```

Place media:

- `public/assets/videos/orbit-vault-v1.mp4`
- `public/assets/posters/orbit-vault-v1.webp`

Prefer integrating `source/OrbitFinanceHero.tsx` over rewriting.

---

## Asset contract

| Field | Value |
|-------|--------|
| Film | `/assets/videos/orbit-vault-v1.mp4` (~15s silent loop) |
| Poster | `/assets/posters/orbit-vault-v1.webp` |
| Attributes | muted autoPlay loop playsInline preload auto |
| Mode | Free-play + orbital ring + desktop scale parallax. Never scroll-scrub currentTime |

### FORBIDDEN

- Competitor bank logos  
- Scroll scrub of film  
- Cyan Motionsites primary kit  
- Crypto neon / chart spam with readable numbers  
- Em dashes in customer-facing copy  
- Storefront preview filenames in the buyer build  
- Guaranteed return claims / fake regulator seals  

---

## Design system

| Token | Value |
|-------|--------|
| Canvas | `#0B1426` |
| Cream | `#F7F4EC` |
| Orbit gold | `#C9A84C` |
| Gold deep | `#A68B2E` |
| Display | DM Serif Display |
| Body | Inter |

**CSS variables:** `--font-orbit-display` · `--font-orbit-body`

---

## Default copy

| Slot | Default |
|------|---------|
| H1 | Money, elevated. |
| Lead | Banking without borders. Multi-currency wealth, quiet control, and a vault that never shouts. |
| CTA | Open account · How it works |
| Badge | Trusted globally · Private by design |
| Proof | 2M+ clients · 140 currencies · Bank-grade encryption (placeholders) |

---

## Motion law

```
film = free-play muted loop autoplay playsInline
ring = GSAP rotate 360deg ~64s linear (UI SVG only)
parallax = desktop film wrap scale 1 → 1.05 scrub 1.2 (off <768px)
NEVER set video.currentTime from scroll
prefers-reduced-motion = poster + static ring + no parallax
IntersectionObserver = pause film off-screen
GSAP ScrollTrigger = kill on unmount
```

---

## Stack

React + TypeScript + Tailwind. Framer Motion + GSAP. Lucide OK.

Install: `framer-motion`, `gsap`, `lucide-react`.

---

## Expected checks

1. Full-viewport navy vault hero  
2. Film free-plays muted  
3. DM Serif lockup + dual CTAs  
4. Gold orbital ring (desktop; static if reduced motion)  
5. No scroll-scrub of film  
6. Local film + poster resolve  
7. No em dashes; no crypto kitsch  

---

## What to tell your AI

```
Build ORBIT FINANCE using only the files in this pack folder.
Read PROMPT.md and follow it exactly. Use source/ and assets/ as provided.
```

To rebrand later, open CUSTOMIZATION.md. To generate a new vault film, open VIDEO_GEN_PROMPT.md.

---

## Package notes (operators)

- Opaque: `o4b1tv4ult` · PaidSalt: `ob7k3n`  
- Files zip root = START-HERE.md  
- Client media only under assets/  
- First production post: 2026-08-13 · Platinum Second Revision: 2026-08-13  

ClickMotion · www.ClickMotion.dev
