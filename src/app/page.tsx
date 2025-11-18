import LoginForm from "@/components/auth/LoginForm";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="flex items-center justify-center min-h-screen">
          <div className="w-full max-w-6xl flex flex-col lg:flex-row items-center gap-12">
            {/* Left Content */}
            <div className="flex-1 text-center lg:text-left space-y-8">
              <div className="space-y-4">
                <h1 className="text-6xl lg:text-7xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  心晴驿站
                </h1>
                <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto lg:mx-0"></div>
              </div>
              
              <p className="text-2xl lg:text-3xl text-gray-700 font-light leading-relaxed max-w-2xl">
                青少年心理健康 AI 陪伴平台
              </p>
              
              <div className="space-y-6">
                <p className="text-lg text-gray-600 max-w-xl leading-relaxed">
                  为青少年提供专业的心理健康支持，通过AI技术实现24小时陪伴，
                  让每一个年轻的心灵都能找到属于自己的晴朗天空。
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 text-sm text-gray-500">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span>专业心理咨询</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                    <span>AI智能陪伴</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                    <span>情绪记录分析</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Content - Login Form */}
            <div className="flex-shrink-0 w-full max-w-md">
              <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-white/20">
                <LoginForm />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

