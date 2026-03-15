"use client";

import { ArrowLeft, type LucideIcon } from "lucide-react";

interface GameModalProps {
  title: string;
  gradient: string;
  icon: LucideIcon;
  onClose: () => void;
  children: React.ReactNode;
}

export default function GameModal({ title, gradient, icon: Icon, onClose, children }: GameModalProps) {
  return (
    <div className="space-y-5">
      {/* 头部导航 */}
      <div className="modern-card overflow-hidden">
        <div className="px-5 py-3.5 flex items-center gap-3">
          <button
            onClick={onClose}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors text-sm"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="font-medium">返回</span>
          </button>
          <div className="h-5 w-px bg-border" />
          <div className="flex items-center gap-2.5">
            <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${gradient} flex items-center justify-center text-white shadow-sm`}>
              <Icon className="h-4 w-4" />
            </div>
            <h2 className="text-lg font-bold">{title}</h2>
          </div>
        </div>
      </div>

      {/* 游戏内容 */}
      <div className="modern-card p-6 md:p-8">
        {children}
      </div>
    </div>
  );
}
