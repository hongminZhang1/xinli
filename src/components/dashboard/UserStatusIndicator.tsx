'use client';

import { Session } from 'next-auth';

interface UserStatusIndicatorProps {
  session: Session | null;
}

export default function UserStatusIndicator({ session }: UserStatusIndicatorProps) {
  if (!session?.user) {
    return null;
  }

  const isActive = session.user.isActive;
  const role = session.user.role;

  const getStatusText = () => {
    if (!isActive) return '离线';
    return '在线';
  };

  const getStatusColor = () => {
    if (!isActive) return 'bg-gray-400';
    return 'bg-green-400';
  };

  return (
    <div className="flex items-center gap-2 text-sm">
      <div className={`w-2 h-2 rounded-full ${getStatusColor()}`}></div>
      <span className="text-gray-600">{getStatusText()}</span>
      {role !== 'USER' && (
        <div className="ml-2 px-2 py-0.5 bg-gray-100 rounded text-xs text-gray-600">
          专业用户
        </div>
      )}
    </div>
  );
}