/**
 * 环境配置管理
 * 统一使用代理，避免环境差异
 */

export const getApiBaseUrl = () => {
  // 检测是否在服务器端运行
  if (typeof window === 'undefined') {
    // 服务器端：根据环境使用不同的完整URL
    const baseUrl = process.env.NODE_ENV === 'production' 
      ? (process.env.NEXTAUTH_URL || process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'https://xl.homgzha.cc')
      : 'http://localhost:3000';
    return `${baseUrl}/api/proxy`;
  }
  // 客户端：使用相对URL
  return '/api/proxy';
};
