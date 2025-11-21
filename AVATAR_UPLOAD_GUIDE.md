# 头像上传功能使用说明

## 功能概述

已成功为心晴驿站添加了完整的头像上传功能，支持云端存储。用户可以在设置页面上传、更换或删除头像。

## 实现的功能

### 1. 头像上传
- ✅ 支持JPG、PNG等常见图片格式
- ✅ 文件大小限制：最大4MB
- ✅ 使用UploadThing进行云端存储
- ✅ 实时预览上传的头像

### 2. 头像管理
- ✅ 更换头像功能
- ✅ 删除头像（恢复到默认字母头像）
- ✅ 头像在整个应用中同步更新

### 3. 用户体验
- ✅ 拖拽上传支持
- ✅ 上传进度提示
- ✅ 错误处理和用户反馈
- ✅ 响应式设计，支持各种屏幕尺寸

## 技术实现

### 文件结构
```
src/
├── app/
│   ├── api/
│   │   ├── uploadthing/
│   │   │   ├── core.ts          # UploadThing核心配置
│   │   │   └── route.ts         # 上传API路由
│   │   └── users/
│   │       └── avatar/
│   │           └── route.ts     # 用户头像更新API
│   └── dashboard/
│       └── settings/
│           └── page.tsx         # 设置页面（使用AvatarUpload组件）
├── components/
│   └── ui/
│       ├── Avatar.tsx           # 头像显示组件
│       └── AvatarUpload.tsx     # 头像上传组件
├── lib/
│   └── uploadthing.ts          # UploadThing客户端配置
└── types/
    └── next-auth.d.ts          # NextAuth类型扩展
```

### 数据库变更
- 用户表已包含`avatar`字段（String?类型），用于存储头像URL
- 支持空值，用户未上传头像时显示默认字母头像

### 云存储服务
- 使用UploadThing作为文件存储服务
- 自动处理图片优化和CDN分发
- 安全的文件上传和访问控制

## 使用说明

### 用户操作流程
1. 登录后进入 "账户设置" 页面
2. 在"个人信息"部分找到头像设置区域
3. 点击"更换头像"按钮或拖拽图片到上传区域
4. 选择图片文件（支持JPG、PNG格式，最大4MB）
5. 等待上传完成，头像将自动更新
6. 可以点击"使用默认头像"来删除当前头像

### 管理员配置
1. 在UploadThing注册账户：https://uploadthing.com
2. 获取API密钥并配置到环境变量：
   ```env
   UPLOADTHING_SECRET=your_uploadthing_secret_here
   UPLOADTHING_APP_ID=your_uploadthing_app_id_here
   ```
3. 确保Next.js配置中允许UploadThing域名：
   ```javascript
   // next.config.js
   images: {
     remotePatterns: [
       { protocol: "https", hostname: "uploadthing.com" },
       { protocol: "https", hostname: "utfs.io" }
     ]
   }
   ```

## API端点

### 头像上传
- **路由**: `/api/uploadthing`
- **方法**: POST
- **功能**: 上传图片文件到云存储

### 更新用户头像
- **路由**: `/api/users/avatar`
- **方法**: PATCH
- **参数**: `{ avatarUrl: string }`
- **功能**: 更新用户的头像URL

### 删除用户头像
- **路由**: `/api/users/avatar`
- **方法**: DELETE
- **功能**: 删除用户头像（设置为null）

## 安全特性

1. **身份验证**: 只有登录用户可以上传/修改头像
2. **文件验证**: 严格的文件类型和大小限制
3. **权限控制**: 用户只能修改自己的头像
4. **错误处理**: 完善的错误信息和用户反馈

## 扩展功能建议

### 短期优化
- [ ] 添加图片裁剪功能
- [ ] 支持更多图片格式（WebP等）
- [ ] 添加头像历史记录

### 长期功能
- [ ] 头像审核机制
- [ ] 批量头像管理（管理员功能）
- [ ] 头像推荐/模板功能

## 故障排除

### 常见问题
1. **上传失败**: 检查UploadThing API密钥配置
2. **头像不显示**: 确认图片URL可访问，检查Next.js图片域名配置
3. **权限错误**: 确认用户已登录且有效

### 调试信息
- 上传过程中的错误会在浏览器控制台显示
- 服务器端错误记录在应用日志中
- API响应包含详细的错误信息

## 更新日志

### v1.0.0 (2024-11-21)
- ✅ 完整的头像上传功能
- ✅ 云端存储集成
- ✅ 用户界面优化
- ✅ 安全认证和权限控制
- ✅ 错误处理和用户反馈