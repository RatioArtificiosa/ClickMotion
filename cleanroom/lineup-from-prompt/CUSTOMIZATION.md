# Lineup — Ultra Customization Guide (MS-SEC-LINE01)

**Audience:** buyer’s AI coding tool (Cursor, Claude, Grok Build, Codex, Lovable, Bolt).  
**Goal:** restage this section for *any* product line — beverages, skincare, wine, hardware, apparel drops, multi-SKU CPG — and expand or shrink the count without rewriting scroll math.

---

## 1. File map (what to edit)

| File | Role |
|------|------|
| `lineup-data.ts` | **Primary.** `PRODUCTS`, `SECTION_META`, `SPEC_ROWS`. Start here. |
| `LineupSection.tsx` | Desktop pin + mobile cards. Only touch for layout / motion changes. |
| `Can3D.tsx` | GLB materials, `LABEL_MAP`, lighting. Mesh / label advanced. |
| `InlineCan.tsx` | Stage canvas + stacked products. Passes `labelUrl` / `meshUrl`. |
| `Bloom.tsx`, `ScrollReveal.tsx`, `TextReveal.tsx` | Motion helpers — leave unless theming deeply. |
| `SmoothScroll.tsx`, `lenis-bridge.ts`, `gsap-register.ts` | Scroll stack — leave. |
| `hooks.ts`, `useInView.ts`, `splitFallback.ts` | Utilities — leave. |

**Rule:** product count, names, colors, and copy never live as magic numbers in JSX. They live in `lineup-data.ts`.

---

## 2. Place any product line (full replace)

Paste this prompt to your AI:

```
Restage Lineup (MS-SEC-LINE01) for my brand.

1) Edit lineup-data.ts SECTION_META:
   - sectionIndex: "[02 or my index]"
   - eyebrowLabel: "[e.g. Five products / Four serums]"
   - title: "[e.g. Four expressions.]"
   - mobileSwipeHint: "[e.g. Swipe to explore]"
   - totalLabel / totalUnit / totalValue / specUnit / leadBadge for my industry

2) Replace SPEC_ROWS with my feature rows (or empty array if no specs).
   Each row: { id, name, dosageMg as the numeric column, optional unit }.

3) Replace PRODUCTS with exactly my SKUs (N = my count):
   For each: id, skuNumber ("01"…), number ("BRAND.01"), name, descriptor,
   flavorPair (subtitle), pitch, bloomColor (#hex), leadIngredient (spec id),
   labelPath (public texture URL), optional meshPath.

4) Put GLB at /models/… and textures under /public. Keep scroll pin,
   snap, 3D cross-fade, tabs, mobile horizontal cards. Do not hardcode N=3.
   Pin end must be N * 100vh. Snap at 0, 1/N, …, 1.
```

---

## 3. Expand from 3 to N products

```
Expand Lineup from 3 to [N] products.

Append [N-3] new entries to PRODUCTS in lineup-data.ts using:
[ paste table: name | subtitle | pitch | accent hex | sku | label path ]

Update SECTION_META:
- eyebrowLabel → suggested via countWord or brand wording
- title → e.g. "Five formulations." / "Six expressions."

Pin length = N * 100vh automatically. Tabs show 01…N.
Ghost numbers, blooms, and stage meshes map over PRODUCTS.
Add labelPath (or LABEL_MAP keys in Can3D) for every new SKU.
Keep reduced-motion fallback on first product.
```

**Recommended N:** 2–6 for comfort. 7–8 works if pitches stay short (≤ ~280 chars).

---

## 4. Reduce products

```
Remove products [ids] from PRODUCTS. Update SECTION_META title/eyebrow
to match new count. Pin and snap must shrink with PRODUCTS.length.
```

---

## 5. Swap the 3D vessel (bottle, box, device, pouch…)

