"use client";
import Swal from "sweetalert2";
﻿

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Card from "@/components/ui/Card";
import Avatar from "@/components/ui/Avatar";
import MarkdownRenderer from "@/components/ui/MarkdownRenderer";
import CommentSection from "@/components/dashboard/DetailCommentSection";
import { ArrowLeft, Clock, Heart } from "lucide-react";
import { useJournalDetail, useJournalComments } from "@/hooks/useQuery";
import { apiClient } from "@/lib/api-client";

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

interface JournalDetailClientProps {
  journalId: string;
  initialJournal: JournalEntry | null;
  initialComments: Comment[];
}

export default function JournalDetailClient({
  journalId,
  initialJournal,
  initialComments,
}: JournalDetailClientProps) {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // 使用 SSR 初始数据，后台静默刷新
  const { data: journal, isLoading, error: fetchError } = useJournalDetail(
    journalId,
    true,
    initialJournal
  );
  const { data: commentsData } = useJournalComments(journalId, true, initialComments);
  const { refetch: refetchJournal } = useJournalDetail(journalId, true, initialJournal);

  const [localComments, setLocalComments] = useState<Comment[]>(initialComments);
  const [error, setError] = useState("");
  const { data: session } = useSession();
  const [localLikes, setLocalLikes] = useState<number>(initialJournal?.likes || 0);
  const [hasLiked, setHasLiked] = useState<boolean>(false);

  useEffect(() => {
    if (session?.user?.id) {
      apiClient.get(`/users/${session.user.id}/likes`)
        .then((data: any) => {
          if (Array.isArray(data) && data.includes(journalId)) {
            setHasLiked(true);
          }
        })
        .catch(err => console.error(err));
    }
  }, [session?.user?.id, journalId]);

  useEffect(() => {
    if (journal?.likes !== undefined) {
      setLocalLikes(journal.likes);
    }
  }, [journal?.likes]);

  const handleLike = async () => {
    if (!session) {
      Swal.fire("请先登录后点赞");
      return;
    }
    if (hasLiked) {
      Swal.fire("您已经点过赞啦");
      return;
    }
    try {
      setLocalLikes(prev => prev + 1); // 乐观更新
      setHasLiked(true);
      await apiClient.post(`/journal/${journalId}/like`, { userId: session.user.id });
      refetchJournal(); // 重新获取数据
    } catch (err: any) {
      console.error("点赞失败", err);
      // 还原
      setHasLiked(false);
      if (journal?.likes !== undefined) {
        setLocalLikes(journal.likes); 
      } else {
        setLocalLikes(prev => prev - 1);
      }
      if (err.message || err.error) {
        Swal.fire(err.message || err.error || "点赞失败");
      }
    }
  };

  // 同步评论数据
  useEffect(() => {
    if (commentsData) {
      setLocalComments(commentsData);
    }
  }, [commentsData]);

  // 处理错误状态
  useEffect(() => {
    if (fetchError) {
      if (fetchError.includes("404")) {
        setError("文章不存在");
      } else if (fetchError.includes("403")) {
        setError("这是私密文章，无法查看");
      } else {
        setError("获取文章失败");
      }
    }
  }, [fetchError]);

  const getBackText = () => {
    if (typeof window !== "undefined") {
      const hasJournalInHistory = sessionStorage.getItem("fromJournalPage");
      if (hasJournalInHistory || document.referrer.includes("/dashboard/journal")) {
        return "返回我的日记";
      }
    }
    return "返回文章广场";
  };

  const handleBackClick = () => {
    if (typeof window !== "undefined") {
      sessionStorage.removeItem("fromJournalPage");
    }
    router.back();
  };

  const getMoodDisplay = (moodValue?: string) =>
    moodOptions.find((m) => m.value === moodValue)?.label ?? null;

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleString("zh-CN");

  const getUserDisplayName = (user: { username: string; name?: string }) =>
    user.name || user.username;

  const handleCommentAdded = (newComment: Comment) => {
    setLocalComments((prev) => [newComment, ...prev]);
  };

  // 如果 SSR 没有数据且还在加载，显示骨架屏
  if (!initialJournal && isLoading) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <Card className="text-center p-8">
          <p>加载中...</p>
        </Card>
      </div>
    );
  }

  const displayJournal = journal || initialJournal;

  if (error || !displayJournal) {
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
        onClick={handleBackClick}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        {isMounted ? getBackText() : "返回文章广场"}
      </button>

      {/* 文章详情 */}
      <Card className="p-6">
        {/* 文章头部信息 */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-4">
            <Avatar
              username={getUserDisplayName(displayJournal.user)}
              avatar={displayJournal.user.avatar}
              size="large"
              className="flex-shrink-0"
            />
            <div>
              <div className="font-semibold text-gray-800">
                {getUserDisplayName(displayJournal.user)}
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Clock className="w-4 h-4" />
                {isMounted ? formatDate(displayJournal.createdAt) : ''}
              </div>
            </div>
          </div>
          {displayJournal.mood && (
            <div className="text-xl">{getMoodDisplay(displayJournal.mood)}</div>
          )}
        </div>

        {/* 文章标题 */}
        <h1 className="text-2xl sm:text-3xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          {displayJournal.title}
        </h1>

        {/* 文章内容 */}
        <div className="mb-6">
          <MarkdownRenderer content={displayJournal.content} />
        </div>

        {/* 标签 */}
        {Array.isArray(displayJournal.tags) && displayJournal.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {displayJournal.tags.map((tag: string) => (
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
          <div 
            className={`flex items-center gap-2 cursor-pointer hover:text-pink-500 transition-colors ${hasLiked ? "text-pink-500" : ""}`}
            onClick={handleLike}
          >
            <Heart className="w-5 h-5" fill={hasLiked ? "currentColor" : "none"} />
            <span>{localLikes} 点赞</span>
          </div>
          <div className="flex items-center gap-2">
            <span>💬</span>
            <span>{localComments.length} 条评论</span>
          </div>
        </div>
      </Card>

      {/* 评论区 */}
      <div className="mt-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">评论区</h3>
          <CommentSection
            journalId={displayJournal.id}
            initialComments={localComments}
            onCommentAdded={handleCommentAdded}
          />
        </Card>
      </div>
    </div>
  );
}

