# 01 — HERO Lab — Platinum Agent Package

**Section id:** `#hero`  
**Eyebrow:** `01 / The formula`  
**Lab URL:** `http://localhost:3010/lab/hero`  
**Full page order:** first  
**Background:** ink `#1a1b1d` with bone curtain  
**Pin (desktop):** `end: "+=120%"`, `scrub: true`, `pin: true`, `pinSpacing: true`, `refreshPriority: 3`  
**Runway before:** **NONE** (mandatory)  
**Runway after:** LabAfterStrip **60dvh** bone (pin exit only)

**Brand:** ACTUALLY. only (Still → ACTUALLY, period retained, dot color `#bcd3d8`).

---

## 0. Mission for the agent

Copy or rebuild the **Hero section in isolation** so loader, circle clip wipe, 3D can, support copy, scroll hint, and pin scrub match drinkstill/ACTUALLY numbers. Do not assemble other sections. Do not fork the section for the lab.

**Shell prerequisite:** read `00-LAB-SHELL.md` first.

**Research authority:** `notes/GSAP-ANIMATIONS.md` §3 · `notes/01-HERO.md` · `notes/CAN-3D.md` · source `app/src/sections/Hero.tsx` (~721 lines).

---

## 1. What the isolated lab is

| Piece | Role |
|-------|------|
| `pages/labs/HeroLab.tsx` | Thin shell: LabChrome + `<Hero />` + after-strip |
| `sections/Hero.tsx` | **Production section** — pin, clip, can, loader, copy |
| Supporting components | Loader, LetterStack, Bloom, ScrollHint, Can3D stack, text primitives |
| Shell | SmoothScroll, LabChrome, tokens CSS |

It is **not** the full homepage. Home also mounts `<Hero />` first.

---

## 2. Exact files to copy (file-for-file)

### 2.1 Lab + section

| # | Path under `app/src/` | Role |
|---|------------------------|------|
| 1 | `pages/labs/HeroLab.tsx` | Lab shell |
| 2 | `sections/Hero.tsx` | Section (do not fork) |
| 3 | `components/LabChrome.tsx` | Floating chrome + after-strip |

### 2.2 Hero-owned components

| # | Path | Role |
|---|------|------|
| 4 | `components/Loader.tsx` | Bone curtain loader + FLIP to wordmark |
| 5 | `components/LetterStack.tsx` | Per-letter wordmark |
| 6 | `components/ScrollHint.tsx` | Mouse track + bouncing dot |
| 7 | `components/Bloom.tsx` | Soft 60vh halo |
| 8 | `components/ScrollReveal.tsx` | Mobile formula block |
| 9 | `components/ScrollIlluminate.tsx` | Mobile word scrub |
| 10 | `components/TextReveal.tsx` | Mobile lines |
| 11 | `components/can/Can3D.tsx` | GLB can + heroMotion |
| 12 | *(exports from Can3D)* | `HeroContactShadow`, `StudioLights`, `LABEL_MAP` |

### 2.3 Libs

| # | Path | Role |
|---|------|------|
| 13 | `lib/hooks.ts` | useIsMobile, canvasDpr |
| 14 | `lib/lenis.ts` | getLenis (loader stop) |
| 15 | `lib/splitFallback.ts` | if TextReveal/Illuminate used |
| 16 | `components/SmoothScroll.tsx` | App shell |
| 17 | `index.css` | tokens |

### 2.4 Shell (see 00-LAB-SHELL)

App.tsx route `/lab/hero`, main.tsx, package.json, vite.config.ts.

---

## 3. Static assets (public/)

| Path | Size (approx) | Used by |
|------|---------------|---------|
| `models/can.glb` | 298 KB | Can3D |
| `hdri/studio_small_03_1k.hdr` | 995 KB | StudioLights Environment |
| `textures/labels/still-01-clear-2.png` | 401 KB | LABEL_MAP 01 (current code) |
| `textures/labels/still-01-clear.png` | 335 KB | alternate / notes |
| `textures/labels/still-02-dawn-2.png` | 407 KB | not hero default but pack for can swap |
| `textures/labels/still-03-dusk-2.png` | 410 KB | same |
| `images/cans/Actually-01.png` | 185 KB | optional preloads / fallbacks |
| `images/cans/still-01.png` | 160 KB | notes preloads |

**Hero default SKU:** `"01"` Clear.

---

## 4. npm dependencies (Hero lab minimum)

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

---

## 5. Import graph

