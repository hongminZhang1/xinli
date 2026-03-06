import { useEffect } from 'react';
import { useCacheStore } from '@/store/useCacheStore';

// 缓存清理Hook - 在应用启动时运行
export function useCacheCleanup() {
  const cleanExpiredCache = useCacheStore((state) => state.cleanExpiredCache);

  useEffect(() => {
    // 初始清理过期缓存
    cleanExpiredCache();

    // 设置定期清理，每分钟执行一次
    const interval = setInterval(cleanExpiredCache, 60000);
    return () => clearInterval(interval);
  }, [cleanExpiredCache]);
}

export default useCacheCleanup;