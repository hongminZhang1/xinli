# Vercel 部署修复指南

## 问题分析
在Vercel部署时出现"Failed to fetch"错误的主要原因：
1. HTTPS混合内容问题：Vercel使用HTTPS，但远程API是HTTP
2. 环境变量配置不当
3. API路由使用直接数据库连接而非API代理

## 修复方案

### 1. 环境变量配置
在Vercel Dashboard中设置以下环境变量：

```bash
# 强制API模式
NEXT_PUBLIC_DATA_ACCESS_MODE="api"

# 数据库连接（仅服务器使用）
DATABASE_URL="mysql://root:zhfh42RT5A@gz-cynosdbmysql-grp-d2u69u2l.sql.tencentcdb.com:22740/xinli"

# 认证配置
NEXTAUTH_SECRET="k8Fg9mQx2PvL7hR3"
NEXTAUTH_URL="https://你的vercel域名.vercel.app"

# AI服务
OPENAI_API_KEY="your-openai-key"

# 文件上传
UPLOADTHING_TOKEN='你的uploadthing token'
```

### 2. API代理架构
- 本地开发：直接调用 `http://193.112.165.180:3001/api`
- Vercel生产：通过 `/api/proxy/[...path]` 代理到远程API，避免HTTPS混合内容问题

### 3. 部署流程
1. 确保所有API路由使用 `getApiBaseUrl()` 而不是硬编码URL
2. 推送代码到GitHub
3. 在Vercel中配置正确的环境变量
4. 触发重新部署

### 4. 验证步骤
部署后检查：
- 登录功能是否正常
- 情绪打卡是否可以读取和创建
- 日记功能是否可以读取和创建
- 文章广场是否显示内容

### 5. 排查工具
如果仍有问题，在浏览器开发者工具中：
1. 检查Network标签页的API请求
2. 查看Console中的错误信息
3. 验证环境变量是否正确加载

## 关键文件
- `src/lib/env-config.ts` - 环境配置管理
- `src/app/api/proxy/[...path]/route.ts` - API代理
- `vercel.json` - Vercel配置
- `.env` - 环境变量模板