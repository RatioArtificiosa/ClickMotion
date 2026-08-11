# 04 — STORY Lab — Platinum Agent Package

**Section id:** `#story`  
**Eyebrow:** `04 / STORY`  
**H2:** `Quietly built over five years.`  
**Lab URL:** `http://localhost:3010/lab/story`  
**Background:** bone  
**Pin (desktop):** `end: () => += innerHeight * (c - 0.4)` with **c = 5** → **4.6 × vh**  
**scrub:** `1` · **pin + pinSpacing** · **refreshPriority: -1**  
**Snap:** progressive from `0` then `0.1 + i/(c-1)*0.9`  
**Runway before:** **NONE**  
**Runway after:** LabAfterStrip **45dvh**

---

## 0. Mission

Isolate the five-year editorial timeline (2021–2025): intro fade, progress line scaleY, chapter hysteresis, image cross-scale, year ghosts, body swap. Mobile sticky **440svh** with clip-path photo scrub.

**Shell:** `00-LAB-SHELL.md`  
**Authority:** GSAP §6 · `notes/04-STORY.md` · `sections/Story.tsx` (~823 lines) · `data/story.ts`

**No WebGL** — lightest 3D-free lab after Press.

---

## 1. Files to copy

| # | Path | Role |
|---|------|------|
| 1 | `pages/labs/StoryLab.tsx` | Lab shell |
| 2 | `sections/Story.tsx` | Section |
| 3 | `data/story.ts` | STORY_CHAPTERS, STORY_INTRO, CHAPTER_COUNT |
| 4 | `components/ScrollIlluminate.tsx` | Mobile word illuminate |
| 5 | `lib/splitFallback.ts` | splitChars, splitWords |
| 6 | `lib/lenis.ts` | year button scrollTo |
| 7 | `components/LabChrome.tsx` | chrome |
| 8 | `components/SmoothScroll.tsx` | shell |
| 9 | `index.css` | tokens |

### Assets (required)

| Path | Chapter |
|------|---------|
| `public/story/2021.svg` | 2021 |
| `public/story/2022.svg` | 2022 |
| `public/story/2023.svg` | 2023 |
| `public/story/2024.svg` | 2024 |
| `public/story/2025.svg` | 2025 |

---

## 2. npm deps (Story lab minimum)

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

No three / r3f / drei required for Story alone.

---

## 3. Data contract (verbatim structure)

```ts
STORY_CHAPTERS: Array<{
  year: "2021"|"2022"|"2023"|"2024"|"2025",
  chapterTitle: string,
  paragraph: string,      // ACTUALLY brand in body
  imageCaption: string,
  imageSrc: "/story/YYYY.svg"
}>
CHAPTER_COUNT = 5
STORY_INTRO = "ACTUALLY began as a quiet rejection…"
```

Copy must keep five years, ACTUALLY rename in paragraphs, imageSrc paths exact.

---

## 4. Lab shell

```tsx
<div className="min-h-dvh bg-bone">
  <LabChrome sectionNum="04" sectionLabel="Story · Five years"
    pinNote="(c-0.4)×vh · 5 chapters" />
  <main><Story /></main>
  <LabAfterStrip minHeight="45dvh" />
</div>
```

---

## 5. Motion contracts

### 5.1 Desktop pin

```js
const c = CHAPTER_COUNT // 5
const t = Array.from({ length: c }, (_, i) => i / (c - 1))
ScrollTrigger.create({
  trigger: pinEl,
  start: "top top",
  end: () => `+=${window.innerHeight * (c - 0.4)}`, // 4.6 * vh
  pin: true,
  pinSpacing: true,
  scrub: 1,
  snap: {
    snapTo: [0, ...t.map((e, i) => 0.1 + i / (c - 1) * 0.9)],
    duration: { min: 0.25, max: 0.55 },
    ease: "power2.inOut"
  },
  invalidateOnRefresh: true,
  onUpdate: (self) => {
    const p = self.progress
    // intro word f: opacity 1-clamp(p/.08), translateY -40*clamp(p/.08)
    // subtitle m: opacity clamp((p-.04)/.08)
    // line scaleY: clamp((p-.1)/.9)
    // active chapter hysteresis on n=scaleY with ±(.5*r + .05)
  }
})
```

