# Spanish Proposal — Observations and Changelog

This document is the durable evidence log for the ClickMotion Spanish localization proposal and implementation.

It records:

- What was inspected.
- What was found.
- What was changed.
- What was not changed.
- What was fixed.
- What remains open.
- What is out of scope.
- What requires operator approval.
- What should be revisited later.
- What errors were reported to the operator.
- Whether each error was fixed, deferred, rejected, or remains unresolved.

This file is not a substitute for the production checklist, product package law, asset pipeline, Product Law, quality checklist, or Platinum Second Revision. It is the evidence and continuity log connecting those documents to actual work.

## Operating rules

1. Do not silently fix an error discovered during unrelated work.
2. When an error is found, record it here before or immediately after reporting it to the operator.
3. Ask the operator whether they want the error fixed right away when the error is outside the current approved task.
4. If the operator approves an immediate fix, record the approval, fix, verification, and final status here.
5. If the operator declines or defers a fix, record that decision and do not fix it.
6. If the error is inside the approved task, it may be fixed as part of that task, but it must still be recorded.
7. Never claim that an item is fixed without verification evidence.
8. Never remove an observation because it was inconvenient, out of scope, or later superseded. Append a new status update instead.
9. Preserve historical entries. Corrections should be appended with the date and reason.
10. Distinguish facts from assumptions.
11. Use [ASSUMPTION], [CONFIDENCE: X%], [VALIDATION NEEDED], [TRADE-OFF], and [COMPLIANCE RISK] labels where appropriate.
12. Do not use this log to authorize publication, sale, or status changes.
13. For every new motion-site product, record Spanish creation approval before implementation and Spanish release approval before publication or sale.
14. Existing videos remain unchanged unless the operator separately authorizes rerecording or media replacement.
15. No Scroll and PSAVE behavior must be evaluated using docs/PRODUCT_LAW.md and docs/PSAVE.md, not memory or visual preference.
16. English is the protected canonical default. Spanish is additive and must be stored in the Spanish section. Never overwrite or silently change English demos, prompts, videos, products, packages, routes, assets, or other material.
17. Record English source paths and protected artifacts before each Spanish creation task.
18. Run an English regression matrix after shared-code or shared-data changes.

## Status vocabulary

- OPEN — Known issue or unfinished work remains.
- FIXED — Change was made and verified.
- DEFERRED — Deliberately postponed by operator decision.
- OUT OF SCOPE — Not part of the approved task, with a reason recorded.
- BLOCKED — Cannot proceed without external state, access, decision, or dependency.
- WATCH — Not currently an error, but requires future observation.
- SUPERSEDED — Replaced by a newer decision or implementation; retain the historical entry.
- NEEDS APPROVAL — Requires operator direction before action.

## Required observation entry format

Every material finding should use this structure:

    OBS-YYYY-MM-DD-NNN — Short title

    - Date discovered:
    - Area:
    - Source/evidence:
    - Observation:
    - Classification: bug / risk / improvement / decision / out-of-scope / question
    - Severity: critical / high / medium / low / informational
    - Status:
    - User impact:
    - Business impact:
    - Technical impact:
    - Primary failure mode:
    - Secondary risks:
    - Dependency chain:
    - Counterargument:
    - False-positive risk:
    - Recommended next action:
    - Operator approval required: yes/no
    - Operator decision:
    - Fix performed:
    - Verification evidence:
    - Related documents:
    - Follow-up date or trigger:

Do not create vague entries such as “translation issue” without identifying the page, component, route, evidence, and consequence.

## Current project baseline

### OBS-2026-08-19-001 — Initial ClickMotion site review

