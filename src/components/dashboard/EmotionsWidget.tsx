"use client";
import Swal from "sweetalert2";

import React, { useState } from "react";
import { useEmotions } from "@/hooks/useEmotions";
import { EMOJI_OPTIONS, getEmotionEmoji } from "@/types/emotions";

interface EmotionsWidgetProps {
  emotionsData?: ReturnType<typeof useEmotions>;
}

const EMOTION_STYLES: Record<
  string,
  { bg: string; selected: string; border: string; label: string; light: string }
> = {
  "😊": { bg: "hover:bg-amber-50",   selected: "bg-amber-100 ring-amber-300",   border: "border-amber-200", label: "text-amber-700", light: "bg-amber-50"   },
  "😔": { bg: "hover:bg-blue-50",    selected: "bg-blue-100 ring-blue-300",     border: "border-blue-200",  label: "text-blue-600",  light: "bg-blue-50"    },
  "😡": { bg: "hover:bg-red-50",     selected: "bg-red-100 ring-red-300",       border: "border-red-200",   label: "text-red-600",   light: "bg-red-50"     },
  "😴": { bg: "hover:bg-indigo-50",  selected: "bg-indigo-100 ring-indigo-300", border: "border-indigo-200",label: "text-indigo-600", light: "bg-indigo-50"  },
  "😰": { bg: "hover:bg-orange-50",  selected: "bg-orange-100 ring-orange-300", border: "border-orange-200",label: "text-orange-600", light: "bg-orange-50"  },
};

function formatTime(dateStr: string) {
  const d = new Date(dateStr);
  const now = new Date();
  const diffMs = now.getTime() - d.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  if (diffMins < 1)   return "刚刚";
  if (diffMins < 60)  return `${diffMins} 分钟前`;
  const diffHrs = Math.floor(diffMins / 60);
  if (diffHrs < 24)   return `${diffHrs} 小时前`;
  const diffDays = Math.floor(diffHrs / 24);
  if (diffDays < 7)   return `${diffDays} 天前`;
  return d.toLocaleDateString("zh-CN", { month: "short", day: "numeric" });
}


