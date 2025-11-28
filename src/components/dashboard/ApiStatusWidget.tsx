"use client";

import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Card from '@/components/ui/Card';

export default function ApiStatusWidget() {
  const { data: session } = useSession();
  
  const [status, setStatus] = useState<{
    isConnected: boolean;
    responseTime: number | null;
    lastCheck: Date | null;
    error: string | null;
  }>({
    isConnected: false,
    responseTime: null,
    lastCheck: null,
    error: null,
  });

  const [checking, setChecking] = useState(false);

  const checkApiStatus = async () => {
    setChecking(true);
    const startTime = Date.now();
    
    try {
      // 使用本地health API路由，它会代理到远程服务器
      const response = await fetch('/api/health', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      const data = await response.json();
      
      if (response.ok && data.connected) {
        setStatus({
          isConnected: true,
          responseTime: data.responseTime || (Date.now() - startTime),
          lastCheck: new Date(),
          error: null,
        });
      } else {
        throw new Error(data.error || `HTTP ${response.status}`);
      }
    } catch (error) {
      setStatus({
        isConnected: false,
        responseTime: null,
        lastCheck: new Date(),
        error: error instanceof Error ? error.message : '未知错误',
      });
    } finally {
      setChecking(false);
    }
  };

  useEffect(() => {
    // 只有管理员才检查API状态
    if (session?.user?.role === 'ADMIN') {
      checkApiStatus();
      
      // 每30秒自动检查一次
      const interval = setInterval(checkApiStatus, 30000);
      
      return () => clearInterval(interval);
    }
  }, [session?.user?.role]);

  // 只有管理员才能看到API状态
  if (!session || session.user?.role !== 'ADMIN') {
    return null;
  }

  return (
    <Card className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">API服务状态</h3>
        <button
          onClick={checkApiStatus}
          disabled={checking}
          className="px-3 py-1 text-sm bg-blue-100 text-blue-600 rounded hover:bg-blue-200 disabled:opacity-50"
        >
          {checking ? '检查中...' : '刷新'}
        </button>
      </div>
      
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <div className={`w-3 h-3 rounded-full ${
            status.isConnected ? 'bg-green-500' : 'bg-red-500'
          }`} />
          <span className={`font-medium ${
            status.isConnected ? 'text-green-700' : 'text-red-700'
          }`}>
            {status.isConnected ? '🌐 API服务正常' : '❌ API服务异常'}
          </span>
        </div>
        
        {status.responseTime && (
          <div className="text-sm text-gray-600">
            响应时间: {status.responseTime}ms
          </div>
        )}
        
        {status.lastCheck && (
          <div className="text-sm text-gray-600">
            上次检查: {status.lastCheck.toLocaleTimeString('zh-CN')}
          </div>
        )}
        
        {status.error && (
          <div className="text-sm text-red-600 bg-red-50 p-2 rounded">
            错误: {status.error}
          </div>
        )}
        
        <div className="text-xs text-gray-500 bg-gray-50 p-2 rounded">
          服务器: 193.112.165.180:3001
        </div>
      </div>
    </Card>
  );
}