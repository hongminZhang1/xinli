import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { EmotionEntry, CreateEmotionRequest, UpdateEmotionRequest } from "@/types/emotions";

export function useEmotions() {
  const { data: session, status } = useSession();
  const [entries, setEntries] = useState<EmotionEntry[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 加载情绪记录
  const loadEntries = async () => {
    if (!session) return;
    
    try {
      setLoading(true);
      setError(null);
      const response = await fetch("/api/emotions");
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      setEntries(data);
    } catch (error) {
      console.error("Failed to load entries:", error);
      setError("加载记录失败，请稍后再试");
    } finally {
      setLoading(false);
    }
  };

  // 添加新记录
  const addEntry = async (data: CreateEmotionRequest): Promise<boolean> => {
    if (!session) return false;

    try {
      setLoading(true);
      setError(null);
      const response = await fetch("/api/emotions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const newEntry = await response.json();
      setEntries((prev) => [newEntry, ...prev]);
      return true;
    } catch (error) {
      console.error("Failed to add entry:", error);
      setError("添加记录失败，请稍后再试");
      return false;
    } finally {
      setLoading(false);
    }
  };

  // 更新记录
  const updateEntry = async (id: string, data: UpdateEmotionRequest): Promise<boolean> => {
    if (!session) return false;

    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`/api/emotions/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const updatedEntry = await response.json();
      setEntries((prev) => 
        prev.map((entry) => 
          entry.id === id ? updatedEntry : entry
        )
      );
      return true;
    } catch (error) {
      console.error("Failed to update entry:", error);
      setError("更新记录失败，请稍后再试");
      return false;
    } finally {
      setLoading(false);
    }
  };

  // 删除记录
  const deleteEntry = async (id: string): Promise<boolean> => {
    if (!session) return false;

    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`/api/emotions/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      setEntries((prev) => prev.filter((entry) => entry.id !== id));
      return true;
    } catch (error) {
      console.error("Failed to delete entry:", error);
      setError("删除记录失败，请稍后再试");
      return false;
    } finally {
      setLoading(false);
    }
  };

  // 清除错误
  const clearError = () => setError(null);

  useEffect(() => {
    if (status === "authenticated") {
      loadEntries();
    }
  }, [status, session]);

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