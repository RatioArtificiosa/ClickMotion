# APEX QUANTUM - Deep Tech Quantum Platform Hero

**You are an expert front-end engineer.** Build this design EXACTLY as specified.  
Do not invent a different aesthetic. Do not apply any host website marketing shell.  
Produce a single production-ready React + TypeScript + Tailwind component.  
Support prefers-reduced-motion. Mobile-first responsive.

This document is the **only** design brief. Implement only what is written here.

---

## Product

Deep-tech quantum computing brand: **APEX QUANTUM**.

**Visual promise (must read as one coherent product):**  
Full-viewport **cryogenic quantum lab / qubit lattice film** under a void-indigo UI system. Electric quantum cyan `#00D4FF` and controlled violet `#A855F7` as the only brand accents. Ice-white headlines on deep void. JetBrains Mono display, Inter UI, cold instrument glass, precise scientific density. Feels like a quantum hardware company launch page (lab restraint + product precision) - **not** neon rain cyberpunk, not purple mesh SaaS kits, not wellness cream, not forest climate, not film-lot amber, not mono security scrub.

**Signature interaction:** looping video background + staggered entrance + light scroll parallax on the film (desktop only). **Not** a multi-chapter scroll-scrub product (that is Meridian / Vertex). **No glitch.** **No WebGL required** for v1 (optional later).

---

## Asset contract (NON-NEGOTIABLE)

### Background video

| Field | Value |
|-------|--------|
| Public path | `/assets/videos/apex-quantum-v1.mp4` |
| Poster | `/assets/posters/apex-quantum-v1.webp` |
| Duration | ~10–14s seamless-feel cinematic loop (longer master OK) |
| Attributes | `autoPlay muted loop playsInline preload="metadata"` |
| Object-fit | `cover`, full viewport |
| Offscreen | IntersectionObserver pause/resume |

#### REQUIRED subject

- Empty **cryogenic quantum lab**, **chip bay**, or **abstract qubit light lattice**  
- Void indigo darkness, electric cyan + controlled violet instrument light  
- Slow cinematic push / glide, premium grade  
- Large dark voids so ice-white type stays legible  

#### FORBIDDEN in background video

- People / faces / operators / lab coats as focus  
- Readable text, logos, watermarks, rack labels, HUD, UI  
- Neon cyan-pink rain megacity (Neon Forge)  
- Forest wind / solar climate landscapes (Terra Nova)  
- Film studio backlots, amber tungsten lots (Lumina)  
- Ocean wellness spa beaches (Aether)  
- Cheap purple mesh aurora SaaS wallpaper  

#### Implementer rule

```txt
Use ONLY the local path above. Never substitute a CDN URL.
If the binary is still a placeholder, still wire that path.
Do not pick a random monorepo video "because it looks cooler."
```

### AI video generation

See **`VIDEO_GEN_PROMPT.md`** in this folder. Short form:

```
Cinematic 4K seamless ~12s loop, silent. Empty cryogenic quantum lab or pure qubit light lattice, slow push, void indigo voids, electric cyan and controlled violet instrument light, no people, no readable text, no logos. Deep-tech quantum prestige trailer look. Seamless loop.
```

Encode target after handoff: MP4 H.264, 1920×1080+, silent, loop.

---

## Tech stack

- React 19 + TypeScript, `"use client"`  
- Tailwind CSS utilities  
- Framer Motion (entrance)  
- GSAP + ScrollTrigger for light video scale parallax (skip if reduced motion / mobile)  
- lucide-react: `ArrowUpRight` only (optional `Atom` if available)  
- **No** hls.js. Plain MP4 `<video>`.  
- **No** Three.js required for v1.  
- Single default export: `ApexQuantumHeroSection.tsx`

---

## Design system

**Mode:** Dark only. Canvas void indigo `#070A1A`.

| Role | Hex | Notes |
|------|-----|--------|
| background | `#070A1A` | Page / hero base |
| foreground | `#E8F0FF` | Ice-white headlines |
| primary (cyan) | `#00D4FF` | Logo accent, badge, primary CTA |
| primary-fg | `#070A1A` | Text on cyan buttons |
| accent (violet) | `#A855F7` | Secondary lockup / soft highlights |
| muted text | `rgba(232,240,255,0.65)` | Body |
| border | `rgba(232,240,255,0.1)` | Subtle edges |
| glass fill | `rgba(0,212,255,0.06)` | Cold cyan-tinted glass |

**Fonts:**

- Display: `JetBrains Mono` 600-700, tracking `-0.04em`, line-height `0.9`  
- Body / UI: `Inter` 300-500, line-height `1.6`  

Use `next/font/google` variables `--font-display` / `--font-body`.

**Radius:** Soft pills on CTAs (`rounded-full`) - calm instrument chrome, not brutal zero-radius.

**Liquid glass (cyan-tinted):**

- **liquid-glass:** `background: rgba(0,212,255,0.05); backdrop-filter: blur(10px);`  
  inset `box-shadow: inset 0 1px 1px rgba(232,240,255,0.1)`  
- **liquid-glass-strong:** blur `40-50px`, slightly stronger cyan fill  

