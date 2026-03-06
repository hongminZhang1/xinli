import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getApiBaseUrl } from "@/lib/env-config";

export async function PATCH(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "未授权" }, { status: 401 });
    }

    const body = await request.json();
    const { avatarUrl } = body;
    if (!avatarUrl || typeof avatarUrl !== "string") {
      return NextResponse.json({ error: "无效的头像URL" }, { status: 400 });
    }

    const res = await fetch(`${getApiBaseUrl()}/users/${session.user.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ avatar: avatarUrl }),
    });
    if (!res.ok) throw new Error('更新失败');
    const updatedUser = await res.json();
    return NextResponse.json({ success: true, user: updatedUser });
  } catch (error) {
    console.error("Avatar update error:", error);
    return NextResponse.json({ error: "更新头像时发生错误" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "未授权" }, { status: 401 });
    }

    const res = await fetch(`${getApiBaseUrl()}/users/${session.user.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ avatar: null }),
    });
    if (!res.ok) throw new Error('删除失败');
    const updatedUser = await res.json();
    return NextResponse.json({ success: true, user: updatedUser });
  } catch (error) {
    console.error("Avatar deletion error:", error);
    return NextResponse.json({ error: "删除头像时发生错误" }, { status: 500 });
  }
}