"use client";

interface AvatarProps {
  username?: string;
  avatar?: string | null;
  size?: "small" | "medium" | "large";
  className?: string;
}

export default function Avatar({ username, avatar, size = "medium", className = "" }: AvatarProps) {
  const firstLetter = username?.charAt(0).toUpperCase() || "U";
  
  // 根据用户名生成颜色
  const colors = [
    "bg-blue-500", "bg-green-500", "bg-purple-500", "bg-pink-500", 
    "bg-indigo-500", "bg-yellow-500", "bg-red-500", "bg-teal-500"
  ];
  const colorIndex = username ? username.charCodeAt(0) % colors.length : 0;
  
  const sizeClasses = {
    small: "w-8 h-8 text-sm",
    medium: "w-10 h-10 text-base", 
    large: "w-16 h-16 text-xl"
  };

  // 暂时不渲染URL头像，始终显示默认字母头像
  // if (avatar) {
  //   return (
  //     <img
  //       src={avatar}
  //       alt={`${username}'s avatar`}
  //       className={`${sizeClasses[size]} rounded-full object-cover ${className}`}
  //     />
  //   );
  // }

  return (
    <div className={`${sizeClasses[size]} ${colors[colorIndex]} rounded-full flex items-center justify-center text-white font-semibold ${className}`}>
      {firstLetter}
    </div>
  );
}