- Date discovered: 2026-08-19
- Area: project context and architecture
- Source/evidence: local project inspection at E:/Products/MS
- Observation: ClickMotion is a Next.js application with marketing pages, browse/catalog pages, product pages, many cleanroom/demo routes, CMS/admin routes, API routes, product packages, public media, prompt content, and production documentation.
- Classification: observation
- Severity: informational
- Status: FIXED as documentation/context capture
- User impact: establishes the current system scope.
- Business impact: Spanish localization affects storefront, demos, product content, metadata, and future product creation.
- Technical impact: localization should use shared code and localized content rather than a duplicated application.
- Primary failure mode: a manually duplicated English and Spanish site drifts over time.
- Secondary risks: mixed-language UI, broken route mappings, inconsistent metadata, translation drift, and duplicated maintenance.
- Dependency chain: locale architecture before bulk translation; locale-aware product content; QA for both locales.
- Counterargument: a smaller translation-only pass could launch sooner.
- False-positive risk: Spanish pageviews could increase without comprehension, sign-ups, product engagement, or sales.
- Recommended next action: implement and validate one complete Spanish vertical slice before translating the full catalog.
- Operator approval required: yes for implementation
- Operator decision: pending future implementation approval
- Fix performed: none
- Verification evidence: route tree, source structure, product registry, content, and demo inventory were inspected.
- Related documents: SPANISH_LOCALIZATION_PROPOSAL.md; SPANISH_LOCALIZATION_CHECKLIST.md; AGENTS.md; docs/PRODUCT_LAW.md; docs/ASSET_PIPELINE.md
- Follow-up date or trigger: before Spanish implementation begins

### OBS-2026-08-19-002 — No established localization system found

- Date discovered: 2026-08-19
- Area: internationalization
- Source/evidence: search for next-intl, i18n, locale, locales, language, and Spanish implementation signals in source and configuration.
- Observation: no established production localization system was identified.
- Classification: architecture gap
- Severity: high
- Status: OPEN
- User impact: Spanish cannot yet be maintained safely as a first-class version.
- Business impact: starting translation before the foundation increases rework and translation drift.
- Technical impact: many strings need extraction into typed dictionaries or locale-aware content modules.
- Primary failure mode: Spanish is added through scattered conditionals and duplicated routes.
- Secondary risks: missing translations, inconsistent switcher behavior, poor SEO, and inaccessible English leftovers.
- Dependency chain: locale model, route mapping, dictionaries, metadata helpers, and validation must precede bulk translation.
- Counterargument: translating a few pages manually could validate demand.
- False-positive risk: a successful homepage translation could conceal catalog and demo architecture problems.
- Recommended next action: implement a small localization spike and one complete vertical slice.
- Operator approval required: yes
- Operator decision: pending
- Fix performed: none
- Verification evidence: source search did not identify a localization package or established locale dictionary.
- Related documents: SPANISH_LOCALIZATION_PROPOSAL.md; SPANISH_LOCALIZATION_CHECKLIST.md Phase 2
- Follow-up date or trigger: approved localization implementation

### OBS-2026-08-19-003 — Hard-coded user-visible copy exists

- Date discovered: 2026-08-19
- Area: UI and content architecture
- Source/evidence: inspection of src/app and src/components, including Header, Footer, gallery, product, pricing, auth, demo, and metadata files.
- Observation: substantial user-visible strings, accessibility labels, placeholders, metadata, and demo copy are embedded directly in TSX and route files.
- Classification: architecture gap
- Severity: high
- Status: OPEN
- User impact: incomplete extraction would leave mixed English and Spanish surfaces.
- Business impact: translation quality and maintenance cost would degrade as more products are added.
- Technical impact: copy must be extracted into typed dictionaries and locale-aware product/demo modules.
- Primary failure mode: only obvious marketing headlines are translated while errors, labels, controls, metadata, and accessibility text remain English.
- Secondary risks: text overflow, timing mismatch, and inconsistent terminology.
- Dependency chain: inventory, terminology decisions, copy extraction, translation review, and visual QA.
- Counterargument: hard-coded copy can be translated one file at a time.
- False-positive risk: screenshots may appear translated while less-visible states remain English.
- Recommended next action: create the translation inventory required by the Spanish checklist.
- Operator approval required: yes before broad edits
- Operator decision: pending
- Fix performed: none
- Verification evidence: representative hard-coded labels and metadata were found in source files.
- Related documents: SPANISH_LOCALIZATION_CHECKLIST.md Phase 1; docs/BRAND.md; docs/QUALITY_CHECKLIST.md
- Follow-up date or trigger: before translating the catalog

### OBS-2026-08-19-004 — Demo inventory is large

