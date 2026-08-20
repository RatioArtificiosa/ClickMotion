# ACTUALLY - make it yours

Speak to your AI with plain English. Keep **No Scroller: pin-until-complete** and **pin freeing** (page owns until dock). Scroll aims on 1.2 viewports. Change brand, mesh, and copy. Do not restore a tall sticky track.

---

## Change the wordmark

```
Change the hero wordmark from ACTUALLY. to [YOUR BRAND].
Keep heavy geometric weight, giant sizing, and optional accent on the final glyph.
Update the loader mark and aria-label to match [YOUR BRAND].
Keep No Scroller and pin freeing.
```

---

## Change taglines and meta

```
Change "Actually? / Really. Actually." to "[LINE 1] / [LINE 2]".
Change the bottom-right meta to "[CATEGORY LINE] / [LOCATION LINE]".
Keep editorial spacing and uppercase tracking on the meta block.
```

---

## Change the formula story

```
Rewrite the support index, H2, body paragraph, and two stats for [PRODUCT STORY].
Keep the left column reveal after mid progress (show after g 0.58, hide under 0.35).
Keep No Scroller and pin freeing.
```

---

## Load your product

```
Replace can.glb and the label PNG. Keep metal vs label, HDRI, grab spin.
Keep No Scroller. Do not add PSAVE.
```

---

## Change colors

```
Change bone #efede6, ink #1a1b1d, and accent #bcd3d8 to [PAPER] / [STAGE] / [ACCENT].
Keep type readable on both layers.
```

---

## Pin freeing (if scroll feels stuck after the last moment)

```
After the last moment, scrolling down must release the pin.
Then the PAGE owns the wheel until the hero docks at the top again (stage.top >= 0; implement >= -2).
Scrolling up in the next section must move the page, not rewind the reveal.
Pointer on the next sibling must never drive the hero.
Do not restore a tall sticky track. Do not add PSAVE.
```

---

## Keep the engine

- [ ] One 100dvh stage
- [ ] Virtual progress 0 to 1 (not page height)
- [ ] Earn 1.2 vh
- [ ] Release at 0 plus up or 1 plus down
- [ ] After release at the end, page owns until the stage docks
- [ ] Pointer on the next sibling never drives the hero
- [ ] Pointer window + grab stay
- [ ] gsap for pointer / clip / support tweens only. No ScrollTrigger pin. No lenis
- [ ] No PSAVE
- [ ] Reduced motion: static product pose

---

## If it breaks

```
Something is broken: [DESCRIBE WHAT YOU SEE].
Fix it and keep Actually! as a product-first hero with pointer window, living 3D vessel, and No Scroller formula reveal.
Keep pin freeing (page owns until dock).
Do not restore ScrollTrigger pin, lenis, or a tall multi-vh sticky track. Do not add PSAVE. Do not ask me to write code.
```

ClickMotion · www.ClickMotion.dev
