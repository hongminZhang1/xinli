"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import AssessmentCard from "@/components/assessment/AssessmentCard";
import TestModal from "@/components/assessment/TestModal";
import { assessmentCategories, allAssessments } from "@/lib/assessment-data";
import { Brain, Filter, ChevronRight } from "lucide-react";

export default function AssessmentPage() {
  const { data: session } = useSession();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedTest, setSelectedTest] = useState<any>(null);
  const [isTestModalOpen, setIsTestModalOpen] = useState(false);

  const filteredAssessments = selectedCategory === "all" 
    ? allAssessments 
    : allAssessments.filter(assessment => assessment.category === selectedCategory);

  const handleStartTest = (assessment: any) => {
    setSelectedTest(assessment);
    setIsTestModalOpen(true);
  };

  const handleCloseTest = () => {
    setIsTestModalOpen(false);
    setSelectedTest(null);
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] dark:bg-slate-900 pb-20 selection:bg-indigo-500/30">
      {/* Hero Section */}
      <div className="relative overflow-hidden w-full bg-white dark:bg-slate-900 border-b border-gray-100 dark:border-slate-800">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 left-[20%] w-[500px] h-[500px] bg-indigo-500/10 dark:bg-indigo-500/5 rounded-full blur-3xl mix-blend-multiply opacity-70 animate-pulse"></div>
          <div className="absolute top-0 right-[20%] w-[400px] h-[400px] bg-purple-500/10 dark:bg-purple-500/5 rounded-full blur-3xl mix-blend-multiply opacity-70 animate-pulse animation-delay-2000"></div>
          <div className="absolute -bottom-32 left-[40%] w-[600px] h-[600px] bg-pink-500/10 dark:bg-pink-500/5 rounded-full blur-3xl mix-blend-multiply opacity-70 animate-pulse animation-delay-4000"></div>
          <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] dark:[mask-image:linear-gradient(180deg,black,transparent)] opacity-20"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-10">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4 flex items-center justify-center gap-3">
              发现真实的
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                内心宇宙
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 text-sm font-semibold rounded-full bg-gradient-to-r from-blue-500/10 to-indigo-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20 shadow-sm align-middle ml-2">
                <Brain className="w-4 h-4" />
                DeepSeek AI
              </span>
            </h1>
            <p className="text-base text-slate-600 dark:text-slate-400 mb-0">
              结合科学的心理学量表与前沿 <strong className="text-slate-800 dark:text-slate-200 font-semibold">DeepSeek AI 深度分析架构</strong>，为您生成个性化、多维度的专业洞察报告
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Category Navigation */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-center gap-8 mb-12">
          <div className="flex p-1.5 bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80 rounded-2xl shadow-sm overflow-x-auto hide-scrollbar w-full lg:w-auto">
            <button
              onClick={() => setSelectedCategory("all")}
              className={`flex-shrink-0 flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-300 ${
                selectedCategory === "all"
                  ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-md"
                  : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-700/50"
              }`}
            >
              <Filter className="w-4 h-4" />
              <span>全部 ({allAssessments.length})</span>
            </button>
            {assessmentCategories.map((category) => {
              const categoryCount = allAssessments.filter(a => a.category === category.id).length;
              return (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex-shrink-0 flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-300 ${
                  selectedCategory === category.id
                    ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-md"
                    : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-700/50"
                }`}
              >
                <span className="text-lg">{category.icon}</span>
                <span>{category.name} ({categoryCount})</span>
              </button>
            )})}
          </div>
        </div>

        {/* Assessment Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredAssessments.map((assessment) => (
            <AssessmentCard
              key={assessment.id}
              assessment={assessment}
              onStartTest={() => handleStartTest(assessment)}
              isCompleted={assessment.completed}
            />
          ))}
        </div>

        {filteredAssessments.length === 0 && (
          <div className="py-24 text-center bg-white dark:bg-slate-800 rounded-[2rem] border border-slate-100 dark:border-slate-700/50 mt-8 shadow-sm">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-slate-50 dark:bg-slate-900/50 mb-6 border border-slate-100 dark:border-slate-800">
              <Brain className="w-10 h-10 text-slate-400" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">暂无相关评测</h3>
            <p className="text-slate-500 dark:text-slate-400">目前该分类下还没有添加测试量表</p>
          </div>
        )}

        {/* Footer Disclaimer */}
        <div className="mt-16 text-center text-slate-400 dark:text-slate-500 text-sm">
          <p className="font-bold">
            心理测评说明：我们的量表基于前沿心理学理论和大量实证研究构建，为您提供深度自我洞察与成长参考。不能代替专业心理诊断与医疗建议。
          </p>
        </div>
      </div>

      {isTestModalOpen && selectedTest && (
        <TestModal
          test={selectedTest}
          onClose={handleCloseTest}
        />
      )}
    </div>
  );
}
