import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getApiBaseUrl } from "@/lib/env-config";
// eslint-disable-next-line @typescript-eslint/no-require-imports
const COS = require("cos-nodejs-sdk-v5");

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];
const MAX_SIZE = 2 * 1024 * 1024; // 2MB
const CDN_DOMAIN = "pic.homgzha.cc";

function getCosClient() {
  return new COS({
    SecretId: process.env.COS_SECRET_ID,
    SecretKey: process.env.COS_SECRET_KEY,
  });
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "未授权" }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "未找到文件" }, { status: 400 });
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: "仅支持 JPG、PNG、WebP、GIF 格式" },
        { status: 400 }
      );
    }

    if (file.size > MAX_SIZE) {
      return NextResponse.json(
        { error: "文件大小不能超过 2MB" },
        { status: 400 }
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const ext = (file.name.split(".").pop() || "jpg").toLowerCase();
    const key = `avatars/${session.user.id}-${Date.now()}.${ext}`;

    const bucket = process.env.COS_BUCKET;
    const region = process.env.COS_REGION;

    if (!bucket || !region || !process.env.COS_SECRET_ID || !process.env.COS_SECRET_KEY) {
      console.error("COS 环境变量未配置");
      return NextResponse.json({ error: "服务未配置，请联系管理员" }, { status: 500 });
    }

    const cos = getCosClient();

    await new Promise<void>((resolve, reject) => {
      cos.putObject(
        {
          Bucket: bucket,
          Region: region,
          Key: key,
          Body: buffer,
          ContentType: file.type,
        },
        (err: Error | null) => {
          if (err) reject(err);
          else resolve();
        }
      );
    });

    const avatarUrl = `https://${CDN_DOMAIN}/${key}`;

    // 将头像 URL 写入数据库
    const res = await fetch(`${getApiBaseUrl()}/users/${session.user.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ avatar: avatarUrl }),
    });

    if (!res.ok) {
      throw new Error(`数据库更新失败: ${res.status}`);
    }

    return NextResponse.json({ success: true, avatarUrl });
  } catch (error) {
    console.error("COS 上传错误:", error);
    return NextResponse.json({ error: "上传失败，请稍后重试" }, { status: 500 });
  }
}
