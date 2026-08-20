# Agent instructions (ClickMotion / MS)

## Taking any product to production or sale

**You must not improvise ship readiness.**

1. Open **`docs/SHIP_FOR_SALE.md`** first.  
2. Work **`docs/PRODUCTION_READY_CHECKLIST.md`** phase by phase (fill the SKU header).  
3. Follow **`docs/PRODUCT_PACKAGE.md` §10**: every rebuild product has a **product folder** and a **zip of that folder**.  
4. Follow **`docs/ASSET_PIPELINE.md`** for media roles (client ≠ storefront ≠ backgrounds).  
   - **Operator screenshot WebM (§1A):** when the operator gives a Premiere/screenshot **WebM**, wire it as `previewVideo` for **home + browse + product page** and **keep WebM** (do not re-encode that role to mp4). Fullscreen may stay **mp4**. Scope = operator-screenshot products only, not every agent capture.  
5. Match gold standards: **Meridian** PDF · **Studio Sequence** product folder/zip · **Helix** description bar.  
6. **Scroll narrative pin law (mandatory — 100%):** any hero, section, LP, or special with **scroll-as-narrative**, **scroll-scrub / scroll-pivot**, or a **hybrid with a scroll-narrative leg** must use **pin-until-complete** — fixed/pinned stage, **no traditional long-page scrollbar** as the product UX, wheel/trackpad/touch drive **virtual progress**, client embed **pins until the animation finishes then releases**. Animation art can stay the same; method must not be tall multi-vh sticky track. Canonical: **`docs/PRODUCT_LAW.md`** → **Scroll narrative pin law**. Checklist boxes: `0.5a`, `1A.3a`, `1B.4a`, `3.4a`, `8D.4a`.  
7. **Platinum Second Revision (critical — every new product post):**  
   - Complete the **first production pass** (checklist through Phase 12).  
   - **Tell the operator** you are finished with that pass.  
   - **Ask permission** (required wording intent):

     > May I run the Platinum Second Revision to make sure that all is perfectly ultra premium?

   - Only after yes → run **`docs/PLATINUM_SECOND_REVISION.md`** / checklist **Phase 13** (full gap audit, fix, re-smoke).  
   - Do **not** auto-skip this. Do **not** claim ultra-premium complete on first pass alone.

### Product delivery model (do not forget)

```text
public/packages/{productId}/
  files/                    ← product folder: all files to build the end product with AI
  *-files-*.zip             ← same contents, Get Full Prompt download
  *-package-*.pdf           ← buyer manual
```

### Key paths

| Topic | Doc |
|-------|-----|
| Ship entry | `docs/SHIP_FOR_SALE.md` |
| Full checklist | `docs/PRODUCTION_READY_CHECKLIST.md` |
| **Platinum second revision** | **`docs/PLATINUM_SECOND_REVISION.md`** |
| Package + zip law | `docs/PRODUCT_PACKAGE.md` |
| Product UX law | `docs/PRODUCT_LAW.md` |
| **Scroll narrative pin law** | **`docs/PRODUCT_LAW.md`** (pin-until-complete) |
| **PSAVE (Perfect Scroll Video Engine)** | **`docs/PSAVE.md`** (Elyse gold + live Revel + live Vertex + live Still + live Prism; named method only) |
| Media vault | `docs/ASSET_PIPELINE.md` |
| Handoff | `docs/HANDOFF.md` |
| **English/Spanish separation law** | **`docs/English-Spanish-Law.md`** |

Never claim “sale ready” or set `status: published` without the checklist and product folder + zip (for rebuild flagships).  
Never treat a new production post as finished without **asking for Platinum Second Revision** and running it after permission.  
Never ship a **new** scroll-narrative or hybrid-with-scroll product on a tall multi-vh traditional scrollbar track — always **pin-until-complete**.

## Spanish localization law — mandatory for the full ClickMotion site

The ClickMotion site must be developed as an English-default, Spanish-capable product. Spanish is not an optional later translation pass and must not be treated as an afterthought after a new motion-site product has already been created.

### 1. Language and URL contract

