# 00 — ACTUALLY Lab Shell (Shared) — Platinum Agent Package

**Purpose:** Everything every section lab needs that is **not** section-specific: router, SmoothScroll/Lenis, LabChrome, tokens CSS, Vite, dependencies.

**Do not skip this package.** Section packages assume shell is present.

**Canonical app root:** `E:\website-tests\actually-clone\app\`  
**Dev:** `http://localhost:3010`

---

## 0. Architecture

```
BrowserRouter
└── SmoothScroll          ← Lenis + ScrollTrigger bridge (REQUIRED)
    └── Routes
        ├── /             → Home (Nav + all 6 sections + Footer)
        ├── /lab/hero     → HeroLab
        ├── /lab/flavors  → FlavorsLab
        ├── /lab/inside   → InsideLab
        ├── /lab/story    → StoryLab
        ├── /lab/press    → PressLab
        └── /lab/shop     → ShopLab
```

**Critical coupling:** Without `SmoothScroll` (Lenis ↔ ST), every pin/scrub section desyncs or feels broken.

Labs **share** production `sections/*.tsx`. Lab pages are thin wrappers only.

---

## 1. Exact shell files (copy paths)

| # | Absolute path | Role |
|---|---------------|------|
| 1 | `…\app\src\App.tsx` | BrowserRouter + Routes |
| 2 | `…\app\src\main.tsx` | React root + `index.css` |
| 3 | `…\app\src\index.css` | Tokens, grain, fonts, base |
| 4 | `…\app\src\vite-env.d.ts` | Vite types |
| 5 | `…\app\src\components\SmoothScroll.tsx` | Lenis ticker bridge |
| 6 | `…\app\src\lib\lenis.ts` | createLenis / getLenis / clearLenis |
| 7 | `…\app\src\components\LabChrome.tsx` | Floating lab UI + LabAfterStrip + ST refresh |
| 8 | `…\app\src\pages\Home.tsx` | Full assemble |
| 9 | `…\app\src\pages\labs\HeroLab.tsx` | 01 shell |
| 10 | `…\app\src\pages\labs\FlavorsLab.tsx` | 02 shell |
| 11 | `…\app\src\pages\labs\InsideLab.tsx` | 03 shell |
| 12 | `…\app\src\pages\labs\StoryLab.tsx` | 04 shell |
| 13 | `…\app\src\pages\labs\PressLab.tsx` | 05 shell |
| 14 | `…\app\src\pages\labs\ShopLab.tsx` | 06 shell |
| 15 | `…\app\package.json` | Deps |
| 16 | `…\app\vite.config.ts` | port **3010**, react + tailwind plugins |
| 17 | `…\app\tsconfig.json` | TS |
| 18 | `…\app\index.html` | HTML shell |

(Replace `…` with `E:\website-tests\actually-clone`.)

---

## 2. SmoothScroll + Lenis (verbatim contract)

### `lib/lenis.ts`

```ts
import Lenis from "lenis";

let instance: Lenis | null = null;

export function createLenis() {
  const e = new Lenis({ lerp: 0.1, smoothWheel: true });
  instance = e;
  return e;
}

export function getLenis() {
  return instance;
}

export function clearLenis(e: Lenis) {
  if (instance === e) instance = null;
}
```

| Param | Value | Why |
|-------|-------|-----|
| `lerp` | **0.1** | drinkstill exact |
| `smoothWheel` | **true** | soft wheel |

Sections call `getLenis()?.scrollTo(...)` for tabs/snaps (duration 0.9–1.2).

### `SmoothScroll.tsx`

```ts
const lenis = createLenis();
lenis.on("scroll", ScrollTrigger.update);
const onTick = (t: number) => { lenis.raf(1000 * t); };
gsap.ticker.add(onTick);
gsap.ticker.lagSmoothing(0);
// cleanup: ticker.remove, lenis.destroy(), clearLenis
```

| Item | Value |
|------|--------|
| ST update | on every Lenis scroll |
| raf scale | `1000 * t` (gsap ticker time → ms) |
| lagSmoothing | **0** (mandatory) |

---

## 3. LabChrome contracts

### Floating chrome (all labs)

- `position: fixed`, `z-index: 9999`
- Outer wrapper `pointer-events: none`; interactive children `pointer-events: auto`
- **Does not occupy document flow** → pin `start: "top top"` still sees section at viewport top
- On `pathname` change: `window.scrollTo(0,0)` + `ScrollTrigger.refresh()` next frame

