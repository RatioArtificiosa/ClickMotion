# MS Taxonomy — Canonical Spec

> Single source of truth: `src/config/taxonomy.ts`
> All other files re-export from there. Never duplicate arrays.

## Prompt IDs

```
MS-{TYPE}-{CODE}
TYPE: HERO | SEC | LP | SPC
CODE: 3–8 chars [A-Z0-9], e.g. AUR01, FEAT-003
```

Sections use sub-prefix: `MS-SEC-FEAT-003`, `MS-SEC-PRICE-001`, etc.

## Types

| id | label | when to use |
|---|---|---|
| `hero` | Hero | Full-viewport above-the-fold |
| `section` | Section | Modular block |
| `landing-page` | Landing Page | Complete multi-section page |
| `special` | Special | Experimental showpiece |

## Categories (10)

| id | label | subcategories |
|---|---|---|
| `saas` | SaaS | ai-product, devtools, analytics, productivity, api-platform |
| `agency` | Agency | creative, marketing, ai-agency, design-studio |
| `portfolio` | Portfolio | developer, designer, photographer, executive |
| `ecommerce` | E-Commerce | fashion, electronics, food-beverage, luxury |
| `fintech` | Fintech | banking, crypto, payments, investing |
| `health` | Health & Wellness | medical, fitness, mental-health, wellness |
| `tech` | Tech & Startup | ai-ml, cybersecurity, cloud, hardware |
| `real-estate` | Real Estate | residential, commercial, luxury-real-estate |
| `education` | Education | online-courses, university, coding-bootcamp |
| `travel` | Travel & Hospitality | hotels, tours, restaurants |

## Style Tags (17)

`dark-cinematic`, `liquid-glass`, `minimal`, `brutalist`, `neon-glow`, `gradient-mesh`, `particle-field`, `retro-futurism`, `organic`, `luxury`, `playful`, `corporate`, `editorial`, `3d-immersive`, `aurora`, `claymorphism`, `neumorphism`

Rules: 1–4 per prompt. At least one must be primary (the dominant aesthetic).

## Motion Intensity

| id | maxAnimations | guidance |
|---|---|---|
| `subtle` | 3 | Fades only; for corporate/minimal |
| `medium` | 6 | Scroll reveals, hovers |
| `aggressive` | 12 | Parallax, staggers, bold heroes |
| `extreme` | 20 | 3D, particles, video, specials |

Validator enforces maxAnimations as a soft warning (not hard fail) — use judgment.

## Technical Tags (19)

`video-background`, `scroll-trigger`, `3d-threejs`, `3d-spline`, `parallax`, `particle-canvas`, `svg-animation`, `lottie`, `webgl`, `css-only`, `intersection-observer`, `view-transitions`, `scroll-snap`, `infinite-marquee`, `magnetic-cursor`, `text-split`, `disintegration`, `exploded-view`, `break-apart`

## Asset Naming

| entity | pattern | example |
|---|---|---|
| Video | `kebab-case-v{version}.mp4` | `aurora-mesh-v1.mp4` |
| Poster | `{video-basename}.webp` | `aurora-mesh-v1.webp` |
| Thumbnail | `{id}.webp` 1200×750 | `MS-HERO-AUR01.webp` |
| Preview MP4 | `{id}.mp4` 1280×720 | `MS-HERO-AUR01.mp4` |
| Preview GIF | `{id}.gif` | `MS-HERO-AUR01.gif` |
| OG image | `og-{slug}.png` | `og-aurora-saas.png` |

All names: lowercase kebab-case, no spaces, no special chars except `-`.
