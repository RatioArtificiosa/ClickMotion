# GAPS AUDIT — prior notes vs live drinkstill.nz bundles (solo recheck)

**Date:** 2026-08-09  
**Method:** No subagents. Fresh `Invoke-WebRequest` of `https://www.drinkstill.nz/`, re-download all `/_next/static/chunks/*`, Python regex extraction over every `.js` file, then module-window dumps for `Hero`, `Can3D`, `Flavors`, `Inside`, `Story`, `Press`, `WhereAvailable`, `SmoothScroll`, `Nav`, `ScrollReveal`, `ScrollIlluminate`, `TextReveal`.  
**Primary sources:** `raw/js/0cmb.wqv_a2_y.js` (1,164,715 B), `0ba6j9d7gg207.js` (GSAP **3.15.0** + ScrollTrigger + SplitText + **DrawSVGPlugin**), `0wm4g9w3152qd.js` (Lenis + SmoothScroll + Nav + Cursor + Magnetic), `130z~aqg5aigg.js` (Bloom + ScrollReveal), `15yffavnl8.tc.js` (Bloom only).

Raw dumps: `raw/js/_audit_tmp/` (`00_counts.json` … `10_final.md`, `extract_*.py`).

---

## Inventory status

| Area | Status after recheck |
|------|----------------------|
| Live HTML | Re-fetched `still_raw_live.html` 129,910 B — same deployment `dpl_HSeafWev…` |
| Chunk set | **New** chunk on live: `03~yq9q893hmn.js` (112 KB) — **zero GSAP**; mostly React/runtime. Missing from first pass inventory list. |
| GSAP location | **All app motion** is in `0cmb` + helpers in `0wm4` / `130z` / `15yf`. Not in `10u3`, `0imr`, `0d3`, `0dgq`, `0u.-`. |
| ST.create count | **8 app** + 1 GSAP-internal factory = **9** total matches |
| gsap.* calls | **107** concrete `to/fromTo/from/set` (app+core util) |
| Timelines | **5** `gsap.timeline` in app chunk |
| Section rebuild files | `sections/` still only has reference HTML + README — **not built yet** |

---

## Critical gaps / errors in prior agent notes

### 1. `ScrollReveal` ≠ word scrub (NAME COLLISION — HIGH)

| Prior claim | Actual |
|-------------|--------|
| `ScrollReveal` = SplitText words opacity `.24→1` scrub `start top 85% end top 34%` | **Wrong.** That is **`ScrollIlluminate`** (`0cmb`, defaults `dim:.24`, **`start:"top 82%"`**, `end:"top 34%"`, `stagger:.35`, `ease:"none"`, `scrub:true`). |
| — | Real **`ScrollReveal`** is in `130z~aqg5aigg.js`: whole-element `fromTo {opacity:0,y:12}→{opacity:1,y:0}` **`duration:.6` `ease:"power2.out"`** `scrollTrigger start:"top 85%"` `toggleActions:"play none none none"`, optional `delay`. Initial style `opacity:0; transform:translateY(12px)`. |

### 2. Lenis bridge was second-hand (MEDIUM → FIXED)

| Prior claim | Actual |
|-------------|--------|
| “Verified in glass-motion-showcase clone” | **On-site:** `0wm4g9w3152qd.js` exports `createLenis(){ return new Lenis({lerp:.1,smoothWheel:true}) }` and `SmoothScroll` does: `e.on("scroll", ScrollTrigger.update); gsap.ticker.add(t=>e.raf(1e3*t)); gsap.ticker.lagSmoothing(0); destroy+clearLenis on unmount`. |

### 3. Hero clip-path formula incomplete (HIGH)

Prior notes listed pin/scrub but **omitted the full radius driver** and pointer coupling:

