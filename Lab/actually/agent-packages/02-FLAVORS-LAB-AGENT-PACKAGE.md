# 02 — FLAVORS Lab — Platinum Agent Package

**Section id:** `#flavors`  
**Eyebrow:** `02 / Three flavors`  
**H2:** `Three formulations.`  
**Lab URL:** `http://localhost:3010/lab/flavors`  
**Background:** bone `#efede6`  
**Pin (desktop):** `end: () => += 3 * innerHeight`, `scrub: 1`, `pin: true`, `pinSpacing: true`, `refreshPriority: 1`  
**Snap:** `[0, 1/3, 2/3, 1]` duration min **0.25** max **0.55** ease power2.inOut, directional **false**, delay **0.1**  
**Runway before:** **NONE**  
**Runway after:** LabAfterStrip **45dvh**

---

## 0. Mission

Isolate the three-flavor pin carousel: snap between Clear / Dawn / Dusk, cross-fade WebGL cans, copy card transitions, ghost numbers, bloom tints. Desktop pin + mobile horizontal branch.

**Shell:** `00-LAB-SHELL.md`  
**Authority:** `notes/GSAP-ANIMATIONS.md` §4 · `notes/02-FLAVORS.md` · `sections/Flavors.tsx` (~924 lines) · `data/flavors.ts`

---

## 1. Isolated lab pieces

| Piece | Role |
|-------|------|
| `pages/labs/FlavorsLab.tsx` | LabChrome + `<Flavors />` + after-strip |
| `sections/Flavors.tsx` | Production section (desktop + mobile) |
| `data/flavors.ts` | FLAVORS, FLAVOR_TILT, INGREDIENTS, TOTAL_BLEND_MG |
| `components/can/InlineCan.tsx` | FlavorsCanStage + InlineCan |
| `components/can/Can3D.tsx` | StageMotion + three SKUs |
| Bloom, ScrollReveal, TextReveal, hooks, lenis, SmoothScroll |

---

## 2. Exact files to copy

| # | Path under `app/src/` | Role |
|---|------------------------|------|
| 1 | `pages/labs/FlavorsLab.tsx` | Lab shell |
| 2 | `sections/Flavors.tsx` | Section |
| 3 | `data/flavors.ts` | Data |
| 4 | `components/can/InlineCan.tsx` | Stage canvas |
| 5 | `components/can/Can3D.tsx` | Can mesh + StageMotion |
| 6 | `components/Bloom.tsx` | Per-flavor blooms |
| 7 | `components/ScrollReveal.tsx` | Mobile/desktop helpers |
| 8 | `components/TextReveal.tsx` | Titles |
| 9 | `lib/hooks.ts` | useIsMobile, usePrefersReducedMotion, canvasDpr |
| 10 | `lib/lenis.ts` | tab scrollTo |
| 11 | `lib/useInView.ts` | canvas frameloop gate |
| 12 | `components/LabChrome.tsx` | chrome |
| 13 | `components/SmoothScroll.tsx` | shell |
| 14 | `index.css` | tokens |

---

## 3. Assets

| Path | SKU |
|------|-----|
| `models/can.glb` | all |
| `hdri/studio_small_03_1k.hdr` | StudioLights |
| `textures/labels/still-01-clear-2.png` | 01 |
| `textures/labels/still-02-dawn-2.png` | 02 |
| `textures/labels/still-03-dusk-2.png` | 03 |
| `images/cans/Actually-01.png` … `03.png` | optional 2D fallbacks |

---

## 4. npm deps

Same 3D stack as Hero (react, gsap, lenis, three, r3f, drei, react-router-dom).

---

## 5. Import graph

```
FlavorsLab
└── Flavors.tsx
      ├── FlavorsDesktop | FlavorsMobile (internal)
      ├── Bloom
      ├── FlavorsCanStage / InlineCan
      │     └── Can3D ×3 skus 01/02/03 + StudioLights
      ├── ScrollReveal, TextReveal
      ├── data/flavors (FLAVORS, FLAVOR_TILT, INGREDIENTS, TOTAL_BLEND_MG)
      ├── useIsMobile, usePrefersReducedMotion
      └── getLenis (pagination scrollTo)
```

### Data shape (must preserve)

```ts
FLAVORS: [
  { id:"clear", skuNumber:"01", number:"ACTUALLY.01", name:"Clear",
    descriptor:"signature", flavorPair:"Cucumber & Yuzu", pitch:"…",
    bloomColor:"#bcd3d8", leadIngredient:"l-theanine" },
  { id:"dawn", skuNumber:"02", … bloomColor:"#e8c9a0", lead:"…" },
  { id:"dusk", skuNumber:"03", … bloomColor:"#c9b5c8", lead:"…" },
]
FLAVOR_TILT: e.g. [1, -1, 1]  // signs for stage motion
INGREDIENTS: L-Theanine 200, Lion's Mane 500, Rhodiola 150, Bacopa 300
TOTAL_BLEND_MG: 1150
```

---

## 6. Lab shell

```tsx
<div className="min-h-dvh bg-bone">
  <LabChrome sectionNum="02" sectionLabel="Flavors · Three formulations"
    pinNote="3×vh snap 0/⅓/⅔/1" />
  <main><Flavors /></main>
  <LabAfterStrip minHeight="45dvh" />
</div>
```

No before runway. pinSpacing creates 3× viewport of scrub room.

---

## 7. Motion contracts

### 7.1 Desktop pin

