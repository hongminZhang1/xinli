import { useEffect, useCallback, useRef } from 'react';
import { useCacheStore } from '@/store/useCacheStore';

interface PreloadOptions {
  enabled?: boolean;
  delay?: number; // 延迟执行时间（ms）
  batchSize?: number; // 批处理大小，避免同时发起太多请求
}

/**
 * 预加载数据的自定义hook
 */
export function usePreloadData() {
  const cache = useCacheStore();

  const preloadJournalDetails = useCallback(
    async (
      journalIds: string[], 
      options: PreloadOptions = {}
    ) => {
      const { enabled = true, delay = 100, batchSize = 3 } = options;
      
      if (!enabled || journalIds.length === 0) return;

      const executePreload = async () => {
        // 分批处理，避免同时发起太多请求
        for (let i = 0; i < journalIds.length; i += batchSize) {
          const batch = journalIds.slice(i, i + batchSize);
          
          const batchPromises = batch.map(async (journalId) => {
            const detailCacheKey = `journal-detail-${journalId}`;
            const commentsCacheKey = `journal-comments-${journalId}`;
            
            // 预加载文章详情
            const detailCached = cache.getCacheItem(detailCacheKey);
            if (!detailCached || detailCached.isExpired) {
              try {
                const res = await fetch(`/api/journal/${journalId}`);
                if (res.ok) {
                  const data = await res.json();
                  cache.setCache(detailCacheKey, data, 5 * 60 * 1000);
                }
              } catch (error) {
                // Failed to precache article detail
              }
            }

            // 预加载文章评论
            const commentsCached = cache.getCacheItem(commentsCacheKey);
            if (!commentsCached || commentsCached.isExpired) {
              try {
                const res = await fetch(`/api/journal/${journalId}/comments`);
                if (res.ok) {
                  const data = await res.json();
                  cache.setCache(commentsCacheKey, data, 3 * 60 * 1000);
                }
              } catch (error) {
                // Failed to precache article comments
              }
            }
          });

          // 等待当前批次完成
          await Promise.allSettled(batchPromises);
          
          // 批次间稍作延迟，避免过于密集的请求
          if (i + batchSize < journalIds.length) {
            await new Promise(resolve => setTimeout(resolve, 200));
          }
        }
        
        // Preload completed
      };

      if (delay > 0) {
        const timer = setTimeout(executePreload, delay);
        return () => clearTimeout(timer);
      } else {
        executePreload();
      }
    },
    [cache]
  );

  const preloadEmotionRecords = useCallback(
    async (options: PreloadOptions = {}) => {
      const { enabled = true, delay = 100 } = options;
      
      if (!enabled) return;

      const executePreload = async () => {
        const cacheKey = 'all-emotions';
        const cached = cache.getCacheItem(cacheKey);
        
        if (!cached || cached.isExpired) {
          try {
            const res = await fetch('/api/emotions');
            if (res.ok) {
              const data = await res.json();
              cache.setCache(cacheKey, data, 5 * 60 * 1000);
            }
          } catch (error) {
            // Failed to precache emotion records
          }
        }
      };

      if (delay > 0) {
        const timer = setTimeout(executePreload, delay);
        return () => clearTimeout(timer);
      } else {
        executePreload();
      }
    },
    [cache]
  );

  const preloadAdminData = useCallback(
    async (options: PreloadOptions = {}) => {
      const { enabled = true, delay = 100 } = options;
      
      if (!enabled) return;

      const executePreload = async () => {
        try {
          const usersCacheKey = 'admin-users';
          const usersCached = cache.getCacheItem(usersCacheKey);
          if (!usersCached || usersCached.isExpired) {
            const usersRes = await fetch('/api/admin/users');
            if (usersRes.ok) {
              const usersData = await usersRes.json();
              cache.setCache(usersCacheKey, usersData, 10 * 60 * 1000);
            }
          }

          const settingsCacheKey = 'admin-settings';
          const settingsCached = cache.getCacheItem(settingsCacheKey);
          if (!settingsCached || settingsCached.isExpired) {
            const settingsRes = await fetch('/api/admin/settings');
            if (settingsRes.ok) {
              const settingsData = await settingsRes.json();
              cache.setCache(settingsCacheKey, settingsData, 15 * 60 * 1000);
            }
          }
        } catch (error) {
          // Admin data preload failed
        }
      };

      if (delay > 0) {
        const timer = setTimeout(executePreload, delay);
        return () => clearTimeout(timer);
      } else {
        executePreload();
      }
    },
    [cache]
  );

  return {
    preloadJournalDetails,
    preloadEmotionRecords,
    preloadAdminData
  };
}

/**
 * 自动预加载文章详情的hook
 * 用于文章列表页面
 */
export function useAutoPreloadJournals(
  journals: Array<{ id: string; title?: string }>,
  options: PreloadOptions & { 
    count?: number;
    requireAuth?: boolean;
  } = {}
) {
  const { preloadJournalDetails } = usePreloadData();
  const { 
    enabled = true, 
    delay = 100, 
    count = 5, 
    requireAuth = true 
  } = options;

  useEffect(() => {
    if (journals.length > 0 && enabled) {
      const journalsToPreload = journals.slice(0, count);
      const journalIds = journalsToPreload.map(j => j.id);
      
      let cleanup: (() => void) | undefined;
      
      const executePreload = async () => {
        cleanup = await preloadJournalDetails(journalIds, { enabled, delay });
      };
      
      executePreload();
      
      return cleanup;
    }
  }, [journals, preloadJournalDetails, enabled, delay, count]);
}