"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Sparkles, Heart, MessageCircle, BookOpen, Users, ArrowRight, Shield, Clock, Zap } from "lucide-react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

// 认证表单组件
function AuthForm({ mode, onSwitchMode, onClose }: { 
  mode: 'login' | 'register'; 
  onSwitchMode: () => void;
  onClose: () => void;
}) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (mode === 'login') {
      const result = await signIn("credentials", {
        redirect: false,
        username,
        password,
      });

      if (result?.ok) {
        onClose();
        router.push("/dashboard");
      } else {
        setError("用户名或密码错误");
      }
    } else {
      // 注册逻辑
      const res = await fetch('/api/auth/demo-register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      
      if (res.ok) {
        onClose();
        router.push('/dashboard');
      } else {
        const errorData = await res.json();
        if (errorData.error === 'registration_disabled') {
          setError('注册功能已关闭，请联系管理员');
        } else if (errorData.error === 'exists') {
          setError('用户名已存在，请选择其他用户名');
        } else if (errorData.error === 'invalid') {
          setError('请输入有效的用户名和密码（密码至少6位）');
        } else {
          setError('注册失败，请重试');
        }
      }
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="text-center mb-6">
        <p className="text-muted-foreground">
          {mode === 'login' ? '登录您的账户' : '创建您的账户'}
        </p>
      </div>
      
      {error && (
        <div className="bg-destructive/10 border border-destructive/20 text-destructive px-4 py-3 rounded-xl text-center text-sm">
          {error}
        </div>
      )}
      
      <div className="space-y-4">
        <div>
          <label className="block mb-2 text-sm font-medium text-foreground">用户名</label>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="modern-input w-full"
            placeholder="请输入用户名"
            required
          />
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-foreground">
            密码{mode === 'register' && '（至少6位）'}
          </label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            className="modern-input w-full"
            placeholder="请输入密码"
            required
            minLength={mode === 'register' ? 6 : undefined}
          />
        </div>
      </div>
      
      <button
        type="submit"
        className="btn-primary w-full"
      >
        {mode === 'login' ? '立即登录' : '立即注册'}
      </button>
      
      <div className="flex items-center justify-between pt-1">
        <p className="text-sm text-muted-foreground">
          {mode === 'login' ? '没有账户？' : '已有账户？'}
          <button
            type="button"
            onClick={onSwitchMode}
            className="ml-2 text-primary hover:text-primary/80 font-medium transition-colors"
          >
            {mode === 'login' ? '立即注册' : '立即登录'}
          </button>
        </p>
        
        <Link 
          href="/dashboard" 
          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          onClick={onClose}
        >
          游客模式登录
        </Link>
      </div>
    </form>
  );
}

// AI吉祥物组件
function AIMascot() {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 1000);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative">
      {/* 主体光球 */}
      <div className={`
        w-32 h-32 rounded-full relative overflow-hidden
        bg-gradient-to-br from-primary/20 via-accent/15 to-success/10
        border-2 border-primary/20 backdrop-blur-sm
        transition-all duration-1000 ease-out
        ${isAnimating ? 'scale-110 rotate-12' : 'scale-100 rotate-0'}
      `}>
        {/* 内部光效 */}
        <div className="absolute inset-2 rounded-full bg-gradient-to-br from-primary/30 to-transparent animate-pulse" />
        <div className="absolute inset-4 rounded-full bg-gradient-to-tr from-accent/40 to-transparent animate-breathe" />
        
        {/* 眼睛 */}
        <div className="absolute top-8 left-8 w-3 h-3 bg-primary rounded-full animate-pulse" />
        <div className="absolute top-8 right-8 w-3 h-3 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
        
        {/* 嘴巴 */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 w-6 h-3 border-b-2 border-accent rounded-full" />
      </div>
      
      {/* 浮动粒子 */}
      <div className="absolute -top-2 -left-2 w-2 h-2 bg-accent rounded-full animate-float opacity-60" />
      <div className="absolute -bottom-1 -right-3 w-1.5 h-1.5 bg-success rounded-full animate-float opacity-70" style={{ animationDelay: '1s' }} />
      <div className="absolute top-4 -right-2 w-1 h-1 bg-primary rounded-full animate-float opacity-50" style={{ animationDelay: '2s' }} />
    </div>
  );
}

