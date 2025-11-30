const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const { PrismaClient } = require('@prisma/client');

const app = express();
const prisma = new PrismaClient();
const port = 3001;

// 中间件
app.use(cors({
  origin: '*',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json({ limit: '10mb' }));

// 健康检查
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'API服务器运行正常', timestamp: new Date().toISOString() });
});

// 用户相关API
app.get('/api/users', async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (error) {
    console.error('获取用户列表错误:', error);
    res.status(500).json({ error: '服务器内部错误' });
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
    const { id } = req.params;
    const user = await prisma.user.findUnique({
      where: { id }
    });

    if (!user) {
      return res.status(404).json({ error: '用户不存在' });
    }

    res.json(user);
  } catch (error) {
    console.error('获取用户错误:', error);
    res.status(500).json({ error: '服务器内部错误' });
  }
});

app.post('/api/users', async (req, res) => {
  try {
    const user = await prisma.user.create({
      data: req.body
    });
    res.status(201).json(user);
  } catch (error) {
    console.error('创建用户错误:', error);
    res.status(500).json({ error: '服务器内部错误' });
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
    const { id } = req.params;
    const user = await prisma.user.update({
      where: { id },
      data: req.body
    });
    res.json(user);
  } catch (error) {
    console.error('更新用户错误:', error);
    res.status(500).json({ error: '服务器内部错误' });
  }
});

app.delete('/api/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.user.delete({
      where: { id }
    });
    res.json({ message: '用户删除成功' });
  } catch (error) {
    console.error('删除用户错误:', error);
    res.status(500).json({ error: '服务器内部错误' });
  }
});

// 情绪记录API - 使用正确的模型名 EmotionRecord
app.get('/api/emotions', async (req, res) => {
  try {
    const { userId } = req.query;
    
    let whereClause = {};
    if (userId) {
      whereClause.userId = userId;
    }
    
    const emotions = await prisma.emotionRecord.findMany({
      where: whereClause,
      include: {
        user: {
          select: {
            id: true,
            username: true,
            name: true,
            avatar: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
    res.json(emotions);
  } catch (error) {
    console.error('获取情绪记录错误:', error);
    res.status(500).json({ error: '服务器内部错误' });
  }
});

app.get('/api/emotions/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const emotion = await prisma.emotionRecord.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            email: true
          }
        }
      }
    });

    if (!emotion) {
      return res.status(404).json({ error: '情绪记录不存在' });
    }

    res.json(emotion);
  } catch (error) {
    console.error('获取情绪记录错误:', error);
    res.status(500).json({ error: '服务器内部错误' });
  }
});

app.post('/api/emotions', async (req, res) => {
  try {
    const emotion = await prisma.emotionRecord.create({
      data: req.body
    });
    res.status(201).json(emotion);
  } catch (error) {
    console.error('创建情绪记录错误:', error);
    res.status(500).json({ error: '服务器内部错误' });
  }
});

app.put('/api/emotions/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const emotion = await prisma.emotionRecord.update({
      where: { id },
      data: req.body
    });
    res.json(emotion);
  } catch (error) {
    console.error('更新情绪记录错误:', error);
    res.status(500).json({ error: '服务器内部错误' });
  }
});

app.delete('/api/emotions/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.emotionRecord.delete({
      where: { id }
    });
    res.json({ message: '情绪记录删除成功' });
  } catch (error) {
    console.error('删除情绪记录错误:', error);
    res.status(500).json({ error: '服务器内部错误' });
  }
});

// 日记API - 使用正确的模型名 JournalEntry
app.get('/api/journals', async (req, res) => {
  try {
    const { public: isPublic, userId } = req.query;
    
    let whereClause = {};
    if (isPublic === 'true') {
      // 只获取公开的日记
      whereClause.isPrivate = false;
    }
    if (userId) {
      whereClause.userId = userId;
    }
    
    const journals = await prisma.journalEntry.findMany({
      where: whereClause,
      include: {
        user: {
          select: {
            id: true,
            username: true,
            name: true,
            avatar: true
          }
        },
        comments: {
          include: {
            user: {
              select: {
                id: true,
                username: true,
                name: true,
                avatar: true
              }
            }
          },
          orderBy: {
            createdAt: 'desc'
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
    res.json(journals);
  } catch (error) {
    console.error('获取日记列表错误:', error);
    res.status(500).json({ error: '服务器内部错误' });
  }
});

app.get('/api/journals/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const journal = await prisma.journalEntry.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            name: true,
            avatar: true
          }
        },
        comments: {
          include: {
            user: {
              select: {
                id: true,
                username: true,
                name: true,
                avatar: true
              }
            }
          },
          orderBy: {
            createdAt: 'desc'
          }
        }
      }
    });

    if (!journal) {
      return res.status(404).json({ error: '日记不存在' });
    }

    res.json(journal);
  } catch (error) {
    console.error('获取日记错误:', error);
    res.status(500).json({ error: '服务器内部错误' });
  }
});

// 兼容性路由 - 支持单数形式的journal路由
app.get('/api/journal/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const journal = await prisma.journalEntry.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            name: true,
            avatar: true
          }
        },
        comments: {
          include: {
            user: {
              select: {
                id: true,
                username: true,
                name: true,
                avatar: true
              }
            }
          },
          orderBy: {
            createdAt: 'desc'
          }
        }
      }
    });

    if (!journal) {
      return res.status(404).json({ error: '日记不存在' });
    }

    res.json(journal);
  } catch (error) {
    console.error('获取日记错误:', error);
    res.status(500).json({ error: '服务器内部错误' });
  }
});

