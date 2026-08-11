# TERRA NOVA - Clean Energy Platform Hero

**You are an expert front-end engineer.** Build this design EXACTLY as specified.  
Do not invent a different aesthetic. Do not apply any host website marketing shell.  
Produce a single production-ready React + TypeScript + Tailwind component.  
Support prefers-reduced-motion. Mobile-first responsive.

This document is the **only** design brief. Implement only what is written here.

---

## Product

Clean energy / climate-tech brand: **TERRA NOVA**.

**Visual promise (must read as one coherent product):**  
Full-viewport **aerial renewable landscape film** under a deep forest UI system. Living sage `#7BA58F` and soft solar gold `#E8B86D` as the only brand accents. Cream-white headlines on forest void. Fraunces display, DM Sans UI, soft green glass, quiet optimistic density. Feels like a serious climate-tech launch page (National Geographic calm + product restraint) - **not** wellness cream spa, not neon cyberpunk, not film-lot amber, not brutalist security mono, not luxury coastal scroll.

**Signature interaction:** looping video background + staggered entrance + light scroll parallax on the film (desktop only). **Not** a multi-chapter scroll-scrub product (that is Meridian / Vertex). **No glitch.**

---

## Asset contract (NON-NEGOTIABLE)

### Background video

| Field | Value |
|-------|--------|
| Public path | `/assets/videos/terra-aerial-v1.mp4` |
| Poster | `/assets/posters/terra-aerial-v1.webp` |
| Duration | ~10–14s seamless-feel aerial loop (longer master OK) |
| Attributes | `autoPlay muted loop playsInline preload="metadata"` |
| Object-fit | `cover`, full viewport |
| Offscreen | IntersectionObserver pause/resume |

#### REQUIRED subject

- Aerial **wind ridge**, **solar field**, or **living highland**  
- Clean air, optimistic climate-tech grade  
- Living sage greens + soft solar gold light, deep forest voids  
- Slow cinematic aerial glide, premium grade  
- Large dark voids so cream type stays legible  

#### FORBIDDEN in background video

- People / faces / crews  
- Readable text, logos, watermarks, turbine brands, HUD, UI  
- Neon cyan-pink cyberpunk city  
- Film studio backlots, soundstages  
- Ocean wellness spa beaches  
- Oil industry horror, smoke stacks as hero  

#### Implementer rule

```txt
Use ONLY the local path above. Never substitute a CDN URL.
If the binary is still a placeholder, still wire that path.
Do not pick a random monorepo video "because it looks cooler."
```

### AI video generation

See **`VIDEO_GEN_PROMPT.md`** in this folder. Short form:

```
Cinematic 4K seamless ~12s loop, silent. Aerial renewable landscape - wind ridges or solar fields, slow glide, living sage and soft solar gold grade, deep forest voids, no people, no readable text, no logos. Optimistic climate-tech trailer look. Seamless loop.
```

Encode target after handoff: MP4 H.264, 1920×1080+, silent, loop.

---

## Tech stack

- React 19 + TypeScript, `"use client"`  
- Tailwind CSS utilities  
- Framer Motion (entrance)  
- GSAP + ScrollTrigger for light video scale parallax (skip if reduced motion / mobile)  
- lucide-react: `Leaf`, `ArrowUpRight` only (or `Play` + `ArrowUpRight` if Leaf unavailable)  
- **No** hls.js. Plain MP4 `<video>`.  
- Single default export: `TerraNovaHeroSection.tsx`

---

## Design system

**Mode:** Dark only. Canvas deep forest `#0B1A14`.

| Role | Hex | Notes |
|------|-----|--------|
| background | `#0B1A14` | Page / hero base |
| foreground | `#F4F7F2` | Near-white cream headlines |
| primary (sage) | `#7BA58F` | Logo accent, badge, primary CTA |
| primary-fg | `#0B1A14` | Text on sage buttons |
| accent (solar) | `#E8B86D` | Secondary lockup / soft highlights |
| muted text | `rgba(244,247,242,0.68)` | Body |
| border | `rgba(244,247,242,0.1)` | Subtle edges |
| glass fill | `rgba(123,165,143,0.08)` | Soft green glass |

**Fonts:**

- Display: `Fraunces` 600-700, tracking `-0.02em`, line-height `0.95`  
- Body / UI: `DM Sans` 300-500, line-height `1.6`  

Use `next/font/google` variables `--font-display` / `--font-body`.

**Radius:** Soft pills on CTAs (`rounded-full`) - intentional calm tech chrome.

**Liquid glass (green-tinted):**

- **liquid-glass:** `background: rgba(123,165,143,0.06); backdrop-filter: blur(10px);`  
  inset `box-shadow: inset 0 1px 1px rgba(244,247,242,0.1)`  
- **liquid-glass-strong:** blur `40-50px`, slightly stronger sage fill  

**Anti-slop hard ban:**

- Cyan/pink neon systems, cyberpunk rain city UI  
- Purple mesh / aurora SaaS kits  
- Shiny gradient text, emoji, marquee, bento clutter  
- Aether cream wellness full-page light theme  
- Lumina amber/espresso film-lot system  
- Meridian multi-chapter scroll scrub  
- Vertex zero-radius mono brutalism  
- Host site (ClickMotion) chrome inside this component  

