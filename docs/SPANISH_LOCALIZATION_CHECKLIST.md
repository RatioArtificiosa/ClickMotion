# ClickMotion Spanish Localization Checklist

This checklist implements SPANISH_LOCALIZATION_PROPOSAL.md.

English remains the default. Spanish uses /es/. Existing videos remain unchanged unless separately approved for rerecording. Shared animation, media, commerce, and technical systems must remain shared wherever possible.

## Backup and recovery gate — complete before localization implementation

- [ ] Record the baseline commit, branch, remote repository, and timestamp.
- [ ] Verify the code/documentation checkpoint exists on the remote repository.
- [ ] Inventory every video extension used by the project: MP4, WebM, MOV, M4V, AVI, and MKV, plus any future project-specific extension.
- [ ] Inventory public videos, package-embedded videos, client videos, storefront videos, backgrounds, Lab videos, cleanroom videos, research videos, test videos, temporary captures, upload artifacts, and generated duplicate copies.
- [ ] Record every duplicate path; do not deduplicate by deleting a path that the application, package, archive, or reconstruction workflow may reference.
- [ ] Keep GitHub limited to normal Git commits and pushes; do not add Git LFS or LFS pointers.
- [ ] Store all large videos, archives, and other large binaries in the approved Google Drive backup.
- [ ] Verify that every required large file exists in Google Drive and is downloadable.
- [ ] Verify that every required archive is remotely available and has a documented extraction destination.
- [ ] Verify nested repositories and submodules separately; a Git submodule pointer is not proof that its files are backed up.
- [ ] If a nested repository cannot be pushed with the current identity, create a parent-repository archive of its required media and record the limitation.
- [ ] Perform a clean restoration test using only the remote checkpoint and documented media retrieval process.
- [ ] Compare restored file paths and checksums against the inventory.
- [ ] Record the backup commit, remote branch, Google Drive path, Drive verification, archive verification, restoration result, and exceptions in `SPANISH_PROPOSAL_OBSERVATIONS_AND_CHANGELOG.md`.
- [ ] Do not begin Spanish implementation on the assumption that an unverified local cache is recoverable.

The backup gate is separate from localization. It protects both language versions and is a hard prerequisite for safe work. GitHub is the normal-Git source for code and documentation; Google Drive is the large-file source for media and archives. A successful code push without successful Google Drive verification is incomplete.

## Non-negotiable English protection rule

- [ ] English is recorded as the canonical default.
- [ ] Existing English routes are treated as protected.
- [ ] Existing English demos and cleanrooms are treated as protected.
- [ ] Existing English prompts and MDX files are treated as protected.
- [ ] Existing English product records are treated as protected.
- [ ] Existing English videos, images, posters, thumbnails, models, backgrounds, and client assets are treated as protected.
- [ ] Existing English PDFs, product folders, zips, START-HERE files, PROMPT files, and CUSTOMIZATION files are treated as protected.
- [ ] Spanish work is additive under /es/, Spanish content directories, or clearly named Spanish copy modules.
- [ ] No English file is translated in place when doing so would change the English experience.
- [ ] No English file is renamed or moved to make room for Spanish.
- [ ] No English media is overwritten, re-encoded, or silently replaced.
- [ ] No English package is overwritten by a Spanish package.
- [ ] Shared code changes preserve English output.
- [ ] Shared data changes preserve English values.
- [ ] Any genuine English bug fix is recorded in the observations/changelog.
- [ ] Out-of-scope English fixes receive operator approval before implementation.
- [ ] English regression testing is completed before Spanish release.

Required invariant: English remains the default, canonical, and protected source experience. Spanish is a separate copy in the Spanish section.

Separation coverage:

- [ ] Frontend English routes, components, styles, dictionaries, demos, and metadata remain protected.
- [ ] Backend English product records, CMS fields, seed data, API contracts, auth, entitlements, and database identifiers remain protected.
- [ ] English MDX, prompts, collections, taxonomy, and manifests remain protected.
- [ ] English public assets remain protected.
- [ ] English product folders, PDFs, zips, buyer manuals, and archives remain protected.
- [ ] English cleanroom and demo files remain protected.
- [ ] English Lab research, raw captures, and design references remain protected.
- [ ] English owner-design records, screenshots, and design archives remain protected.
- [ ] Spanish artifacts have explicit Spanish paths, filenames, locale fields, or registry entries.
- [ ] Every Spanish artifact records its English source counterpart and relationship type.
- [ ] Spanish seed/sync/build operations cannot overwrite English records or artifacts.
- [ ] English regression output is verified after shared code or data changes.

