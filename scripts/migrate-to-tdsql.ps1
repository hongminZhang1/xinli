# migrate-to-tdsql.ps1
# 简化的TDSQL-C迁移脚本

param(
    [Parameter(Mandatory=$true)]
    [string]$TdsqlConnectionString
)

Write-Host "🚀 TDSQL-C Migration Script" -ForegroundColor Cyan
Write-Host "=========================" -ForegroundColor Cyan

# Step 1: Backup current data
Write-Host "`n📦 Step 1: Backing up current data..." -ForegroundColor Yellow
try {
    node scripts/backup-with-prisma.js
    $backupFiles = Get-ChildItem -Path "." -Filter "xinli_backup_*.json" | Sort-Object LastWriteTime -Descending
    if ($backupFiles.Count -eq 0) {
        throw "No backup file found"
    }
    $latestBackup = $backupFiles[0].Name
    Write-Host "✅ Backup created: $latestBackup" -ForegroundColor Green
} catch {
    Write-Host "❌ Backup failed: $($_.Exception.Message)" -ForegroundColor Red
    exit 1
}

# Step 2: Backup current .env
Write-Host "`n💾 Step 2: Backing up current configuration..." -ForegroundColor Yellow
if (Test-Path ".env") {
    Copy-Item ".env" ".env.neon.backup"
    Write-Host "✅ Current .env backed up to .env.neon.backup" -ForegroundColor Green
} else {
    Write-Host "⚠️  No .env file found" -ForegroundColor Yellow
}

# Step 3: Update .env with TDSQL-C connection
Write-Host "`n🔧 Step 3: Updating database configuration..." -ForegroundColor Yellow
try {
    $envContent = @"
# TDSQL-C Database Connection
POSTGRES_PRISMA_URL="$TdsqlConnectionString"
POSTGRES_URL_NON_POOLING="$TdsqlConnectionString"

# Authentication (preserved)
NEXTAUTH_SECRET="k8Fg9mQx2PvL7hR3"
NEXTAUTH_URL="http://localhost:3000"

# AI Service (preserved)
OPENAI_API_KEY="your-openai-key"

# File Upload (preserved)
UPLOADTHING_TOKEN='eyJhcGlLZXkiOiJza19saXZlXzZjM2NjZjE2MTEyYzc3OWYyZDIyMjAxMzM0Y2VkZmE5Mjg0M2U2NjE5YjczMDgzOTViNzVlZmM4ZGI5OWZiNDEiLCJhcHBJZCI6ImRlYWQ2eDI2dzkiLCJyZWdpb25zIjpbInNlYTEiXX0='
"@
    $envContent | Out-File -FilePath ".env" -Encoding UTF8
    Write-Host "✅ Database configuration updated" -ForegroundColor Green
} catch {
    Write-Host "❌ Configuration update failed: $($_.Exception.Message)" -ForegroundColor Red
    exit 1
}

# Step 4: Initialize TDSQL-C schema
Write-Host "`n📋 Step 4: Initializing TDSQL-C schema..." -ForegroundColor Yellow
try {
    npx prisma db push --force-reset
    Write-Host "✅ Schema initialized" -ForegroundColor Green
} catch {
    Write-Host "❌ Schema initialization failed" -ForegroundColor Red
    Write-Host "Please check your TDSQL-C connection string" -ForegroundColor Yellow
    exit 1
}

# Step 5: Restore data
Write-Host "`n📥 Step 5: Restoring data to TDSQL-C..." -ForegroundColor Yellow
try {
    node scripts/restore-with-prisma.js $latestBackup
    Write-Host "✅ Data restored successfully" -ForegroundColor Green
} catch {
    Write-Host "❌ Data restoration failed: $($_.Exception.Message)" -ForegroundColor Red
    exit 1
}

# Step 6: Generate Prisma client
Write-Host "`n🔄 Step 6: Generating Prisma client..." -ForegroundColor Yellow
try {
    npx prisma generate
    Write-Host "✅ Prisma client generated" -ForegroundColor Green
} catch {
    Write-Host "❌ Prisma client generation failed" -ForegroundColor Red
    exit 1
}

# Migration completed
Write-Host "`n🎉 Migration completed successfully!" -ForegroundColor Green
Write-Host "📁 Backup file: $latestBackup" -ForegroundColor White
Write-Host "💾 Original config: .env.neon.backup" -ForegroundColor White
Write-Host "`n🔍 Next steps:" -ForegroundColor Yellow
Write-Host "1. Run: npm run dev" -ForegroundColor White
Write-Host "2. Test all application functions" -ForegroundColor White
Write-Host "3. If everything works, you can delete backup files" -ForegroundColor White

Write-Host "`n🆘 To rollback:" -ForegroundColor Cyan
Write-Host "cp .env.neon.backup .env && npx prisma generate && npm run dev" -ForegroundColor White