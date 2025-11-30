import { useState, useEffect, useRef } from 'react';
import { dbAdapter } from '@/lib/db-adapter';

export interface UseQueryOptions {
  enabled?: boolean;
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
  const { enabled = true } = options;
  
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const isExecutingRef = useRef(false);

  const executeQuery = async (): Promise<void> => {
    if (!enabled || isExecutingRef.current) return;

    isExecutingRef.current = true;
    setIsLoading(true);
    setError(null);
    
    try {
      const result = await queryFn();
      setData(result);
    } catch (err) {
      console.error(`Query ${key} failed:`, err);
      setError(err instanceof Error ? err.message : '请求失败');
    } finally {
      setIsLoading(false);
      isExecutingRef.current = false;
    }
  };

  useEffect(() => {
    if (enabled) {
      executeQuery();
    }
  }, [key, enabled]);

  const refetch = async (): Promise<void> => {
    await executeQuery();
  };

  const invalidate = (): void => {
    setData(null);
    setError(null);
  };

  return {
    data,
    isLoading,
    error,
    refetch,
    invalidate
  };
}

// useMutation简化版本 - 不使用缓存
export function useMutation<TData = any, TVariables = any>(
  mutationFn: (variables: TVariables) => Promise<TData>,
  options: {
    onSuccess?: (data: TData) => void;
    onError?: (error: Error) => void;
    invalidateQueries?: string[];
  } = {}
) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const mutate = async (variables: TVariables): Promise<TData> => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await mutationFn(variables);
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

// 简化的查询hooks - 无缓存版本
export const useJournals = (type: 'all' | 'public' = 'public') => {
  return useQuery(
    `journals-${type}`,
    () => {
      if (type === 'public') {
        return dbAdapter.journal.getPublic();
      }
      return dbAdapter.journal.getAll();
    },
    { enabled: true }
  );
};

export const useJournalDetail = (id: string, enabled = true) => {
  return useQuery(
    `journal-${id}`,
    () => dbAdapter.journal.getById(id),
    { enabled: enabled && !!id }
  );
};

export const useJournalComments = (journalId: string, enabled = true) => {
  return useQuery(
    `journal-comments-${journalId}`,
    () => dbAdapter.comment.getByJournalId(journalId),
    { enabled: enabled && !!journalId }
  );
};

export const useEmotionRecords = () => {
  return useQuery(
    'emotions',
    () => dbAdapter.emotion.getAll(),
    { enabled: true }
  );
};

export const useUsers = () => {
  return useQuery(
    'users',
    () => dbAdapter.user.getAll(),
    { enabled: true }
  );
};

export const useSystemSettings = () => {
  return useQuery(
    'settings',
    () => dbAdapter.systemSetting.getAll(),
    { enabled: true }
  );
};