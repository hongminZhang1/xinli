/**
 * 环境配置管理
 * 浏览器端使用 Next.js rewrites 代理路径，避免 Mixed Content 问题
 * 服务端直接连接后端 API（不受浏览器限制）
 */

export const getApiBaseUrl = () => {
  // 浏览器环境：使用相对路径，通过 Next.js rewrites 代理到后端
  if (typeof window !== 'undefined') {
    return '/backend-api';
  }
  // 服务端环境：直接连接后端 API
  return process.env.NEXT_PUBLIC_API_BASE_URL || process.env.API_BASE_URL || 'http://193.112.165.180:3001/api';
};
