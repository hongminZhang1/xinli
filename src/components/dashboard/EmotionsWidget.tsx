"use client";

import React, { useState } from "react";
import Card from "@/components/ui/Card";
import { useEmotions } from "@/hooks/useEmotions";
import { EMOJI_OPTIONS } from "@/types/emotions";

export default function EmotionsWidget() {
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
  } = useEmotions();

  const [note, setNote] = useState("");
  const [emoji, setEmoji] = useState<string>(EMOJI_OPTIONS[0].value);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editNote, setEditNote] = useState("");
  const [editEmoji, setEditEmoji] = useState<string>(EMOJI_OPTIONS[0].value);

  // 添加新记录
  const handleAddEntry = async () => {
    if (loading) return;

    const success = await addEntry({
      emoji,
      note: note.trim() || undefined,
    });

    if (success) {
      setNote("");
      setEmoji(EMOJI_OPTIONS[0].value);
    }
  };

  // 开始编辑
  const startEdit = (entry: any) => {
    setEditingId(entry.id);
    setEditEmoji(entry.emoji);
    setEditNote(entry.note || "");
    clearError();
  };

  // 保存编辑
  const saveEdit = async () => {
    if (!editingId || loading) return;

    const success = await updateEntry(editingId, {
      emoji: editEmoji,
      note: editNote.trim() || undefined,
    });

    if (success) {
      setEditingId(null);
      setEditNote("");
      setEditEmoji(EMOJI_OPTIONS[0].value);
    }
  };

  // 取消编辑
  const cancelEdit = () => {
    setEditingId(null);
    setEditNote("");
    setEditEmoji(EMOJI_OPTIONS[0].value);
    clearError();
  };

  // 删除记录
  const handleDeleteEntry = async (id: string) => {
    if (loading) return;
    
    if (window.confirm("确定要删除这条记录吗？")) {
      await deleteEntry(id);
    }
  };

  if (authLoading) {
    return (
      <Card className="space-y-4">
        <div className="flex items-center justify-center py-8">
          <div className="text-gray-500">加载中...</div>
        </div>
      </Card>
    );
  }

  if (!isAuthenticated) {
    return (
      <Card className="space-y-4">
        <div className="flex items-center justify-center py-8">
          <div className="text-gray-500">请先登录</div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">情绪打卡</h3>
        <div className="text-sm text-green-600">云端存储</div>
      </div>

      {/* 错误提示 */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
          <div className="flex justify-between items-center">
            <span>{error}</span>
            <button 
              onClick={clearError}
              className="text-red-500 hover:text-red-700"
            >
              ×
            </button>
          </div>
        </div>
      )}

      {/* 添加新记录 */}
      <div className="flex items-center gap-2">
        <select
          value={emoji}
          onChange={(e) => setEmoji(e.target.value)}
          className="px-3 py-2 rounded border"
          disabled={loading}
        >
          {EMOJI_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.value} {option.label}
            </option>
          ))}
        </select>
        <input
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="写点感受..."
          className="flex-1 px-3 py-2 rounded border"
          disabled={loading}
        />
        <button 
          onClick={handleAddEntry} 
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "保存中..." : "打卡"}
        </button>
      </div>

      {/* 记录列表 */}
      <div className="space-y-2 max-h-96 overflow-auto">
        {loading && entries.length === 0 && (
          <div className="text-gray-500 text-center py-4">加载中...</div>
        )}
        {!loading && entries.length === 0 && (
          <div className="text-gray-500 text-center py-4">还没有记录，开始一次打卡吧。</div>
        )}
        {entries.map((entry) => (
          <div key={entry.id} className="flex items-start gap-3 p-3 border rounded-lg bg-gray-50">
            {editingId === entry.id ? (
              // 编辑模式
              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-2">
                  <select
                    value={editEmoji}
                    onChange={(e) => setEditEmoji(e.target.value)}
                    className="px-2 py-1 rounded border text-sm"
                    disabled={loading}
                  >
                    {EMOJI_OPTIONS.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.value} {option.label}
                      </option>
                    ))}
                  </select>
                  <input
                    value={editNote}
                    onChange={(e) => setEditNote(e.target.value)}
                    placeholder="写点感受..."
                    className="flex-1 px-2 py-1 rounded border text-sm"
                    disabled={loading}
                  />
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={saveEdit}
                    className="px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700 disabled:opacity-50"
                    disabled={loading}
                  >
                    保存
                  </button>
                  <button
                    onClick={cancelEdit}
                    className="px-3 py-1 bg-gray-500 text-white rounded text-sm hover:bg-gray-600"
                    disabled={loading}
                  >
                    取消
                  </button>
                </div>
              </div>
            ) : (
              // 显示模式
              <>
                <div className="text-2xl">{entry.emoji}</div>
                <div className="flex-1">
                  <div className="text-sm text-gray-600">
                    {new Date(entry.createdAt).toLocaleString('zh-CN')}
                  </div>
                  {entry.note && <div className="mt-1">{entry.note}</div>}
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => startEdit(entry)}
                    className="px-2 py-1 text-xs bg-blue-100 text-blue-600 rounded hover:bg-blue-200"
                    disabled={loading}
                    title="编辑"
                  >
                    编辑
                  </button>
                  <button
                    onClick={() => handleDeleteEntry(entry.id)}
                    className="px-2 py-1 text-xs bg-red-100 text-red-600 rounded hover:bg-red-200"
                    disabled={loading}
                    title="删除"
                  >
                    删除
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </Card>
  );
}
