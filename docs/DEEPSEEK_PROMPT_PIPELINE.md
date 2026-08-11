# Deepseek Prompt Pipeline (MS)

Durable capture of the Muse Spark / Deepseek working session that produced the first 10 hero products.  
**Chat is not memory.** Re-run Deepseek with this guide — do not reinvent the protocol.

Related:

- Product model: sell **prompt + metadata**; prove by **building from the prompt only**; market with a **screen recording** of that build.
- Templates: `content/prompts/_template.md`, `content/prompts/heroes/_template.mdx`
- Quality bar: `docs/QUALITY_CHECKLIST.md`
- Catalog mix: `docs/CONTENT_PLAN_100.md`
- Assets: `docs/ASSET_PIPELINE.md`
- Taxonomy: `docs/TAXONOMY.md`

---

## 1. What MS sells vs what Deepseek produces

| Layer | Owner | Output |
|-------|--------|--------|
| **Product prompt** | Deepseek (guided) | Ultra-detailed “copy prompt” a buyer pastes into Cursor / Claude / Grok Build / Lovable / Bolt |
| **Video gen prompt** | Deepseek (paired) | Separate prompt for Runway / Kling / Pika / etc. to generate the **background loop** used *inside* the design while building |
| **Built site / section** | Human (you) | Built **only** from the product prompt — proof it works |
| **Preview on MS site** | Human (you) | Screen recording of that build → CMS `previewVideo` / thumbnail / poster |
| **Catalog metadata** | Human + CMS | Genre, status, tools line, price tier, sort order |

Deepseek does **not** ship interactive sandboxes. Deepseek ships **reproducible engineering prompts** + **matched B-roll generation prompts**.

---

## 2. Session method that worked (two phases)

### Phase A — Motionsites study → raw heroes

**User ask (essence):**

> Study motionsites.ai. Give 10 hero pages like theirs. Name, description, exact copy-prompt (ultra detailed), then ultra detailed **video generation** prompt for each background. Tie them perfectly. Premium competitor quality.

**What Deepseek did:**

1. Studied Motionsites public repo prompts (structure: design system tokens, liquid-glass classes, navbar + hero, Framer Motion, video bg).
2. Invented **10 original brands** (not clones of Motionsites names as products to steal — original concepts).
3. For each: **Category · Description · Full product prompt · AI Video Generation Prompt**.

**Raw batch (first 10):**

| # | Brand | Category vibe |
|---|--------|----------------|
| 1 | NEON FORGE | Gaming / creative agency — cyberpunk |
| 2 | AETHER | Health / wellness — serene biophilic |
| 3 | VERTEX | Cybersecurity — brutalist mono |
| 4 | LUMINA | Film production — warm cinematic |
| 5 | TERRA NOVA | Clean energy — organic optimistic |
| 6 | APEX QUANTUM | Deep tech SaaS — aurora / 3D feel |
| 7 | VERVE | Social / Gen-Z — playful gradient |
| 8 | ORBIT | Fintech — trustworthy premium |
| 9 | NOMAD | Travel — editorial aspirational |
| 10 | NEXUS AI | Enterprise AI — intelligent future |

### Phase B — Normalize to MS MDX (“MS Enterprise Prompt Architect”)

**User ask (essence):**

> You are MS Enterprise Prompt Architect. Normalize the 10 raw heroes into MS-compliant MDX that pass Zod, taxonomy, body sections, asset rules.

This is the **production gate**. Raw Motionsites-style prose is **not** shippable until normalized.

**IDs assigned:**

| Brand | ID |
|-------|-----|
| NEON FORGE | `MS-HERO-NEON01` |
| AETHER | `MS-HERO-AETH01` |
| VERTEX | `MS-HERO-VERT01` |
| LUMINA | `MS-HERO-LUMI01` |
| TERRA NOVA | `MS-HERO-TERR01` |
| APEX QUANTUM | `MS-HERO-APEX01` |
| VERVE | `MS-HERO-VERV01` |
| ORBIT | `MS-HERO-ORBI01` |
| NOMAD | `MS-HERO-NOMA01` |
| NEXUS AI | `MS-HERO-NEXU01` |

