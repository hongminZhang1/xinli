/**
 * API客户端配置
 * 用于连接轻量应用云服务器的API服务
 */

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
      timeout: this.config.timeout,
    };

    try {
      const response = await fetch(url, requestOptions);
      
      if (!response.ok) {
        throw new Error(`API请求失败: ${response.status} ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
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
  baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://193.112.165.180:3001/api',
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
    create: (data: any) => apiClient.post<any>('/users', data),
    update: (id: string, data: any) => apiClient.put<any>(`/users/${id}`, data),
    delete: (id: string) => apiClient.delete<any>(`/users/${id}`),
  },
  
  // 情绪记录
  emotions: {
    getByUserId: (userId: string) => apiClient.get<any[]>(`/emotions/user/${userId}`),
    create: (data: any) => apiClient.post<any>('/emotions', data),
    update: (id: string, data: any) => apiClient.put<any>(`/emotions/${id}`, data),
    delete: (id: string) => apiClient.delete<any>(`/emotions/${id}`),
  },
  
  // 日记条目
  journal: {
    getByUserId: (userId: string) => apiClient.get<any[]>(`/journal/user/${userId}`),
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