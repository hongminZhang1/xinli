import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getApiBaseUrl } from "@/lib/env-config";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "未授权" }, { status: 401 });
    }

    // 服务端代理请求，避免浏览器跨域延迟
    const apiUrl = getApiBaseUrl();
    const res = await fetch(`${apiUrl}/counselors`, { cache: "no-store" });
    if (!res.ok) {
      return NextResponse.json({ error: "获取数据失败" }, { status: 500 });
    }
    const counselors = await res.json();
    return NextResponse.json(counselors);
  } catch (error) {
    console.error("获取咨询师列表失败:", error);
    return NextResponse.json({ error: "获取数据失败" }, { status: 500 });
  }
}
