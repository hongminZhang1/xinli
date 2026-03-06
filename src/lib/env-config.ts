/**
 * 环境配置管理
 * 服务端调用后端 API 的地址（不受浏览器 Mixed Content 限制）
 */

export const getApiBaseUrl = () => {
  return process.env.API_BASE_URL || 'http://homgzha.cc:3001/api';
};
