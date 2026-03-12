import React from "react";
import Card from "@/components/ui/Card";

export default function JournalLoading() {
  return (
    <div className="w-full space-y-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* 顶部骨架：标题与新增按钮占位 */}
      <div className="flex justify-between items-center mb-6">
        <div className="h-8 w-32 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse"></div>
        <div className="h-10 w-28 bg-blue-100 dark:bg-blue-900/40 rounded-md animate-pulse"></div>
      </div>

      {/* 搜索/过滤栏骨架 */}
      <Card className="p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 h-10 bg-gray-100 dark:bg-gray-800 rounded-md animate-pulse"></div>
          <div className="w-40 h-10 bg-gray-100 dark:bg-gray-800 rounded-md animate-pulse"></div>
        </div>
      </Card>

      {/* 列表骨架 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <Card key={i} className="flex flex-col h-full overflow-hidden animate-pulse">
            <div className="p-5 flex-1 space-y-4">
              {/* 卡片顶部：时间和状态 */}
              <div className="flex justify-between items-center">
                <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded"></div>
                <div className="h-5 w-16 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
              </div>

              {/* 标题 */}
              <div className="h-6 w-3/4 bg-gray-200 dark:bg-gray-700 rounded"></div>

              {/* 内容摘要（2行） */}
              <div className="space-y-2">
                <div className="h-4 w-full bg-gray-100 dark:bg-gray-800 rounded"></div>
                <div className="h-4 w-5/6 bg-gray-100 dark:bg-gray-800 rounded"></div>
              </div>

              {/* 标签 */}
              <div className="flex gap-2 pt-2">
                <div className="h-6 w-12 bg-gray-100 dark:bg-gray-800 rounded-full"></div>
                <div className="h-6 w-16 bg-gray-100 dark:bg-gray-800 rounded-full"></div>
              </div>
            </div>

            {/* 卡片底部栏 */}
            <div className="px-5 py-3 border-t border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/20 flex justify-between">
              <div className="h-4 w-12 bg-gray-200 dark:bg-gray-700 rounded"></div>
              <div className="flex gap-2">
                <div className="h-6 w-6 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                <div className="h-6 w-6 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}