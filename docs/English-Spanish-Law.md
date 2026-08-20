# English–Spanish Law

## Status and authority

This is the binding English/Spanish separation law for ClickMotion.

It applies to:

- The public frontend.
- Marketing routes.
- Demo routes.
- Cleanroom implementations.
- Backend code and data.
- CMS records and seed files.
- API behavior.
- Authentication and entitlements.
- Prompts and MDX.
- Public assets and media roles.
- Product folders, PDFs, and zip archives.
- Lab research and raw captures.
- Design references and owner archives.
- Build, migration, seed, sync, and deployment operations.
- Documentation, logs, and evidence.

This law supplements and must be used with:

- SHIP_FOR_SALE.md
- PRODUCTION_READY_CHECKLIST.md
- PRODUCT_PACKAGE.md
- ASSET_PIPELINE.md
- PRODUCT_LAW.md
- PSAVE.md
- QUALITY_CHECKLIST.md
- HANDOFF.md
- BRAND.md
- PLATINUM_SECOND_REVISION.md
- SPANISH_LOCALIZATION_PROPOSAL.md
- SPANISH_LOCALIZATION_CHECKLIST.md
- SPANISH_PROPOSAL_OBSERVATIONS_AND_CHANGELOG.md

If another document describes the English/Spanish relationship less strictly, this document governs the separation requirement. It does not relax any shipping, media, package, motion, security, or approval law.

## The absolute invariant

> English remains the default, canonical, and protected source experience. Spanish is an additive copy in the Spanish section. Spanish work must never overwrite or silently change English, whether intentionally or by mistake.

This is a strict operator order, not a recommendation.

## Definitions

### English source

English source means any existing English artifact or English behavior that defines the default ClickMotion experience, including:

- English route files.
- English page metadata.
- English components.
- English copy and dictionaries.
- English demo wrappers.
- English cleanroom implementations.
- English prompt files and MDX.
- English product records.
- English CMS fields.
- English seed and manifest data.
- English API, auth, checkout, and entitlement behavior.
- English asset registries.
- English video, image, poster, thumbnail, model, background, and client media files.
- English product folders, PDFs, zips, manuals, and source trees.
- English Lab research, raw captures, references, and design files.
- English owner-design records and historical evidence.

### Spanish artifact

A Spanish artifact is any Spanish translation, route, copy source, data record, media variant, package, research file, design file, or operational record created to support the Spanish experience.

Every Spanish artifact must be identifiable by at least one of:

- An /es/ URL segment.
- A Spanish directory such as content/prompts/es/.
- A Spanish filename or suffix.
- A locale field with value es.
- A separate Spanish registry entry.
- A clearly named Spanish Lab or design folder.
- A copy.es module or equivalent locale-specific module.

### Shared runtime code

Shared runtime code may serve both locales only when the English output and behavior remain unchanged. Shared code is not permission to mutate English content in place.

### Spanish copy

Spanish copy is additive content selected by locale. It must not replace the English value in an existing English source file, record, archive, or package.

## Non-negotiable prohibitions

The following actions are prohibited during Spanish work unless they are separately approved as an English bug fix or shared architecture change and are fully verified:

- Translating an English page file in place.
- Replacing an English product title with Spanish.
- Replacing an English product description with Spanish.
- Replacing English MDX with Spanish MDX.
- Replacing an English demo component with a Spanish-only component.
- Renaming an English file to make room for Spanish.
- Moving an English file into a Spanish folder.
- Overwriting an English route with an /es/ route.
- Overwriting an English CMS record with Spanish fields.
- Overwriting English seed data with Spanish data.
- Overwriting an English manifest.
- Overwriting English product packages.
- Overwriting English PDFs or zips.
- Overwriting English videos, WebM, MP4, posters, thumbnails, backgrounds, GLB files, images, or Lottie assets.
- Re-encoding an English storefront WebM merely to create Spanish support.
- Changing an English animation timeline to fit Spanish copy without regression evidence.
- Changing No Scroll or PSAVE behavior as part of translation.
- Running a Spanish seed or sync that mutates English records.
- Using a Spanish build output as the default English deployment.
- Rewriting historical English observations or approvals into Spanish.
- Deleting an English source artifact because a Spanish equivalent exists.

If a Spanish artifact appears to require one of these actions, stop, record the issue, and ask the operator for direction.

## Required location model

### Public frontend

English remains in the existing route structure:

- / for the English homepage.
- /browse for English catalog pages.
- /browse/product-slug for English product pages.
- /demo/product-slug for English demos.

Spanish is additive:

- /es/ for the Spanish homepage.
- /es/browse for the Spanish catalog.
- /es/browse/product-slug for Spanish product pages.
- /es/demo/product-slug for Spanish demos.

