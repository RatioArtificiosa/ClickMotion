# NEON FORGE — Cyberpunk Gaming Studio Hero

**You are an expert front-end engineer.** Build this design EXACTLY as specified.  
Do not invent a different aesthetic. Do not apply any host website marketing shell.  
Produce a single production-ready React + TypeScript + Tailwind component.  
Support prefers-reduced-motion. Mobile-first responsive.

This document is the **only** design brief. Implement only what is written here.

---

## Product

Game development studio brand: **NEON FORGE**.

**Visual promise (must read as one coherent product):**  
Full-viewport **night megacity film** under a pure black UI system. Electric cyan `#00F0FF` and hot pink `#FF006E` as the only brand accents. Space Grotesk display, liquid-glass nav, **glitch entrance** on the headline, quiet luxury density with AAA energy. Feels like a high-end studio launch page (event-trailer calm + precision layout) - **not** a purple SaaS kit, not anime, not cheap cyberpunk stock.

**Signature interaction:** looping video background + glitch H1 on load + light scroll parallax on the film (desktop only). **Not** a scroll-scrub chapter product (that is Meridian / Vertex).

---

## Asset contract (NON-NEGOTIABLE)

### Background video

| Field | Value |
|-------|--------|
| Public path | `/assets/videos/neon-forge-city-v1.mp4` |
| Poster | `/assets/posters/neon-forge-city-v1.webp` |
| Duration | ~60s seamless-feel night city loop (intentionally longer for loop quality) |
| Attributes | `autoPlay muted loop playsInline preload="metadata"` |
| Object-fit | `cover`, full viewport |
| Offscreen | IntersectionObserver pause/resume |

#### REQUIRED subject

- Night **cyberpunk megacity** canyon or wet-street glide  
- Rain / wet reflections preferred  
- Practical light in **cyan + magenta/pink**  
- Slow cinematic camera, premium grade  
- Large pure-black voids so white/cyan UI stays legible  

#### FORBIDDEN in background video

- People / faces / crowds  
- Readable text, logos, watermarks, HUD, UI  
- Daytime, nature, ocean, wellness, luxury estate coast  
- Aircraft as hero, mechs, monsters  
- Rainbow neon chaos or purple mesh sky wallpaper  

#### Implementer rule

```txt
Use ONLY the local path above. Never substitute a CDN URL.
If the binary is still a placeholder, still wire that path.
Do not pick a random monorepo video “because it looks cooler.”
```

### AI video generation

See **`VIDEO_GEN_PROMPT.md`** in this folder for the full director-grade prompt. Short form:

```
Cinematic 4K seamless 12s loop, silent. Night rain-soaked cyberpunk megacity canyon, slow aerial glide, cyan and magenta neon practicals only, wet reflections, volumetric fog, pure black voids, no people, no readable text, no logos, no UI. Premium AAA trailer look. Seamless loop.
```

Encode target after handoff: MP4 H.264, 1920×1080+, silent, loop.

---

## Tech stack

- React 19 + TypeScript, `"use client"`  
- Tailwind CSS utilities  
- Framer Motion (entrance + glitch)  
- GSAP + ScrollTrigger for light video scale parallax (skip if reduced motion / mobile)  
- lucide-react: `Play`, `ArrowUpRight` only  
- **No** hls.js. Plain MP4 `<video>`.  
- Single default export: `NeonForgeHeroSection.tsx`

---

## Design system

**Mode:** Dark only. Canvas pure black `#000000`.

| Role | Hex | Notes |
|------|-----|--------|
| background | `#000000` | Page / hero base |
| foreground | `#FFFFFF` | Primary headlines |
| primary (cyan) | `#00F0FF` | Logo, badge, primary CTA, glow |
| primary-fg | `#000000` | Text on cyan buttons |
| secondary (pink) | `#FF006E` | Sub-headline lockup |
| muted text | `rgba(255,255,255,0.65)` | Body |
| border | `rgba(255,255,255,0.08)` | Subtle edges |
| glass fill | `rgba(255,255,255,0.04)` | Liquid glass |

**Fonts:**

- Display: `Space Grotesk` 700–900, tracking `-0.04em`, line-height `0.85–0.9`  
- Body / UI: `Inter` 300–500, line-height `1.6`  

Use `next/font/google` or CSS variables `--font-display` / `--font-body` with system fallbacks.

**Radius:** Buttons and nav chips `rounded-full` (this brand **is** allowed pills - intentional neon studio chrome).  

**Liquid glass:**

- **liquid-glass:** `background: rgba(255,255,255,0.02); backdrop-filter: blur(8px);`  
  inset `box-shadow: inset 0 1px 1px rgba(255,255,255,0.12)`  
- **liquid-glass-strong:** blur `40–50px`, fill `rgba(255,255,255,0.04)`, stronger inset  

**Anti-slop hard ban (even for neon):**

- Purple mesh / aurora / warp full-bleed backgrounds **as UI**  
- Shiny gradient text, emoji, marquee, bento clutter  
- Border-beam kits, random Magic UI stacks  
- Wellness cream theme, brutalist zero-radius (that is Vertex)  
- Host site (ClickMotion) chrome inside this component  

**Famous-UI craft direction (not a clone):** AAA studio launch page restraint (event trailer calm) + precise left-weighted type stack. One video system. One glitch moment. Stop.

**Safe margins:** Horizontal `px-8` / `md:px-12` / `lg:px-16`. Type and CTAs never kiss the frame edge. H1 uses `clamp` and `break-words` / `min-w-0`.

