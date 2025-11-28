"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useMutation } from "@/hooks/useQuery";
import Avatar from "@/components/ui/Avatar";

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

interface DetailCommentSectionProps {
  journalId: string;
  initialComments: Comment[];
  onCommentAdded: (comment: Comment) => void;
}

export default function DetailCommentSection({ journalId, initialComments, onCommentAdded }: DetailCommentSectionProps) {
  const { data: session } = useSession();
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState<Comment[]>(initialComments);

  useEffect(() => {
    setComments(initialComments);
  }, [initialComments]);

  // 添加评论的mutation
  const addCommentMutation = useMutation(
    (commentData: { content: string }) => 
      fetch(`/api/journal/${journalId}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(commentData)
      }),
    {
      onSuccess: (newCommentData) => {
        // 更新本地状态
        setComments(prev => [newCommentData, ...prev]);
        setNewComment("");
        if (onCommentAdded) {
          onCommentAdded(newCommentData);
        }
      },
      invalidateQueries: [`/api/journal/${journalId}/comments`]
    }
  );

  const getUserDisplayName = (user: { username: string; name?: string }) => {
    return user.name || user.username;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString("zh-CN");
  };

  const handleSubmitComment = async () => {
    if (!newComment.trim() || !session?.user?.id) return;

    try {
      await addCommentMutation.mutate({
        content: newComment.trim()
      });
    } catch (error) {
      console.error("发布评论失败:", error);
      alert("发布评论失败，请稍后重试");
    }
  };

  return (
    <div className="space-y-4">
      {/* 写评论 */}
      {session && (
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex gap-3">
            <Avatar 
              username={session.user?.name || session.user?.username || 'U'} 
              avatar={session.user?.avatar}
              size="medium"
              className="flex-shrink-0"
            />
            <div className="flex-1">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="写下你的想法..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={3}
              />
              <div className="flex justify-end mt-2">
                <button
                  onClick={handleSubmitComment}
                  disabled={!newComment.trim() || addCommentMutation.isLoading}
                  className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {addCommentMutation.isLoading ? "发布中..." : "发布评论"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 评论列表 */}
      {comments.length > 0 ? (
        <div className="space-y-4">
          {comments.map((comment) => (
            <div key={comment.id} className="flex gap-3">
              <Avatar 
                username={getUserDisplayName(comment.user)} 
                avatar={comment.user.avatar}
                size="medium"
                className="flex-shrink-0"
              />
              <div className="flex-1">
                <div className="bg-white border rounded-lg px-4 py-3">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-medium text-gray-800">
                      {getUserDisplayName(comment.user)}
                    </span>
                    <span className="text-sm text-gray-500">
                      {formatDate(comment.createdAt)}
                    </span>
                  </div>
                  <div className="text-gray-700 whitespace-pre-wrap">
                    {comment.content}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 text-gray-500">
          {session ? "还没有评论，来写第一条吧！" : "登录后可以查看和发表评论"}
        </div>
      )}
    </div>
  );
}