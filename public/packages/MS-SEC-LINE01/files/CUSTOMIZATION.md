# LINEUP - make it yours

Speak to your AI with plain English. Keep **No Scroller: pin-until-complete** and **pin freeing** (page owns until dock). Scroll aims on N viewports. Snap on lift. Change products and count. Do not restore a tall sticky track.

---

## Replace the whole product line

```
Replace PRODUCTS and SECTION_META in lineup-data.ts with my brand [NAME] and products: [LIST].
Keep No Scroller, snap, 3D cross-fade, and pin freeing.
H2 and eyebrow must match count N. Never leave ACTUALLY demo copy.
```

---

## Expand or reduce

```
Set PRODUCTS to [N] items. Virtual earn must be N viewports (not a document spacer).
Snap 0, 1/N, …, 1. Update SECTION_META title and eyebrow.
Keep pin freeing. Do not restore ScrollTrigger pin or lenis.
```

---

## Swap the vessel

```
Replace can.glb and labels. Set meshPath / labelPath per product.
Keep studio HDRI and stage cross-fade. Keep No Scroller.
```

---

## Pin freeing (if scroll feels stuck after the last product)

```
After the last product, scrolling down must release the pin.
Then the PAGE owns the wheel until the section docks at the top again (stage.top >= 0; implement >= -2).
Scrolling up in the next section must move the page, not rewind the lineup.
Pointer on the next sibling must never drive the lineup.
Do not restore a tall sticky track. Do not add PSAVE.
```

---

## Keep the engine

- [ ] One 100dvh stage
- [ ] Virtual progress 0 to 1 (not page height)
- [ ] Earn N vh (N = PRODUCTS.length)
- [ ] Snap on lift
- [ ] Release at 0 plus up or 1 plus down
- [ ] After release at the end, page owns until the stage docks
- [ ] Pointer on the next sibling never drives the lineup
- [ ] gsap for SKU tweens only. No ScrollTrigger pin. No lenis
- [ ] No PSAVE
- [ ] Reduced motion: first product static

---

## If it breaks

```
Something is broken: [DESCRIBE WHAT YOU SEE].
Fix it and keep Lineup as a No Scroller product reveal with 3D vessel and copy.
Keep pin freeing (page owns until dock).
Do not restore ScrollTrigger pin, lenis, or a tall multi-vh sticky track. Do not add PSAVE. Do not ask me to write code.
```

ClickMotion · www.ClickMotion.dev
