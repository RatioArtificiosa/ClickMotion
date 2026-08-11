# GSAP ANIMATIONS — drinkstill.nz VERBATIM (solo re-audit) → ACTUALLY

> **Authority:** Re-extracted 2026-08-09 **without subagents** from live site chunks.  
> **Sources:** `raw/js/0cmb.wqv_a2_y.js` · `0ba6j9d7gg207.js` (GSAP **3.15.0** + ScrollTrigger + SplitText + DrawSVGPlugin) · `0wm4g9w3152qd.js` (Lenis + SmoothScroll + Nav + Cursor + Magnetic) · `130z~aqg5aigg.js` (Bloom + ScrollReveal) · `15yffavnl8.tc.js` (Bloom).  
> **Dumps:** `raw/js/_audit_tmp/` (counts, ST creates, timelines, deep modules).  
> **Gaps vs prior notes:** `notes/GAPS-AUDIT.md`.  
> **Rule for ACTUALLY:** copy every number below; only rename STILL→ACTUALLY + texture paths.

---

## 0 — Stack bootstrap

### 0.1 GSAP

| Item | Value |
|------|--------|
| Version | **3.15.0** (`DrawSVGPlugin.version` / core) |
| Globals | `autoSleep:120`, `force3D:"auto"` |
| Plugins used | ScrollTrigger, SplitText, **DrawSVGPlugin**, ScrollTo (bundle), Observer |
| Hygiene | Every section: `gsap.context(fn, el)` + `return () => ctx.revert()`; SplitText `?.revert()` |

### 0.2 Lenis / SmoothScroll (`0wm4` module `91809` + `66029`)

```js
// createLenis
new Lenis({ lerp: 0.1, smoothWheel: true })

// SmoothScroll component
const lenis = createLenis()
lenis.on("scroll", ScrollTrigger.update)
const onTick = (t) => lenis.raf(1000 * t)
gsap.ticker.add(onTick)
gsap.ticker.lagSmoothing(0)
// unmount: ticker.remove, lenis.destroy(), clearLenis(lenis)
```

Helpers: `getLenis()`, `clearLenis(instance)`.

### 0.3 `prefers-reduced-motion: reduce`

Almost every effect early-returns with `gsap.set(el, { opacity: 1 })` (sometimes `y:0` or `y:9` for scroll-dot). Disables pin/scrub/SplitText animations. Loader uses **400ms** soft timeout instead of 2200ms.

### 0.4 Breakpoints

- Mobile: `(max-width: 767px)` — `useIsMobile`, flavors/inside/story **no pin**
- Desktop pin paths: `(min-width: 768px)`
- Fine pointer: `(pointer: fine)` — hero clip pointer tracking, magnetic, custom cursor
- Canvas DPR: mobile `[1, 1.5]`, desktop `[1, 2]`; hero can `dprCap: 1.5`

---

## 1 — Shared primitives

### 1.1 `Bloom` (`15yf` / `130z`)

```js
gsap.to(el, { scale: 1.05, opacity: 1, duration: 2, yoyo: true, repeat: -1, ease: "sine.inOut" })
// initial CSS: transform scale(0.95)
// intensity "strong": opacity .92, blur 2px, radial stops 0→ee18→b335→6655→2675→0092
// intensity "soft":   opacity .85, blur 6px, radial stops 0→cc20→6645→1f65→0080
// size: number→px or string (e.g. "60vh", "72%")
```

| Use | size | intensity |
|-----|------|-----------|
| Hero | `60vh` | **`soft`** |
| Flavors stage can | often strong / % | check local JSX |
| Inside | varies | — |

### 1.2 `ScrollReveal` (`130z` — **simple fade-up**, not word scrub)

```js
// defaults: delay=0
gsap.fromTo(el,
  { opacity: 0, y: 12 },
  { opacity: 1, y: 0, duration: 0.6, ease: "power2.out", delay,
    scrollTrigger: { trigger: el, start: "top 85%", toggleActions: "play none none none" } })
// initial style: opacity:0; transform:translateY(12px)
```

