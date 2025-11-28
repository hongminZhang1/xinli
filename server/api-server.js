/**
 * 轻量应用云服务器API服务
 * 作为数据库访问的代理层
 */

const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const { PrismaClient } = require('@prisma/client');
require('dotenv').config();

const app = express();
const prisma = new PrismaClient();

// 中间件
app.use(cors());
app.use(express.json());

// 健康检查
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// 用户相关API
app.get('/api/users', async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      include: {
        emotionRecords: true,
        journalEntries: true,
        appointments: true,
      }
    });
    res.json(users);
  } catch (error) {
    console.error('获取用户列表失败:', error);
    res.status(500).json({ error: '获取用户列表失败' });
  }
});

// 通过用户名查询用户（用于登录）
app.get('/api/users/username/:username', async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { username: req.params.username }
    });
    if (!user) {
      return res.status(404).json({ error: '用户不存在' });
    }
    res.json(user);
  } catch (error) {
    console.error('通过用户名获取用户失败:', error);
    res.status(500).json({ error: '通过用户名获取用户失败' });
  }
});

app.get('/api/users/:id', async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.params.id },
      include: {
        emotionRecords: true,
        journalEntries: true,
        appointments: true,
      }
    });
    if (!user) {
      return res.status(404).json({ error: '用户不存在' });
    }
    res.json(user);
  } catch (error) {
    console.error('获取用户详情失败:', error);
    res.status(500).json({ error: '获取用户详情失败' });
  }
});

app.post('/api/users', async (req, res) => {
  try {
    const user = await prisma.user.create({
      data: req.body
    });
    res.status(201).json(user);
  } catch (error) {
    console.error('创建用户失败:', error);
    res.status(500).json({ error: '创建用户失败' });
  }
});

// 用户注册端点
app.post('/api/users/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    
    // 验证输入
    if (!username || !password || password.length < 6) {
      return res.status(400).json({ error: '用户名或密码无效' });
    }
    
    // 检查用户是否已存在
    const existingUser = await prisma.user.findUnique({
      where: { username }
    });
    
    if (existingUser) {
      return res.status(409).json({ error: '用户名已存在' });
    }
    
    // 加密密码
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // 检查是否是第一个用户，如果是则设为管理员
    const userCount = await prisma.user.count();
    const role = userCount === 0 ? 'ADMIN' : 'USER';
    
    // 创建用户
    const user = await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
        role: role,
        isActive: true
      }
    });
    
    // 不返回密码
    const { password: _, ...userWithoutPassword } = user;
    res.status(201).json(userWithoutPassword);
    
  } catch (error) {
    console.error('注册用户失败:', error);
    res.status(500).json({ error: '注册失败' });
  }
});

app.put('/api/users/:id', async (req, res) => {
  try {
    const user = await prisma.user.update({
      where: { id: req.params.id },
      data: { ...req.body, updatedAt: new Date() }
    });
    res.json(user);
  } catch (error) {
    console.error('更新用户失败:', error);
    res.status(500).json({ error: '更新用户失败' });
  }
});

app.delete('/api/users/:id', async (req, res) => {
  try {
    await prisma.user.delete({
      where: { id: req.params.id }
    });
    res.status(204).send();
  } catch (error) {
    console.error('删除用户失败:', error);
    res.status(500).json({ error: '删除用户失败' });
  }
});

// 情绪记录相关API
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
    const emotion = await prisma.emotionRecord.create({
      data: req.body
    });
    res.status(201).json(emotion);
  } catch (error) {
    console.error('创建情绪记录失败:', error);
    res.status(500).json({ error: '创建情绪记录失败' });
  }
});

app.put('/api/emotions/:id', async (req, res) => {
  try {
    const emotion = await prisma.emotionRecord.update({
      where: { id: req.params.id },
      data: req.body
    });
    res.json(emotion);
  } catch (error) {
    console.error('更新情绪记录失败:', error);
    res.status(500).json({ error: '更新情绪记录失败' });
  }
});

app.delete('/api/emotions/:id', async (req, res) => {
  try {
    await prisma.emotionRecord.delete({
      where: { id: req.params.id }
    });
    res.status(204).send();
  } catch (error) {
    console.error('删除情绪记录失败:', error);
    res.status(500).json({ error: '删除情绪记录失败' });
  }
});

// 日记条目相关API
app.get('/api/journal/user/:userId', async (req, res) => {
  try {
    const journalEntries = await prisma.journalEntry.findMany({
      where: { userId: req.params.userId },
      include: { 
        user: true, 
        comments: { include: { user: true } } 
      },
      orderBy: { createdAt: 'desc' }
    });
    res.json(journalEntries);
  } catch (error) {
    console.error('获取日记条目失败:', error);
    res.status(500).json({ error: '获取日记条目失败' });
  }
});

app.get('/api/journal/:id', async (req, res) => {
  try {
    const journalEntry = await prisma.journalEntry.findUnique({
      where: { id: req.params.id },
      include: { 
        user: true, 
        comments: { include: { user: true } } 
      }
    });
    if (!journalEntry) {
      return res.status(404).json({ error: '日记条目不存在' });
    }
    res.json(journalEntry);
  } catch (error) {
    console.error('获取日记详情失败:', error);
    res.status(500).json({ error: '获取日记详情失败' });
  }
});