- Date discovered: 2026-08-19
- Area: demos and cleanrooms
- Source/evidence: route and directory inventory
- Observation: the project contains approximately 74 demo routes and 71 cleanroom/demo directories.
- Classification: planning observation
- Severity: high
- Status: WATCH
- User impact: translating every demo at once may delay the first useful Spanish launch.
- Business impact: social distribution should prioritize high-value demos rather than wait for the entire long tail.
- Technical impact: demo copy extraction must be reusable and must not duplicate animation engines.
- Primary failure mode: full-catalog translation becomes a large unvalidated batch.
- Secondary risks: inconsistent Spanish quality, broken motion timing, and mobile overflow.
- Dependency chain: flagship selection, copy modules, vertical-slice QA, then catalog expansion.
- Counterargument: a complete launch may appear more premium than a staged release.
- False-positive risk: many translated demo routes may exist but receive little meaningful engagement.
- Recommended next action: start with Tier 1 social flagships and highest-value products.
- Operator approval required: yes for priority order
- Operator decision: pending
- Fix performed: none
- Verification evidence: route and cleanroom counts from local project inspection.
- Related documents: SPANISH_LOCALIZATION_PROPOSAL.md Demo strategy; SPANISH_LOCALIZATION_CHECKLIST.md Phase 7
- Follow-up date or trigger: before demo translation begins

### OBS-2026-08-19-005 — Existing videos intentionally remain unchanged

- Date discovered: 2026-08-19
- Area: media pipeline
- Source/evidence: operator instruction in conversation
- Observation: existing demo videos remain as they are. The operator will rerecord them later or request help with rerecording.
- Classification: approved scope decision
- Severity: high
- Status: FIXED as scope documentation
- User impact: Spanish pages may initially surround English-language videos.
- Business impact: Spanish social distribution can begin before Spanish rerecording, but copy must not imply videos are Spanish.
- Technical impact: existing media roles, filenames, WebM/MP4 assignments, client media, storefront previews, posters, and thumbnails must remain stable.
- Primary failure mode: localization work silently replaces, renames, or re-encodes existing media.
- Secondary risks: broken product previews, role leakage, stale registries, and package mismatch.
- Dependency chain: future rerecording requires a separate approved asset plan.
- Counterargument: replacing media immediately could create a more complete Spanish impression.
- False-positive risk: a Spanish page may be assumed to have Spanish video content simply because surrounding copy is Spanish.
- Recommended next action: preserve media and add an explicit language note where needed.
- Operator approval required: no for preservation; yes for future media changes
- Operator decision: existing media remains unchanged
- Fix performed: none required
- Verification evidence: no media was modified during this documentation task.
- Related documents: docs/ASSET_PIPELINE.md; docs/PRODUCT_PACKAGE.md §10; docs/PRODUCT_LAW.md
- Follow-up date or trigger: future Spanish rerecording request

### OBS-2026-08-19-006 — English-default and /es/ route decision

- Date discovered: 2026-08-19
- Area: routing and SEO
- Source/evidence: operator instruction in conversation
- Observation: English remains default; Spanish uses /es/; only a restrained ES/EN chip is added beside Unlimited Power.
- Classification: approved scope decision
- Severity: high
- Status: FIXED as architecture documentation
- User impact: visitors can switch language without losing the equivalent page.
- Business impact: English links remain stable while Spanish pages become shareable and indexable.
- Technical impact: route mapping, metadata, canonical URLs, hreflang, and sitemap entries are required.
- Primary failure mode: Spanish pages are created without stable one-to-one route mapping.
- Secondary risks: redirect loops, duplicate SEO content, broken product/demo links, and lost query parameters.
- Dependency chain: locale resolver, route helpers, metadata, sitemap, switcher, and route tests.
- Counterargument: a query-parameter locale could be simpler.
- False-positive risk: the switcher works on the homepage but fails on product, demo, collection, filtered, or error routes.
- Recommended next action: implement route mapping and test an equivalent English/Spanish vertical slice.
- Operator approval required: no for the direction; yes for implementation
- Operator decision: approved direction
- Fix performed: none; planning only
- Verification evidence: proposal and checklist created with route contract.
- Related documents: SPANISH_LOCALIZATION_PROPOSAL.md; SPANISH_LOCALIZATION_CHECKLIST.md Phases 0 and 2
- Follow-up date or trigger: localization implementation

### OBS-2026-08-19-007 — Existing route smoke issue: robots.txt returns 500

