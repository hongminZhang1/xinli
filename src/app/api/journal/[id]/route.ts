import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { getApiBaseUrl } from "@/lib/env-config";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "未登录" }, { status: 401 });
    }

    const journalId = params.id;

    // 调用远程API获取日记详情
    const baseUrl = getApiBaseUrl();
    const response = await fetch(`${baseUrl}/journals/${journalId}?userId=${session.user.id}`);
    
    if (!response.ok) {
      if (response.status === 404) {
        return NextResponse.json({ error: "日记不存在" }, { status: 404 });
      }
      if (response.status === 403) {
        return NextResponse.json({ error: "无权限查看此日记" }, { status: 403 });
      }
      throw new Error(`远程API错误: ${response.status}`);
    }

    const journal = await response.json();
    return NextResponse.json(journal);
  } catch (error) {
    console.error("获取日记详情失败:", error);
    return NextResponse.json({ error: "获取日记详情失败" }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "未登录" }, { status: 401 });
    }

    const journalId = params.id;
    const body = await request.json();

    // 调用远程API更新日记
    const baseUrl = getApiBaseUrl();
    const response = await fetch(`${baseUrl}/journals/${journalId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...body,
        userId: session.user.id
      }),
    });

    if (!response.ok) {
      if (response.status === 404) {
        return NextResponse.json({ error: "日记不存在" }, { status: 404 });
      }
      if (response.status === 403) {
        return NextResponse.json({ error: "无权限编辑此日记" }, { status: 403 });
      }
      throw new Error(`远程API错误: ${response.status}`);
    }

    const updatedJournal = await response.json();
    return NextResponse.json(updatedJournal);
  } catch (error) {
    console.error("更新日记失败:", error);
    return NextResponse.json({ error: "更新日记失败" }, { status: 500 });
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

    const journalId = params.id;

    // 调用远程API删除日记
    const baseUrl = getApiBaseUrl();
    const response = await fetch(`${baseUrl}/journals/${journalId}?userId=${session.user.id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      if (response.status === 404) {
        return NextResponse.json({ error: "日记不存在" }, { status: 404 });
      }
      if (response.status === 403) {
        return NextResponse.json({ error: "无权限删除此日记" }, { status: 403 });
      }
      throw new Error(`远程API错误: ${response.status}`);
    }

    const result = await response.json();
    return NextResponse.json(result);
  } catch (error) {
    console.error("删除日记失败:", error);
    return NextResponse.json({ error: "删除日记失败" }, { status: 500 });
  }
}