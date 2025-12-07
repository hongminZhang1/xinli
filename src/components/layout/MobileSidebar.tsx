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
  X,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

const navItems = [
  { href: "/dashboard", icon: LayoutDashboard, label: "我的主页" },
  { href: "/dashboard/emotions", icon: HeartPulse, label: "情绪追踪" },
  { href: "/dashboard/assessment", icon: Brain, label: "心理评估" },
  { href: "/dashboard/chat", icon: Bot, label: "AI 倾诉" },
  { href: "/dashboard/journal", icon: Book, label: "我的日记" },
  { href: "/dashboard/square", icon: MessageSquare, label: "文章广场" },
  { href: "/dashboard/resources", icon: Library, label: "疗愈资源" },
  { href: "/dashboard/appointments", icon: CalendarCheck, label: "咨询预约" },
];

const adminNavItems = [
  { href: "/dashboard/admin", icon: Settings, label: "管理员面板" },
];

interface MobileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileSidebar({ isOpen, onClose }: MobileSidebarProps) {
  const pathname = usePathname();
  const { data: session } = useSession();
  const isAdmin = session?.user?.role === 'ADMIN';

  // 点击链接后关闭侧边栏
  const handleLinkClick = () => {
    onClose();
  };

  // 阻止背景滚动
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <>
      {/* 遮罩层 */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden transition-opacity"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* 侧边栏 */}
      <aside
        className={cn(
          "fixed top-0 left-0 h-full w-64 bg-card border-r z-50 transform transition-transform duration-300 ease-in-out lg:hidden",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* 顶部Logo区域 */}
        <div className="flex items-center justify-between p-4 border-b">
          <div className="font-bold text-xl text-primary">
            心晴驿站
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-primary/10 rounded-lg transition-colors"
            aria-label="关闭菜单"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* 导航菜单 */}
        <nav className="flex flex-col gap-1 p-4 overflow-y-auto h-[calc(100vh-73px)]">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={handleLinkClick}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-3 text-muted-foreground transition-all hover:text-primary hover:bg-primary/10",
                pathname === item.href && "text-primary bg-primary/10 font-medium"
              )}
            >
              <item.icon className="h-5 w-5 flex-shrink-0" />
              <span className="text-sm">{item.label}</span>
            </Link>
          ))}

          {/* 管理员专用菜单 */}
          {isAdmin && (
            <>
              <hr className="my-4 border-border" />
              <div className="px-3 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                管理员功能
              </div>
              {adminNavItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={handleLinkClick}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-3 text-muted-foreground transition-all hover:text-primary hover:bg-primary/10",
                    pathname === item.href && "text-primary bg-primary/10 font-medium"
                  )}
                >
                  <item.icon className="h-5 w-5 flex-shrink-0" />
                  <span className="text-sm">{item.label}</span>
                </Link>
              ))}
            </>
          )}
        </nav>
      </aside>
    </>
  );
}
