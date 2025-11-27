"use client";
import { SessionProvider } from "next-auth/react";
import { useCacheCleanup } from "@/hooks/useCacheCleanup";

function CacheProvider({ children }: { children: React.ReactNode }) {
  useCacheCleanup(); // 启动缓存清理
  return <>{children}</>;
}

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <CacheProvider>
        {children}
      </CacheProvider>
    </SessionProvider>
  );
}
