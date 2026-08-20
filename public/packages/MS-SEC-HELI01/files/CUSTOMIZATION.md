# HELIX - make it yours

Speak to your AI with plain English. Keep **No Scroller: pin-until-complete** and **pin freeing** (page owns until dock). Scroll aims on 5 viewports desktop / 3 mobile. The helix and titles follow that progress. The page does not physically scroll during the viewing. Change brand and cards. Do not change the engine unless you are swapping the helix math on purpose.

---

## Swap brand strings

```
Replace ClickMotion with [YOUR BRAND] in the center wordmark and any aria-label.
Change Design in to [TITLE A].
Change motion to [TITLE B].
Change the two center lines to [LINE 1] and [LINE 2].
Replace the bottom-left concepts paragraph with [LINE 1] / [LINE 2] / [LINE 3].
Keep the cool-gray stage unless I also change color.
```

---

## Rewrite the nine cards

```
Replace orbit-01.jpg through orbit-09.jpg with my nine images:
[LIST PATHS OR DESCRIPTIONS]
Keep rounded cards, helix path, reverse load order if needed, and high-quality textures.
Do not cover the cards with a loud background film.
```

---

## Recolor the board

```
Change stage #C3C3C3 to [STAGE HEX].
Change ink to [INK HEX].
Keep type readable. Do not add a white flash when the pin releases.
```

---

## Pin freeing (if scroll feels stuck after the last moment)

```
After the last moment, scrolling down must release the pin.
Then the PAGE owns the wheel until the section docks at the top of the viewport again (stage.top >= 0; implement >= -2).
Scrolling up in the next section must move the page, not rewind the helix.
Pointer on the next sibling must never drive the helix.
Do not restore a tall sticky track. Do not add PSAVE.
```

---

## Make it work on phones

```
Improve mobile so titles clamp, concepts stay readable, and the helix still feels premium on a single viewport stage.
Keep No Scroller and pin freeing. Do not add a tall page track.
```

---

## Keep the engine

- [ ] One 100dvh stage
- [ ] Virtual progress 0 to 1 (not page height)
- [ ] Earn 5 vh desktop / 3 vh mobile
- [ ] Release at 0 plus up or 1 plus down
- [ ] After release at the end, page owns until the stage docks
- [ ] Pointer on the next sibling never drives the helix
- [ ] No gsap. No lenis. No tall sticky track
- [ ] No PSAVE. No film reverse
- [ ] Reduced motion: mid pose at 0.45

---

## If it breaks

```
Something is broken: [DESCRIBE WHAT YOU SEE].
Fix it and keep Helix as a spatial mid-page gallery with No Scroller, helix cards, and crossing titles.
Keep pin freeing (page owns until dock).
Do not restore gsap, lenis, or a tall multi-vh sticky track. Do not add PSAVE. Do not ask me to write code.
```

ClickMotion · www.ClickMotion.dev

