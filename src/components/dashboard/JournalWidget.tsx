"use client";

import React, { useEffect, useState } from "react";
import Card from "@/components/ui/Card";

type Journal = { id: string; title: string; content: string; createdAt: string };

export default function JournalWidget() {
  const [items, setItems] = useState<Journal[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    try {
      const raw = localStorage.getItem("journal_items");
      if (raw) setItems(JSON.parse(raw));
    } catch {}
  }, []);

  useEffect(() => {
    localStorage.setItem("journal_items", JSON.stringify(items));
  }, [items]);

  function add() {
    if (!content.trim() && !title.trim()) return;
    const j: Journal = { id: String(Date.now()), title: title.trim() || "无标题", content: content.trim(), createdAt: new Date().toISOString() };
    setItems((s) => [j, ...s]);
    setTitle("");
    setContent("");
  }

  return (
    <Card className="space-y-4">
      <h3 className="text-lg font-semibold">情绪日记</h3>

      <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="标题（可选）" className="w-full px-3 py-2 border rounded" />
      <textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="写下今天的感受..." className="w-full px-3 py-2 border rounded h-28" />
      <div className="flex justify-end">
        <button onClick={add} className="px-4 py-2 bg-primary text-white rounded">保存</button>
      </div>

      <div className="space-y-2">
        {items.length === 0 && <div className="text-gray-500">还没有日记，试着写下一条。</div>}
        {items.map((it) => (
          <div key={it.id} className="p-3 border rounded">
            <div className="text-sm text-gray-600">{new Date(it.createdAt).toLocaleString()}</div>
            <div className="font-semibold">{it.title}</div>
            <div className="mt-1">{it.content}</div>
          </div>
        ))}
      </div>
    </Card>
  );
}
