import { NextRequest, NextResponse } from "next/server";
import { getApiBaseUrl } from "@/lib/env-config";

// 获取公开的日记（文章广场专用）
export async function GET(request: NextRequest) {
  try {
    const baseUrl = getApiBaseUrl();
    
    try {
      // 请求远程API，添加 public=true 参数，让远程API只返回公开的日记
      const response = await fetch(`${baseUrl}/journals?public=true`);
      
      if (!response.ok) {
        throw new Error(`远程API错误: ${response.status}`);
      }
      
      const publicJournals = await response.json();
      
      // 确保只返回公开的日记，作为额外的安全检查
      const filteredJournals = publicJournals.filter((journal: any) => !journal.isPrivate);
      
      return NextResponse.json(filteredJournals);
    } catch (remoteError) {
      console.error("远程API调用失败:", remoteError);
      // 返回空数组作为降级处理
      return NextResponse.json([]);
    }
  } catch (error) {
    console.error("Failed to fetch public journals:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}