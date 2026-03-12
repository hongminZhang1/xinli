import React from "react";
import Card from "@/components/ui/Card";
import { ArrowLeft } from "lucide-react";

export default function JournalDetailLoading() {
  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8 animate-pulse">
      {/* 返回按钮占位 */}
      <button className="flex items-center text-gray-500 mb-6" disabled>
        <ArrowLeft className="w-4 h-4 mr-2" />
        <span>返回</span>
      </button>

      <Card className="overflow-hidden">
        {/* 顶部标题与用户信息区域骨架 */}
        <div className="border-b border-gray-100 dark:border-gray-800 p-6 md:p-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-4 flex-1">
              {/* 标题 */}
              <div className="h-8 w-3/4 md:w-1/2 bg-gray-200 dark:bg-gray-700 rounded-md"></div>
              
              {/* 用户信息与时间 */}
              <div className="flex items-center text-sm gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                  <div className="h-4 w-20 bg-gray-200 dark:bg-gray-700 rounded-md"></div>
                </div>
                <div className="h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded-md"></div>
              </div>
            </div>
            
            {/* 心情状态占位 */}
            <div className="h-8 w-24 bg-gray-100 dark:bg-gray-800 rounded-full"></div>
          </div>
        </div>

        {/* 标签占位 */}
        <div className="px-6 md:px-8 py-4 bg-gray-50 dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800">
          <div className="flex flex-wrap gap-2">
            <div className="h-6 w-16 bg-gray-200 dark:bg-gray-700 rounded-md"></div>
            <div className="h-6 w-20 bg-gray-200 dark:bg-gray-700 rounded-md"></div>
          </div>
        </div>

        {/* 正文内容区域骨架 */}
        <div className="p-6 md:p-8 space-y-4">
          <div className="h-4 w-full bg-gray-100 dark:bg-gray-800 rounded-md"></div>
          <div className="h-4 w-full bg-gray-100 dark:bg-gray-800 rounded-md"></div>
          <div className="h-4 w-11/12 bg-gray-100 dark:bg-gray-800 rounded-md"></div>
          <div className="h-4 w-full bg-gray-100 dark:bg-gray-800 rounded-md"></div>
          <div className="h-4 w-3/4 bg-gray-100 dark:bg-gray-800 rounded-md"></div>
          <div className="h-32 w-full bg-gray-100 dark:bg-gray-800 rounded-md mt-6"></div>
          <div className="h-4 w-5/6 bg-gray-100 dark:bg-gray-800 rounded-md"></div>
          <div className="h-4 w-full bg-gray-100 dark:bg-gray-800 rounded-md"></div>
        </div>
      </Card>

      {/* 评论区骨架占位 */}
      <div className="mt-8 space-y-6">
        <div className="h-6 w-32 bg-gray-200 dark:bg-gray-700 rounded-md mb-4"></div>
        
        {/* 输入框骨架 */}
        <Card className="p-4">
          <div className="h-24 w-full bg-gray-100 dark:bg-gray-800 rounded-md border border-gray-200 dark:border-gray-700 mb-4"></div>
          <div className="flex justify-end">
            <div className="h-10 w-24 bg-blue-100 dark:bg-blue-900/40 rounded-md"></div>
          </div>
        </Card>

        {/* 评论列表骨架 */}
        <div className="space-y-4">
          {[1, 2].map((i) => (
            <Card key={i} className="p-4">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                </div>
                <div className="flex-1 space-y-3">
                  <div className="flex justify-between">
                    <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded-md"></div>
                    <div className="h-3 w-32 bg-gray-100 dark:bg-gray-800 rounded-md"></div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-4 w-full bg-gray-100 dark:bg-gray-800 rounded-md"></div>
                    <div className="h-4 w-3/4 bg-gray-100 dark:bg-gray-800 rounded-md"></div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}