Files live under `content/prompts/heroes/` and are also seeded into CMS.

---

## 3. Hard constraints (violation = reject)

Copy these into every Deepseek system / architect message.

### 3.1 Product identity

- MS = premium Motionsites alternative: curated AI prompts + motion assets → production-ready high-motion UI in coding AIs.
- Moat = consistency, taxonomy, motion specs, **owned assets** delivered on **our** CDN (buyers download from MS CDN; we do not burn origin bandwidth).
- Ban is only **uncontrolled third-party** media (Motionsites CloudFront user buckets, random Mux/Unsplash as the permanent product source). MS CDN URLs are correct and expected in production.

### 3.2 Frontmatter / taxonomy

- IDs: `^MS-(HERO|SEC|LP|SPC)-[A-Z0-9]{3,8}$`
- Categories / subcategories / styleTags / technicalTags: **only** values in `docs/TAXONOMY.md` — never invent.
- Heroes are **never** `priceTier: free` (use `pro` or `agency`).
- `positionInPage` for heroes: `top`.
- Motion intensity budgets: subtle ≤3 · medium ≤6 · aggressive ≤12 · extreme ≤20 animations.

### 3.3 Body — 10 required H2s (exact names, this order)

1. `## Design System`
2. `## Layout Structure`
3. `## Content Slots`
4. `## Motion Specification`
5. `## Video / Media Integration`
6. `## Responsive Behavior`
7. `## Accessibility`
8. `## Performance Notes`
9. `## AI Tool Instructions`
10. `## Expected Output`

### 3.4 Stack rules (buyer-facing prompt)

- Stack: **Next.js 15 + React 19 + Tailwind + Framer Motion 11 + GSAP 3** (as applicable).
- Output: **single** React component (e.g. `HeroSection.tsx`) unless type is full landing page.
- Tailwind only (no CSS modules as primary).
- **Do not** require Vite, hls.js (MP4 loops), or shadcn as a hard dependency in the sold prompt.
- Motion must be **quantified**: durations, easings, stagger, scrub numbers — not “animate nicely.”
- 3D (`threejs` / Spline): only when intensity is extreme / special and tagged correctly — or remove Three and use canvas/particles.

### 3.5 Assets (critical)

- **Own the file; deliver via CDN.** Production serves and sells downloads from MS CDN (R2 / Supabase Storage / our CloudFront), not from the Next app origin. That is intentional cost control.
- **Never** ship permanent deps on **other people’s** buckets (e.g. Motionsites `d8j0ntlcm91z4.cloudfront.net/user_…`, random Mux streams, Unsplash as required runtime media) in sold prompts.
- Authoring paths (canonical in MDX / CMS): `/assets/videos/{kebab}-v1.mp4`, `/assets/posters/{kebab}-v1.webp`, `/previews/{ID}.mp4`. Production rewrites or prefixes these with the MS CDN base URL.
- If emitting absolute media URLs, they must be **MS CDN** only (document base in deploy env), never competitor export URLs.
- Spec: MP4 H.264, 1920×1080, **8–14s** seamless loop, **&lt;5MB** target, **no audio**, poster WebP &lt;150KB.
- Keep the **AI Video Generation Prompt** inside `## Video / Media Integration` (blockquote) so video can be regenerated.
- Loading: poster first; `preload="metadata"`; `autoplay muted loop playsInline`; pause offscreen when possible.
- Buyer entitlement: after purchase, download links point at **MS CDN** (optionally signed), not at a zip that forces us to egress every byte from the app host.

### 3.6 Liquid glass / shell

