# Visual pass log — DEW (MS-SEC-CTAS01)

Operator demo: `http://localhost:3004/demo/cleanroom-dew`  
Tool: browser-harness

## PASS 1

- Rest frame: cream paper, Newsreader headline, one button. No how-to. No site chrome.
- Hold: fill from the left (~850ms). Confirm: You're on the list.
- Mobile 390: no overflow-x. Button full width.
- Defects: synthetic pointerup did not cancel (fill stuck ~26%). Dual labels read as a double border. Disabled-before-land blocked hold. Next overlay on a later reduced-motion probe.

## PASS 2

- Fixes in flight. Landed still false on a cold nav. Hold did not start. Cancel path improved. Reduced `.click()` did not confirm (no onClick).

## PASS 3

- Rest: entered + landed. Overflow-x false. No visible overlay.
- Hold mid: `scaleX(0.45)`, label splits JOIN THE / LIST across the fill.
- Confirm: You're on the list, fill 1.
- Early release: back to Put my name down.
- Reduced CSS: crop at rest (`inset(0%)`). Click confirm wired for `prefers-reduced-motion`.

No blocking visual defects. GOLDEN for plant.

Open for operator taste: wordmark italic, 2px button radius (not a Collect UI pill), Ojai as the restage slot.
