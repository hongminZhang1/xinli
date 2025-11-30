"use client";
import { SessionProvider } from "next-auth/react";
import { useCacheCleanup } from "@/hooks/useCacheCleanup";
import { useEffect } from "react";

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

function ErrorBoundary({ children }: ErrorBoundaryProps) {
  useEffect(() => {
    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      console.error('未处理的Promise拒绝:', event.reason);
      // 这里可以添加错误上报逻辑
    };

    window.addEventListener('unhandledrejection', handleUnhandledRejection);
    return () => window.removeEventListener('unhandledrejection', handleUnhandledRejection);
  }, []);

  return <>{children}</>;
}

function CacheProvider({ children }: { children: React.ReactNode }) {
  useCacheCleanup(); // 启动缓存清理
  return <>{children}</>;
}

function MotionProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // 检测用户是否偏好减少动画
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    if (prefersReducedMotion.matches) {
      document.documentElement.style.setProperty('--animation-duration', '0.01ms');
    }

    const handleChange = (e: MediaQueryListEvent) => {
      if (e.matches) {
        document.documentElement.style.setProperty('--animation-duration', '0.01ms');
      } else {
        document.documentElement.style.removeProperty('--animation-duration');
      }
    };

    prefersReducedMotion.addEventListener('change', handleChange);
    return () => prefersReducedMotion.removeEventListener('change', handleChange);
  }, []);

  return <>{children}</>;
}

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ErrorBoundary>
      <SessionProvider>
        <CacheProvider>
          <MotionProvider>
            {children}
          </MotionProvider>
        </CacheProvider>
      </SessionProvider>
    </ErrorBoundary>
  );
}