For the complete binding rules, use [English-Spanish-Law.md](./English-Spanish-Law.md). This checklist is the execution gate; the law is the detailed source of truth for what must remain protected and where Spanish material may live.

Area map:

- [ ] Frontend: English routes and page files remain unchanged; Spanish uses additive /es/ routes or locale wrappers.
- [ ] UI components: English output remains unchanged; Spanish copy uses separate locale modules.
- [ ] Backend and CMS: English records, fields, seeds, APIs, auth, entitlements, and identifiers remain unchanged; Spanish data is additive.
- [ ] MDX and prompts: English files remain intact; Spanish content is in an explicit Spanish content area.
- [ ] Demos and cleanrooms: English wrappers and mechanics remain intact; Spanish uses /es/demo routes and copy.es modules, or a separately named Spanish folder when necessary.
- [ ] Lab and research: English research, raw captures, and source material remain protected; Spanish research uses a Spanish subfolder or separate folder.
- [ ] Public assets: English videos and media remain unchanged; Spanish assets use separate filenames and paths.
- [ ] Packages and archives: English folders, PDFs, zips, manuals, and source trees remain unchanged; Spanish variants are separate artifacts.
- [ ] Design and owner archives: English references, screenshots, captures, records, and notes remain protected; Spanish variants are separate.
- [ ] Build and sync: Spanish build, seed, migration, or sync operations cannot overwrite English records or artifacts.
- [ ] Documentation: historical English evidence is not rewritten; Spanish decisions are appended to the observations/changelog.
- [ ] Every Spanish artifact identifies its English source counterpart and relationship type.
- [ ] No Spanish artifact depends on an undocumented mutation of English.

## Phase 0 — Lock the localization contract

- [ ] Confirm English remains the default locale.
- [ ] Confirm Spanish uses /es/.
- [ ] Confirm no /en/ namespace will be introduced initially.
- [ ] Confirm the language switcher remains next to “Unlimited Power”.
- [ ] Confirm existing videos are not modified.
- [ ] Confirm existing media filenames remain unchanged.
- [ ] Confirm animation behavior remains shared.
- [ ] Confirm product IDs and slugs remain shared.
- [ ] Confirm neutral Latin American Spanish with Mexican compatibility.
- [ ] Confirm whether downloadable PDFs and zip documentation are translated in Release 1.
- [ ] Confirm whether Spanish product pages may link to English technical packages.
- [ ] Record all decisions in HANDOFF.md.

References: SHIP_FOR_SALE.md Sections 1–2; PRODUCT_LAW.md; HANDOFF.md; BRAND.md.

## Phase 1 — Inventory the current site

- [ ] Inventory every marketing route.
- [ ] Inventory every demo route.
- [ ] Inventory every cleanroom directory.
- [ ] Inventory every product MDX file.
- [ ] Inventory all metadata declarations.
- [ ] Inventory all user-visible hard-coded strings.
- [ ] Inventory all aria-label values.
- [ ] Inventory all placeholders.
- [ ] Inventory all loading states.
- [ ] Inventory all error states.
- [ ] Inventory all empty states.
- [ ] Inventory all pricing and commerce copy.
- [ ] Inventory all footer copy.
- [ ] Inventory all legal copy.
- [ ] Inventory all CMS-managed content.
- [ ] Inventory all social preview content.
- [ ] Inventory all demo-visible text.
- [ ] Classify strings as UI, product marketing, demo copy, technical, legal, internal/admin, user-generated, or asset filename.
- [ ] Mark each string as Translate, Shared, Future translation, or Do not translate.

Create a translation inventory containing:

- [ ] key
- [ ] English source
- [ ] Spanish translation
- [ ] context
- [ ] character limit
- [ ] page
- [ ] component
- [ ] review status
- [ ] owner

References: PRODUCTION_READY_CHECKLIST.md Phases 1C and 1D; QUALITY_CHECKLIST.md; BRAND.md; HANDOFF.md.

## Phase 2 — Build the localization foundation

