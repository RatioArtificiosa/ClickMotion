# Phobia - make it yours

Speak to your AI with plain English. Keep rest-based radial flee and elastic return. Change the content and feel.

---

## Swap brand objects

```
Replace the cutout images with my product photos (transparent PNG or WebP).
1) Put files in public/assets/phobia/
2) Update src paths in phobia-data.ts (PHOBIA_ITEMS)
3) Keep rest poses for now; only change images
```

---

## Change letter debris

```
Change the letter debris to spell my brand name, one character per letter item.
Adjust sizes so the field still feels scattered and premium.
```

---

## Add or remove density

```
Add three more objects to PHOBIA_ITEMS using my new asset files.
Keep z-index so letters stay on top of large cutouts.
```

Or:

```
Remove the gold die and one letter so the stage feels calmer. Keep rest-based flee.
```

---

## Nudge the cluster

```
Nudge the whole cluster down so it sits lower on ultrawide screens.
Prefer adjusting SHIFT_Y or rest left/top values in phobia-data.ts.
```

---

## Feel - stronger or softer flee

```
Make flee stronger on desktop (slightly higher maxDistance and rotForce)
but keep elastic return soft. Use PHOBIA_PARAMS.desktop only.
Keep mobile gentler than desktop.
```

---

## Cursor

```
Keep the white glow but make the core slightly larger for accessibility.
Do not switch to a system default cursor on the section.
```

---

## Mount as mid-page (not full viewport)

```
Keep the same motion. Change the section height from full viewport to
min-h-[80vh] so it can sit mid-page under a hero. Keep overflow hidden and black stage.
```

---

## Props / data-driven restage (optional)

```
Expose a props override for items and params so I can pass brand data
from the parent without editing the component body. Defaults stay the pack data.
```

---

## QA after restage

- [ ] Idle (no pointer): spread composition  
- [ ] Near rest: radial flee + rotation / scale  
- [ ] Clear: elastic home  
- [ ] Cursor: white glow + trail inside stage only  
- [ ] All image paths resolve (no broken cutouts)  
- [ ] Mobile still feels controlled, not chaotic  
- [ ] Reduced motion does not thrash objects  

---

## Fix broken

```
Something is wrong: [DESCRIBE WHAT YOU SEE].
Keep rest-based radial flee and elastic return.
Do not switch to CSS hover only.
Do not ask me to write code.
```

ClickMotion · www.ClickMotion.dev
