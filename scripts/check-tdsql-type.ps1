# 检查TDSQL-C实例类型
# check-tdsql-type.ps1

Write-Host "🔍 TDSQL-C Instance Type Checker" -ForegroundColor Cyan

$host_ip = "172.16.0.15"
$port_3306 = "3306"
$port_5432 = "5432"

Write-Host "`n📊 Checking instance type..." -ForegroundColor Yellow

# 检测3306端口（MySQL）
Write-Host "Testing MySQL port (3306)..." -ForegroundColor Gray
$mysql_test = Test-NetConnection -ComputerName $host_ip -Port $port_3306 -InformationLevel Quiet
if ($mysql_test) {
    Write-Host "✅ MySQL port 3306 is accessible" -ForegroundColor Green
    $mysql_available = $true
} else {
    Write-Host "❌ MySQL port 3306 is not accessible" -ForegroundColor Red
    $mysql_available = $false
}

# 检测5432端口（PostgreSQL）
Write-Host "Testing PostgreSQL port (5432)..." -ForegroundColor Gray
$pg_test = Test-NetConnection -ComputerName $host_ip -Port $port_5432 -InformationLevel Quiet
if ($pg_test) {
    Write-Host "✅ PostgreSQL port 5432 is accessible" -ForegroundColor Green
    $pg_available = $true
} else {
    Write-Host "❌ PostgreSQL port 5432 is not accessible" -ForegroundColor Red
    $pg_available = $false
}

Write-Host "`n📋 Results:" -ForegroundColor Yellow

if ($mysql_available -and $pg_available) {
    Write-Host "🎯 Both MySQL and PostgreSQL ports are accessible" -ForegroundColor Cyan
    Write-Host "   Your TDSQL-C instance supports both protocols" -ForegroundColor White
    Write-Host "   For this project, use PostgreSQL (port 5432)" -ForegroundColor Green
} elseif ($mysql_available -and -not $pg_available) {
    Write-Host "🔄 Only MySQL port is accessible" -ForegroundColor Yellow
    Write-Host "   You have a MySQL-compatible TDSQL-C instance" -ForegroundColor White
    Write-Host "   We can convert the project to use MySQL" -ForegroundColor Cyan
} elseif ($pg_available -and -not $mysql_available) {
    Write-Host "✅ Only PostgreSQL port is accessible" -ForegroundColor Green
    Write-Host "   Perfect! This is compatible with your project" -ForegroundColor White
} else {
    Write-Host "❌ Neither port is accessible" -ForegroundColor Red
    Write-Host "   Please check network configuration or instance status" -ForegroundColor Yellow
}

Write-Host "`n📝 Next steps:" -ForegroundColor Cyan
if ($mysql_available -and -not $pg_available) {
    Write-Host "1. Get MySQL credentials from Tencent Cloud console" -ForegroundColor White
    Write-Host "2. Run the MySQL conversion script" -ForegroundColor White
} elseif ($pg_available) {
    Write-Host "1. Get PostgreSQL credentials (port 5432)" -ForegroundColor White  
    Write-Host "2. Run the standard migration script" -ForegroundColor White
} else {
    Write-Host "1. Check instance status in Tencent Cloud console" -ForegroundColor White
    Write-Host "2. Verify network connectivity" -ForegroundColor White
    Write-Host "3. Check security group settings" -ForegroundColor White
}