### 1.3 `ScrollIlluminate` (`0cmb` — **word opacity scrub**)

```js
// defaults: dim=.24, start="top 82%", end="top 34%"
SplitText.create(el, { type: "words", aria: "none", onSplit: (t) => {
  gsap.set(t.words, { opacity: dim })
  gsap.set(el, { opacity: 1 })
  gsap.to(t.words, {
    opacity: 1, ease: "none", duration: 1, stagger: 0.35,
    scrollTrigger: { trigger: el, start, end, scrub: true }
  })
}})
// wrapper initial opacity:0
```

### 1.4 `TextReveal` (`0cmb`)

```js
// defaults: split="lines", start="top 85%", delay=0
// stagger default: chars→.02 else .09
// duration default: chars→.8 else .9
SplitText.create(el, {
  type: split, mask: split, autoSplit: split === "lines",
  onSplit: (i) => {
    const a = split==="chars" ? i.chars : split==="words" ? i.words : i.lines
    return gsap.fromTo(a, { yPercent: 115 }, {
      yPercent: 0, duration, ease: "power2.out", stagger, delay,
      scrollTrigger: { trigger: el, start, once: true }
    })
  }
})
gsap.set(el, { opacity: 1 })
// wrapper initial opacity:0
```

### 1.5 Letter stack (inline `function x` in hero module)

```js
// defaults: delay=0, stagger=.03, duration=.7, yOffset=18, play=true, instant=false
// instant→ gsap.set(letters,{opacity:1,y:0})
// else: fromTo {opacity:0,y:yOffset} → {opacity:1,y:0} duration ease power2.out stagger delay
// highlightChar + highlightColor set inline color on matching char
```

| Call site | stagger | duration | yOffset | instant |
|-----------|---------|----------|---------|---------|
| Hero desktop H1 | **.05** | **.9** | **60** | **true** |
| Hero mobile H1 | .05 | .9 | 40 | false |

### 1.6 Scroll hint (hero bottom center)

```js
if (reduce) gsap.set(dot, { opacity: 1, y: 9 })
else {
  const tl = gsap.timeline({ repeat: -1, repeatDelay: 0.5 })
  tl.set(dot, { y: 0, opacity: 0 })
    .to(dot, { opacity: 1, duration: 0.25, ease: "power1.out" })
    .to(dot, { y: 19, duration: 1, ease: "power2.inOut" }, 0.1)
    .to(dot, { opacity: 0, duration: 0.3, ease: "power1.in" }, 0.85)
}
// Track: 22×38, radius 11, border rgba(26,27,29,.3); dot 5×5 #bcd3d8
```

### 1.7 Magnetic (nav links) — `strength` default **.35**, nav uses **.3**

```js
// only pointer:fine && !reduce
const qx = gsap.quickTo(el, "x", { duration: 0.4, ease: "power2.out" })
const qy = gsap.quickTo(el, "y", { duration: 0.4, ease: "power2.out" })
// on move: qx((clientX - centerX) * strength), same y; leave → 0,0
```

---

## 2 — Loader curtain + nav + global cursor

### 2.1 Loader (`fixed inset-0 z-[100] bg-bone`)