```
// k = {x, y, entrance, swell, breath, scrollBoost, hasPointer}
// initial clip: circle(0px at 50% 48%)  — center at (W/2, 0.48*H)
// ticker every frame:
d = max(0, 170*entrance + swell + breath*entrance + scrollBoost)
clipPath = circle(${d}px at ${x}px ${y}px)

// entrance (after loader reveal, desktop only):
gsap.to(k, {entrance:1, duration:1.2, delay:.15, ease:"power2.inOut"})

// breath idle:
gsap.to(k, {breath:9, duration:2.2, yoyo:true, repeat:-1, ease:"sine.inOut"})

// pointer center: gsap.quickTo(k,"x"|"y",{duration:.62,ease:"power2.out"})
// swell from pointer velocity: min(130, hypot(dx,dy)/dt * 1000/2200 * 130)
//   peak gsap.to swell duration .3 power2.out; decay delayedCall .3 then swell→0 duration 1.1 power2.out

// scroll pin timeline (desktop):
scrollBoost → 1.2*hypot(W,H) duration .55 ease power2.in (scrub)
progress C.current → 1 duration .6 power1.inOut
bone curtain O → opacity 0 duration .15 ease none @.48
halo wrapper scale → 1.09 duration 1 ease none
dolly B.current → .09 duration 1 ease none
scroll hint S → opacity 0 duration .15 power1.out @0
// support copy paused TL at progress>.58 / reset <.35 (see GSAP-ANIMATIONS.md)
```

Also missing: **459px radial ring** (hero only) follows clip center, `scale = d/170`, `opacity = entrance * clamp(1 - scrollBoost/240)`. This is **not** the global custom cursor.

### 4. Hero Bloom intensity wrong (MEDIUM)

| Prior | Actual |
|-------|--------|
| Often “strong” / blur2 | Hero uses **`intensity:"soft"`** → opacity `.85`, **blur 6px**, soft radial stops. Size `"60vh"`. |

### 5. Can3D numbers mostly OK — gaps (MEDIUM)

**Confirmed correct:** `pe=35°`, `pt=-540°`, `pn=1.4π`, entrance `1.6s`, quart+cubic, `y:4*(1-t)`, scale `.8→1`, drag `.005`, parallax `.15/.08` lerp `.05`, tilt lerp `.045`, bob `.06*sin(2π/6*t)`, texture offset `-.14/-.34`, anisotropy 16, metal `#C8C8C8` m.95 r.42, label m.05 r.65.

**Missed / wrong:**

| Item | Actual |
|------|--------|
| Hero `dprCap` | **`1.5`** (not bare min(dpr,2)) — `canvasDpr()` returns mobile `[1,1.5]` desktop `[1,2]`, then min with cap |
| ContactShadows | **`opacity:.35`** (notes said .32), `position [0,-1.4,0]`, scale 4, blur 2, far 2, res 512, color `#1a1b1d` |
| Grab scale | While dragging and lockBlend < .5: scale target **1.04**, lerp `.1` |
| Pointer follow | When active: `2.5 * pointer.x`, `1.6 * pointer.y`, blend factor `.09 + lockBlend*.09` |
| Non-hero controlled tilt | `controlledTiltX:.16` default for InlineCan |
| Flavors targetHeight | **2.55** (InlineCan stage) |
| Mobile hero targetHeight | **2.6** |
| Auto-spin fallback | `B.current += .08 * delta` rad/frame when no scroll rot (not period-only) |
| ScrollTrigger can scrub | only when `heroMotion && scrollTriggerEl && !externalScrollRot` — hero wires separate |

### 6. Wordmark letters (MEDIUM)

| Prior | Actual |
|-------|--------|
| Generic stagger | Component defaults: `stagger:.03, duration:.7, yOffset:18` |
| Hero desktop | **`stagger:.05, duration:.9, yOffset:60`**, `highlightChar:".", play:revealed, instant:true` (instant = set opacity1 immediately — loader already did FLIP; letters still animated unless instant) |
| Mobile | `stagger:.05, duration:.9, yOffset:40`, no `instant` |

`instant:true` → `gsap.set(letters,{opacity:1,y:0})` skips animation. So **desktop hero H1 does NOT letter-stagger on reveal** when instant is true — the bone curtain just shows full wordmark. (SSR still has `opacity:0` on letters until set.)

