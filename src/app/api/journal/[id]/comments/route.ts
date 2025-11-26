import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../auth/[...nextauth]/route";
import { prisma } from "@/lib/db";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const journalId = params.id;

    // 先检查日记是否存在且为公开，如果私密则需要权限检查
    const journal = await prisma.journalEntry.findUnique({
      where: { id: journalId },
      select: { isPrivate: true, userId: true }
    });

    if (!journal) {
      return NextResponse.json({ error: "日记不存在" }, { status: 404 });
    }

    // 如果是私密日记，需要检查权限
    if (journal.isPrivate) {
      const session = await getServerSession(authOptions);
      if (!session?.user?.id || journal.userId !== session.user.id) {
        return NextResponse.json({ error: "无权限查看此日记的评论" }, { status: 403 });
      }
    }

    const comments = await prisma.comment.findMany({
      where: {
        journalEntryId: journalId
      },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            name: true,
            avatar: true
          }
        }
      },
      orderBy: { createdAt: "desc" }
    });

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

    // 检查日记是否存在且为公开
    const journal = await prisma.journalEntry.findUnique({
      where: { id: journalId }
    });

    if (!journal) {
      return NextResponse.json({ error: "日记不存在" }, { status: 404 });
    }

    if (journal.isPrivate && journal.userId !== session.user.id) {
      return NextResponse.json({ error: "无法评论私密日记" }, { status: 403 });
    }

    const comment = await prisma.comment.create({
      data: {
        content: content.trim(),
        userId: session.user.id,
        journalEntryId: journalId
      },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            name: true,
            avatar: true
          }
        }
      }
    });

    return NextResponse.json(comment);
  } catch (error) {
    console.error("创建评论失败:", error);
    return NextResponse.json({ error: "创建评论失败" }, { status: 500 });
  }
}