export default function Home() {
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');

  return (
    <main className="min-h-screen relative">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
            
            {/* 左侧主要内容 */}
            <div className="flex-1 text-center lg:text-left space-y-10 fade-in-up">
              
              {/* AI吉祥物和简洁介绍 */}
              <div className="flex flex-col lg:flex-row items-center gap-6 mb-8">
                <AIMascot />
                <div className="space-y-2">
                  <h2 className="font-heading text-2xl text-accent">你好，我是小晴！</h2>
                  <p className="text-muted-foreground">你的专属心理健康AI伙伴</p>
                </div>
              </div>

              {/* 主标题 */}
              <div className="space-y-8">
                <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl bg-gradient-to-br from-primary via-primary to-accent bg-clip-text text-transparent leading-tight">
                  心晴驿站
                </h1>
                
                <div className="flex items-center justify-center lg:justify-start gap-4">
                  <div className="w-12 h-1 bg-gradient-to-r from-primary to-accent rounded-full"></div>
                  <Sparkles className="w-6 h-6 text-accent" />
                  <div className="w-12 h-1 bg-gradient-to-r from-accent to-success rounded-full"></div>
                </div>

                <p className="font-heading text-2xl sm:text-3xl text-muted-foreground max-w-2xl leading-relaxed">
                  让每一个年轻的心灵都能找到<br className="hidden sm:block" />
                  属于自己的<span className="text-primary font-semibold">晴朗天空</span>
                </p>
              </div>

              {/* 简化的特色介绍 */}
              <div className="space-y-6 stagger-1 max-w-xl">
                <p className="text-lg text-muted-foreground leading-relaxed">
                  支持 AI互动 社区互助 随心打卡 心情日记 咨询预约
                </p>
                
                {/* 快速统计 */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="text-center p-3 bg-primary/5 border border-primary/20 rounded-xl">
                    <div className="font-display text-lg text-primary">24/7</div>
                    <div className="text-xs text-muted-foreground">在线陪伴</div>
                  </div>
                  <div className="text-center p-3 bg-accent/5 border border-accent/20 rounded-xl">
                    <div className="font-display text-lg text-accent">10+</div>
                    <div className="text-xs text-muted-foreground">专业功能</div>
                  </div>
                  <div className="text-center p-3 bg-violet-500/10 border border-violet-500/20 rounded-xl">
                    <div className="font-display text-lg text-violet-600">&lt;1s</div>
                    <div className="text-xs text-muted-foreground">AI响应时间</div>
                  </div>
                </div>
              </div>
            </div>

            {/* 右侧登录注册区 */}
            <div className="flex-shrink-0 w-full max-w-md lg:max-w-lg fade-in-up stagger-1">
              <div className="relative">
                {/* 登录注册卡片 */}
                <div className="modern-card p-8 space-y-1">
                  <div className="text-center space-y-4">
                    <h3 className="font-heading text-3xl text-foreground font-bold relative">
                      <span className="relative z-10">探索心理新世界</span>
                    </h3>
                  </div>

                  {/* 直接展示认证表单 */}
                  <div className="bg-card/50 backdrop-blur-sm rounded-2xl p-6 border border-border/20">
                    <AuthForm 
                      mode={authMode}
                      onSwitchMode={() => setAuthMode(authMode === 'login' ? 'register' : 'login')}
                      onClose={() => {}}
                    />
                  </div>
                </div>

                {/* 浮动装饰元素 */}
                <div className="absolute -top-6 -right-6 w-12 h-12 bg-accent/10 rounded-full blur-xl animate-float"></div>
                <div className="absolute -bottom-8 -left-8 w-16 h-16 bg-primary/10 rounded-full blur-2xl animate-float" style={{ animationDelay: '2s' }}></div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}

