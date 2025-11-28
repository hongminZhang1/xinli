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
                // 使用dbAdapter而不是直接API调用
                const { dbAdapter } = require('@/lib/db-adapter');
                const data = await dbAdapter.journal.getById(journalId);
                cache.setCache(detailCacheKey, data, 5 * 60 * 1000);
                console.log(`✓ 预缓存文章详情: ${journalId}`);
              } catch (error) {
                console.warn(`预缓存文章详情失败: ${journalId}`, error);
              }
            }

            // 预加载文章评论
            const commentsCached = cache.getCacheItem(commentsCacheKey);
            if (!commentsCached || commentsCached.isExpired) {
              try {
                // 使用dbAdapter获取评论（目前返回空数组）
                const { dbAdapter } = require('@/lib/db-adapter');
                const data = await dbAdapter.comment.getByJournalId(journalId);
                cache.setCache(commentsCacheKey, data, 3 * 60 * 1000);
                console.log(`✓ 预缓存文章评论: ${journalId}`);
              } catch (error) {
                console.warn(`预缓存文章评论失败: ${journalId}`, error);
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
        
        console.log(`🎉 预加载完成: ${journalIds.length} 篇文章`);
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
            // 使用dbAdapter而不是直接API调用
            const { dbAdapter } = require('@/lib/db-adapter');
            const data = await dbAdapter.emotion.getAll();
            cache.setCache(cacheKey, data, 5 * 60 * 1000);
            console.log('✓ 预缓存情绪记录');
          } catch (error) {
            console.warn('预缓存情绪记录失败', error);
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
          // 使用dbAdapter获取用户列表
          const usersCacheKey = 'admin-users';
          const usersCached = cache.getCacheItem(usersCacheKey);
          if (!usersCached || usersCached.isExpired) {
            const { dbAdapter } = require('@/lib/db-adapter');
            const usersData = await dbAdapter.user.getAll();
            cache.setCache(usersCacheKey, usersData, 10 * 60 * 1000);
            console.log('✓ 预缓存管理员用户数据');
          }

          // 预加载系统设置
          const settingsCacheKey = 'admin-settings';
          const settingsCached = cache.getCacheItem(settingsCacheKey);
          if (!settingsCached || settingsCached.isExpired) {
            const { dbAdapter } = require('@/lib/db-adapter');
            const settingsData = await dbAdapter.systemSetting.getAll();
            cache.setCache(settingsCacheKey, settingsData, 15 * 60 * 1000);
            console.log('✓ 预缓存管理员设置数据');
          }
          
          console.log('🔧 管理员数据预加载完成');
        } catch (error) {
          console.warn('管理员数据预加载失败:', error);
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