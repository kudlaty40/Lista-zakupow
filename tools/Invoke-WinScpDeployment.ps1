[CmdletBinding()]
param(
    [string]$WinScpCom = "$env:LOCALAPPDATA\Programs\WinSCP\WinSCP.com",
    [string]$SessionName = 'ListaZakupow-Grilujmy',
    [string]$RemoteRoot = '/public_html',
    [string]$RemoteSnapshotRoot = '/app-private/.deployment-backups/releases',
    [string]$Description = 'manual-deployment',
    [string[]]$Files,
    [switch]$ListOnly,
    [string]$DownloadRemotePath,
    [string]$HttpsUrl,
    [switch]$MaintenanceConfirmed
)

Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

function Quote-WinScpValue([string]$Value) {
    return '"' + $Value.Replace('"', '""') + '"'
}

function Convert-ToRemotePath([string]$RelativePath) {
    return "$RemoteRoot/$($RelativePath.Replace('\', '/').TrimStart('/'))"
}

function Assert-SafeRelativePath([string]$RelativePath) {
    $normalized = $RelativePath.Replace('\', '/')
    if ([string]::IsNullOrWhiteSpace($RelativePath) -or [IO.Path]::IsPathRooted($RelativePath) -or $normalized -match '(^|/)\.\.(\/|$)') {
        throw "Unsafe relative path: $RelativePath"
    }
    foreach ($part in ($normalized -split '/')) {
        if ($part -in @('.git', '.vscode', '.env', 'storage', 'archives', 'app-private', '.deployment-backups', 'config.php', 'wincmd.ini', 'wcx_ftp.ini')) {
            throw "Excluded path: $RelativePath"
        }
    }
}

if (-not (Test-Path -LiteralPath $WinScpCom -PathType Leaf)) {
    throw "WinSCP.com not found: $WinScpCom"
}

$workspace = (Resolve-Path -LiteralPath (Join-Path $PSScriptRoot '..')).Path
$tempRoot = Join-Path $env:TEMP ("lista-zakupow-winscp-" + [guid]::NewGuid().ToString('N'))
$beforeRoot = Join-Path $tempRoot 'before'
$afterRoot = Join-Path $tempRoot 'after'
$commandsPath = Join-Path $tempRoot 'winscp.txt'
$logPath = Join-Path $tempRoot 'winscp.log'
$release = "{0}-{1}" -f (Get-Date).ToUniversalTime().ToString('yyyyMMddTHHmmssZ'), (($Description -replace '[^A-Za-z0-9_-]+', '-') -replace '^-|-$', '')
$remoteSnapshot = "$RemoteSnapshotRoot/$release"

try {
    New-Item -ItemType Directory -Path $tempRoot, $beforeRoot, $afterRoot -Force | Out-Null

    if ($ListOnly) {
        $listCommands = [System.Collections.Generic.List[string]]::new()
        $listCommands.Add('option batch abort')
        $listCommands.Add('option confirm off')
        $listCommands.Add('open ' + (Quote-WinScpValue $SessionName))
        if ($DownloadRemotePath) {
            if ($DownloadRemotePath -notmatch '^/public_html(/|$)') { throw 'Download path must be inside /public_html.' }
            $downloadPath = Join-Path $tempRoot 'download.bin'
            $listCommands.Add('get ' + (Quote-WinScpValue $DownloadRemotePath) + ' ' + (Quote-WinScpValue $downloadPath))
        }
        else {
            $listCommands.Add('ls')
        }
        $listCommands.Add('exit')
        $listCommands | Set-Content -LiteralPath $commandsPath -Encoding utf8
    }
    else {
        if (-not $Files -or $Files.Count -eq 0) { throw 'Files are required.' }
        if (-not $MaintenanceConfirmed) { throw 'Add -MaintenanceConfirmed before upload.' }

        $entries = @()
        foreach ($relative in $Files) {
            Assert-SafeRelativePath $relative
            $localPath = Join-Path $workspace $relative
            if (-not (Test-Path -LiteralPath $localPath -PathType Leaf)) { throw "Local file not found: $relative" }
            $entries += [pscustomobject]@{
                Path = $relative.Replace('\', '/')
                Local = $localPath
                Remote = Convert-ToRemotePath $relative
                Sha256 = (Get-FileHash -LiteralPath $localPath -Algorithm SHA256).Hash.ToLowerInvariant()
            }
        }

        $commands = [System.Collections.Generic.List[string]]::new()
        $commands.Add('option batch abort')
        $commands.Add('option confirm off')
        $commands.Add('open ' + (Quote-WinScpValue $SessionName))
        $commands.Add('mkdir ' + (Quote-WinScpValue $remoteSnapshot))
        $commands.Add('mkdir ' + (Quote-WinScpValue "$remoteSnapshot/files"))

        foreach ($entry in $entries) {
            $beforePath = Join-Path $beforeRoot $entry.Path
            New-Item -ItemType Directory -Path (Split-Path -Parent $beforePath) -Force | Out-Null
            $snapshotPath = "$remoteSnapshot/files/$($entry.Path)"
            $snapshotDir = Split-Path -Parent $snapshotPath
            $commands.Add('get ' + (Quote-WinScpValue $entry.Remote) + ' ' + (Quote-WinScpValue $beforePath))
            $commands.Add('mkdir ' + (Quote-WinScpValue $snapshotDir.Replace('\', '/')))
            $commands.Add('put ' + (Quote-WinScpValue $beforePath) + ' ' + (Quote-WinScpValue $snapshotPath))
        }

        foreach ($entry in $entries) {
            $commands.Add('put ' + (Quote-WinScpValue $entry.Local) + ' ' + (Quote-WinScpValue $entry.Remote))
        }

        foreach ($entry in $entries) {
            $afterPath = Join-Path $afterRoot $entry.Path
            New-Item -ItemType Directory -Path (Split-Path -Parent $afterPath) -Force | Out-Null
            $commands.Add('get ' + (Quote-WinScpValue $entry.Remote) + ' ' + (Quote-WinScpValue $afterPath))
        }

        $commands.Add('exit')
        $commands | Set-Content -LiteralPath $commandsPath -Encoding utf8
    }

    # The saved WinSCP session supplies the encrypted password locally.
    $process = Start-Process -FilePath $WinScpCom -ArgumentList @("/script=$commandsPath", "/log=$logPath") -Wait -PassThru -WindowStyle Hidden
    if ($process.ExitCode -ne 0) { throw "WinSCP failed with exit code $($process.ExitCode). Log: $logPath" }

    if ($ListOnly) {
        Write-Output 'FTPS_LIST_OK'
        if ($DownloadRemotePath) {
            $downloadHash = (Get-FileHash -LiteralPath (Join-Path $tempRoot 'download.bin') -Algorithm SHA256).Hash.ToLowerInvariant()
            Write-Output "FTPS_DOWNLOAD_OK sha256=$downloadHash"
        }
        Write-Output "Log: $logPath"
        return
    }

    foreach ($entry in $entries) {
        $afterPath = Join-Path $afterRoot $entry.Path
        if (-not (Test-Path -LiteralPath $afterPath -PathType Leaf)) { throw "Remote file missing after upload: $($entry.Path)" }
        $actual = (Get-FileHash -LiteralPath $afterPath -Algorithm SHA256).Hash.ToLowerInvariant()
        if ($actual -ne $entry.Sha256) { throw "SHA-256 mismatch after upload: $($entry.Path)" }
    }

    if ($HttpsUrl) {
        $response = Invoke-WebRequest -Uri $HttpsUrl -UseBasicParsing -TimeoutSec 30
        if ($response.StatusCode -lt 200 -or $response.StatusCode -ge 400) { throw "HTTPS test returned status $($response.StatusCode)." }
    }

    Write-Output "FTPS_DEPLOYMENT_VERIFIED release=$release"
    Write-Output "Log: $logPath"
}
finally {
    Write-Verbose "Temporary artifacts: $tempRoot"
}
