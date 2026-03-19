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
  // 服务端环境：直接连接本地后端 API (解决本地公网IP回环导致的延迟和间歇性断连问题)
  return process.env.NEXT_PUBLIC_API_BASE_URL || process.env.API_BASE_URL || 'http://127.0.0.1:3001/api';
};