export default function EmotionsWidget({ emotionsData }: EmotionsWidgetProps) {
  // 始终调用hook以符合React rules of hooks
  const internalEmotions = useEmotions();
  const emotions = emotionsData || internalEmotions;
  const {
    entries,
    loading,
    error,
    isAuthenticated,
    authLoading,
    addEntry,
    updateEntry,
    deleteEntry,
    clearError,
  } = emotions;

  const [note, setNote] = useState("");
  const [emoji, setEmoji] = useState<string>(EMOJI_OPTIONS[0].value);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editNote, setEditNote] = useState("");
  const [editEmoji, setEditEmoji] = useState<string>(EMOJI_OPTIONS[0].value);

  const handleAddEntry = async () => {
    if (loading) return;
    const success = await addEntry({ emoji, note: note.trim() || undefined });
    if (success) { setNote(""); setEmoji(EMOJI_OPTIONS[0].value); }
  };

  const startEdit = (entry: any) => {
    setEditingId(entry.id);
    setEditEmoji(entry.emotion || entry.emoji);
    setEditNote(entry.notes || entry.note || "");
    clearError();
  };

  const saveEdit = async () => {
    if (!editingId || loading) return;
    const success = await updateEntry(editingId, {
      emoji: editEmoji,
      note: editNote.trim() || undefined,
    });
    if (success) { setEditingId(null); setEditNote(""); setEditEmoji(EMOJI_OPTIONS[0].value); }
  };

  const cancelEdit = () => {
    setEditingId(null); setEditNote(""); setEditEmoji(EMOJI_OPTIONS[0].value); clearError();
  };

  const handleDeleteEntry = async (id: string) => {
    if (loading) return;
    if ((await Swal.fire({title: "提示", text: "确定要删除这条记录吗？", icon: "warning", showCancelButton: true, confirmButtonText: "确定", cancelButtonText: "取消"})).isConfirmed) await deleteEntry(id);
  };

  // ── 加载/未登录状态 ──────────────────────────────────────────────
  if (authLoading) {
    return (
      <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 flex items-center justify-center">
        <div className="flex items-center gap-3 text-gray-400">
          <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
          </svg>
          <span className="text-sm">正在加载…</span>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="bg-white rounded-2xl p-10 shadow-sm border border-gray-100 text-center">
        <p className="text-4xl mb-3">🔒</p>
        <p className="font-semibold text-gray-700">请先登录</p>
        <p className="text-sm text-gray-400 mt-1">登录后即可开始情绪打卡</p>
      </div>
    );
  }

  const selectedStyle = EMOTION_STYLES[emoji] ?? EMOTION_STYLES["😊"];

  return (
    <div className="space-y-5">
      {/* ── 打卡面板 ── */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {/* 面板标题栏 */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-50">
          <div className="flex items-center gap-2">
            <span className="text-lg">✨</span>
            <h3 className="font-semibold text-gray-800">记录此刻心情</h3>
          </div>
          <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
            ☁ 云端同步
          </span>
        </div>

        <div className="p-6 space-y-5">
          {/* 错误提示 */}
          {error && (
            <div className="flex items-center justify-between bg-red-50 border border-red-100 text-red-600 px-4 py-3 rounded-xl text-sm">
              <span>{typeof error === "string" ? error : (error as Error)?.message || "发生错误"}</span>
              <button onClick={clearError} className="text-red-400 hover:text-red-600 ml-3 text-lg leading-none">×</button>
            </div>
          )}

          {/* Emoji 选择器 */}
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">选择情绪</p>
            <div className="grid grid-cols-5 gap-2">
              {EMOJI_OPTIONS.map((option) => {
                const s = EMOTION_STYLES[option.value] ?? EMOTION_STYLES["😊"];
                const isSelected = emoji === option.value;
                return (
                  <button
                    key={option.value}
                    onClick={() => setEmoji(option.value)}
                    disabled={loading}
                    className={`flex flex-col items-center gap-1.5 py-3 rounded-xl border-2 transition-all duration-150 focus:outline-none
                      ${isSelected
                        ? `${s.selected} border-transparent ring-2`
                        : `border-transparent bg-gray-50 ${s.bg}`
                      }
                    `}
                  >
                    <span className="text-2xl leading-none">{option.value}</span>
                    <span className={`text-xs font-medium ${isSelected ? s.label : "text-gray-500"}`}>
                      {option.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 备注输入 */}
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">备注（可选）</p>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleAddEntry(); } }}
              placeholder="写点感受、触发原因或今天发生的事…"
              rows={2}
              disabled={loading}
              className="w-full px-4 py-3 text-sm text-gray-700 bg-gray-50 border border-gray-200 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-violet-300 focus:border-transparent placeholder-gray-300 transition"
            />
          </div>

          {/* 提交按钮 */}
          <button
            onClick={handleAddEntry}
            disabled={loading}
            className={`w-full py-3 rounded-xl font-semibold text-sm transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:ring-offset-2
              ${loading
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-violet-600 hover:bg-violet-700 text-white shadow-sm hover:shadow-md active:scale-[0.99]"
              }
            `}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                </svg>
                保存中…
              </span>
            ) : (
              "完成打卡 →"
            )}
          </button>
        </div>
      </div>

      {/* ── 历史记录 ── */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-50">
          <div className="flex items-center gap-2">
            <span className="text-lg">🕐</span>
            <h3 className="font-semibold text-gray-800">历史记录</h3>
          </div>
          <span className="text-xs text-gray-400 font-medium">最近 5 条 / 共 {entries.length} 条</span>
        </div>

        <div className="divide-y divide-gray-50 max-h-[480px] overflow-y-auto">
          {loading && entries.length === 0 && (
            <div className="flex items-center justify-center py-12 text-gray-400 text-sm">
              <svg className="animate-spin w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
              </svg>
              加载中…
            </div>
          )}

          {!loading && entries.length === 0 && (
            <div className="py-14 text-center">
              <p className="text-5xl mb-3">🌱</p>
              <p className="font-semibold text-gray-600">还没有记录</p>
              <p className="text-sm text-gray-400 mt-1">完成第一次打卡，开启你的情绪旅程</p>
            </div>
          )}

          {entries.slice(0, 5).map((entry: any) => {
            const emojiKey = getEmotionEmoji(entry.emotion || entry.emoji);
            const s = EMOTION_STYLES[emojiKey] ?? EMOTION_STYLES["😊"];
            const isEditing = editingId === entry.id;

            return (
              <div key={entry.id} className="px-6 py-4 transition-colors hover:bg-gray-50/60">
                {isEditing ? (
                  /* 编辑模式 */
                  <div className="space-y-3">
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">修改情绪</p>
                    <div className="grid grid-cols-5 gap-2">
                      {EMOJI_OPTIONS.map((opt) => {
                        const os = EMOTION_STYLES[opt.value] ?? EMOTION_STYLES["😊"];
                        const sel = editEmoji === opt.value;
                        return (
                          <button
                            key={opt.value}
                            onClick={() => setEditEmoji(opt.value)}
                            disabled={loading}
                            className={`flex flex-col items-center gap-1 py-2.5 rounded-xl border-2 transition-all text-xs
                              ${sel ? `${os.selected} border-transparent ring-2` : `border-transparent bg-gray-50 ${os.bg}`}
                            `}
                          >
                            <span className="text-xl">{opt.value}</span>
                            <span className={`font-medium ${sel ? os.label : "text-gray-400"}`}>{opt.label}</span>
                          </button>
                        );
                      })}
                    </div>
                    <textarea
                      value={editNote}
                      onChange={(e) => setEditNote(e.target.value)}
                      placeholder="写点感受…"
                      rows={2}
                      disabled={loading}
                      className="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-violet-300 focus:border-transparent"
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={saveEdit}
                        disabled={loading}
                        className="flex-1 py-2 bg-violet-600 text-white rounded-xl text-sm font-semibold hover:bg-violet-700 disabled:opacity-50 transition"
                      >
                        保存
                      </button>
                      <button
                        onClick={cancelEdit}
                        className="px-5 py-2 bg-gray-100 text-gray-600 rounded-xl text-sm font-semibold hover:bg-gray-200 transition"
                      >
                        取消
                      </button>
                    </div>
                  </div>
                ) : (
                  /* 展示模式 */
                  <div className="flex items-start gap-3.5">
                    {/* 情绪图标 */}
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-2xl flex-shrink-0 ${s.light}`}>
                      {emojiKey}
                    </div>
                    {/* 内容区 */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${s.light} ${s.label}`}>
                          {EMOJI_OPTIONS.find((o) => o.value === emojiKey)?.label ?? "情绪"}
                        </span>
                        <span className="text-xs text-gray-400">{formatTime(entry.createdAt)}</span>
                      </div>
                      {(entry.notes || entry.note) && (
                        <p className="text-sm text-gray-700 mt-1.5 leading-relaxed line-clamp-2">
                          {entry.notes || entry.note}
                        </p>
                      )}
                    </div>
                    {/* 操作按钮 */}
                    <div className="flex items-center gap-1 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => startEdit(entry)}
                        disabled={loading}
                        className="p-1.5 text-gray-400 hover:text-violet-600 hover:bg-violet-50 rounded-lg transition text-xs"
                        title="编辑"
                      >
                        ✏️
                      </button>
                      <button
                        onClick={() => handleDeleteEntry(entry.id)}
                        disabled={loading}
                        className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition text-xs"
                        title="删除"
                      >
                        🗑️
                      </button>
                    </div>
                    {/* 始终可见的小操作 */}
                    <div className="flex items-center gap-1 flex-shrink-0 ml-auto">
                      <button
                        onClick={() => startEdit(entry)}
                        disabled={loading}
                        className="px-2.5 py-1 text-xs font-medium text-gray-400 hover:text-violet-600 hover:bg-violet-50 rounded-lg transition"
                      >
                        编辑
                      </button>
                      <button
                        onClick={() => handleDeleteEntry(entry.id)}
                        disabled={loading}
                        className="px-2.5 py-1 text-xs font-medium text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition"
                      >
                        删除
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
