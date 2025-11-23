'use client';

import { Session } from 'next-auth';
import Link from 'next/link';

interface QuickActionsProps {
  session: Session | null;
}

export default function QuickActions({ session }: QuickActionsProps) {
  if (!session?.user) {
    return null;
  }

  const role = session.user.role;

  const userActions = [
    {
      title: '记录情绪',
      description: '快速记录当前心情',
      href: '/dashboard/emotions',
      icon: '📊',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      title: '开始对话',
      description: '与AI助手聊天',
      href: '/dashboard/chat',
      icon: '💬',
      color: 'from-green-500 to-teal-500'
    }
  ];

  const counselorActions = [
    {
      title: '查看预约',
      description: '管理今日预约',
      href: '/dashboard/appointments',
      icon: '📅',
      color: 'from-purple-500 to-indigo-500'
    },
    {
      title: '咨询管理',
      description: '处理咨询请求',
      href: '/dashboard/counseling',
      icon: '👥',
      color: 'from-orange-500 to-red-500'
    }
  ];

  const adminActions = [
    {
      title: '用户管理',
      description: '管理系统用户',
      href: '/dashboard/admin',
      icon: '👥',
      color: 'from-blue-400 to-indigo-500'
    },
    {
      title: '系统设置',
      description: '配置系统参数',
      href: '/dashboard/admin/settings',
      icon: '⚙️',
      color: 'from-violet-500 to-purple-500'
    }
  ];

  const getActions = () => {
    switch (role) {
      case 'COUNSELOR':
        return [...userActions, ...counselorActions];
      case 'ADMIN':
        return [...userActions, ...adminActions];
      default:
        return userActions;
    }
  };

  const actions = getActions();

  return (
    <div className="bg-white/50 backdrop-blur-sm border border-white/20 rounded-2xl p-6 shadow-lg">
      <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
        <span>⚡</span>
        快速操作
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {actions.map((action, index) => (
          <Link
            key={index}
            href={action.href}
            className="group p-4 bg-white rounded-xl border border-gray-100 hover:border-gray-200 hover:shadow-md transition-all duration-200"
          >
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 bg-gradient-to-r ${action.color} rounded-lg flex items-center justify-center text-white text-lg shadow-sm`}>
                {action.icon}
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
                  {action.title}
                </h4>
                <p className="text-sm text-gray-500">{action.description}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}