"use client";

import { useState, useEffect } from "react";
import { X, ArrowLeft, ArrowRight, CheckCircle, Clock, Target, Sparkles } from "lucide-react";
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
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 使用MBTI题目作为示例，限制题目数量用于演示
  const questions = mbtiQuestions.slice(0, Math.min(test.questions, mbtiQuestions.length));
  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const answeredCount = Object.keys(answers).length;

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
      setIsSubmitting(true);
      setTimeout(() => {
        setIsSubmitting(false);
        setShowResult(true);
      }, 1500);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const handleSubmit = () => {
    // 这里处理提交逻辑，展示友好的完成消息
    alert("🎉 测试完成！结果已保存到您的个人档案中。感谢您的参与，祝您心情愉快！");
    onClose();
  };

  // 加载状态
  if (isSubmitting) {
    return (
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-card/95 backdrop-blur-md rounded-3xl max-w-md w-full p-8 text-center space-y-6 border border-border/20 shadow-xl">
          <div className="relative">
            <div className="w-20 h-20 mx-auto bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center animate-pulse">
              <Sparkles className="w-10 h-10 text-white" />
            </div>
            <div className="absolute inset-0 w-20 h-20 mx-auto border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
          </div>
          <div>
            <h3 className="font-heading text-xl text-foreground mb-2">正在分析你的答案...</h3>
            <p className="text-muted-foreground">AI正在为你生成专属的心理分析报告</p>
          </div>
        </div>
      </div>
    );
  }

  if (showResult) {
    return (
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-card/95 backdrop-blur-md rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-hidden shadow-xl border border-border/20">
          {/* 结果页面头部 */}
          <div className="relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/5 to-success/10"></div>
            <div className="relative p-8 text-center">
              <div className="mb-6">
                <div className="relative inline-block">
                  <div className="w-24 h-24 bg-gradient-to-br from-success to-success/80 rounded-full flex items-center justify-center text-white text-3xl mx-auto mb-4 shadow-lg">
                    <CheckCircle className="w-12 h-12" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-accent rounded-full flex items-center justify-center animate-bounce">
                    <Sparkles className="w-4 h-4 text-white" />
                  </div>
                </div>
                <h2 className="font-display text-3xl text-foreground mb-3">测试完成！</h2>
                <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-primary" />
                    <span>用时 {formatTime(timeElapsed)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Target className="w-4 h-4 text-success" />
                    <span>完成度 100%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 结果内容 */}
          <div className="p-8 space-y-6">
            <div className="modern-card p-6 space-y-4">
              <div className="text-center">
                <h3 className="font-heading text-xl text-foreground mb-3">
                  {test.title} - 专业分析报告
                </h3>
                <div className="text-6xl mb-4 animate-float">{test.icon}</div>
                <p className="text-muted-foreground leading-relaxed">
                  感谢您完成心理测评！我们的AI系统已经分析了您的答案，
                  生成了专属的个性化报告。报告包含您的性格特质分析、优势发现、
                  成长建议以及个性化的心理健康维护方案。
                </p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-4 modern-card">
                <div className="font-display text-2xl text-primary mb-1">{questions.length}</div>
                <div className="text-sm text-muted-foreground">题目总数</div>
              </div>
              <div className="text-center p-4 modern-card">
                <div className="font-display text-2xl text-success mb-1">{answeredCount}</div>
                <div className="text-sm text-muted-foreground">已完成</div>
              </div>
              <div className="text-center p-4 modern-card">
                <div className="font-display text-2xl text-accent mb-1">A+</div>
                <div className="text-sm text-muted-foreground">准确度</div>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="flex-1 btn-secondary"
              >
                稍后查看
              </button>
              <button
                onClick={handleSubmit}
                className="flex-1 btn-primary"
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
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-card/95 backdrop-blur-md rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-xl border border-border/20">
        
        {/* 顶部头部 */}
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 sky-gradient-dynamic"></div>
          <div className="relative p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <div className="text-3xl animate-float">{test.icon}</div>
                <div>
                  <h2 className="font-heading text-xl text-foreground">{test.title}</h2>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>预计 {test.duration}</span>
                    <span>•</span>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>用时 {formatTime(timeElapsed)}</span>
                    </div>
                  </div>
                </div>
              </div>
              <button
                onClick={onClose}
                className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-white/20 transition-colors text-muted-foreground hover:text-foreground"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            {/* 进度条 */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>答题进度</span>
                <span>{currentQuestion + 1} / {questions.length}</span>
              </div>
              <div className="relative">
                <div className="w-full bg-white/20 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-primary to-accent rounded-full h-2 transition-all duration-500 ease-out"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <div 
                  className="absolute top-0 w-3 h-2 bg-white rounded-full shadow-sm transition-all duration-500 ease-out"
                  style={{ left: `calc(${progress}% - 6px)` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* 问题内容 */}
        <div className="p-8 space-y-8">
          <div>
            <div className="flex items-center gap-3 text-sm text-muted-foreground mb-4">
              <span className="px-3 py-1 bg-primary/10 text-primary rounded-full font-medium">
                第 {currentQuestion + 1} 题
              </span>
              <div className="flex-1 h-px bg-border"></div>
            </div>
            <h3 className="font-heading text-2xl text-foreground mb-8 leading-relaxed">
              {questions[currentQuestion]?.text}
            </h3>
          </div>

          <div className="space-y-4">
            {questions[currentQuestion]?.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(option.value)}
                className={`w-full p-6 text-left rounded-2xl transition-all duration-300 border-2 group ${
                  answers[currentQuestion] === option.value
                    ? "border-primary/50 bg-primary/5 shadow-lg"
                    : "border-border/40 bg-card/50 hover:border-border hover:bg-card/80 hover:shadow-md"
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`relative w-5 h-5 rounded-full border-2 transition-all ${
                    answers[currentQuestion] === option.value
                      ? "border-primary bg-primary"
                      : "border-muted group-hover:border-primary/50"
                  }`}>
                    {answers[currentQuestion] === option.value && (
                      <div className="absolute inset-1 bg-white rounded-full scale-110 animate-ping"></div>
                    )}
                    {answers[currentQuestion] === option.value && (
                      <div className="absolute inset-1 bg-white rounded-full"></div>
                    )}
                  </div>
                  <div className="text-lg text-foreground group-hover:text-primary transition-colors">
                    {option.text}
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* 底部按钮区域 */}
          <div className="flex justify-between items-center pt-6 border-t border-border/20">
            <button
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
              className="btn-secondary flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ArrowLeft className="w-4 h-4" />
              上一题
            </button>

            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span className="px-3 py-1 bg-success/10 text-success rounded-full">
                {answeredCount} / {questions.length} 已回答
              </span>
            </div>

            <button
              onClick={handleNext}
              disabled={!answers[currentQuestion]}
              className="btn-primary flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
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