"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Card from "@/components/ui/Card";
import Avatar from "@/components/ui/Avatar";
import MarkdownRenderer from "@/components/ui/MarkdownRenderer";
import { Clock, MessageCircle, Heart } from "lucide-react";
import { useJournals } from "@/hooks/useQuery";
import { apiClient } from "@/lib/api-client";

type JournalEntry = {
  id: string;
  title: string;
  content: string;
  mood?: string;
  tags: string[];
  likes: number;
  createdAt: string;
  user: {
    id: string;
    username: string;
    name?: string;
    avatar?: string;
  };
  comments?: any[];
  commentCount?: number;
};

const moodStyleMap: Record<string, { bg: string, text: string, gradient: string, border: string }> = {
  happy: { bg: "bg-emerald-100 dark:bg-emerald-900/30", text: "text-emerald-700 dark:text-emerald-300", gradient: "from-emerald-500/20 to-teal-500/5", border: "border-emerald-200 dark:border-emerald-800" },
  sad: { bg: "bg-blue-100 dark:bg-blue-900/30", text: "text-blue-700 dark:text-blue-300", gradient: "from-blue-500/20 to-indigo-500/5", border: "border-blue-200 dark:border-blue-800" },
  anxious: { bg: "bg-amber-100 dark:bg-amber-900/30", text: "text-amber-700 dark:text-amber-300", gradient: "from-amber-500/20 to-orange-500/5", border: "border-amber-200 dark:border-amber-800" },
  angry: { bg: "bg-red-100 dark:bg-red-900/30", text: "text-red-700 dark:text-red-300", gradient: "from-red-500/20 to-rose-500/5", border: "border-red-200 dark:border-red-800" },
  calm: { bg: "bg-teal-100 dark:bg-teal-900/30", text: "text-teal-700 dark:text-teal-300", gradient: "from-teal-500/20 to-cyan-500/5", border: "border-teal-200 dark:border-teal-800" },
  excited: { bg: "bg-pink-100 dark:bg-pink-900/30", text: "text-pink-700 dark:text-pink-300", gradient: "from-pink-500/20 to-fuchsia-500/5", border: "border-pink-200 dark:border-pink-800" },
  tired: { bg: "bg-slate-100 dark:bg-slate-900/30", text: "text-slate-700 dark:text-slate-300", gradient: "from-slate-500/20 to-gray-500/5", border: "border-slate-200 dark:border-slate-800" },
  peaceful: { bg: "bg-indigo-100 dark:bg-indigo-900/30", text: "text-indigo-700 dark:text-indigo-300", gradient: "from-indigo-500/20 to-violet-500/5", border: "border-indigo-200 dark:border-indigo-800" }
};

const moodOptions = [
  { value: "happy", label: "😊 开心" },
  { value: "sad", label: "😢 悲伤" },
  { value: "anxious", label: "😰 焦虑" },
  { value: "angry", label: "😡 愤怒" },
  { value: "calm", label: "😌 平静" },
  { value: "excited", label: "🤩 兴奋" },
  { value: "tired", label: "😴 疲惫" },
  { value: "peaceful", label: "🕊️ 宁静" }
];

const getMoodStyle = (moodValue?: string) => {
  if (!moodValue || !moodStyleMap[moodValue]) {
    return { bg: "bg-gray-100 dark:bg-gray-800", text: "text-gray-700 dark:text-gray-300", gradient: "from-gray-500/10 to-gray-500/5", border: "border-gray-200 dark:border-gray-800" };
  }
  return moodStyleMap[moodValue];
};

