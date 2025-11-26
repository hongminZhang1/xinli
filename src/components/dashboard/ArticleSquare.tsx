"use client";

import React, { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Card from "@/components/ui/Card";
import { Clock, MessageCircle, Heart } from "lucide-react";
import { useJournals } from "@/hooks/useQuery";
import { useAutoPreloadJournals } from "@/hooks/usePreload";

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

// 预加载配置
const PRELOAD_ARTICLE_COUNT = 5; // 预加载前5条文章

export default function ArticleSquare() {
  const { data: session } = useSession();
  const router = useRouter();
  const { data, isLoading, error, refetch } = useJournals('public');
  
  // 从缓存数据中提取journals数组
  const journals = data?.journals || [];

  // 自动预加载前5条文章详情和评论
  useAutoPreloadJournals(journals, {
    enabled: !!session, // 只有登录用户才预加载
    count: PRELOAD_ARTICLE_COUNT,
    delay: 100
  });

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
      <Card className="p-4">
        <div className="text-center">
          <h3 className="text-lg font-semibold mb-2">文章广场</h3>
          <p className="text-gray-600">
            这里是大家分享心情和感受的地方，互相支持，共同成长 💝
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
              <Card className="p-4 hover:shadow-md transition-shadow">
              <div className="flex items-start gap-4">
                {/* 用户头像 */}
                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold flex-shrink-0">
                  {journal.user.avatar ? (
                    <img 
                      src={journal.user.avatar} 
                      alt={getUserDisplayName(journal.user)}
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    getUserDisplayName(journal.user).charAt(0).toUpperCase()
                  )}
                </div>

                {/* 文章信息 */}
                <div className="flex-1 min-w-0">
                  {/* 标题和心情 */}
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="text-lg font-semibold text-gray-800 truncate">
                      {journal.title}
                    </h4>
                    {journal.mood && (
                      <span className="ml-2 text-lg flex-shrink-0">
                        {getMoodDisplay(journal.mood)}
                      </span>
                    )}
                  </div>

                  {/* 内容预览 */}
                  <p className="text-gray-600 text-sm mb-2 overflow-hidden" style={{
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical'
                  }}>
                    {journal.content.length > 100 
                      ? `${journal.content.substring(0, 100)}...`
                      : journal.content
                    }
                  </p>

                  {/* 底部信息栏 */}
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <div className="flex items-center gap-4">
                      <span className="font-medium">
                        {getUserDisplayName(journal.user)}
                      </span>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {formatDate(journal.createdAt)}
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1">
                        <Heart className="w-3 h-3" />
                        {journal.likes}
                      </div>
                      <div className="flex items-center gap-1">
                        <MessageCircle className="w-3 h-3" />
                        {journal.commentCount || 0}
                      </div>
                    </div>
                  </div>

                  {/* 标签（只显示前3个）*/}
                  {Array.isArray(journal.tags) && journal.tags.length > 0 && (
                    <div className="flex items-center gap-1 mt-2">
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