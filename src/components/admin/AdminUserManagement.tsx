"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { useUsers, useMutation } from "@/hooks/useQuery";

interface User {
  id: string;
  username: string;
  email?: string;
  name?: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}

export default function AdminUserManagement() {
  const [updating, setUpdating] = useState<string | null>(null);
  
  // 使用缓存的用户查询
  const { data: users, isLoading: loading, error, refetch } = useUsers();
  
  // 更改用户角色的mutation
  const changeUserRoleMutation = useMutation(
    ({ userId, action }: { userId: string; action: 'promote' | 'demote' }) =>
      fetch('/api/admin/users', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, action })
      }),
    {
      onSuccess: () => {
        refetch(); // 刷新用户列表
        setUpdating(null);
      },
      onError: (error) => {
        console.error('更改用户角色失败:', error);
        setUpdating(null);
      },
      invalidateQueries: ['/api/admin/users']
    }
  );

  const changeUserRole = async (userId: string, action: 'promote' | 'demote') => {
    setUpdating(userId);
    try {
      await changeUserRoleMutation.mutate({ userId, action });
    } catch (error) {
      console.error('更改用户角色失败:', error);
      setUpdating(null);
    }
  };

  if (loading) {
    return <div className="text-center py-8">加载中...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-600">加载失败: {error}</div>;
  }

  if (!users || users.length === 0) {
    return <div className="text-center py-8 text-gray-500">暂无用户数据</div>;
  }

  return (
    <div className="overflow-hidden">
      <div className="flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <table className="min-w-full divide-y divide-gray-300">
              <thead>
                <tr>
                  <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                    用户名
                  </th>
                  <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    角色
                  </th>
                  <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    注册时间
                  </th>
                  <th className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900">
                    操作
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {users?.map((user: any) => (
                  <tr key={user.id}>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-0">
                      <div className="flex items-center">
                        <div className="h-8 w-8 flex-shrink-0">
                          <div className="h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center">
                            <span className="text-xs font-medium text-gray-700">
                              {user.username.charAt(0).toUpperCase()}
                            </span>
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="font-medium text-gray-900">{user.username}</div>
                          {user.email && (
                            <div className="text-gray-500">{user.email}</div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      <span className={cn(
                        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
                        user.role === 'ADMIN' 
                          ? 'bg-red-100 text-red-800' 
                          : user.role === 'COUNSELOR'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-gray-100 text-gray-800'
                      )}>
                        {user.role === 'ADMIN' ? '管理员' : 
                         user.role === 'COUNSELOR' ? '咨询师' : '用户'}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {new Date(user.createdAt).toLocaleDateString('zh-CN')}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 text-center">
                      <div className="flex gap-2 justify-center">
                        {user.role === 'USER' && (
                          <button
                            onClick={() => changeUserRole(user.id, 'promote')}
                            disabled={updating === user.id}
                            className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium hover:bg-blue-200 disabled:opacity-50"
                          >
                            {updating === user.id ? '更新中...' : '提升为咨询师'}
                          </button>
                        )}
                        {user.role === 'COUNSELOR' && (
                          <button
                            onClick={() => changeUserRole(user.id, 'demote')}
                            disabled={updating === user.id}
                            className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-xs font-medium hover:bg-gray-200 disabled:opacity-50"
                          >
                            {updating === user.id ? '更新中...' : '降为普通用户'}
                          </button>
                        )}
                        {user.role === 'ADMIN' && (
                          <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-xs font-medium">
                            管理员
                          </span>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      
      {users.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          暂无用户数据
        </div>
      )}
    </div>
  );
}