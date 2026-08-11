# 03 — Inside / Functional ingredients ( #inside ) — drinkstill.nz exact → ACTUALLY

Source: `raw/inside_raw.html` (15,579 chars) + sub-agent Tabs+Cards audit.

## DOM

```html
<section id="inside" class="relative w-full bg-ink text-bone md:h-screen md:min-h-screen flex flex-col">
  <div class="sticky top-0 flex-1 flex flex-col">
    <div class="max-w-[1440px] mx-auto w-full px-[clamp(24px,4vw,48px)] py-[clamp(32px,6vh,72px)]">
      <div class="font-sans text-[12px] tracking-[0.2em] uppercase text-bone/50">03 · Functional ingredients</div>
      <h2 class="font-display font-[300] italic text-bone" style="font-size:clamp(28px,4.4vw,56px);line-height:1.0">Inside.</h2>
      <div class="hidden md:flex gap-2 border-y border-bone/15 py-3 mt-8">
        <button data-id="129d…057" class="flex-1 font-sans text-[12px] tracking-[0.18em] uppercase py-3 bg-bone text-ink">L-THEANINE</button>
        <button data-id="e9b6…" class="flex-1 font-sans text-[12px] tracking-[0.18em] uppercase py-3 text-bone/60 hover:text-bone transition-colors duration-300">LION'S MANE</button>
        <button …>RHODIOLA</button><button …>BACOPA</button>
      </div>
      <div class="grid grid-cols-12 gap-6 mt-10">
        <div class="col-span-4">
          <h3 class="font-wordmark text-bone leading-[0.9] uppercase" style="font-weight:900;letter-spacing:-0.03em;font-size:clamp(28px,4vw,48px)">L-THEANINE</h3>
          <p class="font-serif italic text-bone/60 text-[14px]">Camellia sinensis</p>
          <p class="font-sans text-[12px] tracking-[0.2em] text-bone/50 tabular-nums mt-2">01 / 04</p>
        </div>
        <div class="col-span-5"><p class="font-sans text-[14px] leading-[1.6] text-bone/90 max-w-[32ch]">Promotes calm focus by encouraging alpha brain wave activity. Found naturally in green tea leaves.</p></div>
        <div class="col-span-3 space-y-3 border-l border-bone/15 pl-6">
          <p><span class="font-sans text-[10px] tracking-[0.24em] uppercase text-bone/50">Source</span><span class="font-sans text-[13px] text-bone ml-2">Green tea leaf</span></p>
          <p><span class="font-sans text-[10px] tracking-[0.24em] uppercase text-bone/50">Role</span><span class="font-sans text-[13px] text-bone ml-2">Calm, without sedation</span></p>
          <p class="flex items-center gap-3 border-t border-bone/15 pt-3"><span class="font-sans text-[10px] tracking-[0.24em] uppercase text-bone/50">Dose</span><span class="font-display tabular-nums text-bone">200mg of 1,150</span><span class="flex-1 h-px bg-bone/15 relative"><span class="absolute inset-y-0 left-0 bg-bone origin-left" style="width:17.39%"></span></span></p>
        </div>
      </div>
      <p class="font-sans text-[11px] tracking-[0.18em] uppercase text-bone/60 text-center mt-12 border-t border-bone/10 pt-6">FOUR FUNCTIONAL INPUTS. CLINICAL DOSES. NOTHING ELSE.</p>
    </div>
    <div class="absolute inset-0 pointer-events-none" style="opacity:0.92"><canvas></canvas></div> + halo + ghost
  </div>
</section>
```

Plus 3 hidden `<article>` for Lion's Mane / Rhodiola / Bacopa with counters `02/04` `03/04` `04/04`.

## Layout / CSS

- `bg-ink (#1a1b1d) text-bone (#efede6)` `md:h-screen sticky top-0 flex-1 flex-col` pinned; `max-w 1440 px clamp(24px,4vw,48px) py clamp(32px,6vh,72px)`.
- Eyebrow `03 · Functional ingredients` `12px 0.2em uppercase bone/50` (dot `·` not slash), H2 `Inside. italic display 300 clamp 28→56px leading1.0 bone`.
- Tabs `hidden md:flex gap2 border-y bone/15 py3 mt-8` 4× `flex-1 py3 12px 0.18em uppercase` active `bg-bone text-ink` vs idle `bone/60 hover bone duration300`.
- Grid `12-col gap6 mt-10`: name column `col-span-4` (`L-THEANINE  clamp28→48px wordmark 900 leading0.9 tracking-0.02em uppercase` + `Camellia sinensis 14px serif italic bone/60` + `01/04 12px 0.2em bone/50 tabular-nums`), description `col-span-5 14px leading1.6 bone/90 max-w32ch`, metadata `col-span-3 border-l bone/15 pl6 space-y3` (`Source/Role/Dose` labels `10px 0.24em uppercase bone/50` + values `13px bone` / dose `display tabular-nums` + bar `flex-1 h-px bone/15 fill bone origin-left width dose/1150%`: `200→17.39% 500→43.47% 150→13.04% 300→26.08%`).
- Tagline `FOUR FUNCTIONAL... 11px 0.18em bone/60 text-center border-t bone/10 pt6 mt12`.

## Cards verbatim

- 01 L-THEANINE `Camellia sinensis` `01/04` `Promotes calm focus… green tea leaves.` `Source Green tea leaf` `Role Calm, without sedation` `200mg of 1,150` 17.39%
- 02 LION'S MANE `Hericium erinaceus` `Whole fruiting body` `02/04` `A medicinal mushroom that supports nerve growth factor…` `Long-term clarity` `500mg` 43.47%
- 03 RHODIOLA `Rhodiola rosea` `Arctic root extract` `03/04` `An adaptogenic root that reduces mental fatigue…` `Fatigue resistance` `150mg` 13.04%
- 04 BACOPA `Bacopa monnieri` `Whole-plant extract` `04/04` `An ayurvedic herb traditionally used to enhance memory…` `Memory and retention` `300mg` 26.08%
- Total `200+500+150+300=1,150` matches flavors.

## Interaction

- Desktop: tab click → active `bg-bone text-ink` + `article display grid vs none` cross-fade `300ms ease-out`; no hash; ArrowLeft/Right 0-3.
- Mobile `hidden md:flex` → touch slider `translateX` threshold 32px + dots + `01/04` live; `touchstart/touchend`.
- Canvas pinned inside section `ContactShadows [0,-1.4,0] .32 scale4 blur2 far2` with `useInView 600px frameloop`.

## ACTUALLY rebuild

Keep all; no STILL→ACTUALLY needed here (ingredients unaffected). Keep grid, bars, tabs. If labeling cans inside, swap `still-` → `actually-` textures per CAN-3D but Inside has no can image.

## Tone note

Copy is editorial scientific; no marketing hype; matches STILL's "baseline not stimulant high" voice.
