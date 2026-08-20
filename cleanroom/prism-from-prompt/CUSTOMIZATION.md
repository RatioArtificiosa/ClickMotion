# PRISM - make it yours

Speak to your AI with plain English. Keep **dual process: PSAVE + No Scroller**. Scroll aims on 12 viewports. The film plays forward and reverse. The page does not physically scroll during the journey. Change brand and panels. Do not change the engine unless you are swapping the film. Keep glass on **both sides**.

The buyer-facing copy of this file lives in `public/packages/MS-HERO-PRSM01/files/CUSTOMIZATION.md`. Keep them in sync.

---

## Swap brand strings

```
Replace PRISM with [YOUR BRAND] everywhere, including the nav wordmark.
Update Identity studio to [MY KICKER].
Update nav links Work, Approach, Atelier, Journal to [MY FOUR LINKS].
Update Book intro to [MY NAV CTA].
Keep the studio-mist canvas, violet-cyan accents, and both-side glass field.
```

---

## Rewrite panels

```
Rewrite the glass panel titles, bodies, metrics, quotes, and CTA for my identity studio.
Keep three acts on the playhead: Atelier 0-0.34, Proof 0.34-0.66, Invite 0.66-1.
Keep panels of many sizes on BOTH left and right. Do not collapse to a left column.
Keep silk / ice / mercury tiers.
Do not add a fourth act. Do not cover the center faces.
```

---

## Swap the film

```
Use my MP4 as the PRISM hero film.
1) Re-encode first (required):
   ffmpeg -y -i my-film.mp4 -an -c:v libx264 -pix_fmt yuv420p -preset slow -crf 16 -g 3 -keyint_min 3 -bf 0 -sc_threshold 0 -movflags +faststart prism-faces-v1.mp4
2) Save as public/assets/videos/prism-faces-v1.mp4
3) Poster to public/assets/posters/prism-faces-v1.webp
4) Keep PSAVE: scroll aims, film plays forward at 1.2x and reverse every 3rd frame, leftover dest plus 0.55s dest floor on lift
5) Keep the 12 viewport aim track unless two flicks dump an act (then raise) or the new film is much shorter (then smoke two flicks before lowering)
6) Prefer a 24-50s silent 16:9 centered sculpture or portrait-object, 24fps, empty left and right thirds for glass
Do not use a storefront preview as the hero. Do not skip the GOP 3 remaster.
```

---

## Colors

```
Keep studio mist + white type on glass + one violet-to-cyan accent pair.
Change #E8EAEF, #A78BFA, #67E8F9 to [CANVAS], [VIOLET], [CYAN].
Keep readable white type on darkened glass plates. No neon primary system.
```

---

## Atelier band

```
Change the closing atelier headline, body, and two buttons to [MY COPY].
Keep it as the next sibling after the pin. It must only appear after the picture arrives at the last frame.
```

---

## Fonts

```
Load my geometric display as --font-prism-display and my UI sans as --font-prism-sans.
Keep tight tracking on the wordmark and readable 13px panel body.
```

---

## Make it work on phones

```
Improve the mobile layout so the multi-panel field hides under 640px, one mercury strip sits at the bottom with the active act, Book intro stays reachable, and the stage stays one pinned viewport. Dual process must still hold: page does not physically scroll during the journey.
```

---

## QA after restage

- [ ] Page does not physically scroll during the journey (`scrollY` stays 0)
- [ ] Tiny wheel click creeps a few frames (no jump)
- [ ] Fling plays the movie to the aim (destination may leap; picture does not)
- [ ] Lift mid-act: film keeps going a little, then eases to a stop
- [ ] Reverse walks every 3rd frame; no stall-then-jump to the start
- [ ] Panels on both sides + moment pill + violet bar follow the picture
- [ ] Center faces stay clear
- [ ] After last frame, one more down-scroll shows the atelier band
- [ ] No gsap. No 520vh sticky. No left-column-only dump
- [ ] Reduced motion: mid composition at 0.42
- [ ] Paths resolve

---

## Fix broken

```
Something is wrong: [DESCRIBE].
Keep dual process: PSAVE plus No Scroller.
Scroll aims on 12 viewports. Down plays at 1.2x. Up reverses every 3rd frame.
Leftover dest plus 0.55s dest floor on lift. Never jump a frame.
Do not restore gsap, a 520vh sticky track, or a left-column-only layout.
Do not reduce to wallpaper only.
Do not ask me to write code.
```

ClickMotion · www.ClickMotion.dev
