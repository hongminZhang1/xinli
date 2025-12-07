import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import Link from "next/link";
import Avatar from "@/components/ui/Avatar";
import UserRoleCard from "@/components/dashboard/UserRoleCard";
import UserStatusIndicator from "@/components/dashboard/UserStatusIndicator";
import QuickActions from "@/components/dashboard/QuickActions";
import RealTimeDisplay from "@/components/dashboard/RealTimeDisplay";
import ApiStatusWidget from "@/components/dashboard/ApiStatusWidget";
import { 
  Sparkles, 
  Heart, 
  MessageCircle, 
  BookOpen, 
  TrendingUp, 
  Calendar,
  Award,
  Users,
  Settings,
  BarChart3
} from "lucide-react";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  const getTimeGreeting = () => {
    const hour = new Date().getUTCHours() + 8;
    if (hour < 6) return { text: "夜深了", icon: "🌙", mood: "rest" };
    if (hour < 12) return { text: "早上好", icon: "🌅", mood: "fresh" };
    if (hour < 18) return { text: "下午好", icon: "☀️", mood: "active" };
    return { text: "晚上好", icon: "🌆", mood: "calm" };
  };

  const greeting = getTimeGreeting();

  // 增强的角色配置
  const roleConfig = {
    USER: {
      title: '用户',
      description: '探索内心世界，记录成长足迹，与AI伙伴一起找到内心的平静',
      icon: '🌱',
      bgGradient: 'from-success/10 via-success/5 to-transparent',
      iconBg: 'bg-success',
      accentColor: 'text-success',
      features: ['情绪追踪', 'AI对话', '成长日记', '心理测评']
    },
    COUNSELOR: {
      title: '咨询师',
      description: '用专业知识点亮他人心灯，成为青少年心灵成长的引路人',
      icon: '👩‍⚕️',
      bgGradient: 'from-accent/10 via-accent/5 to-transparent',
      iconBg: 'bg-accent',
      accentColor: 'text-accent',
      features: ['客户管理', '咨询记录', '专业工具', '数据分析']
    },
    ADMIN: {
      title: '管理员',
      description: '守护平台安全稳定，为每一个用户创造温暖安全的心理空间',
      icon: '⚙️',
      bgGradient: 'from-primary/10 via-primary/5 to-transparent',
      iconBg: 'bg-primary',
      accentColor: 'text-primary',
      features: ['系统监控', '用户管理', '数据统计', '平台设置']
    }
  };

  const userRole = (session?.user?.role as keyof typeof roleConfig) || 'USER';
  const config = roleConfig[userRole];

  return (
    <div className="min-h-screen">
      {/* 欢迎区域 */}
      <section className="mb-6 lg:mb-8">
        <div className="relative overflow-hidden modern-card p-4 sm:p-6 lg:p-8 mb-4 lg:mb-6">
          {/* 背景渐变装饰 */}
          <div className={`absolute inset-0 bg-gradient-to-br ${config.bgGradient}`}></div>
          
          {/* 浮动装饰元素 */}
          <div className="absolute top-4 right-8 w-16 lg:w-20 h-16 lg:h-20 bg-accent/5 rounded-full blur-2xl animate-float"></div>
          <div className="absolute bottom-4 left-8 w-12 lg:w-16 h-12 lg:h-16 bg-primary/5 rounded-full blur-xl animate-float" style={{ animationDelay: '2s' }}></div>
          
          <div className="relative z-10">
            <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4 lg:gap-6">
              
              {/* 用户信息区域 */}
              <div className="flex items-start sm:items-center gap-3 sm:gap-4 flex-1 w-full">
                <div className="relative flex-shrink-0">
                  <Avatar 
                    username={session?.user?.username} 
                    avatar={session?.user?.avatar}
                    size="large"
                    className="ring-2 sm:ring-4 ring-white/20 shadow-lg w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20"
                  />
                  {/* 在线状态指示器 */}
                  <div className={`absolute -bottom-0.5 -right-0.5 sm:-bottom-1 sm:-right-1 w-4 h-4 sm:w-6 sm:h-6 rounded-full border-2 sm:border-3 border-card shadow-lg flex items-center justify-center ${session?.user?.isActive ? 'bg-success' : 'bg-muted'}`}>
                    {session?.user?.isActive && <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white rounded-full animate-pulse" />}
                  </div>
                </div>
                
                <div className="space-y-2 sm:space-y-3 flex-1 min-w-0">
                  <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                    <h1 className="font-display text-xl sm:text-2xl md:text-3xl lg:text-4xl text-foreground truncate">
                      {greeting.text}, {session?.user?.username || '朋友'}!
                    </h1>
                    <span className="text-xl sm:text-2xl lg:text-3xl animate-float flex-shrink-0">{greeting.icon}</span>
                  </div>
                  
                  <div className="flex flex-wrap items-center gap-2 sm:gap-4">
                    <p className="text-sm sm:text-base lg:text-lg text-muted-foreground">
                      欢迎回到 <span className="font-semibold text-primary">心晴驿站</span>
                    </p>
                    
                    <div className={`inline-flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 lg:px-4 py-1 sm:py-1.5 lg:py-2 rounded-lg sm:rounded-xl backdrop-blur-sm bg-card/50 border border-border/20`}>
                      <div className={`w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 ${config.iconBg} rounded-md sm:rounded-lg flex items-center justify-center text-white text-xs sm:text-sm flex-shrink-0`}>
                        {config.icon}
                      </div>
                      <span className={`font-heading font-medium text-xs sm:text-sm ${config.accentColor}`}>
                        {config.title}
                      </span>
                    </div>
                    
                    <div className="hidden sm:block">
                      <UserStatusIndicator session={session} />
                    </div>
                  </div>
                  
                  <p className="text-xs sm:text-sm lg:text-base text-muted-foreground leading-relaxed line-clamp-2 lg:line-clamp-none">
                    {config.description}
                  </p>

                  {/* 角色特色功能标签 */}
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {config.features.map((feature, index) => (
                      <span 
                        key={feature} 
                        className="px-2 sm:px-3 py-1 text-[10px] sm:text-xs font-medium bg-card/60 backdrop-blur-sm border border-border/20 rounded-md sm:rounded-lg text-muted-foreground fade-in-up"
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* 实时信息区域 */}
              <div className="flex-shrink-0 w-full lg:w-auto">
                <RealTimeDisplay />
              </div>
            </div>
          </div>
        </div>

        {/* 快速操作区域 */}
        <QuickActions session={session} />
      </section>

      {/* 主要内容区域 */}
      <section className="space-y-4 lg:space-y-6">
        <div className={`grid gap-4 lg:gap-6 ${session?.user?.role === 'ADMIN' ? 'lg:grid-cols-3' : 'lg:grid-cols-2'}`}>
          
          {/* 统计概览卡片 */}
          <div className={`modern-card p-4 sm:p-5 lg:p-6 space-y-4 lg:space-y-6 ${session?.user?.role === 'ADMIN' ? 'lg:col-span-2' : ''}`}>
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-primary to-accent rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0">
                <BarChart3 className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
              <div className="min-w-0">
                <h2 className="font-heading text-base sm:text-lg lg:text-xl text-foreground truncate">成长数据</h2>
                <p className="text-xs sm:text-sm text-muted-foreground truncate">记录你的心理健康成长轨迹</p>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
              <div className="text-center space-y-1.5 sm:space-y-2">
                <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16 bg-primary/10 rounded-xl lg:rounded-2xl flex items-center justify-center mx-auto mb-2 sm:mb-3">
                  <Heart className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 text-primary" />
                </div>
                <div className="font-display text-lg sm:text-xl lg:text-2xl text-foreground">7</div>
                <div className="text-[10px] sm:text-xs lg:text-sm text-muted-foreground">本周情绪</div>
                <div className="w-full bg-muted rounded-full h-1.5 sm:h-2">
                  <div className="bg-primary rounded-full h-1.5 sm:h-2 transition-all duration-500" style={{ width: '70%' }}></div>
                </div>
              </div>
              
              <div className="text-center space-y-1.5 sm:space-y-2">
                <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16 bg-success/10 rounded-xl lg:rounded-2xl flex items-center justify-center mx-auto mb-2 sm:mb-3">
                  <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 text-success" />
                </div>
                <div className="font-display text-lg sm:text-xl lg:text-2xl text-foreground">15</div>
                <div className="text-[10px] sm:text-xs lg:text-sm text-muted-foreground">AI对话</div>
                <div className="w-full bg-muted rounded-full h-1.5 sm:h-2">
                  <div className="bg-success rounded-full h-1.5 sm:h-2 transition-all duration-500" style={{ width: '85%' }}></div>
                </div>
              </div>
              
              <div className="text-center space-y-1.5 sm:space-y-2">
                <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16 bg-accent/10 rounded-xl lg:rounded-2xl flex items-center justify-center mx-auto mb-2 sm:mb-3">
                  <BookOpen className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 text-accent" />
                </div>
                <div className="font-display text-lg sm:text-xl lg:text-2xl text-foreground">3</div>
                <div className="text-[10px] sm:text-xs lg:text-sm text-muted-foreground">成长日记</div>
                <div className="w-full bg-muted rounded-full h-1.5 sm:h-2">
                  <div className="bg-accent rounded-full h-1.5 sm:h-2 transition-all duration-500" style={{ width: '45%' }}></div>
                </div>
              </div>
            </div>

            {/* 成长趋势 */}
            <div className="pt-4 lg:pt-6 border-t border-border/20">
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <h3 className="font-heading text-sm sm:text-base lg:text-lg text-foreground">本周成长趋势</h3>
                <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-success">
                  <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span>+12%</span>
                </div>
              </div>
              <div className="grid grid-cols-7 gap-1.5 sm:gap-2">
                {['一', '二', '三', '四', '五', '六', '日'].map((day, index) => (
                  <div key={day} className="text-center">
                    <div className="text-[10px] sm:text-xs text-muted-foreground mb-1.5 sm:mb-2">{day}</div>
                    <div 
                      className="w-full bg-primary/20 rounded-full"
                      style={{ height: `${20 + Math.random() * 30}px` }}
                    >
                      <div 
                        className="w-full bg-gradient-to-t from-primary to-accent rounded-full"
                        style={{ height: '100%' }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* API状态组件 - 只对管理员显示 */}
          {session?.user?.role === 'ADMIN' && (
            <div>
              <ApiStatusWidget />
            </div>
          )}

          {/* 今日目标卡片 - 非管理员显示 */}
          {session?.user?.role !== 'ADMIN' && (
            <div className="modern-card p-4 sm:p-5 lg:p-6 space-y-3 sm:space-y-4">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-success to-success/80 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0">
                  <Award className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </div>
                <div className="min-w-0">
                  <h3 className="font-heading text-base sm:text-lg text-foreground truncate">今日目标</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground truncate">小步前进，温暖成长</p>
                </div>
              </div>
              
              <div className="space-y-2 sm:space-y-3">
                <div className="flex items-center gap-2 sm:gap-3 p-2.5 sm:p-3 bg-success/5 rounded-lg sm:rounded-xl">
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-success rounded-full flex-shrink-0"></div>
                  <span className="text-xs sm:text-sm text-foreground">记录今天的心情</span>
                </div>
                <div className="flex items-center gap-2 sm:gap-3 p-2.5 sm:p-3 bg-primary/5 rounded-lg sm:rounded-xl">
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-primary rounded-full flex-shrink-0"></div>
                  <span className="text-xs sm:text-sm text-foreground">与AI伙伴聊聊天</span>
                </div>
                <div className="flex items-center gap-2 sm:gap-3 p-2.5 sm:p-3 bg-accent/5 rounded-lg sm:rounded-xl">
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-accent rounded-full flex-shrink-0"></div>
                  <span className="text-xs sm:text-sm text-foreground">完成一次心理测评</span>
                </div>
              </div>
              
              <div className="pt-3 sm:pt-4 border-t border-border/20">
                <div className="flex items-center justify-between text-xs sm:text-sm">
                  <span className="text-muted-foreground">今日完成度</span>
                  <span className="font-medium text-success">33%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-1.5 sm:h-2 mt-2">
                  <div className="bg-gradient-to-r from-success to-success/80 rounded-full h-1.5 sm:h-2 transition-all duration-500" style={{ width: '33%' }}></div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 最近活动 */}
        <div className="modern-card p-4 sm:p-5 lg:p-6">
          <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-accent to-accent/80 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0">
              <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </div>
            <div className="min-w-0">
              <h3 className="font-heading text-base sm:text-lg text-foreground truncate">最近活动</h3>
              <p className="text-xs sm:text-sm text-muted-foreground truncate">记录你的成长足迹</p>
            </div>
          </div>
          
          <div className="space-y-3 sm:space-y-4">
            <div className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 bg-primary/5 rounded-lg sm:rounded-xl">
              <div className="w-7 h-7 sm:w-8 sm:h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 sm:mt-1">
                <Heart className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs sm:text-sm text-foreground font-medium">记录了情绪状态</p>
                <p className="text-[10px] sm:text-xs text-muted-foreground line-clamp-2">今天感觉心情不错，和朋友聊天很开心</p>
                <p className="text-[10px] sm:text-xs text-muted-foreground mt-1">2小时前</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 bg-success/5 rounded-lg sm:rounded-xl">
              <div className="w-7 h-7 sm:w-8 sm:h-8 bg-success rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 sm:mt-1">
                <MessageCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs sm:text-sm text-foreground font-medium">完成AI对话</p>
                <p className="text-[10px] sm:text-xs text-muted-foreground line-clamp-2">和小晴聊了关于学习压力的话题</p>
                <p className="text-[10px] sm:text-xs text-muted-foreground mt-1">昨天</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 bg-accent/5 rounded-lg sm:rounded-xl">
              <div className="w-7 h-7 sm:w-8 sm:h-8 bg-accent rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 sm:mt-1">
                <BookOpen className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs sm:text-sm text-foreground font-medium">写了成长日记</p>
                <p className="text-[10px] sm:text-xs text-muted-foreground line-clamp-2">今天的心理测评帮我更了解自己</p>
                <p className="text-[10px] sm:text-xs text-muted-foreground mt-1">2天前</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
