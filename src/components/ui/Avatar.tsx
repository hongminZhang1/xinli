"use client";

import { cn } from "@/lib/utils";

interface AvatarProps {
  username?: string;
  avatar?: string | null;
  size?: "small" | "medium" | "large" | "xl";
  className?: string;
  showStatus?: boolean;
  isOnline?: boolean;
}

export default function Avatar({ 
  username, 
  avatar, 
  size = "medium", 
  className = "", 
  showStatus = false,
  isOnline = false 
}: AvatarProps) {
  const firstLetter = username?.charAt(0).toUpperCase() || "U";
  
  // 使用新色彩系统生成头像颜色
  const colors = [
    "bg-gradient-to-br from-blue-500 to-blue-600", 
    "bg-gradient-to-br from-green-500 to-green-600", 
    "bg-gradient-to-br from-orange-500 to-orange-600", 
    "bg-gradient-to-br from-purple-500 to-purple-600", 
    "bg-gradient-to-br from-pink-500 to-pink-600",
    "bg-gradient-to-br from-indigo-500 to-indigo-600",
    "bg-gradient-to-br from-red-500 to-red-600",
    "bg-gradient-to-br from-teal-500 to-teal-600"
  ];
  const colorIndex = username ? username.charCodeAt(0) % colors.length : 0;
  
  const sizeClasses = {
    small: "w-8 h-8 text-xs",
    medium: "w-10 h-10 text-sm", 
    large: "w-16 h-16 text-lg",
    xl: "w-24 h-24 text-2xl"
  };

  const statusSize = {
    small: "w-2.5 h-2.5",
    medium: "w-3 h-3",
    large: "w-4 h-4", 
    xl: "w-5 h-5"
  };

  // 暂时不渲染URL头像，始终显示默认字母头像
  // if (avatar) {
  //   return (
  //     <div className="relative inline-block">
  //       <img
  //         src={avatar}
  //         alt={`${username}'s avatar`}
  //         className={cn(
  //           sizeClasses[size], 
  //           "rounded-full object-cover shadow-sm border-2 border-card",
  //           className
  //         )}
  //       />
  //       {showStatus && (
  //         <div className={cn(
  //           statusSize[size],
  //           "absolute -bottom-0.5 -right-0.5 rounded-full border-2 border-card shadow-sm",
  //           isOnline ? "bg-success" : "bg-muted"
  //         )}>
  //           {isOnline && <div className="w-full h-full bg-white rounded-full scale-50 animate-pulse" />}
  //         </div>
  //       )}
  //     </div>
  //   );
  // }

  return (
    <div className="relative inline-block">
      <div className={cn(
        sizeClasses[size],
        colors[colorIndex],
        "rounded-full flex items-center justify-center text-white font-heading font-semibold shadow-lg border border-white/20 backdrop-blur-sm",
        className
      )}>
        {firstLetter}
      </div>
      
      {showStatus && (
        <div className={cn(
          statusSize[size],
          "absolute -bottom-0.5 -right-0.5 rounded-full border-2 border-card shadow-lg",
          isOnline ? "bg-success" : "bg-muted"
        )}>
          {isOnline && <div className="w-full h-full bg-white rounded-full scale-50 animate-pulse" />}
        </div>
      )}
    </div>
  );
}