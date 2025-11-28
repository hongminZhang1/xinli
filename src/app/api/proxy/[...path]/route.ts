/**
 * API代理处理器
 * 用于在Vercel部署时解决HTTPS混合内容问题
 */
import { NextRequest, NextResponse } from "next/server";

// 代理到远程API服务器
async function proxyToRemoteApi(request: NextRequest, endpoint: string) {
  const remoteUrl = `http://193.112.165.180:3001/api${endpoint}`;
  
  try {
    const requestBody = request.method !== 'GET' && request.method !== 'HEAD' 
      ? await request.text().catch(() => '')
      : undefined;

    const response = await fetch(remoteUrl, {
      method: request.method,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'User-Agent': 'Vercel-Proxy/1.0',
      },
      body: requestBody,
    });

    const responseText = await response.text();
    
    // 尝试解析为JSON，如果失败则返回原始文本
    let responseData;
    try {
      responseData = JSON.parse(responseText);
    } catch {
      responseData = { message: responseText };
    }

    return NextResponse.json(responseData, { 
      status: response.status,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      }
    });
  } catch (error) {
    console.error('代理API请求失败:', error);
    return NextResponse.json(
      { 
        error: '远程API不可用',
        details: error instanceof Error ? error.message : 'Unknown error'
      }, 
      { status: 503 }
    );
  }
}

// 处理所有代理请求
export async function GET(request: NextRequest, { params }: { params: { path: string[] } }) {
  const endpoint = '/' + params.path.join('/');
  return proxyToRemoteApi(request, endpoint);
}

export async function POST(request: NextRequest, { params }: { params: { path: string[] } }) {
  const endpoint = '/' + params.path.join('/');
  return proxyToRemoteApi(request, endpoint);
}

export async function PUT(request: NextRequest, { params }: { params: { path: string[] } }) {
  const endpoint = '/' + params.path.join('/');
  return proxyToRemoteApi(request, endpoint);
}

export async function DELETE(request: NextRequest, { params }: { params: { path: string[] } }) {
  const endpoint = '/' + params.path.join('/');
  return proxyToRemoteApi(request, endpoint);
}