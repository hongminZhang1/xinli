# 轻量应用云服务器API部署指南

## 概述

本指南描述如何在轻量应用云服务器上部署API服务，作为数据库访问的代理层。

## 架构说明

```
前端应用 -> 轻量应用云服务器API -> 远程数据库
(本地/Vercel)     (中间代理层)        (腾讯云数据库)
```

## 部署步骤

### 1. 在轻量应用云服务器上部署API服务

```bash
# 1. 上传server目录到服务器
# 2. 在服务器上执行以下命令

cd /path/to/server
npm run setup
npm start
```

### 2. 配置防火墙和安全组

确保轻量应用云服务器的3001端口对外开放：

```bash
# Ubuntu/Debian
sudo ufw allow 3001

# CentOS/RHEL
sudo firewall-cmd --zone=public --add-port=3001/tcp --permanent
sudo firewall-cmd --reload
```

在腾讯云控制台中配置安全组规则，允许3001端口的入站流量。

### 3. 使用PM2部署（推荐）

```bash
# 安装PM2
npm install -g pm2

# 启动服务
pm2 start api-server.js --name xinli-api

# 设置开机自启
pm2 startup
pm2 save

# 查看状态
pm2 status
pm2 logs xinli-api
```

### 4. 配置Nginx反向代理（可选）

创建Nginx配置文件 `/etc/nginx/sites-available/xinli-api`：

```nginx
server {
    listen 80;
    server_name your-server-ip;

    location /api {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    location /health {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
    }
}
```

启用配置：

```bash
sudo ln -s /etc/nginx/sites-available/xinli-api /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

## 前端应用配置

### 切换到API模式

修改前端应用的 `.env` 文件：

```bash
# 数据访问模式改为API
NEXT_PUBLIC_DATA_ACCESS_MODE="api"

# 设置轻量应用云服务器地址
NEXT_PUBLIC_API_BASE_URL="http://your-server-ip:3001/api"
# 或者如果配置了Nginx
NEXT_PUBLIC_API_BASE_URL="http://your-server-ip/api"
```

### 验证配置

1. 重新构建并启动前端应用：
```bash
npm run build
npm start
```

2. 检查网络请求是否指向轻量应用云服务器

## 测试验证

### 1. 测试API服务器

```bash
# 健康检查
curl http://your-server-ip:3001/health

# 测试API（需要有效的用户ID）
curl http://your-server-ip:3001/api/emotions/user/USER_ID
```

### 2. 测试前端应用

在前端应用中执行正常的数据操作，如：
- 登录/注册
- 创建情绪记录
- 查看日记条目
- 等等

检查浏览器开发者工具的网络标签，确认请求发送到轻量应用云服务器。

## 性能优化建议

### 1. 启用缓存

在API服务器中添加Redis缓存：

```javascript
const redis = require('redis');
const client = redis.createClient();

// 缓存用户数据
app.get('/api/users/:id', async (req, res) => {
  const cacheKey = `user:${req.params.id}`;
  const cached = await client.get(cacheKey);
  
  if (cached) {
    return res.json(JSON.parse(cached));
  }
  
  // 从数据库获取数据
  const user = await prisma.user.findUnique({...});
  
  // 缓存结果
  await client.setex(cacheKey, 300, JSON.stringify(user)); // 5分钟过期
  
  res.json(user);
});
```

### 2. 连接池配置

在服务器的环境变量中配置数据库连接池：

```bash
DATABASE_URL="mysql://root:password@host:port/db?connection_limit=20&pool_timeout=5"
```

### 3. 监控和日志

```javascript
// 添加请求日志
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// 性能监控
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(`${req.method} ${req.path} - ${res.statusCode} - ${duration}ms`);
  });
  next();
});
```

## 故障排除

### 常见问题

1. **连接超时**
   - 检查服务器防火墙设置
   - 验证安全组配置
   - 确认服务是否正常运行

2. **数据库连接失败**
   - 检查DATABASE_URL配置
   - 验证数据库服务器是否允许从轻量应用云服务器连接
   - 检查数据库用户权限

3. **CORS错误**
   - 确保API服务器启用了CORS
   - 配置正确的允许域名

### 日志查看

```bash
# PM2日志
pm2 logs xinli-api

# 系统日志
sudo journalctl -u nginx -f
```

## 回滚方案

如果需要回滚到直接数据库访问模式：

1. 修改前端应用的环境变量：
```bash
NEXT_PUBLIC_DATA_ACCESS_MODE="direct"
```

2. 重新构建并部署前端应用

## 安全考虑

1. **API认证**：考虑在API服务器中实现JWT认证
2. **HTTPS**：在生产环境中使用HTTPS
3. **限流**：实现API请求限流以防止滥用
4. **IP白名单**：如果可能，限制允许访问API的IP地址

## 总结

通过这个架构，您可以：
- 在轻量应用云服务器和前端应用之间建立中间层
- 更好地控制数据库访问
- 实现缓存和性能优化
- 提供更好的安全性和监控能力