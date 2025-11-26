import { useState, useEffect, useRef } from 'react';
import { useCacheStore } from '@/store/useCacheStore';

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
  queryFn: () => Promise<Response>,
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

      const response = await queryFn();
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      const result = await response.json();
      
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
  mutationFn: (variables: TVariables) => Promise<Response>,
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
      
      const response = await mutationFn(variables);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();
      
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

// 预定义查询hooks
export const useJournals = (type: 'all' | 'public' = 'all') => {
  return useQuery(
    `/api/journal?type=${type}`,
    () => fetch(`/api/journal?type=${type}`),
    {
      ttl: 2 * 60 * 1000,
      staleWhileRevalidate: true
    }
  );
};

export const useJournalDetail = (id: string, enabled = true) => {
  return useQuery(
    `/api/journal/${id}`,
    () => fetch(`/api/journal/${id}`),
    {
      enabled: enabled && !!id,
      ttl: 5 * 60 * 1000
    }
  );
};

export const useJournalComments = (journalId: string, enabled = true) => {
  return useQuery(
    `/api/journal/${journalId}/comments`,
    () => fetch(`/api/journal/${journalId}/comments`),
    {
      enabled: enabled && !!journalId,
      ttl: 3 * 60 * 1000
    }
  );
};

export const useEmotionRecords = () => {
  return useQuery(
    '/api/emotions',
    () => fetch('/api/emotions'),
    {
      ttl: 5 * 60 * 1000,
      staleWhileRevalidate: true
    }
  );
};

export const useUsers = () => {
  return useQuery(
    '/api/admin/users',
    () => fetch('/api/admin/users'),
    {
      ttl: 10 * 60 * 1000
    }
  );
};

export const useSystemSettings = () => {
  return useQuery(
    '/api/admin/settings',
    () => fetch('/api/admin/settings'),
    {
      ttl: 15 * 60 * 1000
    }
  );
};