"use client";

import { useState, useEffect, useRef } from "react";
import { X, ArrowLeft, ArrowRight, CheckCircle, Clock, Target, Sparkles, MessageSquare, Send, Brain, Star, BrainCircuit } from "lucide-react";
import { getQuestions } from "@/lib/assessment-data";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

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

// 定义聊天消息类型
type ChatMsg = {
    role: "user" | "assistant" | "system";
    content: string;
};

export default function TestModal({ test, onClose }: TestModalProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [showResult, setShowResult] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // 分析相关
  const [analysisResult, setAnalysisResult] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // 对话相关
  const [chatMessages, setChatMessages] = useState<ChatMsg[]>([]);
  const [chatInput, setChatInput] = useState("");
  const [isChatLoading, setIsChatLoading] = useState(false);
  const [useDeepThought, setUseDeepThought] = useState(false); // 是否使用深度思考
  const chatBottomRef = useRef<HTMLDivElement>(null);

  // 获取对应测试的题目
  const allQuestions = getQuestions(test.id);
  const questions = allQuestions.slice(0, Math.min(test.questions, allQuestions.length));
  
  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const answeredCount = Object.keys(answers).length;

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeElapsed(prev => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // 自动滚动到底部
  useEffect(() => {
    if (showResult && chatMessages.length > 0) {
        chatBottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatMessages, showResult, analysisResult]);

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

    // 延迟一点点时间自动跳到下一题，给用户一个视觉反馈
    setTimeout(() => {
        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(prev => prev + 1);
        } else {
            // 如果是最后一题也可选择自动提交，如果不希望自动提交可以去掉这行
            // handleSubmit();
        }
    }, 300);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      handleSubmit();
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
        setCurrentQuestion(prev => prev - 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setIsAnalyzing(true);
    
    // 构建初始上下文
    let assessmentContext = `问卷名称：${test.title}\n描述：${test.description}\n\n`;
    let answersContext = "用户的答题情况：\n";
    questions.forEach((q: any, index: number) => {
        const answerValue = answers[index];
        const selectedOption = q.options.find((opt: any) => opt.value === answerValue);
        answersContext += `${index + 1}. 问题：${q.text}\n   用户选择：${selectedOption ? selectedOption.text : answerValue}\n`;
    });
    
    // 初始 System Prompt
    const systemMsg: ChatMsg = {
        role: "system",
        content: `你是一位专业的心理评估师。用户刚刚完成了一份心理测试。
你的任务是根据用户的答题情况，生成一份精简的评估报告。
随后，你需要作为咨询师与用户进行对话，解答他们的疑问，或者根据他们的请求进行更深入的分析（如果用户开启了深度思考）。`
    };

    const userMsg: ChatMsg = {
        role: "user",
        content: assessmentContext + answersContext
    };

    // 初始化聊天记录
    setChatMessages([systemMsg, userMsg]);

    try {
        const res = await fetch("/api/assessment/analyze", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                assessment: test,
                answers: answers,
                questions: questions
            }),
        });

        if (!res.ok) {
            throw new Error(`API Error: ${res.statusText}`);
        }

        setShowResult(true);
        setIsSubmitting(false);

        const reader = res.body?.getReader();
        const decoder = new TextDecoder();
        
        let fullResult = "";

        if (reader) {
            let buffer = "";
            while (true) {
                const { done, value } = await reader.read();
                if (done) break;
                
                const chunk = decoder.decode(value, { stream: true });
                buffer += chunk;
                
                const lines = buffer.split('\n');
                buffer = lines.pop() || "";
                
                for (const line of lines) {
                    const trimmed = line.trim();
                    if (!trimmed || trimmed === "data: [DONE]") continue;
                    if (trimmed.startsWith("data: ")) {
                        try {
                            const json = JSON.parse(trimmed.slice(6));
                            const content = json.choices?.[0]?.delta?.content || "";
                            if (content) {
                                fullResult += content;
                                setAnalysisResult(prev => prev + content);
                            }
                        } catch (e) {}
                    }
                }
            }
        }
        
        // 分析完成后，将 AI 的回复加入到聊天记录中
        setChatMessages(prev => [...prev, { role: "assistant", content: fullResult }]);

    } catch (error) {
        console.error("Analysis failed:", error);
        alert("分析生成失败，请稍后重试。");
        onClose();
    } finally {
        setIsAnalyzing(false);
    }
  };

  const handleSendMessage = async () => {
      if (!chatInput.trim() || isChatLoading) return;
      
      const userInput = chatInput;
      setChatInput("");
      setIsChatLoading(true);

      // 添加用户消息
      const newUserMsg: ChatMsg = { role: "user", content: userInput };
      const newMessages = [...chatMessages, newUserMsg];
      setChatMessages(newMessages);

      try {
        const res = await fetch("/api/chat/deepseek", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                messages: newMessages,
                model: useDeepThought ? "deepseek-reasoner" : "deepseek-chat"
            }),
        });

        if (!res.ok) throw new Error("Chat failed");

        // 创建临时消息用于流式显示
        const assistantMsgId = String(Date.now());
        // 我们可以在这里临时增加一个空消息，或者直接用最后一条消息的状态来渲染
        // 这里简化处理：直接累积到最后一条消息（如果是 assistant）或者新增一条
        
        // 为了简单，我们先不实时流式显示到 UI 的对话框中，而是等有了 chunk 就更新
        // 但是为了体验，我们需要实时更新 chatMessages 末尾的消息
        
        // 先加一个空的占位
        setChatMessages(prev => [...prev, { role: "assistant", content: "" }]);

        const reader = res.body?.getReader();
        const decoder = new TextDecoder();
        let assistantContent = "";

        if (reader) {
             let buffer = "";
             while(true) {
                 const { done, value } = await reader.read();
                 if (done) break;
                 
                 const chunk = decoder.decode(value, { stream: true });
                 buffer += chunk;
                 const lines = buffer.split('\n');
                 buffer = lines.pop() || "";
                 
                 for (const line of lines) {
                    const trimmed = line.trim();
                    if (!trimmed || trimmed === "data: [DONE]") continue;
                    if (trimmed.startsWith("data: ")) {
                        try {
                            const json = JSON.parse(trimmed.slice(6));
                            const content = json.choices?.[0]?.delta?.content || "";
                             // DeepSeek R1 reasoning_content (忽略思考过程的展示，或者直接拼接到最后？这里先只展示 final content)
                             // 如果需要展示思考过程，需根据 API 返回结构调整
                            if (content) {
                                assistantContent += content;
                                setChatMessages(prev => {
                                    const last = prev[prev.length - 1];
                                    if (last.role === "assistant") {
                                         return [...prev.slice(0, -1), { ...last, content: assistantContent }];
                                    }
                                    return prev;
                                });
                            }
                        } catch(e) {}
                    }
                 }
             }
        }

      } catch (error) {
          console.error("Chat error:", error);
          setChatMessages(prev => [...prev, { role: "assistant", content: "抱歉，出错了，请重试。" }]);
      } finally {
          setIsChatLoading(false);
      }
  };

  // 加载状态
  if (isSubmitting) {
    return (
      <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-md z-50 flex items-center justify-center p-4">
        <div className="bg-white dark:bg-slate-900 rounded-[2rem] w-full max-w-lg flex flex-col items-center justify-center p-12 text-center shadow-2xl border border-slate-100 dark:border-slate-700/60 relative overflow-hidden">
          {/* 顶部彩条 */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>

          {/* 背景光晕 */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-indigo-400/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute top-1/4 right-1/4 w-32 h-32 bg-purple-400/10 rounded-full blur-2xl pointer-events-none"></div>

          {/* 动画图标区 */}
          <div className="relative mb-8">
            {/* 外圈旋转轨道 */}
            <div className="w-28 h-28 rounded-full border-[3px] border-dashed border-indigo-300/40 dark:border-indigo-500/20 animate-spin" style={{ animationDuration: '8s' }}></div>
            {/* 中圈旋转轨道 */}
            <div className="absolute inset-2 w-24 h-24 rounded-full border-[2px] border-purple-400/30 dark:border-purple-500/20 animate-spin" style={{ animationDirection: 'reverse', animationDuration: '4s' }}></div>
            {/* 内圈进度条 */}
            <div className="absolute inset-4 w-20 h-20 rounded-full border-[3px] border-indigo-200/40 dark:border-slate-700 border-t-indigo-500 animate-spin" style={{ animationDuration: '1.2s' }}></div>
            {/* 中心图标 */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/30">
                <BrainCircuit className="w-8 h-8 text-white" />
              </div>
            </div>
            {/* 角落装饰点 */}
            <Sparkles className="absolute -top-1 -right-1 w-5 h-5 text-yellow-400 animate-pulse" />
          </div>

          {/* 文字区 */}
          <div className="relative space-y-3 mb-8">
            <h3 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent dark:from-indigo-400 dark:to-purple-400">
              AI 正在深度分析中
            </h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed max-w-xs mx-auto">
              正在结合前沿心理学模型，为您定制专属多维评估报告
            </p>
          </div>

          {/* 步骤指示器 */}
          <div className="relative w-full max-w-xs space-y-2.5">
            {[
              { label: '收集作答数据', done: true },
              { label: '多维度心理建模', done: true },
              { label: '生成个性化报告', done: false },
            ].map((step, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${step.done ? 'bg-indigo-500' : 'bg-indigo-100 dark:bg-slate-700'}`}>
                  {step.done
                    ? <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                    : <div className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse"></div>
                  }
                </div>
                <div className="flex-1 h-1.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-1000 ${step.done ? 'bg-gradient-to-r from-indigo-500 to-purple-500 w-full' : 'bg-gradient-to-r from-indigo-400 to-purple-400 animate-pulse'}`}
                    style={step.done ? {} : { width: '60%' }}
                  ></div>
                </div>
                <span className={`text-xs shrink-0 font-medium ${step.done ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-400 dark:text-slate-500'}`}>{step.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (showResult) {
    return (
      <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-50 flex items-center justify-center p-4">
        <div className="bg-white dark:bg-slate-900 rounded-[2rem] w-full max-w-3xl h-[80vh] min-h-[600px] flex flex-col shadow-2xl border border-slate-200/50 dark:border-slate-700/50 overflow-hidden">
          
          {/* Header */}
          <div className="shrink-0 relative bg-white dark:bg-slate-900 z-10 border-b border-slate-100 dark:border-slate-800 shadow-sm">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-50/50 to-purple-50/50 dark:from-indigo-900/10 dark:to-purple-900/10 opacity-50"></div>
            <div className="relative flex items-center justify-between p-6">
                <div className="flex items-center gap-4">
                <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-indigo-500 to-purple-500 text-white shadow-lg shadow-indigo-500/20">
                  <BrainCircuit className="h-7 w-7" />
                  <Sparkles className="absolute -right-1 -top-1 h-4 w-4 text-yellow-300 animate-pulse" />
                </div>
                <div>
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">智能评估报告</h2>
                    <p className="text-sm font-medium text-indigo-600 dark:text-indigo-400">{test.title}</p>
                </div>
                </div>
                <button onClick={onClose} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors shrink-0">
                <X className="w-6 h-6 text-slate-500 dark:text-slate-400" />
                </button>
            </div>
          </div>

          {/* Content Scroll Area */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-8 custom-scrollbar bg-slate-50 dark:bg-slate-900/50 relative">
             <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 rounded-full blur-[80px] pointer-events-none"></div>
             <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/5 rounded-full blur-[80px] pointer-events-none"></div>
             
             {/* 初始分析报告 */}
             <div className="relative bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl p-5 sm:p-6 rounded-2xl shadow-sm border border-white/50 dark:border-slate-700/50 mb-6 z-10">
                 {analysisResult ? (
                    <div className="prose prose-sm md:prose-base prose-indigo dark:prose-invert max-w-none prose-headings:font-bold prose-h1:text-xl prose-p:leading-relaxed prose-li:my-0.5">
                         <ReactMarkdown remarkPlugins={[remarkGfm]}>
                            {analysisResult}
                         </ReactMarkdown>
                    </div>
                 ) : (
                    <div className="flex items-center justify-center h-48 text-indigo-500 dark:text-indigo-400 font-medium">
                        <span className="flex items-center gap-2 animate-pulse"><Sparkles className="w-5 h-5"/> 报告生成中...</span>
                    </div>
                 )}
                 {isAnalyzing && (
                     <div className="mt-6 flex items-center justify-center gap-2 text-sm text-indigo-500 dark:text-indigo-400 animate-pulse font-medium">
                         <Target className="w-4 h-4" /> 深度分析进行中...
                     </div>
                 )}
             </div>

             {/* 后续对话记录 */}
             <div className="space-y-4 relative z-10">
                {chatMessages.slice(3).map((msg, idx) => (
                    <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[85%] sm:max-w-[75%] shadow-sm border ${
                            msg.role === 'user' 
                            ? 'px-4 py-2.5 sm:px-5 sm:py-3 rounded-2xl bg-indigo-600 dark:bg-indigo-500 text-white rounded-br-sm border-transparent' 
                            : 'px-4 py-3 sm:px-5 sm:py-4 rounded-2xl bg-white/90 dark:bg-slate-800/90 backdrop-blur-md border-white/20 dark:border-slate-700/50 text-slate-800 dark:text-slate-200 rounded-bl-sm'
                        }`}>
                            <div className={`break-words ${
                                msg.role === 'user' 
                                ? 'text-white text-sm font-medium whitespace-pre-wrap' 
                                : 'prose prose-sm max-w-none prose-p:leading-relaxed dark:prose-invert'
                            }`}>
                                {msg.role === 'user' ? (
                                    msg.content
                                ) : (
                                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                        {msg.content}
                                    </ReactMarkdown>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
                
                {isChatLoading && (
                    <div className="flex justify-start">
                        <div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-md p-5 rounded-3xl rounded-bl-md border border-white/20 dark:border-slate-700/50 shadow-sm flex items-center gap-2">
                            <div className="w-2.5 h-2.5 bg-indigo-400 dark:bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
                            <div className="w-2.5 h-2.5 bg-indigo-400 dark:bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: '0.15s' }}></div>
                            <div className="w-2.5 h-2.5 bg-indigo-400 dark:bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: '0.3s' }}></div>
                        </div>
                    </div>
                )}
                
                <div ref={chatBottomRef} className="h-4" />
             </div>
          </div>
          
          {/* Chat Input Area */}
          <div className="flex-shrink-0 p-4 sm:p-6 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-t border-slate-100 dark:border-slate-800 relative z-20">
              <div className="relative flex items-center">
                  <input
                    type="text"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && !isChatLoading && handleSendMessage()}
                    placeholder="对结果有疑问？可以继续向我提问..."
                    className="w-full pl-5 pr-[130px] py-3 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white border-2 border-slate-100 dark:border-slate-700 rounded-xl focus:outline-none focus:border-indigo-500/50 focus:bg-white dark:focus:bg-slate-900 focus:ring-4 focus:ring-indigo-500/10 transition-all placeholder:text-slate-400 font-medium"
                    disabled={isChatLoading || isAnalyzing}
                  />
                  <div className="absolute right-2 flex items-center gap-1.5">
                      <button 
                          className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                              useDeepThought 
                              ? 'bg-indigo-100 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400' 
                              : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-200/50 dark:hover:bg-slate-700'
                          }`}
                          onClick={() => setUseDeepThought(!useDeepThought)}
                          disabled={isChatLoading || isAnalyzing}
                          title="深度思考"
                      >
                          <Brain className="w-3.5 h-3.5" />
                          <span className="hidden sm:inline">深度思考</span>
                          {useDeepThought && <span className="flex w-1.5 h-1.5 rounded-full bg-indigo-500 ml-0.5 animate-pulse"></span>}
                      </button>
                      <button
                        onClick={handleSendMessage}
                        disabled={!chatInput.trim() || isChatLoading || isAnalyzing}
                        className="p-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg shadow-md hover:shadow-lg disabled:opacity-50 disabled:grayscale transition-all"
                      >
                        <Send className="w-4 h-4 md:w-5 md:h-5 ml-0.5" />
                      </button>
                  </div>
              </div>
          </div>

        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-900 rounded-[2rem] w-full max-w-3xl h-[80vh] min-h-[600px] flex flex-col shadow-2xl overflow-hidden relative">
        
        {/* Decorative Background inside modal */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50/50 dark:bg-indigo-500/5 rounded-bl-full pointer-events-none -z-0 blur-3xl"></div>
        
        {/* 顶部头部 */}
        <div className="shrink-0 relative z-10 border-b border-slate-100 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 backdrop-blur-md">
          <div className="p-4 md:p-6 pb-4">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 border border-indigo-100/50 dark:border-indigo-500/20 rounded-xl text-2xl shadow-sm">
                    {test.icon}
                </div>
                <div>
                  <h2 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white mb-0.5 tracking-tight">{test.title}</h2>
                  <div className="flex items-center gap-3 text-xs font-medium text-slate-500 dark:text-slate-400">
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {test.duration}</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-600"></span>
                    <span className="text-indigo-500 dark:text-indigo-400 font-bold">用时 {formatTime(timeElapsed)}</span>
                  </div>
                </div>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            
            {/* 进度条 */}
            <div className="space-y-2 mt-2">
              <div className="flex justify-between items-end text-xs font-bold mb-1">
                <span className="text-slate-600 dark:text-slate-400">测评进度</span>
                <span className="px-2.5 py-0.5 rounded-md bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
                    {currentQuestion + 1} <span className="text-indigo-300 dark:text-indigo-600">/ {questions.length}</span>
                </span>
              </div>
              <div className="flex flex-wrap gap-1.5 w-full items-center">
                {questions.map((_, idx) => {
                    const isCompleted = idx < currentQuestion;
                    const isCurrent = idx === currentQuestion;
                    return (
                        <Star 
                            key={idx} 
                            className={`w-3.5 h-3.5 md:w-4 md:h-4 transition-all duration-500 ${
                                isCompleted 
                                ? 'fill-indigo-500 text-indigo-500' 
                                : isCurrent 
                                ? 'fill-indigo-200 dark:fill-indigo-400/50 text-indigo-500 scale-125 drop-shadow-sm' 
                                : 'text-slate-200 dark:text-slate-700 fill-slate-100 dark:fill-slate-800/50'
                            }`} 
                        />
                    );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* 问题内容 */}
        <div className="flex-1 p-6 md:p-8 space-y-6 relative z-10 bg-slate-50/30 dark:bg-slate-900 overflow-y-auto">
          <div className="flex items-center gap-3">
            <span className="shrink-0 inline-flex px-3 py-1 bg-indigo-100 dark:bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 rounded-md text-xs font-bold tracking-wider uppercase">
              Q{currentQuestion + 1}
            </span>
            <h3 className="text-xl md:text-2xl font-bold text-slate-800 dark:text-slate-100 leading-relaxed">
              {questions[currentQuestion]?.text}
            </h3>
          </div>

          <div className="space-y-2 md:space-y-3">
            {questions[currentQuestion]?.options.map((option: any, index: number) => {
              const isSelected = answers[currentQuestion] === option.value;
              return (
              <button
                key={index}
                onClick={() => handleAnswer(option.value)}
                className={`w-full p-3.5 md:p-4 text-left rounded-xl transition-all duration-300 border-2 group relative overflow-hidden ${
                  isSelected
                    ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-500/10 shadow-md transform scale-[1.01]"
                    : "border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-indigo-300 dark:hover:border-indigo-600/50 hover:bg-indigo-50/50 dark:hover:bg-indigo-900/10"
                }`}
              >
                {isSelected && <div className="absolute left-0 top-0 bottom-0 w-1 bg-indigo-500 rounded-l-2xl"></div>}
                <div className="flex items-center gap-4">
                  <div className={`shrink-0 flex items-center justify-center w-6 h-6 rounded-full border-2 transition-all ${
                    isSelected
                      ? "border-indigo-500"
                      : "border-slate-300 dark:border-slate-600 group-hover:border-indigo-400"
                  }`}>
                    <div className={`w-2.5 h-2.5 rounded-full transition-all ${isSelected ? 'bg-indigo-500 scale-100' : 'bg-transparent scale-0'}`}></div>
                  </div>
                  <div className={`text-base font-medium transition-colors ${isSelected ? 'text-indigo-900 dark:text-indigo-300' : 'text-slate-700 dark:text-slate-300 group-hover:text-indigo-700 dark:group-hover:text-indigo-400'}`}>
                    {option.text}
                  </div>
                </div>
              </button>
            )})}
          </div>
        </div>
        
        {/* 底部按钮区域 */}
        <div className="shrink-0 relative z-10 p-6 md:p-8 pt-4 md:pt-6 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center">
            <button
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
              className="flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-sm text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ArrowLeft className="w-4 h-4" />
              上一题
            </button>

            {currentQuestion === questions.length - 1 && (
                <button
                onClick={handleNext}
                disabled={!answers[currentQuestion]}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm text-white shadow-lg transition-all ${
                    !answers[currentQuestion] 
                    ? 'bg-slate-300 dark:bg-slate-700 opacity-50 cursor-not-allowed shadow-none' 
                    : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-indigo-500/20'
                }`}
                >
                完成测试
                <ArrowRight className="w-4 h-4" />
                </button>
            )}
          </div>
      </div>
    </div>
  );
}
