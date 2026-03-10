"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { apiClient } from "@/lib/api-client";
import Card from "@/components/ui/Card";
import Avatar from "@/components/ui/Avatar";
import MarkdownRenderer from "@/components/ui/MarkdownRenderer";
import { Plus, Edit, Trash2, Calendar, Tag, Eye, EyeOff, Heart } from "lucide-react";
import { useQuery, useMutation } from "@/hooks/useQuery";

type JournalEntry = {
  id: string;
  title: string;
  content: string;
  mood?: string;
  tags: string[];
  isPrivate: boolean;
  likes: number;
  createdAt: string;
  user: {
    id: string;
    username: string;
    name?: string;
    avatar?: string;
  };
};

const moodOptions = [
  { value: "happy", label: "😊 开心" },
  { value: "sad", label: "😢 悲伤" },
  { value: "anxious", label: "😰 焦虑" },
  { value: "angry", label: "😡 愤怒" },
  { value: "calm", label: "😌 平静" },
  { value: "excited", label: "🤩 兴奋" },
  { value: "tired", label: "😴 疲惫" },
  { value: "peaceful", label: "🕊️ 宁静" },
];

interface JournalListProps {
  initialJournals: JournalEntry[];
  userId: string;
}

export default function JournalList({ initialJournals, userId }: JournalListProps) {
  const router = useRouter();
  const { data: session } = useSession();
  const [isMounted, setIsMounted] = useState(false);
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
        .catch(err => console.error(err));
    }
  }, [session?.user?.id]);

  const { data: journals, refetch } = useQuery(
    `user-journals-${userId}`,
    async () => {
      const res = await fetch('/api/journal');
      if (!res.ok) throw new Error('获取日记失败');
      return res.json();
    },
    {
      enabled: !!userId,
      initialData: initialJournals,
      staleTime: 30 * 1000,
    }
  );

  const deleteMutation = useMutation(
    async (journalId: string) => {
      const res = await fetch(`/api/journal/${journalId}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('删除失败');
      return res.json();
    },
    { onSuccess: () => refetch() }
  );

  const getMoodDisplay = (moodValue?: string) =>
    moodOptions.find((m) => m.value === moodValue)?.label ?? null;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const diffInHours = Math.floor((Date.now() - date.getTime()) / (1000 * 60 * 60));
    if (diffInHours < 24) return "今天";
    if (diffInHours < 48) return "昨天";
    return date.toLocaleDateString("zh-CN");
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

  const handleCardClick = (journalId: string) => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem("fromJournalPage", "true");
    }
    router.push(`/dashboard/square/${journalId}`);
  };

  const handleEdit = (journalId: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    router.push(`/dashboard/journal/edit/${journalId}`);
  };

  const handleDelete = async (journalId: string, title: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (confirm(`确定要删除日记"${title}"吗？此操作不可恢复。`)) {
      try {
        await deleteMutation.mutate(journalId);
      } catch {
        alert("删除失败，请稍后重试");
      }
    }
  };

  const userJournals = Array.isArray(journals) ? journals : initialJournals;
  const totalCount = userJournals.length;
  const privateCount = userJournals.filter(j => j.isPrivate).length;
  const publicCount = totalCount - privateCount;

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* 页面头部及统计信息 */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100 dark:border-gray-700">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">我的日记</h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm sm:text-base">记录生活点滴，追踪内心成长</p>
          </div>
          <div className="flex flex-wrap items-center gap-3 sm:gap-6">
            <div className="flex items-center gap-4 px-4 py-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
              <div className="flex flex-col items-center">
                <span className="text-xs text-gray-500 dark:text-gray-400">总计</span>
                <span className="font-bold text-lg text-gray-900 dark:text-white">{totalCount}</span>
              </div>
              <div className="w-px h-8 bg-gray-200 dark:bg-gray-600"></div>
              <div className="flex flex-col items-center">
                <span className="text-xs text-gray-500 dark:text-gray-400">公开</span>
                <span className="font-bold text-lg text-blue-600 dark:text-blue-400">{publicCount}</span>
              </div>
              <div className="w-px h-8 bg-gray-200 dark:bg-gray-600"></div>
              <div className="flex flex-col items-center">
                <span className="text-xs text-gray-500 dark:text-gray-400">私密</span>
                <span className="font-bold text-lg text-purple-600 dark:text-purple-400">{privateCount}</span>
              </div>
            </div>

            <button
              onClick={() => router.push("/dashboard/journal/new")}
              className="flex items-center gap-2 px-5 py-3 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition shadow-sm hover:shadow-md active:scale-95"
            >
              <Plus className="w-5 h-5" />
              <span>写日记</span>
            </button>
          </div>
        </div>
      </div>

      {/* 日记列表 */}
      <div className="space-y-4">
        {userJournals.length === 0 ? (
          <Card className="text-center p-6 sm:p-12">
            <div className="mb-4">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <Plus className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" />
              </div>
              <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-2">还没有日记</h3>
              <p className="text-gray-500 mb-4 sm:mb-6 text-sm sm:text-base">开始记录你的第一篇日记吧</p>
              <button
                onClick={() => router.push("/dashboard/journal/new")}
                className="px-4 sm:px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm sm:text-base"
              >
                写第一篇日记
              </button>
            </div>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {userJournals.map((journal: JournalEntry) => (
              <div
                key={journal.id}
                className="group relative bg-white dark:bg-gray-800 rounded-xl p-5 sm:p-6 cursor-pointer border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-xl hover:border-blue-200 dark:hover:border-blue-800 transition-all duration-300 transform hover:-translate-y-1"
                onClick={() => handleCardClick(journal.id)}
              >
                {/* 装饰侧边带用于区分私密/公开 */}
                <div className={`absolute left-0 top-0 bottom-0 w-1.5 rounded-l-xl ${journal.isPrivate ? 'bg-purple-400' : 'bg-blue-400'}`}></div>
                
                <div className="flex items-start justify-between mb-4 pl-2">
                  <div className="flex items-start gap-3 flex-1 min-w-0">
                    <Avatar
                      username={journal.user.name || journal.user.username}
                      avatar={journal.user.avatar}
                      size="small"
                      className="flex-shrink-0 ring-2 ring-gray-50 dark:ring-gray-800"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1 truncate group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {journal.title}
                      </h3>
                      <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 flex-shrink-0" />
                          <span>{isMounted ? formatDate(journal.createdAt) : ''}</span>
                        </div>
                        {journal.mood && (
                          <span className="flex items-center bg-gray-50 dark:bg-gray-700 px-2 py-0.5 rounded-md text-gray-600 dark:text-gray-300 border border-gray-100 dark:border-gray-600">
                            {getMoodDisplay(journal.mood)}
                          </span>
                        )}
                        <div className={`flex items-center gap-1.5 px-2 py-0.5 rounded-md text-white font-medium shadow-sm ${journal.isPrivate ? "bg-purple-500" : "bg-blue-500"}`}>
                          {journal.isPrivate ? (
                            <EyeOff className="w-3 h-3" />
                          ) : (
                            <Eye className="w-3 h-3" />
                          )}
                          <span>{journal.isPrivate ? "私密" : "公开"}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 操作按钮 */}
                  <div className="flex items-center gap-2 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={(e) => handleEdit(journal.id, e)}
                      className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-full transition-colors"
                      title="编辑"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={(e) => handleDelete(journal.id, journal.title, e)}
                      disabled={deleteMutation.isLoading}
                      className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-full transition-colors"
                      title="删除"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* 内容预览 */}
                <div className="mb-4 pl-2">
                  <div
                    className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed overflow-hidden prose prose-sm dark:prose-invert max-w-none"
                    style={{
                      display: "-webkit-box",
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: "vertical",
                    }}
                  >
                    {journal.content.replace(/[#*`_]/g, '') /* 简单去除部分Markdown以优化预览 */}
                  </div>
                </div>

                {/* 标签 */}
                {Array.isArray(journal.tags) && journal.tags.length > 0 && (
                  <div className="flex items-center gap-2 pt-3 border-t border-gray-50 dark:border-gray-700/50 pl-2">
                    <Tag className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                    <div className="flex items-center gap-1.5 overflow-hidden">
                      {journal.tags.slice(0, 3).map((tag: string) => (
                        <span
                          key={tag}
                          className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-1 rounded text-[11px] font-medium truncate"
                        >
                          #{tag}
                        </span>
                      ))}
                      {journal.tags.length > 3 && (
                        <span className="text-gray-400 text-[11px]">+{journal.tags.length - 3}</span>
                      )}
                    </div>
                  </div>
                )}
                
                {/* 互动数据 */}
                <div className="flex items-center gap-4 pt-3 mt-2 border-t border-gray-50 dark:border-gray-700/50 pl-2 text-gray-400 dark:text-gray-500">
                    <div 
                      className={`flex items-center gap-1.5 hover:text-pink-500 transition-colors cursor-pointer ${likedJournals.includes(journal.id) ? 'text-pink-500' : ''}`}
                      onClick={(e) => handleLike(e, journal.id)}
                    >
                    <Heart className="w-3.5 h-3.5" fill={likedJournals.includes(journal.id) ? "currentColor" : "none"} />
                    <span className="text-[11px] font-medium">{journal.likes || 0}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
