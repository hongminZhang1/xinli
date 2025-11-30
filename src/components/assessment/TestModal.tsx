"use client";

import { useState, useEffect } from "react";
import { X, ArrowLeft, ArrowRight, CheckCircle } from "lucide-react";
import { mbtiQuestions } from "@/lib/assessment-data";

interface TestModalProps {
  test: {
    id: string;
    title: string;
    description: string;
    icon: string;
    questions: number;
    duration: string;
  };
  onClose: () => void;
}

export default function TestModal({ test, onClose }: TestModalProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [showResult, setShowResult] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);

  // 使用MBTI题目作为示例，限制题目数量用于演示
  const questions = mbtiQuestions.slice(0, Math.min(test.questions, mbtiQuestions.length));
  const progress = (currentQuestion / questions.length) * 100;

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeElapsed(prev => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAnswer = (value: string) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestion]: value
    }));
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      // 完成测试
      setShowResult(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const handleSubmit = () => {
    // 这里处理提交逻辑
    alert("测试完成！结果已保存。");
    onClose();
  };

  if (showResult) {
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
          {/* 结果页面 */}
          <div className="p-8 text-center">
            <div className="mb-6">
              <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center text-white text-3xl mx-auto mb-4">
                <CheckCircle className="w-10 h-10" />
              </div>
              <h2 className="text-3xl font-bold text-gray-800 mb-2">测试完成！</h2>
              <p className="text-gray-600">
                用时 {formatTime(timeElapsed)} | 完成度 100%
              </p>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-6 mb-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                {test.title} - 结果摘要
              </h3>
              <div className="text-6xl mb-4">{test.icon}</div>
              <p className="text-gray-600 leading-relaxed">
                感谢您完成测试！我们正在分析您的答案，详细报告将在几分钟后生成。
                报告将包含您的性格特质、优势分析、发展建议等内容。
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
              <div className="bg-white border border-gray-200 rounded-xl p-4">
                <div className="text-2xl font-bold text-blue-600">{questions.length}</div>
                <div className="text-gray-600">题目总数</div>
              </div>
              <div className="bg-white border border-gray-200 rounded-xl p-4">
                <div className="text-2xl font-bold text-green-600">{Object.keys(answers).length}</div>
                <div className="text-gray-600">已回答</div>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="flex-1 py-3 px-6 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-colors"
              >
                稍后查看
              </button>
              <button
                onClick={handleSubmit}
                className="flex-1 py-3 px-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-purple-700 transition-all"
              >
                查看详细报告
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
        {/* 顶部头部 */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="text-3xl">{test.icon}</div>
              <div>
                <h2 className="text-xl font-bold">{test.title}</h2>
                <p className="text-blue-100 text-sm">
                  预计用时 {test.duration} | 用时 {formatTime(timeElapsed)}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-xl transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          
          {/* 进度条 */}
          <div className="mt-4">
            <div className="flex justify-between text-sm text-blue-100 mb-2">
              <span>进度</span>
              <span>{currentQuestion + 1} / {questions.length}</span>
            </div>
            <div className="w-full bg-blue-400/30 rounded-full h-2">
              <div
                className="bg-white rounded-full h-2 transition-all duration-300 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>

        {/* 问题内容 */}
        <div className="p-8">
          <div className="mb-8">
            <div className="text-sm text-gray-500 mb-2">
              第 {currentQuestion + 1} 题
            </div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-6 leading-relaxed">
              {questions[currentQuestion]?.text}
            </h3>
          </div>

          <div className="space-y-4 mb-8">
            {questions[currentQuestion]?.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(option.value)}
                className={`w-full p-6 text-left border-2 rounded-2xl transition-all duration-200 hover:shadow-lg ${
                  answers[currentQuestion] === option.value
                    ? "border-blue-500 bg-blue-50 shadow-lg ring-2 ring-blue-200"
                    : "border-gray-200 bg-white hover:border-gray-300"
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-6 h-6 rounded-full border-2 transition-colors ${
                    answers[currentQuestion] === option.value
                      ? "border-blue-500 bg-blue-500"
                      : "border-gray-300"
                  }`}>
                    {answers[currentQuestion] === option.value && (
                      <div className="w-full h-full rounded-full bg-white scale-50"></div>
                    )}
                  </div>
                  <div className="text-lg text-gray-700">
                    {option.text}
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* 底部按钮 */}
          <div className="flex justify-between items-center">
            <button
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
              className="flex items-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-200 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              上一题
            </button>

            <div className="flex items-center gap-4 text-sm text-gray-500">
              <span>
                {Object.keys(answers).length} / {questions.length} 已回答
              </span>
            </div>

            <button
              onClick={handleNext}
              disabled={!answers[currentQuestion]}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:from-blue-600 hover:to-purple-700 transition-all"
            >
              {currentQuestion === questions.length - 1 ? "完成测试" : "下一题"}
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}