- Liquid glass may appear **inside a product prompt** if that *product’s brand* uses it.
- **Never** instruct the buyer to apply MS shell / Triada / marketing chrome to the design unless the prompt’s subject *is* that brand system.
- MS site chrome (header, home intro, admin) is **not** part of the sold design.

### 3.7 Visual quality (anti AI-slop) — reject by default

Humans recognize AI-default websites and **lose trust**. Every SKU must feel like **famous-quality human UI**, not a generic generator template.

**Apple is not required.** Name a **reference direction** per product (craft only — never clone trademarks or copy protected layouts pixel-for-pixel): e.g. Apple marketing restraint, Linear/Notion product clarity, Stripe trust typography, Figma/Framer creative-tool precision, editorial/fashion type+photo, Swiss grid, industrial/brutal sparse mono, playful-but-disciplined consumer. Rotate references across the catalog so MS is not one skin.

**Hard prefer:** structured navigation, clear hierarchy, intentional radii, real type scale, materials with a point of view, layout geometry that matches the reference direction.

**Hard reject as the default for a batch (or auto-reject if it is the whole design):**

- **Pill / capsule navigation** as the primary nav pattern (`rounded-full` floating pill of links)
- **Everything-is-a-pill** CTAs + chips + badges with no typographic structure
- **Gradient mesh / aurora blobs / rainbow washes** as the main background identity (see background tiers in `UI_ANIMATION_RESOURCES.md` §10 — pick one system: real CDN video, quantified shader, R3F one-idea, particles, or hybrid; never stack kit aurora + particles + video)
- “Liquid glass pill nav + Instrument Serif + pure black” with only the video changed
- Any result that fails the **authority test**: “a human would say an AI made this”

Liquid glass / gradient-mesh / aurora only when **explicitly** requested for one special and justified. They are not the house style.

### 3.7 Sections that must be concrete (upgrade checklist from session)

Before publish, Deepseek output must not say “same as others”:

| Section | Required concreteness |
|---------|------------------------|
| Design System | Hex/HSL tokens, font families, sizes/weights/tracking, 8px grid, max-width, radii, shadows, one aesthetic sentence |
| Layout Structure | Pixel measurements (e.g. navbar 64px, hero 100vh, content split, CTA gap) |
| Motion Specification | Real Framer variants + GSAP ScrollTrigger numbers; particle counts if any |
| Responsive | **5** breakpoints with distinct layout *and* motion changes |
| Performance | JS budget, `font-display: swap`, `will-change` policy |
| Expected Output | Numbered, testable contract (7+ points) |
| AI Tool Instructions | Separate guidance for Cursor/Claude vs Lovable/Bolt vs Grok Build (v0 optional; MS often omits v0) |

Default motion numbers used in the batch (adjust per product, don’t leave blank):

```txt
duration: 0.7
ease: [0.25, 0.46, 0.45, 0.94]
staggerChildren: 0.12
delayChildren: 0.3
scrollTrigger: { start: "top top", end: "bottom top", scrub: 1.2 }
parallax scale example: 1.08
```

---

## 4. Dual-prompt contract (must stay paired)

Every hero (and later section/LP) needs **two** prompts that **tie together**:

### A) Product / copy prompt (sold)

Must specify:

- Brand name + one-line product job  
- Exact palette (tokens + hex)  
- Fonts (display + body)  
- Navbar + hero structure  
- Copy (badge, H1, sub, body, CTAs)  
- Motion behavior with numbers  
- Video path + poster behavior  
- Responsive + a11y + performance  
- Tool-specific build notes  
- Expected output checklist  

Buyer pastes **A** into a coding AI and gets the site/section.

### B) AI video generation prompt (internal / asset pipeline)

Must specify:

- Duration, loop, resolution intent (4K source → encode to 1080p loop)  
- Subject, camera move, lighting, color grade  
- Aesthetic references (mood, not “copy X brand IP”)  
- **No people / no text / no UI** (unless the product is portrait-driven — default is pure atmosphere)  
- Seamless loop note  
- Color language that **matches** Design System primaries  

