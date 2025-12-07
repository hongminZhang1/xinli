import { useState, useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import { EmotionEntry, CreateEmotionRequest, UpdateEmotionRequest } from "@/types/emotions";
import { useCacheStore, CACHE_TTL } from '@/store/useCacheStore';

const EMOTIONS_CACHE_KEY = 'emotions-records';

export function useEmotions() {
  const { data: session, status } = useSession();
  const { getCache, setCache, invalidateCache } = useCacheStore();
  
  const [entries, setEntries] = useState<any[]>(() => {
    // 初始化时尝试从缓存获取
    return getCache<any[]>(EMOTIONS_CACHE_KEY) || [];
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const loadingRef = useRef(false);

  // 加载情绪记录
  const loadEntries = async () => {
    if (!session?.user?.id || loadingRef.current) return;
    
    // 检查缓存
    const cachedData = getCache<any[]>(EMOTIONS_CACHE_KEY);
    if (cachedData) {
      setEntries(cachedData);
      return;
    }

    loadingRef.current = true;
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/emotions');
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      const data = await response.json();
      
      // 更新缓存
      setCache(EMOTIONS_CACHE_KEY, data || [], CACHE_TTL.EMOTIONS);
      setEntries(data || []);
    } catch (err) {
      console.error('Failed to load emotions:', err);
      setError(err instanceof Error ? err.message : '加载情绪记录失败');
    } finally {
      setLoading(false);
      loadingRef.current = false;
    }
  };

  // 添加新记录
  const addEntry = async (data: CreateEmotionRequest): Promise<boolean> => {
    if (!session?.user?.id || loading) return false;
    
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/emotions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      const newEntry = await response.json();
      
      // 更新本地状态和缓存
      const updatedEntries = [newEntry, ...entries];
      setEntries(updatedEntries);
      setCache(EMOTIONS_CACHE_KEY, updatedEntries, CACHE_TTL.EMOTIONS);
      
      return true;
    } catch (err) {
      console.error('Failed to add emotion:', err);
      setError(err instanceof Error ? err.message : '添加情绪记录失败');
      return false;
    } finally {
      setLoading(false);
    }
  };

  // 更新记录
  const updateEntry = async (id: string, data: UpdateEmotionRequest): Promise<boolean> => {
    if (!session?.user?.id || loading) return false;
    
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`/api/emotions/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      const updatedEntry = await response.json();
      
      // 更新本地状态和缓存
      const updatedEntries = entries.map(entry => 
        entry.id === id ? updatedEntry : entry
      );
      setEntries(updatedEntries);
      setCache(EMOTIONS_CACHE_KEY, updatedEntries, CACHE_TTL.EMOTIONS);
      
      return true;
    } catch (err) {
      console.error('Failed to update emotion:', err);
      setError(err instanceof Error ? err.message : '更新情绪记录失败');
      return false;
    } finally {
      setLoading(false);
    }
  };

  // 删除记录
  const deleteEntry = async (id: string): Promise<boolean> => {
    if (!session?.user?.id || loading) return false;
    
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`/api/emotions/${id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      // 更新本地状态和缓存
      const updatedEntries = entries.filter(entry => entry.id !== id);
      setEntries(updatedEntries);
      setCache(EMOTIONS_CACHE_KEY, updatedEntries, CACHE_TTL.EMOTIONS);
      
      return true;
    } catch (err) {
      console.error('Failed to delete emotion:', err);
      setError(err instanceof Error ? err.message : '删除情绪记录失败');
      return false;
    } finally {
      setLoading(false);
    }
  };

  // 清除错误
  const clearError = () => {
    setError(null);
  };

  // 初始加载
  useEffect(() => {
    if (session?.user?.id) {
      loadEntries();
    }
  }, [session?.user?.id]);

  return {
    entries,
    loading,
    error,
    isAuthenticated: !!session,
    authLoading: status === "loading",
    addEntry,
    updateEntry,
    deleteEntry,
    loadEntries,
    clearError,
  };
}