| Phase | Spec |
|-------|------|
| Scroll lock | `getLenis()?.stop()`, `html/body overflow:hidden`, capture `wheel`/`touchmove` preventDefault, interval 150ms keep stop |
| Soft ready | timeout **2200ms** (reduce **400ms**) → `maybeReveal` |
| Hard force | timeout **9000ms** → `reveal` |
| After assets 100% | wait **2500ms** then `maybeReveal` |
| Wordmark in | `fromTo {y:"-0.6em",opacity:0}→{y:0,opacity:1}` **.45 power2.out** |
| Hold | empty tween **.4s** then signal support ready |
| FLIP desktop | measure nav wordmark parent vs `#hero h1`; `set transformOrigin 50% 50%`; `to {x,y,scale} duration .9 power3.inOut`; wait .9; curtain `opacity 0 .35 power1.out` at `"-=0.35"` |
| FLIP mobile | nav `scale 1.6 .55 power2.in`; curtain `opacity 0 .5 power1.inOut` `"<"` |
| Skip path | if already reduced/instant: curtain `opacity 0 .6 power2.out` |
| data-pop labels | set opacity0 scale.55; TL repeat -1, repeatDelay .3, delay .5; per i at `.42*i`: in back.out(1.6) .45 (y10 rot±3.5 blur8→0), float y-6 .95 sine.inOut, out opacity0 y-18 scale.94 blur5 .32 power2.in |
| Progress | `gsap.to({val}, {duration: .4+(target-cur)/100*1.2, ease:power2.out})` updates gradient + 3-digit pad |

### 2.2 Nav (`0wm4`)

| Item | Spec |
|------|------|
| Height | `var(--nav-h)` 72 desktop / 56 mobile |
| Scrolled chrome | when `scrollY > 80` OR mobile: bg `rgba(239,237,230,0.92)`, **blur 20px**, border `1px solid rgba(140,139,134,0.4)` |
| Show/hide | While `#hero.getBoundingClientRect().bottom > 100`: **show**. First frame after leave hero: **hide** `translateY(-100%)`. Re-enter hero: show. Transition **400ms ease-out** |
| Wordmark | 22px weight 900 tracking -0.5px + 8×8 alpine square |
| Links | magnetic strength **.3**; Lenis `scrollTo(hash, {duration:1.2})` |
| Cart badge | on count++: scale 1.4→1 **.35 power2.out** |
| Mobile drawer | opacity CSS 300ms; body overflow hidden |

### 2.3 Global custom cursor (`z-[200]`, not hero 459 ring)

```js
document.documentElement.classList.add("has-custom-cursor")
// Dot 6×6 white mix-blend difference: quickTo x/y duration .08 power2.out
// Ring 36×36 border rgba(255,255,255,.55): quickTo x/y duration .45 power2.out
// opacity show/hide .25 power2.out
// modes:
//   default: ring 36, transparent fill, difference
//   interactive (a/button/…): ring 56, dot scale .5
//   labeled [data-cursor-label]: ring 76, bg rgba(26,27,29,.92), mix normal, label opacity 1, dot scale 0
```

### 2.4 Hero-only 459px ring (clip follower)

Separate from §2.3. Size ~459px, radial `transparent 56% → rgba(26,27,29,.10) 70% → transparent 84%`, follows clip center, `scale=d/170`, `opacity=entrance*clamp(1-scrollBoost/240)`.

---

## 3 — HERO `#hero`

### 3.1 Desktop pin + scrub timeline

```js
gsap.timeline({
  defaults: { ease: "power2.inOut" },
  scrollTrigger: {
    trigger: sectionEl, // #hero
    start: "top top",
    end: "+=120%",
    pin: true,
    pinSpacing: true,
    scrub: true,           // boolean true
    invalidateOnRefresh: true,
    refreshPriority: 3
  }
})
// @0:
.to(k, { scrollBoost: () => 1.2 * Math.hypot(innerWidth, innerHeight), ease: "power2.in", duration: 0.55 }, 0)
.to(C, { current: 1, ease: "power1.inOut", duration: 0.6 }, 0)          // lock/progress
.to(boneCurtain, { opacity: 0, ease: "none", duration: 0.15 }, 0.48)     // if present
.to(haloWrap, { scale: 1.09, duration: 1, ease: "none" }, 0)
.to(dollyRef, { current: 0.09, duration: 1, ease: "none" }, 0)
.to(scrollHint, { opacity: 0, duration: 0.15, ease: "power1.out" }, 0)

// paused support TL:
support.to(supportItems, { y: 0, opacity: 1, duration: 0.55, stagger: 0.08, ease: "power2.out" })
support.to(rule, { scaleX: 1, duration: 0.5 }, 0.2)  // rule set scaleX:0 origin left

// onUpdate progress p:
// p > .58 → support.restart()
// p < .35 → fade support wrap opacity 0 .25 power1.out → reset set items y26 opacity0, rule scaleX0, wrap opacity1
```

