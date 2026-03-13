import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { getApiBaseUrl } from "@/lib/env-config";
import Link from "next/link";
import Avatar from "@/components/ui/Avatar";
import UserRoleCard from "@/components/dashboard/UserRoleCard";
import UserStatusIndicator from "@/components/dashboard/UserStatusIndicator";
import QuickActions from "@/components/dashboard/QuickActions";
import RealTimeDisplay from "@/components/dashboard/RealTimeDisplay";
import ApiStatusWidget from "@/components/dashboard/ApiStatusWidget";
import GrowthTrendChart from "@/components/dashboard/GrowthTrendChart";
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

// ---- 服务端数据拉取 ----
async function fetchGrowthStats(userId: string) {
  const baseUrl = getApiBaseUrl();
  try {
    const [emotionsRes, chatRes, journalRes] = await Promise.allSettled([
      fetch(`${baseUrl}/emotions/user/${userId}`, { cache: 'no-store' }),
      fetch(`${baseUrl}/chat/user/${userId}`, { cache: 'no-store' }),
      fetch(`${baseUrl}/journal/user/${userId}`, { cache: 'no-store' }),
    ]);

    const emotions: any[] = emotionsRes.status === 'fulfilled' && emotionsRes.value.ok
      ? await emotionsRes.value.json() : [];
    const chatSessions: any[] = chatRes.status === 'fulfilled' && chatRes.value.ok
      ? await chatRes.value.json() : [];
    const journals: any[] = journalRes.status === 'fulfilled' && journalRes.value.ok
      ? await journalRes.value.json() : [];

    // 组合最近活动
    const mappedEmotions = emotions.map((e: any) => ({
      id: e.id,
      type: 'emotion' as const,
      title: '记录情绪',
      desc: e.notes || `记录了情绪`,
      date: new Date(e.createdAt)
    }));
    const mappedChats = chatSessions.map((c: any) => ({
      id: c.id,
      type: 'chat' as const,
      title: 'AI对话',
      desc: c.title || '和AI伙伴进行了交流',
      date: new Date(c.updatedAt || c.createdAt)
    }));
    const mappedJournals = journals.map((j: any) => ({
      id: j.id,
      type: 'journal' as const,
      title: '成长日记',
      desc: j.title || '写了一篇日记',
      date: new Date(j.createdAt)
    }));

    const recentActivities = [...mappedEmotions, ...mappedChats, ...mappedJournals]
      .sort((a, b) => b.date.getTime() - a.date.getTime())
      .slice(0, 3);

    // 本周情绪数
    const now = new Date();
    const weekStart = new Date(now);
    weekStart.setDate(now.getDate() - now.getDay()); // 本周日
    weekStart.setHours(0, 0, 0, 0);
    const weekEmotionCount = emotions.filter((e: any) => new Date(e.createdAt) >= weekStart).length;

    // 今日判断（用于目标打卡）
    const todayStart = new Date(now);
    todayStart.setHours(0, 0, 0, 0);
    const todayHasEmotion = emotions.some((e: any) => new Date(e.createdAt) >= todayStart);
    const todayHasChat = chatSessions.some((s: any) => new Date(s.createdAt) >= todayStart || new Date(s.updatedAt) >= todayStart);

    // 计算本周成长趋势(周一至周日)
    const currentDay = now.getDay() || 7; // 1-7
    const monday = new Date(now);
    monday.setDate(now.getDate() - currentDay + 1);
    monday.setHours(0, 0, 0, 0);

    const weekTrend = Array.from({ length: 7 }, (_, i) => {
      const d = new Date(monday);
      d.setDate(monday.getDate() + i);
      const nextDay = new Date(d);
      nextDay.setDate(d.getDate() + 1);

      const dayEmotions = emotions.filter((e: any) => {
        const ed = new Date(e.createdAt);
        return ed >= d && ed < nextDay;
      });
      const dayChats = chatSessions.filter((c: any) => {
        const cd = new Date(c.updatedAt || c.createdAt);
        return cd >= d && cd < nextDay;
      });
      const dayJournals = journals.filter((j: any) => {
        const jd = new Date(j.createdAt);
        return jd >= d && jd < nextDay;
      });

      // 综合成长分数：记录情绪15分，AI对话25分，写日记30分，基础分10分(有任意活动)
      let score = 0;
      let hasActivity = false;
      
      if (dayEmotions.length > 0) { score += Math.min(dayEmotions.length * 15, 30); hasActivity = true; }
      if (dayChats.length > 0) { score += Math.min(dayChats.length * 25, 40); hasActivity = true; }
      if (dayJournals.length > 0) { score += Math.min(dayJournals.length * 30, 50); hasActivity = true; }
      
      if (hasActivity) score += 10;
      
      // 情绪加成：积极情绪额外加分
      dayEmotions.forEach((e: any) => {
        if (['😊', '😄', '🥰', '😍'].some(emoji => (e.emoji || '').includes(emoji))) {
          score += 5;
        }
      });

      // 未来的日期分数为0
      if (d > now) {
        score = 0;
      }

      return Math.min(score, 100);
    });

    return {
      weekEmotionCount,
      chatSessionCount: chatSessions.length,
      journalCount: journals.length,
      todayHasEmotion,
      todayHasChat,
      recentActivities,
      weekTrend,
    };
  } catch {
    return { weekEmotionCount: 0, chatSessionCount: 0, journalCount: 0, todayHasEmotion: false, todayHasChat: false, recentActivities: [], weekTrend: [0, 0, 0, 0, 0, 0, 0] };
  }
}

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  // 拉取真实成长数据
  const stats = session?.user?.id
    ? await fetchGrowthStats(session.user.id)
    : { weekEmotionCount: 0, chatSessionCount: 0, journalCount: 0, todayHasEmotion: false, todayHasChat: false, recentActivities: [], weekTrend: [0, 0, 0, 0, 0, 0, 0] };

  // 今日目标完成数
  const completedGoals = [stats.todayHasEmotion, stats.todayHasChat, false].filter(Boolean).length;
  const goalPercent = Math.round((completedGoals / 3) * 100);

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
                  {/* 在线状态指示器（强制显示浅绿色在线，无动画） */}
                  <div className={`absolute bottom-0 right-0 sm:bottom-0.5 sm:right-0.5 w-3.5 h-3.5 sm:w-4 sm:h-4 lg:w-5 lg:h-5 rounded-full border-2 sm:border-[3px] border-white dark:border-gray-800 shadow-sm bg-[#4ade80]`}>
                  </div>
                </div>
                
                <div className="space-y-2 sm:space-y-3 flex-1 min-w-0">
                  <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                    <h1 className="font-display text-xl sm:text-2xl md:text-3xl lg:text-4xl text-foreground truncate">
                      {greeting.text}, {session?.user?.username || '朋友'}!
                    </h1>
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
      </section>

      {/* 核心功能网格 */}
      <section className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* 左侧主要区域 */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* 快速操作 & 成长数据 组合卡片 */}
            <div className="modern-card p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-lg font-bold font-display">成长概览</h2>
                </div>
                <div className="flex items-center gap-3">
                  {/* 快捷操作提示 */}
                  <div className="font-bold hidden sm:flex items-center gap-2 px-4 py-2 rounded-lg bg-muted/60 border border-border/60 text-xs text-foreground/70">
                    <span>快捷操作</span>
                  </div>
                  <Link 
                     href="/dashboard/emotions" 
                     className="group flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-primary to-primary-600 text-white rounded-xl shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5 transition-all duration-300 active:scale-95"
                   >
                    <span className="text-lg group-hover:scale-110 transition-transform">📊</span>
                    <span className="font-medium">记录情绪</span>
                  </Link>
                  <Link 
                    href="/dashboard/chat" 
                    className="group flex items-center gap-2 px-5 py-2.5 bg-white border border-border/50 text-foreground hover:border-primary/50 hover:text-primary hover:bg-primary/5 rounded-xl shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 active:scale-95"
                  >
                    <span className="text-lg group-hover:scale-110 transition-transform">💬</span>
                    <span className="font-medium">开始对话</span>
                  </Link>
                </div>
              </div>

              {/* 数据展示 */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="p-4 rounded-2xl bg-muted/30 border border-border/50">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-pink-100 flex items-center justify-center text-pink-600">
                      <Heart size={18} />
                    </div>
                    <span className="text-sm font-medium text-muted-foreground">本周情绪</span>
                  </div>
                  <div className="text-3xl font-bold font-display">{stats.weekEmotionCount}</div>
                  <div className="mt-2 h-1.5 w-full bg-pink-100 rounded-full overflow-hidden">
                    <div className="h-full bg-pink-500 rounded-full" style={{ width: `${Math.min(stats.weekEmotionCount / 7 * 100, 100)}%` }} />
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-muted/30 border border-border/50">
                   <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600">
                      <MessageCircle size={18} />
                    </div>
                    <span className="text-sm font-medium text-muted-foreground">AI对话</span>
                  </div>
                  <div className="text-3xl font-bold font-display">{stats.chatSessionCount}</div>
                  <div className="mt-2 h-1.5 w-full bg-blue-100 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 rounded-full" style={{ width: `${Math.min(stats.chatSessionCount / 20 * 100, 100)}%` }} />
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-muted/30 border border-border/50">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center text-amber-600">
                      <BookOpen size={18} />
                    </div>
                    <span className="text-sm font-medium text-muted-foreground">成长日记</span>
                  </div>
                  <div className="text-3xl font-bold font-display">{stats.journalCount}</div>
                  <div className="mt-2 h-1.5 w-full bg-amber-100 rounded-full overflow-hidden">
                    <div className="h-full bg-amber-500 rounded-full" style={{ width: `${Math.min(stats.journalCount / 10 * 100, 100)}%` }} />
                  </div>
                </div>
              </div>

              {/* 趋势图表 - 客户端组件支持切换和交互 */}
              <GrowthTrendChart weekTrend={stats.weekTrend} />
            </div>
          </div>

          {/* 右侧边栏区域 */}
          <div className="space-y-4"> {/* space-y-6 -> space-y-4 */}
            
            {/* 今日目标 */}
            <div className="modern-card p-4 sm:p-5 bg-gradient-to-b from-card to-muted/20">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                    <Award size={18} />
                  </div>
                  <div>
                    <h2 className="text-base font-bold font-display">今日目标</h2>
                  </div>
                </div>
                {/* 完成度移到这里 */}
                <div className="flex flex-col items-end">
                   <span className="text-xs font-medium text-muted-foreground">完成度 <span className="text-primary font-bold">{goalPercent}%</span></span>
                   <div className="h-1.5 w-16 bg-muted rounded-full overflow-hidden mt-1">
                      <div className="h-full bg-primary rounded-full" style={{ width: `${goalPercent}%` }} />
                   </div>
                </div>
              </div>

               <div className="space-y-2">
                 {/* 目标列表 */}
                <div className="flex items-center gap-2.5 p-2 rounded-lg bg-background border border-border/50 shadow-sm">
                   {stats.todayHasEmotion ? (
                     <div className="w-4 h-4 rounded-full border-2 border-primary flex items-center justify-center flex-shrink-0">
                       <div className="w-2 h-2 rounded-full bg-primary" />
                     </div>
                   ) : (
                     <div className="w-4 h-4 rounded-full border-2 border-muted-foreground/30 flex-shrink-0" />
                   )}
                   <span className={`text-xs sm:text-sm ${stats.todayHasEmotion ? 'line-through text-muted-foreground' : ''}`}>记录今天的心情</span>
                </div>
                
                 <div className="flex items-center gap-2.5 p-2 rounded-lg bg-background border border-border/50 shadow-sm">
                   {stats.todayHasChat ? (
                     <div className="w-4 h-4 rounded-full border-2 border-primary flex items-center justify-center flex-shrink-0">
                       <div className="w-2 h-2 rounded-full bg-primary" />
                     </div>
                   ) : (
                     <div className="w-4 h-4 rounded-full border-2 border-muted-foreground/30 flex-shrink-0" />
                   )}
                   <span className={`text-xs sm:text-sm ${stats.todayHasChat ? 'line-through text-muted-foreground' : ''}`}>与AI伙伴聊聊天</span>
                </div>

                <div className="flex items-center gap-2.5 p-2 rounded-lg bg-background border border-border/50 shadow-sm">
                    <div className="w-4 h-4 rounded-full border-2 border-muted-foreground/30 flex items-center justify-center flex-shrink-0">
                   </div>
                   <span className="text-xs sm:text-sm">完成一次心理测评</span>
                </div>
              </div>
            </div>

            {/* 最近活动 */}
            <div className="modern-card p-4 sm:p-5">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-base font-bold font-display">最近活动</h2>
                </div>
              </div>

              <div className="space-y-3">
                {stats.recentActivities.length > 0 ? (
                  stats.recentActivities.map((activity) => {
                    const timeDiff = new Date().getTime() - activity.date.getTime();
                    const hours = Math.floor(timeDiff / (1000 * 60 * 60));
                    const days = Math.floor(hours / 24);
                    let timeStr = '';
                    if (hours < 1) timeStr = '刚刚';
                    else if (hours < 24) timeStr = `${hours}小时前`;
                    else if (days === 1) timeStr = '昨天';
                    else timeStr = `${days}天前`;

                    return (
                      <div key={`${activity.type}-${activity.id}`} className="flex gap-3 p-3 rounded-xl bg-muted/20 border border-border/40 hover:bg-muted/40 transition-colors cursor-pointer">
                        {activity.type === 'emotion' && (
                          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-pink-100 flex items-center justify-center text-pink-600">
                            <Heart size={16} />
                          </div>
                        )}
                        {activity.type === 'chat' && (
                          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                            <MessageCircle size={16} />
                          </div>
                        )}
                        {activity.type === 'journal' && (
                          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center text-amber-600">
                            <BookOpen size={16} />
                          </div>
                        )}
                        <div className="flex-grow min-w-0">
                          <div className="flex items-center justify-between mb-0.5">
                            <span className="text-sm font-medium text-foreground">{activity.title}</span>
                            <span className="text-xs text-muted-foreground font-medium">{timeStr}</span>
                          </div>
                          <p className="text-xs text-muted-foreground line-clamp-1">{activity.desc}</p>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="text-center py-6 text-sm text-muted-foreground">
                    暂无活动记录
                  </div>
                )}
              </div>
            </div>

            {/* 管理员专有内容可以放在这里 */}
             {session?.user?.role === 'ADMIN' && (
              <div className="modern-card p-4">
                <ApiStatusWidget />
              </div>
            )}
            
          </div>
        </div>
      </section>
    </div>
  );
}
