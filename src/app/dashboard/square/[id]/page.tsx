"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Card from "@/components/ui/Card";
import CommentSection from "@/components/dashboard/DetailCommentSection";
import { ArrowLeft, Clock, User } from "lucide-react";

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
  comments: Comment[];
  commentCount?: number;
};

type Comment = {
  id: string;
  content: string;
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

export default function JournalDetailPage({ params }: { params: { id: string } }) {
  const { data: session } = useSession();
  const router = useRouter();
  const [journal, setJournal] = useState<JournalEntry | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    fetchJournalDetail();
  }, [params.id]);

  const fetchJournalDetail = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/journal/${params.id}`);
      if (!response.ok) {
        if (response.status === 404) {
          setError("文章不存在");
        } else if (response.status === 403) {
          setError("这是私密文章，无法查看");
        } else {
          setError("获取文章失败");
        }
        return;
      }
      const data = await response.json();
      setJournal(data);
      
      // 获取评论
      const commentsResponse = await fetch(`/api/journal/${params.id}/comments`);
      if (commentsResponse.ok) {
        const commentsData = await commentsResponse.json();
        setComments(commentsData);
      }
    } catch (error) {
      console.error("获取文章失败:", error);
      setError("获取文章失败");
    } finally {
      setIsLoading(false);
    }
  };

  const getMoodDisplay = (moodValue?: string) => {
    const moodOption = moodOptions.find(m => m.value === moodValue);
    return moodOption ? moodOption.label : null;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString("zh-CN");
  };

  const getUserDisplayName = (user: { username: string; name?: string }) => {
    return user.name || user.username;
  };

  const handleCommentAdded = (newComment: Comment) => {
    setComments([newComment, ...comments]);
    if (journal) {
      setJournal({
        ...journal,
        commentCount: (journal.commentCount || 0) + 1
      });
    }
  };

  if (!session) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <Card className="text-center p-8">
          <p>请先登录以查看文章详情</p>
        </Card>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <Card className="text-center p-8">
          <p>加载中...</p>
        </Card>
      </div>
    );
  }

  if (error || !journal) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <Card className="text-center p-8 text-red-600">
          <p>{error || "文章不存在"}</p>
          <button
            onClick={() => router.back()}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            返回
          </button>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* 返回按钮 */}
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        返回文章广场
      </button>

      {/* 文章详情 */}
      <Card className="p-6">
        {/* 文章头部信息 */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
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
            <div>
              <div className="font-semibold text-gray-800">
                {getUserDisplayName(journal.user)}
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Clock className="w-4 h-4" />
                {formatDate(journal.createdAt)}
              </div>
            </div>
          </div>
          {journal.mood && (
            <div className="text-xl">
              {getMoodDisplay(journal.mood)}
            </div>
          )}
        </div>

        {/* 文章标题 */}
        <h1 className="text-2xl font-bold mb-4 text-gray-800">
          {journal.title}
        </h1>

        {/* 文章内容 */}
        <div className="text-gray-700 mb-6 whitespace-pre-wrap leading-relaxed">
          {journal.content}
        </div>

        {/* 标签 */}
        {Array.isArray(journal.tags) && journal.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {journal.tags.map((tag) => (
              <span
                key={tag}
                className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* 互动信息 */}
        <div className="flex items-center gap-6 text-gray-600 pb-6 border-b">
          <div className="flex items-center gap-2">
            <span>❤️</span>
            <span>{journal.likes} 点赞</span>
          </div>
          <div className="flex items-center gap-2">
            <span>💬</span>
            <span>{comments.length} 条评论</span>
          </div>
        </div>
      </Card>

      {/* 评论区 */}
      <div className="mt-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">评论区</h3>
          <CommentSection
            journalId={journal.id}
            initialComments={comments}
            onCommentAdded={handleCommentAdded}
          />
        </Card>
      </div>
    </div>
  );
}