Initial support: `gsap.set([data-support-item], {y:26, opacity:0})`, rule `scaleX:0`.

### 3.2 Clip-path circle driver (ticker + entrance)

```js
// state k: { x:W/2, y:0.48*H, entrance:0, swell:0, breath:0, scrollBoost:0, hasPointer:false }
// CSS start: clipPath: "circle(0px at 50% 48%)" on ink layer z-20

// After reveal && !mobile:
gsap.to(k, { entrance: 1, duration: 1.2, delay: 0.15, ease: "power2.inOut" })
gsap.to(k, { breath: 9, duration: 2.2, yoyo: true, repeat: -1, ease: "sine.inOut" })
const qx = gsap.quickTo(k, "x", { duration: 0.62, ease: "power2.out" })
const qy = gsap.quickTo(k, "y", { duration: 0.62, ease: "power2.out" })

// pointer velocity swell: peak = min(130, speedPxPerMs * 1000/2200 * 130)
// gsap.to(k,{swell:peak,duration:.3,power2.out}); delayedCall(.3)→ swell 0 duration 1.1 power2.out

// every ticker frame:
d = max(0, 170*entrance + swell + breath*entrance + scrollBoost)
clip.style.clipPath = `circle(${d}px at ${x}px ${y}px)`
// 459 ring: translate to (x,y) scale(d/170) opacity entrance*clamp(1-scrollBoost/240)
// halo parallax L: lerp .06 toward 0.85*(x-W/2,y-H/2)*(1-min(progress/.6,1))**3
```

### 3.3 Can3D hero motion

```js
// constants
const TAU = 2 * Math.PI
const pe = 35 * Math.PI / 180      // entrance rotX
const pt = -(540 * Math.PI / 180)  // entrance rotY (-1.5 turns)
const pn = 1.4 * Math.PI           // scroll scrub total rotY

// ScrollTrigger (when heroMotion + trigger el, no external rot):
// start "top top", end "bottom top", scrub:1,
// onUpdate: if !dragging → scrollRot = progress * pn

// Entrance 1.6s from startEntrance:
// e = t/1.6
// easeT = 1 - (1-e)^4                    // quart out
// easeN = e<.5 ? 4e^3 : 1-(-2e+2)^3/2    // cubic inOut
// pos.y = 4*(1-easeT)
// rot.x = pe*(1-easeT)
// rot.y = pt*(1-easeN)
// scale = 0.8 + 0.2*easeT
// opacity metal+label = easeT

// After entrance:
// rot.y = scrollOrDrag + parallaxY + pointerFollowX contrib
// rot.x = dragPitch + parallaxX + externalTilt
// bob: pos.y = 0.06*sin(2π/6 * timeSinceEntranceEnd) + followY
// parallax: z += (.15*pointer.x - z)*.05; H += (.08*pointer.y - H)*.05
// drag: Δrot = 0.005 * ΔclientPx (both axes)
// grab scale → 1.04 while dragging && lockBlend<.5 (lerp .1)
// fallback spin: += 0.08 * delta if no scroll rot
// pointerFollow active: target x 2.5*px, y 1.6*py, blend .09+.09*lockBlend

// Materials / texture: see CAN-3D.md (verified)
// Hero Canvas: dprCap 1.5, ContactShadows opacity .35
// Bloom soft 60vh
```

### 3.4 Mobile hero (no pin)

- No clip timeline, no bone curtain pin path  
- Letters animate (not instant) yOffset 40  
- Can `targetHeight: 2.6`, `h-[52vh]`  
- `ScrollReveal` / `TextReveal` / `ScrollIlluminate` for formula block  
- “Drag to spin” opacity toggles on first drag  

