# 注册功能修复指南

## 问题说明

注册功能失败的原因：
1. 前端注册API (`/api/auth/demo-register`) 原先直接使用 Prisma 访问数据库
2. 在 API 模式下，应该通过 API 服务器来处理注册
3. API 服务器缺少注册端点

## 已修复内容

### 1. Next.js 前端修改

**文件**: `src/app/api/auth/demo-register/route.ts`
- 移除了直接的 Prisma 数据库访问
- 改为通过 API 服务器的 `/api/users/register` 端点注册
- 保持原有的验证逻辑和错误处理

### 2. API 服务器修改

**文件**: `server/api-server.js`
- 添加了 bcrypt 依赖用于密码加密
- 新增 `POST /api/users/register` 端点
- 功能包括：
  - 验证用户名和密码
  - 检查用户是否已存在
  - 密码加密（bcrypt）
  - 第一个用户自动设为管理员
  - 返回不含密码的用户信息

**文件**: `server/package.json`
- 添加 `bcrypt: ^5.1.1` 依赖

## 部署步骤

### 步骤 1: 更新 API 服务器

登录到你的轻量应用云服务器 (193.112.165.180)：

```bash
# 1. 进入服务器目录
cd /path/to/xinli/server

# 2. 备份当前文件（可选但推荐）
cp api-server.js api-server.js.backup
cp package.json package.json.backup

# 3. 上传新的文件
# 将本地的 server/api-server.js 和 server/package.json 上传到服务器

# 4. 安装新的依赖
npm install bcrypt

# 5. 重启 API 服务
pm2 restart api-server
# 或者如果没用 pm2:
# pkill -f api-server.js
# nohup node api-server.js > api.log 2>&1 &

# 6. 验证服务运行
pm2 status
# 或
ps aux | grep api-server
```

### 步骤 2: 测试注册端点

```bash
# 测试注册 API
curl -X POST http://193.112.165.180:3001/api/users/register \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","password":"test123456"}'

# 预期响应（成功）:
# {"id":"...","username":"testuser","role":"USER","isActive":true,...}

# 预期响应（用户已存在）:
# {"error":"用户名已存在"}
```

### 步骤 3: 部署 Vercel

```bash
# 提交代码
git add .
git commit -m "修复注册功能，通过API服务器处理注册"
git push

# Vercel 会自动部署
```

## 注册流程

**本地开发**:
```
浏览器 → /api/auth/demo-register 
       → http://193.112.165.180:3001/api/users/register 
       → 数据库
```

**Vercel 部署**:
```
浏览器 → /api/auth/demo-register 
       → http://193.112.165.180:3001/api/users/register 
       → 数据库
```

## 验证步骤

1. **访问注册页面**: https://your-app.vercel.app/register
2. **输入用户名和密码**（密码至少6位）
3. **点击注册**
4. **预期结果**:
   - 成功：跳转到登录页面
   - 失败：显示相应错误信息

## 常见错误处理

### 错误: "用户名已存在"
- 原因：数据库中已有相同用户名
- 解决：使用不同的用户名

### 错误: "用户名或密码无效"
- 原因：用户名为空或密码少于6位
- 解决：输入有效的用户名和至少6位密码

### 错误: "注册失败"
- 原因：API服务器连接失败或数据库错误
- 解决：检查API服务器状态和日志

## 快速部署命令（服务器端）

```bash
# 一键更新并重启
cd /path/to/xinli/server && \
npm install bcrypt && \
pm2 restart api-server && \
pm2 logs api-server --lines 20
```

## 更新日期

2025年11月28日
