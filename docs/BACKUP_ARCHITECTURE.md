# ClickMotion Backup Architecture

This document is the operational source of truth for where ClickMotion is
backed up and what each destination is allowed to contain.

## Backup layers

| Destination | Purpose | Large files | Automatic updates |
|---|---|---:|---|
| GitHub `origin/main` | Normal source/documentation repository | No videos, archives, or files over 25 MB | Yes, ordinary Git push |
| G: `G:\ClickMotion-Backups\MS.git` | Local bare Git repository containing source history and full-mirror history | Yes, normal local Git objects | Yes, via `g-backup` push |
| G: `G:\ClickMotion-Backups\MS-full` | Complete file-level working-tree repository and rollback snapshots | Yes | Yes, after commit/push hooks |
| Google Drive `clickmotion-backup:` | Selected off-machine media backup | Yes, approved selected scope | No; manual only when the operator asks |

## G: repository branches

- `main` — normal GitHub-compatible source/documentation history.
- `full-mirror` — complete snapshots of `MS-full`, including large and ignored files.

The `MS-full` directory is itself a Git working repository. Its `.git` folder
is preserved on G:. The sync script mirrors the source files, commits changes,
and pushes the full snapshot to `full-mirror` in `MS.git`.

## Normal workflow

From the ClickMotion repository:

```powershell
git add <source-or-documentation-files>
git commit -m "Describe the change"
git push origin main
git push g-backup main
```

The installed hooks then run `scripts/sync-ms-g-backup.ps1`. That script:

1. Mirrors all source files from `E:\Products\MS` to `G:\ClickMotion-Backups\MS-full`.
2. Excludes only source `.git` directories because Git history is stored in the G: repositories.
3. Commits the complete resulting tree in the `full-mirror` branch.
4. Pushes that snapshot to `G:\ClickMotion-Backups\MS.git`.

Google Drive is deliberately not called by any hook. It is updated only when
the operator explicitly requests a Google Drive backup.

## Rollback

To inspect prior full snapshots:

```powershell
git --git-dir=G:\ClickMotion-Backups\MS.git log full-mirror
git --git-dir=G:\ClickMotion-Backups\MS.git show <snapshot-commit>:BACKUP-STATE.json
```

To restore a prior complete snapshot into a separate recovery directory:

```powershell
git clone --branch full-mirror G:\ClickMotion-Backups\MS.git G:\ClickMotion-Recovery
git -C G:\ClickMotion-Recovery checkout <snapshot-commit>
```

Never restore directly over the live project until the snapshot has been
inspected and the operator approves the rollback.

## Google Drive policy

Google Drive is not a per-commit mirror. It is a manually requested secondary
copy for selected large media. A Drive upload must record its destination,
scope, completion status, and verification in the observations/changelog.
