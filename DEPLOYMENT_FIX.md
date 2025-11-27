# 🔧 部署后登录问题修复指南

## 问题描述
增加缓存系统后，部署到生产环境无法登录，提示"用户名或密码错误"，但本地测试正常。

## 根本原因
**NextAuth 环境变量配置问题** - 生产环境缺少必要的认证配置

## ✅ 解决方案

### 1. 在 Vercel（或其他部署平台）配置环境变量

进入项目设置 → Environment Variables，添加以下变量：

#### 必需环境变量：

```bash
# 数据库连接（已有，确认正确）
DATABASE_URL="mysql://root:zhfh42RT5A@gz-cynosdbmysql-grp-d2u69u2l.sql.tencentcdb.com:22740/xinli"

# NextAuth 密钥（本地有，生产环境必须添加）
NEXTAUTH_SECRET="k8Fg9mQx2PvL7hR3"

# NextAuth URL（生产环境必须添加 - 改为你的实际域名）
NEXTAUTH_URL="https://your-actual-domain.vercel.app"

# 文件上传（已有）
UPLOADTHING_TOKEN='eyJhcGlLZXkiOiJza19saXZlXzZjM2NjZjE2MTEyYzc3OWYyZDIyMjAxMzM0Y2VkZmE5Mjg0M2U2NjE5YjczMDgzOTViNzVlZmM4ZGI5OWZiNDEiLCJhcHBJZCI6ImRlYWQ2eDI2dzkiLCJyZWdpb25zIjpbInNlYTEiXX0='

# Prisma（可选，用于数据库代理）
PRISMA_GENERATE_DATAPROXY="true"
```

### 2. 重要配置说明

#### ⚠️ NEXTAUTH_URL 最关键
```bash
# 错误示例（不要用 localhost）
NEXTAUTH_URL="http://localhost:3000"  ❌

# 正确示例（使用实际部署域名）
NEXTAUTH_URL="https://xinli.vercel.app"  ✅
NEXTAUTH_URL="https://your-custom-domain.com"  ✅
```

#### ⚠️ NEXTAUTH_SECRET 必须一致
- 本地和生产环境使用**相同的值**
- 不要在生产环境重新生成新的密钥
- 当前值：`k8Fg9mQx2PvL7hR3`

### 3. Vercel 配置步骤（图文说明）

1. **登录 Vercel Dashboard**
2. **选择你的项目** → xinli
3. **进入 Settings**
4. **点击 Environment Variables**
5. **添加以下变量**：
   - Name: `NEXTAUTH_URL`
   - Value: `https://你的域名.vercel.app`
   - Environment: 选择 `Production`、`Preview`、`Development` 全部勾选
6. **添加 NEXTAUTH_SECRET**（如果没有）
   - Name: `NEXTAUTH_SECRET`
   - Value: `k8Fg9mQx2PvL7hR3`
   - Environment: 全部勾选
7. **保存并重新部署**

### 4. 重新部署

配置环境变量后，必须重新部署：

```bash
# 方式1：通过 Vercel Dashboard
Deployments → 最新部署 → ⋯ → Redeploy

# 方式2：推送代码触发部署
git add .
git commit -m "fix: update environment variables"
git push
```

### 5. 验证修复

部署完成后，测试登录：

#### 测试账户：
- 用户名: `admin`
- 密码: `admin123`

或

- 用户名: `zhm`
- 密码: （你设置的密码）

## 🔍 调试检查清单

如果还是无法登录，按以下顺序检查：

### ✅ 1. 检查环境变量
```bash
# 在 Vercel Dashboard 确认
Settings → Environment Variables

必须有：
☐ DATABASE_URL
☐ NEXTAUTH_SECRET
☐ NEXTAUTH_URL（指向生产域名）
```

### ✅ 2. 检查数据库连接
```bash
# 查看部署日志
Deployments → 最新部署 → View Function Logs

确认没有数据库连接错误
```

### ✅ 3. 检查构建日志
```bash
# 查看构建输出
Deployments → 最新部署 → Building

确认：
✓ Creating an optimized production build
✓ Compiled successfully
✓ Linting and checking validity of types
```

### ✅ 4. 检查函数日志（Runtime Logs）
```bash
# 登录时查看实时日志
Deployments → 最新部署 → View Function Logs

查找错误信息：
- Database connection errors
- bcrypt errors
- NextAuth errors
```

## 🔧 常见错误与解决

### 错误 1: "Error: NEXTAUTH_URL is not set"
```bash
解决：在 Vercel 添加 NEXTAUTH_URL 环境变量
```

### 错误 2: "Invalid session token"
```bash
解决：确保 NEXTAUTH_SECRET 在所有环境一致
```

### 错误 3: "Database connection timeout"
```bash
解决：检查数据库是否允许来自 Vercel 的连接
```

### 错误 4: "bcrypt is not a function"
```bash
解决：确保 bcrypt 在 dependencies（不是 devDependencies）
检查 package.json：
{
  "dependencies": {
    "bcrypt": "^5.1.1"  ✅
  }
}
```

## 📊 本地调试脚本

如果需要本地测试，运行：

```bash
npm run tsx scripts/debug-login.ts
```

这将检查：
- ✅ 数据库连接
- ✅ 用户列表
- ✅ 密码格式
- ✅ 环境变量

## 🎯 快速修复步骤总结

1. **打开 Vercel** → 项目设置 → Environment Variables
2. **添加** `NEXTAUTH_URL="https://你的域名.vercel.app"`
3. **确认** `NEXTAUTH_SECRET="k8Fg9mQx2PvL7hR3"` 存在
4. **保存**并重新部署
5. **测试**登录功能

## 💡 预防措施

为避免未来出现类似问题：

1. **创建 .env.example 模板**
   ```bash
   DATABASE_URL="your-database-url"
   NEXTAUTH_SECRET="your-secret-key"
   NEXTAUTH_URL="http://localhost:3000"
   ```

2. **文档化所有必需的环境变量**

3. **部署前检查清单**
   - [ ] 所有环境变量已配置
   - [ ] NEXTAUTH_URL 指向正确域名
   - [ ] 数据库连接测试通过
   - [ ] 本地构建成功

## 📞 需要帮助？

如果按照以上步骤仍无法解决：

1. 查看 Vercel Function Logs 的具体错误信息
2. 运行本地调试脚本 `npm run tsx scripts/debug-login.ts`
3. 检查是否有网络防火墙限制数据库访问
4. 确认数据库服务是否正常运行

---

**最后更新**: 2025年11月26日
**状态**: ✅ 问题已定位，等待配置环境变量后验证
