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

// GET - 获取系统设置
export async function GET() {
  const authCheck = await checkAdminAuth();
  if (authCheck.error) {
    return NextResponse.json({ error: authCheck.error }, { status: authCheck.status });
  }

  try {
    const res = await fetch(`${getApiBaseUrl()}/settings`);
    if (!res.ok) throw new Error('获取设置失败');
    const settings: any[] = await res.json();

    const settingsArray = settings.map((s) => ({
      id: s.key,
      key: s.key,
      value: s.value,
      description: s.key === 'registration_enabled' ? '是否允许新用户注册' : '',
      updatedAt: s.updatedAt || new Date().toISOString()
    }));

    return NextResponse.json(settingsArray);
  } catch (error) {
    console.error("获取系统设置失败:", error);
    return NextResponse.json({ error: "获取系统设置失败" }, { status: 500 });
  }
}

// POST - 更新系统设置
export async function POST(request: Request) {
  const authCheck = await checkAdminAuth();
  if (authCheck.error) {
    return NextResponse.json({ error: authCheck.error }, { status: authCheck.status });
  }

  try {
    const { key, value } = await request.json();
    if (!key || value === undefined) {
      return NextResponse.json({ error: "参数错误" }, { status: 400 });
    }

    const res = await fetch(`${getApiBaseUrl()}/settings/${key}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ value: String(value) })
    });
    if (!res.ok) throw new Error('更新设置失败');

    return NextResponse.json({
      id: key,
      key,
      value: String(value),
      description: key === 'registration_enabled' ? '是否允许新用户注册' : '',
      updatedAt: new Date().toISOString()
    });
  } catch (error) {
    console.error("更新系统设置失败:", error);
    return NextResponse.json({ error: "更新系统设置失败" }, { status: 500 });
  }
}