```js
ScrollTrigger.create({
  trigger: pinRoot, // h-screen flex col wrapper
  start: "top top",
  end: () => `+=${3 * window.innerHeight}`,
  pin: true,
  pinSpacing: true,
  scrub: 1,
  snap: {
    snapTo: [0, 1/3, 2/3, 1],
    duration: { min: 0.25, max: 0.55 },
    ease: "power2.inOut",
    directional: false,
    delay: 0.1
  },
  invalidateOnRefresh: true,
  refreshPriority: 1,
  onUpdate: (self) => {
    const t = self.progress, n = 1/6
    // hysteresis → active index 0|1|2
    // 0: t>.55→2 else t>n+.05→1
    // 1: t<n-.05→0 else t>.55→2
    // 2: t<n-.05→0 else t<.45→1 else 2
  }
})
```

Entrance once: eyebrow+sub `fromTo {y:70,opacity:0}→{y:0,opacity:1}` duration **1** power2.out stagger **.12** start **top 55%** once.

### 7.2 Cross-fade on index change

```js
// tilt from FLAVOR_TILT[i]
// active stageMotion:
fromTo({ x:3*tilt, y:.12, rotZ:-.16*tilt, scale:.94, opacity:0 },
       { x:0,y:0,rotZ:0,scale:1,opacity:1, duration:.85, ease:"power2.out", delay:.1, overwrite:"auto" })
// inactive:
to({ x:-2.2*tilt, y:-.1, rotZ:.14*tilt, scale:.94, opacity:0, duration:.45, ease:"power2.in", overwrite:"auto" })

// bg tints: opacity 0/1 duration .8 power2.inOut
// number ghosts: opacity + y ±40 duration .8 power2.inOut force3D
// copy card out: y-26 opacity0 duration .25 power3.in → set index
// copy card in: y26→0 opacity .45 power3.out
// [data-stage-item]: y18→0 .45 power2.out stagger .05 delay .05
// counter: `${i+1} / 3`
```

Desktop bg radial: `72% 85% at 66% 52%` bloom30/14.

Tab click: `getLenis()?.scrollTo(start + (end-start)*(i/3), { duration: 1 })`.

### 7.3 Mobile (no pin)

- ST start **top 85%** once → first card  
- Title chars: yPercent **108→0**, duration **.55**, stagger **.03**  
- `[data-card-item]` y12 opacity, **.45** stagger **.05** delay **.1**  
- Out: opacity **.12 power1.out**  
- Bloom bg: `90% 70% at 50% 40%` bloom33/14  
- Horizontal CSS snap deck pattern in source  

---

## 8. DOM / layout

### Desktop concept

```
section#flavors
  pinRoot h-screen
    left: eyebrow, H2, copy card, ingredients list, counter, pagination 01 02 03
    right: can stage (3 stacked Can3D via FlavorsCanStage)
            ghost strokes 01/02/03
            bloom tints per flavor
```

12-col editorial grid; left copy / right product.

### Copy (ACTUALLY)

| SKU | Number | Name | Pair |
|-----|--------|------|------|
| 01 | ACTUALLY.01 | Clear | Cucumber & Yuzu |
| 02 | ACTUALLY.02 | Dawn | Ginger & Bergamot |
| 03 | ACTUALLY.03 | Dusk | Blackcurrant & Manuka |

Pitch strings and lead ingredients: see `data/flavors.ts` verbatim.

Eyebrow: `02 / Three flavors` · H2: `Three formulations.`

---

## 9. StageMotion type

```ts
export type StageMotion = {
  x?: number;
  y: number;
  rotZ?: number;
  scale: number;
  opacity: number;
};
```

Can3D reads `stageMotionRef.current` each frame for flavors stage transform/opacity.

Initial refs: active index 0 full opacity; others offset by `3*tilt`, scale .94, opacity 0.

---

## 10. Canvas contracts

- FlavorsCanStage: single Canvas, three Can3D, camera **[0, .3, 7.6] fov 26**
- useInView rootMargin **"1500px"** for stage (aggressive preload)
- frameloop always when in view
- pointer-events **none** on flavors canvas (scroll owns interaction)
- StudioLights + ACES 1.05

---

## 11. Acceptance gates

- [ ] Desktop: pin engages at top; scroll length ≈ 3 viewports of scrub
- [ ] Snap lands on 0, 1/3, 2/3, 1 (three flavors + end)
- [ ] Active can cross-fades with tilt; inactive exits opposite
- [ ] Copy card out/in timings feel snappy (.25 out / .45 in)
- [ ] Ghost numbers 01/02/03 swap with y ±40
- [ ] Bloom color matches flavor (#bcd3d8 / #e8c9a0 / #c9b5c8)
- [ ] Pagination click Lenis-scrolls to third fractions
- [ ] Ingredient list reorders lead ingredient first
- [ ] Mobile: no pin; cards animate; no desktop pin-spacer
- [ ] reduce: no pin thrash; content visible
- [ ] Lab only mounts Flavors (no hero loader)
- [ ] After-strip after pin release

---

## 12. Forbidden mistakes

1. snap array wrong (`[0,.5,1]` only 2 steps)  
2. end `2*vh` or `4*vh` instead of **3**  
3. scrub true instead of **scrub:1** (feel differs)  
4. Missing hysteresis → flicker between indices  
5. Three separate Canvases instead of FlavorsCanStage (perf)  
6. pointer-events auto on canvas blocking scroll  
7. Before runway delaying pin  
8. Forgetting refreshPriority **1** when coexisting with hero prio 3 on full page  

---

## 13. Cross-links

- Prev: `01-HERO` · Next: `03-INSIDE` · Shell: `00-LAB-SHELL`  
- Notes: `02-FLAVORS.md`, GSAP §4, CAN-3D  

---

*End of 02 Flavors platinum package.*
