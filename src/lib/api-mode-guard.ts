/**
 * API模式保护器
 * 在API模式下阻止本地API调用
 */

import { NextResponse } from 'next/server';

export function checkApiMode() {
  const dataAccessMode = process.env.NEXT_PUBLIC_DATA_ACCESS_MODE;
  
  if (dataAccessMode === 'api') {
    return NextResponse.json(
      { 
        error: 'API模式下不应调用本地端点',
        message: '当前应用运行在API代理模式，所有数据请求应通过远程API服务器处理',
        mode: 'api',
        apiServer: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://193.112.165.180:3001/api'
      }, 
      { status: 503 }
    );
  }
  
  return null;
}