```
HeroLab.tsx
├── LabChrome.tsx
│     ├── react-router-dom
│     └── gsap + ScrollTrigger (refresh on route)
└── sections/Hero.tsx
      ├── gsap + ScrollTrigger
      ├── Bloom
      ├── LetterStack
      ├── Loader
      ├── ScrollHint
      ├── ScrollIlluminate / ScrollReveal / TextReveal  (mobile)
      ├── can/Can3D → useGLTF(/models/can.glb), LABEL_MAP textures
      ├── StudioLights → Environment HDRI
      ├── HeroContactShadow → ContactShadows opacity .35
      ├── @react-three/fiber Canvas
      ├── three (ACES tone mapping)
      └── lib/hooks (useIsMobile, canvasDpr)

App shell:
SmoothScroll → lenis createLenis lerp 0.1 + ticker + lagSmoothing 0
```

### Hero.tsx import block (as in source)

```tsx
import { useEffect, useRef, useState, type MutableRefObject } from "react";
import { Canvas } from "@react-three/fiber";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Bloom } from "../components/Bloom";
import { LetterStack } from "../components/LetterStack";
import { Loader } from "../components/Loader";
import { ScrollHint } from "../components/ScrollHint";
import { ScrollIlluminate } from "../components/ScrollIlluminate";
import { ScrollReveal } from "../components/ScrollReveal";
import { TextReveal } from "../components/TextReveal";
import { Can3D, HeroContactShadow, StudioLights } from "../components/can/Can3D";
import { canvasDpr, useIsMobile } from "../lib/hooks";
import * as THREE from "three";
```

---

## 6. Lab shell structure (exact behavior)

```tsx
// HeroLab.tsx — conceptual
<div className="min-h-dvh bg-ink">
  <LabChrome sectionNum="01" sectionLabel="Hero · The formula" pinNote="+=120% · prio 3" />
  <main><Hero /></main>
  <LabAfterStrip minHeight="60dvh" bg="bone" note="hero pin released…" />
</div>
```

### Why no before runway

- Loader owns first paint (`fixed inset-0 z-[100] bg-bone`).
- Pin `start: "top top"` — section must sit at viewport top on load.
- Any preceding layout height **delays or breaks** the money-shot entrance.

### Why after strip

Pin duration is **120% of viewport**. pinSpacing already extends scroll height; after-strip gives a clean post-unstick landing for lab review.

---

## 7. Motion contracts (verbatim numbers)

### 7.1 Desktop pin + scrub timeline

```js
gsap.timeline({
  defaults: { ease: "power2.inOut" },
  scrollTrigger: {
    trigger: sectionEl, // #hero
    start: "top top",
    end: "+=120%",
    pin: true,
    pinSpacing: true,
    scrub: true,              // boolean true — NOT scrub:1
    invalidateOnRefresh: true,
    refreshPriority: 3
  }
})
// @0:
.to(k, { scrollBoost: () => 1.2 * Math.hypot(innerWidth, innerHeight), ease: "power2.in", duration: 0.55 }, 0)
.to(C, { current: 1, ease: "power1.inOut", duration: 0.6 }, 0)  // lock/progress
.to(boneCurtain, { opacity: 0, ease: "none", duration: 0.15 }, 0.48)
.to(haloWrap, { scale: 1.09, duration: 1, ease: "none" }, 0)
.to(dollyRef, { current: 0.09, duration: 1, ease: "none" }, 0)
.to(scrollHint, { opacity: 0, duration: 0.15, ease: "power1.out" }, 0)
```

Support (paused TL):

```js
support.to(supportItems, { y: 0, opacity: 1, duration: 0.55, stagger: 0.08, ease: "power2.out" })
support.to(rule, { scaleX: 1, duration: 0.5 }, 0.2)
// onUpdate: progress p
//   p > .58 → support.restart()
//   p < .35 → fade wrap 0 .25 → reset items y26 opacity0, rule scaleX0
```

Initial: support items `{y:26, opacity:0}`, rule `scaleX:0` origin left.

### 7.2 Clip-path circle driver

State `k`: `{ x:W/2, y:0.48*H, entrance:0, swell:0, breath:0, scrollBoost:0, hasPointer:false }`

CSS start: `clipPath: "circle(0px at 50% 48%)"` on ink layer z-20.

After reveal && !mobile:

```js
gsap.to(k, { entrance: 1, duration: 1.2, delay: 0.15, ease: "power2.inOut" })
gsap.to(k, { breath: 9, duration: 2.2, yoyo: true, repeat: -1, ease: "sine.inOut" })
const qx = gsap.quickTo(k, "x", { duration: 0.62, ease: "power2.out" })
const qy = gsap.quickTo(k, "y", { duration: 0.62, ease: "power2.out" })
// radius every ticker frame:
d = max(0, 170*entrance + swell + breath*entrance + scrollBoost)
clip.style.clipPath = `circle(${d}px at ${x}px ${y}px)`
```

