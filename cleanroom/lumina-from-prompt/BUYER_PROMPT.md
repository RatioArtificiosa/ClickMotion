# LUMINA STUDIOS - Cinematic Film Production Hero

**You are an expert front-end engineer.** Build this design EXACTLY as specified.  
Do not invent a different aesthetic. Do not apply any host website marketing shell.  
Produce a single production-ready React + TypeScript + Tailwind component.  
Support prefers-reduced-motion. Mobile-first responsive.

This document is the **only** design brief. Implement only what is written here.

---

## Product

Film production / post house brand: **LUMINA STUDIOS**.

**Visual promise (must read as one coherent product):**  
Full-viewport **warm cinematic film** under an espresso-dark UI system. Amber `#F59E0B` and cream `#FEF3C7` as the only brand accents. Playfair Display headlines, Inter UI, soft liquid glass, quiet prestige density. Feels like a film craft house launch page (trailer calm + precise type) - **not** neon cyberpunk, not wellness cream, not brutalist security mono, not luxury coastal estate scroll.

**Signature interaction:** looping video background + staggered entrance + light scroll parallax on the film (desktop only). **Not** a multi-chapter scroll-scrub product (that is Meridian / Vertex).

---

## Asset contract (NON-NEGOTIABLE)

### Background video

| Field | Value |
|-------|--------|
| Public path | `/assets/videos/lumina-dolly-v1.mp4` |
| Poster | `/assets/posters/lumina-dolly-v1.webp` |
| Duration | ~10–14s seamless-feel cinematic loop (longer master OK) |
| Attributes | `autoPlay muted loop playsInline preload="metadata"` |
| Object-fit | `cover`, full viewport |
| Offscreen | IntersectionObserver pause/resume |

#### REQUIRED subject

- Empty film **studio backlot** and/or **soundstage**  
- Warm golden hour / tungsten practical light  
- Amber + cream grade, deep espresso voids  
- Slow cinematic dolly, premium grade  
- Large dark voids so cream/amber type stays legible  

#### FORBIDDEN in background video

- People / faces / crew  
- Readable text, logos, watermarks, clapper letters, HUD, UI  
- Neon cyan-pink cyberpunk city  
- Ocean, wellness, luxury beach estates  
- Cold blue tech / wireframe globe  

#### Implementer rule

```txt
Use ONLY the local path above. Never substitute a CDN URL.
If the binary is still a placeholder, still wire that path.
Do not pick a random monorepo video "because it looks cooler."
```

### AI video generation

See **`VIDEO_GEN_PROMPT.md`** in this folder. Short form:

```
Cinematic 4K seamless ~12s loop, silent. Empty film studio backlot or soundstage, slow dolly, warm amber tungsten practicals, cream highlights, espresso voids, no people, no readable text, no logos. Prestige film-craft trailer look. Seamless loop.
```

Encode target after handoff: MP4 H.264, 1920×1080+, silent, loop.

---

## Tech stack

- React 19 + TypeScript, `"use client"`  
- Tailwind CSS utilities  
- Framer Motion (entrance)  
- GSAP + ScrollTrigger for light video scale parallax (skip if reduced motion / mobile)  
- lucide-react: `Play`, `ArrowUpRight` only  
- **No** hls.js. Plain MP4 `<video>`.  
- Single default export: `LuminaHeroSection.tsx`

---

## Design system

**Mode:** Dark only. Canvas espresso `#1E140A` (near-black warm).

| Role | Hex | Notes |
|------|-----|--------|
| background | `#1E140A` | Page / hero base |
| foreground | `#FEF3C7` | Cream headlines |
| primary (amber) | `#F59E0B` | Logo accent, badge, primary CTA |
| primary-fg | `#1E140A` | Text on amber buttons |
| muted text | `rgba(254,243,199,0.65)` | Body |
| border | `rgba(254,243,199,0.1)` | Subtle edges |
| glass fill | `rgba(254,243,199,0.04)` | Liquid glass |

**Fonts:**

- Display: `Playfair Display` 700-900, tracking `-0.03em`, line-height `0.9`  
- Body / UI: `Inter` 300-500, line-height `1.6`  

Use `next/font/google` or CSS variables `--font-display` / `--font-body`.

**Radius:** Pills allowed on CTAs (`rounded-full`) - intentional soft studio chrome, not Neon glass rave.

**Liquid glass:**

- **liquid-glass:** `background: rgba(254,243,199,0.03); backdrop-filter: blur(8px);`  
  inset `box-shadow: inset 0 1px 1px rgba(254,243,199,0.1)`  
