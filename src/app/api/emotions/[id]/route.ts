import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/db";
import { EmotionType } from "@prisma/client";

// 更新情绪记录
export async function PATCH(
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

    // 验证记录是否属于当前用户
    const existingRecord = await prisma.emotionRecord.findFirst({
      where: {
        id: params.id,
        userId: session.user.id,
      },
    });

    if (!existingRecord) {
      return NextResponse.json({ error: "Record not found" }, { status: 404 });
    }

    // 将emoji映射到EmotionType
    const emotionMap: { [key: string]: EmotionType } = {
      "😊": "HAPPY",
      "😔": "SAD", 
      "😡": "ANGRY",
      "😴": "CALM",
      "😰": "ANXIOUS",
    };

    const emotionType = emotionMap[emoji] || existingRecord.emotion;
    
    const updatedRecord = await prisma.emotionRecord.update({
      where: { id: params.id },
      data: {
        emotion: emotionType,
        notes: note || null,
      },
    });

    // 返回格式化的数据
    const formattedRecord = {
      id: updatedRecord.id,
      emoji: emoji,
      note: updatedRecord.notes,
      createdAt: updatedRecord.createdAt.toISOString(),
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

    // 验证记录是否属于当前用户
    const existingRecord = await prisma.emotionRecord.findFirst({
      where: {
        id: params.id,
        userId: session.user.id,
      },
    });

    if (!existingRecord) {
      return NextResponse.json({ error: "Record not found" }, { status: 404 });
    }

    await prisma.emotionRecord.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ message: "Record deleted successfully" });
  } catch (error) {
    console.error("Failed to delete emotion record:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}