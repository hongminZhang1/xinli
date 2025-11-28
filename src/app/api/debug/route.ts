import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const debugInfo = {
    timestamp: new Date().toISOString(),
    environment: {
      NODE_ENV: process.env.NODE_ENV,
      VERCEL: process.env.VERCEL,
      VERCEL_URL: process.env.VERCEL_URL,
      NEXTAUTH_URL: process.env.NEXTAUTH_URL,
      NEXTAUTH_SECRET_EXISTS: !!process.env.NEXTAUTH_SECRET,
    },
    headers: {
      host: request.headers.get('host'),
      origin: request.headers.get('origin'),
      'user-agent': request.headers.get('user-agent'),
      'x-forwarded-proto': request.headers.get('x-forwarded-proto'),
    },
    url: request.url,
  };

  return NextResponse.json(debugInfo, {
    headers: {
      'Cache-Control': 'no-cache',
    }
  });
}