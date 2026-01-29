"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import AssessmentCard from "@/components/assessment/AssessmentCard";
import TestModal from "@/components/assessment/TestModal";
import { assessmentCategories, allAssessments } from "@/lib/assessment-data";
import { Brain, Sparkles } from "lucide-react";

export default function AssessmentPage() {
  const { data: session } = useSession();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedTest, setSelectedTest] = useState<any>(null);
  const [isTestModalOpen, setIsTestModalOpen] = useState(false);

  const filteredAssessments = selectedCategory === "all" 
    ? allAssessments 
    : allAssessments.filter(assessment => assessment.category === selectedCategory);

  const todayRecommended = allAssessments[0]; // 今日推荐

  const handleStartTest = (assessment: any) => {
    setSelectedTest(assessment);
    setIsTestModalOpen(true);
  };

  const handleCloseTest = () => {
    setIsTestModalOpen(false);
    setSelectedTest(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 今日推荐测试 */}
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-6">
            <Sparkles className="w-5 h-5 text-yellow-500" />
            <h2 className="text-2xl font-bold text-gray-800">今日推荐</h2>
          </div>
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
            <div className="relative bg-white rounded-2xl p-8 shadow-xl">
              <div className="flex flex-col lg:flex-row items-center gap-8">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="text-4xl">{todayRecommended.icon}</div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-800">{todayRecommended.title}</h3>
                      <p className="text-yellow-600 font-medium">⭐ 今日推荐测试</p>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-4 text-lg leading-relaxed">
                    {todayRecommended.description}
                  </p>
                  <div className="flex items-center gap-6 text-sm text-gray-500 mb-6">
                    <span className="flex items-center gap-1">
                      ⏱️ {todayRecommended.duration}
                    </span>
                    <span className="flex items-center gap-1">
                      📊 {todayRecommended.questions} 道题
                    </span>
                    <span className="flex items-center gap-1">
                      👥 {todayRecommended.participants} 人已测试
                    </span>
                  </div>
                  <button
                    onClick={() => handleStartTest(todayRecommended)}
                    className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
                  >
                    开始测试 →
                  </button>
                </div>
                <div className="lg:w-80">
                  <div className="relative">
                    <div className="w-full h-48 bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl flex items-center justify-center">
                      <div className="text-6xl opacity-80">{todayRecommended.icon}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 测试分类导航 */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">测试分类</h2>
          <div className="flex gap-4 overflow-x-auto pb-4">
            <button
              onClick={() => setSelectedCategory("all")}
              className={`px-6 py-3 rounded-xl font-medium transition-all duration-200 whitespace-nowrap ${
                selectedCategory === "all"
                  ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg"
                  : "bg-white text-gray-600 hover:bg-gray-50 border border-gray-200"
              }`}
            >
              🌟 全部测试
            </button>
            {assessmentCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-3 rounded-xl font-medium transition-all duration-200 whitespace-nowrap ${
                  selectedCategory === category.id
                    ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg"
                    : "bg-white text-gray-600 hover:bg-gray-50 border border-gray-200"
                }`}
              >
                {category.icon} {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* 测试列表 */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              {selectedCategory === "all" ? "所有测试" : assessmentCategories.find(c => c.id === selectedCategory)?.name}
            </h2>
            <span className="text-sm text-gray-500">
              共 {filteredAssessments.length} 个测试
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredAssessments.map((assessment) => (
              <AssessmentCard
                key={assessment.id}
                assessment={assessment}
                onStartTest={() => handleStartTest(assessment)}
                isCompleted={assessment.completed}
              />
            ))}
          </div>
        </div>

        {/* 底部提示 */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 max-w-3xl mx-auto border border-blue-100">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              📋 测试说明
            </h3>
            <div className="text-gray-600 space-y-2 text-sm leading-relaxed">
              <p>所有测试基于心理学理论设计，仅供自我了解参考</p>
              <p>如需专业心理咨询，请联系我们的专业心理咨询师</p>
            </div>
          </div>
        </div>
      </div>

      {/* 测试弹窗 */}
      {isTestModalOpen && selectedTest && (
        <TestModal
          test={selectedTest}
          onClose={handleCloseTest}
        />
      )}
    </div>
  );
}