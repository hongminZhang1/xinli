"use client";

import { useState, useEffect, useRef } from "react";
import { X, ArrowLeft, ArrowRight, CheckCircle, Clock, Target, Sparkles, MessageSquare, Send, Brain } from "lucide-react";
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
      <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-50 flex items-center justify-center p-4">
        <div className="bg-white dark:bg-slate-800 rounded-[2.5rem] max-w-sm w-full p-10 text-center shadow-2xl border border-slate-100 dark:border-slate-700 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
          <div className="relative">
            <div className="w-24 h-24 mx-auto bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900/30 dark:to-purple-900/30 rounded-full flex items-center justify-center animate-pulse mb-6 shadow-inner">
              <Sparkles className="w-10 h-10 text-indigo-500 dark:text-indigo-400" />
            </div>
            <div className="absolute inset-0 w-24 h-24 mx-auto border-[3px] border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin"></div>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">AI 正在深度深度...</h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">正在结合前沿心理学模型，为您定制专属多维评估报告</p>
          </div>
        </div>
      </div>
    );
  }

  if (showResult) {
    return (
      <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-50 flex items-center justify-center p-2 sm:p-4">
        <div className="bg-white dark:bg-slate-900 rounded-[2rem] max-w-3xl w-full max-h-[95vh] flex flex-col shadow-2xl border border-slate-200/50 dark:border-slate-700/50 overflow-hidden">
          
          {/* Header */}
          <div className="flex-shrink-0 relative bg-white dark:bg-slate-900 z-10 border-b border-slate-100 dark:border-slate-800 shadow-sm">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-50/50 to-purple-50/50 dark:from-indigo-900/10 dark:to-purple-900/10 opacity-50"></div>
            <div className="relative flex items-center justify-between p-6">
                <div className="flex items-center gap-4">
                <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-white dark:bg-slate-800 text-2xl shadow-sm border border-slate-100 dark:border-slate-700">{test.icon}</div>
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
             <div className="relative bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl p-8 rounded-3xl shadow-sm border border-white/50 dark:border-slate-700/50 mb-8 z-10">
                 {analysisResult ? (
                    <div className="prose prose-indigo dark:prose-invert max-w-none prose-headings:font-bold prose-h1:text-2xl prose-p:leading-relaxed prose-li:my-1">
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
             <div className="space-y-6 relative z-10">
                {chatMessages.slice(3).map((msg, idx) => (
                    <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[85%] sm:max-w-[75%] p-5 rounded-3xl shadow-sm border ${
                            msg.role === 'user' 
                            ? 'bg-gradient-to-br from-indigo-600 to-purple-600 text-white rounded-br-md border-transparent' 
                            : 'bg-white/90 dark:bg-slate-800/90 backdrop-blur-md border-white/20 dark:border-slate-700/50 text-slate-800 dark:text-slate-200 rounded-bl-md'
                        }`}>
                            <div className={`prose prose-sm max-w-none prose-p:leading-relaxed ${msg.role === 'user' ? 'prose-invert text-white/90 font-medium' : 'dark:prose-invert'}`}>
                                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                    {msg.content}
                                </ReactMarkdown>
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
              <div className="flex items-center justify-between mb-3 px-2">
                  <div className="flex items-center gap-2">
                    <button 
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                            useDeepThought 
                            ? 'bg-indigo-50 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400' 
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                        }`}
                        onClick={() => setUseDeepThought(!useDeepThought)}
                    >
                        <Brain className="w-3.5 h-3.5" />
                        深度思考模式
                        {useDeepThought && <span className="flex w-2 h-2 rounded-full bg-indigo-500 ml-1 animate-pulse"></span>}
                    </button>
                  </div>
              </div>
              
              <div className="relative flex items-center">
                  <input
                    type="text"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && !isChatLoading && handleSendMessage()}
                    placeholder="对结果有疑问？可以继续向我提问..."
                    className="w-full pl-6 pr-14 py-4 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white border-2 border-slate-100 dark:border-slate-700 rounded-2xl focus:outline-none focus:border-indigo-500/50 focus:bg-white dark:focus:bg-slate-900 focus:ring-4 focus:ring-indigo-500/10 transition-all placeholder:text-slate-400 font-medium"
                    disabled={isChatLoading || isAnalyzing}
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={!chatInput.trim() || isChatLoading || isAnalyzing}
                    className="absolute right-2 p-2.5 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl shadow-md hover:shadow-lg disabled:opacity-50 disabled:grayscale transition-all"
                  >
                    <Send className="w-5 h-5 ml-0.5" />
                  </button>
              </div>
          </div>

        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] max-w-2xl w-full flex flex-col shadow-2xl overflow-hidden relative">
        
        {/* Decorative Background inside modal */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50/50 dark:bg-indigo-500/5 rounded-bl-full pointer-events-none -z-0 blur-3xl"></div>
        
        {/* 顶部头部 */}
        <div className="relative z-10 border-b border-slate-100 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 backdrop-blur-md">
          <div className="p-6 md:p-8 pb-6">
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-5">
                <div className="flex items-center justify-center w-14 h-14 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 border border-indigo-100/50 dark:border-indigo-500/20 rounded-2xl text-3xl shadow-sm">
                    {test.icon}
                </div>
                <div>
                  <h2 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white mb-1 tracking-tight">{test.title}</h2>
                  <div className="flex items-center gap-3 text-sm font-medium text-slate-500 dark:text-slate-400">
                    <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> 预计 {test.duration}</span>
                    <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-600"></span>
                    <span className="text-indigo-500 dark:text-indigo-400 font-bold">用时 {formatTime(timeElapsed)}</span>
                  </div>
                </div>
              </div>
              <button
                onClick={onClose}
                className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            {/* 进度条 */}
            <div className="space-y-3">
              <div className="flex justify-between items-end text-sm font-bold">
                <span className="text-slate-700 dark:text-slate-300">测评进度</span>
                <span className="px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
                    {currentQuestion + 1} <span className="text-indigo-300 dark:text-indigo-600">/ {questions.length}</span>
                </span>
              </div>
              <div className="relative h-2.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="absolute top-0 left-0 h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* 问题内容 */}
        <div className="flex-1 p-6 md:p-8 space-y-8 relative z-10 bg-slate-50/30 dark:bg-slate-900 overflow-y-auto">
          <div>
            <span className="inline-block px-3 py-1 bg-indigo-100 dark:bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 rounded-lg text-xs font-bold tracking-wider uppercase mb-5">
              QUESTION {currentQuestion + 1}
            </span>
            <h3 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white leading-snug">
              {questions[currentQuestion]?.text}
            </h3>
          </div>

          <div className="space-y-4">
            {questions[currentQuestion]?.options.map((option: any, index: number) => {
              const isSelected = answers[currentQuestion] === option.value;
              return (
              <button
                key={index}
                onClick={() => handleAnswer(option.value)}
                className={`w-full p-4 md:p-5 text-left rounded-2xl transition-all duration-300 border-2 group relative overflow-hidden ${
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
                  <div className={`text-lg font-medium transition-colors ${isSelected ? 'text-indigo-900 dark:text-indigo-300' : 'text-slate-700 dark:text-slate-300 group-hover:text-indigo-700 dark:group-hover:text-indigo-400'}`}>
                    {option.text}
                  </div>
                </div>
              </button>
            )})}
          </div>
        </div>
        
        {/* 底部按钮区域 */}
        <div className="relative z-10 p-6 md:p-8 pt-4 md:pt-6 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center">
            <button
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
              className="flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-sm text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ArrowLeft className="w-4 h-4" />
              上一题
            </button>

            <button
              onClick={handleNext}
              disabled={!answers[currentQuestion]}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm text-white shadow-lg transition-all ${
                  !answers[currentQuestion] 
                  ? 'bg-slate-300 dark:bg-slate-700 opacity-50 cursor-not-allowed shadow-none' 
                  : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-indigo-500/20'
              }`}
            >
              {currentQuestion === questions.length - 1 ? "完成测试" : "下一题"}
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
      </div>
    </div>
  );
}
