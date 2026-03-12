"use client";
import Swal from "sweetalert2";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { apiClient } from "@/lib/api-client";
import Card from "@/components/ui/Card";
import Avatar from "@/components/ui/Avatar";
import MarkdownRenderer from "@/components/ui/MarkdownRenderer";
import { Plus, Edit, Trash2, Calendar, Tag, Eye, EyeOff, Heart, BookOpen, PenLine } from "lucide-react";
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
      Swal.fire("请先登录后点赞");
      return;
    }
    if (likedJournals.includes(journalId)) {
      Swal.fire("您已经点过赞啦");
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
        Swal.fire(error.message || error.error || "点赞失败");
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
    if ((await Swal.fire({title: "提示", text: `确定要删除日记"${title}"吗？此操作不可恢复。`, icon: "warning", showCancelButton: true, confirmButtonText: "确定", cancelButtonText: "取消"})).isConfirmed) {
      try {
        await deleteMutation.mutate(journalId);
      } catch {
        Swal.fire("删除失败，请稍后重试");
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
      <div className="relative overflow-hidden rounded-2xl shadow-lg">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-blue-100 to-indigo-100 dark:from-blue-950/60 dark:via-blue-900/50 dark:to-indigo-900/50"></div>
        <div className="absolute top-0 right-0 w-72 h-72 bg-blue-200/30 rounded-full -translate-y-1/2 translate-x-1/4 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-56 h-56 bg-indigo-200/20 rounded-full translate-y-1/2 -translate-x-1/4 pointer-events-none"></div>
        <div className="relative p-6 sm:p-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-200/60 dark:bg-blue-800/40 rounded-xl flex items-center justify-center border border-blue-200 dark:border-blue-700/50 shadow-inner">
                <BookOpen className="w-6 h-6 text-blue-600 dark:text-blue-300" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-blue-900 dark:text-white mb-0.5">我的日记</h1>
                <p className="text-blue-500 dark:text-blue-300 text-sm sm:text-base">记录生活点滴，追踪内心成长</p>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-3 sm:gap-4">
              <div className="flex items-center gap-1 bg-white/60 dark:bg-white/5 backdrop-blur-sm rounded-xl border border-blue-200 dark:border-white/10">
                <div className="flex flex-col items-center px-4 py-2.5">
                  <span className="text-blue-400 dark:text-blue-300 text-xs mb-0.5">总计</span>
                  <span className="font-bold text-xl text-blue-900 dark:text-white">{totalCount}</span>
                </div>
                <div className="w-px h-10 bg-blue-200 dark:bg-white/20"></div>
                <div className="flex flex-col items-center px-4 py-2.5">
                  <span className="text-blue-400 dark:text-blue-300 text-xs mb-0.5">公开</span>
                  <span className="font-bold text-xl text-emerald-600 dark:text-emerald-300">{publicCount}</span>
                </div>
                <div className="w-px h-10 bg-blue-200 dark:bg-white/20"></div>
                <div className="flex flex-col items-center px-4 py-2.5">
                  <span className="text-blue-400 dark:text-blue-300 text-xs mb-0.5">私密</span>
                  <span className="font-bold text-xl text-purple-600 dark:text-purple-300">{privateCount}</span>
                </div>
              </div>
              <button
                onClick={() => router.push("/dashboard/journal/new")}
                className="flex items-center gap-2 px-5 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-all shadow-md hover:shadow-lg active:scale-95"
              >
                <PenLine className="w-4 h-4" />
                <span>写日记</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 日记列表 */}
      <div className="space-y-4">
        {userJournals.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-inner">
              <BookOpen className="w-10 h-10 text-blue-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">还没有日记</h3>
            <p className="text-gray-400 dark:text-gray-500 mb-6 text-sm max-w-xs">打开心扉，记录属于你的每一个故事与感受</p>
            <button
              onClick={() => router.push("/dashboard/journal/new")}
              className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition-all shadow-md hover:shadow-lg active:scale-95"
            >
              <PenLine className="w-4 h-4" />
              <span>写第一篇日记</span>
            </button>
          </div>
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

                  {/* 右侧操作区 */}
                  <div className="flex items-center gap-1.5 flex-shrink-0">
                    {/* 点赞 - 常驻显示 */}
                    <button
                      onClick={(e) => handleLike(e, journal.id)}
                      className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                        likedJournals.includes(journal.id)
                          ? 'bg-pink-50 dark:bg-pink-900/20 text-pink-500 dark:text-pink-400'
                          : 'bg-gray-50 dark:bg-gray-700/50 text-gray-400 dark:text-gray-500 hover:bg-pink-50 dark:hover:bg-pink-900/20 hover:text-pink-500 dark:hover:text-pink-400'
                      }`}
                    >
                      <Heart className="w-3.5 h-3.5" fill={likedJournals.includes(journal.id) ? "currentColor" : "none"} />
                      <span>{journal.likes || 0}</span>
                    </button>
                    {/* 编辑删除 - hover 显示 */}
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
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
                </div>

                {/* 内容预览 */}
                <div className="mb-4 pl-2">
                  <p
                    className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed overflow-hidden"
                    style={{
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                    }}
                  >
                    {journal.content.replace(/[#*`_>\-=\[\]!]/g, '').trim()}
                  </p>
                </div>

                {/* 标签 */}
                {Array.isArray(journal.tags) && journal.tags.length > 0 && (
                  <div className="flex items-center gap-2 pt-3 border-t border-gray-50 dark:border-gray-700/50 pl-2">
                    <Tag className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                    <div className="flex items-center gap-1.5 overflow-hidden">
                      {journal.tags.slice(0, 3).map((tag: string) => (
                        <span
                          key={tag}
                          className="bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 px-2.5 py-0.5 rounded-full text-[11px] font-medium border border-blue-100 dark:border-blue-800 truncate"
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
                

              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
