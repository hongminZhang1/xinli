import { useState, useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import { EmotionEntry, CreateEmotionRequest, UpdateEmotionRequest } from "@/types/emotions";

// 全局缓存，避免多个组件重复请求
let globalEmotionsCache: {
  data: any[] | null;
  timestamp: number;
  loading: boolean;
} = {
  data: null,
  timestamp: 0,
  loading: false
};

const CACHE_DURATION = 30000; // 30秒缓存

export function useEmotions() {
  const { data: session, status } = useSession();
  
  const [entries, setEntries] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const loadingRef = useRef(false);

  // 检查缓存是否有效
  const isCacheValid = () => {
    const now = Date.now();
    return globalEmotionsCache.data !== null && 
           (now - globalEmotionsCache.timestamp) < CACHE_DURATION;
  };

  // 加载情绪记录
  const loadEntries = async () => {
    if (!session?.user?.id || loadingRef.current) return;
    
    // 检查缓存
    if (isCacheValid()) {
      setEntries(globalEmotionsCache.data || []);
      return;
    }

    // 检查是否已经有其他组件在加载
    if (globalEmotionsCache.loading) {
      // 等待其他组件完成加载
      const checkLoading = () => {
        if (!globalEmotionsCache.loading) {
          setEntries(globalEmotionsCache.data || []);
        } else {
          setTimeout(checkLoading, 100);
        }
      };
      checkLoading();
      return;
    }

    loadingRef.current = true;
    globalEmotionsCache.loading = true;
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/emotions');
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      const data = await response.json();
      
      // 更新全局缓存
      globalEmotionsCache.data = data || [];
      globalEmotionsCache.timestamp = Date.now();
      globalEmotionsCache.loading = false;
      
      setEntries(data || []);
    } catch (err) {
      console.error('Failed to load emotions:', err);
      globalEmotionsCache.loading = false;
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
      
      // 更新本地状态和全局缓存
      const updatedEntries = [newEntry, ...entries];
      setEntries(updatedEntries);
      globalEmotionsCache.data = updatedEntries;
      globalEmotionsCache.timestamp = Date.now();
      
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
      
      // 更新本地状态和全局缓存
      const updatedEntries = entries.map(entry => 
        entry.id === id ? updatedEntry : entry
      );
      setEntries(updatedEntries);
      globalEmotionsCache.data = updatedEntries;
      globalEmotionsCache.timestamp = Date.now();
      
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
      
      // 更新本地状态和全局缓存
      const updatedEntries = entries.filter(entry => entry.id !== id);
      setEntries(updatedEntries);
      globalEmotionsCache.data = updatedEntries;
      globalEmotionsCache.timestamp = Date.now();
      
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