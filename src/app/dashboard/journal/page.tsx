"use client";

import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Card from "@/components/ui/Card";
import Avatar from "@/components/ui/Avatar";
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
  { value: "happy", label: "😊 开心", color: "text-green-500" },
  { value: "sad", label: "😢 悲伤", color: "text-blue-500" },
  { value: "anxious", label: "😰 焦虑", color: "text-yellow-500" },
  { value: "angry", label: "😡 愤怒", color: "text-red-500" },
  { value: "calm", label: "😌 平静", color: "text-purple-500" },
  { value: "excited", label: "🤩 兴奋", color: "text-pink-500" },
  { value: "tired", label: "😴 疲惫", color: "text-gray-500" },
  { value: "peaceful", label: "🕊️ 宁静", color: "text-indigo-500" }
];

export default function JournalPage() {
  const { data: session } = useSession();
  const router = useRouter();
  
  // 获取用户的日记
  const { data: journals, isLoading, error, refetch } = useQuery(
    `user-journals-${session?.user?.id}`,
    () => session?.user?.id ? dbAdapter.journal.getByUserId(session.user.id) : Promise.resolve([]),
    { enabled: !!session?.user?.id }
  );

  // 删除日记的mutation
  const deleteMutation = useMutation(
    (journalId: string) => dbAdapter.journal.delete(journalId),
    {
      onSuccess: () => {
        refetch();
      }
    }
  );

  const getMoodDisplay = (moodValue?: string) => {
    const moodOption = moodOptions.find(m => m.value === moodValue);
    return moodOption ? moodOption.label : null;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 24) {
      return "今天";
    } else if (diffInHours < 48) {
      return "昨天";
    } else {
      return date.toLocaleDateString("zh-CN");
    }
  };

  const handleEdit = (journalId: string) => {
    router.push(`/dashboard/journal/edit/${journalId}`);
  };

  const handleDelete = async (journalId: string, title: string) => {
    if (confirm(`确定要删除日记"${title}"吗？此操作不可恢复。`)) {
      try {
        await deleteMutation.mutate(journalId);
      } catch (error) {
        alert("删除失败，请稍后重试");
      }
    }
  };

  if (!session) {
    return (
      <Card className="text-center p-8">
        <p className="text-gray-500">请先登录查看您的日记</p>
      </Card>
    );
  }

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
        <p>加载失败</p>
        <button
          onClick={refetch}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          重新加载
        </button>
      </Card>
    );
  }

  const userJournals = Array.isArray(journals) ? journals : [];

  return (
    <div className="space-y-6">
      {/* 页面头部 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">我的日记</h1>
          <p className="text-gray-600">记录生活点滴，追踪内心成长</p>
        </div>
        <button
          onClick={() => router.push("/dashboard/journal/new")}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Plus className="w-4 h-4" />
          新建日记
        </button>
      </div>

      {/* 日记列表 */}
      <div className="space-y-4">
        {userJournals.length === 0 ? (
          <Card className="text-center p-12">
            <div className="mb-4">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Plus className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">还没有日记</h3>
              <p className="text-gray-500 mb-6">开始记录你的第一篇日记吧</p>
              <button
                onClick={() => router.push("/dashboard/journal/new")}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                写第一篇日记
              </button>
            </div>
          </Card>
        ) : (
          userJournals.map((journal: JournalEntry) => (
            <Card key={journal.id} className="p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3 flex-1">
                  <Avatar 
                    username={journal.user.name || journal.user.username} 
                    avatar={journal.user.avatar}
                    size="small"
                  />
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      {journal.title}
                    </h3>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {formatDate(journal.createdAt)}
                      </div>
                      {journal.mood && (
                        <span>{getMoodDisplay(journal.mood)}</span>
                      )}
                      <div className="flex items-center gap-1">
                        {journal.isPrivate ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                        {journal.isPrivate ? "私密" : "公开"}
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* 操作按钮 */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleEdit(journal.id)}
                    className="p-1 text-gray-400 hover:text-blue-600 rounded"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(journal.id, journal.title)}
                    disabled={deleteMutation.isLoading}
                    className="p-1 text-gray-400 hover:text-red-600 rounded"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* 内容预览 */}
              <div className="mb-4">
                <p className="text-gray-700 text-sm leading-relaxed" style={{
                  display: '-webkit-box',
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden'
                }}>
                  {journal.content}
                </p>
              </div>

              {/* 标签 */}
              {Array.isArray(journal.tags) && journal.tags.length > 0 && (
                <div className="flex items-center gap-2 mb-4">
                  <Tag className="w-3 h-3 text-gray-400" />
                  <div className="flex items-center gap-1 flex-wrap">
                    {journal.tags.slice(0, 3).map((tag: string) => (
                      <span
                        key={tag}
                        className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-xs"
                      >
                        #{tag}
                      </span>
                    ))}
                    {journal.tags.length > 3 && (
                      <span className="text-gray-400 text-xs">+{journal.tags.length - 3}</span>
                    )}
                  </div>
                </div>
              )}

              {/* 查看详情 */}
              <div className="pt-4 border-t">
                <button
                  onClick={() => router.push(`/dashboard/square/${journal.id}`)}
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                >
                  查看详情 →
                </button>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
