import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getApiBaseUrl } from '@/lib/env-config';

// 更新对话会话消息
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await request.json();
  const baseUrl = getApiBaseUrl();
  try {
    const res = await fetch(`${baseUrl}/chat/${params.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    if (!res.ok) return NextResponse.json({ error: 'Failed to update session' }, { status: 500 });
    return NextResponse.json(await res.json());
  } catch {
    return NextResponse.json({ error: 'Failed to update session' }, { status: 500 });
  }
}
