import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { EmotionEntry, CreateEmotionRequest, UpdateEmotionRequest } from "@/types/emotions";

export function useEmotions() {
  const { data: session, status } = useSession();
  
  const [entries, setEntries] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 加载情绪记录
  const loadEntries = async () => {
    if (!session?.user?.id || loading) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/emotions');
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      const data = await response.json();
      setEntries(data || []);
    } catch (err) {
      console.error('Failed to load emotions:', err);
      setError(err instanceof Error ? err.message : '加载情绪记录失败');
    } finally {
      setLoading(false);
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
      setEntries(prev => [newEntry, ...prev]);
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
      setEntries(prev => prev.map(entry => 
        entry.id === id ? updatedEntry : entry
      ));
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
      
      setEntries(prev => prev.filter(entry => entry.id !== id));
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