/**
 * 数据库适配器
 * 支持在直接数据库访问和API代理访问之间切换
 */
import { prisma } from './db';
import { dbApi } from './api-client';

// 数据访问模式
type DataAccessMode = 'direct' | 'api';

// 从环境变量读取访问模式
const DATA_ACCESS_MODE: DataAccessMode = (process.env.NEXT_PUBLIC_DATA_ACCESS_MODE as DataAccessMode) || 'direct';

interface DbAdapter {
  // 用户操作
  user: {
    findMany: (where?: any) => Promise<any[]>;
    findUnique: (where: { id: string }) => Promise<any | null>;
    create: (data: any) => Promise<any>;
    update: (where: { id: string }, data: any) => Promise<any>;
    delete: (where: { id: string }) => Promise<any>;
  };
  
  // 情绪记录操作
  emotionRecord: {
    findMany: (where?: any) => Promise<any[]>;
    create: (data: any) => Promise<any>;
    update: (where: { id: string }, data: any) => Promise<any>;
    delete: (where: { id: string }) => Promise<any>;
  };
  
  // 日记条目操作
  journalEntry: {
    findMany: (where?: any) => Promise<any[]>;
    findUnique: (where: { id: string }) => Promise<any | null>;
    create: (data: any) => Promise<any>;
    update: (where: { id: string }, data: any) => Promise<any>;
    delete: (where: { id: string }) => Promise<any>;
  };
  
  // 聊天会话操作
  chatSession: {
    findMany: (where?: any) => Promise<any[]>;
    create: (data: any) => Promise<any>;
    update: (where: { id: string }, data: any) => Promise<any>;
  };
  
  // 预约操作
  appointment: {
    findMany: (where?: any) => Promise<any[]>;
    create: (data: any) => Promise<any>;
    update: (where: { id: string }, data: any) => Promise<any>;
  };
  
  // 系统设置操作
  systemSettings: {
    findMany: () => Promise<any[]>;
    findUnique: (where: { key: string }) => Promise<any | null>;
    upsert: (where: { key: string }, update: any, create: any) => Promise<any>;
  };
}

// 直接数据库访问实现
const directDbAdapter: DbAdapter = {
  user: {
    findMany: (where) => prisma.user.findMany({ where }),
    findUnique: (where) => prisma.user.findUnique({ where }),
    create: (data) => prisma.user.create({ data }),
    update: (where, data) => prisma.user.update({ where, data: { ...data, updatedAt: new Date() } }),
    delete: (where) => prisma.user.delete({ where }),
  },
  
  emotionRecord: {
    findMany: (where) => prisma.emotionRecord.findMany({ where, include: { user: true } }),
    create: (data) => prisma.emotionRecord.create({ data }),
    update: (where, data) => prisma.emotionRecord.update({ where, data }),
    delete: (where) => prisma.emotionRecord.delete({ where }),
  },
  
  journalEntry: {
    findMany: (where) => prisma.journalEntry.findMany({ 
      where, 
      include: { user: true, comments: { include: { user: true } } } 
    }),
    findUnique: (where) => prisma.journalEntry.findUnique({ 
      where, 
      include: { user: true, comments: { include: { user: true } } } 
    }),
    create: (data) => prisma.journalEntry.create({ data }),
    update: (where, data) => prisma.journalEntry.update({ where, data: { ...data, updatedAt: new Date() } }),
    delete: (where) => prisma.journalEntry.delete({ where }),
  },
  
  chatSession: {
    findMany: (where) => prisma.chatSession.findMany({ where, include: { user: true } }),
    create: (data) => prisma.chatSession.create({ data }),
    update: (where, data) => prisma.chatSession.update({ where, data: { ...data, updatedAt: new Date() } }),
  },
  
  appointment: {
    findMany: (where) => prisma.appointment.findMany({ 
      where, 
      include: { user: true, counselor: true } 
    }),
    create: (data) => prisma.appointment.create({ data }),
    update: (where, data) => prisma.appointment.update({ where, data: { ...data, updatedAt: new Date() } }),
  },
  
  systemSettings: {
    findMany: () => prisma.systemSettings.findMany(),
    findUnique: (where) => prisma.systemSettings.findUnique({ where }),
    upsert: (where, update, create) => prisma.systemSettings.upsert({ where, update, create }),
  },
};

// API访问实现
const apiDbAdapter: DbAdapter = {
  user: {
    findMany: async (where) => {
      if (where?.id) {
        const user = await dbApi.users.getById(where.id);
        return user ? [user] : [];
      }
      return dbApi.users.getAll();
    },
    findUnique: (where) => dbApi.users.getById(where.id),
    create: (data) => dbApi.users.create(data),
    update: (where, data) => dbApi.users.update(where.id, data),
    delete: (where) => dbApi.users.delete(where.id),
  },
  
  emotionRecord: {
    findMany: async (where) => {
      if (where?.userId) {
        return dbApi.emotions.getByUserId(where.userId);
      }
      // 如果没有指定userId，可能需要在API端实现获取所有情绪记录的接口
      throw new Error('API模式下必须指定userId来获取情绪记录');
    },
    create: (data) => dbApi.emotions.create(data),
    update: (where, data) => dbApi.emotions.update(where.id, data),
    delete: (where) => dbApi.emotions.delete(where.id),
  },
  
  journalEntry: {
    findMany: async (where) => {
      if (where?.userId) {
        return dbApi.journal.getByUserId(where.userId);
      }
      throw new Error('API模式下必须指定userId来获取日记条目');
    },
    findUnique: (where) => dbApi.journal.getById(where.id),
    create: (data) => dbApi.journal.create(data),
    update: (where, data) => dbApi.journal.update(where.id, data),
    delete: (where) => dbApi.journal.delete(where.id),
  },
  
  chatSession: {
    findMany: async (where) => {
      if (where?.userId) {
        return dbApi.chat.getByUserId(where.userId);
      }
      throw new Error('API模式下必须指定userId来获取聊天会话');
    },
    create: (data) => dbApi.chat.create(data),
    update: (where, data) => dbApi.chat.update(where.id, data),
  },
  
  appointment: {
    findMany: async (where) => {
      if (where?.userId) {
        return dbApi.appointments.getByUserId(where.userId);
      }
      throw new Error('API模式下必须指定userId来获取预约');
    },
    create: (data) => dbApi.appointments.create(data),
    update: (where, data) => dbApi.appointments.update(where.id, data),
  },
  
  systemSettings: {
    findMany: () => dbApi.settings.getAll(),
    findUnique: async (where) => {
      try {
        return await dbApi.settings.getByKey(where.key);
      } catch {
        return null;
      }
    },
    upsert: async (where, update, create) => {
      try {
        return await dbApi.settings.update(where.key, update.value);
      } catch {
        // 如果更新失败，说明记录不存在，创建新记录
        return await dbApi.settings.update(where.key, create.value);
      }
    },
  },
};

// 根据配置选择适配器
export const db: DbAdapter = DATA_ACCESS_MODE === 'api' ? apiDbAdapter : directDbAdapter;

// 导出当前使用的数据访问模式
export const currentDataAccessMode = DATA_ACCESS_MODE;

// 用于检查是否使用API模式
export const isApiMode = () => DATA_ACCESS_MODE === 'api';