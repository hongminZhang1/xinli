"use client";

import Avatar from "@/components/ui/Avatar";

interface AvatarUploadProps {
  username?: string;
}

export default function AvatarUpload({ username }: AvatarUploadProps) {
  return (
    <div className="flex items-start gap-6">
      <div className="flex-shrink-0">
        <Avatar 
          username={username} 
          avatar={null}  // 强制传入null，显示默认头像
          size="large"
          className="ring-4 ring-white shadow-lg"
        />
      </div>
      
      <div className="flex-1 space-y-4">
        <div>
          <h3 className="text-lg font-medium text-gray-900">头像</h3>
          <p className="text-sm text-gray-500">
            暂时使用默认字母头像，头像功能维护完成后将重新开放。
          </p>
        </div>
        
        <div className="flex flex-col">
          <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-sm text-yellow-800">
              📢 头像功能暂时维护中，当前所有用户都使用默认字母头像显示。
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}