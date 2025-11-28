#!/bin/bash

# 快速添加用户名查找API路由到服务器
# 在服务器上运行

cd /opt/xinli-api

echo "正在添加用户名查找API路由..."

# 备份原文件
cp api-server.js api-server.js.backup

# 添加用户名查找路由
cat >> api-server-update.js << 'EOF'
const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');
require('dotenv').config();

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

// 健康检查
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    server: 'xinli-api',
    version: '1.0.0'
  });
});

// 用户相关API
app.get('/api/users', async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      include: { emotionRecords: true, journalEntries: true }
    });
    res.json(users);
  } catch (error) {
    console.error('获取用户列表失败:', error);
    res.status(500).json({ error: '获取用户列表失败' });
  }
});

app.get('/api/users/:id', async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.params.id },
      include: { emotionRecords: true, journalEntries: true }
    });
    if (!user) return res.status(404).json({ error: '用户不存在' });
    res.json(user);
  } catch (error) {
    console.error('获取用户详情失败:', error);
    res.status(500).json({ error: '获取用户详情失败' });
  }
});

// 新增：按用户名查找用户
app.get('/api/users/username/:username', async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { username: req.params.username },
      select: {
        id: true,
        username: true,
        password: true,
        role: true,
        isActive: true,
        avatar: true,
        email: true,
        name: true,
        createdAt: true,
        updatedAt: true
      }
    });
    if (!user) return res.status(404).json({ error: '用户不存在' });
    res.json(user);
  } catch (error) {
    console.error('按用户名获取用户失败:', error);
    res.status(500).json({ error: '按用户名获取用户失败' });
  }
});

// 情绪记录API
app.get('/api/emotions/user/:userId', async (req, res) => {
  try {
    const emotions = await prisma.emotionRecord.findMany({
      where: { userId: req.params.userId },
      include: { user: true },
      orderBy: { createdAt: 'desc' }
    });
    res.json(emotions);
  } catch (error) {
    console.error('获取情绪记录失败:', error);
    res.status(500).json({ error: '获取情绪记录失败' });
  }
});

app.post('/api/emotions', async (req, res) => {
  try {
    const emotion = await prisma.emotionRecord.create({ data: req.body });
    res.status(201).json(emotion);
  } catch (error) {
    console.error('创建情绪记录失败:', error);
    res.status(500).json({ error: '创建情绪记录失败' });
  }
});

// 启动服务器
const PORT = process.env.PORT || 3001;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 API服务器启动成功！`);
  console.log(`📡 监听端口: ${PORT}`);
  console.log(`🌐 访问地址: http://193.112.165.180:${PORT}`);
  console.log(`❤️  健康检查: http://193.112.165.180:${PORT}/health`);
});

process.on('SIGINT', async () => {
  console.log('正在关闭服务器...');
  await prisma.$disconnect();
  process.exit(0);
});
EOF

# 替换原文件
mv api-server-update.js api-server.js

echo "✅ API文件已更新"
echo "🔄 重启PM2服务..."

# 重启PM2服务
pm2 restart xinli-api

echo "✅ 服务已重启"
echo "🧪 测试新的API路由..."

sleep 2

# 测试新路由
curl -s http://localhost:3001/api/users/username/admin && echo "✅ 用户名查找API正常工作" || echo "❌ 用户名查找API可能有问题"

echo "✅ 更新完成！"