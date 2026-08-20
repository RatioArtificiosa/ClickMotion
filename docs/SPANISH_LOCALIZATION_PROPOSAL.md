# Proposal: ClickMotion Spanish Version

No existing files are to be deleted or rewritten for this proposal. This document defines the durable plan for an English-default ClickMotion site with a Spanish version at /es/.

## Executive recommendation

### Thesis

Build one shared ClickMotion application with English as the default locale and a complete Spanish route namespace at /es/, using shared code and assets but localized UI, content, metadata, SEO, and demo copy.

### Rationale

The current project contains approximately 74 demo routes, 71 cleanroom/demo implementations, 32 MDX product prompt files, shared product registries, shared gallery/product/CMS/checkout infrastructure, and existing route-aware middleware and metadata systems.

## Strict English immutability law

English is the canonical default and is protected. Spanish localization is additive. It must never overwrite, silently edit, rename, move, replace, or repurpose an existing English demo, prompt, product, route, asset, video, package, PDF, zip, metadata record, or source file.

The invariant is:

> English remains the default, canonical, and protected source experience. Spanish is a separate copy in the Spanish section.

This means:

- Existing English routes remain stable.
- Existing English demo and cleanroom files remain intact.
- Existing English MDX and prompt files remain intact.
- Existing English product records remain intact.
- Existing English videos, WebM files, MP4 files, posters, thumbnails, backgrounds, models, and client assets remain intact.
- Existing English PDFs, product folders, zips, START-HERE files, prompts, and customization documents remain intact.
- Spanish copy is added under `/es/`, locale-specific content directories, or clearly named Spanish copy modules.
- Shared code may be improved only when the English output is preserved and verified.
- A shared data record may gain Spanish fields, but English values must remain unchanged.
- A Spanish package variant must be separately named, registered, tested, and stored beside the English package.
- A Spanish rerecording must be a separate approved media asset; it must never replace the English recording.

Any genuine English bug fix discovered during Spanish work must be recorded in `SPANISH_PROPOSAL_OBSERVATIONS_AND_CHANGELOG.md`, with the affected English surfaces and before/after verification. If the fix is outside the approved task, ask the operator before changing it.

The English regression matrix is mandatory before Spanish release: English routes, demos, prompts, media, packages, metadata, authentication, checkout, downloads, and interaction behavior must be rechecked.

This protection applies to every area of the project, not only the browser frontend. Backend records, CMS fields, seed data, API contracts, auth and entitlement logic, database identifiers, content files, public assets, product folders, PDFs, zips, Lab research, raw captures, cleanrooms, demo wrappers, owner-design archives, screenshots, design notes, and deployment artifacts must all preserve English. Spanish files and records must live in an explicit Spanish section, Spanish subfolder, Spanish copy module, locale-specific field, or separately named Spanish artifact. A Spanish build or sync operation must never overwrite English data or files.

For the complete binding rules, use [English-Spanish-Law.md](./English-Spanish-Law.md). This proposal remains the strategic plan; the law defines the non-negotiable protections and evidence required during execution.

### Complete area map

| Area | English protection | Spanish location or form |
|---|---|---|
| Frontend routes | Existing English routes and page files remain unchanged | Additive /es/ route namespace or locale-aware Spanish route wrapper |
| UI components | English components and English output remain unchanged | Shared component with separate Spanish copy module, or additive Spanish component only when layout truly differs |
| Backend and CMS | English records, fields, seeds, APIs, auth, entitlements, and identifiers remain unchanged | Additive locale fields, Spanish records, or separate Spanish content records |
| MDX and prompts | Existing English MDX and prompts remain intact | content/prompts/es/ or an explicitly separated Spanish content source |
| Demos and cleanrooms | Existing English wrappers, cleanrooms, and animation mechanics remain intact | /es/demo routes with shared mechanics and copy.es modules; separate Spanish folder only when necessary |
| Lab and research | English research, raw captures, references, and source material remain protected | Lab Spanish subfolder or separately named Spanish research/rerecording area |
| Public assets | English videos, images, posters, thumbnails, models, backgrounds, and client media remain unchanged | Separate Spanish asset filenames and paths; current English videos remain usable until rerecorded |
| Packages and archives | English product folders, PDFs, zips, manuals, and source trees remain unchanged | Separately named and registered Spanish package variants |
| Design and owner archives | English design references, screenshots, captures, owner records, and notes remain protected | Separate Spanish design variants, captures, and records |
| Build and sync | English build, seed, migration, and sync output must not be mutated | Locale-aware additive output with English regression verification |
| Documentation and logs | Historical English decisions and evidence are never rewritten | Append Spanish decisions and status to the observations/changelog |

