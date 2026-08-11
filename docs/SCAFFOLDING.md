# MS — Complete Scaffolding & Foundational System
> **Version:** 1.0.0 · **Date:** 2026-08-07 · **Status:** Foundational (partially superseded by practice)
> **Stack:** Next.js 15 · React 19 · Tailwind 3 · Framer Motion 11 · GSAP 3 · Supabase · Stripe
>
> **Living product law (read first):** [`PRODUCT_LAW.md`](./PRODUCT_LAW.md)  
> This document is the original 11-deliverable scaffold. Where it conflicts with Product Law
> (CMS-first catalog, screen-record previews, no v0, no em dash, MarkData home, Deepseek pipeline),
> **Product Law wins**.

---

## Table of Contents
1. [Project Overview & Positioning](#1-project-overview--positioning)
2. [Folder & Repository Structure](#2-complete-folder--repository-structure)
3. [Master Prompt Template System](#3-master-prompt-template-system)
4. [Content Taxonomy & Tagging](#4-content-taxonomy--tagging-system)
5. [First 100 Items Content Plan](#5-first-100-items-content-plan)
6. [Asset Pipeline](#6-asset-pipeline)
7. [Quality Standards & Checklist](#7-quality-standards--checklist)
8. [Gallery / Storefront Architecture](#8-gallery--storefront-architecture)
9. [Delivery & Licensing System](#9-delivery--licensing-system)
10. [Handoff Documentation](#10-handoff-documentation-for-implementation)
11. [Additional Recommendations](#11-additional-recommendations)

---

## 1. Project Overview & Positioning

### One-Paragraph Description
**MS** is a premium, curated library of highly engineered AI prompts and motion assets that generate stunning, production-ready, high-motion websites, hero sections, and landing-page sections inside AI coding tools (Cursor, Lovable, Bolt, Claude, Grok Build, v0, Replit). Every prompt is a battle-tested specification — not a loose idea — that produces consistent, shippable React/Tailwind/Framer-Motion/GSAP code on the first run. Customers copy, paste, generate, and launch.

### Key Differentiators vs motionsites.ai

| motionsites.ai (observed) | MS advantage |
|---|---|
| Single-page SPA, limited filtering | Full Next.js gallery with hierarchical taxonomy, full-text + trigram search, composable filters (type × category × style × intensity × tech) |
| Generic prompts, inconsistent motion quality | Strict master template with quantified motion specs (easing curves, stagger, scrub values, parallax speeds) — every prompt QA'd against the same checklist |
| Heroes only, weak section story | Heroes **+ modular sections + mini landing pages + specials** — customers can assemble a complete site from one library |
| No structured compatibility / composability | `compatibleWith` graph: every hero declares which sections pair well — enables "build a full site" bundle UX |
| Limited framework coverage | React + Vue + Svelte + HTML outputs, with per-tool ratings (`aiToolsRating`) |
| Opaque pricing, no lifetime narrative | Clear tier ladder (Free → Starter → Pro → Lifetime → Agency) with founding-member lifetime anchor |
| No video-asset system described | Formal asset pipeline: MP4/WebM + poster, CDN, poster-first loading, size budgets, naming conventions, versioned drops |
| No quality checklist visible | Published 40-point quality checklist; every item gated by `validate:prompts` + `validate:assets` CI |

### Positioning Statement
> **For founders, agencies, freelancers, and marketers who build with AI coding tools, MS is the premium motion prompt library that ships production-ready, high-converting pages on the first generation — because every prompt is engineered, motion-spec'd, and QA'd like production code.**

### Pricing Strategy — Recommendation

| Tier | Price | Billing | Who it's for | Key limiter |
|---|---|---|---|---|
| **Free** | $0 | — | Evaluators | 3 downloads/mo, browse only |
| **Starter** | $69 | /year | Solo builders testing AI workflows | 25/mo, React only, no video assets |
| **Pro** | $149 | /year | Freelancers & serious builders (hero tier) | Unlimited, all frameworks, video assets, MCP |
| **Lifetime Pro** | $349 | one-time | Early adopters, deal hunters | Same as Pro, forever — **anchor & urgency driver** |
| **Agency** | $399 | /year | Teams serving clients | Pro + 5 seats, white-label, 2 custom prompts/mo |

**Rationale:**
- **Lifetime is the wedge.** Price it to feel like a steal vs 2 years of Pro. Cap quantity (e.g. first 500) or time-box it to launch window to drive urgency.
- Yearly beats monthly for this category — customers think in project cycles, not months. Monthly would anchor too low and churn fast.
- Free tier exists to rank on SEO and to let the preview player sell the product (video previews are the ad).

### Launch Strategy — First 100 Items

1. **Pre-launch (2 weeks):** Tease 10 hero previews on X/Twitter + YouTube shorts (each video is a 8s loop of the generated result). Collect waitlist emails → offer Lifetime at $249 early-bird.
2. **Launch day:** Publish all 100. Bundle pricing: "100 prompts + motion assets + lifetime updates = $349". ProductHunt + Uneed + X launch thread showing before/after (prompt → generated site).
3. **Week 1–2:** Ship 1 "drop" email per 2 days grouping 4–5 related prompts ("This week: 5 dark-cinematic SaaS heroes"). Keeps momentum and teaches the taxonomy.
4. **Ongoing:** 8–12 new prompts/month. Every drop is an email, a tweet, and a changelog entry — the library compounds.

---

## 2. Complete Folder & Repository Structure

```
MS/
├── content/
│   ├── prompts/
│   │   ├── heroes/              # MS-HERO-XXX.mdx
│   │   ├── sections/            # MS-SEC-XXX.mdx
│   │   │   ├── features/
│   │   │   ├── pricing/
│   │   │   ├── testimonials/
│   │   │   ├── cta/
│   │   │   ├── footer/
│   │   │   ├── stats/
│   │   │   └── contact/
│   │   ├── landing-pages/       # MS-LP-XXX.mdx
│   │   ├── special/             # MS-SPC-XXX.mdx  (high-impact showpieces)
│   │   ├── _template.md         # Full master template (copy to start new prompt)
│   │   └── _template-short.md   # Short template for simple sections
│   └── collections/             # Curated bundles (YAML/MDX) e.g. "saas-starter-pack"
│
├── public/
│   ├── assets/
│   │   ├── videos/              # MP4/WebM backgrounds, versioned (v1/, v2/)
│   │   ├── posters/             # Poster images for each video
│   │   ├── thumbnails/          # 1200×750 WebP gallery thumbs
│   │   └── previews/            # 8–12s preview loops (MP4 + GIF fallback)
│   ├── og/                      # OG images per prompt (generated via sharp)
│   └── manifest.json            # Generated: flat index for client filtering (generate:manifest)
│
├── src/
│   ├── app/
│   │   ├── (marketing)/
│   │   │   ├── page.tsx         # Landing page
│   │   │   ├── pricing/page.tsx
│   │   │   ├── browse/
│   │   │   │   ├── page.tsx     # Gallery grid + filters
│   │   │   │   └── [slug]/page.tsx  # Prompt detail + preview player + copy
│   │   │   ├── collections/page.tsx
│   │   │   └── success/page.tsx
│   │   ├── (auth)/login/page.tsx
│   │   ├── (dashboard)/account/page.tsx
│   │   ├── api/
│   │   │   ├── checkout/route.ts
│   │   │   ├── webhooks/stripe/route.ts
│   │   │   └── mcp/             # Optional: MCP server endpoint
│   │   ├── layout.tsx
│   │   ├── sitemap.ts
│   │   └── robots.ts
│   ├── components/
│   │   ├── gallery/             # PromptCard, FilterBar, PreviewPlayer
│   │   ├── layout/              # Header, Footer
│   │   ├── motion/              # fade-in, slide-up, stagger-children, text-reveal
│   │   └── ui/                  # badge, button, card, dialog, tabs, select, tooltip, accordion, input, skeleton
│   ├── config/
│   │   ├── site.ts
│   │   ├── navigation.ts
│   │   ├── plans.ts
│   │   └── taxonomy.ts          # CANONICAL taxonomy — all others re-export from here
│   ├── lib/
│   │   ├── supabase/{client,server}.ts
│   │   ├── stripe/plans.ts
│   │   ├── validators/prompt-schema.ts  # Zod schema + body section validation
│   │   ├── prompt-loader.ts     # gray-matter + Zod + section checks
│   │   └── utils/cn.ts
│   ├── types/{prompt,database,index}.ts
│   └── styles/globals.css
│
├── scripts/
│   ├── validate-prompts.ts      # CI: validates every MDX against schema
│   ├── validate-assets.ts       # CI: checks asset existence + naming + size budgets
│   ├── generate-prompt-manifest.ts
│   ├── generate-sitemap.ts
│   └── seed.ts                  # Seeds Supabase from content/prompts
│
├── supabase/
│   └── migrations/
│       ├── 001_initial_schema.sql
│       └── 002_search_optimizations.sql
│
├── docs/
│   ├── SCAFFOLDING.md           # ← this file
│   ├── ASSET_PIPELINE.md
│   ├── TAXONOMY.md
│   ├── CONTENT_PLAN_100.md
│   ├── QUALITY_CHECKLIST.md
│   └── HANDOFF.md
│
├── legal/
│   ├── LICENSE_COMMERCIAL.md
│   ├── TERMS.md
│   └── PRIVACY.md
│
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── postcss.config.js
├── next.config.mjs
├── prettier.config.js
└── .eslintrc.json
```

**Purpose of key areas:**
- `content/prompts/` is the source of truth. Supabase is a read-optimized projection of it (seeded, not authored directly).
- `public/manifest.json` lets the gallery filter instantly without a DB round-trip; regenerate on each content change.
- `src/config/taxonomy.ts` is the single canonical taxonomy — no duplication.
- `scripts/validate-*` run in CI and block publish if they fail.

---

## 3. Master Prompt Template System

### 3.1 Full Master Template (Heroes, Landing Pages, Specials)

Every MDX file **must** contain valid frontmatter (validated by `prompt-schema.ts`) and all 8 required body sections. Copy `content/prompts/_template.md` to start.

**Frontmatter fields:**

```yaml
id: "MS-HERO-001"                 # MS-{HERO|SEC|LP|SPC}-XXX (enforced regex)
title: "Aurora SaaS — Dark Cinematic AI Platform Hero"
slug: "aurora-saas-dark-cinematic-ai-hero"  # kebab-case, unique
description: "One-sentence promise: what the user gets when they paste this prompt."
version: "1.0.0"
created: "2026-08-07"
updated: "2026-08-07"
author: "MS Team"
status: "draft"                   # draft | review | published | archived

type: "hero"                      # hero | section | landing-page | special
category: "saas"                  # must be in categoryIds
subcategory: "ai-product"
styleTags: ["dark-cinematic", "gradient-mesh"]  # 1–4, must be in styleTagIds
technicalTags: ["video-background", "parallax"]  # optional, from technicalTags
motionIntensity: "aggressive"     # subtle | medium | aggressive | extreme
difficulty: "intermediate"        # beginner | intermediate | advanced | expert
priceTier: "pro"                  # free | starter | pro | agency

aiToolsRating: { cursor: 5, lovable: 4, bolt: 4, claude: 4, grok-build: 5 }
frameworksSupported: ["react", "html"]
previewVideo: "/previews/MS-HERO-001.mp4"
previewGif: "/previews/MS-HERO-001.gif"
thumbnail: "/thumbnails/MS-HERO-001.webp"
liveDemo: "/demos/MS-HERO-001"

videoBackgrounds:
  - file: "/assets/videos/aurora-mesh-v1.mp4"
    format: "mp4"
    duration: "12s"
    loop: true
    sizeMb: 3.2
    poster: "/assets/posters/aurora-mesh-v1.webp"

dependencies:
  - { name: "framer-motion", version: "^11.0.0", required: true }
  - { name: "gsap", version: "^3.12.0", required: true }
  - { name: "tailwindcss", version: "^4.0.0", required: true }

estimatedTokens: 4200
useCases: ["saas-homepage", "ai-product-launch", "waitlist"]
compatibleWith: ["MS-SEC-FEAT-003", "MS-SEC-PRICE-001"]
positionInPage: "top"             # top | middle | bottom | full
```

**Body — 8 required sections (enforced by `validateBodySections`):**

1. **Design System** — exact colors (hex), fonts (family + size/weight/tracking/line-height), spacing (8px base), radii, shadows, aesthetic direction paragraph.
2. **Layout Structure** — ASCII or bullet layout with measurements (header height, content max-width, CTA placement, visual element positions).
3. **Motion Specification** — Framer Motion variants + GSAP ScrollTrigger snippets with exact values (duration, delay, ease, stagger, scrub, pin, start/end). See motion rules below.
4. **Video / Media Integration** — format, poster, autoplay/muted/loop/playsInline, fallback behavior, poster-first loading.
5. **Responsive Behavior** — table by breakpoint (2xl/xl/lg/md/sm) describing layout and motion changes.
6. **Accessibility** — prefers-reduced-motion, alt text, focus rings, contrast ratios, semantic HTML.
7. **Performance Notes** — JS budget, image format, video async loading, font-display, will-change hints.
8. **AI Tool Instructions + Expected Output** — per-tool guidance + numbered checklist of what the output file must contain.

A complete example lives at `content/prompts/heroes/_template.mdx`.

### 3.2 Short Template (Simple Sections)

For pricing tables, testimonial grids, stat bars, simple CTAs — where a full motion spec is overkill:

```yaml
# Same frontmatter, but:
motionIntensity: "subtle" | "medium"   # never aggressive/extreme for short template
technicalTags: ["css-only"] | ["intersection-observer"]
```

Body keeps all 8 sections but each is **condensed to 3–6 bullets** instead of prose + code blocks. Motion spec is at most one Framer Motion variant (no GSAP). Template at `content/prompts/_template-short.md`.

### 3.3 When to Use 3D (Three.js / Spline) vs Pure 2D Motion

| Use 3D when | Stay 2D when |
|---|---|
| Hero is the brand moment and 3D is the story (tech, luxury, gaming, Web3) | Section must compose with arbitrary neighbors |
| "Special" showpiece where file size is justified | Performance budget is tight (section appears mid-page) |
| Client explicitly wants a Spline/Three scene as the focal object | Motion intensity is subtle/medium |
| You can keep the 3D bundle < 150KB gzipped (Spline) or < 250KB (Three) | The animation can be achieved with CSS/Framer Motion alone |

**Rules:**
- 3D prompts must declare `technicalTags: ["3d-threejs"]` or `["3d-spline"]` and `motionIntensity: "extreme"`.
- Always provide a static poster fallback; 3D must not block first paint.
- Respect `prefers-reduced-motion`: freeze or hide the 3D canvas.
- No 3D in `section` type except `special` — keeps composability.

### 3.4 Break-Apart / Disintegration / Exploded-View Effects

These effects are **video-first, code-second**:

1. **Pre-generated video asset** is the primary technique. The prompt instructs the AI to use the supplied MP4/WebM as a masked background or overlay (e.g. `mix-blend-mode`, `mask-image`, or absolutely positioned video behind/beside the content). This guarantees consistency across AI tools.
2. **Code-based fallback** (optional second paragraph in the prompt): a Framer Motion stagger that splits text/elements with `clip-path` or `transform` — but labeled as "progressive enhancement; video is the hero".
3. Every break-apart prompt **must** include at least one `videoBackgrounds` entry tagged `technicalTags: ["disintegration" | "exploded-view" | "break-apart"]`.
4. Naming: `break-apart-{subject}-v{version}.mp4` e.g. `break-apart-particles-v1.mp4`.

---

## 4. Content Taxonomy & Tagging System

Canonical source: `src/config/taxonomy.ts`. Also documented in `docs/TAXONOMY.md`.

### Primary Types

| Type | ID | Description |
|---|---|---|
| Hero | `hero` | Full-viewport, above-the-fold |
| Section | `section` | Modular block (features, pricing, etc.) |
| Landing Page | `landing-page` | Multi-section complete page |
| Special | `special` | Experimental / showpiece |

### Categories (10) + Subcategories

See `taxonomy.ts` — SaaS, Agency, Portfolio, E-Commerce, Fintech, Health, Tech, Real Estate, Education, Travel.

### Style Tags (17)

`dark-cinematic`, `liquid-glass`, `minimal`, `brutalist`, `neon-glow`, `gradient-mesh`, `particle-field`, `retro-futurism`, `organic`, `luxury`, `playful`, `corporate`, `editorial`, `3d-immersive`, `aurora`, `claymorphism`, `neumorphism`.

### Motion Intensity

| Level | Max animations | Typical use |
|---|---|---|
| `subtle` | 3 | Corporate, minimal, enterprise |
| `medium` | 6 | Balanced sections, pricing, features |
| `aggressive` | 12 | Heroes, bold marketing |
| `extreme` | 20 | Specials, 3D, particle systems |

### Technical Tags (19)

`video-background`, `scroll-trigger`, `3d-threejs`, `3d-spline`, `parallax`, `particle-canvas`, `svg-animation`, `lottie`, `webgl`, `css-only`, `intersection-observer`, `view-transitions`, `scroll-snap`, `infinite-marquee`, `magnetic-cursor`, `text-split`, `disintegration`, `exploded-view`, `break-apart`.

### Naming Conventions

| Entity | Pattern | Example |
|---|---|---|
| Prompt ID | `MS-{HERO|SEC|LP|SPC}-{3–8 alnum}` | `MS-HERO-AUR01` |
| Slug | `kebab-case` | `aurora-saas-dark-cinematic-ai-hero` |
| Video asset | `kebab-case-v{version}.{ext}` | `aurora-mesh-v1.mp4` |
| Poster | `{video-basename}.webp` | `aurora-mesh-v1.webp` |
| Thumbnail | `{id}.webp` (1200×750) | `MS-HERO-AUR01.webp` |
| Preview | `{id}.mp4` + `{id}.gif` | `MS-HERO-AUR01.mp4` |
| Section ID | `MS-SEC-{CATEGORY}-{NNN}` | `MS-SEC-FEAT-003` |

---

## 5. First 100 Items Content Plan

Full plan in `docs/CONTENT_PLAN_100.md`. Summary:

### Mix (optimized for immediate ROI)

| Type | Count | % | Why |
|---|---|---|---|
| **Heroes** | 40 | 40% | Highest perceived value; every buyer needs a hero first. Drives the purchase decision. |
| **Sections** | 40 | 40% | Completes the site after the hero; proves the library is composable, not just pretty headers. |
| **Mini Landing Pages** | 12 | 12% | "Done for you" — highest willingness-to-pay for founders who want to ship today. |
| **Specials** | 8 | 8% | Halo pieces: disintegration, exploded-view, 3D — create social buzz and justify premium pricing. |
| **Total** | **100** | | |

### Category Distribution (heroes + sections weighted by demand)

| Category | Items | Rationale |
|---|---|---|
| SaaS | 24 | Largest TAM among AI-tool builders |
| Agency | 14 | High willingness-to-pay, visual buyers |
| Fintech | 10 | Premium budgets, trust-sensitive |
| E-Commerce | 10 | Large market, needs product storytelling |
| Tech/Startup | 10 | Overlaps SaaS but distinct aesthetic |
| Portfolio | 8 | Freelancers are core persona |
| Health | 6 | Growing niche, underserved |
| Education | 6 | EdTech founders |
| Travel | 6 | Hospitality, strong visual category |
| Real Estate | 6 | High-ticket, template-starved |

### Style Spread

At least 4 style tags per category; ensure `dark-cinematic`, `minimal`, `gradient-mesh`, and `liquid-glass` appear 15+ times each (most requested). `brutalist` and `3d-immersive` appear 4–6 times (polarizing, but high signal for the right buyer).

### Prioritized Production Order (ship in this sequence)

1. **Batch 1 (1–20):** 10 SaaS heroes + 10 SaaS sections (features, pricing, CTA) — the "SaaS starter pack" that sells the whole library.
2. **Batch 2 (21–40):** 8 agency heroes + 8 agency sections + 4 specials (first halo pieces for marketing).
3. **Batch 3 (41–65):** Fintech + E-Commerce heroes + sections (12 + 12 = 24, fills the commerce gap).
4. **Batch 4 (66–85):** Portfolio + Health + Education (mix of heroes/sections, 20 items).
5. **Batch 5 (86–100):** 6 mini landing pages (SaaS, Agency, Fintech, E-Com, Portfolio, Health) + 4 remaining specials + 5 mixed fillers.

### Why This Mix Sells

- Day-one buyer can assemble a **complete, coherent site** from one category without mixing mismatched styles.
- Heroes alone feel incomplete; sections alone feel commodity — together they feel like a **system**.
- Specials create the Instagram/TikTok moments that drive top-of-funnel.
- Landing pages justify the highest price point and reduce "but can I build a full site?" objection.

---

## 6. Asset Pipeline

Full spec in `docs/ASSET_PIPELINE.md`. Essentials:

### Video Backgrounds
- **Formats:** MP4 (H.264) primary + WebM (VP9) optional. HLS only for >15s pieces.
- **Spec:** 1920×1080, 8–14s, loopable, <5MB (hard cap 10MB, warn at 5MB). No audio track.
- **Poster:** WebP, 1920×1080, <150KB, extracted at t=0.5s.
- **Loading:** Poster renders immediately; video loads async with `preload="metadata"`, `autoplay muted loop playsInline`. IntersectionObserver defers off-screen videos.
- **CDN:** Supabase Storage or Cloudflare R2 + CDN. Cache-Control: `public, max-age=31536000, immutable` (versioned filenames).

### Preview Loops (Gallery)
- **Spec:** 1280×720, 8–12s, <2MB MP4 + <1MB GIF fallback. Autoplay muted loop, no controls.
- **Generation:** Screen-record the live demo at 60fps, trim to loop, encode with `ffmpeg -crf 28 -preset slow`.
- **Hover:** Pause on hover-out, play on hover-in to save bandwidth.

### Thumbnails
- **Spec:** 1200×750 WebP, <80KB, generated via `sharp` from poster or screenshot.

### Break-Apart / Disintegration Assets
- Pre-generated video is the source of truth; code-based stagger is progressive enhancement. See §3.4.

### Naming & Versioning
- Versioned filenames: `aurora-mesh-v1.mp4`, `aurora-mesh-v2.mp4`. Never overwrite — bump version, keep old file for existing customers.
- Manifest tracks `version` per asset; `validate:assets` enforces naming.

---

## 7. Quality Standards & Checklist

Full checklist in `docs/QUALITY_CHECKLIST.md` — 40 points across 5 axes. Every prompt must pass before `status: published`.

**Axes:**
1. **Motion Quality (10 pts)** — easing correctness, stagger discipline, scrub values, reduced-motion, no jank >16ms frames.
2. **Code Quality (10 pts)** — single-file React component, correct imports, Tailwind only, no inline styles, TypeScript-clean if applicable.
3. **Responsiveness (8 pts)** — 5 breakpoints verified, touch targets ≥44px, no horizontal scroll, images responsive.
4. **Performance (6 pts)** — JS budget, image/video budgets, font-display, will-change only where needed.
5. **Commercial Readiness (6 pts)** — copy is lorem-free, placeholders are clearly marked, license header present, compatibleWith is valid, preview assets exist.

CI gates: `validate:prompts` + `validate:assets` must pass; `typecheck` must pass; manual visual review required for `motionIntensity: extreme`.

---

## 8. Gallery / Storefront Architecture

**Stack:** Next.js 15 App Router · Tailwind · Framer Motion · Supabase (DB + Auth + Storage) · Stripe Checkout + Webhooks

### Key Pages

| Route | Purpose |
|---|---|
| `/` | Marketing landing (hero, features, social proof, pricing, FAQ) |
| `/browse` | Gallery grid + FilterBar + search + pagination |
| `/browse/[slug]` | Prompt detail: PreviewPlayer, copy button, design system, motion spec, compatibleWith |
| `/collections` | Curated bundles |
| `/pricing` | Tier comparison + checkout |
| `/success` | Post-checkout confirmation |
| `/login` | Supabase Auth |
| `/account` | Plan, downloads, favorites, collections |

### Filtering & Search

- **URL-synced filters:** `?type=&category=&style=&intensity=&q=` — shareable, back-button friendly.
- **Full-text:** Postgres `tsvector` on title/description/style_tags (`idx_prompts_fts`).
- **Fuzzy fallback:** `pg_trgm` on title.
- **Client-side fast path:** `public/manifest.json` for instant filtering without DB hit; Supabase for paginated/search queries.
- **Components:** `FilterBar` (Select dropdowns) + `ActiveFilterChips` + debounced `Input` for `q`.

### Preview Player

- Autoplay muted loop MP4 (GIF fallback). Play/pause toggle. Poster-first.
- Respects `prefers-reduced-motion`: shows poster only.
- Lazy-loaded via IntersectionObserver.

### Membership / Purchase / Unlock Flow

1. User clicks "Get Access" → `/api/checkout` creates Stripe Checkout session → redirect to Stripe.
2. `POST /api/webhooks/stripe` handles `checkout.session.completed` → maps `priceId` → `plan` → updates `profiles.plan`.
3. Entitlement check: `canAccessPrompt(userPlan, promptTier)` (hierarchy: free < starter < pro < agency; lifetime == pro forever).
4. Gated prompts show blur + upgrade CTA; entitled users see Copy button + download.

### Prompt Delivery

- **Copy:** One-click clipboard (CopyPromptButton).
- **Download:** Markdown/MDX file download (future: ZIP with assets).
- **MCP:** Pro/Agency get MCP server access to pull prompts programmatically.

---

## 9. Delivery & Licensing System

### How Customers Receive Prompts & Assets
- **Immediate:** Copy from detail page (clipboard) + download MDX.
- **Assets:** Video/poster URLs in frontmatter; entitled users get direct CDN URLs. No hotlinking — signed URLs if needed later.
- **Bulk:** Collections → "Copy all prompts in this collection" (Pro+).

### Commercial License — Key Points (see `legal/LICENSE_COMMERCIAL.md`)

- ✅ Use in unlimited personal and client projects.
- ✅ Modify freely; no attribution required.
- ✅ Ship in commercial products (SaaS, marketing sites, client deliverables).
- ❌ Do not resell, redistribute, or republish the prompts/assets as a competing library.
- ❌ Do not share account; Agency tier covers 5 seats.
- Updates and new drops are included for the duration of the subscription (lifetime = forever).

### Updates / Future Drops

- New prompts are added as `published` with `created` date; existing customers get them automatically per their tier.
- Changelog at `/changelog` + email per drop (grouped 4–6 prompts).
- Asset versioning: never overwrite; bump `v1` → `v2`, keep old file.

### Internal Process for Adding New Items

1. Copy `_template.md` → fill frontmatter + 8 sections.
2. Generate preview video + thumbnail + poster.
3. Run `npm run validate:prompts && npm run validate:assets && npm run typecheck`.
4. Open PR; CI must pass; visual review for `extreme` intensity.
5. Merge → `seed.ts` syncs to Supabase → `generate:manifest` updates `public/manifest.json` → deploy.

---

## 10. Handoff Documentation for Implementation

Full handoff in `docs/HANDOFF.md`.

**Implementation order:**
1. `package.json` → `npm install` → verify `npm run dev` boots.
2. `src/config/taxonomy.ts` + `src/lib/validators/prompt-schema.ts` + `src/lib/prompt-loader.ts` (already done — do not recreate).
3. `src/components/ui/*` + `src/components/gallery/*` + `src/components/layout/*` (already done).
4. `src/app/(marketing)/browse` gallery + `[slug]` detail page.
5. `src/app/(marketing)/pricing` + `src/app/api/checkout` + `src/app/api/webhooks/stripe` (already done — wire env vars).
6. `content/prompts/_template.md` + `_template-short.md` + first 5 real prompts (Batch 1).
7. `scripts/seed.ts` + Supabase migration apply.
8. Remaining batches 2–5.

**Critical files to create first:** Already created — do not duplicate. Next missing pieces are `browse` pages, `_template-short.md`, `seed.ts`, `sitemap.ts`/`robots.ts`, and `legal/*`.

**How to use the master template:** Copy `_template.mdx`, fill frontmatter (Zod will reject invalid values with clear messages), write 8 body sections, run `validate:prompts`.

**Risks / attention points:**
- `framer-motion` v11 has breaking `motion` import changes vs v10 — pin to `^11.11.0` and test `motion.div` usage.
- `next-mdx-remote` requires `mdxRs: true` in next.config — already set.
- Supabase RLS: `prompts` SELECT is `status = 'published'` — drafts are invisible to anon; service_role bypasses RLS for seeding.
- Stripe webhook must be registered at `https://<domain>/api/webhooks/stripe` with `checkout.session.completed` + `customer.subscription.*`.

---

## 11. Additional Recommendations

- **MCP Server (Pro+ differentiator):** Expose prompts via MCP so Cursor/Claude can pull them directly. Huge lock-in; motionsites.ai has no equivalent.
- **Prompt Customizer (Pre-prompt):** UI that lets users tweak colors/fonts/copy before copying — reduces "but my brand is different" friction.
- **Visual regression:** Playwright screenshots of each demo on CI; diff against baseline to catch motion regressions.
- **OG image generation:** `sharp` or `next/og` to generate per-prompt OG images from thumbnail + title — doubles social share quality.
- **Analytics:** PostHog for filter usage + copy events → informs which categories to produce next.
- **Git LFS:** Enable for `public/assets/videos/*` when the library grows beyond 50 videos — keeps clone times sane.
- **Sentry:** Instrument `sentry.client.config.ts` for gallery errors; prompt-loader errors are build-time, not runtime.
- **Rate limiting:** Upstash Redis for `/api/checkout` and copy endpoints to prevent abuse.

---

*End of scaffolding document. See `docs/` for deep dives on each section.*