### LabAfterStrip (pin labs 01–04 only)

| Section | minHeight | bg |
|---------|-----------|-----|
| Hero | 60dvh | bone |
| Flavors | 45dvh | bone |
| Inside | 45dvh | ink |
| Story | 45dvh | bone |
| Press / Shop | **omit** | — |

Purpose: scrub past pin end; not a content runway.

### Runway forbidden list

- ❌ Layout header `min-h-[45dvh]` before Hero (ORION pattern does **not** apply here)
- ❌ Spacer divs that push pin trigger below fold for “breathing room”
- ❌ Full site Nav on non-hero labs (Nav auto-hides after hero — breaks UX)

Use **LabChrome** instead of **Nav** on labs.

---

## 4. Design tokens (`index.css`) — must copy

```css
@theme {
  --color-bone: #efede6;
  --color-ink: #1a1b1d;
  --color-mist: #6a6965;
  --color-alpine: #1e423e;
  --color-clear: #bcd3d8;
  --color-dawn: #e8c9a0;
  --color-dusk: #c9b5c8;
  --font-sans: "Inter", "Segoe UI", system-ui, -apple-system, sans-serif;
  --font-serif: "Georgia", "Times New Roman", serif;
  --font-display: "Georgia", "Times New Roman", serif;
  --font-wordmark: "Inter", "Segoe UI", system-ui, sans-serif;
  --nav-h: 72px;
}
@media (max-width: 767px) {
  :root { --nav-h: 56px; }
}
```

Also required:

- `.grain-overlay` — fixed z-90 opacity 0.04 SVG turbulence `baseFrequency 0.82` (Home uses it; Hero lab may omit grain if not wrapping Home chrome — full parity prefers including on full page)
- `.font-wordmark` / `.font-display` / `.font-sans` utility classes
- `html/body/#root` min-height; body bone bg, ink text
- Optional Klim stand-in note: commercial fonts not licensed → Inter/Georgia metrics stand-ins

Optional font file if using wordmark face:  
`public/fonts/test-soehne-breit-fett.woff2` (not wired in CSS by default).

---

## 5. npm dependencies (full app matrix)

### Runtime (required for any lab that touches 3D or motion)

```json
{
  "dependencies": {
    "react": "^19.1.1",
    "react-dom": "^19.1.1",
    "react-router-dom": "^7",
    "gsap": "^3.13.0",
    "lenis": "^1.3.11",
    "three": "^0.180.0",
    "@react-three/fiber": "^9.3.0",
    "@react-three/drei": "^10.7.6"
  }
}
```

### Dev

```json
{
  "devDependencies": {
    "@vitejs/plugin-react": "^5.0.3",
    "vite": "^7.1.7",
    "typescript": "~5.9.2",
    "@types/react": "^19.1.13",
    "@types/react-dom": "^19.1.9",
    "@types/three": "^0.180.0",
    "tailwindcss": "^4.1.13",
    "@tailwindcss/vite": "^4.1.13"
  }
}
```

### Per-section dep cuts (minimum)

| Lab | drei | three/r3f | extra |
|-----|------|-----------|-------|
| 01 Hero | yes | yes | full can stack |
| 02 Flavors | via Can3D/InlineCan | yes | — |
| 03 Inside | yes (Environment, ContactShadows) | yes | drawSvg |
| 04 Story | no | no | — |
| 05 Press | no | no | — |
| 06 Shop | no | no | — |
| Shell only | no | no | router + lenis + gsap |

Live site used GSAP **3.15.0** + Club SplitText + DrawSVGPlugin. Clone uses free GSAP + `splitFallback.ts` + `drawSvg.ts` polyfill. **Numbers must still match** GSAP-ANIMATIONS.md.

---

## 6. Shared motion primitives (used across sections)

Copy these component files when a section package lists them:

| File | Defaults (authoritative) |
|------|--------------------------|
| `Bloom.tsx` | scale 1.05 yoyo 2s sine.inOut; soft/strong intensity |
| `ScrollReveal.tsx` | y12 opacity 0→1, **0.6 power2.out**, start **top 85%** |
| `ScrollIlluminate.tsx` | words dim **.24**, scrub start **top 82%** end **top 34%**, stagger **0.35** |
| `TextReveal.tsx` | lines yPercent **115→0**, duration **.9**, stagger **.09**, start **top 85%** once |
| `LetterStack.tsx` | stagger .03 duration .7 yOffset 18 (hero overrides) |
| `ScrollHint.tsx` | loop: opacity + y19, track 22×38, dot 5×5 #bcd3d8 |
| `splitFallback.ts` | SplitText substitute (chars/words/lines) |
| `hooks.ts` | `useIsMobile` max-width **767px**; `usePrefersReducedMotion`; `canvasDpr` mobile [1,1.5] desktop [1,2] |
| `useInView.ts` | rootMargin string, frameloop gate for canvases |

