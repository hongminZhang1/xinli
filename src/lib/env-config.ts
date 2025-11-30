/**
 * 环境配置管理
 * 统一使用代理，避免环境差异
 */

export const getApiBaseUrl = () => {
  // 检测是否在服务器端运行
  if (typeof window === 'undefined') {
    // 服务器端：根据环境使用不同的完整URL
    let baseUrl;
    if (process.env.NODE_ENV === 'production') {
      if (process.env.NEXTAUTH_URL) {
        baseUrl = process.env.NEXTAUTH_URL;
      } else if (process.env.VERCEL_URL) {
        baseUrl = `https://${process.env.VERCEL_URL}`;
      } else {
        baseUrl = 'https://xl.homgzha.cc';
      }
    } else {
      baseUrl = 'http://localhost:3000';
    }
    return `${baseUrl}/api/proxy`;
  }
  // 客户端：使用相对URL
  return '/api/proxy';
};