---

## 4 — FLAVORS `#flavors`

### 4.1 Desktop pin

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
    // hysteresis state machine → active index 0|1|2
    // 0: t>.55→2 else t>n+.05→1
    // 1: t<n-.05→0 else t>.55→2
    // 2: t<n-.05→0 else t<.45→1 else 2
  }
})
```

Entrance once: eyebrow+sub `fromTo {y:70,opacity:0}→{y:0,opacity:1} duration 1 power2.out stagger .12 start top 55% once`.

### 4.2 Cross-fade on index change

```js
// tilt sign array e.g. [1,-1,1] per index
// active can stageMotion:
fromTo({ x:3*tilt, y:.12, rotZ:-.16*tilt, scale:.94, opacity:0 },
       { x:0,y:0,rotZ:0,scale:1,opacity:1, duration:.85, ease:"power2.out", delay:.1, overwrite:"auto" })
// inactive:
to({ x:-2.2*tilt, y:-.1, rotZ:.14*tilt, scale:.94, opacity:0, duration:.45, ease:"power2.in", overwrite:"auto" })

// bg tints: opacity 0/1 duration .8 power2.inOut
// number ghosts: opacity + y ±40 duration .8 power2.inOut force3D
// deck/overlays: .7–.8 power2.inOut

// copy card out: y-26 opacity0 duration .25 power3.in → set index
// copy card in: y26→0 opacity .45 power3.out; [data-stage-item] y18→0 .45 power2.out stagger .05 delay .05
// counter text: `${i+1} / 3`
```

Desktop bg: `radial-gradient(72% 85% at 66% 52%, bloom30 0%, bloom14 42%, transparent 72%)`.

Tab click: Lenis `scrollTo(start + (end-start)*(i/3), { duration: 1 })`.

### 4.3 Mobile flavors (horizontal snap, no pin)

- ST `start top 85% once` → animate first card  
- Card title chars: yPercent **108→0**, duration **.55**, stagger **.03**  
- `[data-card-item]` y12 opacity, **.45** stagger **.05** delay **.1**  
- Out: opacity **.12 power1.out**  
- Bloom bg: `90% 70% at 50% 40%` with bloom33/14  

---

## 5 — INSIDE `#inside`

### 5.1 Desktop pin

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

Headline: desktop SplitText chars **yPercent 22→0**, duration **.8**, stagger **.022**, start **top 75%** once.  
Mobile fallback: whole `y:22 opacity0→1` **.9 power2.out** same trigger.

### 5.2 Ingredient swap

```js
// halo bg color: duration .5 power2.inOut
// out group: opacity0 y-26 .22 power3.in → commit
// in group: opacity0 y26 → 1/0 .45 delay .1 power3.out stagger .05
// name chars: yPercent 60→0 .55 power2.out stagger .028 delay .12
// image scale 1.45→1.6 .9 power2.out
// [data-bot] drawSVG "0%"→"100%" .9 power1.inOut stagger .08 delay .15
// dose bar scaleX 0→dosageMg/1150 .8 delay .25 power2.inOut
// dose number {val:0→dosageMg} .8 delay .25 power2.out
// botanical rock: rotation -3.5↔3.5 duration 5 yoyo repeat -1 sine.inOut
// can yaw offset: Math.PI/2 * activeIndex
```

Mobile deck: chars yPercent **108**, duration **.5**, stagger **.02**; items y14 **.5** stagger **.07** delay **.08**.

Pills: Lenis `scrollTo(start+(end-start)*0.25*i, {duration:1})`.

---

## 6 — STORY `#story`

### 6.1 Desktop pin (c = chapter count, site **5**)

