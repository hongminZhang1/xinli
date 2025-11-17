"use client";

import React, { useEffect, useState } from "react";
import Card from "@/components/ui/Card";

type Entry = { id: string; emoji: string; note?: string; createdAt: string };

export default function EmotionsWidget() {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [note, setNote] = useState("");
  const [emoji, setEmoji] = useState("😊");

  useEffect(() => {
    try {
      const raw = localStorage.getItem("emotions_entries");
      if (raw) setEntries(JSON.parse(raw));
    } catch (e) {
      // ignore
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("emotions_entries", JSON.stringify(entries));
  }, [entries]);

  function addEntry() {
    const e: Entry = {
      id: String(Date.now()),
      emoji,
      note: note.trim() || undefined,
      createdAt: new Date().toISOString(),
    };
    setEntries((s) => [e, ...s]);
    setNote("");
  }

  return (
    <Card className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">情绪打卡</h3>
        <div className="text-sm text-gray-500">本地保存 · 仅演示</div>
      </div>

      <div className="flex items-center gap-2">
        <select
          value={emoji}
          onChange={(e) => setEmoji(e.target.value)}
          className="px-3 py-2 rounded"
        >
          <option>😊</option>
          <option>😔</option>
          <option>😡</option>
          <option>😴</option>
          <option>😰</option>
        </select>
        <input
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="写点感受..."
          className="flex-1 px-3 py-2 rounded border"
        />
        <button onClick={addEntry} className="px-4 py-2 bg-primary text-white rounded">
          打卡
        </button>
      </div>

      <div className="space-y-2 max-h-56 overflow-auto">
        {entries.length === 0 && <div className="text-gray-500">还没有记录，开始一次打卡吧。</div>}
        {entries.map((it) => (
          <div key={it.id} className="flex items-start gap-3 p-2 border rounded">
            <div className="text-2xl">{it.emoji}</div>
            <div>
              <div className="text-sm text-gray-600">{new Date(it.createdAt).toLocaleString()}</div>
              {it.note && <div className="mt-1">{it.note}</div>}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
