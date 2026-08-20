# Components area (later)

**Status:** Stub. Out of scope.  
**Do not** implement buttons, inputs, cards, or nav chips as a public aisle yet.

This aisle will later hold **atoms**: buttons, inputs, toggles, cards, chips. They are the factory pieces that Sections already use internally via motion primitives + token themes.

Until the operator opens this scope:

- Keep atom recipes inside `sidecar/sections/libraries/` when a section needs them
- Do not create a `/components` route
- Do not clone shadcn/ui as the ClickMotion product

When we start: write `LAW.md` here first (same quality bar, smaller surface, still motion-first).