```js
const t = Array.from({ length: c }, (_, i) => i / (c - 1))
ScrollTrigger.create({
  trigger: pinEl,
  start: "top top",
  end: () => `+=${window.innerHeight * (c - 0.4)}`,  // 4.6 * vh for c=5
  pin: true,
  pinSpacing: true,
  scrub: 1,
  snap: {
    snapTo: [0, ...t.map((e, i) => 0.1 + i / (c - 1) * 0.9)],
    // e.g. [0, 0.1, 0.325, 0.55, 0.775, 1] for 5? wait: map over t gives c values → [0, .1, .1+.9/(c-1), ...]
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

Intro: eyebrow `y:32 opacity0→1` **.9 power3.out** stagger .18 top 75% play; H2 chars yPercent 115 **.8** stagger **.016** once top 75%.

### 6.2 Chapter change

```js
// images: active fromTo scale (dir?.86:1.14) opacity0 y±46 → 1/1/0 .9 power2.out delay .08 force3D
//         others to scale 1.14|.86 opacity0 y∓46 .6 power2.in force3D
// year titles: opacity + y ±60 .9 power2.inOut force3D
// body out: y-24 opacity0 .22 power3.in → swap
// body in: y24→0 .45 power3.out; [data-story-item] y16 .45 power2.out stagger .05 delay .05
```

Year buttons: Lenis `scrollTo(start+(end-start)*(.1+i/(c-1)*.9), {duration:1.2})`.

### 6.3 Mobile story

```js
// sticky 440svh container
ScrollTrigger.create({
  trigger: mobileRoot,
  start: "top top",
  end: "bottom bottom",
  onUpdate: (e) => {
    const t = e.progress
    const n = Math.min(4, Math.floor(5 * t))
    localProgress = clamp(5*t - n)
    setActive(n)
    // H(): clipPath inset(0 0 (1-ease)*92% 0); opacity .4+.6*ease
  }
})
// chapter swap: yPercent ±7*.6 power2.out; body y-12 .16 power2.in
// title chars yPercent 105→0 .5 power2.out stagger .013
// words dim opacity .24 then illuminate by progress
```

Year dots: Lenis duration **.9**, progress `(i+.72)/5`.

---

## 7 — PRESS `#press`

### 7.1 Quotes

```js
// per figure index i:
// [data-quote-visual] SplitText lines mask:
fromTo lines {yPercent:115}→{0} duration .85 power2.out stagger .09 delay .12*i
  scrollTrigger: { trigger: figure, start: "top 85%", once: true }
// figcaption: {opacity:0,y:12}→{1,0} duration .6 power2.out delay .45+.12*i same ST
```

H2: `TextReveal` lines default.

### 7.2 Marquee + velocity

```js
const a = gsap.to(rowSolid, { xPercent: -50, duration: 38, ease: "none", repeat: -1 })
const b = gsap.fromTo(rowOutline, { xPercent: -50 }, { xPercent: 0, duration: 52, ease: "none", repeat: -1 })
const skewObj = { skew: 0 }
const setSkew = gsap.quickSetter(track, "skewX", "deg")
const clampSkew = gsap.utils.clamp(-6, 6)

ScrollTrigger.create({
  trigger: section,
  start: "top bottom",
  end: "bottom top",
  onUpdate: (self) => {
    const v = self.getVelocity()
    const sk = clampSkew(-(v / 420))
    if (Math.abs(sk) > Math.abs(skewObj.skew)) {
      skewObj.skew = sk
      gsap.to(skewObj, { skew: 0, duration: 0.9, ease: "power2.out", overwrite: true,
        onUpdate: () => setSkew(skewObj.skew) })
    }
    const ts = gsap.utils.clamp(1, 4, 1 + Math.abs(v) / 1200)
    ;[a, b].forEach((tw) => {
      gsap.to(tw, { timeScale: ts, duration: 0.4, ease: "power1.out", overwrite: "auto" })
      gsap.to(tw, { timeScale: 1, duration: 1.4, delay: 0.4, ease: "power2.out", overwrite: false })
    })
  }
})
```

