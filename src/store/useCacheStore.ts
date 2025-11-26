import { create } from 'zustand';

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
}

// 默认TTL: 5分钟
const DEFAULT_TTL = 5 * 60 * 1000;

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
  }
}));