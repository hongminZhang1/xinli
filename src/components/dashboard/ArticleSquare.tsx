"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Card from "@/components/ui/Card";
import Avatar from "@/components/ui/Avatar";
import MarkdownRenderer from "@/components/ui/MarkdownRenderer";
import { Clock, MessageCircle, Heart } from "lucide-react";
import { useJournals } from "@/hooks/useQuery";

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

export default function ArticleSquare({ initialData }: { initialData?: any[] } = {}) {
  const { data: session } = useSession();
  const router = useRouter();
  const { data, isLoading, error, refetch } = useJournals('public', initialData);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  // 从API数据中提取journals - 现在API已经只返回公开的日记
  const journals = Array.isArray(data) ? data : [];

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
    <div className="space-y-6">
      <Card className="p-3 sm:p-4">
        <div className="text-center">
          <h3 className="text-base sm:text-lg font-semibold mb-2">文章广场</h3>
          <p className="text-gray-600 text-sm sm:text-base">
            <span className="hidden sm:inline">这里是大家分享心情和感受的地方，互相支持，共同成长 💝</span>
            <span className="sm:hidden">分享你的心情，互相支持 💝</span>
          </p>
        </div>
      </Card>

      <div className="space-y-3">
        {journals.length === 0 ? (
          <Card className="text-center p-8">
            <p className="text-gray-500">还没有公开的文章，快去写下第一篇吧！</p>
          </Card>
        ) : (
          journals.map((journal: any) => (
            <div
              key={journal.id}
              onClick={() => handleJournalClick(journal.id)}
              className="cursor-pointer"
            >
              <Card className="p-3 sm:p-4 hover:shadow-md transition-shadow">
              <div className="flex items-start gap-3">
                {/* 桌面端显示头像 */}
                <div className="hidden sm:block flex-shrink-0">
                  <Avatar 
                    username={getUserDisplayName(journal.user)} 
                    avatar={journal.user.avatar}
                    size="medium"
                    className="flex-shrink-0"
                  />
                </div>
                
                {/* 移动端小头像 */}
                <div className="sm:hidden flex-shrink-0">
                  <Avatar 
                    username={getUserDisplayName(journal.user)} 
                    avatar={journal.user.avatar}
                    size="small"
                  />
                </div>

                {/* 文章信息 */}
                <div className="flex-1 min-w-0">
                  {/* 标题和心情 */}
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="text-sm sm:text-lg font-semibold text-gray-800 truncate">
                      {journal.title}
                    </h4>
                    {journal.mood && (
                      <span className="ml-2 text-base sm:text-lg flex-shrink-0">
                        {getMoodDisplay(journal.mood)}
                      </span>
                    )}
                  </div>

                  {/* 内容预览 */}
                  <div className="text-gray-600 text-sm mb-2 overflow-hidden" style={{
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical'
                  }}>
                    <MarkdownRenderer 
                      content={journal.content.length > 100 
                        ? `${journal.content.substring(0, 100)}...`
                        : journal.content
                      } 
                      className="prose-sm"
                    />
                  </div>

                  {/* 底部信息栏 */}
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <div className="flex items-center gap-2 sm:gap-4">
                      <span className="font-medium text-xs sm:text-sm">
                        {getUserDisplayName(journal.user)}
                      </span>
                      <div className="hidden sm:flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {isMounted ? formatDate(journal.createdAt) : ''}
                      </div>
                      <div className="sm:hidden text-xs">
                        {isMounted ? formatDate(journal.createdAt) : ''}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 sm:gap-3">
                      <div className="flex items-center gap-1">
                        <Heart className="w-3 h-3" />
                        <span className="text-xs">{journal.likes}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MessageCircle className="w-3 h-3" />
                        <span className="text-xs">{Array.isArray(journal.comments) ? journal.comments.length : (journal.commentCount || 0)}</span>
                      </div>
                    </div>
                  </div>

                  {/* 标签（只显示前3个）*/}
                  {Array.isArray(journal.tags) && journal.tags.length > 0 && (
                    <div className="hidden sm:flex items-center gap-1 mt-2">
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
                  )}
                </div>
                </div>
              </Card>
            </div>
          ))
        )}
      </div>
    </div>
  );
}