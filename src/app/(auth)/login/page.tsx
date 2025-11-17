"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
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
    <main className="container flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-4 text-center">登录</h2>
        <form onSubmit={onSubmit} className="bg-white p-8 rounded-lg shadow-md">
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium">用户名</label>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-3 border rounded-md bg-gray-50"
            />
          </div>
          <div className="mb-6">
            <label className="block mb-2 text-sm font-medium">密码</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              className="w-full p-3 border rounded-md bg-gray-50"
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-3 bg-primary-500 text-white rounded-md hover:bg-primary-600"
          >
            登录
          </button>
        </form>
      </div>
    </main>
  );
}
