"use client";

export default function Sidebar() {
  return (
    <aside className="w-72 p-4 bg-white shadow rounded h-screen">
      <div className="mb-6 font-bold text-lg">心晴驿站</div>
      <nav className="flex flex-col gap-2">
        <a href="/dashboard" className="py-2 px-3 rounded hover:bg-gray-100">仪表盘</a>
        <a href="/dashboard/emotions" className="py-2 px-3 rounded hover:bg-gray-100">情绪追踪</a>
        <a href="/dashboard/chat" className="py-2 px-3 rounded hover:bg-gray-100">AI 倾诉</a>
      </nav>
    </aside>
  );
}
