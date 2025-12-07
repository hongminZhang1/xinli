'use client';

import { useState, useEffect } from 'react';

export default function RealTimeDisplay() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000); // 每秒更新一次

    return () => clearInterval(timer); // 清理定时器
  }, []);

  // 在服务器端渲染时显示静态内容，避免水合错误
  if (!mounted) {
    return (
      <div className="text-center lg:text-right w-full lg:w-auto">
        <div className="text-xs sm:text-sm text-muted-foreground mb-1">
          正在加载...
        </div>
        <div className="text-lg sm:text-xl lg:text-2xl font-bold text-foreground">
          --:--:--
        </div>
      </div>
    );
  }

  return (
    <div className="text-center lg:text-right w-full lg:w-auto">
      <div className="text-xs sm:text-sm text-muted-foreground mb-1">
        {currentTime.toLocaleDateString('zh-CN', { 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric',
          weekday: 'long'
        })}
      </div>
      <div className="text-lg sm:text-xl lg:text-2xl font-bold text-foreground">
        {currentTime.toLocaleTimeString('zh-CN', { 
          hour: '2-digit', 
          minute: '2-digit',
          second: '2-digit'
        })}
      </div>
    </div>
  );
}