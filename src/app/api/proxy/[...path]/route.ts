/**
 * API代理处理器
 * 统一处理所有API请求的代理转发
 */
import { NextRequest, NextResponse } from "next/server";

const API_BASE_URL = 'http://193.112.165.180:3001/api';

// 代理到远程API服务器
async function proxyToRemoteApi(request: NextRequest, endpoint: string) {
  // 获取查询参数
  const url = new URL(request.url);
  const queryParams = url.search; // 包含 '?' 的完整查询字符串
  
  const remoteUrl = `${API_BASE_URL}${endpoint}${queryParams}`;
  
  try {
    const requestBody = request.method !== 'GET' && request.method !== 'HEAD' 
      ? await request.text().catch(() => '')
      : undefined;

    const response = await fetch(remoteUrl, {
      method: request.method,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: requestBody,
    });

    const responseText = await response.text();
    
    // 尝试解析为JSON
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

export async function PATCH(request: NextRequest, { params }: { params: { path: string[] } }) {
  const endpoint = '/' + params.path.join('/');
  return proxyToRemoteApi(request, endpoint);
}