**Famous-UI craft direction (not a clone):** Climate-tech brand launch restraint. One video system. Soft entrances. Stop.

**Safe margins:** Horizontal `px-8` / `md:px-12` / `lg:px-16`. Type never kisses the frame edge.

---

## Layout

### SECTION 1: Navbar (fixed, full width, z-50, px-8 py-5)

Flex row, space-between, items-center.

- **Left:** `TERRA NOVA` — DM Sans medium, cream, small living sage dot  
- **Center** (hidden below md): `Solutions` · `Impact` · `Technology` · `About` · `Contact`  
  — text-sm, cream/70, rounded-full px-4 py-2, hover sage  
- **Right:** two pills  
  1. **Our Impact** — liquid-glass-strong, cream text  
  2. **Talk to Us** — bg sage, text forest, hover brightness-110  

### SECTION 2: Hero (h-screen, relative, overflow-hidden)

1. **Video background** absolute inset-0, object-cover  
   - src: `/assets/videos/terra-aerial-v1.mp4`  
   - poster: `/assets/posters/terra-aerial-v1.webp`  
   - autoPlay, muted, loop, playsInline, preload="metadata"  
   - IntersectionObserver pause when offscreen  
   - Dual scrim (do not crush the film):  
     ```
     linear-gradient(90deg, rgba(11,26,20,0.82) 0%, rgba(11,26,20,0.35) 48%, rgba(11,26,20,0.28) 100%)
     + linear-gradient(180deg, rgba(11,26,20,0.5) 0%, transparent 35%, rgba(11,26,20,0.65) 100%)
     ```  
2. **Content** relative z-10, flex column, items-start, justify-center, h-full,  
   px-8 md:px-16, max type width ~42rem  

**Copy stack (left-aligned):**

1. Badge: `CLEAN ENERGY PLATFORM` — xs, uppercase, tracking `0.2em`, sage/90  
2. H1: `POWER THE` — `clamp(2.75rem, 8vw, 7rem)`, Fraunces, cream  
3. Lockup: `PLANET.` — slightly smaller or same clamp, solar gold `#E8B86D`  
4. Description (≤180 chars for storefront cards):  
   `Utility-scale renewables and intelligent grids. We build clean power that communities can feel in the air they breathe.`  
5. CTA row (mt-8, flex wrap gap-4):  
   - **Explore Solutions** — sage bg, forest text, ArrowUpRight  
   - **See the Impact** — liquid-glass-strong, cream text  

---

## Motion (quantified)

Staggered Framer entrance (if not reduced motion):

| Element | Motion | Duration | Delay |
|---------|--------|----------|-------|
| Badge | y -16→0, opacity 0→1 | 0.55s | 0 |
| H1 | y 36→0 | 0.75s | 0.18s |
| Gold line | y 28→0 | 0.7s | 0.28s |
| Body | y 24→0 | 0.6s | 0.38s |
| CTAs | y 16→0 | 0.55s | 0.48s |

Ease: cubic `[0.25, 0.46, 0.45, 0.94]`.  
**No glitch.** Warm, unhurried entrances only.

**GSAP parallax (desktop, not reduced motion):**  
Scale video wrapper `1 → 1.05` with ScrollTrigger scrub `1.2`, `start: "top top"`, `end: "bottom top"`. Disable &lt;768px.

**Reduced motion:** no parallax, simple fade-in only.

---

## Responsive

| Breakpoint | Behavior |
|------------|----------|
| ≥1024px | Full nav; huge type; CTAs row; parallax OK |
| ≥768px | Nav links; large type |
| &lt;768px | Hide center nav; H1 ~2.6–3.4rem; CTAs may stack; no parallax |

---

## Accessibility

- Semantic `header`, `section`, `h1`  
- Focus rings sage/40  
- Video decorative if text is complete (`aria-hidden` on video)  
- `prefers-reduced-motion` respected  

---

## Content slots (customize later)

| Slot | Default |
|------|---------|
| brand | TERRA NOVA |
| badge | CLEAN ENERGY PLATFORM |
| headline | POWER THE |
| subheadline | PLANET. |
| description | Utility-scale renewables and intelligent grids. We build clean power that communities can feel in the air they breathe. |
| cta_primary | Explore Solutions |
| cta_secondary | See the Impact |
| nav_cta_a | Our Impact |
| nav_cta_b | Talk to Us |

---

## Expected output

1. `TerraNovaHeroSection.tsx` — default export, `"use client"`  
2. Fixed soft green-glass navbar + full-viewport aerial energy hero  
3. Local video path + poster, muted loop  
4. Staggered entrances (no glitch)  
5. Sage / solar gold / deep forest system only  

---

## Hard constraints

- Implement **only** this brief.  
- **Do not** read other monorepo design files for inspiration.  
- **Do not** use external CDN video URLs.  
- **Do not** make neon cyberpunk or cream wellness themes.  
- **Do not** invent ClickMotion / MS product library chrome.  
