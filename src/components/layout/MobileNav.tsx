"use client";

import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Bot,
  HeartPulse,
  Book,
  MessageSquare,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const mobileNavItems = [
  { href: "/dashboard", icon: LayoutDashboard, label: "主页" },
  { href: "/dashboard/emotions", icon: HeartPulse, label: "情绪" },
  { href: "/dashboard/chat", icon: Bot, label: "AI" },
  { href: "/dashboard/journal", icon: Book, label: "日记" },
  { href: "/dashboard/square", icon: MessageSquare, label: "广场" },
];

export default function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-card/95 border-t border-border/50 backdrop-blur-lg safe-area-bottom">
      <div className="flex items-center justify-around px-2 py-2 max-w-screen-xl mx-auto">
        {mobileNavItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center gap-1 px-3 py-2 rounded-xl transition-all duration-200 min-w-[60px]",
                isActive
                  ? "text-primary bg-primary/10"
                  : "text-muted-foreground hover:text-primary hover:bg-primary/5"
              )}
            >
              <item.icon 
                className={cn(
                  "h-5 w-5 transition-transform",
                  isActive && "scale-110"
                )} 
              />
              <span className={cn(
                "text-xs font-medium",
                isActive && "font-semibold"
              )}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