You (or video AI) produce B → encode **client HD** → `/assets/videos/...` (**lock that path**) → use while building A → then **screen-record the built result** into a **separate** storefront file for MS `previewVideo`.

**Important distinction (media vault):**

| Asset | Purpose | After lock |
|-------|---------|------------|
| **Client HD** B-roll (legacy e.g. `sequence-01.mp4`; **new** files under `videos/client/` with naming protocol) | Background **inside** the design + buyer pack + prompt `videoBackgrounds` | **Immutable after prep** — copy-out only; see [`ASSET_PIPELINE.md`](./ASSET_PIPELINE.md) |
| **Storefront** capture (`*-preview-v1.mp4` / CMS `previewVideo`) | What **browsers see** on MS — proof of full UI, not only B-roll | Recapture OK under preview names only |

Full vault: [`ASSET_PIPELINE.md`](./ASSET_PIPELINE.md) · [`PRODUCT_LAW.md`](./PRODUCT_LAW.md).  
Never burn MS Scroll/UI into client HD. Live demos may overlay Scroll in **HTML**.

---

## 5. End-to-end production loop (human)

```txt
1. Brief Deepseek (Phase A concept OR Phase B normalize)
2. Review: taxonomy, stack bans, asset paths, quantified motion
3. Generate / encode client HD from Video Gen Prompt → lock path
4. BUILD THE SITE FROM THE PRODUCT PROMPT ONLY (uses client HD)
   - No secret design knowledge outside the prompt
   - If build fails → prompt is incomplete → revise prompt
5. Screen-record the build → write storefront *-preview*.mp4 only (not client HD)
6. CMS: title, body, genre, tools, previewVideo (storefront), thumbnail, poster
7. Publish → public gallery + product page show the storefront recording
```

This is how Motionsites-style products stay honest: **prompt is the product; recording is the proof.**

---

## 6. How to re-brief Deepseek (copy-paste starter)

### System / role (short)

```txt
You are MS Enterprise Prompt Architect for a Motionsites.ai competitor.
You write ultra-detailed, production-ready AI coding prompts that generate
single React + Tailwind + Framer Motion (+ GSAP when needed) hero/section/LP
components. You also write paired AI video generation prompts for background loops.
You never invent taxonomy values. You never depend on uncontrolled third-party video URLs
(Motionsites CloudFront, random Mux/Unsplash). Media paths are MS-owned (/assets/… or MS CDN).
You always quantify motion. You always include all 10 required H2 body sections
when outputting MDX. Liquid glass is a product design option, not the MS shell.
You design REAL product UI inspired by famously great human-made sites (reference
direction named per SKU — Apple is optional, not mandatory). No default pill
navigation, no capsule-everything chrome, no gradient-mesh / aurora as default.
If it looks AI-generated, it fails. Vary layout, type, materials, and reference.
```

### Task template (new hero)

```txt
Create ONE new hero product for MS:

Brand / concept: {NAME}
Category/subcategory: {from taxonomy}
Style tags: {from taxonomy}
Technical tags: {from taxonomy}
Motion intensity: {subtle|medium|aggressive|extreme}
Differentiator vs existing heroes: {what must not look like Neon/Aether/Vertex/...}
UI reference direction: {e.g. Stripe trust / Linear product / editorial fashion / Swiss grid / industrial — NOT "generic AI SaaS"}
Nav pattern: structured (not floating pill rail unless special)

Output:
1) Marketing description (1–2 sentences)
2) Full buyer copy-prompt (ultra detailed, stack rules above)
3) AI video generation prompt (tied to palette and mood)
4) MS MDX with valid frontmatter + 10 body sections
5) Asset paths under /assets/videos and /assets/posters

Hard reject if: free tier, non-MS third-party media URL, missing H2, vague motion, invented tags,
pill-nav + gradient AI-kit as the whole design, or same chrome as prior heroes with only video changed.
(MS CDN / /assets paths are correct — do not reject those.)
```

