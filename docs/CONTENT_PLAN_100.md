# MS — First 100 Items Content Plan

> **How prompts are written:** see [`docs/DEEPSEEK_PROMPT_PIPELINE.md`](./DEEPSEEK_PROMPT_PIPELINE.md)  
> **How catalog ships at scale:** see [`docs/PRODUCTION_PROCESS.md`](./PRODUCTION_PROCESS.md)  
> (Deepseek + Muse protocol: concept → MS MDX normalize → build from prompt only → screen-record → CMS.)

## Mix

| Type | Count | % |
|---|---|---|
| Heroes | 40 | 40% |
| Sections | 40 | 40% |
| Mini Landing Pages | 12 | 12% |
| Specials | 8 | 8% |
| **Total** | **100** | |

## Category Distribution

| Category | Heroes | Sections | Landing Pages | Specials | Total |
|---|---|---|---|---|---|
| SaaS | 10 | 10 | 3 | 1 | 24 |
| Agency | 7 | 5 | 1 | 1 | 14 |
| Fintech | 4 | 4 | 1 | 1 | 10 |
| E-Commerce | 4 | 4 | 1 | 1 | 10 |
| Tech | 4 | 4 | 1 | 1 | 10 |
| Portfolio | 3 | 3 | 1 | 1 | 8 |
| Health | 2 | 3 | 1 | 0 | 6 |
| Education | 2 | 3 | 1 | 0 | 6 |
| Travel | 2 | 2 | 1 | 1 | 6 |
| Real Estate | 2 | 2 | 1 | 1 | 6 |
| **Total** | **40** | **40** | **12** | **8** | **100** |

## Section Breakdown (40 sections)

| Section type | Count | Notes |
|---|---|---|
| Features / Bento | 8 | Highest reuse; every landing page needs one |
| Pricing | 6 | High conversion; many variants sell the library |
| Testimonials / Social proof | 5 | Trust builder |
| CTA / Waitlist | 5 | Closing sections |
| Stats / Metrics | 4 | For SaaS/Fintech/Health |
| Footer (animated) | 4 | Often forgotten; premium footers stand out |
| Contact / Booking | 4 | For agency/portfolio/real-estate |
| FAQ (animated accordion) | 4 | SEO + conversion |

## Specials (8) — Halo Pieces

| # | Concept | Tech |
|---|---|---|
| 1 | Disintegration hero — text shatters on scroll | video + clip-path |
| 2 | Exploded view — product deconstructs in 3D | Three.js |
| 3 | Liquid glass morph — hero blobs merge on scroll | WebGL/canvas |
| 4 | Particle field takeover — particles form logo | canvas |
| 5 | Infinite marquee takeover — full-screen brand wall | CSS + GSAP |
| 6 | Magnetic cursor playground | GSAP + custom cursor |
| 7 | Spline 3D product hero | Spline |
| 8 | Aurora gradient shift — full-page color theater | CSS + Framer Motion |

## Mini Landing Pages (12)

Each is a complete page prompt that composes 3–5 sections + a hero. Provide as a single copy-paste prompt that generates the full page.

- SaaS AI Product, SaaS Analytics, Agency Creative, Agency Marketing, Fintech Banking, E-Com Fashion, Tech Cloud, Portfolio Developer, Health Wellness, Education Courses, Travel Hotels, Real Estate Luxury

## Production Order (5 batches)

| Batch | Items | Focus | Marketing angle |
|---|---|---|---|
| 1 (1–20) | 10 SaaS heroes + 10 SaaS sections | SaaS starter pack | "Ship your SaaS homepage in 5 minutes" |
| 2 (21–40) | 8 agency heroes + 8 sections + 4 specials | Agency + halo | Social buzz from specials |
| 3 (41–65) | Fintech + E-Com heroes/sections (24) | Commerce gap | "Fintech & E-Com need better motion" |
| 4 (66–85) | Portfolio + Health + Education (20) | Long-tail categories | Niche SEO |
| 5 (86–100) | 6 landing pages + 4 specials + 5 fillers | Completeness | "100 prompts — the full system" |

## Why This Mix Drives Sales

1. **System, not scraps.** Heroes + sections + landing pages = customer can build a complete site from one purchase. Reduces "is this enough?" objection.
2. **SaaS-first.** Largest buyer segment sees themselves immediately.
3. **Specials as marketing.** 8% of catalog generates 50% of social impressions.
4. **Sections prove composability.** `compatibleWith` graph lets the gallery suggest "pair this hero with these 3 sections" — increases perceived value and time on site.
