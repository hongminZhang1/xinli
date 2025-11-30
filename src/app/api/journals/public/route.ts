import { NextRequest, NextResponse } from "next/server";
import { getApiBaseUrl } from "@/lib/env-config";

// 获取公开的日记（文章广场专用）
export async function GET(request: NextRequest) {
  try {
    const baseUrl = getApiBaseUrl();
    console.log('📡 公开日记API - Base URL:', baseUrl);
    
    try {
      // 请求远程API，添加 public=true 参数，让远程API只返回公开的日记
      const targetUrl = `${baseUrl}/journals?public=true`;
      console.log('🎯 请求URL:', targetUrl);
      
      const response = await fetch(targetUrl);
      
      if (!response.ok) {
        console.error(`❌ 远程API错误: ${response.status}`);
        throw new Error(`远程API错误: ${response.status}`);
      }
      
      const publicJournals = await response.json();
      console.log('📄 获取到的公开日记数量:', publicJournals.length);
      
      // 确保只返回公开的日记，作为额外的安全检查
      const filteredJournals = publicJournals.filter((journal: any) => !journal.isPrivate);
      console.log('✅ 过滤后的公开日记数量:', filteredJournals.length);
      
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