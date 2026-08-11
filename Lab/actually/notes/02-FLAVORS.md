# 02 — Three flavors ( #flavors ) — drinkstill.nz exact → ACTUALLY

Source: `raw/flavors_raw.html` (7,548 chars) + sub-agent exhaustive + assets. `bg-bone h-screen` pinned horizontal feeling.

## DOM (core)

```html
<section id="flavors" class="relative w-full bg-bone overflow-hidden">
  <div class="relative h-screen flex flex-col">
    <div aria-hidden="true" style="opacity:1;background:radial-gradient(72% 85% at 66% 52%, #bcd3d830 0%, #bcd3d814 42%, transparent 72%)"></div>
    <div aria-hidden="true" style="opacity:0;background:radial-gradient(72%85% at66%52%, #e8c9a030→#e8c9a014)"></div>
    <div aria-hidden="true" style="opacity:0;background:radial-gradient(72%85% at66%52%, #c9b5c830→#c9b5c814)"></div>
    <div class="relative z-10 mx-auto w-full max-w-[1440px] px-[clamp(24px,6vw,120px)]" style="padding-top:calc(var(--nav-h)+clamp(8px,1.6vh,24px))">
      <div class="flex items-baseline justify-between gap-6 mb-3"><div class="font-sans text-[12px] tracking-[0.2em] uppercase text-mist" style="opacity:0"><span class="text-ink">02</span><span class="mx-2 text-mist/50">/</span>Three flavors</div><div class="font-sans text-[12px] tracking-[0.2em] uppercase text-mist tabular-nums">1 / 3</div></div>
      <h2 class="font-display font-[300] leading-[1.0] tracking-[-0.02em] text-ink whitespace-nowrap" style="opacity:0;font-size:clamp(32px, min(4.6vw,6.5vh),64px)">Three formulations.</h2>
    </div>
    <div class="relative z-10 flex-1 min-h-0 mx-auto w-full max-w-[1440px] px-[clamp(24px,6vw,120px)]">
      <div class="grid h-full items-center gap-x-[clamp(16px,3vw,56px)]" style="grid-template-columns:minmax(320px,5fr) minmax(0,7fr)">
        <div class="min-w-0"><div>
          <div data-stage-item="true" class="flex items-baseline justify-between font-sans text-[11px] tracking-[0.22em] uppercase"><span class="font-wordmark font-[800] tracking-[-0.02em] text-[17px] text-ink normal-case">STILL.01</span><span class="text-mist">signature</span></div>
          <h3 data-stage-item="true" class="mt-4 font-display font-[300] leading-[0.92] tracking-[-0.015em] text-ink" style="font-size:clamp(52px, min(7.6vw,12vh),128px)">Clear<span style="color:#bcd3d8">.</span></h3>
          <p data-stage-item="true" class="mt-3 font-serif italic text-mist" style="font-size:16px">Cucumber & Yuzu</p>
          <p data-stage-item="true" class="mt-[clamp(12px,2.5vh,24px)] text-[15px] leading-[1.65] text-ink max-w-[44ch]">The signature blend, paired with cucumber and yuzu. Clean, dry, faintly green. Built for the kind of work that asks you to stay present without raising the volume.</p>
          <div data-stage-item="true" class="mt-7 h-px w-[72px]" style="background-color:#bcd3d8"></div>
          <ul data-stage-item="true" class="mt-6 flex flex-col gap-[7px]">
            <li class="flex items-baseline gap-3 text-[12px]"><span class="font-display tabular-nums w-[56px] shrink-0 leading-none text-ink" style="font-size:15px">200<span class="ml-0.5 text-[9px] tracking-[0.18em] uppercase">mg</span></span><span class="text-ink">L-Theanine</span><span class="ml-auto font-sans text-[9px] tracking-[0.22em] uppercase text-ink/70">Lead</span></li>
            <li class="flex items-baseline gap-3 text-[12px]"><span class="font-display tabular-nums w-[56px] shrink-0 leading-none text-mist" style="font-size:15px">500<span class="ml-0.5 text-[9px] tracking-[0.18em] uppercase">mg</span></span><span class="text-mist">Lion's Mane</span></li>
            <li class="flex items-baseline gap-3 text-[12px]"><span class="font-display tabular-nums w-[56px] shrink-0 leading-none text-mist" style="font-size:15px">150<span class="ml-0.5 text-[9px] tracking-[0.18em] uppercase">mg</span></span><span class="text-mist">Rhodiola Rosea</span></li>
            <li class="flex items-baseline gap-3 text-[12px]"><span class="font-display tabular-nums w-[56px] shrink-0 leading-none text-mist" style="font-size:15px">300<span class="ml-0.5 text-[9px] tracking-[0.18em] uppercase">mg</span></span><span class="text-mist">Bacopa Monnieri</span></li>
          </ul>
          <div data-stage-item="true" class="mt-6 flex items-baseline justify-between border-t border-ink/15 pt-3 max-w-[340px]"><span class="font-sans text-[10px] tracking-[0.2em] uppercase text-mist">Active blend</span><span class="font-display tabular-nums text-ink text-[17px] leading-none">1,150<span class="ml-1 text-[10px] tracking-[0.18em] uppercase text-mist">mg</span></span></div>
        </div></div>
        <div class="relative h-full min-h-0"><span aria-hidden="true" class="absolute inset-0 flex items-center justify-end pr-[2%] pointer-events-none select-none font-wordmark" style="opacity:1;font-size:clamp(260px,26vw,430px);font-weight:800;line-height:1;letter-spacing:-0.02em;color:transparent;-webkit-text-stroke:1.5px rgba(26,27,29,0.08)">01</span>…0 58vh blur2 radial #bcd3d8 → ghost 01/02/03 strokes… <div class="absolute inset-0"><canvas></canvas></div></div>
      </div>
    </div>
    <div class="flex items-center justify-center gap-5"><button aria-label="Go to Clear" data-go="01" class="font-sans text-[12px] tracking-[0.18em] uppercase text-ink">01</button><button data-go="02" class="text-ink/40">02</button><button data-go="03" class="text-ink/40">03</button></div>
  </div>
</section>
```

