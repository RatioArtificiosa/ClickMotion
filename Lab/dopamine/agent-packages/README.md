# DOPAMINE agent packages

**Status:** film + footer + coupled lab **OFFICIALLY FROZEN** (human sign-off 2026-08-11).  
**Complete setup:** [../SETUP.md](../SETUP.md) · freeze authority: [../DECISIONS.md](../DECISIONS.md)

| Doc | Use |
|-----|-----|
| [../SETUP.md](../SETUP.md) | Install, dependencies, assets, freeze rules |
| [00-LAB-SHELL.md](./00-LAB-SHELL.md) | Port, routes, stack, shell files |
| [01-FILM-LAB-AGENT-PACKAGE.md](./01-FILM-LAB-AGENT-PACKAGE.md) | Film / lips-mask pin (**FROZEN**) |
| [02-FOOTER-LAB-AGENT-PACKAGE.md](./02-FOOTER-LAB-AGENT-PACKAGE.md) | Complete footer (**FROZEN**) |

**Dev:** `http://localhost:3040`  
**Source project:** `E:\Products\MS\Lab\dopamine\`  
**Source site:** [serotoninn.com](https://serotoninn.com/) → brand **DOPAMINE**

```bash
cd E:\Products\MS\Lab\dopamine\app && npm install && npm run dev
```

### Which lab to open

| Goal | URL |
|------|-----|
| **Sign-off / pin coupling** | `/lab/film-footer` |
| Film isolation | `/lab/film` |
| Footer isolation | `/lab/footer` |

### Handoff order for other agents

1. `SETUP.md`
2. `00-LAB-SHELL.md`
3. `01-FILM-…` and/or `02-FOOTER-…`
4. Matching `notes/0x-….md`
5. `DECISIONS.md` (confirm FROZEN / OPEN)

**Do not edit frozen paths** unless a human reopens the section in `DECISIONS.md`.

### Final polish locked at freeze (do not “fix”)

| Topic | Locked behavior |
|-------|-----------------|
| Film top space | Tight ~4rem desktop pad — **not** source 18rem runway |
| Film pin vs headline | Negative pin `margin-top` on desktop so lips + tip fit first viewport |
| Credits panel | DOPAMINE / motion system only — **no** Serotoninn, blacklead, artycoders |
| External URLs | None |
| Video / figure | `StrangeSurreal.mp4` · `Woman1.png` @ 65rem desktop |
