import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { prisma } from "@/lib/db";

// 获取日记列表 (支持公开和私密)
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const type = searchParams.get("type"); // "private" | "public" | "all"
    const page = parseInt(searchParams.get("page") || "1");
    const pageSize = parseInt(searchParams.get("pageSize") || "20");

    let whereCondition: any = {};
    let requireAuth = true;

    if (type === "public") {
      // 获取所有公开的日记 - 无需登录
      whereCondition = {
        isPrivate: false
      };
      requireAuth = false;
    } else {
      // 需要登录的操作
      const session = await getServerSession(authOptions);
      if (!session?.user?.id) {
        return NextResponse.json({ error: "未登录" }, { status: 401 });
      }

      if (type === "private") {
        // 获取当前用户的私密日记
        whereCondition = {
          userId: session.user.id,
          isPrivate: true
        };
      } else if (type === "all") {
        // 获取当前用户的所有日记
        whereCondition = {
          userId: session.user.id
        };
      } else {
        // 默认获取当前用户的私密日记
        whereCondition = {
          userId: session.user.id,
          isPrivate: true
        };
      }
    }

    const [journals, total] = await Promise.all([
      prisma.journalEntry.findMany({
        where: whereCondition,
        select: {
          id: true,
          title: true,
          content: true,
          mood: true,
          tags: true,
          isPrivate: true,
          likes: true,
          createdAt: true,
          updatedAt: true,
          user: {
            select: {
              id: true,
              username: true,
              name: true,
              avatar: true
            }
          },
          _count: {
            select: {
              comments: true
            }
          }
        },
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * pageSize,
        take: pageSize
      }),
      prisma.journalEntry.count({
        where: whereCondition
      })
    ]);

    return NextResponse.json({
      journals: journals.map(journal => ({
        ...journal,
        tags: typeof journal.tags === 'string' ? JSON.parse(journal.tags) : journal.tags || [],
        commentCount: journal._count.comments
      })),
      pagination: {
        page,
        pageSize,
        total,
        totalPages: Math.ceil(total / pageSize)
      }
    });
  } catch (error) {
    console.error("获取日记失败:", error);
    return NextResponse.json({ error: "获取日记失败" }, { status: 500 });
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

    const journal = await prisma.journalEntry.create({
      data: {
        title,
        content,
        mood: mood || null,
        tags: tags || [],
        isPrivate: isPrivate ?? true,
        userId: session.user.id
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
      ...journal,
      tags: typeof journal.tags === 'string' ? JSON.parse(journal.tags) : journal.tags || [],
      comments: []  // 临时添加空数组
    });
  } catch (error) {
    console.error("创建日记失败:", error);
    return NextResponse.json({ error: "创建日记失败" }, { status: 500 });
  }
}