- Date discovered: 2026-08-19
- Area: SEO and technical health
- Source/evidence: local smoke test against http://localhost:3004/robots.txt
- Observation: homepage, browse page, product page, and selected demos returned HTTP 200, but /robots.txt returned HTTP 500.
- Classification: bug
- Severity: high
- Status: NEEDS APPROVAL
- User impact: crawler policy may be unavailable or inaccessible.
- Business impact: SEO and AI-crawler behavior may be affected.
- Technical impact: route implementation or runtime environment needs diagnosis.
- Primary failure mode: publishing while robots.txt is failing.
- Secondary risks: incorrect crawl behavior, indexing delays, and loss of confidence in release smoke tests.
- Dependency chain: reproduce, inspect runtime error, determine whether environment-only or code-level, fix if approved, re-smoke sitemap and robots.
- Counterargument: failure may be caused by local environment configuration rather than production code.
- False-positive risk: fixing local behavior without understanding production behavior could create an unnecessary change.
- Recommended next action: ask operator whether to diagnose and fix this now.
- Operator approval required: yes
- Operator decision: pending
- Fix performed: none
- Verification evidence: Invoke-WebRequest to http://localhost:3004/robots.txt returned HTTP 500 during the initial site review.
- Related documents: docs/AEO_LLM_GROWTH.md; src/app/robots.ts; SPANISH_LOCALIZATION_CHECKLIST.md Phases 8 and 11
- Follow-up date or trigger: operator approval to investigate

### OBS-2026-08-19-008 — Existing typecheck issue

- Date discovered: 2026-08-19
- Area: engineering quality
- Source/evidence: npm run typecheck
- Observation: TypeScript reported an unused @ts-expect-error directive at cleanroom/acne-from-prompt/AcneSecretHero.tsx line 227.
- Classification: bug
- Severity: medium
- Status: NEEDS APPROVAL
- User impact: project typecheck is not green.
- Business impact: an unclean machine gate increases regression risk before localization work.
- Technical impact: the directive should be verified against current code and either removed or justified without hiding a real type error.
- Primary failure mode: removing the directive without checking the underlying type contract.
- Secondary risks: unrelated cleanup, changed behavior, or masking a different TypeScript issue.
- Dependency chain: inspect line 227 and surrounding types, make the smallest approved fix, rerun typecheck.
- Counterargument: this may be unrelated to Spanish localization and can be deferred.
- False-positive risk: a green typecheck could create false confidence if lint, tests, assets, or route smoke still fail.
- Recommended next action: ask operator whether to fix now or record in technical backlog.
- Operator approval required: yes
- Operator decision: pending
- Fix performed: none
- Verification evidence: npm run typecheck reported TS2578 at cleanroom/acne-from-prompt/AcneSecretHero.tsx(227,7).
- Related documents: docs/QUALITY_CHECKLIST.md; docs/PRODUCTION_READY_CHECKLIST.md Phase 10; SPANISH_LOCALIZATION_CHECKLIST.md Phase 11
- Follow-up date or trigger: operator approval to investigate

### OBS-2026-08-19-009 — Existing route smoke successes

- Date discovered: 2026-08-19
- Area: local runtime
- Source/evidence: HTTP smoke test on port 3004
- Observation: /, /browse, /browse/MS-HERO-ELYS01, /demo/cleanroom-elyse, /demo/scroll-narrative, and /sitemap.xml returned HTTP 200 during the initial review.
- Classification: verification record
- Severity: informational
- Status: WATCH
- User impact: selected English surfaces were reachable during review.
- Business impact: this provides a baseline for future English/Spanish route comparison.
- Technical impact: this is not a complete route or browser QA pass.
- Primary failure mode: assuming selected 200 responses prove the entire site is healthy.
- Secondary risks: untested routes, client-side errors, mobile issues, media failures, and auth/commerce failures.
- Dependency chain: complete route matrix, browser QA, asset checks, and machine gates.
- Counterargument: a small smoke set may be enough for planning.
- False-positive risk: HTTP 200 can hide rendering, hydration, visual, or interaction defects.
- Recommended next action: use this as baseline evidence, not release evidence.
- Operator approval required: no for recording; yes for broad repair work
- Operator decision: not applicable
- Fix performed: none
- Verification evidence: local HTTP responses recorded during initial site review.
- Related documents: docs/QUALITY_CHECKLIST.md; SPANISH_LOCALIZATION_CHECKLIST.md Phase 11
- Follow-up date or trigger: before Spanish launch

### OBS-2026-08-20-010 — English protection needed to be made stricter

