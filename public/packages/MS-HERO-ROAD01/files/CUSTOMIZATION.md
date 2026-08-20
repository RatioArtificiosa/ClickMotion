# ROADSTER - make it yours

Speak to your AI with plain English. Keep **No Scroller: pin-until-complete** and **pin freeing** (page owns until dock). Scroll aims on 13.3 viewports. Change brand, film, mesh, and copy. Do not restore a tall sticky track.

---

## Rebrand chrome

```
Change TESLA and ROADSTER labels to [BRAND] and [MODEL].
Keep dark ink on the bright film and white type on the black sheet.
Keep No Scroller and pin freeing.
```

---

## Rewrite story cards

```
Update PANELS kickers, titles, bodies, and stats for [MY PRODUCT].
Keep enter-hold-exit timing. Keep the quiet intro before the first card.
Keep No Scroller. Do not restore a tall sticky track.
```

---

## Swap the film

```
Replace public/assets/roadster/studio-drive.mp4 with my film.
Keep muted loop. Never scrub with scroll. Do not add PSAVE.
```

---

## Swap the 3D model

```
Replace public/assets/roadster/roadster.glb with my GLB.
Tune MODEL_SCALE and MODEL_Y so it fits the sheet without clipping.
Keep Y-axis spin. Mount the canvas only when the sheet is visible.
```

---

## Edit specs sheet

```
Update DRIVE_SPECS and MORE_SPECS and CTA labels to [MY SPECS AND CTAS].
Keep the rounded pull-up sheet over the live film.
```

---

## Pin freeing (if scroll feels stuck after the sheet docks)

```
After the last moment, scrolling down must release the pin.
Then the PAGE owns the wheel until the hero docks at the top again (stage.top >= 0; implement >= -2).
Scrolling up in the next section must move the page, not rewind the cards.
Pointer on the next sibling must never drive the hero.
Do not restore a tall sticky track. Do not add PSAVE.
```

---

## Keep the engine

- [ ] One 100dvh stage
- [ ] Virtual progress 0 to 1 (not page height)
- [ ] Earn 13.3 vh (12 panel + 1.3 sheet)
- [ ] Release at 0 plus up or 1 plus down
- [ ] After release at the end, page owns until the stage docks
- [ ] Pointer on the next sibling never drives the hero
- [ ] Film free-plays. Never seek currentTime
- [ ] No gsap. No ScrollTrigger pin. No lenis
- [ ] No PSAVE
- [ ] Reduced motion: settled cards + docked sheet

---

## If it breaks

```
Something is broken: [DESCRIBE WHAT YOU SEE].
Fix it and keep Roadster as a No Scroller studio-drive hero with looping film, enter-hold-exit cards, pull-up sheet, and Y-spin GLB.
Keep pin freeing (page owns until dock).
Do not restore ScrollTrigger pin, gsap, lenis, or a tall multi-vh sticky track. Do not add PSAVE. Do not scrub the film. Do not ask me to write code.
```

ClickMotion · www.ClickMotion.dev
