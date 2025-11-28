import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import { dbAdapter } from "@/lib/db-adapter";
import { redirect } from "next/navigation";
import AdminUserManagement from "@/components/admin/AdminUserManagement";
import AdminSystemSettings from "@/components/admin/AdminSystemSettings";

export default async function AdminPage() {
  const session = await getServerSession(authOptions);

  // 检查是否已登录和管理员权限（session已包含role信息）
  if (!session?.user?.id) {
    redirect("/login");
  }

  if (session.user.role !== 'ADMIN') {
    redirect("/dashboard");
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">管理员面板</h1>
        <p className="text-gray-600">系统管理和用户管理</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {/* 用户管理 */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">用户管理</h2>
          <AdminUserManagement />
        </div>

        {/* 系统设置 */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">系统设置</h2>
          <AdminSystemSettings />
        </div>
      </div>
    </div>
  );
}