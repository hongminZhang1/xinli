# 心晴驿站 — 项目骨架

这是一个基于 Next.js (App Router) + TypeScript + TailwindCSS + Prisma 的项目骨架，包含最小登录演示、仪表盘与 Prisma schema。

快速开始（PowerShell）:

```powershell
cd d:\xinli
npm install
# 复制 .env.example 为 .env.local 并填入数据库与 NEXTAUTH_SECRET
copy .env.example .env.local
npm run prisma:generate
npm run prisma:push
npm run dev
```

演示内容：
- `src/app/(auth)/login`：用户名密码登录页面（演示）
- `src/app/dashboard`：简单仪表盘页面
- `prisma/schema.prisma`：数据库模型

注意：这是一个骨架 demo，实际生产时请完善安全（密码散列、session 策略）、环境变量与依赖版本。
