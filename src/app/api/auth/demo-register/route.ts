import { NextResponse } from 'next/server';
import { prisma } from '../../../../lib/db';
import bcrypt from 'bcrypt';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { username, password } = body;
    if (!username || !password || password.length < 6) {
      return NextResponse.json({ error: 'invalid' }, { status: 400 });
    }
    const exists = await prisma.user.findUnique({ where: { username } });
    if (exists) return NextResponse.json({ error: 'exists' }, { status: 409 });
    const hash = await bcrypt.hash(password, 10);
    await prisma.user.create({ data: { username, password: hash } });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'server' }, { status: 500 });
  }
}
