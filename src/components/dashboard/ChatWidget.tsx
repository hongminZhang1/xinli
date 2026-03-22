"use client";

import React, { useState, useRef, useEffect } from "react";
import { useSession } from "next-auth/react";
import Card from "@/components/ui/Card";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";


// 定义消息类型，增加 reasoning_content 支持 DeepSeek R1
type Msg = {
  id: string;
  role: "user" | "assistant";
  content: string;
  reasoning_content?: string; // 思考过程
  isThinking?: boolean; // 是否正在生成中
  isReasoningCollapsed?: boolean; // 思考过程是否折叠
  startTime?: number; // 开始时间
  reasoningTime?: number; // 思考耗时（秒）
};

// 流读取辅助函数
async function* streamReader(response: Response) {
  const reader = response.body?.getReader();
  const decoder = new TextDecoder();
  if (!reader) return;

  try {
    let buffer = "";
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      
      const chunk = decoder.decode(value, { stream: true });
      buffer += chunk;
      
      const lines = buffer.split('\n');
      // 处理完所有完整的行，剩下的留在 buffer 中
      buffer = lines.pop() || "";
      
      for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed || trimmed === "data: [DONE]") continue;
        if (trimmed.startsWith("data: ")) {
          try {
            const json = JSON.parse(trimmed.slice(6));
            yield json;
          } catch (e) {
            console.warn("JSON Parse error:", e);
          }
        }
      }
    }
  } finally {
    reader.releaseLock();
  }
}

interface ChatWidgetProps {
  initialSession?: { id: string; title: string; messages: any[] } | null;
  onSessionSaved?: () => void;
}

