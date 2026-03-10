"use client";

import { useState } from "react";
import { Clock, Users, CheckCircle, Star, ArrowRight, BrainCircuit } from "lucide-react";

interface AssessmentCardProps {
  assessment: {
    id: string;
    title: string;
    description: string;
    icon: string;
    duration: string;
    questions: number;
    participants: number;
    difficulty: string; 
    category: string;
    tags: string[];
    completed?: boolean; 
  };
  onStartTest: () => void;
  isCompleted?: boolean;
}

export default function AssessmentCard({ assessment, onStartTest, isCompleted = false }: AssessmentCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const getDifficultyStyles = (difficulty: string) => {
    switch (difficulty) {
      case "easy": return "text-emerald-600 bg-emerald-50 border-emerald-100 dark:text-emerald-400 dark:bg-emerald-500/10 dark:border-emerald-500/20";
      case "medium": return "text-amber-600 bg-amber-50 border-amber-100 dark:text-amber-400 dark:bg-amber-500/10 dark:border-amber-500/20";
      case "hard": return "text-rose-600 bg-rose-50 border-rose-100 dark:text-rose-400 dark:bg-rose-500/10 dark:border-rose-500/20";
      default: return "text-slate-600 bg-slate-50 border-slate-100 dark:text-slate-400 dark:bg-slate-500/10 dark:border-slate-500/20";
    }
  };

  const getDifficultyText = (difficulty: string) => {
    switch (difficulty) {
      case "easy": return "入门";
      case "medium": return "进阶";
      case "hard": return "深度";
      default: return "未知";
    }
  };

  return (
    <div
      className={`group relative flex flex-col bg-white dark:bg-slate-800 rounded-3xl border transition-all duration-500 overflow-hidden
        ${isCompleted ? "border-indigo-200 dark:border-indigo-500/30" : "border-slate-200/60 dark:border-slate-700/50"}
        hover:shadow-xl hover:shadow-indigo-500/10 dark:hover:shadow-indigo-500/5 hover:-translate-y-1`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background Gradients & Effects */}
      <div className={`absolute inset-0 bg-gradient-to-br from-indigo-50/50 via-transparent to-purple-50/50 dark:from-indigo-900/20 dark:to-purple-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}></div>
      {isCompleted && (
        <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-50 dark:bg-indigo-500/10 rounded-bl-full -z-0 opacity-50 blur-xl"></div>
      )}

      {/* Card Content Top Container */}
      <div className="flex-1 p-5 md:p-6 relative z-10">
        <div className="flex items-start justify-between mb-4">
          <div className="relative">
            <div className={`flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/40 dark:to-purple-900/40 text-2xl shadow-sm border border-indigo-100/50 dark:border-indigo-500/20 transition-all duration-500 ${
              isHovered ? "scale-110 shadow-indigo-200 dark:shadow-indigo-900 rotate-6" : ""
            }`}>
              <span className="drop-shadow-sm">{assessment.icon}</span>
            </div>
          </div>

          <div className="flex flex-col items-end gap-1.5">
             <div className={`px-3 py-1 rounded-full text-xs font-bold tracking-wider border uppercase ${getDifficultyStyles(assessment.difficulty)}`}>
               {getDifficultyText(assessment.difficulty)}
             </div>
             {isCompleted && (
                <div className="flex items-center gap-1 text-xs font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-500/10 px-2 py-1 rounded-md">
                  <CheckCircle className="w-3 h-3" />
                  已完成
                </div>
             )}
          </div>
        </div>

        <h3 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white mb-2 leading-snug group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
          {assessment.title}
        </h3>
        
        <p className="text-slate-500 dark:text-slate-400 text-xs md:text-sm leading-relaxed line-clamp-2 md:line-clamp-3 mb-4">
          {assessment.description}
        </p>

        {assessment.tags && assessment.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-1">
            {assessment.tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="px-2 py-0.5 bg-slate-100 dark:bg-slate-700/50 text-slate-600 dark:text-slate-300 rounded-md text-[10px] font-semibold tracking-wide border border-transparent group-hover:border-slate-200 dark:group-hover:border-slate-600 transition-colors"
              >
                {tag}
              </span>
            ))}
            {assessment.tags.length > 3 && (
              <span className="px-2 py-0.5 bg-slate-50 dark:bg-slate-800 text-slate-400 rounded-md text-[10px] font-semibold border border-dashed border-slate-200 dark:border-slate-700">
                +{assessment.tags.length - 3}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Card Footer / Action Area */}
      <div className="px-5 md:px-6 py-3.5 border-t border-slate-100 dark:border-slate-700/50 bg-slate-50/50 dark:bg-slate-800/30 flex items-center justify-between relative z-10 transition-colors group-hover:bg-slate-50 dark:group-hover:bg-slate-800/80">
        <div className="flex items-center gap-3 text-xs md:text-[13px] font-medium text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-1" title="预计用时">
            <Clock className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" />
            {assessment.duration}
          </div>
          <div className="flex items-center gap-1" title="题目数量">
            <BrainCircuit className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" />
            {assessment.questions} 题
          </div>
        </div>

        <button
          onClick={onStartTest}
          className={`relative overflow-hidden inline-flex items-center justify-center h-8 md:h-9 px-4 rounded-lg font-bold text-xs md:text-sm transition-all duration-300 ${
            isCompleted
              ? "bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-500/30 hover:bg-indigo-50 dark:hover:bg-indigo-500/10"
              : "bg-slate-900 text-white dark:bg-white dark:text-slate-900 group-hover:bg-indigo-600 dark:group-hover:bg-indigo-50"
          }`}
        >
          <span className="relative z-10 flex items-center gap-1">
            {isCompleted ? "重新测试" : "开始测试"}
            <ArrowRight className={`w-4 h-4 transition-transform duration-300 ${isHovered ? "translate-x-0.5" : ""}`} />
          </span>
        </button>
      </div>
    </div>
  );
}
