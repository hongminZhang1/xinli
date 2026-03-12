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
      include: { 
        emotionRecords: true, 
        journalEntries: true,
        appointments: true,
        chatSessions: true,
        comments: true 
      }
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
      include: { 
        emotionRecords: true, 
        journalEntries: true,
        appointments: true,
        chatSessions: true,
        comments: true 
      }
    });
    if (!user) return res.status(404).json({ error: '用户不存在' });
    res.json(user);
  } catch (error) {
    console.error('获取用户详情失败:', error);
    res.status(500).json({ error: '获取用户详情失败' });
  }
});

// 新增：按用户名查找用户（用于认证）
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
    const emotion = await prisma.emotionRecord.create({ data: req.body });
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

// 获取日记列表（支持公开/按用户筛选+分页）
app.get('/api/journals', async (req, res) => {
  try {
    const { type, page = '1', pageSize = '20', userId } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(pageSize);
    const take = parseInt(pageSize);

    let where = {};
    if (type === 'public') {
      where = { isPrivate: false };
    } else if (userId) {
      where = { userId };
    }

    const journals = await prisma.journalEntry.findMany({
      where,
      include: {
        user: true,
        comments: { include: { user: true } }
      },
      orderBy: { createdAt: 'desc' },
      skip,
      take
    });
    res.json(journals);
  } catch (error) {
    console.error('获取日记列表失败:', error);
    res.status(500).json({ error: '获取日记列表失败' });
  }
});

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

// 点赞相关API
app.post('/api/journal/:id/like', async (req, res) => {
  try {
    const { userId } = req.body;
    const { id: journalId } = req.params;

    if (!userId) {
      return res.status(401).json({ error: '请先登录' });
    }

    const likeKey = `like_${journalId}_${userId}`;
    // 使用 SystemSettings 作为一个简单的 Key-Value 存储来记录点赞，避免修改 Schema
    const existingLike = await prisma.systemSettings.findUnique({
      where: { key: likeKey }
    });

    if (existingLike) {
      return res.status(400).json({ error: '你已经点过赞了' });
    }

    // 记录点赞，并增加点赞数
    await prisma.$transaction([
      prisma.systemSettings.create({
        data: {
          key: likeKey,
          value: 'true',
          description: 'User like record'
        }
      }),
      prisma.journalEntry.update({
        where: { id: journalId },
        data: {
          likes: { increment: 1 }
        }
      })
    ]);

    const updatedJournal = await prisma.journalEntry.findUnique({
      where: { id: journalId }
    });

    res.json({ success: true, message: '点赞成功', likes: updatedJournal.likes });
  } catch (error) {
    console.error('点赞失败:', error);
    res.status(500).json({ error: '点赞失败' });
  }
});

