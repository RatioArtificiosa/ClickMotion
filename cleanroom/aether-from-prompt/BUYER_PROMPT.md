# AETHER — Serene Wellness & Meditation Hero

**You are an expert front-end engineer.** Build this design EXACTLY as specified.
Do not invent a different aesthetic. Do not apply any host website shell styles.
Produce a single production-ready React + TypeScript + Tailwind component.
Support prefers-reduced-motion. Mobile-first responsive.

This document is the **entire product**. If something is not written here, do not invent it.

---

## Product

Premium wellness / meditation app brand: **AETHER**.

**Visual promise (must read as one coherent product):**  
Calm biophilic full-viewport hero: **golden-hour ocean waves** as the only hero background, soft cream UI, sage + warm gold accents, Playfair Display headlines, centered copy, soft glass nav, buttery staggered entrance. Feels like Apple mindfulness × Aesop — **never** aviation, tech-noir, or luxury travel jet.

---

## Asset contract (NON-NEGOTIABLE)

### Background video

| Field | Value |
|-------|--------|
| Public path | `/assets/videos/aether-waves-web-v1.mp4` |
| Poster | `/assets/posters/aether-waves-v1.webp` |
| Attributes | `autoPlay muted loop playsInline preload="metadata"` |
| Object-fit | `cover`, full viewport |
| Offscreen | IntersectionObserver pause/resume |

#### REQUIRED subject (if the file does not look like this, the asset is wrong — still implement the path, but the product is incomplete until replaced)

- Camera low over **ocean / shoreline** at **golden hour**
- **Waves** rolling slowly, turquoise/warm water, soft foam
- Warm sun low on horizon OR warm atmospheric light on water
- Mood: meditative, natural, slow
- Color grade: cream/gold warmth, lifted shadows, no crushed cyberpunk blacks

#### FORBIDDEN in background video

- Aircraft, private jets, airports, cabins
- Cars, cities, neon, UI chrome, people faces, text overlays, logos
- Cold blue corporate stock that reads “fintech” or “travel jet lifestyle”

#### Implementer rule

```txt
Use ONLY the local path above. Never substitute a CDN URL.
If you cannot change binary assets, still wire that path.
Do not pick a different file from the monorepo “because it looks better.”
```

### AI video generation prompt (for regenerating the asset)

```
Cinematic 4K seamless loop, 10–14 seconds, no audio. Camera just above a calm shoreline at golden hour looking toward the horizon. Slow turquoise waves roll toward the lens with soft foam. Warm low sun, gentle haze, creamy highlights, natural reflections on water. Extremely slow contemplative motion, 24fps feel. No people, no boats, no aircraft, no text, no UI. Pure nature wellness atmosphere. Seamless loop.
```

Encode target: MP4 H.264, 1920×1080, loop, &lt;5MB preferred, silent.

---

## Tech stack

- React 19 + TypeScript, `"use client"`
- Tailwind CSS utilities
- Framer Motion (entrance + optional float)
- GSAP + ScrollTrigger only for gentle video scale parallax (skip on reduced motion / mobile)
- lucide-react for ArrowRight only
- Single file: `AetherHeroSection.tsx` default export
- No hls.js

---

## Design system

**Light theme only.**

| Token | Hex | Use |
|-------|-----|-----|
| cream | `#FDFBF7` | gradient wash over video (must not hide waves completely) |
| dark sage | `#2D3E35` | primary text |
| sage | `#7BA58F` | CTAs, badge, logo dot |
| warm gold | `#D4A373` | optional accent (thin underline or badge spark) |
| muted | `#5C6B63` | description |
| glass | `rgba(255,255,255,0.42)` + `backdrop-blur-md` | navbar |

**Typography (STRICT hierarchy — do not invert)**

- Font: **Playfair Display** 600–700 for both display lines  
- **Line 1 (the H1, largest text on the entire page):** exact string `Breathe.`  
  - Element: `<h1>`  
  - Color: dark sage `#2D3E35`  
  - Size: **exactly** `clamp(3.5rem, 7.5vw, 6.75rem)` on desktop; minimum `2.8rem` on mobile  
  - Line-height 1.05, tracking tight  
- **Line 2 (subline, MUST be smaller than H1):** exact string `Be.`  
  - Element: `<p>` or `<span>` (not another h1)  
  - Color: sage `#7BA58F`  
  - Size: **exactly 0.58 × H1** — implement as `clamp(2rem, 4.35vw, 3.9rem)` so it is always **smaller** than H1  
  - `margin-top: -0.18em` so it nests under Breathe.  
  - **NEVER** make `Be.` larger, bolder-feeling, or more dominant than `Breathe.`  
