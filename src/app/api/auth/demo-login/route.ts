import { NextResponse } from 'next/server';
import { prisma } from '../../../../lib/db';
import bcrypt from 'bcrypt';

export async function POST(req: Request) {
  try {
    const { username, password } = await req.json();
    if (!username || !password) return NextResponse.json({ error: 'invalid' }, { status: 400 });
    const user = await prisma.user.findUnique({ where: { username } });
    if (!user) return NextResponse.json({ error: 'not_found' }, { status: 404 });
    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
    // For demo we don't set a real session; production should use NextAuth or secure cookies
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'server' }, { status: 500 });
  }
}
