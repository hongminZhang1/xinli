"use client";

import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Card from "@/components/ui/Card";
import MarkdownEditor from "@/components/ui/MarkdownEditor";
import { ArrowLeft, Save, Eye, EyeOff } from "lucide-react";

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

export default function NewJournalPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [mood, setMood] = useState("");
  const [tags, setTags] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session?.user?.id || !title.trim() || !content.trim()) {
      alert("请填写标题和内容");
      return;
    }

    setIsSubmitting(true);
    try {
      const tagsArray = tags.split(",").map(tag => tag.trim()).filter(Boolean);

      const res = await fetch('/api/journal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: title.trim(),
          content: content.trim(),
          mood: mood || undefined,
          tags: tagsArray,
          isPrivate: isPrivate,
          userId: session.user.id,
          likes: 0
        }),
      });
      if (!res.ok) throw new Error('请求失败');

      alert("日记创建成功！");
      router.push("/dashboard/journal");
    } catch (error) {
      console.error("创建日记失败:", error);
      alert("创建日记失败，请稍后重试");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">新建日记</h1>
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50"
          >
            <ArrowLeft className="w-4 h-4" />
            返回
          </button>
        </div>
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
              内容 *（支持 Markdown 格式）
            </label>
            <MarkdownEditor
              value={content}
              onChange={setContent}
              placeholder="写下你的想法和感受...  支持 Markdown 格式"
              height={450}
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
              disabled={isSubmitting || !title.trim() || !content.trim()}
              className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              {isSubmitting ? "保存中..." : "保存日记"}
            </button>
          </div>
        </form>
      </Card>
    </div>
  );
}