- [ ] Define Locale = en | es.
- [ ] Add locale resolution from URL.
- [ ] Preserve English default behavior.
- [ ] Add Spanish route namespace.
- [ ] Add typed English dictionary.
- [ ] Add typed Spanish dictionary.
- [ ] Ensure missing Spanish keys fail validation.
- [ ] Add server-side translation access.
- [ ] Add client-side translation access where needed.
- [ ] Add locale-aware metadata helpers.
- [ ] Add locale-aware route helpers.
- [ ] Add language-switcher URL mapping.
- [ ] Preserve query parameters.
- [ ] Preserve product slugs.
- [ ] Preserve demo slugs.
- [ ] Ensure APIs remain outside locale routing.
- [ ] Ensure /admin remains outside locale routing.
- [ ] Ensure /api remains outside locale routing.
- [ ] Ensure language switching does not create redirect loops.
- [ ] Add tests for / and /es/.
- [ ] Add tests for unknown locales.
- [ ] Add tests for missing translations.
- [ ] Add tests for equivalent route mapping.

References: PRODUCTION_READY_CHECKLIST.md Phases 9 and 10; PRODUCT_LAW.md; QUALITY_CHECKLIST.md; HANDOFF.md.

## Phase 3 — Localize site chrome

- [ ] Header
- [ ] Desktop navigation
- [ ] Mobile navigation
- [ ] Language chip
- [ ] Search button
- [ ] Browse button
- [ ] Collections link
- [ ] Backgrounds link
- [ ] Pricing link
- [ ] Login link
- [ ] CTA labels
- [ ] Footer
- [ ] Footer navigation
- [ ] Footer description
- [ ] Social links
- [ ] Copyright
- [ ] Global accessibility labels
- [ ] Loading states
- [ ] Error states
- [ ] Modal labels
- [ ] Close buttons
- [ ] Video controls
- [ ] Reduced-motion messaging

References: BRAND.md Sections 1–3; PRODUCTION_READY_CHECKLIST.md Phase 9; QUALITY_CHECKLIST.md Points 11–20 and 21–28.

## Phase 4 — Localize the homepage

- [ ] Spanish hero headline
- [ ] Spanish hero supporting copy
- [ ] Spanish primary CTA
- [ ] Spanish secondary CTA
- [ ] Spanish product/category labels
- [ ] Spanish gallery headings
- [ ] Spanish demo labels
- [ ] Spanish trust/value statements
- [ ] Spanish footer
- [ ] Spanish homepage metadata
- [ ] Spanish Open Graph content
- [ ] Correct canonical URL
- [ ] hreflang links
- [ ] Mobile copy review
- [ ] Typography overflow review
- [ ] Desktop screenshot review
- [ ] Mobile screenshot review

References: PRODUCTION_READY_CHECKLIST.md Phases 1D, 5, 7, and 9; BRAND.md; PRODUCT_LAW.md.

## Phase 5 — Localize browse and discovery

- [ ] Browse page title
- [ ] Browse page description
- [ ] Search placeholder
- [ ] Search result labels
- [ ] Type filter
- [ ] Category filter
- [ ] Style filter
- [ ] Motion intensity filter
- [ ] Sort labels
- [ ] Empty results message
- [ ] Product card CTA
- [ ] Like button labels
- [ ] Preview controls
- [ ] Product type labels
- [ ] Category labels
- [ ] Style labels
- [ ] Motion labels
- [ ] Product metadata
- [ ] Spanish product ordering behavior
- [ ] Spanish search behavior
- [ ] URL query preservation
- [ ] Spanish browse metadata
- [ ] No mixed English/Spanish cards
- [ ] No translated product IDs
- [ ] No broken thumbnails or preview videos

References: PRODUCTION_READY_CHECKLIST.md Phases 2, 5, 7, and 10; ASSET_PIPELINE.md; QUALITY_CHECKLIST.md Points 31, 37, and 37g.

## Phase 6 — Localize product pages

For every product:

- [ ] Spanish product title
- [ ] Spanish short description
- [ ] Spanish long description
- [ ] Spanish product promise
- [ ] Spanish feature explanation
- [ ] Spanish motion explanation
- [ ] Spanish customization instructions
- [ ] Spanish responsive notes
- [ ] Spanish accessibility notes
- [ ] Spanish performance notes
- [ ] Spanish AI-tool guidance
- [ ] Spanish package summary
- [ ] Correct price
- [ ] Correct free/paid state
- [ ] Correct crown/premium marker
- [ ] Correct demo link
- [ ] Correct preview video
- [ ] Correct poster
- [ ] Correct thumbnail
- [ ] Correct client-media references
- [ ] Correct CTA behavior
- [ ] Spanish metadata
- [ ] English fallback clearly defined
- [ ] No claim that the video is Spanish
- [ ] No claim that source files are Spanish unless translated
- [ ] Product copy reviewed by a native speaker
- [ ] Product page tested at desktop and mobile widths

