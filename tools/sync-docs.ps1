#!/usr/bin/env pwsh
<#
.SYNOPSIS
    Sync docs from MaaNTE repository to local project
.DESCRIPTION
    This script clones or updates the MaaNTE repository and synchronizes documentation files to the current project.
.EXAMPLE
    .\sync-docs.ps1
#>

$ErrorActionPreference = "Stop"

function Write-ColorOutput {
    param(
        [string]$Message,
        [string]$Color = "White"
    )
    Write-Host $Message -ForegroundColor $Color
}

$ProjectRoot = Split-Path -Parent $PSScriptRoot
$TempDir = Join-Path $ProjectRoot "MaaNTE-temp"
$DocsDir = Join-Path $ProjectRoot "docs"

Write-ColorOutput "========================================" "Cyan"
Write-ColorOutput "MaaNTE Docs Sync Script" "Cyan"
Write-ColorOutput "========================================" "Cyan"
Write-Host ""

try {
    git --version | Out-Null
} catch {
    Write-ColorOutput "Error: git command not found. Please install Git first." "Red"
    exit 1
}

if (Test-Path $TempDir) {
    Write-ColorOutput "Updating MaaNTE repository..." "Yellow"
    Push-Location $TempDir
    try {
        git fetch origin
        git reset --hard origin/main
        Write-ColorOutput "MaaNTE repository updated successfully" "Green"
    } catch {
        Write-ColorOutput "Update failed: $_" "Red"
        Pop-Location
        exit 1
    }
    Pop-Location
} else {
    Write-ColorOutput "Cloning MaaNTE repository..." "Yellow"
    try {
        git clone https://github.com/1bananachicken/MaaNTE.git $TempDir
        Write-ColorOutput "MaaNTE repository cloned successfully" "Green"
    } catch {
        Write-ColorOutput "Clone failed: $_" "Red"
        exit 1
    }
}

Write-Host ""
Write-ColorOutput "Start syncing docs..." "Yellow"

function Sync-LocaleDocs {
    param(
        [string]$SourceDir,
        [string]$TargetDir,
        [string]$Label
    )

    if (-not (Test-Path $SourceDir)) {
        Write-ColorOutput "Source directory not found: $SourceDir (skipping $Label)" "Yellow"
        return
    }

    Write-ColorOutput "  -> Sync $Label" "White"

    # Preserve site-specific README.md files
    $preservedFiles = if (Test-Path $TargetDir) {
        Get-ChildItem -Path $TargetDir -Recurse -Filter "README.md" -File -ErrorAction SilentlyContinue
    } else {
        @()
    }

    $backupDir = Join-Path $DocsDir ".backup_$Label"
    New-Item -ItemType Directory -Path $backupDir -Force | Out-Null
    foreach ($f in $preservedFiles) {
        $relativePath = $f.FullName.Substring($TargetDir.Length).TrimStart('\', '/')
        $backupPath = Join-Path $backupDir $relativePath
        $backupParent = Split-Path $backupPath -Parent
        if (-not (Test-Path $backupParent)) {
            New-Item -ItemType Directory -Path $backupParent -Force | Out-Null
        }
        Copy-Item -Path $f.FullName -Destination $backupPath -Force
    }

    # Remove and re-copy
    if (Test-Path $TargetDir) {
        Remove-Item -Path $TargetDir -Recurse -Force
    }
    New-Item -ItemType Directory -Path (Split-Path $TargetDir -Parent) -Force | Out-Null
    Copy-Item -Path $SourceDir -Destination $TargetDir -Recurse -Force

    # Restore preserved README.md files
    if (Test-Path $backupDir) {
        $backupFiles = Get-ChildItem -Path $backupDir -Recurse -Filter "README.md" -File -ErrorAction SilentlyContinue
        foreach ($bf in $backupFiles) {
            $relativePath = $bf.FullName.Substring($backupDir.Length).TrimStart('\', '/')
            $restorePath = Join-Path $TargetDir $relativePath
            $restoreParent = Split-Path $restorePath -Parent
            if (-not (Test-Path $restoreParent)) {
                New-Item -ItemType Directory -Path $restoreParent -Force | Out-Null
            }
            Copy-Item -Path $bf.FullName -Destination $restorePath -Force
        }
        Remove-Item -Path $backupDir -Recurse -Force -ErrorAction SilentlyContinue
    }

    Write-ColorOutput "    Done" "Green"
}

# zh-CN
Sync-LocaleDocs -SourceDir (Join-Path $TempDir "docs\zh_cn") -TargetDir (Join-Path $DocsDir "zh_cn") -Label "zh_cn"

# English (upstream uses "eng", site uses "en_us")
Sync-LocaleDocs -SourceDir (Join-Path $TempDir "docs\eng") -TargetDir (Join-Path $DocsDir "en_us") -Label "en_us"

# Japanese (upstream uses "jp", site uses "ja_jp")
Sync-LocaleDocs -SourceDir (Join-Path $TempDir "docs\jp") -TargetDir (Join-Path $DocsDir "ja_jp") -Label "ja_jp"

# Sync top-level README as home page if it exists
$SourceReadme = Join-Path $TempDir "docs\README.md"
$TargetReadme = Join-Path $DocsDir "README.md"
if (Test-Path $SourceReadme) {
    Write-ColorOutput "  -> Sync homepage (docs/README.md)" "White"
    Copy-Item -Path $SourceReadme -Destination $TargetReadme -Force
    Write-ColorOutput "    Done" "Green"
}

Write-Host ""
Write-ColorOutput "========================================" "Cyan"
Write-ColorOutput "Sync completed!" "Green"
Write-ColorOutput "========================================" "Cyan"
Write-Host ""
Write-ColorOutput "Note: Temporary files are in the MaaNTE-temp directory and can be deleted anytime." "Gray"
