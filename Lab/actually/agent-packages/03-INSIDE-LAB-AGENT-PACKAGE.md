# 03 — INSIDE Lab — Platinum Agent Package

**Section id:** `#inside`  
**Eyebrow:** `03 · Functional ingredients`  
**H2:** `Inside.`  
**Lab URL:** `http://localhost:3010/lab/inside`  
**Background:** ink  
**Pin (desktop):** `end: () => += 4 * innerHeight`, `scrub: 1`, `pin: true`, `pinSpacing: true`  
**Snap:** `[0, 0.25, 0.5, 0.75, 1]` duration min **0.2** max **0.5** delay **0.1** ease power2.inOut directional false  
**Runway before:** **NONE**  
**Runway after:** LabAfterStrip **45dvh** ink (light text)

---

## 0. Mission

Isolate the four-ingredient pin stage: L-Theanine 200 / Lion's Mane 500 / Rhodiola 150 / Bacopa 300. Card swap, dose bar, DrawSVG botanical strokes, can yaw by index, dose number count-up.

**Shell:** `00-LAB-SHELL.md`  
**Authority:** GSAP §5 · `notes/03-INSIDE.md` · `sections/Inside.tsx` (~989 lines) · `data/ingredients.ts`

---

## 1. Files to copy

| # | Path | Role |
|---|------|------|
| 1 | `pages/labs/InsideLab.tsx` | Lab shell |
| 2 | `sections/Inside.tsx` | Section |
| 3 | `data/ingredients.ts` | INSIDE_INGREDIENTS, BLEND_TOTAL_MG |
| 4 | `components/BotanicalIcon.tsx` | SVG paths for drawSvg |
| 5 | `components/can/Can3D.tsx` | controlledRotationY, controlledTiltX |
| 6 | `lib/drawSvg.ts` | DrawSVG polyfill `"0%"→"100%"` |
| 7 | `lib/splitFallback.ts` | name chars |
| 8 | `lib/hooks.ts` | canvasDpr |
| 9 | `lib/useInView.ts` | canvas gate |
| 10 | `lib/lenis.ts` | pill scrollTo |
| 11 | `components/LabChrome.tsx` | chrome |
| 12 | `components/SmoothScroll.tsx` | shell |
| 13 | `index.css` | tokens |

**drei required:** `Environment`, `ContactShadows` imported in Inside.tsx.

---

## 2. Assets

| Path | Use |
|------|-----|
| `models/can.glb` | Can3D |
| `hdri/studio_small_03_1k.hdr` | Environment in Inside canvas |
| `textures/labels/still-01-clear-2.png` | default sku 01 (yaw changes orientation) |
| Botanical paths | inline in BotanicalIcon / section SVGs |

---

## 3. npm deps

Full 3D stack + gsap + lenis + router (same as Hero).

---

## 4. Import graph

```
InsideLab
└── Inside.tsx
      ├── Canvas (r3f) + Environment HDRI + lights + ContactShadows opacity .32
      ├── Can3D sku 01, controlledRotationY={yaw}, controlledTiltX={0.2}, enableParallax, targetHeight 2.2
      ├── BotanicalIcon + drawSvgPaths
      ├── data/ingredients
      ├── splitChars
      ├── getLenis
      └── useInView
```

### Camera (Inside-specific)

```
position: [0, 0.4, 7.2], fov: 28
CameraLookAt → lookAt(0,0,0)
lights: ambient 0.15; dir 1.4 / 0.5 / 1.2
```

### Yaw formula

```js
yaw = Math.PI / 2 * activeIndex   // 0, 90°, 180°, 270°
```

---

## 5. Data contract

```ts
// ingredients.ts — clinical doses
INSIDE_INGREDIENTS: [
  { id, name: "L-Theanine", dosageMg: 200, … },
  { id, name: "Lion's Mane", dosageMg: 500, … },
  { id, name: "Rhodiola Rosea" | "Rhodiola", dosageMg: 150, … },
  { id, name: "Bacopa Monnieri" | "Bacopa", dosageMg: 300, … },
]
BLEND_TOTAL_MG = 1150
// dose bar scaleX = dosageMg / 1150
```

Tagline: **FOUR FUNCTIONAL INPUTS** (or exact copy from source).

---

## 6. Lab shell