Existing English route files must remain intact. Spanish route wrappers may import shared components with locale es, but they must not replace English wrappers.

### UI components

Use shared components for layout and behavior where possible. Store locale copy separately:

- copy.en.ts for English.
- copy.es.ts for Spanish.
- dictionaries/en.ts for English UI.
- dictionaries/es.ts for Spanish UI.

If Spanish requires a genuinely different composition, add a separately named Spanish component or folder. Do not convert the English component into a Spanish-only implementation.

### Backend and CMS

English backend behavior is protected:

- English product records remain unchanged.
- English CMS titles and descriptions remain unchanged.
- English seed data remains unchanged.
- English API contracts remain unchanged.
- English auth behavior remains unchanged.
- English entitlement logic remains unchanged.
- English Stripe price IDs remain unchanged.
- English Supabase identifiers remain unchanged.
- English database identifiers remain unchanged.

Spanish may use:

- Additive locale fields.
- Separate Spanish content records keyed to the same product ID.
- Separate Spanish translation tables.
- Locale-aware read selection that falls back to English only when explicitly approved.

A locale-aware read must never write Spanish into the English source record as a side effect.

### Content, MDX, and prompts

English content remains protected in its current location. Spanish long-form content should use an explicit Spanish area such as:

- content/prompts/es/heroes/.
- content/prompts/es/sections/.
- content/prompts/es/landing-pages/.
- content/prompts/es/special/.

Spanish content must retain the same product ID, technical identity, motion mode, media roles, and package relationship unless a separate approved product change exists.

Technical source code may remain shared or English when accurately disclosed. A Spanish product page must not claim that a package is fully Spanish if the source code or core build prompt remains English.

### Demos and cleanrooms

The preferred pattern is:

- Existing English cleanroom folder remains intact.
- Shared animation component remains shared.
- English copy is in copy.en or an English locale object.
- Spanish copy is in copy.es or a Spanish locale object.
- English demo wrapper remains intact.
- Spanish demo wrapper is additive under /es/demo.

If different layout or mechanics are genuinely required, create a separately named Spanish cleanroom folder. Never use Spanish translation as a reason to overwrite the English cleanroom.

All demo changes must preserve:

- No Scroll and pin-until-complete law.
- PSAVE behavior where named.
- Responsive behavior.
- Reduced-motion behavior.
- Cleanup and unmount behavior.
- Existing English motion timing.
- Existing English media roles.

### Lab, research, and raw captures

Lab is not a permission zone for overwriting English. English research, references, raw captures, source media, test notes, and experimental files remain protected.

Spanish work must use one of:

- Lab/product/es/.
- Lab/product-spanish/.
- A separately named Spanish research or rerecording folder.

Future Spanish video production must not replace English raw captures or source films. It must create separate source material and a separate approved asset pipeline entry.

### Public assets and media

The following English roles are protected:

- Client HD.
- Storefront preview.
- Fullscreen preview.
- Thumbnail.
- Poster.
- Background preview.
- Operator screenshot WebM.
- Master.
- Design reference.

Spanish media must use separate names and paths. Existing English videos remain unchanged until a separate rerecording task is approved.

The operator screenshot WebM rule remains mandatory: when the operator provides a Premiere/screenshot WebM, it remains the page, home, browse, and product-page preview for that product and must not be re-encoded to MP4 for that role.

### Packages and archives

English product delivery remains protected:

- public/packages/productId/files/.
- English files zip.
- English package PDF.
- English START-HERE.md.
- English PROMPT.md.
- English CUSTOMIZATION.md.
- English source folder.
- English client assets.

A Spanish package, if approved, must be a separate artifact with:

- Separate language identifier.
- Separate folder or separately identified content tree.
- Separate PDF and zip registry entries where necessary.
- Correct entitlement behavior.
- Correct download behavior.
- Correct language disclosure.
- ZIP root verified.
- No nested useless files wrapper.
- No English package overwritten.
- No Spanish storefront preview leaked into the client package.

The package law in PRODUCT_PACKAGE.md §10 still applies without exception.

### Design and owner archives

English design references, screenshots, owner-design records, capture notes, visual QA evidence, and archived decisions remain protected.

Spanish design work must use separate:

- Spanish screenshots.
- Spanish capture outputs.
- Spanish design references.
- Spanish owner-design records where required.
- Spanish notes or translations.

Do not overwrite an English screenshot or design record with a Spanish version. Add a Spanish variant beside it and link the relationship in the changelog.

### Build, migration, seed, sync, and deployment

Every locale-aware operation must be reviewed for write behavior.

Before running a Spanish build, seed, migration, CMS sync, package generation, or deployment:

- Identify all files and records that can be written.
- Confirm English paths and records are excluded from destructive writes.
- Confirm Spanish destinations are explicit.
- Confirm shared code does not change English output.
- Confirm rollback or recovery is available where practical.
- Run an English regression check after the operation.
- Record evidence in the observations/changelog.

