# 01 — HERO / The formula ( #hero ) — drinkstill.nz exact → ACTUALLY

Source: `raw/hero_raw.html` (4,329 chars) — exhaustive below. Screenshot not needed: WebGL + bone curtain + left copy.

## DOM

```html
<section id="hero" class="relative w-full min-h-screen overflow-hidden bg-ink">
  <div aria-hidden="true" class="fixed inset-0 z-[100] bg-bone"></div>
  <div class="absolute inset-0 bg-ink z-20" style="clip-path:circle(0px at 50% 48%)">
    <div class="absolute inset-0 will-change-transform"><div aria-hidden="true" class="absolute inset-0 flex items-center justify-center pointer-events-none will-change-transform"><div aria-hidden="true" class="pointer-events-none " style="width:60vh;height:60vh;opacity:0.85;transform:scale(0.95);background:radial-gradient(circle, #bcd3d8 0%, #bcd3d8cc 20%, #bcd3d866 45%, #bcd3d81f 65%, #bcd3d800 80%);filter:blur(6px)"></div></div></div>
    <div class="absolute inset-0"><div class="!absolute inset-0" style="position:relative;width:100%;height:100%;overflow:hidden;pointer-events:auto"><div style="width:100%;height:100%"><canvas style="display:block"></canvas></div></div></div>
    <div class="absolute inset-y-0 left-0 z-10 hidden md:flex flex-col justify-center pl-[clamp(24px,7vw,120px)] pointer-events-none" style="width:min(100%, 34vw)"><div data-support-item="true" class="font-sans text-[12px] tracking-[0.2em] uppercase text-bone/60"><span class="text-bone">01</span><span class="mx-2 text-bone/40">/</span>The formula</div><h2 data-support-item="true" class="mt-5 font-display font-[300] leading-[1.08] tracking-[-0.01em] text-bone" style="font-size:clamp(28px, 2.8vw, 44px)">Sustained natural focus, without caffeine.</h2><div data-support-rule="true" class="mt-7 h-px w-[72px]" style="background-color:#bcd3d8"></div><p data-support-item="true" class="mt-7 text-[16px] leading-[1.65] text-bone/80 max-w-[42ch]">A nootropic blend of four adaptogens at clinical doses. Brewed and canned in Wellington, poured wherever the work is.</p><div data-support-item="true" class="mt-8 flex items-baseline gap-6 font-sans text-[13px] text-bone/60"><span><span class="font-display text-bone text-[17px] tabular-nums">1,150</span> mg active blend</span><span aria-hidden="true" class="text-bone/40">·</span><span><span class="font-display text-bone text-[17px] tabular-nums">0</span> mg caffeine</span></div></div>
  </div>
  <div class="absolute inset-0 z-10 bg-bone pointer-events-none flex flex-col"><div class="flex-1 flex items-center justify-center overflow-hidden"><h1 class="font-wordmark font-[800] leading-[0.78] tracking-[-0.03em] whitespace-nowrap text-ink select-none" style="font-size:23vw"><span class="inline-block "><span class="sr-only">STILL.</span><span data-letter="true" aria-hidden="true" class="inline-block " style="opacity:0">S</span><span data-letter="true" aria-hidden="true" class="inline-block " style="opacity:0">T</span><span data-letter="true" aria-hidden="true" class="inline-block " style="opacity:0">I</span><span data-letter="true" aria-hidden="true" class="inline-block " style="opacity:0">L</span><span data-letter="true" aria-hidden="true" class="inline-block " style="opacity:0">L</span><span data-letter="true" aria-hidden="true" class="inline-block " style="opacity:0;color:#bcd3d8">.</span></span></h1></div><div class="absolute inset-x-0 bottom-0 flex items-end justify-between px-[clamp(24px,4vw,64px)] pb-[clamp(20px,4vh,44px)]"><p class="font-display font-[300] text-ink leading-[1.15] tracking-[-0.01em]" style="font-size:clamp(17px,1.5vw,24px)">Stay still.<br/>Stay sharp.</p><div><div class="flex flex-col items-center gap-3 pointer-events-none " aria-hidden="true"><span class="font-sans text-[11px] uppercase tracking-[0.28em] text-mist">Scroll</span><span class="relative block" style="width:22px;height:38px;border:1px solid rgba(26, 27, 29, 0.3);border-radius:11px"><span class="absolute left-1/2 -translate-x-1/2" style="top:7px;width:5px;height:5px;background-color:#bcd3d8;opacity:0"></span></span></div></div><p class="font-sans uppercase text-mist text-right" style="font-size:11px;letter-spacing:0.24em;line-height:1.8">Nootropic, not caffeine<br/>Wellington, New Zealand</p></div></div>
  <div aria-hidden="true" class="absolute top-0 left-0 z-30 pointer-events-none rounded-full" style="width:459px;height:459px;background:radial-gradient(circle, transparent 56%, rgba(26,27,29,0.10) 70%, transparent 84%);opacity:0;transform:translate3d(-1000px, -1000px, 0);will-change:transform, opacity"></div>
</section>
```

Tree: `section#hero min-h-screen overflow-hidden bg-ink` > `fixed z-[100] bg-bone loading curtain` + `absolute z-20 bg-ink clip-path:circle(0 at 50% 48%)` containing halo `60vh radial #bcd3d8 blur6` + WebGL `canvas pointer:auto` + left copy `34vw hidden md:flex` + `absolute z-10 bg-bone wordmark curtain 23vw` + bottom bar + `fixed grain z-90` global + `custom cursor z-30 459px radial`. After hydration wrapped by `pin-spacer`.

## Copy verbatim

