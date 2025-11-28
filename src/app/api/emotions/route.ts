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
    
    // 在API模式下，调用远程API创建记录
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://193.112.165.180:3001/api';
    
    const response = await fetch(`${baseUrl}/emotions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: session.user.id,
        emotion: emotionType,
        intensity: 5, // 默认强度
        notes: note || null,
        tags: [],
      }),
    });

    if (!response.ok) {
      throw new Error(`远程API错误: ${response.status}`);
    }

    const emotionRecord = await response.json();

    // 返回格式化的数据，与前端期望的格式保持一致
    const formattedRecord = {
      id: emotionRecord.id,
      emoji: emoji,
      note: emotionRecord.notes,
      createdAt: typeof emotionRecord.createdAt === 'string' ? emotionRecord.createdAt : emotionRecord.createdAt ? emotionRecord.createdAt.toISOString() : new Date().toISOString(),
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

    // 在API模式下，直接从远程API获取数据
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://193.112.165.180:3001/api';
    
    try {
      const response = await fetch(`${baseUrl}/emotions`);
      
      if (!response.ok) {
        throw new Error(`远程API错误: ${response.status}`);
      }
      
      const allEmotions = await response.json();
      
      // 过滤当前用户的记录
      const userEmotions = allEmotions.filter((emotion: any) => emotion.userId === session.user.id);
      
      // 将EmotionType映射回emoji - 更完整的映射表
      const emojiMap: { [key: string]: string } = {
        "HAPPY": "😊",
        "SAD": "😔",
        "ANGRY": "😡", 
        "ANXIOUS": "😰",
        "CALM": "😴",
        "EXCITED": "🤩",
        "FRUSTRATED": "😤",
        "CONTENT": "😌",
        "LONELY": "😢",
        "GRATEFUL": "🙏",
        "TIRED": "😴",
        "PEACEFUL": "🕊️",
        "STRESSED": "😫",
        "CONFUSED": "😕",
        "NEUTRAL": "😐",
      };

      // 格式化数据以匹配前端期望的格式
      const formattedRecords = userEmotions.map((record: any) => ({
        id: record.id,
        emoji: emojiMap[record.emotion] || emojiMap[record.emotion as EmotionType] || "😐", // 默认表情
        note: record.notes,
        createdAt: typeof record.createdAt === 'string' ? record.createdAt : record.createdAt ? record.createdAt.toISOString() : new Date().toISOString(),
      }));

      return NextResponse.json(formattedRecords);
    } catch (remoteError) {
      console.error("远程API调用失败:", remoteError);
      // 返回空数组作为降级处理
      return NextResponse.json([]);
    }
  } catch (error) {
    console.error("Failed to fetch emotion records:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}