import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db-adapter";
import bcrypt from "bcrypt";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { username, password } = body;
    
    // 测试数据库连接
    const user = await db.user.findUnique({
      username: username
    });
    
    if (!user) {
      return NextResponse.json({
        success: false,
        message: "用户不存在",
        username: username
      });
    }
    
    // 测试密码验证
    if (!user.password) {
      return NextResponse.json({
        success: false,
        message: "用户密码未设置",
        user: { id: user.id, username: user.username, role: user.role }
      });
    }
    
    const isValid = await bcrypt.compare(password, user.password);
    
    return NextResponse.json({
      success: isValid,
      message: isValid ? "认证成功" : "密码错误", 
      user: {
        id: user.id,
        username: user.username,
        role: user.role,
        isActive: user.isActive
      },
      passwordCheck: isValid
    });
    
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
      stack: error instanceof Error ? error.stack : undefined
    }, { status: 500 });
  }
}