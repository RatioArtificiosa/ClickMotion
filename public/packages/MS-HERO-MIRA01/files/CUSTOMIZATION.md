# MIRAGE - make it yours

Speak to your AI with plain English. Keep **No Scroller: pin-until-complete**. Scroll aims on 5 × 1.55 viewports. The cards follow that progress. The film free-plays. After the last card, the **page owns scroll until the hero docks at the top**. Change brand and cards. Do not change the engine unless you are swapping sheet count on purpose.

---

## Swap brand strings

```
Change the brand name MIRAGE to [YOUR BRAND] everywhere, including the top left and any aria-label.
Change the two-line headline "Creative that" / "survives the heat." to "[LINE 1]" / "[LINE 2]".
Keep exactly two lines. Keep nowrap on each line.
Replace Work Method Clients Culture Contact with [YOUR LINKS]. Keep minimal text-only nav.
```

---

## Rewrite the five cards

```
Rewrite all five glass cards for [YOUR AGENCY / BRAND].
Keep dense metrics, rows, chips, and the scroll pivot.
Keep No Scroller and pin freeing. Do not add PSAVE.
```

---

## Recolor the board

```
Keep dark morphic glass, but shift gold and cyan accents to [HEX A] and [HEX B].
Keep type readable. Do not turn the cards into white frost or opaque black plates.
```

---

## Swap the background film

```
Replace the background video with [YOUR VIDEO LINK OR FILE].
Keep it muted, looping, free-playing. Do not scroll-scrub the video.
Keep the subject on the right if possible.
```

---

## Pin freeing (if scroll feels stuck after the last card)

```
After the last card, scrolling down must release the pin.
Then the PAGE owns the wheel until the hero docks at the top of the viewport again (stage.top >= 0).
Scrolling up in the next section must move the page, not rewind the cards.
Pointer on the next sibling must never drive the cards.
Do not restore a tall sticky track. Do not add PSAVE.
```

---

## Keep the engine

- [ ] One 100dvh stage
- [ ] Virtual progress 0 to 1 (not page height)
- [ ] Earn max(2.4, sheets × 1.55) viewports
- [ ] Release at 0 plus up or 1 plus down
- [ ] After release at the end, page owns until dock
- [ ] Pointer on the next sibling never drives the cards
- [ ] Film free-plays muted. Never scrub. Never reverse
- [ ] No gsap. No lenis. No tall sticky track
- [ ] No PSAVE
- [ ] Reduced motion: static stacked cards

---

## Make it work on phones

```
Improve mobile so the headline stays two lines when possible, cards stay readable, and the subject film still feels premium.
Keep No Scroller and pin freeing. Do not add a tall page track.
```

---

## If it breaks

```
Something is broken: [DESCRIBE WHAT YOU SEE].
Fix it and keep Mirage as a morphic dark liquid-glass agency hero over free-playing desert film.
Keep No Scroller (pin-until-complete) and pin freeing (page owns until dock).
Do not restore a tall multi-vh sticky track. Do not add PSAVE. Do not scrub the film.
Do not ask me to write code.
```

ClickMotion · www.ClickMotion.dev
