             import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { prisma } from "@/lib/db";

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

    const journal = await prisma.journalEntry.findUnique({
      where: { id: journalId },
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

    if (!journal) {
      return NextResponse.json({ error: "日记不存在" }, { status: 404 });
    }

    // 检查权限：只有作者可以查看私密日记
    if (journal.isPrivate && journal.userId !== session.user.id) {
      return NextResponse.json({ error: "无权限查看此日记" }, { status: 403 });
    }

    return NextResponse.json({
      ...journal,
      tags: typeof journal.tags === 'string' ? JSON.parse(journal.tags) : journal.tags || []
    });
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
    const { title, content, mood, tags, isPrivate } = body;

    // 检查日记是否存在并且是当前用户的
    const existingJournal = await prisma.journalEntry.findUnique({
      where: { id: journalId }
    });

    if (!existingJournal) {
      return NextResponse.json({ error: "日记不存在" }, { status: 404 });
    }

    if (existingJournal.userId !== session.user.id) {
      return NextResponse.json({ error: "无权限编辑此日记" }, { status: 403 });
    }

    const updatedJournal = await prisma.journalEntry.update({
      where: { id: journalId },
      data: {
        ...(title !== undefined && { title }),
        ...(content !== undefined && { content }),
        ...(mood !== undefined && { mood }),
        ...(tags !== undefined && { tags }),
        ...(isPrivate !== undefined && { isPrivate })
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

    return NextResponse.json({
      ...updatedJournal,
      tags: typeof updatedJournal.tags === 'string' ? JSON.parse(updatedJournal.tags) : updatedJournal.tags || []
    });
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

    // 检查日记是否存在并且是当前用户的
    const existingJournal = await prisma.journalEntry.findUnique({
      where: { id: journalId }
    });

    if (!existingJournal) {
      return NextResponse.json({ error: "日记不存在" }, { status: 404 });
    }

    if (existingJournal.userId !== session.user.id) {
      return NextResponse.json({ error: "无权限删除此日记" }, { status: 403 });
    }

    await prisma.journalEntry.delete({
      where: { id: journalId }
    });

    return NextResponse.json({ message: "日记已删除" });
  } catch (error) {
    console.error("删除日记失败:", error);
    return NextResponse.json({ error: "删除日记失败" }, { status: 500 });
  }
}