---

## Layout

### SECTION 1: Navbar (fixed, full width, z-50, px-8 py-5)

Flex row, space-between, items-center.

- **Left:** `NEON FORGE` — Space Grotesk bold, cyan, small glowing cyan dot  
  (`box-shadow: 0 0 12px #00F0FF`)  
- **Center** (hidden below md): `Work` · `Games` · `Studio` · `Careers` · `Contact`  
  — text-sm, white/70, rounded-full px-4 py-2, hover cyan  
- **Right:** two pills  
  1. **Play Demo** — liquid-glass-strong, white text, Play icon  
  2. **Get Started** — bg cyan, text black, hover brightness-110  

### SECTION 2: Hero (h-screen, relative, overflow-hidden)

1. **Video background** absolute inset-0, object-cover  
   - src: `/assets/videos/neon-forge-city-v1.mp4`  
   - poster: `/assets/posters/neon-forge-city-v1.webp`  
   - autoPlay, muted, loop, playsInline, preload="metadata"  
   - IntersectionObserver pause when offscreen  
   - Light dual scrim so type stays crisp (do **not** crush the film):  
     ```
     linear-gradient(90deg, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.35) 48%, rgba(0,0,0,0.25) 100%)
     + linear-gradient(180deg, rgba(0,0,0,0.45) 0%, transparent 32%, rgba(0,0,0,0.55) 100%)
     ```  
2. **Optional scanline overlay** pointer-events-none: repeating-linear-gradient ~3px, opacity 0.02 cyan-tinted  
3. **Content** relative z-10, flex column, items-start, justify-center, h-full,  
   px-8 md:px-16, max type width ~42rem  

**Copy stack (left-aligned):**

1. Badge: `GAME DEVELOPMENT STUDIO` — xs, uppercase, tracking `0.2em`, cyan/85  
2. H1: `BUILD WORLDS.` — `clamp(2.75rem, 8vw, 7.5rem)`, Space Grotesk black, white  
   **Glitch on mount (if not reduced motion):** brief opacity/x/blur jitter ~3 cycles after ~0.45s delay  
3. H2: `PLAY GOD.` — slightly smaller clamp, pink `#FF006E` at ~92% opacity, slight negative margin-top  
4. Description (≤180 chars storefront law when used on MS product card - full line here):  
   `We craft immersive gaming experiences that push interactive entertainment. From concept to launch, we build worlds players never want to leave.`  
   — Inter light, muted white, max-w-xl, mt-6  
5. CTA row (mt-8, flex wrap gap-4):  
   - **View Our Work** — cyan bg, black text, ArrowUpRight  
   - **Join The Team** — liquid-glass-strong, white text  

---

## Motion (quantified)

Staggered Framer entrance (if not reduced motion):

| Element | Motion | Duration | Delay |
|---------|--------|----------|-------|
| Badge | y -16→0, opacity 0→1 | 0.55s | 0 |
| H1 | y 36→0, then glitch | 0.75s | 0.18s |
| H2 | y 36→0 | 0.7s | 0.28s |
| Body | y 24→0 | 0.6s | 0.38s |
| CTAs | y 16→0 | 0.55s | 0.48s |

Ease: cubic `[0.25, 0.46, 0.45, 0.94]`.

**Glitch (H1 only):**  
`opacity: [1, 0.75, 1, 0.9, 1]`, `x: [0, -3, 2, -2, 0]`, optional `filter: blur(0px → 1px → 0)` over ~0.35s, ~3 repeats, then settle.

**GSAP parallax (desktop, not reduced motion):**  
Scale video wrapper `1 → 1.06` with ScrollTrigger scrub `1.2`, `start: "top top"`, `end: "bottom top"`. Disable &lt;768px.

**Reduced motion:** no glitch, no parallax, simple fade-in only.

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
- Focus rings on interactive elements (`ring` cyan/40)  
- Video decorative if text is complete (`aria-hidden` on video)  
- `prefers-reduced-motion` respected  

---

## Content slots (customize later)

| Slot | Default |
|------|---------|
| brand | NEON FORGE |
| badge | GAME DEVELOPMENT STUDIO |
| headline | BUILD WORLDS. |
| subheadline | PLAY GOD. |
| description | We craft immersive gaming experiences that push interactive entertainment. From concept to launch, we build worlds players never want to leave. |
| cta_primary | View Our Work |
| cta_secondary | Join The Team |
| nav_cta_a | Play Demo |
| nav_cta_b | Get Started |

**Ask AI to change X to Y examples (for package PDF):**

- Ask your AI to change the brand name from NEON FORGE to your studio name.  
- Ask your AI to change BUILD WORLDS. / PLAY GOD. to your two-line lockup.  
- Ask your AI to swap cyan `#00F0FF` and pink `#FF006E` to your two accent colors.  
- Ask your AI to replace the background video path with your file.  
- Ask your AI to fix mobile so the headline never clips.  

---

## Expected output

1. `NeonForgeHeroSection.tsx` — default export, `"use client"`  
2. Fixed liquid-glass navbar + full-viewport cyberpunk hero  
3. Local video path + poster, muted loop  
4. Glitch headline + staggered entrances  
5. Cyan / pink / black system only  

---

## Hard constraints

- Implement **only** this brief.  
- **Do not** read other monorepo design files for inspiration.  
- **Do not** use external CDN video URLs.  
- **Do not** make a wellness/cream or brutalist-mono theme.  
- **Do not** invent ClickMotion / MS product library chrome.  