References: PRODUCTION_READY_CHECKLIST.md Phases 1C, 1D, 2, 5, 7, 8, and 11; PRODUCT_PACKAGE.md Sections 8–10; BRAND.md; SHIP_FOR_SALE.md.

## Phase 7 — Localize demos without changing motion

For each demo:

- [ ] Identify every visible text element.
- [ ] Identify every accessibility string.
- [ ] Extract copy from the component.
- [ ] Create English copy source.
- [ ] Create Spanish copy source.
- [ ] Add locale-aware copy selection.
- [ ] Check Spanish line wrapping.
- [ ] Check buttons at mobile width.
- [ ] Check headings at mobile width.
- [ ] Check copy against animation timing.
- [ ] Check text remains readable during motion.
- [ ] Check no layout shift occurs.
- [ ] Check no animation timing is altered unnecessarily.
- [ ] Check no scroll behavior changed.
- [ ] Check pin-until-complete behavior remains intact.
- [ ] Check PSAVE behavior remains intact where applicable.
- [ ] Check prefers-reduced-motion.
- [ ] Check unmount cleanup.
- [ ] Check Spanish demo route returns 200.
- [ ] Check English demo route remains unchanged.
- [ ] Check Spanish product page links to the correct Spanish demo.
- [ ] Check the existing video remains unchanged.

For scroll-narrative or hybrid products:

- [ ] Fixed/pinned stage remains fixed.
- [ ] Virtual progress remains the driver.
- [ ] Wheel, trackpad, and touch remain supported.
- [ ] Journey remains pinned until complete.
- [ ] Page scroll resumes only after release.
- [ ] No unnecessary multi-viewport sticky track is introduced.
- [ ] The next sibling does not accidentally continue driving the animation.

References: PRODUCT_LAW.md; PRODUCTION_READY_CHECKLIST.md boxes 0.5a, 1A.3a, 1B.4a, 3.4a, and 8D.4a; QUALITY_CHECKLIST.md; PSAVE.md; PLATINUM_SECOND_REVISION.md.

## Phase 8 — Spanish SEO and discoverability

- [ ] Spanish homepage metadata
- [ ] Spanish catalog metadata
- [ ] Spanish product metadata
- [ ] Spanish collection metadata
- [ ] Spanish pricing metadata
- [ ] Spanish demo metadata
- [ ] Spanish background-library metadata
- [ ] Canonical URLs
- [ ] English alternate links
- [ ] Spanish alternate links
- [ ] x-default
- [ ] Spanish sitemap entries
- [ ] Spanish language metadata
- [ ] Open Graph previews reviewed
- [ ] Social-card dimensions reviewed
- [ ] Descriptions reviewed for truncation
- [ ] Duplicate-content handling checked
- [ ] Spanish pages do not canonicalize incorrectly to English
- [ ] English pages do not canonicalize incorrectly to Spanish
- [ ] Search Console properties checked after launch
- [ ] Spanish indexing checked after launch

References: src/app/sitemap.ts, src/app/layout.tsx, docs/AEO_LLM_GROWTH.md, PRODUCTION_READY_CHECKLIST.md Phase 7.7, and BRAND.md.

## Phase 9 — Commerce, authentication, and account behavior

- [ ] Spanish pricing page
- [ ] Spanish checkout-facing copy
- [ ] Stripe price IDs preserved
- [ ] Currency behavior preserved
- [ ] Entitlement logic preserved
- [ ] Paid/free product logic preserved
- [ ] Spanish login page
- [ ] Spanish sign-up page
- [ ] Spanish success page
- [ ] Spanish failure messages
- [ ] Spanish account messaging
- [ ] Authentication cookies preserved
- [ ] Language preference does not break authentication
- [ ] /es/ does not change API behavior
- [ ] Admin remains English/internal unless deliberately translated
- [ ] Unauthorized download remains 401
- [ ] Authorized download behavior unchanged
- [ ] Zip remains preferred where registered
- [ ] PDF fallback remains available where applicable

References: PRODUCTION_READY_CHECKLIST.md Phases 8 and 11; PRODUCT_PACKAGE.md Section 10; SHIP_FOR_SALE.md Sections 5–6; PLATINUM_SECOND_REVISION.md.

## Phase 10 — Package and documentation decision

Release 1:

