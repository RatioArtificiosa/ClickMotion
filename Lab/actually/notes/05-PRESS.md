# 05 — Press ( #press ) — drinkstill.nz exact → ACTUALLY

Source: `raw/press_raw.html` (10,108 chars).

## DOM

```html
<section id="press" class="relative w-full bg-ink overflow-hidden py-24 md:py-[140px]">
  <div class="mx-auto w-full max-w-[1440px] px-[clamp(24px,6vw,120px)]">
    <div class="font-sans text-[12px] tracking-[0.2em] uppercase text-bone/50"><span class="text-bone">05</span><span class="mx-2 text-bone/30">/</span>Press</div>
    <h2 class="mt-4 font-wordmark uppercase leading-[0.95] text-bone" style="font-size:clamp(30px,4.2vw,56px);font-weight:900;letter-spacing:-0.02em;opacity:0">Quietly noticed.</h2>
  </div>
  <div class="mx-auto mt-14 md:mt-20 w-full max-w-[1440px] px-[clamp(24px,6vw,120px)] grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12">
    <figure class="flex flex-col" style="opacity:0">
      <blockquote class="font-serif italic text-bone/90 leading-[1.45]" style="font-size:clamp(17px,1.4vw,20px)"><span class="sr-only">“The rare functional drink that tastes like a decision, not a compromise.”</span><span data-quote-visual="true" aria-hidden="true" class="block">“The rare functional drink that tastes like a decision, not a compromise.”</span></blockquote>
      <figcaption class="mt-5 font-sans text-[11px] tracking-[0.24em] uppercase text-bone/60">Meridian</figcaption>
    </figure>
    <figure>…Foldout “Proof that a can of adaptogens can be as considered as the desk it sits on.”</figure>
    <figure>…Quiet Hours “We stopped drinking coffee at our editorial meetings. Nobody has said so out loud.”</figure>
  </div>
  <div class="mt-16 md:mt-24 border-y border-bone/15 py-6 md:py-8 will-change-transform">
    <div class="flex w-max items-baseline whitespace-nowrap will-change-transform" aria-hidden="true">
      <div class="flex items-baseline">
        <span class="flex items-baseline"><span class="font-display font-[300] tracking-[-0.01em] whitespace-nowrap" style="font-size:clamp(28px,3.4vw,50px);color:rgba(239,237,230,0.85)">Meridian</span><span class="mx-[clamp(20px,3vw,44px)] inline-block rounded-full" style="width:6px;height:6px;background-color:#bcd3d8"></span></span> …×5 (Meridian, The Long Lunch, Foldout, Salt Journal, Quiet Hours) ×2 duplicated for marquee loop
      </div>
    </div>
  </div>
  <canvas> (Bloom 60vh) </canvas>
</section>
```

Plus `As featured in …` logotype strip auto-marquee.

## Layout / CSS

- `bg-ink py-24 md:py-[140px] px clamp(24px,6vw,120px) max-w1440`.
- Eyebrow `05 / Press 12px 0.2em bone/50` (`05` bone), H2 `Quietly noticed. wordmark 900 upper 0.95 clamp30→56px tracking -0.02em bone opacity0 scrubbed` .
- Quotes `grid 1→3 gap10 md:gap12 mt14→20`: each `blockquote font-serif italic bone/90 leading1.45 clamp17→20px` + `sr-only` + `data-quote-visual` block + `figcaption 11px 0.24em uppercase bone/60 mt5`.
- Marquee: `border-y bone/15 py6 md:py8 will-change-transform` → `flex w-max whitespace-nowrap will-change-transform` duplicates `Meridian · The Long Lunch · Foldout · Salt Journal · Quiet Hours` `display 300 tracking -0.01em clamp28→50px color rgba(239,237,230,0.85)` + dot `6×6 #bcd3d8 mx clamp20,3vw,44` `will-change-transform` translates `-50%` loop `gsap` or `CSS animation` infinite.

## Copy verbatim

- “The rare functional drink that tastes like a decision, not a compromise.” — **Meridian**
- “Proof that a can of adaptogens can be as considered as the desk it sits on.” — **Foldout**
- “We stopped drinking coffee at our editorial meetings. Nobody has said so out loud.” — **Quiet Hours**
- Strip: `Meridian · The Long Lunch · Foldout · Salt Journal · Quiet Hours` duplicated twice.

## Motion

- H2 / figures `opacity:0 scrubbed` fade on enter (Intersect+ScrollTrigger). Marquee auto-scroll `will-change-transform` infinite.

## ACTUALLY rebuild

Keep all verbatim. No STILL→ACTUALLY in this section (quotes mention Meridian etc, not Still). Keep fonts `Tiempos` quotes + `Söhne Breit` H2 + `display` marquee. Preserve `bg-ink` + marquee `border-y bone/15`.