export default function ChatWidget({ initialSession, onSessionSaved }: ChatWidgetProps = {}) {
  const { data: authSession } = useSession();
  const sessionIdRef = useRef<string | null>(null);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [model, setModel] = useState<"deepseek-chat" | "deepseek-reasoner">("deepseek-chat");
  const [isReadingRecords, setIsReadingRecords] = useState(false);
  const [useUserRecords, setUseUserRecords] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // 自动滚动到底部
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // 加载 initialSession（切换历史对话时）
  useEffect(() => {
    if (initialSession) {
      const msgs: Msg[] = Array.isArray(initialSession.messages)
        ? initialSession.messages.map((m: any, idx: number) => ({
            id: `session-${initialSession.id}-${idx}`,
            role: m.role as 'user' | 'assistant',
            content: m.content || '',
            reasoning_content: m.reasoning_content || undefined,
            isThinking: false,
            isReasoningCollapsed: true,
          }))
        : [];
      setMessages(msgs);
      sessionIdRef.current = initialSession.id;
    } else {
      setMessages([]);
      sessionIdRef.current = null;
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialSession?.id]);

  async function handleReadRecords() {
    setUseUserRecords((prev) => !prev);
  }

  async function fetchUserRecordsContext() {
    setIsReadingRecords(true);
    let contextStr = "";
    try {
      // Fetch journals and emotions concurrently
      const [journalRes, emotionsRes] = await Promise.all([
        fetch("/api/journal"),
        fetch("/api/emotions")
      ]);
      
      let journals = [];
      let emotions = [];
      
      if (journalRes.ok) {
        journals = await journalRes.json();
      }
      if (emotionsRes.ok) {
        emotions = await emotionsRes.json();
      }

      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      
      const recentJournals = Array.isArray(journals) ? journals.filter((j: any) => new Date(j.createdAt || Date.now()) > thirtyDaysAgo).slice(0, 10) : [];
      const recentEmotions = Array.isArray(emotions) ? emotions.filter((e: any) => new Date(e.createdAt || Date.now()) > thirtyDaysAgo).slice(0, 20) : [];

      contextStr += `当前日期: ${new Date().toLocaleDateString()}\n\n`;

      if (recentJournals.length === 0 && recentEmotions.length === 0) {
        contextStr += "没有找到近期的日记和情绪记录。如果没有信息可以参考，请正常进行心理疏导，不用在意缺失个人信息。";
      } else {
        contextStr += "以下是我近期的情绪和日记记录（注意时效性，距离太远的信息不使用，并将其与当前的心理疏导结合）：\n\n";
        
        if (recentEmotions.length > 0) {
          contextStr += "【情绪打卡记录】\n";
          recentEmotions.forEach((e: any) => {
            const dateStr = new Date(e.createdAt).toLocaleDateString();
            contextStr += `- ${dateStr}: 心情 ${e.emoji || ""} ${e.note ? "备注: " + e.note : ""}\n`;
          });
          contextStr += "\n";
        }
        
        if (recentJournals.length > 0) {
          contextStr += "【日记记录】\n";
          recentJournals.forEach((j: any) => {
            const dateStr = new Date(j.createdAt).toLocaleDateString();
            contextStr += `- ${dateStr} ${j.title ? "《" + j.title + "》:" : ""}\n  ${(j.content || "").substring(0, 200)}...\n`;
          });
          contextStr += "\n";
        }
      }
    } catch (error) {
      console.error("读取记录失败:", error);
    } finally {
      setIsReadingRecords(false);
    }
    return contextStr;
  }

  async function send(text?: string | React.MouseEvent | React.KeyboardEvent) {
    const messageText = typeof text === 'string' ? text : input;
    if (!messageText.trim() || isLoading) return;

    const isFirstMessage = messages.length === 0;
    const snapshotMessages = messages; // 快照当前消息，用于保存到数据库

    const userMsg: Msg = { id: String(Date.now()), role: "user", content: messageText };
    setMessages((prev) => [...prev, userMsg]);
    if (typeof text !== 'string') setInput("");
    setIsLoading(true);

    // 第一条消息时创建新 session
    let activeSessionId = sessionIdRef.current;
    if (isFirstMessage && !activeSessionId && authSession?.user?.id) {
      try {
        const resp = await fetch('/api/chat/sessions', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            title: messageText.slice(0, 50),
            messages: [{ role: 'user', content: messageText, reasoning_content: '' }],
            isActive: true,
          }),
        });
        if (resp.ok) {
          const newSess = await resp.json();
          activeSessionId = newSess.id;
          sessionIdRef.current = newSess.id;
        }
      } catch (e) {
        console.error('create session failed:', e);
      }
    }

    try {
      // 如果启用了读取情绪记录，在最新一条消息中附带上下文
      let finalApiMessages = [...messages, userMsg].map(({ role, content }) => ({
        role,
        content
      }));

      if (useUserRecords) {
        const recordsContext = await fetchUserRecordsContext();
        if (recordsContext) {
          const lastMsgIndex = finalApiMessages.length - 1;
          finalApiMessages[lastMsgIndex].content = `${recordsContext}\n\n以上是我的个人近期记录，以下是我本次想对你说的话：\n${finalApiMessages[lastMsgIndex].content}`;
        }
        // 读取后自动重置状态，只在单次发送时携带记录？或者让用户手动取消
        setUseUserRecords(false);
      }

      const res = await fetch("/api/chat/deepseek", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: finalApiMessages,
          model: model
        }),
      });

      if (!res.ok) {
        throw new Error(`API Error: ${res.statusText}`);
      }

      // 创建一个空的 Assistant 消息用于流式更新
      const assistantMsgId = String(Date.now() + 1);
      const startTime = Date.now();
      
      setMessages((prev) => [
        ...prev,
        { 
          id: assistantMsgId, 
          role: "assistant", 
          content: "", 
          reasoning_content: "", 
          isThinking: true,
          startTime: startTime
        }
      ]);

      // 开始读取流
      let fullContent = "";
      let fullReasoning = "";

      for await (const chunk of streamReader(res)) {
        const delta = chunk.choices?.[0]?.delta;
        
        if (delta) {
          if (delta.reasoning_content) {
            fullReasoning += delta.reasoning_content;
          }
          if (delta.content) {
            fullContent += delta.content;
          }
          
          // 实时更新状态
          setMessages((prev) => 
            prev.map(msg => 
              msg.id === assistantMsgId 
                ? { ...msg, content: fullContent, reasoning_content: fullReasoning } 
                : msg
            )
          );
        }
      }

      // 完成后标记不再 thinking 并自动折叠思考内容
      setMessages((prev) => 
        prev.map(msg => {
          if (msg.id === assistantMsgId) {
            const endTime = Date.now();
            // 如果有 startTime，计算思考耗时，否则默认为 0
            const elapsed = msg.startTime ? Math.round((endTime - msg.startTime) / 1000) : 0;
            return { 
              ...msg, 
              isThinking: false, 
              isReasoningCollapsed: true,
              reasoningTime: elapsed
            };
          }
          return msg;
        })
      );

      // AI 回复完成后，将对话保存到数据库
      if (activeSessionId) {
        const messagesToSave = [
          ...snapshotMessages,
          userMsg,
          { role: 'assistant', content: fullContent, reasoning_content: fullReasoning },
        ].map((m: any) => ({
          role: m.role,
          content: m.content || '',
          reasoning_content: m.reasoning_content || '',
        }));
        fetch(`/api/chat/sessions/${activeSessionId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ messages: messagesToSave }),
        }).then(() => onSessionSaved?.()).catch(console.error);
      }

    } catch (error) {
      console.error("Chat error:", error);
      setMessages((prev) => [...prev, { id: String(Date.now()), role: "assistant", content: "抱歉，出错了，请稍后再试。" }]);
    } finally {
      setIsLoading(false);
    }
  }

  // 切换思考过程折叠状态
  const toggleReasoning = (msgId: string) => {
    setMessages(prev => prev.map(m => 
      m.id === msgId ? { ...m, isReasoningCollapsed: !m.isReasoningCollapsed } : m
    ));
  };

  return (
    <Card className="flex flex-col h-full flex-1 border-none shadow-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">

      <div className="flex-1 overflow-y-auto space-y-6 p-4 bg-slate-50/50 dark:bg-slate-900/50 custom-scrollbar rounded-t-xl">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center space-y-6 opacity-0 animate-fadeIn" style={{ animationFillMode: 'forwards' }}>
            <div className="w-20 h-20 rounded-full overflow-hidden shadow-sm border-2 border-blue-100">
              <img src="/images/OIP.jpg" alt="小晴" className="w-full h-full object-cover" />
            </div>
            <div className="max-w-md space-y-3">
              <p className="font-semibold text-slate-800 dark:text-slate-100 text-xl">你好，我是你的心理助手小晴 ✨</p>
              <p className="text-sm text-slate-500 dark:text-slate-300 leading-relaxed">
                我是你的专属心理倾听伙伴。无论是开心还是难过，我都在这里陪着你。 你可以把这里当作树洞，告诉我任何你想说的话。
              </p>
            </div>
            
            <div className="w-full max-w-md mt-8">
              <p className="text-xs text-slate-400 dark:text-slate-400 mb-3 font-medium uppercase tracking-wider">你可以试着问我：</p>
              <div className="grid grid-cols-1 gap-2">
                {[
                  "我最近总是感到很焦虑，该怎么办？",
                  "晚上经常失眠，脑子里总是在想事情...",
                  "如何缓解工作/学习带来的压力？",
                  "我觉得自己很难和别人建立亲密关系。"
                ].map((prompt, index) => (
                  <button
                    key={index}
                    onClick={() => send(prompt)}
                    className="text-left px-4 py-3 text-sm text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl hover:bg-blue-50 dark:hover:bg-slate-600 hover:border-blue-200 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200 shadow-sm"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
        
        {messages.map((m) => (
          <div key={m.id} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"} animate-slideUp`}>
            <div className={`max-w-[85%] rounded-2xl p-4 shadow-sm transition-all duration-200 ${
              m.role === "user" 
                ? "bg-blue-100 text-slate-900 rounded-tr-sm" 
                : "bg-white text-slate-900 border border-slate-100 rounded-tl-sm"
            }`}>
              {/* 展示思考过程 (仅对 R1 模型且有内容时显示) */}
              {m.reasoning_content && (
                <div className="mb-3 text-xs overflow-hidden rounded-lg border border-indigo-100 bg-indigo-50/30">
                  <div 
                    onClick={() => toggleReasoning(m.id)}
                    className="cursor-pointer px-3 py-2 bg-indigo-100/50 text-indigo-700 font-medium flex items-center justify-between gap-2 border-b border-indigo-100/50 hover:bg-indigo-100/80 transition-colors select-none"
                  >
                    <div className="flex items-center gap-2">
                       {m.isThinking ? (
                          <>
                            <span className="animate-pulse text-sm">💡</span>
                            <span>正在思考...</span>
                          </>
                       ) : (
                          <>
                            <span className="text-sm">💡</span>
                            <span>已思考 ({m.reasoningTime || 0}s)</span>
                          </>
                       )}
                    </div>
                    <span className="text-indigo-400 text-[10px]">{m.isReasoningCollapsed ? "展开" : "收起"}</span>
                  </div>
                  
                  {!m.isReasoningCollapsed && (
                    <div className="p-3 whitespace-pre-wrap font-mono text-slate-600/90 leading-relaxed max-h-60 overflow-y-auto custom-scrollbar text-sm">
                      {m.reasoning_content}
                    </div>
                  )}
                </div>
              )}

              {/* 展示正文 */}
              <div className={`prose prose-sm break-words max-w-none font-medium
                ${m.role === "user" 
                  ? "prose-slate prose-p:text-slate-900 prose-a:text-blue-700" 
                  : "prose-slate prose-p:text-slate-900 prose-headings:text-slate-900 prose-strong:text-slate-900 prose-code:text-slate-800 prose-code:bg-slate-100 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-ul:text-slate-900 prose-ol:text-slate-900 prose-a:text-blue-600"
                }`}>
                 <ReactMarkdown remarkPlugins={[remarkGfm]}>
                   {m.content}
                 </ReactMarkdown>
              </div>
              
              {/* 光标闪烁效果 */}
              {m.role === "assistant" && m.isThinking && !m.content && !m.reasoning_content && (
                <span className="inline-flex gap-1 items-center h-6 text-slate-400">
                  <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}/>
                  <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}/>
                  <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}/>
                </span>
              )}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} className="h-2" />
      </div>

      <div className="p-4 bg-white border-t border-slate-100 rounded-b-xl">
        <div className="flex gap-2 bg-slate-50 p-2 rounded-xl border border-slate-200 focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:border-blue-400 transition-all items-center">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && send()}
            className="flex-1 px-2 py-1 bg-transparent border-none focus:outline-none text-slate-700 placeholder:text-slate-400 min-w-0"
            placeholder={isLoading ? "AI 正在回信..." : "输入消息..."}
            disabled={isLoading}
          />
          
          <button
            onClick={handleReadRecords}
            disabled={isLoading || isReadingRecords}
            className={`px-3 py-1.5 text-xs font-medium border rounded-lg transition-colors flex items-center gap-1 ${
              useUserRecords 
                ? 'bg-blue-50 text-blue-600 border-blue-200' 
                : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50 hover:text-blue-600'
            } disabled:opacity-50 disabled:cursor-not-allowed`}
            title="启用后，下次发送消息时会自动附带最近的情绪和日记记录"
          >
            {isReadingRecords 
              ? "加载中..." 
              : useUserRecords 
                ? "✓ 将包含情绪记录" 
                : "➕ 读取情绪记录"}
          </button>

          <select 
            value={model} 
            onChange={(e) => setModel(e.target.value as any)}
            className="text-xs h-9 font-medium border border-slate-200 rounded-lg px-2 bg-white text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/20 cursor-pointer hover:bg-slate-50 transition-colors"
            title="选择模型"
          >
            <option value="deepseek-chat">DeepSeek V3</option>
            <option value="deepseek-reasoner">DeepSeek R1</option>
          </select>

          <button
            onClick={send}
            disabled={isLoading || !input.trim()}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm active:scale-95 flex items-center gap-2 whitespace-nowrap"
          >
            <span>发送</span>
          </button>
        </div>
      </div>
    </Card>
  );
}
