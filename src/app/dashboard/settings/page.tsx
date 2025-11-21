"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import AvatarUpload from "@/components/ui/AvatarUpload";

export default function SettingsPage() {
  const { data: session, update: updateSession } = useSession();
  const router = useRouter();
  const [currentAvatar, setCurrentAvatar] = useState<string | null>(null);

  useEffect(() => {
    if (session?.user) {
      setCurrentAvatar(session.user.avatar || null);
    }
  }, [session?.user?.avatar, session?.user?.id]);

  const handleAvatarUpdate = (avatarUrl: string | null) => {
    setCurrentAvatar(avatarUrl);
    // 强制刷新session
    updateSession();
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-900">账户设置</h1>
        <button
          onClick={() => router.back()}
          className="px-4 py-2 text-gray-600 hover:text-gray-900 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
        >
          返回
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {/* 个人信息部分 */}
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-xl font-semibold mb-6">个人信息</h2>
          
          <div className="space-y-6">
            {/* 头像设置 */}
            <AvatarUpload
              currentAvatar={currentAvatar}
              username={session?.user?.username}
              onAvatarUpdate={handleAvatarUpdate}
            />

            {/* 用户名显示 */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                用户名
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="text"
                  value={session?.user?.username || ""}
                  disabled
                  className="flex-1 p-3 border border-gray-200 rounded-lg bg-gray-50 text-gray-500"
                />
                <span className="text-sm text-gray-500">用户名暂不支持修改</span>
              </div>
            </div>
          </div>
        </div>

        {/* 安全设置部分 */}
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-xl font-semibold mb-6">安全设置</h2>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div>
                <h3 className="font-medium text-gray-900">修改密码</h3>
                <p className="text-sm text-gray-500">定期修改密码以保护账户安全</p>
              </div>
              <button className="px-4 py-2 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                修改
              </button>
            </div>
          </div>
        </div>

        {/* 偏好设置部分 */}
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-6">偏好设置</h2>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-gray-900">通知设置</h3>
                <p className="text-sm text-gray-500">管理你接收的通知类型</p>
              </div>
              <button className="px-4 py-2 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                配置
              </button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-gray-900">隐私设置</h3>
                <p className="text-sm text-gray-500">控制你的信息可见性</p>
              </div>
              <button className="px-4 py-2 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                配置
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 保存按钮 */}
      <div className="mt-6 flex justify-end">
        <button className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
          保存设置
        </button>
      </div>
    </div>
  );
}