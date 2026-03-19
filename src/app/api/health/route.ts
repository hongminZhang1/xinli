/**
 * API健康检查代�?
 * 用于检查远程API服务器的健康状�?
 */
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const startTime = Date.now();
    
    // 尝试多个可能的健康检查端�?
    const healthUrls = [
      'http://127.0.0.1:3001/health',
      'http://127.0.0.1:3001/api/health'
    ];
    
    let lastError = null;
    
    for (const url of healthUrls) {
      try {
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'User-Agent': 'Health-Check/1.0',
          },
          signal: AbortSignal.timeout(5000) // 5秒超�?
        });
        
        const responseTime = Date.now() - startTime;
        
        if (response.ok) {
          const data = await response.text().catch(() => '');
          
          return NextResponse.json({
            status: 'healthy',
            connected: true,
            responseTime,
            server: '127.0.0.1:3001',
            endpoint: url,
            timestamp: new Date().toISOString()
          });
        }
      } catch (error) {
        lastError = error;
        continue; // 尝试下一个URL
      }
    }
    
    // 所有URL都失�?
    throw lastError || new Error('All health check endpoints failed');
    
  } catch (error) {
    console.error('�?API健康检查失�?', error);
    
    return NextResponse.json({
      status: 'unhealthy',
      connected: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      server: '127.0.0.1:3001',
      timestamp: new Date().toISOString()
    }, { status: 503 });
  }
}
