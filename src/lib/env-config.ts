/**
 * 环境配置管理
 * 处理本地开发和生产部署的差异
 */

export const getApiBaseUrl = () => {
  // 在Vercel生产环境中，使用本地HTTPS代理
  if (process.env.NODE_ENV === 'production' && process.env.VERCEL) {
    // 使用本地代理来避免HTTPS混合内容问题
    const baseUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'https://xinli-two.vercel.app';
    return `${baseUrl}/api/proxy`;
  }
  
  // 本地开发或其他环境使用原始URL
  return process.env.NEXT_PUBLIC_API_BASE_URL || 'http://193.112.165.180:3001/api';
};

export const getAuthUrl = () => {
  // 在Vercel生产环境中自动检测URL
  if (process.env.NODE_ENV === 'production') {
    // 优先使用环境变量中的生产URL
    if (process.env.NEXTAUTH_URL_PROD) {
      return process.env.NEXTAUTH_URL_PROD;
    }
    // 如果有VERCEL_URL，使用它
    if (process.env.VERCEL_URL) {
      return `https://${process.env.VERCEL_URL}`;
    }
    // 默认回退URL
    return 'https://xinli-two.vercel.app';
  }
  // 开发环境使用localhost
  return process.env.NEXTAUTH_URL || 'http://localhost:3000';
};

export const isProduction = process.env.NODE_ENV === 'production';
export const isVercel = !!process.env.VERCEL;

// Vercel特定的环境变量
export const vercelUrl = process.env.VERCEL_URL;
export const vercelEnv = process.env.VERCEL_ENV; // 'production', 'preview', or 'development'