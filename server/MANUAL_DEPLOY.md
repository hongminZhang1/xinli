# 手动服务器部署指南

## 步骤1: 连接到服务器

```bash
ssh root@193.112.165.180
```

## 步骤2: 初始化服务器环境

在服务器上执行以下命令：

```bash
# 更新系统
apt update && apt upgrade -y

# 安装基础工具
apt install -y curl wget git unzip

# 安装Node.js 18.x LTS
curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
apt install -y nodejs

# 验证安装
node --version
npm --version

# 安装PM2
npm install -g pm2

# 创建应用目录
mkdir -p /opt/xinli-api

# 配置防火墙
ufw allow 22
ufw allow 3001
ufw --force enable
```

## 步骤3: 上传项目文件

### 方法1: 使用SCP (在本地Windows机器上执行)

```powershell
# 打包server目录
cd d:\xinli
tar -czf xinli-api.tar.gz server/

# 上传到服务器
scp xinli-api.tar.gz root@193.112.165.180:/tmp/
```

### 方法2: 手动创建文件

在服务器上创建必要的文件：

```bash
cd /opt/xinli-api

# 创建package.json
cat > package.json << 'EOF'
{
  "name": "xinli-api-server",
  "version": "1.0.0",
  "description": "轻量应用云服务器API服务",
  "main": "api-server.js",
  "scripts": {
    "start": "node api-server.js",
    "dev": "nodemon api-server.js"
  },
  "dependencies": {
    "express": "^4.18.2",
    "cors": "^2.8.5",
    "@prisma/client": "5.10.0",
    "prisma": "5.10.0",
    "dotenv": "^16.3.1"
  }
}
EOF

# 创建.env文件
cat > .env << 'EOF'
# 数据库连接（与主应用相同的远程数据库）
DATABASE_URL="mysql://root:zhfh42RT5A@gz-cynosdbmysql-grp-d2u69u2l.sql.tencentcdb.com:22740/xinli"

# 服务器端口
PORT=3001

# 环境
NODE_ENV=production
EOF
```

然后需要创建api-server.js文件（内容较长，建议使用方法1上传）。

## 步骤4: 创建Prisma配置

```bash
cd /opt/xinli-api

# 创建prisma目录
mkdir -p prisma

# 创建schema.prisma
cat > prisma/schema.prisma << 'EOF'
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
EOF
```

## 步骤5: 安装依赖并启动服务

```bash
cd /opt/xinli-api

# 安装依赖
npm install

# 生成Prisma客户端
npx prisma generate

# 启动服务 (先测试)
npm start

# 如果测试成功，使用PM2启动
pm2 start api-server.js --name xinli-api

# 设置开机自启
pm2 startup
pm2 save
```

## 步骤6: 测试API服务

```bash
# 健康检查
curl http://localhost:3001/health

# 从外部测试
curl http://193.112.165.180:3001/health
```

## 步骤7: 监控和管理

```bash
# 查看PM2状态
pm2 status

# 查看日志
pm2 logs xinli-api

# 重启服务
pm2 restart xinli-api

# 停止服务
pm2 stop xinli-api
```

## 故障排除

1. **端口占用问题**：
   ```bash
   netstat -tulpn | grep :3001
   ```

2. **防火墙问题**：
   ```bash
   ufw status
   ufw allow 3001
   ```

3. **权限问题**：
   ```bash
   chmod +x api-server.js
   chown -R $USER:$USER /opt/xinli-api
   ```

4. **数据库连接问题**：
   检查.env文件中的DATABASE_URL是否正确