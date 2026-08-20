# Sections quality gate

Run this before calling a sidecar plan (and later a SKU) “real.” If any **Fail** fires, it is not ClickMotion.

## Authority (must all pass)

- [ ] A veteran designer would ship this on a real brand, not a template farm
- [ ] One named famous-UI craft direction (not “modern SaaS glass”)
- [ ] One signature motion that *is* the layout, with numbers (duration, ease, spring, scrub)
- [ ] `prefers-reduced-motion` fallback specified
- [ ] Type, color, radius, spacing come from a token theme id, not a random Inter + indigo stack
- [ ] Design language id is one of the V1 eight
- [ ] Motion primitive id exists in `libraries/motion-primitives.json`
- [ ] `compatibleWith` lists at least one live hero or section
- [ ] Would **not** be mistaken for Magic UI / v0 / Lovable default bento

## Instant fail

- [ ] Purple, violet, or neon-green mesh / aurora as the identity
- [ ] Shiny gradient H1 as the brand
- [ ] Pill dock + glass cards + marquee logos as the whole section
- [ ] Unquantified “add some Framer Motion”
- [ ] Copied composition from shadcnblocks / Magic UI Pro / Oxygen / Amicro
- [ ] Em dash in buyer-facing copy
- [ ] “Wow / stunning / next-level” in storefront description (Helix copy law)

## Motion

- [ ] Engine named: Motion, GSAP, CSS, or WebGL (honest)
- [ ] If scroll-narrative or hybrid-with-scroll: pin-until-complete
- [ ] Hover/pointer craft recorded as a behavior, not a CSS wiggle only
- [ ] Public preview is a muted video that shows the signature play (not a live public sandbox)
- [ ] Performance budget noted (no stacked particle + globe + video)

## Prompt completeness (when authoring MDX later)

- [ ] Design System, Layout, Slots, Motion spec, Responsive, A11y, Performance, AI tool instructions, Expected output
- [ ] Buyer can rebuild from the prompt alone (PRODUCT_LAW proof loop)
- [ ] Anti-slop hard ban paragraph present (Helix pattern)

## Visual pass (mandatory, live Chrome)

A section is **not GOLDEN** until [`VISUAL_PASS.md`](./VISUAL_PASS.md) has been run on the operator demo: full journey, DevTools, defect list, fix, re-check, loop to zero defects.

- [ ] Pass loop executed (not code-only)
- [ ] Desktop and mobile frames checked
- [ ] Pin / clicks / reduced-motion verified
- [ ] Console clean
- [ ] Zero open visual defects

## Packaging (only after integration / ship)

Use live checklists: `docs/SHIP_FOR_SALE.md`, `docs/PRODUCTION_READY_CHECKLIST.md`, Platinum Second Revision. Sidecar does not skip those when a SKU goes to production.
