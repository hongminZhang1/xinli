import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../auth/[...nextauth]/route";
import { getApiBaseUrl } from "@/lib/env-config";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const journalId = params.id;
    const apiBase = getApiBaseUrl();

    // 先检查日记是否存在且为公开，如果私密则需要权限检查
    const journalRes = await fetch(`${apiBase}/journal/${journalId}`);
    if (!journalRes.ok) {
      return NextResponse.json({ error: "日记不存在" }, { status: 404 });
    }
    const journal = await journalRes.json();

    // 如果是私密日记，需要检查权限
    if (journal.isPrivate) {
      const session = await getServerSession(authOptions);
      if (!session?.user?.id || journal.userId !== session.user.id) {
        return NextResponse.json({ error: "无权限查看此日记的评论" }, { status: 403 });
      }
    }

    const commentsRes = await fetch(`${apiBase}/comments/journal/${journalId}`);
    if (!commentsRes.ok) {
      return NextResponse.json({ error: "获取评论失败" }, { status: 500 });
    }
    const comments = await commentsRes.json();
    return NextResponse.json(comments);
  } catch (error) {
    console.error("获取评论失败:", error);
    return NextResponse.json({ error: "获取评论失败" }, { status: 500 });
  }
}

export async function POST(
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
    const { content } = body;

    if (!content || !content.trim()) {
      return NextResponse.json({ error: "评论内容不能为空" }, { status: 400 });
    }

    const apiBase = getApiBaseUrl();

    // 检查日记是否存在且为公开
    const journalRes = await fetch(`${apiBase}/journal/${journalId}`);
    if (!journalRes.ok) {
      return NextResponse.json({ error: "日记不存在" }, { status: 404 });
    }
    const journal = await journalRes.json();

    if (journal.isPrivate && journal.userId !== session.user.id) {
      return NextResponse.json({ error: "无法评论私密日记" }, { status: 403 });
    }

    const commentRes = await fetch(`${apiBase}/comments`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        content: content.trim(),
        userId: session.user.id,
        journalEntryId: journalId
      }),
    });
    if (!commentRes.ok) {
      return NextResponse.json({ error: "创建评论失败" }, { status: 500 });
    }
    const comment = await commentRes.json();
    return NextResponse.json(comment);
  } catch (error) {
    console.error("创建评论失败:", error);
    return NextResponse.json({ error: "创建评论失败" }, { status: 500 });
  }
}
// PLACEHOLDER_REMOVED
      }
    });

    return NextResponse.json(comment);
  } catch (error) {
    console.error("创建评论失败:", error);
    return NextResponse.json({ error: "创建评论失败" }, { status: 500 });
  }
}