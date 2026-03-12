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
  Brain,
  Smile,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";

const baseNavItems = [
  { href: "/dashboard", icon: LayoutDashboard, label: "我的主页" },
  { href: "/dashboard/emotions", icon: HeartPulse, label: "情绪追踪" },
  { href: "/dashboard/assessment", icon: Brain, label: "心理评估" },
  { href: "/dashboard/chat", icon: Bot, label: "AI 倾诉" },
  { href: "/dashboard/journal", icon: Book, label: "我的日记" },
  { href: "/dashboard/square", icon: MessageSquare, label: "文章广场" },
  { href: "/dashboard/resources", icon: Library, label: "疗愈资源" },
];

const adminNavItems = [
  { href: "/dashboard/admin", icon: Settings, label: "管理员面板" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { data: session } = useSession();

  const isAdmin = session?.user?.role === 'ADMIN';
  const isCounselor = session?.user?.role === 'COUNSELOR';

  const navItems = [
    ...baseNavItems,
    {
      href: "/dashboard/appointments",
      icon: isCounselor ? Smile : CalendarCheck,
      label: isCounselor ? "情绪开导" : "咨询预约",
    },
  ];

  return (
    <aside className="hidden lg:flex lg:flex-col w-64 p-4 bg-card border-r h-screen fixed top-0 left-0">
      <div className="mb-8 font-bold text-2xl text-center py-4 text-primary">
        心晴驿站
      </div>
      <nav className="flex flex-col gap-2 flex-1">
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

      {/* 备案信息 */}
      <div className="mt-auto pt-4 border-t border-border/50">
        <p className="text-center text-sm text-muted-foreground/80 leading-relaxed">
          <a
            href="https://beian.miit.gov.cn/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold hover:text-foreground transition-colors"
          >
            皖ICP备2024064456号
          </a>
        </p>
      </div>
    </aside>
  );
}
