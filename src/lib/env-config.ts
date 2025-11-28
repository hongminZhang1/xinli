/**
 * 环境配置管理
 * 处理HTTPS混合内容问题
 */

export const getApiBaseUrl = () => {
  // 在Vercel生产环境中，使用本地代理来避免HTTPS混合内容问题
  // 浏览器会阻止从HTTPS网站请求HTTP资源
  if (typeof window !== 'undefined' && process.env.NODE_ENV === 'production' && window.location.protocol === 'https:') {
    // 客户端：使用Vercel代理
    return '/api/proxy';
  }
  
  // 服务端或本地开发：直接使用IP地址
  return process.env.NEXT_PUBLIC_API_BASE_URL || 'http://193.112.165.180:3001/api';
};
