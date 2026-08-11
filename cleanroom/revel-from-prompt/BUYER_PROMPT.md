# REVEL - Scroll Narrative Fashion Commerce Hero

**You are an expert front-end engineer.** Build this design EXACTLY as specified.  
Do not invent a different aesthetic. Do not apply any host website marketing shell.  
Produce a single production-ready React + TypeScript + Tailwind component.  
Support prefers-reduced-motion. Mobile-first responsive.

This document is the **only** design brief. Implement only what is written here.

---

## Product

Fashion commerce brand: **REVEL**.

**Visual promise (must read as one coherent product):**  
A **scroll-as-narrative** hero on a **light pearl studio** canvas. Rose-gold `#C4A574` and soft blush accents. Instrument Serif display, Inter UI. The film is a gold iPhone breakout - feed, shatter, woman free. Scroll progress **owns video time** (scrub), not autoplay loop. Feels like a high-fashion campaign site (Apple product film pacing × Vogue digital) - **not** dark luxury coastal scroll (Meridian), not mono security scrub (Vertex), not neon cyberpunk, not climate forest, not quantum lab, not wellness cream ocean.

**Signature interaction:** tall scroll track (~480vh) with sticky full-viewport stage. GSAP ScrollTrigger scrub maps progress 0→1 to `video.currentTime`. Four chapters swap copy with the film beats. Progress bar under nav fills in rose-gold. **Scroll cue** at start.

---

## Asset contract (NON-NEGOTIABLE)

### Background video (scroll-scrubbed, NOT loop autoplay)

| Field | Value |
|-------|--------|
| Public path | `/assets/videos/revel-breakout-v1.mp4` |
| Poster | `/assets/posters/revel-breakout-v1.webp` |
| Duration | ~20s cinematic breakout film |
| Attributes | `muted playsInline preload="auto"` - **NO autoPlay, NO loop as primary behavior** |
| Object-fit | `cover`, full viewport sticky stage |
| Time control | `video.currentTime = progress * duration` from ScrollTrigger |

#### Film subject (required story)

1. Gold phone floating in pearl studio, social icons orbit  
2. Shoe / sole shatters through glass screen  
3. Shards + hearts + icons suspended midair  
4. Woman breaks free, mid-leap over the phone  

#### FORBIDDEN

- Autoplay loop as the main mode (scroll owns time)  
- Dark-only Meridian/Vertex clones  
- Cyan neon cyberpunk city  
- Host (ClickMotion) chrome inside the component  

```txt
Use ONLY the local path above. Never substitute a CDN URL.
```

---

## Tech stack

- React 19 + TypeScript, `"use client"`  
- Tailwind CSS utilities  
- GSAP + ScrollTrigger (scrub)  
- Optional CSS keyframes for chapter crossfade  
- **No** Framer required (GSAP is the motion system)  
- **No** hls.js. Plain MP4 `<video>`.  
- Single default export: `RevelScrollNarrative.tsx`

---

## Design system

**Mode:** Light studio base with dark type on chrome; **cream/white headlines over the film** with soft dark bottom scrim for legibility.

| Role | Hex | Notes |
|------|-----|--------|
| page / root | `#F7F4F1` | Pearl canvas |
| ink | `#1A1614` | Charcoal UI |
| cream | `#F7F4F1` | Headlines on film |
| rose gold | `#C4A574` | Accent, progress, eyebrows |
| blush | `#E8B4B8` | Progress gradient mid |
| glass | `rgba(255,255,255,0.4)` | Nav CTA frost |

**Fonts:**

- Display: `Instrument Serif` (or Playfair if unavailable), medium feel, tracking `-0.03em`  
- Body / UI: `Inter` 300-600  

**Chrome:** Thin rose-gold progress under nav. Fashion uppercase tracking. Sharp-ish buttons (small radius ok, not neon pills). No glitch.

**Anti-slop hard ban:**

- Purple mesh SaaS, emoji, shiny rainbow text  
- Full-bleed dark private-bank clone of Meridian  
- Brutalist mono Vertex chrome  
- Neon cyan/pink rain city  
- Host marketing shell  

**Famous-UI craft direction (not a clone):** High-fashion digital campaign + Apple keynote restraint. One film. Scroll owns time. Stop.

---

## Layout

### Scroll architecture

- Outer track height: **480vh** (or 100vh if reduced motion)  
- Inner stage: `sticky top-0 h-screen overflow-hidden`  
- Video absolute cover + dual scrims (top pearl fade + bottom dark for type)  
- Nav absolute top, progress bar 1px under nav  

### Navbar

- Left: **REVEL** + optional "Fashion Commerce"  
- Center (md+): Collections · Lookbook · Campaigns · Journal  
- Right: **Enter atelier** frost button  

### Chapters (copy tied to progress)

| Progress | Id | Eyebrow | Title lines | Body gist |
|----------|-----|---------|-------------|-----------|
| 0–0.28 | feed | Chapter one · The feed | She lived / inside the glow. | Phone, profile, orbiting hearts |
| 0.28–0.58 | break | Chapter two · The break | Then something / had to give. | Sole through glass |
| 0.58–0.82 | shatter | Chapter three · The shatter | Shards of / attention fall. | Icons suspended midair |
| 0.82–1.0 | arrival | Chapter four · The arrival | Now she / owns the room. | Free mid-leap + CTAs |

Chapter index rail (right on lg): 01–04 with active rose-gold bar.

Finale CTAs (chapter 4 only): **Shop the drop** (charcoal fill) · **Watch campaign** (frost outline).

### Closing band `#atelier`

Pearl section below the scroll track. Headline "Fashion that breaks the scroll." Grid of 4 meta cards + **Request a campaign kit**.

---

## Motion (quantified)

- ScrollTrigger: `start: "top top"`, `end: "bottom bottom"`, `scrub: 0.5`  
- Seek threshold: only update if `|currentTime - target| > 0.016`  
- Chapter text: CSS fade/rise ~0.65–0.85s on key change  
- Progress bar: `scaleX(progress)`, origin left  
- Reduced motion: track = 100vh, no scrub, static mid-film frame (~0.45), still show one chapter  

---

## Accessibility

- Semantic header / section / h1  
- Video `aria-hidden` when copy is complete  
- Focusable CTAs with visible focus  
- `prefers-reduced-motion` respected  

---

## Content slots

| Slot | Default |
|------|---------|
| brand | REVEL |
| chapter1 title | She lived / inside the glow. |
| chapter2 title | Then something / had to give. |
| chapter3 title | Shards of / attention fall. |
| chapter4 title | Now she / owns the room. |
| cta_primary | Shop the drop |
| cta_secondary | Watch campaign |
| nav_cta | Enter atelier |

---

## Expected output

1. `RevelScrollNarrative.tsx` — default export, `"use client"`  
2. Scroll-scrubbed video (no autoplay primary mode)  
3. Four chapters + progress + scroll cue  
4. Light pearl + rose-gold system  
5. Closing atelier band  
6. Reduced-motion path  

---

## Hard constraints

- Implement **only** this brief.  
- **Do not** clone Meridian gold-coast dark theme.  
- **Do not** use external CDN video URLs.  
- **Do not** invent ClickMotion / MS host chrome.  
