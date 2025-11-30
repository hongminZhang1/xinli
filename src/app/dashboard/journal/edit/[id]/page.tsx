"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Card from "@/components/ui/Card";
import { ArrowLeft, Save, Eye, EyeOff } from "lucide-react";
import { useQuery, useMutation } from "@/hooks/useQuery";
import { dbAdapter } from "@/lib/db-adapter";

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

export default function EditJournalPage({ params }: { params: { id: string } }) {
  const { data: session } = useSession();
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [mood, setMood] = useState("");
  const [tags, setTags] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);

  // 获取日记详情
  const { data: journal, isLoading, error } = useQuery(
    `journal-${params.id}`,
    () => dbAdapter.journal.getById(params.id),
    { enabled: !!params.id }
  );

  // 更新日记的mutation
  const updateMutation = useMutation(
    (data: any) => dbAdapter.journal.update(params.id, data),
    {
      onSuccess: () => {
        router.push("/dashboard/journal");
      }
    }
  );

  // 当日记数据加载完成时，填充表单
  useEffect(() => {
    if (journal) {
      setTitle(journal.title || "");
      setContent(journal.content || "");
      setMood(journal.mood || "");
      setTags(Array.isArray(journal.tags) ? journal.tags.join(", ") : "");
      setIsPrivate(journal.isPrivate || false);
    }
  }, [journal]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session?.user?.id || !title.trim() || !content.trim()) {
      alert("请填写标题和内容");
      return;
    }

    try {
      const tagsArray = tags.split(",").map(tag => tag.trim()).filter(Boolean);
      
      await updateMutation.mutate({
        title: title.trim(),
        content: content.trim(),
        mood: mood || undefined,
        tags: tagsArray,
        isPrivate: isPrivate,
      });

      alert("日记更新成功！");
    } catch (error) {
      console.error("更新日记失败:", error);
      alert("更新日记失败，请稍后重试");
    }
  };

  if (!session) {
    return (
      <Card className="text-center p-8">
        <p className="text-gray-500">请先登录</p>
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
          onClick={() => router.back()}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          返回
        </button>
      </Card>
    );
  }

  if (journal?.user?.id !== session.user?.id) {
    return (
      <Card className="text-center p-8">
        <p className="text-red-600">您无权编辑此日记</p>
        <button
          onClick={() => router.back()}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          返回
        </button>
      </Card>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-6">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          返回
        </button>
        <h1 className="text-2xl font-bold text-gray-900">编辑日记</h1>
      </div>

      <Card className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* 标题 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              标题 *
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="给你的日记起个标题..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* 心情 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              今日心情
            </label>
            <div className="flex flex-wrap gap-2">
              {moodOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setMood(mood === option.value ? "" : option.value)}
                  className={`px-3 py-2 rounded-lg border transition-all ${
                    mood === option.value
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {/* 内容 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              内容 *
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="写下你的想法和感受..."
              rows={12}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              required
            />
          </div>

          {/* 标签 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              标签
            </label>
            <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="用逗号分隔多个标签，如：感谢,成长,反思"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* 隐私设置 */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <input
                type="checkbox"
                checked={isPrivate}
                onChange={(e) => setIsPrivate(e.target.checked)}
                className="rounded"
              />
              <span className="flex items-center gap-2">
                {isPrivate ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                {isPrivate ? "仅自己可见" : "公开可见"}
              </span>
            </label>
          </div>

          {/* 提交按钮 */}
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={() => router.back()}
              className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
            >
              取消
            </button>
            <button
              type="submit"
              disabled={updateMutation.isLoading || !title.trim() || !content.trim()}
              className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              {updateMutation.isLoading ? "保存中..." : "保存修改"}
            </button>
          </div>
        </form>
      </Card>
    </div>
  );
}