import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { db } from "@/lib/db-adapter";
import { EmotionType } from "@prisma/client";
import { getApiBaseUrl } from "@/lib/env-config";

// 更新情绪记录
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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
    
    // 在API模式下，调用远程API更新记录
    const baseUrl = getApiBaseUrl();
    
    const response = await fetch(`${baseUrl}/emotions/${params.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        emotion: emotionType,
        notes: note || null,
      }),
    });

    if (!response.ok) {
      throw new Error(`远程API错误: ${response.status}`);
    }

    const updatedRecord = await response.json();

    // 返回格式化的数据
    const formattedRecord = {
      id: updatedRecord.id,
      emoji: emoji,
      note: updatedRecord.notes,
      createdAt: typeof updatedRecord.createdAt === 'string' ? updatedRecord.createdAt : updatedRecord.createdAt ? updatedRecord.createdAt.toISOString() : new Date().toISOString(),
    };

    return NextResponse.json(formattedRecord);
  } catch (error) {
    console.error("Failed to update emotion record:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// 删除情绪记录
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = params;
    
    // 在API模式下，调用远程API删除记录
    const baseUrl = getApiBaseUrl();
    
    const response = await fetch(`${baseUrl}/emotions/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error(`远程API错误: ${response.status}`);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to delete emotion record:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}