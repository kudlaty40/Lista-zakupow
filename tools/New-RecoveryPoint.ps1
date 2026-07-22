param(
  [Parameter(Mandatory = $true)]
  [ValidatePattern('^[a-z0-9-]+$')]
  [string] $Reason
)

$ErrorActionPreference = 'Stop'
$workspace = (Resolve-Path (Join-Path $PSScriptRoot '..')).Path
$archiveRoot = Join-Path $workspace 'archives\prechange'
$stamp = Get-Date -Format 'yyyyMMdd-HHmmss'
$snapshot = Join-Path $archiveRoot "$stamp-$Reason"
$payload = Join-Path $snapshot 'workspace'

New-Item -ItemType Directory -Path $payload -Force | Out-Null

Get-ChildItem -Force $workspace |
  Where-Object {
    $_.Name -notin @('.git', 'archives', '.agents', '.deployment-backups', 'app-private', 'deploy-stage') -and
    $_.Name -notlike '.env*' -and
    $_.Name -notlike '*.pem' -and
    $_.Name -notlike '*.key'
  } |
  ForEach-Object {
    Copy-Item -LiteralPath $_.FullName -Destination $payload -Recurse -Force
  }

Push-Location $workspace
try {
  git status --short | Set-Content -LiteralPath (Join-Path $snapshot 'git-status.txt') -Encoding utf8
  git log -10 --oneline | Set-Content -LiteralPath (Join-Path $snapshot 'git-log.txt') -Encoding utf8
  git diff --binary | Set-Content -LiteralPath (Join-Path $snapshot 'working-tree.patch') -Encoding utf8
  git diff --cached --binary | Set-Content -LiteralPath (Join-Path $snapshot 'staged.patch') -Encoding utf8
} finally {
  Pop-Location
}

$hashFile = Join-Path $snapshot 'SHA256SUMS.txt'
$hashLines = Get-ChildItem -LiteralPath $payload -Recurse -File |
  Sort-Object FullName |
  ForEach-Object {
    $relative = $_.FullName.Substring($payload.Length + 1)
    "$(Get-FileHash -LiteralPath $_.FullName -Algorithm SHA256 | Select-Object -ExpandProperty Hash)  $relative"
  }
$hashLines | Set-Content -LiteralPath $hashFile -Encoding utf8

@(
  '# Punkt przywracania',
  '',
  "Utworzono: $(Get-Date -Format o)",
  "Powód: $Reason",
  '',
  'Aby odtworzyć pliki, skopiuj zawartość workspace do katalogu projektu po uprzednim zabezpieczeniu aktualnego stanu.',
  'Następnie zweryfikuj pliki względem SHA256SUMS.txt.',
  '',
  'Katalog jest lokalny i wykluczony z Git.'
) | Set-Content -LiteralPath (Join-Path $snapshot 'RESTORE.md') -Encoding utf8

$verified = 0
foreach ($line in Get-Content -LiteralPath $hashFile) {
  if ($line -notmatch '^([A-F0-9]{64})  (.+)$') { continue }
  $actual = (Get-FileHash -LiteralPath (Join-Path $payload $matches[2]) -Algorithm SHA256).Hash
  if ($actual -ne $matches[1]) { throw "Niezgodny skrót pliku: $($matches[2])" }
  $verified += 1
}

$acl = Get-Acl -LiteralPath $snapshot
$currentUser = [System.Security.Principal.WindowsIdentity]::GetCurrent().Name
$acl.SetAccessRuleProtection($true, $false)
$acl.Access | ForEach-Object { $acl.RemoveAccessRule($_) | Out-Null }
$acl.AddAccessRule((New-Object System.Security.AccessControl.FileSystemAccessRule(
  $currentUser, 'FullControl', 'ContainerInherit,ObjectInherit', 'None', 'Allow'
)))
Set-Acl -LiteralPath $snapshot -AclObject $acl

$snapshots = Get-ChildItem -LiteralPath $archiveRoot -Directory |
  Sort-Object Name -Descending
$toRemove = $snapshots | Select-Object -Skip 30
foreach ($oldSnapshot in $toRemove) {
  $resolved = (Resolve-Path $oldSnapshot.FullName).Path
  if ($resolved -notlike "$archiveRoot*") { throw "Nieprawidłowy katalog retencji: $resolved" }
  Remove-Item -LiteralPath $resolved -Recurse -Force
}

Write-Output "Punkt przywracania: $snapshot"
Write-Output "Zweryfikowane pliki: $verified"
