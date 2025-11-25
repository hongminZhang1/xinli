# TDSQL-C 迁移执行清单

## ✅ 迁移准备清单

### 📝 第一步：获取TDSQL-C连接信息
- [ ] 登录腾讯云控制台
- [ ] 创建TDSQL-C PostgreSQL实例
- [ ] 记录连接信息：
  - 主机地址：_________________
  - 端口：5432
  - 数据库名：_________________
  - 用户名：___________________
  - 密码：_____________________

### 💾 第二步：备份当前数据
```powershell
cd d:\xinli
.\scripts\backup-current-data.ps1
```
- [ ] 备份成功，记录备份文件名：___________________

### 🔧 第三步：配置新连接
- [ ] 复制 .env 为 .env.neon.backup（保留原配置）
- [ ] 编辑 .env，更新数据库连接：
```env
POSTGRES_PRISMA_URL="postgresql://用户名:密码@主机地址:5432/数据库名?connect_timeout=15&sslmode=require"
POSTGRES_URL_NON_POOLING="postgresql://用户名:密码@主机地址:5432/数据库名?sslmode=require"
```

### 📤 第四步：迁移数据
```powershell
.\scripts\restore-to-tdsql.ps1 -BackupFile "备份文件名.sql" -TdsqlHost "主机地址" -TdsqlUser "用户名" -TdsqlPassword "密码" -TdsqlDb "数据库名"
```
- [ ] 数据迁移成功

### ✅ 第五步：验证功能
```powershell
.\scripts\verify-migration.ps1
npm run dev
```
- [ ] Prisma连接正常
- [ ] 用户登录功能正常
- [ ] 日记创建功能正常
- [ ] 文章广场显示正常
- [ ] 评论功能正常

## 🚨 故障恢复
如果迁移失败：
```powershell
cp .env.neon.backup .env
npx prisma generate
npm run dev
```

## 📞 需要帮助？
如果遇到问题，请提供：
1. 错误信息截图
2. 执行的具体步骤
3. TDSQL-C实例状态