1. English remains the default public experience and keeps its existing URLs without an `/en/` prefix.
2. Spanish uses the `/es/` URL namespace:
   - `/` = English homepage
   - `/es/` = Spanish homepage
   - `/browse/{slug}` = English product page
   - `/es/browse/{slug}` = Spanish product page
   - `/demo/{slug}` = English demo
   - `/es/demo/{slug}` = Spanish demo
3. Do not change or translate product IDs, slugs, API paths, package directory names, asset filenames, Stripe IDs, Supabase IDs, or technical identifiers solely for localization.
4. The language switcher must remain visually restrained: a small `ES` / `EN` chip or letters beside the existing Unlimited Power control. Do not replace the primary CTA with a large language selector.
5. The switcher must preserve the equivalent page, product slug, demo slug, search query, filters, and other safe query parameters whenever an equivalent localized route exists.
6. The switcher must be keyboard accessible, screen-reader labeled, visible on desktop and mobile, and must never create a redirect loop or broken `/es/` URL.
7. APIs, `/admin`, authentication internals, webhooks, and other non-marketing infrastructure remain outside the public locale namespace unless a separate task explicitly authorizes localization.
8. Do not introduce `/en/` merely to make the URL structure symmetrical. Existing English URLs are canonical and must remain stable.

### 1A. Strict English immutability and Spanish-copy separation

The English version is the canonical default and must never be overwritten, silently edited, replaced, renamed, or repurposed as part of Spanish work. This is a strict operator order.

1. Treat every existing English route, page, demo, cleanroom, prompt, MDX file, product record, package, PDF, zip, source file, video, image, poster, thumbnail, background, metadata record, asset registry, and technical identifier as protected English source material.
2. The Spanish version must be an explicit copy or locale-specific representation in the Spanish section, normally under `/es/`, `content/.../es/`, `copy.es.*`, or an equivalent clearly named Spanish location.
3. Do not translate in place inside the English source file when that would change the English experience.
4. Do not use a Spanish translation as a replacement value for an English product title, description, prompt, demo copy, metadata field, CMS record, package document, or social asset.
5. Do not rename or move an English file to make room for Spanish. Add a Spanish file or locale field while preserving the English file and its path.
6. Do not overwrite an English video, poster, thumbnail, WebM, MP4, GLB, image, Lottie file, client asset, storefront preview, or background. A future Spanish recording must be a separate approved asset with a separate role and path.
7. Do not overwrite English product packages, PDFs, zips, `START-HERE.md`, `PROMPT.md`, `CUSTOMIZATION.md`, or source folders. A Spanish package variant, if approved, must be separately named, registered, entitlement-tested, and kept beside the English package.
8. Do not modify shared animation or technical code merely to translate copy if the modification would alter the English behavior. Prefer shared code with locale-aware English and Spanish copy modules.
9. If a shared data structure must gain Spanish fields, add fields without changing the English values. Verify English output before and after the change.
10. If an English file must be changed for a genuine bug fix or shared architecture improvement, record the reason, affected English surfaces, before/after verification, and operator approval when the change is outside the current task.
11. Before every Spanish creation or localization task, record the English source paths and protected artifacts in the observation log.
12. Before release, run an English regression matrix proving that English routes, demos, prompts, media, packages, metadata, and commerce behavior were not unintentionally changed.
13. Before Spanish implementation or a shared localization refactor, verify a remote, restorable backup of code plus every duplicated video/media path. Git LFS pointers without remotely verified objects do not satisfy this requirement; nested repositories require separate verification or an accessible parent archive.
13. A Spanish implementation is not complete if it works only by mutating the English source of truth.

Required invariant:

> English remains the default, canonical, and protected source experience. Spanish is an additive copy in the Spanish section. Spanish work must never overwrite or silently change English, whether intentionally or by mistake.

References: `docs/SPANISH_LOCALIZATION_PROPOSAL.md`, `docs/SPANISH_LOCALIZATION_CHECKLIST.md`, `docs/SPANISH_PROPOSAL_OBSERVATIONS_AND_CHANGELOG.md`, `docs/ASSET_PIPELINE.md`, `docs/PRODUCT_PACKAGE.md` §10, and `docs/PRODUCT_LAW.md`.

### 1B. Separation applies to every system area