export default function ArticleSquare({ initialData }: { initialData?: any[] } = {}) {
  const { data: session } = useSession();
  const router = useRouter();
  const { data, isLoading, error, refetch } = useJournals('public', initialData);
  const [isMounted, setIsMounted] = useState(false);
  const [timeFilter, setTimeFilter] = useState<'all' | 'week' | 'month' | 'year'>('all');
  const [likedJournals, setLikedJournals] = useState<string[]>([]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (session?.user?.id) {
      apiClient.get(`/users/${session.user.id}/likes`)
        .then((data: any) => {
          if (Array.isArray(data)) setLikedJournals(data);
        })
        .catch(err => console.error("获取点赞记录失败", err));
    }
  }, [session?.user?.id]);
  
  // 从API数据中提取journals - 现在API已经只返回公开的日记
  const allJournals = Array.isArray(data) ? data : [];

  const journals = React.useMemo(() => {
    if (timeFilter === 'all') return allJournals;
    
    const now = new Date();
    return allJournals.filter((journal: any) => {
      const date = new Date(journal.createdAt);
      const diffMs = now.getTime() - date.getTime();
      const diffDays = diffMs / (1000 * 60 * 60 * 24);
      
      if (timeFilter === 'week') return diffDays <= 7;
      if (timeFilter === 'month') return diffDays <= 30;
      if (timeFilter === 'year') return diffDays <= 365;
      
      return true;
    });
  }, [allJournals, timeFilter]);

  // 计算各个时间段的文章数量
  const counts = React.useMemo(() => {
    const now = new Date();
    let weekCount = 0;
    let monthCount = 0;
    let yearCount = 0;

    allJournals.forEach((journal: any) => {
      const date = new Date(journal.createdAt);
      const diffMs = now.getTime() - date.getTime();
      const diffDays = diffMs / (1000 * 60 * 60 * 24);

      if (diffDays <= 7) weekCount++;
      if (diffDays <= 30) monthCount++;
      if (diffDays <= 365) yearCount++;
    });

    return {
      all: allJournals.length,
      week: weekCount,
      month: monthCount,
      year: yearCount,
    };
  }, [allJournals]);

  // 移除自动预加载，避免重复API请求

  const getMoodDisplay = (moodValue?: string) => {
    const moodOption = moodOptions.find(m => m.value === moodValue);
    return moodOption ? moodOption.label : null;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    if (days === 0) {
      return "今天";
    } else if (days === 1) {
      return "昨天";
    } else if (days < 7) {
      return `${days}天前`;
    } else {
      return date.toLocaleDateString("zh-CN");
    }
  };

  const handleLike = async (e: React.MouseEvent, journalId: string) => {
    e.stopPropagation();
    if (!session) {
      alert("请先登录后点赞");
      return;
    }
    if (likedJournals.includes(journalId)) {
      alert("您已经点过赞啦");
      return;
    }
    
    // 乐观更新
    setLikedJournals(prev => [...prev, journalId]);
    
    try {
      await apiClient.post(`/journal/${journalId}/like`, { userId: session.user.id });
      refetch();
    } catch (error: any) {
      console.error("点赞失败", error);
      // 回退乐观更新
      setLikedJournals(prev => prev.filter(id => id !== journalId));
      if (error.message || error.error) {
        alert(error.message || error.error || "点赞失败");
      }
    }
  };

  const getUserDisplayName = (user: { username: string; name?: string }) => {
    return user.name || user.username;
  };

  const handleJournalClick = (journalId: string) => {
    if (!session) {
      alert("请先登录查看文章详情");
      return;
    }
    // 清除日记页面标记，表示从文章广场来
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem('fromJournalPage');
    }
    router.push(`/dashboard/square/${journalId}`);
  };

  if (isLoading) {
    return (
      <Card className="text-center p-8">
        <p>加载中...</p>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="text-center p-8 text-red-600">
        <p>{error}</p>
        <button
          onClick={refetch}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          重新加载
        </button>
      </Card>
    );
  }

  return (
    <div className="space-y-8">
      {/* 头部专业级封面/横幅设计 */}
      <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-800 dark:via-gray-800 dark:to-indigo-900/40 p-6 sm:p-8 shadow-sm border border-indigo-100/60 dark:border-gray-700">
        <div className="relative z-10 w-full">
          <div className="flex items-center gap-4 mb-3">
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-indigo-950 dark:text-indigo-100">文章广场</h2>
            <div className="px-3 py-1 bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 text-sm font-medium rounded-full border border-indigo-200 dark:border-indigo-800">
              {counts.all} 篇公开文章
            </div>
          </div>
          <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base leading-relaxed truncate">
            在一个安全的空间里，探索自我、分享心情。在这里，我们互相倾听、互相支持，共同完成心灵的疗愈与成长。
          </p>
        </div>
        {/* 背景装饰图形 */}
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-indigo-200 dark:bg-indigo-600 opacity-20 blur-3xl"></div>
        <div className="absolute bottom-0 right-20 mb-[-10%] w-32 h-32 rounded-full border-4 border-indigo-100 dark:border-indigo-800 opacity-50"></div>
      </div>

      {/* 筛选按钮组 */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setTimeFilter('all')}
          className={`flex items-center px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
            timeFilter === 'all'
              ? 'bg-indigo-600 text-white'
              : 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 border border-indigo-100 dark:border-gray-700'
          }`}
        >
          全部 <span className={`ml-1.5 px-2 py-0.5 rounded-full font-mono text-xs font-bold ${
            timeFilter === 'all' ? 'bg-indigo-500 text-white' : 'bg-indigo-200/60 text-indigo-800 dark:bg-gray-700 dark:text-gray-200'
          }`}>{counts.all}</span>
        </button>
        <button
          onClick={() => setTimeFilter('week')}
          className={`flex items-center px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
            timeFilter === 'week'
              ? 'bg-indigo-600 text-white'
              : 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 border border-indigo-100 dark:border-gray-700'
          }`}
        >
          最近一周 <span className={`ml-1.5 px-2 py-0.5 rounded-full font-mono text-xs font-bold ${
            timeFilter === 'week' ? 'bg-indigo-500 text-white' : 'bg-indigo-200/60 text-indigo-800 dark:bg-gray-700 dark:text-gray-200'
          }`}>{counts.week}</span>
        </button>
        <button
          onClick={() => setTimeFilter('month')}
          className={`flex items-center px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
            timeFilter === 'month'
              ? 'bg-indigo-600 text-white'
              : 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 border border-indigo-100 dark:border-gray-700'
          }`}
        >
          最近一月 <span className={`ml-1.5 px-2 py-0.5 rounded-full font-mono text-xs font-bold ${
            timeFilter === 'month' ? 'bg-indigo-500 text-white' : 'bg-indigo-200/60 text-indigo-800 dark:bg-gray-700 dark:text-gray-200'
          }`}>{counts.month}</span>
        </button>
        <button
          onClick={() => setTimeFilter('year')}
          className={`flex items-center px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
            timeFilter === 'year'
              ? 'bg-indigo-600 text-white'
              : 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 border border-indigo-100 dark:border-gray-700'
          }`}
        >
          最近一年 <span className={`ml-1.5 px-2 py-0.5 rounded-full font-mono text-xs font-bold ${
            timeFilter === 'year' ? 'bg-indigo-500 text-white' : 'bg-indigo-200/60 text-indigo-800 dark:bg-gray-700 dark:text-gray-200'
          }`}>{counts.year}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {journals.length === 0 ? (
          <div className="col-span-full">
            <Card className="text-center p-12 bg-gray-50 dark:bg-gray-800/50 border-dashed border-2 shadow-none">
              <p className="text-gray-500 dark:text-gray-400 text-lg">还没有公开的文章，快去写下第一篇吧！</p>
            </Card>
          </div>
        ) : (
          journals.map((journal: any) => {
            const moodStyle = getMoodStyle(journal.mood);
            return (
              <div
                key={journal.id}
                onClick={() => handleJournalClick(journal.id)}
                className="group cursor-pointer flex flex-col h-full bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 dark:border-gray-700"
              >
                {/* 顶部彩色条，根据心情变化 */}
                <div className={`h-1.5 w-full bg-gradient-to-r ${moodStyle.gradient}`}></div>
                
                <div className="flex flex-col flex-grow p-5 sm:p-6">
                  {/* 用户信息与日期区域 */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3 min-w-0">
                      <Avatar 
                        username={getUserDisplayName(journal.user)} 
                        avatar={journal.user.avatar}
                        size="small"
                        className="ring-2 ring-gray-50 dark:ring-gray-800 flex-shrink-0"
                      />
                      <div className="flex items-center gap-2 min-w-0">
                        <span className="text-base font-semibold text-gray-900 dark:text-gray-100 truncate">
                          {getUserDisplayName(journal.user)}
                        </span>
                        {/* 心情贴纸 */}
                        {journal.mood && (
                          <div className={`px-2.5 py-1 rounded-full text-xs font-medium flex items-center flex-shrink-0 ${moodStyle.bg} ${moodStyle.text} border ${moodStyle.border}`}>
                            {getMoodDisplay(journal.mood)}
                          </div>
                        )}
                      </div>
                    </div>
                    {/* 发布时间 - 右侧显示 */}
                    <div className="flex items-center gap-1 text-sm text-gray-400 dark:text-gray-500 flex-shrink-0 ml-2">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{isMounted ? formatDate(journal.createdAt) : ''}</span>
                    </div>
                  </div>

                  {/* 标题 */}
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-2 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {journal.title}
                  </h3>

                  {/* 内容摘要 */}
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 overflow-hidden" style={{
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                  }}>
                    {journal.content.replace(/[#*`_>\-=\[\]!]/g, '').trim()}
                  </p>

                  {/* 底部互动区与标签 */}
                  <div className="mt-auto pt-4 border-t border-gray-100 dark:border-gray-700 flex items-center justify-between">
                    <div className="flex items-center gap-1.5 overflow-hidden w-2/3">
                      {Array.isArray(journal.tags) && journal.tags.length > 0 && (
                        journal.tags.slice(0, 2).map((tag: string) => (
                          <span
                            key={tag}
                            className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2.5 py-1 rounded-md text-[10px] sm:text-xs font-medium truncate"
                          >
                            #{tag}
                          </span>
                        ))
                      )}
                      {Array.isArray(journal.tags) && journal.tags.length > 2 && (
                        <span className="text-gray-400 dark:text-gray-500 text-[10px] sm:text-xs font-medium shrink-0">
                          +{journal.tags.length - 2}
                        </span>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-3 shrink-0 text-gray-400 dark:text-gray-500">
                        <div 
                          className={`flex items-center gap-1 hover:text-pink-500 transition-colors cursor-pointer ${likedJournals.includes(journal.id) ? 'text-pink-500' : ''}`}
                          onClick={(e) => handleLike(e, journal.id)}
                        >
                          <Heart className="w-4 h-4" fill={likedJournals.includes(journal.id) ? "currentColor" : "none"} />
                          <span className="text-xs font-medium">{journal.likes || 0}</span>
                      </div>
                      <div className="flex items-center gap-1 group-hover:text-blue-500 transition-colors">
                        <MessageCircle className="w-4 h-4" />
                        <span className="text-xs font-medium">{Array.isArray(journal.comments) ? journal.comments.length : (journal.commentCount || 0)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}