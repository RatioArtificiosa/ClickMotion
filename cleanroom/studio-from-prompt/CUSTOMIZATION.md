# Studio Sequence - make it yours

Same guide as the download pack (`CUSTOMIZATION.md` in the zip).

Keep **No Scroller: pin-until-complete** and **pin freeing** (page owns until dock). Scroll aims on 4 viewports desktop / 3 mobile. The camera follows that progress. The film free-plays.

## Swap the billboard film

```
Use my film as the billboard cinema.
Put my MP4 at public/assets/studio/billboard-film.mp4 or set videoSrc in studio-data.ts.
Play the entire file end to end with loop. Do not seek with scroll. Do not regrade unless I ask.
Keep No Scroller and pin freeing.
```

## Keep the included film

```
Keep the pack billboard film. Full duration loop. No trim. No regrade.
```

## Swap the street plate

```
Replace street-plate.png, update plate size, re-measure billboard fractions (inner screen only).
Keep four-edge cover so the open is still full-bleed film.
```

## Slower or silkier camera

```
Set virtualViewportsDesktop to [N] and virtualViewportsMobile to [M] in studio-data.ts.
Keep holdIn 0.06 and holdOut 0.9 unless I also change those.
Film still plays full length on its own timeline.
Do not restore a tall sticky track. Do not add PSAVE.
```

## Pin freeing (if scroll feels stuck after the last moment)

```
After the last moment, scrolling down must release the pin.
Then the PAGE owns the wheel until the section docks at the top of the viewport again (stage.top >= 0; implement >= -2).
Scrolling up in the next section must move the page, not rewind the camera.
Pointer on the next sibling must never drive the camera.
Do not restore a tall sticky track. Do not add PSAVE.
```

ClickMotion · www.ClickMotion.dev
