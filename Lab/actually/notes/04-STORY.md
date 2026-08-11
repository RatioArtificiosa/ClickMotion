# 04 — STORY ( #story ) — drinkstill.nz exact → ACTUALLY

Source: `raw/story_raw.html` (27,517 chars) — longest editorial section.

## DOM

```html
<section id="story" class="relative w-full bg-bone">
  <!-- MOBILE: centered text -->
  <div class="md:hidden relative mx-auto w-full max-w-[880px] px-5 pt-20 pb-12 text-center">
    <div class="font-sans uppercase text-mist mb-8" style="font-size:13px;font-weight:500;letter-spacing:0.6em;opacity:0"><span class="text-ink">04</span><span class="mx-2 text-mist/50">/</span>STORY</div>
    <h2 class="font-display text-ink leading-[1.05]" style="font-size:clamp(44px,6.4vw,72px);font-weight:300;letter-spacing:-0.01em;opacity:0">Quietly built over five years.</h2>
    <p class="relative z-10 mx-auto mt-8 text-ink" style="font-size:18px;line-height:1.5;max-width:560px;opacity:0">STILL began as a quiet rejection of caffeine-as-default. Four ingredients, three SKUs, five years of work, built to feel like baseline, not a stimulant high.</p>
  </div>
  <!-- DESKTOP: pinned stage -->
  <div class="relative hidden md:block h-screen overflow-hidden">
    <div class="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-8 pointer-events-none">
      <div class="font-sans uppercase text-mist" style="font-size:12px;font-weight:500;letter-spacing:0.6em"><span class="text-ink">04</span><span class="mx-2 text-mist/50">/</span>STORY</div>
      <h2 class="mt-7 font-display text-ink leading-[1.05]" style="font-size:clamp(40px,5.6vw,68px);font-weight:300;letter-spacing:-0.01em;max-width:820px">Quietly built over five years.</h2>
      <p class="mt-7 text-ink" style="font-size:17px;line-height:1.55;max-width:540px">STILL began… not a stimulant high.</p>
      <div class="mt-9 flex flex-col items-center gap-2" aria-hidden="true"><span class="font-sans uppercase text-mist" style="font-size:10px;letter-spacing:0.28em">Scroll</span><span class="block w-px h-8 bg-ink/30"></span></div>
    </div>
    <div class="absolute inset-0" style="opacity:0">
      <span aria-hidden="true" class="absolute inset-0 flex items-center justify-center font-wordmark will-change-transform" style="opacity:1;font-size:clamp(340px,40vw,640px);font-weight:800;line-height:1;letter-spacing:-0.02em;color:transparent;-webkit-text-stroke:1.5px rgba(26,27,29,0.07)">21</span>×5 ghosts 21-25 opacity toggled
      <div class="absolute inset-0 flex items-center justify-end pr-[clamp(48px,9vw,160px)] will-change-transform" style="opacity:1">
        <div style="width:clamp(320px,28vw,440px)"><figure class="relative w-full overflow-hidden bg-ink/[0.045] aspect-[4/5] border border-[rgba(26,27,29,0.12)]">
          <img alt="Founders' first whiteboard sketch, Cuba Street, 2021" decoding="async" data-nimg="fill" class="object-cover" style="position:absolute;inset:0;width:100%;height:100%" sizes="(max-width:768px)90vw,30vw" srcSet="/_next/image?url=%2Fstory%2F2021.jpg&w=... 256-3840w"/>
        </figure><figcaption class="mt-3 font-sans text-[11px] tracking-[0.18em] uppercase text-mist">FIG. 01 · Founders' first whiteboard sketch, Cuba Street, 2021</figcaption></div>
      </div>
      <!-- FIGS 02-05 similarly, each w different image/story -->
    </div>
  </div>
  <!-- CHAPTERS: sticky chapters + scrolling images alternate -->
  <div class="relative hidden md:block">
    <div style="height:150vh">…Chapter 01·2021 An idea, in a flat white office. STILL began on south coast… flat white office harbor decade… spike crash dependency…</div>
    <!-- repeats 5×, each figure pinned -->
  </div>
</section>
```

Plus `grain-overlay` global.

## Layout / CSS

- `bg-bone` `#efede6`. Mobile: `px5 pt20 pb12 text-center max-w880`. Desktop: `h-screen overflow-hidden` pin; ghost year `21-25` giant `clamp340→640px font-wordmark 800 -0.02em transparent -webkit-text-stroke 1.5px rgba(26,27,29,0.07)` centered, `will-change-transform` cross-fade on scroll; fig `clamp320→440px 4/5 aspect border rgba(26,27,29,0.12) bg-ink/0.045` `pr clamp48,9vw,160px`; figcaption `11px 0.18em uppercase mist`.
- Eyebrow `04 / STORY` `12-13px 500 0.6em mist/ink` centered `pointer-none`; H2 `clamp 40→68px (mobile 44→72px) 300 leading1.05 tracking-0.01em ink max-w820`; body `17-18px leading1.55 max-w540`. Scroll hint `10px 0.28em mist` + `1px×32px bg-ink/30`.
- Scroll-driven: pin `h-screen` then 5 chapters `150vh` each translate/scrub.

## Content

- FIGS verbatim: 01 whiteboard Cuba 2021 · 02 lab samples 2022 · 03 Moore Wilson March 2023 · 04 Auckland July 2024 · 05 Melbourne Smith Street Sept 2025
- Chapter 01 copy: `STILL began on the south coast of the North Island, in a Cuba Street studio… decade in tech and beverage R&D… build a drink that delivered focus without the spike, the crash, or the dependency.` + 4 later chapters (same template, pinned).
- Images: `/_next/image?url=%2Fstory%2F202{1..5}.{jpg/png}&w=256..3840&q=75` optimized, `sizes 90vw mobile 30vw desktop`.

## Motion

- Desktop: **ScrollTrigger pinned** stage — years ghost `opacity 0→1 scale` + figure `translateX/Y` scrubbed over `150vh` per chapter; `will-change-transform`; `pinSpacing true`. Mobile: static stacked.

## ACTUALLY rebuild

Keep all; `STILL → ACTUALLY` in H2 duplicate (`Quietly built…` second line hides on desktop, keep) + chapter body `STILL began… → ACTUALLY began…`. Ghost years `21-25` unchanged. Fig captions unchanged locations but if can in fig, swap to Actually label per CAN-3D. Keep `still_raw` class names; only string replacement. Preserve `4/5` `clamp` and pin `h-screen`.