Pointer swell: peak `min(130, speed * …)`, decay delayedCall `.3` → 0 over **1.1** power2.out.

459px ring (hero-only, not global cursor): `scale=d/170`, opacity `entrance*clamp(1-scrollBoost/240)`.

Halo parallax: lerp **.06** toward pointer offset × fade with progress.

### 7.3 Can3D hero motion

```
pe = 35 * π/180
pt = -(540 * π/180)
pn = 1.4 * π
Entrance duration: 1.6s
  easeT = 1 - (1-e)^4          // quart out
  easeN = cubic inOut
  pos.y = 4*(1-easeT)
  rot.x = pe*(1-easeT)
  rot.y = pt*(1-easeN)
  scale = 0.8 + 0.2*easeT
  opacity metal+label = easeT
Scroll ST: start top top, end bottom top, scrub:1 → scrollRot = progress * pn
Drag: Δrot = 0.005 * ΔclientPx
Bob: 0.06 * sin(2π/6 * t)
Parallax z/H: .15/.08 lerp .05
Grab scale → 1.04 while dragging && lockBlend < .5
dprCap: 1.5
ContactShadows opacity: .35
Camera: [0, 0.3, 8.0] fov 26 (implementation; notes also cite 7.6 — match source Hero.tsx)
targetHeight: 2.2 desktop
Bloom: size 60vh intensity soft
```

### 7.4 Letter stack (desktop H1)

| Prop | Value |
|------|--------|
| stagger | **.05** |
| duration | **.9** |
| yOffset | **60** |
| instant | **true** (after FLIP loader — set visible, no play) |

Mobile: yOffset **40**, instant **false**.

### 7.5 Scroll hint

```js
tl.repeat(-1).repeatDelay(0.5)
  .set(dot, { y:0, opacity:0 })
  .to(dot, { opacity:1, duration:0.25, ease:"power1.out" })
  .to(dot, { y:19, duration:1, ease:"power2.inOut" }, 0.1)
  .to(dot, { opacity:0, duration:0.3, ease:"power1.in" }, 0.85)
// track 22×38 r11 border rgba(26,27,29,.3); dot 5×5 #bcd3d8
```

### 7.6 Loader (inside Hero)

| Phase | Spec |
|-------|------|
| Soft ready | **2200ms** (reduce **400ms**) |
| Hard force | **9000ms** |
| After assets 100% | wait **2500ms** then maybeReveal |
| Wordmark in | y -0.6em opacity0 → 0/1 **.45 power2.out** |
| Hold | **.4s** |
| FLIP desktop | measure nav vs H1; to x,y,scale **.9 power3.inOut**; curtain opacity0 **.35 power1.out** at `-=0.35` |
| Lenis | stop during lock; overflow hidden; prevent wheel/touchmove |

**Lab note:** Full-page Nav may be absent on lab route. Loader should still complete (skip or soft-path FLIP if nav wordmark missing). Verify no infinite hang.

### 7.7 Mobile hero

- **No** pin, **no** clip timeline, **no** bone curtain pin path  
- Can `targetHeight: 2.6`, `h-[52vh]`  
- ScrollReveal / TextReveal / ScrollIlluminate for formula  
- “Drag to spin” opacity on first drag  

---

## 8. DOM / copy contracts

### Structure (conceptual)

```
section#hero.relative.w-full.min-h-screen.overflow-hidden.bg-ink
├── Loader (fixed bone curtain z-100) — until revealed
├── ink layer z-20 clip-path circle
│   ├── Bloom soft 60vh
│   ├── Canvas Can3D heroMotion
│   └── left support copy 34vw (md+)
├── bone curtain z-10 wordmark 23vw (ACTUALLY. ~19vw if needed to fit)
│   └── bottom bar: tagline | Scroll hint | Wellington
└── 459px ring follower z-30
```

### Copy (ACTUALLY)

