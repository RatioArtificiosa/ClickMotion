# Visual pass (mandatory after every section)

**Status:** Locked 2026-08-13. Non-optional.  
**When:** After the first complete build of a section (cleanroom + operator demo), and after every fix round, until GOLDEN.  
**Where:** Real Chrome via DevTools / browser automation on the **operator demo** (`/demo/cleanroom-*`). Not a code-only review. Not a screenshot from memory.

A section is **not done** when the files compile. It is done when this loop has been run, defects fixed, and a clean re-check has passed at GOLDEN.

---

## 0. Purpose

Catch what code review cannot: overlap, clipping, dead type, broken pin, kit composition, overflow, uneven spacing, unreadable contrast, motion that does not play, mobile crush, leftover debug, AI-slop tells.

The operator asked for **Forbes / enterprise / original / human conviction**. If the live frame would fail that test, keep looping.

---

## 1. Preconditions (before the first screenshot)

1. Dev server running (`npm run dev`). Confirm the demo URL loads, not a 404.  
2. Open the **operator demo**, not browse, not CMS, not a still.  
3. Header/footer must be hidden (`/demo/cleanroom-*`). If MS chrome sits on the design, that is a fail.  
**Tooling (this machine):** Prefer `browser-harness` attached to local Chrome. Cursor IDE browser MCP has hung; the Browse plugin daemon may fail with ENOENT. Next may not be on 3000. Use the live port (currently **3004**). If harness reports 0 browser connections, enable Chrome remote debugging (`chrome://inspect/#remote-debugging` → Allow).

---

## 2. The loop (do not skip steps)

```text
Build complete
  → Pass 1: open + full journey + screenshots + DevTools metrics
  → Write a defect list (visual, motion, type, overflow, a11y)
  → Fix in source
  → Pass 2: same journey, confirm each defect is gone, hunt new ones
  → Repeat Pass n until the gold checklist is all pass
  → Only then call the section GOLDEN
```

**Hard rules:**

- Do not declare GOLDEN after Pass 1 if any defect remains.  
- Every fix requires a **new** visual check of the affected states.  
- Do not “assume” a CSS change worked. Screenshot or DevTools proof.  
- Cap: if four fix rounds still leave the same class of bug, stop, write what is blocked, and ask the operator. Do not thrash.  
- Public catalog stays **video**. This loop is on the operator demo only.

---

## 3. What to drive (every pass)

Use Chrome. Wheel / trackpad / click / keys. Cover **all** interactive states the product claims.

| Drive | Required |
|-------|----------|
| Resting first frame | Intro / opening plate |
| Full pin journey | Progress 0 → 1 (or every chapter) |
| Mid-journey | At least one screenshot per chapter / plan / sheet |
| End frame | Last chapter + CTA |
| Click | Index, rails, tabs, buttons the UI offers |
| Keyboard | Arrows / Space if pin-until-complete |
| Hover | CTA and text links |
| Reduced motion | `prefers-reduced-motion: reduce` (DevTools emulation) and confirm static path |
| Viewport | Desktop (~1440) and a mobile width (~390). Tablet if the layout has a distinct md breakpoint |

For pin sections: drive `window.__msScrollNarrative.setProgress(p)` as well as wheel, so chapters are exact.

---

## 4. DevTools inspection (every pass)

Do not only look at pretty screenshots. Probe:

| Check | How |
|-------|-----|
| Overflow | Layout: scrollWidth vs clientWidth; any element overflowing the stage |
| Clipping | Type cut by overflow:hidden, min-height too small, overlapping absolute slots |
| Contrast | Ink on stage; muted on stage; CTA reverse |
| Hit targets | Buttons not covered by an invisible absolute layer (`pointer-events`) |
| Console | Zero errors / unexpected warnings on load and during the journey |
| Pin | `data-*-pin="true"`; wheel does not scroll a tall document; progress 0→1 |
| Fonts | Display / mono / body actually applied (computed `font-family`) |
| Spacing | Safe inset ≥ 2rem; type not flush to the viewport edge |
| Z-index | Grain, progress bar, plates stacked correctly |
| Reduced motion | No pin listener; complete content visible |

Record computed issues in the defect list with the selector and the symptom.

---

## 5. Visual gold checklist (all must pass)

**Composition**

- [ ] Not a kit (no three equal cards, purple mesh, shiny H1, pill chrome)
- [ ] One signature motion is visible in the recording/journey
- [ ] Famous-UI direction is readable in the frame (print, glass, editorial, etc.)
- [ ] Materials match the token theme (stage, ink, one accent)

**Type and layout**

- [ ] Hierarchy is obvious in 2 seconds
- [ ] No overlapping type
- [ ] No clipped descenders / figures
- [ ] Tabular figures align if numbers are the craft
- [ ] Rules and columns align; no accidental ragged gaps
- [ ] Safe inset holds on desktop and mobile

**Motion**

- [ ] Pin (if claimed) holds the stage; no page scrollbar as the method
- [ ] Enter plays once on view (stamp / click / drop / stomp / slap / pop) then signature interaction works
- [ ] Chapters / states all reachable
- [ ] Crossfades do not stack two plates as a muddy double-exposure for long
- [ ] Reduced motion still looks designed, not a broken leftover

**Polish**

- [ ] Console clean
- [ ] No leftover debug, Lorem, wrong brand, em dash in buyer chrome
- [ ] No invented people or houses; names are common, places are real
- [ ] No instructional chrome (“scroll to…”, “click a name”, “one open”, how-to captions)
- [ ] Mobile is a designed compression, not a squashed desktop

If a veteran would say “AI made this” or “this is a bug,” it fails. Fix. Re-check.

---

## 6. Defect list format (write it down)

For each pass, list:

```text
PASS n
- [ ] ID: overflow-rows — Rows collide with the CTA at 1440 on Seat
- [ ] ID: double-type — Intro and Studio names both visible at p=0.1
Fix, then re-check those IDs plus a full journey.
```

Do not fix blindly without naming the defect. Do not close a defect without a new screenshot of that state.

---

## 7. GOLDEN

GOLDEN means: latest pass has **zero open visual defects**, gold checklist all pass, and the operator demo is the proof. Prompt and CSS/TSX match what was seen.

Then stop the loop. Tell the operator the pass count and the demo URL. Do not silently skip this after future sections.
