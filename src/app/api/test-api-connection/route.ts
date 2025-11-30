import { NextRequest, NextResponse } from "next/server";
import { getApiBaseUrl } from "@/lib/env-config";

export async function GET(request: NextRequest) {
  try {
    const baseUrl = getApiBaseUrl();
    
    // Testing API connection
    
    // 测试基本连接
    const testUrls = [
      `${baseUrl}/health`,
      `${baseUrl}/users`,
      `${baseUrl}/`,
    ];
    
    const results = [];
    
    for (const url of testUrls) {
      try {
        // Testing connection
        
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          signal: AbortSignal.timeout(5000), // 5秒超时
        });
        
        const status = response.status;
        const statusText = response.statusText;
        
        let data = null;
        try {
          data = await response.text();
        } catch (e) {
          data = "无法读取响应内容";
        }
        
        results.push({
          url,
          status,
          statusText,
          ok: response.ok,
          data: data?.substring(0, 500), // 限制数据长度
        });
        
      } catch (error) {
        results.push({
          url,
          error: error instanceof Error ? error.message : "Unknown error",
          failed: true,
        });
      }
    }
    
    return NextResponse.json({
      timestamp: new Date().toISOString(),
      baseUrl,
      environment: {
        NODE_ENV: process.env.NODE_ENV,
        VERCEL: !!process.env.VERCEL,
        NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
      },
      testResults: results,
    });
    
  } catch (error) {
    return NextResponse.json({
      error: error instanceof Error ? error.message : "Unknown error",
      stack: error instanceof Error ? error.stack : undefined,
      timestamp: new Date().toISOString(),
    }, { status: 500 });
  }
}