- Date discovered: 2026-08-20
- Area: Spanish proposal and source-of-truth protection
- Source/evidence: operator review of the proposal and checklist
- Observation: the existing proposal clearly required English-default routing and unchanged existing videos, but it did not state strongly enough that every English demo, prompt, product, route, asset, package, and source artifact is protected from overwrite or silent mutation.
- Classification: documentation gap
- Severity: critical
- Status: FIXED
- User impact: prevents accidental English regression while building Spanish.
- Business impact: preserves the canonical English product and avoids duplicating or corrupting the commercial catalog.
- Technical impact: Spanish must be additive under /es/, Spanish content directories, or clearly named locale copy modules.
- Primary failure mode: translating in place changes the default English experience.
- Secondary risks: overwritten videos, stale packages, broken product IDs, mixed-language routes, and untraceable content drift.
- Dependency chain: protected source inventory, additive Spanish structure, English regression matrix, and changelog evidence.
- Counterargument: shared locale fields may be simpler than separate files.
- False-positive risk: English appears unchanged in a homepage screenshot while a product page, package, demo, or asset was changed.
- Recommended next action: apply the strict English immutability law to every localization task.
- Operator approval required: no; operator explicitly ordered this rule
- Operator decision: approved strict order
- Fix performed: strengthened AGENTS.md, SPANISH_LOCALIZATION_PROPOSAL.md, and SPANISH_LOCALIZATION_CHECKLIST.md.
- Verification evidence: required invariant and protected-artifact checklist added to all three documents.
- Related documents: AGENTS.md; SPANISH_LOCALIZATION_PROPOSAL.md; SPANISH_LOCALIZATION_CHECKLIST.md
- Follow-up date or trigger: before every Spanish product creation

### OBS-2026-08-20-011 — robots.txt conflict diagnosis

- Date discovered: 2026-08-20
- Area: SEO and technical health
- Source/evidence: HTTP response body from http://localhost:3004/robots.txt
- Observation: Next.js reported a conflicting public file and page file for /robots.txt because both public/robots.txt and src/app/robots.ts existed.
- Classification: bug
- Severity: high
- Status: FIXED
- User impact: /robots.txt was returning HTTP 500.
- Business impact: crawler policy and sitemap discovery could be affected.
- Technical impact: Next.js cannot serve both the static public file and the MetadataRoute page at the same path.
- Primary failure mode: leaving the conflict in place and publishing with a broken robots endpoint.
- Secondary risks: SEO indexing inconsistency and failed technical smoke tests.
- Dependency chain: preserve the more complete static policy, remove the conflicting dynamic route, then re-smoke robots, llms, and sitemap endpoints.
- Counterargument: the dynamic route could be preferred if it were the only source and contained the complete policy.
- False-positive risk: an HTTP 200 response without reviewing the actual directives.
- Recommended next action: use public/robots.txt as the canonical static policy and keep llms.txt files as separate machine-readable resources.
- Operator approval required: no; operator authorized the fix
- Operator decision: fix immediately
- Fix performed: removed src/app/robots.ts; preserved public/robots.txt.
- Verification evidence: after removal, /robots.txt returned HTTP 200 with the preserved static policy; /llm.txt returned 200; /llms.txt returned 200; /llms-full.txt returned 200; /sitemap.xml returned 200.
- Related documents: public/robots.txt; src/app/robots.ts; docs/AEO_LLM_GROWTH.md; SPANISH_LOCALIZATION_CHECKLIST.md Phases 8 and 11
- Follow-up date or trigger: immediately after dev server recompilation

### OBS-2026-08-20-012 — llms.txt is not a replacement for robots.txt

