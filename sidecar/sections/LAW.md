# Sections law (sidecar canonical)

**Status:** Locked for the sidecar lane · 2026-08-13  
**Applies to:** `sidecar/sections/**`  
**Does not replace:** `docs/PRODUCT_LAW.md` (still required when a SKU is productized)  
**Supersedes for this lane:** `docs/CONTENT_PLAN_100.md` counts, Batch 1 order, and “write 100 MDX files” protocol

When this aisle merges into the site, this file becomes `docs/SECTIONS_LAW.md` with a pointer from PRODUCT_LAW. Until then, this is the source of truth for Sections.

---

## 1. What the aisle is

ClickMotion **Sections** are full mid-page (or footer) slices: Features, Pricing, Testimonials, Stats, FAQ, CTA, Contact, Footer, plus the showpiece sections already shipped.

We sell a **prompt + rebuild pack** so Cursor, Claude, Lovable, Codex, Grok Build, Bolt rebuild the same design in the buyer’s site.

We do **not** sell a copy-paste React registry. We do **not** lead with a shadcn-style atom grid.

| Layer | Public? | Job |
|-------|---------|-----|
| Finished section SKU | Yes (after integration) | What humans browse and buy |
| Motion primitives, design languages, token themes, composition rules | Internal factory | What agents assemble from |
| Components (buttons, inputs) | Later aisle | `sidecar/components/` |
| Elements (Three.js, WebGL bits) | Later aisle | `sidecar/elements/` |

Heroes remain a separate flagship lane. Another agent owns live hero construction. Sidecar does not compete with that work.

---

## 2. Quality bar (non-negotiable)

The bar is a section a veteran human designer would ship on a real brand, then motion that makes it unmistakably ClickMotion.

**Required on every planned SKU:**

1. **One famous-UI craft direction**, named (Apple marketing restraint, Stripe trust, Linear density, SSENSE editorial, Material You, etc.). Inspiration only. Never clone trademarks or layouts.
2. **One signature motion** that *is* the design (pin, magnetic recommended-tier, paper pivot, type that breathes, accordion that stages). Tailwind `animate-pulse` on a stock bento is not a signature.
3. **Design language id + token theme id + motion primitive id** from `sidecar/sections/libraries/`.
4. **Authority test:** if a sharp human says “AI made this,” it fails. Fix layout, type, materials, and motion. Do not add more effects.

**Fails immediately:**

- Purple / green / indigo mesh gradients as the brand
- Default Lovable / v0 / Magic UI bento + shiny text + pill chrome
- Aurora + marquee + number ticker + border beam stacked as the section
- Same kit with a new headline
- Motion as decoration on an ugly template
- Invented people and houses (Clara Voss, Hale Atelier). Demo copy uses common given names + family names and real places (Sarah Johnson, Union Square, Michigan Avenue).
- **Same situation restaged on every board.** Holding a chair, writing a name, the side door, the sidewalk. Each SKU is a different real shop and a different day. Cadence changes. Write like the client already lives there.
- **AI short-sentence slop.** “Bold. Fast. Yours.” Three fragments, no furniture, same beat in every block. Mix lengths. Name a time, a room, an object, a small ugly truth. Join the sentence the visitor is already muttering. A CTA names the next thirty seconds, not a brand vision. If a shop owner would not say it out loud, it does not ship.

Wow is authored conviction, not more plugins. Restraint (Stripe, Apple) can be wow. Noise cannot.

Gold to imitate (craft, not clones): Helix copy, Studio Sequence packaging, Meridian pin-until-complete, Dopamine as footer completeness, Folio as pin + glass, Phobia as interaction-as-design.

---

## 3. First-100 recast

Keep the intent: buyers need pairable page slices so the library is a system, not a hero shop.

Drop: 40 heroes / 40 sections / 12 LPs / 8 specials as a gate. Drop Batch 1 “10 SaaS heroes then 10 SaaS sections.”

Heroes already exist in volume. New work in this sidecar is **page-completion sections** that sit under those heroes. Landing-page recipes come after several pairable kinds exist. Specials stay opportunistic on the live path.

---

## 4. Preview policy (locked 2026-08-13)

**Public storefront = video demos.** Heroes, sections, and later components/elements: muted recordings that *show* the signature play (pointer, pin, accordion, tilt). Not a public live sandbox of the real component.

**`/demo/cleanroom-*` = operator proof only.** Live code is for you to judge the design during the plant. It is not the shelf. At production, the public product is the recording + prompt + pack. Do not market cleanroom routes as the catalog.

**Why:** A live React demo ships the running implementation. Video proves motion without handing buyers (or an agent) the recipe. Same rule as PRODUCT_LAW V1: no interactive sandbox per SKU on the public site.