The English/Spanish separation law applies beyond the visible website. It covers the frontend, backend, data, archives, design work, research, staging, packages, and operational records.

- **Frontend:** English route files, English components, English demo wrappers, English styles, English dictionaries, and English metadata remain protected. Spanish routes and Spanish copy are additive.
- **Backend:** English product records, English CMS fields, English seed data, English API contracts, English webhook behavior, English auth behavior, English entitlement logic, and English database identifiers remain protected. Spanish fields or locale records are additive and must not replace English values.
- **Content:** English MDX, prompts, product descriptions, taxonomies, collections, and manifests remain protected. Spanish MDX/content belongs in an explicit Spanish section or locale-specific record.
- **Public assets:** English videos, WebM/MP4 files, posters, thumbnails, backgrounds, models, Lottie files, and client assets remain protected. Spanish assets use separate names and paths.
- **Packages and archives:** English product folders, PDFs, zips, buyer manuals, source trees, and archive files remain protected. Spanish package variants are separate artifacts with separate registry entries, language labels, and entitlement/HTTP tests.
- **Cleanroom and demo areas:** Prefer a shared animation engine with separate `copy.en` and `copy.es` modules. If a Spanish implementation needs different structure, create a separate additive Spanish folder; never translate the English cleanroom in place.
- **Lab and research:** English research, raw captures, references, source media, and experimental folders remain protected. Spanish research or rerecording material goes in a separate Spanish subfolder or separately named folder.
- **Design and owner archives:** English design references, owner-design records, capture archives, screenshots, and design notes remain protected. Spanish design variants and captures use separate names, folders, and records.
- **Logs and documentation:** Never rewrite historical English decisions or evidence to make them Spanish. Append Spanish decisions and status entries to the observations/changelog.
- **Build and deployment:** Do not use a Spanish build, seed, migration, or sync operation that mutates English records or overwrites English public artifacts. Validate both locale outputs after shared changes.

For every Spanish artifact, record its English source counterpart, Spanish destination, relationship type (shared, translated copy, variant, or separate design), and whether it is allowed to share runtime code. A Spanish artifact must be identifiable by its path, filename, locale field, or registry entry without relying on memory.

### 2. Approval gate — every new motion-site product

Every new motion-site product, hero, section, landing page, special, cleanroom, or product post must receive explicit operator approval for its Spanish plan before implementation begins. This approval requirement applies even when the product is first designed in English and even when Spanish copy will be completed in a later pass.

Before creating a new motion-site product, the agent must present the operator with a concise but complete localization brief containing at minimum:

- product ID, slug, product type, and interaction mode;
- English concept and Spanish concept direction;
- Spanish product title and short description draft;
- Spanish audience/use case;
- Spanish-visible demo copy scope;
- whether the product contains scroll narrative, scroll-scrub, scroll-pivot, PSAVE, video, 3D, or hybrid behavior;
- confirmation that the Spanish version will use the shared `/es/` route contract;
- confirmation that existing media-role laws will be preserved;
- confirmation of what will remain English temporarily, if anything;
- proposed product page, demo page, metadata, and package-language scope;
- estimated translation, implementation, capture, and QA effort;
- known risks and the proposed validation method.

Do not start building the new product until the operator explicitly approves that localization brief. Silence, an implied approval, or approval of an unrelated product does not count.

For each new product, maintain two separate approval moments:

1. **Creation approval:** operator approves the Spanish product brief before the new motion-site product is built.
2. **Release approval:** after the English and Spanish implementation, QA, product wiring, and first production pass are complete, operator approves the product for publication or sale.

The release approval does not replace the required Platinum Second Revision permission. The existing rule still applies: complete Phases 0–12, tell the operator the first production pass is finished, ask the required Platinum question, and only run Phase 13 after permission.

Required creation-approval intent:

> I approve the Spanish localization plan for this new ClickMotion motion-site product, including its `/es/` route, Spanish storefront copy, Spanish demo-visible copy, metadata, and stated package-language scope.

If the operator has not approved the creation brief, the agent may research, inventory, propose, or prepare non-destructive planning material, but must not create the new product implementation or claim that the product has been started.

### 3. Spanish parity is part of product completeness