**Anti-slop hard ban:**

- Pink neon systems, rain megacity UI, glitch H1  
- Purple mesh / aurora SaaS kits as full background language  
- Shiny gradient text, emoji, marquee, bento clutter  
- Aether cream wellness full-page light theme  
- Lumina amber/espresso film-lot system  
- Terra forest sage climate UI  
- Meridian multi-chapter scroll scrub  
- Vertex zero-radius mono brutalism  
- Host site (ClickMotion) chrome inside this component  

**Famous-UI craft direction (not a clone):** Quantum hardware launch restraint. One video system. Soft entrances. Stop.

**Safe margins:** Horizontal `px-8` / `md:px-12` / `lg:px-16`. Type never kisses the frame edge.

---

## Layout

### SECTION 1: Navbar (fixed, full width, z-50, px-8 py-5)

Flex row, space-between, items-center.

- **Left:** `APEX` — JetBrains Mono medium, ice-white + small cyan pulse dot; optional tiny `QUANTUM` caption  
- **Center** (hidden below md): `Platform` · `Research` · `Systems` · `Labs` · `Contact`  
  — text-sm, ice/70, rounded-full px-4 py-2, hover cyan  
- **Right:** two pills  
  1. **Documentation** — liquid-glass-strong, ice text  
  2. **Request Access** — bg cyan, text void, hover brightness-110  

### SECTION 2: Hero (h-screen, relative, overflow-hidden)

1. **Video background** absolute inset-0, object-cover  
   - src: `/assets/videos/apex-quantum-v1.mp4`  
   - poster: `/assets/posters/apex-quantum-v1.webp`  
   - autoPlay, muted, loop, playsInline, preload="metadata"  
   - IntersectionObserver pause when offscreen  
   - Dual scrim (do not crush the film):  
     ```
     linear-gradient(90deg, rgba(7,10,26,0.88) 0%, rgba(7,10,26,0.4) 48%, rgba(7,10,26,0.3) 100%)
     + linear-gradient(180deg, rgba(7,10,26,0.55) 0%, transparent 35%, rgba(7,10,26,0.7) 100%)
     ```  
2. **Content** relative z-10, flex column, items-start, justify-center, h-full,  
   px-8 md:px-16, max type width ~42rem  

**Copy stack (left-aligned):**

1. Badge: `QUANTUM COMPUTING PLATFORM` — xs, uppercase, tracking `0.2em`, cyan/90  
2. H1: `QUANTUM.` — `clamp(2.75rem, 8vw, 7rem)`, JetBrains Mono, ice-white  
3. Lockup: `REAL.` — slightly smaller or same clamp, violet `#A855F7`  
4. Description (≤180 chars for storefront cards):  
   `Error-corrected quantum systems for teams who are done waiting on classical limits. Hardware, software, and control - one stack.`  
5. CTA row (mt-8, flex wrap gap-4):  
   - **Access Quantum** — cyan bg, void text, ArrowUpRight  
   - **Read the Paper** — liquid-glass-strong, ice text  

---

## Motion (quantified)

Staggered Framer entrance (if not reduced motion):

| Element | Motion | Duration | Delay |
|---------|--------|----------|-------|
| Badge | y -16→0, opacity 0→1 | 0.55s | 0 |
| H1 | y 36→0 | 0.75s | 0.18s |
| Violet lockup | y 28→0 | 0.7s | 0.28s |
| Body | y 24→0 | 0.6s | 0.38s |
| CTAs | y 16→0 | 0.55s | 0.48s |

Ease: cubic `[0.25, 0.46, 0.45, 0.94]`.  
**No glitch.** Precise, unhurried entrances only.

**GSAP parallax (desktop, not reduced motion):**  
Scale video wrapper `1 → 1.04` with ScrollTrigger scrub `1.2`, `start: "top top"`, `end: "bottom top"`. Disable &lt;768px.

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
- Focus rings cyan/40  
- Video decorative if text is complete (`aria-hidden` on video)  
- `prefers-reduced-motion` respected  

---

## Content slots (customize later)

| Slot | Default |
|------|---------|
| brand | APEX QUANTUM |
| badge | QUANTUM COMPUTING PLATFORM |
| headline | QUANTUM. |
| subheadline | REAL. |
| description | Error-corrected quantum systems for teams who are done waiting on classical limits. Hardware, software, and control - one stack. |
| cta_primary | Access Quantum |
| cta_secondary | Read the Paper |
| nav_cta_a | Documentation |
| nav_cta_b | Request Access |

---

## Expected output

1. `ApexQuantumHeroSection.tsx` — default export, `"use client"`  
2. Fixed cold cyan-glass navbar + full-viewport quantum hero  
3. Local video path + poster, muted loop  
4. Staggered entrances (no glitch)  
5. Cyan / violet / void indigo system only  

---

## Hard constraints

- Implement **only** this brief.  
- **Do not** read other monorepo design files for inspiration.  
- **Do not** use external CDN video URLs.  
- **Do not** make neon rain city or purple mesh SaaS themes.  
- **Do not** invent ClickMotion / MS product library chrome.  
