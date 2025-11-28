/**
 * 测试认证流程的调试端点
 */
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db-adapter";

export async function GET(request: NextRequest) {
  try {
    const testUsername = "admin"; // 测试用户名
    
    console.log("🧪 开始测试认证流程");
    console.log("📍 环境:", process.env.NODE_ENV);
    console.log("🌐 Vercel:", !!process.env.VERCEL);
    
    // 测试查询用户
    const user = await db.user.findUnique({
      username: testUsername
    });
    
    return NextResponse.json({
      success: true,
      environment: process.env.NODE_ENV,
      isVercel: !!process.env.VERCEL,
      userFound: !!user,
      userData: user ? {
        id: user.id,
        username: user.username,
        hasPassword: !!user.password,
        role: user.role
      } : null
    });
  } catch (error) {
    console.error("❌ 测试失败:", error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
      stack: error instanceof Error ? error.stack : undefined
    }, { status: 500 });
  }
}