### 7. Loader / curtain (HIGH — barely documented)

| Item | Actual |
|------|--------|
| Force reveal hard timeout | **`9000` ms** always |
| Soft maybeReveal | **`2200` ms** normal / **`400` ms** reduced-motion |
| Progress gate | After load `progress===100`, wait **`2500` ms** then maybeReveal |
| Lenis during loader | `getLenis()?.stop()` + overflow hidden + wheel/touch prevent + interval stop every 150ms; on unmount `start()` |
| FLIP | Desktop: nav wordmark parent → `#hero h1` rect scale/x/y **`.9 power3.inOut`**, then curtain opacity **`.35 power1.out` at `"-=0.35"`** |
| Mobile FLIP fallback | nav scale **1.6 duration .55 power2.in**, curtain **`.5 power1.inOut` parallel** |
| Wordmark in | `y:"-0.6em"→0`, opacity 0→1, **`.45 power2.out`**, hold **`.4`**, then FLIP |
| Floating labels | `[data-pop]` timeline: stagger `.42*i`, `back.out(1.6) .45`, float `sine.inOut .95`, out `power2.in .32`, repeat -1 delay .3 |
| Progress bar | tween `val` duration `.4+(target-cur)/100*1.2` power2.out, gradient fill + padded 3-digit text |

### 8. Mobile hero entirely missing from GSAP notes (HIGH)

Desktop pin/clip **does not run** when `useIsMobile()`. Mobile path:

- No clip-path circle, no 120% pin
- Wordmark `24vw` bone (not ink on bone curtain)
- Can area `h-[52vh]`, drag to spin, “Drag to spin” opacity fade
- Copy uses `ScrollReveal` / `TextReveal` / `ScrollIlluminate` with mobile type sizes

### 9. Nav motion wrong (MEDIUM)

| Prior | Actual |
|-------|--------|
| blur 8px, duration 250ms hide | **`backdrop-filter: blur(20px)`**, bg `rgba(239,237,230,0.92)`, border `1px solid rgba(140,139,134,0.4)` when `scrollY>80` OR mobile |
| translateY hide on direction | While `#hero` bottom **>100px**: nav **shown**. First time hero bottom ≤100: **hide** (`translateY(-100%)`). Scrolling back onto hero shows again. **No mid-page direction toggle.** |
| transition | `duration-[400ms] ease-out` on transform/bg/blur/border |
| Magnetic links | `quickTo` x/y **`.4 power2.out`**, strength **`.3`** (default magnetic `.35`) |
| Lenis nav scrollTo | **`duration:1.2`** for anchors and home |
| Cart badge | scale **1.4→1 duration .35 power2.out** on count increase |

### 10. Global custom cursor wrong (HIGH)

| Prior | Actual |
|-------|--------|
| Single 459×459 radial z-30 | That 459px ring is **hero clip follower only**. Global cursor is **`z-[200]` dual**: **6px** white dot (`quickTo .08`) + **36px** ring (`quickTo .45`), mix-blend difference; modes default/interactive(56)/labeled(76) with label text (e.g. “Drag”). |

### 11. Flavors / Inside small number mismatches (LOW–MEDIUM)

| Item | Prior | Actual |
|------|-------|--------|
| Flavors card out | sometimes `.22` | **`.25 power3.in`** then in `.45 power3.out` |
| stage-item in | y:14? | **y:18** stagger `.05` delay `.05` |
| Flavors mobile card chars | — | **yPercent:108**, duration **`.55`**, stagger **`.03`** (inside deck uses `.5` / `.02`) |
| Inside title chars desktop | yPercent 60 | **confirmed** `.55` stagger `.028` delay `.12` |
| Inside botanicals rock | missing | `rotation -3.5→3.5 duration 5 yoyo repeat -1 sine.inOut` |
| Inside dosage bar | ok | `scaleX: dosageMg/1150`, `.8` delay `.25` power2.inOut + counter same |
| Flavors snap hysteresis | partial | `n=1/6`; thresholds `.55`, `n±.05`, `.45` — exact ternary in GSAP-ANIMATIONS |
| Flavors bg gradient desktop | 90% 70% | **Desktop pin:** `radial-gradient(72% 85% at 66% 52%, bloom30 → bloom14 42% → transparent 72%)` — mobile deck uses different `90% 70% at 50% 40%` |
| Tab Lenis scrollTo | — | Flavors `duration:1`, Inside `1`, Story desktop `1.2`, Story mobile year `.9` |

