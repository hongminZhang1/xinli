"use client";

import { useRef, useState } from "react";
import { useSession } from "next-auth/react";
import Avatar from "@/components/ui/Avatar";

interface AvatarUploadProps {
  username?: string;
  avatar?: string | null;
}

export default function AvatarUpload({ username, avatar }: AvatarUploadProps) {
  const { update } = useSession();
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const currentAvatar = previewUrl ?? avatar ?? null;

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    // 本地预览
    const preview = URL.createObjectURL(file);
    setPreviewUrl(preview);
    setMessage(null);
    setUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload/avatar", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        setPreviewUrl(null);
        setMessage({ type: "error", text: data.error || "上传失败" });
        return;
      }

      // 刷新 NextAuth session，让头像立即生效
      await update({ avatar: data.avatarUrl });
      setMessage({ type: "success", text: "头像已更新" });
    } catch {
      setPreviewUrl(null);
      setMessage({ type: "error", text: "网络错误，请重试" });
    } finally {
      setUploading(false);
      // 清空 input，允许重复选同一文件
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  return (
    <div className="flex items-start gap-6">
      {/* 可点击头像区域 */}
      <div className="flex-shrink-0">
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="relative group rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          title="点击更换头像"
        >
          <Avatar
            username={username}
            avatar={currentAvatar}
            size="large"
            className="ring-4 ring-white shadow-lg"
          />
          {/* 悬停遮罩 */}
          <span className="absolute inset-0 flex items-center justify-center rounded-full bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
            {uploading ? (
              <svg className="w-6 h-6 text-white animate-spin" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
              </svg>
            ) : (
              <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="12" cy="13" r="4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </span>
        </button>
        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif"
          className="hidden"
          onChange={handleFileChange}
        />
      </div>

      {/* 文字说明 */}
      <div className="flex-1 space-y-3">
        <div>
          <h3 className="text-base font-medium text-slate-700 dark:text-slate-200">头像</h3>
          <p className="text-sm text-slate-400 mt-0.5">
            点击头像上传新图片，支持 JPG / PNG / WebP / GIF，最大 2MB
          </p>
        </div>

        {message && (
          <p className={`text-sm font-medium ${message.type === "success" ? "text-green-600" : "text-red-500"}`}>
            {message.type === "success" ? "✓ " : "✕ "}{message.text}
          </p>
        )}

        {uploading && (
          <p className="text-sm text-slate-400">上传中，请稍候…</p>
        )}
      </div>
    </div>
  );
}