# ClickMotion G: Backup

## Purpose

The G: backup is the local disaster-recovery copy for the complete `MS` folder.
GitHub remains the normal-Git source for code and documentation. Google Drive
is the approved cloud location for selected large media. G: is the complete
local file mirror, including large files that must not be committed to GitHub.

## Locations

```text
G:\ClickMotion-Backups\MS-full\   ← complete MS working-tree mirror
G:\ClickMotion-Backups\MS.git\     ← normal bare Git repository
```

The file mirror excludes only `.git` directories. Git history is preserved in
`MS.git`. It intentionally includes videos, archives, generated assets, test
files, temporary files, and other files present in `E:\Products\MS`.

## Normal Git workflow

The local Git remote is:

```text
g-backup = G:/ClickMotion-Backups/MS.git
```

Normal source pushes should update both destinations:

```powershell
git push origin main
git push g-backup main
powershell -ExecutionPolicy Bypass -File scripts/sync-ms-g-backup.ps1
```

The installed local hooks start the file synchronization after commits and
pushes. The synchronization is intentionally separate from Git so large files
never enter GitHub or Git LFS.

## Recovery

1. Restore the complete files from `G:\ClickMotion-Backups\MS-full`.
2. If Git history is required, clone `G:\ClickMotion-Backups\MS.git`.
3. Restore the selected Google Drive media backup when working on another machine.
4. Confirm `BACKUP-STATE.json` and compare the recorded commit with the Git repository.

Never point the mirror target at a broad drive root. The sync script refuses
targets outside the explicit `G:\ClickMotion-Backups\MS-full` path.
