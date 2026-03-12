import React from "react";
import Card from "@/components/ui/Card";

export default function SquareLoading() {
  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
      {/* 顶部标题与描述骨架 */}
      <div className="mb-8">
        <div className="h-8 w-40 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse mb-2"></div>
        <div className="h-4 w-72 bg-gray-100 dark:bg-gray-800 rounded-md animate-pulse"></div>
      </div>

      {/* 核心统计/过滤栏骨架 */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-6">
        <div className="w-full md:w-auto flex gap-2">
          {/* 四个时间过滤器占位 */}
          <div className="h-10 w-20 bg-gray-100 dark:bg-gray-800 rounded-md animate-pulse"></div>
          <div className="h-10 w-20 bg-gray-100 dark:bg-gray-800 rounded-md animate-pulse"></div>
          <div className="h-10 w-20 bg-gray-100 dark:bg-gray-800 rounded-md animate-pulse"></div>
          <div className="h-10 w-20 bg-gray-100 dark:bg-gray-800 rounded-md animate-pulse"></div>
        </div>
        <div className="h-10 w-full md:w-64 bg-gray-100 dark:bg-gray-800 rounded-md animate-pulse"></div>
      </div>

      {/* 瀑布流卡片骨架 */}
      <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <Card key={i} className="break-inside-avoid relative overflow-hidden animate-pulse mb-6">
            <div className="p-6">
              {/* 卡片头部：用户信息 */}
              <div className="flex items-center gap-3 mb-4">
                <div className="h-10 w-10 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                <div className="space-y-2">
                  <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded"></div>
                  <div className="h-3 w-16 bg-gray-100 dark:bg-gray-800 rounded"></div>
                </div>
              </div>

              {/* 文章标题 */}
              <div className="h-6 w-5/6 bg-gray-200 dark:bg-gray-700 rounded mb-3"></div>

              {/* 文章摘要（多行） */}
              <div className="space-y-2 mb-4">
                <div className="h-4 w-full bg-gray-100 dark:bg-gray-800 rounded"></div>
                <div className="h-4 w-11/12 bg-gray-100 dark:bg-gray-800 rounded"></div>
                <div className="h-4 w-4/5 bg-gray-100 dark:bg-gray-800 rounded"></div>
              </div>

              {/* 标签栏 */}
              <div className="flex gap-2 mb-4">
                <div className="h-6 w-14 bg-gray-100 dark:bg-gray-800 rounded-full"></div>
                <div className="h-6 w-16 bg-gray-100 dark:bg-gray-800 rounded-full"></div>
              </div>

              {/* 卡片底部操作栏（点赞、评论） */}
              <div className="flex gap-4 pt-4 border-t border-gray-100 dark:border-gray-800">
                <div className="h-5 w-12 bg-gray-100 dark:bg-gray-800 rounded-md"></div>
                <div className="h-5 w-12 bg-gray-100 dark:bg-gray-800 rounded-md"></div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}