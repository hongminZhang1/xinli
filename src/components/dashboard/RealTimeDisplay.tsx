'use client';

import { useState, useEffect } from 'react';

export default function RealTimeDisplay() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000); // 每秒更新一次

    return () => clearInterval(timer); // 清理定时器
  }, []);

  return (
    <div className="text-right ml-4">
      <div className="text-sm text-gray-500 mb-1">
        {currentTime.toLocaleDateString('zh-CN', { 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric',
          weekday: 'long'
        })}
      </div>
      <div className="text-2xl font-bold text-gray-700">
        {currentTime.toLocaleTimeString('zh-CN', { 
          hour: '2-digit', 
          minute: '2-digit',
          second: '2-digit'
        })}
      </div>
    </div>
  );
}