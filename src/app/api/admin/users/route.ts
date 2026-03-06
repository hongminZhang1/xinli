import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { NextResponse } from "next/server";
import { getApiBaseUrl } from "@/lib/env-config";

async function checkAdminAuth() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return { error: "未授权", status: 401 };
  if (session.user.role !== 'ADMIN') return { error: "权限不足", status: 403 };
  return { success: true };
}

// GET - 获取所有用户列表
export async function GET() {
  const authCheck = await checkAdminAuth();
  if (authCheck.error) {
    return NextResponse.json({ error: authCheck.error }, { status: authCheck.status });
  }

  try {
    const res = await fetch(`${getApiBaseUrl()}/users`);
    if (!res.ok) throw new Error('获取用户列表失败');
    const users: any[] = await res.json();
    const sortedUsers = users.sort((a, b) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
    return NextResponse.json(sortedUsers);
  } catch (error) {
    console.error("获取用户列表失败:", error);
    return NextResponse.json({ error: "获取用户列表失败" }, { status: 500 });
  }
}

// PATCH - 更新用户角色
export async function PATCH(request: Request) {
  const authCheck = await checkAdminAuth();
  if (authCheck.error) {
    return NextResponse.json({ error: authCheck.error }, { status: authCheck.status });
  }

  try {
    const { userId, action } = await request.json();
    if (!userId || !action) {
      return NextResponse.json({ error: "参数错误" }, { status: 400 });
    }

    const session = await getServerSession(authOptions);
    if (userId === session?.user?.id) {
      return NextResponse.json({ error: "不能修改自己的角色" }, { status: 400 });
    }

    const apiBase = getApiBaseUrl();

    // 检查目标用户是否存在
    const userRes = await fetch(`${apiBase}/users/${userId}`);
    if (!userRes.ok) {
      return NextResponse.json({ error: "用户不存在" }, { status: 404 });
    }

    const newRole = action === 'promote' ? 'COUNSELOR' : 'USER';
    const updateRes = await fetch(`${apiBase}/users/${userId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ role: newRole }),
    });
    if (!updateRes.ok) throw new Error('更新用户角色失败');
    const updatedUser = await updateRes.json();
    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error("更新用户角色失败:", error);
    return NextResponse.json({ error: "更新用户角色失败" }, { status: 500 });
  }
}