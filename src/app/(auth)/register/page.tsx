"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Demo: call a placeholder API to register
    const res = await fetch('/api/auth/demo-register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
    if (res.ok) router.push('/(auth)/login');
    else alert('注册失败（演示）');
  }

  return (
    <main className="container py-20">
      <h2 className="text-2xl font-semibold mb-4">注册（演示）</h2>
      <form onSubmit={onSubmit} className="max-w-md bg-white p-6 rounded shadow">
        <label className="block mb-2">用户名</label>
        <input value={username} onChange={e => setUsername(e.target.value)} className="w-full mb-3 p-2 border rounded" />
        <label className="block mb-2">密码（至少 6 位）</label>
        <input value={password} onChange={e => setPassword(e.target.value)} type="password" className="w-full mb-4 p-2 border rounded" />
        <div className="flex justify-end">
          <button type="submit" className="px-4 py-2 bg-calm-500 text-white rounded">注册</button>
        </div>
      </form>
    </main>
  );
}