Every Spanish artifact must identify its English source counterpart, destination, relationship type, and whether runtime code is shared. No Spanish artifact may depend on an undocumented in-place mutation of English.

The main problem is not creating a second website. The main problem is that much of the current copy is hard-coded inside components and route files. If Spanish is added by duplicating pages manually, the two versions will drift.

The correct investment is a localization foundation that separates:

Shared system:

- Components
- Animation logic
- Product IDs
- Assets
- Pricing
- Authentication
- Checkout
- Technical source code
- Demo mechanics

Localized layer:

- Navigation labels
- Marketing copy
- Product titles
- Product descriptions
- Demo text
- Metadata
- SEO content
- Accessibility labels
- Empty and error states

[TRADE-OFF] This requires more engineering before translation starts, but it prevents the Spanish version from becoming a manually maintained fork.

[CONFIDENCE: 90%] A shared-code architecture will reduce long-term maintenance compared with duplicating the complete application. This follows from the current number of routes and demos, but the exact reduction should be measured after the first translated product is implemented.

## Scope decision

### Included in the first Spanish release

- Homepage
- Header and navigation
- “Unlimited Power” button area
- Browse catalog
- Search and filters
- Product cards
- Product pages
- Collections
- Animated backgrounds page
- Pricing
- Login and relevant account states
- Checkout-facing copy
- Success and error states
- Spanish metadata and social previews
- Spanish demo route chrome
- Spanish-visible copy inside demos where practical
- Spanish product titles and descriptions
- Spanish category and style labels
- Spanish accessibility labels
- Spanish sitemap and alternate-language metadata
- Spanish legal and commercial language where required
- Existing demo videos unchanged

### Explicitly excluded from the first release

- Existing demo videos
- Existing video filenames
- Existing preview media paths
- Existing client HD media
- Existing WebM/MP4 role assignments
- Existing animation timing
- Existing Three.js models
- Existing scroll mechanics
- Existing product IDs
- Existing English URLs
- Existing downloadable source code unless specifically translated later

The videos remain English until the operator rerecords them. The Spanish site may initially contain Spanish surrounding copy with English-language video content. This is an intentional transition state, not a failed translation.

[ASSUMPTION] The first Spanish social campaign can use existing English videos while Spanish titles, descriptions, captions, landing pages, and calls to action are prepared.

[VALIDATION NEEDED] Before publishing the Spanish campaign, review whether the videos contain enough visible English text to confuse or reduce comprehension for Spanish-speaking viewers.

## Language-switcher behavior

The switcher must remain visually minimal and sit beside the existing Unlimited Power control:

    [ Unlimited Power ] [ ES ]

On Spanish pages:

    [ Poder ilimitado ] [ EN ]

It must preserve the current equivalent page, product slug, demo slug, search filters, and safe query parameters. It must never send users to the Spanish homepage when an equivalent route exists, must be keyboard accessible, must have a screen-reader label, and must work on desktop and mobile.

Required route relationships:

- / ↔ /es/
- /browse ↔ /es/browse
- /browse?style=luxury ↔ /es/browse?style=luxury
- /browse/elyse ↔ /es/browse/elyse
- /demo/cleanroom-elyse ↔ /es/demo/cleanroom-elyse
- /pricing ↔ /es/pricing

If an equivalent Spanish page does not exist, the switcher must link to the nearest valid Spanish parent or be hidden until the route exists. It must never create a broken /es/ URL.

## Recommended localization architecture

English remains the default without an /en/ prefix. Spanish is explicit under /es/. Do not introduce /en/ unless a future requirement justifies the redirects and URL changes.

Use a typed locale model:

    type Locale = "en" | "es";

Use typed dictionaries, for example:

    src/i18n/
      config.ts
      locales.ts
      get-locale.ts
      dictionaries/
        en.ts
        es.ts

Dictionary groups should include navigation, hero, gallery, filters, productPage, pricing, auth, checkout, footer, accessibility, errors, emptyStates, social, and legal.

The Spanish dictionary must be typed against the English dictionary so missing Spanish keys are detectable before publication.

Product content should use locale-aware fields rather than scattered JSX conditionals:

    type LocalizedText = {
      en: string;
      es: string;
    };