### prefers-reduced-motion

Every effect early-returns: `gsap.set(…, { opacity: 1 })` (and related). Loader soft timeout **400ms** instead of 2200. Pin paths disabled on mobile branches and reduce.

---

## 7. App.tsx route table (exact)

```
/                 Home
/lab/hero         HeroLab
/lab/flavors      FlavorsLab
/lab/inside       InsideLab
/lab/story        StoryLab
/lab/press        PressLab
/lab/shop         ShopLab
/lab              → redirect /lab/hero
*                 → redirect /
```

---

## 8. Pin master table (cross-lab)

| Section | end | scrub | pin | snap | refreshPriority |
|---------|-----|-------|-----|------|-----------------|
| Hero desktop | `+=120%` | `true` | yes | — | **3** |
| Flavors desktop | `3 * innerHeight` | `1` | yes | `[0,1/3,2/3,1]` min.25 max.55 delay.1 | **1** |
| Inside desktop | `4 * innerHeight` | `1` | yes | `[0,.25,.5,.75,1]` min.2 max.5 delay.1 | 0 |
| Story desktop | `(c-0.4)*innerHeight` | `1` | yes | progressive from 0.1 | -1 |
| Press | top bottom→bottom top | velocity only | no | — | — |
| Shop | various once | no pin | no | — | — |

Mobile (≤767): **no pin** on flavors/inside/story; hero mobile branch without pin/clip.

---

## 9. Can3D global constants (any 3D lab)

```
pe = 35° entrance rotX
pt = -540° entrance rotY (-1.5 turns)
pn = 1.4π scroll scrub rotY
model: /models/can.glb (298048 bytes)
HDRI: /hdri/studio_small_03_1k.hdr (995328 bytes)
LABEL_MAP:
  01 → /textures/labels/still-01-clear-2.png
  02 → /textures/labels/still-02-dawn-2.png
  03 → /textures/labels/still-03-dusk-2.png
metal: #C8C8C8 metalness 0.95 roughness 0.42 env 0.85
label: #fff m 0.05 r 0.65 env 0.6 + map
texture: anisotropy 16, flipY false, center .5/.5, offset -.14/-.34
toneMapping: ACES exposure 1.05
```

Full material/lighting: `notes/CAN-3D.md`.

---

## 10. Shell acceptance gates

- [ ] `npm run dev` serves **3010**
- [ ] `/` shows all six sections in order + Footer
- [ ] Each `/lab/*` loads without console errors
- [ ] LabChrome links switch labs; scroll resets; ST refreshes
- [ ] Lenis smooth wheel active (`html` not raw native scroll feel)
- [ ] `prefers-reduced-motion` does not throw
- [ ] No layout runway before Hero lab
- [ ] Pin labs 01–04 have after-strip; 05–06 do not
- [ ] Production section files are **not** forked under `pages/labs/`

---

## 11. Forbidden mistakes

1. Mounting a pin section **without** SmoothScroll  
2. Putting a **before runway** on Hero  
3. Duplicating `Hero.tsx` into `HeroLab.tsx` (must import shared section)  
4. Using ORION pin-spacer gray CSS blindly (ACTUALLY pin backgrounds are ink/bone section-owned)  
5. Changing `lerp` away from 0.1  
6. Forgetting `lagSmoothing(0)`  
7. Leaving `react-router-dom` out but using LabChrome Links  
8. Editing ORION clone while working ACTUALLY  

---

## 12. Related research docs (read-only)

| Path | Use |
|------|-----|
| `notes/00-OVERVIEW.md` | Site map |
| `notes/GSAP-ANIMATIONS.md` | Motion authority |
| `notes/TOKENS.md` | Full token scale |
| `notes/CAN-3D.md` | WebGL authority |
| `notes/GAPS-AUDIT.md` | Prior note errors |
| `../MOTION-CLONE-PROTOCOL.md` | Lab-first protocol |
| `../SECTION-LAB-TEMPLATE.md` | Generic lab template |

---

*End of shell package. Proceed to section packages 01–06.*
