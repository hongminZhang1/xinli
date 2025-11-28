import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { dbAdapter } from "@/lib/db-adapter";

export async function PATCH(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "未授权" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { avatarUrl } = body;

    if (!avatarUrl || typeof avatarUrl !== "string") {
      return NextResponse.json(
        { error: "无效的头像URL" },
        { status: 400 }
      );
    }

    // 更新用户头像
    const updatedUser = await dbAdapter.user.update(session.user.id, { 
      avatar: avatarUrl 
    });

    return NextResponse.json({
      success: true,
      user: updatedUser
    });

  } catch (error) {
    console.error("Avatar update error:", error);
    return NextResponse.json(
      { error: "更新头像时发生错误" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "未授权" },
        { status: 401 }
      );
    }

    // 删除用户头像（设置为null）
    const updatedUser = await dbAdapter.user.update(session.user.id, { 
      avatar: null 
    });

    return NextResponse.json({
      success: true,
      user: updatedUser
    });

  } catch (error) {
    console.error("Avatar deletion error:", error);
    return NextResponse.json(
      { error: "删除头像时发生错误" },
      { status: 500 }
    );
  }
}