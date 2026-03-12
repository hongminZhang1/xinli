import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getApiBaseUrl } from "@/lib/env-config";

// 获取聊天记录
// 普通用户：查自己与该咨询师的对话
// 咨询师：需传 ?targetUserId=xxx 查看某个用户的对话
export async function GET(
  request: Request,
  { params }: { params: { counselorId: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "未授权" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const targetUserId = searchParams.get("targetUserId");
    const isCounselor = session.user.id === params.counselorId;
    const userId = isCounselor ? targetUserId : session.user.id;
    if (!userId) {
      return NextResponse.json({ error: "缺少目标用户信息" }, { status: 400 });
    }

    const apiUrl = getApiBaseUrl();
    const res = await fetch(
      `${apiUrl}/counselors/${params.counselorId}/chat?userId=${userId}`,
      { cache: "no-store" }
    );
    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (error) {
    console.error("获取聊天记录失败:", error);
    return NextResponse.json({ error: "获取数据失败" }, { status: 500 });
  }
}

// 发送新消息（用户发给咨询师，或咨询师回复用户）
export async function POST(
  request: Request,
  { params }: { params: { counselorId: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "未授权" }, { status: 401 });
    }

    const { content, targetUserId } = await request.json();
    if (!content?.trim()) {
      return NextResponse.json({ error: "内容不能为空" }, { status: 400 });
    }

    const isCounselor = session.user.id === params.counselorId;
    const sessionUserId = isCounselor ? targetUserId : session.user.id;
    if (!sessionUserId) {
      return NextResponse.json({ error: "缺少目标用户信息" }, { status: 400 });
    }

    const apiUrl = getApiBaseUrl();
    const res = await fetch(`${apiUrl}/counselors/${params.counselorId}/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: sessionUserId,
        content,
        senderType: isCounselor ? "COUNSELOR" : "USER",
        senderId: session.user.id,
      }),
    });
    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (error) {
    console.error("发送消息失败:", error);
    return NextResponse.json({ error: "发送失败" }, { status: 500 });
  }
}
