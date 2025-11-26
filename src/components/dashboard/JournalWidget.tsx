"use client";

import React, { useState } from "react";
import { useSession } from "next-auth/react";
import Card from "@/components/ui/Card";
import { useJournals, useMutation } from "@/hooks/useQuery";
import { useAutoPreloadJournals } from "@/hooks/usePreload";

type JournalEntry = {
  id: string;
  title: string;
  content: string;
  mood?: string;
  tags: string[];
  isPrivate: boolean;
  createdAt: string;
  updatedAt: string;
  user: {
    id: string;
    username: string;
    name?: string;
    avatar?: string;
  };
  comments: Comment[];
  likes: number;
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

export default function JournalWidget() {
  const { data: session } = useSession();
  const { data, isLoading: journalsLoading, error: journalsError, refetch } = useJournals('all');
  
  // 从缓存数据中提取journals数组
  const journals = data?.journals || [];
  
  // 预加载前3条文章详情（个人文章页面通常查看较少）
  useAutoPreloadJournals(journals, {
    enabled: !!session,
    count: 3,
    delay: 200 // 稍长的延迟，因为用户可能在编辑
  });
  
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [mood, setMood] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [isPrivate, setIsPrivate] = useState(true);
  const [error, setError] = useState("");

  // 创建日记的mutation
  const createJournalMutation = useMutation(
    (journalData: any) => fetch("/api/journal", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(journalData)
    }),
    {
      onSuccess: () => {
        // 清空表单
        setTitle("");
        setContent("");
        setMood("");
        setTags([]);
        setError("");
        // 刷新日记列表
        refetch();
      },
      onError: (error) => {
        setError("创建日记失败：" + error.message);
      },
      invalidateQueries: ["/api/journal"] // 使相关缓存失效
    }
  );

  const addTag = (tag: string) => {
    const trimmedTag = tag.trim();
    if (trimmedTag && !tags.includes(trimmedTag)) {
      setTags([...tags, trimmedTag]);
    }
    setTagInput("");
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleTagInputKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && tagInput.trim()) {
      e.preventDefault();
      addTag(tagInput);
    }
  };

  const saveDiary = async () => {
    if (!title.trim() && !content.trim()) {
      setError("标题和内容不能同时为空");
      return;
    }

    setError("");

    try {
      await createJournalMutation.mutate({
        title: title.trim() || "无标题",
        content: content.trim(),
        mood: mood || null,
        tags,
        isPrivate
      });
    } catch (error: any) {
      // 错误处理已在mutation中处理
    }
  };

  const getMoodDisplay = (moodValue?: string) => {
    const moodOption = moodOptions.find(m => m.value === moodValue);
    return moodOption ? moodOption.label : null;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString("zh-CN");
  };

  if (!session) {
    return (
      <Card className="text-center p-8">
        <p>请先登录以使用日记功能</p>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* 写日记表单 */}
      <Card className="space-y-4">
        <h3 className="text-lg font-semibold">写情绪日记</h3>
        
        {(error || createJournalMutation.error || journalsError) && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
            {error || createJournalMutation.error || journalsError}
          </div>
        )}

        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="标题（可选）"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="写下今天的感受..."
          className="w-full px-3 py-2 border border-gray-300 rounded-md h-32 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* 心情选择 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">今天的心情</label>
          <div className="flex flex-wrap gap-2">
            {moodOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => setMood(mood === option.value ? "" : option.value)}
                className={`px-3 py-1 rounded-full text-sm border transition-colors ${
                  mood === option.value
                    ? "border-blue-500 bg-blue-50 text-blue-700"
                    : "border-gray-300 hover:bg-gray-50"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* 标签输入 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">标签</label>
          <div className="flex flex-wrap gap-2 mb-2">
            {tags.map((tag: string) => (
              <span
                key={tag}
                className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm flex items-center gap-1"
              >
                {tag}
                <button
                  onClick={() => removeTag(tag)}
                  className="text-blue-600 hover:text-blue-800"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
          <input
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyPress={handleTagInputKeyPress}
            placeholder="添加标签，按回车确认"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* 可见性选择 */}
        <div className="flex items-center space-x-4">
          <label className="flex items-center">
            <input
              type="radio"
              name="visibility"
              checked={isPrivate}
              onChange={() => setIsPrivate(true)}
              className="mr-2"
            />
            🔒 仅自己可见
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="visibility"
              checked={!isPrivate}
              onChange={() => setIsPrivate(false)}
              className="mr-2"
            />
            🌍 发布到文章广场
          </label>
        </div>

        <div className="flex justify-end">
          <button
            onClick={saveDiary}
            disabled={createJournalMutation.isLoading}
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {createJournalMutation.isLoading ? "保存中..." : "保存日记"}
          </button>
        </div>
      </Card>

      {/* 我的日记列表 */}
      <Card className="space-y-4">
        <h3 className="text-lg font-semibold">我的日记</h3>
        
        <div className="space-y-4">
          {journalsLoading ? (
            <div className="text-gray-500 text-center py-8">
              加载中...
            </div>
          ) : journals.length === 0 ? (
            <div className="text-gray-500 text-center py-8">
              还没有日记，试着写下一条吧。
            </div>
          ) : (
            journals.map((journal: any) => (
              <div key={journal.id} className="border rounded-lg p-4 hover:bg-gray-50">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <h4 className="font-semibold">{journal.title}</h4>
                    {journal.isPrivate ? (
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                        🔒 私密
                      </span>
                    ) : (
                      <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded">
                        🌍 公开
                      </span>
                    )}
                  </div>
                  <div className="text-sm text-gray-500">
                    {formatDate(journal.createdAt)}
                  </div>
                </div>
                
                {journal.mood && (
                  <div className="mb-2">
                    <span className="text-sm">{getMoodDisplay(journal.mood)}</span>
                  </div>
                )}

                <div className="text-gray-700 mb-2 line-clamp-3">
                  {journal.content}
                </div>

                {Array.isArray(journal.tags) && journal.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-2">
                    {journal.tags.map((tag: string) => (
                      <span
                        key={tag}
                        className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}

                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center gap-4">
                    <span>❤️ {journal.likes}</span>
                    <span>💬 {Array.isArray(journal.comments) ? journal.comments.length : 0}</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </Card>
    </div>
  );
}
