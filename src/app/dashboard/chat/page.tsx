"use client";

import { useState, useEffect, useCallback } from "react";
import { useSession } from "next-auth/react";
import ChatWidget from "@/components/dashboard/ChatWidget";
import { MessageCircle, Plus, Clock, ChevronDown, ChevronUp } from "lucide-react";

function formatSessionDate(dateStr: string) {
  const d = new Date(dateStr);
  const now = new Date();
  const diffDays = Math.floor((now.getTime() - d.getTime()) / (1000 * 60 * 60 * 24));
  if (diffDays === 0) return "今天";
  if (diffDays === 1) return "昨天";
  if (diffDays < 7) return `${diffDays}天前`;
  return d.toLocaleDateString("zh-CN", { month: "numeric", day: "numeric" });
}

export default function ChatPage() {
  const { data: session, status } = useSession();
  const [sessions, setSessions] = useState<any[]>([]);
  const [selectedSession, setSelectedSession] = useState<any | null>(null);
  const [widgetKey, setWidgetKey] = useState(0);
  const [historyOpen, setHistoryOpen] = useState(false);

  const loadSessions = useCallback(async () => {
    try {
      const res = await fetch('/api/chat/sessions');
      if (res.ok) {
        const data = await res.json();
        setSessions(Array.isArray(data) ? data : []);
      }
    } catch {}
  }, []);

  useEffect(() => {
    if (status === "authenticated") {
      loadSessions();
    }
  }, [loadSessions, status]);

  const startNewChat = () => {
    setSelectedSession(null);
    setWidgetKey((k) => k + 1);
    setHistoryOpen(false);
  };

  const openSession = (session: any) => {
    setSelectedSession(session);
    setWidgetKey((k) => k + 1);
    setHistoryOpen(false);
  };

  // 如果没有 session 且认证状态不是加载中，即表示游客模式
  if (status === "unauthenticated" || (!session && status !== "loading")) {
    return (
      <div className="max-w-4xl mx-auto p-4 sm:p-6 h-full flex flex-col">
        <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-gray-800 dark:text-gray-100">AI倾诉</h2>
        <div className="flex-1 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl p-8 sm:p-12 shadow-sm border border-gray-100 dark:border-gray-700/50 text-center flex flex-col items-center justify-center min-h-[500px]">
          <div className="w-24 h-24 bg-gradient-to-tr from-blue-100 to-indigo-50 dark:from-blue-900/40 dark:to-indigo-800/40 rounded-full flex items-center justify-center mb-6 shadow-inner ring-4 ring-white dark:ring-gray-800">
            <span className="text-5xl">🔒</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-3">需要登录</h3>
          <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-md leading-relaxed">
            您当前处于游客模式。请登录后使用AI倾诉功能，享受专属、安全的智能心理陪伴服务。
          </p>
          <a
            href="/"
            className="px-8 py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl font-medium transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
          >
            前往 登录 / 注册
          </a>
        </div>
      </div>
    );
  }

  // 加载中状态显示一个简单的占位符
  if (status === "loading") {
    return <div className="p-4 sm:p-6 text-gray-500">加载中...</div>;
  }

  return (
    <div className="flex flex-col h-[calc(95vh-170px)] lg:h-[calc(95vh-130px)] space-y-4">
      {/* 标题行 */}
      <div className="flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full overflow-hidden border border-blue-100 shadow-sm flex-shrink-0">
            <img src="/images/OIP.jpg" alt="小晴" className="w-full h-full object-cover" />
          </div>
          <span className="text-base font-semibold text-slate-700 dark:text-slate-200">小晴 · AI心理助手</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={startNewChat}
            className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-xl hover:bg-blue-700 transition-colors shadow-sm"
          >
            <Plus className="w-4 h-4" />
            新对话
          </button>
          {/* 历史对话下拉按钮 */}
          <div className="relative">
            <button
              onClick={() => setHistoryOpen((o) => !o)}
              className="flex items-center gap-1.5 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm font-medium text-gray-700 dark:text-gray-200 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors shadow-sm"
            >
              <MessageCircle className="w-4 h-4 text-gray-400" />
              历史对话
              {sessions.length > 0 && (
                <span className="ml-0.5 px-1.5 py-0.5 bg-blue-100 text-blue-600 text-[11px] font-bold rounded-full">
                  {sessions.length}
                </span>
              )}
              {historyOpen ? <ChevronUp className="w-3.5 h-3.5 text-gray-400" /> : <ChevronDown className="w-3.5 h-3.5 text-gray-400" />}
            </button>

            {/* 下拉历史面板 */}
            {historyOpen && (
              <div className="absolute right-0 top-full mt-2 w-80 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 z-50 overflow-hidden">
                {sessions.length === 0 ? (
                  <div className="p-8 text-center">
                    <MessageCircle className="w-8 h-8 text-gray-200 mx-auto mb-2" />
                    <p className="text-sm text-gray-400">还没有对话记录</p>
                  </div>
                ) : (
                  <div className="divide-y divide-gray-50 dark:divide-gray-700/50 max-h-[340px] overflow-y-auto">
                    {sessions.map((s) => (
                      <div
                        key={s.id}
                        onClick={() => openSession(s)}
                        className={`px-4 py-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/40 transition-colors ${
                          selectedSession?.id === s.id
                            ? "bg-blue-50 dark:bg-blue-900/20 border-l-2 border-blue-500"
                            : ""
                        }`}
                      >
                        <div className="flex items-start gap-2.5">
                          <div className="w-7 h-7 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <MessageCircle className="w-3.5 h-3.5 text-blue-500" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="text-xs font-medium text-gray-800 dark:text-gray-200 line-clamp-2 leading-snug">
                              {s.title || "对话记录"}
                            </p>
                            <div className="flex items-center gap-1 mt-1">
                              <Clock className="w-3 h-3 text-gray-300" />
                              <span className="text-[11px] text-gray-400">
                                {formatSessionDate(s.updatedAt || s.createdAt)}
                              </span>
                              {Array.isArray(s.messages) && (
                                <span className="text-[11px] text-gray-300 ml-1">
                                  · {Math.floor(s.messages.length / 2)} 轮
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 聊天主区域（全宽） */}
      <ChatWidget
        key={widgetKey}
        initialSession={selectedSession}
        onSessionSaved={loadSessions}
      />
    </div>
  );
}
  