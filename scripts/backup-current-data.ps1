# backup-current-data.ps1
# PowerShell version backup script

Write-Host "Starting database backup..." -ForegroundColor Green

# Connection settings
$neonHost = "ep-summer-feather-ahslz36h.c-3.us-east-1.aws.neon.tech"
$neonUser = "neondb_owner"
$neonPassword = "npg_1b2CWazMxAuH"
$neonDb = "neondb"

# Backup filename
$timestamp = Get-Date -Format "yyyyMMdd_HHmmss"
$backupFile = "xinli_backup_$timestamp.sql"

Write-Host "Exporting data to file: $backupFile" -ForegroundColor Yellow

# Set environment variable
$env:PGPASSWORD = $neonPassword

# Execute backup
try {
    Write-Host "Connecting to Neon database..." -ForegroundColor Cyan
    
    # Test connection first
    $testResult = pg_dump --help 2>$null
    if (-not $?) {
        throw "pg_dump not found. Please install PostgreSQL client tools."
    }
    
    # Execute backup
    pg_dump -h $neonHost -U $neonUser -d $neonDb --no-owner --no-privileges --clean --if-exists > $backupFile
    
    if (Test-Path $backupFile) {
        $fileSize = (Get-Item $backupFile).Length / 1KB
        Write-Host "Backup successful!" -ForegroundColor Green
        Write-Host "File: $backupFile" -ForegroundColor White
        Write-Host "Size: $($fileSize.ToString('F2')) KB" -ForegroundColor White
    } else {
        throw "Backup file not created"
    }
} catch {
    Write-Host "Backup failed: $($_.Exception.Message)" -ForegroundColor Red
    exit 1
}

Write-Host "Backup completed!" -ForegroundColor Green