"use client";

import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { useJournalComments, useMutation } from "@/hooks/useQuery";
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

interface CommentSectionProps {
  journalId: string;
  comments: Comment[];
  onCommentAdded: (comment: Comment) => void;
}

export default function CommentSection({ journalId, comments, onCommentAdded }: CommentSectionProps) {
  const { data: session } = useSession();
  const [newComment, setNewComment] = useState("");
  const [showComments, setShowComments] = useState(false);
  const [showCommentInput, setShowCommentInput] = useState(false);
  
  // 使用缓存的评论查询
  const { data: loadedComments, isLoading: isLoadingComments, refetch: refetchComments } = useJournalComments(journalId, showComments);
  
  const commentCount = loadedComments?.length || comments?.length || 0;
  
  // 添加评论的mutation
  const addCommentMutation = useMutation(
    async (commentData: { content: string }) => {
      if (!session?.user?.id) {
        throw new Error('用户未登录');
      }
      // 使用API客户端进行评论创建
      const response = await fetch('/api/proxy', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          url: '/api/comments',
          method: 'POST',
          data: {
            content: commentData.content,
            journalEntryId: journalId, // 使用正确的字段名
            userId: session.user.id // 使用实际的用户ID
          }
        })
      });
      
      if (!response.ok) {
        throw new Error('创建评论失败');
      }
      
      return response.json();
    },
    {
      onSuccess: (newComment) => {
        setNewComment("");
        setShowCommentInput(false);
        refetchComments(); // 刷新评论列表
        if (onCommentAdded) {
          onCommentAdded(newComment);
        }
      },
      invalidateQueries: [`journal-comments-${journalId}`]
    }
  );

  const getUserDisplayName = (user: { username: string; name?: string }) => {
    return user.name || user.username;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) {
      const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
      return diffInMinutes < 1 ? "刚刚" : `${diffInMinutes}分钟前`;
    } else if (diffInHours < 24) {
      return `${diffInHours}小时前`;
    } else if (diffInHours < 24 * 7) {
      const diffInDays = Math.floor(diffInHours / 24);
      return `${diffInDays}天前`;
    } else {
      return date.toLocaleDateString("zh-CN");
    }
  };

  const loadComments = async () => {
    // 现在由useJournalComments hook处理
    refetchComments();
  };

  const handleToggleComments = () => {
    setShowComments(!showComments);
  };

  const handleSubmitComment = async () => {
    if (!newComment.trim() || !session) return;

    try {
      await addCommentMutation.mutate({
        content: newComment.trim()
      });
      setShowComments(true); // 显示评论列表
    } catch (error) {
      console.error("发布评论失败:", error);
      alert("发布评论失败，请稍后重试");
    }
  };

  const displayComments = loadedComments || comments || [];

  return (
    <div>
      {/* 操作按钮区 */}
      <div className="flex items-center gap-3 text-sm">
        {/* 查看评论按钮 */}
        {commentCount > 0 && (
          <button
            onClick={handleToggleComments}
            disabled={isLoadingComments}
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            {isLoadingComments ? "加载中..." : 
             showComments ? "隐藏评论" : `查看 ${commentCount} 条评论`}
          </button>
        )}
        
        {/* 写评论按钮 */}
        {session && (
          <button
            onClick={() => setShowCommentInput(!showCommentInput)}
            className="text-gray-600 hover:text-blue-600 font-medium"
          >
            {showCommentInput ? "取消" : "写评论"}
          </button>
        )}
      </div>

      {/* 写评论输入框 */}
      {session && showCommentInput && (
        <div className="mt-3 p-3 bg-gray-50 rounded-lg">
          <div className="flex gap-3">
            <Avatar 
              username={session.user?.name || session.user?.username || 'U'} 
              avatar={session.user?.avatar}
              size="small"
              className="flex-shrink-0"
            />
            <div className="flex-1">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="写下你的想法..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={2}
                autoFocus
              />
              <div className="flex justify-end mt-2 gap-2">
                <button
                  onClick={() => setShowCommentInput(false)}
                  className="px-3 py-1 text-gray-600 text-sm rounded hover:bg-gray-200"
                >
                  取消
                </button>
                <button
                  onClick={handleSubmitComment}
                  disabled={!newComment.trim() || addCommentMutation.isLoading}
                  className="px-4 py-1 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {addCommentMutation.isLoading ? "发布中..." : "发布"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 评论列表 */}
      {showComments && displayComments.length > 0 && (
        <div className="mt-3 space-y-2">
          {displayComments.map((comment: any) => (
            <div key={comment.id} className="flex gap-3">
              <Avatar 
                username={getUserDisplayName(comment.user)} 
                avatar={comment.user.avatar}
                size="small"
                className="flex-shrink-0"
              />
              <div className="flex-1">
                <div className="bg-gray-50 rounded-lg px-3 py-2">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium text-sm text-gray-800">
                      {getUserDisplayName(comment.user)}
                    </span>
                    <span className="text-xs text-gray-500">
                      {formatDate(comment.createdAt)}
                    </span>
                  </div>
                  <div className="text-gray-700 text-sm whitespace-pre-wrap">
                    {comment.content}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 无评论时的提示 */}
      {displayComments.length === 0 && !session && (
        <div className="text-gray-500 text-sm text-center py-4">
          登录后可以评论
        </div>
      )}
    </div>
  );
}