Intro entrance: eyebrow `y:32 opacity0→1` **.9 power3.out** stagger .18 top **75%** play; H2 chars yPercent **115** **.8** stagger **.016** once top 75%.

### 5.2 Chapter change

```js
// images: active fromTo scale (dir?.86:1.14) opacity0 y±46 → 1/1/0 .9 power2.out delay .08 force3D
//         others to scale 1.14|.86 opacity0 y∓46 .6 power2.in force3D
// year titles: opacity + y ±60 .9 power2.inOut force3D
// body out: y-24 opacity0 .22 power3.in → swap
// body in: y24→0 .45 power3.out
// [data-story-item]: y16 .45 power2.out stagger .05 delay .05
```

Year buttons: `scrollTo(start+(end-start)*(.1+i/(c-1)*.9), {duration:1.2})`.

### 5.3 Mobile story

```js
// sticky container height 440svh
ScrollTrigger.create({
  trigger: mobileRoot,
  start: "top top",
  end: "bottom bottom",
  onUpdate: (e) => {
    const t = e.progress
    const n = Math.min(4, Math.floor(5 * t))
    localProgress = clamp(5*t - n)
    setActive(n)
    // photo: clipPath inset(0 0 (1-ease)*92% 0); opacity .4+.6*ease
  }
})
// chapter swap: yPercent ±7*.6 power2.out; body y-12 .16 power2.in
// title chars yPercent 105→0 .5 power2.out stagger .013
// words dim .24 then illuminate by local progress (ScrollIlluminate pattern)
```

Year dots: Lenis duration **.9**, progress `(i+.72)/5`.

---

## 6. DOM / layout

### Desktop

```
section#story
  pinEl
    intro (eyebrow + H2) fades with early progress
    progress vertical line scaleY
    year ghosts 2021–2025
    image frames stacked
    body copy for active chapter
    year buttons
```

### Mobile

```
sticky 440svh root
  clip-path scrubbing photos
  title + paragraph with word illuminate
  year dots
```

---

## 7. Copy (years)

| Year | Title (source data) |
|------|---------------------|
| 2021 | An idea, in a flat white office. |
| 2022 | Formula development. |
| 2023 | Wellington launch. |
| 2024 | A second flavor. A second city. |
| 2025 | Late focus, by design. |

Full paragraphs: `data/story.ts` — **do not paraphrase**.

---

## 8. Acceptance gates

- [ ] Desktop pin length ≈ 4.6 viewports  
- [ ] Intro fades in first ~8% progress; subtitle appears  
- [ ] Line scaleY grows over remaining scroll  
- [ ] Chapters advance with hysteresis (no flicker at boundaries)  
- [ ] Images scale/crossfade with direction  
- [ ] Year ghost titles y±60  
- [ ] Body out .22 / in .45  
- [ ] Year buttons Lenis 1.2s to snap points  
- [ ] All 5 SVGs load (no broken images)  
- [ ] Mobile 440svh sticky + clip inset 92%  
- [ ] Mobile word dim .24 illuminates with progress  
- [ ] reduce: readable static timeline  
- [ ] No three.js network requests on this lab  

---

## 9. Forbidden mistakes

1. end `5*vh` instead of **`(c-0.4)*vh`**  
2. Missing intro progress gates (.08 / .04 / .1)  
3. 4 chapters or 6 — must be **5**  
4. Wrong image paths (`/images/story` vs `/story/`)  
5. Mobile pin (must be sticky progress only)  
6. Before runway  
7. Pulling ScrollIlluminate defaults wrong (dim **.24**, start top **82%** when used)  

---

## 10. Cross-links

- Prev: 03 · Next: 05 · Shell: 00 · GSAP §6 · notes/04-STORY.md  

---

*End of 04 Story platinum package.*
