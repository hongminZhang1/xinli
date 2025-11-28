/**
 * 环境配置管理
 * 统一使用IP地址直接请求API服务器
 */

export const getApiBaseUrl = () => {
  // 统一使用IP地址直接请求，简化逻辑
  return process.env.NEXT_PUBLIC_API_BASE_URL || 'http://193.112.165.180:3001/api';
};
