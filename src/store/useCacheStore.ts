import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// 缓存项的接口
interface CacheItem<T = any> {
  data: T;
  timestamp: number;
  expiry?: number; // TTL in milliseconds
  refetchInterval?: number; // 自动刷新间隔
}

// 缓存状态接口
interface CacheState {
  cache: Map<string, CacheItem>;
  
  // 基础缓存操作
  setCache: <T>(key: string, data: T, expiry?: number, refetchInterval?: number) => void;
  getCache: <T>(key: string) => T | null;
  getCacheItem: <T>(key: string) => (CacheItem<T> & { isExpired: boolean }) | null;
  hasCache: (key: string) => boolean;
  invalidateCache: (key: string) => void;
  clearCache: () => void;
  
  // 模式匹配清除缓存
  invalidatePattern: (pattern: string) => void;
  
  // 获取所有缓存键
  getCacheKeys: () => string[];
  
  // 清理过期缓存
  cleanExpiredCache: () => void;
}

// 默认TTL: 5分钟
const DEFAULT_TTL = 5 * 60 * 1000;

// 不同数据类型的缓存时间配置（毫秒）
export const CACHE_TTL = {
  ARTICLES: 2 * 60 * 1000,      // 文章列表: 2分钟
  ARTICLE_DETAIL: 5 * 60 * 1000, // 文章详情: 5分钟
  COMMENTS: 3 * 60 * 1000,       // 评论: 3分钟
  EMOTIONS: 5 * 60 * 1000,       // 情绪记录: 5分钟
  USERS: 10 * 60 * 1000,         // 用户列表: 10分钟
  SETTINGS: 15 * 60 * 1000,      // 系统设置: 15分钟
  DEFAULT: DEFAULT_TTL,          // 默认: 5分钟
};

export const useCacheStore = create<CacheState>((set, get) => ({
  cache: new Map(),

  setCache: <T>(key: string, data: T, expiry?: number, refetchInterval?: number) => {
    const now = Date.now();
    const cacheItem: CacheItem<T> = {
      data,
      timestamp: now,
      expiry: expiry ? now + expiry : now + DEFAULT_TTL,
      refetchInterval
    };
    
    set((state) => {
      const newCache = new Map(state.cache);
      newCache.set(key, cacheItem);
      return { cache: newCache };
    });
  },

  getCache: <T>(key: string): T | null => {
    const { cache } = get();
    const item = cache.get(key) as CacheItem<T> | undefined;
    
    if (!item) return null;
    
    const now = Date.now();
    
    // 检查是否过期
    if (item.expiry && now > item.expiry) {
      // 清除过期项
      set((state) => {
        const newCache = new Map(state.cache);
        newCache.delete(key);
        return { cache: newCache };
      });
      return null;
    }
    
    return item.data;
  },

  getCacheItem: <T>(key: string) => {
    const { cache } = get();
    const item = cache.get(key) as CacheItem<T> | undefined;
    
    if (!item) return null;
    
    const now = Date.now();
    const isExpired = item.expiry ? now > item.expiry : false;
    
    return {
      ...item,
      isExpired
    };
  },

  hasCache: (key: string) => {
    const data = get().getCache(key);
    return data !== null;
  },

  invalidateCache: (key: string) => {
    set((state) => {
      const newCache = new Map(state.cache);
      newCache.delete(key);
      return { cache: newCache };
    });
  },

  clearCache: () => {
    set({ cache: new Map() });
  },

  invalidatePattern: (pattern: string) => {
    set((state) => {
      const newCache = new Map(state.cache);
      const regex = new RegExp(pattern);
      
      for (const key of newCache.keys()) {
        if (regex.test(key)) {
          newCache.delete(key);
        }
      }
      
      return { cache: newCache };
    });
  },

  getCacheKeys: () => {
    const { cache } = get();
    return Array.from(cache.keys());
  },
  
  cleanExpiredCache: () => {
    set((state) => {
      const newCache = new Map(state.cache);
      const now = Date.now();
      
      for (const [key, item] of newCache.entries()) {
        if (item.expiry && now > item.expiry) {
          newCache.delete(key);
        }
      }
      
      return { cache: newCache };
    });
  }
}));