app.get('/api/users/:userId/likes', async (req, res) => {
  try {
    const { userId } = req.params;
    
    // 取出所有的 likes 进行过滤
    const allLikes = await prisma.systemSettings.findMany({
      where: {
        key: { startsWith: 'like_' }
      }
    });
    
    // key 格式是 like_journalId_userId
    const userLikes = allLikes.filter(item => item.key.endsWith(`_${userId}`));

    const likedJournalIds = userLikes.map(l => {
        const parts = l.key.split('_');
        return parts[1]; 
    });

    res.json(likedJournalIds);
  } catch (error) {
    console.error('获取用户点赞列表失败:', error);
    res.status(500).json({ error: '获取失败' });
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

// 评论相关API
app.get('/api/comments/journal/:journalId', async (req, res) => {
  try {
    const comments = await prisma.comment.findMany({
      where: { journalEntryId: req.params.journalId },
      include: {
        user: { select: { id: true, username: true, name: true, avatar: true } }
      },
      orderBy: { createdAt: 'desc' }
    });
    res.json(comments);
  } catch (error) {
    console.error('获取评论失败:', error);
    res.status(500).json({ error: '获取评论失败' });
  }
});

app.post('/api/comments', async (req, res) => {
  try {
    const { content, userId, journalEntryId } = req.body;
    const comment = await prisma.comment.create({
      data: { content, userId, journalEntryId },
      include: {
        user: { select: { id: true, username: true, name: true, avatar: true } }
      }
    });
    res.status(201).json(comment);
  } catch (error) {
    console.error('创建评论失败:', error);
    res.status(500).json({ error: '创建评论失败' });
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

// 咨询师聊天：获取或创建会话及历史消息（复用 ChatSession 表）
app.get('/api/counselors/:counselorId/chat', async (req, res) => {
  try {
    const { counselorId } = req.params;
    const { userId } = req.query;
    if (!userId) return res.status(400).json({ error: 'userId 不能为空' });

    const sessionTitle = `counselor:${counselorId}`;
    let session = await prisma.chatSession.findFirst({
      where: { userId, title: sessionTitle },
    });

    if (!session) {
      session = await prisma.chatSession.create({
        data: { userId, title: sessionTitle, messages: [] },
      });
      return res.json([]);
    }

    const messages = Array.isArray(session.messages) ? session.messages : [];
    res.json(messages);
  } catch (error) {
    console.error('获取聊天记录失败:', error);
    res.status(500).json({ error: '获取聊天记录失败' });
  }
});

// 咨询师聊天：发送消息（用户或咨询师均可调用，senderType 区分）
app.post('/api/counselors/:counselorId/chat', async (req, res) => {
  try {
    const { counselorId } = req.params;
    const { userId, content, senderType = 'USER', senderId } = req.body;
    if (!userId || !content?.trim()) {
      return res.status(400).json({ error: '参数不完整' });
    }

    const sessionTitle = `counselor:${counselorId}`;
    let session = await prisma.chatSession.findFirst({
      where: { userId, title: sessionTitle },
    });

    if (!session) {
      session = await prisma.chatSession.create({
        data: { userId, title: sessionTitle, messages: [] },
      });
    }

    const existingMessages = Array.isArray(session.messages) ? session.messages : [];
    const newMessage = {
      id: `msg-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      senderType,
      senderId: senderId || userId,
      content: content.trim(),
      createdAt: new Date().toISOString(),
    };
    const updatedMessages = [...existingMessages, newMessage];

    await prisma.chatSession.update({
      where: { id: session.id },
      data: { messages: updatedMessages, updatedAt: new Date() },
    });

    res.status(201).json(newMessage);
  } catch (error) {
    console.error('发送消息失败:', error);
    res.status(500).json({ error: '发送消息失败' });
  }
});

// 咨询师收件箱：列出所有向该咨询师发过消息的用户
app.get('/api/counselors/:counselorId/sessions', async (req, res) => {
  try {
    const { counselorId } = req.params;
    const sessionTitle = `counselor:${counselorId}`;

    const sessions = await prisma.chatSession.findMany({
      where: { title: sessionTitle },
      include: {
        user: { select: { id: true, name: true, username: true, avatar: true } },
      },
      orderBy: { updatedAt: 'desc' },
    });

    const result = sessions.map(s => {
      const msgs = Array.isArray(s.messages) ? s.messages : [];
      const last = msgs.length > 0 ? msgs[msgs.length - 1] : null;
      return {
        userId: s.userId,
        userName: s.user.name || s.user.username,
        userAvatar: s.user.avatar,
        lastMessage: last ? last.content : null,
        lastMessageAt: last ? last.createdAt : s.updatedAt,
        unreadCount: msgs.filter(m => m.senderType === 'USER').length,
      };
    });

    res.json(result);
  } catch (error) {
    console.error('获取咨询会话列表失败:', error);
    res.status(500).json({ error: '获取咨询会话列表失败' });
  }
});

// 咨询师列表API（获取所有角色为COUNSELOR且激活的用户）
app.get('/api/counselors', async (req, res) => {
  try {
    const counselors = await prisma.user.findMany({
      where: {
        role: 'COUNSELOR',
        isActive: true,
      },
      select: {
        id: true,
        name: true,
        username: true,
        avatar: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    const bios = [
      '每一段经历都有其意义，我在这里陪你一起探索内心世界。',
      '用专业与温情，帮助你找到内心的力量与平静。',
      '相信每个人都有自我疗愈的能力，我愿意做你前行路上的陪伴者。',
      '无论你正在经历什么，我都愿意用心倾听，陪你走过。',
      '心理健康是生活幸福的基石，让我们一起守护你的内心花园。',
      '每一次对话都是一次成长，我很荣幸能成为你信任的倾听者。',
      '在这里，你可以放下防备，我们一起面对内心深处的困惑与恐惧。',
      '改变从被理解开始，让我们共同开启这段疗愈之旅。',
    ];

    const formattedCounselors = counselors.map((user, index) => ({
      id: user.id,
      name: user.name || user.username,
      avatar: user.avatar,
      specialties: ['心理疏导', '情绪疗愈', '青少年心理'],
      bio: bios[index % bios.length],
    }));

    res.json(formattedCounselors);
  } catch (error) {
    console.error('获取咨询师列表失败:', error);
    res.status(500).json({ error: '获取咨询师列表失败' });
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

process.on('SIGTERM', async () => {
  console.log('正在关闭服务器...');
  await prisma.$disconnect();
  process.exit(0);
});