For every new motion-site product, “complete” means that the product has an intentional Spanish experience, even if the operator chooses to defer some optional Spanish deliverables. The deferred items must be written down and approved; they may not be silently omitted.

At minimum, the new product must have:

- an approved Spanish title or a documented approved decision to retain a proper brand/product name;
- Spanish short description and product-page summary;
- Spanish category, style, intensity, and feature labels where those labels are displayed;
- Spanish demo route plan;
- Spanish visible UI copy for the live demo, or an explicit approved exception;
- Spanish page title and meta description;
- English and Spanish alternate/canonical URL plan;
- Spanish language-switcher mapping;
- Spanish accessibility labels for new controls;
- Spanish empty, loading, error, and fallback states introduced by the product;
- an explicit statement that existing videos remain unchanged if no Spanish rerecord has been authorized;
- an explicit package-language statement for any PDF, zip, prompt, or downloadable buyer documentation.

Do not mark a product localization-complete when only the title has been translated. Do not use a Spanish chip as evidence that the product itself is localized.

### 4. Shared code and localized content law

1. Use shared animation, layout, interaction, media, and technical code for English and Spanish wherever possible.
2. Do not fork an entire motion-site implementation merely to translate copy.
3. Extract user-visible strings from new components into locale-aware copy modules or typed dictionaries.
4. New products must not scatter translation conditionals throughout JSX when a shared locale dictionary or product copy object is appropriate.
5. New products must include English and Spanish copy sources where the product contains substantial visible text.
6. Product content must be typed or structurally validated so missing Spanish keys are detectable before publication.
7. Product IDs, slugs, media paths, technical tags, motion methods, and client implementation contracts remain shared unless a deliberate product-specific decision is documented.
8. Spanish copy must not change animation mechanics, scroll physics, pin behavior, PSAVE behavior, responsive rules, or media role assignments unless a separate approved design change requires it.
9. Spanish text must be reviewed for line length, wrapping, button width, timing, contrast, and mobile composition. A literal translation that breaks the design fails QA.
10. Use neutral Latin American Spanish with Mexican compatibility unless the operator approves another regional voice.
11. Machine translation may be used for drafting, never as the final quality gate for public product copy without human review.

### 5. Demo and motion-site requirements

For every new demo or cleanroom product:

- extract all visible copy, labels, buttons, captions, form text, tooltips, and accessibility strings;
- provide an English source and Spanish source or an approved documented exception;
- wire the demo to the correct locale without duplicating the animation engine;
- test Spanish text at desktop, tablet, and mobile widths;
- test Spanish text during the actual motion sequence, not only in a static screenshot;
- verify that translated text does not alter the intended timing or narrative beat;
- preserve `prefers-reduced-motion` behavior;
- preserve cleanup of listeners, animation instances, video, GSAP, Lottie, WebGL, and Three.js resources;
- preserve the Product Law pin-until-complete method for all scroll-narrative and hybrid-with-scroll products;
- preserve PSAVE exactly where PSAVE is named or required;
- verify that the Spanish demo route and English demo route both return HTTP 200;
- verify that the Spanish product page links to the Spanish demo and the English product page links to the English demo.

No translation task may be used as a reason to replace pin-until-complete with a tall multi-vh sticky scrollbar track, to change a PSAVE method, or to weaken an existing motion quality gate.

### 6. Video and media-role requirements

Existing videos remain unchanged unless the operator separately authorizes a future rerecording or media replacement task.

1. Do not rename, delete, overwrite, move, re-encode, or silently replace existing videos during Spanish localization.
2. Do not replace an existing WebM page preview with MP4 merely because the Spanish route is being added.
3. Keep client HD, storefront preview, thumbnail, poster, background, fullscreen, and operator-screenshot media roles separate.
4. A Spanish page may use the same existing video while the surrounding page copy is Spanish. It must not claim that the video itself is Spanish until a Spanish recording exists.
5. Do not add storefront preview files to client product folders or files zips.
6. If a future Spanish rerecording is approved, create a separate media-role plan first and run the relevant `ASSET_PIPELINE.md` checks before wiring it.
7. When an operator supplies a Premiere/screenshot WebM for a product, preserve the existing operator-WebM rule: it remains the `previewVideo` for home, browse, and product page, and is not re-encoded for that role.

