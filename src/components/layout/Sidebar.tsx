"use client";

import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Bot,
  HeartPulse,
  Book,
  CalendarCheck,
  Library,
  Settings,
  MessageSquare,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";

const navItems = [
  { href: "/dashboard", icon: LayoutDashboard, label: "我的主页" },
  { href: "/dashboard/emotions", icon: HeartPulse, label: "情绪追踪" },
  { href: "/dashboard/chat", icon: Bot, label: "AI 倾诉" },
  { href: "/dashboard/journal", icon: Book, label: "情绪日记" },
  { href: "/dashboard/square", icon: MessageSquare, label: "文章广场" },
  { href: "/dashboard/resources", icon: Library, label: "疗愈资源" },
  { href: "/dashboard/appointments", icon: CalendarCheck, label: "咨询预约" },
];

const adminNavItems = [
  { href: "/dashboard/admin", icon: Settings, label: "管理员面板" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { data: session } = useSession();

  const isAdmin = session?.user?.role === 'ADMIN';

  return (
    <aside className="hidden lg:block w-64 p-4 bg-card border-r h-screen fixed top-0 left-0">
      <div className="mb-8 font-bold text-2xl text-center py-4 text-primary">
        心晴驿站
      </div>
      <nav className="flex flex-col gap-2">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-3 text-muted-foreground transition-all hover:text-primary hover:bg-primary/10",
              pathname === item.href && "text-primary bg-primary/10"
            )}
          >
            <item.icon className="h-5 w-5" />
            <span className="text-base">{item.label}</span>
          </Link>
        ))}
        
        {/* 管理员专用菜单 */}
        {isAdmin && (
          <>
            <hr className="my-4 border-gray-200" />
            <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
              管理员功能
            </div>
            {adminNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-3 text-muted-foreground transition-all hover:text-primary hover:bg-primary/10",
                  pathname === item.href && "text-primary bg-primary/10"
                )}
              >
                <item.icon className="h-5 w-5" />
                <span className="text-base">{item.label}</span>
              </Link>
            ))}
          </>
        )}
      </nav>
    </aside>
  );
}
