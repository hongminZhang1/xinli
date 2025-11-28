#!/bin/bash

# 一键部署脚本 - 在服务器上运行
# 使用方法: curl -s https://raw.githubusercontent.com/your-repo/xinli/master/server/quick-deploy.sh | bash

set -e

echo "=== 心理健康平台API服务一键部署 ==="
echo "服务器IP: 193.112.165.180"
echo "开始时间: $(date)"
echo ""

# 检查是否为root用户
if [ "$EUID" -ne 0 ]; then
    echo "请使用root权限运行此脚本"
    echo "sudo bash quick-deploy.sh"
    exit 1
fi

# 1. 更新系统并安装基础工具
echo "📦 更新系统包..."
apt update -qq && apt upgrade -y -qq

echo "📦 安装基础工具..."
apt install -y -qq curl wget git unzip

# 2. 安装Node.js
echo "📦 安装Node.js 18.x..."
curl -fsSL https://deb.nodesource.com/setup_18.x | bash - > /dev/null 2>&1
apt install -y -qq nodejs

# 3. 安装PM2
echo "📦 安装PM2进程管理器..."
npm install -g pm2 --silent

# 4. 创建应用目录
echo "📁 创建应用目录..."
mkdir -p /opt/xinli-api
cd /opt/xinli-api

# 5. 创建package.json
echo "📝 创建package.json..."
cat > package.json << 'PACKAGE_EOF'
{
  "name": "xinli-api-server",
  "version": "1.0.0",
  "description": "心理健康平台API服务",
  "main": "api-server.js",
  "scripts": {
    "start": "node api-server.js"
  },
  "dependencies": {
    "express": "^4.18.2",
    "cors": "^2.8.5",
    "@prisma/client": "5.10.0",
    "prisma": "5.10.0",
    "dotenv": "^16.3.1"
  }
}
PACKAGE_EOF

# 6. 创建环境变量文件
echo "📝 创建环境变量文件..."
cat > .env << 'ENV_EOF'
DATABASE_URL="mysql://root:zhfh42RT5A@gz-cynosdbmysql-grp-d2u69u2l.sql.tencentcdb.com:22740/xinli"
PORT=3001
NODE_ENV=production
ENV_EOF

# 7. 创建Prisma配置
echo "📝 创建Prisma配置..."
mkdir -p prisma
cat > prisma/schema.prisma << 'PRISMA_EOF'
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
}

model User {
  id        String   @id @default(cuid())
  username  String   @unique
  password  String
  email     String?
  name      String?
  avatar    String?
  role      UserRole @default(USER)
  isActive  Boolean  @default(true)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  emotionRecords EmotionRecord[]
  chatSessions   ChatSession[]
  appointments   Appointment[]
  journalEntries JournalEntry[]
  comments       Comment[]
  @@map("users")
}

model SystemSettings {
  id          String   @id @default(cuid())
  key         String   @unique
  value       String   @db.Text
  description String?
  updatedBy   String?
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  @@map("system_settings")
}

model EmotionRecord {
  id        String      @id @default(cuid())
  userId    String
  emotion   EmotionType
  intensity Int
  notes     String?     @db.Text
  tags      Json
  createdAt DateTime    @default(now())
  user User @relation(fields: [userId], references: [id], onDelete: Cascade)
  @@map("emotion_records")
}

model ChatSession {
  id        String   @id @default(cuid())
  userId    String
  title     String
  messages  Json
  isActive  Boolean  @default(true)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  user User @relation(fields: [userId], references: [id], onDelete: Cascade)
  @@map("chat_sessions")
}

model Appointment {
  id                String            @id @default(cuid())
  userId            String
  counselorId       String?
  title             String
  description       String?           @db.Text
  scheduledDateTime DateTime
  duration          Int               @default(60)
  status            AppointmentStatus @default(PENDING)
  notes             String?           @db.Text
  createdAt         DateTime          @default(now())
  updatedAt         DateTime          @updatedAt
  user      User       @relation(fields: [userId], references: [id], onDelete: Cascade)
  counselor Counselor? @relation(fields: [counselorId], references: [id])
  @@map("appointments")
}

model Counselor {
  id           String   @id @default(cuid())
  name         String
  email        String   @unique
  phone        String?
  specialties  Json
  bio          String?  @db.Text
  avatar       String?
  isAvailable  Boolean  @default(true)
  hourlyRate   Decimal? @db.Decimal(10, 2)
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt
  appointments Appointment[]
  @@map("counselors")
}

model JournalEntry {
  id        String   @id @default(cuid())
  userId    String
  title     String
  content   String   @db.Text
  mood      String?
  tags      Json
  isPrivate Boolean  @default(true)
  likes     Int      @default(0)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  user     User      @relation(fields: [userId], references: [id], onDelete: Cascade)
  comments Comment[]
  @@map("journal_entries")
}

model Comment {
  id             String   @id @default(cuid())
  content        String   @db.Text
  userId         String
  journalEntryId String
  createdAt      DateTime @default(now())
  user         User         @relation(fields: [userId], references: [id], onDelete: Cascade)
  journalEntry JournalEntry @relation(fields: [journalEntryId], references: [id], onDelete: Cascade)
  @@map("comments")
}

enum UserRole {
  USER
  COUNSELOR
  ADMIN
}

enum EmotionType {
  HAPPY
  SAD
  ANGRY
  ANXIOUS
  EXCITED
  CALM
  FRUSTRATED
  CONTENT
  LONELY
  GRATEFUL
}

enum AppointmentStatus {
  PENDING
  CONFIRMED
  COMPLETED
  CANCELLED
  NO_SHOW
}
PRISMA_EOF

# 8. 创建API服务器文件
echo "📝 创建API服务器..."
cat > api-server.js << 'API_EOF'
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
API_EOF

# 9. 安装依赖
echo "📦 安装项目依赖..."
npm install --silent

# 10. 生成Prisma客户端
echo "🔧 生成Prisma客户端..."
npx prisma generate > /dev/null 2>&1

# 11. 配置防火墙
echo "🔥 配置防火墙..."
ufw allow 22 > /dev/null 2>&1
ufw allow 3001 > /dev/null 2>&1
echo "y" | ufw enable > /dev/null 2>&1

# 12. 启动服务
echo "🚀 启动API服务..."
pm2 delete xinli-api > /dev/null 2>&1 || true
pm2 start api-server.js --name xinli-api
pm2 startup > /dev/null 2>&1 || true
pm2 save > /dev/null 2>&1

# 13. 测试服务
echo "🧪 测试服务..."
sleep 3
if curl -s -f http://localhost:3001/health > /dev/null; then
    echo "✅ API服务部署成功！"
else
    echo "❌ API服务可能启动失败，请检查日志: pm2 logs xinli-api"
fi

# 14. 显示结果
echo ""
echo "=== 部署完成 ==="
echo "🎉 心理健康平台API服务已成功部署！"
echo ""
echo "📋 服务信息："
echo "   - 服务器IP: 193.112.165.180"
echo "   - API端口: 3001"
echo "   - 健康检查: http://193.112.165.180:3001/health"
echo "   - 日志查看: pm2 logs xinli-api"
echo "   - 服务状态: pm2 status"
echo ""
echo "🔧 管理命令："
echo "   - 重启服务: pm2 restart xinli-api"
echo "   - 停止服务: pm2 stop xinli-api"
echo "   - 查看日志: pm2 logs xinli-api"
echo ""
echo "✨ 现在可以将前端应用切换到API模式了！"