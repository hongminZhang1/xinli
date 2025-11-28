# Vercel 部署修复指南

## 登录问题分析
Vercel部署后无法登录的主要原因：
1. **NEXTAUTH_URL配置错误**：仍指向localhost而非生产域名
2. **环境变量缺失**：NextAuth所需的环境变量未正确设置
3. **HTTPS混合内容问题**：API调用被浏览器阻止

## 完整修复方案

### 1. ⚡ 关键环境变量配置
在Vercel Dashboard中设置：

```bash
# NextAuth必需配置 (最重要!)
NEXTAUTH_SECRET="k8Fg9mQx2PvL7hR3"
NEXTAUTH_URL="https://你的实际域名.vercel.app"

# 或者使用自动检测（推荐）
NEXTAUTH_URL_PROD="https://你的实际域名.vercel.app"

# API模式配置
NEXT_PUBLIC_DATA_ACCESS_MODE="api"

# 数据库连接
DATABASE_URL="mysql://root:zhfh42RT5A@gz-cynosdbmysql-grp-d2u69u2l.sql.tencentcdb.com:22740/xinli"

# 其他服务
OPENAI_API_KEY="your-openai-key"
UPLOADTHING_TOKEN="你的token"
```

### 2. 🔧 代码修复内容
- ✅ NextAuth动态URL检测
- ✅ API代理避免HTTPS混合内容
- ✅ 环境变量智能处理
- ✅ 错误处理和降级方案

### 3. 🚀 部署步骤

1. **确保代码是最新的**：
   ```bash
   git add .
   git commit -m "修复Vercel登录和API问题"
   git push origin master
   ```

2. **在Vercel Dashboard配置环境变量**：
   - 进入你的项目设置
   - 在Environment Variables中添加上述变量
   - **特别重要**：确保`NEXTAUTH_URL`设置为正确的生产域名

3. **重新部署**：
   - 在Vercel Dashboard中点击"Redeploy"
   - 或者推送新的提交触发自动部署

### 4. ✅ 验证清单
部署完成后检查：
- [ ] 可以访问登录页面
- [ ] 可以成功登录
- [ ] 登录后可以访问仪表盘
- [ ] 情绪打卡功能正常
- [ ] 日记功能正常
- [ ] 文章广场显示内容

### 5. 🐛 排查步骤
如果仍有登录问题：

1. **检查浏览器开发者工具**：
   - Network标签页查看登录请求
   - Console查看JavaScript错误

2. **检查NextAuth回调URL**：
   - 确保回调URL指向正确域名
   - 检查是否有CORS错误

3. **验证环境变量**：
   - 在Vercel函数日志中查看环境变量是否正确加载

### 6. 🔍 常见问题

**Q: 登录时显示"Configuration Error"**  
A: 检查`NEXTAUTH_URL`是否设置为正确的生产域名

**Q: 登录成功但重定向到localhost**  
A: 确保没有硬编码的localhost URL

**Q: API请求失败**  
A: 检查是否存在HTTPS混合内容问题，确认API代理工作正常

### 7. 📞 最终检查
登录成功的标志：
- 可以进入 `/dashboard` 页面
- 用户信息正确显示
- API请求正常工作