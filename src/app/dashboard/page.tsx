import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import Link from "next/link";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold">你好, {session?.user?.username || '访客'}!</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="p-6 bg-white rounded-lg shadow-md">
            <h3 className="font-semibold mb-2">情绪统计卡片</h3>
            <p className="text-gray-600">（占位符）</p>
        </div>
        <div className="p-6 bg-white rounded-lg shadow-md">
            <h3 className="font-semibold mb-2">最近活动</h3>
            <p className="text-gray-600">（占位符）</p>
        </div>
        <div className="p-6 bg-white rounded-lg shadow-md">
            <h3 className="font-semibold mb-2">快速操作</h3>
            <p className="text-gray-600">（占位符）</p>
        </div>
      </div>
    </div>
  );
}
