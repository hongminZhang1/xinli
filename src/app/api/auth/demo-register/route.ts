import { NextResponse } from 'next/server';
import { prisma } from '../../../../lib/db';
import { getSettings } from '../../../../lib/settings';
import bcrypt from 'bcrypt';

export async function POST(req: Request) {
  try {
    // 检查注册是否开放
    const settings = await getSettings();
    const isRegistrationEnabled = settings.registration_enabled;
    if (!isRegistrationEnabled) {
      return NextResponse.json({ error: 'registration_disabled' }, { status: 403 });
    }

    const body = await req.json();
    const { username, password } = body;
    if (!username || !password || password.length < 6) {
      return NextResponse.json({ error: 'invalid' }, { status: 400 });
    }
    const exists = await prisma.user.findUnique({ where: { username } });
    if (exists) return NextResponse.json({ error: 'exists' }, { status: 409 });
    const hash = await bcrypt.hash(password, 10);
    
    // 检查是否是第一个用户，如果是则设为管理员
    const userCount = await prisma.user.count();
    const role = userCount === 0 ? 'ADMIN' : 'USER';
    
    await prisma.user.create({ 
      data: { 
        username, 
        password: hash,
        role: role as any
      } 
    });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'server' }, { status: 500 });
  }
}
