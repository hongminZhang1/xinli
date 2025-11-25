# verify-migration.ps1
# Verify data migration success

Write-Host "Starting migration verification..." -ForegroundColor Green

# 1. Test Prisma connection
Write-Host "1. Testing Prisma connection..." -ForegroundColor Yellow
try {
    npx prisma db pull --force
    Write-Host "✓ Prisma connection normal" -ForegroundColor Green
} catch {
    Write-Host "✗ Prisma connection failed" -ForegroundColor Red
    Write-Host "Please check database connection config in .env file" -ForegroundColor Yellow
}

# 2. Generate new Prisma client
Write-Host "2. Regenerating Prisma client..." -ForegroundColor Yellow
try {
    npx prisma generate
    Write-Host "✓ Prisma client generated successfully" -ForegroundColor Green
} catch {
    Write-Host "✗ Prisma client generation failed" -ForegroundColor Red
}

# 3. Check data tables
Write-Host "3. Verifying table structure..." -ForegroundColor Yellow
$tableCheck = @"
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function verifyTables() {
  try {
    // Check user table
    const userCount = await prisma.user.count();
    console.log(`User count: `+userCount);
    
    // Check journal table
    const journalCount = await prisma.journalEntry.count();
    console.log(`Journal count: `+journalCount);
    
    // Check comment table
    const commentCount = await prisma.comment.count();
    console.log(`Comment count: `+commentCount);
    
    console.log('✓ Data verification completed');
  } catch (error) {
    console.error('✗ Data verification failed:', error.message);
  } finally {
    await prisma.disconnect();
  }
}

verifyTables();
"@

$tableCheck | Out-File -FilePath "temp_verify.js" -Encoding UTF8

try {
    node temp_verify.js
    Remove-Item "temp_verify.js"
} catch {
    Write-Host "✗ Data verification failed" -ForegroundColor Red
    Remove-Item "temp_verify.js" -ErrorAction SilentlyContinue
}

# 4. Prepare to start dev server for testing
Write-Host "4. Ready to start dev server for function testing..." -ForegroundColor Yellow
Write-Host "Please run manually: npm run dev" -ForegroundColor Cyan
Write-Host "Then test these features:" -ForegroundColor Yellow
Write-Host "  - User login/register" -ForegroundColor White
Write-Host "  - Create journal" -ForegroundColor White  
Write-Host "  - View article square" -ForegroundColor White
Write-Host "  - Post and view comments" -ForegroundColor White

Write-Host "Verification completed!" -ForegroundColor Green