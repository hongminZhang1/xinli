import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../[...nextauth]/route";
import { getServerSession } from "next-auth";

export async function GET(request: NextRequest) {
  try {
    // 获取当前会话
    const session = await getServerSession(authOptions);
    
    return NextResponse.json({
      timestamp: new Date().toISOString(),
      session: session,
      authOptions: {
        providers: authOptions.providers?.length || 0,
        secret: !!authOptions.secret,
        pages: authOptions.pages,
      },
      environment: {
        NODE_ENV: process.env.NODE_ENV,
        VERCEL: process.env.VERCEL,
        NEXTAUTH_URL: process.env.NEXTAUTH_URL,
        NEXTAUTH_SECRET_EXISTS: !!process.env.NEXTAUTH_SECRET,
        NEXT_PUBLIC_DATA_ACCESS_MODE: process.env.NEXT_PUBLIC_DATA_ACCESS_MODE,
      },
      url: request.url,
    });
  } catch (error) {
    return NextResponse.json({
      error: error instanceof Error ? error.message : "Unknown error",
      stack: error instanceof Error ? error.stack : undefined,
      timestamp: new Date().toISOString(),
    }, { status: 500 });
  }
}