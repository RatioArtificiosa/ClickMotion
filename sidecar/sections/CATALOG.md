# Sections catalog (V1)

Coverage of a real landing page under existing ClickMotion heroes. Quality over count.

## V1 kinds to author (page completion)

| Kind id | Code | What it is | Signature motion (examples, pick one) |
|---------|------|------------|----------------------------------------|
| `features` | FEAT | Capabilities / bento / editorial feature board | staged pin, magnetic cards, paper layers. Wow plant: Kern, Kiln, Cast, Optic, Nix, Quill, Pike |
| `pricing` | PRIC | Plans / recommended tier | magnetic recommended, height morph, tally. Wow plant: Cairn (`MS-SEC-PRIC02`, wax-seal), Gilda (`MS-SEC-PRIC03`, stack-shuffle), Dune (`MS-SEC-PRIC04`, vitrine-sweep) |
| `testimonials` | TEST | Quotes / faces / proof | slow pan, card takeover, type breathe. Wow plant: Port (`MS-SEC-TEST02`, spotlight-park), Nori (`MS-SEC-TEST03`, jelly-morph), Reel (`MS-SEC-TEST04`, polaroid-develop) |
| `stats` | STAT | Metrics / proof numbers | counted reveal tied to scroll, not a ticker kit. Wow plant: Press (`MS-SEC-STAT02`, scale-crash), Pearl (`MS-SEC-STAT03`, sequin-burst), Bolt (`MS-SEC-STAT04`, duotone-knockout) |
| `faq` | FAQS | Questions | height-stage accordion, typographic open. Wow plant: Veil (`MS-SEC-FAQS02`, perfume-haze), Helm (`MS-SEC-FAQS03`, crop-punch), Slip (`MS-SEC-FAQS04`, mercury-morph) |
| `cta` | CTAS | Waitlist / close | magnetic CTA, hold-to-confirm, curtain. Wow plant: Rouge, Facet, Mark, Heat, Tilt, Sol |
| `contact` | CONT | Form / booking | field focus motion, Phobia-level craft if playful. Wow plant: Ember (`MS-SEC-CONT02`, lacquer-pour), Holt (`MS-SEC-CONT03`, magnet-snap), Reed (`MS-SEC-CONT04`, chromatic-slip) |
| `footer` | FOOT | Site close | Dopamine-class completeness, not a link dump. Plant gold: Clear (`MS-SEC-FOOT01`, desk-ink). Wow: Brine (`MS-SEC-FOOT02`, neon-ignite), Vesper (`MS-SEC-FOOT03`, velvet-crush) |

Existing live kinds (do not re-author here): `gallery-helix`, `folio-pivot`, `lineup`, `studio-sequence`, `phobia-forms`, `footer-dopamine`.

**V1 SKU target after integration:** 24–40 finished sections across these kinds, not 400 components. **First gold SKU: LEDGER (`MS-SEC-PRIC01`)** - pin-until-complete print pricing board. Operator demo `/demo/cleanroom-ledger`. Not for sale until the operator opens integration.

## Eight design languages (V1)

| id | Famous craft (inspiration) | Use when | Default? |
|----|----------------------------|----------|----------|
| `liquid-glass` | Apple HIG / visionOS materials | Prism, Folio-adjacent luxury tech | No (intentional special) |
| `material-you` | Android Material 3 tonal surfaces | Playful-serious product, dynamic color | No |
| `luxury-editorial` | SSENSE / magazine / Helix board | Fashion, studio, proof of craft | Yes for agency/fashion |
| `swiss-minimal` | Modernist grid, Apple.com marketing | Restraint, hardware, clarity | Yes for corporate |
| `dark-cinematic` | Film still, Lumina, Meridian night | Story, residence, cinema | Yes for cinematic heroes |
| `calm-fintech` | Stripe, Linear, Axiom, Orbit | Trust, money, density | Yes for fintech/SaaS ops |
| `organic` | Aether, STILL, BLOOM, Elyse | Wellness, body, quiet | Yes for health/travel calm |
| `brutalist` | Vertex Security, industrial infra | Hard edges, mono, sparse | No as house default |

`gradient-mesh`, `aurora`, `neon-glow` stay **taxonomy style tags** for rare specials. They are not V1 design languages. Do not build the aisle on them.

## Wow register (optional, ultra-premium surprise)

Not the house default. Cite only when the brand can play. Index: `libraries/WOW.md`.

**10 languages:** `jewel-chrome` · `velvet-nocturne` · `candy-couture` · `kinetic-poster` · `ceramic-gloss` · `resin-object` · `ink-riot` · `solar-gilt` · `op-signal` · `arcade-atelier`

**20 themes:** two per wow language (vitrine-platinum, carnelian-black, club-bordeaux, ultraviolet-silk, pistachio-salon, cherry-lacquer, poster-day, poster-night, celadon-wet, oxblood-glaze, resin-amber, resin-ice, sumi-slash, vermilion-colophon, desert-leaf, noon-bleach, moire-gallery, zebra-salon, chrome-bubblegum, ice-silver).

**50 signature primitives:** jewelry/material, couture play, poster/optical. One per section. Still fail: aurora mesh, shiny H1, emoji confetti, neon city.

Wow language + wow theme + one wow primitive. Do not put wow on calm-fintech unless the operator asks.

## Token themes

House themes plus the wow register live in `libraries/token-themes.json`. Each theme maps to one primary language. Agents pick a theme. They do not invent fonts.

## Page recipes (later)

After several kinds exist: 12–20 recipes (hero + 3–4 sections + one theme). That recasts first-100 landing pages. Not now.

## Anti-kit (enforce)

From `docs/UI_ANIMATION_RESOURCES.md` §5, now law for this aisle:

- Aurora / mesh / warp as the whole section: fail
- Shiny / sparkle / gradient text on every heading: fail
- Pill / dock nav as section chrome: fail
- Border beam + rainbow buttons: fail as identity
- Globe + meteors + particles stack: fail
- Bento + marquee + number ticker as the default LP section: fail
- Magnetic / tilt / cursor: good when **one** of them is the craft, quantified
