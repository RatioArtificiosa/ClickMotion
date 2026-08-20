<#!
.SYNOPSIS
  Mirrors the complete ClickMotion MS folder to the local G: backup drive.

.DESCRIPTION
  GitHub stores normal Git source/documentation commits. This mirror stores the
  complete working tree, including large videos, archives, generated assets,
  and other files that are intentionally not committed to GitHub.

  The source .git directories are excluded because commit history is stored in
  G:\ClickMotion-Backups\MS.git as a normal bare Git repository.
#>
[CmdletBinding()]
param(
  [string]$SourceRoot = 'E:\Products\MS',
  [string]$MirrorRoot = 'G:\ClickMotion-Backups\MS-full'
)

$ErrorActionPreference = 'Stop'
$resolvedSource = [IO.Path]::GetFullPath($SourceRoot)
$resolvedMirror = [IO.Path]::GetFullPath($MirrorRoot)

if (-not (Test-Path -LiteralPath $resolvedSource -PathType Container)) {
  throw "Source folder does not exist: $resolvedSource"
}
if ($resolvedMirror -notlike 'G:\ClickMotion-Backups\MS-full*') {
  throw "Refusing to mirror to an unapproved target: $resolvedMirror"
}
New-Item -ItemType Directory -Force -Path $resolvedMirror | Out-Null

$robocopyArgs = @(
  $resolvedSource, $resolvedMirror,
  '/MIR', '/Z', '/FFT', '/COPY:DAT', '/DCOPY:DAT',
  '/R:2', '/W:5', '/XJ', '/XD', '.git',
  '/TEE', '/NP'
)
& robocopy @robocopyArgs
$robocopyCode = $LASTEXITCODE
if ($robocopyCode -ge 8) {
  throw "Robocopy failed with exit code $robocopyCode"
}

$head = (& git -C $resolvedSource rev-parse HEAD 2>$null).Trim()
$branch = (& git -C $resolvedSource branch --show-current 2>$null).Trim()
$mirrorGit = Join-Path $resolvedMirror '.git'
if (-not (Test-Path -LiteralPath $mirrorGit -PathType Container)) {
  & git -C $resolvedMirror init
  & git -C $resolvedMirror config user.name 'ClickMotion Backup'
  & git -C $resolvedMirror config user.email 'clickmotion-backup@localhost'
  & git -C $resolvedMirror remote add g-backup 'G:/ClickMotion-Backups/MS.git'
}

& git -C $resolvedMirror add -A
$hasChanges = ($LASTEXITCODE -ne 0)
if (-not $hasChanges) {
  & git -C $resolvedMirror diff --cached --quiet
  $hasChanges = ($LASTEXITCODE -ne 0)
}

if ($hasChanges) {
  $state = [ordered]@{
    source = $resolvedSource
    mirror = $resolvedMirror
    syncedUtc = [DateTime]::UtcNow.ToString('o')
    branch = $branch
    sourceHead = $head
    robocopyExitCode = $robocopyCode
    gitHistoryMirror = 'G:\ClickMotion-Backups\MS.git'
    fullSnapshotBranch = 'full-mirror'
    excludedFromFileMirror = @('.git directories only; Git history is stored in this mirror repository and MS.git')
    googleDrivePolicy = 'Manual on operator request; never run automatically from Git hooks'
  }
  $state | ConvertTo-Json -Depth 5 | Set-Content -LiteralPath (Join-Path $resolvedMirror 'BACKUP-STATE.json') -Encoding UTF8
  & git -C $resolvedMirror add BACKUP-STATE.json
  $message = "Full MS mirror snapshot ($head)"
  & git -C $resolvedMirror commit -m $message
  & git -C $resolvedMirror push g-backup HEAD:refs/heads/full-mirror
  if ($LASTEXITCODE -ne 0) { throw "Could not push full-mirror to G:\ClickMotion-Backups\MS.git" }
  Write-Output ("G full snapshot committed and pushed: $resolvedMirror; branch=full-mirror; sourceHead=$head")
} else {
  Write-Output ("G mirror already current: $resolvedMirror; sourceHead=$head")
}
