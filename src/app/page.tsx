import Link from "next/link";

export default function Home() {
  return (
    <main className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">心晴驿站</h1>
        <p className="mb-8 text-gray-600">一个青少年心理健康 AI 陪伴平台</p>
        <div className="flex gap-4 justify-center">
          <Link href="/login" className="px-6 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600">
            登录
          </Link>
          <Link href="/register" className="px-6 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300">
            注册
          </Link>
        </div>
      </div>
    </main>
  );
}