## Layout / CSS

- `relative w-full bg-bone h-screen flex flex-col` pinned via ScrollTrigger; 3 radial blooms (one per flavor `#bcd3d8/#e8c9a0/#c9b5c8 72%85% at66%52% 30%→14%→transparent72%` opacity toggled by active slide).
- Header: eyebrow `02 / Three flavors` left `text-mist` (eyebrow `02` ink), counter `1/3 tabular-nums` right; H2 `Three formulations. display 300 leading1.0 tracking-0.02em clamp 32→64px min(4.6vw,6.5vh)`. Divider `72×1 #bcd3d8 mt-7`.
- Body grid: `minmax(320px,5fr) minmax(0,7fr) gap-x clamp(16px,3vw,56px) items-center` — left copy, right ghost number + WebGL can (`58vh blur2` halo per flavor) + ghost `01/02/03` strokes `clamp 260→430px font-wordmark 800 -0.02em -webkit-text-stroke 1.5px rgba(26,27,29,0.08)`.
- Typo: `STILL.01 17px wordmark 800 -0.02em` + `signature 11px 0.22em mist`; H3 `Clear.  clamp52→128px display 300 leading0.92 tracking-0.015em` dot `#bcd3d8`; subtitle `16px serif italic mist`; body `15px leading1.65 max-w44ch`; dosages `200mg: 15px tabular-nums display w56 + 9px mg + 12px labels` Lead badge `ml-auto`; `Active blend 1,150mg border-t ink/15 pt3 max-w340`. Inactive ingredients `text-mist` vs active `text-ink`.

## Slides

- 01 Clear Cucumber & Yuzu (default, see above). 02 Dawn Ginger & Bergamot (`STILL.02` / `Dawn.` / `Ginger & Bergamot` / `For mornings that need momentum without the spike.` / $24NZD shop teaser / still-02.png + still-02-dawn label). 03 Dusk Blackcurrant & Manuka (`STILL.03` / `Dusk` / `Blackcurrant & Manuka` / `For late focus…` / $24 shop / still-03.png + still-03-dusk label). Dosages identical 200/500/150/300 → 1,150 across all SKUs.
- Can `images/cans/still-0*.png` `58vh` inside right cell `object-contain`, `drop-shadow 0 12px 24px rgba(0,0,0,0.08)`, parallax `translateY calc(var(--scroll-progress)*8px)`. Ghost numbers behind.

## Interaction

- Pagination: `1/3 →2/3→3/3` text; buttons `01 02 03` `12px 0.18em uppercase tabular-nums gap5 centered` active `text-ink` vs inactive `text-ink/40 duration300`; track `grid repeat(3,100%) translateX(-index*100%) transition 500ms cubic-bezier(0.4,0,0.2,1)` + `aria-hidden` toggle + `aria-label Go to Clear/Dawn/Dusk`; `ArrowLeft/Right` + swipe threshold 40px; no loop/auto.

## ACTUALLY rebuild

Keep all; rename `STILL.01→ACTUALLY.01` etc — keep `01` numeral + `signature` (same typography; `ACTUALLY.01` longer → keep `17px wordmark` but allow `tracking -0.03em` or `text-[15px]` to fit same width, keep `.` in ink). H3 `Clear/Dawn/Dusk` unchanged (flavor names). Can swap to `actually-0*.png` + `labels/actually-0*.png` per CAN-3D.md; ghost numbers `01→03` unchanged. Radial blooms per flavor keep hex (or tint ACTUALLY accent if desired but spec says keep).
