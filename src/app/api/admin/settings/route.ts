import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { NextResponse } from "next/server";
import { getSettings, updateSettings } from "@/lib/settings";

// 检查用户是否为管理员
async function checkAdminAuth() {
  const session = await getServerSession(authOptions);
  
  if (!session?.user?.id) {
    return { error: "未授权", status: 401 };
  }

  // 使用session中的角色信息，避免额外的数据库查询
  if (session.user.role !== 'ADMIN') {
    return { error: "权限不足", status: 403 };
  }

  return { success: true };
}

// GET - 获取系统设置
export async function GET() {
  const authCheck = await checkAdminAuth();
  if (authCheck.error) {
    return NextResponse.json({ error: authCheck.error }, { status: authCheck.status });
  }

  try {
    const settings = await getSettings();
    
    const settingsArray = Object.entries(settings).map(([key, value]) => ({
      id: key,
      key,
      value: String(value),
      description: key === 'registration_enabled' ? '是否允许新用户注册' : '',
      updatedAt: new Date().toISOString()
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

    // 更新设置
    const updatedSettings = await updateSettings({ [key]: value === 'true' });
    
    const setting = {
      id: key,
      key,
      value: String(value),
      description: key === 'registration_enabled' ? '是否允许新用户注册' : '',
      updatedAt: new Date().toISOString()
    };

    return NextResponse.json(setting);
  } catch (error) {
    console.error("更新系统设置失败:", error);
    return NextResponse.json({ error: "更新系统设置失败" }, { status: 500 });
  }
}