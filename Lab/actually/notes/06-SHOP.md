# 06 — Shop / Stockists ( #shop + #stockists ) — drinkstill.nz exact → ACTUALLY

Source: `raw/shop_raw.html` (35,310 chars) — largest.

## DOM

```html
<section id="shop" class="relative w-full bg-bone">
  <div class="mx-auto w-full max-w-[1280px] px-5 md:px-8 py-20 md:py-[120px]">
    <div><div class="font-sans text-[12px] tracking-[0.2em] uppercase text-mist" style="opacity:0"><span class="text-ink">06</span><span class="mx-2 text-mist/50">/</span>Where available</div>
    <h2 class="mt-4 font-wordmark uppercase text-ink leading-[1.02]" style="font-size:clamp(28px,3.6vw,48px);font-weight:900;letter-spacing:-0.02em;max-width:980px;opacity:0">Find STILL in store, or order direct.</h2></div>
    <div id="stockists" class="mt-12 md:mt-[80px] grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-16">
      <div><button class="w-full flex items-center justify-between md:pointer-events-none"><h3 class="font-sans text-ink" style="font-size:clamp(24px,6vw,32px);font-weight:600;letter-spacing:-0.3px;line-height:1.1">Wellington</h3><svg class="md:hidden text-mist rotate-180"><path d="M6 9 L12 15 L18 9"/></svg></button>
      <div class="mt-4" style="height:1px;background:rgba(26,27,29,0.2)"></div>
      <ul class="mt-5 flex-col md:flex flex"><li data-stockist-item="true" class="group relative" style="border-bottom:1px solid rgba(140,139,134,0.3)">
        <span aria-hidden="true" class="absolute -inset-x-3 inset-y-0 bg-ink origin-bottom scale-y-0 transition-transform duration-[350ms] ease-out group-hover:scale-y-100"></span>
        <div class="relative z-10 flex items-baseline justify-between gap-4 py-4 px-0 transition-transform duration-[350ms] group-hover:translate-x-3"><span class="flex flex-col min-w-0"><span class="font-sans text-ink group-hover:text-bone" style="font-size:16px;font-weight:500;letter-spacing:0.005em">Moore Wilson's Fresh</span><span class="mt-1 font-sans text-mist group-hover:text-bone/60" style="font-size:14px">93 Tory Street</span></span><span aria-hidden="true" class="shrink-0 font-sans text-bone opacity-0 -translate-x-2 transition-all duration-[350ms] group-hover:opacity-100 group-hover:translate-x-0" style="font-size:14px">→</span></div></li>
        …Commonsense Organics 260 Wakefield St · Customs by Coffee Supreme 39 Ghuznee St · Mecca Cuba 71 Cuba St · Goodness Gracious 122 Aro St
      </div>
      <div>Auckland: Farro Fresh Grey Lynn 422 Great North Rd · Daily Bread Britomart 11 Britomart Pl · Allpress Espresso Ponsonby 12 Drake St · Cazador 854 Dominion Rd · Eighthirty Newmarket 53 Davis Cr.</div>
      <div>Christchurch: Vic's Cafe 132 Victoria St · C1 Espresso 185 High St · Caffeine Laboratory 1 New Regent St · Hummingbird Coffee 269 Tuam St · Black Betty 165 Madras St</div>
    </div>
    <div class="mt-12 grid place-items-center"><span class="font-sans text-[11px] tracking-[0.28em] uppercase text-mist">Coming soon</span><div class="mt-3 flex flex-wrap justify-center gap-x-8 gap-y-2 font-sans text-[13px] tracking-[0.04em] text-mist">Melbourne<span>·</span>Sydney<span>·</span>London<span>·</span>New York<span>·</span>Tokyo</div></div>
    <div class="mt-16">OR ORDER DIRECT</div>
    <div class="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-12">
      <article class="group relative bg-bone border border-ink/15 p-6 md:p-8 hover:-translate-y-1 transition-all">
        <div aria-hidden="true" class="absolute inset-0 bg-ink/[0.04] opacity-0 group-hover:opacity-100 transition-opacity"></div>
        <div class="relative"><span class="font-sans text-[11px] tracking-[0.2em] uppercase text-mist">STILL.01·Clear</span><span class="mt-1 font-serif italic text-mist" style="font-size:14px">Cucumber & Yuzu</span><span class="mt-2 font-sans text-[13px] text-mist">For when you need to think clearly, all day.</span><span class="mt-4 font-display tabular-nums text-ink" style="font-size:17px">$24<span class="font-sans text-mist" style="font-size:12px">NZD</span></span><a class="mt-4 font-sans text-[12px] tracking-[0.18em] uppercase text-mist group-hover:text-ink">Subscribe and save 15%</a></div>
        <div class="mt-6"><img src="/images/cans/still-01.png" alt="STILL.01 Clear"/><canvas> (InlineCan active? actually image here)</div>
      </article>
      ×3: STILL.02·Dawn Ginger & Bergamot $24 15% · STILL.03·Dusk Blackcurrant & Manuka $24 15%
    </div>
    <div class="mt-10">THE RANGE · Order direct. <a class="bg-ink text-bone px-8 h-12 inline-flex items-center">Order</a></div>
  </div>
</section>
```