- Date discovered: 2026-08-20
- Area: AI discoverability and crawler protocol
- Source/evidence: public/llm.txt, public/llms.txt, public/llms-full.txt, and public/robots.txt
- Observation: the project has llm.txt, llms.txt, and llms-full.txt machine-readable content files. These provide AI/agent-facing site information but do not replace the standard robots.txt crawl-policy endpoint.
- Classification: protocol observation
- Severity: medium
- Status: FIXED as documentation
- User impact: agents and crawlers can use the appropriate resource for the appropriate purpose.
- Business impact: maintaining both protocols supports conventional crawler policy and AI-readable site context.
- Technical impact: robots.txt should define crawl rules and sitemap location; llms.txt files should describe the site/catalog for agents.
- Primary failure mode: treating llms.txt as a substitute for robots.txt.
- Secondary risks: missing crawl directives, poor sitemap discovery, and inconsistent AI/site documentation.
- Dependency chain: robots endpoint must return 200; llms endpoints must return 200; content should stay aligned with current public catalog.
- Counterargument: not every crawler uses llms.txt.
- False-positive risk: an llms.txt 200 response may be mistaken for successful robots policy.
- Recommended next action: keep both; validate robots.txt, llms.txt, llms-full.txt, and sitemap.xml independently.
- Operator approval required: no for the protocol decision
- Operator decision: keep both protocols
- Fix performed: no content change required.
- Verification evidence: llms.txt and llms-full.txt returned HTTP 200 during review; robots conflict was separately diagnosed.
- Related documents: public/robots.txt; public/llm.txt; public/llms.txt; public/llms-full.txt; docs/AEO_LLM_GROWTH.md
- Follow-up date or trigger: after catalog or locale changes

## Documentation changes already made

### CHG-2026-08-19-001 — Added Spanish localization law to AGENTS.md

- Date: 2026-08-19
- File: AGENTS.md
- Status: FIXED
- Change: appended detailed Spanish localization rules, /es/ route requirements, per-product creation and release approvals, media rules, demo rules, package rules, SEO requirements, QA gates, and document cross-references.
- Existing content deleted: none.
- Verification: required markers and Spanish checklist sections were confirmed in AGENTS.md.

### CHG-2026-08-19-002 — Created Spanish localization proposal

- Date: 2026-08-19
- File: docs/SPANISH_LOCALIZATION_PROPOSAL.md
- Status: FIXED
- Change: created durable proposal covering scope, architecture, translation boundary, demo strategy, video policy, SEO, risks, alternatives, launch sequence, resources, and references.
- Existing content deleted: none.
- Verification: file exists and contains proposal headings and references.

### CHG-2026-08-19-003 — Created Spanish localization checklist

- Date: 2026-08-19
- File: docs/SPANISH_LOCALIZATION_CHECKLIST.md
- Status: FIXED
- Change: created durable phased checklist covering localization, content, demos, media, SEO, commerce, QA, metrics, per-product approval, Platinum permission, and release gates.
- Existing content deleted: none.
- Verification: file exists and contains Phases 0–13 and the final release gate.

### CHG-2026-08-19-004 — Created observations and changelog

- Date: 2026-08-19
- File: docs/SPANISH_PROPOSAL_OBSERVATIONS_AND_CHANGELOG.md
- Status: FIXED
- Change: created this durable evidence log and recorded known baseline observations, errors, decisions, and documentation changes.
- Existing content deleted: none.
- Verification: file exists and is the current source for Spanish-project observations and status history.

### CHG-2026-08-20-005 — Enforced strict English protection

- Date: 2026-08-20
- Files: AGENTS.md; docs/SPANISH_LOCALIZATION_PROPOSAL.md; docs/SPANISH_LOCALIZATION_CHECKLIST.md
- Status: FIXED
- Change: added the strict invariant that English is the canonical protected default and Spanish is an additive copy in the Spanish section. Added protection rules for demos, prompts, routes, assets, videos, packages, PDFs, zips, metadata, and source files, plus English regression requirements.
- Existing content deleted: none.
- Operator approval: explicitly ordered by operator.
- Verification: protected-artifact rules and checklist entries were added.
- Related observations: OBS-2026-08-20-010

### CHG-2026-08-20-006 — Fixed robots.txt route conflict

- Date: 2026-08-20
- Files: src/app/robots.ts removed; public/robots.txt preserved.
- Status: FIXED
- Change: removed the conflicting dynamic MetadataRoute so the existing, more complete static public/robots.txt can serve /robots.txt.
- Existing content deleted: src/app/robots.ts was removed because it conflicted with public/robots.txt at the same URL.
- Operator approval: operator authorized immediate fix.
- Verification: /robots.txt, /llm.txt, /llms.txt, /llms-full.txt, and /sitemap.xml all returned HTTP 200 after recompilation.
- Related observations: OBS-2026-08-20-011 and OBS-2026-08-20-012

### CHG-2026-08-20-007 — Typed optional capture globals

