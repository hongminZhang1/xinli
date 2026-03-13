import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getApiBaseUrl } from '@/lib/env-config';

// 获取当前用户的对话会话列表
export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const baseUrl = getApiBaseUrl();
  try {
    const res = await fetch(`${baseUrl}/chat/user/${session.user.id}`, { cache: 'no-store' });
    if (!res.ok) return NextResponse.json([]);
    const data = await res.json();
    return NextResponse.json(Array.isArray(data) ? data : []);
  } catch {
    return NextResponse.json([]);
  }
}

// 创建新的对话会话
export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await request.json();
  const baseUrl = getApiBaseUrl();
  try {
    const res = await fetch(`${baseUrl}/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...body, userId: session.user.id }),
    });
    if (!res.ok) return NextResponse.json({ error: 'Failed to create session' }, { status: 500 });
    return NextResponse.json(await res.json(), { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Failed to create session' }, { status: 500 });
  }
}