Capture must still show the signature behavior (move the mouse, advance the pin, open the FAQ). A still of a dead pricing table is not ClickMotion.

**The demo is the finished section.** No how-to lines, no “scroll here,” no “click a name,” no “one open,” no scaffold paragraphs. How it works lives in `OPERATOR_NOTES.md` and the sold prompt, not on the board. If a client saw only the demo, they should see the shipped design.

**Enter on view (mandatory).** When the section meets the viewport it lands with **one** recipe from `libraries/enter-recipes.json`. Drop, slap, and stomp are three of fifty-six. Pick by temperament and language (`ENTER.md`). That is support motion. After land, the signature still runs (pin, accordion, takeover, hover, press). Reduced motion skips enter and shows rest. Never caption the enter on the board.

Do not reopen live public section play without an explicit operator decision and a PRODUCT_LAW amendment.

---

## 5. Pairing

Every new section names **at least one** existing hero (or live section) it is designed to sit under. See `pairing.md`. `compatibleWith` in the prompt frontmatter is required, not optional.

---

## 6. Libraries (factory)

Four machine-readable libraries under `libraries/`, plus the enter catalog:

1. **Motion primitives** - named *signature* recipes with numbers (duration, ease, spring, reduced-motion fallback), engine (Motion / GSAP / CSS)
2. **Enter recipes** - `enter-recipes.json` / `ENTER.md` — 56 landings (stamp, click, drop, plus 50 more: wipe, iris, typeset-rise, tick-print, bolt-down…). One per section. Support only.
3. **Design languages** - 8 for V1 house, plus a **wow register** of 10 (`WOW.md`). House remains the default.
4. **Token themes** - house palettes plus 20 wow themes. Agents do not invent fonts.
5. **Composition rules** - legal mixes and hard bans

Agents compose. Humans ship finished SKUs. Do not publish combinatorial explosions (every button × every glow × every theme).

Start small and excellent. Status on each record: `canonical` | `stub` | `banned-as-default`.

---

## 7. IDs and kinds

Follow existing ClickMotion IDs: `MS-SEC-PRIC01`, `MS-SEC-FAQS01` (kind code + 2 digits).

Kind ids live in `kinds.json` until merge into `src/config/taxonomy.ts`. Do not invent a kind that is not in that file. If a new kind is truly needed, add it here first, then merge later.

Showpiece kinds already shipped (gallery-helix, folio-pivot, lineup, studio-sequence, phobia-forms, dopamine-footer) stay valid. Do not rewrite those SKUs in the sidecar.

---

## 8. Stack for sold prompts (same as site)

Next / React / Tailwind / Motion (Framer lineage) / GSAP as needed. Quantified motion. MS CDN for media. No uncontrolled third-party video hotlinks. No “apply MS shell to this design.” Prefer reimplementing a mechanic from first principles over `npx magicui add`.

Scroll-narrative or hybrid-with-scroll: **pin-until-complete** (PRODUCT_LAW). 100%.

---

## 9. License and originality

Use shadcn.io, magicui.design, magicui.com, oxygen-ui, amicro.vercel.app, shadcnblocks.com as a **coverage checklist** (what kinds exist in the market). Do not copy their compositions, Pro blocks, or distinctive code.

Track license notes on every primitive (`license` field). MIT craft can inform numbers. Paid kits cannot be pasted.

---

## 10. Sidecar isolation

While another agent ships heroes and live sections:

- Write only under `sidecar/` (and the glob-scoped Cursor rule) **unless the operator has opened a gold SKU build** (cleanroom + `/demo/cleanroom-*` only; still no CMS, owner-designs, or packages).
- Do not touch live prompts, owner registries, or marketing routes for unrelated SKUs.
- Integration is a separate, operator-approved pass (`INTEGRATION.md`).

---

## 11. Visual pass (mandatory, every section)

**A section is not complete when it compiles.** After every first build, and after every fix, run [`VISUAL_PASS.md`](./VISUAL_PASS.md) in real Chrome on the operator demo.

```text
Open /demo/cleanroom-{slug}
  → Drive the full journey (wheel, click, keys, progress API)
  → Screenshot + DevTools (overflow, contrast, console, fonts, pin, clipping)
  → Defect list
  → Fix
  → Re-check the same states
  → Repeat until GOLDEN (zero open visual defects + gold checklist)
```

**Required every time:** desktop and mobile widths; first / mid / last frames; every clickable control; `prefers-reduced-motion`; console clean; no kit tells; type not clipped; pin actually pins.

**Forbidden:** calling GOLDEN from code review alone; assuming a CSS fix worked; shipping with overlapping plates, overflow, or a tall scrollbar on a pin section.

Full protocol, checklist, and defect-list format: **`sidecar/sections/VISUAL_PASS.md`**.
