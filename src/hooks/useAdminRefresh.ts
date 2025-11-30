import { useEffect, useCallback } from 'react';
import { useCacheStore } from '@/store/useCacheStore';

/**
 * 管理员数据自动刷新hook（简化版）
 * 仅在需要时手动刷新，不进行自动定时刷新
 */
export function useAdminDataRefresh(enabled: boolean = false) {
  const cache = useCacheStore();

  const refreshAdminData = useCallback(async () => {
    if (!enabled) return;

    try {
      // Refreshing admin data
      
      // 使用dbAdapter刷新用户列表
      const { dbAdapter } = require('@/lib/db-adapter');
      const usersData = await dbAdapter.user.getAll();
      cache.setCache('admin-users', usersData, 10 * 60 * 1000);

      // 刷新系统设置
      const settingsData = await dbAdapter.systemSetting.getAll();
      cache.setCache('admin-settings', settingsData, 15 * 60 * 1000);
      
      // Admin data refresh completed
    } catch (error) {
      // Admin data refresh failed
    }
  }, [cache, enabled]);

  // 移除自动定时刷新，只提供手动刷新功能
  return { refreshAdminData };
}