Product IDs, slugs, pricing, media, and technical tags remain shared.

For long-form MDX, use locale-specific content where appropriate, preserving the same product ID, technical tags, motion behavior, media roles, package references, client video references, status, and technical contract. Locale-specific MDX is more verbose but easier for translation and review.

## Translation boundary

Translate:

- Navigation
- Buttons
- Product titles and descriptions
- Category, style, and motion-intensity labels
- Filter labels and search placeholders
- Empty, error, loading, and authentication states
- Checkout-facing interface copy
- Demo headings, labels, captions, and visible UI
- Page metadata and Open Graph content
- Accessibility labels
- Legal notices
- Social landing copy
- Product customization explanations
- What-the-buyer-receives sections
- Package explanatory text

Initially keep shared or English:

- Product IDs, slugs, filenames, asset names, imports, API paths
- Stripe and Supabase identifiers
- Existing video and client-HD media
- CSS and TypeScript identifiers
- Third-party library names
- Internal technical tags

Recommended Release 1 package policy:

- Translate product-page copy, package summaries, START-HERE.md, CUSTOMIZATION.md, and buyer-facing PDF prose where practical.
- Keep source code and technical identifiers shared.
- Keep the core AI build prompt in English initially if testing proves it produces more reliable code generation.
- Disclose package language accurately.

[ASSUMPTION] English technical prompts may currently produce more reliable output from general-purpose coding AI tools. Validate equivalent English and Spanish prompts against the target AI tools and compare cleanroom output.

[COMPLIANCE RISK] A Spanish product page must not imply that a downloadable package is fully Spanish when its source or prompt remains English.

## Demo strategy

Animation systems remain shared:

- Scroll mechanics
- Pin-until-complete behavior
- PSAVE behavior where applicable
- Three.js scenes
- Video playback
- Canvas effects
- Responsive layout rules
- Motion timing

Localized content includes:

- Headlines
- Labels
- Navigation text
- Button text
- Supporting copy
- Form labels
- Metadata
- Accessibility text

Each substantial demo should have locale-aware copy modules rather than a duplicated animation implementation. Spanish text must be reviewed at desktop, tablet, and mobile widths, during the actual motion sequence, and under prefers-reduced-motion.

Priority:

Tier 1 social flagships: Elyse, Revel, Vertex, Still, Prism, Meridian, Helix, Studio, Lineup, Mirage, Axiom, Orbit, Verve, Zero Energy, and Roadster.

Tier 2: high-traffic or high-value product demos.

Tier 3: remaining long-tail experiments after the architecture is proven.

[ASSUMPTION] Not every demo has equal marketing value. Validate prioritization using page views, product clicks, demo completion, and social performance.

## Video policy

Existing videos remain unchanged unless the operator separately authorizes a future rerecording or media replacement task.

- Do not rename, delete, overwrite, move, or re-encode existing videos during localization.
- Do not replace an existing WebM page preview with MP4 merely because /es/ is being added.
- Keep client HD, storefront preview, thumbnail, poster, background, fullscreen, and operator-screenshot roles separate.
- A Spanish page may use an existing English video, but must not claim that the video itself is Spanish.
- Do not add storefront previews or thumbnails to client product folders or zips.
- A future Spanish rerecording requires a separate media-role plan and ASSET_PIPELINE.md validation.

This follows ASSET_PIPELINE.md, PRODUCT_LAW.md, PRODUCT_PACKAGE.md §10, and the production checklist Phase 2 media-role requirements.

## SEO architecture

Each Spanish page needs its own Spanish title, meta description, Open Graph content, canonical URL, document language, sitemap entry, and structured data where used. Add hreflang en, hreflang es, and x-default where appropriate.

Example:

- English: https://www.clickmotion.dev/browse/MS-HERO-ELYS01
- Spanish: https://www.clickmotion.dev/es/browse/MS-HERO-ELYS01

Keep stable product slugs. Stable slugs with localized page content are the safer operational choice, subject to validation through indexing and analytics.

Relevant references include src/app/sitemap.ts, src/app/layout.tsx, src/config/site.ts, and docs/AEO_LLM_GROWTH.md.

## Behavioral and marketing rationale

The Spanish visitor should be able to recognize ClickMotion, understand the offer, browse examples, understand product value, view demos, understand what is included, decide whether to sign up or purchase, share the Spanish page socially, and return to the same product.

