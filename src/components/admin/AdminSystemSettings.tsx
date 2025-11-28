"use client";

import { useState } from "react";
import { Switch } from "@headlessui/react";
import { cn } from "@/lib/utils";
import { useSystemSettings, useMutation } from "@/hooks/useQuery";

interface SystemSetting {
  id: string;
  key: string;
  value: string;
  description?: string;
  updatedAt: string;
}

export default function AdminSystemSettings() {
  const [updating, setUpdating] = useState<string | null>(null);
  
  // 使用缓存的系统设置查询
  const { data: settings, isLoading: loading, error, refetch } = useSystemSettings();
  
  // 更新设置的mutation
  const updateSettingMutation = useMutation(
    async ({ key, value }: { key: string; value: string }) => {
      // 使用dbAdapter而不是直接API调用
      const { dbAdapter } = require('@/lib/db-adapter');
      return dbAdapter.systemSetting.update(key, value);
    },
    {
      onSuccess: () => {
        refetch(); // 刷新设置列表
        setUpdating(null);
      },
      onError: (error) => {
        console.error('更新设置失败:', error);
        setUpdating(null);
      },
      invalidateQueries: ['/api/admin/settings']
    }
  );

  const updateSetting = async (key: string, value: string) => {
    setUpdating(key);
    try {
      await updateSettingMutation.mutate({ key, value });
    } catch (error) {
      console.error('更新系统设置失败:', error);
      setUpdating(null);
    }
  };

  const getRegistrationSetting = () => {
    return settings?.find((s: any) => s.key === 'registration_enabled');
  };

  const isRegistrationEnabled = () => {
    const setting = getRegistrationSetting();
    return setting?.value === 'true';
  };

  const toggleRegistration = () => {
    const currentValue = isRegistrationEnabled();
    updateSetting('registration_enabled', (!currentValue).toString());
  };

  if (loading) {
    return <div className="text-center py-8">加载中...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-600">加载失败: {error}</div>;
  }

  if (!settings || settings.length === 0) {
    return <div className="text-center py-8 text-gray-500">暂无系统设置</div>;
  }

  return (
    <div className="space-y-6">
      {/* 注册开关 */}
      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
        <div className="flex-1">
          <h3 className="text-sm font-medium text-gray-900">用户注册</h3>
          <p className="text-sm text-gray-500 mt-1">
            控制是否允许新用户注册账户
          </p>
        </div>
        <Switch
          checked={isRegistrationEnabled()}
          onChange={toggleRegistration}
          disabled={updating === 'registration_enabled'}
          className={cn(
            isRegistrationEnabled() ? 'bg-green-600' : 'bg-gray-200',
            'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2 disabled:opacity-50'
          )}
        >
          <span
            aria-hidden="true"
            className={cn(
              isRegistrationEnabled() ? 'translate-x-5' : 'translate-x-0',
              'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
            )}
          />
        </Switch>
      </div>

      {/* 状态显示 */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-blue-800">
              当前状态
            </h3>
            <div className="mt-2 text-sm text-blue-700">
              <p>
                用户注册: {isRegistrationEnabled() ? 
                  <span className="text-green-600 font-medium">开放</span> : 
                  <span className="text-red-600 font-medium">关闭</span>
                }
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}