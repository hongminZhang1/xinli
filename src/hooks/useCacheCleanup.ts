import { useEffect } from 'react';
import { useCacheStore } from '@/store/useCacheStore';

// 缓存清理Hook - 在应用启动时运行
export function useCacheCleanup() {
  const cache = useCacheStore();
  
  useEffect(() => {
    // 确保cache.cache是Map对象
    if (!(cache.cache instanceof Map)) {
      return;
    }
    
    // 初始清理过期缓存
    const now = Date.now();
    cache.cache.forEach((item, key) => {
      if (item.expiry && now > item.expiry) {
        cache.invalidateCache(key);
      }
    });

    // 设置定期清理
    const interval = setInterval(() => {
      // 再次检查cache.cache是否是Map对象
      if (!(cache.cache instanceof Map)) {
        return;
      }
      
      const now = Date.now();
      cache.cache.forEach((item, key) => {
        if (item.expiry && now > item.expiry) {
          cache.invalidateCache(key);
        }
      });
    }, 60000); // 每分钟清理一次

    return () => clearInterval(interval);
  }, [cache]);
}

// 在应用级别使用此hook
export default useCacheCleanup;