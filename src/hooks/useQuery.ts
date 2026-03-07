import { useState, useEffect, useRef } from 'react';
import { useCacheStore, CACHE_TTL } from '@/store/useCacheStore';

export interface UseQueryOptions {
  enabled?: boolean;
  cacheTime?: number; // 缓存时间（毫秒）
  staleTime?: number; // 数据保持新鲜的时间（毫秒）
  refetchOnMount?: boolean; // 组件挂载时是否重新获取
  refetchOnWindowFocus?: boolean; // 窗口获得焦点时是否重新获取
  initialData?: any; // SSR 预取的初始数据，直接展示无需等待请求
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
    refetchOnWindowFocus = false,
    initialData,
  } = options;
  
  const { getCache, setCache, invalidateCache, getCacheItem } = useCacheStore();
  
  const [data, setData] = useState<T | null>(() => {
    if (!enabled) return null;
    // 优先使用 localStorage 持久化缓存，其次使用 SSR 初始数据
    const cached = getCache<T>(key);
    if (cached !== null) return cached;
    return (initialData !== undefined ? initialData : null) as T | null;
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

    // 如果有 SSR 初始数据且缓存为空，先将初始数据写入缓存（视为刚获取的新鲜数据）
    // 仅当 initialData 非空时才写入缓存，避免 SSR 失败返回 [] 毒化缓存导致客户端永远不发请求
    const isNonEmptyInitialData = initialData !== undefined &&
      !(Array.isArray(initialData) && initialData.length === 0);
    if (isNonEmptyInitialData && !getCacheItem(key)) {
      setCache(key, initialData, cacheTime);
    }

    const cacheItem = getCacheItem<T>(key);
    
    if (cacheItem && !cacheItem.isExpired) {
      // 有有效缓存
      setData(cacheItem.data);
      
      // 缓存数据为空数组时，视为无效数据，立即后台刷新
      const cachedIsEmpty = Array.isArray(cacheItem.data) && cacheItem.data.length === 0;
      const timeSinceCache = Date.now() - cacheItem.timestamp;
      if (timeSinceCache > staleTime || cachedIsEmpty) {
        // 数据已过期或为空，后台刷新
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
export const useJournals = (type: 'all' | 'public' = 'public', initialData?: any[], userId?: string) => {
  // public 类型共享缓存；all/private 类型按用户隔离
  const cacheKey = type === 'public' ? `journals-${type}` : `journals-${type}-${userId ?? 'anon'}`;
  return useQuery(
    cacheKey,
    async () => {
      const url = type === 'public' ? '/api/journal?type=public' : '/api/journal';
      const res = await fetch(url);
      if (!res.ok) throw new Error('获取日记失败');
      return res.json();
    },
    {
      enabled: type === 'public' || !!userId,
      cacheTime: CACHE_TTL.ARTICLES,
      staleTime: 60 * 1000,
      initialData,
    }
  );
};

export const useJournalDetail = (id: string, enabled = true, initialData?: any) => {
  return useQuery(
    `journal-${id}`,
    async () => {
      const res = await fetch(`/api/journal/${id}`);
      if (!res.ok) throw new Error('获取日记详情失败');
      return res.json();
    },
    {
      enabled: enabled && !!id,
      cacheTime: CACHE_TTL.ARTICLE_DETAIL,
      staleTime: 2 * 60 * 1000,
      initialData,
    }
  );
};

export const useJournalComments = (journalId: string, enabled = true, initialData?: any[]) => {
  return useQuery(
    `journal-comments-${journalId}`,
    async () => {
      const res = await fetch(`/api/journal/${journalId}/comments`);
      if (!res.ok) throw new Error('获取评论失败');
      return res.json();
    },
    {
      enabled: enabled && !!journalId,
      cacheTime: CACHE_TTL.COMMENTS,
      staleTime: 60 * 1000,
      initialData,
    }
  );
};

// 情绪记录
export const useEmotionRecords = () => {
  return useQuery(
    'emotions',
    async () => {
      const res = await fetch('/api/emotions');
      if (!res.ok) throw new Error('获取情绪记录失败');
      return res.json();
    },
    {
      enabled: true,
      cacheTime: CACHE_TTL.EMOTIONS,
      staleTime: 2 * 60 * 1000,
    }
  );
};

// 用户管理
export const useUsers = () => {
  return useQuery(
    'users',
    async () => {
      const res = await fetch('/api/admin/users');
      if (!res.ok) throw new Error('获取用户列表失败');
      return res.json();
    },
    {
      enabled: true,
      cacheTime: CACHE_TTL.USERS,
      staleTime: 5 * 60 * 1000,
    }
  );
};

// 系统设置
export const useSystemSettings = () => {
  return useQuery(
    'system-settings',
    async () => {
      const res = await fetch('/api/admin/settings');
      if (!res.ok) throw new Error('获取系统设置失败');
      return res.json();
    },
    {
      enabled: true,
      cacheTime: CACHE_TTL.SETTINGS,
      staleTime: 10 * 60 * 1000,
    }
  );
};