- Eyebrow: `01 / The formula` → `12px 0.2em uppercase text-bone/60` (`01` bone). H2: `Sustained natural focus, without caffeine.` → `clamp 28-44px Tiempos 300 leading 1.08 tracking -0.01em bone`. Body: `A nootropic blend… wherever the work is.` `16px leading 1.65 bone/80 max-w 42ch`. Rule: `72×1 #bcd3d8 mt-7`. Stats: `1,150`/`0` `17px tabular-nums display bone` + `13px mg labels bone/60` gap6.
- Wordmark: `STILL.` → `font-wordmark 800 leading 0.78 tracking -0.03em 23vw ink select-none` per-letter `opacity:0 data-letter` + dot `#bcd3d8`.
- Bottom left: `Stay still. / Stay sharp.` `clamp 17-24px Tiempos 300 leading 1.15 tracking -0.01em ink`. Bottom right: `Nootropic, not caffeine / Wellington, New Zealand` `11px tracking 0.24em uppercase mist right line-height 1.8`. Center Scroll: `Scroll` `11px 0.28em mist` + track `22×38 radius11 border rgba(26,27,29,0.3)` dot `5×5 #bcd3d8 opacity0`.

## CSS / Layout

- `section#hero min-h-screen bg-ink` clip `circle(0 at 50% 48%)` scrubbed to fullscreen; left strip `34vw pl clamp(24px,7vw,120px) hidden md:flex z-10 pointer-none`; bone curtain `absolute inset-0 z-10 bg-bone pointer-none flex-col` wordmark `flex-1 flex items-center justify-center overflow-hidden`; bottom `absolute inset-x-0 bottom-0 flex items-end justify-between px clamp(24px,4vw,64px) pb clamp(20px,4vh,44px)`; nav `max-w 1440 px5 md:px8 h var(--nav-h)`; halo `60vh scale 0.95 opacity 0.85 blur6`; cursor `459×459 radial 56→70% opacity0`.

## Motion (solo re-audit — source of truth: `GSAP-ANIMATIONS.md` §3)

### Desktop only (`!useIsMobile`)

1. **Loader** (before pin): FLIP nav→H1 `.9 power3.inOut`, curtain fade; timeouts 2200 / 9000 / 2500; Lenis stopped.
2. **Entrance clip** (after reveal): `gsap.to(k,{entrance:1,duration:1.2,delay:.15,ease:"power2.inOut"})` + breath `{breath:9,duration:2.2,yoyo,repeat:-1,sine.inOut}` + `quickTo` x/y **`.62 power2.out`**.
3. **Ticker radius (verbatim):**  
   `d = max(0, 170*entrance + swell + breath*entrance + scrollBoost)`  
   `clipPath = circle(${d}px at ${x}px ${y}px)` — start CSS `circle(0px at 50% 48%)`, center init `(W/2, 0.48*H)`.  
   Swell from pointer velocity capped **130**, decay delayedCall `.3` → 0 over **1.1**.
4. **Pin scrub:** `start top top`, `end +=120%`, `pin+pinSpacing`, `scrub:true`, `refreshPriority:3`.  
   Tweens: `scrollBoost→1.2*hypot(W,H) .55 power2.in` · progress `.6 power1.inOut` · curtain opacity0 `.15 none @.48` · halo scale **1.09** · dolly `.09` · scroll hint opacity0 `.15`.  
   Support paused TL at progress **>.58** (items y26→0 `.55 stagger .08`, rule scaleX `.5@0.2`); reset **<.35**.
5. **Bloom:** `size="60vh"` **`intensity="soft"`** (not strong).
6. **H1 letters:** `stagger:.05 duration:.9 yOffset:60` but **`instant:true`** → set opacity1 (no stagger play after FLIP).
7. **Can3D:** entrance **1.6s** pe=35° pt=-540° pn=1.4π; scrub1; drag **.005**; parallax .15/.08 lerp .05; bob `.06*sin(2π/6*t)`; **`dprCap:1.5`**; ContactShadows **opacity .35**.
8. **459px ring:** hero-only follower `scale=d/170`, opacity `entrance*clamp(1-scrollBoost/240)` — **not** the global z-200 cursor.

### Mobile

- **No** pin / clip / bone curtain path. Wordmark bone `24vw`, can `52vh` targetHeight **2.6**, `ScrollReveal`/`TextReveal`/`ScrollIlluminate` for formula copy, “Drag to spin”.

## Assets

- `images/cans/still-01/02/03.png` 1120×1400 preload `q=75`; `textures/labels/still-01-clear.png` 335K on can; HDR `studio_small_03_1k.hdr`; grain SVG `.04`.

## ACTUALLY rebuild (keep all, rename only Still)

- Nav `STILL → ACTUALLY` wordmark `font-wordmark 22px 900 -0.5px 8×8 dot` same. H1 `ACTUALLY.` per-letter 8 letters + dot (adjust `23vw` → `19vw` or `tracking -0.04em` to fit same width; keep color `#bcd3d8` on dot). Left eyebrow/below H2 unchanged copy except where mentions Still in later sections. Canvas: `pr` → `actually-*.png` + `models/can.glb` same, `can-3d` same. Keep clip-path `50% 48%` + pin + left `34vw` + bottom bar gutters. Replace `<title>` / `og:image` to Actually.

```html
<h1 style="font-size:19vw">…ACTUALLY.<span style="color:#bcd3d8">.</span></h1>
<link rel="preload" href="/images/cans/actually-01.png"/>
<!-- textures/labels/actually-01-clear.png etc — see CAN-3D.md -->
<nav><a aria-label="ACTUALLY."><span>ACTUALLY</span><span class="bg-alpine 8×8 ml-2"></span></a></nav>
```