Canonical references: `docs/ASSET_PIPELINE.md` media-role sections, `docs/PRODUCT_PACKAGE.md` §10, and `docs/PRODUCTION_READY_CHECKLIST.md` Phase 2.

### 7. Product page and buyer-package language

For every new product, the agent must explicitly state which of the following are translated:

- storefront title;
- storefront short description;
- storefront long description;
- MDX/product-page body;
- live demo copy;
- PDF buyer manual;
- `START-HERE.md`;
- `CUSTOMIZATION.md`;
- `PROMPT.md`;
- source-code comments;
- video-generation prompt;
- social copy.

The page must never imply that a buyer package is fully Spanish when only the storefront is Spanish. If technical source code or the core AI prompt remains English, say so accurately in the package or product-page language notice.

Every rebuild flagship still requires the full product delivery model:

```text
public/packages/{productId}/
  files/                    ← product folder, not optional
  *-files-*.zip             ← zip of that same folder
  *-package-*.pdf           ← buyer manual where required
```

Spanish localization does not relax any package law. If a Spanish PDF or files zip is created, it must be separately registered, entitlement-tested, visually reviewed, and kept synchronized with its product folder. The zip root must still expose `START-HERE.md`; it must not contain a useless nested `files/` wrapper.

References: `docs/PRODUCT_PACKAGE.md` §10, `docs/PRODUCTION_READY_CHECKLIST.md` Phase 8 and 8H, `docs/SHIP_FOR_SALE.md` Sections 1, 5, and 6, and `docs/BRAND.md` product-package voice.

### 8. Spanish SEO and discoverability requirements

Every Spanish public page must have intentional Spanish search and sharing metadata:

- Spanish `<title>`;
- Spanish meta description;
- Spanish Open Graph title and description;
- correct `/es/` canonical URL;
- `hreflang="en"` alternate;
- `hreflang="es"` alternate;
- `hreflang="x-default"` where applicable;
- correct document language metadata;
- Spanish sitemap entry;
- accurate structured data where used;
- no accidental canonicalization of Spanish pages to English pages;
- no duplicate or placeholder “coming soon” metadata.

Do not translate URLs, product IDs, or asset filenames unless the operator explicitly approves the SEO and migration consequences.

References: `src/app/sitemap.ts`, `src/app/layout.tsx`, `src/config/site.ts`, `docs/AEO_LLM_GROWTH.md`, `docs/PRODUCTION_READY_CHECKLIST.md` Phase 7.7, and `docs/BRAND.md`.

### 9. Required per-product Spanish checklist

Before a new motion-site product may be called complete, check every applicable item:

- [ ] Spanish localization brief approved before implementation.
- [ ] Product ID and slug recorded and unchanged.
- [ ] English-default route recorded.
- [ ] `/es/` route recorded.
- [ ] Language-switcher mapping tested.
- [ ] Spanish product title reviewed.
- [ ] Spanish short description reviewed.
- [ ] Spanish product-page copy reviewed.
- [ ] Spanish category/style/intensity labels reviewed.
- [ ] Spanish demo copy extracted.
- [ ] Spanish demo copy implemented or exception approved.
- [ ] Spanish accessibility labels implemented.
- [ ] Spanish loading/error/empty states implemented.
- [ ] Spanish mobile layout reviewed.
- [ ] Spanish desktop layout reviewed.
- [ ] Spanish copy reviewed during animation.
- [ ] Existing video unchanged, or future rerecording separately approved.
- [ ] Preview video role correct.
- [ ] Poster role correct.
- [ ] Thumbnail role correct.
- [ ] Client media role correct.
- [ ] No storefront preview or thumbnail leaked into the product zip.
- [ ] Scroll-narrative pin law preserved where applicable.
- [ ] PSAVE law preserved where applicable.
- [ ] Spanish title and meta description present.
- [ ] Canonical and `hreflang` behavior tested.
- [ ] English route still returns HTTP 200.
- [ ] Spanish route returns HTTP 200.
- [ ] English demo still returns HTTP 200.
- [ ] Spanish demo returns HTTP 200.
- [ ] Free/paid state is identical between locales unless explicitly approved.
- [ ] Get Full Prompt entitlement is identical between locales.
- [ ] Product PDF/zip language is accurately disclosed.
- [ ] Typecheck passes.
- [ ] Lint passes or known exceptions are documented.
- [ ] Prompt validation passes.
- [ ] Asset validation passes.
- [ ] Visual QA evidence captured.
- [ ] Operator has approved the first production pass.
- [ ] Platinum Second Revision permission requested using the required wording.
- [ ] Phase 13 run only after operator permission.
- [ ] Final Spanish release approval recorded.

