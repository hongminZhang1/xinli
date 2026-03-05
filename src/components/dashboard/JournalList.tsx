"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Card from "@/components/ui/Card";
import Avatar from "@/components/ui/Avatar";
import MarkdownRenderer from "@/components/ui/MarkdownRenderer";
import { Plus, Edit, Trash2, Calendar, Tag, Eye, EyeOff } from "lucide-react";
import { useQuery, useMutation } from "@/hooks/useQuery";
import { dbAdapter } from "@/lib/db-adapter";

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

  const { data: journals, refetch } = useQuery(
    `user-journals-${userId}`,
    () => dbAdapter.journal.getByUserId(userId),
    {
      enabled: !!userId,
      initialData: initialJournals,
      staleTime: 30 * 1000, // 30秒内使用 SSR 数据，无需重新请求
    }
  );

  const deleteMutation = useMutation(
    (journalId: string) => dbAdapter.journal.delete(journalId),
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

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* 页面头部 */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">我的日记</h1>
          <p className="text-gray-600 text-sm sm:text-base">记录生活点滴，追踪内心成长</p>
        </div>
        <button
          onClick={() => router.push("/dashboard/journal/new")}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span className="hidden sm:inline">新建日记</span>
          <span className="sm:hidden">写日记</span>
        </button>
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
          userJournals.map((journal: JournalEntry) => (
            <Card
              key={journal.id}
              className="hover:shadow-md transition-shadow p-4 sm:p-6 cursor-pointer"
              onClick={() => handleCardClick(journal.id)}
            >
              <div className="flex items-start justify-between mb-3 sm:mb-4">
                <div className="flex items-start gap-2 sm:gap-3 flex-1 min-w-0">
                  <Avatar
                    username={journal.user.name || journal.user.username}
                    avatar={journal.user.avatar}
                    size="small"
                    className="flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-1 truncate">
                      {journal.title}
                    </h3>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 text-xs sm:text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 flex-shrink-0" />
                        <span>{formatDate(journal.createdAt)}</span>
                      </div>
                      <div className="flex items-center gap-2 sm:gap-4">
                        {journal.mood && (
                          <span className="flex-shrink-0">{getMoodDisplay(journal.mood)}</span>
                        )}
                        <div className="flex items-center gap-1">
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
                </div>

                {/* 操作按钮 */}
                <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
                  <button
                    onClick={(e) => handleEdit(journal.id, e)}
                    className="p-1 sm:p-2 text-gray-400 hover:text-blue-600 rounded"
                  >
                    <Edit className="w-3 h-3 sm:w-4 sm:h-4" />
                  </button>
                  <button
                    onClick={(e) => handleDelete(journal.id, journal.title, e)}
                    disabled={deleteMutation.isLoading}
                    className="p-1 sm:p-2 text-gray-400 hover:text-red-600 rounded"
                  >
                    <Trash2 className="w-3 h-3 sm:w-4 sm:h-4" />
                  </button>
                </div>
              </div>

              {/* 内容预览 */}
              <div className="mb-3 sm:mb-4">
                <div
                  className="text-gray-700 text-sm sm:text-base leading-relaxed overflow-hidden"
                  style={{
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                  }}
                >
                  <MarkdownRenderer
                    content={
                      journal.content.length > 200
                        ? journal.content.substring(0, 200) + "..."
                        : journal.content
                    }
                    className="prose-sm"
                  />
                </div>
              </div>

              {/* 标签 */}
              {Array.isArray(journal.tags) && journal.tags.length > 0 && (
                <div className="flex items-center gap-2">
                  <Tag className="w-3 h-3 text-gray-400 flex-shrink-0" />
                  <div className="flex items-center gap-1 flex-wrap">
                    {journal.tags.slice(0, 2).map((tag: string) => (
                      <span
                        key={tag}
                        className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-xs"
                      >
                        #{tag}
                      </span>
                    ))}
                    {journal.tags.length > 2 && (
                      <span className="text-gray-400 text-xs">+{journal.tags.length - 2}</span>
                    )}
                  </div>
                </div>
              )}
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
