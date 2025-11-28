import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { db, isApiMode } from "@/lib/db-adapter";
import { EmotionType } from "@prisma/client";

// 创建新的情绪记录
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { emoji, note } = body;

    // 将emoji映射到EmotionType
    const emotionMap: { [key: string]: EmotionType } = {
      "😊": "HAPPY",
      "😔": "SAD", 
      "😡": "ANGRY",
      "😴": "CALM",
      "😰": "ANXIOUS",
    };

    const emotionType = emotionMap[emoji] || "HAPPY";
    
    const emotionRecord = await db.emotionRecord.create({
      userId: session.user.id,
      emotion: emotionType,
      intensity: 5, // 默认强度
      notes: note || null,
      tags: [],
    });

    // 返回格式化的数据，与前端期望的格式保持一致
    const formattedRecord = {
      id: emotionRecord.id,
      emoji: emoji,
      note: emotionRecord.notes,
      createdAt: emotionRecord.createdAt.toISOString(),
    };

    return NextResponse.json(formattedRecord);
  } catch (error) {
    console.error("Failed to create emotion record:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// 获取用户的所有情绪记录
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const emotionRecords = await db.emotionRecord.findMany({
      userId: session.user.id,
    });

    // 将EmotionType映射回emoji
    const emojiMap: { [key in EmotionType]: string } = {
      "HAPPY": "😊",
      "SAD": "😔",
      "ANGRY": "😡", 
      "ANXIOUS": "😰",
      "CALM": "😴",
      "EXCITED": "😊",
      "FRUSTRATED": "😡",
      "CONTENT": "😊",
      "LONELY": "😔",
      "GRATEFUL": "😊",
    };

    // 格式化数据以匹配前端期望的格式
    const formattedRecords = emotionRecords.map(record => ({
      id: record.id,
      emoji: emojiMap[record.emotion],
      note: record.notes,
      createdAt: record.createdAt.toISOString(),
    }));

    return NextResponse.json(formattedRecords);
  } catch (error) {
    console.error("Failed to fetch emotion records:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}