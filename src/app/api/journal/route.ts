import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { getApiBaseUrl } from "@/lib/env-config";

// 获取日记列表 (支持公开和私密)
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const type = searchParams.get("type") || "private";
    const page = parseInt(searchParams.get("page") || "1");
    const pageSize = parseInt(searchParams.get("pageSize") || "20");

    let requireAuth = true;
    let apiEndpoint = '/journals';

    if (type === "public") {
      requireAuth = false;
      apiEndpoint = `/journals?type=public&page=${page}&pageSize=${pageSize}`;
    } else {
      const session = await getServerSession(authOptions);
      if (!session?.user?.id) {
        return NextResponse.json({ error: "未登录" }, { status: 401 });
      }
      apiEndpoint = `/journals?type=${type}&page=${page}&pageSize=${pageSize}&userId=${session.user.id}`;
    }

    // 调用远程API
    const baseUrl = getApiBaseUrl();
    const response = await fetch(`${baseUrl}${apiEndpoint}`);
    
    if (!response.ok) {
      console.error(`远程API错误: ${response.status}`);
      return NextResponse.json([], { status: 200 }); // 降级返回空数组
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("获取日记失败:", error);
    return NextResponse.json([], { status: 200 }); // 降级返回空数组
  }
}

// 创建新日记
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "未登录" }, { status: 401 });
    }

    const body = await request.json();
    const { title, content, mood, tags, isPrivate } = body;

    if (!title || !content) {
      return NextResponse.json({ error: "标题和内容不能为空" }, { status: 400 });
    }

    // 调用远程API创建日记
    const baseUrl = getApiBaseUrl();
    const response = await fetch(`${baseUrl}/journals`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
        content,
        mood: mood || null,
        tags: tags || [],
        isPrivate: isPrivate ?? true,
        userId: session.user.id
      }),
    });

    if (!response.ok) {
      throw new Error(`远程API错误: ${response.status}`);
    }

    const journal = await response.json();
    return NextResponse.json(journal);
  } catch (error) {
    console.error("创建日记失败:", error);
    return NextResponse.json({ error: "创建日记失败" }, { status: 500 });
  }
}