- Body / nav: **Inter** 400–500, description ~16–18px, max-width 36rem, line-height 1.6

**Radius:** `rounded-full` on buttons and badge.  
**Hero height:** `100vh`. Content max-width ~896–1024px centered.

### Video wash (critical)

Use a **light** cream wash so waves remain the star:

```txt
linear-gradient(180deg, rgba(253,251,247,0.15) 0%, rgba(253,251,247,0.35) 55%, rgba(253,251,247,0.5) 100%)
```

Do **not** cover the video with opaque cream. Viewer must read “ocean / nature,” not “solid beige.”

---

## Layout

### Navbar (fixed, h-16 / 64px, z-50, px-6 md:px-8)

- Surface: glass (`bg-white/40 backdrop-blur-md border-b border-white/30`)
- Left: **AETHER** Playfair semibold + 6px sage filled circle
- Center (≥768px): `Meditate` `Sleep` `Breathe` `Stories` `Pricing` — Inter sm, muted, hover dark sage
- Right: **Start Free Trial** — sage `#7BA58F` fill, cream text, pill

### Hero content (centered text-center)

Vertical stack, generous breathing room:

1. Badge: `✦ FIND YOUR CENTER` — 11px, uppercase, tracking `0.2em`, sage  
2. H1: `Breathe.`  
3. Sub: `Be.` — rules above (large enough to feel intentional)  
4. Description (exact):  
   `Guided meditations, sleep stories, and breathwork designed to help you find calm in a chaotic world.`  
5. Primary CTA: **Start Your Journey** + ArrowRight — sage pill, cream text, min-height 44px  
   - **Desktop:** `inline-flex`, auto width, horizontal padding ~1.75rem–2rem — **never** full-bleed edge-to-edge  
   - **Mobile:** max-width 280px, centered (not 100vw bar)

### Floating cards (desktop only, ≥768px)

Exactly **three** soft glass cards, non-interactive labels, absolute positions roughly:

| Label | Approx position |
|-------|-----------------|
| Meditate | left ~10%, upper-mid |
| Sleep | right ~12%, mid |
| Breathe | left ~12%, lower-mid |

Style: white/35 glass, blur, thin white border, soft shadow, 12px radius, padding 12×16, Inter 13px dark sage.  
Motion: gentle yoyo float `y: [0, -8, 0]` over 4s, staggered delays.  
**Hide entirely on mobile.**

---

## Motion (quantified)

```ts
staggerChildren: 0.12
delayChildren: 0.3
ease: [0.25, 0.46, 0.45, 0.94]
duration: 0.7
```

- Badge: from y:-20  
- H1: from y:40, duration 0.8  
- Be.: from y:40, delay 0.1  
- Description: from y:30  
- CTA: from y:20  

GSAP optional: video wrap scale 1 → 1.05, scrub 1.2, start top top / end bottom top. Off on mobile + reduced-motion.

Reduced motion: opacity fade only; no float; no parallax.

---

## Responsive

| Breakpoint | Behavior |
|------------|----------|
| ≥1024px | Full nav, full float cards, large type |
| ≥768px | Nav links, float cards, medium type |
| &lt;768px | Hide center nav + float cards; H1 ≥2.8rem; CTA full-width max 280px centered |

---

## Accessibility

- `header` + `section` + single `h1`  
- Video `aria-hidden`  
- Focus rings on links/buttons  
- Contrast: dark sage on cream/light video regions  

---

## Expected output (acceptance)

1. `AetherHeroSection.tsx` default export, self-contained  
2. Glass navbar + centered hero copy exact strings  
3. Local video path wired as specified  
4. **Be.** clearly large subline under **Breathe.**  
5. Three float cards on desktop  
6. Light wash — background still legible as nature/ocean when correct asset is present  
7. Framer stagger + reduced-motion path  

### Visual QA (human / browser)

Pass only if:

- [ ] Looks like a **wellness** product at first glance  
- [ ] Background is **water / nature golden hour** (not jet/plane/city)  
- [ ] No neon cyberpunk palette  
- [ ] Hierarchy Breathe. / Be. is premium and obvious  

If background is wrong subject → **fail product (asset)**, not “tweak UI opacity and ship.”

---

## Hard constraints

- Do not read other monorepo designs for inspiration.  
- Do not use external video URLs.  
- Do not replace the video path with another file.  
- Do not add extra sections (pricing, footer, testimonials).  
- Do not add MS marketing header/footer inside this component.  
