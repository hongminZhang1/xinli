# restore-to-tdsql.ps1
# Restore data to TDSQL-C PowerShell script

param(
    [Parameter(Mandatory=$true)]
    [string]$BackupFile,
    
    [Parameter(Mandatory=$true)]
    [string]$TdsqlHost,
    
    [Parameter(Mandatory=$true)]
    [string]$TdsqlUser,
    
    [Parameter(Mandatory=$true)]
    [string]$TdsqlPassword,
    
    [Parameter(Mandatory=$true)]
    [string]$TdsqlDb
)

Write-Host "Starting data restore to TDSQL-C..." -ForegroundColor Green
Write-Host "Target database: $TdsqlHost" -ForegroundColor Yellow

# Check if backup file exists
if (-not (Test-Path $BackupFile)) {
    Write-Host "Error: Backup file $BackupFile does not exist!" -ForegroundColor Red
    exit 1
}

# Set environment variable
$env:PGPASSWORD = $TdsqlPassword

# Test connection
Write-Host "Testing TDSQL-C connection..." -ForegroundColor Yellow
try {
    $testQuery = "SELECT version();"
    $result = psql -h $TdsqlHost -U $TdsqlUser -d $TdsqlDb -c $testQuery 2>&1
    if ($LASTEXITCODE -eq 0) {
        Write-Host "Connection successful!" -ForegroundColor Green
    } else {
        throw "Connection failed: $result"
    }
} catch {
    Write-Host "Connection failed! Please check connection info." -ForegroundColor Red
    exit 1
}

# Restore data
Write-Host "Starting data restore..." -ForegroundColor Yellow
try {
    psql -h $TdsqlHost -U $TdsqlUser -d $TdsqlDb -f $BackupFile
    if ($LASTEXITCODE -eq 0) {
        Write-Host "Data restore successful!" -ForegroundColor Green
    } else {
        throw "Restore command failed with exit code $LASTEXITCODE"
    }
} catch {
    Write-Host "Data restore failed: $($_.Exception.Message)" -ForegroundColor Red
    exit 1
}

Write-Host "Migration completed!" -ForegroundColor Green
Write-Host "Please update database connection info in .env file." -ForegroundColor Yellow