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

    // 服务端代理请求，避免浏览器跨域延迟。附带当前用户ID，以在底层过滤（其实上面已经过滤了，多一层保障）
    const apiUrl = getApiBaseUrl();
    const currentUserId = session.user.id;
    const res = await fetch(`${apiUrl}/counselors?excludeId=${currentUserId}`, { cache: "no-store" });
    if (!res.ok) {
      return NextResponse.json({ error: "获取数据失败" }, { status: 500 });
    }
    const counselors = await res.json();
    
    // 如果当前用户是咨询师，在列表中过滤掉自己
    const filteredCounselors = Array.isArray(counselors) 
      ? counselors.filter((c: any) => c.id !== currentUserId)
      : counselors;
      
    return NextResponse.json(filteredCounselors);
  } catch (error) {
    console.error("获取咨询师列表失败:", error);
    return NextResponse.json({ error: "获取数据失败" }, { status: 500 });
  }
}
