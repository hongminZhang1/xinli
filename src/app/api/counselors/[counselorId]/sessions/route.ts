import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getApiBaseUrl } from "@/lib/env-config";

// 咨询师收件箱：获取所有向该咨询师发过消息的用户列表
export async function GET(
  request: Request,
  { params }: { params: { counselorId: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "未授权" }, { status: 401 });
    }
    // 只允许咨询师本人查看自己的收件箱
    if (session.user.id !== params.counselorId) {
      return NextResponse.json({ error: "无权限" }, { status: 403 });
    }

    const apiUrl = getApiBaseUrl();
    const res = await fetch(`${apiUrl}/counselors/${params.counselorId}/sessions`, {
      cache: "no-store",
    });
    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (error) {
    console.error("获取咨询会话列表失败:", error);
    return NextResponse.json({ error: "获取数据失败" }, { status: 500 });
  }
}
