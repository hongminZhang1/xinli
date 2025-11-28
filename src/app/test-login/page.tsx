"use client";

import { useState } from "react";

export default function LoginTestPage() {
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const testLogin = async () => {
    setLoading(true);
    setResult(null);
    
    try {
      const response = await fetch('/api/auth/test-login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: 'admin',
          password: 'admin123'
        })
      });
      
      const data = await response.json();
      setResult(data);
    } catch (error) {
      setResult({ error: error instanceof Error ? error.message : "Network error" });
    }
    
    setLoading(false);
  };

  const testActualLogin = async () => {
    setLoading(true);
    setResult(null);
    
    try {
      // 导入 signIn 动态
      const { signIn } = await import('next-auth/react');
      
      const result = await signIn('credentials', {
        redirect: false,
        username: 'admin',
        password: 'admin123'
      });
      
      setResult({
        type: 'NextAuth signIn result',
        ...result
      });
    } catch (error) {
      setResult({ error: error instanceof Error ? error.message : "NextAuth error" });
    }
    
    setLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">登录测试页面</h1>
      
      <div className="space-y-4">
        <button 
          onClick={testLogin}
          disabled={loading}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
        >
          {loading ? '测试中...' : '测试数据库登录'}
        </button>
        
        <button 
          onClick={testActualLogin}
          disabled={loading}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 disabled:opacity-50 ml-4"
        >
          {loading ? '测试中...' : '测试NextAuth登录'}
        </button>
      </div>
      
      {result && (
        <div className="mt-6 p-4 bg-gray-100 rounded">
          <h3 className="font-semibold mb-2">测试结果:</h3>
          <pre className="text-sm overflow-auto">
            {JSON.stringify(result, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}