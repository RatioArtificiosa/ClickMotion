# STUDIO SEQUENCE - make it yours

Speak to your AI with plain English. Keep **No Scroller: pin-until-complete** and **pin freeing** (page owns until dock). Scroll aims on 4 viewports desktop / 3 mobile. The camera follows that progress. The film free-plays. Change film and plate. Do not change the engine unless you are swapping earn on purpose.

---

## Swap the billboard film

```
Use my MP4 as public/assets/studio/billboard-film.mp4.
Play full duration with loop. Do not seek video with scroll.
Do not regrade with CSS filters unless I ask.
Keep No Scroller and pin freeing.
```

---

## Swap the street plate

```
Replace street-plate.png with my facade still.
Update plateWidth / plateHeight and re-measure billboard left / top / width / height as fractions of the plate.
Keep four-edge cover full-bleed open.
```

---

## Slower or faster camera

```
Set virtualViewportsDesktop to [N] and virtualViewportsMobile to [M] in studio-data.ts.
Keep holdIn 0.06 and holdOut 0.9 unless I also change those.
Film still plays full length on its own timeline.
Do not restore a tall sticky track.
```

---

## Pin freeing (if scroll feels stuck after the last moment)

```
After the last moment, scrolling down must release the pin.
Then the PAGE owns the wheel until the section docks at the top of the viewport again (stage.top >= 0; implement >= -2).
Scrolling up in the next section must move the page, not rewind the camera.
Pointer on the next sibling must never drive the camera.
Do not restore a tall sticky track. Do not add PSAVE.
```

---

## Make it work on phones

```
Improve mobile so the open is still full-bleed, the street remains readable at the end, and earn does not feel endless.
Keep No Scroller and pin freeing. Do not add a tall page track.
```

---

## Keep the engine

- [ ] One 100dvh stage
- [ ] Virtual progress 0 to 1 (not page height)
- [ ] Earn 4 vh desktop / 3 vh mobile
- [ ] Release at 0 plus up or 1 plus down
- [ ] After release at the end, page owns until the stage docks
- [ ] Pointer on the next sibling never drives the camera
- [ ] Film free-plays. Never scrub. Never reverse
- [ ] No gsap. No lenis. No tall sticky track
- [ ] No PSAVE
- [ ] Reduced motion: scale at 1

---

## If it breaks

```
Something is broken: [DESCRIBE WHAT YOU SEE].
Fix it and keep Studio Sequence as a world-scale camera pull-out with No Scroller and independent film playback.
Keep pin freeing (page owns until dock).
Do not restore gsap, lenis, or a tall multi-vh sticky track. Do not add PSAVE. Do not seek the film. Do not ask me to write code.
```

ClickMotion · www.ClickMotion.dev
