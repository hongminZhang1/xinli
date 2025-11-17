"use client";

import { useSession, signOut } from "next-auth/react";

export default function UserNav() {
  const { data: session } = useSession();

  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-gray-200 rounded-full" />
        <span className="text-sm font-medium">{session?.user?.username || "访客"}</span>
      </div>
      {session && (
        <button 
          onClick={() => signOut({ callbackUrl: '/login' })}
          className="text-sm text-gray-600 hover:text-primary-600"
        >
          登出
        </button>
      )}
    </div>
  );
}