```
Replace the default can.glb vessel:
- Set meshPath on each product OR change default meshUrl in Can3D to [MY.glb]
- Provide UV label maps or solid-color materials for [PRODUCT TYPE]
- Adjust targetHeight and camera (InlineCan / FlavorsCanStage) so the
  product frames beautifully in the right column
- Keep Environment HDRI + ContactShadows + stageMotion cross-fade
- If UV maps differ, keep metal vs label material split or simplify to
  one MeshStandardMaterial with my brand color
```

---

## 6. Industry rewrite (not beverages)

| Industry | Spec column idea | totalLabel example | totalUnit |
|----------|------------------|--------------------|-----------|
| Skincare | % / ml actives | Full formula | ml |
| Wine | ABV / residual sugar | Case notes | — |
| Hardware | Watts / ports | Spec pack | — |
| Apparel | Sizes / fabric % | Drop set | pcs |
| SaaS tiers | Seats / limits | Plan total | — |

```
Rewrite Lineup for [CATEGORY]. Replace all product names, subtitles,
pitches, SPEC_ROWS, and SECTION_META total/spec labels. dosageMg is just
the numeric cell — use prices, ml, SPF, etc. Keep the pin ritual.
```

---

## 7. Brand colors + wordmarks

```
Stage bone: [PAPER hex]  Ink: [INK hex]  Mist: [META hex]
Set CSS vars on the demo root or Tailwind tokens:
  --color-bone, --color-ink, --color-mist
Each product bloomColor = my accent palette.
Change ACTUALLY.01 style wordmarks to [BRAND].01 … [BRAND].0N
```

---

## 8. Labels / art direction without 3D files yet

```
Until real GLBs/labels ship:
- Generate flat editorial label PNGs (2048×2048, seamless U wrap if possible)
- Assign labelPath per product
- Or solid-color can body using bloomColor as base metal tint
Do not leave ACTUALLY demo labels on a different brand.
```

---

## 9. Layout / section placement

- Mid-page section only — drop after a hero (pairs with MS-HERO-ACTU01) or before shop.
- Do not wrap in forced site header/footer inside the component.
- Desktop: pin `top top`, end `+= N * 100vh`, scrub + snap.
- Mobile: horizontal snap cards (no pin).
- Tabs + arrow keys jump SKUs on desktop.

---

## 10. Accessibility & motion

- `prefers-reduced-motion`: static first product, no long scrub requirement.
- Tabs have aria-label / aria-current.
- Counter `1 / N` stays in sync with active index.
- Keyboard: ArrowLeft / ArrowRight while section is in view.

---

## 11. QA checklist after AI restage

- [ ] PRODUCTS.length matches H2 / eyebrow wording
- [ ] Pin scroll lands cleanly on every SKU (no empty overscroll)
- [ ] Each product shows correct name, subtitle, pitch, bloom, ghost number
- [ ] Labels / mesh match the brand (no leftover ACTUALLY art)
- [ ] Specs / total footer make sense for industry (or intentionally empty)
- [ ] Mobile swipe through all cards
- [ ] Tabs jump to correct product
- [ ] Reduced-motion still readable
- [ ] No purple mesh, no carousel autoplay, no site chrome leakage

---

## 12. Something is broken

```
Something is broken: [DESCRIBE WHAT YOU SEE].
Fix it and keep Lineup as a scroll-pinned multi-SKU product reveal.
PRODUCTS array drives N. Pin = N * 100vh. 3D vessel + copy per segment.
Do not ask me to write code. Do not reduce quality.
```

---

## 13. Dependencies (install if greenfield)

```
gsap@^3.12  three@^0.170  @react-three/fiber@^9  @react-three/drei@^10  lenis@^1.1
```

React + TypeScript. Tailwind optional (utility classes used in cleanroom).

---

## 14. Not this product

- **Not** a full-bleed hero (see Actually! MS-HERO-ACTU01).
- **Not** a free-play background film tile (not on `/backgrounds`).
- **Not** a flat product grid without pin ritual.
- **Not** hard-coded “always 3 flavors” after the buyer needs 5+.
