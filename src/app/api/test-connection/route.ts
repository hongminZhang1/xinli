/**
 * 测试 Vercel 到服务器的连接
 */
import { NextResponse } from "next/server";

export async function GET() {
  const testUrls = [
    'http://193.112.165.180:3001/health',
    'http://193.112.165.180:3001/api/users'
  ];
  
  const results = [];
  
  for (const url of testUrls) {
    try {
      const startTime = Date.now();
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'User-Agent': 'Vercel-Test/1.0'
        },
        signal: AbortSignal.timeout(10000) // 10秒超时
      });
      
      const duration = Date.now() - startTime;
      const text = await response.text().catch(() => '');
      
      // 转换headers为普通对象
      const headers: Record<string, string> = {};
      response.headers.forEach((value, key) => {
        headers[key] = value;
      });
      
      results.push({
        url,
        success: response.ok,
        status: response.status,
        statusText: response.statusText,
        duration: `${duration}ms`,
        responsePreview: text.substring(0, 200),
        headers
      });
    } catch (error) {
      results.push({
        url,
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        errorType: error instanceof Error ? error.name : 'Unknown'
      });
    }
  }
  
  return NextResponse.json({
    timestamp: new Date().toISOString(),
    vercelRegion: process.env.VERCEL_REGION || 'unknown',
    results
  });
}