app.post('/api/journal', async (req, res) => {
  try {
    const journal = await prisma.journalEntry.create({
      data: req.body
    });
    res.status(201).json(journal);
  } catch (error) {
    console.error('创建日记错误:', error);
    res.status(500).json({ error: '服务器内部错误' });
  }
});

app.put('/api/journal/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const journal = await prisma.journalEntry.update({
      where: { id },
      data: req.body
    });
    res.json(journal);
  } catch (error) {
    console.error('更新日记错误:', error);
    res.status(500).json({ error: '服务器内部错误' });
  }
});

app.delete('/api/journal/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.journalEntry.delete({
      where: { id }
    });
    res.json({ message: '日记删除成功' });
  } catch (error) {
    console.error('删除日记错误:', error);
    res.status(500).json({ error: '服务器内部错误' });
  }
});

app.put('/api/journals/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const journal = await prisma.journalEntry.update({
      where: { id },
      data: req.body
    });
    res.json(journal);
  } catch (error) {
    console.error('更新日记错误:', error);
    res.status(500).json({ error: '服务器内部错误' });
  }
});

app.delete('/api/journals/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.journalEntry.delete({
      where: { id }
    });
    res.json({ message: '日记删除成功' });
  } catch (error) {
    console.error('删除日记错误:', error);
    res.status(500).json({ error: '服务器内部错误' });
  }
});

// 评论API
app.get('/api/comments', async (req, res) => {
  try {
    const { journalEntryId } = req.query;
    const whereClause = journalEntryId ? { journalEntryId } : {};
    
    const comments = await prisma.comment.findMany({
      where: whereClause,
      include: {
        user: {
          select: {
            id: true,
            username: true,
            email: true,
            name: true,
            avatar: true
          }
        },
        journalEntry: {
          select: {
            id: true,
            title: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
    res.json(comments);
  } catch (error) {
    console.error('获取评论列表错误:', error);
    res.status(500).json({ error: '服务器内部错误' });
  }
});

app.post('/api/comments', async (req, res) => {
  try {
    // 验证必需字段
    const { content, userId, journalEntryId } = req.body;
    if (!content || !userId || !journalEntryId) {
      return res.status(400).json({ error: '缺少必需字段' });
    }
    
    // 验证用户是否存在
    const userExists = await prisma.user.findUnique({
      where: { id: userId }
    });
    if (!userExists) {
      return res.status(404).json({ error: '用户不存在' });
    }
    
    // 验证日记是否存在
    const journalExists = await prisma.journalEntry.findUnique({
      where: { id: journalEntryId }
    });
    if (!journalExists) {
      return res.status(404).json({ error: '日记不存在' });
    }
    
    const comment = await prisma.comment.create({
      data: {
        content,
        userId,
        journalEntryId
      },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            email: true,
            name: true,
            avatar: true
          }
        },
        journalEntry: {
          select: {
            id: true,
            title: true
          }
        }
      }
    });
    res.status(201).json(comment);
  } catch (error) {
    console.error('创建评论错误:', error);
    res.status(500).json({ error: '服务器内部错误', details: error.message });
  }
});

// 系统设置API - 使用正确的模型名 SystemSettings
app.get('/api/settings', async (req, res) => {
  try {
    const settings = await prisma.systemSettings.findMany();
    res.json(settings);
  } catch (error) {
    console.error('获取系统设置错误:', error);
    res.status(500).json({ error: '服务器内部错误' });
  }
});

app.get('/api/settings/:key', async (req, res) => {
  try {
    const { key } = req.params;
    const setting = await prisma.systemSettings.findUnique({
      where: { key }
    });

    if (!setting) {
      return res.status(404).json({ error: '设置项不存在' });
    }

    res.json(setting);
  } catch (error) {
    console.error('获取设置项错误:', error);
    res.status(500).json({ error: '服务器内部错误' });
  }
});

app.post('/api/settings', async (req, res) => {
  try {
    const setting = await prisma.systemSettings.create({
      data: req.body
    });
    res.status(201).json(setting);
  } catch (error) {
    console.error('创建设置项错误:', error);
    res.status(500).json({ error: '服务器内部错误' });
  }
});

app.put('/api/settings/:key', async (req, res) => {
  try {
    const { key } = req.params;
    const setting = await prisma.systemSettings.upsert({
      where: { key },
      create: { key, ...req.body },
      update: req.body
    });
    res.json(setting);
  } catch (error) {
    console.error('更新设置项错误:', error);
    res.status(500).json({ error: '服务器内部错误' });
  }
});

app.delete('/api/settings/:key', async (req, res) => {
  try {
    const { key } = req.params;
    await prisma.systemSettings.delete({
      where: { key }
    });
    res.json({ message: '设置项删除成功' });
  } catch (error) {
    console.error('删除设置项错误:', error);
    res.status(500).json({ error: '服务器内部错误' });
  }
});

// 启动服务器
app.listen(port, '0.0.0.0', () => {
  console.log(`API服务器运行在 http://0.0.0.0:${port}`);
  console.log('健康检查: http://0.0.0.0:' + port + '/health');
});

// 优雅关闭
process.on('SIGTERM', async () => {
  console.log('接收到SIGTERM信号，正在关闭服务器...');
  await prisma.$disconnect();
  process.exit(0);
});

process.on('SIGINT', async () => {
  console.log('接收到SIGINT信号，正在关闭服务器...');
  await prisma.$disconnect();
  process.exit(0);
});