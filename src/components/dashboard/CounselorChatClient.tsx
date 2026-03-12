"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Avatar from "@/components/ui/Avatar";
import { Send, Loader2, ArrowLeft, MessageCircle } from "lucide-react";
import { useRouter } from "next/navigation";

function formatTime(iso: string) {
  return new Date(iso).toLocaleTimeString("zh-CN", { hour: "2-digit", minute: "2-digit", hour12: false });
}

function formatDateLabel(iso: string) {
  const d = new Date(iso);
  const now = new Date();
  const yest = new Date(now);
  yest.setDate(now.getDate() - 1);
  if (d.toDateString() === now.toDateString()) return "今天";
  if (d.toDateString() === yest.toDateString()) return "昨天";
  return d.toLocaleDateString("zh-CN", { month: "long", day: "numeric" });
}

function isDiffDay(a: string, b: string) {
  return new Date(a).toDateString() !== new Date(b).toDateString();
}

export default function CounselorChatClient({
  counselor,
  userId,
}: {
  counselor: any;
  userId: string;
}) {
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const taRef = useRef<HTMLTextAreaElement>(null);
  const router = useRouter();

  const fetchMessages = useCallback(async () => {
    try {
      const res = await fetch(`/api/counselors/${counselor.id}/chat`);
      if (!res.ok) throw new Error();
      setMessages((await res.json()) || []);
    } catch {
      /* silent */
    } finally {
      setLoading(false);
    }
  }, [counselor.id]);

  useEffect(() => {
    fetchMessages();
    const t = setInterval(fetchMessages, 5000);
    return () => clearInterval(t);
  }, [fetchMessages]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || sending) return;
    const content = input.trim();
    setInput("");
    if (taRef.current) taRef.current.style.height = "24px";
    setSending(true);
    const temp = {
      id: "t-" + Date.now(),
      senderType: "USER",
      senderId: userId,
      content,
      createdAt: new Date().toISOString(),
    };
    setMessages((p) => [...p, temp]);
    try {
      const res = await fetch(`/api/counselors/${counselor.id}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content }),
      });
      if (!res.ok) throw new Error();
      await fetchMessages();
    } catch {
      setMessages((p) => p.filter((m) => m.id !== temp.id));
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="h-full flex flex-col overflow-hidden rounded-2xl shadow-xl border border-gray-200/60 dark:border-gray-600/30">
      {/* ─── 顶部栏 ─── */}
      <div className="flex items-center gap-3 pl-3 pr-4 py-3 bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700 shrink-0 shadow-sm">
        <button
          onClick={() => router.back()}
          className="p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-gray-500 dark:text-gray-400" />
        </button>
        <div className="relative">
          <Avatar username={counselor.name} avatar={counselor.avatar} size="medium" />
          <span className="absolute bottom-0 right-0 block w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-gray-800" />
        </div>
        <div className="flex-1 min-w-0 flex items-center gap-2">
          <p className="font-semibold text-[16px] text-gray-900 dark:text-gray-100 truncate leading-tight">
            {counselor.name}
          </p>
          <p className="text-[12px] text-emerald-500 shrink-0">在线 · 专业咨询师</p>
        </div>
      </div>

      {/* ─── 消息列表 ─── */}
      <div
        className="flex-1 overflow-y-auto bg-[#f5f5f7] dark:bg-gray-900 px-4 py-4"
        style={{ scrollbarWidth: "thin", scrollbarColor: "rgba(0,0,0,.12) transparent" }}
      >
        {loading ? (
          <div className="h-full flex items-center justify-center">
            <Loader2 className="w-6 h-6 animate-spin text-gray-300 dark:text-gray-600" />
          </div>
        ) : messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center gap-4 text-center px-6">
            <div className="w-16 h-16 rounded-2xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center shadow-inner">
              <MessageCircle className="w-8 h-8 text-blue-400" />
            </div>
            <div>
              <p className="text-base font-medium text-gray-600 dark:text-gray-300">开始你的第一次倾诉</p>
              <p className="text-sm text-gray-400 mt-1.5">{counselor.name} 在这里倾听你的故事</p>
            </div>
          </div>
        ) : (
          messages.map((msg, i) => {
            const isMe = msg.senderType === "USER";
            const prev = messages[i - 1];
            const next = messages[i + 1];
            const showDate = !prev || isDiffDay(prev.createdAt, msg.createdAt);
            const isFirst = !prev || prev.senderType !== msg.senderType || showDate;
            const isLast =
              !next || next.senderType !== msg.senderType || isDiffDay(msg.createdAt, next.createdAt);

            // 气泡圆角：分组内连续消息调整尾部方向角
            const bubbleClass = isMe
              ? `bg-primary text-white shadow-primary/20 shadow-sm ${
                  isFirst && isLast
                    ? "rounded-[20px] rounded-tr-[5px]"
                    : isFirst
                    ? "rounded-[20px] rounded-tr-[5px] rounded-br-[8px]"
                    : isLast
                    ? "rounded-[20px] rounded-br-[5px] rounded-tr-[8px]"
                    : "rounded-[20px] rounded-r-[8px]"
                }`
              : `bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 shadow-sm ${
                  isFirst && isLast
                    ? "rounded-[20px] rounded-tl-[5px]"
                    : isFirst
                    ? "rounded-[20px] rounded-tl-[5px] rounded-bl-[8px]"
                    : isLast
                    ? "rounded-[20px] rounded-bl-[5px] rounded-tl-[8px]"
                    : "rounded-[20px] rounded-l-[8px]"
                }`;

            return (
              <React.Fragment key={msg.id}>
                {/* 日期分隔线 */}
                {showDate && (
                  <div className="flex items-center gap-3 py-3 my-1">
                    <div className="h-px flex-1 bg-gray-200/70 dark:bg-gray-700/50" />
                    <span className="text-[13px] text-gray-400 dark:text-gray-500 bg-[#f5f5f7] dark:bg-gray-900 px-1">
                      {formatDateLabel(msg.createdAt)}
                    </span>
                    <div className="h-px flex-1 bg-gray-200/70 dark:bg-gray-700/50" />
                  </div>
                )}

                {/* 消息行 */}
                <div
                  className={`flex items-start gap-2 ${isMe ? "flex-row-reverse" : ""} ${
                    isFirst && !showDate ? "mt-3" : "mt-0.5"
                  }`}
                >
                  {/* 头像列（仅接收方第一条显示，与气泡顶部对齐） */}
                  <div className="w-8 shrink-0 flex justify-center">
                    {!isMe && isFirst ? (
                      <Avatar username={counselor.name} avatar={counselor.avatar} size="small" />
                    ) : !isMe ? (
                      <div className="w-8" />
                    ) : null}
                  </div>

                  {/* 气泡 + 时间 */}
                  <div className={`flex flex-col max-w-[68%] ${isMe ? "items-end" : "items-start"}`}>
                    <div className={`px-3.5 py-2.5 text-[15px] leading-[1.6] break-words whitespace-pre-wrap ${bubbleClass}`}>
                      {msg.content}
                    </div>
                    {/* 时间戳：每组最后一条消息才显示，位于气泡外下方 */}
                    {isLast && (
                      <span className="text-[12px] text-gray-400 dark:text-gray-500 mt-1 mx-1 tabular-nums">
                        {formatTime(msg.createdAt)}
                      </span>
                    )}
                  </div>
                </div>
              </React.Fragment>
            );
          })
        )}
        <div ref={bottomRef} />
      </div>

      {/* ─── 输入区 ─── */}
      <div className="shrink-0 bg-white dark:bg-gray-800 border-t border-gray-100 dark:border-gray-700 px-3 pt-2.5 pb-3">
        <div className="flex items-end gap-2">
          <div className="flex-1 rounded-[22px] bg-[#f0f0f2] dark:bg-gray-700 px-4 py-[10px] focus-within:ring-2 focus-within:ring-primary/30 transition-shadow min-h-[44px] flex items-end">
            <textarea
              ref={taRef}
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
                e.target.style.height = "24px";
                e.target.style.height = Math.min(e.target.scrollHeight, 120) + "px";
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              placeholder="有什么想倾诉的…"
              rows={1}
              style={{ height: "24px" }}
              className="w-full resize-none bg-transparent text-[14px] text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none leading-6 max-h-[120px]"
            />
          </div>
          <button
            onClick={handleSend}
            disabled={!input.trim() || sending}
            className="shrink-0 w-10 h-10 mb-0.5 bg-primary text-white rounded-full flex items-center justify-center shadow-md transition-all hover:brightness-110 active:scale-90 disabled:opacity-40 disabled:shadow-none disabled:scale-100"
          >
            {sending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4 translate-x-px" />}
          </button>
        </div>
      </div>
    </div>
  );
}