"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const result = await signIn("credentials", {
      redirect: false,
      username,
      password,
    });

    if (result?.ok) {
      router.push("/dashboard");
    } else {
      setError("用户名或密码错误");
    }
  };

  return (
    <div className="w-full">
      <form onSubmit={onSubmit} className="space-y-6">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">欢迎回来</h2>
          <p className="text-gray-600">登录您的账户，开始心理健康之旅</p>
        </div>
        
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-center">
            {error}
          </div>
        )}
        
        <div className="space-y-4">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">用户名</label>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-4 border border-gray-200 rounded-xl bg-gray-50/50 focus:bg-white focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all duration-200"
              placeholder="请输入用户名"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">密码</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              className="w-full p-4 border border-gray-200 rounded-xl bg-gray-50/50 focus:bg-white focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all duration-200"
              placeholder="请输入密码"
            />
          </div>
        </div>
        
        <button
          type="submit"
          className="w-full px-6 py-4 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-xl hover:from-blue-600 hover:to-indigo-600 transform hover:scale-[1.02] transition-all duration-200 font-medium shadow-lg hover:shadow-xl"
        >
          立即登录
        </button>
        
        <div className="text-center pt-4">
          <p className="text-sm text-gray-600">
            还没有账户？
            <Link href="/register" className="ml-1 text-blue-500 hover:text-blue-600 font-medium">
              立即注册
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}