### 10. Documentation cross-reference for Spanish work

Use the following documents together; do not invent a separate localization standard that bypasses the existing production laws:

| Spanish work | Required reference |
|---|---|
| Product creation approval | This file, Spanish localization law §2 |
| Product slot and differentiation | `docs/PRODUCTION_READY_CHECKLIST.md` Phase 0 |
| Spanish concept and sold promise | `docs/PRODUCTION_READY_CHECKLIST.md` Phase 1A and 1D |
| Localized taxonomy and commercial metadata | `docs/PRODUCTION_READY_CHECKLIST.md` Phase 1C |
| Spanish copy quality | `docs/BRAND.md` and `docs/PRODUCTION_READY_CHECKLIST.md` Phase 1D |
| Video and media roles | `docs/ASSET_PIPELINE.md` and checklist Phase 2 |
| Cleanroom/demo parity | `docs/PRODUCTION_READY_CHECKLIST.md` Phase 3 |
| Scroll-narrative behavior | `docs/PRODUCT_LAW.md` and checklist boxes `0.5a`, `1A.3a`, `1B.4a`, `3.4a`, `8D.4a` |
| Visual and responsive Spanish QA | `docs/PRODUCTION_READY_CHECKLIST.md` Phase 4 and `docs/QUALITY_CHECKLIST.md` |
| Spanish storefront wiring | `docs/PRODUCTION_READY_CHECKLIST.md` Phase 5 and 7 |
| Buyer PDF and zip language | `docs/PRODUCT_PACKAGE.md` §10 and checklist Phase 8/8H |
| Brand, navigation, and language chip | `docs/BRAND.md` and checklist Phase 9 |
| Machine gates and route checks | checklist Phase 10 |
| Commerce, entitlements, and download parity | checklist Phase 11 and `docs/SHIP_FOR_SALE.md` |
| First production sign-off | checklist Phase 12 |
| Second-eyes ultra-premium audit | `docs/PLATINUM_SECOND_REVISION.md` and checklist Phase 13 |
| Future operator handoff | `docs/HANDOFF.md` |

### 11. Required approval language after each new product

After the first production pass for each new motion-site product, the agent must tell the operator what was completed, what remains English, what media was intentionally left unchanged, and which Spanish QA evidence exists. The agent must not claim the product is fully ultra-premium until the existing Platinum rule is satisfied.

The agent must then ask:

> May I run the Platinum Second Revision to make sure that all is perfectly ultra premium?

After the Platinum Second Revision is complete, the agent must separately ask for or record the operator’s final approval of the Spanish product release. No new motion-site product may be presented as fully approved for publication or sale without that operator approval.

### 12. Disconfirmation and evidence duty for Spanish recommendations

For every material Spanish localization recommendation, the agent must identify:

1. The primary failure mode.
2. Secondary risks.
3. Dependencies that must be true.
4. The strongest counterargument.
5. The false positive that could make metrics appear successful when the product is not improving.

Use explicit labels where appropriate:

- `[ASSUMPTION]` for unverified claims;
- `[CONFIDENCE: X%]` for probabilistic claims;
- `[VALIDATION NEEDED]` for claims requiring testing;
- `[TRADE-OFF]` for competing priorities;
- `[COMPLIANCE RISK]` for ethical, legal, platform, or trust risks.

Do not treat translation volume, Spanish pageviews, social impressions, or video views alone as evidence that the Spanish product is working. Validate comprehension, demo engagement, sign-up behavior, checkout intent, purchase behavior, technical reliability, and trust.
