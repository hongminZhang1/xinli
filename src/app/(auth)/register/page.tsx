"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

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
    if (res.ok) router.push('/login');
    else alert('注册失败（演示）');
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center min-h-screen">
          <div className="w-full max-w-6xl flex flex-col lg:flex-row items-center gap-12">
            
            {/* Left Side - Welcome Content */}
            <div className="flex-1 text-center lg:text-left space-y-8">
              <div className="space-y-4">
                <h1 className="text-5xl lg:text-6xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  加入心晴驿站
                </h1>
                <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto lg:mx-0"></div>
              </div>
              
              <p className="text-2xl lg:text-3xl text-gray-700 font-light leading-relaxed">
                开启您的心理健康之旅
              </p>
              
              <div className="space-y-6">
                <p className="text-lg text-gray-600 max-w-xl leading-relaxed">
                  无须会员，享受专业的心理健康服务，让AI陪伴你度过每一个重要时刻，
                  记录情绪变化，获得个性化的心理建议和支持。
                </p>
                
                {/* Features */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-lg">
                  <div className="flex items-center gap-3 p-4 bg-white/60 rounded-xl backdrop-blur-sm border border-white/30">
                    <div className="w-3 h-3 bg-gradient-to-r from-green-400 to-green-500 rounded-full"></div>
                    <span className="text-sm font-medium text-gray-700">专业心理分析</span>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-white/60 rounded-xl backdrop-blur-sm border border-white/30">
                    <div className="w-3 h-3 bg-gradient-to-r from-blue-400 to-blue-500 rounded-full"></div>
                    <span className="text-sm font-medium text-gray-700">24小时AI陪伴</span>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-white/60 rounded-xl backdrop-blur-sm border border-white/30">
                    <div className="w-3 h-3 bg-gradient-to-r from-purple-400 to-purple-500 rounded-full"></div>
                    <span className="text-sm font-medium text-gray-700">情绪记录追踪</span>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-white/60 rounded-xl backdrop-blur-sm border border-white/30">
                    <div className="w-3 h-3 bg-gradient-to-r from-pink-400 to-pink-500 rounded-full"></div>
                    <span className="text-sm font-medium text-gray-700">个性化建议</span>
                  </div>
                </div>
                
                {/* Trust Indicators */}
                <div className="flex flex-wrap gap-6 text-sm text-gray-500">
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    </div>
                    <span>隐私保护</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    </div>
                    <span>专业认证</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 bg-purple-100 rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    </div>
                    <span>免费使用</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Registration Form */}
            <div className="flex-shrink-0 w-full max-w-md">
              <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-white/20">
                <form onSubmit={onSubmit} className="space-y-6">
                  <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-gray-800 mb-2">创建账户</h2>
                    <p className="text-gray-600">开始您的心理健康之旅</p>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-700">用户名</label>
                      <input 
                        value={username} 
                        onChange={e => setUsername(e.target.value)} 
                        className="w-full p-4 border border-gray-200 rounded-xl bg-gray-50/50 focus:bg-white focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all duration-200"
                        placeholder="请输入用户名"
                      />
                    </div>
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-700">密码（至少 6 位）</label>
                      <input 
                        value={password} 
                        onChange={e => setPassword(e.target.value)} 
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
                    立即注册
                  </button>
                  
                  <div className="text-center pt-4">
                    <p className="text-sm text-gray-600">
                      已有账户？
                      <Link href="/" className="ml-1 text-blue-500 hover:text-blue-600 font-medium">
                        立即登录
                      </Link>
                    </p>
                  </div>
                </form>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </main>
  );
}
