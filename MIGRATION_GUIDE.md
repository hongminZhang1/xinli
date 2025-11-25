# TDSQL-C 迁移指南

## 🚀 完整迁移步骤

### 前置条件
1. 已在腾讯云创建TDSQL-C实例（PostgreSQL兼容版）
2. 获得数据库连接信息：主机地址、端口、数据库名、用户名、密码
3. 确保本地有psql工具（通常随PostgreSQL一起安装）

### 第一步：备份当前数据
```powershell
# 在项目根目录执行
cd d:\xinli
.\scripts\backup-current-data.ps1
```

### 第二步：配置新的数据库连接
1. 复制 `.env.tdsql-c.template` 为 `.env.new`
2. 编辑 `.env.new`，填入TDSQL-C的实际连接信息：
   ```
   POSTGRES_PRISMA_URL="postgresql://your_username:your_password@your_tdsql_host.tencentcdb.com:5432/your_database?connect_timeout=15&sslmode=require"
   POSTGRES_URL_NON_POOLING="postgresql://your_username:your_password@your_tdsql_host.tencentcdb.com:5432/your_database?sslmode=require"
   ```

### 第三步：迁移数据
```powershell
# 执行数据恢复（替换为你的实际信息）
.\scripts\restore-to-tdsql.ps1 -BackupFile "xinli_backup_YYYYMMDD_HHMMSS.sql" -TdsqlHost "your-host.tencentcdb.com" -TdsqlUser "your_username" -TdsqlPassword "your_password" -TdsqlDb "your_database"
```

### 第四步：切换配置
```powershell
# 备份当前配置
cp .env .env.neon.backup

# 使用新配置
cp .env.new .env
```

### 第五步：验证迁移
```powershell
# 验证数据和功能
.\scripts\verify-migration.ps1

# 如果验证通过，启动应用
npm run dev
```

### 第六步：性能优化（可选）
TDSQL-C支持更高的并发和连接数，可以优化Prisma连接池：

```prisma
// 在 prisma/schema.prisma 中
datasource db {
  provider = "postgresql" 
  url      = env("POSTGRES_PRISMA_URL")
  directUrl = env("POSTGRES_URL_NON_POOLING")
  // 可选：增加连接池大小
}
```

## 🔧 故障排除

### 连接问题
- 检查TDSQL-C实例是否启动
- 确认安全组/防火墙设置允许连接
- 验证用户名密码正确

### 数据问题  
- 如果迁移失败，可以用 `.env.neon.backup` 恢复到原来的数据库
- 重新检查备份文件完整性

### 性能问题
- 监控TDSQL-C控制台的性能指标
- 根据使用情况调整实例规格

## 📊 预期收益
- 性能提升：QPS从数百提升到数万甚至数十万
- 可用性：99.95%以上
- 扩展性：自动扩缩容
- 成本：按需付费，通常比固定实例更经济

## 🔄 回滚方案
如果需要回滚到Neon：
```powershell
# 恢复原配置
cp .env.neon.backup .env

# 重新生成Prisma客户端
npx prisma generate

# 重启应用
npm run dev
```