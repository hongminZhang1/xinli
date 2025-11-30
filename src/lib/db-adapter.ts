/**
 * 数据库适配器
 * 完全使用API访问，摒弃直接数据库连接
 */
import { dbApi } from './api-client';
import { getApiBaseUrl } from './env-config';

// 数据访问模式
type DataAccessMode = 'api';

// 强制使用API模式
const DATA_ACCESS_MODE: DataAccessMode = 'api';

interface DbAdapter {
  // 用户操作
  user: {
    findMany: (where?: any) => Promise<any[]>;
    findUnique: (where: { id?: string; username?: string }) => Promise<any | null>;
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

// API访问实现（唯一实现）
const apiDbAdapter: DbAdapter = {
  user: {
    findMany: async (where) => {
      if (where?.id) {
        const user = await dbApi.users.getById(where.id);
        return user ? [user] : [];
      }
      return dbApi.users.getAll();
    },
    findUnique: async (where) => {
      console.log('🔍 用户查找:', where, 'API Base URL:', getApiBaseUrl());
      try {
        if (where.id) {
          return await dbApi.users.getById(where.id);
        } else if (where.username) {
          return await dbApi.users.getByUsername(where.username);
        }
        return null;
      } catch (error) {
        console.error('❌ 用户查找失败:', error);
        return null;
      }
    },
    create: (data) => dbApi.users.create(data),
    update: (where, data) => dbApi.users.update(where.id, data),
    delete: (where) => dbApi.users.delete(where.id),
  },
  
  emotionRecord: {
    findMany: async (where) => {
      // 获取所有情绪记录，然后在客户端过滤
      const allEmotions = await dbApi.emotions.getAll();
      if (where?.userId) {
        return allEmotions.filter((emotion: any) => emotion.userId === where.userId);
      }
      return allEmotions;
    },
    create: (data) => dbApi.emotions.create(data),
    update: (where, data) => dbApi.emotions.update(where.id, data),
    delete: (where) => dbApi.emotions.delete(where.id),
  },
  
  journalEntry: {
    findMany: async (where) => {
      // 获取所有日记，然后在客户端过滤
      const allJournals = await dbApi.journals.getAll();
      if (where?.userId) {
        return allJournals.filter((journal: any) => journal.userId === where.userId);
      }
      return allJournals;
    },
    findUnique: (where) => dbApi.journals.getById(where.id),
    create: (data) => dbApi.journals.create(data),
    update: (where, data) => dbApi.journals.update(where.id, data),
    delete: (where) => dbApi.journals.delete(where.id),
  },
  
  chatSession: {
    findMany: async (where) => {
      if (where?.userId) {
        return dbApi.chat.getByUserId(where.userId);
      }
      return [];
    },
    create: (data) => dbApi.chat.create(data),
    update: (where, data) => dbApi.chat.update(where.id, data),
  },
  
  appointment: {
    findMany: async (where) => {
      if (where?.userId) {
        return dbApi.appointments.getByUserId(where.userId);
      }
      return [];
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

// 只使用API访问
export const db: DbAdapter = apiDbAdapter;

// 便捷方法适配器 - 提供更简单的API
export const dbAdapter = {
  user: {
    getAll: () => apiDbAdapter.user.findMany(),
    getById: (id: string) => apiDbAdapter.user.findUnique({ id }),
    getByUsername: (username: string) => apiDbAdapter.user.findUnique({ username }),
    create: (data: any) => apiDbAdapter.user.create(data),
    update: (id: string, data: any) => apiDbAdapter.user.update({ id }, data),
    delete: (id: string) => apiDbAdapter.user.delete({ id }),
  },
  
  emotion: {
    getAll: () => dbApi.emotions.getAll(),
    getById: (id: string) => dbApi.emotions.getById(id),
    getByUserId: (userId: string) => apiDbAdapter.emotionRecord.findMany({ userId }),
    create: (data: any) => apiDbAdapter.emotionRecord.create(data),
    update: (id: string, data: any) => apiDbAdapter.emotionRecord.update({ id }, data),
    delete: (id: string) => apiDbAdapter.emotionRecord.delete({ id }),
  },
  
  journal: {
    getAll: async () => {
      // 使用前端API路由，带认证和过滤
      const response = await fetch('/api/journal');
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      return response.json();
    },
    getPublic: async () => {
      // 调用新的公开日记API
      const response = await fetch('/api/journals/public');
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      return response.json();
    },
    getById: (id: string) => apiDbAdapter.journalEntry.findUnique({ id }),
    getByUserId: (userId: string) => apiDbAdapter.journalEntry.findMany({ userId }),
    create: (data: any) => apiDbAdapter.journalEntry.create(data),
    update: (id: string, data: any) => apiDbAdapter.journalEntry.update({ id }, data),
    delete: (id: string) => apiDbAdapter.journalEntry.delete({ id }),
  },
  
  comment: {
    getByJournalId: (journalId: string) => {
      // 暂时返回空数组，因为API服务器还没有这个功能
      return Promise.resolve([]);
    },
    create: (data: any) => Promise.resolve({}),
    update: (id: string, data: any) => Promise.resolve({}),
    delete: (id: string) => Promise.resolve({}),
  },
  
  systemSetting: {
    getAll: () => apiDbAdapter.systemSettings.findMany(),
    getByKey: (key: string) => apiDbAdapter.systemSettings.findUnique({ key }),
    update: (key: string, value: string) => apiDbAdapter.systemSettings.upsert({ key }, { value }, { key, value }),
  },
};

// 导出当前使用的数据访问模式
export const currentDataAccessMode = DATA_ACCESS_MODE;

// 用于检查是否使用API模式
export const isApiMode = () => true;