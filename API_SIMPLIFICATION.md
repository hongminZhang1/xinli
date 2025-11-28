# API请求简化说明

## 改动概述

本次改动简化了API请求逻辑，统一使用IP地址直接请求，无论是本地开发还是部署到Vercel。

## 主要变更

### 1. 简化 `env-config.ts`
- **删除**: 复杂的环境判断逻辑（Vercel代理、生产环境检测等）
- **保留**: 仅保留 `getApiBaseUrl()` 函数
- **行为**: 统一返回 `http://193.112.165.180:3001/api`

### 2. 删除代理相关代码
- **删除文件**: `src/app/api/proxy/[...path]/route.ts`
- **删除目录**: `src/app/api/proxy/`
- **原因**: 不再需要通过Vercel代理转发请求到远程API

### 3. 删除API模式保护器
- **删除文件**: `src/lib/api-mode-guard.ts`
- **原因**: 简化后不再需要模式检查

### 4. 更新环境变量说明
- **文件**: `.env`
- **改动**: 更新注释，明确说明本地和部署后统一使用IP地址

### 5. 简化Vercel配置
- **文件**: `vercel.json`
- **删除**: `headers` 和 `redirects` 配置
- **保留**: 基础构建和环境变量配置

## API请求方式

### 之前（复杂）
- **本地**: `http://193.112.165.180:3001/api`
- **Vercel**: `https://xl.homgzha.cc/api/proxy/...` → 代理到 → `http://193.112.165.180:3001/api`

### 现在（简化）
- **本地**: `http://193.112.165.180:3001/api/users`
- **Vercel**: `http://193.112.165.180:3001/api/users`

## 使用示例

```typescript
// api-client.ts 自动使用配置的IP地址
import { apiClient } from '@/lib/api-client';

// 所有请求统一格式
const users = await apiClient.get('/users');
const emotions = await apiClient.get('/emotions');
```

## 注意事项

1. **HTTPS混合内容警告**: Vercel部署使用HTTPS，请求HTTP API时浏览器可能警告
2. **CORS配置**: 确保远程API服务器（193.112.165.180:3001）已正确配置CORS
3. **环境变量**: 部署到Vercel时需在Dashboard中设置 `NEXT_PUBLIC_API_BASE_URL`

## 好处

- ✅ 代码更简洁，易于维护
- ✅ 本地和生产环境逻辑统一
- ✅ 减少中间代理层，提高性能
- ✅ 调试更方便，请求路径清晰

## 日期

2025年11月28日
