import React from "react";
import { cn } from "@/lib/utils";

type CardProps = {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  glass?: boolean;
  onClick?: () => void;
};

export default function Card({ children, className = "", hover = false, glass = false, onClick }: CardProps) {
  return (
    <div 
      className={cn(
        "modern-card p-6",
        hover && "hover:-translate-y-1 hover:shadow-lg",
        glass && "glass-effect",
        onClick && "cursor-pointer",
        className
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
}

// 导出其他卡片变体
export function CardHeader({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("space-y-2 pb-4 border-b border-border/20", className)}>
      {children}
    </div>
  );
}

export function CardTitle({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <h3 className={cn("font-heading text-lg text-foreground", className)}>
      {children}
    </h3>
  );
}

export function CardDescription({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={cn("text-sm text-muted-foreground", className)}>
      {children}
    </p>
  );
}

export function CardContent({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("pt-4", className)}>
      {children}
    </div>
  );
}

export function CardFooter({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("flex items-center justify-end pt-4 border-t border-border/20", className)}>
      {children}
    </div>
  );
}
