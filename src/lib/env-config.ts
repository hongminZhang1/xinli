/**
 * 环境配置管理
 * 统一使用代理，避免环境差异
 */

export const getApiBaseUrl = () => {
  // 检测是否在服务器端运行
  if (typeof window === 'undefined') {
    // 服务器端：使用完整URL
    return 'http://localhost:3000/api/proxy';
  }
  // 客户端：使用相对URL
  return '/api/proxy';
};
