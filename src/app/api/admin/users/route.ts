import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

// 检查用户是否为管理员
async function checkAdminAuth() {
  const session = await getServerSession(authOptions);
  
  if (!session?.user?.id) {
    return { error: "未授权", status: 401 };
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { role: true }
  });

  if (!user || user.role !== 'ADMIN') {
    return { error: "权限不足", status: 403 };
  }

  return { success: true };
}

// GET - 获取所有用户列表
export async function GET() {
  const authCheck = await checkAdminAuth();
  if (authCheck.error) {
    return NextResponse.json({ error: authCheck.error }, { status: authCheck.status });
  }

  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        username: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    return NextResponse.json(users);
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

    // 防止管理员修改自己的角色
    const session = await getServerSession(authOptions);
    if (userId === session?.user?.id) {
      return NextResponse.json({ error: "不能修改自己的角色" }, { status: 400 });
    }

    // 检查要更新的用户是否存在
    const targetUser = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, username: true, role: true }
    });

    if (!targetUser) {
      return NextResponse.json({ error: "用户不存在" }, { status: 404 });
    }

    // 简单的角色切换逻辑
    const newRole = action === 'promote' ? 'COUNSELOR' : 'USER';

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { role: newRole },
      select: {
        id: true,
        username: true,
        email: true,
        name: true,
        role: true,
        updatedAt: true,
      }
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error("更新用户角色失败:", error);
    return NextResponse.json({ error: "更新用户角色失败" }, { status: 500 });
  }
}