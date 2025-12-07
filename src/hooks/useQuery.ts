import { useState, useEffect, useRef } from 'react';
import { dbAdapter } from '@/lib/db-adapter';
import { useCacheStore, CACHE_TTL } from '@/store/useCacheStore';

export interface UseQueryOptions {
  enabled?: boolean;
  cacheTime?: number; // 缓存时间（毫秒）
  staleTime?: number; // 数据保持新鲜的时间（毫秒）
  refetchOnMount?: boolean; // 组件挂载时是否重新获取
  refetchOnWindowFocus?: boolean; // 窗口获得焦点时是否重新获取
}

export interface UseQueryResult<T> {
  data: T | null;
  isLoading: boolean;
  isFetching: boolean; // 后台获取中
  error: string | null;
  refetch: () => Promise<void>;
  invalidate: () => void;
}

export function useQuery<T = any>(
  key: string,
  queryFn: () => Promise<T>,
  options: UseQueryOptions = {}
): UseQueryResult<T> {
  const { 
    enabled = true,
    cacheTime = CACHE_TTL.DEFAULT,
    staleTime = 0,
    refetchOnMount = true,
    refetchOnWindowFocus = false
  } = options;
  
  const { getCache, setCache, invalidateCache, getCacheItem } = useCacheStore();
  
  const [data, setData] = useState<T | null>(() => {
    // 初始化时尝试从缓存获取
    return enabled ? getCache<T>(key) : null;
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const isExecutingRef = useRef(false);
  const mountedRef = useRef(false);

  const executeQuery = async (background = false): Promise<void> => {
    if (!enabled || isExecutingRef.current) return;

    isExecutingRef.current = true;
    
    if (!background) {
      setIsLoading(true);
    } else {
      setIsFetching(true);
    }
    setError(null);
    
    try {
      const result = await queryFn();
      setData(result);
      setCache(key, result, cacheTime);
    } catch (err) {
      console.error(`Query ${key} failed:`, err);
      setError(err instanceof Error ? err.message : '请求失败');
    } finally {
      setIsLoading(false);
      setIsFetching(false);
      isExecutingRef.current = false;
    }
  };

  useEffect(() => {
    if (!enabled) return;

    const cacheItem = getCacheItem<T>(key);
    
    if (cacheItem && !cacheItem.isExpired) {
      // 有有效缓存
      setData(cacheItem.data);
      
      // 检查是否需要后台刷新（stale-while-revalidate）
      const timeSinceCache = Date.now() - cacheItem.timestamp;
      if (timeSinceCache > staleTime) {
        // 数据已过期，后台刷新
        executeQuery(true);
      }
    } else {
      // 无缓存或缓存已过期，立即获取
      if (!mountedRef.current || refetchOnMount) {
        executeQuery(false);
      }
    }
    
    mountedRef.current = true;
  }, [key, enabled]);

  // 窗口获得焦点时重新获取
  useEffect(() => {
    if (!enabled || !refetchOnWindowFocus) return;

    const handleFocus = () => {
      const cacheItem = getCacheItem<T>(key);
      if (cacheItem) {
        const timeSinceCache = Date.now() - cacheItem.timestamp;
        if (timeSinceCache > staleTime) {
          executeQuery(true);
        }
      }
    };

    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, [key, enabled, refetchOnWindowFocus, staleTime]);

  const refetch = async (): Promise<void> => {
    invalidateCache(key);
    await executeQuery(false);
  };

  const invalidate = (): void => {
    invalidateCache(key);
    setData(null);
    setError(null);
  };

  return {
    data,
    isLoading,
    isFetching,
    error,
    refetch,
    invalidate
  };
}

// useMutation简化版本 - 用于数据变更操作
export function useMutation<TData = any, TVariables = any>(
  mutationFn: (variables: TVariables) => Promise<TData>,
  options: {
    onSuccess?: (data: TData) => void;
    onError?: (error: Error) => void;
    invalidateQueries?: string[]; // 需要失效的查询key
  } = {}
) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const { invalidateCache, invalidatePattern } = useCacheStore();

  const mutate = async (variables: TVariables): Promise<TData> => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await mutationFn(variables);
      
      // 失效相关缓存
      if (options.invalidateQueries) {
        options.invalidateQueries.forEach(queryKey => {
          // 如果包含通配符，使用模式匹配
          if (queryKey.includes('*')) {
            invalidatePattern(queryKey.replace(/\*/g, '.*'));
          } else {
            invalidateCache(queryKey);
          }
        });
      }
      
      options.onSuccess?.(result);
      return result;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Mutation failed');
      setError(error);
      options.onError?.(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    mutate,
    isLoading,
    error
  };
}

// ==================== 具体数据查询 Hooks ====================

// 文章/日记相关
export const useJournals = (type: 'all' | 'public' = 'public') => {
  return useQuery(
    `journals-${type}`,
    () => {
      if (type === 'public') {
        return dbAdapter.journal.getPublic();
      }
      return dbAdapter.journal.getAll();
    },
    { 
      enabled: true,
      cacheTime: CACHE_TTL.ARTICLES,
      staleTime: 60 * 1000, // 1分钟内认为是新鲜数据
    }
  );
};

export const useJournalDetail = (id: string, enabled = true) => {
  return useQuery(
    `journal-${id}`,
    () => dbAdapter.journal.getById(id),
    { 
      enabled: enabled && !!id,
      cacheTime: CACHE_TTL.ARTICLE_DETAIL,
      staleTime: 2 * 60 * 1000, // 2分钟内认为是新鲜数据
    }
  );
};

export const useJournalComments = (journalId: string, enabled = true) => {
  return useQuery(
    `journal-comments-${journalId}`,
    () => dbAdapter.comment.getByJournalId(journalId),
    { 
      enabled: enabled && !!journalId,
      cacheTime: CACHE_TTL.COMMENTS,
      staleTime: 60 * 1000, // 1分钟内认为是新鲜数据
    }
  );
};

// 情绪记录
export const useEmotionRecords = () => {
  return useQuery(
    'emotions',
    () => dbAdapter.emotion.getAll(),
    { 
      enabled: true,
      cacheTime: CACHE_TTL.EMOTIONS,
      staleTime: 2 * 60 * 1000, // 2分钟内认为是新鲜数据
    }
  );
};

// 用户管理
export const useUsers = () => {
  return useQuery(
    'users',
    () => dbAdapter.user.getAll(),
    { 
      enabled: true,
      cacheTime: CACHE_TTL.USERS,
      staleTime: 5 * 60 * 1000, // 5分钟内认为是新鲜数据
    }
  );
};

export const useUser = (id: string, enabled = true) => {
  return useQuery(
    `user-${id}`,
    () => dbAdapter.user.getById(id),
    { 
      enabled: enabled && !!id,
      cacheTime: CACHE_TTL.USERS,
      staleTime: 5 * 60 * 1000,
    }
  );
};

// 系统设置
export const useSystemSettings = () => {
  return useQuery(
    'system-settings',
    () => dbAdapter.systemSetting.getAll(),
    { 
      enabled: true,
      cacheTime: CACHE_TTL.SETTINGS,
      staleTime: 10 * 60 * 1000, // 10分钟内认为是新鲜数据
    }
  );
};

// 预约相关 - 如果有对应API可以取消注释
// export const useAppointments = (userId: string, enabled = true) => {
//   return useQuery(
//     `appointments-${userId}`,
//     () => dbAdapter.appointment.getByUserId(userId),
//     { 
//       enabled: enabled && !!userId,
//       cacheTime: CACHE_TTL.DEFAULT,
//       staleTime: 2 * 60 * 1000,
//     }
//   );
// };

// 聊天会话 - 如果有对应API可以取消注释
// export const useChatSessions = (userId: string, enabled = true) => {
//   return useQuery(
//     `chat-sessions-${userId}`,
//     () => dbAdapter.chat.getByUserId(userId),
//     { 
//       enabled: enabled && !!userId,
//       cacheTime: CACHE_TTL.DEFAULT,
//       staleTime: 60 * 1000,
//     }
//   );
// };