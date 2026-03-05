import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { getApiBaseUrl } from "@/lib/env-config";

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "未登录" }, { status: 401 });
    }

    const body = await request.json();
    const baseUrl = getApiBaseUrl();
    const response = await fetch(`${baseUrl}/comments/${params.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...body, userId: session.user.id }),
    });

    if (!response.ok) {
      throw new Error(`远程API错误: ${response.status}`);
    }
    return NextResponse.json(await response.json());
  } catch (error) {
    console.error("更新评论失败:", error);
    return NextResponse.json({ error: "更新评论失败" }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "未登录" }, { status: 401 });
    }

    const baseUrl = getApiBaseUrl();
    const response = await fetch(
      `${baseUrl}/comments/${params.id}?userId=${session.user.id}`,
      { method: "DELETE" }
    );

    if (!response.ok) {
      throw new Error(`远程API错误: ${response.status}`);
    }
    return NextResponse.json(await response.json());
  } catch (error) {
    console.error("删除评论失败:", error);
    return NextResponse.json({ error: "删除评论失败" }, { status: 500 });
  }
}
