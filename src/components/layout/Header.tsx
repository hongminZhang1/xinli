"use client";

import Link from "next/link";
import UserNav from "./UserNav";
import ThemeToggle from "@/components/ui/ThemeToggle";
import { useSession } from "next-auth/react";
import { Menu, X, BrainCircuit, Sparkles } from "lucide-react";
import { useState } from "react";
import MobileSidebar from "./MobileSidebar";

export default function Header() {
  const { data: session } = useSession();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <div className="fixed top-0 left-0 right-0 supports-backdrop-blur:bg-background/60 border-b bg-background/95 backdrop-blur z-20">
        <nav className="h-14 md:h-16 flex items-center justify-between px-3 md:px-6">
          {/* 左侧：Logo和汉堡菜单 */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 hover:bg-primary/10 rounded-lg transition-colors"
              aria-label="菜单"
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5 text-foreground" />
              ) : (
                <Menu className="h-5 w-5 text-foreground" />
              )}
            </button>
            
            <Link href="/dashboard" className="flex items-center gap-2 transition-opacity hover:opacity-90">
              <div className="relative flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-tr from-primary to-primary-400 text-white shadow-lg shadow-primary/20">
                <BrainCircuit className="h-5 w-5" />
                <Sparkles className="absolute -right-1 -top-1 h-3 w-3 text-yellow-300" />
              </div>
              <span className="font-display text-lg font-bold text-gray-900 dark:text-slate-100 md:text-xl">
                心晴驿站
              </span>
            </Link>
          </div>

          {/* 右侧：用户导航 */}
          <div className="flex items-center gap-2 md:gap-4">
            {!session && (
              <Link 
                href="/" 
                className="px-3 md:px-4 py-1.5 md:py-2 text-xs md:text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
              >
                登录 / 注册
              </Link>
            )}
            <ThemeToggle />
            <UserNav />
          </div>
        </nav>
      </div>

      {/* 移动端侧边栏 */}
      <MobileSidebar isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
    </>
  );
}
