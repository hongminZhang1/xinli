/**
 * API客户端配置
 * 用于连接轻量应用云服务器的API服务
 */

import { getApiBaseUrl } from './env-config';

interface ApiConfig {
  baseUrl: string;
  timeout: number;
  headers: Record<string, string>;
}

class ApiClient {
  private config: ApiConfig;

  constructor(config: ApiConfig) {
    this.config = config;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.config.baseUrl}${endpoint}`;
    
    const requestOptions: RequestInit = {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...this.config.headers,
        ...options.headers,
      },
    };

    // 创建一个带超时的AbortController
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.config.timeout);
    
    requestOptions.signal = controller.signal;

    try {
      const response = await fetch(url, requestOptions);
      
      // 清除超时定时器
      clearTimeout(timeoutId);
      
      if (!response.ok) {
        throw new Error(`API请求失败: ${response.status} ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      // 清除超时定时器
      clearTimeout(timeoutId);
      
      if (error instanceof Error && error.name === 'AbortError') {
        throw new Error('请求超时');
      }
      
      console.error(`API请求错误 ${endpoint}:`, error);
      throw error;
    }
  }

  // GET请求
  async get<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'GET' });
  }

  // POST请求
  async post<T>(endpoint: string, data: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // PUT请求
  async put<T>(endpoint: string, data: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  // DELETE请求
  async delete<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'DELETE' });
  }

  // PATCH请求
  async patch<T>(endpoint: string, data: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  }
}

// 创建API客户端实例
export const apiClient = new ApiClient({
  baseUrl: getApiBaseUrl(),
  timeout: 10000,
  headers: {
    'Accept': 'application/json',
  },
});

// 数据库操作的API封装
export const dbApi = {
  // 用户相关
  users: {
    getAll: () => apiClient.get<any[]>('/users'),
    getById: (id: string) => apiClient.get<any>(`/users/${id}`),
    getByUsername: (username: string) => apiClient.get<any>(`/users/username/${username}`),
    create: (data: any) => apiClient.post<any>('/users', data),
    update: (id: string, data: any) => apiClient.put<any>(`/users/${id}`, data),
    delete: (id: string) => apiClient.delete<any>(`/users/${id}`),
  },
  
  // 情绪记录
  emotions: {
    getAll: () => apiClient.get<any[]>('/emotions'),
    getById: (id: string) => apiClient.get<any>(`/emotions/${id}`),
    create: (data: any) => apiClient.post<any>('/emotions', data),
    update: (id: string, data: any) => apiClient.put<any>(`/emotions/${id}`, data),
    delete: (id: string) => apiClient.delete<any>(`/emotions/${id}`),
  },
  
  // 日记条目
  journals: {
    getAll: () => apiClient.get<any[]>('/journals'),
    getById: (id: string) => apiClient.get<any>(`/journal/${id}`),
    create: (data: any) => apiClient.post<any>('/journal', data),
    update: (id: string, data: any) => apiClient.put<any>(`/journal/${id}`, data),
    delete: (id: string) => apiClient.delete<any>(`/journal/${id}`),
  },
  
  // 聊天会话
  chat: {
    getByUserId: (userId: string) => apiClient.get<any[]>(`/chat/user/${userId}`),
    create: (data: any) => apiClient.post<any>('/chat', data),
    update: (id: string, data: any) => apiClient.put<any>(`/chat/${id}`, data),
  },
  
  // 评论
  comments: {
    getAll: () => apiClient.get<any[]>('/comments'),
    getById: (id: string) => apiClient.get<any>(`/comments/${id}`),
    create: (data: any) => apiClient.post<any>('/comments', data),
    update: (id: string, data: any) => apiClient.put<any>(`/comments/${id}`, data),
    delete: (id: string) => apiClient.delete<any>(`/comments/${id}`),
  },
  
  // 预约
  appointments: {
    getByUserId: (userId: string) => apiClient.get<any[]>(`/appointments/user/${userId}`),
    create: (data: any) => apiClient.post<any>('/appointments', data),
    update: (id: string, data: any) => apiClient.put<any>(`/appointments/${id}`, data),
  },
  
  // 系统设置
  settings: {
    getAll: () => apiClient.get<any[]>('/settings'),
    getByKey: (key: string) => apiClient.get<any>(`/settings/${key}`),
    update: (key: string, value: string) => apiClient.put<any>(`/settings/${key}`, { value }),
  },
};