Names: Meridian, The Long Lunch, Foldout, Salt Journal, Quiet Hours — solid clamp 28–50px bone.85; outline clamp 22–38 stroke bone.35; dots 6px #bcd3d8 / 4px half.

---

## 8 — WHERE AVAILABLE / SHOP `#shop` `#stockists`

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
// ScrollTrigger.refresh on city tab change (rAF double)
```

Loader-style pop dots for map markers if present: same back.out(1.6) recipe as §2.1.

---

## 9 — Can3D constants (rebuild checklist)

```js
d7 = 2*Math.PI
pe = 35 * Math.PI/180
pt = -(540 * Math.PI/180)
pn = 1.4 * Math.PI
pr = {
  "01": "/textures/labels/still-01-clear.png",  // → actually-01-clear.png
  "02": "/textures/labels/still-02-dawn.png",
  "03": "/textures/labels/still-03-dusk.png",
}
// texture: anisotropy 16, min 1008, mag 1006, wrapS 1000, wrapT 1001,
//   flipY false, center .5/.5, offset -.14/-.34, repeat 1/1
// metal: #C8C8C8 m.95 r.42 env.85
// label: #fff m.05 r.65 env.6 map
// toneMapping ACES exposure 1.05
// InlineCan camera [0,.3,7.6] fov 26 lights ambient.2 dir 1.4/.5/1.1
// useInView rootMargin "600px" frameloop always|never
```

---

## 10 — Pin / snap master table

| Section | end | scrub | pin | snap | refreshPriority |
|---------|-----|-------|-----|------|-----------------|
| Hero desktop | `+=120%` | `true` | yes | — | **3** |
| Can rot | `bottom top` | `1` | no | — | — |
| Flavors desktop | `3*vh` | `1` | yes | `[0,1/3,2/3,1]` .25–.55 | **1** |
| Inside desktop | `4*vh` | `1` | yes | `[0,.25,.5,.75,1]` .2–.5 | — |
| Story desktop | `(c-.4)*vh` | `1` | yes | progressive `[0,.1+…]` .25–.55 | — |
| Press marquee | top bottom→bottom top | — | no | — | — |
| Mobile flavors/inside/story | various once/progress | — | **no** | CSS snap / custom | — |

---

## 11 — ACTUALLY rebuild — motion-only checklist

- [ ] Wrap app in `SmoothScroll` (Lenis lerp .1 + ticker bridge + lagSmoothing 0)
- [ ] Register GSAP 3.15 + ScrollTrigger + SplitText + DrawSVGPlugin
- [ ] Implement all four text primitives with **exact** defaults (esp. ScrollIlluminate start **top 82%**)
- [ ] Loader 2.2s / 9s / 2.5s + FLIP .9 + data-pop
- [ ] Hero desktop: clip formula `170*e + swell + breath*e + scrollBoost`, entrance **1.2/.15**, breath **9/2.2**, quickTo **.62**, pin **120%**, support **.58/.35**
- [ ] Hero mobile branch without pin
- [ ] Can3D pe/pt/pn/1.6s/drag .005/dprCap 1.5/shadows .35
- [ ] Flavors 3vh snap + stage-item y18 + mobile card yPercent 108
- [ ] Inside 4vh snap + drawSVG + dose bar + rock ±3.5/5s
- [ ] Story 4.6vh + scaleY gates + mobile clip inset 92%
- [ ] Press marquee 38/52 + quotes .85/.09
- [ ] WhereAvailable staggered columns + cards y80
- [ ] Nav blur 20 / hide after hero / magnetic .3 / scrollTo 1.2
- [ ] Dual cursor z-200 quickTo .08/.45 — keep hero 459 ring separate
- [ ] `prefers-reduced-motion` on every effect
- [ ] Brand swap only: `STILL`→`ACTUALLY`, `pr` texture paths, preloads

---

*End of solo GSAP audit. Cross-check live site after any `dpl=` deploy hash change; re-run `raw/js/_audit_tmp/extract_gsap.py`.*