```tsx
<div className="min-h-dvh bg-ink text-bone">
  <LabChrome sectionNum="03" sectionLabel="Inside · Functional ingredients"
    pinNote="4×vh snap 0/.25/.5/.75/1" />
  <main><Inside /></main>
  <LabAfterStrip minHeight="45dvh" bg="var(--color-ink)"
    color="rgba(239,237,230,0.55)" />
</div>
```

---

## 7. Motion contracts

### 7.1 Desktop pin

```js
ScrollTrigger.create({
  trigger: section,
  start: "top top",
  end: () => `+=${4 * window.innerHeight}`,
  pin: true,
  pinSpacing: true,
  scrub: 1,
  snap: {
    snapTo: [0, 0.25, 0.5, 0.75, 1],
    duration: { min: 0.2, max: 0.5 },
    ease: "power2.inOut",
    directional: false,
    delay: 0.1
  },
  invalidateOnRefresh: true,
  onUpdate: (e) => {
    const idx = Math.min(3, Math.max(0, Math.floor(4 * e.progress - 1e-4)))
    // set active 0..3
  }
})
```

Headline desktop: SplitText/chars **yPercent 22→0**, duration **.8**, stagger **.022**, start **top 75%** once.  
Mobile fallback: whole `y:22 opacity0→1` **.9 power2.out** same trigger.

### 7.2 Ingredient swap

```js
// halo bg color: duration .5 power2.inOut
// out group: opacity0 y-26 .22 power3.in → commit index
// in group: opacity0 y26 → 1/0 .45 delay .1 power3.out stagger .05
// name chars: yPercent 60→0 .55 power2.out stagger .028 delay .12
// image scale 1.45→1.6 .9 power2.out
// [data-bot] drawSVG "0%"→"100%" .9 power1.inOut stagger .08 delay .15
// dose bar scaleX 0 → dosageMg/1150 .8 delay .25 power2.inOut
// dose number {val:0→dosageMg} .8 delay .25 power2.out
// botanical rock: rotation -3.5↔3.5 duration 5 yoyo repeat -1 sine.inOut
// can yaw: Math.PI/2 * activeIndex
```

Mobile deck: chars yPercent **108**, duration **.5**, stagger **.02**; items y14 **.5** stagger **.07** delay **.08**.

Pills: `scrollTo(start+(end-start)*0.25*i, {duration:1})`.

---

## 8. drawSvg polyfill contract

Club DrawSVGPlugin not licensed → `lib/drawSvg.ts` animates `stroke-dashoffset` equivalent to `"0%"` → `"100%"`.

Agent must:

- Preserve path lengths
- Support stagger .08 delay .15
- ease power1.inOut duration .9
- Prefer reduced-motion → set full stroke immediately

---

## 9. DOM / copy

| Slot | Content |
|------|---------|
| Eyebrow | `03 · Functional ingredients` |
| H2 | `Inside.` |
| Cards | 4 ingredients with mg, description, botanical art |
| Dose bar | proportional to 1150 mg blend |
| Can | right/center stage |
| Tabs/pills | 4 selectors |

Exact body copy: `notes/03-INSIDE.md` + `data/ingredients.ts`.

---

## 10. Acceptance gates

- [ ] Pin ~4 viewports scrub  
- [ ] Snap to 5 stops (intro + 4 ingredients mapping via floor(4p))  
- [ ] Each ingredient: name chars, dose bar scale, number count-up  
- [ ] Botanical drawSVG animates on enter  
- [ ] Rock yoyo ±3.5° / 5s running  
- [ ] Can yaw jumps ~90° per index  
- [ ] Halo color transitions .5s  
- [ ] Pills Lenis-scroll to quarters  
- [ ] Mobile: no pin; deck animations  
- [ ] HDRI + can load without 404  
- [ ] After-strip ink background matches section  

---

## 11. Forbidden mistakes

1. end `3*vh` (flavors) instead of **4**  
2. snap 4 points instead of **5**  
3. dose bar /1150 wrong denominator  
4. Skipping drawSvg → botanicals pop fully drawn  
5. Can not receiving controlledRotationY  
6. ContactShadows opacity wrong (.32 inside vs .35 hero)  
7. Before runway  

---

## 12. Cross-links

- Prev: 02 · Next: 04 · Shell: 00 · GSAP §5 · CAN-3D · notes/03-INSIDE.md  

---

*End of 03 Inside platinum package.*
