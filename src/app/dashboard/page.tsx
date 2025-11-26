import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import Link from "next/link";
import Avatar from "@/components/ui/Avatar";
import UserRoleCard from "@/components/dashboard/UserRoleCard";
import UserStatusIndicator from "@/components/dashboard/UserStatusIndicator";
import QuickActions from "@/components/dashboard/QuickActions";
import RealTimeDisplay from "@/components/dashboard/RealTimeDisplay";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  const getTimeGreeting = () => {
    const hour = new Date().getUTCHours()+8;
    if (hour < 6) return "夜深了";
    if (hour < 12) return "早上好";
    if (hour < 18) return "下午好";
    return "晚上好";
  };

  // 角色 配置
  const roleConfig = {
    USER: {
      title: '用户',
      description: '关注自己的心理健康，记录情绪变化，寻求专业帮助',
      icon: '🌱',
      bgGradient: 'from-green-50 to-emerald-50',
      borderColor: 'border-green-200',
      titleColor: 'text-green-700',
      dotColor: 'bg-green-400',
      badgeColor: 'bg-green-100 text-green-700',
      gradientColor: 'from-green-600 to-green-700'
    },
    COUNSELOR: {
      title: '咨询师',
      description: '帮助用户解决心理问题，提供专业的心理咨询服务',
      icon: '👩‍⚕️',
      bgGradient: 'from-amber-50 to-orange-50',
      borderColor: 'border-amber-200',
      titleColor: 'text-amber-700',
      dotColor: 'bg-amber-400',
      badgeColor: 'bg-amber-100 text-amber-700',
      gradientColor: 'from-amber-600 to-amber-700'
    },
    ADMIN: {
      title: '管理员',
      description: '管理平台运营，维护系统稳定，监督服务质量',
      icon: '⚙️',
      bgGradient: 'from-purple-50 to-violet-50',
      borderColor: 'border-purple-200',
      titleColor: 'text-purple-700',
      dotColor: 'bg-purple-400',
      badgeColor: 'bg-purple-100 text-purple-700',
      gradientColor: 'from-purple-600 to-purple-700'
    }
  };

  const userRole = (session?.user?.role as keyof typeof roleConfig) || 'USER';
  const config = roleConfig[userRole];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* 欢迎区域 */}
      <div className="mb-8">
        <div className={`relative overflow-hidden bg-gradient-to-r ${config.bgGradient} border ${config.borderColor} rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 mb-6`}>
          {/* 背景装饰 */}
          <div className="absolute top-0 right-0 -mr-4 -mt-4 w-24 h-24 bg-white/20 rounded-full"></div>
          <div className="absolute bottom-0 left-0 -ml-8 -mb-8 w-32 h-32 bg-white/10 rounded-full"></div>
          
          <div className="relative z-10">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 flex-1">
                <div className="relative">
                  <Avatar 
                    username={session?.user?.username} 
                    avatar={session?.user?.avatar}
                    size="large"
                  />
                  {/* 在线状态指示器 */}
                  <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-white shadow-sm ${session?.user?.isActive ? 'bg-green-400' : 'bg-gray-400'}`}></div>
                </div>
                
                <div className="flex-1">
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                    {getTimeGreeting()}, {session?.user?.username || '访客'}!
                  </h1>
                  
                  <div className="flex items-center gap-4 text-gray-600">
                    <p className="text-lg">
                      欢迎回到 <span className="font-semibold text-blue-600">心晴驿站</span>
                    </p>
                    <div className={`px-3 py-1 rounded-full text-xs font-medium ${config.badgeColor} flex items-center gap-1`}>
                      <span className="text-sm">{config.icon}</span>
                      {config.title}
                    </div>
                    <UserStatusIndicator session={session} />
                  </div>
                  
                  <p className="text-gray-600 mt-2 leading-relaxed">
                    {config.description}
                  </p>
                </div>
              </div>
              
              <RealTimeDisplay />
            </div>
          </div>
        </div>

        {/* 快速操作区域 */}
        <QuickActions session={session} />
      </div>

      {/* 统计信息区域 */}
      <div className="bg-white/50 backdrop-blur-sm border border-white/20 rounded-2xl p-6 shadow-lg">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          <span>📈</span>
          使用统计
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">0</div>
            <div className="text-gray-600">本周情绪记录</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">0</div>
            <div className="text-gray-600">对话次数</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">0</div>
            <div className="text-gray-600">日记条数</div>
          </div>
        </div>
      </div>
    </div>
  );
}