+ `footer` email capture `Get notified…` + legal `privacy terms`.

## Layout / CSS

- `bg-bone py-20 md:py-[120px] px5 md:px8 max-w1280 mx-auto`. Eyebrow `06 / Where available 12px 0.2em mist/ink`. H2 `Find STILL in store, or order direct. wordmark 900 upper 1.02 clamp28→48px tracking-0.02em max-w980`.
- Stockists `mt12→80 grid 1→3 gap6→16`: each city `Wellington/Auckland/Christchurch h3 24→32px 600 -0.3px` vs `revealed` mobile accordion `button rotate-180`. Hairline `1px rgba(26,27,29,0.2) mt4`. List `ul mt5 flex-col border-b rgba(140,139,134,0.3)` per `li group relative`: hover `bg-ink scale-y 0→100 origin-bottom 350ms ease-out` + content `translate-x 3px` + arrow `→` `opacity0 -translate-x2 →100 translate0` + text `ink→bone 350ms`.
- Coming soon `mt12 11px 0.28em mist` + cities `13px mist 0.04em flex-wrap gap-x8 · separator`.
- OR ORDER DIRECT `mt16 uppercase` + 3 cards `grid 1→3 gap6→12 p6→8 border ink/15 hover -translate-y-1 group bg-ink/0.04 overlay opacity0→100`.
- Card: badge `11px 0.2em mist STILL.0*·Clear`, subtitle `14px serif italic`, blurb `13px mist`, price `17px display tabular-nums $24 12px NZD`, CTA `12px 0.18em uppercase`. Image `still-*.png 1120×1400` centered.

## Copy verbatim

- Wellington 5: Moore Wilson's Fresh 93 Tory St · Commonsense Organics 260 Wakefield St · Customs by Coffee Supreme 39 Ghuznee St · Mecca Cuba 71 Cuba St · Goodness Gracious 122 Aro St
- Auckland 5: Farro Fresh Grey Lynn 422 Great North Rd · Daily Bread Britomart 11 Britomart Pl · Allpress Espresso Ponsonby 12 Drake St · Cazador 854 Dominion Rd · Eighthirty Newmarket 53 Davis Cr
- Christchurch 5: Vic's Cafe 132 Victoria St · C1 Espresso 185 High St · Caffeine Laboratory 1 New Regent St · Hummingbird Coffee 269 Tuam St · Black Betty 165 Madras St
- Coming: Melbourne · Sydney · London · New York · Tokyo
- Shop 01: `STILL.01·Clear — Cucumber & Yuzu — For when you need to think clearly, all day. — $24NZD — Subscribe and save 15%`
- Shop 02: `STILL.02·Dawn — Ginger & Bergamot — For mornings that need momentum without the spike. — $24 — Subscribe 15%`
- Shop 03: `STILL.03·Dusk — Blackcurrant & Manuka — For late focus that won't follow you to bed. — $24 — Subscribe 15%` + `THE RANGE Order direct.`

## Motion

- Stockist `group-hover` 350ms; cards `hover:-translate-y-1`; mobile accordion `height` animate; canvas blooms behind stockists subtle.

## ACTUALLY rebuild

Rename `STILL` → `ACTUALLY`: `Find ACTUALLY in store, or order direct.` + `ACTUALLY.01·Clear` etc same `11px 0.2em` badges (fit `ACTUALLY.03` wider → keep `text-[11px]` but reduce `tracking 0.2em→0.16em` or allow wrap; keep `STILL.` period → `ACTUALLY.`). Stockist addresses unchanged (same stockists if partner, or keep copy). Price `$24NZD 15%` unchanged. Swap can images to `actually-0*.png` + textures per CAN-3D. Keep `bg-bone` + hover `bg-ink` invert.
