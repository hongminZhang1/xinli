import { useEffect, useCallback } from 'react';
import { useCacheStore } from '@/store/useCacheStore';

/**
 * 管理员数据自动刷新hook
 * 定期刷新管理员面板数据，确保数据及时性
 */
export function useAdminDataRefresh(enabled: boolean = false) {
  const cache = useCacheStore();

  const refreshAdminData = useCallback(async () => {
    if (!enabled) return;

    try {
      console.log('🔄 开始刷新管理员数据...');
      
      // 刷新用户列表
      const usersResponse = await fetch('/api/admin/users');
      if (usersResponse.ok) {
        const usersData = await usersResponse.json();
        cache.setCache('/api/admin/users', usersData, 10 * 60 * 1000);
        console.log('✓ 用户列表数据已更新');
      }

      // 刷新系统设置
      const settingsResponse = await fetch('/api/admin/settings');
      if (settingsResponse.ok) {
        const settingsData = await settingsResponse.json();
        cache.setCache('/api/admin/settings', settingsData, 15 * 60 * 1000);
        console.log('✓ 系统设置数据已更新');
      }
      
      console.log('🎯 管理员数据刷新完成');
    } catch (error) {
      console.warn('管理员数据刷新失败:', error);
    }
  }, [cache, enabled]);

  useEffect(() => {
    if (enabled) {
      // 立即执行一次刷新
      refreshAdminData();
      
      // 设置定期刷新（每5分钟）
      const interval = setInterval(refreshAdminData, 5 * 60 * 1000);
      
      return () => clearInterval(interval);
    }
  }, [enabled, refreshAdminData]);

  return { refreshAdminData };
}