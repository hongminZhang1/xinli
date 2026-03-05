import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

// 缓存项的接口
interface CacheItem<T = any> {
  data: T;
  timestamp: number;
  expiry?: number; // TTL in milliseconds
  refetchInterval?: number; // 自动刷新间隔
}

// 缓存状态接口
interface CacheState {
  cache: Record<string, CacheItem>;
  
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

export const useCacheStore = create<CacheState>()(
  persist(
    (set, get) => ({
      cache: {},

      setCache: <T>(key: string, data: T, expiry?: number, refetchInterval?: number) => {
        const now = Date.now();
        const cacheItem: CacheItem<T> = {
          data,
          timestamp: now,
          expiry: expiry ? now + expiry : now + DEFAULT_TTL,
          refetchInterval,
        };
        set((state) => ({ cache: { ...state.cache, [key]: cacheItem } }));
      },

      getCache: <T>(key: string): T | null => {
        const { cache } = get();
        const item = cache[key] as CacheItem<T> | undefined;
        if (!item) return null;
        const now = Date.now();
        if (item.expiry && now > item.expiry) {
          set((state) => {
            const newCache = { ...state.cache };
            delete newCache[key];
            return { cache: newCache };
          });
          return null;
        }
        return item.data;
      },

      getCacheItem: <T>(key: string) => {
        const { cache } = get();
        const item = cache[key] as CacheItem<T> | undefined;
        if (!item) return null;
        const now = Date.now();
        const isExpired = item.expiry ? now > item.expiry : false;
        return { ...item, isExpired };
      },

      hasCache: (key: string) => {
        return get().getCache(key) !== null;
      },

      invalidateCache: (key: string) => {
        set((state) => {
          const newCache = { ...state.cache };
          delete newCache[key];
          return { cache: newCache };
        });
      },

      clearCache: () => {
        set({ cache: {} });
      },

      invalidatePattern: (pattern: string) => {
        set((state) => {
          const regex = new RegExp(pattern);
          const newCache = Object.fromEntries(
            Object.entries(state.cache).filter(([key]) => !regex.test(key))
          );
          return { cache: newCache };
        });
      },

      getCacheKeys: () => {
        return Object.keys(get().cache);
      },

      cleanExpiredCache: () => {
        set((state) => {
          const now = Date.now();
          const newCache = Object.fromEntries(
            Object.entries(state.cache).filter(([, item]) => !item.expiry || now <= item.expiry)
          );
          return { cache: newCache };
        });
      },
    }),
    {
      name: 'xinli-cache',
      storage: createJSONStorage(() => localStorage),
      // 只持久化未过期的缓存项，避免 localStorage 存储过多
      partialize: (state) => ({
        cache: Object.fromEntries(
          Object.entries(state.cache).filter(([, item]) => !item.expiry || Date.now() < item.expiry)
        ),
      }),
    }
  )
);