| Slot | Text |
|------|------|
| Eyebrow | `01 / The formula` |
| H2 | `Sustained natural focus, without caffeine.` |
| Body | `A nootropic blend of four adaptogens at clinical doses. Brewed and canned in Wellington, poured wherever the work is.` |
| Stats | `1,150` mg active blend · `0` mg caffeine |
| Wordmark | `ACTUALLY.` (dot #bcd3d8) |
| Bottom L | `Stay still.` / `Stay sharp.` (or ACTUALLY-equivalent if swapped) |
| Bottom R | `Nootropic, not caffeine` / `Wellington, New Zealand` |
| Scroll | `Scroll` + track |

### Layout numbers

| Token | Value |
|-------|--------|
| Support width | `min(100%, 34vw)` |
| Support pl | `clamp(24px, 7vw, 120px)` |
| Wordmark size | ~`23vw` STILL / ~`19vw` ACTUALLY if needed |
| Wordmark tracking | `-0.03em` weight 800 leading 0.78 |
| Rule | 72×1 #bcd3d8 |
| Halo | 60vh soft bloom #bcd3d8 |
| Ring | 459×459 radial transparent 56% → ink.10 70% → transparent 84% |

---

## 9. Canvas / WebGL checklist

- [ ] `/models/can.glb` loads (no 404)
- [ ] `/hdri/studio_small_03_1k.hdr` loads
- [ ] Label texture 01 loads (LABEL_MAP)
- [ ] ACES + exposure 1.05
- [ ] dpr capped 1.5 on hero
- [ ] ContactShadows opacity .35
- [ ] Entrance spin pe/pt then scroll pn
- [ ] Drag works; pointer events on canvas
- [ ] Frameloop not stuck never after reveal

---

## 10. CSS / tokens used

From shell: `--color-ink`, `--color-bone`, `--color-mist`, `--color-clear` (#bcd3d8), `--font-wordmark`, `--font-display`, `--font-sans`, `--nav-h`.

Tailwind: `bg-ink`, `text-bone`, `md:flex`, clamps, z-index stack 10/20/30/100.

Grain: full page uses `.grain-overlay`; optional on lab.

---

## 11. Runtime contracts the section expects

| Contract | Detail |
|----------|--------|
| SmoothScroll parent | Lenis + ST update + lagSmoothing 0 |
| Desktop width | ≥768 for pin path |
| `#hero` as section root | ST trigger |
| Refs for clip, bone, support, hint, halo, ring | required |
| `revealed` state | gates entrance animations |
| No preceding sibling height | lab: none |

**Does not require:** `#site-footer` (ORION-only), Nav (lab), other sections.

---

## 12. Acceptance gates (platinum)

### Visual

- [ ] Loader completes; bone curtain reveals hero
- [ ] Wordmark ACTUALLY. with alpine/clear dot treatment
- [ ] Circle clip expands from center ~48% Y with breath pulse
- [ ] Pointer moves clip center (fine pointer)
- [ ] Scroll pin: can dolly + rotate, curtain fades, support copy appears after ~58% progress
- [ ] Scroll hint fades on scroll
- [ ] Bloom soft halo visible behind can
- [ ] After-strip reachable after pin ends

### Motion numbers

- [ ] Pin end ≈ 120% of hero height (not 200%, not 100%)
- [ ] scrub is boolean true feel (tight to scroll), not laggy scrub:2
- [ ] Support hysteresis 0.58 / 0.35 works (scroll back resets)

### Mobile (≤767)

- [ ] No pin; no circle wipe path
- [ ] Can still visible; drag to spin
- [ ] Formula text uses reveal primitives

### Reduce motion

- [ ] No pin thrash; content visible; no infinite loader (400ms soft)

### Lab hygiene

- [ ] LabChrome does not block can drag (pointer-events split)
- [ ] Route `/lab/hero` only mounts Hero (no Flavors DOM)
- [ ] No before-runway in HeroLab.tsx

---

## 13. Forbidden mistakes

1. Adding a runway header before `<Hero />`  
2. Changing pin to `+=100%` or scrub:1 without matching live  
3. Using Bloom **strong** instead of **soft** on hero  
4. Forgetting dprCap 1.5  
5. Wrong clip formula (missing breath×entrance or wrong 170 base)  
6. Instant letters false on desktop (breaks FLIP handoff)  
7. Forking Hero into lab page  
8. Skipping Can3D entrance 1.6s pe/pt  
9. Mixing global dual cursor z-200 with hero 459 ring (keep separate)  

---

## 14. Suggested standalone tree (if extracting)

```
hero-lab-standalone/
├── package.json
├── vite.config.ts          # port 3010
├── index.html
├── public/
│   ├── models/can.glb
│   ├── hdri/studio_small_03_1k.hdr
│   └── textures/labels/still-01-clear-2.png (+ 02/03 optional)
└── src/
    ├── main.tsx
    ├── App.tsx             # SmoothScroll + HeroLab route
    ├── index.css
    ├── pages/labs/HeroLab.tsx
    ├── sections/Hero.tsx
    ├── components/…        # list §2
    └── lib/…
```

---

## 15. Cross-links

- Shell: `00-LAB-SHELL.md`  
- Next section lab: `02-FLAVORS-LAB-AGENT-PACKAGE.md`  
- Notes: `notes/01-HERO.md`, `notes/GSAP-ANIMATIONS.md` §3, `notes/CAN-3D.md`  
- Protocol: `website-tests/MOTION-CLONE-PROTOCOL.md`  

---

*End of 01 Hero platinum package. Leave no pin number, texture path, or clip formula out of the rebuild.*
