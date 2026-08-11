# 06 — SHOP split — Platinum Agent Package (06a Stockists + 06b Products)

The original single `#shop` block is **two lab pages**:

| Part | Export | Lab URL | Contents |
|------|--------|---------|----------|
| **06a** | `Stockists` | http://localhost:3010/lab/stockists | Where available · 3 cities · COMING SOON |
| **06b** | `ShopProducts` | http://localhost:3010/lab/products | OR ORDER DIRECT · price boxes · mobile modal |
| Full page | `Shop` | `/` only | Composes both in one `#shop` section |
| Legacy | — | `/lab/shop` → redirects to `/lab/stockists` | |

**Background:** bone · **Pin:** none · **Runways:** none  

**Note:** `Footer` is a separate export. Full Home mounts `<Shop />` then `<Footer />`.

---

## 0. Mission

Isolate stockists (3 city columns, 15 locations), coming-soon cities, product cards (3 SKUs with pack toggle), staggered ScrollTrigger entrances. No pin — pure reveal choreography.

**Shell:** `00-LAB-SHELL.md`  
**Authority:** GSAP §8 · `notes/06-SHOP.md` · `sections/Shop.tsx` (~914 lines) · `data/shop.ts`

---

## 1. Files to copy

| # | Path | Role |
|---|------|------|
| 1 | `pages/labs/ShopLab.tsx` | Lab shell |
| 2 | `sections/Shop.tsx` | Section (+ Footer export unused in lab) |
| 3 | `data/shop.ts` | STOCKIST_CITIES, COMING_SOON, SHOP_PRODUCTS |
| 4 | `components/ScrollReveal.tsx` | primitives |
| 5 | `components/TextReveal.tsx` | H2 lines |
| 6 | `lib/hooks.ts` | useIsMobile (scale factor n) |
| 7 | `lib/splitFallback.ts` | if needed by TextReveal |
| 8 | `components/LabChrome.tsx` | chrome |
| 9 | `components/SmoothScroll.tsx` | shell |
| 10 | `index.css` | tokens |

### Assets (product cards)

| Path | SKU |
|------|-----|
| `public/images/cans/Actually-01.png` | Clear |
| `public/images/cans/Actually-02.png` | Dawn |
| `public/images/cans/Actually-03.png` | Dusk |

No glb/HDRI required for Shop lab alone.

---

## 2. npm deps (minimum)

```json
{
  "dependencies": {
    "react": "^19.1.1",
    "react-dom": "^19.1.1",
    "react-router-dom": "^7",
    "gsap": "^3.13.0",
    "lenis": "^1.3.11"
  }
}
```

---

## 3. Data contracts

### Stockists

```ts
STOCKIST_CITIES: [
  { city: "Wellington", locations: [5 × {name, address}] },
  { city: "Auckland", locations: [5] },
  { city: "Christchurch", locations: [5] },
]
// Exact names/addresses: data/shop.ts — Moore Wilson's, Farro Fresh, etc.
COMING_SOON: ["Melbourne","Sydney","London","New York","Tokyo"]
```

### Products

```ts
SHOP_PRODUCTS: [
  {
    sku, number: "ACTUALLY.01", name, flavor, blurb,
    fourPack: number,   // NZD
    twelvePack: number,
    accent: string,     // color
    image: "/images/cans/Actually-0N.png"
  },
  // ×3
]
```

Prices and blurbs: **verbatim from data/shop.ts** — do not invent.

---

## 4. Lab shell

```tsx
<div className="min-h-dvh bg-bone text-ink">
  <LabChrome sectionNum="06" sectionLabel="Shop · Where available"
    pinNote="none · staggered ST" />
  <main><Shop /></main>
</div>
```

Optional agent extension: mount `<Footer />` after Shop only when testing email capture — not required for section isolation.

---

## 5. Motion contracts (GSAP §8)

```js
// mobile scale factor n = mobile ? .7 : 1
// eyebrow: y40 opacity0→1 .8 power3.out start top 80% toggle play
// H2 lines mask: yPercent 115→0 .9 power2.out stagger .09 start top 80% once
// each city column: y60 .8 power3.out delay .15*i*n start top 85%
//   [data-stockist-item]: y12 .5 power2.out stagger .06*n delay .15*i*n+.25
// coming-soon block: y20 .8 power3.out delay .45*n top 90%
// rules [scaleX 0→1] .6 power3.out top 88%
// range label opacity .6 power3.out delay .15 top 88%
// product cards: y80 scale.96 → 0/1/1 duration 1 power3.out delay .2*i*n top 85%
// ScrollTrigger.refresh on city tab change (rAF double) if tabs exist
```

Loader-style pop dots for map markers if present: back.out(1.6) recipe from GSAP §2.1.

### Product card micro-interactions (CSS/JS)

- Hover: `translateY(-1)` + shadow `0 12px 32px rgba(26,27,29,0.06)` 400ms  
- Image: scale 1.12 base; group-hover scale **1.04** on wrapper 500ms  
- Pack toggle: 4-pack / 12-pack → price swap  
- Add button: optional scale pulse on cart (nav-level if full page)

---

## 6. DOM / layout

```
section#shop / #stockists
  eyebrow + H2
  stockist grid: 3 city columns × 5 locations
  COMING SOON row
  THE RANGE / Order direct
  3 product cards (images, pack toggle, price, CTA)
```

Card chrome: bone bg, border `1px solid rgba(140,139,134,0.4)`, padding **32**.

---

## 7. Copy anchors

| Slot | Text |
|------|------|
| Eyebrow | `06 / Where available` (or source equivalent) |
| H2 | `Find ACTUALLY in store, or order direct.` |
| Range | THE RANGE / Order direct |
| Coming soon | Melbourne, Sydney, London, New York, Tokyo |

Footer (full page only): email capture “Get notified…”, © year ACTUALLY.

---

## 8. Acceptance gates

- [ ] All 15 stockists render with correct city grouping  
- [ ] Coming soon five cities present  
- [ ] Three product cards with Actually-01/02/03 images (no 404)  
- [ ] Pack toggle updates price  
- [ ] Staggered column entrances (delay scales with i and mobile n)  
- [ ] Cards rise y80 scale.96 → rest  
- [ ] H2 TextReveal once at top 80%  
- [ ] Horizontal rules scaleX 0→1  
- [ ] No pin-spacer  
- [ ] Mobile: delays ×0.7, still readable  
- [ ] reduce: opacity sets, content visible  
- [ ] Lab does not require Footer for pass  

---

## 9. Forbidden mistakes

1. Inventing stockist names/addresses  
2. Wrong image paths (`still-` vs `Actually-` casing — Windows may forgive, deploy may not)  
3. Pinning the shop section  
4. Forgetting mobile factor **n = 0.7** on delays  
5. Price currency wrong (NZD in data)  
6. Mounting only Footer without Shop  
7. Before/after runways  

---

## 10. Footer (optional full-page companion)

If assembling Home:

```tsx
<Shop />
<Footer />  // export from same Shop.tsx file
```

Footer includes email form, legal, ©. Not part of `/lab/shop` isolation.

---

## 11. Cross-links

- Prev: 05 · Shell: 00 · Full assemble: Home.tsx · GSAP §8 · notes/06-SHOP.md  

---

*End of 06 Shop platinum package.*