- [ ] Spanish product page available
- [ ] Spanish product description available
- [ ] Spanish package summary available
- [ ] Existing English source package remains available
- [ ] Page accurately states package language
- [ ] Existing package folder unchanged
- [ ] Existing zip unchanged
- [ ] Existing PDF unchanged unless a Spanish version is intentionally produced
- [ ] No Spanish storefront asset placed in the client product folder
- [ ] No storefront preview added to product zips
- [ ] No CMS or MDX files leak into product zips
- [ ] No package registry changed without rebuilding and verifying the package

If Spanish PDFs or zips are added later:

- [ ] Separate product-folder policy
- [ ] Clear language identifier
- [ ] Correct package registry entry
- [ ] Correct PDF and zip naming
- [ ] Correct entitlement behavior
- [ ] Spanish START-HERE.md
- [ ] Spanish CUSTOMIZATION.md
- [ ] Spanish buyer-facing prompt documentation
- [ ] Same client asset role separation
- [ ] ZIP root verified
- [ ] No nested files wrapper
- [ ] Spanish PDF visually reviewed
- [ ] Spanish ZIP content reviewed
- [ ] Download smoke tested
- [ ] Phase 8 and Phase 13 completed

References: PRODUCT_PACKAGE.md §10; PRODUCTION_READY_CHECKLIST.md Phase 8 and 8H; SHIP_FOR_SALE.md; BRAND.md.

## Phase 11 — Quality assurance

Required test matrix:

- [ ] English desktop
- [ ] English mobile
- [ ] Spanish desktop
- [ ] Spanish mobile
- [ ] Reduced motion
- [ ] Unauthenticated
- [ ] Authenticated
- [ ] Free product
- [ ] Paid product
- [ ] Slow network
- [ ] Video unavailable
- [ ] Missing translation
- [ ] Unknown product
- [ ] Unknown route

QA:

- [ ] English homepage works.
- [ ] Spanish homepage works.
- [ ] English browse works.
- [ ] Spanish browse works.
- [ ] English product page works.
- [ ] Spanish product page works.
- [ ] English demo works.
- [ ] Spanish demo works.
- [ ] Language switcher preserves route.
- [ ] Language switcher preserves query.
- [ ] Language switcher works on mobile.
- [ ] Search works in Spanish.
- [ ] Filters work in Spanish.
- [ ] Product cards render Spanish labels.
- [ ] Product videos remain unchanged.
- [ ] Poster fallback remains correct.
- [ ] Video playback does not regress.
- [ ] No poster flash is introduced.
- [ ] No mixed-language UI remains.
- [ ] No layout overflow occurs.
- [ ] No CTA text is clipped.
- [ ] No accessibility label remains unintentionally English.
- [ ] No untranslated error state remains.
- [ ] No translated technical identifier breaks a route.
- [ ] Scroll-narrative demos remain pinned.
- [ ] PSAVE products still meet PSAVE rules.
- [ ] Reduced motion remains respected.
- [ ] Page performance remains within baseline.
- [ ] Sitemap returns successfully.
- [ ] Robots returns successfully.
- [ ] All localized pages have valid metadata.
- [ ] All localized assets return HTTP 200.
- [ ] No new console errors appear.
- [ ] Typecheck passes.
- [ ] Lint passes or known exceptions are documented.
- [ ] Prompt validation passes.
- [ ] Asset validation passes.
- [ ] Relevant end-to-end tests pass.

References: QUALITY_CHECKLIST.md; PRODUCTION_READY_CHECKLIST.md Phases 4, 5, 9, and 10; PLATINUM_SECOND_REVISION.md; HANDOFF.md.

## Phase 12 — Success metrics and validation

- [ ] Spanish switcher click rate tracked.
- [ ] Spanish homepage engagement tracked.
- [ ] Spanish browse-to-product rate tracked.
- [ ] Spanish product-to-demo rate tracked.
- [ ] Spanish demo completion rate tracked.
- [ ] Spanish sign-up rate tracked.
- [ ] Spanish checkout initiation rate tracked.
- [ ] Spanish purchase conversion rate tracked.
- [ ] Spanish return visits tracked.
- [ ] Social referral traffic tracked.
- [ ] Spanish route HTTP success rate tracked.
- [ ] JavaScript error rate tracked.
- [ ] Missing-translation count tracked.
- [ ] Broken localized links tracked.
- [ ] Core Web Vitals parity checked.
- [ ] Demo load success checked.
- [ ] Video playback success checked.
- [ ] Checkout error rate checked.
- [ ] Authentication error rate checked.
- [ ] SEO indexing status checked.
- [ ] English baseline recorded before comparison.
- [ ] Spanish traffic is not treated as success without meaningful product actions.
- [ ] False-positive metrics documented.

