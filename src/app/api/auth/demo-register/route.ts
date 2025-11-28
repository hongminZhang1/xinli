import { NextResponse } from 'next/server';
import { dbAdapter } from '../../../../lib/db-adapter';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { username, password } = body;
    
    // 基本验证
    if (!username || !password || password.length < 6) {
      return NextResponse.json({ error: 'invalid' }, { status: 400 });
    }

    // 检查用户名是否已存在
    try {
      const existingUser = await dbAdapter.user.getByUsername(username);
      if (existingUser) {
        return NextResponse.json({ error: 'exists' }, { status: 409 });
      }
    } catch (error) {
      // 用户不存在，继续注册流程
    }

    // 获取系统设置检查注册是否开放
    try {
      const settings = await dbAdapter.systemSetting.getAll();
      const registrationSetting = settings.find((s: any) => s.key === 'registration_enabled');
      const isRegistrationEnabled = registrationSetting ? registrationSetting.value === 'true' : true;
      
      if (!isRegistrationEnabled) {
        return NextResponse.json({ error: 'registration_disabled' }, { status: 403 });
      }
    } catch (error) {
      console.warn('无法获取系统设置，默认允许注册:', error);
    }

    // 通过API服务器创建用户
    const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://193.112.165.180:3001/api';
    
    const response = await fetch(`${apiBaseUrl}/users/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('注册API错误:', errorData);
      
      if (response.status === 409) {
        return NextResponse.json({ error: 'exists' }, { status: 409 });
      }
      
      return NextResponse.json({ 
        error: 'server',
        details: errorData 
      }, { status: response.status });
    }

    const result = await response.json();
    return NextResponse.json({ ok: true, user: result });
    
  } catch (err) {
    console.error('注册失败:', err);
    return NextResponse.json({ 
      error: 'server',
      message: err instanceof Error ? err.message : '未知错误'
    }, { status: 500 });
  }
}