- **liquid-glass-strong:** blur `40-50px`, slightly stronger fill  

**Anti-slop hard ban:**

- Cyan/pink neon systems, cyberpunk rain city UI  
- Purple mesh / aurora fills  
- Shiny gradient text, emoji, marquee, bento clutter  
- Vertex zero-radius mono brutalism  
- Meridian multi-chapter scroll scrub  
- Host site (ClickMotion) chrome inside this component  

**Famous-UI craft direction (not a clone):** Film studio / post house launch page restraint. One video system. Soft entrances. Stop.

**Safe margins:** Horizontal `px-8` / `md:px-12` / `lg:px-16`. Type never kisses the frame edge.

---

## Layout

### SECTION 1: Navbar (fixed, full width, z-50, px-8 py-5)

Flex row, space-between, items-center.

- **Left:** `LUMINA` — Playfair or Inter medium, cream, small amber dot  
- **Center** (hidden below md): `Work` · `Films` · `Studio` · `Careers` · `Contact`  
  — text-sm, cream/70, rounded-full px-4 py-2, hover amber  
- **Right:** two pills  
  1. **Showreel** — liquid-glass-strong, cream text, Play icon  
  2. **Start a Project** — bg amber, text espresso, hover brightness-110  

### SECTION 2: Hero (h-screen, relative, overflow-hidden)

1. **Video background** absolute inset-0, object-cover  
   - src: `/assets/videos/lumina-dolly-v1.mp4`  
   - poster: `/assets/posters/lumina-dolly-v1.webp`  
   - autoPlay, muted, loop, playsInline, preload="metadata"  
   - IntersectionObserver pause when offscreen  
   - Dual scrim (do not crush the film):  
     ```
     linear-gradient(90deg, rgba(30,20,10,0.78) 0%, rgba(30,20,10,0.35) 50%, rgba(30,20,10,0.25) 100%)
     + linear-gradient(180deg, rgba(30,20,10,0.5) 0%, transparent 35%, rgba(30,20,10,0.6) 100%)
     ```  
2. **Content** relative z-10, flex column, items-start, justify-center, h-full,  
   px-8 md:px-16, max type width ~42rem  

**Copy stack (left-aligned):**

1. Badge: `FILM PRODUCTION STUDIO` — xs, uppercase, tracking `0.2em`, amber/90  
2. H1: `STORIES THAT` — `clamp(2.75rem, 8vw, 7rem)`, Playfair, cream  
3. H2 / lockup line: `MOVE.` — slightly smaller or same, amber `#F59E0B`  
   (If single H1 preferred: two lines "STORIES THAT" / "MOVE." with MOVE in amber)  
4. Description (≤180 chars for storefront cards):  
   `Award-minded film and commercial craft. From treatment to final grade, we light stories the audience feels in their chest.`  
5. CTA row (mt-8, flex wrap gap-4):  
   - **View the Reel** — amber bg, espresso text, ArrowUpRight  
   - **Book a Call** — liquid-glass-strong, cream text  

---

## Motion (quantified)

Staggered Framer entrance (if not reduced motion):

| Element | Motion | Duration | Delay |
|---------|--------|----------|-------|
| Badge | y -16→0, opacity 0→1 | 0.55s | 0 |
| H1 | y 36→0 | 0.75s | 0.18s |
| Amber line | y 28→0 | 0.7s | 0.28s |
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
- Focus rings amber/40  
- Video decorative if text is complete (`aria-hidden` on video)  
- `prefers-reduced-motion` respected  

---

## Content slots (customize later)

| Slot | Default |
|------|---------|
| brand | LUMINA |
| badge | FILM PRODUCTION STUDIO |
| headline | STORIES THAT |
| subheadline | MOVE. |
| description | Award-minded film and commercial craft. From treatment to final grade, we light stories the audience feels in their chest. |
| cta_primary | View the Reel |
| cta_secondary | Book a Call |
| nav_cta_a | Showreel |
| nav_cta_b | Start a Project |

---

## Expected output

1. `LuminaHeroSection.tsx` — default export, `"use client"`  
2. Fixed soft-glass navbar + full-viewport warm cinematic hero  
3. Local video path + poster, muted loop  
4. Staggered entrances (no glitch)  
5. Amber / cream / espresso system only  

---

## Hard constraints

- Implement **only** this brief.  
- **Do not** read other monorepo design files for inspiration.  
- **Do not** use external CDN video URLs.  
- **Do not** make neon cyberpunk or wellness cream themes.  
- **Do not** invent ClickMotion / MS product library chrome.  