- Date: 2026-08-20
- Files: src/types/capture-globals.d.ts; cleanroom/acne-from-prompt/AcneSecretHero.tsx
- Status: FIXED
- Change: added a shared Window declaration for the optional capture clock and Acne QA dock flag, then removed the stale local ts-expect-error suppressions.
- Existing content deleted: only the two obsolete suppression comments; no English product behavior or media was deleted.
- Operator approval: operator authorized the TypeScript fix.
- Verification: npm run typecheck completed successfully with exit code 0.
- Related observations: OBS-2026-08-19-008

### CHG-2026-08-20-008 — Created canonical English-Spanish Law

- Date: 2026-08-20
- Files: docs/English-Spanish-Law.md; docs/SPANISH_LOCALIZATION_PROPOSAL.md; docs/SPANISH_LOCALIZATION_CHECKLIST.md; AGENTS.md
- Status: FIXED
- Change: added the complete English/Spanish separation law across frontend, backend, CMS, MDX, prompts, demos, cleanrooms, Lab, public assets, packages, archives, design areas, build/sync/deployment operations, approvals, artifact relationships, and regression evidence.
- Existing content deleted: none.
- Operator approval: explicitly ordered by operator.
- Verification: the proposal and checklist now link to the canonical law and include the full area map and separation requirements.
- Related observations: OBS-2026-08-20-010

## Open operator questions

1. Do you want the /robots.txt HTTP 500 diagnosed and fixed now?
2. Do you want the unused @ts-expect-error typecheck issue diagnosed and fixed now?
3. Which Spanish package scope is approved for Release 1: storefront only, storefront plus buyer documentation, or fully translated packages?
4. Which Tier 1 demos should be translated first for social distribution?
5. Who will provide final native Spanish editorial review?
6. Should Spanish analytics be added before the first vertical slice or during the first slice?
7. What is the approved Spanish regional voice: neutral Latin American Spanish with Mexican compatibility, or another target?

## Future observation areas

These are not currently confirmed errors. They must be checked when implementation begins:

- [ ] Mixed English/Spanish text in global chrome.
- [ ] Missing Spanish translations in loading, error, empty, auth, and checkout states.
- [ ] Broken route equivalence for product, demo, collection, background, and filtered pages.
- [ ] Incorrect canonical or hreflang metadata.
- [ ] Spanish sitemap omissions.
- [ ] Spanish layout overflow on mobile.
- [ ] Spanish copy colliding with motion or timing.
- [ ] Accessibility labels remaining in English.
- [ ] Product package language being represented inaccurately.
- [ ] Media-role leakage between storefront, client, thumbnail, poster, fullscreen, and background assets.
- [ ] No Scroll behavior being changed during localization.
- [ ] PSAVE behavior being changed during localization.
- [ ] English route regressions after locale work.
- [ ] Existing videos being changed without approval.
- [ ] Checkout, entitlement, authentication, or download regressions.
- [ ] Performance regressions between English and Spanish.
- [ ] Translation drift after new products are added.
- [ ] Spanish social traffic producing views without meaningful product actions.

## Change log template for future entries

Copy this template for every material observation or change:

### OBS-YYYY-MM-DD-NNN — Title

- Date discovered:
- Area:
- Source/evidence:
- Observation:
- Classification:
- Severity:
- Status:
- User impact:
- Business impact:
- Technical impact:
- Primary failure mode:
- Secondary risks:
- Dependency chain:
- Counterargument:
- False-positive risk:
- Recommended next action:
- Operator approval required:
- Operator decision:
- Fix performed:
- Verification evidence:
- Related documents:
- Follow-up date or trigger:

### CHG-YYYY-MM-DD-NNN — Title

- Date:
- Files:
- Status:
- Change:
- Existing content deleted:
- Operator approval:
- Verification:
- Related observations:

## Release-log rule

Before any Spanish product is published or presented as complete, this document must contain:

- The approved Spanish creation brief.
- The product scope and deferred items.
- The relevant implementation changes.
- The QA evidence.
- Any open errors and their operator decisions.
- The media-role confirmation.
- The package-language confirmation.
- The Phase 12 first-pass status.
- The required Platinum Second Revision request.
- The Phase 13 result after permission.
- The final Spanish release approval.

Do not claim “Spanish complete,” “production ready,” “sale ready,” or “ultra-premium complete” based on this log alone. Use the applicable production documents and obtain the required operator approvals.