Never assume that a command is safe because its purpose is translation. Verify its write targets.

## Approval law for new motion-site products

Every new motion-site product requires two approvals:

1. Creation approval before implementation.
2. Release approval after English and Spanish implementation and QA.

The creation brief must include:

- Product ID and slug.
- English concept.
- Spanish concept direction.
- Spanish title and short description draft.
- Spanish audience and use case.
- Demo-visible Spanish copy scope.
- Interaction mode.
- No Scroll, scroll narrative, hybrid, or PSAVE status.
- Media-role plan.
- English protected source paths.
- Spanish destination paths.
- Package-language scope.
- Estimated effort.
- Risks and validation method.

The operator must explicitly approve before implementation. Silence does not count.

After the first production pass, complete the existing Phase 12 process, tell the operator the first pass is complete, ask:

> May I run the Platinum Second Revision to make sure that all is perfectly ultra premium?

Only after permission may Phase 13 run. After Phase 13, obtain final Spanish release approval.

## Required artifact relationship record

For each Spanish artifact, record:

- English source path or record ID.
- Spanish destination path or record ID.
- Relationship type: shared runtime, translated copy, separate variant, or separate design.
- Whether the English source was modified.
- If modified, why, who approved it, and how English output was verified.
- Media role, if applicable.
- Package relationship, if applicable.
- Verification URL or test evidence.

No Spanish artifact is considered safely separated until this relationship is recorded.

## Regression and evidence law

Before Spanish release, verify English and Spanish independently.

English checks:

- English homepage.
- English browse.
- English product pages.
- English demos.
- English cleanrooms.
- English prompt content.
- English media paths.
- English product packages.
- English metadata and sitemap.
- English authentication.
- English checkout.
- English downloads.
- English No Scroll and PSAVE behavior.

Spanish checks:

- Spanish homepage.
- Spanish browse.
- Spanish product pages.
- Spanish demos.
- Spanish content files.
- Spanish metadata and sitemap.
- Spanish language switcher.
- Spanish package language disclosure.
- Spanish authentication and checkout copy.
- Spanish mobile layout.
- Spanish accessibility.

HTTP 200 alone is not sufficient. Also verify rendered content, hydration, console errors, media loading, layout, interaction, and language correctness.

## Backup and restoration law

English protection and Spanish separation are not enforceable if the rollback material is incomplete. Before Spanish implementation or a shared-code refactor begins, the project must have a restorable remote checkpoint containing English source, content, prompts, demos, cleanrooms, Lab references, design records, public media, every duplicate video path, package-embedded media, product archives, and any temporary, test, capture, research, client, storefront, background, or generated copy required to reconstruct or diagnose the site.

GitHub must use normal Git only for this site. Do not add Git LFS, LFS pointers, or large media/archive binaries to the site repository. All large videos, archives, and other large binaries belong in the approved Google Drive backup. Nested repositories and submodules require separate verification; a gitlink is not a copy of the nested files. If the current identity cannot push a nested repository, its required files must be copied or archived in Google Drive, with the original paths and extraction procedure recorded.

Required evidence is the remote repository, branch, normal-Git commit, Google Drive path, Drive download verification, archive checksum, inventory count, and clean restoration test. Any exception must be marked `[BLOCKED]` or `[VALIDATION NEEDED]`, reported to the operator, and recorded in `SPANISH_PROPOSAL_OBSERVATIONS_AND_CHANGELOG.md`. No document, agent, or implementation may claim the project is safely backed up while this evidence is missing.

## Observation and changelog law

Every material finding must be recorded in SPANISH_PROPOSAL_OBSERVATIONS_AND_CHANGELOG.md.

Record:

- What was inspected.
- What was found.
- Evidence.
- Severity.
- Status.
- User impact.
- Business impact.
- Technical impact.
- Primary failure mode.
- Secondary risks.
- Dependency chain.
- Counterargument.
- False-positive risk.
- Recommended action.
- Operator approval.
- Fix status.
- Verification.
- Follow-up.

Do not delete historical observations. Append status changes.

## Final law summary

- English is default.
- English is canonical.
- English is protected.
- Spanish is additive.
- Spanish has explicit locations.
- Spanish never overwrites English.
- Shared runtime code is allowed only when English behavior is preserved.
- Shared data is allowed only when English values are preserved.
- English packages and media remain intact.
- Spanish packages and media are separate approved artifacts.
- Lab and design archives remain separated.
- Builds and syncs must be write-target audited.
- Every new motion-site product requires creation approval and release approval.
- Every production post still requires the existing Platinum Second Revision permission.
- Every material finding is recorded.
- Every claimed fix requires verification.
