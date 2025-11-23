'use client';

import { Session } from 'next-auth';

interface UserRoleCardProps {
  session: Session | null;
}

const roleConfig = {
  USER: {
    title: '用户',
    description: '关注自己的心理健康，记录情绪变化，寻求专业帮助',
    icon: '🌱',
    bgGradient: 'from-blue-50 to-indigo-50',
    borderColor: 'border-blue-200',
    titleColor: 'text-blue-700',
    features: ['情绪记录', '在线咨询', '心理日记', '资源学习']
  },
  COUNSELOR: {
    title: '咨询师',
    description: '帮助用户解决心理问题，提供专业的心理咨询服务',
    icon: '👩‍⚕️',
    bgGradient: 'from-emerald-50 to-teal-50',
    borderColor: 'border-emerald-200',
    titleColor: 'text-emerald-700',
    features: ['接受预约', '在线咨询', '案例管理', '专业建议']
  },
  ADMIN: {
    title: '管理员',
    description: '管理平台运营，维护系统稳定，监督服务质量',
    icon: '⚙️',
    bgGradient: 'from-purple-50 to-violet-50',
    borderColor: 'border-purple-200',
    titleColor: 'text-purple-700',
    features: ['用户管理', '系统设置', '数据统计', '质量监控']
  }
};

export default function UserRoleCard({ session }: UserRoleCardProps) {
  if (!session?.user) {
    return null;
  }

  const userRole = (session.user.role as keyof typeof roleConfig) || 'USER';
  const config = roleConfig[userRole];

  return (
    <div className={`relative overflow-hidden bg-gradient-to-r ${config.bgGradient} border ${config.borderColor} rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300`}>
      {/* 背景装饰 */}
      <div className="absolute top-0 right-0 -mr-4 -mt-4 w-24 h-24 bg-white/20 rounded-full"></div>
      <div className="absolute bottom-0 left-0 -ml-8 -mb-8 w-32 h-32 bg-white/10 rounded-full"></div>
      
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="text-3xl">{config.icon}</div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-sm text-gray-500">当前身份</span>
                <div className={`w-2 h-2 rounded-full ${userRole === 'USER' ? 'bg-blue-400' : userRole === 'COUNSELOR' ? 'bg-emerald-400' : 'bg-purple-400'}`}></div>
              </div>
              <h3 className="text-2xl font-bold">
                <span className={`${config.titleColor} bg-gradient-to-r ${userRole === 'USER' ? 'from-blue-600 to-blue-700' : userRole === 'COUNSELOR' ? 'from-emerald-600 to-emerald-700' : 'from-purple-600 to-purple-700'} bg-clip-text text-transparent`}>
                  {config.title}
                </span>
              </h3>
            </div>
          </div>
          
          {/* 角色徽章 */}
          <div className={`px-3 py-1 rounded-full text-xs font-medium ${userRole === 'USER' ? 'bg-blue-100 text-blue-700' : userRole === 'COUNSELOR' ? 'bg-emerald-100 text-emerald-700' : 'bg-purple-100 text-purple-700'}`}>
            {session.user.username}
          </div>
        </div>

        <p className="text-gray-600 mb-4 leading-relaxed">
          {config.description}
        </p>
      </div>
    </div>
  );
}