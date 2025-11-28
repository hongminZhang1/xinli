import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  return NextResponse.json({
    message: "Vercel deployment test",
    timestamp: new Date().toISOString(),
    url: request.url,
    host: request.headers.get('host'),
    deployment: {
      vercel: !!process.env.VERCEL,
      vercelUrl: process.env.VERCEL_URL,
      nodeEnv: process.env.NODE_ENV,
    }
  });
}