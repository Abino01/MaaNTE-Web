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

$TargetDirs = @(
    (Join-Path $DocsDir "zh_cn")
)

foreach ($dir in $TargetDirs) {
    if (-not (Test-Path $dir)) {
        New-Item -ItemType Directory -Path $dir -Force | Out-Null
    }
}

$SourceReadme = Join-Path $TempDir "docs\README.md"
$TargetReadme = Join-Path $DocsDir "README.md"

if (Test-Path $SourceReadme) {
    Write-ColorOutput "  -> Sync docs/README.md" "White"
    Copy-Item -Path $SourceReadme -Destination $TargetReadme -Force
    Write-ColorOutput "    Done" "Green"
} else {
    Write-ColorOutput "    Source file not found: $SourceReadme" "Yellow"
}

$SourceZhCn = Join-Path $TempDir "docs\zh_cn"
$TargetZhCn = Join-Path $DocsDir "zh_cn"

if (Test-Path $SourceZhCn) {
    Write-ColorOutput "  -> Sync docs/zh_cn/" "White"

    # Preserve site-specific README.md files
    $preserveFiles = @(
        (Join-Path $TargetZhCn "README.md"),
        (Join-Path $TargetZhCn "introduction\README.md"),
        (Join-Path $TargetZhCn "develop\README.md")
    )
    $backupDir = Join-Path $TargetZhCn ".backup"
    New-Item -ItemType Directory -Path $backupDir -Force | Out-Null
    foreach ($f in $preserveFiles) {
        if (Test-Path $f) {
            Copy-Item -Path $f -Destination (Join-Path $backupDir (Split-Path $f -Leaf)) -Force
        }
    }

    $result = robocopy $SourceZhCn $TargetZhCn /MIR /NFL /NDL /NJH /NJS /R:0 /W:0

    # Restore site-specific README.md files
    foreach ($f in $preserveFiles) {
        $backupFile = Join-Path $backupDir (Split-Path $f -Leaf)
        if (Test-Path $backupFile) {
            $targetDir = Split-Path $f -Parent
            if (-not (Test-Path $targetDir)) {
                New-Item -ItemType Directory -Path $targetDir -Force | Out-Null
            }
            Copy-Item -Path $backupFile -Destination $f -Force
        }
    }
    Remove-Item -Path $backupDir -Recurse -Force -ErrorAction SilentlyContinue

    if ($LASTEXITCODE -le 7) {
        Write-ColorOutput "    Done" "Green"
    } else {
        Write-ColorOutput "    Warning during sync (exit code: $LASTEXITCODE)" "Yellow"
    }
} else {
    Write-ColorOutput "    Source directory not found: $SourceZhCn" "Yellow"
}

Write-Host ""
Write-ColorOutput "========================================" "Cyan"
Write-ColorOutput "Sync completed!" "Green"
Write-ColorOutput "========================================" "Cyan"
Write-Host ""
Write-ColorOutput "Note: Temporary files are in the MaaNTE-temp directory and can be deleted anytime." "Gray"
