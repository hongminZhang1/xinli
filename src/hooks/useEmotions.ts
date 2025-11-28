import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { EmotionEntry, CreateEmotionRequest, UpdateEmotionRequest } from "@/types/emotions";
import { useEmotionRecords, useMutation } from "./useQuery";
import { useCacheStore } from "@/store/useCacheStore";
import { dbAdapter } from "@/lib/db-adapter";

export function useEmotions() {
  const { data: session, status } = useSession();
  const cache = useCacheStore();
  
  // 使用缓存的情绪记录查询
  const { data: allEntries, isLoading: loading, error, refetch: loadEntries } = useEmotionRecords();
  
  // 筛选当前用户的记录
  const entries = allEntries?.filter((entry: any) => 
    entry.userId === session?.user?.id
  ) || [];
  
  // 添加情绪记录的mutation
  const addEntryMutation = useMutation(
    (data: CreateEmotionRequest) => dbAdapter.emotion.create({
      userId: session?.user?.id || '',
      emotion: data.emoji as any,
      intensity: 5, // 默认强度
      notes: data.note,
      tags: []
    }),
    {
      onSuccess: () => {
        // 刷新数据
        loadEntries();
      },
      invalidateQueries: ["emotions"]
    }
  );

  // 更新情绪记录的mutation
  const updateEntryMutation = useMutation(
    ({ id, data }: { id: string; data: UpdateEmotionRequest }) => 
      dbAdapter.emotion.update(id, {
        emotion: data.emoji as any,
        notes: data.note,
      }),
    {
      onSuccess: () => {
        // 刷新数据
        loadEntries();
      },
      invalidateQueries: ["emotions"]
    }
  );

  // 删除情绪记录的mutation
  const deleteEntryMutation = useMutation(
    (id: string) => dbAdapter.emotion.delete(id),
    {
      onSuccess: () => {
        // 刷新数据
        loadEntries();
      },
      invalidateQueries: ["emotions"]
    }
  );

  // 添加新记录
  const addEntry = async (data: CreateEmotionRequest): Promise<boolean> => {
    if (!session) return false;
    try {
      await addEntryMutation.mutate(data);
      return true;
    } catch {
      return false;
    }
  };

  // 更新记录
  const updateEntry = async (id: string, data: UpdateEmotionRequest): Promise<boolean> => {
    if (!session) return false;
    try {
      await updateEntryMutation.mutate({ id, data });
      return true;
    } catch {
      return false;
    }
  };

  // 删除记录
  const deleteEntry = async (id: string): Promise<boolean> => {
    if (!session) return false;
    try {
      await deleteEntryMutation.mutate(id);
      return true;
    } catch {
      return false;
    }
  };

  // 清除错误
  const clearError = () => {
    // 错误状态现在由mutation管理
  };

  return {
    entries,
    loading: loading || addEntryMutation.isLoading || updateEntryMutation.isLoading || deleteEntryMutation.isLoading,
    error: error || addEntryMutation.error || updateEntryMutation.error || deleteEntryMutation.error,
    isAuthenticated: !!session,
    authLoading: status === "loading",
    addEntry,
    updateEntry,
    deleteEntry,
    loadEntries,
    clearError,
  };
}