### Task template (batch normalize)

```txt
Normalize the following raw Motionsites-style heroes into MS MDX files.
Use ID mapping provided. Taxonomy mapping provided. No commentary outside files.
[paste Phase A raw heroes + ID map + taxonomy map]
```

---

## 7. Taxonomy mapping used for the first 10 (do not drift)

| Hero | category / subcategory | styleTags | technicalTags | intensity |
|------|------------------------|-----------|---------------|-----------|
| NEON FORGE | agency / creative | neon-glow, dark-cinematic | video-background, parallax | aggressive |
| AETHER | health / wellness | organic, minimal | video-background | medium |
| VERTEX | tech / cybersecurity | minimal, brutalist | video-background, scroll-trigger | aggressive |
| LUMINA | agency / creative | dark-cinematic, luxury | video-background | aggressive |
| TERRA NOVA | tech / cloud | organic, gradient-mesh | video-background, parallax | medium |
| APEX QUANTUM | saas / ai-product | aurora, 3d-immersive | video-background, webgl | extreme |
| VERVE | saas / productivity | playful, gradient-mesh | infinite-marquee, parallax | aggressive |
| ORBIT | fintech / banking | corporate, luxury | video-background | medium |
| NOMAD | travel / hotels | editorial, organic | video-background, parallax | medium |
| NEXUS AI | saas / ai-product | aurora, liquid-glass | video-background, particle-canvas | aggressive |

---

## 8. Lessons from the session (foot-guns)

1. **Competitor CDN URLs** in raw Motionsites clones are not MS assets — ban them in Phase B. Replace with `/assets/…` (MS CDN in production). We still **use CDN** for delivery and buyer downloads; we just own the objects.  
2. **Video files don’t exist until generated** — paths are contracts; generation prompts are the real source.  
3. **“Same as others” motion** fails quality review — every hero needs its own quantified motion.  
4. **Three.js mismatch** (tag says 3D, body doesn’t / opposite) fails publish — keep tags and body aligned.  
5. **Build-from-prompt is the test** — if you need extra verbal instructions to finish the build, the sold prompt is incomplete.  
6. **MS preview ≠ background B-roll** — customers need a recording of the *UI*, not only waves/city loops.  
7. **v0** was in early Motionsites-style tool lists; MS product line prioritizes Cursor, Claude, Grok Build, Lovable, Bolt (no v0 requirement).

---

## 9. Next products (same pipeline)

For sections / LPs / specials:

1. Phase A concept (name, description, product prompt, video/gen or motion-only notes).  
2. Phase B normalize to `MS-SEC-*` / `MS-LP-*` / `MS-SPC-*` + taxonomy.  
3. Build from prompt only → record → CMS.  

Do not skip Phase B. Do not publish raw Phase A dumps to the public site.

---

## 10. Visual QA after a build

After any clean-room or human build from a prompt:

1. Capture the page (Chrome DevTools MCP / browser-harness / `node scripts/cleanroom-screenshot.mjs <url> <out.png>`).
2. Score against [`PROMPT_VISUAL_QA_LOOP.md`](./PROMPT_VISUAL_QA_LOOP.md).
3. **Edit the buyer prompt** (and replace video if subject is wrong).
4. Rebuild clean-room from the updated prompt only.
5. Only then screen-record for CMS.

Do not treat “pretty React” as done if the **prompt** still could not force that result.

## 11. Source

Decoded from the full Muse Spark / Deepseek conversation dump (Motionsites study → 10 heroes → MS Architect normalization → asset/CDN clarifications → section upgrade checklist).  
Original transcript path (session): agent `prompts/prompt_72.txt` (not a product dependency).

**Status:** Documented 2026-08-08. Update this file when the protocol changes.
