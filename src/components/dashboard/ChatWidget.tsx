"use client";

import React, { useState, useRef, useEffect } from "react";
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

export default function ChatWidget() {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [model, setModel] = useState<"deepseek-chat" | "deepseek-reasoner">("deepseek-chat");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // 自动滚动到底部
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function send() {
    if (!input.trim() || isLoading) return;

    const userMsg: Msg = { id: String(Date.now()), role: "user", content: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    try {
      // 准备发送给 API 的消息历史 (去掉 reasoning_content 以节省 Token)
      const apiMessages = [...messages, userMsg].map(({ role, content }) => ({
        role,
        content
      }));

      const res = await fetch("/api/chat/deepseek", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: apiMessages,
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
    <Card className="flex flex-col h-[700px] border-none shadow-xl bg-white/80 backdrop-blur-sm">
      <div className="flex-1 overflow-y-auto space-y-6 p-4 bg-slate-50/50 custom-scrollbar rounded-t-xl">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center space-y-4 opacity-0 animate-fadeIn" style={{ animationFillMode: 'forwards' }}>
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-3xl">🤖</div>
            <div className="max-w-xs space-y-2">
              <p className="font-semibold text-slate-800 text-lg">你好，我是小晴。</p>
              <p className="text-sm text-slate-500 leading-relaxed">我是你的专属心理倾听伙伴。无论是开心还是难过，我都在这里陪着你。你可以把这里当作树洞，告诉我任何你想说的话。</p>
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
