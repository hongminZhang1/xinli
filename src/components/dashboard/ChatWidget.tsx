"use client";

import React, { useState } from "react";
import Card from "@/components/ui/Card";

type Msg = { id: string; from: "me" | "bot"; text: string };

export default function ChatWidget() {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");

  function send() {
    if (!input.trim()) return;
    const m: Msg = { id: String(Date.now()), from: "me", text: input };
    setMessages((s) => [...s, m]);
    setInput("");
    // fake bot reply
    setTimeout(() => {
      setMessages((s) => [...s, { id: String(Date.now() + 1), from: "bot", text: "这是 AI 的占位回复：谢谢你的分享。" }]);
    }, 600);
  }

  return (
    <Card className="space-y-4">
      <h3 className="text-lg font-semibold">AI 倾诉伙伴</h3>
      <div className="space-y-2 max-h-64 overflow-auto p-2 border rounded">
        {messages.length === 0 && <div className="text-gray-500">发送第一条消息，AI 会简短回复。</div>}
        {messages.map((m) => (
          <div key={m.id} className={m.from === "me" ? "text-right" : "text-left"}>
            <div className={"inline-block px-3 py-2 rounded " + (m.from === "me" ? "bg-primary text-white" : "bg-gray-100 text-black")}>{m.text}</div>
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <input value={input} onChange={(e) => setInput(e.target.value)} className="flex-1 px-3 py-2 border rounded" placeholder="输入消息..." />
        <button onClick={send} className="px-4 py-2 bg-primary text-white rounded">发送</button>
      </div>
    </Card>
  );
}
