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
$state = [ordered]@{
  source = $resolvedSource
  mirror = $resolvedMirror
  syncedUtc = [DateTime]::UtcNow.ToString('o')
  branch = $branch
  head = $head
  robocopyExitCode = $robocopyCode
  gitHistoryMirror = 'G:\ClickMotion-Backups\MS.git'
  excludedFromFileMirror = @('.git directories only; Git history is in MS.git')
}
$state | ConvertTo-Json -Depth 5 | Set-Content -LiteralPath (Join-Path $resolvedMirror 'BACKUP-STATE.json') -Encoding UTF8
Write-Output ("G backup synchronized: $resolvedMirror; branch=$branch; head=$head")