Meaningful actions include opening a product, opening a demo, copying a free prompt, signing up, starting checkout, purchasing, or sharing a product page.

## Phase 13 — Required approval for every new motion-site product

Before creation:

- [ ] Spanish localization brief approved before implementation.
- [ ] Product ID, slug, type, and interaction mode recorded.
- [ ] English concept and Spanish concept direction recorded.
- [ ] Spanish title and short-description draft approved.
- [ ] Spanish audience/use case recorded.
- [ ] Spanish demo-visible copy scope recorded.
- [ ] Scroll narrative, scroll-scrub, scroll-pivot, PSAVE, video, 3D, or hybrid behavior recorded.
- [ ] /es/ route plan approved.
- [ ] Existing media-role preservation confirmed.
- [ ] Deferred English items explicitly listed.
- [ ] Translation, implementation, capture, and QA effort estimated.
- [ ] Risks and validation method recorded.

The agent must not start building the new product until the operator explicitly approves the brief.

Per-product completion:

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
- [ ] Preview, poster, thumbnail, and client-media roles correct.
- [ ] No storefront preview or thumbnail leaked into the product zip.
- [ ] Scroll-narrative pin law preserved where applicable.
- [ ] PSAVE law preserved where applicable.
- [ ] Spanish title and meta description present.
- [ ] Canonical and hreflang behavior tested.
- [ ] English and Spanish product routes return HTTP 200.
- [ ] English and Spanish demo routes return HTTP 200.
- [ ] Free/paid state is identical unless explicitly approved.
- [ ] Get Full Prompt entitlement is identical.
- [ ] Product PDF/zip language accurately disclosed.
- [ ] Typecheck passes.
- [ ] Lint passes or exceptions documented.
- [ ] Prompt validation passes.
- [ ] Asset validation passes.
- [ ] Visual QA evidence captured.
- [ ] Operator approved the first production pass.
- [ ] Platinum permission requested using the required wording.
- [ ] Phase 13 Platinum run only after operator permission.
- [ ] Final Spanish release approval recorded.

Required Platinum question:

> May I run the Platinum Second Revision to make sure that all is perfectly ultra premium?

No new motion-site product may be presented as fully approved for publication or sale without final operator approval.

## Final release gate

- [ ] English remains the default.
- [ ] /es/ is functional.
- [ ] Language switching preserves equivalent routes.
- [ ] Header switcher is minimal and accessible.
- [ ] Homepage is fully Spanish.
- [ ] Browse page is fully Spanish.
- [ ] Product pages are fully Spanish.
- [ ] High-priority demos are fully Spanish.
- [ ] All critical UI states are Spanish.
- [ ] Product metadata is Spanish.
- [ ] Spanish SEO links are correct.
- [ ] Sitemap contains Spanish pages.
- [ ] Existing videos remain unchanged.
- [ ] Media roles remain unchanged.
- [ ] No animation behavior regresses.
- [ ] Scroll-narrative pin law remains intact.
- [ ] PSAVE products remain compliant where applicable.
- [ ] No mixed-language high-visibility surface remains.
- [ ] Technical packages are accurately labeled by language.
- [ ] Authentication works.
- [ ] Commerce works.
- [ ] Downloads work.
- [ ] Mobile layout works.
- [ ] Reduced-motion behavior works.
- [ ] Typecheck passes.
- [ ] Lint passes or documented exceptions are accepted.
- [ ] Prompt validation passes.
- [ ] Asset validation passes.
- [ ] Route smoke tests pass.
- [ ] Native Spanish editorial review passes.
- [ ] Social previews reviewed.
- [ ] Analytics events distinguish English and Spanish.
- [ ] English and Spanish performance baselines recorded.
- [ ] All critical and high-severity issues resolved.
- [ ] The complete code and duplicated-media backup has a verified remote branch.
- [ ] Google Drive media objects and archives have been verified and are downloadable.
- [ ] A clean restoration test has passed, or every exception is explicitly approved and recorded.

For any new product or translated product package published for sale, also apply SHIP_FOR_SALE.md, PRODUCTION_READY_CHECKLIST.md Phases 0–12, PRODUCT_PACKAGE.md §10, ASSET_PIPELINE.md, PRODUCT_LAW.md, QUALITY_CHECKLIST.md, and PLATINUM_SECOND_REVISION.md Phase 13 after permission.
