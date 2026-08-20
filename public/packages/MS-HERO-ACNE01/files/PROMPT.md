# Acne Secret - AI build prompt

**Product:** Acne Secret (private clear-skin HVCO lead-capture hero)  
**Brand:** ClickMotion · www.ClickMotion.dev  

You are an expert front-end engineer. Build this hero **exactly** as specified using **only the files in this pack**. Do not invent a pastel spa brochure. Do not hard-pitch a full product checkout on this page. Do not reveal the brand name before email submit. Do not scrub the video with scroll. Do not make medical cure claims.

---

## User will say

> Build Acne Secret using the files in this folder. Read PROMPT.md and follow it.

---

## What you are building

A full-viewport **Sabri Suby-class HVCO (High-Value Content Offer) lead-capture hero**:

1. Near-black prestige canvas, cream type, gold signal accent.
2. Film free-plays muted (autoPlay muted loop playsInline).
3. **Phase A (0 to CINEMA_S seconds, default 15):** film centered at about **50% viewport width** over a dark frosted blur plate. Progress hairline optional.
4. **Phase B (after CINEMA_S):** film eases moderately to the **left**; lead-capture stack docks **right** (headline, subhead, bullets, name+email form, CTA). All above the fold on desktop.
5. Brand name is **locked** until a valid email submit; then reveal (demo brand may be labeled synthetic).
6. Reduced motion: skip cinema; show docked layout immediately; film may pause on poster.

This page sells the **opt-in / click to the HVCO**, not the entire product catalog.

---

## Files to use (this pack)

```
START-HERE.md
PROMPT.md
CUSTOMIZATION.md
VIDEO_GEN_PROMPT.md
assets/
  acne-secret-v1.webm
  acne-secret-v1.webp
source/
  AcneSecretHero.tsx
```

Place media:

- `public/assets/videos/acne-secret-v1.webm`
- `public/assets/posters/acne-secret-v1.webp`

Prefer integrating `source/AcneSecretHero.tsx` over rewriting.

---

## Asset contract

| Field | Value |
|-------|--------|
| Film | `/assets/videos/acne-secret-v1.webm` (~45s silent loopable WebM) |
| Poster | `/assets/posters/acne-secret-v1.webp` |
| Attributes | muted autoPlay loop playsInline preload auto |
| Mode | Free-play + timed layout phase (cinema → dock). Never scroll-scrub currentTime |

### FORBIDDEN

- Medical cure claims, guaranteed clinical outcomes, body-shame language
- Revealing brand before email
- Em dashes in customer-facing copy (use hyphen or period)
- Competitor brand names, fake stats, invent testimonials
- Storefront preview filenames in the buyer build

---

## Design system

| Token | Value |
|-------|--------|
| Canvas | `#070708` |
| Cream type | `#f4f1ea` / `#faf8f2` |
| Gold signal | `#f5c518` |
| Soft danger (errors) | `#ff8a7a` |
| Display + body | Inter bold/semibold geometric |
| Glass / fields | white ~6% on dark, 12px radius |
| Blur plate | backdrop-blur ~28-32px, dark transparent |

**Aesthetic:** King Kong / Sell Like Crazy soft energy - private briefing, news-style WARNING, gold CTA dominance. Not pastel spa, not neon SaaS mesh, not polite corporate brochure.

---

## Default copy (restage freely)

| Slot | Default |
|------|---------|
| Eyebrow | Breaking · clear skin market |
| H1 | WARNING: The clear-skin brand they hide from you is not on the shelf label. |
| Body | Hope marketing reframe + Private Clear Skin Brief as free HVCO + brand unlock |
| Bullets | Brand name · Private Clear Skin Brief · how protocol reaches them |
| CTA | Unlock the brand name free |
| Privacy | Instant brand unlock + Private Clear Skin Brief. |
| Unlock brand | AETHERA CLEAR (demo; label synthetic if not real) |

---

## Motion law

```
film = free-play muted loop
CINEMA_S = 15 (wall clock and/or video clock; dock when max reaches CINEMA_S)
cinema layout = film centered ~50vw width, dark frosted blur behind
dock layout = film left ~44%, form right ~42%, ease ~1.05s cubic-bezier(0.22, 0.61, 0.36, 1)
form entrance = fade/slide after dock starts (~0.85s, slight delay)
prefers-reduced-motion = docked immediately, no cinema hold required
IntersectionObserver = pause film when off-screen
NEVER set video.currentTime from scroll
```

Capture/QA: optional `window` event `ms-acne-force-dock` forces dock phase.

---

## Stack

React + TypeScript + Tailwind. Framer Motion for layout phases. Lucide icons OK. Prefer pack source.

Install: `framer-motion`, `lucide-react`.

---

## Responsive

| Breakpoint | Behavior |
|------------|----------|
| Desktop wide | Cinema then left/right dock, all above fold |
| <900px | Shorter cinema or immediate stack: film top, form below (still one hero) |
| ≤390px | Compact type; keep ≥44px targets |

---

## Accessibility

- Semantic section, header, h1, form labels
- Focus rings gold
- Error messages with role=alert
- Reduced motion path
- Video decorative (aria-hidden)

---

## Performance

- Preload auto on film
- Single hero component
- Kill observers on unmount
- Prefer WebM or silent mp4 for muted autoplay

---

## Expected checks

1. Full-viewport dark HVCO hero  
2. Film free-plays muted  
3. Cinema hold then dock (or reduced-motion dock)  
4. Brand locked until valid email  
5. Unlock state shows brand  
6. No medical cure claims  
7. Mobile stack usable  
8. Local film + poster resolve  
9. No scroll-scrub of film  

---

## Anti-patterns

- Pastel spa restyle of this page type  
- Checkout cart on this hero  
- Brand name visible before opt-in  
- Scroll scrub  
- Cure claims / body shame  
- Em dashes in customer copy  

---

## What to tell your AI

```
Build Acne Secret using only the files in this pack folder.
Read PROMPT.md and follow it exactly. Use source/ and assets/ as provided.
```

---

## Package notes (operators)

- Opaque: `a0cne7s3cr3t` · PaidSalt: `ac8k2n`
- Files zip root = START-HERE.md
- Client media only under assets/ (operator film WebM kept as WebM)
- Mode: cinema hold → docked HVCO lead capture
- First production post: 2026-08-12 · Platinum Second Revision: 2026-08-13

ClickMotion · www.ClickMotion.dev
