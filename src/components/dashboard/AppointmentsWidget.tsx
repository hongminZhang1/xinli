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
      <div className="flex gap-2">
        <input type="datetime-local" value={date} onChange={(e) => setDate(e.target.value)} className="px-3 py-2 border rounded" />
        <input value={note} onChange={(e) => setNote(e.target.value)} placeholder="备注（可选）" className="flex-1 px-3 py-2 border rounded" />
        <button onClick={request} className="px-4 py-2 bg-primary text-white rounded">预约</button>
      </div>

      <div className="space-y-2">
        {items.length === 0 && <div className="text-gray-500">暂无预约记录。</div>}
        {items.map((it) => (
          <div key={it.id} className="p-2 border rounded">
            <div className="text-sm text-gray-600">{new Date(it.date).toLocaleString()}</div>
            {it.note && <div className="mt-1">{it.note}</div>}
          </div>
        ))}
      </div>
    </Card>
  );
}