Use neutral Latin American Spanish with Mexican compatibility. Keep the voice premium, specific, calm, direct, and technically clear. Avoid exaggerated hype, slang that reduces reach, and literal translations that sound unnatural.

The Spanish chip should be small because its job is discoverability, not visual dominance.

[VALIDATION NEEDED] Native Spanish editorial review is required before public launch. Machine translation alone is not a final quality gate.

## Primary failure mode

The most likely failure is a partially translated site where the header and buttons are Spanish but product pages, demo text, metadata, errors, and downloadable-package expectations remain English.

Mitigation:

- Do not launch the Spanish route until a complete vertical slice exists.
- Translate one full product from homepage through demo and product page first.
- Use that product as the reference standard.
- Add automated missing-key detection.
- Add mixed-language QA.
- Require native editorial review.

## Secondary risks

- Spanish text can break layouts. Test mobile first, avoid fixed-width text containers, define character budgets, and review text during motion.
- English videos can weaken Spanish comprehension. Keep them unchanged, label the page accurately, and prioritize Spanish rerecording later.
- Incorrect canonicalization can create SEO duplication. Test canonical, hreflang, and sitemap behavior.
- Package language can be misunderstood. Disclose exactly which artifacts are translated.
- Translation can drift. Use typed dictionaries, a translation inventory, review ownership, and translation version/date.
- SEO traffic can grow without commercial value. Measure meaningful product actions rather than impressions alone.

## Counterargument

A thoughtful skeptic might say Spanish users may already understand English, making full localization unnecessary. That is possible. The proper validation is to compare English and Spanish landing pages using product-page clicks, demo starts, demo completion, sign-ups, checkout starts, purchases, and bounce rate.

## Alternatives considered

Duplicating the whole website is not recommended because it creates two codebases, two animation implementations, greater route drift, and higher QA cost.

Translating only the homepage is insufficient because visitors would still encounter English product pages and demos.

Automatic browser translation is not recommended because it provides poor control over tone, terminology, metadata, demo text, social previews, and accessibility.

Shared code with /es/ localized content is recommended because it preserves English URLs, shares animations and assets, centralizes translations, improves SEO separation, and reduces maintenance.

## Recommended launch sequence

### Launch 1: localization foundation

- Locale routing
- Language switcher
- Translation dictionaries
- Spanish homepage
- Spanish browse page
- Spanish metadata
- One fully translated flagship product
- One fully translated flagship demo
- Existing videos unchanged

### Launch 2: high-value catalog

- Translate the top social products.
- Translate the strongest product pages.
- Translate the most important demos.
- Add Spanish collections.
- Add Spanish pricing and conversion flows.

### Launch 3: full catalog

- Translate remaining product pages.
- Translate remaining demos.
- Complete accessibility review.
- Complete SEO coverage.
- Review package documentation.
- Publish only after the quality gate passes.

### Future media phase

- Rerecord flagship videos in Spanish.
- Preserve the current English media role.
- Add Spanish media as separate assets.
- Repeat asset-pipeline validation.
- Recheck storefront versus client media.
- Re-run relevant production and Platinum checks.

## Estimated resources

These are planning estimates, not guarantees:

| Workstream | Estimated effort | Confidence |
|---|---:|---:|
| Localization architecture | 4–8 engineering days | 80% |
| UI and global chrome | 3–5 days | 85% |
| Homepage and browse | 3–6 days | 80% |
| Product catalog translation | 1–3 weeks | 70% |
| Demo copy extraction/localization | 2–4 weeks | 65% |
| SEO and metadata | 2–4 days | 85% |
| QA and responsive review | 1–2 weeks | 75% |
| Native editorial review | 1–3 weeks part-time | 70% |
| Future video rerecording | Separate project | Not estimated yet |

A reasonable first complete Spanish storefront estimate is approximately 5–9 weeks for one engineer working with a professional Spanish editor.

[ASSUMPTION] This assumes shared animation systems and no video rerecording during this phase.

[VALIDATION NEEDED] Refine the estimate after one complete flagship vertical slice.

## Required references

- SHIP_FOR_SALE.md
- PRODUCTION_READY_CHECKLIST.md
- PRODUCT_PACKAGE.md
- ASSET_PIPELINE.md
- PRODUCT_LAW.md
- QUALITY_CHECKLIST.md
- HANDOFF.md
- BRAND.md
- PLATINUM_SECOND_REVISION.md
