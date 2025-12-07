"use client";

import React, { useEffect, useState } from "react";
import Card from "@/components/ui/Card";

type Appointment = { id: string; date: string; note?: string };

export default function AppointmentsWidget() {
  const [items, setItems] = useState<Appointment[]>([]);
  const [date, setDate] = useState("");
  const [note, setNote] = useState("");

  useEffect(() => {
    try {
      const raw = localStorage.getItem("appointments");
      if (raw) setItems(JSON.parse(raw));
    } catch {}
  }, []);

  useEffect(() => {
    localStorage.setItem("appointments", JSON.stringify(items));
  }, [items]);

  function request() {
    if (!date) return;
    const a: Appointment = { id: String(Date.now()), date, note: note.trim() || undefined };
    setItems((s) => [a, ...s]);
    setDate("");
    setNote("");
  }

  return (
    <Card className="space-y-4">
      <h3 className="text-lg font-semibold">咨询预约</h3>
      
      {/* 桌面端横向布局 */}
      <div className="hidden sm:flex gap-2">
        <input 
          type="datetime-local" 
          value={date} 
          onChange={(e) => setDate(e.target.value)} 
          className="px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500" 
        />
        <input 
          value={note} 
          onChange={(e) => setNote(e.target.value)} 
          placeholder="备注（可选）" 
          className="flex-1 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500" 
        />
        <button 
          onClick={request} 
          disabled={!date}
          className="px-4 py-2 bg-primary text-white rounded hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          预约
        </button>
      </div>

      {/* 移动端垂直布局 */}
      <div className="sm:hidden space-y-3">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">预约时间</label>
          <input 
            type="datetime-local" 
            value={date} 
            onChange={(e) => setDate(e.target.value)} 
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500" 
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">备注</label>
          <input 
            value={note} 
            onChange={(e) => setNote(e.target.value)} 
            placeholder="预约相关说明（可选）" 
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500" 
          />
        </div>
        <button 
          onClick={request} 
          disabled={!date}
          className="w-full px-4 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
        >
          确认预约
        </button>
      </div>

      <div className="space-y-2">
        {items.length === 0 && (
          <div className="text-gray-500 text-center py-4 text-sm">暂无预约记录</div>
        )}
        {items.map((it) => (
          <div key={it.id} className="p-3 border rounded-lg hover:bg-gray-50">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div className="text-sm font-medium text-gray-800 mb-1 sm:mb-0">
                📅 {new Date(it.date).toLocaleString('zh-CN', {
                  year: 'numeric',
                  month: 'short', 
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </div>
              {it.note && (
                <div className="text-sm text-gray-600 sm:text-right sm:max-w-xs">
                  💬 {it.note}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