app.post('/api/journal', async (req, res) => {
  try {
    const journalEntry = await prisma.journalEntry.create({
      data: req.body
    });
    res.status(201).json(journalEntry);
  } catch (error) {
    console.error('创建日记条目失败:', error);
    res.status(500).json({ error: '创建日记条目失败' });
  }
});

app.put('/api/journal/:id', async (req, res) => {
  try {
    const journalEntry = await prisma.journalEntry.update({
      where: { id: req.params.id },
      data: { ...req.body, updatedAt: new Date() }
    });
    res.json(journalEntry);
  } catch (error) {
    console.error('更新日记条目失败:', error);
    res.status(500).json({ error: '更新日记条目失败' });
  }
});

app.delete('/api/journal/:id', async (req, res) => {
  try {
    await prisma.journalEntry.delete({
      where: { id: req.params.id }
    });
    res.status(204).send();
  } catch (error) {
    console.error('删除日记条目失败:', error);
    res.status(500).json({ error: '删除日记条目失败' });
  }
});

// 聊天会话相关API
app.get('/api/chat/user/:userId', async (req, res) => {
  try {
    const chatSessions = await prisma.chatSession.findMany({
      where: { userId: req.params.userId },
      include: { user: true },
      orderBy: { updatedAt: 'desc' }
    });
    res.json(chatSessions);
  } catch (error) {
    console.error('获取聊天会话失败:', error);
    res.status(500).json({ error: '获取聊天会话失败' });
  }
});

app.post('/api/chat', async (req, res) => {
  try {
    const chatSession = await prisma.chatSession.create({
      data: req.body
    });
    res.status(201).json(chatSession);
  } catch (error) {
    console.error('创建聊天会话失败:', error);
    res.status(500).json({ error: '创建聊天会话失败' });
  }
});

app.put('/api/chat/:id', async (req, res) => {
  try {
    const chatSession = await prisma.chatSession.update({
      where: { id: req.params.id },
      data: { ...req.body, updatedAt: new Date() }
    });
    res.json(chatSession);
  } catch (error) {
    console.error('更新聊天会话失败:', error);
    res.status(500).json({ error: '更新聊天会话失败' });
  }
});

// 预约相关API
app.get('/api/appointments/user/:userId', async (req, res) => {
  try {
    const appointments = await prisma.appointment.findMany({
      where: { userId: req.params.userId },
      include: { user: true, counselor: true },
      orderBy: { scheduledDateTime: 'desc' }
    });
    res.json(appointments);
  } catch (error) {
    console.error('获取预约失败:', error);
    res.status(500).json({ error: '获取预约失败' });
  }
});

app.post('/api/appointments', async (req, res) => {
  try {
    const appointment = await prisma.appointment.create({
      data: req.body
    });
    res.status(201).json(appointment);
  } catch (error) {
    console.error('创建预约失败:', error);
    res.status(500).json({ error: '创建预约失败' });
  }
});

app.put('/api/appointments/:id', async (req, res) => {
  try {
    const appointment = await prisma.appointment.update({
      where: { id: req.params.id },
      data: { ...req.body, updatedAt: new Date() }
    });
    res.json(appointment);
  } catch (error) {
    console.error('更新预约失败:', error);
    res.status(500).json({ error: '更新预约失败' });
  }
});

// 系统设置相关API
app.get('/api/settings', async (req, res) => {
  try {
    const settings = await prisma.systemSettings.findMany();
    res.json(settings);
  } catch (error) {
    console.error('获取系统设置失败:', error);
    res.status(500).json({ error: '获取系统设置失败' });
  }
});

app.get('/api/settings/:key', async (req, res) => {
  try {
    const setting = await prisma.systemSettings.findUnique({
      where: { key: req.params.key }
    });
    if (!setting) {
      return res.status(404).json({ error: '设置项不存在' });
    }
    res.json(setting);
  } catch (error) {
    console.error('获取设置项失败:', error);
    res.status(500).json({ error: '获取设置项失败' });
  }
});

app.put('/api/settings/:key', async (req, res) => {
  try {
    const setting = await prisma.systemSettings.upsert({
      where: { key: req.params.key },
      update: { value: req.body.value, updatedAt: new Date() },
      create: { key: req.params.key, value: req.body.value }
    });
    res.json(setting);
  } catch (error) {
    console.error('更新设置项失败:', error);
    res.status(500).json({ error: '更新设置项失败' });
  }
});

// 错误处理中间件
app.use((error, req, res, next) => {
  console.error('服务器错误:', error);
  res.status(500).json({ error: '服务器内部错误' });
});

// 404处理
app.use((req, res) => {
  res.status(404).json({ error: '接口不存在' });
});

// 启动服务器
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`API服务器运行在端口 ${PORT}`);
  console.log(`健康检查: http://localhost:${PORT}/health`);
});

// 优雅关闭
process.on('SIGINT', async () => {
  console.log('正在关闭服务器...');
  await prisma.$disconnect();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  console.log('正在关闭服务器...');
  await prisma.$disconnect();
  process.exit(0);
});