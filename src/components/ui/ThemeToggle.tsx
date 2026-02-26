"use client";

import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // 避免 hydration 不匹配
  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return <button className="p-2 rounded-lg w-9 h-9" aria-label="切换主题" />;
  }

  const isDark = theme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="relative p-2 rounded-lg hover:bg-primary/10 transition-colors text-foreground/70 hover:text-foreground overflow-hidden w-9 h-9 flex items-center justify-center"
      aria-label={isDark ? "切换到白天模式" : "切换到夜晚模式"}
      title={isDark ? "切换到白天模式" : "切换到夜晚模式"}
    >
      <Sun
        className="h-5 w-5 absolute transition-all duration-300"
        style={{
          opacity: isDark ? 1 : 0,
          transform: isDark ? "translateY(0) rotate(0deg)" : "translateY(8px) rotate(90deg)",
        }}
      />
      <Moon
        className="h-5 w-5 absolute transition-all duration-300"
        style={{
          opacity: isDark ? 0 : 1,
          transform: isDark ? "translateY(-8px) rotate(-90deg)" : "translateY(0) rotate(0deg)",
        }}
      />
    </button>
  );
}