### 12. Story mobile clipPath (LOW)

Mobile chapters use custom `clipPath inset(0% 0% (1-n)*92% 0%)` + opacity `.4+.6*n` driven by ST progress — partially noted, full `H()` math now in GSAP-ANIMATIONS.

### 13. Press quotes (MEDIUM — incomplete)

Prior focused on marquee only. Also:

- Quote lines: SplitText `lines` mask, **yPercent 115→0**, **duration .85**, stagger **.09**, delay **`.12*index`**, start `top 85%` once
- Figcaption: opacity0 y12 → 1/0, **`.6 power2.out`**, delay **`.45+.12*index`**

### 14. WhereAvailable / Shop GSAP (HIGH — was thin)

Full entrance cascade (see GSAP-ANIMATIONS §8):

- Eyebrow `y:40` `.8 power3.out` start top 80%
- H2 SplitText lines yPercent 115, `.9` stagger `.09` top 80% once
- Stockist columns `y:60` delay `.15*i` (×.7 mobile)
- Items `[data-stockist-item]` y12 stagger `.06` delay col+`.25`
- Rules `scaleX 0→1` `.6 power3.out` top 88%
- Product cards `y:80 scale .96→1` duration **1** delay `.2*i`

### 15. GSAP version / plugins (LOW)

- Core **3.15.0**
- Plugins: ScrollTrigger, SplitText, **DrawSVGPlugin** (`name:"drawSVG"`), ScrollTo (present in core bundle), Observer
- No FreeType / MorphSVG found

### 16. Per-section notes DOM vs motion

`01-HERO.md` … `06-SHOP.md` DOM/copy are largely solid; **motion subsections are incomplete** relative to this audit. Prefer **`GSAP-ANIMATIONS.md` (rewritten)** as motion source of truth going forward.

### 17. Still missing for pixel-perfect rebuild (not GSAP, but blockers)

- Klim woff2 font files not vendored in `actually-clone/assets`
- `models/can.glb`, HDR, label textures not downloaded (only PNG preloads 01–03 + og)
- `sections/01-hero` … `06-shop` interactive rebuilds not started
- RSC payload / cart drawer / footer email form micro-motion not fully extracted (footer mostly CSS; cart open unscoped)

---

## What was already correct (credit)

- Hero pin `+=120%`, `refreshPriority:3`, scrub true, support thresholds `.58`/`.35`
- Flavors `3*vh` snap `[0,1/3,2/3,1]`
- Inside `4*vh` snap `[0,.25,.5,.75,1]`
- Story `(c-.4)*vh` progressive snap
- Press marquee 38s/52s + skew ±6 v/420 + timeScale 1–4
- Can entrance 1.6s / pn 1.4π / drag .005 / materials / texture offsets
- TextReveal yPercent 115 defaults chars `.02/.8` lines `.09/.9`
- Scroll hint timeline `.25 / y19 / .3` with repeatDelay `.5`

---

## Action for ACTUALLY rebuild

1. Treat **`notes/GSAP-ANIMATIONS.md`** as the only motion spec.
2. Treat **this file** as the delta log vs earlier agent work.
3. Per section files under `sections/` must implement **desktop + mobile** branches (`md:768` / `useIsMobile`) exactly as site.
4. Swap only brand strings + texture URLs (`STILL`→`ACTUALLY`); **do not invent** durations/eases.
