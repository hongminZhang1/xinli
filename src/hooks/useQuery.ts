import { useState, useEffect, useRef } from 'react';
import { useCacheStore } from '@/store/useCacheStore';
import { dbAdapter } from '@/lib/db-adapter';

export interface UseQueryOptions {
  enabled?: boolean;
  ttl?: number;
  staleWhileRevalidate?: boolean;
}

export interface UseQueryResult<T> {
  data: T | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  invalidate: () => void;
}

export function useQuery<T = any>(
  key: string,
  queryFn: () => Promise<T>,
  options: UseQueryOptions = {}
): UseQueryResult<T> {
  const cache = useCacheStore();
  const {
    enabled = true,
    ttl = 5 * 60 * 1000,
    staleWhileRevalidate = false
  } = options;
  
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const isExecutingRef = useRef(false);
  const isMountedRef = useRef(true);

  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  const executeQuery = async (useCache = true): Promise<void> => {
    if (!enabled || isExecutingRef.current) return;

    isExecutingRef.current = true;
    
    try {
      if (useCache) {
        const cached = cache.getCacheItem<T>(key);
        if (cached && cached.data) {
          if (!isMountedRef.current) return;
          setData(cached.data);
          setError(null);
          
          if (!cached.isExpired) {
            return;
          }
          
          if (staleWhileRevalidate) {
            executeQuery(false);
            return;
          }
        }
      }

      if (!isMountedRef.current) return;
      setIsLoading(true);
      setError(null);

      const result = await queryFn();
      
      if (!isMountedRef.current) return;
      
      setData(result);
      setError(null);
      
      cache.setCache(key, result, ttl);
    } catch (err) {
      if (!isMountedRef.current) return;
      
      const errorMessage = err instanceof Error ? err.message : '请求失败';
      setError(errorMessage);
      console.error(`Query error for ${key}:`, err);
    } finally {
      if (isMountedRef.current) {
        setIsLoading(false);
      }
      isExecutingRef.current = false;
    }
  };

  const refetch = async (): Promise<void> => {
    await executeQuery(false);
  };

  const invalidate = (): void => {
    cache.invalidateCache(key);
  };

  useEffect(() => {
    if (enabled) {
      executeQuery();
    }
  }, [key, enabled]);

  useEffect(() => {
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  return {
    data,
    isLoading,
    error,
    refetch,
    invalidate
  };
}

export function useMutation<TData = any, TVariables = any>(
  mutationFn: (variables: TVariables) => Promise<TData>,
  options: {
    onSuccess?: (data: TData, variables: TVariables) => void;
    onError?: (error: Error, variables: TVariables) => void;
    invalidateQueries?: string[];
  } = {}
) {
  const cache = useCacheStore();
  const { onSuccess, onError, invalidateQueries = [] } = options;
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const mutate = async (variables: TVariables): Promise<TData | null> => {
    try {
      setIsLoading(true);
      setError(null);
      
      const data = await mutationFn(variables);
      
      invalidateQueries.forEach(pattern => {
        cache.invalidatePattern(pattern);
      });
      
      if (onSuccess) {
        onSuccess(data, variables);
      }
      
      return data;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : '操作失败';
      setError(errorMessage);
      
      if (onError) {
        onError(err instanceof Error ? err : new Error(errorMessage), variables);
      }
      
      return null;
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

// 预定义查询hooks - 使用 db-adapter
export const useJournals = (type: 'all' | 'public' = 'all') => {
  return useQuery(
    `journals-${type}`,
    () => dbAdapter.journal.getAll(),
    {
      ttl: 2 * 60 * 1000,
      staleWhileRevalidate: true
    }
  );
};

export const useJournalDetail = (id: string, enabled = true) => {
  return useQuery(
    `journal-${id}`,
    () => dbAdapter.journal.getById(id),
    {
      enabled: enabled && !!id,
      ttl: 5 * 60 * 1000
    }
  );
};

export const useJournalComments = (journalId: string, enabled = true) => {
  return useQuery(
    `journal-comments-${journalId}`,
    () => dbAdapter.comment.getByJournalId(journalId),
    {
      enabled: enabled && !!journalId,
      ttl: 3 * 60 * 1000
    }
  );
};

export const useEmotionRecords = () => {
  return useQuery(
    'emotions',
    () => dbAdapter.emotion.getAll(),
    {
      ttl: 5 * 60 * 1000,
      staleWhileRevalidate: true
    }
  );
};

export const useUsers = () => {
  return useQuery(
    'users',
    () => dbAdapter.user.getAll(),
    {
      ttl: 10 * 60 * 1000
    }
  );
};

export const useSystemSettings = () => {
  return useQuery(
    'settings',
    () => dbAdapter.systemSetting.getAll(),
    {
      ttl: 15 * 60 * 1000
    }
  );
};