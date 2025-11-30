"use client";

import { useState } from "react";
import { Clock, Users, CheckCircle, Star } from "lucide-react";

interface AssessmentCardProps {
  assessment: {
    id: string;
    title: string;
    description: string;
    icon: string;
    duration: string;
    questions: number;
    participants: number;
    difficulty: string; // 改为 string 类型，更灵活
    category: string;
    tags: string[];
    completed?: boolean; // 添加可选的 completed 属性
  };
  onStartTest: () => void;
  isCompleted?: boolean;
}

export default function AssessmentCard({ assessment, onStartTest, isCompleted = false }: AssessmentCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy": return "text-green-600 bg-green-50";
      case "medium": return "text-yellow-600 bg-yellow-50";
      case "hard": return "text-red-600 bg-red-50";
      default: return "text-gray-600 bg-gray-50";
    }
  };

  const getDifficultyText = (difficulty: string) => {
    switch (difficulty) {
      case "easy": return "简单";
      case "medium": return "中等";
      case "hard": return "困难";
      default: return "未知";
    }
  };

  return (
    <div
      className={`relative group bg-white rounded-2xl border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-blue-100/50 hover:-translate-y-2 ${
        isCompleted ? "ring-2 ring-green-200" : ""
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 完成标识 */}
      {isCompleted && (
        <div className="absolute top-4 right-4 z-10">
          <div className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-medium shadow-lg flex items-center gap-1">
            <CheckCircle className="w-3 h-3" />
            已完成
          </div>
        </div>
      )}

      {/* 卡片内容 */}
      <div className="p-6">
        {/* 头部图标区 */}
        <div className="flex items-start justify-between mb-4">
          <div className="relative">
            <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center text-3xl transition-all duration-300 ${
              isHovered ? "scale-110 shadow-lg" : ""
            }`}>
              {assessment.icon}
            </div>
            {/* 闪烁星星效果 */}
            {isHovered && (
              <div className="absolute -top-1 -right-1">
                <Star className="w-4 h-4 text-yellow-400 animate-pulse" />
              </div>
            )}
          </div>
          
          {/* 难度标识 */}
          <div className={`px-2 py-1 rounded-lg text-xs font-medium ${getDifficultyColor(assessment.difficulty)}`}>
            {getDifficultyText(assessment.difficulty)}
          </div>
        </div>

        {/* 标题和描述 */}
        <div className="mb-4">
          <h3 className="text-lg font-bold text-gray-800 mb-2 leading-tight">
            {assessment.title}
          </h3>
          <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
            {assessment.description}
          </p>
        </div>

        {/* 标签 */}
        {assessment.tags && assessment.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-4">
            {assessment.tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-blue-50 text-blue-600 rounded-lg text-xs font-medium"
              >
                #{tag}
              </span>
            ))}
            {assessment.tags.length > 3 && (
              <span className="px-2 py-1 bg-gray-50 text-gray-500 rounded-lg text-xs">
                +{assessment.tags.length - 3}
              </span>
            )}
          </div>
        )}

        {/* 统计信息 */}
        <div className="flex items-center gap-4 mb-6 text-xs text-gray-500">
          <div className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {assessment.duration}
          </div>
          <div className="flex items-center gap-1">
            📊 {assessment.questions}题
          </div>
          <div className="flex items-center gap-1">
            <Users className="w-3 h-3" />
            {assessment.participants}+
          </div>
        </div>

        {/* 操作按钮 */}
        <div className="flex gap-2">
          <button
            onClick={onStartTest}
            className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all duration-200 ${
              isCompleted
                ? "bg-green-500 hover:bg-green-600 text-white"
                : "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white"
            } transform hover:scale-105 shadow-lg hover:shadow-xl`}
          >
            {isCompleted ? "查看报告" : "开始测试"}
          </button>
        </div>
      </div>

      {/* 悬停效果光晕 */}
      {isHovered && (
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-blue-500/5 pointer-events-none rounded-2xl"></div>
      )}
    </div>
  );
}