"use client";

import Link from "next/link";
import UserNav from "./UserNav";
import { useSession } from "next-auth/react";

export default function Header() {
  const { data: session } = useSession();
  return (
    <div className="fixed top-0 left-0 right-0 supports-backdrop-blur:bg-background/60 border-b bg-background/95 backdrop-blur z-20">
      <nav className="h-16 flex items-center justify-between px-4">
        <div className="hidden lg:block">
          {/* Placeholder for logo or other left-aligned items */}
        </div>
        <div className="flex items-center gap-4">
          {!session && (
             <Link href="/register" className="px-4 py-2 text-sm font-medium text-gray-800 hover:text-primary-600">
                注册
             </Link>
          )}
          <UserNav />
        </div>
      </nav>
    </div>
  );
}
