"use client";

import { useEffect } from 'react';
import { useSession } from 'next-auth/react';

/**
 * Dashboard预加载组件（已简化）
 * 移除复杂预加载逻辑，避免重复API请求
 */
export default function DashboardPreloader() {
  const { data: session } = useSession();

  useEffect(() => {
    if (session) {
      // Dashboard loaded, preload simplified
    }
  }, [session]);

  // 这个组件不渲染任何内容
  return null;
}