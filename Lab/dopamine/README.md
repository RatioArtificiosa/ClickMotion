# Lab · DOPAMINE (film + footer)

Isolated reconstruction of **serotoninn.com** pre-footer film + complete footer for MS productization.

**Source (read-only archive):** `E:\website-tests\dopamine-clone\`  
**Working lab (this tree):** `E:\Products\MS\Lab\dopamine\`  
**Full setup / deps / freeze:** **[SETUP.md](./SETUP.md)**  
**Agent packages:** `./agent-packages/`  
**Freeze authority:** **[DECISIONS.md](./DECISIONS.md)**

| # | Section | Lab URL | Status |
|---|---------|---------|--------|
| 01 | **Film** (lips-mask pin) | `/lab/film` | **FROZEN** |
| 02 | **Footer** (Lottie + scramble) | `/lab/footer` | **FROZEN** |
| 01+02 | **Coupled sign-off** | `/lab/film-footer` | **FROZEN** |

- **In this lab:** one Vite app under `app/`, shared shell (Lenis, LabChrome). Sections are production-ready modules — no forked lab logic.
- **To production later:** productize film and/or footer as separate SKUs after human videos (user will capture next). Do **not** edit frozen paths until `DECISIONS.md` sets a section **OPEN**.

## Run

```bash
cd E:\Products\MS\Lab\dopamine\app
npm install
npm run dev
```

| Setting | Value |
|---------|--------|
| Port | **3040** (`strictPort: true`) |
| Hub | http://localhost:3040/ |
| Sign-off | http://localhost:3040/lab/film-footer |

## Agent handoff order

1. [SETUP.md](./SETUP.md)
2. [agent-packages/00-LAB-SHELL.md](./agent-packages/00-LAB-SHELL.md)
3. [01-FILM](./agent-packages/01-FILM-LAB-AGENT-PACKAGE.md) / [02-FOOTER](./agent-packages/02-FOOTER-LAB-AGENT-PACKAGE.md)
4. Matching `notes/0x-….md`
5. [DECISIONS.md](./DECISIONS.md)

## Locked facts (do not “fix”)

| Topic | Value |
|-------|--------|
| Layout class | **`dop-container`** — never Tailwind `.container` |
| Film video | `assets/film/StrangeSurreal.mp4` |
| Footer figure | `Woman1.png` @ **65rem** desktop |
| Film pin | Needs real `.footer` as end trigger (use `/lab/film-footer`) |
| External links | **None** |

## Ports (MS Lab multi-site)

| Port | Lab |
|------|-----|
| 3010 | Actually |
| 3030 / 3032 | Nothin' |
| **3040** | **Dopamine** |
| 3004 | MS storefront (Next) |

## Protocol

- Parent: `E:\website-tests\MOTION-CLONE-PROTOCOL.md`
- Skill: `motion-clone`
