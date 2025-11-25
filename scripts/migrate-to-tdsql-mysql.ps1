# migrate-to-tdsql-mysql.ps1
# TDSQL-C MySQL版迁移脚本

param(
    [Parameter(Mandatory=$true)]
    [string]$HostName,
    
    [Parameter(Mandatory=$true)]
    [string]$Port,
    
    [Parameter(Mandatory=$true)]
    [string]$Username,
    
    [Parameter(Mandatory=$true)]
    [string]$Password,
    
    [Parameter(Mandatory=$true)]
    [string]$Database
)

Write-Host "🚀 TDSQL-C MySQL Migration Script" -ForegroundColor Cyan
Write-Host "=================================" -ForegroundColor Cyan

$connectionString = "mysql://${Username}:${Password}@${HostName}:${Port}/${Database}?sslmode=require"

Write-Host "📊 Connection Info:" -ForegroundColor Yellow
Write-Host "   Host: $HostName" -ForegroundColor White
Write-Host "   Port: $Port" -ForegroundColor White  
Write-Host "   User: $Username" -ForegroundColor White
Write-Host "   Database: $Database" -ForegroundColor White

# Step 1: 备份当前数据（如果还没有备份）
$backupFiles = Get-ChildItem -Path "." -Filter "xinli_backup_*.json" | Sort-Object LastWriteTime -Descending
if ($backupFiles.Count -eq 0) {
    Write-Host "`n📦 Step 1: Creating data backup..." -ForegroundColor Yellow
    try {
        node scripts/backup-with-prisma.js
        $backupFiles = Get-ChildItem -Path "." -Filter "xinli_backup_*.json" | Sort-Object LastWriteTime -Descending
        $latestBackup = $backupFiles[0].Name
        Write-Host "✅ Backup created: $latestBackup" -ForegroundColor Green
    } catch {
        Write-Host "❌ Backup failed: $($_.Exception.Message)" -ForegroundColor Red
        exit 1
    }
} else {
    $latestBackup = $backupFiles[0].Name
    Write-Host "`n📦 Step 1: Using existing backup: $latestBackup" -ForegroundColor Green
}

# Step 2: 备份当前配置
Write-Host "`n💾 Step 2: Backing up current configuration..." -ForegroundColor Yellow
if (Test-Path ".env") {
    Copy-Item ".env" ".env.neon.backup"
    Write-Host "✅ Current .env backed up" -ForegroundColor Green
}
if (Test-Path "prisma/schema.prisma") {
    Copy-Item "prisma/schema.prisma" "prisma/schema.postgresql.backup"
    Write-Host "✅ PostgreSQL schema backed up" -ForegroundColor Green
}

# Step 3: 切换到MySQL schema
Write-Host "`n🔄 Step 3: Switching to MySQL schema..." -ForegroundColor Yellow
try {
    Copy-Item "prisma/schema.mysql.prisma" "prisma/schema.prisma"
    Write-Host "✅ MySQL schema activated" -ForegroundColor Green
} catch {
    Write-Host "❌ Schema switch failed: $($_.Exception.Message)" -ForegroundColor Red
    exit 1
}

# Step 4: 更新环境变量
Write-Host "`n🔧 Step 4: Updating database configuration..." -ForegroundColor Yellow
try {
    $envContent = @"
# TDSQL-C MySQL Database Connection
DATABASE_URL="$connectionString"

# Authentication (preserved)
NEXTAUTH_SECRET="k8Fg9mQx2PvL7hR3"
NEXTAUTH_URL="http://localhost:3000"

# AI Service (preserved)
OPENAI_API_KEY="your-openai-key"

# File Upload (preserved)
UPLOADTHING_TOKEN='eyJhcGlLZXkiOiJza19saXZlXzZjM2NjZjE2MTEyYzc3OWYyZDIyMjAxMzM0Y2VkZmE5Mjg0M2U2NjE5YjczMDgzOTViNzVlZmM4ZGI5OWZiNDEiLCJhcHBJZCI6ImRlYWQ2eDI2dzkiLCJyZWdpb25zIjpbInNlYTEiXX0='
"@
    $envContent | Out-File -FilePath ".env" -Encoding UTF8
    Write-Host "✅ Environment updated for MySQL" -ForegroundColor Green
} catch {
    Write-Host "❌ Environment update failed: $($_.Exception.Message)" -ForegroundColor Red
    exit 1
}

# Step 5: 生成新的Prisma客户端
Write-Host "`n🔄 Step 5: Generating MySQL Prisma client..." -ForegroundColor Yellow
try {
    npx prisma generate
    Write-Host "✅ Prisma client generated for MySQL" -ForegroundColor Green
} catch {
    Write-Host "❌ Prisma client generation failed" -ForegroundColor Red
    exit 1
}

# Step 6: 初始化MySQL数据库
Write-Host "`n📋 Step 6: Initializing MySQL database schema..." -ForegroundColor Yellow
try {
    npx prisma db push --force-reset
    Write-Host "✅ MySQL schema created" -ForegroundColor Green
} catch {
    Write-Host "❌ Schema creation failed" -ForegroundColor Red
    Write-Host "Please check your TDSQL-C connection and credentials" -ForegroundColor Yellow
    exit 1
}

# Step 7: 转换并恢复数据
Write-Host "`n📥 Step 7: Converting and restoring data..." -ForegroundColor Yellow
try {
    node scripts/restore-with-prisma-mysql.js $latestBackup
    Write-Host "✅ Data restored to MySQL" -ForegroundColor Green
} catch {
    Write-Host "❌ Data restoration failed: $($_.Exception.Message)" -ForegroundColor Red
    exit 1
}

# Migration completed
Write-Host "`n🎉 MySQL Migration completed successfully!" -ForegroundColor Green
Write-Host "📁 Backup file: $latestBackup" -ForegroundColor White
Write-Host "💾 PostgreSQL schema: prisma/schema.postgresql.backup" -ForegroundColor White
Write-Host "💾 Original config: .env.neon.backup" -ForegroundColor White
Write-Host "`n🔍 Next steps:" -ForegroundColor Yellow
Write-Host "1. Run: npm run dev" -ForegroundColor White
Write-Host "2. Test all application functions" -ForegroundColor White
Write-Host "3. If everything works, you can delete backup files" -ForegroundColor White

Write-Host "`n🆘 To rollback:" -ForegroundColor Cyan
Write-Host "1. cp .env.neon.backup .env" -ForegroundColor White
Write-Host "2. cp prisma/schema.postgresql.backup prisma/schema.prisma" -ForegroundColor White
Write-Host "3. npx prisma generate && npm run dev" -ForegroundColor White