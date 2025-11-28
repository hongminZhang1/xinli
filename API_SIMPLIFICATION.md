# API请求配置说明

## 问题背景

### HTTPS混合内容问题
当应用部署到Vercel（HTTPS）后，浏览器会阻止从HTTPS网站直接请求HTTP资源（API服务器），这是浏览器的安全策略。

**错误表现**：
- 本地开发（HTTP）一切正常
- 部署到Vercel（HTTPS）后，API请求失败
- 浏览器控制台显示 Mixed Content 错误

## 解决方案

### 智能路由策略

根据运行环境自动选择最佳请求方式：

1. **Vercel生产环境（HTTPS）**：
   - 客户端请求 → `/api/proxy` → 代理转发 → `http://193.112.165.180:3001/api`
   - 避免浏览器混合内容阻止

2. **本地开发（HTTP）**：
   - 直接请求 → `http://193.112.165.180:3001/api`
   - 无需代理，提高开发效率

3. **服务端渲染**：
   - 直接请求 → `http://193.112.165.180:3001/api`
   - 服务端不受浏览器安全策略限制

## 技术实现

### 1. 智能配置（env-config.ts）

```typescript
export const getApiBaseUrl = () => {
  // 在Vercel生产环境的客户端，使用代理
  if (typeof window !== 'undefined' && 
      process.env.NODE_ENV === 'production' && 
      window.location.protocol === 'https:') {
    return '/api/proxy';
  }
  
  // 其他情况直接使用IP
  return 'http://193.112.165.180:3001/api';
};
```

### 2. 代理路由（/api/proxy/[...path]/route.ts）

- 接收所有 `/api/proxy/*` 请求
- 转发到 `http://193.112.165.180:3001/api/*`
- 返回响应给客户端

## 请求流程对比

## 请求流程对比

### 本地开发
```
浏览器 → http://193.112.165.180:3001/api/journals → API服务器
```

### Vercel部署
```
浏览器 → https://your-app.vercel.app/api/proxy/journals 
       → Vercel代理 
       → http://193.112.165.180:3001/api/journals 
       → API服务器
```

## 使用示例

```typescript
// api-client.ts 自动根据环境选择
import { apiClient } from '@/lib/api-client';

// 所有请求代码不变
const journals = await apiClient.get('/journals');
const emotions = await apiClient.get('/emotions');
```

## 配置文件

### .env
```bash
NEXT_PUBLIC_API_BASE_URL="http://193.112.165.180:3001/api"
```

### vercel.json
保持基础配置即可，无需特殊CORS或重定向配置

## 注意事项

1. ✅ **混合内容问题已解决**：通过代理避免浏览器阻止
2. ✅ **本地开发不受影响**：直连API，速度更快
3. ✅ **代码统一**：前端代码无需修改，自动适配环境
4. ⚠️ **代理延迟**：Vercel环境多一层代理，略有延迟（通常<50ms）

## 最佳实践建议

**长期方案**：为API服务器配置HTTPS证书
- 使用Let's Encrypt免费证书
- 配置Nginx反向代理
- 彻底解决混合内容问题

## 更新日期

2025年11月28日
